// DỌN `no-unused-vars` TỰ ĐỘNG — đọc danh sách cảnh báo của oxlint rồi sửa từng chỗ một.
//
// VÌ SAO VIẾT CÔNG CỤ: 146 cảnh báo nằm rải ở ~30 file; sửa tay vừa lâu vừa dễ sửa nhầm chỗ.
// Cách sửa chọn theo mức AN TOÀN:
//   · "Identifier 'X' is imported but never used"  ⇒ BỎ tên X khỏi câu import (không đổi hành vi).
//     ⚠️ KHÔNG bỏ cả câu import nếu nguồn là file `.css` — import CSS có TÁC DỤNG PHỤ (nạp style).
//   · "Variable/Function 'X' is declared/defined but never used" ⇒ ĐỔI TÊN thành `_X`
//     (cấu hình oxlint bỏ qua tên bắt đầu bằng `_`) — giữ nguyên mã, không xoá gì.
//   · "Parameter 'X' is never used" ⇒ cũng đổi thành `_X`.
//
// DÙNG: node scratch/don-bien-khong-dung.mjs [--ghi]
//   (không có --ghi thì chỉ in ra việc sẽ làm)
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const GHI = process.argv.includes("--ghi");
const TEP_LINT = "scratch/lint-all.txt";
if (!existsSync(TEP_LINT)) {
  console.error(
    `Không thấy ${TEP_LINT} — chạy trước: cd client && npx oxlint src > ../scratch/lint-all.txt`,
  );
  process.exit(2);
}

const dong = readFileSync(TEP_LINT, "utf8").split(/\r?\n/);
const viecTheoFile = new Map();
let boQua = 0;

for (const l of dong) {
  const m =
    /^src[/\\](.+?):(\d+):(\d+): warning eslint\(no-unused-vars\): (.+)$/.exec(
      l.trim(),
    );
  if (!m) continue;
  const [, duong, soDong, , moTa] = m;
  const ten = /'([^']+)'/.exec(moTa)?.[1];
  if (!ten) continue;
  const f = `client/src/${duong}`;
  if (!viecTheoFile.has(f)) viecTheoFile.set(f, []);
  if (/is imported but never used/.test(moTa)) {
    viecTheoFile.get(f).push({ kieu: "import", ten, soDong: Number(soDong) });
  } else if (/Catch parameter/.test(moTa) && /never used/.test(moTa)) {
    // `catch (e) {}` mà không dùng `e` ⇒ dùng "optional catch binding": `catch {}`
    // (gọn hơn `catch (_e)` và không cần tới luật bỏ qua tên `_`).
    viecTheoFile.get(f).push({ kieu: "catch", ten, soDong: Number(soDong) });
  } else if (
    /is declared but never used|is defined but never used|is never used/.test(
      moTa,
    )
  ) {
    viecTheoFile.get(f).push({ kieu: "doiTen", ten, soDong: Number(soDong) });
  } else {
    boQua++;
  }
}

let soImport = 0;
let soDoiTen = 0;
let soCatch = 0;
const khongXuLy = [];

for (const [f, ds] of viecTheoFile) {
  const lines = readFileSync(f, "utf8").split(/\r?\n/);
  // Sửa từ DƯỚI lên để số dòng phía trên không lệch (dù ở đây chỉ sửa trong dòng).
  for (const v of [...ds].sort((a, b) => b.soDong - a.soDong)) {
    const i = v.soDong - 1;
    const d = lines[i];
    if (d === undefined || !new RegExp(`\\b${v.ten}\\b`).test(d)) {
      khongXuLy.push(`${f}:${v.soDong} — dòng không còn chứa "${v.ten}"?`);
      continue;
    }
    if (v.kieu === "doiTen") {
      // Chỉ đổi ĐÚNG lần xuất hiện đầu tiên trên dòng khai báo.
      lines[i] = d.replace(new RegExp(`\\b${v.ten}\\b`), `_${v.ten}`);
      soDoiTen++;
      continue;
    }
    if (v.kieu === "catch") {
      const moi = d.replace(
        new RegExp(`catch\\s*\\(\\s*${v.ten}\\s*\\)`),
        "catch",
      );
      if (moi === d) {
        khongXuLy.push(`${f}:${v.soDong} — không khớp "catch (${v.ten})"`);
        continue;
      }
      lines[i] = moi;
      soCatch++;
      continue;
    }
    // import: bỏ tên khỏi danh sách.
    // ⚠️ Rất nhiều file viết import NHIỀU DÒNG (mỗi icon một dòng), khi đó dòng bị cảnh báo
    // KHÔNG chứa `import {` ⇒ phải tìm câu import bao quanh rồi dựng lại.
    let iOpen = i;
    if (!/import\s*\{/.test(d)) {
      for (let k = i - 1; k >= 0 && i - k <= 40; k--) {
        if (/\}\s*from/.test(lines[k])) break;
        if (/import\s*\{/.test(lines[k])) {
          iOpen = k;
          break;
        }
      }
    }
    const dOpen = lines[iOpen];
    if (/import\s*\{/.test(dOpen)) {
      // Gộp đoạn import thành MỘT dòng rồi bỏ tên không dùng (prettier sẽ tự xuống dòng lại).
      let iClose = iOpen;
      while (iClose < lines.length && !/\}/.test(lines[iClose])) iClose++;
      const gop = lines.slice(iOpen, iClose + 1).join(" ");
      const m2 = /import\s*\{([^}]*)\}\s*from\s*(.+?);?\s*$/.exec(gop);
      if (m2) {
        const con = m2[1]
          .split(",")
          .map((x) => x.trim())
          .filter(Boolean)
          .filter((x) => !new RegExp(`^${v.ten}(\\s+as\\s+\\w+)?$`).test(x));
        if (con.length === 0) {
          if (/\.css["']/.test(m2[2])) {
            khongXuLy.push(
              `${f}:${v.soDong} — import CSS: để nguyên (tác dụng phụ nạp style)`,
            );
            continue;
          }
          lines.splice(iOpen, iClose - iOpen + 1);
        } else {
          const nguon = m2[2].replace(/;\s*$/, "").trim();
          lines.splice(
            iOpen,
            iClose - iOpen + 1,
            `import { ${con.join(", ")} } from ${nguon};`,
          );
        }
        soImport++;
        continue;
      }
    }
    // import mặc định: `import X from "..."` ⇒ bỏ cả câu (trừ CSS).
    if (new RegExp(`^\\s*import\\s+${v.ten}\\s+from`).test(d)) {
      if (/\.css["']/.test(d)) {
        khongXuLy.push(`${f}:${v.soDong} — import CSS mặc định: để nguyên`);
        continue;
      }
      lines.splice(i, 1);
      soImport++;
      continue;
    }
    khongXuLy.push(
      `${f}:${v.soDong} — không nhận dạng được câu import của "${v.ten}"`,
    );
  }
  if (GHI) writeFileSync(f, lines.join("\n"), "utf8");
}

console.log(
  `${GHI ? "Đã sửa" : "Sẽ sửa"}: bỏ tên trong ${soImport} câu import · đổi tên ${soDoiTen} biến/tham số · gọn ${soCatch} chỗ catch.`,
);
if (boQua)
  console.log(`  (${boQua} cảnh báo khác kiểu — không thuộc nhóm này)`);
if (khongXuLy.length) {
  console.log(`⚠️ ${khongXuLy.length} chỗ cần xem tay:`);
  for (const x of khongXuLy.slice(0, 20)) console.log("   · " + x);
}
