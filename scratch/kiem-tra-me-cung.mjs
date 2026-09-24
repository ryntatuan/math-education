/**
 * KIỂM TRA MÊ CUNG SỐ SINH TỰ ĐỘNG (phần Luyện tập) — cho CẢ 5 LỚP, các điều phải LUÔN đúng:
 *
 *  1. Bảng 6x6, luật "> N" hoặc "< N" (cả hai dấu đều random), ô xuất phát đi được,
 *     chữ trong câu hỏi / ghi chú / gợi ý khớp đúng dấu và đúng N.
 *  2. DẢI SỐ THEO LỚP: lớp 1 dùng 1–20, lớp 2–5 dùng 1–99; không có số 0, không số ngoài dải.
 *  3. SỐ CHẶN CỬA random nhưng ở KHOẢNG GIỮA: luôn chừa ≥ 5 giá trị nhỏ hơn VÀ ≥ 5 giá trị
 *     lớn hơn (thực tế lớp 1: ≥6/≥6; lớp 2–5: ≥29/≥29) — không bao giờ ra số 2 khiến bé
 *     chỉ việc tránh số 1. Hai bên cũng phải đa dạng (≥3 giá trị mỗi bên).
 *  4. LUÔN VỀ ĐƯỢC NHÀ, đường NGẮN NHẤT đúng 11 ô, và CÓ ĐƯỜNG DÀI HƠN ≥ 13 ô.
 *  5. ĐƯỜNG LẮT LÉO: đường ngắn nhất phải đổi hướng ≥ 4 lần (đường “xuống thẳng rồi ngang
 *     qua” chỉ có 1 lần ⇒ cổng này bắt được lỗi `shuffle` bỏ kết quả trả về).
 *  6. BẢNG THOÁNG, mọi ô đi được đều tới được từ ô xuất phát, có NGÕ CỤT; mẫu nhỏ còn kiểm
 *     chặt hơn: ô cụt đó KHÔNG nằm trên đường nào về nhà.
 *  7. HAI DẤU phải xuất hiện đều (mỗi dấu ≥ 20% số bảng).
 *
 * Chạy: npx esbuild scratch/kiem-tra-me-cung.mjs --bundle --platform=node --format=esm
 *        --outfile=scratch/kiem-tra-me-cung.bundle.mjs ; node scratch/kiem-tra-me-cung.bundle.mjs [số_bảng_mỗi_lớp]
 */
import { generateQuestion } from "../client/src/utils/exerciseGenerator.js";

const N = 6;
const LAN = Number(process.argv[2] || 400);
const MAU_CHAT = Math.min(60, LAN); // số bảng kiểm chặt (đếm hết đường đi)
const CAP = 4000;
const steps = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];
const key = (r, c) => `${r}-${c}`;
/** Ô (r,c) có thoả LUẬT không — luật có thể là "> N" hoặc "< N". */
const goto = (grid, rule) => (r, c) =>
  r >= 0 &&
  c >= 0 &&
  r < N &&
  c < N &&
  (rule.op === "<"
    ? Number(grid[r][c]) < rule.value
    : Number(grid[r][c]) > rule.value);

function shuffle(a) {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}

/** ĐƯỜNG NGẮN NHẤT (BFS) — trả về danh sách ô, null nếu bí. */
function shortestPath(grid, rule) {
  const ok = goto(grid, rule);
  if (!ok(0, 0)) return null;
  const back = new Map([[key(0, 0), null]]);
  const q = [[0, 0]];
  while (q.length) {
    const [r, c] = q.shift();
    if (r === N - 1 && c === N - 1) {
      const path = [];
      for (let cur = [r, c]; cur; cur = back.get(key(cur[0], cur[1])))
        path.unshift(cur);
      return path;
    }
    for (const [dr, dc] of steps) {
      const nr = r + dr;
      const nc = c + dc;
      if (!ok(nr, nc) || back.has(key(nr, nc))) continue;
      back.set(key(nr, nc), [r, c]);
      q.push([nr, nc]);
    }
  }
  return null;
}

/** Số lần ĐỔI HƯỚNG của một đường — đo độ “lắt léo” (1 = xuống thẳng rồi ngang qua). */
function turnsOf(path) {
  let turns = 0;
  for (let i = 2; i < path.length; i++) {
    const [pr, pc] = path[i - 2];
    const [qr, qc] = path[i - 1];
    const [rr, rc] = path[i];
    if (qr - pr !== rr - qr || qc - pc !== rc - qc) turns++;
  }
  return turns;
}

/**
 * CÓ đường NGẮN NHẤT (11 ô — chỉ rẽ phải/xuống) mà đổi hướng ≥ `minTurns` không?
 *
 * Đo kiểu này chứ không đo đường BFS trả về: bảng thoáng nên có NHIỀU đường 11 ô, BFS có
 * thể trả về một đường thẳng — trong khi điều cần bảo đảm là *tồn tại* một đường lắt léo
 * cho bé đi. Chỉ duyệt 2 hướng phải/xuống nên mọi đường tìm được đều đúng 11 ô.
 */
function zigzagShortestExists(grid, rule, minTurns) {
  const ok = goto(grid, rule);
  if (!ok(0, 0)) return false;
  const seen = new Set([key(0, 0)]);
  const path = [[0, 0]];
  let found = false;
  const dfs = (r, c) => {
    if (found) return;
    if (r === N - 1 && c === N - 1) {
      if (turnsOf(path) >= minTurns) found = true;
      return;
    }
    for (const [dr, dc] of [
      [1, 0],
      [0, 1],
    ]) {
      const nr = r + dr;
      const nc = c + dc;
      if (!ok(nr, nc) || seen.has(key(nr, nc))) continue;
      seen.add(key(nr, nc));
      path.push([nr, nc]);
      dfs(nr, nc);
      seen.delete(key(nr, nc));
      path.pop();
      if (found) return;
    }
  };
  dfs(0, 0);
  return found;
}

/** Có đường đơn ≥ `minCells` ô không (DFS ngẫu nhiên, có ngân sách chống treo). */
function hasLongPath(grid, rule, minCells, budget = 200000) {
  const ok = goto(grid, rule);
  let used = 0;
  let found = false;
  const seen = new Set([key(0, 0)]);
  const path = [[0, 0]];
  const dfs = (r, c) => {
    if (found || used++ > budget) return;
    if (r === N - 1 && c === N - 1) {
      if (path.length >= minCells) found = true;
      return;
    }
    for (const [dr, dc] of shuffle(steps)) {
      const nr = r + dr;
      const nc = c + dc;
      if (!ok(nr, nc) || seen.has(key(nr, nc))) continue;
      seen.add(key(nr, nc));
      path.push([nr, nc]);
      dfs(nr, nc);
      seen.delete(key(nr, nc));
      path.pop();
      if (found) return;
    }
  };
  dfs(0, 0);
  return found;
}

/** Đếm đường đi (dừng ở CAP) + độ dài dài nhất + tập ô có mặt trên đường nào đó. */
function enumeratePaths(grid, rule) {
  const ok = goto(grid, rule);
  let count = 0;
  let capped = false;
  let maxCells = 0;
  const touched = new Set();
  const seen = new Set([key(0, 0)]);
  const path = [[0, 0]];
  const dfs = (r, c) => {
    if (capped) return;
    if (r === N - 1 && c === N - 1) {
      count++;
      maxCells = Math.max(maxCells, path.length);
      path.forEach(([a, b]) => touched.add(key(a, b)));
      if (count >= CAP) capped = true;
      return;
    }
    for (const [dr, dc] of steps) {
      const nr = r + dr;
      const nc = c + dc;
      if (!ok(nr, nc) || seen.has(key(nr, nc))) continue;
      seen.add(key(nr, nc));
      path.push([nr, nc]);
      dfs(nr, nc);
      seen.delete(key(nr, nc));
      path.pop();
      if (capped) return;
    }
  };
  dfs(0, 0);
  return { count, capped, maxCells, touched };
}

const loi = [];
let minShort = Infinity;
let maxShort = 0;
let soODuocMin = Infinity;
let soODuocMax = 0;
let soODuocTong = 0;
let soNgoCutMin = Infinity;
let soNgoCutMax = 0;
let soLanDaiHon = 0;
let demDuongNgan = 0;
let demCap = 0;
let ngoCutThatMin = Infinity;
let duongMin = Infinity;
let duongMax = 0;
let duongTong = 0;
let duongMau = 0;
/** Dải số theo lớp — lớp 1 đến 20, lớp 2–5 đến 99 (xem `MAZE_MAX` trong bộ sinh). */
const GRADE_MAX = { 1: 20, 2: 99, 3: 99, 4: 99, 5: 99 };
const LOP = [1, 2, 3, 4, 5];
let soBang = 0;
let kheTraiMin = Infinity;
let khePhaiMin = Infinity;
let moItNhat = Infinity;
let chanItNhat = Infinity;
let quetMin = Infinity;
let quetTong = 0;
let demLatLeo = 0;
const soLanDau = { lon: 0, nho: 0 };
const viDuDuong = [];
const ruleValues = { 1: [], 2: [], 3: [], 4: [], 5: [] };

for (const lop of LOP) {
  const maxNum = GRADE_MAX[lop];
  for (let i = 0; i < LAN; i++) {
    const q = generateQuestion(lop, `g${lop}_number_maze`);
    const grid = q.maze?.grid || [];
    const rule = q.maze?.rule || {};
    const ok = goto(grid, rule);
    const nhan = `lớp ${lop} bảng ${i + 1}`;
    soBang++;

    if (q.type !== "maze") loi.push(`${nhan}: type = ${q.type}`);
    if (grid.length !== N || grid.some((row) => row.length !== N))
      loi.push(`${nhan}: không phải 6x6`);
    if (!["<", ">"].includes(rule.op))
      loi.push(`${nhan}: dấu lạ ${JSON.stringify(rule.op)}`);
    soLanDau[rule.op === "<" ? "nho" : "lon"]++;

    if (!ok(0, 0)) loi.push(`${nhan}: ô xuất phát không đi được`);
    if (q.answer !== "Đã nối xong" || !q.options?.includes(q.answer))
      loi.push(`${nhan}: đáp án/options sai`);
    // Chữ trong câu hỏi / ghi chú / gợi ý phải khớp ĐÚNG số chặn cửa đã sinh
    for (const [ten, chu] of [
      ["question", q.question],
      ["note", q.note],
      ["hint", q.hint],
    ])
      if (
        !String(chu).includes(
          rule.op === "<" ? `nhỏ hơn ${rule.value}` : `lớn hơn ${rule.value}`,
        )
      )
        loi.push(`${nhan}: ${ten} không khớp luật → ${chu}`);

    // ── Dấu phải random cả hai loại (người dùng yêu cầu 2026-09-25) ──

    // ── SỐ CHẶN CỬA phải ở KHOẢNG GIỮA dải, không quá lớn / quá nhỏ ──
    ruleValues[lop].push(rule.value);
    if (rule.value < 1 || rule.value >= maxNum)
      loi.push(`${nhan}: số chặn cửa ${rule.value} ngoài dải 1–${maxNum}`);
    const kheTrai = rule.value - 1; // các số 1, 2, … đứng TRƯỚC số chặn cửa
    const khePhai = maxNum - rule.value; // các số đứng SAU số chặn cửa
    kheTraiMin = Math.min(kheTraiMin, kheTrai);
    khePhaiMin = Math.min(khePhaiMin, khePhai);
    if (kheTrai < 5 || khePhai < 5)
      loi.push(
        `${nhan}: số chặn cửa ${rule.value} quá lệch (${kheTrai} số nhỏ / ${khePhai} số lớn)`,
      );

    // ── Mọi số trong bảng nằm trong dải của lớp, không có số 0, không có số lẻ/chữ ──
    const soTrongBang = grid.flat();
    if (soTrongBang.some((v) => !Number.isInteger(v) || v < 1 || v > maxNum))
      loi.push(
        `${nhan}: có số ngoài dải 1–${maxNum}: ${soTrongBang.join(",")}`,
      );
    // Hai bên phải ĐA DẠNG: nếu một bên chỉ có 1–2 giá trị thì bài quá dễ
    const fit = (v) => (rule.op === "<" ? v < rule.value : v > rule.value);
    const moVals = [...new Set(soTrongBang.filter(fit))];
    const chanVals = [...new Set(soTrongBang.filter((v) => !fit(v)))];
    if (moVals.length < 3 || chanVals.length < 3)
      loi.push(
        `${nhan}: số hai bên quá ít (${moVals.length} giá trị đi được / ${chanVals.length} giá trị chặn)`,
      );
    moItNhat = Math.min(moItNhat, moVals.length);
    chanItNhat = Math.min(chanItNhat, chanVals.length);

    // 2. đường ngắn nhất + ĐỘ LẮT LÉO (đường chỉ xuống thẳng rồi ngang qua = 1 lần đổi hướng)
    const duongNgan = shortestPath(grid, rule);
    const short = duongNgan ? duongNgan.length : Infinity;
    if (short === Infinity) loi.push(`${nhan}: KHÔNG có đường về nhà`);
    else if (short !== 11)
      loi.push(`${nhan}: đường ngắn nhất ${short} ô (phải là 11)`);
    else demDuongNgan++;
    minShort = Math.min(minShort, short);
    maxShort = Math.max(maxShort, short);
    if (zigzagShortestExists(grid, rule, 4)) demLatLeo++;
    else
      loi.push(
        `${nhan}: không có đường 11 ô nào đổi hướng ≥ 4 lần — quá thẳng`,
      );
    // Ảnh chụp vài đường đi để người dùng xem
    if (i < 3 && duongNgan)
      viDuDuong.push({
        lop,
        nguong: rule.value,
        dau: rule.op,
        duong: duongNgan.map(([a, b]) => `${a},${b}`).join(" → "),
      });

    // 3. đường dài hơn
    if (!hasLongPath(grid, rule, 13))
      loi.push(`${nhan}: KHÔNG có đường dài hơn (≥13 ô)`);
    else soLanDaiHon++;

    // 4. bảng thoáng + mọi ô đi được phải tới được
    let soODuoc = 0;
    const toiDuoc = new Set([key(0, 0)]);
    const q2 = [[0, 0]];
    while (q2.length) {
      const [r, c] = q2.shift();
      for (const [dr, dc] of steps) {
        const nr = r + dr;
        const nc = c + dc;
        if (!ok(nr, nc) || toiDuoc.has(key(nr, nc))) continue;
        toiDuoc.add(key(nr, nc));
        q2.push([nr, nc]);
      }
    }
    for (let r = 0; r < N; r++)
      for (let c = 0; c < N; c++)
        if (ok(r, c)) {
          soODuoc++;
          if (!toiDuoc.has(key(r, c)))
            loi.push(`${nhan}: ô ${r},${c} đi được nhưng bị cô lập`);
        }
    if (soODuoc < 12 || soODuoc > 24)
      loi.push(
        `${nhan}: số ô đi được ${soODuoc} — bảng quá chật hoặc quá loãng`,
      );
    soODuocMin = Math.min(soODuocMin, soODuoc);
    soODuocMax = Math.max(soODuocMax, soODuoc);
    soODuocTong += soODuoc;

    // 5. ngõ cụt (theo định nghĩa chắc chắn: chỉ có 1 ô đi được bên cạnh)
    let soNgoCut = 0;
    for (let r = 0; r < N; r++)
      for (let c = 0; c < N; c++) {
        if (!ok(r, c)) continue;
        if (r === 0 && c === 0) continue;
        if (r === N - 1 && c === N - 1) continue;
        const hang = steps.filter(([dr, dc]) => ok(r + dr, c + dc)).length;
        if (hang === 1) soNgoCut++;
      }
    if (soNgoCut < 1) loi.push(`${nhan}: KHÔNG có ngõ cụt`);
    soNgoCutMin = Math.min(soNgoCutMin, soNgoCut);
    soNgoCutMax = Math.max(soNgoCutMax, soNgoCut);

    // 6. mẫu nhỏ: đếm hết đường đi + ngõ cụt thật (không nằm trên đường nào)
    if (i < MAU_CHAT) {
      const { count, capped, maxCells, touched } = enumeratePaths(grid, rule);
      if (!capped) {
        duongMin = Math.min(duongMin, count);
        duongMax = Math.max(duongMax, count);
        duongTong += count;
        duongMau++;
        if (count < 2)
          loi.push(`${nhan}: chỉ có ${count} đường về nhà (phải ≥ 2)`);
        if (maxCells <= 11)
          loi.push(
            `${nhan}: mọi đường đều ${maxCells} ô — thiếu đường dài hơn`,
          );
        let cutThat = 0;
        for (let r = 0; r < N; r++)
          for (let c = 0; c < N; c++) {
            if (
              !ok(r, c) ||
              (r === 0 && c === 0) ||
              (r === N - 1 && c === N - 1)
            )
              continue;
            if (!touched.has(key(r, c))) cutThat++;
          }
        if (cutThat < 1)
          loi.push(`${nhan}: không có ô nào ngoài mọi đường về nhà`);
        ngoCutThatMin = Math.min(ngoCutThatMin, cutThat);
      } else demCap++;
    }
  }
}

console.log(
  `Số bảng kiểm          : ${soBang} (${LOP.length} lớp × ${LAN}; mẫu đếm hết đường: ${MAU_CHAT}/lớp)`,
);
console.log(
  `Số chặn cửa cách đều   : luôn chừa ≥ ${kheTraiMin} số nhỏ hơn và ≥ ${khePhaiMin} số lớn hơn`,
);
for (const lop of LOP)
  console.log(
    `  lớp ${lop} (1–${GRADE_MAX[lop]})`.padEnd(22) +
      `: số chặn cửa ${Math.min(...ruleValues[lop])}…${Math.max(...ruleValues[lop])}` +
      ` (${new Set(ruleValues[lop]).size} giá trị khác nhau)`,
  );
console.log(
  `Giá trị hai bên       : ít nhất ${moItNhat} giá trị lớn hơn / ${chanItNhat} giá trị bé hơn`,
);
console.log(
  `Đường ngắn nhất       : ${minShort}…${maxShort} ô (đúng 11 ở ${demDuongNgan}/${soBang} bảng)`,
);
console.log(`Có đường dài hơn ≥13  : ${soLanDaiHon}/${soBang} bảng`);
console.log(
  `Ô đi được (bảng thoáng): ${soODuocMin}…${soODuocMax}, trung bình ${(soODuocTong / soBang).toFixed(1)}/36`,
);
console.log(`Ngõ cụt (đầu cụt)     : ${soNgoCutMin}…${soNgoCutMax} ô/bảng`);
console.log(
  `Dấu luật              : ${soLanDau.lon} bảng “lớn hơn” / ${soLanDau.nho} bảng “nhỏ hơn”`,
);
console.log(
  `Đường lắt léo (≥4 khúc): ${demLatLeo}/${soBang} bảng có đường 11 ô nhiều khúc quanh`,
);
viDuDuong.forEach((v) =>
  console.log(`  ví dụ lớp ${v.lop} · ${v.dau} ${v.nguong}: ${v.duong}`),
);
console.log(
  `Số đường về nhà       : ${duongMin}…${duongMax}, trung bình ${duongMau ? (duongTong / duongMau).toFixed(1) : "—"} (${duongMau} bảng đếm hết)`,
);
console.log(
  `Ô ngoài mọi đường đi  : ít nhất ${ngoCutThatMin === Infinity ? "—" : ngoCutThatMin}`,
);
console.log(`Bảng bị chạm trần đếm : ${demCap}`);
if (soLanDau.lon < soBang * 0.2 || soLanDau.nho < soBang * 0.2)
  loi.push(
    `dấu quá lệch: ${soLanDau.lon} bảng “lớn hơn” / ${soLanDau.nho} bảng “nhỏ hơn” — phải random cả hai`,
  );
if (loi.length) {
  console.log(`\n❌ ${loi.length} LỖI:`);
  [...new Set(loi)].slice(0, 20).forEach((l) => console.log("  - " + l));
  process.exit(1);
}
console.log(
  "\n✅ Mê cung sinh tự động: 0 lỗi (luôn có đường ngắn nhất + đường dài hơn + ngõ cụt)",
);
