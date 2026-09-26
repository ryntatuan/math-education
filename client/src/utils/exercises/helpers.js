// helpers.js
// TÁCH RA TỪ: exerciseGenerator.js
// (di chuyển mã nguyên khối — không sửa nội dung)

import React from "react";
import { MAZE_MAX } from "./topics.js";

export function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function generateOptions(correctAnswer, range = 5, isString = false) {
  if (isString) {
    return [correctAnswer];
  }
  const options = new Set([correctAnswer]);
  let attempts = 0;
  const maxRange = Math.max(range, 3);
  while (options.size < 4 && attempts < 60) {
    attempts++;
    const delta = randInt(-maxRange, maxRange);
    const val = correctAnswer + delta;
    if (val >= 0 && val !== correctAnswer) {
      options.add(val);
    }
  }
  let fallback = Math.max(0, correctAnswer - 3);
  while (options.size < 4) {
    if (fallback !== correctAnswer && !options.has(fallback)) {
      options.add(fallback);
    }
    fallback++;
  }
  return shuffle(Array.from(options));
}

export function digitPlaceOptions(places) {
  const text = (list) => list.map((p) => `${p.value} ${p.label}`).join(", ");
  const correct = text(places);
  const options = new Set([correct]);
  for (let i = 0; i < places.length; i++)
    for (let j = i + 1; j < places.length; j++) {
      const copy = places.map((p) => ({ ...p }));
      [copy[i].value, copy[j].value] = [copy[j].value, copy[i].value];
      options.add(text(copy));
    }
  for (let offset = 1; options.size < 4 && offset < 10; offset++) {
    const copy = places.map((p) => ({ ...p }));
    const at = copy.length - 1; // lệch hàng đơn vị trước
    copy[at].value = (copy[at].value + offset) % 10;
    options.add(text(copy));
  }
  return { answer: correct, options: shuffle([...options]) };
}

export function randomLongRoute(rows, cols, minCells, maxCells, runs = 80) {
  const STEPS = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  for (let run = 0; run < runs; run++) {
    const seen = new Set(["0-0"]);
    const path = [[0, 0]];
    let found = null;
    const dfs = (r, c) => {
      if (found) return;
      if (r === rows - 1 && c === cols - 1) {
        // Chỉ nhận khi đường đã đủ DÀI nhưng chưa quá dài
        if (path.length >= minCells) found = path.map((p) => [...p]);
        return;
      }
      if (path.length >= maxCells) return; // hết chỗ lang thang
      for (const [dr, dc] of shuffle(STEPS)) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;
        const k = `${nr}-${nc}`;
        if (seen.has(k)) continue;
        seen.add(k);
        path.push([nr, nc]);
        dfs(nr, nc);
        seen.delete(k);
        path.pop();
        if (found) return;
      }
    };
    dfs(0, 0);
    if (found && found.length >= minCells) return found;
  }
  return [];
}

export function buildNumberMaze(rows, cols, min, max, rule) {
  const inGrid = (r, c) => r >= 0 && c >= 0 && r < rows && c < cols;
  const key = (r, c) => `${r}-${c}`;
  const STEPS = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  /** Phía số thoả luật: `>` ⇒ số LỚN, `<` ⇒ số BÉ. */
  const lonHon = rule.op === ">";
  const openRange = lonHon ? [rule.value + 1, max] : [min, rule.value - 1];
  const blockRange = lonHon ? [min, rule.value] : [rule.value, max];
  /** Ô ĐI ĐƯỢC. Ô ngoài tập này nhận số ở phía còn lại nên không nối vào được. */
  const open = new Set();

  // ── 1. ĐƯỜNG NGẮN NHẤT: chỉ rẽ phải/xuống ⇒ đúng bằng đường ngắn nhất có thể, ──
  //    nhưng phải LẮT LÉO. Thử nhiều cách trộn, lấy cách có nhiều lần đổi hướng nhất
  //    (và đạt mức tối thiểu) — nếu chỉ trộn một lần thì có lúc ra “xuống thẳng rồi ngang qua”.
  const minTurns = Math.max(3, Math.round((rows + cols - 2) / 2));
  const pickMoves = () => {
    let best = null;
    let bestTurns = -1;
    for (let attempt = 0; attempt < 60; attempt++) {
      const thu = shuffle([
        ...Array(rows - 1).fill("D"),
        ...Array(cols - 1).fill("R"),
      ]);
      let turns = 0;
      for (let i = 1; i < thu.length; i++) if (thu[i] !== thu[i - 1]) turns++;
      if (turns > bestTurns) {
        best = thu;
        bestTurns = turns;
      }
      if (turns >= minTurns) return thu;
    }
    return best;
  };
  const moves = pickMoves();
  const shortPath = [[0, 0]];
  let r = 0;
  let c = 0;
  for (const m of moves) {
    if (m === "R") c += 1;
    else r += 1;
    shortPath.push([r, c]);
  }
  shortPath.forEach(([a, b]) => open.add(key(a, b)));

  // ── 2. ĐƯỜNG DÀI HƠN (13–15 ô): một đường VÒNG VÈO dựng sẵn ──
  //    Chọn phương án làm bảng mở rộng ÍT NHẤT (≤ 19 ô) để bảng vẫn còn chỗ cho ngõ cụt.
  let longRoute = [];
  let bestUnion = Infinity;
  for (let attempt = 0; attempt < 40; attempt++) {
    const thu = randomLongRoute(rows, cols, 13, 15);
    if (!thu.length) continue;
    const union = new Set([...open, ...thu.map(([a, b]) => key(a, b))]);
    if (union.size < bestUnion) {
      bestUnion = union.size;
      longRoute = thu;
    }
    if (bestUnion <= 19) break;
  }
  longRoute.forEach(([a, b]) => open.add(key(a, b)));

  // ── 3. MỞ THÊM VÀI Ô cho bảng thoáng (thêm đường hợp lệ + thêm nhánh cụt) ──
  //    Chỉ mở ô NẰM SÁT một ô đang mở ⇒ mọi ô mở đều tới được từ ô xuất phát. Ưu tiên mở
  //    loại ô “cụt” (chỉ có ĐÚNG 1 ô mở bên cạnh) để vừa thoáng vừa chắc chắn có ngõ cụt.
  const frontier = () => {
    const out = new Set();
    for (const k of open) {
      const [a, b] = k.split("-").map(Number);
      for (const [da, db] of STEPS) {
        const x = a + da;
        const y = b + db;
        if (inGrid(x, y) && !open.has(key(x, y))) out.add(key(x, y));
      }
    }
    return [...out];
  };
  const soOMoBenCanh = (k) => {
    const [a, b] = k.split("-").map(Number);
    return STEPS.filter(([da, db]) => open.has(key(a + da, b + db))).length;
  };
  const allFrontier = frontier();
  const tipFrontier = allFrontier.filter((k) => soOMoBenCanh(k) === 1);
  const restFrontier = allFrontier.filter((k) => soOMoBenCanh(k) > 1);
  [
    ...shuffle(tipFrontier).slice(0, randInt(1, 2)),
    ...shuffle(restFrontier).slice(0, randInt(1, 2)),
  ].forEach((k) => open.add(k));

  // ── 4. CHẮC CHẮN CÓ NGÕ CỤT: ô CHƯA mở mà chỉ có ĐÚNG MỘT ô mở bên cạnh ──
  //    Mở nó ⇒ từ nó chỉ quay lại được ô vừa đi qua ⇒ cụt thật. Bước này làm SAU cùng
  //    nên các ô mở thêm ở bước 3 không thể “nối dài” cho nó.
  const deadEndTips = [];
  for (let i = 0; i < rows; i++)
    for (let j = 0; j < cols; j++) {
      if (open.has(key(i, j))) continue;
      const soOMoBenCanh = STEPS.filter(([da, db]) =>
        open.has(key(i + da, j + db)),
      ).length;
      if (soOMoBenCanh === 1) deadEndTips.push([i, j]);
    }
  if (deadEndTips.length) {
    const [dr, dc] = deadEndTips[randInt(0, deadEndTips.length - 1)];
    open.add(key(dr, dc));
  }

  // ── 5. RẮC SỐ: ô đi được nhận số ở PHÍA THOẢ LUẬT, ô còn lại nhận số ở phía kia ──
  const grid = Array.from({ length: rows }, (_, i) =>
    Array.from({ length: cols }, (_, j) =>
      open.has(key(i, j))
        ? randInt(openRange[0], openRange[1])
        : randInt(blockRange[0], blockRange[1]),
    ),
  );
  return { grid, rule };
}

export function mazeRule(grade) {
  const min = 1;
  const max = MAZE_MAX[Number(grade)] || 20;
  const span = max - min;
  return {
    min,
    max,
    rule: {
      /** Dấu cũng random: “đi qua ô lớn hơn N” hoặc “đi qua ô nhỏ hơn N”. */
      op: Math.random() < 0.5 ? ">" : "<",
      value: randInt(
        min + Math.round(span * 0.3),
        max - Math.round(span * 0.3),
      ),
    },
  };
}

export function mazeTopicId(grade) {
  const g = Number(grade);
  return `g${g >= 1 && g <= 5 ? g : 1}_number_maze`;
}

export function withDistinctOptions(q) {
  if (!q || !Array.isArray(q.options)) return q;
  const key = (v) => String(v);
  const distinct = [];
  for (const o of q.options)
    if (!distinct.some((d) => key(d) === key(o))) distinct.push(o);
  // Đáp án phải LUÔN nằm trong lựa chọn — cổng `S-15` và bộ chấm điểm đều dựa vào đó.
  if (!distinct.some((d) => key(d) === key(q.answer)))
    distinct.unshift(q.answer);
  if (distinct.length < 3 && typeof q.answer === "number") {
    for (let offset = 1; offset < 60 && distinct.length < 4; offset++)
      for (const cand of [q.answer + offset, q.answer - offset])
        if (cand >= 0 && !distinct.some((d) => key(d) === key(cand)))
          distinct.push(cand);
  }
  return { ...q, options: shuffle(distinct) };
}

export const renderShapeVisual = (shapeType, params = {}) => {
  if (shapeType === "circle") {
    return React.createElement(
      "svg",
      {
        width: 90,
        height: 90,
        viewBox: "0 0 90 90",
        style: { display: "block", margin: "auto" },
      },
      React.createElement("circle", {
        cx: 45,
        cy: 45,
        r: 38,
        fill: "#FF6B6B",
        stroke: "#C92A2A",
        strokeWidth: 4,
      }),
    );
  }
  if (shapeType === "square") {
    return React.createElement(
      "svg",
      {
        width: 90,
        height: 90,
        viewBox: "0 0 90 90",
        style: { display: "block", margin: "auto" },
      },
      React.createElement("rect", {
        x: 8,
        y: 8,
        width: 74,
        height: 74,
        rx: 6,
        fill: "#4DABF7",
        stroke: "#1864AB",
        strokeWidth: 4,
      }),
    );
  }
  if (shapeType === "rectangle") {
    return React.createElement(
      "svg",
      {
        width: 160,
        height: 90,
        viewBox: "0 0 160 90",
        style: { display: "block", margin: "auto" },
      },
      React.createElement("rect", {
        x: 8,
        y: 12,
        width: 144,
        height: 66,
        rx: 6,
        fill: "#51CF66",
        stroke: "#2B8A3E",
        strokeWidth: 4,
      }),
    );
  }
  if (shapeType === "triangle") {
    return React.createElement(
      "svg",
      {
        width: 100,
        height: 90,
        viewBox: "0 0 100 90",
        style: { display: "block", margin: "auto" },
      },
      React.createElement("polygon", {
        points: "50,8 92,80 8,80",
        fill: "#FFA94D",
        stroke: "#D9480F",
        strokeWidth: 4,
        strokeLinejoin: "round",
      }),
    );
  }
  if (shapeType === "parallelogram") {
    return React.createElement(
      "svg",
      {
        width: 160,
        height: 90,
        viewBox: "0 0 160 90",
        style: { display: "block", margin: "auto" },
      },
      React.createElement("polygon", {
        points: "35,12 150,12 125,78 10,78",
        fill: "#E599F7",
        stroke: "#862E9C",
        strokeWidth: 4,
        strokeLinejoin: "round",
      }),
      React.createElement("line", {
        x1: 35,
        y1: 12,
        x2: 35,
        y2: 78,
        stroke: "#495057",
        strokeWidth: 2,
        strokeDasharray: "4,4",
      }),
      React.createElement(
        "text",
        { x: 40, y: 50, fill: "#862E9C", fontSize: "13", fontWeight: "bold" },
        "h",
      ),
      React.createElement(
        "text",
        { x: 65, y: 88, fill: "#862E9C", fontSize: "13", fontWeight: "bold" },
        "a (đáy)",
      ),
    );
  }
  if (shapeType === "rhombus") {
    return React.createElement(
      "svg",
      {
        width: 120,
        height: 100,
        viewBox: "0 0 120 100",
        style: { display: "block", margin: "auto" },
      },
      React.createElement("polygon", {
        points: "60,8 112,50 60,92 8,50",
        fill: "#63E6BE",
        stroke: "#0CA678",
        strokeWidth: 4,
        strokeLinejoin: "round",
      }),
      React.createElement("line", {
        x1: 60,
        y1: 8,
        x2: 60,
        y2: 92,
        stroke: "#087F5B",
        strokeWidth: 2,
        strokeDasharray: "3,3",
      }),
      React.createElement("line", {
        x1: 8,
        y1: 50,
        x2: 112,
        y2: 50,
        stroke: "#087F5B",
        strokeWidth: 2,
        strokeDasharray: "3,3",
      }),
    );
  }
  if (shapeType === "trapezoid") {
    return React.createElement(
      "svg",
      {
        width: 160,
        height: 90,
        viewBox: "0 0 160 90",
        style: { display: "block", margin: "auto" },
      },
      React.createElement("polygon", {
        points: "40,15 120,15 150,78 10,78",
        fill: "#FFD43B",
        stroke: "#F59F00",
        strokeWidth: 4,
        strokeLinejoin: "round",
      }),
      React.createElement("line", {
        x1: 40,
        y1: 15,
        x2: 40,
        y2: 78,
        stroke: "#495057",
        strokeWidth: 2,
        strokeDasharray: "4,4",
      }),
      React.createElement(
        "text",
        { x: 70, y: 12, fill: "#E67700", fontSize: "12", fontWeight: "bold" },
        "b (đáy bé)",
      ),
      React.createElement(
        "text",
        { x: 65, y: 88, fill: "#E67700", fontSize: "12", fontWeight: "bold" },
        "a (đáy lớn)",
      ),
      React.createElement(
        "text",
        { x: 44, y: 50, fill: "#495057", fontSize: "12", fontWeight: "bold" },
        "h",
      ),
    );
  }
  if (shapeType === "circle_r") {
    return React.createElement(
      "svg",
      {
        width: 100,
        height: 100,
        viewBox: "0 0 100 100",
        style: { display: "block", margin: "auto" },
      },
      React.createElement("circle", {
        cx: 50,
        cy: 50,
        r: 42,
        fill: "#EBFBEE",
        stroke: "#40C057",
        strokeWidth: 4,
      }),
      React.createElement("circle", { cx: 50, cy: 50, r: 3, fill: "#2B8A3E" }),
      React.createElement("line", {
        x1: 50,
        y1: 50,
        x2: 92,
        y2: 50,
        stroke: "#2B8A3E",
        strokeWidth: 3,
      }),
      React.createElement(
        "text",
        { x: 42, y: 46, fill: "#2B8A3E", fontSize: "12", fontWeight: "bold" },
        "O",
      ),
      React.createElement(
        "text",
        { x: 66, y: 44, fill: "#2B8A3E", fontSize: "13", fontWeight: "bold" },
        "r",
      ),
    );
  }
  if (shapeType === "cuboid") {
    return React.createElement(
      "svg",
      {
        width: 130,
        height: 100,
        viewBox: "0 0 130 100",
        style: { display: "block", margin: "auto" },
      },
      // Front face
      React.createElement("rect", {
        x: 15,
        y: 35,
        width: 75,
        height: 50,
        fill: "#A5D8FF",
        stroke: "#1971C2",
        strokeWidth: 3,
      }),
      // Top face
      React.createElement("polygon", {
        points: "15,35 45,10 120,10 90,35",
        fill: "#D0EBFF",
        stroke: "#1971C2",
        strokeWidth: 3,
      }),
      // Side face
      React.createElement("polygon", {
        points: "90,35 120,10 120,60 90,85",
        fill: "#74C0FC",
        stroke: "#1971C2",
        strokeWidth: 3,
      }),
    );
  }
  if (shapeType === "cube") {
    return React.createElement(
      "svg",
      {
        width: 110,
        height: 100,
        viewBox: "0 0 110 100",
        style: { display: "block", margin: "auto" },
      },
      React.createElement("rect", {
        x: 15,
        y: 35,
        width: 55,
        height: 55,
        fill: "#FFD8A8",
        stroke: "#E8590C",
        strokeWidth: 3,
      }),
      React.createElement("polygon", {
        points: "15,35 40,12 95,12 70,35",
        fill: "#FFE8CC",
        stroke: "#E8590C",
        strokeWidth: 3,
      }),
      React.createElement("polygon", {
        points: "70,35 95,12 95,67 70,90",
        fill: "#FFA94D",
        stroke: "#E8590C",
        strokeWidth: 3,
      }),
    );
  }
  return null;
};

export function buildCalculation(grade = 1) {
  const g = Number(grade);
  if (g === 1) {
    const isAdd = Math.random() > 0.4;
    if (isAdd) {
      const a = randInt(1, 9);
      const b = randInt(1, Math.min(10 - a, 9));
      const ans = a + b;
      return {
        question: `${a} + ${b} = ?`,
        equation: `${a} + ${b}`,
        options: generateOptions(ans, 3),
        answer: ans,
      };
    } else {
      const a = randInt(2, 10);
      const b = randInt(1, a - 1);
      const ans = a - b;
      return {
        question: `${a} - ${b} = ?`,
        equation: `${a} - ${b}`,
        options: generateOptions(ans, 3),
        answer: ans,
      };
    }
  } else if (g === 2) {
    const opType = randInt(1, 4);
    if (opType === 1) {
      const a = randInt(12, 49);
      const b = randInt(11, 49);
      const ans = a + b;
      return {
        question: `${a} + ${b} = ?`,
        equation: `${a} + ${b}`,
        options: generateOptions(ans, 5),
        answer: ans,
      };
    } else if (opType === 2) {
      const a = randInt(30, 95);
      const b = randInt(11, a - 10);
      const ans = a - b;
      return {
        question: `${a} - ${b} = ?`,
        equation: `${a} - ${b}`,
        options: generateOptions(ans, 5),
        answer: ans,
      };
    } else if (opType === 3) {
      const a = [2, 5][randInt(0, 1)];
      const b = randInt(2, 9);
      const ans = a * b;
      return {
        question: `${a} × ${b} = ?`,
        equation: `${a} × ${b}`,
        options: generateOptions(ans, 4),
        answer: ans,
      };
    } else {
      const a = [2, 5][randInt(0, 1)];
      const ans = randInt(2, 9);
      const dividend = a * ans;
      return {
        question: `${dividend} : ${a} = ?`,
        equation: `${dividend} : ${a}`,
        options: generateOptions(ans, 3),
        answer: ans,
      };
    }
  } else if (g === 3) {
    const opType = randInt(1, 4);
    if (opType === 1) {
      const a = randInt(110, 480);
      const b = randInt(110, 480);
      const ans = a + b;
      return {
        question: `${a} + ${b} = ?`,
        equation: `${a} + ${b}`,
        options: generateOptions(ans, 20),
        answer: ans,
      };
    } else if (opType === 2) {
      const a = randInt(300, 950);
      const b = randInt(110, a - 100);
      const ans = a - b;
      return {
        question: `${a} - ${b} = ?`,
        equation: `${a} - ${b}`,
        options: generateOptions(ans, 20),
        answer: ans,
      };
    } else if (opType === 3) {
      const a = [6, 7, 8, 9][randInt(0, 3)];
      const b = randInt(3, 9);
      const ans = a * b;
      return {
        question: `${a} × ${b} = ?`,
        equation: `${a} × ${b}`,
        options: generateOptions(ans, 6),
        answer: ans,
      };
    } else {
      const a = [6, 7, 8, 9][randInt(0, 3)];
      const ans = randInt(3, 9);
      const dividend = a * ans;
      return {
        question: `${dividend} : ${a} = ?`,
        equation: `${dividend} : ${a}`,
        options: generateOptions(ans, 4),
        answer: ans,
      };
    }
  } else if (g === 4) {
    const opType = randInt(1, 4);
    if (opType === 1) {
      const a = randInt(1200, 8500);
      const b = randInt(1200, 8500);
      const ans = a + b;
      return {
        question: `${a.toLocaleString("vi-VN")} + ${b.toLocaleString("vi-VN")} = ?`,
        equation: `${a} + ${b}`,
        options: generateOptions(ans, 100),
        answer: ans,
      };
    } else if (opType === 2) {
      const a = randInt(5000, 9900);
      const b = randInt(1000, 4500);
      const ans = a - b;
      return {
        question: `${a.toLocaleString("vi-VN")} - ${b.toLocaleString("vi-VN")} = ?`,
        equation: `${a} - ${b}`,
        options: generateOptions(ans, 100),
        answer: ans,
      };
    } else if (opType === 3) {
      const a = randInt(15, 65);
      const ans = a * 11;
      return {
        question: `${a} × 11 = ?`,
        equation: `${a} × 11`,
        options: generateOptions(ans, 20),
        answer: ans,
      };
    } else {
      const a = randInt(120, 840);
      const b = [2, 3, 4, 5, 6][randInt(0, 4)];
      const rounded = a - (a % b);
      const ans = rounded / b;
      return {
        question: `${rounded} : ${b} = ?`,
        equation: `${rounded} : ${b}`,
        options: generateOptions(ans, 10),
        answer: ans,
      };
    }
  } else {
    // Grade 5
    const isAdd = Math.random() > 0.5;
    if (isAdd) {
      const a = (randInt(15, 65) / 10).toFixed(1);
      const b = (randInt(12, 35) / 10).toFixed(1);
      const ans = (parseFloat(a) + parseFloat(b)).toFixed(1);
      return {
        question: `${a.replace(".", ",")} + ${b.replace(".", ",")} = ?`,
        equation: `${a.replace(".", ",")} + ${b.replace(".", ",")}`,
        options: shuffle([
          ans.replace(".", ","),
          (parseFloat(ans) + 0.2).toFixed(1).replace(".", ","),
          (parseFloat(ans) - 0.2).toFixed(1).replace(".", ","),
          (parseFloat(ans) + 1).toFixed(1).replace(".", ","),
        ]),
        answer: ans.replace(".", ","),
      };
    } else {
      const a = randInt(2, 8);
      const ans = a * 10;
      return {
        question: `${a},5 × 10 = ?`,
        equation: `${a},5 × 10`,
        options: generateOptions(ans + 5, 5),
        answer: ans + 5,
      };
    }
  }
}
