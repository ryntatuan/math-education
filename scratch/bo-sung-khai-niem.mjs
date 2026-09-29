/**
 * BỔ SUNG SLIDE CHO CÁC BÀI **KHÔNG PHẢI BÀI TÍNH THEO HÀNG** — số, hình học, đo lường,
 * bảng nhân/chia, thống kê, phân số.
 *
 * VÌ SAO CẦN RIÊNG: `bo-sung-tu-dong.mjs` sinh được slide “đặt tính + lời giải từng hàng”, nhưng
 * nó bỏ qua **296 bài** không có ví dụ tính (đếm số, nhận biết hình, đổi đơn vị, đọc bảng…).
 * Đo được sau lượt 1: còn **320 bài** dưới khung tối thiểu, trong đó **190 bài thiếu HÌNH** — mà
 * chính mấy bài khái niệm này mới cần hình nhất.
 *
 * MỖI NHÓM MỘT KHUÔN DẠY (lấy từ cách dạy chuẩn của SGK + app edu, xem `docs/ke-hoach-bo-sung-bai-hoc.md`):
 *   • `so`     — tách số theo hàng (khối chục–đơn vị hoặc bảng hàng) + mẹo so sánh/đọc số + câu hỏi số liền trước–sau.
 *   • `hinh`   — vẽ ĐÚNG hình của bài + bảng “đặc điểm cần nhớ” + câu hỏi nhận dạng.
 *   • `do`     — bảng “bậc thang đơn vị” của đúng đơn vị trong bài + cách đổi + câu hỏi đổi đơn vị.
 *   • `bang`   — in bảng nhân/chia của đúng số trong bài + mẹo thuộc + câu hỏi ngoài bảng đã in.
 *   • `thongke`— bảng số liệu nhỏ + cách đọc bảng + câu hỏi đọc số liệu.
 *   • `phan`   — thanh/hình tròn phân số + cách so sánh + câu hỏi.
 *
 *   node scratch/bo-sung-khai-niem.mjs            # xem trước
 *   node scratch/bo-sung-khai-niem.mjs --ghi      # ghi thật
 *   node scratch/bo-sung-khai-niem.mjs --chuong g1-c1 --ghi
 */
import {
  boSungChuong,
  layTatCaChuong,
  bonPhuongAn,
} from "./lib-chen-slide.mjs";

const MUON_GHI = process.argv.includes("--ghi");
const iChuong = process.argv.indexOf("--chuong");
const chuongChon =
  iChuong >= 0
    ? process.argv.slice(iChuong + 1).filter((x) => !x.startsWith("--"))
    : [];

/** Chương nào dạy khuôn nào. Chương không có trong bảng thì BỎ QUA (ôn tập, bài toán lời văn…). */
const NHOM = {
  // SỐ: đọc – viết – so sánh – cấu tạo số – số thập phân
  "g1-c1": "so",
  "g1-c6": "so",
  "g2-c10": "so",
  "g3-c8": "so",
  "g3-c11": "so",
  "g4-c3": "so",
  "g5-c2": "so",
  // HÌNH HỌC: hình phẳng – hình khối – góc – chu vi/diện tích/thể tích
  "g1-c2": "hinh",
  "g1-c4": "hinh",
  "g2-c5": "hinh",
  "g2-c9": "hinh",
  "g3-c3": "hinh",
  "g3-c9": "hinh",
  "g4-c2": "hinh",
  "g4-c6": "hinh",
  "g5-c5": "hinh",
  "g5-c9": "hinh",
  // ĐO LƯỜNG: độ dài – khối lượng – dung tích – thời gian – tiền – diện tích – thể tích
  "g1-c7": "do",
  "g1-c9": "do",
  "g2-c3": "do",
  "g2-c6": "do",
  "g2-c11": "do",
  "g3-c5": "do",
  "g3-c13": "do",
  "g4-c4": "do",
  "g5-c3": "do",
  "g5-c8": "do",
  "g5-c10": "do",
  // BẢNG NHÂN / BẢNG CHIA
  "g3-c2": "bang",
  // THỐNG KÊ – XÁC SUẤT
  "g2-c13": "thongke",
  "g3-c15": "thongke",
  "g4-c9": "thongke",
  "g5-c11": "thongke",
  // PHÂN SỐ
  "g4-c10": "phan",
  "g4-c11": "phan",
  "g4-c12": "phan",
};

// ───────────────────────── đọc dữ liệu có sẵn trong bài

const gomChu = (v, ra = []) => {
  if (typeof v === "string") ra.push(v);
  else if (Array.isArray(v)) v.forEach((x) => gomChu(x, ra));
  else if (v && typeof v === "object")
    Object.values(v).forEach((x) => gomChu(x, ra));
  return ra;
};

const chuCuaBai = (bai) =>
  [bai.title, bai.description, ...gomChu(bai.slides ?? [])]
    .join(" · ")
    // Bỏ số TRANG SÁCH (“(SGK tr.14–17)”, “tr.8”) — số trang không phải nội dung bài học.
    // Đã mắc: bài 1 mà phương án có số 6, 7 (là số trang) và bài “Các số 6, 7, 8, 9, 10” bị coi là bài số hai chữ số.
    .replace(/\(SGK[^)]*\)/g, " ")
    .replace(/\btr(?:ang)?\.?\s*\d+(?:\s*[–-]\s*\d+)?/gi, " ");

/** Các số xuất hiện trong bài, theo thứ tự xuất hiện (bỏ số 0 và số quá lớn). */
function soCuaBai(bai, { toiDa = 1_000_000 } = {}) {
  const chu = chuCuaBai(bai);
  const ra = [];
  for (const m of chu.matchAll(/(\d{1,3}(?:[\s.]\d{3})+|\d+)/g)) {
    const n = Number(m[1].replace(/[\s.]/g, ""));
    if (!Number.isFinite(n) || n <= 0 || n > toiDa) continue;
    if (!ra.includes(n)) ra.push(n);
    if (ra.length >= 12) break;
  }
  return ra;
}

// ───────────────────────── khuôn 1: SỐ

const HANG = ["Đơn vị", "Chục", "Trăm", "Nghìn", "Chục nghìn", "Trăm nghìn"];
const DOC_HANG = [
  "đơn vị",
  "chục",
  "trăm",
  "nghìn",
  "chục nghìn",
  "trăm nghìn",
];

/**
 * 🔴 BÀI “ĐỊNH HƯỚNG” — mới giới thiệu sách, bạn bè, biểu tượng, CHƯA dạy số nào.
 * Người dùng báo (2026-09-29, ảnh 1–3): bài “Tiết học đầu tiên” bị thêm câu hỏi
 * “Số nào LỚN NHẤT trong các số 1, 6, 7?” và “Số liền sau của số 1 là số nào?” ⇒ dạy trước khi học.
 */
const BAI_DINH_HUONG =
  /tiết học đầu tiên|giới thiệu|biểu tượng|làm quen với sách|đồ dùng học toán|mở sách/i;

/**
 * SỐ MỘT CHỮ SỐ ⇒ SO SÁNH BẰNG CÁCH ĐẾM.
 * 🔴 VÌ SAO PHẢI TÁCH RIÊNG: người dùng đọc slide “So sánh và đọc số cho nhanh” ở bài “Các số
 * 0, 1, 2, 3” và nói thẳng *“diễn giải tối nghĩa, trẻ không thể nào hiểu được, ngay cả người lớn
 * đọc cũng không hiểu gì”*. Lỗi ở chỗ: với hai số MỘT chữ số thì “đếm số chữ số” là vô nghĩa, còn
 * câu “so từng hàng từ trái, hàng đầu khác nhau đã quyết định” là chữ của người lớn.
 * Cách dạy đúng cho mức này: ĐẾM — số nào đếm đến sau thì lớn hơn.
 */
function baiSoNho(bai, ds) {
  const [a, b] = ds;
  const lon = Math.max(a, b);
  const be = Math.min(a, b);
  const slides = [
    {
      type: "concept",
      content: {
        badge: "Mẹo Nhớ",
        title: "So sánh hai số bằng cách đếm",
        explanation:
          "Ở mức này, cách chắc chắn nhất là ĐẾM: số nào đếm đến sau thì số đó lớn hơn.",
        points: [
          `Đếm từ 1: “1, 2, 3, 4, 5…” — số đếm đến sau thì lớn hơn. Ví dụ 5 đến sau 2 nên 5 lớn hơn 2.`,
          `Trên tia số, số đứng bên PHẢI lớn hơn số đứng bên TRÁI.`,
          `Ba dấu cần nhớ: “>” đọc là lớn hơn, “<” đọc là bé hơn, “=” đọc là bằng nhau.`,
          `Với hai số của bài này: ${be} < ${lon}, đọc là “${be} bé hơn ${lon}”.`,
        ],
      },
    },
  ];

  // Câu hỏi so sánh: phương án lấy TỪ CHÍNH các số trong bài, không bịa số ngoài phạm vi.
  const ung = [...new Set([...ds.slice(0, 4), lon, be])].filter((x) => x > 0);
  const lua = bonPhuongAn(lon, ung);
  if (lua)
    slides.push({
      type: "quiz",
      content: {
        question: `Số nào lớn hơn: ${a} hay ${b}?`,
        options: lua.options,
        answer: lua.answer,
        mascotHint: `Đếm từ 1: số ${lon} đếm đến sau số ${be}, nên ${lon} lớn hơn ${be}.`,
      },
    });

  return slides;
}

/** Ví dụ so sánh CỤ THỂ — nói đúng hàng nào khác nhau, không nói chữ của người lớn. */
function viDuSoSanh(be, lon) {
  const A = String(be);
  const B = String(lon);
  if (A.length !== B.length)
    return `${lon} có ${B.length} chữ số, ${be} có ${A.length} chữ số — số nào có ít chữ số hơn thì bé hơn.`;
  const TEN = ["đơn vị", "chục", "trăm", "nghìn", "chục nghìn", "trăm nghìn"];
  for (let i = 0; i < A.length; i += 1)
    if (A[i] !== B[i])
      return `hai số đều có ${A.length} chữ số, bé so từ trái sang phải — đến hàng ${TEN[A.length - 1 - i]} thì ${A[i]} < ${B[i]}, nên ${be} < ${lon}.`;
  return `hai số bằng nhau.`;
}

/**
 * MỨC ĐỘ CỦA BÀI = số lớn nhất trong ĐỀ BÀI (tiêu đề + mô tả).
 * 🔴 VÌ SAO KHÔNG DÙNG “số lớn nhất trong cả bài”: dữ liệu có số TRANG SÁCH (“(SGK tr.8)”)
 * và số trong ví dụ của chương sau ⇒ bài “Các số 0, 1, 2, 3” bị coi là bài số có hai chữ số và
 * bị dạy “đếm số chữ số” — đúng họ lỗi người dùng báo.
 */
function mucDoCua(bai, ds) {
  /**
   * ⚠️ Bỏ “Bài 4:” trước khi lấy số — số thứ tự bài KHÔNG phải mức độ của bài.
   * Và bài “Các số 6, 7, 8, 9, 10” vẫn là bài ĐẾM trong phạm vi 10 ⇒ ngưỡng là `<= 10`.
   */
  const de = `${bai.title} ${bai.description}`
    .replace(/Bài\s*\d+\s*:/gi, " ")
    .replace(/\(SGK[^)]*\)/g, " ")
    .replace(/\btr(?:ang)?\.?\s*\d+(?:\s*[–-]\s*\d+)?/gi, " ");
  const so = [...de.matchAll(/\d+/g)].map((m) => Number(m[0]));
  if (so.length) return Math.max(...so);
  return ds.length ? Math.max(...ds) : 0;
}

function baiSo(bai) {
  const ds = soCuaBai(bai);
  if (ds.length < 2) return null;
  const mucDo = mucDoCua(bai, ds);

  // (a) Bài định hướng (chưa học số) ⇒ KHÔNG dạy so sánh số.
  if (BAI_DINH_HUONG.test(`${bai.title} ${bai.description}`) && mucDo <= 10)
    return null;
  // (b) Chữ số La Mã: khoá riêng — “đếm số chữ số / so từng hàng” không đúng với số La Mã.
  if (/la mã/i.test(chuCuaBai(bai))) return null;
  // (c) Mức độ của bài chỉ tới số MỘT chữ số (hoặc 10) ⇒ đi đường “đếm”, không nói “số chữ số” và “hàng”.
  if (mucDo <= 10) return baiSoNho(bai, ds);

  const n = ds[0];
  const chuSo = [...String(n)].map(Number).reverse();
  if (chuSo.length > 6) return null;

  const slides = [];
  /**
   * SỐ THẬP PHÂN (lớp 5): đi đường riêng — `baseTen`/`placeValue` không có hàng phần mười.
   * Lấy số dạng `3,45` NGAY TRONG BÀI, không tự bịa.
   */
  const thapPhan = chuCuaBai(bai).match(/(\d+),(\d+)/);
  if (thapPhan) {
    const nguyen = thapPhan[1];
    const phan = thapPhan[2];
    const full = `${nguyen},${phan}`;
    slides.push({
      type: "visual",
      content: {
        table: {
          headers: ["Phần", "Gồm những chữ số nào"],
          rows: [
            ["Phần nguyên (trước dấu phẩy)", nguyen],
            ["Dấu phẩy", ","],
            ["Phần thập phân (sau dấu phẩy)", phan],
          ],
        },
        text: [
          `Số ${full} gồm phần nguyên và phần thập phân`,
          `phần nguyên ${nguyen}; sau dấu phẩy là ${phan}`,
          `Đọc: “${nguyen} phẩy ${phan}”.`,
        ].join("\n"),
      },
    });
    slides.push({
      type: "concept",
      content: {
        badge: "Ghi Nhớ",
        title: "Cấu tạo số thập phân",
        explanation:
          "Dấu phẩy ngăn phần nguyên và phần thập phân; mỗi chữ số sau dấu phẩy có một hàng riêng.",
        points: [
          `Chữ số đầu sau dấu phẩy là hàng PHẦN MƯỜI: ${full} có ${phan[0]} phần mười.`,
          `Chữ số thứ hai là hàng PHẦN TRĂM: ${full} có ${phan[1] ?? 0} phần trăm.`,
          "Hai số thập phân bằng nhau nếu viết thêm (hoặc bỏ) chữ số 0 tận cùng bên phải phần thập phân.",
          `So sánh số thập phân: so phần nguyên trước, bằng nhau thì so từng hàng sau dấu phẩy.`,
        ],
      },
    });
    const lua = bonPhuongAn(Number(nguyen), [
      Number(phan),
      Number(nguyen) + 1,
      Number(phan) + 1,
    ]);
    if (lua)
      slides.push({
        type: "quiz",
        content: {
          question: `Trong số ${full}, phần nguyên là số nào?`,
          options: lua.options,
          answer: lua.answer,
          mascotHint: `Phần nguyên là các chữ số trước dấu phẩy: ${nguyen}.`,
        },
      });
    return slides;
  }

  // 1. TÁCH SỐ THEO HÀNG — hình nhìn thấy được.
  if (n < 100) {
    slides.push({
      type: "visual",
      content: {
        baseTen: { tens: Math.floor(n / 10), ones: n % 10 },
        text: [
          `${n} gồm mấy chục và mấy đơn vị?`,
          `Bé đếm khối: ${Math.floor(n / 10)} thanh chục và ${n % 10} ô rời`,
          `Vậy ${n} = ${Math.floor(n / 10)} chục và ${n % 10} đơn vị`,
        ].join("\n"),
      },
    });
  } else {
    const headers = HANG.slice(0, chuSo.length).reverse();
    const digits = [...String(n)].map(Number);
    slides.push({
      type: "visual",
      content: {
        placeValue: { headers, digits },
        text: [
          `Tách số ${n} thành các hàng`,
          ...chuSo
            .map((d, i) => ({ d, i }))
            .filter((x) => x.d > 0)
            .reverse()
            .slice(0, 4)
            .map((x) => `${x.d} ${DOC_HANG[x.i]}`),
          `Đọc số: từ trái sang phải, hết mỗi lớp ba chữ số lại đọc tên lớp.`,
        ].join("\n"),
      },
    });
  }

  // 2. CÁCH SO SÁNH / ĐỌC SỐ — viết cho NGƯỜI HỌC LỚP NHỎ đọc được.
  const [a, b] = ds.slice(0, 2);
  const lon = Math.max(a, b);
  const be = Math.min(a, b);
  slides.push({
    type: "concept",
    content: {
      badge: "Mẹo Nhớ",
      title: "So sánh hai số cho đúng",
      explanation:
        "Muốn biết số nào lớn hơn, bé làm hai bước sau — không cần đếm lại từ đầu.",
      points: [
        `Bước 1 — đếm số chữ số: số nào có ít chữ số hơn thì số đó BÉ hơn (ví dụ 9 < 10).`,
        `Bước 2 — hai số cùng số chữ số: so chữ số đầu tiên bên TRÁI trước; số nào có chữ số ấy lớn hơn thì số đó lớn hơn. Bằng nhau thì so chữ số tiếp theo.`,
        `Ví dụ: ${viDuSoSanh(be, lon)}`,
        `Số liền sau = số đó thêm 1; số liền trước = số đó bớt 1.`,
      ],
    },
  });

  // 3. CÂU LUYỆN: số liền sau (bé phải +1, sai thường là quên nhớ).
  const dung = n + 1;
  const lua = bonPhuongAn(dung, [n, n + 2, n + 10]);
  if (lua)
    slides.push({
      type: "quiz",
      content: {
        question: `Số liền sau của số ${n} là số nào?`,
        options: lua.options,
        answer: lua.answer,
        mascotHint: `Số liền sau hơn số đã cho 1 đơn vị: ${n} + 1 = ${dung}.`,
      },
    });

  // 4. CÂU LUYỆN 2 — kỹ năng KHÁC: so sánh để tìm số lớn nhất.
  if (ds.length >= 3) {
    const bon = ds.slice(0, 4);
    const lonNhat = Math.max(...bon);
    slides.push({
      type: "quiz",
      content: {
        question: `Số nào LỚN NHẤT trong các số sau: ${bon.join(", ")}?`,
        options: [...bon].sort((a, b) => a - b).map(String),
        answer: String(lonNhat),
        mascotHint: `Bé so chữ số đầu tiên bên trái của các số, bằng nhau thì so chữ số tiếp theo — số lớn nhất là ${lonNhat}.`,
      },
    });
  }

  return slides;
}

/**
 * BẢNG HÌNH — mỗi dòng phải khớp ĐÚNG bộ vẽ:
 *   • hình phẳng: `planeShape.kind` — giá trị có thật trong dữ liệu (square, circle, triangle, rectangle,
 *     trapezoid, segment, line, pointsOnly) — xem `geometry/hinhPhang.jsx` + `geometryData.jsx`.
 *   • khối: `solid.kind` — CHỈ có 4 giá trị vẽ được: cube, cuboid, cylinder, sphere (SOLID_NAME).
 *     Sai khoá thì bộ vẽ lặng lẽ vẽ một khối hộp chữ nhật ⇒ bé học sai hình mà không có lỗi nào bung ra.
 *   • `dinh: true` ⇒ thêm chấm + nhãn “đỉnh” trên hình (trẻ phải ĐẾM được đỉnh, không chỉ đọc chữ).
 */
const HINH = [
  {
    tu: /khối lập phương|hình lập phương|xúc xắc|rubik/i,
    kind: "cube",
    khoi: true,
    ten: "khối lập phương",
    dinh: false,
    dac: ["6 mặt đều là hình vuông bằng nhau", "8 đỉnh", "12 cạnh bằng nhau"],
    kiem: "đếm mặt, đếm đỉnh, đếm cạnh",
  },
  {
    tu: /hộp chữ nhật|quyển sách|viên gạch|hộp sữa/i,
    kind: "cuboid",
    khoi: true,
    ten: "khối hộp chữ nhật",
    dinh: false,
    dac: ["6 mặt, mỗi mặt là hình chữ nhật", "8 đỉnh", "12 cạnh"],
    kiem: "đếm mặt, đếm đỉnh, đếm cạnh",
  },
  {
    tu: /khối trụ|hình trụ|lon nước|cái ống|hộp sữa đặc/i,
    kind: "cylinder",
    khoi: true,
    ten: "khối trụ",
    dinh: false,
    dac: [
      "hai mặt đáy là hai hình tròn bằng nhau",
      "không có đỉnh",
      "lăn được theo một hướng",
    ],
    kiem: "đếm mặt, đếm đỉnh",
  },
  {
    tu: /khối cầu|quả bóng|hòn bi|quả địa cầu/i,
    kind: "sphere",
    khoi: true,
    ten: "khối cầu",
    dinh: false,
    dac: [
      "không có đỉnh, không có cạnh",
      "lăn được theo mọi hướng",
      "mặt ngoài là mặt cong",
    ],
    kiem: "đếm mặt, đếm đỉnh",
  },
  {
    tu: /hình vuông|viên gạch lát nền/i,
    kind: "square",
    khoi: false,
    ten: "hình vuông",
    dinh: true,
    dac: ["4 cạnh dài bằng nhau", "4 góc vuông", "hai đường chéo bằng nhau"],
    kiem: "đếm cạnh, đếm đỉnh",
  },
  {
    tu: /hình tròn|mặt đồng hồ/i,
    kind: "circle",
    khoi: false,
    ten: "hình tròn",
    dinh: false,
    dac: [
      "không có cạnh, không có đỉnh",
      "tâm là điểm chính giữa",
      "đường kính gấp đôi bán kính",
    ],
    kiem: "tìm tâm, đo bán kính",
  },
  {
    tu: /tam giác/i,
    kind: "triangle",
    khoi: false,
    ten: "hình tam giác",
    dinh: true,
    dac: ["3 cạnh", "3 đỉnh", "3 góc"],
    kiem: "đếm cạnh, đếm đỉnh",
  },
  {
    tu: /chữ nhật/i,
    kind: "rectangle",
    khoi: false,
    ten: "hình chữ nhật",
    dinh: true,
    dac: [
      "4 góc vuông",
      "hai cặp cạnh dài bằng nhau",
      "cạnh dài là chiều dài, cạnh ngắn là chiều rộng",
    ],
    kiem: "đếm cạnh, đếm đỉnh",
  },
  {
    tu: /hình thang/i,
    kind: "trapezoid",
    khoi: false,
    ten: "hình thang",
    dinh: true,
    dac: [
      "có một cặp cạnh song song",
      "hai cạnh song song gọi là hai đáy",
      "đường cao là khoảng cách giữa hai đáy",
    ],
    kiem: "đếm cạnh, tìm hai đáy",
  },
  {
    tu: /góc nhọn/i,
    kieu: "angle",
    kind: "acute",
    khoi: false,
    ten: "góc nhọn",
    dinh: false,
    dac: [
      "bé hơn góc vuông",
      "hai cạnh của góc là hai tia chung gốc",
      "đỉnh của góc là gốc chung đó",
    ],
    kiem: "đặt ê-ke sao cho một cạnh trùng với một cạnh của góc",
  },
  {
    tu: /góc tù/i,
    kieu: "angle",
    kind: "obtuse",
    khoi: false,
    ten: "góc tù",
    dinh: false,
    dac: [
      "lớn hơn góc vuông nhưng bé hơn góc bẹt",
      "hai cạnh của góc là hai tia chung gốc",
      "đỉnh của góc là gốc chung đó",
    ],
    kiem: "đặt ê-ke sao cho một cạnh trùng với một cạnh của góc",
  },
  {
    tu: /góc bẹt/i,
    kieu: "angle",
    kind: "straight",
    khoi: false,
    ten: "góc bẹt",
    dinh: false,
    dac: ["bằng hai góc vuông", "hai cạnh của góc là hai tia đối nhau"],
    kiem: "đặt ê-ke rồi so với hai góc vuông",
  },
  {
    tu: /góc vuông/i,
    kieu: "angle",
    kind: "right",
    khoi: false,
    ten: "góc vuông",
    dinh: false,
    dac: ["đúng bằng góc của ê-ke", "hai cạnh của góc vuông góc với nhau"],
    kiem: "đặt ê-ke vào góc, nếu trùng khít là góc vuông",
  },
  {
    tu: /đoạn thẳng/i,
    kieu: "pointLine",
    kind: "segment",
    khoi: false,
    ten: "đoạn thẳng",
    dinh: false,
    dac: [
      "hai đầu mút, thường gọi là A và B",
      "đo được độ dài",
      "đoạn thẳng ngắn nhất nối hai điểm đó",
    ],
    kiem: "đặt thước đúng vạch 0 rồi đọc số",
  },
  {
    tu: /đường thẳng/i,
    kieu: "pointLine",
    kind: "line",
    khoi: false,
    ten: "đường thẳng",
    dinh: false,
    dac: [
      "kéo dài mãi về hai phía",
      "không đo được độ dài",
      "qua hai điểm vẽ được một đường thẳng",
    ],
    kiem: "dùng thước thẳng kéo dài hai phía",
  },
];

/** Hình học: chọn hình THEO ĐÚNG chữ trong bài, không đoán bừa. */
function baiHinh(bai) {
  const chu = chuCuaBai(bai);
  const hinh = HINH.find((h) => h.tu.test(chu));
  if (!hinh) return null;
  const slides = [];

  // 1. VẼ ĐÚNG HÌNH CỦA BÀI — dùng ĐÚNG khoá mà bộ vẽ có.
  /**
   * 🔴 ĐÃ MẮC: sinh `planeShape: { kind: "segment" }` cho bài đoạn thẳng ⇒ cổng `kiem-tra-slide`
   * báo **11 slide “kind không có bộ vẽ”**. Các khoá đúng:
   *   • hình phẳng (vuông, tròn, tam giác, chữ nhật, thang) → `planeShape`
   *   • khối → `solid`
   *   • điểm/đoạn thẳng/đường thẳng → `pointLine` (kèm `points`, `formula`)
   *   • góc → `angle` (kèm `degrees`, `vertexLetter`, `armLetters`)
   */
  const hinhVe = hinh.khoi
    ? { solid: { kind: hinh.kind } }
    : hinh.kieu === "pointLine"
      ? {
          pointLine: {
            kind: hinh.kind,
            points: ["A", "B"],
            formula: `${hinh.ten} AB`,
          },
        }
      : hinh.kieu === "angle"
        ? {
            angle: {
              kind: hinh.kind,
              degrees:
                hinh.kind === "right"
                  ? 90
                  : hinh.kind === "straight"
                    ? 180
                    : hinh.kind === "acute"
                      ? 40
                      : 130,
              vertexLetter: "O",
              armLetters: ["A", "B"],
            },
          }
        : {
            planeShape: {
              kind: hinh.kind,
              ...(hinh.dinh ? { vertices: true, vertexLabel: "đỉnh" } : {}),
            },
          };
  slides.push({
    type: "visual",
    content: {
      ...hinhVe,
      text: [
        `${hinh.ten} bé học hôm nay có gì đặc biệt?`,
        ...hinh.dac.slice(0, 2).map((d) => `· ${d}`),
        `Bé ${hinh.kiem} ngay trên hình vẽ rồi đọc lại hai đặc điểm trên nhé.`,
      ].join("\n"),
    },
  });

  // 2. ĐẶC ĐIỂM CẦN NHỚ.
  slides.push({
    type: "concept",
    content: {
      badge: "Ghi Nhớ",
      title: `Đặc điểm của ${hinh.ten}`,
      explanation: `Nhìn hình và gọi tên đúng là bước đầu; bước sau là nêu được đặc điểm của ${hinh.ten}.`,
      // Bỏ “có” ở đầu từng đặc điểm; nếu đặc điểm bắt đầu bằng “không” thì KHÔNG chèn “có”
      // (đã mắc: “hình tròn có không có cạnh, không có đỉnh” — người dùng báo lỗi chữ).
      points: [
        ...hinh.dac.map((d) => {
          const sach = d.replace(/^có\s+/i, "");
          return sach.startsWith("không")
            ? `${hinh.ten} ${sach}.`
            : `${hinh.ten} có ${sach}.`;
        }),
        `Cách kiểm tra: bé ${hinh.kiem}; nếu đếm ra khác các đặc điểm trên thì đã nhìn nhầm hình.`,
      ],
    },
  });

  // 3. CÂU HỎI NHẬN DẠNG — phương án lấy từ CÁC HÌNH CÓ TRONG BÀI.
  const tenHinhTrongBai = HINH.filter((h) => h.tu.test(chu)).map(
    (h) => `hình ${h.ten.replace("hình ", "")}`,
  );
  const khac = HINH.map((h) => `hình ${h.ten.replace("hình ", "")}`).filter(
    (t) => t !== `hình ${hinh.ten.replace("hình ", "")}`,
  );
  const luaChon = [hinh.ten, ...khac.slice(0, 3)];
  /**
   * GHÉP ĐẶC ĐIỂM VÀO CÂU HỎI CHO ĐÚNG TIẾNG VIỆT.
   * 🔴 Đã mắc: “Hình nào **có** không có cạnh, không có đỉnh?” (khuôn ghép cứng chữ “có”).
   * Đặc điểm mở đầu bằng “không…” thì câu hỏi bỏ chữ “có”: “Hình nào không có cạnh, không có đỉnh?”.
   */
  const hoiVe = (dac) => {
    const sach = dac.replace(/^có\s+/i, "");
    return sach.startsWith("không")
      ? `Hình nào ${sach}?`
      : `Hình nào có ${sach}?`;
  };
  const keDacDiem = () =>
    hinh.dac
      .map((d) => {
        const sach = d.replace(/^có\s+/i, "");
        return sach.startsWith("không")
          ? `không có ${sach.replace(/^không\s+có\s+/i, "")}`
          : sach;
      })
      .join(" · ");
  slides.push({
    type: "quiz",
    content: {
      question: hoiVe(hinh.dac[0]),
      options: luaChon,
      answer: hinh.ten,
      mascotHint: `${hinh.ten}: ${keDacDiem()}.`,
    },
  });

  if (tenHinhTrongBai.length >= 2)
    slides.push({
      type: "quiz",
      content: {
        question: `Trong bài hôm nay có ${tenHinhTrongBai.join(" và ")}. ${hoiVe(hinh.dac[1] ?? hinh.dac[0])}`,
        options: luaChon,
        answer: hinh.ten,
        mascotHint: `Đáp án là ${hinh.ten}: ${keDacDiem()}.`,
      },
    });

  return slides;
}

// ───────────────────────── khuôn 3: ĐO LƯỜNG

/**
 * BẬC THANG ĐƠN VỊ — MỖI BƯỚC MỘT HỆ SỐ RIÊNG, không dùng chung một hệ số.
 * 🔴 ĐÃ MẮC (cổng `soat-phep-tinh` bắt được): bảng khối lượng dùng `he: 10` cho cả thang ⇒
 * slide dạy sai **“1 kg = 10 g”**. Thật ra kg → g là **1000**. Tương tự `l → ml` là 1000
 * (một bước), nên câu “nhân hai lần” cũng phải bỏ khi thang chỉ có hai đơn vị.
 * Cấu trúc: `hang: [[đơn vị, hệ số xuống đơn vị liền sau], …, [đơn vị cuối]]`.
 */
const BAC_THANG = [
  {
    tu: /km|ki-lô-mét|hm|dam/i,
    ten: "độ dài",
    hang: [
      ["km", 10],
      ["hm", 10],
      ["dam", 10],
      ["m", 10],
      ["dm", 10],
      ["cm", 10],
      ["mm"],
    ],
  },
  {
    tu: /mét|cm|dm|mm/i,
    ten: "độ dài",
    hang: [["m", 10], ["dm", 10], ["cm", 10], ["mm"]],
  },
  {
    tu: /tấn|tạ|yến|kg|ki-lô-gam|gam/i,
    ten: "khối lượng",
    hang: [["tấn", 10], ["tạ", 10], ["yến", 10], ["kg", 1000], ["g"]],
  },
  { tu: /lít|ml|mi-li-lít/i, ten: "dung tích", hang: [["l", 1000], ["ml"]] },
  {
    tu: /m³|dm³|cm³|mét khối|xăng-ti-mét khối/i,
    ten: "thể tích",
    hang: [["m³", 1000], ["dm³", 1000], ["cm³"]],
  },
  {
    tu: /m²|dm²|cm²|mét vuông|xăng-ti-mét vuông/i,
    ten: "diện tích",
    hang: [["m²", 100], ["dm²", 100], ["cm²"]],
  },
  {
    tu: /giờ|phút|giây/i,
    ten: "thời gian",
    hang: [["giờ", 60], ["phút", 60], ["giây"]],
  },
];

function baiDo(bai) {
  const chu = chuCuaBai(bai);
  let don = null;
  for (const b of BAC_THANG) {
    if (!b.tu.test(chu)) continue;
    const diem = [...chu.matchAll(new RegExp(b.tu.source, "gi"))].length;
    if (!don || diem > don.diem) don = { ...b, diem };
  }
  if (!don) return null;

  /**
   * 🔴 BÀI SO SÁNH ĐỊNH TÍNH KHÔNG DÙNG BẬC THANG ĐƠN VỊ.
   * Đã mắc: bài “Cao hơn, thấp hơn” (Lớp 1 CĐ7) bị gắn bảng “bậc thang m – dm – cm – mm” —
   * bài đó so sánh bằng mắt thường, chưa nói tới đơn vị nào.
   */
  const dinhTinh = /cao hơn|thấp hơn|dài hơn|ngắn hơn|nặng hơn|nhẹ hơn/i.test(
    bai.title ?? "",
  );
  const coDonVi =
    /\d+\s*(cm|dm|mm|km|m|kg|g|l|ml)\b|đơn vị đo|xăng-ti-mét|ki-lô-gam/i.test(
      chu,
    );
  if (dinhTinh && !coDonVi) return null;

  /**
   * BẢNG SỰ KIỆN (lịch · tiền): chép đúng các con số SỰ THẬT của đời sống, không suy diễn
   * theo “bậc thang” — vì lịch và tiền không đi theo hệ số đều nhau.
   */
  if (don.kieu === "facts") {
    const slides = [
      {
        type: "visual",
        content: {
          table: { headers: ["Điều cần nhớ", "Nội dung"], rows: don.rows },
          text: [
            `Bảng cần nhớ về ${don.ten}`,
            `Bé đọc từng dòng: bên trái là “cái gì”, bên phải là “bằng bao nhiêu”.`,
            `Ba điều dễ nhầm nhất: 1 tuần = 7 ngày · 1 năm = 12 tháng · 1 thế kỉ = 100 năm.`,
          ].join("\n"),
        },
      },
      {
        type: "concept",
        content: {
          badge: "Mẹo Nhớ",
          title: `Ghi nhớ về ${don.ten}`,
          explanation: `Mấy con số này bé dùng hằng ngày, nên nhớ chắc sẽ rất tiện.`,
          points: don.rows.slice(0, 4).map(([a, b2]) => `${a}: ${b2}.`),
        },
      },
    ];
    for (const c of don.cau) {
      const lua = bonPhuongAn(c.dap, c.nhieu);
      if (!lua) continue;
      slides.push({
        type: "quiz",
        content: {
          question: c.hoi,
          options: lua.options,
          answer: lua.answer,
          mascotHint: c.viSao,
        },
      });
    }
    return slides;
  }

  if (don.hang.length < 2) return null;
  const slides = [];
  const ten = don.hang.map(([u]) => u);
  const buoc = don.hang
    .slice(0, -1)
    .map(([u, he], i) => ({ u, he, sau: don.hang[i + 1][0] }));

  // 1. BẢNG BẬC THANG ĐƠN VỊ — hệ số của TỪNG bước, không suy diễn.
  slides.push({
    type: "visual",
    content: {
      table: {
        headers: ["Đơn vị", "Bằng bao nhiêu đơn vị liền sau"],
        rows: buoc.map((b) => [`1 ${b.u}`, `${b.he} ${b.sau}`]),
      },
      text: [
        `Bậc thang đơn vị đo ${don.ten}`,
        ...ten.map((u) => `· ${u}`),
        `Đi XUỐNG một bậc thì nhân hệ số của bậc đó; đi LÊN một bậc thì chia.`,
      ].join("\n"),
    },
  });

  // 2. CÁCH ĐỔI — ba ví dụ đều TÍNH TỪ hệ số thật của thang.
  const d1 = buoc[0];
  const d2 = buoc[1] ?? null;
  const haiBuoc = d2 ? d1.he * d2.he : null;
  slides.push({
    type: "concept",
    content: {
      badge: "Mẹo Nhớ",
      title: `Cách đổi đơn vị đo ${don.ten}`,
      explanation: `Bé chỉ cần nhớ đúng BẬC THANG đơn vị rồi nhân hoặc chia theo hệ số của từng bậc.`,
      points: [
        `1 ${d1.u} = ${d1.he} ${d1.sau}.`,
        haiBuoc
          ? `Đi xuống hai bậc thì nhân hai lần: 1 ${d1.u} = ${d1.he} × ${d2.he} = ${haiBuoc} ${d2.sau}.`
          : `Thang này chỉ có hai đơn vị, nên chỉ có một phép đổi: 1 ${d1.u} = ${d1.he} ${d1.sau}.`,
        `Đổi số lớn ra số bé: NHÂN. Ví dụ 2 ${d1.u} = ${2 * d1.he} ${d1.sau}.`,
        `Đổi số bé ra số lớn: CHIA. Ví dụ ${d1.he * 3} ${d1.sau} = 3 ${d1.u}.`,
      ],
    },
  });

  // 3. CÂU LUYỆN ĐỔI ĐƠN VỊ — một bậc, hệ số đúng.
  const dung = d1.he;
  const lua = bonPhuongAn(dung, [
    dung * 10,
    Math.max(1, Math.floor(dung / 10)),
    haiBuoc ?? dung + 1,
  ]);
  if (lua)
    slides.push({
      type: "quiz",
      content: {
        question: `1 ${d1.u} bằng bao nhiêu ${d1.sau}?`,
        options: lua.options,
        answer: lua.answer,
        mascotHint: `Hai đơn vị liền nhau: 1 ${d1.u} = ${d1.he} ${d1.sau}.`,
      },
    });
  // 4. CÂU LUYỆN 2 — đổi từ SỐ SANG ĐƠN VỊ BÉ HƠN (khác câu 1 chỉ hỏi 1 đơn vị bằng bao nhiêu).
  const dung2 = 3 * d1.he;
  const lua2 = bonPhuongAn(dung2, [d1.he, 30 * d1.he, dung2 + d1.he]);
  if (lua2)
    slides.push({
      type: "quiz",
      content: {
        question: `3 ${d1.u} bằng bao nhiêu ${d1.sau}?`,
        options: lua2.options,
        answer: lua2.answer,
        mascotHint: `Đổi số lớn ra số bé thì nhân: 3 × ${d1.he} = ${dung2}.`,
      },
    });
  return slides;
}

// ───────────────────────── khuôn 4: BẢNG NHÂN / BẢNG CHIA

function baiBang(bai) {
  const chu = chuCuaBai(bai);
  const m = chu.match(/bảng nhân (\d+)|bảng chia (\d+)/i);
  const n = m ? Number(m[1] ?? m[2]) : null;
  if (!n || n < 2 || n > 9) return null;
  const laChia = /bảng chia/i.test(chu);
  const slides = [];

  if (!laChia) {
    slides.push({
      type: "visual",
      content: {
        table: {
          headers: ["Phép nhân", "Kết quả"],
          rows: Array.from({ length: 5 }, (_, i) => [
            `${n} × ${i + 1}`,
            String(n * (i + 1)),
          ]),
        },
        text: [
          `Bảng nhân ${n} — năm dòng đầu`,
          `Mỗi dòng thêm ${n} so với dòng trên.`,
          `Bé học thuộc bằng cách cộng thêm ${n} chứ đừng đọc vẹt.`,
        ].join("\n"),
      },
    });
  } else {
    slides.push({
      type: "visual",
      content: {
        table: {
          headers: ["Phép chia", "Kết quả"],
          rows: Array.from({ length: 5 }, (_, i) => [
            `${n * (i + 1)} : ${n}`,
            String(i + 1),
          ]),
        },
        text: [
          `Bảng chia ${n} đi ngược từ bảng nhân ${n}`,
          `${n} × 2 = ${n * 2} nên ${n * 2} : ${n} = 2`,
          `Muốn biết ${n * 6} : ${n}, bé tự hỏi: ${n} nhân mấy bằng ${n * 6}?`,
        ].join("\n"),
      },
    });
  }

  slides.push({
    type: "concept",
    content: {
      badge: "Mẹo Nhớ",
      title: `Cách thuộc ${laChia ? "bảng chia" : "bảng nhân"} ${n}`,
      explanation: laChia
        ? `Bảng chia ${n} không cần học riêng: bé tra ngược bảng nhân ${n} là ra.`
        : `Bảng nhân ${n} nhớ nhanh nhất khi bé thấy nó lớn dần đều thêm ${n}.`,
      points: [
        laChia
          ? `${n} × k = tích, thì tích : ${n} = k.`
          : `${n} × 1 = ${n}; mỗi bước tiếp theo cộng thêm ${n}.`,
        `${n} × 5 = ${n * 5}; ${n} × 10 = ${n * 10}.`,
        `Học thuộc rồi thì đọc ngược lại cũng được: ${n * 5} : ${n} = 5.`,
        `Đọc thành tiếng 3 lần mỗi dòng, rồi tự che kết quả để tự kiểm tra.`,
      ],
    },
  });

  const dung = laChia ? 6 : n * 6;
  const cau = laChia
    ? `${n * 6} : ${n} bằng bao nhiêu?`
    : `${n} × 6 bằng bao nhiêu?`;
  const lua = bonPhuongAn(dung, laChia ? [5, 7, 4] : [n * 5, n * 7, n * 6 + n]);
  if (lua)
    slides.push({
      type: "quiz",
      content: {
        question: cau,
        options: lua.options,
        answer: lua.answer,
        mascotHint: laChia
          ? `Vì ${n} × 6 = ${n * 6} nên ${n * 6} : ${n} = 6.`
          : `${n} × 6 = ${n * 5} + ${n} = ${dung}.`,
      },
    });

  // 4. CÂU LUYỆN 2 — hỏi CHIỀU NGƯỢC LẠI (nhân ↔ chia) để bé thấy hai phép liên quan nhau.
  const dung2 = laChia ? n * 7 : 7;
  const cau2 = laChia
    ? `${n} × 7 bằng bao nhiêu?`
    : `${n * 7} : ${n} bằng bao nhiêu?`;
  const lua2 = bonPhuongAn(
    dung2,
    laChia ? [n * 6, n * 8, n * 7 - n] : [6, 8, 7 * n],
  );
  if (lua2)
    slides.push({
      type: "quiz",
      content: {
        question: cau2,
        options: lua2.options,
        answer: lua2.answer,
        mascotHint: laChia
          ? `${n} × 7 = ${n * 7} — bé cộng thêm ${n} vào ${n * 6}.`
          : `Vì ${n} × 7 = ${n * 7} nên ${n * 7} : ${n} = 7.`,
      },
    });

  return slides;
}

function baiThongKe(bai) {
  /**
   * 🔴 ƯU TIÊN BẢNG CÓ THẬT TRONG BÀI. Bản đầu tự lấy ba số bất kỳ trong bài rồi gọi là
   * “Nhóm 1/2/3” ⇒ bảng TRÔNG như số liệu thật mà thực ra vô nghĩa (bài nói về “số cây trồng”
   * mà bảng ghi “Nhóm 2: 7”). Nay: chép lại đúng `table` của bài nếu bài đã có; chỉ khi bài
   * không có bảng nào mới rơi về ví dụ và NÓI RÕ đó là ví dụ.
   */
  const bangCoThat = [];
  for (const s of bai.slides ?? []) {
    const t = s?.content?.table;
    if (t && Array.isArray(t.headers) && Array.isArray(t.rows))
      if (
        t.rows.length >= 2 &&
        t.rows.every((r) => Array.isArray(r) && r.length >= 2)
      )
        bangCoThat.push(t);
  }
  const soTrongBang = (t) =>
    t.rows
      .flat()
      .map((x) => Number(String(x).replace(/[^\d]/g, "")))
      .filter((n) => Number.isFinite(n) && n > 0);
  const bang = bangCoThat[0] ?? null;
  /**
   * 🔴 KHÔNG BỊA BẢNG: bài không có bảng số liệu thật thì BỎ QUA.
   * Đã mắc: bảng “Nhóm 1/2/3” với ba số lấy đại trong bài — trông như số liệu thật mà vô nghĩa.
   */
  if (!bang) return null;
  const ds = soTrongBang(bang)
    .slice(0, 3)
    .filter((n, i, arr) => arr.indexOf(n) === i);
  if (ds.length < 2) return null;
  const tong = ds.reduce((x, y) => x + y, 0);
  const nhieuNhat = Math.max(...ds);
  const slides = [];

  slides.push({
    type: "visual",
    content: {
      table: bang,
      text: [
        "Bảng số liệu của bài — bé đọc theo HÀNG, không đọc theo cột",
        "Muốn biết “tất cả”, “nhiều nhất”, “ít nhất” thì phải cộng hoặc so các con số.",
        `Ví dụ: ${ds.join(" + ")} = ${tong}.`,
      ].join("\n"),
    },
  });

  slides.push({
    type: "concept",
    content: {
      badge: "Mẹo Nhớ",
      title: "Cách đọc bảng số liệu",
      explanation:
        "Bảng số liệu là một bức tranh bằng số: mỗi hàng là một đối tượng, mỗi cột là một thông tin.",
      points: [
        `Bước 1 — đọc tên hàng (hoặc cột đầu) để biết đang nói về cái gì.`,
        `Bước 2 — đọc con số ở cột tương ứng với đối tượng đó.`,
        `Bước 3 — muốn biết “tất cả”, “nhiều nhất”, “ít nhất” thì phải CỘNG hoặc SO các con số, không đọc lại một ô.`,
        `Kiểm tra lại: tổng vừa tính phải LỚN HƠN từng con số trong bảng.`,
      ],
    },
  });

  const lua = bonPhuongAn(nhieuNhat, [Math.min(...ds), tong, nhieuNhat + 1]);
  if (lua)
    slides.push({
      type: "quiz",
      content: {
        question: "Trong bảng trên, số lượng nào LỚN NHẤT?",
        options: lua.options,
        answer: lua.answer,
        mascotHint: `Bé so các con số ${ds.join(", ")} — số lớn nhất là ${nhieuNhat}.`,
      },
    });

  const lua2 = bonPhuongAn(tong, [nhieuNhat, nhieuNhat * 2, tong + 1]);
  if (lua2)
    slides.push({
      type: "quiz",
      content: {
        question: "Cộng các con số trong bảng lại thì được bao nhiêu?",
        options: lua2.options,
        answer: lua2.answer,
        mascotHint: `Lấy các con số cộng lại: ${ds.join(" + ")} = ${tong}.`,
      },
    });

  return slides;
}

function baiPhan(bai) {
  const chu = chuCuaBai(bai);
  /**
   * 🔴 CHỈ DẠY KHI BÀI ĐÚNG LÀ BÀI PHÂN SỐ. Nếu bài không nhắc phân số thì bỏ qua — đừng lấy
   * ví dụ “3/4” để dạy một bài chưa học phân số (cùng họ lỗi với bài “Tiết học đầu tiên”).
   */
  if (!/phân số|tử số|mẫu số/i.test(chu)) return null;
  const m = chu.match(/(\d+)\/(\d+)/);
  let tu = m ? Number(m[1]) : null;
  let mau = m ? Number(m[2]) : null;
  if (!tu || !mau || mau > 12 || tu > mau) {
    // Không tìm được phân số cụ thể: lấy ví dụ chuẩn 3/4 để dạy cách đọc – cách so sánh.
    tu = 3;
    mau = 4;
  }
  const slides = [];

  slides.push({
    type: "visual",
    content: {
      /**
       * 🔴 THAM SỐ ĐÚNG LÀ `parts` / `shaded` — KHÔNG phải `numerator` / `denominator`.
       * Xem `FractionVisuals.jsx`: `fractionBar: { parts, shaded, label, unit, rows }`.
       * Dùng sai tên khoá thì bộ vẽ lấy mặc định ⇒ hình SAI mà không báo lỗi.
       */
      fractionBar: {
        parts: mau,
        shaded: tu,
        label: `${tu}/${mau}`,
        unit: "băng giấy",
      },
      text: [
        `Phân số ${tu}/${mau}: chia băng giấy thành ${mau} phần bằng nhau`,
        `tô màu ${tu} phần trong số đó`,
        `Đọc là “${tu} phần ${mau}”.`,
      ].join("\n"),
    },
  });

  slides.push({
    type: "concept",
    content: {
      badge: "Ghi Nhớ",
      title: "Đọc và hiểu phân số",
      explanation:
        "Mẫu số cho biết chia thành mấy phần BẰNG NHAU; tử số cho biết lấy mấy phần.",
      points: [
        `Mẫu số ${mau} — chia đều thành ${mau} phần.`,
        `Tử số ${tu} — lấy ${tu} phần trong số đó.`,
        `Mẫu số phải khác 0; chia thành 0 phần thì không có gì để lấy.`,
        `Hai phân số bằng nhau khi cùng biểu diễn một phần của cùng một vật: ${tu}/${mau} = ${tu * 2}/${mau * 2}.`,
      ],
    },
  });

  const lua = bonPhuongAn(mau, [tu, mau + 1, mau - 1]);
  if (lua)
    slides.push({
      type: "quiz",
      content: {
        question: `Trong phân số ${tu}/${mau}, mẫu số là số nào?`,
        options: lua.options,
        answer: mau,
        mascotHint: `Mẫu số là số dưới dấu gạch: ${mau}.`,
      },
    });

  // 4. CÂU LUYỆN 2 — phân biệt TỬ SỐ / MẪU SỐ (bé hay đọc lẫn hai số này).
  const lua2 = bonPhuongAn(tu, [mau, mau + 1, tu + 1]);
  if (lua2)
    slides.push({
      type: "quiz",
      content: {
        question: `Trong phân số ${tu}/${mau}, tử số là số nào?`,
        options: lua2.options,
        answer: lua2.answer,
        mascotHint: `Tử số là số TRÊN dấu gạch: ${tu}.`,
      },
    });

  return slides;
}

const KHUON = {
  so: baiSo,
  hinh: baiHinh,
  do: baiDo,
  bang: baiBang,
  thongke: baiThongKe,
  phan: baiPhan,
};

/**
 * DẤU NHẬN BIẾT “BÀI NÀY ĐÃ ĐƯỢC SINH RỒI” — chạy lại script không sinh trùng.
 * Mỗi khuôn có một chuỗi tiêu đề riêng; chỉ cần chuỗi đó đã có trong dữ liệu là bỏ qua.
 */
const DAU_DA_SINH = {
  so: "So sánh và đọc số cho nhanh",
  hinh: "Đặc điểm của ",
  do: "Bậc thang đơn vị đo",
  bang: "Cách thuộc ",
  thongke: "Cách đọc bảng số liệu",
  phan: "Đọc và hiểu phân số",
};

/** Toàn bộ chữ của một bài, để dò dấu. */
const chuBai = (bai) => JSON.stringify(bai.slides ?? []);

const tatCa = await layTatCaChuong();
const mucTieu = chuongChon.length
  ? tatCa.filter((c) => chuongChon.includes(c.id))
  : tatCa.filter((c) => NHOM[c.id]);

let bai = 0;
let slide = 0;
const boQua = [];
const khongDuoc = [];

for (const chuong of mucTieu) {
  const khuon = KHUON[NHOM[chuong.id]];
  if (!khuon) continue;
  const kq = boSungChuong(
    chuong,
    (b) => {
      // Đã có slide “đặt tính tương tác” của lượt 1 thì vẫn bổ sung được (khác nội dung),
      // nhưng tránh sinh trùng chính mình: nếu bài đã có câu hỏi kiểm tra trùng thì bỏ.
      const kq2 = khuon(b);
      return kq2;
    },
    {
      ghi: MUON_GHI,
      coiNhuDaCo: (b) =>
        chuBai(b).includes(DAU_DA_SINH[NHOM[chuong.id]] ?? "\u0000"),
    },
  );
  bai += kq.soBai;
  slide += kq.soSlide;
  boQua.push(...kq.boQua);
  khongDuoc.push(...kq.khongSinhDuoc);
  if (kq.soBai || kq.khongSinhDuoc.length)
    console.log(
      `${MUON_GHI ? "✍️" : "👀"} ${chuong.id} [${NHOM[chuong.id]}] — ${kq.soBai} bài · ${kq.soSlide} slide`,
    );
}

console.log(
  `\n${MUON_GHI ? "ĐÃ GHI" : "XEM TRƯỚC"}: ${bai} bài · ${slide} slide` +
    (khongDuoc.length ? ` · ${khongDuoc.length} bài không sinh được` : ""),
);
if (khongDuoc.length)
  console.log(`\n⚠️  không sinh được:\n   ${khongDuoc.join(", ")}`);
if (!MUON_GHI) console.log("(thêm --ghi để ghi thật)");
