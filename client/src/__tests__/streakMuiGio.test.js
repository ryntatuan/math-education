import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import "./setup.js";
import useAuthStore from "../store/useAuthStore";
import useProgressStore from "../store/useProgressStore";

/**
 * Ca thật người dùng báo: bé học 23h hôm trước rồi 6h30 sáng hôm sau.
 *
 * Bản cũ dùng khoá ngày UTC nên 6h30 giờ VN vẫn là "hôm qua" theo UTC ⇒
 * `updateStreak` thấy trùng `lastActiveDate` và KHÔNG tăng streak.
 */
describe("updateStreak qua nửa đêm (giờ máy)", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    useAuthStore.setState({ isGuest: false });
    useProgressStore.setState({
      currentStreak: 0,
      longestStreak: 0,
      lastActiveDate: null,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("học 23h rồi 6h30 sáng hôm sau thì streak tăng lên 2", () => {
    vi.setSystemTime(new Date(2026, 9, 29, 23, 0));
    useProgressStore.getState().updateStreak();
    expect(useProgressStore.getState().currentStreak).toBe(1);
    expect(useProgressStore.getState().lastActiveDate).toBe("2026-10-29");

    vi.setSystemTime(new Date(2026, 9, 30, 6, 30));
    useProgressStore.getState().updateStreak();
    expect(useProgressStore.getState().currentStreak).toBe(2);
    expect(useProgressStore.getState().lastActiveDate).toBe("2026-10-30");
  });

  it("gọi nhiều lần trong cùng một ngày chỉ tính 1", () => {
    vi.setSystemTime(new Date(2026, 9, 29, 1, 0));
    useProgressStore.getState().updateStreak();
    vi.setSystemTime(new Date(2026, 9, 29, 23, 59));
    useProgressStore.getState().updateStreak();
    expect(useProgressStore.getState().currentStreak).toBe(1);
  });

  it("bỏ 1 ngày thì streak reset về 1", () => {
    vi.setSystemTime(new Date(2026, 9, 29, 10, 0));
    useProgressStore.getState().updateStreak();
    vi.setSystemTime(new Date(2026, 9, 31, 10, 0));
    useProgressStore.getState().updateStreak();
    expect(useProgressStore.getState().currentStreak).toBe(1);
  });
});
