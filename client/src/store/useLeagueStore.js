import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createGuestAwareStorage } from "./sessionMode";
import useProgressStore from "./useProgressStore";
import useUserStore from "./useUserStore";
import useAuthStore from "./useAuthStore";
import { supabase, isSupabaseConfigured } from "../services/supabaseClient";
import { getReward } from "../services/rewardService";

export const LEAGUE_TIERS = [
  { id: "bronze", name: "Giải Đồng", icon: "🥉", color: "#cd7f32", minXp: 0 },
  { id: "silver", name: "Giải Bạc", icon: "🥈", color: "#94a3b8", minXp: 150 },
  { id: "gold", name: "Giải Vàng", icon: "🥇", color: "#eab308", minXp: 350 },
  {
    id: "diamond",
    name: "Giải Kim Cương",
    icon: "💎",
    color: "#06b6d4",
    minXp: 600,
  },
  {
    id: "master",
    name: "Giải Cao Thủ",
    icon: "👑",
    color: "#8b5cf6",
    minXp: 1000,
  },
  {
    id: "quarter_final",
    name: "Tứ kết Vô Địch",
    icon: "⚔️",
    color: "#f43f5e",
    minXp: 1500,
    isTournament: true,
  },
  {
    id: "semi_final",
    name: "Bán kết Vô Địch",
    icon: "🔥",
    color: "#ec4899",
    minXp: 2000,
    isTournament: true,
  },
  {
    id: "final",
    name: "Chung kết Vô Địch",
    icon: "🏆",
    color: "#fbbf24",
    minXp: 2500,
    isTournament: true,
  },
];

/**
 * Danh sách 10 bot cho TẤT CẢ các hạng giải đấu
 * Mỗi giải đấu có 10 bạn bot riêng biệt với tên và biểu tượng đặc sắc
 */
export const TIER_BOTS_DEFINITIONS = {
  bronze: [
    { id: "bot_bronze_1", name: "Bảo Nam", avatar: "🚀" },
    { id: "bot_bronze_2", name: "Tuệ Lâm", avatar: "🦄" },
    { id: "bot_bronze_3", name: "Khánh Vy", avatar: "🍓" },
    { id: "bot_bronze_4", name: "Minh Khang", avatar: "🦁" },
    { id: "bot_bronze_5", name: "Mai Chi", avatar: "🌻" },
    { id: "bot_bronze_6", name: "Quang Anh", avatar: "⚡" },
    { id: "bot_bronze_7", name: "Anh Thư", avatar: "🎨" },
    { id: "bot_bronze_8", name: "Gia Hân", avatar: "🌸" },
    { id: "bot_bronze_9", name: "Hoàng Bách", avatar: "🦖" },
    { id: "bot_bronze_10", name: "Hải Đăng", avatar: "🌟" },
  ],
  silver: [
    { id: "bot_silver_1", name: "Thanh Trúc", avatar: "🌿" },
    { id: "bot_silver_2", name: "Nhật Minh", avatar: "☀️" },
    { id: "bot_silver_3", name: "Thảo My", avatar: "🍀" },
    { id: "bot_silver_4", name: "Đức Trí", avatar: "🧠" },
    { id: "bot_silver_5", name: "Ngọc Diệp", avatar: "🍃" },
    { id: "bot_silver_6", name: "Trọng Khôi", avatar: "⚽" },
    { id: "bot_silver_7", name: "Quỳnh Anh", avatar: "🌷" },
    { id: "bot_silver_8", name: "Phúc An", avatar: "🎈" },
    { id: "bot_silver_9", name: "Lan Chi", avatar: "🌼" },
    { id: "bot_silver_10", name: "Tùng Dương", avatar: "🪁" },
  ],
  gold: [
    { id: "bot_gold_1", name: "Hùng Dũng", avatar: "🐯" },
    { id: "bot_gold_2", name: "Thùy Dương", avatar: "🌞" },
    { id: "bot_gold_3", name: "Đăng Khoa", avatar: "📚" },
    { id: "bot_gold_4", name: "Ánh Tuyết", avatar: "❄️" },
    { id: "bot_gold_5", name: "Tuấn Kiệt", avatar: "🎯" },
    { id: "bot_gold_6", name: "Phương Linh", avatar: "🦚" },
    { id: "bot_gold_7", name: "Hoàng Nam", avatar: "🏆" },
    { id: "bot_gold_8", name: "Yến Nhi", avatar: "🕊️" },
    { id: "bot_gold_9", name: "Quốc Bảo", avatar: "🛡️" },
    { id: "bot_gold_10", name: "Hà Phương", avatar: "🌺" },
  ],
  diamond: [
    { id: "bot_diamond_1", name: "Minh Triết", avatar: "🔮" },
    { id: "bot_diamond_2", name: "Huyền Trang", avatar: "💎" },
    { id: "bot_diamond_3", name: "Việt Anh", avatar: "🦅" },
    { id: "bot_diamond_4", name: "Kim Ngân", avatar: "💰" },
    { id: "bot_diamond_5", name: "Huy Hoàng", avatar: "👑" },
    { id: "bot_diamond_6", name: "Bảo Ngọc", avatar: "💍" },
    { id: "bot_diamond_7", name: "Thiên Phúc", avatar: "🌠" },
    { id: "bot_diamond_8", name: "Thục Anh", avatar: "💫" },
    { id: "bot_diamond_9", name: "Khôi Nguyên", avatar: "🎖️" },
    { id: "bot_diamond_10", name: "Tường Vy", avatar: "🌹" },
  ],
  master: [
    { id: "bot_master_1", name: "Long Vũ", avatar: "🐉" },
    { id: "bot_master_2", name: "Thái Dương", avatar: "🔆" },
    { id: "bot_master_3", name: "Diệu Linh", avatar: "🌌" },
    { id: "bot_master_4", name: "Bá Tùng", avatar: "🌲" },
    { id: "bot_master_5", name: "Minh Tuệ", avatar: "⚡" },
    { id: "bot_master_6", name: "Thùy Tiên", avatar: "🧚" },
    { id: "bot_master_7", name: "Nam Phong", avatar: "🌪️" },
    { id: "bot_master_8", name: "Ngân Hà", avatar: "🪐" },
    { id: "bot_master_9", name: "Anh Quân", avatar: "🏹" },
    { id: "bot_master_10", name: "Cẩm Tú", avatar: "💐" },
  ],
  quarter_final: [
    { id: "bot_quarter_1", name: "Đại Đế", avatar: "🦅" },
    { id: "bot_quarter_2", name: "Thần Tốc", avatar: "⚡" },
    { id: "bot_quarter_3", name: "Chiến Binh", avatar: "🛡️" },
    { id: "bot_quarter_4", name: "Tinh Anh", avatar: "🎯" },
    { id: "bot_quarter_5", name: "Vô Song", avatar: "🔥" },
    { id: "bot_quarter_6", name: "Quả Cảm", avatar: "🦁" },
    { id: "bot_quarter_7", name: "Linh Hoạt", avatar: "🌪️" },
    { id: "bot_quarter_8", name: "Kiên Cường", avatar: "🦾" },
    { id: "bot_quarter_9", name: "Bất Bại", avatar: "⚔️" },
    { id: "bot_quarter_10", name: "Phi Thường", avatar: "🚀" },
  ],
  semi_final: [
    { id: "bot_semi_1", name: "Chúa Tể", avatar: "🐉" },
    { id: "bot_semi_2", name: "Thần Sấm", avatar: "⛈️" },
    { id: "bot_semi_3", name: "Cuồng Phong", avatar: "🌀" },
    { id: "bot_semi_4", name: "Sát Thủ", avatar: "🗡️" },
    { id: "bot_semi_5", name: "Ma Tốc Độ", avatar: "🏎️" },
    { id: "bot_semi_6", name: "Người Nhện", avatar: "🕸️" },
    { id: "bot_semi_7", name: "Thần Tiễn", avatar: "🏹" },
    { id: "bot_semi_8", name: "Mãnh Hổ", avatar: "🐯" },
    { id: "bot_semi_9", name: "Bóng Đêm", avatar: "🌑" },
    { id: "bot_semi_10", name: "Mặt Trời", avatar: "☀️" },
  ],
  final: [
    { id: "bot_final_1", name: "Huyền Thoại", avatar: "🌟" },
    { id: "bot_final_2", name: "Vua Trò Chơi", avatar: "👑" },
    { id: "bot_final_3", name: "Thần Đồng", avatar: "🧠" },
    { id: "bot_final_4", name: "Độc Cô", avatar: "🗡️" },
    { id: "bot_final_5", name: "Tiên Phong", avatar: "🚀" },
    { id: "bot_final_6", name: "Kẻ Hủy Diệt", avatar: "🔥" },
    { id: "bot_final_7", name: "Bất Diệt", avatar: "🛡️" },
    { id: "bot_final_8", name: "Siêu Việt", avatar: "🌌" },
    { id: "bot_final_9", name: "Tuyệt Kỹ", avatar: "🥋" },
    { id: "bot_final_10", name: "Đỉnh Cao", avatar: "⛰️" },
  ],
};

// Giữ lại alias để tương thích ngược nếu có chỗ gọi cũ
export const FIXED_LEAGUE_BOTS = TIER_BOTS_DEFINITIONS.bronze;

/**
 * Lấy mốc 00:00:00 sáng Thứ Hai đầu tuần hiện tại
 */

export const getGlobalTournamentPhase = (dateMs) => {
  const targetDate = new Date(dateMs);
  const day = targetDate.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  const monday = new Date(targetDate);
  monday.setDate(monday.getDate() + diffToMonday);
  monday.setHours(0, 0, 0, 0);

  const epochMonday = new Date("2024-01-01T00:00:00");
  const weeksSinceEpoch = Math.floor(
    (monday.getTime() - epochMonday.getTime()) / (7 * 24 * 60 * 60 * 1000),
  );
  const cycleIndex = weeksSinceEpoch % 4;
  if (cycleIndex === 0) return "selection"; // Tuần Cao thủ chọn lọc
  if (cycleIndex === 1) return "quarter";
  if (cycleIndex === 2) return "semi";
  return "final";
};

/** Ba vòng Vô Địch (nằm ở CUỐI LEAGUE_TIERS, sau Giải Cao Thủ). */
export const TOURNAMENT_TIER_IDS = ["quarter_final", "semi_final", "final"];

/**
 * Luật thăng/rớt của một hạng đấu — DÙNG CHUNG cho mọi màn hình.
 *
 * Vì sao gom vào một chỗ: trước đây mỗi trang tự chép luật (ChallengePage 8 dòng,
 * LeaderboardPage 4 dòng), lệch nhau một chữ là chú giải nói dối bé. Mọi chỗ hiển thị
 * (chú giải, tô màu vùng thăng/rớt) phải lấy từ đây, và phải khớp `checkWeekReset()`.
 *
 * @param {string} tier  hạng đấu hiện tại (currentTier)
 * @param {number} dateMs  mốc thời gian để tra pha giải đấu (mặc định: bây giờ)
 * @returns {{
 *   isTournament: boolean,   // đang ở vòng Vô Địch
 *   isFinal: boolean,        // đang ở Chung kết: top 3 đoạt cúp, KHÔNG ai rớt
 *   isBronze: boolean,       // Giải Đồng: không bao giờ rớt
 *   isMasterSelection: boolean, // Cao Thủ đang ở TUẦN CHỌN LỌC
 *   canPromote: boolean,     // tuần này có xét thăng hạng không (Cao Thủ chỉ xét ở tuần chọn lọc)
 *   promoLimit: number,      // thăng hạng khi xếp hạng <= promoLimit
 *   relegateStart: number,   // rớt hạng khi xếp hạng >= relegateStart
 *   nextTier: object|null,   // hạng/vòng sẽ thăng tới (null = tuần này không thăng hạng)
 *   standardTiers: object[], // 5 hạng thường, theo thứ tự Đồng -> Cao Thủ
 *   tournamentTiers: object[], // 3 vòng Vô Địch, theo thứ tự Tứ kết -> Chung kết
 * }}
 */
export function getLeagueRules(tier, dateMs = Date.now()) {
  const standardTiers = LEAGUE_TIERS.filter((t) => !t.isTournament);
  const tournamentTiers = LEAGUE_TIERS.filter((t) => t.isTournament);
  const isTournament = TOURNAMENT_TIER_IDS.includes(tier);
  const isMasterSelection =
    tier === "master" && getGlobalTournamentPhase(dateMs) === "selection";

  // Hạng kế tiếp — phải khớp đúng nhánh thăng hạng trong checkWeekReset():
  // vòng Vô Địch lên vòng kế tiếp; Cao Thủ chỉ lên Tứ kết ở tuần chọn lọc;
  // hạng thường lên hạng kế tiếp.
  let nextTier = null;
  if (isTournament) {
    nextTier =
      tournamentTiers[tournamentTiers.findIndex((t) => t.id === tier) + 1] ||
      null;
  } else if (tier === "master") {
    nextTier = isMasterSelection ? tournamentTiers[0] : null;
  } else {
    nextTier =
      standardTiers[standardTiers.findIndex((t) => t.id === tier) + 1] || null;
  }

  return {
    isTournament,
    isFinal: tier === "final",
    isBronze: tier === "bronze",
    isMasterSelection,
    // Cao Thủ chỉ được thăng hạng ở tuần chọn lọc; các tuần khác đá cho vui.
    canPromote: isTournament || isMasterSelection || tier !== "master",
    promoLimit: isTournament || isMasterSelection ? 5 : 3,
    // LƯU Ý: `promoLimit` vô nghĩa khi canPromote = false (Cao Thủ ngoài tuần
    // chọn lọc) và `relegateStart` vô nghĩa ở Chung kết (isFinal — không ai rớt).
    // Màn hình phải hỏi canPromote / isFinal TRƯỚC khi dùng 2 con số này.
    relegateStart: isTournament ? 6 : 8,
    nextTier,
    standardTiers,
    tournamentTiers,
  };
}

/**
 * Lời nhắn banner kết toán tuần cho người đoạt cúp (Chung kết top 3).
 * Dùng chung cho ChallengePage + LeaderboardPage, khớp `status` mà checkWeekReset() đặt.
 */
export const LEAGUE_STATUS_MESSAGES = {
  champion_gold: "🏆 Vô địch! Bé đã giành Cúp Vàng ở Chung Kết Vô Địch!",
  champion_silver: "🥈 Tuyệt vời! Bé đã giành Cúp Bạc ở Chung Kết Vô Địch!",
  champion_bronze: "🥉 Giỏi lắm! Bé đã giành Cúp Đồng ở Chung Kết Vô Địch!",
};

export function getStartOfWeekMonday(targetDate = new Date()) {
  const d = new Date(targetDate);
  const day = d.getDay(); // 0 = Chủ Nhật, 1 = Thứ Hai...
  const diffToMonday = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diffToMonday);
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * Lấy mốc 23:59:59 Chủ Nhật cuối tuần hiện tại
 */
export function getEndOfWeekSunday(targetDate = new Date()) {
  const monday = getStartOfWeekMonday(targetDate);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);
  return sunday.toISOString();
}

/**
 * Tạo seed băm theo tuần và hạng đấu để phân loại ngẫu nhiên
 */
function getWeekTierSeed(tier = "bronze", monday = getStartOfWeekMonday()) {
  let hash =
    monday.getFullYear() * 10000 +
    (monday.getMonth() + 1) * 100 +
    monday.getDate();
  for (let i = 0; i < tier.length; i++) {
    hash = (hash * 31 + tier.charCodeAt(i)) & 0xffffff;
  }
  return hash;
}

/**
 * Phân loại ngẫu nhiên mỗi tuần cho 10 bot ở mỗi hạng đấu:
 * - 3 bot siêng năng ('hardworking')
 * - 4 bot bình thường ('normal')
 * - 3 bot làm biếng ('lazy')
 * Sử dụng Fisher-Yates shuffle với seed của tuần để kết quả đổi mới mỗi tuần nhưng đồng bộ giữa mọi máy
 */
export function getWeeklyBotRoles(
  tier = "bronze",
  monday = getStartOfWeekMonday(),
) {
  let seed = getWeekTierSeed(tier, monday);
  const random = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };

  const indices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  const rolesMap = {};
  indices.slice(0, 3).forEach((idx) => {
    rolesMap[idx] = "hardworking";
  }); // 3 bot siêng năng
  indices.slice(3, 7).forEach((idx) => {
    rolesMap[idx] = "normal";
  }); // 4 bot bình thường
  indices.slice(7, 10).forEach((idx) => {
    rolesMap[idx] = "lazy";
  }); // 3 bot làm biếng
  return rolesMap;
}

/**
 * Sinh lịch học ngẫu nhiên trong ngày của bot (từ 7:30 đến tối đa 21:00).
 *
 * Mỗi phiên = 1 bài luyện tập 9-10 câu, ăn đúng XP mỗi câu của bé
 * (practice.correct) rồi nhân thêm buff theo hạng (`getTierBuff`, +5% mỗi hạng),
 * nên bot ở hạng cao học cùng số bài vẫn nhích xa hơn:
 *   - siêng năng: 2-4 phiên/ngày
 *   - bình thường: 1-2 phiên/ngày
 *   - thong thả: ~1 phiên mỗi 2 ngày
 * Cộng lại khoảng 140-200 XP/ngày ở Giải Đồng (~1000-1350 XP/tuần) — cố ý MẠNH
 * để bé có động lực học, chứ không phải mức "1-2 bài/ngày" như bản rất cũ.
 */
function getTierBuff(tier) {
  const idx = LEAGUE_TIERS.findIndex((t) => t.id === tier);
  if (idx < 0) return 1;
  return 1 + idx * 0.05; // 5% per tier
}

function getBotDaySessions(botIndex, dayIndex, role, weekSeed, tier) {
  let daySeed = (weekSeed * 17 + botIndex * 101 + dayIndex * 1337) & 0xffffff;
  const rand = () => {
    daySeed = (daySeed * 9301 + 49297) % 233280;
    return daySeed / 233280;
  };

  const sessions = [];
  const tierBuff = getTierBuff(tier);

  const generateSessionXp = () => {
    // Lấy XP từ cùng nguồn với bé. LƯU Ý: `getReward` đã nhân hệ số nhân toàn cục
    // (sự kiện X2...), nên bật sự kiện giữa tuần là điểm MỌI bot nhảy theo. Người dùng
    // đã thống nhất KHÔNG bật sự kiện X2 vào giữa tuần, nên giữ nguyên cách này
    // (bỏ `getReward` chỉ khi muốn bot miễn nhiễm với sự kiện).
    const practiceConfig = getReward("practice.correct");
    const practiceXp = practiceConfig ? practiceConfig.xp : 5;
    const questions = rand() > 0.5 ? 10 : 9;
    return Math.floor(practiceXp * questions * tierBuff);
  };

  if (role === "hardworking") {
    const numSessions = 2 + Math.floor(rand() * 3); // 2 to 4
    for (let i = 0; i < numSessions; i++) {
      const hour = 7.5 + rand() * 13.0; // Max 20.5
      sessions.push({ hour, xp: generateSessionXp() });
    }
  } else if (role === "normal") {
    const numSessions = 1 + Math.floor(rand() * 2); // 1 or 2
    for (let i = 0; i < numSessions; i++) {
      const hour = 8.0 + rand() * 12.5; // Max 20.5
      sessions.push({ hour, xp: generateSessionXp() });
    }
  } else {
    const willStudyToday = rand() > 0.5;
    if (willStudyToday) {
      const hour = 10.0 + rand() * 8.0;
      sessions.push({ hour, xp: generateSessionXp() });
    }
  }

  sessions.sort((a, b) => a.hour - b.hour);
  return sessions;
}

/**
 * Tính điểm tích lũy tuần của 1 bot tại thời điểm hiện tại:
 */
export function calculateTierBotWeeklyXp(
  tier = "bronze",
  botIndex = 0,
  now = new Date(),
) {
  const monday = getStartOfWeekMonday(now);
  if (now.getTime() < monday.getTime()) return 0;

  const weekSeed = getWeekTierSeed(tier, monday);
  const rolesMap = getWeeklyBotRoles(tier, monday);
  const role = rolesMap[botIndex] || "normal";

  // Thứ Hai = 0, ..., Chủ Nhật = 6
  const currentDay = now.getDay() === 0 ? 6 : now.getDay() - 1;
  const currentHourDecimal = now.getHours() + now.getMinutes() / 60;

  let totalWeeklyXp = 0;

  for (let d = 0; d <= Math.min(currentDay, 6); d++) {
    const sessions = getBotDaySessions(botIndex, d, role, weekSeed, tier);
    for (const session of sessions) {
      if (session.hour > 21.0) continue; // Đảm bảo không quá 21h

      if (d < currentDay) {
        // Ngày trước đó trong tuần: đã hoàn thành
        totalWeeklyXp += session.xp;
      } else if (d === currentDay) {
        // Hôm nay: chỉ cộng nếu đã đến giờ học
        if (currentHourDecimal >= session.hour) {
          totalWeeklyXp += session.xp;
        }
      }
    }
  }

  return totalWeeklyXp;
}

/**
 * Lấy danh sách 10 bot động của hạng đấu cụ thể (Bronze, Silver, Gold, Diamond, Master)
 */
export function getTierDynamicBots(tier = "bronze", now = new Date()) {
  const definitions =
    TIER_BOTS_DEFINITIONS[tier] || TIER_BOTS_DEFINITIONS.bronze;
  const rolesMap = getWeeklyBotRoles(tier, getStartOfWeekMonday(now));

  return definitions.map((bot, index) => ({
    id: bot.id,
    name: bot.name,
    avatar: bot.avatar,
    weeklyXp: calculateTierBotWeeklyXp(tier, index, now),
    role: rolesMap[index] || "normal", // 'hardworking' | 'normal' | 'lazy'
    tier: tier,
    is_bot: true,
    isUser: false,
  }));
}

// Alias hỗ trợ
export function getDynamicLeagueBots(tier = "bronze") {
  return getTierDynamicBots(tier);
}

const useLeagueStore = create(
  persist(
    (set, get) => ({
      currentTier: "bronze",
      weekEndDate: getEndOfWeekSunday(),
      userWeeklyXp: 0,
      cloudPlayers: [], // Danh sách người thật và bot lấy từ Supabase
      isLoadingCloud: false,
      lastPromotionStatus: null,
      cups: { gold: 0, silver: 0, bronze: 0 },

      resetLeague: () =>
        set({
          currentTier: "bronze",
          weekEndDate: getEndOfWeekSunday(),
          userWeeklyXp: 0,
          cloudPlayers: [],
          lastPromotionStatus: null,
          // Đăng xuất là xoá luôn cúp: kho cúp nằm trong localStorage của máy, không
          // xoá thì tài khoản đăng nhập sau trên cùng thiết bị thấy cúp của người trước.
          cups: { gold: 0, silver: 0, bronze: 0 },
        }),

      /**
       * Tải dữ liệu Đấu trường từ Supabase theo đúng Hạng đấu (currentTier)
       * Đồng thời đồng bộ điểm của 10 bot trong giải đấu lên database
       */
      fetchCloudLeaderboard: async () => {
        const tier = get().currentTier || "bronze";
        const currentBots = getTierDynamicBots(tier);

        if (!isSupabaseConfigured() || !supabase) {
          set({ cloudPlayers: currentBots, isLoadingCloud: false });
          return;
        }

        set({ isLoadingCloud: true });

        try {
          // Tải danh sách người chơi và bot của hạng đấu này từ bảng leaderboard
          const { data, error } = await supabase
            .from("leaderboard")
            .select("*")
            .eq("tier", tier)
            .order("weekly_xp", { ascending: false })
            .limit(50);

          if (!error && Array.isArray(data)) {
            // Kiểm tra xem bot của tier này có cần cập nhật điểm số không
            const dbBotMap = new Map();
            data
              .filter((p) => p.is_bot)
              .forEach((b) => dbBotMap.set(b.id, b.weekly_xp));

            let needsBotSync = false;
            for (const bot of currentBots) {
              const currentDbXp = dbBotMap.get(bot.id);
              if (currentDbXp === undefined || currentDbXp !== bot.weeklyXp) {
                needsBotSync = true;
                break;
              }
            }

            if (needsBotSync) {
              // Cập nhật điểm 10 bot của tier này lên Supabase
              supabase
                .from("leaderboard")
                .upsert(
                  currentBots.map((b) => ({
                    id: b.id,
                    name: b.name,
                    avatar: b.avatar,
                    grade: 1,
                    weekly_xp: b.weeklyXp,
                    is_bot: true,
                    tier: tier,
                    updated_at: new Date().toISOString(),
                  })),
                )
                .then(() => {})
                .catch((e) => console.warn("Lỗi upsert bots:", e));
            }

            set({ cloudPlayers: data, isLoadingCloud: false });
          } else {
            set({ cloudPlayers: currentBots, isLoadingCloud: false });
          }
        } catch (err) {
          console.warn("Lỗi lấy bảng xếp hạng từ Supabase:", err);
          set({ cloudPlayers: currentBots, isLoadingCloud: false });
        }
      },

      /**
       * Kiểm tra kết thúc tuần để thăng hạng / rớt hạng
       * Khi sang tuần mới: reset điểm của bé và bot về 0
       */
      checkWeekReset: (customName, customAvatar) => {
        const now = new Date();
        const end = new Date(get().weekEndDate);

        if (now >= end) {
          const { currentTier, _userWeeklyXp } = get();
          const currentTierIdx = LEAGUE_TIERS.findIndex(
            (t) => t.id === currentTier,
          );

          const standings = get().getStandings(customName, customAvatar);
          const userRank = standings.findIndex((p) => p.isUser) + 1;

          let nextTier = currentTier;
          let status = "stayed";

          const endedWeekPhase = getGlobalTournamentPhase(
            new Date(end).getTime() - 1000,
          );
          const isBronze = currentTier === "bronze";

          if (currentTier === "master") {
            if (endedWeekPhase === "selection") {
              if (userRank > 0 && userRank <= 5) {
                nextTier = "quarter_final";
                status = "promoted";
              } else if (userRank >= 8) {
                nextTier = "diamond";
                status = "relegated";
              }
            } else {
              // Master during non-selection weeks: normal play
              if (userRank >= 8) {
                nextTier = "diamond";
                status = "relegated";
              }
            }
          } else if (currentTier === "quarter_final") {
            if (userRank > 0 && userRank <= 5) {
              nextTier = "semi_final";
              status = "promoted";
            } else {
              nextTier = "master";
              status = "relegated";
            }
          } else if (currentTier === "semi_final") {
            if (userRank > 0 && userRank <= 5) {
              nextTier = "final";
              status = "promoted";
            } else {
              nextTier = "master";
              status = "relegated";
            }
          } else if (currentTier === "final") {
            nextTier = "master"; // Always return to master
            status = "stayed";

            // Award cups!
            if (userRank > 0 && userRank <= 3) {
              const currentCups = get().cups || {
                gold: 0,
                silver: 0,
                bronze: 0,
              };
              const newCups = { ...currentCups };
              if (userRank === 1) newCups.gold = (newCups.gold || 0) + 1;
              if (userRank === 2) newCups.silver = (newCups.silver || 0) + 1;
              if (userRank === 3) newCups.bronze = (newCups.bronze || 0) + 1;
              set({ cups: newCups });
              // Trạng thái phải nói RÕ cúp nào, để banner mừng đúng loại cúp.
              // (Trước đây chỉ có 'champion_win' mà không màn hình nào hiểu.)
              status =
                userRank === 1
                  ? "champion_gold"
                  : userRank === 2
                    ? "champion_silver"
                    : "champion_bronze";

              // KHÔNG ghi thẳng lên Supabase ở đây: lúc trao cúp có thể `activeChild` chưa
              // sẵn sàng (đua lúc mở app) nên dễ rơi mất cúp. Việc ghi do `setupAutoSync()`
              // trong `syncService.js` lo — nó nghe `cups` đổi và hỏi lại childId lúc ghi
              // (cùng khuôn với thú cưng), xem `scheduleCupSync`.
            }
          } else {
            // Normal tiers
            if (
              userRank > 0 &&
              userRank <= 3 &&
              currentTierIdx < LEAGUE_TIERS.length - 1
            ) {
              nextTier = LEAGUE_TIERS[currentTierIdx + 1].id;
              status = "promoted";
            } else if (userRank >= 8 && !isBronze) {
              // FIX: Bronze no demotion
              nextTier = LEAGUE_TIERS[currentTierIdx - 1].id;
              status = "relegated";
            }
          }

          // Reset tuần mới: điểm về 0, tuần mới bắt đầu lại
          set({
            currentTier: nextTier,
            weekEndDate: getEndOfWeekSunday(),
            userWeeklyXp: 0,
            lastPromotionStatus: status,
          });

          // Reset điểm 10 bot của tier mới về 0 trên Supabase cho tuần mới
          if (isSupabaseConfigured() && supabase) {
            const nextTierBots =
              TIER_BOTS_DEFINITIONS[nextTier] || TIER_BOTS_DEFINITIONS.bronze;
            const freshBots = nextTierBots.map((b) => ({
              id: b.id,
              name: b.name,
              avatar: b.avatar,
              grade: 1,
              weekly_xp: 0,
              is_bot: true,
              tier: nextTier,
              updated_at: new Date().toISOString(),
            }));
            supabase
              .from("leaderboard")
              .upsert(freshBots)
              .then(() => {});
          }
        }
      },

      /**
       * Thêm điểm XP tuần này cho bé và tự động lưu vào DB kèm tier hiện tại
       */
      addLeagueXp: (amount) => {
        set((state) => {
          const newXp = state.userWeeklyXp + amount;

          try {
            useProgressStore.getState().setLeagueXp?.(newXp);
          } catch {}

          return { userWeeklyXp: newXp };
        });

        // Tự động đẩy điểm số tuần này lên bảng leaderboard của Supabase
        try {
          const { nickname, avatar, grade } = useUserStore.getState();
          const childId = useAuthStore.getState().activeChild?.id;

          if (isSupabaseConfigured() && supabase && childId) {
            supabase
              .from("leaderboard")
              .upsert({
                id: childId,
                name: nickname,
                avatar: avatar,
                grade: grade,
                weekly_xp: get().userWeeklyXp,
                is_bot: false,
                tier: get().currentTier || "bronze",
                updated_at: new Date().toISOString(),
              })
              .then(() => {
                get().fetchCloudLeaderboard();
              })
              .catch((e) => {
                console.warn("Lỗi auto sync leaderboard:", e);
              });
          }
        } catch (e) {
          console.warn("Lỗi push XP lên cloud:", e);
        }
      },

      /**
       * Tính toán bảng xếp hạng Top 10 của Giải đấu hiện tại:
       * - Lấy 10 bot của đúng giải đấu đó (Bronze / Silver / Gold / Diamond / Master)
       * - Phân loại 3 bot siêng năng, 4 bot bình thường, 3 bot làm biếng ngẫu nhiên theo tuần
       * - Học ngẫu nhiên trong ngày và dừng lại sau 21:00
       * - Người thật có điểm cao hơn bot sẽ xếp trên bot và thay thế vị trí bot
       */
      getStandings: (customName, customAvatar, currentChildId) => {
        const { userWeeklyXp, cloudPlayers, currentTier } = get();
        const tier = currentTier || "bronze";
        const dynamicBots = getTierDynamicBots(tier);

        let userName = customName;
        let userAvatar = customAvatar;
        if (!userName) {
          try {
            const userState = useUserStore.getState();
            userName = userState.nickname;
            userAvatar = userState.avatar;
          } catch {}
        }

        let effectiveUserId =
          currentChildId ||
          useAuthStore.getState().activeChild?.id ||
          "current_user";

        // 1. Tập hợp người chơi thuộc đúng Tier này:
        let pool = [];

        if (cloudPlayers && cloudPlayers.length > 0) {
          // Lọc những người chơi thuộc đúng tier này
          const tierPlayers = cloudPlayers.filter(
            (p) => !p.tier || p.tier === tier,
          );

          pool = tierPlayers.map((p) => {
            let xp = Number(p.weekly_xp ?? p.weeklyXp ?? 0);
            if (p.is_bot) {
              const matchedBot = dynamicBots.find((b) => b.id === p.id);
              if (matchedBot) {
                xp = Math.max(xp, matchedBot.weeklyXp);
              }
            }
            return {
              id: p.id,
              name: p.name,
              avatar: p.avatar,
              weeklyXp: xp,
              tier: tier,
              is_bot: !!p.is_bot,
              isUser: p.id === effectiveUserId,
            };
          });

          // Đảm bảo luôn đủ 10 bot của tier này
          for (const bot of dynamicBots) {
            if (!pool.some((p) => p.id === bot.id)) {
              pool.push({
                id: bot.id,
                name: bot.name,
                avatar: bot.avatar,
                weeklyXp: bot.weeklyXp,
                tier: tier,
                is_bot: true,
                isUser: false,
              });
            }
          }
        } else {
          // Fallback offline: Dùng 10 bot tính theo ngày giờ hiện tại của tier này
          pool = dynamicBots.map((b) => ({ ...b }));
        }

        // 2. Thêm hoặc cập nhật người dùng hiện tại
        const userIndex = pool.findIndex(
          (p) => p.isUser || p.id === effectiveUserId,
        );
        if (userIndex >= 0) {
          pool[userIndex].weeklyXp = Math.max(
            pool[userIndex].weeklyXp,
            userWeeklyXp,
          );
          pool[userIndex].name = userName || pool[userIndex].name || "Bé Yêu";
          pool[userIndex].avatar = userAvatar || pool[userIndex].avatar || "🦉";
          pool[userIndex].isUser = true;
        } else {
          pool.push({
            id: effectiveUserId,
            name: userName || "Bé Yêu",
            avatar: userAvatar || "🦉",
            weeklyXp: userWeeklyXp,
            tier: tier,
            is_bot: false,
            isUser: true,
          });
        }

        // 3. Sắp xếp toàn bộ người chơi theo điểm weeklyXp giảm dần.
        // Người thật có điểm cao hơn bot sẽ xếp trên bot và chiếm vị trí của bot!
        pool.sort((a, b) => b.weeklyXp - a.weeklyXp);

        // 4. Giới hạn Top 10 của giải đấu
        const top10 = pool.slice(0, 10);
        const myOverallRank = pool.findIndex((p) => p.isUser) + 1;

        const result = top10.map((player, index) => ({
          ...player,
          rank: index + 1,
          isUser: !!player.isUser,
        }));

        return Object.assign(result, {
          userRank: myOverallRank,
          userTotalPlayers: pool.length,
        });
      },

      dismissStatus: () => set({ lastPromotionStatus: null }),
    }),
    {
      name: "math_edu_league_storage",
      // Chế độ Khách thì không ghi gì xuống máy — xem `sessionMode.js`.
      storage: createGuestAwareStorage(),
      partialize: (state) => ({
        currentTier: state.currentTier,
        weekEndDate: state.weekEndDate,
        userWeeklyXp: state.userWeeklyXp,
        lastPromotionStatus: state.lastPromotionStatus,
        cups: state.cups,
      }),
    },
  ),
);

export default useLeagueStore;
