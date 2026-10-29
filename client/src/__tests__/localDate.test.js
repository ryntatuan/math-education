import { describe, expect, it } from "vitest";

import { localDateInDays, localDateKey } from "../utils/localDate.js";

/**
 * Test cho khoá ngày theo giờ máy.
 *
 * VÌ SAO CẦN: trước đây streak/nhiệm vụ ngày/sổ tay lỗi sai dùng
 * `new Date().toISOString().split("T")[0]` (ngày UTC). Ở UTC+7, bé học 23h rồi
 * 6h30 sáng hôm sau bị tính CÙNG một ngày nên streak không tăng, và nhiệm vụ
 * ngày reset lúc 7h sáng. Test dưới đây khoá đúng hành vi mong muốn: mọi mốc
 * trong cùng một ngày giờ máy phải cho cùng một khoá, kể cả 00:30 và 23:59.
 */
describe("localDateKey", () => {
  it("đệm 0 cho tháng và ngày", () => {
    expect(localDateKey(new Date(2026, 0, 5))).toBe("2026-01-05");
    expect(localDateKey(new Date(2026, 11, 31))).toBe("2026-12-31");
  });

  it("giữ nguyên ngày giờ máy ở sát nửa đêm (ca thật: 00:30 và 23:59)", () => {
    // Đây chính là ca hỏng của bản cũ: 00:30 giờ VN là 17:30 UTC ngày hôm trước.
    expect(localDateKey(new Date(2026, 9, 29, 0, 30))).toBe("2026-10-29");
    expect(localDateKey(new Date(2026, 9, 29, 6, 59, 59))).toBe("2026-10-29");
    expect(localDateKey(new Date(2026, 9, 29, 23, 59, 59, 999))).toBe(
      "2026-10-29",
    );
  });

  it("nhận chuỗi ISO và trả về ngày giờ máy", () => {
    const d = new Date(2026, 9, 29, 0, 30);
    expect(localDateKey(d.toISOString())).toBe(localDateKey(d));
  });

  it("trả null với ngày không hợp lệ", () => {
    expect(localDateKey(new Date("khong-phai-ngay"))).toBeNull();
    expect(localDateKey("")).toBeNull();
  });
});

describe("localDateInDays", () => {
  it("cộng và trừ ngày", () => {
    expect(localDateInDays(1, new Date(2026, 9, 29))).toBe("2026-10-30");
    expect(localDateInDays(-1, new Date(2026, 9, 29))).toBe("2026-10-28");
    expect(localDateInDays(7, new Date(2026, 9, 29))).toBe("2026-11-05");
  });

  it("vượt qua ranh giới tháng/năm", () => {
    expect(localDateInDays(1, new Date(2026, 11, 31, 23, 30))).toBe(
      "2027-01-01",
    );
    expect(localDateInDays(-1, new Date(2026, 0, 1, 0, 30))).toBe("2025-12-31");
  });

  it("xử lý năm nhuận", () => {
    expect(localDateInDays(1, new Date(2028, 1, 28))).toBe("2028-02-29");
    expect(localDateInDays(1, new Date(2026, 1, 28))).toBe("2026-03-01");
  });

  it("không nhảy ngày khi cộng từ mốc sát nửa đêm", () => {
    expect(localDateInDays(0, new Date(2026, 9, 29, 0, 0, 1))).toBe(
      "2026-10-29",
    );
    expect(localDateInDays(0, new Date(2026, 9, 29, 23, 59, 59))).toBe(
      "2026-10-29",
    );
  });
});
