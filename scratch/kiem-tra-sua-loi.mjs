// TỰ KIỂM 5 chỗ sửa ngày 2026-09-22 (người dùng nhìn màn hình rồi báo, cổng không bắt được).
//
// Chạy: node scratch/kiem-tra-sua-loi.mjs
//
// Vì sao phải có file này: cả 5 lỗi đều là loại "dữ liệu vẫn hợp lệ, cổng vẫn xanh".
// Không có phép kiểm riêng thì lần sau ai sửa lại dữ liệu cũng sẽ phá mà không biết.

import fs from "node:fs";

const g1 = (await import("../client/src/data/grade1Data.js")).grade1Data;
const g2 = (await import("../client/src/data/grade2Data.js")).grade2Data;
const g4 = (await import("../client/src/data/grade4Data.js")).grade4Data;

const NGUON = {
  g1,
  g2,
  g4,
  g3: (await import("../client/src/data/grade3Data.js")).grade3Data,
};
const FILE = {
  g1: "grade1Data.js",
  g2: "grade2Data.js",
  g3: "grade3Data.js",
  g4: "grade4Data.js",
};

const bai = (g, id) => {
  for (const c of g.chapters)
    for (const l of c.lessons) if (l.id === id) return l;
  return null;
};
const slides = (g, id) => bai(g, id)?.slides || [];
const timSlide = (g, id, f) => slides(g, id).find(f) || null;

let dat = 0;
let hong = 0;
const kiem = (ten, ok, doDuoc) => {
  if (ok) {
    dat++;
    console.log(`  OK    ${ten}`);
  } else {
    hong++;
    console.log(`  HỎNG  ${ten}\n        đo được: ${doDuoc}`);
  }
};

console.log("\n=== 0. Ký tự hỏng U+FFFD trong file dữ liệu vừa sửa ===");
for (const [k, f] of Object.entries(FILE)) {
  const t = fs.readFileSync(`client/src/data/${f}`, "utf8");
  const n = (t.match(/[\uFFFD]/g) || []).length;
  kiem(`${f} không có U+FFFD`, n === 0, n);
}

console.log(
  "\n=== 1. Câu hỏi đếm phải có hình để đếm (kiểm TOÀN BỘ 5 lớp) ===",
);
// 🔴 SỬA THƯỚC 2026-09-29: phép kiểm cũ tra cứng vào `g1-c1-l2` tìm câu “con chim” — câu đó đã
//    được sửa/bỏ nên phép kiểm đo ra `undefined` và báo HỎNG dù dữ liệu không sai. Nay kiểm
//    **mọi** câu hỏi dạng “mấy con / đếm … trong hình” của cả 5 lớp.
const MOI_BAI = [];
for (let n = 1; n <= 5; n++) {
  const m = await import(`../client/src/data/grade${n}Data.js`);
  const data = Object.values(m).find((v) => v && Array.isArray(v.chapters));
  for (const c of data?.chapters ?? [])
    for (const l of c.lessons ?? []) MOI_BAI.push([n, l]);
}
const CO_HINH_DEM = (k) =>
  k.items != null ||
  k.numberScene != null ||
  k.groupScene != null ||
  k.tenFrame != null;
// ⚠ Chỉ tính câu ĐẾM ĐỒ VẬT (“mấy con/cái/quả/bông/chiếc/viên/khối/bạn…”), KHÔNG tính câu hỏi
//   thuộc tính hình (“Hình vuông có mấy cạnh?”, “Khối lập phương có mấy mặt?”) — những câu đó
//   không cần hình để đếm, trẻ đã học thuộc đặc điểm hình.
//   ⚠ Lần 2 (cùng ngày): chỉ tính câu có NHẮC TỚI HÌNH (“trong tranh/trong hình/dưới đây/hình bên”)
//   hoặc có chữ “đếm”. Bài toán có lời văn (“Xếp 8 khối…”, “35 bạn chia 5 nhóm”) không cần hình.
const HOI_DEM = /đếm|trong tranh|trong hình|dưới đây|hình bên|như hình/i;
const DEM_DO_VAT =
  /(mấy|đếm).{0,24}(con|cái|quả|bông|chiếc|viên|khối|bạn|hạt|ngôi|chấm)\b/i;
const KHONG_PHAI_DEM = /cạnh|mặt|đỉnh|góc/i;
let demCauHoiDem = 0;
const thieuHinh = [];
// ⚠ Thiết kế của app: slide “Quan sát tranh” (visual) đứng TRƯỚC, rồi mới tới câu hỏi — đôi khi cách
//   vài slide (vì các slide “ba bước/mẹo” được chèn vào giữa). Vậy chỉ báo lỗi khi TRONG CẢ BÀI,
//   từ đầu tới slide câu hỏi, không có slide nào có hình đếm được.
for (const [lop, l] of MOI_BAI) {
  const ds = l.slides ?? [];
  ds.forEach((s, i) => {
    const k = s.content || {};
    if (s.type !== "quiz" || !HOI_DEM.test(String(k.question || ""))) return;
    if (!DEM_DO_VAT.test(String(k.question || ""))) return;
    if (KHONG_PHAI_DEM.test(String(k.question || ""))) return;
    demCauHoiDem++;
    const coHinhTruoc = ds
      .slice(0, i + 1)
      .some((x) => CO_HINH_DEM(x.content || {}));
    if (!coHinhTruoc)
      thieuHinh.push(`L${lop} ${l.id}: ${String(k.question).slice(0, 60)}`);
  });
}
kiem(
  `mọi câu hỏi đếm (${demCauHoiDem} câu) đều có hình để đếm`,
  thieuHinh.length === 0,
  thieuHinh.slice(0, 5).join(" | "),
);
// Nếu có `items`: TỔNG số hình phải KHỚP đáp án (bắt đúng lỗi “hình 4 con, đáp án 5 con”).
// ⚠ `items` có thể là MẢNG nhiều nhóm ⇒ phải cộng hết `count`, không chỉ lấy phần tử đầu.
const lechItem = [];
for (const [lop, l] of MOI_BAI) {
  for (const s of l.slides ?? []) {
    const k = s.content || {};
    // ⚠ CHỈ kiểm khi câu hỏi là câu ĐẾM: nhiều quiz phép tính dùng `items` chỉ để trang trí
    //   (1 emoji, `count: 1`) — với những câu đó `count` không phải số lượng cần đếm.
    if (s.type !== "quiz" || k.items == null || k.answer == null) continue;
    if (!HOI_DEM.test(String(k.question || ""))) continue;
    const mang = Array.isArray(k.items) ? k.items : [k.items];
    const tong = mang.reduce((a, x) => a + (Number(x?.count) || 0), 0);
    if (tong === 0) continue;
    if (String(k.answer).trim() !== String(tong))
      lechItem.push(`L${lop} ${l.id}: hình ${tong} · đáp án ${k.answer}`);
  }
}
kiem(
  `tổng số hình trong items KHỚP đáp án (${lechItem.length} lệch)`,
  lechItem.length === 0,
  lechItem.slice(0, 5).join(" | "),
);

console.log(
  "\n=== 2. Mọi quiz: đáp án PHẢI nằm trong lựa chọn (kiểm TOÀN BỘ 5 lớp) ===",
);
// 🔴 SỬA THƯỚC 2026-09-29: phép kiểm cũ tra cứng vào `g4-c2-l6` (bài đã bị viết lại) nên đo ra
//    `undefined`. Nay kiểm cả 489 bài — đúng tinh thần “đáp án vẫn nằm trong lựa chọn”.
const quizLech = [];
let demQuiz = 0;
for (const [lop, l] of MOI_BAI) {
  for (const s of l.slides ?? []) {
    const k = s.content || {};
    if (
      s.type !== "quiz" ||
      !Array.isArray(k.options) ||
      k.options.length === 0
    )
      continue;
    demQuiz++;
    const co = k.options.some(
      (o) => String(o).trim() === String(k.answer).trim(),
    );
    if (!co)
      quizLech.push(
        `L${lop} ${l.id}: “${String(k.answer).slice(0, 30)}” ∉ ${k.options.length} lựa chọn`,
      );
  }
}
kiem(
  `mọi quiz có lựa chọn (${demQuiz} câu) đều chứa đáp án`,
  quizLech.length === 0,
  quizLech.slice(0, 5).join(" | "),
);

console.log(
  "\n=== 3. tenFrame: hình phải vẽ ĐỦ filled + extra ô (kiểm TOÀN BỘ) ===",
);
// 🔴 SỬA THƯỚC 2026-09-29: 4 phép kiểm cũ tra cứng vào các bài `g2-c2-l1/l2/l4`, `g2-c8-l6`;
//    các bài đó nay không còn dùng `tenFrame` nữa (đã chuyển sang `groupScene`) nên đo ra
//    `undefined` ⇒ báo HỎNG oan. Nay kiểm mọi slide `tenFrame` trong cả 5 lớp:
//      (a) `filled` là số 0…10, `extra` là số ≥ 0;
//      (b) nếu câu hỏi/slide có nêu TỔNG số thì tổng đó phải bằng filled + extra.
const tfHong = [];
const raSo = (t) => (String(t).match(/\d+/g) || []).map(Number);
let demTf = 0;
for (const [lop, l] of MOI_BAI) {
  for (const s of l.slides ?? []) {
    const tf = s.content?.tenFrame;
    if (!tf) continue;
    demTf++;
    const f = Number(tf.filled) || 0;
    const e = Number(tf.extra) || 0;
    if (!(f >= 0 && f <= 10))
      tfHong.push(`L${lop} ${l.id}: filled=${tf.filled}`);
    if (!(e >= 0)) tfHong.push(`L${lop} ${l.id}: extra=${tf.extra}`);
    const chu = `${s.content?.question || ""} ${s.content?.text || ""}`;
    const so = raSo(chu).filter((n) => n === f + e);
    const coTong =
      new RegExp(`(tổng|có tất cả|tất cả|được)\\D{0,12}${f + e}\\b`, "i").test(
        chu,
      ) || so.length > 0;
    if (!coTong && f + e > 0)
      tfHong.push(`L${lop} ${l.id}: khai ${f}+${e} nhưng lời không nêu tổng`);
  }
}
kiem(
  `mọi slide tenFrame (${demTf} slide) khai đúng số ô`,
  tfHong.length === 0,
  tfHong.slice(0, 6).join(" | "),
);

// Mọi ca còn lại: `extra` KHÔNG được vượt quá số ô trống — vượt là phần dư phải vẽ
// ngoài khung, mà ca nào cũng nên có lời giảng khớp (kiểm bằng mắt ở nhóm trên).
console.log(
  "\n=== 4. Toàn bộ 5 lớp: liệt kê hình có ô ngoài khung (để đối chiếu lời giảng) ===",
);
for (const [k, g] of Object.entries(NGUON)) {
  for (const c of g.chapters) {
    for (const l of c.lessons) {
      for (const s of l.slides) {
        const tf = s.content?.tenFrame;
        if (!tf) continue;
        const f = Number(tf.filled) || 0;
        const t = Number(tf.total) || 10;
        const e = Number(tf.extra) || 0;
        const ngoai = e - Math.min(e, Math.max(0, t - f));
        if (ngoai > 0) {
          console.log(
            `  [${k}] ${l.id}: ${f} + ${e} ⇒ ${f + e} ô (${ngoai} ô ngoài khung) — ${JSON.stringify(tf.label || "")}`,
          );
        }
      }
    }
  }
}

console.log("\n=== 5. Câu hỏi nói 'trên biểu đồ' thì PHẢI có hình để đọc ===");
// 8 câu ở Lớp 2–3 trước đây bắt bé đọc một biểu đồ không được vẽ ra.
let demBieuDo = 0;
for (const [k, g] of Object.entries(NGUON)) {
  for (const c of g.chapters) {
    for (const l of c.lessons) {
      for (const s of l.slides) {
        const q = String(s.content?.question || "");
        if (!/biểu đồ/i.test(q)) continue;
        demBieuDo++;
        const it = s.content?.items;
        kiem(
          `${k} ${l.id}: câu hỏi biểu đồ có hình đếm được`,
          Array.isArray(it) &&
            it.length > 0 &&
            it.every((x) => Number(x.count) > 0),
          JSON.stringify(it),
        );
      }
    }
  }
}
console.log(`  (đã kiểm ${demBieuDo} câu hỏi có chữ "biểu đồ")`);

console.log(
  "\n=== 6. Mọi emoji trong `items` phải là ký tự THẬT, không phải U+FFFD ===",
);
let demItems = 0;
let itemsHong = 0;
for (const [k, g] of Object.entries(NGUON)) {
  for (const c of g.chapters) {
    for (const l of c.lessons) {
      for (const s of l.slides) {
        const it = s.content?.items;
        if (!Array.isArray(it)) continue;
        for (const x of it) {
          demItems++;
          const em = String(x.emoji || "");
          const laFFFD = em.includes("\uFFFD") || em.length === 0;
          if (laFFFD) {
            itemsHong++;
            console.log(
              `  HỎNG  [${k}] ${l.id}: emoji hỏng = ${JSON.stringify(em)}`,
            );
          }
        }
      }
    }
  }
}
kiem(
  `tất cả ${demItems} emoji trong items đều nguyên vẹn`,
  itemsHong === 0,
  `${itemsHong} hỏng`,
);

console.log(
  "\n=== 7. Câu hỏi lời văn (băng giấy / thước): có hình và SỐ KHỚP câu hỏi ===",
);
// Yêu cầu của người dùng 2026-09-22: thêm hình minh hoạ cho các câu còn lại.
// Phép kiểm dưới đây bắt đúng họ lỗi "hình vẽ một đằng, câu hỏi nói một nẻo".
const CAN_HINH = [
  ["g1", "g1-c7-l4"],
  ["g1", "g1-c7-l8"],
  ["g2", "g2-c1-l7"],
  ["g2", "g2-c1-l9"],
  ["g2", "g2-c5-l7"],
  ["g3", "g3-c4-l3"],
];
for (const [g, id] of CAN_HINH) {
  const gd = NGUON[g];
  if (!gd) continue;
  for (const c of gd.chapters) {
    for (const l of c.lessons) {
      if (l.id !== id) continue;
      for (const s of l.slides) {
        const k = s.content || {};
        if (
          s.type !== "quiz" ||
          !/thước|băng giấy|vạch/.test(String(k.question || ""))
        )
          continue;
        kiem(
          `${id}: có hình minh hoạ`,
          // 🔴 SỬA THƯỚC 2026-09-29: `measureBoard` (vật đặt cạnh thước, vẽ ĐÚNG TỈ LỆ) cũng là
          //    hình minh hoạ hợp lệ — trước đây whitelist thiếu nó nên báo HỎNG oan 2 ca.
          k.barModel != null || k.ruler != null || k.measureBoard != null,
          Object.keys(k).join(","),
        );
        // Số "có nghĩa" của hình: số phần của sơ đồ, hoặc hai đầu của đoạn đang đo.
        const soNghia = k.barModel
          ? (k.barModel.rows || []).map((r) => Number(r.parts))
          : k.ruler && k.ruler.measure
            ? [Number(k.ruler.measure.from), Number(k.ruler.measure.to)]
            : [];
        if (!soNghia.length) continue;
        const nguon = `${k.question} ${k.answer} ${(k.options || []).join(" ")}`;
        const thieu = soNghia.filter(
          (n) => !new RegExp(`(^|[^0-9])${n}([^0-9]|$)`).test(nguon),
        );
        kiem(
          `${id}: số trong hình (${soNghia.join("/")}) đều có trong câu hỏi/đáp án`,
          thieu.length === 0,
          `thiếu: ${thieu.join(", ")}`,
        );
      }
    }
  }
}

console.log(`\nTỔNG: ${dat} đạt · ${hong} hỏng\n`);
process.exit(hong ? 1 : 0);
