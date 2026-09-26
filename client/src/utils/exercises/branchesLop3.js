// NHÁNH CỦA LỚP 3 trong bộ sinh bài Luyện tập.
// TÁCH RA TỪ: exerciseGenerator.js · hàm buildQuestion (di chuyển mã nguyên khối).

import { digitPlaceOptions, generateOptions, randInt, shuffle } from "./helpers.js";

/** Nhận đủ ngữ cảnh cũ để thân nhánh giữ nguyên từng chữ. Trả về null nếu không khớp. */
export function nhanhLop3(topic, gNum, grade, depth, topicId, pickFromGrade) {
// ==========================================
// --- GRADE 3 GENERATORS ---
// ==========================================
if (topic === "g3_mul_6789") {
  const t = [6, 7, 8, 9][randInt(0, 3)];
  const m = randInt(2, 9);
  const ans = t * m;
  return {
    question: `Tính nhẩm: ${t} × ${m} = ?`,
    options: generateOptions(ans, 8),
    answer: ans,
    hint: `Nhẩm bảng nhân ${t}: ${t} × ${m} = ${ans}!`,
    explanation: `${t} × ${m} = ${ans}.`,
  };
}
if (topic === "g3_div_6789") {
  const d = [6, 7, 8, 9][randInt(0, 3)];
  const q = randInt(3, 9);
  const r = randInt(1, d - 1);
  const dividend = d * q + r;
  return {
    question: `Tính: ${dividend} : ${d} = ?`,
    options: shuffle([
      `${q} (dư ${r})`,
      `${q + 1} (dư ${r})`,
      `${q} (dư ${r + 1 >= d ? 1 : r + 1})`,
      `${q - 1} (dư ${r})`,
    ]),
    answer: `${q} (dư ${r})`,
    hint: `Tìm số lớn nhất nhân với ${d} mà bé hơn ${dividend}!`,
    explanation: `${dividend} = ${d} × ${q} + ${r}, thương là ${q} dư ${r}.`,
  };
}
if (topic === "g3_fraction") {
  const den = [2, 3, 4, 5, 6, 7, 8, 9][randInt(0, 7)];
  const total = den * randInt(2, 6);
  const ans = total / den;
  return {
    question: `Tìm 1/${den} của ${total} quả táo:`,
    options: generateOptions(ans, 3),
    answer: ans,
    hint: `Muốn tìm 1/${den} của ${total}, ta lấy ${total} chia cho ${den}!`,
    explanation: `${total} : ${den} = ${ans} quả táo.`,
  };
}
if (topic === "g3_mul_div_multi") {
  const a = randInt(12, 85);
  const b = randInt(2, 6);
  const ans = a * b;
  return {
    question: `Đặt tính rồi tính: ${a} × ${b} = ?`,
    options: generateOptions(ans, 15),
    answer: ans,
    hint: `Nhân hàng đơn vị trước: ${a % 10} × ${b}, nhớ hàng chục!`,
    explanation: `${a} × ${b} = ${ans}.`,
  };
}
if (topic === "g3_numbers_100k") {
  const roman = [
    { r: "IV", v: 4 },
    { r: "VI", v: 6 },
    { r: "IX", v: 9 },
    { r: "XI", v: 11 },
    { r: "XIV", v: 14 },
    { r: "XV", v: 15 },
    { r: "XIX", v: 19 },
    { r: "XX", v: 20 },
  ];
  const chosen = roman[randInt(0, roman.length - 1)];
  return {
    question: `Chữ số La Mã "${chosen.r}" biểu diễn số tự nhiên nào?`,
    options: generateOptions(chosen.v, 4),
    answer: chosen.v,
    hint: "X là 10, V là 5, I là 1. I đứng trước V là 4, đứng trước X là 9!",
    explanation: `Chữ số La Mã ${chosen.r} có giá trị là ${chosen.v}.`,
  };
}
if (topic === "g3_perimeter_area") {
  const isSquare = Math.random() > 0.5;
  if (isSquare) {
    const a = randInt(4, 12);
    const perim = a * 4;
    return {
      question: `Một hình vuông có cạnh dài ${a} cm. Chu vi hình vuông đó là:`,
      options: generateOptions(perim, 8),
      answer: perim,
      hint: "Chu vi hình vuông = Cạnh × 4!",
      explanation: `${a} × 4 = ${perim} cm.`,
    };
  } else {
    const d = randInt(5, 12);
    const r = randInt(2, d - 1);
    const area = d * r;
    return {
      question: `Hình chữ nhật có chiều dài ${d} cm, chiều rộng ${r} cm. Diện tích của hình chữ nhật là:`,
      options: generateOptions(area, 10),
      answer: area,
      hint: "Diện tích hình chữ nhật = Chiều dài × Chiều rộng!",
      explanation: `S = ${d} × ${r} = ${area} cm².`,
    };
  }
}
if (topic === "g3_measure_units") {
  const kg = randInt(2, 8);
  return {
    question: `Đổi: ${kg} kg = ... gam`,
    options: shuffle([kg * 1000, kg * 100, kg * 10, kg * 10000]),
    answer: kg * 1000,
    hint: "1 kg = 1000 g!",
    explanation: `${kg} kg = ${kg * 1000} g.`,
  };
}
if (topic === "g3_expressions") {
  const a = randInt(10, 50);
  const b = randInt(2, 9);
  const c = randInt(2, 5);
  const ans = a + b * c;
  return {
    question: `Tính giá trị biểu thức: ${a} + ${b} × ${c} = ?`,
    options: generateOptions(ans, 10),
    answer: ans,
    hint: "Nhớ thực hiện phép nhân trước, cộng sau!",
    explanation: `${a} + (${b} × ${c}) = ${a} + ${b * c} = ${ans}.`,
  };
}
if (topic === "g3_word_problems") {
  const a = randInt(5, 15);
  const times = randInt(2, 4);
  const b = a * times;
  const total = a + b;
  return {
    question: `Thùng thứ nhất có ${a} lít dầu. Thùng thứ hai có gấp ${times} lần thùng thứ nhất. Hỏi cả hai thùng có bao nhiêu lít dầu?`,
    options: generateOptions(total, 10),
    answer: total,
    hint: `Bước 1: Tìm thùng thứ hai = ${a} × ${times}. Bước 2: Cộng cả hai thùng!`,
    explanation: `Thùng 2 có: ${a} × ${times} = ${b} lít. Cả 2 thùng có: ${a} + ${b} = ${total} lít.`,
  };
}
if (topic === "g3_stats_prob") {
  const tinhHuong = [
    {
      q: "Trong hộp có 5 viên bi đỏ và 5 viên bi xanh, không nhìn vào hộp bốc 1 viên thì bốc được bi đỏ",
      a: "Có thể xảy ra",
    },
    {
      q: "Trong hộp chỉ có bi đỏ, bốc 1 viên thì bốc được bi đỏ",
      a: "Chắc chắn xảy ra",
    },
    {
      q: "Trong hộp chỉ có bi đỏ, bốc 1 viên thì bốc được bi xanh",
      a: "Không thể xảy ra",
    },
    { q: "Cây cao thêm sau một năm", a: "Chắc chắn xảy ra" },
    { q: "Ngày mai bé được điểm 10", a: "Có thể xảy ra" },
    { q: "Một tuần lễ có 10 ngày", a: "Không thể xảy ra" },
  ];
  const chon = tinhHuong[randInt(0, tinhHuong.length - 1)];
  return {
    question: `${chon.q}. Đó là sự kiện:`,
    options: shuffle([
      "Chắc chắn xảy ra",
      "Có thể xảy ra",
      "Không thể xảy ra",
    ]),
    answer: chon.a,
    hint: "Tự hỏi: việc đó luôn xảy ra, không bao giờ xảy ra, hay tuỳ lúc?",
    explanation: `Đó là sự kiện ${chon.a.toLowerCase()}.`,
  };
}
if (topic === "g3_div_3_4") {
  const d = [3, 4][randInt(0, 1)];
  const q = randInt(2, 10);
  const dividend = d * q;
  return {
    question: `Tính nhẩm: ${dividend} : ${d} = ?`,
    options: generateOptions(q, 2),
    answer: q,
    hint: `${d} nhân mấy thì bằng ${dividend}?`,
    explanation: `${dividend} : ${d} = ${q} (vì ${d} × ${q} = ${dividend}).`,
  };
}
if (topic === "g3_geometry_flat") {
  if (Math.random() > 0.5) {
    const doan = randInt(6, 20);
    const dat = Math.random() > 0.5;
    return {
      question: `Đoạn thẳng AB dài ${doan} cm. M là trung điểm của AB. Hỏi AM dài bao nhiêu xăng-ti-mét?`,
      options: generateOptions(doan / 2, 3),
      answer: doan / 2,
      hint: "Trung điểm chia đoạn thẳng thành hai phần bằng nhau!",
      explanation: `AM = MB = ${doan} : 2 = ${doan / 2} cm${dat ? "" : ""}.`,
    };
  }
  const goc = [
    {
      q: "Góc bé hơn góc vuông gọi là gì?",
      a: "góc nhọn",
      sai: ["góc tù", "góc bẹt", "góc vuông"],
    },
    {
      q: "Góc lớn hơn góc vuông và bé hơn góc bẹt gọi là gì?",
      a: "góc tù",
      sai: ["góc nhọn", "góc vuông", "góc bẹt"],
    },
    {
      q: "Góc bằng hai góc vuông gọi là gì?",
      a: "góc bẹt",
      sai: ["góc nhọn", "góc tù", "góc vuông"],
    },
  ];
  const chon = goc[randInt(0, goc.length - 1)];
  return {
    question: chon.q,
    options: shuffle([chon.a, ...chon.sai]),
    answer: chon.a,
    hint: "Góc vuông tham chiếu là góc của cạnh ô vuông trong vở!",
    explanation: `Đáp án đúng: ${chon.a}.`,
  };
}
if (topic === "g3_review_hk1")
  return pickFromGrade(
    3,
    [
      "g3_review_1000",
      "g3_mul_3_4",
      "g3_div_3_4",
      "g3_mul_6789",
      "g3_div_6789",
      "g3_fraction",
      "g3_mul_div_multi",
      "g3_measure_units",
      "g3_expressions",
    ],
    depth,
  );

if (topic === "g3_numbers_10k") {
  const n = randInt(1000, 9999);
  const nghin = Math.floor(n / 1000);
  const tram = Math.floor((n % 1000) / 100);
  const chuc = Math.floor((n % 100) / 10);
  const dv = n % 10;
  const { answer, options } = digitPlaceOptions([
    { value: nghin, label: "nghìn" },
    { value: tram, label: "trăm" },
    { value: chuc, label: "chục" },
    { value: dv, label: "đơn vị" },
  ]);
  return {
    question: `Số ${n} gồm mấy nghìn, mấy trăm, mấy chục và mấy đơn vị?`,
    options,
    answer,
    hint: "Đọc lần lượt từ trái sang phải: nghìn → trăm → chục → đơn vị!",
    explanation: `${n} = ${nghin}000 + ${tram}00 + ${chuc}0 + ${dv}.`,
  };
}
if (topic === "g3_roman") {
  const laMa = [
    { r: "I", v: 1 },
    { r: "II", v: 2 },
    { r: "III", v: 3 },
    { r: "IV", v: 4 },
    { r: "V", v: 5 },
    { r: "VI", v: 6 },
    { r: "IX", v: 9 },
    { r: "X", v: 10 },
    { r: "XI", v: 11 },
    { r: "XIV", v: 14 },
    { r: "XV", v: 15 },
    { r: "XIX", v: 19 },
    { r: "XX", v: 20 },
    { r: "XXI", v: 21 },
  ];
  const chon = laMa[randInt(0, laMa.length - 1)];
  return {
    question: `Chữ số La Mã “${chon.r}” biểu diễn số tự nhiên nào?`,
    options: generateOptions(chon.v, 4).map((x) => Math.max(1, x)),
    answer: chon.v,
    hint: "I = 1, V = 5, X = 10. I đứng TRƯỚC V hoặc X thì bớt đi 1!",
    explanation: `Chữ số La Mã ${chon.r} có giá trị là ${chon.v}.`,
  };
}
if (topic === "g3_add_sub_10k") {
  const isAdd = Math.random() > 0.5;
  if (isAdd) {
    const a = randInt(1000, 6000);
    const b = randInt(1000, 9999 - a);
    return {
      question: `Đặt tính rồi tính: ${a} + ${b} = ?`,
      options: generateOptions(a + b, 50),
      answer: a + b,
      hint: "Đặt tính thẳng cột rồi cộng từ hàng đơn vị, nhớ sang hàng bên trái!",
      explanation: `${a} + ${b} = ${a + b}.`,
    };
  }
  const a = randInt(5000, 9999);
  const b = randInt(1000, a - 1);
  return {
    question: `Đặt tính rồi tính: ${a} - ${b} = ?`,
    options: generateOptions(a - b, 50),
    answer: a - b,
    hint: "Đặt tính thẳng cột rồi trừ từ phải sang trái, mượn khi cần!",
    explanation: `${a} - ${b} = ${a - b}.`,
  };
}
if (topic === "g3_add_sub_100k") {
  const isAdd = Math.random() > 0.5;
  if (isAdd) {
    const a = randInt(10000, 60000);
    const b = randInt(10000, 99999 - a);
    return {
      question: `Đặt tính rồi tính: ${a} + ${b} = ?`,
      options: generateOptions(a + b, 500),
      answer: a + b,
      hint: "Cộng từ hàng đơn vị lên hàng chục nghìn!",
      explanation: `${a} + ${b} = ${a + b}.`,
    };
  }
  const a = randInt(50000, 99999);
  const b = randInt(10000, a - 1);
  return {
    question: `Đặt tính rồi tính: ${a} - ${b} = ?`,
    options: generateOptions(a - b, 500),
    answer: a - b,
    hint: "Trừ từ phải sang trái, mượn 1 từ hàng bên trái khi không đủ trừ!",
    explanation: `${a} - ${b} = ${a - b}.`,
  };
}
if (topic === "g3_mul_div_100k") {
  if (Math.random() > 0.5) {
    const a = randInt(10000, 40000);
    const b = randInt(2, 4);
    return {
      question: `Đặt tính rồi tính: ${a} × ${b} = ?`,
      options: generateOptions(a * b, 1000),
      answer: a * b,
      hint: "Nhân lần lượt từ hàng đơn vị lên hàng chục nghìn, nhớ sang trái!",
      explanation: `${a} × ${b} = ${a * b}.`,
    };
  }
  const b = randInt(2, 4);
  const q = randInt(10000, 20000);
  return {
    question: `Đặt tính rồi tính: ${b * q} : ${b} = ?`,
    options: generateOptions(q, 1000),
    answer: q,
    hint: "Chia lần lượt từ hàng chục nghìn xuống hàng đơn vị!",
    explanation: `${b * q} : ${b} = ${q}.`,
  };
}
if (topic === "g3_time_money") {
  const kieu = randInt(0, 2);
  if (kieu === 0) {
    const gio = randInt(1, 11);
    const phut = randInt(1, 11) * 5;
    return {
      question: `${gio} giờ ${phut} phút còn đọc là mấy giờ kém mấy phút?`,
      options: shuffle([
        `${gio + 1} giờ kém ${60 - phut} phút`,
        `${gio} giờ kém ${60 - phut} phút`,
        `${gio + 1} giờ kém ${phut} phút`,
        `${gio} giờ kém ${phut} phút`,
      ]),
      answer: `${gio + 1} giờ kém ${60 - phut} phút`,
      hint: "Còn bao nhiêu phút nữa là tới giờ tiếp theo thì gọi là “kém bấy nhiêu”!",
      explanation: `${gio} giờ ${phut} phút = ${gio + 1} giờ kém ${60 - phut} phút.`,
    };
  }
  if (kieu === 1) {
    return {
      question: "Một năm có bao nhiêu tháng?",
      options: generateOptions(12, 2),
      answer: 12,
      hint: "Đếm từ tháng 1 đến tháng 12!",
      explanation: "Một năm có 12 tháng.",
    };
  }
  const gia = randInt(3, 9) * 5000;
  const dua = Math.ceil((gia + 5000) / 10000) * 10000;
  return {
    question: `Bé mua hộp bút giá ${gia} đồng và đưa ${dua} đồng. Bé được trả lại bao nhiêu tiền?`,
    options: generateOptions(dua - gia, 5000),
    answer: dua - gia,
    hint: "Tiền thừa = số tiền đưa trừ số tiền phải trả!",
    explanation: `${dua} - ${gia} = ${dua - gia} đồng.`,
  };
}
if (topic === "g3_review_1000") {
  const n = randInt(100, 999);
  const tram = Math.floor(n / 100);
  const chuc = Math.floor((n % 100) / 10);
  const dv = n % 10;
  if (Math.random() > 0.5) {
    const { answer, options } = digitPlaceOptions([
      { value: tram, label: "trăm" },
      { value: chuc, label: "chục" },
      { value: dv, label: "đơn vị" },
    ]);
    return {
      question: `Số ${n} gồm mấy trăm, mấy chục và mấy đơn vị?`,
      options,
      answer,
      hint: "Đọc từ trái sang phải: hàng trăm → hàng chục → hàng đơn vị!",
      explanation: `${n} = ${tram} trăm + ${chuc} chục + ${dv} đơn vị.`,
    };
  }
  const a = randInt(200, 700);
  const b = randInt(100, 999 - a);
  return {
    question: `Đặt tính rồi tính: ${a} + ${b} = ?`,
    options: generateOptions(a + b, 20),
    answer: a + b,
    hint: "Cộng từ hàng đơn vị, nhớ 1 sang hàng chục rồi hàng trăm!",
    explanation: `${a} + ${b} = ${a + b}.`,
  };
}
  return null;
}
