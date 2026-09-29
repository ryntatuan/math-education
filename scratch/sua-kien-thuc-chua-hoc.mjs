#!/usr/bin/env node
/**
 * SỬA ĐỢT “DẠY TRƯỚC CHƯƠNG TRÌNH” (2026-09-29, yêu cầu người dùng).
 *
 * VÌ SAO: máy sinh nội dung (4 lượt) nhét slide MẸO/BƯỚC chung chung vào MỌI bài, kể cả bài chưa
 * học khái niệm đó. Người dùng gửi ảnh bài “Các số 0, 1, 2, 3”: đã dạy dấu >, <, = (tận Bài 8 mới
 * học), “dùng ê-ke” (Lớp 3), “thử lại bằng phép tính ngược” (chưa học cộng trừ)…
 *
 * NGUYÊN TẮC: mỗi phép sửa phải ĐẾM ĐÚNG số lần khớp trước khi ghi; lệch là DỪNG, không ghi file.
 * Mỗi bài được xét riêng (chia file theo mốc `id: "gN-cM-lK"`) để chọn khuôn theo CHÍNH bài đó.
 *
 *   node scratch/sua-kien-thuc-chua-hoc.mjs          # chạy thử, in bảng
 *   node scratch/sua-kien-thuc-chua-hoc.mjs --ghi    # ghi thật
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const GHI = process.argv.includes("--ghi");
const GOC = path.join(ROOT, "client/src/data");

const bao = [];
let soSua = 0;
let soLoi = 0;
/** Kiểu xuống dòng của file đang xử lý — file dữ liệu dùng lẫn CRLF và LF. */
let NL = "\n";

// ── DẠNG BÀI của mỗi bài: quyết định khuôn “ba bước”, “mẹo nhớ” ────────────────
function dangBai(tieuDe) {
  const t = tieuDe.toLowerCase();
  if (
    /hình|khối|vị trí|đoạn thẳng|điểm|đỉnh|tam giác|vuông|tròn|chữ nhật|trên – dưới|trái – phải|lắp ghép/.test(
      t,
    )
  )
    return "hinh";
  if (/đo|dài|cm|thước|cao hơn|thấp hơn|gang tay/.test(t)) return "do";
  if (/giờ|ngày|tuần|tháng|lịch|thời gian|tiền|đồng|tờ/.test(t)) return "tg";
  if (/cộng|trừ|tính|phép/.test(t)) return "tinh";
  if (/so sánh|nhiều hơn|ít hơn|bằng nhau|dấu/.test(t)) return "soSanh";
  return "dem";
}

/** Ba bước làm bài — riêng cho từng dạng. */
const BA_BUOC = {
  hinh: {
    rows: [
      ["Bước 1 — Gọi tên", "nhìn hình rồi nói đúng tên hình (hoặc khối)"],
      ["Bước 2 — Đếm", "đếm cạnh, đếm đỉnh rồi đọc lại hai đặc điểm của hình"],
      ["Bước 3 — Kiểm lại", "đếm lại lần nữa bằng mắt, không đoán"],
    ],
    text: [
      "Ba bước làm bài hình — bé làm lần lượt",
      "Bé đọc bảng này trước khi làm, và đọc lại sau khi làm xong.",
      "Bỏ một bước là bài dễ sai.",
    ],
  },
  do: {
    rows: [
      ["Bước 1 — Đặt thước", "đặt vạch 0 của thước trùng với một đầu vật"],
      ["Bước 2 — Đọc số", "nhìn đầu kia của vật xem tới vạch nào"],
      ["Bước 3 — Ghi kết quả", "viết số đo kèm đơn vị, rồi đo lại lần nữa"],
    ],
    text: [
      "Ba bước đo cho đúng — bé làm lần lượt",
      "Bé đọc bảng này trước khi làm, và đọc lại sau khi làm xong.",
      "Bỏ một bước là bài dễ sai.",
    ],
  },
  tg: {
    rows: [
      ["Bước 1 — Nhìn kỹ", "xem đề hỏi giờ, ngày hay đồng tiền"],
      [
        "Bước 2 — Đọc từng phần",
        "kim ngắn rồi kim dài · thứ rồi ngày · tờ tiền rồi số tiền",
      ],
      ["Bước 3 — Kiểm lại", "đọc lại một lần nữa rồi mới trả lời"],
    ],
    text: [
      "Ba bước làm bài — bé làm lần lượt",
      "Bé đọc bảng này trước khi làm, và đọc lại sau khi làm xong.",
      "Bỏ một bước là bài dễ sai.",
    ],
  },
  tinh: {
    rows: [
      ["Bước 1 — Đặt tính", "viết các số thẳng cột với nhau"],
      ["Bước 2 — Tính", "tính lần lượt từ phải sang trái"],
      ["Bước 3 — Thử lại", "kiểm lại bằng cách tính ngược lại một lần nữa"],
    ],
    text: [
      "Ba bước tính — bé làm lần lượt",
      "Bé đọc bảng này trước khi làm, và đọc lại sau khi làm xong.",
      "Bỏ một bước là bài dễ sai.",
    ],
  },
  soSanh: {
    rows: [
      ["Bước 1 — Đếm", "đếm số lượng của mỗi bên (hoặc đọc hai số đã cho)"],
      ["Bước 2 — Ghép đôi", "ghép từng cặp một để thấy bên nào thừa ra"],
      [
        "Bước 3 — Nói kết quả",
        "nói lại một lần nữa: nhiều hơn, ít hơn hay bằng nhau",
      ],
    ],
    text: [
      "Ba bước so sánh — bé làm lần lượt",
      "Bé đọc bảng này trước khi làm, và đọc lại sau khi làm xong.",
      "Bỏ một bước là bài dễ sai.",
    ],
  },
  dem: {
    rows: [
      ["Bước 1 — Nhìn kỹ", "nhìn hết cả hình, xem có mấy nhóm đồ vật"],
      ["Bước 2 — Đếm", "đếm từng nhóm, lần lượt từ trái sang phải"],
      ["Bước 3 — Kiểm lại", "đếm lại lần nữa rồi mới đọc số"],
    ],
    text: [
      "Ba bước đếm cho đúng — bé làm lần lượt",
      "Bé đọc bảng này trước khi làm, và đọc lại sau khi làm xong.",
      "Bỏ một bước là bài dễ sai.",
    ],
  },
};

/** Mẹo nhớ thay cho mẹo so sánh (dùng ở bài chưa học dấu so sánh). */
const MEO_GHÉP_ĐÔI = [
  "Ghép đôi là cách so sánh dễ nhất: xếp mỗi đồ vật của nhóm này với một đồ vật của nhóm kia.",
  "Ghép xong, nhóm nào còn thừa ra thì nhóm đó NHIỀU HƠN.",
  "Ghép hết mà không nhóm nào thừa thì hai nhóm BẰNG NHAU.",
  "Ví dụ: 3 con ếch và 2 chiếc lá — ghép đôi thì thừa ra 1 con ếch, vậy ếch nhiều hơn lá.",
];

const MEO_DEM = [
  "Mỗi đồ vật chỉ đếm MỘT lần — không bỏ sót, không đếm lại.",
  "Đếm lần lượt: từ trái sang phải, từ trên xuống dưới.",
  "Đếm xong thì đọc số: một, hai, ba.",
  "Không có đồ vật nào thì viết số 0.",
];

// ── Tiện ích theo dòng ────────────────────────────────────────────────────────

function thayTatCa(doan, tu, cho, nhan) {
  const n = doan.split(tu).length - 1;
  if (n === 0) return doan;
  soSua += n;
  bao.push(`   · ${nhan}: ${n} chỗ`);
  return doan.split(tu).join(cho.replace(/\n/g, NL));
}

const doiDong = (s) => s.replace(/\n/g, NL);

function thayRegex(doan, re, cho, nhan, mongDoi = null) {
  const khop = doan.match(
    new RegExp(re.source, re.flags.includes("g") ? re.flags : re.flags + "g"),
  );
  const n = khop ? khop.length : 0;
  if (n === 0) return doan;
  if (mongDoi !== null && n !== mongDoi) {
    soLoi++;
    bao.push(`   ✗ ${nhan}: khớp ${n} lần, mong đợi ${mongDoi} — KHÔNG sửa`);
    return doan;
  }
  soSua += n;
  bao.push(`   · ${nhan}: ${n} chỗ`);
  if (typeof cho === "function") {
    return doan.replace(re, (...a) => doiDong(cho(...a)));
  }
  return doan.replace(re, doiDong(cho));
}

/** Tìm khoảng dòng của slide chứa `moc`: từ dòng `{` tới dòng đóng CÙNG SÂU THỤT LỀ.
 *  ⚠ Không thể chỉ tìm dòng `},` đầu tiên: object con cũng đóng bằng `},` (sâu hơn 2 ô)
 *    ⇒ đã từng dừng sớm và để lại dòng thừa, làm hỏng cú pháp file. */
function khoangSlide(doan, moc) {
  const ds = doan.split("\n");
  const i = ds.findIndex((l) => l.includes(moc));
  if (i < 0) return null;
  let dau = i;
  while (dau > 0 && ds[dau].trim() !== "{") dau--;
  const thutLe = ds[dau].length - ds[dau].trimStart().length;
  const dongDong = " ".repeat(thutLe) + "},";
  let cuoi = i;
  while (cuoi < ds.length - 1 && ds[cuoi].trimEnd() !== dongDong) cuoi++;
  if (ds[cuoi].trimEnd() !== dongDong) return null; // không tìm thấy ⇒ báo lệch, không sửa bừa
  return { ds, dau, cuoi };
}

/** Xoá cả một slide. */
function xoaSlide(doan, moc, nhan) {
  const k = khoangSlide(doan, moc);
  if (!k) {
    soLoi++;
    bao.push(`   ✗ ${nhan}: không xác định được khoảng slide — KHÔNG sửa`);
    return doan;
  }
  k.ds.splice(k.dau, k.cuoi - k.dau + 1);
  soSua++;
  bao.push(`   · ${nhan}: bỏ 1 slide`);
  return k.ds.join("\n");
}

/** Thay cả slide bằng khối mới. */
function thaySlide(doan, moc, khoiMoi, nhan) {
  const k = khoangSlide(doan, moc);
  if (!k) {
    soLoi++;
    bao.push(`   ✗ ${nhan}: không xác định được khoảng slide — KHÔNG sửa`);
    return doan;
  }
  k.ds.splice(
    k.dau,
    k.cuoi - k.dau + 1,
    ...khoiMoi.replace(/\n/g, NL).split(NL),
  );
  soSua++;
  bao.push(`   · ${nhan}: thay 1 slide`);
  return k.ds.join("\n");
}

const meoSlide = (title, explanation, points, badge = "Mẹo Nhớ") =>
  [
    "        {",
    '          type: "concept",',
    "          content: {",
    `            badge: "${badge}",`,
    `            title: ${JSON.stringify(title)},`,
    "            explanation:",
    `              ${JSON.stringify(explanation)},`,
    "            points: [",
    ...points.map((p) => `              ${JSON.stringify(p)},`),
    "            ],",
    "          },",
    "        },",
  ].join("\n");

const bangSlide = (headers, rows, text) =>
  [
    "        {",
    '          type: "visual",',
    "          content: {",
    "            table: {",
    `              headers: ${JSON.stringify(headers)},`,
    "              rows: [",
    ...rows.map((r) => `                ${JSON.stringify(r)},`),
    "              ],",
    "            },",
    `            text: ${JSON.stringify(text.join("\n"))},`,
    "          },",
    "        },",
  ].join("\n");

// ── ĐỢT 5: bù slide ĐÚNG PHẠM VI cho các bài bị hụt khung sau khi bỏ nội dung sai ──────────
const SLIDE_BU = {
  "g1-c7-l1": [
    {
      moc: "Bút chì xanh dài hơn bút chì đỏ. Vậy bút nào NGẮN hơn?",
      type: "quiz",
      noi: {
        question: "Bút chì xanh dài hơn bút chì đỏ. Vậy bút nào NGẮN hơn?",
        options: [
          "Bút chì xanh",
          "Bút chì đỏ",
          "Hai bút dài bằng nhau",
          "Không so được",
        ],
        answer: "Bút chì đỏ",
        mascotHint: "Vật nào dài hơn thì vật kia ngắn hơn.",
      },
    },
  ],
  "g1-c7-l2": [
    {
      moc: "Không đặt được hai vật cạnh nhau, bé so sánh độ dài thế nào?",
      type: "quiz",
      noi: {
        question:
          "Không đặt được hai vật cạnh nhau, bé so sánh độ dài thế nào?",
        options: [
          "Đo cả hai bằng cùng một vật trung gian",
          "Đoán bằng mắt",
          "Đặt hai vật cách xa nhau",
          "Cân hai vật lên",
        ],
        answer: "Đo cả hai bằng cùng một vật trung gian",
        mascotHint:
          "Đo cả hai bằng cùng một vật trung gian rồi so hai số đo với nhau.",
      },
    },
  ],
  "g1-c7-l3": [
    {
      moc: "Đơn vị đo độ dài xăng-ti-mét viết tắt là gì?",
      type: "quiz",
      noi: {
        question: "Đơn vị đo độ dài xăng-ti-mét viết tắt là gì?",
        options: ["cm", "kg", "l", "giờ"],
        answer: "cm",
        mascotHint: "Xăng-ti-mét viết tắt là cm.",
      },
    },
  ],
  "g1-c7-l5": [
    {
      moc: "Vẽ đoạn thẳng dài 4 cm thì bé làm thế nào?",
      type: "quiz",
      noi: {
        question: "Vẽ đoạn thẳng dài 4 cm thì bé làm thế nào?",
        options: [
          "Đặt vạch 0 ở đầu trái, chấm ở vạch 4 rồi nối hai điểm",
          "Chấm hai điểm bất kì",
          "Đặt bút vào giữa thước",
          "Đoán độ dài bằng mắt",
        ],
        answer: "Đặt vạch 0 ở đầu trái, chấm ở vạch 4 rồi nối hai điểm",
        mascotHint:
          "Vạch 0 trùng đầu trái, vạch 4 là đầu phải — nối hai điểm đó.",
      },
    },
  ],
  "g1-c7-l7": [
    {
      moc: "Cùng đo một cái bàn mà mỗi bạn đo bằng gang tay của mình",
      type: "quiz",
      noi: {
        question:
          "Cùng đo một cái bàn mà mỗi bạn đo bằng gang tay của mình thì kết quả thế nào?",
        options: [
          "Ra số gang tay khác nhau",
          "Luôn bằng nhau",
          "Không đo được",
          "Luôn là 5 gang",
        ],
        answer: "Ra số gang tay khác nhau",
        mascotHint:
          "Gang tay mỗi bạn dài ngắn khác nhau nên số đo cũng khác nhau.",
      },
    },
  ],
  "g1-c9-l1": [
    {
      moc: "Kim ngắn chỉ số 9, kim dài chỉ số 12",
      type: "visual",
      noi: {
        text: "🕘  Kim ngắn chỉ số 9, kim dài chỉ số 12\nKim ngắn → giờ\nKim dài  → phút",
        clock: {
          hour: 9,
          minute: 0,
          timeText: "Kim ngắn chỉ số 9, kim dài chỉ số 12",
        },
      },
    },
    {
      moc: "Bảng nhớ nhanh — mặt đồng hồ",
      type: "visual",
      noi: {
        table: {
          headers: ["Trên mặt đồng hồ", "Có gì"],
          rows: [
            ["Kim ngắn", "chỉ giờ"],
            ["Kim dài", "chỉ phút"],
            ["Các số", "từ 1 đến 12, xếp thành vòng tròn"],
          ],
        },
        text: "Bảng nhớ nhanh — mặt đồng hồ\n· Kim ngắn chỉ giờ, kim dài chỉ phút\n· Đồng hồ có 12 số",
      },
    },
  ],
  "g1-c9-l2": [
    {
      moc: "Kim ngắn chỉ số 4, kim dài chỉ số 12",
      type: "visual",
      noi: {
        text: "🕓  Kim ngắn chỉ số 4, kim dài chỉ số 12\nBây giờ là 4 giờ đúng",
        clock: {
          hour: 4,
          minute: 0,
          timeText: "Kim ngắn chỉ số 4, kim dài chỉ số 12 — 4 giờ đúng",
        },
      },
    },
    {
      moc: "Bảng nhớ nhanh — giờ đúng",
      type: "visual",
      noi: {
        table: {
          headers: ["Giờ đúng", "Kim ngắn chỉ số"],
          rows: [
            ["4 giờ", "4"],
            ["7 giờ", "7"],
            ["12 giờ", "12"],
          ],
        },
        text: "Bảng nhớ nhanh — giờ đúng\n· Kim dài chỉ số 12\n· Kim ngắn chỉ số nào thì là mấy giờ",
      },
    },
  ],
  "g1-c9-l3": [
    {
      moc: "Ba bước đọc giờ đúng",
      type: "visual",
      noi: {
        table: {
          headers: ["Bước", "Việc bé làm"],
          rows: [
            ["Bước 1 — Nhìn kim ngắn", "xem kim ngắn chỉ số mấy"],
            ["Bước 2 — Nhìn kim dài", "kim dài có chỉ vào số 12 không"],
            ["Bước 3 — Đọc lại", "nói cả câu: … giờ đúng"],
          ],
        },
        text: "Ba bước đọc giờ đúng\nBé đọc bảng này trước khi làm, và đọc lại sau khi làm xong.",
      },
    },
    {
      moc: "Buổi sáng bé thức dậy lúc 7 giờ",
      type: "visual",
      noi: {
        text: "🌅  Buổi sáng bé thức dậy lúc 7 giờ\nKim ngắn chỉ số 7, kim dài chỉ số 12",
        clock: {
          hour: 7,
          minute: 0,
          timeText: "7 giờ sáng — kim ngắn chỉ số 7, kim dài chỉ số 12",
        },
      },
    },
    {
      moc: "Bé ăn cơm trưa lúc 12 giờ. Đó là buổi nào?",
      type: "quiz",
      noi: {
        question: "Bé ăn cơm trưa lúc 12 giờ. Đó là buổi nào?",
        options: ["Buổi sáng", "Buổi trưa", "Buổi chiều", "Buổi tối"],
        answer: "Buổi trưa",
        mascotHint:
          "12 giờ là buổi trưa; sáng là trước 12 giờ, chiều là sau 12 giờ.",
      },
    },
  ],
  "g1-c9-l4": [
    {
      moc: "Kim ngắn chỉ số 6, kim dài chỉ số 12 →",
      type: "visual",
      noi: {
        text: "🕕  Bé tự đọc giờ\nKim ngắn chỉ số 6, kim dài chỉ số 12 → 6 giờ đúng",
        clock: {
          hour: 6,
          minute: 0,
          timeText: "6 giờ đúng — kim ngắn chỉ số 6, kim dài chỉ số 12",
        },
      },
    },
    {
      moc: "Đồng hồ có kim ngắn chỉ số 6, kim dài chỉ số 12. Bây giờ là mấy giờ?",
      type: "quiz",
      noi: {
        question:
          "Đồng hồ có kim ngắn chỉ số 6, kim dài chỉ số 12. Bây giờ là mấy giờ?",
        options: ["6 giờ", "12 giờ", "5 giờ", "6 giờ 12 phút"],
        answer: "6 giờ",
        mascotHint: "Kim dài chỉ số 12 thì đọc số kim ngắn đang chỉ: 6 giờ.",
      },
    },
    {
      moc: "Khi đọc giờ đúng, bé nhìn kim nào trước?",
      type: "quiz",
      noi: {
        question: "Khi đọc giờ đúng, bé nhìn kim nào trước?",
        options: [
          "Kim ngắn",
          "Kim dài",
          "Cả hai kim cùng lúc",
          "Không nhìn kim nào",
        ],
        answer: "Kim ngắn",
        mascotHint:
          "Kim ngắn chỉ giờ nên bé nhìn kim ngắn trước, rồi xem kim dài.",
      },
    },
    {
      moc: "Ba bước thực hành xem giờ đúng",
      type: "visual",
      noi: {
        table: {
          headers: ["Bước", "Việc bé làm"],
          rows: [
            ["Bước 1 — Nhìn kim ngắn", "xem kim ngắn chỉ số mấy"],
            ["Bước 2 — Kiểm kim dài", "kim dài có chỉ số 12 không"],
            ["Bước 3 — Nói cả câu", "… giờ đúng"],
          ],
        },
        text: "Ba bước thực hành xem giờ đúng\nBé đọc bảng này trước khi làm, và đọc lại sau khi làm xong.",
      },
    },
  ],
  "g1-c9-l7": [
    {
      moc: "Tờ lịch cho bé biết những gì?",
      type: "quiz",
      noi: {
        question: "Tờ lịch cho bé biết những gì?",
        options: ["Thứ, ngày, tháng", "Cân nặng", "Chiều cao", "Số tiền"],
        answer: "Thứ, ngày, tháng",
        mascotHint: "Trên tờ lịch có thứ, ngày và tháng.",
      },
    },
  ],
  "g1-c9-l8": [
    {
      moc: "Đọc một ngày trên lịch, bé đọc theo thứ tự nào?",
      type: "quiz",
      noi: {
        question: "Đọc một ngày trên lịch, bé đọc theo thứ tự nào?",
        options: [
          "Thứ — ngày — tháng",
          "Ngày — tháng — thứ",
          "Tháng — thứ — ngày",
          "Ngày — thứ — tháng",
        ],
        answer: "Thứ — ngày — tháng",
        mascotHint: "Đọc thứ trước, rồi đến ngày, rồi đến tháng.",
      },
    },
  ],
  "g1-c9-l9": [
    {
      moc: "Một tuần có mấy ngày?",
      type: "quiz",
      noi: {
        question: "Một tuần có mấy ngày?",
        options: ["5 ngày", "6 ngày", "7 ngày", "8 ngày"],
        answer: "7 ngày",
        mascotHint: "Một tuần có 7 ngày, từ thứ Hai đến Chủ nhật.",
      },
    },
    {
      moc: "Kim ngắn chỉ số 11, kim dài chỉ số 12",
      type: "visual",
      noi: {
        text: "🕚  Kim ngắn chỉ số 11, kim dài chỉ số 12 → 11 giờ đúng",
        clock: {
          hour: 11,
          minute: 0,
          timeText: "11 giờ đúng — kim ngắn chỉ số 11, kim dài chỉ số 12",
        },
      },
    },
    {
      moc: "Ba bước xem lịch và xem giờ",
      type: "visual",
      noi: {
        table: {
          headers: ["Bước", "Việc bé làm"],
          rows: [
            ["Bước 1 — Xem giờ", "đọc kim ngắn trước, rồi kim dài"],
            ["Bước 2 — Xem ngày", "đọc thứ, rồi ngày, rồi tháng"],
            ["Bước 3 — Đọc lại", "nói cả câu cho đủ ý"],
          ],
        },
        text: "Ba bước xem lịch và xem giờ\nBé đọc bảng này trước khi làm, và đọc lại sau khi làm xong.",
      },
    },
  ],
  "g1-c5-l5": [
    {
      moc: "Bé ngồi trong lớp, bảng ở phía nào của bé?",
      type: "quiz",
      noi: {
        question: "Bé ngồi trong lớp, bảng ở phía nào của bé?",
        options: ["Phía trước", "Phía sau", "Bên trái", "Bên phải"],
        answer: "Phía trước",
        mascotHint: "Bé nhìn lên bảng nên bảng ở phía trước mặt bé.",
      },
    },
  ],
  "g2-c3-l1": [
    {
      moc: "Ba bước đọc số đo trên cân",
      type: "visual",
      noi: {
        table: {
          headers: ["Bước", "Việc bé làm"],
          rows: [
            ["Bước 1 — Đặt vật lên cân", "để kim cân đứng yên, không rung"],
            ["Bước 2 — Đọc số đo", "kim chỉ số nào thì đọc số đó"],
            ["Bước 3 — Ghi kết quả", "ghi số đo kèm đơn vị ki-lô-gam (kg)"],
          ],
        },
        text: "Ba bước đọc số đo trên cân\nBé đọc bảng này trước khi làm, và đọc lại sau khi làm xong.",
      },
    },
  ],
  "g2-c11-l3": [
    {
      moc: "Ba bước đổi đơn vị đo độ dài",
      type: "visual",
      noi: {
        table: {
          headers: ["Bước", "Việc bé làm"],
          rows: [
            [
              "Bước 1 — Nhớ bậc thang",
              "km → m → dm → cm, mỗi bậc liền nhau hơn kém 10 lần",
            ],
            ["Bước 2 — Đổi", "đi xuống một bậc thì số đo lớn lên 10 lần"],
            ["Bước 3 — Kiểm lại", "đổi ngược lại xem có về số ban đầu"],
          ],
        },
        text: "Ba bước đổi đơn vị đo độ dài\nBé đọc bảng này trước khi làm, và đọc lại sau khi làm xong.",
      },
    },
    {
      moc: "Bảng nhớ nhanh — đơn vị đo độ dài",
      type: "visual",
      noi: {
        table: {
          headers: ["Đổi", "Được"],
          rows: [
            ["1 km", "1 000 m"],
            ["1 m", "10 dm"],
            ["1 dm", "10 cm"],
          ],
        },
        text: "Bảng nhớ nhanh — đơn vị đo độ dài\n· 1 km = 1 000 m\n· 1 m = 10 dm\n· 1 dm = 10 cm",
      },
    },
    {
      moc: "1 km bằng bao nhiêu mét?",
      type: "quiz",
      noi: {
        question: "1 km bằng bao nhiêu mét?",
        options: ["10 m", "100 m", "1 000 m", "10 000 m"],
        answer: "1 000 m",
        mascotHint: "1 km = 1 000 m.",
      },
    },
  ],
  "g2-c3-l1": [
    {
      moc: "Cân chỉ kim ở số 3. Túi đường nặng bao nhiêu ki-lô-gam?",
      type: "quiz",
      noi: {
        question: "Cân chỉ kim ở số 3. Túi đường nặng bao nhiêu ki-lô-gam?",
        options: ["3 kg", "2 kg", "4 kg", "30 kg"],
        answer: "3 kg",
        mascotHint: "Kim cân chỉ số nào thì đọc số đó, kèm đơn vị ki-lô-gam.",
      },
    },
  ],
  "g2-c3-l2": [
    {
      moc: "Ba bước đọc số đo trên cân — bé làm lần lượt",
      type: "visual",
      noi: {
        table: {
          headers: ["Bước", "Việc bé làm"],
          rows: [
            ["Bước 1 — Nhìn kim cân", "xem kim cân đang chỉ vào số nào"],
            ["Bước 2 — Đọc số", "đọc số đó rồi ghi kèm đơn vị kg"],
            ["Bước 3 — Kiểm lại", "nhìn lại kim cân một lần nữa"],
          ],
        },
        text: "Ba bước đọc số đo trên cân — bé làm lần lượt\nBé đọc bảng này trước khi làm, và đọc lại sau khi làm xong.",
      },
    },
    {
      moc: "Cân chỉ kim ở số 3. Túi gạo nặng bao nhiêu?",
      type: "quiz",
      noi: {
        question: "Cân chỉ kim ở số 3. Túi gạo nặng bao nhiêu?",
        options: ["3 kg", "2 kg", "4 kg", "30 kg"],
        answer: "3 kg",
        mascotHint: "Kim cân chỉ số 3 thì đọc là 3 kg.",
      },
    },
    {
      moc: "Kim cân chỉ vạch số 5. Vật đó nặng bao nhiêu ki-lô-gam?",
      type: "quiz",
      noi: {
        question: "Kim cân chỉ vạch số 5. Vật đó nặng bao nhiêu ki-lô-gam?",
        options: ["5 kg", "4 kg", "6 kg", "50 kg"],
        answer: "5 kg",
        mascotHint: "Kim cân chỉ số nào thì đọc số đó, kèm đơn vị ki-lô-gam.",
      },
    },
    {
      moc: "Kim cân chỉ vạch số 8. Vật đó nặng bao nhiêu ki-lô-gam?",
      type: "quiz",
      noi: {
        question: "Kim cân chỉ vạch số 8. Vật đó nặng bao nhiêu ki-lô-gam?",
        options: ["8 kg", "7 kg", "9 kg", "80 kg"],
        answer: "8 kg",
        mascotHint: "Kim cân chỉ vạch số nào thì vật nặng bấy nhiêu ki-lô-gam.",
      },
    },
  ],
  "g2-c3-l3": [
    {
      moc: "Ba bước đọc số đo dung tích",
      type: "visual",
      noi: {
        table: {
          headers: ["Bước", "Việc bé làm"],
          rows: [
            ["Bước 1 — Rót nước", "rót nước vào ca cho tới vạch cần đo"],
            ["Bước 2 — Đọc vạch", "vạch ghi số nào thì đọc số đó"],
            ["Bước 3 — Ghi kết quả", "ghi số đo kèm đơn vị lít (l)"],
          ],
        },
        text: "Ba bước đọc số đo dung tích\nBé đọc bảng này trước khi làm, và đọc lại sau khi làm xong.",
      },
    },
    {
      moc: "Ca nước được rót đầy tới vạch số 2. Trong ca có bao nhiêu lít nước?",
      type: "quiz",
      noi: {
        question:
          "Ca nước được rót đầy tới vạch số 2. Trong ca có bao nhiêu lít nước?",
        options: ["2 l", "1 l", "3 l", "20 l"],
        answer: "2 l",
        mascotHint:
          "Mực nước tới vạch số nào thì đọc số đó, kèm đơn vị lít (l).",
      },
    },
  ],
  "g2-c3-l4": [
    {
      moc: "Ba bước đọc số đo dung tích — bé làm lần lượt",
      type: "visual",
      noi: {
        table: {
          headers: ["Bước", "Việc bé làm"],
          rows: [
            ["Bước 1 — Nhìn mực nước", "xem mực nước tới vạch nào"],
            ["Bước 2 — Đọc số", "đọc số ghi ở vạch đó rồi ghi kèm đơn vị l"],
            ["Bước 3 — Kiểm lại", "nhìn lại mực nước một lần nữa"],
          ],
        },
        text: "Ba bước đọc số đo dung tích — bé làm lần lượt\nBé đọc bảng này trước khi làm, và đọc lại sau khi làm xong.",
      },
    },
    {
      moc: "Ca nước có mực nước tới vạch số 4. Trong ca có bao nhiêu lít nước?",
      type: "quiz",
      noi: {
        question:
          "Ca nước có mực nước tới vạch số 4. Trong ca có bao nhiêu lít nước?",
        options: ["4 l", "3 l", "5 l", "40 l"],
        answer: "4 l",
        mascotHint:
          "Mực nước tới vạch số nào thì đọc số đó, kèm đơn vị lít (l).",
      },
    },
    {
      moc: "Bình nước có mực nước tới vạch số 5. Trong bình có bao nhiêu lít nước?",
      type: "quiz",
      noi: {
        question:
          "Bình nước có mực nước tới vạch số 5. Trong bình có bao nhiêu lít nước?",
        options: ["5 l", "4 l", "6 l", "50 l"],
        answer: "5 l",
        mascotHint: "Mực nước tới vạch số nào thì đọc số đó, kèm đơn vị lít.",
      },
    },
  ],
  "g2-c3-l5": [
    {
      moc: "Ba bước thực hành đo khối lượng và dung tích",
      type: "visual",
      noi: {
        table: {
          headers: ["Bước", "Việc bé làm"],
          rows: [
            [
              "Bước 1 — Chọn dụng cụ",
              "đo cân nặng thì dùng cân, đo dung tích thì dùng ca",
            ],
            [
              "Bước 2 — Đo và đọc số",
              "đọc số chỉ trên dụng cụ rồi ghi kèm đơn vị",
            ],
            ["Bước 3 — So sánh", "so hai số đo cùng đơn vị với nhau"],
          ],
        },
        text: "Ba bước thực hành đo khối lượng và dung tích\nBé đọc bảng này trước khi làm, và đọc lại sau khi làm xong.",
      },
    },
  ],
  "g2-c3-l6": [
    {
      moc: "Ba bước làm bài về khối lượng và dung tích",
      type: "visual",
      noi: {
        table: {
          headers: ["Bước", "Việc bé làm"],
          rows: [
            ["Bước 1 — Đọc đề", "xem đề hỏi về cân nặng hay lượng nước"],
            ["Bước 2 — Ghi số đo", "viết số đo kèm đơn vị kg hoặc l"],
            [
              "Bước 3 — Kiểm lại",
              "hai số so sánh được với nhau khi CÙNG đơn vị",
            ],
          ],
        },
        text: "Ba bước làm bài về khối lượng và dung tích\nBé đọc bảng này trước khi làm, và đọc lại sau khi làm xong.",
      },
    },
  ],
  "g2-c6-l1": [
    {
      moc: "Ba bước làm bài về ngày và giờ",
      type: "visual",
      noi: {
        table: {
          headers: ["Bước", "Việc bé làm"],
          rows: [
            ["Bước 1 — Nhớ quan hệ", "1 ngày = 24 giờ; 1 tuần = 7 ngày"],
            ["Bước 2 — Đọc đề", "xem đề hỏi về ngày hay về giờ"],
            ["Bước 3 — Kiểm lại", "đọc lại một lần nữa rồi mới trả lời"],
          ],
        },
        text: "Ba bước làm bài về ngày và giờ\nBé đọc bảng này trước khi làm, và đọc lại sau khi làm xong.",
      },
    },
  ],
  "g2-c6-l2": [
    {
      moc: "Ba bước làm bài về giờ và phút",
      type: "visual",
      noi: {
        table: {
          headers: ["Bước", "Việc bé làm"],
          rows: [
            ["Bước 1 — Nhớ quan hệ", "1 giờ = 60 phút"],
            ["Bước 2 — Đọc kim", "kim ngắn chỉ giờ, kim dài chỉ phút"],
            ["Bước 3 — Đọc lại", "nói cả câu: … giờ … phút"],
          ],
        },
        text: "Ba bước làm bài về giờ và phút\nBé đọc bảng này trước khi làm, và đọc lại sau khi làm xong.",
      },
    },
  ],
  "g2-c6-l3": [
    {
      moc: "Ba bước xem đồng hồ chỉ giờ và phút",
      type: "visual",
      noi: {
        table: {
          headers: ["Bước", "Việc bé làm"],
          rows: [
            [
              "Bước 1 — Đọc kim ngắn",
              "kim ngắn chỉ số nào thì được bấy nhiêu giờ",
            ],
            [
              "Bước 2 — Đọc kim dài",
              "kim dài chỉ số nào thì đếm thêm bấy nhiêu phút",
            ],
            ["Bước 3 — Đọc lại", "nói cả câu: … giờ … phút"],
          ],
        },
        text: "Ba bước xem đồng hồ chỉ giờ và phút\nBé đọc bảng này trước khi làm, và đọc lại sau khi làm xong.",
      },
    },
  ],
  "g2-c6-l4": [
    {
      moc: "Ba bước làm bài về ngày và tháng",
      type: "visual",
      noi: {
        table: {
          headers: ["Bước", "Việc bé làm"],
          rows: [
            [
              "Bước 1 — Xem tháng",
              "một số tháng có 30 ngày, một số tháng có 31 ngày",
            ],
            ["Bước 2 — Đếm ngày", "đếm từ ngày 1 đến ngày cần tìm"],
            ["Bước 3 — Kiểm lại", "đọc lại thứ, ngày, tháng cho đủ"],
          ],
        },
        text: "Ba bước làm bài về ngày và tháng\nBé đọc bảng này trước khi làm, và đọc lại sau khi làm xong.",
      },
    },
    {
      moc: "Tháng 1 có bao nhiêu ngày?",
      type: "quiz",
      noi: {
        question: "Tháng 1 có bao nhiêu ngày?",
        options: ["28 ngày", "30 ngày", "31 ngày", "32 ngày"],
        answer: "31 ngày",
        mascotHint: "Tháng 1 có 31 ngày.",
      },
    },
  ],
  "g2-c6-l5": [
    {
      moc: "Ba bước xem lịch",
      type: "visual",
      noi: {
        table: {
          headers: ["Bước", "Việc bé làm"],
          rows: [
            ["Bước 1 — Xem cột thứ", "tìm cột ghi thứ cần đọc trên tờ lịch"],
            ["Bước 2 — Xem ngày", "đọc con số ngày ở dòng đó"],
            ["Bước 3 — Đọc lại", "đọc cả câu: thứ … ngày … tháng …"],
          ],
        },
        text: "Ba bước xem lịch\nBé đọc bảng này trước khi làm, và đọc lại sau khi làm xong.",
      },
    },
    {
      moc: "Trên tờ lịch, muốn biết ngày 15 là thứ mấy thì bé làm gì?",
      type: "quiz",
      noi: {
        question: "Trên tờ lịch, muốn biết ngày 15 là thứ mấy thì bé làm gì?",
        options: [
          "Nhìn cột của ngày 15 rồi đọc tên thứ ở đầu cột",
          "Đoán bằng mắt",
          "Đếm từ 1 đến 15",
          "Không xem được",
        ],
        answer: "Nhìn cột của ngày 15 rồi đọc tên thứ ở đầu cột",
        mascotHint:
          "Ngày và thứ nằm cùng một cột, nên đọc tên thứ ở đầu cột đó.",
      },
    },
    {
      moc: "Trong một tuần, sau thứ Năm là thứ mấy?",
      type: "quiz",
      noi: {
        question: "Trong một tuần, sau thứ Năm là thứ mấy?",
        options: ["Thứ Sáu", "Thứ Tư", "Thứ Bảy", "Chủ nhật"],
        answer: "Thứ Sáu",
        mascotHint:
          "Các ngày trong tuần theo thứ tự: thứ Hai, thứ Ba, … thứ Năm, thứ Sáu, thứ Bảy, Chủ nhật.",
      },
    },
  ],
  "g2-c6-l7": [
    {
      moc: "Ba bước làm bài luyện tập chung về thời gian",
      type: "visual",
      noi: {
        table: {
          headers: ["Bước", "Việc bé làm"],
          rows: [
            ["Bước 1 — Đọc đề", "xem đề hỏi về giờ, về ngày hay về lịch"],
            ["Bước 2 — Làm lần lượt", "đọc giờ trước, rồi đến ngày và tháng"],
            ["Bước 3 — Kiểm lại", "đọc lại một lần nữa rồi mới trả lời"],
          ],
        },
        text: "Ba bước làm bài luyện tập chung về thời gian\nBé đọc bảng này trước khi làm, và đọc lại sau khi làm xong.",
      },
    },
  ],
  "g1-c4-l7": [
    {
      moc: "Ba bước quan sát hình",
      type: "visual",
      noi: {
        table: {
          headers: ["Bước", "Việc bé làm"],
          rows: [
            ["Bước 1 — Gọi tên", "nhìn hình rồi nói đúng tên hình (hoặc khối)"],
            [
              "Bước 2 — Đếm",
              "đếm cạnh, đếm đỉnh rồi đọc lại hai đặc điểm của hình",
            ],
            ["Bước 3 — Kiểm lại", "đếm lại lần nữa bằng mắt, không đoán"],
          ],
        },
        text: "Ba bước quan sát hình — bé làm lần lượt\nBé đọc bảng này trước khi làm, và đọc lại sau khi làm xong.",
      },
    },
  ],
};

/**
 * Thay NGUYÊN mảng `rows` của bảng.
 * ⚠ ĐÃ MẮC (2026-09-29): dùng regex `rows: \[…\]` thì dừng ở dấu `]` của PHẦN TỬ đầu
 *   (mỗi phần tử cũng là một mảng) ⇒ để lại các dòng cũ thừa và LÀM HỎNG CÚ PHÁP file
 *   (`g1c4.js`, `g1c5.js`, `g1c10.js`). Luôn xác định khoảng theo THỤT LỀ của dòng `rows: [`.
 */
function thayRows(doan, moc, cacDong, nhan) {
  const ds = doan.split("\n");
  const i = ds.findIndex((l) => l.includes(moc));
  if (i < 0) return doan;
  let dau = i;
  while (dau > 0 && !/"?rows"?: \[\s*$/.test(ds[dau].trimEnd())) dau--;
  if (!/"?rows"?: \[\s*$/.test(ds[dau].trimEnd())) {
    soLoi++;
    bao.push(`   ✗ ${nhan}: không thấy dòng mở “rows: [” — KHÔNG sửa`);
    return doan;
  }
  const thutLe = ds[dau].length - ds[dau].trimStart().length;
  // ⚠ Nhiều file viết mảng rows không có dấu phẩy sau `]` ⇒ phải nhận CẢ HAI kiểu đóng.
  const duocDong = [" ".repeat(thutLe) + "]", " ".repeat(thutLe) + "],"];
  let cuoi = i;
  while (cuoi < ds.length - 1 && !duocDong.includes(ds[cuoi].trimEnd())) cuoi++;
  if (!duocDong.includes(ds[cuoi].trimEnd())) {
    soLoi++;
    bao.push(`   ✗ ${nhan}: không thấy dòng đóng mảng rows — KHÔNG sửa`);
    return doan;
  }
  const than = cacDong.map((l) => " ".repeat(thutLe + 2) + l).join("\n");
  ds.splice(
    dau,
    cuoi - dau + 1,
    ...`${ds[dau].trimEnd()}\n${than}\n${ds[cuoi].trimEnd()}`
      .replace(/\n/g, NL)
      .split(NL),
  );
  soSua++;
  bao.push(`   · ${nhan}: thay mảng rows`);
  return ds.join("\n");
}

/** Khối slide mới (đúng kiểu trình bày của dữ liệu: khoá không nháy). */
function khoiSlide(type, noi) {
  const ra = [
    "        {",
    `          type: "${type}",`,
    "          content: {",
  ];
  for (const [k, v] of Object.entries(noi)) {
    if (k === "clock") {
      ra.push("            clock: {");
      for (const [k2, v2] of Object.entries(v))
        ra.push(`              ${k2}: ${JSON.stringify(v2)},`);
      ra.push("            },");
      continue;
    }
    if (k === "table") {
      ra.push("            table: {");
      ra.push(`              headers: ${JSON.stringify(v.headers)},`);
      ra.push("              rows: [");
      for (const r of v.rows) ra.push(`                ${JSON.stringify(r)},`);
      ra.push("              ],");
      ra.push("            },");
      continue;
    }
    if (Array.isArray(v)) {
      ra.push(`            ${k}: [`);
      for (const x of v) ra.push(`              ${JSON.stringify(x)},`);
      ra.push("            ],");
      continue;
    }
    ra.push(`            ${k}: ${JSON.stringify(v)},`);
  }
  ra.push("          },", "        },");
  return ra.join("\n");
}

/** Chèn slide vào CUỐI mảng `slides` của bài (trước dòng `      ],`). */
function chenCuoiBai(doan, khoi, nhan) {
  const ds = doan.split("\n");
  let i = -1;
  for (let k = ds.length - 1; k >= 0; k--) {
    if (ds[k].trimEnd() === "      ],") {
      i = k;
      break;
    }
  }
  if (i < 0) {
    soLoi++;
    bao.push(`   ✗ ${nhan}: không thấy dòng đóng mảng slides — KHÔNG sửa`);
    return doan;
  }
  ds.splice(i, 0, ...khoi.replace(/\n/g, NL).split(NL));
  soSua++;
  bao.push(`   · ${nhan}: thêm 1 slide`);
  return ds.join("\n");
}

// ── Chạy từng file ────────────────────────────────────────────────────────────
function xuLyFile(file) {
  const raw = fs.readFileSync(file, "utf8");
  // ⚠ KHÔNG lọc thô theo dấu vết: lần trước lọc nên g1c3/g1c8 bị bỏ qua CẢ file.
  //    Mọi phép sửa bên dưới đều tự bỏ qua khi không khớp (trả về nguyên trạng).
  // ⚠ File dữ liệu dùng LẪN CRLF và LF: tách bằng "\n" để giữ nguyên "\r" của từng dòng,
  //    như vậy ghép lại là HOÀN NGUYÊN y hệt (không đổi file khi không có chỗ nào cần sửa).
  NL = raw.includes("\r\n") ? "\r\n" : "\n";

  // Chia theo bài: mỗi đoạn bắt đầu ở dòng `      id: "…"`
  const dong = raw.split("\n");
  const mocBai = [];
  dong.forEach((l, i) => {
    // ⚠ Nhiều file viết khoá CÓ NHÁY (`"id": "g2-c9-l1",`) — phải nhận cả hai kiểu.
    if (/^\s+"?id"?: "g\d+-c\d+-l\d+",?\s*$/.test(l)) mocBai.push(i);
  });
  const doan = [];
  for (let k = 0; k < mocBai.length; k++) {
    const b = mocBai[k];
    const e = k + 1 < mocBai.length ? mocBai[k + 1] : dong.length;
    doan.push({ b, e });
  }

  let out = dong.slice(0, mocBai[0] ?? dong.length).join("\n");
  for (const { b, e } of doan) {
    let t = dong.slice(b, e).join("\n");
    const id = (t.match(/"?id"?: "([^"]+)"/) ?? [])[1] ?? "?";
    const tieuDe = (t.match(/"?title"?: "([^"]+)"/) ?? [])[1] ?? "";
    const moTa = (t.match(/"?description"?:\s*\n?\s*"([^"]*)"/) ?? [])[1] ?? "";
    const d = dangBai(`${tieuDe} ${moTa}`);
    const khoi = (id.match(/^(g\d)/) ?? [])[1] ?? "";
    const laLop1 = khoi === "g1";
    const truoc = t;

    // (A) “Ba bước làm bài” có ê-ke ⇒ thay bằng khuôn đúng dạng bài
    //   ⚠ Lớp 1 được prettier dàn mỗi phần tử ra nhiều dòng, Lớp 2–5 viết gọn 1 dòng ⇒ regex phải nhận cả hai.
    if (t.includes("Bước 3 — Kiểm tra")) {
      const k = BA_BUOC[d];
      const hang = (a, b) => {
        const mot = `                [${JSON.stringify(a)}, ${JSON.stringify(b)}],`;
        return mot.length <= 100
          ? mot
          : `                [\n                  ${JSON.stringify(a)},\n                  ${JSON.stringify(b)},\n                ],`;
      };
      t = thayRegex(
        t,
        /"?rows"?: \[[\s\S]{0,1000}?"dùng ê-ke hoặc thước để kiểm lại, không đoán bằng mắt",?\s*\]\s*,?\s*[\]}]/,
        `rows: [\n${k.rows.map((r) => hang(r[0], r[1])).join("\n")}\n              ]`,
        `${id} ba bước (${d})`,
      );
      t = thayRegex(
        t,
        /"?text"?: "Ba bước làm bài[^"]*"/,
        `text: ${JSON.stringify(k.text.join("\n"))}`,
        `${id} chữ ba bước`,
      );
    }

    // (B) quiz “thử lại bằng phép tính ngược” — chưa học cộng trừ ở bài đầu (Lớp 1)
    if (laLop1) {
      t = thayTatCa(
        t,
        '"Thử lại bằng phép tính ngược hoặc kiểm tra theo điều cần nhớ"',
        '"Kiểm lại một lần nữa theo điều cần nhớ"',
        `${id} phương án quiz`,
      );
      t = thayTatCa(
        t,
        "Người tính giỏi luôn thử lại: cộng thì lấy kết quả trừ đi một số hạng.",
        "Kiểm lại một lần nữa rồi mới nộp bài — kiểm lại là thói quen của người học giỏi.",
        `${id} gợi ý quiz`,
      );
    }

    // (C) mẹo so sánh ở bài CHƯA học dấu so sánh
    if (
      t.includes('title: "So sánh hai số bằng cách đếm"') ||
      t.includes('"title": "So sánh hai số bằng cách đếm"')
    ) {
      const soBai = Number((id.match(/-l(\d+)$/) ?? [])[1] ?? 0);
      const laCD1 = id.startsWith("g1-c1-");
      if (laCD1 && soBai <= 5) {
        t = xoaSlide(t, "So sánh hai số bằng cách đếm", `${id} bỏ mẹo so sánh`);
      } else if (laCD1 && soBai <= 7) {
        t = thaySlide(
          t,
          "So sánh hai số bằng cách đếm",
          meoSlide(
            "So sánh bằng cách ghép đôi",
            "Chưa cần dấu so sánh: bé chỉ cần GHÉP ĐÔI rồi xem bên nào thừa ra.",
            MEO_GHÉP_ĐÔI,
          ),
          `${id} mẹo ghép đôi`,
        );
      }
    }
    // (C2) “số liền sau / liền trước” là nội dung CĐ6 Bài 8 ⇒ bỏ khỏi các bài trước đó
    if (id.startsWith("g1-c6-")) {
      const soBaiC6 = Number((id.match(/-l(\d+)$/) ?? [])[1] ?? 0);
      if (soBaiC6 < 8)
        t = thayTatCa(
          t,
          '"Số liền sau = số đó thêm 1; số liền trước = số đó bớt 1.",',
          "",
          `${id} bỏ “liền sau/liền trước”`,
        );
    }

    // (D) “chục – đơn vị” là nội dung CĐ6 ⇒ đổi sang cách nói “mấy và mấy” ở CĐ1
    if (id.startsWith("g1-c1-")) {
      t = thayRegex(
        t,
        /text: "(\d+) gồm mấy chục và mấy đơn vị\?\\nBé đếm khối: (\d) thanh chục và (\d) ô rời\\nVậy \d+ = \d chục và \d đơn vị"/g,
        (m, so, chuc, dv) =>
          `text: ${JSON.stringify(
            `${so} gồm mấy và mấy?\nBé đếm khối: một bên có ${chuc} khối, một bên có ${dv} khối\nVậy ${so} gồm ${chuc} và ${dv}`,
          )}`,
        `${id} đổi “chục/đơn vị”`,
      );
    }

    // (E) “tia số” là từ của Lớp 2 ⇒ bỏ chữ đó ở Lớp 1
    if (laLop1)
      t = thayTatCa(
        t,
        "Bé đếm thêm từng bước trên tia số theo các cung nhảy.",
        "Bé đếm thêm từng bước theo các cung nhảy.",
        `${id} bỏ chữ “tia số”`,
      );

    // (F) “góc vuông” / “hai đường chéo” là kiến thức Lớp 3–4 ⇒ bỏ khỏi Lớp 1
    if (laLop1) {
      t = thayTatCa(t, "\n· 4 góc vuông", "", `${id} bỏ “4 góc vuông”`);
      t = thayTatCa(
        t,
        "đọc lại hai đặc điểm trên nhé.",
        "đọc lại đặc điểm trên nhé.",
        `${id} chữ đặc điểm`,
      );
      t = thayTatCa(
        t,
        "hình vuông có 4 góc vuông.",
        "hình vuông có 4 cạnh dài bằng nhau.",
        `${id} gợi ý vuông`,
      );
      t = thayTatCa(
        t,
        "Hình nào có 4 góc vuông?",
        "Hình nào có 4 cạnh dài bằng nhau?",
        `${id} câu hỏi vuông`,
      );
      t = thayTatCa(
        t,
        "4 cạnh dài bằng nhau · 4 góc vuông · hai đường chéo bằng nhau.",
        "4 cạnh dài bằng nhau · 4 đỉnh.",
        `${id} gợi ý hình vuông`,
      );
    }

    // (G) bậc thang đơn vị đo độ dài ở Lớp 1 (m · dm · mm là Lớp 2 trở lên)
    if (laLop1 && t.includes("Bậc thang đơn vị đo độ dài")) {
      const noiDung =
        d === "tg"
          ? {
              headers: ["Điều bé cần nhớ", "Nội dung"],
              rows: [
                ["1 tuần", "7 ngày"],
                ["Các ngày trong tuần", "thứ Hai → Chủ nhật"],
                ["Xem lịch", "đọc thứ, ngày, tháng"],
              ],
              text: [
                "Điều bé cần nhớ về thời gian",
                "· 1 tuần có 7 ngày",
                "· Các ngày trong tuần đọc lần lượt",
                "· Xem lịch: đọc thứ, ngày, tháng",
              ],
            }
          : {
              headers: ["Đơn vị bé học", "Dùng để làm gì"],
              rows: [
                ["xăng-ti-mét (cm)", "đo độ dài vật ngắn: bút chì, quyển sách"],
              ],
              text: [
                "Đo độ dài bằng thước có vạch xăng-ti-mét",
                "· Vạch 0 trùng với một đầu vật",
                "· Đọc số ở đầu kia của vật",
                "· Ghi số đo kèm đơn vị cm",
              ],
            };
      t = thayRegex(
        t,
        /table: \{\s*"?headers"?: \["Đơn vị", "Bằng bao nhiêu đơn vị liền sau"\],\s*"?rows"?: \[[\s\S]{0,400}?\]\s*,?\s*\},\s*"?text"?: "Bậc thang đơn vị đo độ dài[^"]*"/,
        `table: {\n              headers: ${JSON.stringify(noiDung.headers)},\n              rows: [\n${noiDung.rows
          .map((r) => `                ${JSON.stringify(r)},`)
          .join(
            "\n",
          )}\n              ],\n            },\n            text: ${JSON.stringify(noiDung.text.join("\n"))}`,
        `${id} bảng bậc thang (${d})`,
      );
      // mẹo “Cách đổi đơn vị đo độ dài” đi kèm cũng phải đổi theo
      if (t.includes('title: "Cách đổi đơn vị đo độ dài"')) {
        const meoMoi =
          d === "tg"
            ? meoSlide(
                "Xem lịch và xem giờ",
                "Bé đọc theo thứ tự, không đọc ngược.",
                [
                  "Kim ngắn chỉ giờ, kim dài chỉ phút.",
                  "Các ngày trong tuần đọc lần lượt: thứ Hai, thứ Ba, … Chủ nhật.",
                  "Xem lịch: đọc thứ trước, rồi ngày, rồi tháng.",
                  "Hôm qua — hôm nay — ngày mai: đọc lần lượt theo dòng thời gian.",
                ],
              )
            : meoSlide(
                "Đo cho đúng",
                "Chỉ cần nhớ: vạch 0 trùng đầu vật, rồi đọc số ở đầu kia.",
                [
                  "Đặt thước SÁT vật, không để lệch.",
                  "Vạch 0 phải trùng với một đầu của vật.",
                  "Đọc số ở đầu kia của vật — đó là độ dài.",
                  "Ghi kết quả kèm đơn vị: cm.",
                ],
              );
        t = thaySlide(
          t,
          'title: "Cách đổi đơn vị đo độ dài"',
          meoMoi,
          `${id} mẹo đo/lịch`,
        );
      }
    }

    // ── ĐỢT 2: các chỗ soát lại thấy còn sót ──────────────────────────────────
    const soChuong = Number((id.match(/-c(\d+)-/) ?? [])[1] ?? 0);
    const soBai = Number((id.match(/-l(\d+)$/) ?? [])[1] ?? 0);
    // “số liền trước / liền sau” chỉ học ở g1-c6-l8
    const truocLienTruocSau =
      laLop1 && (soChuong < 6 || (soChuong === 6 && soBai < 8));
    // dấu so sánh (>, <, =) chỉ học ở g1-c1-l8; khái niệm nhiều/ít hơn ở g1-c1-l6
    const truocSoSanh = laLop1 && soChuong === 1 && soBai < 6;

    // (H) Lớp 1: “ê-ke” là dụng cụ Lớp 3
    if (laLop1 || khoi === "g2") {
      t = thayTatCa(
        t,
        "dùng ê-ke hoặc thước để kiểm lại, không đoán bằng mắt",
        "đếm lại cạnh, đếm lại đỉnh rồi so với đặc điểm đã học",
        `${id} bỏ ê-ke (bảng)`,
      );
      t = thayTatCa(
        t,
        "Dùng ê-ke hoặc thước để KIỂM TRA đặc điểm vừa kể trên hình vẽ.",
        "Đếm lại cạnh, đếm lại đỉnh rồi so lại với đặc điểm vừa kể.",
        `${id} bỏ ê-ke (bước)`,
      );
      t = thayTatCa(
        t,
        "Bước 3 — Dùng ê-ke hoặc thước để KIỂM TRA đặc điểm vừa kể trên hình vẽ.",
        "Bước 3 — Đếm lại cạnh, đếm lại đỉnh rồi so lại với đặc điểm vừa kể.",
        `${id} bỏ ê-ke (bước 3)`,
      );
    }

    // (I) Lớp 1: “tia số” là nội dung Lớp 2 (g2-c1-l3)
    if (laLop1) {
      t = thayTatCa(
        t,
        "Trên tia số, số đứng bên PHẢI lớn hơn số đứng bên TRÁI.",
        "Đếm từ 1: số nào đếm đến sau thì số đó lớn hơn.",
        `${id} bỏ “trên tia số”`,
      );
      t = thayTatCa(
        t,
        "Bé đếm thêm từng bước trên tia số theo các cung nhảy.",
        "Bé đếm thêm từng bước theo các cung nhảy.",
        `${id} bỏ “tia số” (cộng)`,
      );
      t = thayTatCa(
        t,
        "trên tia số",
        "theo các bước đếm",
        `${id} bỏ “tia số” (còn lại)`,
      );
    }

    // (J) Lớp 1 trước g1-c6-l8: bỏ “số liền trước / liền sau” và quiz về nó
    if (truocLienTruocSau) {
      t = thayRegex(
        t,
        /"Số liền sau = số đó thêm 1; số liền trước = số đó bớt 1\.",?\s*/g,
        "",
        `${id} bỏ “liền sau/liền trước”`,
      );
      t = thayTatCa(
        t,
        "Số liền sau 7 là 8; số liền trước 7 là 6.",
        "Đếm xuôi 0 → 10 rồi đếm ngược 10 → 0 cho thật chắc.",
        `${id} bỏ “liền sau” (ôn tập)`,
      );
      t = thayRegex(
        t,
        /Số liền sau của số (\d+) là số nào\?/g,
        "Bé đếm tiếp: ngay sau số $1 thì đến số nào?",
        `${id} câu hỏi quiz “liền sau”`,
      );
      t = thayRegex(
        t,
        /"[^"]*Số liền sau hơn số đã cho 1 đơn vị[^"]*"/g,
        '"Đếm tiếp một bước từ số đã cho thì được số đó."',
        `${id} gợi ý quiz “liền sau”`,
      );
    }

    // (K) Lớp 1 trước g1-c1-l6: quiz so sánh ⇒ đổi thành câu hỏi ĐẾM (giữ nguyên cách giải thích)
    if (truocSoSanh) {
      t = thayRegex(
        t,
        /Số nào lớn hơn: (\d+) hay (\d+)\?/g,
        "Bé đếm từ 1: số nào đếm đến sau — $1 hay $2?",
        `${id} câu hỏi so sánh`,
      );
      t = thayRegex(
        t,
        /Số nào bé hơn: (\d+) hay (\d+)\?/g,
        "Bé đếm từ 1: số nào đếm đến trước — $1 hay $2?",
        `${id} câu hỏi so sánh (bé hơn)`,
      );
    }

    // (L) Lớp 1: “bốn bước bài toán” nhắc nhân/chia (Lớp 2 mới học)
    if (laLop1) {
      t = thayTatCa(
        t,
        "Bước 1 — Đọc kỹ đề, gạch dưới các SỐ và từ khoá (thêm, bớt, gấp, chia đều).",
        "Bước 1 — Đọc kỹ đề, gạch dưới các SỐ và từ khoá (thêm, gộp, bớt, cho đi).",
        `${id} từ khoá bước 1`,
      );
      t = thayTatCa(
        t,
        "“bớt, cho đi, còn lại” → trừ; “gấp mấy lần” → nhân.",
        "“bớt, cho đi, còn lại” → trừ.",
        `${id} từ khoá bước 3`,
      );
    }

    // (M) Lớp 1 bài về VỊ TRÍ: slide “đặt tính thẳng cột, hàng chục…” là nội dung CĐ6 ⇒ thay bằng bước quan sát
    if (
      laLop1 &&
      /vị trí|trên|dưới|trái|phải/.test(tieuDe) &&
      t.includes("hàng chục dưới hàng chục")
    ) {
      t = thaySlide(
        t,
        "hàng chục dưới hàng chục",
        [
          "        {",
          '          type: "concept",',
          "          content: {",
          '            badge: "Cách Học",',
          '            title: "Ba bước quan sát vị trí",',
          "            explanation:",
          '              "Mọi bài về vị trí đều đi theo cùng một đường. Bé làm đúng thứ tự thì không nói sai.",',
          "            points: [",
          '              "Bước 1 — Xác định vật nào được hỏi trong tranh.",',
          '              "Bước 2 — Nói vị trí của vật đó so với vật mốc: trên / dưới, trái / phải, trước / sau.",',
          '              "Bước 3 — Nói lại cả câu cho đủ ý rồi mới trả lời.",',
          "            ],",
          "          },",
          "        },",
        ].join("\n"),
        `${id} bước quan sát vị trí`,
      );
    }

    // (N) g1-c4-l7: slide “4 × 2” (phép nhân là nội dung Lớp 2) ⇒ đổi thành đếm chấm trên xúc xắc
    if (id === "g1-c4-l7" && t.includes("Bé tự đặt tính: 4 × 2")) {
      t = thaySlide(
        t,
        "Bé tự đặt tính: 4 × 2",
        [
          "        {",
          '          type: "visual",',
          "          content: {",
          '            text: "Con xúc xắc có 6 mặt, mỗi mặt có từ 1 đến 6 chấm\\nBé đếm số chấm ở từng mặt rồi đọc số.",',
          "            spatialScene: {",
          '              mode: "diceFaces",',
          "            },",
          "          },",
          "        },",
        ].join("\n"),
        `${id} bỏ “4 × 2”`,
      );
    }

    // (O) g1-c10-l5: “chu vi / diện tích” là nội dung Lớp 3
    if (laLop1) {
      t = thayTatCa(
        t,
        "Bước 4 — Nếu đề hỏi chu vi / diện tích thì viết công thức ra, thay số rồi mới tính.",
        "Bước 4 — Nếu đề hỏi độ dài các cạnh thì cộng lại đúng theo số cạnh rồi mới trả lời.",
        `${id} bỏ “chu vi / diện tích”`,
      );
    }

    // (P) g2-c5-l1…l5: “hình tứ giác” học ở g2-c5-l6 ⇒ thay phương án nhiễu (cả chữ thường)
    if (khoi === "g2" && soChuong === 5 && soBai < 6) {
      t = thayTatCa(
        t,
        "Hình tứ giác",
        "Hình tam giác",
        `${id} phương án “tứ giác”`,
      );
      t = thayTatCa(
        t,
        "hình tứ giác",
        "hình tam giác",
        `${id} “tứ giác” (chữ thường)`,
      );
    }

    // (Q) g2-c14-l9: quiz “chu vi hình vuông” (Lớp 3 mới học) ⇒ đổi thành đếm tổng bốn cạnh
    if (id === "g2-c14-l9" && t.includes("Chu vi hình vuông")) {
      t = thaySlide(
        t,
        "Chu vi hình vuông",
        [
          "        {",
          '          type: "quiz",',
          "          content: {",
          '            question: "Một hình vuông có bốn cạnh, mỗi cạnh dài 4 cm. Bốn cạnh dài tất cả bao nhiêu xăng-ti-mét?",',
          '            options: ["8 cm", "12 cm", "16 cm", "44 cm"],',
          '            answer: "16 cm",',
          '            mascotHint: "Bốn cạnh, mỗi cạnh 4 cm: 4 + 4 + 4 + 4 = 16 (cm).",',
          "          },",
          "        },",
        ].join("\n"),
        `${id} quiz chu vi`,
      );
    }

    // (R) “bảng nhân – bảng chia – phân số”: phân số học ở g3-c2-l10
    const truocPhanSo =
      khoi === "g2" ||
      (khoi === "g3" && (soChuong < 2 || (soChuong === 2 && soBai < 10)));
    if (truocPhanSo && t.includes("bảng nhân – bảng chia – phân số")) {
      t = thayTatCa(
        t,
        "bảng nhân – bảng chia – phân số",
        "bảng nhân – bảng chia",
        `${id} bỏ chữ “phân số”`,
      );
    }

    // (S) “làm tròn” là nội dung g3-c8-l7 ⇒ đổi cách nói ở Lớp 2
    if (khoi === "g2" && /làm tròn chục/.test(t)) {
      t = thayTatCa(
        t,
        "làm tròn chục",
        "tách cho đủ một chục",
        `${id} bỏ “làm tròn chục”`,
      );
    }

    // ── ĐỢT 4: bộ “BẬC THANG ĐƠN VỊ” và các quiz đơn vị Lớp 2+ bị nhét vào Lớp 1 ──────────
    if (laLop1) {
      // (U) Bảng “ba bước” kiểu bậc thang (đi xuống thì nhân…) ⇒ thay bằng bước đúng dạng bài
      if (t.includes('"Bước 2 — Bậc thang"')) {
        const k = BA_BUOC[d];
        const hang = (a, b) => {
          const mot = `                [${JSON.stringify(a)}, ${JSON.stringify(b)}],`;
          return mot.length <= 100
            ? mot
            : `                [\n                  ${JSON.stringify(a)},\n                  ${JSON.stringify(b)},\n                ],`;
        };
        t = thayRegex(
          t,
          /"?rows"?: \[[\s\S]{0,900}?"Bước 2 — Bậc thang"[\s\S]{0,400}?\]\s*,?\s*[\]}]/,
          `rows: [\n${k.rows.map((r) => hang(r[0], r[1])).join("\n")}\n              ]`,
          `${id} ba bước (bậc thang)`,
        );
      }

      // (V) Bỏ các slide/quiz thuộc “bậc thang đơn vị” và đổi đơn vị m · dm · giờ–phút (Lớp 2+)
      for (const moc of [
        "Bậc thang đơn vị đo thời gian",
        "BẬC THANG đơn vị rồi nhân hoặc chia",
        "1 m bằng bao nhiêu dm?",
        "3 m bằng bao nhiêu dm?",
        "1 giờ bằng bao nhiêu phút?",
        "3 giờ bằng bao nhiêu phút?",
        "1 × 6 bằng bao nhiêu?",
      ]) {
        if (t.includes(moc))
          t = xoaSlide(t, moc, `${id} bỏ slide “${moc.slice(0, 26)}”`);
      }
      t = thayTatCa(
        t,
        "Hình bên trái có 8 khối, hình bên phải có 4 × 2 = 8 khối — bằng nhau.",
        "Hình bên trái có 8 khối; hình bên phải xếp 2 hàng, mỗi hàng 4 khối — 4 + 4 = 8 khối, bằng nhau.",
        `${id} bỏ “4 × 2”`,
      );

      // (W) “4 góc vuông”, “hai đường chéo” (Lớp 3–4) — chuỗi trong file dùng `\n` DẠNG CHỮ,
      //     nên phải tìm bằng `\\n` chứ không phải ký tự xuống dòng thật.
      t = thayTatCa(
        t,
        "\\n· 4 góc vuông",
        "",
        `${id} bỏ “4 góc vuông” (dạng chữ \\n)`,
      );
      t = thayTatCa(
        t,
        "hình vuông có hai đường chéo bằng nhau.",
        "hình vuông có 4 đỉnh.",
        `${id} bỏ “đường chéo”`,
      );

      // (X) Lớp 1 trước g1-c6-l8: đổi hết cách nói “liền sau / liền trước” sang đếm tiếp / đếm lùi
      if (truocLienTruocSau) {
        t = thayRegex(
          t,
          /Số liền sau của (?:số )?(\d+) là số nào\?/g,
          "Bé đếm tiếp: ngay sau $1 thì đến số nào?",
          `${id} hỏi đếm tiếp`,
        );
        t = thayRegex(
          t,
          /Số liền trước của (?:số )?(\d+) là số nào\?/g,
          "Bé đếm lùi: ngay trước $1 thì đến số nào?",
          `${id} hỏi đếm lùi`,
        );
        t = thayRegex(
          t,
          /Số liền sau(?: của)? (?:số )?(\d+) là (\d+)/g,
          "Đếm tiếp sau $1 là $2",
          `${id} đổi “liền sau … là …”`,
        );
        t = thayRegex(
          t,
          /[Ss]ố liền trước(?: của)? (?:số )?(\d+) là (\d+)/g,
          "đếm lùi trước $1 là $2",
          `${id} đổi “liền trước … là …”`,
        );
        t = thayRegex(
          t,
          /[Ll]iền sau(?: của)? (?:số )?(\d+) là (\d+)/g,
          "đếm tiếp sau $1 là $2",
          `${id} đổi “liền sau … là …” (ngắn)`,
        );
        t = thayRegex(
          t,
          /[Ll]iền trước(?: của)? (?:số )?(\d+) là (\d+)/g,
          "đếm lùi trước $1 là $2",
          `${id} đổi “liền trước … là …” (ngắn)`,
        );
        t = thayTatCa(
          t,
          "so sánh và số liền trước liền sau",
          "so sánh và đếm tiếp, đếm lùi",
          `${id} mô tả bài`,
        );
      }

      // (Y) g1-c10-l5: phương án quiz nhắc chu vi / diện tích (Lớp 3)
      t = thayTatCa(
        t,
        '"Đo diện tích"',
        '"Đo độ dài các cạnh"',
        `${id} phương án “diện tích”`,
      );
      t = thayTatCa(
        t,
        '"Tính chu vi trước"',
        '"Đếm số cạnh trước"',
        `${id} phương án “chu vi”`,
      );
    }

    // ── ĐỢT 6: các chỗ còn lại sau khi soát (cả Lớp 2) ────────────────────────────────────
    // (A3) Lớp 1: bảng “ba bước” còn kiểu mẫu khác (Số chữ số / So từ trái / Đọc số — nội dung
    //      Lớp 3–4) ⇒ cũng thay bằng khuôn đúng dạng bài.
    if (laLop1 && t.includes('"Bước 1 — Số chữ số"')) {
      const k = BA_BUOC[d];
      const hang = (a, b) => {
        const mot = `                [${JSON.stringify(a)}, ${JSON.stringify(b)}],`;
        return mot.length <= 100
          ? mot
          : `                [\n                  ${JSON.stringify(a)},\n                  ${JSON.stringify(b)},\n                ],`;
      };
      t = thayRegex(
        t,
        /"?rows"?: \[[\s\S]{0,1200}?"Bước 1 — Số chữ số"[\s\S]{0,800}?\]\s*,?\s*[\]}]/,
        `rows: [\n${k.rows.map((r) => hang(r[0], r[1])).join("\n")}\n              ]`,
        `${id} ba bước (số chữ số)`,
      );
      t = thayRegex(
        t,
        /"?text"?: "Ba bước làm bài[^"]*"/,
        `text: ${JSON.stringify(k.text.join("\n"))}`,
        `${id} chữ ba bước (số chữ số)`,
      );
    }

    if (laLop1) {
      // (AA) Lớp 1 trước g1-c1-l6: bỏ vế “nên X lớn hơn Y” (so sánh số học ở bài 6–8)
      if (truocSoSanh) {
        t = thayRegex(
          t,
          /, nên (\d+) lớn hơn (\d+)\./g,
          ".",
          `${id} bỏ vế so sánh`,
        );
      }
      t = thayTatCa(
        t,
        "đếm rồi cộng thêm.",
        "đếm rồi thêm vào cho đủ.",
        `${id} bỏ chữ “cộng” (chưa học)`,
      );
      t = thayTatCa(
        t,
        "Bé chia 10 viên thành hai phần nhé!",
        "Bé tách 10 viên thành hai phần nhé!",
        `${id} “chia” ⇒ “tách”`,
      );
      t = thayTatCa(
        t,
        "Chia 3 thành 2 và 1",
        "Tách 3 thành 2 và 1",
        `${id} “chia” ⇒ “tách” (2)`,
      );

      // (AB) g1-c10-l5: bảng nhớ nhắc chu vi / diện tích / nhân (Lớp 3)
      if (t.includes("cộng độ dài các cạnh bao quanh"))
        t = thayRows(
          t,
          "cộng độ dài các cạnh bao quanh",
          [
            '["Đếm cạnh", "đếm đủ số cạnh của hình rồi mới gọi tên hình"],',
            '["Hình tam giác", "3 cạnh, 3 đỉnh"],',
            '["Hình vuông", "4 cạnh dài bằng nhau, 4 đỉnh"],',
          ],
          `${id} bảng hình học`,
        );

      // (AC) Lớp 1 bài VỊ TRÍ: bảng + quiz “đặt tính rồi tính” là nội dung CĐ6 ⇒ bỏ/đổi
      if (/vị trí|trên|dưới|trái|phải/.test(tieuDe)) {
        if (t.includes("Khi đặt tính rồi tính, bé bắt đầu từ hàng nào?"))
          t = xoaSlide(
            t,
            "Khi đặt tính rồi tính, bé bắt đầu từ hàng nào?",
            `${id} bỏ quiz “đặt tính”`,
          );
        t = thayRows(
          t,
          "lấy kết quả trừ đi một số hạng để kiểm tra",
          [
            '["Trên – dưới", "nói vật nào ở phía trên, vật nào ở phía dưới"],',
            '["Trái – phải", "nói theo hướng bé đang nhìn"],',
            '["Trước – sau", "nói vật nào ở phía trước mặt bé"],',
          ],
          `${id} bảng vị trí`,
        );
        t = thayTatCa(
          t,
          "Bảng nhớ nhanh — tính toán",
          "Bảng nhớ nhanh — vị trí",
          `${id} tên bảng vị trí`,
        );
      }
    }

    // (AD) Lớp 2: “bậc thang đơn vị” kèm nhân/chia (phép nhân học ở g2-c8-l1) và tạ · yến (Lớp 4)
    if (khoi === "g2" && soChuong === 3) {
      for (const moc of [
        "Bậc thang đơn vị đo khối lượng",
        "Bậc thang đơn vị đo dung tích",
        "BẬC THANG đơn vị rồi nhân hoặc chia",
      ])
        if (t.includes(moc))
          t = xoaSlide(t, moc, `${id} bỏ slide “${moc.slice(0, 24)}”`);
    }
    if (khoi === "g2" && soChuong === 6) {
      if (t.includes("Bậc thang đơn vị đo độ dài"))
        t = xoaSlide(
          t,
          "Bậc thang đơn vị đo độ dài",
          `${id} bỏ bảng độ dài (bài về thời gian)`,
        );
      t = thayTatCa(
        t,
        "Đi XUỐNG một bậc thì nhân hệ số của bậc đó; đi LÊN một bậc thì chia.",
        // ⚠ Bên trong chuỗi của dữ liệu, xuống dòng phải là HAI KÝ TỰ `\` + `n`
        //   (chèn ký tự xuống dòng thật vào đây sẽ làm hỏng cú pháp — đã mắc ở g2c6.js).
        "Xuống một bậc: đổi ra đơn vị nhỏ hơn (1 ngày = 24 giờ).\\nLên một bậc: đổi ra đơn vị lớn hơn (24 giờ = 1 ngày).",
        `${id} bỏ “nhân/chia” ở bậc thang`,
      );
      if (t.includes("BẬC THANG đơn vị rồi nhân hoặc chia"))
        t = xoaSlide(
          t,
          "BẬC THANG đơn vị rồi nhân hoặc chia",
          `${id} bỏ mẹo bậc thang`,
        );
    }

    // (AE) Lớp 2 trước g2-c8-l1: bỏ “gấp mấy lần → nhân”, “chia đều” khỏi các bước làm bài
    if (khoi === "g2" && soChuong < 8) {
      t = thayTatCa(
        t,
        "(thêm, bớt, gấp, chia đều)",
        "(thêm, bớt, gộp, tách)",
        `${id} từ khoá bước 1 (Lớp 2)`,
      );
      t = thayTatCa(
        t,
        "“bớt, cho đi, còn lại” → trừ; “gấp mấy lần” → nhân.",
        "“bớt, cho đi, còn lại” → trừ.",
        `${id} từ khoá bước 3 (Lớp 2)`,
      );
    }

    // (AF) Lớp 1–2: “4 góc vuông” là nội dung Lớp 3 (g3-c3-l4)
    if (laLop1 || khoi === "g2") {
      t = thayTatCa(
        t,
        "\\n· 4 góc vuông",
        "",
        `${id} bỏ “4 góc vuông” (Lớp 1–2)`,
      );
    }

    // (AG) Lớp 2–3: bảng nhớ có dòng “Phân số” (học ở g3-c2-l10) — có file viết gọn 1 dòng,
    //      có file dàn nhiều dòng ⇒ phải dùng regex mới nhận cả hai.
    if (
      (khoi === "g2" || (khoi === "g3" && soChuong === 2 && soBai < 10)) &&
      t.includes('"Phân số"')
    ) {
      t = thayRegex(
        t,
        /\[\s*"Phân số",\s*"mẫu số chia đều thành mấy phần, tử số lấy mấy phần",?\s*\]/g,
        '["Chia có dư", "số dư luôn nhỏ hơn số chia"]',
        `${id} bỏ dòng “Phân số”`,
      );
    }

    // ── ĐỢT 7: quiz đổi đơn vị kiểu “nhân hệ số” và các câu nhắc Lớp 3–4 còn lại ─────────
    if (laLop1) {
      for (const moc of ["5 × 66 bằng bao nhiêu?", "2 × 92 bằng bao nhiêu?"])
        if (t.includes(moc))
          t = xoaSlide(t, moc, `${id} bỏ quiz vô nghĩa “${moc.slice(0, 12)}”`);
    }
    if (khoi === "g2" && soChuong < 8) {
      // Quiz đổi đơn vị có gợi ý “Đổi số lớn ra số bé thì nhân” = kiến thức g2-c8-l1 về sau
      for (
        let lan = 0;
        lan < 3 && t.includes("Đổi số lớn ra số bé thì nhân");
        lan++
      )
        t = xoaSlide(
          t,
          "Đổi số lớn ra số bé thì nhân",
          `${id} bỏ quiz đổi đơn vị`,
        );
      if (soChuong === 6) {
        for (const moc of ["1 m bằng bao nhiêu dm?", "3 m bằng bao nhiêu dm?"])
          if (t.includes(moc))
            t = xoaSlide(t, moc, `${id} bỏ quiz “${moc.slice(0, 12)}”`);
      }
      t = thayTatCa(
        t,
        "2 dm = 2 × 10 = 20 cm",
        "2 dm = 2 chục xăng-ti-mét = 20 cm",
        `${id} bỏ “×” (dm→cm)`,
      );
      t = thayTatCa(
        t,
        "3 dm = 3 × 10 = 30 cm",
        "3 dm = 3 chục xăng-ti-mét = 30 cm",
        `${id} bỏ “×” (dm→cm)`,
      );
      t = thayTatCa(
        t,
        "Sang học kì 2, bé sẽ gặp phép nhân và phép chia.",
        "Sang học kì 2, bé sẽ học tiếp các phép tính mới.",
        `${id} bỏ nhắc trước`,
      );
    }
    if (laLop1 || khoi === "g2") {
      // “góc vuông” / “đường chéo” là nội dung Lớp 3–4
      t = thayRegex(
        t,
        /^\s*"hình vuông có 4 góc vuông\.",?[\r\n]+/m,
        "",
        `${id} bỏ ý “góc vuông”`,
      );
      t = thayRegex(
        t,
        /^\s*"hình vuông có hai đường chéo bằng nhau\.",?[\r\n]+/m,
        "",
        `${id} bỏ ý “đường chéo”`,
      );
      t = thayTatCa(
        t,
        "4 cạnh dài bằng nhau · 4 góc vuông · hai đường chéo bằng nhau.",
        "4 cạnh dài bằng nhau · 4 đỉnh.",
        `${id} gợi ý hình vuông (Lớp 1–2)`,
      );
      t = thayTatCa(
        t,
        "Hình nào có 4 góc vuông?",
        "Hình nào có 4 cạnh dài bằng nhau?",
        `${id} câu hỏi “góc vuông”`,
      );
    }

    // ── ĐỢT 8: đơn vị học ở lớp SAU nhưng bị nhét vào Lớp 2 (tấn · tạ · ml · hm · dam · giây · mm) ──
    if (khoi === "g2") {
      for (const moc of [
        "1 tấn bằng bao nhiêu tạ?",
        "1 l bằng bao nhiêu ml?",
        "1 km bằng bao nhiêu hm?",
        "3 km bằng bao nhiêu hm?",
      ])
        if (t.includes(moc))
          t = xoaSlide(
            t,
            moc,
            `${id} bỏ quiz đơn vị sớm “${moc.slice(0, 16)}”`,
          );

      // Bậc thang có hm · dam (Lớp 3) và mẹo “nhân/chia hệ số” đi kèm
      if (t.includes("10 hm") || t.includes("10 dam")) {
        if (t.includes("Đi XUỐNG một bậc thì nhân hệ số của bậc đó"))
          t = xoaSlide(
            t,
            "Đi XUỐNG một bậc thì nhân hệ số của bậc đó",
            `${id} bỏ bậc thang có hm/dam`,
          );
        if (t.includes("BẬC THANG đơn vị rồi nhân hoặc chia"))
          t = xoaSlide(
            t,
            "BẬC THANG đơn vị rồi nhân hoặc chia",
            `${id} bỏ mẹo bậc thang (Lớp 2)`,
          );
      }

      // Bậc thang m · dm · cm · mm ⇒ bỏ mm (Lớp 3 mới học)
      if (t.includes('["1 cm", "10 mm"]')) {
        t = thayRows(
          t,
          '["1 cm", "10 mm"]',
          ['["1 m", "10 dm"],', '["1 dm", "10 cm"],'],
          `${id} bỏ mm khỏi bậc thang`,
        );
        t = thayTatCa(t, "\\n· mm", "", `${id} bỏ “· mm” trong chú thích`);
        t = thayTatCa(
          t,
          "Đi XUỐNG một bậc thì nhân hệ số của bậc đó; đi LÊN một bậc thì chia.",
          "Đi xuống một bậc: đổi ra đơn vị nhỏ hơn (1 m = 10 dm). Đi lên một bậc: đổi ra đơn vị lớn hơn.",
          `${id} bỏ “nhân/chia” (độ dài)`,
        );
      }

      // Bậc thang thời gian có giây (Lớp 3) ⇒ chỉ giữ ngày · giờ · phút
      if (t.includes('["1 phút", "60 giây"]')) {
        t = thayRows(
          t,
          '["1 phút", "60 giây"]',
          ['["1 ngày", "24 giờ"],', '["1 giờ", "60 phút"],'],
          `${id} bỏ giây khỏi bậc thang`,
        );
        t = thayTatCa(
          t,
          "Bậc thang đơn vị đo thời gian\\n· giờ\\n· phút\\n· giây",
          "Bậc thang đơn vị đo thời gian\\n· ngày\\n· giờ\\n· phút",
          `${id} bỏ “· giây”`,
        );
      }

      // Bảng nhớ có ml / g (Lớp 3) ⇒ đổi sang quan hệ trong chương trình Lớp 2
      if (t.includes("= 1 000 ml") || t.includes("= 1 000 g")) {
        t = thayRows(
          t,
          "= 1 000 ml",
          [
            '["1 m", "= 100 cm"],',
            '["1 dm", "= 10 cm"],',
            '["1 km", "= 1 000 m"],',
          ],
          `${id} bỏ ml/g khỏi bảng nhớ`,
        );
      }
      if (t.includes("= 1 000 g") && !t.includes("= 1 000 ml")) {
        t = thayRows(
          t,
          "= 1 000 g",
          [
            '["1 m", "= 100 cm"],',
            '["1 dm", "= 10 cm"],',
            '["1 km", "= 1 000 m"],',
          ],
          `${id} bỏ g khỏi bảng nhớ`,
        );
      }
    }

    // (T) Bảng đã thay ở đợt 2 làm bài MẤT slide “chỉ từng bước” ⇒ viết lại thành ba bước,
    //     vừa đúng phạm vi vừa giữ khung bài (cổng scratch/soat-bai-mong.mjs đếm chữ “Bước 1/2/3”).
    t = thayTatCa(
      t,
      'text: "Đo độ dài bằng thước có vạch xăng-ti-mét\\n· Vạch 0 trùng với một đầu vật\\n· Đọc số ở đầu kia của vật\\n· Ghi số đo kèm đơn vị cm"',
      `text: ${JSON.stringify(
        [
          "Ba bước đo cho đúng",
          "· Bước 1 — Đặt thước sát vật, vạch 0 trùng với một đầu vật",
          "· Bước 2 — Nhìn đầu kia của vật, đọc số ở vạch đó",
          "· Bước 3 — Ghi kết quả kèm đơn vị cm rồi đo lại một lần",
        ].join("\n"),
      )}`,
      `${id} bảng đo (ba bước)`,
    );
    t = thayTatCa(
      t,
      'text: "Điều bé cần nhớ về thời gian\\n· 1 tuần có 7 ngày\\n· Các ngày trong tuần đọc lần lượt\\n· Xem lịch: đọc thứ, ngày, tháng"',
      `text: ${JSON.stringify(
        [
          "Ba bước xem lịch",
          "· Bước 1 — Đọc thứ trước (thứ Hai, thứ Ba, …)",
          "· Bước 2 — Đọc ngày, rồi đọc tháng",
          "· Bước 3 — Đọc lại cả câu: thứ … ngày … tháng …",
        ].join("\n"),
      )}`,
      `${id} bảng lịch (ba bước)`,
    );

    // (Z) Bù slide ĐÚNG PHẠM VI cho các bài hụt khung sau khi bỏ nội dung sai.
    //     Chốt chống lặp: nếu bài đã có nội dung đó thì bỏ qua (chạy lại công cụ không nhân đôi).
    for (const s of SLIDE_BU[id] ?? []) {
      const khoi = khoiSlide(s.type, s.noi);
      // Tự kiểm: “chốt chống trùng” phải THẬT SỰ có trong slide sẽ chèn — sai thì DỪNG, không chèn.
      if (!khoi.includes(s.moc)) {
        soLoi++;
        bao.push(
          `   ✗ ${id}: chốt “${s.moc.slice(0, 30)}” không có trong slide sẽ chèn — KHÔNG chèn`,
        );
        continue;
      }
      if (t.includes(s.moc)) continue;
      t = chenCuoiBai(t, khoi, `${id} bù slide (${s.type})`);
    }

    out += "\n" + t;
  }

  if (out !== raw) {
    if (GHI) fs.writeFileSync(file, out, "utf8");
    return path.relative(ROOT, file).replace(/\\/g, "/");
  }
  return null;
}

// ── Danh sách file ────────────────────────────────────────────────────────────
const files = [];
for (const e of fs.readdirSync(GOC, { withFileTypes: true })) {
  if (e.isDirectory()) {
    for (const f of fs.readdirSync(path.join(GOC, e.name)))
      if (f.endsWith(".js")) files.push(path.join(GOC, e.name, f));
  }
}

for (const f of files) {
  const kq = xuLyFile(f);
  if (kq) bao.push(`\n→ ${kq}`);
}

fs.writeFileSync("scratch/sua-kien-thuc-chua-hoc.txt", bao.join("\n"), "utf8");
console.log(
  `${GHI ? "ĐÃ GHI" : "chạy thử"}: ${soSua} chỗ sửa · ${soLoi} chỗ LỆCH số lượng (không ghi)`,
);
