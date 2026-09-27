/**
 * CHỜ BẢN PHÁT HÀNH APK MỚI rồi kiểm đúng đường dẫn người dùng tải.
 *
 * Chạy: `node scratch/cho-phat-hanh.mjs [số-phút-tối-đa]`
 *
 * 🔴 VÌ SAO KHÔNG DÙNG API GITHUB Ở ĐÂY (đã mắc thật 2026-09-28): API không đăng nhập chỉ cho
 *    **60 lượt/giờ cho MỖI IP**. Bản cũ hỏi API mỗi 20 giây ⇒ hết hạn mức sau ~15 phút, và triệu
 *    chứng nhìn thấy là `release.assets` trả về RỖNG (`asset: chưa có`) — trông y như "GitHub
 *    đã xoá file APK", nhưng thật ra chỉ là bị chặn 403. Rất dễ kết luận sai.
 *    ⇒ Dùng những đường KHÔNG tốn hạn mức:
 *      • tải APK qua `releases/latest/download/ToanVui.apk` (đường CDN, không phải API);
 *      • đọc tag bằng `git ls-remote` (git, không phải API);
 *      • theo dõi thay đổi bằng `etag` / `content-length` của chính file đó.
 *    Và hỏi thưa: mặc định 60 giây một lần.
 *
 * Kiểm ba thứ người dùng thật sự chạm vào:
 *   1. APK trên GitHub đã ĐỔI chưa (so etag với lúc bắt đầu chờ);
 *   2. `/downloads/ToanVui.apk` trên web có chuyển tiếp (307) sang GitHub không;
 *   3. bản tải được từ web có trùng đúng byte với bản mới trên GitHub không.
 */
import { execSync } from "node:child_process";

const REPO = "ryntatuan/math-education";
const WEB = "https://toanvuive.vercel.app";
const LATEST = `https://github.com/${REPO}/releases/latest/download/ToanVui.apk`;
const phutToiDa = Number(process.argv[2] ?? 10);
const hetHan = Date.now() + phutToiDa * 60_000;

const dau = async (url, redirect = "follow") => {
  const res = await fetch(url, { method: "HEAD", redirect });
  return {
    status: res.status,
    etag: res.headers.get("etag"),
    size: Number(res.headers.get("content-length") ?? 0),
    location: res.headers.get("location"),
  };
};

/** Tag trỏ vào commit nào — bằng git, KHÔNG tốn hạn mức API. */
const tagSha = (tag) => {
  const out = execSync(`git ls-remote --tags origin refs/tags/${tag}`, {
    encoding: "utf8",
  });
  return out.trim().split(/\s+/)[0] ?? null;
};

const mocCu = await dau(LATEST);
console.log(
  `Bắt đầu chờ: APK mới nhất trên GitHub = ${mocCu.size} byte · etag ${mocCu.etag ?? "?"}`,
);

for (;;) {
  const nay = await dau(LATEST);
  const moi = Boolean(nay.etag) && nay.etag !== mocCu.etag;
  console.log(
    `[${new Date().toLocaleTimeString("vi-VN")}] APK: ${nay.size} byte · etag ${nay.etag ?? "?"}${
      moi ? " · MỚI" : ""
    }`,
  );

  if (moi) {
    const web = await dau(`${WEB}/downloads/ToanVui.apk`, "manual");
    const buf = Buffer.from(
      await (
        await fetch(`${WEB}/downloads/ToanVui.apk?cb=${Date.now()}`)
      ).arrayBuffer(),
    );
    console.log(`\n✅ CÓ BẢN APK MỚI`);
    console.log(
      `   tag v1.1.1 -> commit ${tagSha("v1.1.1")}  (git ls-remote, không tốn hạn mức API)`,
    );
    console.log(`   GitHub: ${nay.size} byte · etag ${nay.etag}`);
    console.log(`   web chuyển tiếp: HTTP ${web.status} -> ${web.location}`);
    console.log(
      `   tải từ web: ${buf.length} byte · ${
        buf.length === nay.size
          ? "TRÙNG bản trên GitHub ✓"
          : "LỆCH bản trên GitHub ✗"
      }`,
    );
    console.log(
      `   (kiểm chữ ký: apksigner verify --print-certs <file tải về>)`,
    );
    break;
  }

  if (Date.now() > hetHan) {
    console.log(
      `\n⏱ Hết ${phutToiDa} phút mà chưa thấy APK mới (chạy lại lệnh này để chờ tiếp).`,
    );
    process.exit(2);
  }
  await new Promise((r) => setTimeout(r, 60_000));
}
