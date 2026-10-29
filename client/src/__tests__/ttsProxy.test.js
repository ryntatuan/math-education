import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import handler, { getClientIp, resetRateLimit } from "../../../api/tts.js";

/**
 * Test cho proxy TTS công khai.
 *
 * VÌ SAO CẦN: `/api/tts` ai cũng gọi được. Trước đây nó không giới hạn độ dài,
 * không rate-limit và mở CORS `*` — một script nhỏ có thể biến server thành
 * cỗ máy gọi Google TTS miễn phí. Các test dưới đây khoá lại 4 hàng rào đó.
 */
function taoRes() {
  return {
    statusCode: 0,
    headers: {},
    body: undefined,
    setHeader(key, value) {
      this.headers[key.toLowerCase()] = value;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    send(payload) {
      this.body = payload;
      return this;
    },
  };
}

function taoReq({ q = "Xin chào", ip = "1.1.1.1", method = "GET" } = {}) {
  return {
    method,
    query: { q },
    headers: { "x-forwarded-for": ip },
  };
}

describe("proxy /api/tts", () => {
  beforeEach(() => {
    resetRateLimit();
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({
        ok: true,
        status: 200,
        arrayBuffer: async () => new Uint8Array([1, 2, 3, 4]).buffer,
      })),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("trả audio khi câu hợp lệ", async () => {
    const res = taoRes();
    await handler(taoReq(), res);
    expect(res.statusCode).toBe(200);
    expect(res.headers["content-type"]).toBe("audio/mpeg");
  });

  it("KHÔNG mở CORS cho mọi origin", () => {
    const res = taoRes();
    return handler(taoReq(), res).then(() => {
      expect(res.headers["access-control-allow-origin"]).toBeUndefined();
    });
  });

  it("từ chối câu quá dài (chặn lạm dụng làm proxy)", async () => {
    const res = taoRes();
    await handler(taoReq({ q: "a".repeat(201) }), res);
    expect(res.statusCode).toBe(400);
    expect(String(res.body)).toContain("too long");
    expect(fetch).not.toHaveBeenCalled();
  });

  it("từ chối câu rỗng", async () => {
    const res = taoRes();
    await handler(taoReq({ q: "   " }), res);
    expect(res.statusCode).toBe(400);
  });

  it("từ chối method khác GET/HEAD", async () => {
    const res = taoRes();
    await handler(taoReq({ method: "POST" }), res);
    expect(res.statusCode).toBe(405);
    expect(res.headers.allow).toBe("GET, HEAD");
  });

  it("chặn khi một IP gọi quá nhiều lần trong 1 phút", async () => {
    const ip = "2.2.2.2";
    let last;
    for (let i = 0; i < 41; i += 1) {
      last = taoRes();
      await handler(taoReq({ ip }), last);
    }
    expect(last.statusCode).toBe(429);
    expect(Number(last.headers["retry-after"])).toBeGreaterThan(0);
  });

  it("không ảnh hưởng IP khác khi một IP bị chặn", async () => {
    const ip = "3.3.3.3";
    for (let i = 0; i < 40; i += 1) {
      await handler(taoReq({ ip }), taoRes());
    }
    const res = taoRes();
    await handler(taoReq({ ip: "4.4.4.4" }), res);
    expect(res.statusCode).toBe(200);
  });

  it("giữ nguyên mã lỗi khi Google trả lỗi", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({ ok: false, status: 403 })),
    );
    const res = taoRes();
    await handler(taoReq({ ip: "5.5.5.5" }), res);
    expect(res.statusCode).toBe(403);
  });
});

describe("getClientIp", () => {
  it("lấy IP đầu tiên trong x-forwarded-for", () => {
    expect(
      getClientIp({ headers: { "x-forwarded-for": "9.9.9.9, 10.0.0.1" } }),
    ).toBe("9.9.9.9");
  });

  it("rơi về socket khi không có header", () => {
    expect(getClientIp({ headers: {}, socket: { remoteAddress: "::1" } })).toBe(
      "::1",
    );
  });
});
