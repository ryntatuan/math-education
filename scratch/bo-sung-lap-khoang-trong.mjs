/**
 * LƯỢT 4 — LẤP KHOẢNG TRỐNG CUỐI: bài còn dưới khung tối thiểu sau ba lượt.
 *
 * ĐO ĐƯỢC sau lượt 3: **88 bài** còn dưới khung, mà gần hết là bài **7 slide** — thiếu đúng
 * MỘT slide so với khung 8, hoặc thiếu một HÌNH (khung cần ≥2). Ví dụ `g1-c8-l8` (7 slide ·
 * 1 hình · 2 bước · 590 chữ). Đây là chỗ “sát đích” nên phải làm nốt, không để dở.
 *
 * KHUÔN BỔ SUNG — chọn theo đúng thứ còn thiếu:
 *   • Bài CÓ phép tính ⇒ thêm **tia số có cung nhảy** (chiến lược đếm thêm / làm tròn chục —
 *     cách nhẩm chuẩn quốc tế, xem `docs/ke-hoach-bo-sung-bai-hoc.md`) + 1 câu luyện CÙNG DẠNG
 *     nhưng nới điều kiện (chỉ cần cùng số chữ số) để không bị bỏ trống như lượt 1.
 *   • Bài KHÔNG có phép tính ⇒ thêm **bảng “ba điều cần nhớ”** (bảng chứ không phải đoạn văn)
 *     + 1 câu hỏi tự kiểm tra.
 *
 *   node scratch/bo-sung-lap-khoang-trong.mjs         # xem trước
 *   node scratch/bo-sung-lap-khoang-trong.mjs --ghi
 */
import {
  boSungChuong,
  layTatCaChuong,
  bonPhuongAn,
  ngauNhien,
} from "./lib-chen-slide.mjs";
import { demHinh } from "../client/src/components/visuals/visualKeys.js";

const MUON_GHI = process.argv.includes("--ghi");
const KHUNG = { slide: 8, hinh: 2, chu: 700 };
const BUOC =
  /hàng đơn vị|hàng chục|hàng trăm|viết \d+ nhớ|mượn 1|hạ \d|[Bb]ước \d|cách đổi|cách làm|đặt thước đúng vạch|đi xuống một bậc|tách số|đọc từ trái sang phải/i;

const gomChu = (v, ra = []) => {
  if (typeof v === "string") ra.push(v);
  else if (Array.isArray(v)) v.forEach((x) => gomChu(x, ra));
  else if (v && typeof v === "object")
    Object.values(v).forEach((x) => gomChu(x, ra));
  return ra;
};

const chiSo = (bai) => {
  const slides = bai.slides ?? [];
  const chu = slides
    .map((s) => gomChu(s.content).join(" ").replace(/\s+/g, " ").length)
    .reduce((a, b) => a + b, 0);
  const hinh = slides.filter((s) => demHinh(s.content) > 0).length;
  const buoc = slides.filter(
    (s) => s.content?.cotTinh || BUOC.test(gomChu(s.content).join(" ")),
  ).length;
  return { slide: slides.length, hinh, buoc, chu };
};

const DAU = { "+": "+", "-": "−", "−": "−", "×": "×", "*": "×" };
const tinh = (a, b, d) => (d === "+" ? a + b : d === "−" ? a - b : a * b);

/** Ví dụ tính toán đầu tiên trong bài (nới hơn lượt 1: chỉ cần đọc ra hai số và dấu). */
function viDuCua(bai) {
  for (const s of bai.slides ?? []) {
    const c = s?.content;
    if (!c || typeof c !== "object") continue;
    for (const n of [c.operation, c.cotTinh]) {
      const d = n && DAU[String(n.sign ?? "+")];
      if (n && d && Number(n.left) > 0 && Number(n.right) > 0)
        return { left: Number(n.left), right: Number(n.right), dau: d };
    }
    for (const chu of [
      c.rule,
      c.explanation,
      c.text,
      c.question,
      c.mascotHint,
    ]) {
      if (typeof chu !== "string") continue;
      const m = chu.match(/(\d+)\s*([+\-−×*])\s*(\d+)\s*=\s*(\d+)/);
      if (!m) continue;
      const d = DAU[m[2]];
      const a = Number(m[1]);
      const b = Number(m[3]);
      if (!d || a <= 0 || b <= 0) continue;
      if (tinh(a, b, d) !== Number(m[4])) continue;
      if (d === "−" && a <= b) continue;
      return { left: a, right: b, dau: d };
    }
  }
  return null;
}

/** Cặp số luyện CÙNG SỐ CHỮ SỐ với ví dụ (điều kiện nới — lượt 1 đã đòi cả “có nhớ/có mượn”). */
function capLuyen(dau, a, b, rnd) {
  const na = String(a).length;
  const nb = String(b).length;
  for (let lan = 0; lan < 300; lan += 1) {
    const x =
      na === 1
        ? 1 + Math.floor(rnd() * 8)
        : 10 + Math.floor(rnd() * (10 ** na - 10));
    const y =
      nb === 1
        ? 1 + Math.floor(rnd() * 8)
        : 10 + Math.floor(rnd() * (10 ** nb - 10));
    if (dau === "−" && x <= y) continue;
    const kq = tinh(x, y, dau);
    if (String(kq).length > String(tinh(a, b, dau)).length + 1) continue;
    return [x, y];
  }
  return null;
}

const BA_DIEU = [
  {
    tu: /hình|khối|góc|cạnh|đỉnh|diện tích|chu vi|thể tích/i,
    rows: [
      ["Gọi tên", "nói đúng tên hình/khối trước khi làm gì tiếp"],
      ["Đếm", "đếm cạnh, đếm đỉnh rồi so với đặc điểm đã học"],
      ["Kiểm tra", "dùng ê-ke hoặc thước để kiểm lại, không đoán bằng mắt"],
    ],
  },
  {
    tu: /đơn vị|cm|dm|kg|lít|mét|gam|giờ|phút|đồng|m²|m³/i,
    rows: [
      ["Đơn vị", "viết kết quả luôn kèm đơn vị"],
      ["Bậc thang", "đi xuống thì nhân, đi lên thì chia"],
      ["Kiểm lại", "lấy kết quả đổi ngược lại xem có về số ban đầu"],
    ],
  },
  {
    tu: /số|đọc|viết|so sánh|liền trước|liền sau/i,
    rows: [
      ["Số chữ số", "nhiều chữ số hơn thì số đó lớn hơn"],
      ["So từ trái", "so từng hàng từ trái sang phải, khác nhau thì dừng"],
      ["Đọc số", "đọc từ trái sang phải, hết mỗi lớp ba chữ số"],
    ],
  },
  {
    tu: /.*/,
    rows: [
      ["Đọc đề", "đọc kỹ, gạch dưới các số đã cho và câu hỏi"],
      ["Chọn phép tính", "thêm, gộp, tất cả thì cộng; bớt, cho đi thì trừ"],
      ["Thử lại", "làm phép ngược để chắc chắn kết quả đúng"],
    ],
  },
];

const baDieuCua = (bai) => {
  const chu = [bai.title, bai.description, ...gomChu(bai.slides ?? [])].join(
    " · ",
  );
  return BA_DIEU.find((x) => x.tu.test(chu)) ?? BA_DIEU[BA_DIEU.length - 1];
};

let soBai = 0;
let soSlide = 0;
const tatCa = await layTatCaChuong();

for (const chuong of tatCa) {
  const kq = boSungChuong(
    chuong,
    (b) => {
      const cs = chiSo(b);
      /**
       * 🔴 BÀI ĐỊNH HƯỚNG (buổi đầu, giới thiệu sách) KHÔNG sinh gì: người dùng đã báo lỗi
       * “tiết học đầu tiên mà đã có phép tính so sánh” — khuôn máy KHÔNG được dạy trước chương trình.
       */
      if (
        /tiết học đầu tiên|giới thiệu|biểu tượng|làm quen với sách|đồ dùng học toán|mở sách/i.test(
          `${b.title} ${b.description}`,
        )
      )
        return null;
      const thieuSlide = cs.slide < KHUNG.slide;
      const thieuHinh = cs.hinh < KHUNG.hinh;
      const thieuChu = cs.chu < KHUNG.chu;
      const thieuBuoc = cs.buoc < 1;
      if (!thieuSlide && !thieuHinh && !thieuChu && !thieuBuoc) return null;

      const v = viDuCua(b);
      const slides = [];
      const rnd = ngauNhien(`lap-${b.id}`);

      if (v && (thieuHinh || thieuSlide || thieuBuoc)) {
        // TIA SỐ có cung nhảy: chiến lược đếm thêm / làm tròn chục của đúng ví dụ trong bài.
        const { left, right, dau } = v;
        const kqT = tinh(left, right, dau);
        const hops = [];
        if (dau === "+") {
          const tronChuc = (Math.floor(left / 10) + 1) * 10;
          if (left % 10 !== 0 && tronChuc < kqT) {
            hops.push({
              from: left,
              to: tronChuc,
              label: `+${tronChuc - left}`,
            });
            hops.push({ from: tronChuc, to: kqT, label: `+${kqT - tronChuc}` });
          } else hops.push({ from: left, to: kqT, label: `+${right}` });
          slides.push({
            type: "visual",
            content: {
              numberLine: { from: left, to: kqT, step: 1, hops },
              text: [
                `Cách nhẩm nhanh cho ${left} + ${right}`,
                `Bé đếm thêm từng bước trên tia số theo các cung nhảy.`,
                hops.length === 2
                  ? `Đếm thêm ${hops[0].label.slice(1)} để được ${hops[0].to} (tròn chục), rồi thêm ${hops[1].label.slice(1)} nữa.`
                  : `Đếm thêm ${right} bước từ ${left}.`,
                `Vậy ${left} + ${right} = ${kqT}.`,
              ].join("\n"),
            },
          });
        } else if (dau === "−") {
          const tronChuc = (Math.floor(right / 10) + 1) * 10;
          if (right % 10 !== 0 && tronChuc < left) {
            hops.push({
              from: right,
              to: tronChuc,
              label: `+${tronChuc - right}`,
            });
            hops.push({
              from: tronChuc,
              to: left,
              label: `+${left - tronChuc}`,
            });
          } else
            hops.push({ from: right, to: left, label: `+${left - right}` });
          slides.push({
            type: "visual",
            content: {
              numberLine: { from: right, to: left, step: 1, hops },
              text: [
                `Cách 2 cho ${left} − ${right}: đếm thêm từ số bé`,
                `Từ ${right} đếm thêm cho tới ${left} là bao nhiêu bước?`,
                `Đó chính là hiệu: ${left} − ${right} = ${left - right}.`,
              ].join("\n"),
            },
          });
        }
      }

      if (
        slides.length === 0 ||
        thieuChu ||
        thieuBuoc ||
        cs.slide + slides.length < KHUNG.slide
      ) {
        const bd = baDieuCua(b);
        slides.push({
          type: "visual",
          content: {
            // Cột đầu ghi rõ “Bước 1/2/3”: bảng phải đọc ra được QUY TRÌNH, không chỉ là ba ghi chú.
            table: {
              headers: ["Bước", "Việc bé làm"],
              rows: bd.rows.map(([a, b2], i) => [`Bước ${i + 1} — ${a}`, b2]),
            },
            text: [
              "Ba bước làm bài — bé làm lần lượt",
              "Bé đọc bảng này trước khi làm, và đọc lại sau khi làm xong.",
              "Bỏ một bước là bài dễ sai.",
            ].join("\n"),
          },
        });
      }

      // Câu luyện / tự kiểm tra — luôn thêm để bài không kết thúc bằng phần đọc.
      if (v) {
        const cap = capLuyen(v.dau, v.left, v.right, rnd);
        if (cap) {
          const [x, y] = cap;
          const dung = tinh(x, y, v.dau);
          const lua = bonPhuongAn(dung, [dung + 1, dung - 1, dung + 10]);
          if (lua)
            slides.push({
              type: "quiz",
              content: {
                question: `${x} ${v.dau} ${y} bằng bao nhiêu?`,
                options: lua.options,
                answer: lua.answer,
                mascotHint: `Bé đặt tính rồi tính từ hàng đơn vị. Kết quả ${dung}.`,
              },
            });
        }
      } else {
        slides.push({
          type: "quiz",
          content: {
            question:
              "Làm xong một bài, bé nên làm gì để chắc chắn kết quả đúng?",
            options: [
              "Thử lại bằng phép tính ngược hoặc kiểm tra theo điều cần nhớ",
              "Nộp bài luôn cho nhanh",
              "Đoán lại một lần nữa",
            ],
            answer:
              "Thử lại bằng phép tính ngược hoặc kiểm tra theo điều cần nhớ",
            mascotHint:
              "Người tính giỏi luôn thử lại: cộng thì lấy kết quả trừ đi một số hạng.",
          },
        });
      }

      return slides;
    },
    { ghi: MUON_GHI },
  );
  if (kq.soBai)
    console.log(
      `${MUON_GHI ? "✍️" : "👀"} ${chuong.id} — ${kq.soBai} bài · ${kq.soSlide} slide`,
    );
  soBai += kq.soBai;
  soSlide += kq.soSlide;
}

console.log(
  `\n${MUON_GHI ? "ĐÃ GHI" : "XEM TRƯỚC"}: ${soBai} bài · ${soSlide} slide`,
);
if (!MUON_GHI) console.log("(thêm --ghi để ghi thật)");
