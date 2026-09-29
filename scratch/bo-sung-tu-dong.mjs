/**
 * BỔ SUNG SLIDE DẠY HỌC CHO CẢ CHƯƠNG — sinh từ CHÍNH con số của bài, chạy lại được nhiều lần.
 *
 * VÌ SAO CÓ FILE NÀY (người dùng yêu cầu 2026-09-29): *"rà soát từng bài học từ lớp 1 đến lớp 5,
 * mỗi bài đều tìm nguồn dạy học để bổ sung slide cho trẻ dễ hiểu"*. 489 bài · 3163 slide — viết
 * tay từng bài là không khả thi, mà viết tay cũng dễ lệch số. Đo được: **469/489 bài** không có
 * slide nào chỉ TỪNG BƯỚC. File này sinh đúng ba thứ mà mọi bài tính toán đều thiếu:
 *
 *   1. **ĐẶT TÍNH TƯƠNG TÁC** — `cotTinh` (bé bấm ô “?” điền từng hàng, có hàng “nhớ”) + lời giải
 *      từng hàng. Lời giải KHÔNG viết tay: lấy từ `buocTinh()` (hàm thuần, đã có test) ⇒ chữ và
 *      số không thể lệch nhau.
 *   2. **LỖI HAY GẶP** — con số sai được TÍNH RA bằng thuật toán sai thật:
 *      quên nhớ 1 khi cộng, quên trả 1 chục khi trừ, quên nhớ khi nhân. Trẻ thấy đúng cái bẫy của
 *      dạng bài đó, kèm cách tránh và cách tự kiểm tra.
 *   3. **CÂU LUYỆN TẬP MỚI** — cùng dạng, cùng cỡ số (bảo đảm CÓ nhớ/có mượn), đáp án nhiễu chính
 *      là kết quả của phép làm sai ở mục 2 ⇒ bé sai là vì mắc đúng lỗi đó, không phải đoán bừa.
 *
 * NGUỒN SƯ PHẠM (đã tra, xem `docs/ke-hoach-bo-sung-bai-hoc.md`): trình tự CPA (cụ thể → hình ảnh
 * → trừu tượng), chiến lược làm tròn chục, và dạy bằng phân tích lỗi (error analysis) — đều là cách
 * dạy chuẩn của Singapore Math, Eureka/EngageNY và chương trình Anh KS1–KS2 cho dạng tính theo hàng.
 *
 *   node scratch/bo-sung-tu-dong.mjs --chuong g1-c3 g2-c2            # xem trước (không ghi)
 *   node scratch/bo-sung-tu-dong.mjs --chuong g1-c3 --ghi             # ghi thật
 *   node scratch/bo-sung-tu-dong.mjs --tat-ca --ghi                   # mọi chương (bỏ bài đã có)
 *
 * ⚠️ CHẠY LẠI ĐƯỢC: bài nào đã có slide “Bé tự đặt tính” thì BỎ QUA (không sinh trùng).
 * ⚠️ Ghi xong phải chạy `node scratch/kiem-tra-ngoac.mjs` + `node scratch/kiem-tra-slide.mjs`.
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

import { buocTinh } from "../client/src/components/visuals/columnSteps.js";

const MUON_GHI = process.argv.includes("--ghi");
const TAT_CA = process.argv.includes("--tat-ca");
const iChuong = process.argv.indexOf("--chuong");
const chuongChon =
  iChuong >= 0
    ? process.argv.slice(iChuong + 1).filter((x) => !x.startsWith("--"))
    : [];

/** Không dạy “đặt tính” cho các ca này: số quá lớn sẽ tràn khung trên điện thoại. */
const TRAN_SO = 6; // tối đa 6 chữ số

// ───────────────────────────── tiện ích số học (thuần, có test ở cổng ngoài)

const daySo = (n) => String(n).split("").map(Number);

/** Cộng mà QUÊN nhớ: mỗi hàng chỉ giữ chữ số hàng đơn vị của tổng hai chữ số. */
export function congQuenNho(a, b) {
  let kq = 0;
  let mu = 1;
  let A = a;
  let B = b;
  while (A > 0 || B > 0) {
    kq += (((A % 10) + (B % 10)) % 10) * mu;
    mu *= 10;
    A = Math.floor(A / 10);
    B = Math.floor(B / 10);
  }
  return kq;
}

/** Trừ mà QUÊN trả 1 chục sau khi mượn: hàng chục vẫn giữ nguyên. */
export function truQuenTra(a, b) {
  const A = daySo(a).reverse();
  const B = daySo(b).reverse();
  let kq = 0;
  for (let i = 0; i < A.length; i += 1) {
    const bi = B[i] ?? 0;
    const d = A[i] < bi ? A[i] + 10 - bi : A[i] - bi;
    kq += d * 10 ** i;
  }
  return kq;
}

/** Nhân (thừa số thứ hai một chữ số) mà QUÊN nhớ ở từng hàng. */
export function nhanQuenNho(a, b) {
  const A = daySo(a).reverse();
  let kq = 0;
  A.forEach((d, i) => {
    kq += ((d * b) % 10) * 10 ** i;
  });
  return kq;
}

/** Có phải mượn khi trừ? (hàng đơn vị của số bị trừ bé hơn) */
const phaiMuon = (a, b) => a % 10 < b % 10;
/** Có phải nhớ khi cộng? */
const phaiNho = (a, b) => (a % 10) + (b % 10) >= 10;

/** Số ngẫu nhiên TẤT ĐỊNH theo `seed` — cùng bài thì lần nào cũng ra cùng số. */
function ngauNhien(seed) {
  let s = 0;
  for (const ch of seed) s = (s * 31 + ch.charCodeAt(0)) % 2147483647;
  return () => {
    s = (s * 1103515245 + 12345) % 2147483648;
    return s / 2147483648;
  };
}

/** Số có `n` chữ số, chữ số hàng đơn vị = `dv`. */
function soCoNChuSo(n, dv) {
  if (n <= 1) return dv;
  const dau = 1 + Math.floor(Math.random() * 9);
  const giua = Math.floor(Math.random() * 10 ** (n - 2));
  return dau * 10 ** (n - 1) + giua * 10 + dv;
}

/**
 * CẶP SỐ LUYỆN TẬP PHẢI CÙNG “ĐỘ KHÓ” VỚI VÍ DỤ CỦA BÀI — nếu không thì câu hỏi vượt phạm vi
 * chương. Đã mắc thật (2026-09-29): bài `g1-c3-l1` (phép cộng trong phạm vi 10, ví dụ 3 + 2)
 * sinh ra câu `3 + 8 = ?` ⇒ kết quả 11 **vượt phạm vi 10** của cả chương, mà chương này CHƯA dạy nhớ.
 * Luật nay:
 *   • CÙNG số chữ số của hai số hạng và của kết quả ví dụ;
 *   • CÙNG việc “có nhớ / không nhớ” (cộng) và “có mượn / không mượn” (trừ) như ví dụ;
 *   • Kết quả không vượt số lớn nhất cùng số chữ số của kết quả ví dụ.
 */
function capLuyenTap(op, a, b, rnd) {
  const na = String(Math.abs(a)).length;
  const nb = String(Math.abs(b)).length;
  const kqViDu = tinhKetQua(a, b, op);
  const nk = String(kqViDu).length;
  const tranKq = 10 ** nk - 1;
  const canNho = op === "+" ? phaiNho(a, b) : false;
  const canMuon = op === "−" ? phaiMuon(a, b) : false;
  const canNhoNhan = op === "×" ? (a % 10) * b >= 10 : false;
  const dung = (x, y) => {
    if (x < 1 || y < 1) return false;
    if (String(x).length !== na || String(y).length !== nb) return false;
    const k = tinhKetQua(x, y, op);
    if (k < 1 || k > tranKq) return false;
    if (op === "+") return phaiNho(x, y) === canNho;
    if (op === "−") return x > y && phaiMuon(x, y) === canMuon;
    if (op === "×") return (x % 10) * y >= 10 === canNhoNhan;
    return false;
  };
  for (let lan = 0; lan < 600; lan += 1) {
    const x = soCoNChuSo(na, 1 + Math.floor(rnd() * 8));
    const y =
      op === "×"
        ? 2 + Math.floor(rnd() * 8)
        : soCoNChuSo(nb, 1 + Math.floor(rnd() * 8));
    if (dung(x, y)) return [x, y];
  }
  return null;
}

// ───────────────────────────── lấy ví dụ của bài

const DAU = {
  "+": "+",
  "-": "−",
  "−": "−",
  "×": "×",
  "*": "×",
  x: "×",
  ":": ":",
  "÷": ":",
};

/** Ví dụ ĐẦU TIÊN có thật trong bài: từ `operation` / `cotTinh` / câu chữ trong `concept`, quiz… */
function layViDu(bai) {
  const xet = [];
  for (const s of bai.slides || []) {
    const c = s?.content;
    if (!c || typeof c !== "object") continue;
    for (const nguon of [c.operation, c.cotTinh]) {
      if (nguon && nguon.left !== undefined && nguon.right !== undefined) {
        const dau = DAU[String(nguon.sign ?? "+")];
        if (dau)
          xet.push({
            left: Number(nguon.left),
            right: Number(nguon.right),
            dau,
          });
      }
    }
    for (const chu of [
      c.rule,
      c.explanation,
      c.text,
      c.question,
      c.hint,
      c.mascotHint,
    ]) {
      if (typeof chu !== "string") continue;
      const m = chu.match(
        /(\d[\d\s]*)\s*([+\-−×*x:])\s*(\d[\d\s]*)\s*=\s*(\d[\d\s]*)/,
      );
      if (!m) continue;
      const bo = (s2) => Number(String(s2).replace(/\s/g, ""));
      const dau = DAU[m[2]];
      if (dau) xet.push({ left: bo(m[1]), right: bo(m[3]), dau, co: bo(m[4]) });
    }
  }
  for (const v of xet) {
    if (!Number.isFinite(v.left) || !Number.isFinite(v.right)) continue;
    if (v.left <= 0 || v.right <= 0) continue;
    if (String(v.left).length > TRAN_SO || String(v.right).length > TRAN_SO)
      continue;
    if (v.dau === "−" && v.left <= v.right) continue;
    const kq = v.co ?? null;
    if (kq !== null && kq !== tinhKetQua(v.left, v.right, v.dau)) continue;
    return v;
  }
  return null;
}

const tinhKetQua = (a, b, dau) =>
  dau === "+"
    ? a + b
    : dau === "−"
      ? a - b
      : dau === "×"
        ? a * b
        : Math.floor(a / b);

const TEN_DAU = { "+": "cộng", "−": "trừ", "×": "nhân", ":": "chia" };

// ───────────────────────────── sinh 3 slide

function sinhSlide(bai, viDu) {
  const { left, right, dau } = viDu;
  const kq = tinhKetQua(left, right, dau);
  const { buoc, ketLuan } = buocTinh(left, right, dau);
  if (!ketLuan || buoc.length === 0) return null;

  const coNho = dau === "+" || (dau === "×" && String(right).length === 1);

  const slides = [];

  // 1. ĐẶT TÍNH TƯƠNG TÁC + lời giải từng hàng (lời giải sinh từ chính con số ⇒ không thể lệch).
  slides.push({
    type: "visual",
    content: {
      cotTinh: {
        left,
        right,
        sign: dau,
        ...(coNho ? { remember: true } : {}),
      },
      text: [
        `Bé tự đặt tính: ${left} ${dau} ${right}`,
        ...buoc.slice(0, 3),
        `Vậy ${ketLuan}.`,
      ].join("\n"),
    },
  });

  // 2. LỖI HAY GẶP — con số sai tính bằng thuật toán SAI thật.
  /**
   * ⚠️ CHỈ NÓI “QUÊN NHỚ 1” KHI THẬT SỰ CÓ CỘT CHỤC. Với `9 + 1` (hai số một chữ số) thì
   * `congQuenNho` ra 0, và slide sẽ nói “0 là kết quả khi quên nhớ 1” — SAI về sư phạm: bé trả lời
   * 0 là vì không hiểu phép cộng qua 10, chứ không phải “quên nhớ”. Đã bắt được ở `g2-c2-l1`.
   * Luật: số bị cộng/bị trừ/nhân phải có từ 2 chữ số trở lên mới có chuyện “nhớ sang hàng chục”.
   */
  const coHangChuc = String(left).length >= 2;
  let sai = null;
  let moTa = "";
  if (coHangChuc && dau === "+" && phaiNho(left, right)) {
    sai = congQuenNho(left, right);
    moTa = "quên nhớ 1 ở hàng chục";
  } else if (coHangChuc && dau === "−" && phaiMuon(left, right)) {
    sai = truQuenTra(left, right);
    moTa = "quên bớt 1 chục sau khi mượn";
  } else if (
    coHangChuc &&
    dau === "×" &&
    String(right).length === 1 &&
    (left % 10) * right >= 10
  ) {
    sai = nhanQuenNho(left, right);
    moTa = "quên nhớ khi nhân từng hàng";
  }
  if (sai !== null && sai !== kq) {
    slides.push({
      type: "concept",
      content: {
        badge: "Chú Ý",
        title: `Vì sao ra ${sai} là sai?`,
        explanation: `${sai} là kết quả khi bé ${moTa}. Đây là lỗi hay gặp nhất của dạng ${TEN_DAU[dau]} này.`,
        points: [
          `Lỗi — ${moTa}: ${buoc[0]}. Kết quả đúng phải là ${kq}.`,
          `Cách tránh: làm xong một hàng thì ghi/xoá số ${dau === "−" ? "đã vay" : "nhớ"} NGAY, đừng để sang hàng sau mới nhớ.`,
          `Tự kiểm tra: ${dau === "+" ? `${kq} − ${left} phải bằng ${right}` : dau === "−" ? `${kq} + ${right} phải bằng ${left}` : `${kq} : ${right} phải bằng ${left}`}.`,
        ],
      },
    });
  }

  // 3. CÂU LUYỆN TẬP MỚI — cùng dạng, đáp án nhiễu chính là các kết quả LÀM SAI.
  const rnd = ngauNhien(`${bai.id}-${left}-${dau}-${right}`);
  const cap = capLuyenTap(dau, left, right, rnd);
  if (cap && buoc.length <= 4) {
    const [x, y] = cap;
    const dung = tinhKetQua(x, y, dau);
    const hay = new Set([dung]);
    /**
     * ĐÁP ÁN NHIỄU: ưu tiên kết quả của phép LÀM SAI (quên nhớ / quên trả 1 chục) — đó là lỗi
     * trẻ thật sự mắc. Còn thiếu thì lấy các số SÁT đáp án (±1, ±2) để bé không loại trừ bằng
     * cảm giác “số to là sai”; KHÔNG dùng `± 10` vì có thể vượt phạm vi của chương.
     */
    const ungVien = [];
    if (dau === "+") ungVien.push(congQuenNho(x, y));
    else if (dau === "−") ungVien.push(truQuenTra(x, y));
    else if (dau === "×") ungVien.push(nhanQuenNho(x, y));
    ungVien.push(dung + 1, dung - 1, dung + 2, dung - 2);
    for (const t of ungVien) {
      if (hay.size >= 4) break;
      if (!Number.isFinite(t) || t <= 0 || t === dung) continue;
      if ([...hay].some((h) => h === t)) continue;
      hay.add(t);
    }
    const lua = [...hay];
    if (lua.length >= 3 && lua.length <= 4) {
      // Đáp án đúng chen vào giữa để không luôn luôn là số lớn nhất / nhỏ nhất.
      const sapXep = [...lua].sort((p, q) => p - q);
      slides.push({
        type: "quiz",
        content: {
          question: `${x} ${dau} ${y} bằng bao nhiêu?`,
          options: sapXep,
          answer: dung,
          mascotHint: `${buocTinh(x, y, dau).buoc[0]}. Kết quả ${dung}.`,
        },
      });
    }
  }

  return slides;
}

// ───────────────────────────── chèn vào file (giữ nguyên định dạng + kiểu xuống dòng)

const fileCuaChuong = (idChuong) => {
  const m = idChuong.match(/^g(\d)-c(\d+)$/);
  if (!m) return null;
  return `client/src/data/grade${m[1]}/g${m[1]}c${m[2]}.js`;
};

const thutLe = (soCap) => "  ".repeat(soCap);

/**
 * KIỂU ĐỊNH DẠNG CỦA FILE — hai kiểu đang sống chung trong repo:
 *   • `json`  : khoá CÓ nháy, mảng in MỖI PHẦN TỬ MỘT DÒNG (do `JSON.stringify` sinh ra — `g2c4.js`).
 *   • `prettier`: khoá KHÔNG nháy khi tên hợp lệ, mảng ngắn in MỘT DÒNG (`g1c3.js`).
 * Chèn sai kiểu thì file vẫn chạy nhưng lệch hẳn định dạng ⇒ diff khổng lồ, khó soát.
 * (Đã mắc thật: lần đầu tìm mốc `"id": "g1-c3-l1"` nên KHÔNG khớp file nào ở lớp 1 — sinh ra 0 bài.)
 */
const kieuFile = (raw) => (raw.includes('"type": "') ? "json" : "prettier");

const KHOA_DON_GIAN = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

/** Bộ chuyển object JS thành chữ đúng định dạng file dữ liệu (không cần prettier). */
function ser(value, cap, kieu) {
  const pad = thutLe(cap);
  if (Array.isArray(value)) {
    const mot = `[${value.map((v) => serInline(v)).join(", ")}]`;
    if (kieu === "prettier" && mot.length <= 74) return mot;
    return `[\n${value.map((v) => thutLe(cap + 1) + ser(v, cap + 1, kieu)).join(",\n")}\n${pad}]`;
  }
  if (value && typeof value === "object") {
    const cap2 = Object.entries(value);
    if (!cap2.length) return "{}";
    const than = cap2
      .map(([k, v]) => {
        const khoa =
          kieu === "prettier" && KHOA_DON_GIAN.test(k) ? k : JSON.stringify(k);
        return thutLe(cap + 1) + khoa + ": " + ser(v, cap + 1, kieu);
      })
      .join(",\n");
    return `{\n${than}\n${pad}}`;
  }
  return JSON.stringify(value);
}

const serInline = (v) =>
  Array.isArray(v) || (v && typeof v === "object")
    ? JSON.stringify(v)
    : JSON.stringify(v);

function vietSlide(slide, kieu) {
  /**
   * Lề: `ser` đã tự đặt lề TUYỆT ĐỐI cho mọi dòng con (theo `cap`), nên ở đây CHỈ cần thêm lề
   * cho DÒNG ĐẦU (`{`). Hai lần đã mắc: (1) cộng thêm 8 dấu cách cho MỌI dòng ⇒ thụt lề nhân đôi;
   * (2) không cộng gì ⇒ riêng dấu `{` nằm sát lề trái.
   */
  return thutLe(4) + ser(slide, 4, kieu);
}

const dsChuong = [];
for (let n = 1; n <= 5; n += 1) {
  const mod = await import(
    pathToFileURL(path.resolve(`client/src/data/grade${n}Data.js`)).href
  );
  const data = Object.values(mod).find((v) => v && Array.isArray(v.chapters));
  for (const c of data.chapters) dsChuong.push(c);
}

const mucTieu = TAT_CA
  ? dsChuong
  : dsChuong.filter((c) => chuongChon.includes(c.id));

let tongBai = 0;
let tongSlide = 0;
let tongBoQua = 0;
const khongCoViDu = [];

for (const chuong of mucTieu) {
  const file = fileCuaChuong(chuong.id);
  if (!file || !fs.existsSync(file)) continue;
  const rawXem = fs.readFileSync(file, "utf8");
  const kieu = kieuFile(rawXem);
  const raw = rawXem;
  const eol = raw.includes("\r\n") ? "\r\n" : "\n";
  const dong = raw.split(/\r?\n/);
  const vungChen = []; // { viTri, chu }
  /** Mẫu nhận dòng — nhận CẢ `id:` lẫn `"id":` (hai kiểu file). */
  const mocBaiCua = (id) => new RegExp(`^\\s{6}(?:"id"|id):\\s*"${id}"`);
  const laDauBaiKe = /^\s{6}(?:"id"|id):\s*"g\d-c\d+-l\d+"/;
  const laTypeQuiz = /^\s{10}(?:"type"|type):\s*"quiz",?\s*$/;

  for (const bai of chuong.lessons || []) {
    const daCo = (bai.slides || []).some((s) =>
      String(s?.content?.text ?? "").includes("Bé tự đặt tính"),
    );
    if (daCo) {
      tongBoQua += 1;
      continue;
    }
    const viDu = layViDu(bai);
    if (!viDu) {
      khongCoViDu.push(bai.id);
      continue;
    }
    const slides = sinhSlide(bai, viDu);
    if (!slides || slides.length < 2) {
      khongCoViDu.push(bai.id);
      continue;
    }
    // Mốc chèn: dòng mở đầu slide QUIZ ĐẦU TIÊN của bài này (theo sau dòng id của bài).
    const moc = dong.findIndex((l) => mocBaiCua(bai.id).test(l));
    if (moc < 0) {
      khongCoViDu.push(bai.id);
      continue;
    }
    let chen = -1;
    for (let i = moc + 1; i < dong.length; i += 1) {
      if (/^\s{8}\{$/.test(dong[i]) && laTypeQuiz.test(dong[i + 1] ?? "")) {
        chen = i;
        break;
      }
      // hết bài (gặp bài kế tiếp) thì dừng
      if (laDauBaiKe.test(dong[i])) break;
    }
    if (chen < 0) {
      khongCoViDu.push(bai.id);
      continue;
    }
    vungChen.push({
      viTri: chen,
      chu: slides.map((s) => vietSlide(s, kieu)).join("," + eol) + ",",
    });
    tongBai += 1;
    tongSlide += slides.length;
  }

  if (!vungChen.length) continue;
  // Chèn TỪ CUỐI LÊN để chỉ số dòng phía trước không đổi.
  for (const v of [...vungChen].sort((a, b) => b.viTri - a.viTri))
    dong.splice(v.viTri, 0, ...v.chu.split(eol));

  const moi = dong.join(eol);
  if (MUON_GHI) fs.writeFileSync(file, moi, "utf8");
  console.log(
    `${MUON_GHI ? "✍️" : "👀"} ${chuong.id} — ${vungChen.length} bài · ${vungChen.reduce((a, v) => a + (v.chu.match(/"?type"?:\s*"(visual|concept|quiz|summary)"/g)?.length ?? 0), 0)} slide`,
  );
}

console.log(
  `\n${MUON_GHI ? "ĐÃ GHI" : "XEM TRƯỚC"}: ${tongBai} bài · ${tongSlide} slide · bỏ qua ${tongBoQua} bài (đã có)`,
);
if (khongCoViDu.length)
  console.log(
    `⚠️  ${khongCoViDu.length} bài không sinh tự động được (thiếu ví dụ tính / không có quiz để làm mốc):\n   ${khongCoViDu.join(", ")}`,
  );
if (!MUON_GHI) console.log("(thêm --ghi để ghi thật)");
