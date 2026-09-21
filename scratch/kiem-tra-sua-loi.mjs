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

console.log("\n=== 1. Câu hỏi đếm chim PHẢI có hình để đếm ===");
const qChim = timSlide(g1, "g1-c1-l2", (s) =>
  (s.content?.question || "").includes("con chim"),
);
const itemsChim = qChim?.content?.items;
kiem(
  "slide đếm chim có khoá `items`",
  Array.isArray(itemsChim) && itemsChim.length > 0,
  JSON.stringify(qChim?.content?.items),
);
if (Array.isArray(itemsChim) && itemsChim[0]) {
  kiem(
    "số hình (count) KHỚP đáp án",
    Number(itemsChim[0].count) === Number(qChim.content.answer),
    `count=${itemsChim[0].count} · answer=${qChim.content.answer}`,
  );
  // 1F426 = 🐦. Viết dạng mã hoá để không bị hỏng khi ghi file — nhưng phải kiểm lại
  // là nó THẬT SỰ là chim, chứ không phải ký tự thay thế.
  const cp = [...String(itemsChim[0].emoji)].map((c) =>
    c.codePointAt(0).toString(16),
  );
  kiem(
    "emoji là chim (U+1F426), không phải ký tự hỏng",
    cp.length === 1 && cp[0] === "1f426",
    cp.join(","),
  );
}

console.log("\n=== 2. Không còn câu hỏi trỏ vào hình không tồn tại ===");
const g4q = timSlide(g4, "g4-c2-l6", (s) => s.type === "quiz");
kiem(
  "g4-c2-l6: câu hỏi không còn 'Trong hình chữ nhật ABCD'",
  !String(g4q?.content?.question || "").includes("hình chữ nhật ABCD"),
  g4q?.content?.question,
);
kiem(
  "g4-c2-l6: đáp án vẫn nằm trong lựa chọn",
  (g4q?.content?.options || []).includes(g4q?.content?.answer),
  JSON.stringify(g4q?.content?.options),
);
const g2q = timSlide(g2, "g2-c9-l1", (s) =>
  (s.content?.question || "").includes("khối trụ"),
);
kiem(
  "g2-c9-l1: bỏ chữ 'dưới đây' khi không vẽ gì bên dưới",
  !String(g2q?.content?.question || "").includes("dưới đây"),
  g2q?.content?.question,
);
kiem(
  "g2-c9-l1: đáp án vẫn nằm trong lựa chọn",
  (g2q?.content?.options || []).includes(g2q?.content?.answer),
  JSON.stringify(g2q?.content?.options),
);

console.log("\n=== 3. tenFrame: hình phải vẽ ĐỦ filled + extra ô ===");
// 4 ca Lớp 2 — hai ca đầu trước đây bị khai thiếu nên hình mất chỗ còn lại.
const MONG_DOI = {
  "g2-c2-l1": 13, // 9 + 4 = 9 + 1 + 3
  "g2-c2-l2": 13, // 8 + 5 = 8 + 2 + 3
  "g2-c2-l4": 13, // 10 + 3 (khung đầy, 3 ngoài)
  "g2-c8-l6": 14, // 10 + 4
};
for (const [id, tong] of Object.entries(MONG_DOI)) {
  const s = timSlide(g2, id, (sl) => sl.content?.tenFrame);
  const tf = s?.content?.tenFrame || {};
  const co = (Number(tf.filled) || 0) + (Number(tf.extra) || 0);
  kiem(
    `${id}: filled + extra = ${tong}`,
    co === tong,
    `filled=${tf.filled} extra=${tf.extra} ⇒ ${co}`,
  );
}

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
          k.barModel != null || k.ruler != null,
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
