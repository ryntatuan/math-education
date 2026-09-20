#!/usr/bin/env node
/**
 * Đưa nội dung bài học từ 5 file JS tĩnh lên DB — Giai đoạn 3, lát 3a.
 *
 * ════════════════════════════════════════════════════════════════════════════
 * CÁCH DÙNG
 *
 *   node scripts/migrate-content.mjs              # CHẠY THỬ — chỉ in báo cáo
 *   node scripts/migrate-content.mjs --sql        # sinh file .sql để dán vào SQL Editor
 *   node scripts/migrate-content.mjs --verify     # đối chiếu DB với file (không cần key)
 *   node scripts/migrate-content.mjs --apply      # ghi thẳng qua REST (cần key GHI)
 *
 * ════════════════════════════════════════════════════════════════════════════
 * VÌ SAO CÓ 3 CÁCH GHI, VÀ NÊN CHỌN CÁCH NÀO
 *
 * Kế hoạch 3a (mục 5) chỉ nói tới `--apply` với một key ghi qua biến môi trường.
 * Khi viết code mới thấy có đường KHÔNG CẦN KEY MẠNH NÀO CẢ, nên đã làm thêm:
 *
 *   `--sql`   sinh ra file .sql, bạn dán vào Supabase SQL Editor. SQL Editor chạy
 *             bằng quyền cao nhất sẵn rồi, nên KHÔNG phải tạo, cấp, hay dán bất kỳ
 *             khoá bí mật nào. Việc này bạn đã làm 7 lần với các migration.
 *   `--apply` ghi thẳng qua REST. Tiện khi phải chạy lại nhiều lần, nhưng đòi một
 *             key ghi — tức là bạn phải lấy một khoá rất mạnh ra khỏi trang quản trị
 *             Supabase và đặt vào biến môi trường. Rủi ro rò rỉ nằm ở bước đó.
 *
 * 👉 KHUYẾN NGHỊ: `--sql` cho lần migrate này (chạy 1 lần). `--apply` chỉ khi nào
 *    thật sự phải chạy đi chạy lại.
 *
 * ════════════════════════════════════════════════════════════════════════════
 * ĐỐI CHIẾU KHÔNG CẦN KEY MẠNH
 *
 * `--verify` đọc lại từ DB bằng đúng anon key đã có sẵn trong `.env.local`, vì RLS
 * cho phép đọc bài `published` + lớp + chương. Nên bước "ghi xong có đúng không"
 * không cần quyền gì đặc biệt. Bảng phiên bản thì anon không đọc được — bước đó
 * cần chạy SQL, xem cuối file `--sql` sinh ra.
 *
 * ════════════════════════════════════════════════════════════════════════════
 * NGUYÊN TẮC AN TOÀN
 *
 *  - Mặc định KHÔNG ghi gì. Phải gõ cờ mới ghi.
 *  - Kiểm TẤT CẢ slide trước. Chỉ cần 1 slide hỏng là DỪNG HẲN, không ghi nửa vời.
 *    Trạng thái nửa vời khó gỡ hơn nhiều so với chạy lại từ đầu.
 *  - KHÔNG bao giờ in key ra màn hình.
 *  - KHÔNG đụng tới `content_source` — app phải tiếp tục đọc file tĩnh (lát 3d mới bật).
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const MUON_SQL = args.includes("--sql");
const MUON_GHI = args.includes("--apply");
const MUON_DOI_CHIEU = args.includes("--verify");

const { validateLesson } = await import(
  new URL("../admin/src/lib/contentSchema.js", import.meta.url)
);

// ─────────────────────── Nạp biến môi trường ───────────────────────

function napEnv() {
  for (const f of ["admin/.env.local", "client/.env.local"]) {
    const full = path.join(ROOT, f);
    if (!fs.existsSync(full)) continue;
    const env = {};
    for (const line of fs.readFileSync(full, "utf8").split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.+?)\s*$/);
      if (m) env[m[1]] = m[2];
    }
    if (env.VITE_SUPABASE_URL?.startsWith("https://"))
      return { ...env, nguon: f };
  }
  return null;
}

const ENV = napEnv();
const URL_SB = ENV?.VITE_SUPABASE_URL;

const fail = (msg) => {
  console.error(`\n❌ ${msg}\n`);
  process.exit(1);
};

// ─────────────────────── Đọc và kiểm dữ liệu tĩnh ───────────────────────

const NGUON = [
  ["grade1Data.js", "grade1Data"],
  ["grade2Data.js", "grade2Data"],
  ["grade3Data.js", "grade3Data"],
  ["grade4Data.js", "grade4Data"],
  ["grade5Data.js", "grade5Data"],
];

const grades = [];
const chapters = [];
const lessons = [];
const loi = [];

for (const [file, key] of NGUON) {
  const mod = await import(
    new URL(`../client/src/data/${file}`, import.meta.url)
  );
  const g = mod[key];
  grades.push({
    id: g.id,
    name: g.name,
    description: g.description ?? null,
    icon: g.icon ?? null,
    color: g.color ?? null,
    sort_order: grades.length,
  });

  g.chapters.forEach((ch, iCh) => {
    chapters.push({
      id: ch.id,
      grade_id: g.id,
      name: ch.name,
      description: ch.description ?? null,
      icon: ch.icon ?? null,
      color: ch.color ?? null,
      sort_order: iCh,
    });

    // 🔴 KHÔNG dùng `ch.totalLessons`. Đo được 5 chương khai sai số bài
    // (g2-c8 khai 10 thật 2 …). Số bài phải đếm từ mảng, không lấy từ metadata.
    ch.lessons.forEach((l, iL) => {
      const canhBao = validateLesson(l);
      if (canhBao.length) loi.push(...canhBao.map((c) => `${l.id}: ${c}`));

      lessons.push({
        id: l.id,
        chapter_id: ch.id,
        title: l.title,
        lesson_type: l.type ?? "learn",
        description: l.description ?? null,
        sort_order: iL,
        status: "published",
        payload: { slides: l.slides },
      });
    });
  });
}

const soSlide = lessons.reduce((s, l) => s + l.payload.slides.length, 0);

// ─────────────────────── Báo cáo ───────────────────────

console.log("═".repeat(70));
console.log("  MIGRATE NỘI DUNG BÀI HỌC — GĐ 3, lát 3a");
console.log("═".repeat(70));
console.log(
  `\n  Đọc từ file tĩnh:\n` +
    `    ${grades.length} lớp · ${chapters.length} chương · ` +
    `${lessons.length} bài · ${soSlide} slide`,
);

// Đối chiếu với con số đã đo bằng `scratch/inspect_content_shape.mjs`.
// Lệch nghĩa là hoặc nội dung đã đổi (tốt — cập nhật số), hoặc bộ đọc đã hỏng.
const MONG_DOI = { lop: 5, chuong: 41, bai: 362, slide: 1505 };
const lech =
  grades.length !== MONG_DOI.lop ||
  chapters.length !== MONG_DOI.chuong ||
  lessons.length !== MONG_DOI.bai ||
  soSlide !== MONG_DOI.slide;

console.log(
  lech
    ? `  ⚠️  LỆCH so với số đã đo (${MONG_DOI.lop}/${MONG_DOI.chuong}/${MONG_DOI.bai}/${MONG_DOI.slide}).\n` +
        `      Nội dung có thể vừa được sửa — kiểm lại trước khi ghi.`
    : `  ✅ khớp số đã đo (5/41/362/1505)`,
);

if (loi.length) {
  console.log(`\n❌ ${loi.length} LỖI NỘI DUNG — KHÔNG ghi gì cả:\n`);
  for (const l of loi.slice(0, 20)) console.log(`   ${l}`);
  if (loi.length > 20) console.log(`   … và ${loi.length - 20} lỗi nữa`);
  fail("Dừng trước khi ghi. Sửa nội dung rồi chạy lại.");
}
console.log("  ✅ tất cả slide hợp lệ");

if (!MUON_SQL && !MUON_GHI && !MUON_DOI_CHIEU) {
  console.log(
    "\n(Chạy thử nên chưa ghi gì.)\n" +
      "  Thêm --sql     để sinh file .sql dán vào SQL Editor  ← khuyến nghị\n" +
      "  Thêm --apply   để ghi thẳng qua REST (cần key ghi)\n" +
      "  Thêm --verify  để đối chiếu DB với file (không cần key)\n",
  );
  process.exit(0);
}

// ─────────────────────── Sinh SQL ───────────────────────

/** Bọc giá trị thành literal SQL an toàn. Nhân đôi nháy đơn là cách duy nhất cần. */
const lit = (v) =>
  v === null || v === undefined ? "NULL" : `'${String(v).replace(/'/g, "''")}'`;
const jsonLit = (v) => `'${JSON.stringify(v).replace(/'/g, "''")}'::jsonb`;

// 🔴 TỰ KIỂM BỘ SINH LITERAL TRƯỚC KHI GHI.
// Bọc rồi bóc ngược lại PHẢI ra đúng giá trị ban đầu. Đây là chỗ dễ sai nhất khi
// sinh SQL từ dữ liệu (nháy đơn trong chữ tiếng Việt, xuống dòng, dấu `\`), và sai
// ở đây thì hàng trăm KB SQL sẽ ghi vào DB một nội dung méo mó mà không có gì báo.
// Tự kiểm ở đây rẻ hơn nhiều so với phát hiện sau khi đã ghi.
{
  const hong = [];
  for (const l of lessons) {
    const s = jsonLit(l.payload);
    const trong = s.slice(1, s.lastIndexOf("'::jsonb"));
    try {
      const boc = trong.replace(/''/g, "'");
      if (JSON.stringify(JSON.parse(boc)) !== JSON.stringify(l.payload))
        hong.push(`${l.id} (bóc ra khác ban đầu)`);
    } catch {
      hong.push(`${l.id} (JSON hỏng sau khi bóc)`);
    }
  }
  const dsChuoi = [...grades, ...chapters, ...lessons]
    .map((x) => x.name ?? x.title)
    .filter((s) => typeof s === "string");
  for (const s of dsChuoi) {
    if (lit(s).slice(1, -1).replace(/''/g, "'") !== s)
      hong.push(`chuỗi sai: ${s.slice(0, 40)}`);
  }
  if (hong.length)
    fail(
      `Bộ sinh literal SQL hỏng ở ${hong.length} chỗ — ${hong.slice(0, 5).join(" · ")}`,
    );
  console.log(
    `  ✅ tự kiểm bộ sinh SQL: ${lessons.length} payload + ` +
      `${dsChuoi.length} chuỗi, bọc rồi bóc khớp hết`,
  );
}

if (MUON_SQL) {
  const thuMuc = path.join(ROOT, "supabase", "content-seed");
  fs.mkdirSync(thuMuc, { recursive: true });

  const dau = `-- SINH TỰ ĐỘNG bởi scripts/migrate-content.mjs — ĐỪNG SỬA TAY.
-- Chạy trong Supabase SQL Editor, theo thứ tự tên file.
-- Chạy lại được nhiều lần (ON CONFLICT … DO UPDATE) nên không sinh dòng trùng.

`;

  // Lớp + chương: nhỏ, gộp chung một file.
  let s = dau + `-- Lớp và chương\n\n`;
  s += `INSERT INTO public.content_grades (id, name, description, icon, color, sort_order)\nVALUES\n`;
  s +=
    grades
      .map(
        (g) =>
          `  (${g.id}, ${lit(g.name)}, ${lit(g.description)}, ${lit(g.icon)}, ` +
          `${lit(g.color)}, ${g.sort_order})`,
      )
      .join(",\n") +
    `\nON CONFLICT (id) DO UPDATE SET\n` +
    `  name = EXCLUDED.name, description = EXCLUDED.description,\n` +
    `  icon = EXCLUDED.icon, color = EXCLUDED.color,\n` +
    `  sort_order = EXCLUDED.sort_order, updated_at = NOW();\n\n`;

  s += `INSERT INTO public.content_chapters\n  (id, grade_id, name, description, icon, color, sort_order)\nVALUES\n`;
  s +=
    chapters
      .map(
        (c) =>
          `  (${lit(c.id)}, ${c.grade_id}, ${lit(c.name)}, ${lit(c.description)}, ` +
          `${lit(c.icon)}, ${lit(c.color)}, ${c.sort_order})`,
      )
      .join(",\n") +
    `\nON CONFLICT (id) DO UPDATE SET\n` +
    `  grade_id = EXCLUDED.grade_id, name = EXCLUDED.name,\n` +
    `  description = EXCLUDED.description, icon = EXCLUDED.icon,\n` +
    `  color = EXCLUDED.color, sort_order = EXCLUDED.sort_order,\n` +
    `  updated_at = NOW();\n`;
  fs.writeFileSync(path.join(thuMuc, "01-lop-va-chuong.sql"), s, "utf8");

  // Bài học: tách theo lớp để mỗi file không quá lớn khi dán.
  const theoLop = new Map();
  for (const l of lessons) {
    const maLop = l.id.match(/^g(\d)-/)?.[1];
    if (!theoLop.has(maLop)) theoLop.set(maLop, []);
    theoLop.get(maLop).push(l);
  }

  let stt = 2;
  for (const [maLop, ds] of [...theoLop.entries()].sort()) {
    let t = dau + `-- Bài học Lớp ${maLop} — ${ds.length} bài\n\n`;
    t +=
      `INSERT INTO public.content_lessons\n` +
      `  (id, chapter_id, title, lesson_type, description, sort_order, status, payload, published_at)\nVALUES\n`;
    t +=
      ds
        .map(
          (l) =>
            `  (${lit(l.id)}, ${lit(l.chapter_id)}, ${lit(l.title)}, ` +
            `${lit(l.lesson_type)}, ${lit(l.description)}, ${l.sort_order}, ` +
            `'published', ${jsonLit(l.payload)}, NOW())`,
        )
        .join(",\n") +
      `\nON CONFLICT (id) DO UPDATE SET\n` +
      `  chapter_id = EXCLUDED.chapter_id, title = EXCLUDED.title,\n` +
      `  lesson_type = EXCLUDED.lesson_type, description = EXCLUDED.description,\n` +
      `  sort_order = EXCLUDED.sort_order, status = EXCLUDED.status,\n` +
      `  payload = EXCLUDED.payload, published_at = NOW(), updated_at = NOW();\n\n`;

    // Phiên bản 1 = chụp lại CHÍNH những dòng vừa ghi. Viết bằng SELECT để
    // KHÔNG phải chép lại toàn bộ JSON lần thứ hai vào file SQL (giảm một nửa
    // dung lượng file, và không có nguy cơ hai bản chép lệch nhau).
    t +=
      `-- Phiên bản 1 cho các bài của Lớp ${maLop}\n` +
      `INSERT INTO public.content_lesson_versions\n` +
      `  (lesson_id, version, title, description, lesson_type, payload)\n` +
      `SELECT id, 1, title, description, lesson_type, payload\n` +
      `FROM public.content_lessons\n` +
      `WHERE chapter_id LIKE ${lit(`g${maLop}-%`)}\n` +
      `ON CONFLICT (lesson_id, version) DO NOTHING;\n`;

    const ten = `${String(stt).padStart(2, "0")}-bai-lop-${maLop}.sql`;
    fs.writeFileSync(path.join(thuMuc, ten), t, "utf8");
    stt++;
  }

  // Cấu hình + đối chiếu, gộp một file cuối.
  let cuoi = dau + `-- Cấu hình và đối chiếu\n\n`;
  cuoi +=
    `-- Đánh dấu phiên bản nội dung = 1. CHỈ đặt khi đang nhỏ hơn 1, để chạy lại\n` +
    `-- không kéo lùi phiên bản mà admin đã publish sau đó.\n` +
    `UPDATE public.app_config\n` +
    `SET value = '1'::jsonb, updated_at = NOW()\n` +
    `WHERE key = 'content_version'\n` +
    `  AND COALESCE((value #>> '{}')::int, 0) < 1;\n\n`;
  cuoi +=
    `-- 🔴 KHÔNG đụng tới content_source. App phải tiếp tục đọc file tĩnh.\n` +
    `-- Kiểm để chắc chắn:\n` +
    `SELECT key, value FROM public.app_config\n` +
    `WHERE key IN ('content_source', 'content_version') ORDER BY key;\n` +
    `-- Mong đợi: content_source = "static" · content_version = 1\n\n`;
  cuoi +=
    `-- Đối chiếu số dòng (phải khớp 5 / 41 / 362):\n` +
    `SELECT\n` +
    `  (SELECT COUNT(*) FROM public.content_grades)   AS so_lop,\n` +
    `  (SELECT COUNT(*) FROM public.content_chapters) AS so_chuong,\n` +
    `  (SELECT COUNT(*) FROM public.content_lessons)  AS so_bai,\n` +
    `  (SELECT COUNT(*) FROM public.content_lesson_versions) AS so_phien_ban;\n\n`;
  cuoi +=
    `-- Kiểm số bài mỗi chương là số THẬT, không phải metadata sai:\n` +
    `-- (5 chương từng khai sai: g2-c8, g2-c9, g2-c10, g3-c9, g3-c10)\n` +
    `SELECT chapter_id, COUNT(*) AS so_bai\n` +
    `FROM public.content_lessons\n` +
    `WHERE chapter_id IN ('g2-c8','g2-c9','g2-c10','g3-c9','g3-c10')\n` +
    `GROUP BY chapter_id ORDER BY chapter_id;\n` +
    `-- Mong đợi: g2-c8=2, g2-c9=2, g2-c10=3, g3-c9=2, g3-c10=3\n`;
  fs.writeFileSync(
    path.join(thuMuc, "99-cau-hinh-va-doi-chieu.sql"),
    cuoi,
    "utf8",
  );

  console.log(
    `\n✅ Đã sinh file SQL vào \`supabase/content-seed/\`:\n` +
      `   ${fs
        .readdirSync(thuMuc)
        .sort()
        .map((f) => "   " + f)
        .join("\n")}\n\n` +
      `   Chạy trong Supabase SQL Editor theo thứ tự tên file (01 → 99).\n` +
      `   Xong thì chạy: node scripts/migrate-content.mjs --verify\n`,
  );
  process.exit(0);
}

// ─────────────────────── Đối chiếu với DB (không cần key mạnh) ───────────────────────

if (MUON_DOI_CHIEU) {
  const anon = ENV?.VITE_SUPABASE_ANON_KEY;
  if (!URL_SB || !anon)
    fail(
      `Không thấy VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY trong .env.local`,
    );

  const doc = async (bang, select) => {
    const r = await fetch(`${URL_SB}/rest/v1/${bang}?select=${select}`, {
      headers: { apikey: anon, Authorization: `Bearer ${anon}` },
    });
    if (!r.ok)
      fail(`Đọc ${bang} thất bại — HTTP ${r.status}: ${await r.text()}`);
    return r.json();
  };

  console.log(
    "\nĐang đọc lại từ DB bằng anon key (không cần quyền gì đặc biệt)…\n",
  );

  const [dbGrades, dbChapters, dbLessons] = await Promise.all([
    doc("content_grades", "id"),
    doc("content_chapters", "id,grade_id"),
    doc(
      "content_lessons",
      "id,chapter_id,title,lesson_type,description,payload",
    ),
  ]);

  const ketQua = [];
  const soSanh = (nhan, that, mong) =>
    ketQua.push({ nhan, that, mong, dat: that === mong });

  soSanh("Số lớp", dbGrades.length, grades.length);
  soSanh("Số chương", dbChapters.length, chapters.length);
  soSanh("Số bài", dbLessons.length, lessons.length);

  const dbSlide = dbLessons.reduce(
    (s, l) => s + (l.payload?.slides?.length ?? 0),
    0,
  );
  soSanh("Số slide", dbSlide, soSlide);

  // So TỪNG BÀI, không chỉ đếm tổng — đếm tổng khớp mà nội dung lệch là chuyện
  // hoàn toàn có thể xảy ra.
  //
  // 🔴 PHẢI SẮP XẾP KHOÁ TRƯỚC KHI SO. PostgreSQL `jsonb` KHÔNG giữ thứ tự khoá
  // của object — nó lưu dạng chuẩn hoá (sắp theo độ dài khoá rồi theo byte). Nên
  // `JSON.stringify` của giá trị đọc về không bao giờ bằng `JSON.stringify` của
  // object gốc, DÙ NỘI DUNG Y HỆT.
  //
  // Đã mắc đúng lỗi này: lần chạy `--verify` đầu tiên báo **cả 362 bài** "có nội
  // dung khác" trong khi đếm số dòng đúng hết. Mọi thứ đều lệch thì cái thước là
  // chỗ đáng ngờ trước tiên — và đúng là thước hỏng, dữ liệu sạch.
  //
  // MẢNG thì giữ nguyên thứ tự: thứ tự slide là một phần nội dung, đổi thứ tự
  // nghĩa là nội dung khác.
  const chuanHoa = (v) => {
    if (Array.isArray(v)) return v.map(chuanHoa);
    if (v && typeof v === "object")
      return Object.fromEntries(
        Object.keys(v)
          .sort()
          .map((k) => [k, chuanHoa(v[k])]),
      );
    return v;
  };
  const bangNhau = (a, b) =>
    JSON.stringify(chuanHoa(a)) === JSON.stringify(chuanHoa(b));

  const theoId = new Map(dbLessons.map((l) => [l.id, l]));
  const thieu = [];
  const khac = [];
  for (const l of lessons) {
    const d = theoId.get(l.id);
    if (!d) {
      thieu.push(l.id);
      continue;
    }
    // Ghi rõ TRƯỜNG NÀO lệch, không chỉ ghi id. Lần trước chỉ có danh sách id nên
    // phải viết thêm script để tìm ra nguyên nhân — đắt hơn nhiều so với việc nói
    // thẳng ra ngay ở đây.
    const truongLech = [];
    if (d.title !== l.title) truongLech.push("title");
    if (d.lesson_type !== l.lesson_type) truongLech.push("lesson_type");
    if ((d.description ?? null) !== l.description)
      truongLech.push("description");
    if (!bangNhau(d.payload, l.payload)) truongLech.push("payload");
    if (truongLech.length) khac.push(`${l.id} (${truongLech.join(", ")})`);
  }
  soSanh("Bài bị thiếu", thieu.length, 0);
  soSanh("Bài có nội dung khác", khac.length, 0);

  // Số bài mỗi chương — riêng 5 chương từng khai sai metadata.
  const demChuong = new Map();
  for (const l of dbLessons)
    demChuong.set(l.chapter_id, (demChuong.get(l.chapter_id) ?? 0) + 1);
  const chuongNghi = ["g2-c8", "g2-c9", "g2-c10", "g3-c9", "g3-c10"];
  const mongChuong = {
    "g2-c8": 2,
    "g2-c9": 2,
    "g2-c10": 3,
    "g3-c9": 2,
    "g3-c10": 3,
  };
  for (const c of chuongNghi)
    soSanh(
      `Chương ${c} (metadata cũ khai sai)`,
      demChuong.get(c) ?? 0,
      mongChuong[c],
    );

  // 🔴 TC-3a.10 — công tắc nội dung phải VẪN là "static".
  // Script migrate CỐ Ý không đụng vào nó. Nếu nó thành "remote" thì lát 3a đã hoá
  // thành lát 3d: app đổi hành vi cùng lúc với việc dựng dữ liệu — đúng thứ cần tránh.
  // `app_config` đọc được bằng anon key nên kiểm được ở đây, không cần quyền gì thêm.
  const cfg = await doc("app_config", "key,value");
  const giaTri = (k) => cfg.find((c) => c.key === k)?.value;

  const nguon = giaTri("content_source");
  ketQua.push({
    nhan: 'content_source vẫn là "static"',
    that: JSON.stringify(nguon),
    mong: JSON.stringify("static"),
    dat: nguon === "static",
  });

  const pb = giaTri("content_version");
  ketQua.push({
    nhan: "content_version (số nguyên ≥ 1)",
    that: JSON.stringify(pb),
    mong: "1",
    dat: Number.isInteger(pb) && pb >= 1,
  });

  console.log("  Chỉ số                                  DB      File    ");
  console.log("  " + "─".repeat(58));
  for (const k of ketQua)
    console.log(
      `  ${k.dat ? "✅" : "❌"} ${k.nhan.padEnd(36)} ` +
        `${String(k.that).padStart(5)}   ${String(k.mong).padStart(5)}`,
    );

  if (thieu.length)
    console.log(`\n  Bài thiếu: ${thieu.slice(0, 10).join(", ")}`);
  if (khac.length)
    console.log(`  Bài lệch nội dung: ${khac.slice(0, 10).join(", ")}`);

  const hong = ketQua.filter((k) => !k.dat);
  console.log(
    hong.length === 0
      ? `\n✅ KHỚP HOÀN TOÀN — ${lessons.length} bài, ${soSlide} slide.\n` +
          `   (Bảng phiên bản anon không đọc được — kiểm bằng file 99-…sql.)\n`
      : `\n❌ ${hong.length} chỉ số lệch. Xem bảng trên.\n`,
  );
  process.exit(hong.length === 0 ? 0 : 1);
}

// ─────────────────────── Ghi thẳng qua REST ───────────────────────

if (MUON_GHI) {
  const keyGhi = process.env.SUPABASE_WRITE_KEY;
  if (!URL_SB) fail("Không thấy VITE_SUPABASE_URL trong .env.local");
  if (!keyGhi)
    fail(
      "Thiếu biến môi trường SUPABASE_WRITE_KEY.\n" +
        "   Đặt key có quyền ghi rồi chạy lại. TRÊN POWERSHELL:\n" +
        '     $env:SUPABASE_WRITE_KEY = "..."\n' +
        "   Hoặc dùng `--sql` để khỏi phải dùng key nào.",
    );

  const ghi = async (bang, rows, nhan) => {
    const r = await fetch(`${URL_SB}/rest/v1/${bang}`, {
      method: "POST",
      headers: {
        apikey: keyGhi,
        Authorization: `Bearer ${keyGhi}`,
        "Content-Type": "application/json",
        // merge-duplicates = upsert theo khoá chính → chạy lại không sinh dòng trùng.
        // return=minimal = KHÔNG đọc lại dòng vừa ghi. Đây đúng bài học từ GĐ 2c:
        // muốn trả về dòng vừa ghi thì PostgREST phải đọc lại, và bước đọc lại bị
        // policy SELECT chi phối → báo lỗi rất dễ chẩn đoán nhầm thành lỗi RLS.
        Prefer: "resolution=merge-duplicates,return=minimal",
      },
      body: JSON.stringify(rows),
    });
    if (!r.ok)
      fail(
        `Ghi ${bang} thất bại — HTTP ${r.status}: ${(await r.text()).slice(0, 400)}`,
      );
    console.log(`  ✅ ${nhan}: ${rows.length} dòng`);
  };

  console.log("\nĐang ghi vào DB…\n");
  await ghi("content_grades", grades, "Lớp");
  await ghi("content_chapters", chapters, "Chương");
  await ghi("content_lessons", lessons, "Bài");

  // Phiên bản 1. Ghi theo lô để không mở một request quá lớn.
  const versions = lessons.map((l) => ({
    lesson_id: l.id,
    version: 1,
    title: l.title,
    description: l.description,
    lesson_type: l.lesson_type,
    payload: l.payload,
  }));
  for (let i = 0; i < versions.length; i += 50) {
    await ghi(
      "content_lesson_versions",
      versions.slice(i, i + 50),
      `Phiên bản 1 (lô ${i / 50 + 1})`,
    );
  }

  console.log(
    `\n✅ Xong. Chạy \`node scripts/migrate-content.mjs --verify\` để đối chiếu.\n` +
      `   content_source KHÔNG bị đụng tới — app vẫn đọc file tĩnh (đúng chủ ý của lát 3a).\n`,
  );
  process.exit(0);
}
