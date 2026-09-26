// NHÁNH CỦA LỚP 1 trong bộ sinh bài Luyện tập.
// TÁCH RA TỪ: exerciseGenerator.js · hàm buildQuestion (di chuyển mã nguyên khối).

import { EMOJIS } from "./topics.js";
import { generateOptions, randInt, renderShapeVisual, shuffle } from "./helpers.js";

/** Nhận đủ ngữ cảnh cũ để thân nhánh giữ nguyên từng chữ. Trả về null nếu không khớp. */
export function nhanhLop1(topic, gNum, grade, depth, topicId, pickFromGrade) {
// ==========================================
// --- GRADE 1 GENERATORS ---
// ==========================================
if (topic === "g1_count") {
  const count = randInt(1, 15);
  const emoji = EMOJIS[randInt(0, EMOJIS.length - 1)];
  const icons = Array(count).fill(emoji).join(" ");
  return {
    question: `Có bao nhiêu ${emoji} ở hình dưới?`,
    visualDisplay: icons,
    options: generateOptions(count, 3),
    answer: count,
    hint: "Hãy chạm tay đếm từng hình một nhé!",
    explanation: `Đếm được tất cả ${count} hình ${emoji}.`,
  };
}
if (topic === "g1_add_sub_10") {
  const isAdd = Math.random() > 0.4;
  if (isAdd) {
    const a = randInt(1, 7);
    const b = randInt(1, 10 - a);
    const ans = a + b;
    return {
      question: `Tính nhẩm: ${a} + ${b} = ?`,
      options: generateOptions(ans, 3),
      answer: ans,
      hint: `Bắt đầu từ ${a}, đếm thêm ${b} bước nhé!`,
      explanation: `${a} + ${b} = ${ans}.`,
    };
  } else {
    const a = randInt(2, 10);
    const b = randInt(1, a);
    const ans = a - b;
    return {
      question: `Tính nhẩm: ${a} - ${b} = ?`,
      options: generateOptions(ans, 3),
      answer: ans,
      hint: `Có ${a}, bớt đi ${b} còn lại mấy?`,
      explanation: `${a} - ${b} = ${ans}.`,
    };
  }
}
if (topic === "g1_compare") {
  const a = randInt(0, 20);
  let b = randInt(0, 20);
  if (Math.random() < 0.25) b = a;
  let ans = "=";
  if (a > b) ans = ">";
  if (a < b) ans = "<";
  return {
    question: `Điền dấu thích hợp vào chỗ trống: ${a} ... ${b}`,
    options: [">", "<", "="],
    answer: ans,
    hint: "Mũi tên nhọn luôn chĩa về phía số bé hơn!",
    explanation: `${a} ${ans} ${b}.`,
  };
}
if (topic === "g1_add_sub_20") {
  const isAdd = Math.random() > 0.5;
  if (isAdd) {
    const a = randInt(6, 12);
    const b = randInt(2, 20 - a);
    const ans = a + b;
    return {
      question: `Tính nhẩm: ${a} + ${b} = ?`,
      options: generateOptions(ans, 4),
      answer: ans,
      hint: `Tách số hoặc đếm thêm: ${a} + ${b} = ${ans}!`,
      explanation: `${a} + ${b} = ${ans}.`,
    };
  } else {
    const a = randInt(11, 20);
    const b = randInt(2, a - 1);
    const ans = a - b;
    return {
      question: `Tính nhẩm: ${a} - ${b} = ?`,
      options: generateOptions(ans, 4),
      answer: ans,
      hint: `Lấy ${a} trừ đi ${b} bằng bao nhiêu?`,
      explanation: `${a} - ${b} = ${ans}.`,
    };
  }
}
if (topic === "g1_numbers_100") {
  const chuc = randInt(2, 9);
  const donVi = randInt(0, 9);
  const num = chuc * 10 + donVi;
  return {
    question: `Số gồm ${chuc} chục và ${donVi} đơn vị là số nào?`,
    options: generateOptions(num, 10),
    answer: num,
    hint: `${chuc} chục là ${chuc * 10}, thêm ${donVi} đơn vị!`,
    explanation: `${chuc} chục và ${donVi} đơn vị viết là ${num}.`,
  };
}
if (topic === "g1_add_sub_100") {
  const a = randInt(20, 70);
  const b = randInt(1, 9);
  const ans = a + b;
  return {
    question: `Tính nhẩm: ${a} + ${b} = ?`,
    options: generateOptions(ans, 5),
    answer: ans,
    hint: `Cộng hàng đơn vị trước: 0 + ${b} = ${b}!`,
    explanation: `${a} + ${b} = ${ans}.`,
  };
}
if (topic === "g1_shapes") {
  const shapes = [
    { name: "Hình tròn", type: "circle" },
    { name: "Hình vuông", type: "square" },
    { name: "Hình chữ nhật", type: "rectangle" },
    { name: "Hình tam giác", type: "triangle" },
  ];
  const chosen = shapes[randInt(0, shapes.length - 1)];
  return {
    question: "Hình dưới đây là hình gì?",
    visualDisplay: renderShapeVisual(chosen.type),
    options: shuffle([
      "Hình tròn",
      "Hình vuông",
      "Hình chữ nhật",
      "Hình tam giác",
    ]),
    answer: chosen.name,
    hint: "Quan sát các cạnh và góc của hình nhé!",
    explanation: `Đây chính là ${chosen.name}.`,
  };
}
if (topic === "g1_time_clock") {
  const hour = randInt(1, 12);
  return {
    question: `Đồng hồ có kim ngắn chỉ số ${hour}, kim dài chỉ số 12. Hỏi lúc đó là mấy giờ?`,
    options: shuffle([
      `${hour} giờ`,
      `${(hour % 12) + 1} giờ`,
      `${hour > 1 ? hour - 1 : 12} giờ`,
      "12 giờ",
    ]),
    answer: `${hour} giờ`,
    hint: "Kim ngắn chỉ số nào là đúng số giờ đó khi kim dài chỉ số 12!",
    explanation: `Kim ngắn chỉ ${hour}, kim dài chỉ 12 là ${hour} giờ đúng.`,
  };
}
/**
 * THẺ CHẤM — bé đếm chấm hai thẻ rồi chọn dấu. `type: "dotCards"` để trang Luyện tập
 * vẽ hình tương tác (`DotCardsFill`) thay vì 4 nút A/B/C/D.
 */
if (topic === "g1_dot_cards") {
  const left = randInt(1, 6);
  const right = randInt(1, 6);
  const ans = left > right ? ">" : left < right ? "<" : "=";
  return {
    type: "dotCards",
    dots: { left, right },
    question: "Đếm số chấm ở mỗi thẻ rồi chọn dấu cho đúng nhé!",
    options: [">", "<", "="],
    answer: ans,
    hint: "Đếm chấm hai thẻ rồi so sánh — dấu mở về phía thẻ nhiều chấm hơn.",
    explanation: `Thẻ trái có ${left} chấm, thẻ phải có ${right} chấm nên ${left} ${ans} ${right}.`,
  };
}
// ── Lớp 1 ───────────────────────────────────────────────────────────────
// Nhánh `g1_numbers_20` GIỮ LẠI dù chủ đề đã bỏ khỏi danh sách chọn: bé nào từng
// làm dạng này sẽ còn thấy lại trong Sổ Tay Ôn Bài Sai.
if (topic === "g1_numbers_20") {
  const n = randInt(11, 20);
  const chuc = Math.floor(n / 10);
  const dv = n % 10;
  return {
    question: `Số ${n} gồm mấy chục và mấy đơn vị?`,
    options: shuffle([
      `${chuc} chục và ${dv} đơn vị`,
      `${dv} chục và ${chuc} đơn vị`,
      `${chuc} chục và ${dv === 9 ? 8 : dv + 1} đơn vị`,
      `2 chục và ${dv} đơn vị`,
    ]),
    answer: `${chuc} chục và ${dv} đơn vị`,
    hint: "Số từ 11 đến 20 luôn gồm 1 chục và một số đơn vị!",
    explanation: `${n} = 10 + ${dv}, tức là ${chuc} chục và ${dv} đơn vị.`,
  };
}
if (topic === "g1_shapes_3d") {
  // Câu hỏi bám ĐÚNG hình của SGK Lớp 1 (tr.94 · tr.100 · tr.101), mỗi câu kèm hình.
  // 🔴 `visualDisplay` là DESCRIPTOR gọn ({ kind, mode, params }) chứ KHÔNG phải cây JSX:
  //    cây JSX khi zustand ghi vào localStorage sẽ bị JSON.stringify thành object thường
  //    rồi React ném "Objects are not valid as a React child" khi tải lại trang.
  //    `parsePracticeQuestion` (PracticePage) đổi descriptor thành hình.
  const scene = (mode, params) => ({ kind: "spatialScene", mode, params });
  const cauHoi = [
    {
      q: "Mặt trước của con xúc xắc có mấy chấm?",
      a: 5,
      sai: [3, 4, 6],
      visual: scene("diceFaces"),
      hint: "Mặt trước có 4 chấm ở bốn góc và 1 chấm ở giữa.",
    },
    {
      q: "Mặt bên phải của con xúc xắc có mấy chấm?",
      a: 6,
      sai: [3, 4, 5],
      visual: scene("diceFaces"),
      hint: "Mặt bên phải có 2 cột, mỗi cột 3 chấm.",
    },
    {
      q: "Mặt trên của con xúc xắc có mấy chấm?",
      a: 3,
      sai: [2, 4, 5],
      visual: scene("diceFaces"),
      hint: "Mặt trên có 3 chấm nằm chéo nhau.",
    },
    {
      q: "Lâu đài bạn Mai có mấy khối lập phương ở hàng nền?",
      a: 5,
      sai: [3, 4, 6],
      visual: scene("maisCastle"),
      hint: "Đếm từng khối một ở hàng dưới cùng.",
    },
    {
      q: "Ba chữ T, H, C xếp bằng khối lập phương nhỏ. Chữ nào dùng nhiều khối nhất?",
      a: "chữ H",
      sai: ["chữ T", "chữ C", "ba chữ bằng nhau"],
      visual: scene("lettersTHC"),
      hint: "Chữ T dùng 5 khối, chữ C dùng 5 khối, chữ H dùng 7 khối.",
    },
    {
      q: "Ba hàng gạch xếp chồng: trên cùng 2 viên, hàng giữa 3 viên, dưới cùng 4 viên. Cả ba hàng có tất cả bao nhiêu viên?",
      a: 9,
      sai: [7, 8, 10],
      visual: scene("brickRows"),
      hint: "2 + 3 + 4 = 9 viên gạch.",
    },
    {
      q: "Hai hình đều xếp từ khối lập phương nhỏ. Hình nào có nhiều khối hơn?",
      a: "hai hình bằng nhau",
      sai: [
        "hình bên trái nhiều hơn",
        "hình bên phải nhiều hơn",
        "không đếm được",
      ],
      visual: scene("cubeWalls"),
      hint: "Hình bên trái có 8 khối, hình bên phải 4 × 2 = 8 khối.",
    },
    {
      q: "Xếp 8 khối lập phương nhỏ thành một khối lập phương lớn thì mỗi tầng có mấy khối?",
      a: 4,
      sai: [2, 3, 8],
      visual: scene("cubeComposite2x2"),
      hint: "Mỗi tầng 2 hàng, mỗi hàng 2 khối: 4 khối một tầng.",
    },
    {
      q: "Khối lập phương có mấy mặt?",
      a: "6 mặt",
      sai: ["4 mặt", "8 mặt", "12 mặt"],
    },
    {
      q: "Khối hộp chữ nhật có mấy mặt?",
      a: "6 mặt",
      sai: ["4 mặt", "5 mặt", "8 mặt"],
    },
    {
      q: "Đồ vật nào có dạng KHỐI LẬP PHƯƠNG?",
      a: "con xúc xắc 🎲",
      sai: ["quả bóng ⚽", "lon nước 🥫", "cái đĩa 🍽️"],
    },
    {
      q: "Đồ vật nào có dạng KHỐI HỘP CHỮ NHẬT?",
      a: "viên gạch 🧱",
      sai: ["quả bóng ⚽", "viên bi 🔴", "cái nón 🧢"],
    },
    {
      q: "Khối hộp chữ nhật khác khối lập phương ở điểm nào?",
      a: "các mặt không đều bằng nhau",
      sai: ["có 4 mặt", "không xếp chồng được", "không có mặt nào"],
    },
  ];
  const chon = cauHoi[randInt(0, cauHoi.length - 1)];
  return {
    question: chon.q,
    options: shuffle([chon.a, ...chon.sai]),
    answer: chon.a,
    visualDisplay: chon.visual,
    hint:
      chon.hint ||
      "Khối lập phương có 6 mặt đều là hình vuông; khối hộp chữ nhật có 6 mặt không đều nhau!",
    explanation: `Đáp án đúng là: ${chon.a}.`,
  };
}
if (topic === "g1_compare_2digit") {
  const a = randInt(10, 99);
  let b = randInt(10, 99);
  if (Math.random() < 0.25) b = a;
  const ans = a > b ? ">" : a < b ? "<" : "=";
  return {
    question: `Điền dấu thích hợp vào chỗ trống: ${a} ... ${b}`,
    options: [">", "<", "="],
    answer: ans,
    hint: "So hàng chục trước; hàng chục bằng nhau thì mới so hàng đơn vị!",
    explanation: `${a} ${ans} ${b}.`,
  };
}
if (topic === "g1_length_cm") {
  const kieu = randInt(0, 2);
  if (kieu === 0) {
    const a = randInt(3, 12);
    const b = randInt(2, 9);
    return {
      question: `Đoạn thẳng AB dài ${a} cm, đoạn thẳng BC dài ${b} cm. Hỏi đoạn thẳng AC (nối tiếp) dài bao nhiêu xăng-ti-mét?`,
      options: generateOptions(a + b, 3).map((x) => Math.max(1, x)),
      answer: a + b,
      hint: "Nối tiếp nhau thì cộng hai độ dài lại!",
      explanation: `${a} + ${b} = ${a + b} cm.`,
    };
  }
  if (kieu === 1) {
    const a = randInt(8, 15);
    const b = randInt(2, 7);
    return {
      question: `Băng giấy dài ${a} cm, cắt đi ${b} cm. Hỏi băng giấy còn lại dài bao nhiêu xăng-ti-mét?`,
      options: generateOptions(a - b, 3).map((x) => Math.max(1, x)),
      answer: a - b,
      hint: "Cắt đi thì làm phép trừ!",
      explanation: `${a} - ${b} = ${a - b} cm.`,
    };
  }
  return {
    question: "Đơn vị dùng để đo độ dài trong lớp học là gì?",
    options: shuffle([
      "xăng-ti-mét (cm)",
      "ki-lô-gam (kg)",
      "lít (l)",
      "giờ",
    ]),
    answer: "xăng-ti-mét (cm)",
    hint: "Độ dài là ngắn dài; đo bằng thước kẻ có vạch xăng-ti-mét!",
    explanation: "Đo độ dài bằng xăng-ti-mét (cm).",
  };
}
  return null;
}
