// NHÁNH CỦA LỚP 5 trong bộ sinh bài Luyện tập.
// TÁCH RA TỪ: exerciseGenerator.js · hàm buildQuestion (di chuyển mã nguyên khối).

import { generateOptions, randInt, renderShapeVisual, shuffle } from "./helpers.js";

/** Nhận đủ ngữ cảnh cũ để thân nhánh giữ nguyên từng chữ. Trả về null nếu không khớp. */
export function nhanhLop5(topic, gNum, grade, depth, topicId, pickFromGrade) {
// ==========================================
// --- GRADE 5 GENERATORS ---
// ==========================================
if (topic === "g5_decimals_basic") {
  const n = randInt(12, 98);
  const d = randInt(1, 9);
  const val = parseFloat(`${n}.${d}`);
  return {
    question: `Trong số thập phân ${val}, phần thập phân là:`,
    options: shuffle([`0,${d}`, `${d}`, `${n}`, `0,0${d}`]),
    answer: `0,${d}`,
    hint: "Phần thập phân là phần đứng sau dấu phẩy!",
    explanation: `Số ${val} có phần nguyên là ${n} và phần thập phân là 0,${d}.`,
  };
}
if (topic === "g5_decimals_calc") {
  const a = (randInt(12, 85) / 10).toFixed(1);
  const b = (randInt(11, 45) / 10).toFixed(1);
  const isAdd = Math.random() > 0.5;
  if (isAdd) {
    const ans = (parseFloat(a) + parseFloat(b)).toFixed(1);
    return {
      question: `Tính: ${a.replace(".", ",")} + ${b.replace(".", ",")} = ?`,
      options: shuffle([
        ans.replace(".", ","),
        (parseFloat(ans) + 0.2).toFixed(1).replace(".", ","),
        (parseFloat(ans) - 0.2).toFixed(1).replace(".", ","),
        (parseFloat(ans) + 1).toFixed(1).replace(".", ","),
      ]),
      answer: ans.replace(".", ","),
      hint: "Đặt tính thẳng cột các dấu phẩy rồi cộng!",
      explanation: `${a} + ${b} = ${ans}.`,
    };
  } else {
    const big = Math.max(parseFloat(a), parseFloat(b));
    const small = Math.min(parseFloat(a), parseFloat(b));
    const ans = (big - small).toFixed(1);
    return {
      question: `Tính: ${big.toFixed(1).replace(".", ",")} - ${small.toFixed(1).replace(".", ",")} = ?`,
      options: shuffle([
        ans.replace(".", ","),
        (parseFloat(ans) + 0.2).toFixed(1).replace(".", ","),
        (parseFloat(ans) - 0.2).toFixed(1).replace(".", ","),
        (parseFloat(ans) + 1).toFixed(1).replace(".", ","),
      ]),
      answer: ans.replace(".", ","),
      hint: "Đặt tính thẳng cột các dấu phẩy rồi trừ!",
      explanation: `${big} - ${small} = ${ans}.`,
    };
  }
}
if (topic === "g5_percentages") {
  const total = [20, 40, 50, 80, 100, 200][randInt(0, 5)];
  const pct = [10, 20, 25, 50, 75][randInt(0, 4)];
  const ans = (total * pct) / 100;
  return {
    question: `Tìm ${pct}% của ${total} kg:`,
    options: generateOptions(ans, 10),
    answer: ans,
    hint: `Lấy ${total} nhân với ${pct} rồi chia cho 100!`,
    explanation: `${total} × ${pct} : 100 = ${ans} kg.`,
  };
}
if (topic === "g5_fractions_mixed") {
  const whole = randInt(2, 5);
  const tu = randInt(1, 3);
  const mau = randInt(4, 5);
  const ansTu = whole * mau + tu;
  return {
    question: `Chuyển hỗn số ${whole} và ${tu}/${mau} thành phân số:`,
    options: shuffle([
      `${ansTu}/${mau}`,
      `${ansTu + 1}/${mau}`,
      `${whole * tu}/${mau}`,
      `${ansTu}/${mau + 1}`,
    ]),
    answer: `${ansTu}/${mau}`,
    hint: `Tử số = (Phần nguyên × Mẫu) + Tử = (${whole} × ${mau} + ${tu})!`,
    explanation: `${whole} ${tu}/${mau} = (${whole}×${mau}+${tu})/${mau} = ${ansTu}/${mau}.`,
  };
}
if (topic === "g5_geometry_plane") {
  const shapePick = ["triangle", "trapezoid", "circle"][randInt(0, 2)];
  if (shapePick === "triangle") {
    const a = randInt(6, 16);
    const h = randInt(4, 10);
    const s = (a * h) / 2;
    return {
      question: `Một hình tam giác có đáy ${a} cm và chiều cao ${h} cm. Diện tích tam giác là:`,
      visualDisplay: renderShapeVisual("triangle"),
      options: generateOptions(s, 10),
      answer: s,
      hint: "Diện tích tam giác S = (đáy × chiều cao) : 2!",
      explanation: `S = (${a} × ${h}) : 2 = ${s} cm².`,
    };
  } else if (shapePick === "trapezoid") {
    const a = randInt(10, 18);
    const b = randInt(4, 8);
    const h = randInt(4, 8);
    const s = ((a + b) * h) / 2;
    return {
      question: `Hình thang có đáy lớn ${a} cm, đáy bé ${b} cm và chiều cao ${h} cm. Diện tích là:`,
      visualDisplay: renderShapeVisual("trapezoid"),
      options: generateOptions(s, 15),
      answer: s,
      hint: "S = (đáy lớn + đáy bé) × chiều cao : 2!",
      explanation: `S = (${a} + ${b}) × ${h} : 2 = ${s} cm².`,
    };
  } else {
    const r = randInt(2, 6);
    const s = parseFloat((r * r * 3.14).toFixed(2));
    return {
      question: `Hình tròn có bán kính r = ${r} cm. Diện tích hình tròn đó là:`,
      visualDisplay: renderShapeVisual("circle_r"),
      options: shuffle([
        `${s} cm²`,
        `${(r * 2 * 3.14).toFixed(2)} cm²`,
        `${(s + 3.14).toFixed(2)} cm²`,
        `${(s - 3.14).toFixed(2)} cm²`,
      ]),
      answer: `${s} cm²`,
      hint: "Diện tích hình tròn S = r × r × 3,14!",
      explanation: `S = ${r} × ${r} × 3,14 = ${s} cm².`,
    };
  }
}
if (topic === "g5_geometry_solid") {
  const isCube = Math.random() > 0.5;
  if (isCube) {
    const a = randInt(2, 6);
    const v = a * a * a;
    return {
      question: `Một hình lập phương có cạnh dài ${a} cm. Thể tích của hình lập phương là:`,
      visualDisplay: renderShapeVisual("cube"),
      options: generateOptions(v, 15),
      answer: v,
      hint: "Thể tích hình lập phương V = a × a × a!",
      explanation: `V = ${a} × ${a} × ${a} = ${v} cm³.`,
    };
  } else {
    const a = randInt(4, 8);
    const b = randInt(2, 5);
    const c = randInt(3, 6);
    const v = a * b * c;
    return {
      question: `Một hình hộp chữ nhật có kích thước dài ${a} cm, rộng ${b} cm, cao ${c} cm. Thể tích là:`,
      visualDisplay: renderShapeVisual("cuboid"),
      options: generateOptions(v, 20),
      answer: v,
      hint: "Thể tích hình hộp chữ nhật V = a × b × c!",
      explanation: `V = ${a} × ${b} × ${c} = ${v} cm³.`,
    };
  }
}
if (topic === "g5_time_units") {
  const h = randInt(1, 4);
  const m = randInt(15, 45);
  const totalMinutes = h * 60 + m;
  return {
    question: `Đổi: ${h} giờ ${m} phút = ... phút`,
    options: generateOptions(totalMinutes, 20),
    answer: totalMinutes,
    hint: `1 giờ = 60 phút! Lấy ${h} × 60 + ${m}!`,
    explanation: `${h} giờ = ${h * 60} phút; ${h * 60} + ${m} = ${totalMinutes} phút.`,
  };
}
if (topic === "g5_motion_basic") {
  const type = ["v", "s", "t"][randInt(0, 2)];
  if (type === "v") {
    const s = [90, 120, 150, 180, 240][randInt(0, 4)];
    const t = [2, 3, 4][randInt(0, 2)];
    const v = s / t;
    return {
      question: `Một ô tô đi được quãng đường ${s} km trong ${t} giờ. Vận tốc của ô tô là:`,
      options: generateOptions(v, 10).map((x) => `${x} km/h`),
      answer: `${v} km/h`,
      hint: "Vận tốc = Quãng đường : Thời gian (v = s : t)!",
      explanation: `v = ${s} : ${t} = ${v} km/h.`,
    };
  } else if (type === "s") {
    const v = [35, 40, 45, 50, 60][randInt(0, 4)];
    const t = randInt(2, 4);
    const s = v * t;
    return {
      question: `Một xe máy chạy với vận tốc ${v} km/h trong ${t} giờ. Quãng đường xe máy đã đi là:`,
      options: generateOptions(s, 30).map((x) => `${x} km`),
      answer: `${s} km`,
      hint: "Quãng đường = Vận tốc × Thời gian (s = v × t)!",
      explanation: `s = ${v} × ${t} = ${s} km.`,
    };
  } else {
    const v = [30, 40, 50, 60][randInt(0, 3)];
    const t = randInt(2, 4);
    const s = v * t;
    return {
      question: `Quãng đường AB dài ${s} km, một ô tô đi với vận tốc ${v} km/h. Thời gian ô tô đi hết quãng đường là:`,
      options: generateOptions(t, 2).map((x) => `${x} giờ`),
      answer: `${t} giờ`,
      hint: "Thời gian = Quãng đường : Vận tốc (t = s : v)!",
      explanation: `t = ${s} : ${v} = ${t} giờ.`,
    };
  }
}
if (topic === "g5_motion_advanced") {
  const v1 = [40, 50, 60][randInt(0, 2)];
  const v2 = [30, 40, 50][randInt(0, 2)];
  const t = randInt(2, 3);
  const s = (v1 + v2) * t;
  return {
    question: `Hai thành phố cách nhau ${s} km. Hai ô tô khởi hành cùng lúc đi ngược chiều nhau với vận tốc lần lượt là ${v1} km/h và ${v2} km/h. Sau bao lâu hai xe gặp nhau?`,
    options: generateOptions(t, 2).map((x) => `${x} giờ`),
    answer: `${t} giờ`,
    hint: `Tổng vận tốc 2 xe = ${v1} + ${v2}. Thời gian gặp nhau = Quãng đường : Tổng vận tốc!`,
    explanation: `Tổng vận tốc = ${v1 + v2} km/h. Thời gian gặp nhau = ${s} : ${v1 + v2} = ${t} giờ.`,
  };
}
if (topic === "g5_charts_stats") {
  const mauSac = randInt(2, 5);
  const phanTram = [50, 25, 20, 40][randInt(0, 3)];
  const rutGon = ["1/2", "1/4", "1/5", "2/5"][
    [50, 25, 20, 40].indexOf(phanTram)
  ];
  return {
    question: `Biểu đồ hình quạt biểu thị 100% học sinh một trường. Nếu số học sinh thích môn Toán chiếm ${phanTram}% thì tương ứng với phân số nào?`,
    options: shuffle(["1/2", "1/4", "1/5", "2/5", "3/5", "1/10"]).slice(0, 4),
    answer: rutGon,
    hint: `${phanTram}% = ${phanTram}/100, rồi rút gọn phân số đó!`,
    explanation: `${phanTram}% = ${phanTram}/100 = ${rutGon}. (Biểu đồ có ${mauSac} phần.)`,
  };
}
// ── Lớp 5 (tiếp) ────────────────────────────────────────────────────────
if (topic === "g5_area_units") {
  const bang = [
    { donVi: "dam²", heSo: 100 },
    { donVi: "hm²", heSo: 10000 },
    { donVi: "ha", heSo: 10000 },
  ];
  const chon = bang[randInt(0, bang.length - 1)];
  const n = randInt(2, 9);
  return {
    question: `Đổi: ${n} ${chon.donVi} = ... m²`,
    options: shuffle([
      n * chon.heSo,
      n * chon.heSo * 10,
      (n * chon.heSo) / 10,
      n * chon.heSo * 100,
    ]).map((x) => Math.round(x)),
    answer: n * chon.heSo,
    hint: "1 dam² = 100 m² · 1 hm² = 10 000 m² · 1 ha = 10 000 m²!",
    explanation: `${n} ${chon.donVi} = ${n * chon.heSo} m².`,
  };
}
  return null;
}
