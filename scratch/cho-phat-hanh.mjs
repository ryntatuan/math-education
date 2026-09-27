/**
 * CHỜ PHÁT HÀNH XONG rồi in kết quả — dùng khi vừa push để Vercel + GitHub Actions làm việc.
 *
 * Chạy: `node scratch/cho-phat-hanh.mjs 1.1.1 [số-phút-tối-đa]`
 *
 * In ra:
 *   • tag `v<phiên bản>` có chưa, và nó trỏ vào commit nào + commit đó có phải commit vừa push không
 *     (đây là phép kiểm cho bản vá `target_commitish` của workflow);
 *   • dung lượng asset APK trong Release;
 *   • bản web đã phục vụ phiên bản mới chưa (`/downloads/version.json`).
 */
const REPO = "ryntatuan/math-education";
const VERCEL = "https://toanvuive.vercel.app";
const phienBan = process.argv[2] ?? "1.1.1";
const phutToiDa = Number(process.argv[3] ?? 8);
const hetHan = Date.now() + phutToiDa * 60_000;

const doc = async (url) => {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "cho-phat-hanh",
      Accept: "application/vnd.github+json",
    },
  });
  return res.ok ? res.json() : null;
};

const git = async () => {
  const tag = await doc(
    `https://api.github.com/repos/${REPO}/git/ref/tags/v${phienBan}`,
  );
  if (!tag) return null;
  // ⚠️ Tag NHẸ trỏ thẳng vào commit (`object.url` = commit) ⇒ object trả về có `sha` ở gốc;
  //    tag CÓ CHÚ THÍCH trỏ vào tag object ⇒ phải đi thêm một lớp `object.sha`. Đọc thiếu vế
  //    thứ hai thì script báo "chưa có" dù Release đã phát hành xong (đã mắc thật 2026-09-28).
  const obj = await doc(tag.object.url);
  return obj?.object?.sha ?? obj?.sha ?? null;
};

const web = async () => {
  const res = await fetch(`${VERCEL}/downloads/version.json?cb=${Date.now()}`);
  if (!res.ok) return null;
  const meta = await res.json();
  return {
    version: meta.version,
    size: meta.fileSizeBytes,
    luc: meta.buildDateFormatted,
  };
};

for (;;) {
  const sha = await git();
  const w = await web();
  const xong = Boolean(sha) && w?.version === phienBan;
  console.log(
    `[${new Date().toLocaleTimeString("vi-VN")}] release v${phienBan}: ${sha ? sha.slice(0, 7) : "chưa có"}` +
      ` · web: ${w?.version ?? "?"} (${w?.size ?? "?"} byte, ${w?.luc ?? "?"})`,
  );
  if (xong) {
    const rel = await doc(
      `https://api.github.com/repos/${REPO}/releases/tags/v${phienBan}`,
    );
    const apk = (rel?.assets ?? []).find((a) => a.name.endsWith(".apk"));
    console.log(`\n✅ XONG v${phienBan}`);
    console.log(`   tag v${phienBan} -> commit ${sha}`);
    console.log(
      `   APK trong Release: ${apk ? `${apk.name} = ${apk.size} byte` : "CHƯA THẤY"}`,
    );
    console.log(`   web: ${w.version} · ${w.size} byte · build lúc ${w.luc}`);
    break;
  }
  if (Date.now() > hetHan) {
    console.log(
      `\n⏱ Hết ${phutToiDa} phút — phát hành CHƯA xong (chạy lại lệnh này để chờ tiếp).`,
    );
    process.exit(2);
  }
  await new Promise((r) => setTimeout(r, 20_000));
}
