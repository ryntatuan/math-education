import { describe, expect, it, vi } from "vitest";

// Giả lập môi trường APK: Capacitor báo đang chạy native.
vi.mock("@capacitor/core", () => ({
  Capacitor: { isNativePlatform: () => true },
}));

const { buildTtsUrl } = await import("../utils/speechHelper.js");

/**
 * Ca hỏng thật trong APK: URL tương đối `/api/tts` trỏ về `https://localhost`
 * (chính WebView) nên không có máy chủ nào phía sau. Khi chạy native, hàm phải
 * tự trả về origin tuyệt đối của bản deploy.
 */
describe("buildTtsUrl khi chạy trong APK", () => {
  it("mặc định trỏ tuyệt đối về máy chủ đã deploy", () => {
    expect(buildTtsUrl("Số mười")).toBe(
      "https://toanvuive.vercel.app/api/tts?q=S%E1%BB%91%20m%C6%B0%E1%BB%9Di",
    );
  });

  it("không bao giờ trả về đường dẫn tương đối", () => {
    expect(buildTtsUrl("Xin chào").startsWith("/")).toBe(false);
  });
});
