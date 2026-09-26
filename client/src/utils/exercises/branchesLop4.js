// NHÁNH CỦA LỚP 4 trong bộ sinh bài Luyện tập.
// TÁCH RA TỪ: exerciseGenerator.js · hàm buildQuestion (di chuyển mã nguyên khối).

import { generateOptions, randInt, renderShapeVisual, shuffle } from "./helpers.js";

/** Nhận đủ ngữ cảnh cũ để thân nhánh giữ nguyên từng chữ. Trả về null nếu không khớp. */
export function nhanhLop4(topic, gNum, grade, depth, topicId, pickFromGrade) {
// ==========================================
// --- GRADE 4 GENERATORS ---
// ==========================================
if (topic === "g4_numbers_million") {
  const num = randInt(1, 9);
  return {
    question: `Số ${num} triệu viết dưới dạng số tự nhiên là:`,
    options: shuffle([
      `${num} 000 000`,
      `${num}00 000`,
      `${num}0 000`,
      `${num} 000 000 000`,
    ]),
    answer: `${num} 000 000`,
    hint: "Số triệu có 6 chữ số 0 đứng sau!",
    explanation: `${num} triệu = ${num} 000 000.`,
  };
}
if (topic === "g4_add_sub_natural") {
  const a = randInt(23500, 84200);
  const b = randInt(12300, 95000 - a);
  const ans = a + b;
  return {
    question: `Tính: ${a.toLocaleString("vi-VN")} + ${b.toLocaleString("vi-VN")} = ?`,
    options: generateOptions(ans, 2000),
    answer: ans,
    hint: "Đặt tính thẳng cột từ phải sang trái!",
    explanation: `${a} + ${b} = ${ans}.`,
  };
}
if (topic === "g4_mul_div_natural") {
  // Mẹo nhân 11
  const n = randInt(21, 85);
  const d1 = Math.floor(n / 10);
  const d2 = n % 10;
  const ans = n * 11;
  return {
    question: `Tính nhanh: ${n} × 11 = ?`,
    options: generateOptions(ans, 20),
    answer: ans,
    hint: `Cộng 2 chữ số: ${d1} + ${d2} = ${d1 + d2}. Chèn kết quả vào giữa!`,
    explanation: `${n} × 11 = ${ans}.`,
  };
}
if (topic === "g4_sum_diff") {
  const be = randInt(10, 45);
  const hieu = randInt(4, 20);
  const lon = be + hieu;
  const tong = lon + be;
  const askLon = Math.random() > 0.5;
  return {
    question: `Tổng hai số là ${tong}, hiệu hai số là ${hieu}. ${askLon ? "Số lớn là:" : "Số bé là:"}`,
    options: shuffle([lon, be, lon + 2, be - 2]),
    answer: askLon ? lon : be,
    hint: askLon ? "Số lớn = (Tổng + Hiệu) : 2" : "Số bé = (Tổng - Hiệu) : 2",
    explanation: `Số lớn = (${tong} + ${hieu}) : 2 = ${lon}; Số bé = (${tong} - ${hieu}) : 2 = ${be}.`,
  };
}
if (topic === "g4_divisibility") {
  const base = randInt(12, 90) * 10;
  const addVal = [0, 2, 5, 8][randInt(0, 3)];
  const testNum = base + addVal;
  const isDiv2 = testNum % 2 === 0;
  const isDiv5 = testNum % 5 === 0;
  return {
    question: `Số ${testNum} có chia hết cho 5 không?`,
    options: shuffle([
      testNum % 5 === 0
        ? "Có, vì tận cùng là 0 hoặc 5"
        : "Không, vì tận cùng không phải 0 hoặc 5",
      testNum % 5 === 0 ? "Không" : "Có",
    ]),
    answer:
      testNum % 5 === 0
        ? "Có, vì tận cùng là 0 hoặc 5"
        : "Không, vì tận cùng không phải 0 hoặc 5",
    hint: "Dấu hiệu chia hết cho 5: chữ số tận cùng là 0 hoặc 5!",
    explanation: `Số ${testNum} có chữ số tận cùng là ${testNum % 10}.`,
  };
}
if (topic === "g4_fractions_basic") {
  const tu = randInt(2, 6);
  const mau = randInt(tu + 1, 9);
  const factor = randInt(2, 5);
  const tuL = tu * factor;
  const mauL = mau * factor;
  return {
    question: `Rút gọn phân số ${tuL}/${mauL} về phân số tối giản ta được:`,
    options: shuffle([
      `${tu}/${mau}`,
      `${tu + 1}/${mau}`,
      `${tu}/${mau + 1}`,
      `${tuL}/${mau}`,
    ]),
    answer: `${tu}/${mau}`,
    hint: `Chia cả tử và mẫu cho ${factor}!`,
    explanation: `${tuL}/${mauL} = (${tuL}:${factor}) / (${mauL}:${factor}) = ${tu}/${mau}.`,
  };
}
if (topic === "g4_fractions_calc") {
  const isMul = Math.random() > 0.5;
  if (isMul) {
    const a = randInt(1, 4);
    const b = randInt(5, 7);
    const c = randInt(1, 3);
    const d = randInt(4, 6);
    const tu = a * c;
    const mau = b * d;
    return {
      question: `Tính: (${a}/${b}) × (${c}/${d}) = ?`,
      options: shuffle([
        `${tu}/${mau}`,
        `${a + c}/${b + d}`,
        `${tu}/${b * c}`,
        `${a * d}/${mau}`,
      ]),
      answer: `${tu}/${mau}`,
      hint: "Nhân phân số: Tử nhân tử, mẫu nhân mẫu!",
      explanation: `(${a}/${b}) × (${c}/${d}) = (${a}×${c})/(${b}×${d}) = ${tu}/${mau}.`,
    };
  } else {
    const a = randInt(1, 5);
    const b = randInt(1, 5);
    const m = randInt(7, 12);
    const tu = a + b;
    return {
      question: `Tính: ${a}/${m} + ${b}/${m} = ?`,
      options: shuffle([
        `${tu}/${m}`,
        `${tu}/${m * 2}`,
        `${a * b}/${m}`,
        `${tu - 1}/${m}`,
      ]),
      answer: `${tu}/${m}`,
      hint: "Cộng hai phân số cùng mẫu: Cộng các tử số, giữ nguyên mẫu số!",
      explanation: `${a}/${m} + ${b}/${m} = (${a}+${b})/${m} = ${tu}/${m}.`,
    };
  }
}
if (topic === "g4_sum_ratio") {
  const pBe = randInt(1, 2);
  const pLon = randInt(3, 5);
  const unit = randInt(4, 12);
  const be = pBe * unit;
  const lon = pLon * unit;
  const tong = be + lon;
  return {
    question: `Tổng hai số là ${tong}, tỉ số của hai số là ${pBe}/${pLon}. Số bé là:`,
    options: shuffle([be, lon, be + 2, be - 2]),
    answer: be,
    hint: `Tổng số phần: ${pBe} + ${pLon} = ${pBe + pLon} phần. Giá trị 1 phần = ${tong} : ${pBe + pLon}!`,
    explanation: `Tổng số phần = ${pBe + pLon}. Giá trị 1 phần = ${tong} : ${pBe + pLon} = ${unit}. Số bé = ${unit} × ${pBe} = ${be}.`,
  };
}
if (topic === "g4_geometry") {
  const isParallelogram = Math.random() > 0.5;
  if (isParallelogram) {
    const a = randInt(8, 20);
    const h = randInt(4, 12);
    const s = a * h;
    return {
      question: `Một hình bình hành có độ dài đáy là ${a} cm và chiều cao ${h} cm. Diện tích hình bình hành là:`,
      visualDisplay: renderShapeVisual("parallelogram"),
      options: generateOptions(s, 20),
      answer: s,
      hint: "Diện tích hình bình hành S = Đáy × Chiều cao (a × h)!",
      explanation: `S = ${a} × ${h} = ${s} cm².`,
    };
  } else {
    const m = randInt(6, 16);
    const n = randInt(4, 12);
    const s = (m * n) / 2;
    return {
      question: `Một hình thoi có độ dài hai đường chéo là ${m} cm và ${n} cm. Diện tích hình thoi là:`,
      visualDisplay: renderShapeVisual("rhombus"),
      options: generateOptions(s, 15),
      answer: s,
      hint: "Diện tích hình thoi S = (m × n) : 2!",
      explanation: `S = (${m} × ${n}) : 2 = ${s} cm².`,
    };
  }
}
if (topic === "g4_measures_stats") {
  const tan = randInt(2, 9);
  const ta = randInt(1, 9);
  const ansKg = tan * 1000 + ta * 100;
  return {
    question: `Đổi: ${tan} tấn ${ta} tạ = ... kg`,
    options: shuffle([
      ansKg,
      tan * 100 + ta * 10,
      tan * 1000 + ta,
      ansKg + 100,
    ]),
    answer: ansKg,
    hint: "1 tấn = 1000 kg, 1 tạ = 100 kg!",
    explanation: `${tan} tấn = ${tan * 1000} kg; ${ta} tạ = ${ta * 100} kg -> ${ansKg} kg.`,
  };
}
if (topic === "g4_area_units") {
  const kieu = randInt(0, 1);
  if (kieu === 0)
    return {
      question: "1 m² bằng bao nhiêu đề-xi-mét vuông?",
      options: shuffle([100, 10, 1000, 10000]),
      answer: 100,
      hint: "1 m = 10 dm, nên 1 m² = 10 × 10 dm²!",
      explanation: "1 m² = 100 dm².",
    };
  const n = randInt(2, 9);
  return {
    question: `Đổi: ${n} m² = ... dm²`,
    options: shuffle([n * 100, n * 10, n * 1000, n * 10000]),
    answer: n * 100,
    hint: "1 m² = 100 dm², nên lấy số mét vuông nhân với 100!",
    explanation: `${n} m² = ${n * 100} dm².`,
  };
}
if (topic === "g4_km2") {
  const kieu = randInt(0, 2);
  if (kieu === 0)
    return {
      question: "1 km² bằng bao nhiêu mét vuông?",
      options: shuffle([1000000, 1000, 10000, 100000]),
      answer: 1000000,
      hint: "1 km = 1000 m, nên 1 km² = 1000 × 1000 m²!",
      explanation: "1 km² = 1 000 000 m².",
    };
  if (kieu === 1) {
    const n = randInt(2, 9);
    return {
      question: `Đổi: ${n} km² = ... m²`,
      options: shuffle([n * 1000000, n * 1000, n * 10000, n * 100000]),
      answer: n * 1000000,
      hint: "1 km² = 1 000 000 m²!",
      explanation: `${n} km² = ${n * 1000000} m².`,
    };
  }
  const a = randInt(3, 9);
  const b = randInt(2, a - 1);
  return {
    question: `Một khu rừng hình chữ nhật dài ${a} km, rộng ${b} km. Diện tích khu rừng là bao nhiêu ki-lô-mét vuông?`,
    options: generateOptions(a * b, 3).map((x) => Math.max(1, x)),
    answer: a * b,
    hint: "Diện tích hình chữ nhật = chiều dài × chiều rộng!",
    explanation: `S = ${a} × ${b} = ${a * b} km².`,
  };
}
if (topic === "g4_map_scale") {
  const tiLe = [100, 200, 500, 1000][randInt(0, 3)];
  const kieu = randInt(0, 1);
  if (kieu === 0) {
    const trenBan = randInt(2, 9);
    const thuc = trenBan * tiLe;
    return {
      question: `Bản đồ có tỉ lệ 1 : ${tiLe}. Trên bản đồ đoạn đường dài ${trenBan} cm. Hỏi trên thực tế đoạn đường dài bao nhiêu xăng-ti-mét?`,
      options: generateOptions(thuc, tiLe).map((x) => Math.max(1, x)),
      answer: thuc,
      hint: `Tỉ lệ 1 : ${tiLe} nghĩa là 1 cm trên bản đồ ứng với ${tiLe} cm thực tế!`,
      explanation: `${trenBan} × ${tiLe} = ${thuc} cm trên thực tế.`,
    };
  }
  const trenBan = randInt(2, 8);
  return {
    question: `Bản đồ ghi tỉ lệ 1 : ${tiLe}. Hỏi 1 cm trên bản đồ ứng với bao nhiêu xăng-ti-mét trên thực tế?`,
    options: shuffle([tiLe, tiLe / 2, tiLe * 10, trenBan]),
    answer: tiLe,
    hint: "Tỉ lệ 1 : a nghĩa là 1 đơn vị trên bản đồ = a đơn vị thực tế.",
    explanation: `1 cm trên bản đồ ứng với ${tiLe} cm trên thực tế.`,
  };
}
  return null;
}
