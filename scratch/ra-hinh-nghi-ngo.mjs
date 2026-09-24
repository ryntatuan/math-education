/**
 * Rà soát "hình vẽ NÓI KHÁC lời bài": soi lời của từng slide, nếu lời nhắc tới một
 * loại hình cụ thể mà slide lại gắn khoá hình KHÁC thì in ra để người đọc xem lại.
 *
 * Read-only: chỉ đọc dữ liệu, không ghi gì.
 *
 *   node scratch/ra-hinh-nghi-ngo.mjs
 */
import { HINH_KEYS } from "../client/src/components/visuals/visualKeys.js";
import { grade1Data } from "../client/src/data/grade1Data.js";
import { grade2Data } from "../client/src/data/grade2Data.js";
import { grade3Data } from "../client/src/data/grade3Data.js";
import { grade4Data } from "../client/src/data/grade4Data.js";
import { grade5Data } from "../client/src/data/grade5Data.js";

const NGUON = [
  ["g1", grade1Data],
  ["g2", grade2Data],
  ["g3", grade3Data],
  ["g4", grade4Data],
  ["g5", grade5Data],
];

/** Mỗi luật: lời bài khớp `text` thì hình phải thuộc `ok` (khoá hình hợp lý). */
const RULES = [
  {
    id: "A · đi trên bảng/lưới (xuống-lên 1 hàng)",
    text: /xuống (dưới )?(một|1) (hàng|dòng)|lên (trên )?(một|1) (hàng|dòng)/i,
    ok: ["table", "numberScene", "groupScene"],
    why: "đi xuống/lên một HÀNG thì phải vẽ bảng nhiều hàng, không phải tia số thẳng",
  },
  {
    id: "A2 · đi ngang trên lưới (sang phải/trái 1 ô)",
    text: /(sang (phải|trái)|sang bên (phải|trái))\s*(một|1)?\s*(ô|hàng)/i,
    ok: ["table", "numberScene", "groupScene", "pointLine", "motionDiagram"],
    why: "nói 'sang phải một ô' là đi trên lưới ⇒ tia số một hàng là SAI",
  },
  {
    id: "B · bảng 100 số",
    text: /bảng (100|trăm) số|bảng các số/i,
    ok: ["table", "numberScene"],
    why: "bảng 100 số là lưới 10 cột",
  },
  {
    id: "C · tia số",
    text: /tia số/i,
    ok: ["numberLine", "numberScene"],
    why: "nói tia số thì hình phải là tia số",
  },
  {
    id: "D · biểu đồ tranh / biểu đồ cột",
    text: /biểu đồ (tranh|cột|đoạn thẳng)/i,
    ok: ["barChart", "table", "numberScene", "barModel"],
    why: "biểu đồ phải là hình cột / bảng số liệu",
  },
  {
    id: "E · chia đều / chia thành các phần",
    text: /chia đều|chia thành\s+\d+\s+phần/i,
    ok: [
      "groupScene",
      "fractionBar",
      "fractionCircle",
      "barModel",
      "table",
      "numberScene",
      "barChart",
      "pieChart",
      "motionDiagram",
    ],
    why: "chia đều phải thấy các phần bằng nhau",
  },
  {
    id: "F · “mỗi … có k (phần)”",
    text: /mỗi\s+[^.,;?!]{0,24}\bcó\s+\d+/i,
    ok: [
      "groupScene",
      "barChart",
      "table",
      "numberScene",
      "money",
      "placeValue",
      "barModel",
      "fractionBar",
      "pieChart",
    ],
    why: "phải đếm được phần của TỪNG vật",
  },
  {
    id: "G · đo độ dài (cm / m / thước)",
    text: /đo độ dài|xăng-ti-mét|đề-xi-mét|ki-lô-mét|dùng thước|đặt thước/i,
    ok: [
      "ruler",
      "numberLine",
      "motionDiagram",
      "table",
      "pointLine",
      "barModel",
      "planeShape",
      "planeShapes",
      "numberScene",
      "shapePicture",
      "shapeJoin",
      "circleParts",
      "angle",
      "solid",
      "spatialScene",
    ],
    why: "đo độ dài / diện tích thì hình phải có kích thước rõ",
  },
  {
    id: "H · tiền (tờ tiền / mua bán)",
    text: /tờ tiền|mua hết|trả lại|giá tiền|tiền thừa/i,
    ok: ["money", "table", "barChart", "numberScene", "barModel"],
    why: "bài toán mua bán phải có tờ tiền / bảng giá",
  },
  {
    id: "I · hình phẳng",
    text: /hình (tròn|vuông|tam giác|chữ nhật|thoi|bình hành|thang)\b/i,
    ok: [
      "planeShape",
      "shapePicture",
      "shapeJoin",
      "spatialScene",
      "solid",
      "numberScene",
      "table",
      "circleParts",
      "fractionCircle",
      "pieChart",
      "shapePicture",
      "planeShapes",
      "angle",
      "pointLine",
    ],
    why: "bài hình phẳng phải vẽ hình phẳng",
    /**
     * 🔴 Chỉ xét CHỮ CHÍNH của slide (lời · tựa · đề bài · quy tắc), KHÔNG xét gạch đầu dòng.
     * Đã báo oan `g4-c6-l10#1`: gạch đầu dòng chỉ **liệt kê chủ đề** (“Dạng 3: Hình học: diện
     * tích hình bình hành, hình thoi”) chứ slide không hề nhận là đang vẽ hình đó.
     */
    chuChinh: true,
  },
  {
    id: "J · khối / hình khối",
    text: /khối (lập phương|hộp chữ nhật|trụ|cầu)|\bhình khối\b/i,
    ok: [
      "solid",
      "spatialScene",
      "shapePicture",
      "shapeJoin",
      "table",
      "planeShape",
      "planeShapes",
      "circleParts",
    ],
    why: "bài khối phải vẽ khối (bảng chỉ để LIỆT KÊ ví dụ thì hợp lệ)",
  },
  {
    id: "K · phân số",
    text: /phân số|một phần|1\/\d|1\/2|1\/3|1\/4/i,
    ok: [
      "fractionBar",
      "fractionCircle",
      "pieChart",
      "barModel",
      "numberScene",
      "table",
      "shapePicture",
      "planeShape",
      "planeShapes",
      "groupScene",
    ],
    why: "phân số phải vẽ phần được tô",
  },
  {
    id: "L · so sánh số (lớn hơn / bé hơn)",
    text: /số nào lớn hơn|số nào bé hơn|lớn hơn bao nhiêu|bé hơn bao nhiêu|dấu\s*(>|<)/i,
    ok: [
      "numberScene",
      "numberLine",
      "table",
      "placeValue",
      "barModel",
      "barChart",
      "groupScene",
      "motionDiagram",
    ],
    why: "so sánh phải thấy hai bên cạnh nhau",
  },
];

/** Gom MỌI chuỗi trong một slide — kể cả nhãn nằm TRONG props của hình (đó là chỗ hay sai nhất). */
function gomChu(v, out = []) {
  if (typeof v === "string") out.push(v);
  else if (Array.isArray(v)) v.forEach((x) => gomChu(x, out));
  else if (v && typeof v === "object")
    Object.values(v).forEach((x) => gomChu(x, out));
  return out;
}

const TEXT_FIELDS = [
  "text",
  "question",
  "title",
  "explanation",
  "rule",
  "badge",
  "mascotHint",
  "label",
];
void TEXT_FIELDS;

const perRule = new Map();
let soSlideCoHinh = 0;

/** Luật KIỂM CẤU TRÚC: hình tự nói về chính nó — sai số bên trong hình. */
function kiemCauTruc(v, chu) {
  const loi = [];
  const coTru = /bớt|trừ|giảm|lùi|nhỏ hơn|kém|làm tròn|ước lượng/i.test(
    chu || "",
  );
  if (v.numberLine) {
    const nl = v.numberLine;
    const from = Number(nl.from);
    const to = Number(nl.to);
    const marks = Array.isArray(nl.marks) ? nl.marks.map(Number) : [];
    if (!(from < to)) loi.push("tia số: from ≥ to");
    for (let i = 1; i < marks.length; i++) {
      if (!(marks[i] > marks[i - 1])) loi.push("tia số: marks không tăng dần");
    }
    if (marks.length && (marks[0] < from || marks[marks.length - 1] > to))
      loi.push("tia số: marks vượt khoảng");
    /**
     * SỐ ĐƯỢC VẼ = mọi mốc của nhịp `step` ∪ `marks` ∪ số ghi trên nhãn mũi tên.
     * Mũi tên chỉ bị coi là “trỏ vào số không có trên tia” khi số đó **thực sự không được vẽ**
     * (mốc nhịp vẫn được vẽ và ghi nhãn, chỉ là không tô đậm).
     */
    const stepN = Math.max(Number(nl.step) || 1, 1);
    const duocVe = new Set(marks);
    for (let x = from; x <= to + 1e-9; x += stepN)
      duocVe.add(Math.round(x * 1e6) / 1e6);
    for (const h of Array.isArray(nl.hops) ? nl.hops : []) {
      const lv = Number(String(h.label ?? "").replace(/[ .\u00a0]/g, ""));
      if (Number.isFinite(lv)) duocVe.add(lv);
    }
    for (const h of Array.isArray(nl.hops) ? nl.hops : []) {
      const nhan = String(h.label ?? "");
      const lui = /[−-]|xuống|lùi|bớt|trừ/.test(nhan) || coTru;
      if (!(Number(h.from) < Number(h.to)) && !lui)
        loi.push(
          `tia số: mũi tên ${h.from}→${h.to} đi NGƯỢC mà nhãn “${nhan}” không nói là bớt/trừ`,
        );
      if (Number(h.from) < from || Number(h.to) > to)
        loi.push(`tia số: mũi tên ${h.from}→${h.to} vượt khoảng vẽ`);
      /**
       * 🔴 ĐỘ DÀI CỦA PHÉP TÍNH KHÔNG PHẢI MỘT VỊ TRÍ TRÊN TRỤC.
       * Bài `g2-c12-l7` (`? + 145 = 320`) khai `marks: [145, 175, 320]`: 175 là ĐÁP ÁN
       * (hiệu số) mà lại được vẽ như một điểm nằm giữa 145 và 320 ⇒ bé thấy một con số
       * không biết để làm gì (người dùng hỏi 2026-09-24).
       */
      const span = Math.abs(Number(h.to) - Number(h.from));
      for (const m of marks) {
        if (m === span && m !== Number(h.from) && m !== Number(h.to))
          loi.push(
            `tia số: số ${m} đang vẽ như một VỊ TRÍ, nhưng nó chính là ĐỘ DÀI của phép tính ${h.from}→${h.to} (đáp án, không phải chỗ đứng trên trục)`,
          );
      }
      if (!duocVe.has(Number(h.from)) || !duocVe.has(Number(h.to)))
        loi.push(
          `tia số: mũi tên ${h.from}→${h.to} trỏ vào số KHÔNG có nhãn trên tia (marks: ${marks.join(", ")})`,
        );
    }
    /**
     * ⚠️ CHỈ xét NHÃN CỦA CHÍNH HÌNH (`nl.label` + nhãn mũi tên), KHÔNG xét chữ của slide:
     * chữ của slide có thể nhắc số của một phép tính khác (bài `g2-c8-l2` nói “10 : 2 = 5”
     * ⇒ số 5 KHÔNG cần có trên trục 0→20). Đã thử xét cả chữ slide: 23 báo động giả.
     */
    const soTrongChu =
      String(
        `${nl.label ?? ""} ${(nl.hops ?? []).map((h) => h.label ?? "").join(" ")}`,
      ).match(/\d{1,3}(?:[ .\u00a0]\d{3})+|\d+/g) ?? [];
    for (const raw of new Set(soTrongChu)) {
      const v = Number(String(raw).replace(/[ .\u00a0]/g, ""));
      if (!Number.isFinite(v) || v < from || v > to) continue;
      if (!duocVe.has(v))
        loi.push(
          `tia số: lời nhắc số ${v} (trong khoảng vẽ) mà hình KHÔNG vẽ số đó`,
        );
    }
  }
  if (v.table && Array.isArray(v.table.rows) && v.table.rows.length > 1) {
    const ds = [
      ...new Set(v.table.rows.map((r) => (Array.isArray(r) ? r.length : 0))),
    ];
    if (ds.length > 1)
      loi.push(`bảng: các hàng không đều nhau (${ds.join("/")} ô)`);
  }
  if (v.groupScene?.mode === "equalGroups" && v.groupScene.kind === "trays") {
    const g = v.groupScene;
    const n = Number(g.n);
    const k = Number(g.k);
    const pile = Number(g.pile) || 0;
    if (pile > 0 && n * k !== pile)
      loi.push(`khay: ${n} khay × ${k} = ${n * k} nhưng ghi tổng ${pile}`);
    if (g.hidePerGroup && pile === 0)
      loi.push("khay: giấu số mỗi khay mà không ghi tổng");
    if (!g.hidePerGroup && (n > 8 || k > 8))
      loi.push(`khay: n/k vượt 8 (n=${n}, k=${k}) — hình chỉ vẽ được tối đa 8`);
  }
  if (
    v.tenFrame &&
    v.tenFrame.filled !== undefined &&
    Number(v.tenFrame.filled) > 10
  ) {
    loi.push("khung 10: tô quá 10 ô");
  }
  /**
   * 🔴 FR · HÌNH PHÂN SỐ PHẢI CHỨNG MINH ĐƯỢC ĐIỀU CHỮ NÓI.
   * Người dùng phát hiện 4 ca (2026-09-24): “15/18 = 5/6” mà hình chỉ có 1 băng 18 ô;
   * “1/2 + 1/3 = 5/6” mà hình tô 5/6 sẵn (không thấy phép cộng); “1/3 của 12 = 4” mà hình
   * chỉ chia 3 phần (không thấy 12); chữ nói “bánh pizza” mà hình là băng giấy.
   */
  if (v.fractionBar || v.fractionCircle) {
    const bar = v.fractionBar || v.fractionCircle;
    const ds = Array.isArray(bar.rows) && bar.rows.length ? bar.rows : [bar];
    const chu = `${bar.label ?? ""} ${ds.map((r) => r.label ?? "").join(" ")}`;
    let coBang = false;
    for (const m of chu.matchAll(
      /(\d+)\s*\/\s*(\d+)\s*=\s*(\d+)\s*\/\s*(\d+)/g,
    )) {
      if (m[1] !== m[3] || m[2] !== m[4]) coBang = true;
    }
    if (coBang && ds.length < 2)
      loi.push(
        "phân số: chữ nói hai phân số BẰNG NHAU mà hình chỉ có MỘT băng ⇒ không thấy được vì sao bằng",
      );
    if (
      /\d+\s*\/\s*\d+\s*\+/.test(chu) &&
      ds.length < 2 &&
      !ds.some((r) => Number(r.extra) > 0)
    )
      loi.push(
        "phân số: chữ nói phép CỘNG mà hình không tô hai màu và không có hai băng ⇒ không thấy phép cộng",
      );
    for (const m of chu.matchAll(/(\d+)\s*\/\s*(\d+)\s*của\s*(\d+)/g)) {
      const soLuong = Number(m[3]);
      if (!ds.some((r) => Number(r.parts) === soLuong))
        loi.push(
          `phân số: chữ nói “${m[0]}” mà không băng nào chia ${soLuong} phần ⇒ không thấy số lượng`,
        );
    }
    if (
      /pizza|bánh|hình tròn|chiếc bánh/i.test(chu) &&
      v.fractionBar &&
      !v.fractionCircle
    )
      loi.push(
        "phân số: chữ nói “bánh / hình tròn” mà hình là BĂNG GIẤY ⇒ ẩn dụ không khớp hình",
      );
    if (/băng giấy|thước/i.test(chu) && v.fractionCircle && !v.fractionBar)
      loi.push(
        "phân số: chữ nói “băng giấy” mà hình là HÌNH TRÒN ⇒ ẩn dụ không khớp hình",
      );
  }
  return loi;
}

for (const [lop, data] of NGUON) {
  for (const chuong of data.chapters || []) {
    for (const bai of chuong.lessons || []) {
      const slides = bai.slides || [];
      slides.forEach((s, i) => {
        const c = s?.content;
        if (!c || typeof c !== "object") return;
        const keys = HINH_KEYS.filter((k) => c[k] && typeof c[k] === "object");
        /** `planeShapes` là mảng hình do `VisualBlock` vẽ riêng ⇒ tính là CÓ hình. */
        if (Array.isArray(c.planeShapes)) keys.push("planeShapes");
        if (keys.length === 0) return;
        soSlideCoHinh++;
        const chu = gomChu(c).join(" \n ");

        for (const l of kiemCauTruc(c, chu)) {
          if (!perRule.has("S · hình tự mâu thuẫn"))
            perRule.set("S · hình tự mâu thuẫn", []);
          perRule.get("S · hình tự mâu thuẫn").push({
            where: `${lop}/${bai.id}#${i}`,
            hinh: keys.join("+"),
            loi: l,
          });
        }

        /**
         * D · NHIỀU HÌNH TRONG MỘT SLIDE — chính sách “MỘT SLIDE = MỘT HÌNH” (chốt 2026-09-24).
         * Người dùng báo: “quá nhiều hình trong 1 khung và thêm phần diễn giải làm rối phần
         * hiển thị” ⇒ hai hình + chữ trong cùng khung là LỖI, phải tách.
         * Luật cũ (T2) chỉ là danh sách “cân nhắc tách” ⇒ nay thành luật cứng, phải im lặng.
         */
        if (keys.length >= 2) {
          if (!perRule.has("D · slide có nhiều hơn một hình"))
            perRule.set("D · slide có nhiều hơn một hình", []);
          perRule.get("D · slide có nhiều hơn một hình").push({
            where: `${lop}/${bai.id}#${i}`,
            hinh: keys.join("+"),
            loi: `${keys.length} hình trong cùng một slide (loại \`${s.type}\`) — phải tách mỗi slide một hình`,
          });
        }

        /**
         * T3 · KHOÁ HÌNH KHÔNG AI VẼ — dữ liệu có khoá nhưng không bộ vẽ nào dùng
         * ⇒ slide tưởng có hình mà thực ra TRỐNG. (Đã gặp: `comparison` ở `g4-c1-l5`.)
         */
        /**
         * ⚠️ Danh sách này phải kể cả các khoá do `LessonPage.jsx` tự vẽ (KHÔNG qua
         * `HINH_KEYS`): `clock`, `operation`, `comparison`, `shape`+`shapeLabel`,
         * `items`, `focusGraphic`, `example`. Bỏ sót chúng là báo oan 148 ca.
         */
        const KHONG_PHAI_HINH = new Set([
          "mascotMood",
          "text",
          "question",
          "title",
          "badge",
          "explanation",
          "rule",
          "points",
          "steps",
          "example",
          "options",
          "answer",
          "mascotHint",
          "visualDisplay",
          "items",
          "note",
          "label",
          "audioUrl",
          "clock",
          "operation",
          "comparison",
          "shape",
          "shapeLabel",
          "focusGraphic",
          "isTrue",
          "timeText",
          "planeShapes",
        ]);
        for (const k of Object.keys(c)) {
          const v = c[k];
          if (KHONG_PHAI_HINH.has(k) || HINH_KEYS.includes(k)) continue;
          if (!v || typeof v !== "object") continue;
          if (!perRule.has("T3 · khoá hình không ai vẽ"))
            perRule.set("T3 · khoá hình không ai vẽ", []);
          perRule.get("T3 · khoá hình không ai vẽ").push({
            where: `${lop}/${bai.id}#${i}`,
            hinh: k,
            loi: `khoá “${k}” không có trong HINH_KEYS ⇒ không bộ vẽ nào dựng hình này`,
          });
        }

        /**
         * Chữ CHÍNH = lời dẫn · tựa · đề bài · quy tắc (không kể `points`).
         * Luật nào bật `chuChinh` thì chỉ soi phần này — xem luật `I`.
         */
        const chuChinh = [c.text, c.title, c.question, c.rule]
          .filter((t) => typeof t === "string")
          .join(" \n ");

        for (const r of RULES) {
          const nguon = r.chuChinh ? chuChinh : chu;
          if (!r.text.test(nguon)) continue;
          if (keys.some((k) => r.ok.includes(k))) continue;
          if (!perRule.has(r.id)) perRule.set(r.id, []);
          perRule.get(r.id).push({
            where: `${lop}/${bai.id}#${i}`,
            hinh: keys.join("+"),
            loi: nguon.replace(/\s+/g, " ").slice(0, 150),
          });
        }

        /**
         * R · HÌNH TRÊN SLIDE CÂU HỎI MÀ LỘ ĐÁP ÁN.
         * Chỉ xét CHỮ CỦA CHÍNH HÌNH (nhãn, chú thích) — KHÔNG xét con số trên trục/bảng,
         * vì mốc trên trục là tự nhiên (bài “3 + ? = 7” có mốc 4 là bình thường).
         */
        if (s?.type === "quiz" && c.answer !== undefined) {
          const dap = String(c.answer).trim();
          if (/^\d+$/.test(dap)) {
            const loiNoi = gomChu(
              Object.fromEntries(keys.map((k) => [k, c[k]])),
            ).filter((t) => !/^\d+$/.test(t.trim()) && !/#/.test(t));
            const lo = new RegExp(`(^|[^\\d])${dap}([^\\d]|$)`);
            for (const t of loiNoi) {
              if (lo.test(t)) {
                if (!perRule.has("R · lộ đáp án trong hình"))
                  perRule.set("R · lộ đáp án trong hình", []);
                perRule.get("R · lộ đáp án trong hình").push({
                  where: `${lop}/${bai.id}#${i}`,
                  hinh: keys.join("+"),
                  loi: `đáp án ${dap} đã in trong hình: “${t.slice(0, 90)}”`,
                });
                break;
              }
            }
          }
        }
      });
    }
  }
}

console.log(`\nSlide có ít nhất 1 hình: ${soSlideCoHinh}\n`);
let tong = 0;
for (const id of [
  "T3 · khoá hình không ai vẽ",
  "D · slide có nhiều hơn một hình",
]) {
  const hits = perRule.get(id) || [];
  tong += hits.length;
  if (!hits.length) continue;
  console.log(`\n════ ${id} — ${hits.length} ca ════`);
  for (const h of hits.slice(0, 25))
    console.log(`   · ${h.where} [${h.hinh}] — ${h.loi}`);
  if (hits.length > 25) console.log(`   … và ${hits.length - 25} ca nữa`);
}
const sKey = perRule.get("S · hình tự mâu thuẫn") || [];
console.log(
  `\n════ S · hình tự mâu thuẫn (sai số bên trong hình) — ${sKey.length} ca ════`,
);
for (const h of sKey.slice(0, 20))
  console.log(`   · ${h.where} [${h.hinh}] — ${h.loi}`);
if (sKey.length > 20) console.log(`   … và ${sKey.length - 20} ca nữa`);
tong += sKey.length;
const rKey = perRule.get("R · lộ đáp án trong hình") || [];
if (rKey.length) {
  console.log(`\n════ R · lộ đáp án trong hình — ${rKey.length} ca ════`);
  for (const h of rKey.slice(0, 20))
    console.log(`   · ${h.where} [${h.hinh}] — ${h.loi}`);
  if (rKey.length > 20) console.log(`   … và ${rKey.length - 20} ca nữa`);
  tong += rKey.length;
}
for (const r of RULES) {
  const hits = perRule.get(r.id) || [];
  tong += hits.length;
  if (hits.length === 0) continue;
  console.log(`\n════ ${r.id} — ${hits.length} ca ════`);
  console.log(`   (${r.why})`);
  for (const h of hits.slice(0, 14)) {
    console.log(`   · ${h.where}  [hình: ${h.hinh}]`);
    console.log(`     lời: ${h.loi}`);
  }
  if (hits.length > 14) console.log(`   … và ${hits.length - 14} ca nữa`);
}
console.log(`\nTỔNG ca nghi ngờ: ${tong}`);
