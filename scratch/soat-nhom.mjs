/**
 * LIỆT KÊ MỌI CA `groupScene` (nhóm quả bóng / khay / gộp cho đủ 10 …) CỦA 5 LỚP.
 *
 * Mục đích: soi lỗi HIỂN THỊ và lỗi DIỄN GIẢI — ví dụ `makeTen` phải cho trẻ thấy
 * số hạng thứ hai được **tách** thành “phần thêm cho đủ 10” và “phần còn lại”
 * (7 = 4 + 3), chứ không vẽ 3 thành một hộp rời rạc.
 *
 *   node scratch/soat-nhom.mjs
 */
import path from "node:path";
import { pathToFileURL } from "node:url";

const NGUON = [];
for (let n = 1; n <= 5; n++) {
  const m = await import(
    pathToFileURL(path.resolve(`client/src/data/grade${n}Data.js`)).href
  );
  const data = Object.values(m).find((v) => v && Array.isArray(v.chapters));
  if (!data) throw new Error(`grade${n}Data.js: không thấy mảng chapters`);
  NGUON.push([`g${n}`, data]);
}

const dong = [];
for (const [lop, data] of NGUON) {
  for (const chuong of data.chapters || []) {
    for (const bai of chuong.lessons || []) {
      (bai.slides || []).forEach((s, i) => {
        const g = s?.content?.groupScene;
        if (!g || typeof g !== "object") return;
        const du = [];
        if (g.mode === "makeTen") {
          const a = Number(g.a);
          const b = Number(g.b);
          const c = Number(g.c);
          du.push(
            "a/b/c",
            `a=${a}`,
            `b=${b}`,
            `c=${c}`,
            `b+c=${b + c}`,
            `số hạng 2 (theo eq) = ?`,
          );
          // eq dạng "9 + 4 = 9 + 1 + 3" ⇒ số hạng thứ hai là số thứ 2
          const so = String(g.eq || "").match(/\d+/g) || [];
          du.push("eq", `"${g.eq || ""}"`, `số trong eq: ${so.join(",")}`);
        } else if (g.mode === "takeAway") {
          du.push(
            `tổng=${g.total}`,
            `bớt=${g.remove}`,
            `showLeft=${!!g.showLeft}`,
          );
        } else if (g.mode === "sumGroups") {
          du.push(
            "nhóm:",
            (g.groups || []).map((x) => `${x.emoji || "?"}×${x.n}`).join(" + "),
            `kết quả=${g.result}`,
          );
        } else {
          du.push(
            `n=${g.n}`,
            `k=${g.k}`,
            `kind=${g.kind || ""}`,
            `pile=${g.pile || 0}`,
          );
        }
        dong.push({
          viTri: `${lop}/${bai.id}#${i}`,
          mode: g.mode,
          "dữ liệu": du.join(" "),
          eq: g.eq || "",
          note: String(g.note || "").slice(0, 70),
          "chữ slide": String(s?.content?.text ?? "")
            .replace(/\s+/g, " ")
            .slice(0, 44),
        });
      });
    }
  }
}

console.table(dong);
const dem = {};
for (const d of dong) dem[d.mode] = (dem[d.mode] || 0) + 1;
console.log("\nTheo kiểu:", dem, "· tổng ca:", dong.length);
