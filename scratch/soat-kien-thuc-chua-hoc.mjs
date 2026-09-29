#!/usr/bin/env node
/**
 * SOÁT “KIẾN THỨC CHƯA HỌC” TRONG TOÀN BỘ 489 BÀI (chỉ ĐỌC, không sửa gì).
 *
 * VÌ SAO: máy sinh nội dung của tôi nhét “mẹo so sánh”, “ba bước có ê-ke”… vào cả những bài
 * CHƯA học khái niệm đó (người dùng báo: bài “Các số 0, 1, 2, 3” đã dạy dấu >, <, =, trong khi
 * dấu so sánh tận Bài 8 mới học).
 *
 * CÁCH LÀM — suy “mốc được phép” TỪ CHÍNH DỮ LIỆU, không tự bịa ngưỡng:
 *   • Mỗi khái niệm có 2 mẫu: `khai` (khớp TIÊU ĐỀ/MÔ TẢ bài — nơi bài đó DẠY khái niệm)
 *     và `dung` (khớp CHỮ TRONG SLIDE — nơi bài đó DÙNG khái niệm).
 *   • Vị trí hợp lệ = vị trí bài ĐẦU TIÊN khớp `khai` (theo thứ tự lớp → chương → bài).
 *   • Bài nào nằm TRƯỚC vị trí đó mà chữ trong slide khớp `dung` ⇒ BÁO (dạy trước chương trình).
 *
 *   node scratch/soat-kien-thuc-chua-hoc.mjs            # in báo cáo
 *   node scratch/soat-kien-thuc-chua-hoc.mjs --het       # in cả các ca ít chắc chắn
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const HET = process.argv.includes("--het");

// ── Bộ khái niệm: `khai` = bài DẠY nó, `dung` = chữ trong slide DÙNG nó ───────────
const KHaiNIEM = [
  {
    ten: "dấu so sánh (>, <, =)",
    khai: /so sánh số|dấu lớn hơn|lớn hơn,\s*bé hơn,\s*bằng nhau/i,
    dung: /(?:^|[^\w])(?:[0-9]\s*[><=]\s*[0-9]|dấu\s*[><=]|lớn hơn|bé nhất|bé hơn)/i,
  },
  {
    ten: "so sánh (nhiều hơn / ít hơn / bằng nhau)",
    khai: /nhiều hơn,\s*ít hơn|bằng nhau|so sánh số lượng|so sánh số/i,
    dung: /nhiều hơn|ít hơn/i,
  },
  {
    ten: "số liền trước / liền sau",
    khai: /liền trước|liền sau/i,
    dung: /liền trước|liền sau/i,
  },
  {
    ten: "chục – đơn vị",
    khai: /chục|đơn vị/i,
    dung: /\bchục\b|\bđơn vị\b/i,
  },
  {
    ten: "tia số / trục số",
    khai: /tia số|trục số/i,
    dung: /tia số|trục số/i,
  },
  {
    ten: "phép cộng",
    khai: /phép cộng|dấu cộng/i,
    dung: /\bcộng\b/i,
  },
  {
    ten: "phép trừ",
    khai: /phép trừ|dấu trừ/i,
    // “trừ khi” = unless (nghĩa khác) ⇒ bỏ
    dung: /(?<!trừ\s)\btrừ\b(?!\s+khi)/i,
  },
  {
    ten: "phép nhân",
    khai: /phép nhân|bảng nhân|dấu nhân/i,
    dung: /\bnhân\b|×/i,
  },
  {
    ten: "phép chia",
    khai: /phép chia|bảng chia|dấu chia/i,
    // “chia … thành hai phần” là TÁCH – GỘP (lớp 1), không phải phép chia ⇒ bỏ
    dung: /(?:phép chia|bảng chia|chia hết|chia cho|chia đều|chia\s+\d)/i,
  },
  {
    ten: "góc (nhọn, vuông, tù)",
    khai: /góc vuông|góc nhọn|góc tù|góc bẹt|ê-ke/i,
    // “góc trên bên phải” là mép màn hình, không phải góc hình học ⇒ bỏ
    dung: /góc\s+(?:vuông|nhọn|tù|bẹt|đỉnh)|ê-ke/i,
  },
  {
    ten: "hình tứ giác",
    khai: /tứ giác/i,
    dung: /tứ giác/i,
  },
  {
    ten: "chu vi",
    khai: /chu vi/i,
    dung: /chu vi/i,
  },
  {
    ten: "diện tích",
    khai: /diện tích/i,
    dung: /diện tích/i,
  },
  {
    ten: "phân số",
    khai: /phân số|một phần mấy|tử số|mẫu số/i,
    dung: /phân số|tử số|mẫu số/i,
  },
  {
    ten: "số thập phân",
    khai: /thập phân/i,
    dung: /thập phân/i,
  },
  {
    ten: "làm tròn số",
    khai: /làm tròn/i,
    // “làm tròn 10” trong bài cộng qua 10 nghĩa là ĐỦ 10 (khác nghĩa) ⇒ bỏ
    dung: /làm tròn\s+(?:số|đến|hàng|chục|trăm|nghìn|triệu)/i,
  },
  {
    ten: "trung bình cộng",
    khai: /trung bình cộng/i,
    dung: /trung bình cộng/i,
  },
  {
    ten: "tỉ số phần trăm",
    khai: /phần trăm/i,
    // ⚠ Chỉ tính TỈ SỐ PHẦN TRĂM: “phần trăm” là tên hàng thập phân (5 đơn vị · 4 phần mười ·
    //    0 phần trăm) là nội dung ĐÚNG của g5-c2 ⇒ trước đây bị báo oan.
    dung: /\d+\s?%|phần trăm (?:của|số|học sinh|giá|khối lượng|lượng|sản phẩm)/i,
  },
  {
    ten: "số La Mã",
    khai: /la mã/i,
    dung: /la mã/i,
  },
  {
    ten: "đơn vị đo độ dài (km, hm, dam, dm, mm)",
    khai: /ki-lô-mét|héc-tô-mét|đề-ca-mét|đề-xi-mét|mi-li-mét|mm\b|dm\b|km\b/i,
    dung: /\bkm\b|\bhm\b|\bdam\b|\bdm\b|\bmm\b/i,
  },
  {
    // ⚠ ĐÃ MẮC (2026-09-29): thiếu hai mục này nên công cụ KHÔNG bắt được quiz “1 tấn bằng bao
    //   nhiêu tạ?” bị nhét vào Lớp 2 (tấn/tạ/yến là Lớp 4, ml/gam là Lớp 3) — chỉ phát hiện khi mở
    //   trang xem thật. Thêm vào để thước bắt được cả nhóm đơn vị này.
    //   🔴 Lưu ý `\b` của JS chỉ hiểu chữ ASCII: `\btạ\b` khớp cả trong “tạo” ⇒ phải dùng
    //   `(?<![\p{L}])…(?![\p{L}])` với cờ `u`.
    ten: "đơn vị khối lượng lớn (tấn, tạ, yến)",
    khai: /yến|tạ|tấn/i,
    dung: /(?<![\p{L}])tấn(?![\p{L}])|(?<![\p{L}])tạ(?![\p{L}])|(?<![\p{L}])yến(?![\p{L}])/iu,
  },
  {
    ten: "gam · mi-li-lít",
    khai: /gam|mi-li-lít|mi-li-mét vuông/i,
    // ⚠ Trừ cả dấu “-” phía trước: “ki-lô-gam” chứa “gam” ⇒ nếu không trừ sẽ báo oan.
    dung: /(?<![\p{L}-])gam(?![\p{L}])|(?<![\p{L}-])ml(?![\p{L}])/iu,
  },
  {
    ten: "giờ – phút – giây",
    khai: /giờ|phút|giây/i,
    // ⚠ “kim dài chỉ phút” chỉ là tên kim trên mặt đồng hồ ⇒ không tính là dạy trước chương trình.
    dung: /\bgiây\b|\d+\s?giờ = \d+\s?phút|\d+\s?phút = \d+\s?giây/i,
  },
];

// ── Nạp dữ liệu ────────────────────────────────────────────────────────────────
const GOC = path.join(ROOT, "client/src/data");
const bai = [];
for (const lop of [1, 2, 3, 4, 5]) {
  const mod = await import(
    pathToFileURL(path.join(GOC, `grade${lop}Data.js`)).href
  );
  const cay = mod[`grade${lop}Data`];
  for (const chuong of cay.chapters) {
    for (const [i, b] of chuong.lessons.entries()) {
      bai.push({
        ma: b.id,
        lop,
        chuong: chuong.name,
        thuTu: bai.length,
        tieuDe: `${b.title ?? ""} ${b.description ?? ""}`,
        // mọi chuỗi nằm trong slide
        chu: (() => {
          const out = [];
          const duyet = (v) => {
            if (typeof v === "string") out.push(v);
            else if (Array.isArray(v)) v.forEach(duyet);
            else if (v && typeof v === "object")
              Object.values(v).forEach(duyet);
          };
          duyet(b.slides ?? []);
          return out.join("  ");
        })(),
        soSlide: (b.slides ?? []).length,
        chiTiet: i + 1,
      });
    }
  }
}

// ── Soát ───────────────────────────────────────────────────────────────────────
const ra = [];
let tongCa = 0;
for (const kn of KHaiNIEM) {
  const moc = bai.findIndex((b) => kn.khai.test(b.tieuDe));
  const ca = [];
  for (const b of bai) {
    if (moc >= 0 && b.thuTu >= moc) continue; // đã tới bài dạy nó ⇒ hợp lệ
    if (moc < 0) continue; // cả chương trình không dạy ⇒ không kết luận
    if (!kn.dung.test(b.chu)) continue;
    const vi = b.chu.match(kn.dung);
    const quanh = b.chu.slice(
      Math.max(0, (vi?.index ?? 0) - 40),
      (vi?.index ?? 0) + 60,
    );
    ca.push({
      ma: b.ma,
      lop: b.lop,
      tieuDe: b.tieuDe.split(" ").slice(0, 6).join(" "),
      quanh,
    });
  }
  if (!ca.length) continue;
  tongCa += ca.length;
  ra.push(
    `\n### ${kn.ten} — dạy lần đầu ở: ${moc >= 0 ? bai[moc].ma + " (" + bai[moc].tieuDe.slice(0, 40) + ")" : "?"}` +
      ` ⇒ ${ca.length} bài dùng SỚM`,
  );
  const hien = HET ? ca : ca.slice(0, 12);
  for (const c of hien)
    ra.push(`   · ${c.ma}  [${c.tieuDe}]  …${c.quanh.replace(/\s+/g, " ")}…`);
  if (ca.length > hien.length)
    ra.push(`   … còn ${ca.length - hien.length} bài nữa (dùng --het)`);
}

const dau = `SOÁT KIẾN THỨC CHƯA HỌC — ${bai.length} bài · ${tongCa} ca nghi dạy trước chương trình\n`;
fs.writeFileSync(
  "scratch/soat-kien-thuc-chua-hoc.txt",
  dau + ra.join("\n"),
  "utf8",
);
console.log(dau.trim(), "\n→ scratch/soat-kien-thuc-chua-hoc.txt");
