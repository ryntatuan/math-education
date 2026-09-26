// NHÁNH CỦA LỚP 2 trong bộ sinh bài Luyện tập.
// TÁCH RA TỪ: exerciseGenerator.js · hàm buildQuestion (di chuyển mã nguyên khối).

import {
  digitPlaceOptions,
  generateOptions,
  randInt,
  shuffle,
} from "./helpers.js";

/** Nhận đủ ngữ cảnh cũ để thân nhánh giữ nguyên từng chữ. Trả về null nếu không khớp. */
export function nhanhLop2(topic, _gNum, _grade, depth, _topicId, pickFromGrade) {
// ==========================================
// --- GRADE 2 GENERATORS ---
// ==========================================
if (topic === "g2_add_sub_100") {
  const a = randInt(25, 68);
  const b = randInt(15, 95 - a);
  const ans = a + b;
  return {
    question: `Đặt tính rồi tính: ${a} + ${b} = ?`,
    options: generateOptions(ans, 5),
    answer: ans,
    hint: "Cộng hàng đơn vị trước, nhớ 1 sang hàng chục nhé!",
    explanation: `${a} + ${b} = ${ans}.`,
  };
}
if (topic === "g2_mul_2345") {
  const table = Math.random() > 0.5 ? 2 : 5;
  const multiplier = randInt(1, 10);
  const ans = table * multiplier;
  return {
    question: `Tính nhẩm: ${table} × ${multiplier} = ?`,
    options: generateOptions(ans, table * 2),
    answer: ans,
    hint: `Đếm thêm ${table} liên tiếp ${multiplier} lần!`,
    explanation: `${table} × ${multiplier} = ${ans}.`,
  };
}
if (topic === "g2_div_2345") {
  const divisor = Math.random() > 0.5 ? 2 : 5;
  const quotient = randInt(1, 10);
  const dividend = divisor * quotient;
  return {
    question: `Tính nhẩm: ${dividend} : ${divisor} = ?`,
    options: generateOptions(quotient, 3),
    answer: quotient,
    hint: `${divisor} nhân mấy thì bằng ${dividend}?`,
    explanation: `${dividend} : ${divisor} = ${quotient} (vì ${divisor} × ${quotient} = ${dividend}).`,
  };
}
if (topic === "g2_numbers_1000") {
  const num = randInt(100, 999);
  const hundreds = Math.floor(num / 100);
  const tens = Math.floor((num % 100) / 10);
  const units = num % 10;
  const { answer, options } = digitPlaceOptions([
    { value: hundreds, label: "trăm" },
    { value: tens, label: "chục" },
    { value: units, label: "đơn vị" },
  ]);
  return {
    question: `Số ${num} gồm mấy trăm, mấy chục và mấy đơn vị?`,
    options,
    answer,
    hint: "Đếm từ trái sang phải: hàng trăm, hàng chục, hàng đơn vị!",
    explanation: `${num} = ${hundreds} trăm + ${tens} chục + ${units} đơn vị.`,
  };
}
if (topic === "g2_add_sub_1000") {
  const a = randInt(200, 600);
  const b = randInt(100, 900 - a);
  const ans = a + b;
  return {
    question: `Tính nhẩm: ${a} + ${b} = ?`,
    options: generateOptions(ans, 50),
    answer: ans,
    hint: "Cộng hàng đơn vị, hàng chục rồi hàng trăm nhé!",
    explanation: `${a} + ${b} = ${ans}.`,
  };
}
if (topic === "g2_measure") {
  const val = randInt(2, 9);
  return {
    question: `Đổi: ${val} m = ... dm`,
    options: shuffle([val * 10, val * 100, val, val * 5]),
    answer: val * 10,
    hint: "1 m = 10 dm!",
    explanation: `Vì 1 m = 10 dm nên ${val} m = ${val * 10} dm.`,
  };
}
if (topic === "g2_components") {
  const a = randInt(10, 40);
  const x = randInt(5, 20);
  const sum = a + x;
  return {
    question: `Tìm x, biết: ${a} + x = ${sum}`,
    options: generateOptions(x, 4),
    answer: x,
    hint: "Muốn tìm số hạng chưa biết, lấy tổng trừ đi số hạng đã biết!",
    explanation: `x = ${sum} - ${a} = ${x}.`,
  };
}
if (topic === "g2_geometry") {
  const l1 = randInt(3, 8);
  const l2 = randInt(3, 8);
  const l3 = randInt(3, 8);
  const total = l1 + l2 + l3;
  return {
    question: `Đường gấp khúc ABC gồm 3 đoạn có độ dài lần lượt là ${l1} cm, ${l2} cm và ${l3} cm. Độ dài đường gấp khúc là:`,
    options: generateOptions(total, 5),
    answer: total,
    hint: "Độ dài đường gấp khúc bằng tổng độ dài các đoạn thẳng cộng lại!",
    explanation: `${l1} + ${l2} + ${l3} = ${total} cm.`,
  };
}
if (topic === "g2_time_calendar") {
  const drafts = [
    () => ({
      question: "Một tuần lễ có bao nhiêu ngày?",
      options: shuffle([7, 5, 6, 8]),
      answer: 7,
      hint: "Từ Thứ Hai đến Chủ Nhật có bao nhiêu ngày?",
      explanation: "Một tuần lễ có đúng 7 ngày.",
    }),
    () => {
      const hour = randInt(1, 12);
      const minute = randInt(0, 11) * 5;
      const read =
        minute === 0 ? `${hour} giờ` : `${hour} giờ ${minute} phút`;
      return {
        question: `Đồng hồ có kim ngắn qua số ${hour}, kim dài chỉ số ${minute / 5}. Hỏi lúc đó là mấy giờ?`,
        options: shuffle([
          read,
          `${(hour % 12) + 1} giờ ${minute} phút`,
          `${hour} giờ ${(minute + 5) % 60} phút`,
          `${hour === 1 ? 12 : hour - 1} giờ ${minute} phút`,
        ]),
        answer: read,
        hint: "Kim dài chỉ số nào thì lấy số đó nhân với 5 để ra số phút!",
        explanation: `Kim dài chỉ số ${minute / 5} ⇒ ${minute / 5} × 5 = ${minute} phút. Vậy là ${read}.`,
      };
    },
    () => {
      const days = [28, 29, 30, 31][randInt(0, 3)];
      const month = randInt(1, 12);
      return {
        question: `Tháng ${month} có thể có bao nhiêu ngày? (chọn đáp án có thể đúng)`,
        options: shuffle([28, 29, 30, 31]),
        answer: days,
        hint: "Tháng 2 có 28 hoặc 29 ngày; tháng 4, 6, 9, 11 có 30 ngày; các tháng còn lại có 31 ngày.",
        explanation: `Tháng ${month} có thể có ${days} ngày.`,
      };
    },
  ];
  return drafts[randInt(0, drafts.length - 1)]();
}
if (topic === "g2_stats_prob") {
  const suKien = [
    { q: "Mặt trời mọc ở hướng Đông", a: "Chắc chắn xảy ra" },
    { q: "Ngày mai trời có mưa", a: "Có thể xảy ra" },
    { q: "Tháng Hai có 32 ngày", a: "Không thể xảy ra" },
    { q: "Một tuần lễ có 7 ngày", a: "Chắc chắn xảy ra" },
    { q: "Tung một con xúc xắc được mặt 7 chấm", a: "Không thể xảy ra" },
    {
      q: "Lấy được một viên bi đỏ khi hộp có cả bi đỏ và bi xanh",
      a: "Có thể xảy ra",
    },
    { q: "Bé lớn lên thêm 1 tuổi sau một năm", a: "Chắc chắn xảy ra" },
    { q: "Tháng Sáu có 31 ngày", a: "Không thể xảy ra" },
  ];
  const chon = suKien[randInt(0, suKien.length - 1)];
  return {
    question: `Sự kiện "${chon.q}" là sự kiện:`,
    options: shuffle([
      "Chắc chắn xảy ra",
      "Có thể xảy ra",
      "Không thể xảy ra",
    ]),
    answer: chon.a,
    hint: "Hỏi xem sự việc đó luôn xảy ra, không bao giờ xảy ra, hay tuỳ lúc?",
    explanation: `"${chon.q}" là sự kiện ${chon.a.toLowerCase()}.`,
  };
}
if (topic === "g2_add_sub_20") {
  const isAdd = Math.random() > 0.5;
  if (isAdd) {
    const a = randInt(6, 9);
    const b = randInt(11 - a, 9);
    const ans = a + b;
    return {
      question: `Tính nhẩm: ${a} + ${b} = ?`,
      options: generateOptions(ans, 4),
      answer: ans,
      hint: `Tách ${b} = ${10 - a} + ${b - (10 - a)}, rồi cộng cho đủ 10 trước!`,
      explanation: `${a} + ${b} = ${ans} (cộng qua 10).`,
    };
  }
  const a = randInt(12, 18);
  const b = randInt(3, 9);
  const ans = a - b;
  return {
    question: `Tính nhẩm: ${a} - ${b} = ?`,
    options: generateOptions(ans, 4),
    answer: ans,
    hint: `Tách ${b} để trừ cho tròn 10 trước, rồi trừ nốt phần còn lại!`,
    explanation: `${a} - ${b} = ${ans} (trừ qua 10).`,
  };
}
if (topic === "g2_measure_weight") {
  const kieu = randInt(0, 2);
  if (kieu === 0) {
    const kg = randInt(2, 9);
    return {
      question: `Bao gạo nặng ${kg} kg, bớt đi 1 kg thì còn bao nhiêu ki-lô-gam?`,
      options: generateOptions(kg - 1, 2),
      answer: kg - 1,
      hint: "Bớt đi thì làm phép trừ!",
      explanation: `${kg} - 1 = ${kg - 1} kg.`,
    };
  }
  if (kieu === 1) {
    const l = randInt(3, 9);
    return {
      question: `Can có ${l} lít nước, rót thêm ${randInt(1, 3)} lít nữa. Can có tất cả bao nhiêu lít?`,
      options: generateOptions(l + 2, 2),
      answer: l + 2,
      hint: "Rót thêm thì làm phép cộng!",
      explanation: `Đơn vị đo dung tích là lít.`,
    };
  }
  return {
    question: "Đơn vị nào dùng để đo KHỐI LƯỢNG?",
    options: shuffle([
      "ki-lô-gam (kg)",
      "lít (l)",
      "xăng-ti-mét (cm)",
      "giờ",
    ]),
    answer: "ki-lô-gam (kg)",
    hint: "Khối lượng là nặng nhẹ; dung tích là nhiều ít chất lỏng.",
    explanation: "Đo khối lượng bằng kg; đo dung tích bằng lít.",
  };
}
if (topic === "g2_review_hk1")
  return pickFromGrade(
    2,
    [
      "g2_review_100",
      "g2_add_sub_20",
      "g2_add_sub_100",
      "g2_geometry",
      "g2_time_calendar",
      "g2_components",
    ],
    depth,
  );

if (topic === "g2_shapes_3d") {
  const cauHoi = [
    {
      q: "Vật nào có dạng KHỐI TRỤ?",
      a: "lon nước 🥫",
      sai: ["quả bóng ⚽", "con xúc xắc 🎲", "quyển sách 📕"],
    },
    {
      q: "Vật nào có dạng KHỐI CẦU?",
      a: "quả bóng ⚽",
      sai: ["lon nước 🥫", "hộp sữa 🥛", "cái hộp 📦"],
    },
    {
      q: "Khối trụ có hai mặt đáy là hình gì?",
      a: "hình tròn",
      sai: ["hình vuông", "hình tam giác", "hình chữ nhật"],
    },
    {
      q: "Quả địa cầu 🌍 có dạng khối gì?",
      a: "khối cầu",
      sai: ["khối trụ", "khối lập phương", "khối hộp chữ nhật"],
    },
  ];
  const chon = cauHoi[randInt(0, cauHoi.length - 1)];
  return {
    question: chon.q,
    options: shuffle([chon.a, ...chon.sai]),
    answer: chon.a,
    hint: "Khối trụ lăn được và có hai đáy tròn; khối cầu tròn xoe như quả bóng.",
    explanation: `Đáp án đúng là: ${chon.a}.`,
  };
}
if (topic === "g2_money") {
  const kieu = randInt(0, 3);
  if (kieu === 0) {
    const t = [10, 20, 50][randInt(0, 2)];
    return {
      question: `Tờ tiền ${t} 000 đồng đổi được mấy tờ 10 000 đồng?`,
      options: generateOptions(t / 10, 2),
      answer: t / 10,
      hint: "Lấy số tiền lớn chia cho 10 000!",
      explanation: `${t} 000 : 10 000 = ${t / 10} tờ.`,
    };
  }
  if (kieu === 1) {
    const a = randInt(2, 5) * 5000;
    const b = randInt(2, 5) * 5000;
    return {
      question: `Một hộp bút giá ${a} đồng, một quyển vở giá ${b} đồng. Mua cả hai hết bao nhiêu tiền?`,
      options: generateOptions(a + b, 5000),
      answer: a + b,
      hint: "Mua cả hai thì cộng hai số tiền lại!",
      explanation: `${a} + ${b} = ${a + b} đồng.`,
    };
  }
  if (kieu === 2) {
    const tong = randInt(4, 10) * 5000;
    const gia = randInt(1, 3) * 5000;
    return {
      question: `Bé có ${tong} đồng, mua quyển vở hết ${gia} đồng. Bé còn lại bao nhiêu tiền?`,
      options: generateOptions(tong - gia, 5000),
      answer: tong - gia,
      hint: "Còn lại thì làm phép trừ!",
      explanation: `${tong} - ${gia} = ${tong - gia} đồng.`,
    };
  }
  return {
    question: "Đơn vị tiền của Việt Nam là gì?",
    options: shuffle(["đồng", "đô-la", "yên", "nhân dân tệ"]),
    answer: "đồng",
    hint: "Trên mỗi tờ tiền Việt Nam đều ghi chữ “đồng”!",
    explanation: "Đơn vị tiền tệ của Việt Nam là ĐỒNG.",
  };
}
  return null;
}
