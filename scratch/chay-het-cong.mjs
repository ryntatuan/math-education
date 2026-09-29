#!/usr/bin/env node
/**
 * CHẠY HẾT CÁC SCRIPT KIỂM TRONG `scratch/` — để không còn “lần nào kiểm cũng xanh”.
 *
 * VÌ SAO CÓ FILE NÀY (người dùng hỏi 2026-09-29): *“kiểm tra lần nào cũng pass và sạch nhưng khi
 * kiểm tra lại thì luôn có lỗi?”*. Trả lời trung thực = **chạy hết** mọi script kiểm và in ra
 * mã thoát thật của từng cái, kèm 3 dòng cuối của nó. Cổng nào đỏ thì thấy ngay.
 *
 *   node scratch/chay-het-cong.mjs            # chạy hết (chỉ script ĐỌC)
 *   node scratch/chay-het-cong.mjs <từ khoá>  # chỉ chạy script có tên chứa từ khoá
 *   node scratch/chay-het-cong.mjs --ke-cong-cu-ghi   # GỒM cả công cụ ghi (nguy hiểm, xem dưới)
 *
 * 🔴🔴 ĐÃ GÂY THIỆT HẠI THẬT (2026-09-29) — BÀI HỌC ĐẮT NHẤT CỦA FILE NÀY.
 *   Vòng “chạy hết” trước đây chạy MỌI `.mjs` trong `scratch/`, kể cả những script là **công cụ
 *   GHI** — `scratch/generate-pet-templates.mjs` ghi thẳng vào `client/public/pets/*.svg`.
 *   Kết quả: 20 file SVG **do người dùng tự vẽ cho từng biểu cảm** bị ghi đè bằng ảnh template
 *   sinh tự động. Người dùng phát hiện và rất bức xúc (*“những ảnh đó tôi đã vẽ cho từng biểu cảm,
 *   ai cho phép bạn sửa?”*) — hoàn toàn đúng.
 *
 *   ⇒ TỪ NAY: chỉ chạy script **ĐỌC**. Script có tên là công cụ ghi (`sua-`, `chen-`, `generate-`,
 *   `draw_`, `them-`, `doi-`, `viet-lai-`, `chuan-hoa-`, `day-`, `bump`, `build`…) bị BỎ QUA và
 *   **in ra danh sách bỏ qua** để không ai tưởng là đã kiểm. Muốn chạy cả công cụ ghi thì phải gõ
 *   cờ `--ke-cong-cu-ghi` (và tự chịu trách nhiệm với file bị ghi đè).
 *   ⚠️ Script ghi file MỚI thì cũng phải nhớ: mọi công cụ sinh ảnh/dữ liệu phải có cờ “ghi đè”.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const GOC = "scratch";
const KE_CONG_CU_GHI = process.argv.includes("--ke-cong-cu-ghi");
const loc = process.argv.slice(2).find((a) => !a.startsWith("--")) ?? "";
const BO_QUA = /bundle|test_practice_ui|test_new_features/; // bundle = bản build, không phải cổng

/**
 * TÊN CỦA CÔNG CỤ GHI (ghi vào repo: ảnh, dữ liệu, phiên bản…). Bỏ qua mặc định.
 * Cố ý dùng tiền tố động từ tiếng Việt + tiếng Anh hay dùng cho công cụ ghi.
 */
const CONG_CU_GHI =
  /^(sua-|chen-|va-|don-|xoa-|them-|doi-|viet-lai-|ghep-|chuan-hoa-|tach-|day-|generate-|draw_|apply|fix-|migrate|build|bump)/i;
/** Ngoại lệ: tên na ná công cụ ghi nhưng thỰc ra chỉ ĐỌC. */
const NGOAI_LE_DOC = /^(doi-chieu-|doi-chieu-rule-points)/i;

const tatCa = fs
  .readdirSync(GOC)
  .filter(
    (f) =>
      f.endsWith(".mjs") &&
      !BO_QUA.test(f) &&
      f !== path.basename(import.meta.url),
  )
  .filter((f) => f.includes(loc))
  .sort();

const ds = [];
const boQua = [];
for (const f of tatCa) {
  if (!KE_CONG_CU_GHI && CONG_CU_GHI.test(f) && !NGOAI_LE_DOC.test(f))
    boQua.push(f);
  else ds.push(f);
}

const ket = [];
for (const f of ds) {
  let out = "";
  let ma = 0;
  try {
    out = execFileSync(process.execPath, [path.join(GOC, f)], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
      timeout: 180000,
    });
  } catch (e) {
    ma = e.status ?? -1;
    out = `${e.stdout ?? ""}${e.stderr ?? ""}`;
  }
  const dong = out.split(/\r?\n/).filter((l) => l.trim());
  ket.push({ f, ma, cuoi: dong.slice(-3).join(" ⏐ ").slice(0, 190) });
}

fs.writeFileSync(
  "scratch/chay-het-cong.txt",
  ket
    .map(
      (r) => `[${r.ma === 0 ? "OK " : "ĐỎ "}${r.ma}] ${r.f}\n      ${r.cuoi}`,
    )
    .join("\n"),
  "utf8",
);

const doDo = ket.filter((r) => r.ma !== 0);
console.log(
  `Đã chạy ${ket.length} script ĐỌC · ${ket.length - doDo.length} xanh · ${doDo.length} ĐỎ`,
);
for (const r of doDo) console.log(`  ❌ [${r.ma}] ${r.f}\n       ${r.cuoi}`);
if (boQua.length) {
  console.log(
    `\n⚠️ BỎ QUA ${boQua.length} CÔNG CỤ GHI (không chạy — xem ghi chú đầu file):`,
  );
  console.log(`   ${boQua.join(", ")}`);
  console.log(
    "   Cần chạy cả chúng thì gõ thêm cờ --ke-cong-cu-ghi (tự chịu trách nhiệm file bị ghi đè).",
  );
}
console.log("→ scratch/chay-het-cong.txt");
