// File này là PHẦN KHUNG (shell) — các slide/hình đã tách sang thư mục cùng tên.
// Dynamic Exercise Generator for Grades 1, 2, 3, 4, 5
// Aligned 100% with Vietnam Primary Education Curriculum (SGK Chuan Bo Giao Duc)
import React from "react";
import { CALC_OP } from "./exercises/topics.js";
import { EMOJIS } from "./exercises/topics.js";
import { TOPICS } from "./exercises/topics.js";
import { buildCalculation } from "./exercises/helpers.js";
import { buildNumberMaze } from "./exercises/helpers.js";
import { digitPlaceOptions } from "./exercises/helpers.js";
import { generateOptions } from "./exercises/helpers.js";
import { mazeRule } from "./exercises/helpers.js";
import { randInt } from "./exercises/helpers.js";
import { renderShapeVisual } from "./exercises/helpers.js";
import { shuffle } from "./exercises/helpers.js";
import { withDistinctOptions } from "./exercises/helpers.js";
export { mazeTopicId, renderShapeVisual } from "./exercises/helpers.js";
export { PRACTICE_EXTRA_TOPICS, TOPICS } from "./exercises/topics.js";
import { nhanhLop1 } from "./exercises/branchesLop1.js";
import { nhanhLop2 } from "./exercises/branchesLop2.js";
import { nhanhLop3 } from "./exercises/branchesLop3.js";
import { nhanhLop4 } from "./exercises/branchesLop4.js";
import { nhanhLop5 } from "./exercises/branchesLop5.js";

/**
 * Rút ngẫu nhiên một khuôn khác RỒI sinh câu từ khuôn đó.
 *
 * Dùng cho hai việc:
 *  1. Các chủ đề "Ôn tập …" — ôn tập nghĩa là trộn kiến thức cả lớp, chứ không phải
 *     một dạng câu riêng. Trước đây các chủ đề này KHÔNG có nhánh `if` nên rơi xuống
 *     câu dự phòng cố định ⇒ bé nhận đúng một câu lặp lại mãi.
 *  2. Lưới an toàn cuối cùng của `buildQuestion` (xem cuối hàm).
 *
 * `depth` chặn đệ quy vô hạn: nếu cả lớp đều thiếu nhánh `if` thì vẫn phải dừng.
 */
function pickFromGrade(grade, topicIds, depth = 0) {
  const ids = topicIds?.length
    ? topicIds
    : (TOPICS[`GRADE_${grade}`] || TOPICS.GRADE_1).map((t) => t.id);
  return buildQuestion(grade, ids[randInt(0, ids.length - 1)], depth);
}

function buildQuestion(grade = 1, topicId = null, depth = 0) {
  const gNum = Number(grade);
  let topic = topicId;
  if (!topic) {
    const topicArr = TOPICS[`GRADE_${gNum}`] || TOPICS.GRADE_1;
    topic = topicArr[randInt(0, topicArr.length - 1)].id;
  }
  /**
   * MÊ CUNG SỐ — DÙNG CHUNG CHO MỌI LỚP (`type: "maze"`).
   *
   * Dải số theo lớp (lớp 1: 1–20, lớp 2–5: 1–99) và “số chặn cửa” random nhưng luôn ở
   * khoảng giữa dải — xem `mazeNumbers`. Đặt TRƯỚC các nhánh lớp 1 vì nó phục vụ mọi lớp.
   */
  if (/^g\d+_number_maze$/.test(topic)) {
    const { min, max, rule } = mazeRule(gNum);
    const { grid } = buildNumberMaze(6, 6, min, max, rule);
    const { op, value } = rule;
    /** Lời đề bài cho bé đọc — khớp đúng dấu đã random (MazePath cũng hiện đúng lời này). */
    const clause = op === ">" ? `lớn hơn ${value}` : `nhỏ hơn ${value}`;
    /** Các số bé ĐƯỢC đi qua — lấy từ chính bảng vừa sinh, không viết cứng. */
    const allowedValues = [
      ...new Set(
        grid.flat().filter((v) => (op === ">" ? v > value : v < value)),
      ),
    ].sort((a, b) => a - b);
    return {
      type: "maze",
      maze: { grid, rule },
      question: `Nối đường từ trường về nhà, chỉ đi qua ô có số ${clause}.`,
      /** Liệt kê số đi được khi dải số còn ngắn (lớp 1); dải 1–99 thì chỉ nói luật cho gọn. */
      note:
        allowedValues.length <= 10
          ? `Chỉ đi qua ô có số ${clause}: ${allowedValues.join(", ")}.`
          : `Chỉ đi qua ô có số ${clause}.`,
      options: ["Đã nối xong"],
      answer: "Đã nối xong",
      hint: `Ô nối tiếp phải nằm ngay cạnh ô vừa nối và phải ${clause}.`,
      explanation: "Bé nối được đường về nhà rồi!",
    };
  }
  const kqlop1 = nhanhLop1(topic, gNum, grade, depth, topicId, pickFromGrade);
  if (kqlop1) return kqlop1;
  const kqlop2 = nhanhLop2(topic, gNum, grade, depth, topicId, pickFromGrade);
  if (kqlop2) return kqlop2;
  const kqlop3 = nhanhLop3(topic, gNum, grade, depth, topicId, pickFromGrade);
  if (kqlop3) return kqlop3;
  const kqlop4 = nhanhLop4(topic, gNum, grade, depth, topicId, pickFromGrade);
  if (kqlop4) return kqlop4;
  const kqlop5 = nhanhLop5(topic, gNum, grade, depth, topicId, pickFromGrade);
  if (kqlop5) return kqlop5;
  if (topic === "g1_final_review")
    return pickFromGrade(
      1,
      [
        "g1_count",
        "g1_add_sub_10",
        "g1_compare",
        "g1_numbers_100",
        "g1_add_sub_100",
        "g1_shapes",
        "g1_shapes_3d",
        "g1_position",
        "g1_time_clock",
      ],
      depth,
    );

  // ── Lớp 2 ───────────────────────────────────────────────────────────────
  if (topic === "g2_review_100") {
    const n = randInt(10, 99);
    const kieu = randInt(0, 2);
    if (kieu === 0)
      return {
        question: `Số liền sau của ${n} là số nào?`,
        options: generateOptions(n + 1, 3),
        answer: n + 1,
        hint: "Số liền sau thì cộng thêm 1!",
        explanation: `Số liền sau của ${n} là ${n + 1}.`,
      };
    if (kieu === 1)
      return {
        question: `Số liền trước của ${n} là số nào?`,
        options: generateOptions(n - 1, 3),
        answer: n - 1,
        hint: "Số liền trước thì bớt đi 1!",
        explanation: `Số liền trước của ${n} là ${n - 1}.`,
      };
    const soSanh = [">", "<", "="][randInt(0, 2)];
    return {
      question: `Điền dấu thích hợp: ${n} ... ${soSanh === ">" ? n - randInt(1, 9) : soSanh === "<" ? n + randInt(1, 9) : n}`,
      options: [">", "<", "="],
      answer: soSanh,
      hint: "Mũi tên nhọn luôn chĩa về phía số bé hơn!",
      explanation: "So hàng chục trước, bằng nhau thì so hàng đơn vị.",
    };
  }
  if (topic === "g2_final_review")
    return pickFromGrade(
      2,
      [
        "g2_review_100",
        "g2_components",
        "g2_add_sub_20",
        "g2_measure_weight",
        "g2_add_sub_100",
        "g2_geometry",
        "g2_time_calendar",
        "g2_mul_2345",
        "g2_div_2345",
        "g2_shapes_3d",
        "g2_numbers_1000",
        "g2_measure",
        "g2_money",
        "g2_add_sub_1000",
        "g2_stats_prob",
      ],
      depth,
    );

  // ── Lớp 3 ───────────────────────────────────────────────────────────────
  // 🔴 Đây là hai khuôn mà chủ app đã phát hiện thiếu: bảng nhân/chia 3 và 4 thuộc
  // LỚP 3 (chủ đề 1), không phải LỚP 2. Trước đây phần Luyện tập lớp 3 chỉ có bảng
  // 6, 7, 8, 9 nên bé lớp 3 không có chỗ luyện bảng 3 và 4.
  if (topic === "g3_mul_3_4") {
    const t = [3, 4][randInt(0, 1)];
    const m = randInt(1, 10);
    const ans = t * m;
    return {
      question: `Tính nhẩm: ${t} × ${m} = ?`,
      options: generateOptions(ans, t * 2),
      answer: ans,
      hint: `Đếm thêm ${t} liên tiếp ${m} lần: ${Array.from(
        { length: Math.min(m, 4) },
        (_, i) => t * (i + 1),
      ).join(", ")}${m > 4 ? ", …" : ""}`,
      explanation: `${t} × ${m} = ${ans}.`,
    };
  }
  if (topic === "g3_final_review")
    return pickFromGrade(
      3,
      [
        "g3_review_1000",
        "g3_mul_3_4",
        "g3_div_3_4",
        "g3_mul_6789",
        "g3_div_6789",
        "g3_fraction",
        "g3_geometry_flat",
        "g3_mul_div_multi",
        "g3_word_problems",
        "g3_measure_units",
        "g3_expressions",
        "g3_numbers_10k",
        "g3_roman",
        "g3_perimeter_area",
        "g3_add_sub_10k",
        "g3_stats_prob",
      ],
      depth,
    );

  // ── Lớp 4 ───────────────────────────────────────────────────────────────
  if (topic === "g4_final_review")
    return pickFromGrade(
      4,
      [
        "g4_numbers_million",
        "g4_measures_stats",
        "g4_add_sub_natural",
        "g4_mul_div_natural",
        "g4_sum_diff",
        "g4_divisibility",
        "g4_geometry",
        "g4_fractions_basic",
        "g4_fractions_calc",
        "g4_sum_ratio",
      ],
      depth,
    );

  // ── Lớp 5 ───────────────────────────────────────────────────────────────
  if (topic === "g5_final_review")
    return pickFromGrade(
      5,
      [
        "g5_fractions_mixed",
        "g5_decimals_basic",
        "g5_decimals_calc",
        "g5_percentages",
        "g5_geometry_plane",
        "g5_geometry_solid",
        "g5_time_units",
        "g5_motion_basic",
        "g5_motion_advanced",
        "g5_charts_stats",
      ],
      depth,
    );

  // ── Lớp 1 (tiếp) ────────────────────────────────────────────────────────
  if (topic === "g1_position") {
    // Mỗi câu có HÌNH (SGK tr.96–98) hoặc là tình huống đời thường của bé.
    // `visualDisplay` = descriptor gọn — xem ghi chú ở `g1_shapes_3d`.
    const scene = (mode, params) => ({ kind: "spatialScene", mode, params });
    const tinhHuong = [
      {
        q: "Hàng có ba bạn Mai, Nam, Rô-bốt. Ai đứng ở bên trái?",
        a: "bạn Mai",
        sai: ["bạn Nam", "Rô-bốt", "không có ai"],
        visual: scene("kidsLeftRight"),
        hint: "Từ trái sang phải là: Mai, Nam, rồi Rô-bốt.",
      },
      {
        q: "Trong hình, bên trái là con vật nào?",
        a: "con thỏ",
        sai: ["con rùa", "con mèo", "con cá"],
        visual: scene("rabbitTurtleLeftRight"),
        hint: "Thỏ đứng bên trái, rùa đứng bên phải.",
      },
      {
        q: "Ba chú thỏ chạy về phía củ cà rốt. Thỏ nào ở giữa?",
        a: "thỏ khoang",
        sai: ["thỏ nâu", "thỏ xám", "không có thỏ nào"],
        visual: scene("rabbitQueue"),
        hint: "Thỏ nâu ở trước, thỏ khoang ở giữa, thỏ xám ở sau.",
      },
      {
        q: "Trong hình, toa nào ở ngay sau đầu máy?",
        a: "toa 1",
        sai: ["toa 2", "toa 3", "toa 4"],
        visual: scene("trainCars"),
        hint: "Đầu máy đi trước, ngay sau đầu máy là toa 1.",
      },
      {
        q: "Trên cột đèn giao thông, đèn ở trên cùng là đèn màu gì?",
        a: "đèn đỏ",
        sai: ["đèn vàng", "đèn xanh", "đèn trắng"],
        visual: scene("trafficLight"),
        hint: "Đèn đỏ ở trên cùng, đèn vàng ở giữa, đèn xanh ở dưới cùng.",
      },
      {
        q: "Đèn vàng ở vị trí nào trên cột đèn?",
        a: "ở giữa",
        sai: ["trên cùng", "dưới cùng", "bên trái"],
        visual: scene("trafficLight", { showColors: true }),
        hint: "Đọc tên màu ghi bên cạnh mỗi đèn để tìm đèn vàng.",
      },
      {
        q: "Hai hàng bạn cùng quay về phía ti vi. Hàng nào ở gần ti vi hơn?",
        a: "hàng trước",
        sai: ["hàng sau", "hai hàng bằng nhau", "không có hàng nào"],
        visual: scene("movieRows", { front: 4, back: 6 }),
        hint: "Hàng trước ở gần ti vi hơn, hàng sau ở xa ti vi hơn.",
      },
      {
        q: "Hàng sau có 6 bạn, hàng trước có 4 bạn. Cả hai hàng có tất cả bao nhiêu bạn?",
        a: 10,
        sai: [8, 9, 11],
        visual: scene("movieRows", { front: 4, back: 6 }),
        hint: "Đếm số bạn ở hình rồi cộng lại: 6 bạn thêm 4 bạn nữa.",
      },
      {
        q: "Búp bê ở đâu so với mặt bàn?",
        a: "ở trên",
        sai: ["ở dưới", "ở trước", "ở sau"],
        visual: scene("dollCatTable"),
        hint: "Ngồi trên mặt bàn nghĩa là ở phía trên.",
      },
      {
        q: "Ba bạn An, Bình, Cường đứng thành một hàng ngang. An đứng ngoài cùng bên trái, Cường đứng ngoài cùng bên phải. Hỏi Bình đứng bên phải bạn nào?",
        a: "bạn An",
        sai: ["bạn Cường", "không bên phải ai", "bên phải cả hai bạn"],
      },
      {
        q: "Trên bàn có quyển sách, trên quyển sách có một cái bút. Hỏi cái bút ở phía nào của quyển sách?",
        a: "ở phía trên",
        sai: ["ở phía dưới", "ở bên trái", "ở bên phải"],
      },
      {
        q: "Cái ghế nằm ở dưới cái bàn. Hỏi cái bàn ở phía nào của cái ghế?",
        a: "ở phía trên",
        sai: ["ở phía dưới", "ở bên trái", "ở bên phải"],
      },
      {
        q: "Bé giơ tay phải lên. Hỏi tay đó ở phía nào của cơ thể bé?",
        a: "phía bên phải",
        sai: ["phía bên trái", "phía trước", "phía sau"],
      },
      {
        q: "Bé đứng quay mặt về phía cửa ra vào, ba lô đeo sau lưng. Hỏi ba lô ở phía nào của bé?",
        a: "phía sau",
        sai: ["phía trước", "phía trên", "phía dưới"],
      },
    ];
    const chon = tinhHuong[randInt(0, tinhHuong.length - 1)];
    return {
      question: chon.q,
      options: shuffle([chon.a, ...chon.sai]),
      answer: chon.a,
      visualDisplay: chon.visual,
      hint: chon.hint || "Đọc kĩ xem đồ vật này nằm ở đâu so với đồ vật kia!",
      explanation: `Đáp án đúng: ${chon.a}.`,
    };
  }
  if (topic === "g1_review_hk1")
    return pickFromGrade(
      1,
      [
        "g1_count",
        "g1_compare",
        "g1_add_sub_10",
        "g1_shapes",
        "g1_shapes_3d",
        "g1_position",
      ],
      depth,
    );

  // ── Lớp 4 (tiếp) ────────────────────────────────────────────────────────
  if (topic === "g4_geometry_angles") {
    const kieu = randInt(0, 2);
    if (kieu === 0) {
      const cauHoi = [
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
      const chon = cauHoi[randInt(0, cauHoi.length - 1)];
      return {
        question: chon.q,
        options: shuffle([chon.a, ...chon.sai]),
        answer: chon.a,
        hint: "Lấy góc vuông của ô li trong vở làm mốc để so!",
        explanation: `Đáp án đúng: ${chon.a}.`,
      };
    }
    if (kieu === 1)
      return {
        question:
          "Hai đường thẳng cắt nhau tạo thành bốn góc vuông. Hai đường thẳng đó gọi là gì?",
        options: shuffle([
          "hai đường thẳng vuông góc",
          "hai đường thẳng song song",
          "hai đường thẳng cắt nhau",
          "hai đường thẳng trùng nhau",
        ]),
        answer: "hai đường thẳng vuông góc",
        hint: "Vuông góc là cắt nhau tạo thành góc vuông!",
        explanation: "Hai đường thẳng vuông góc tạo thành bốn góc vuông.",
      };
    return {
      question:
        "Hai đường thẳng không bao giờ cắt nhau, dù kéo dài mãi, gọi là gì?",
      options: shuffle([
        "hai đường thẳng song song",
        "hai đường thẳng vuông góc",
        "hai đường thẳng cắt nhau",
        "hai đường thẳng xiên nhau",
      ]),
      answer: "hai đường thẳng song song",
      hint: "Hãy nhớ hai thanh ray đường tàu — chúng song song!",
      explanation: "Hai đường thẳng song song không bao giờ cắt nhau.",
    };
  }
  // ── LƯỚI AN TOÀN CUỐI CÙNG ───────────────────────────────────────────────
  // KHÔNG trả một câu cố định nữa. Đã ĐO được hậu quả của bản cũ: 9/57 khuôn thiếu
  // nhánh nên bé nhận ĐÚNG một câu "Tính: 10 + 5 = ?" lặp lại mãi. Rút ngẫu nhiên
  // một khuôn khác của cùng lớp vừa hữu ích vừa không bao giờ để lộ câu vô nghĩa.
  // `depth` chặn đệ quy vô hạn nếu cả lớp đều thiếu nhánh.
  if (depth < 3) return pickFromGrade(gNum, null, depth + 1);
  return {
    question: `Tính nhẩm: ${gNum * 2} + ${gNum * 3} = ?`,
    options: generateOptions(gNum * 5, gNum),
    answer: gNum * 5,
    hint: "Cộng từng hàng một, bắt đầu từ hàng đơn vị!",
    explanation: `${gNum * 2} + ${gNum * 3} = ${gNum * 5}.`,
  };
}

export function generateQuestion(grade = 1, topicId = null) {
  const gNum = Number(grade);
  const list = TOPICS[`GRADE_${gNum}`] || TOPICS.GRADE_1;
  const topic = topicId || list[randInt(0, list.length - 1)].id;
  const q = buildQuestion(gNum, topic);
  return { ...withDistinctOptions(q), ref: `tmpl:${topic}`, topic };
}

/**
 * Sinh 1 câu tính toán cho mini game, kèm `ref` (danh tính câu hỏi) và `topic`.
 *
 * Cùng lý do với `generateQuestion`: mini game cần ghi từng lượt trả lời vào
 * `question_attempts` để biết khuôn nào hỏng, kỹ năng nào yếu.
 *
 * VÌ SAO SUY TỪ `equation` MÀ KHÔNG SỬA TỪNG `return`: `buildCalculation` có **16 chỗ
 * `return`** trải trên 5 nhánh lớp. Sửa từng chỗ là cách chắc chắn để sót một chỗ, và
 * chỗ bị sót sẽ lặng lẽ ghi ra dòng thiếu `ref` mà không ai biết cho tới lúc đọc số liệu.
 * Mọi nhánh đều trả về `equation`, và mỗi câu chỉ chứa MỘT phép tính → suy ra từ chính
 * kết quả là đủ, và tự đúng cho cả những nhánh thêm sau này.
 *
 * Nhánh lạ (không khớp ký hiệu nào) rơi về `other` — không sập, chỉ thô hơn. Nhưng
 * `TC-2.24` khẳng định điều đó KHÔNG xảy ra với 5 lớp hiện có.
 */
export function generateCalculation(grade = 1) {
  const g = Number(grade);
  const q = buildCalculation(g);
  const symbol = Object.keys(CALC_OP).find((s) => q.equation.includes(s));
  const topic = `calc_g${g}_${CALC_OP[symbol] ?? "other"}`;
  return { ...withDistinctOptions(q), ref: `tmpl:${topic}`, topic };
}