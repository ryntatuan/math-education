/**
 * RÀ “DIỄN GIẢI BỊ LẶP” TRONG CHÚ THÍCH HÌNH.
 *
 * Có 3 bộ vẽ ghép **câu tự tính** với `label` của tác giả bằng ` · `:
 *   · `baseTen`  → "N chục và M đơn vị = X" + label
 *   · `money`    → "Tổng: X đồng" + label
 *   · `angle`    → "bé hơn góc vuông"… + label
 * Nếu label chỉ nhắc lại đúng các con số của câu tự tính thì trẻ thấy **cùng một ý hai lần**.
 *
 *   node scratch/soat-dien-giai-lap.mjs
 */
import path from "node:path";
import { pathToFileURL } from "node:url";

const NOTE = {
  acute: "bé hơn góc vuông",
  right: "bằng góc vuông",
  obtuse: "lớn hơn góc vuông, bé hơn góc bẹt",
  straight: "bằng hai góc vuông",
};

const NGUON = [];
for (let n = 1; n <= 5; n++) {
  const m = await import(
    pathToFileURL(path.resolve(`client/src/data/grade${n}Data.js`)).href
  );
  const data = Object.values(m).find((v) => v && Array.isArray(v.chapters));
  if (!data) throw new Error(`grade${n}Data.js: không thấy mảng chapters`);
  NGUON.push([`g${n}`, data]);
}

const chuan = (s) =>
  String(s ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
const coSo = (chu, so) =>
  new RegExp(`(^|[^0-9])${so}([^0-9]|$)`).test(String(chu ?? ""));

const dong = [];
for (const [lop, data] of NGUON) {
  for (const chuong of data.chapters || []) {
    for (const bai of chuong.lessons || []) {
      (bai.slides || []).forEach((s, i) => {
        const c = s?.content;
        if (!c || typeof c !== "object") return;
        const ca = [];

        if (c.baseTen && typeof c.baseTen === "object") {
          const t = Number(c.baseTen.tens) || 0;
          const o = Number(c.baseTen.ones) || 0;
          ca.push([
            "baseTen",
            o === 0
              ? `${t} chục = ${t * 10}`
              : `${t} chục và ${o} đơn vị = ${t * 10 + o}`,
            c.baseTen.label,
          ]);
        }
        if (c.money && typeof c.money === "object") {
          const notes = (Array.isArray(c.money.notes) ? c.money.notes : [])
            .map((x) => Number(x) || 0)
            .filter((x) => x > 0)
            .slice(0, 6);
          const tong = notes.reduce((s2, x) => s2 + x, 0);
          const tu =
            notes.length === 0
              ? "(không vẽ gì)"
              : notes.length === 1
                ? `Tờ ${notes[0]} đồng`
                : `Tổng: ${tong} đồng`;
          ca.push(["money", tu, c.money.label]);
        }
        if (c.angle && typeof c.angle === "object") {
          ca.push(["angle", NOTE[c.angle.kind] || "", c.angle.label]);
        }

        for (const [kieu, tu, label] of ca) {
          const soTu = (String(tu).match(/\d+/g) || []).filter(
            (x) => x !== "0",
          );
          const lap =
            !!label && soTu.length > 0 && soTu.every((x) => coSo(label, x));
          const chuSlide = String(s?.content?.text ?? "");
          const nen = chuan(label) || chuan(tu);
          const trung =
            !!label && nen.length > 5 && chuan(chuSlide).includes(nen);
          dong.push({
            viTri: `${lop}/${bai.id}#${i}`,
            kieu,
            "câu tự tính": tu,
            label: label || "(không có)",
            "chữ slide": chuSlide.replace(/\s+/g, " ").slice(0, 40),
            ket: !label
              ? "chỉ tự tính"
              : trung
                ? "🔴 trùng chữ slide"
                : lap
                  ? "ok (label thay câu tự tính)"
                  : "ok (thêm ý)",
          });
        }
      });
    }
  }
}

console.table(dong);
const dem = {};
for (const d of dong) dem[d.ket] = (dem[d.ket] || 0) + 1;
console.log("\nTổng kết:", dem, "· tổng ca:", dong.length);
