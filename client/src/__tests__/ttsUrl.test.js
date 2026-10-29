import { describe, expect, it } from "vitest";

import { buildTtsUrl } from "../utils/speechHelper.js";

/**
 * Test cho URL của proxy TTS.
 *
 * VÌ SAO CẦN: trong APK, app được nạp từ `https://localhost` nên URL tương đối
 * `/api/tts` trỏ vào chính máy và luôn hỏng. Giọng đọc phải gọi tuyệt đối về
 * bản deploy thật — nếu ai đó đổi lại thành đường dẫn tương đối, test này bắt.
 */
describe("buildTtsUrl", () => {
  it("dùng đường dẫn tương đối trên web (giữ proxy cùng origin)", () => {
    expect(buildTtsUrl("Xin chào", "")).toBe(
      "/api/tts?q=Xin%20ch%C3%A0o",
    );
  });

  it("ghép origin tuyệt đối khi chạy trong APK", () => {
    expect(buildTtsUrl("Số mười", "https://toanvuive.vercel.app")).toBe(
      "https://toanvuive.vercel.app/api/tts?q=S%E1%BB%91%20m%C6%B0%E1%BB%9Di",
    );
  });

  it("mã hoá ký tự đặc biệt để không cắt URL", () => {
    const url = buildTtsUrl("5 + 3 = 8?", "https://toanvuive.vercel.app");
    expect(url).not.toContain(" ");
    expect(url).not.toContain("+");
    expect(url).toContain("%3D");
    expect(url.startsWith("https://toanvuive.vercel.app/api/tts?q=")).toBe(true);
  });
});
