/**
 * ĐỌC MỘT BÀI TỪ DB (anon key, chỉ đọc) ĐỂ SO VỚI FILE TĨNH.
 *
 *   node scratch/doc-bai-tu-db.mjs g1-c1-l1
 *
 * Vì sao cần: app đang vẽ một bài khác với file tĩnh ⇒ phải biết bên nào là nguồn thật.
 * Không đoán: in ra số slide + kiểu từng slide + chữ đầu của cả hai bên.
 */
import fs from "node:fs";

function napEnv() {
  for (const f of ["admin/.env.local", "client/.env.local"]) {
    if (!fs.existsSync(f)) continue;
    const env = {};
    for (const line of fs.readFileSync(f, "utf8").split(/\r?\n/)) {
      const m = line.match(
        /^\s*(VITE_SUPABASE_URL|VITE_SUPABASE_ANON_KEY)\s*=\s*(.+?)\s*$/,
      );
      if (m) env[m[1]] = m[2];
    }
    if (env.VITE_SUPABASE_URL?.startsWith("https://")) return env;
  }
  return null;
}

const id = process.argv[2] || "g1-c1-l1";
const ENV = napEnv();
if (!ENV) {
  console.error("Không thấy VITE_SUPABASE_URL trong .env.local");
  process.exit(1);
}

const r = await fetch(
  `${ENV.VITE_SUPABASE_URL}/rest/v1/content_lessons?id=eq.${id}&select=id,title,payload,status`,
  {
    headers: {
      apikey: ENV.VITE_SUPABASE_ANON_KEY,
      Authorization: `Bearer ${ENV.VITE_SUPABASE_ANON_KEY}`,
    },
  },
);
const rows = await r.json();
if (!Array.isArray(rows) || rows.length === 0) {
  console.log("DB KHÔNG CÓ bài này:", id);
  process.exit(0);
}
const b = rows[0];
const slides = b.payload?.slides ?? [];
console.log(
  `DB: ${b.id} — ${b.title} · status=${b.status} · ${slides.length} slide`,
);
slides.forEach((s, i) => {
  const t =
    s.content?.text ??
    s.content?.question ??
    s.content?.title ??
    s.content?.explanation ??
    "";
  const o = Array.isArray(s.content?.options)
    ? ` · options=${s.content.options.length}`
    : "";
  console.log(
    `  ${i + 1}. ${s.type}${o} — ${String(t).replace(/\s+/g, " ").slice(0, 70)}`,
  );
});
