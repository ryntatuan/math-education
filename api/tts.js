// Proxy TTS tối thiểu cho giọng đọc tiếng Việt.
//
// ĐÂY LÀ ENDPOINT CÔNG KHAI: ai biết URL cũng gọi được, nên phải tự bảo vệ —
// giới hạn độ dài câu, giới hạn số lượt theo IP, chỉ nhận GET/HEAD và không mở
// CORS (trình duyệt không cần CORS để phát <audio>; chỉ cần khi đọc dữ liệu
// bằng fetch/Web Audio — app không làm việc đó).

const MAX_TEXT_LENGTH = 200;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 40;
const MAX_TRACKED_IPS = 1000;

// Bộ đếm nằm trong RAM của từng instance serverless ⇒ chỉ là "best effort":
// mỗi cold start / mỗi instance đếm riêng. Đủ để chặn script gọi liên tục,
// không phải hàng rào tuyệt đối (muốn chính xác cần KV/Redis).
const hits = new Map();

export function getClientIp(req) {
  const forwarded = req?.headers?.["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0].trim();
  }
  return req?.socket?.remoteAddress || "unknown";
}

export function checkRateLimit(ip, now = Date.now()) {
  const entry = hits.get(ip);

  if (!entry || now >= entry.resetAt) {
    if (hits.size >= MAX_TRACKED_IPS) hits.clear();
    hits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)),
    };
  }

  entry.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}

export function resetRateLimit() {
  hits.clear();
}

export default async function handler(req, res) {
  try {
    const method = req.method || "GET";
    if (method !== "GET" && method !== "HEAD") {
      res.setHeader("Allow", "GET, HEAD");
      return res.status(405).send("Method not allowed");
    }

    const text = typeof req.query?.q === "string" ? req.query.q.trim() : "";
    if (!text) {
      return res.status(400).send("Missing query text q");
    }
    if (text.length > MAX_TEXT_LENGTH) {
      return res
        .status(400)
        .send(`Query text too long (max ${MAX_TEXT_LENGTH} characters)`);
    }

    const { allowed, retryAfterSeconds } = checkRateLimit(getClientIp(req));
    if (!allowed) {
      res.setHeader("Retry-After", String(retryAfterSeconds));
      return res.status(429).send("Too many requests");
    }

    const googleUrl = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=vi&q=${encodeURIComponent(text)}`;
    const upstream = await fetch(googleUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    if (!upstream.ok) {
      return res
        .status(upstream.status)
        .send(`Google TTS upstream error: ${upstream.status}`);
    }

    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Cache-Control", "public, max-age=86400, s-maxage=86400");

    const arrayBuffer = await upstream.arrayBuffer();
    res.status(200).send(Buffer.from(arrayBuffer));
  } catch (err) {
    res.status(500).send(`Server error: ${err.message}`);
  }
}
