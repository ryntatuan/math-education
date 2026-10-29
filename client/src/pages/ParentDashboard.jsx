import { useState, useMemo, useCallback } from "react";
import {
  BarChart3,
  Clock,
  Flame,
  Award,
  BookOpen,
  Settings,
  Download,
  TrendingUp,
} from "lucide-react";
import Button from "../components/ui/Button";
import ProgressBar from "../components/ui/ProgressBar";
import MascotIcon from "../components/common/MascotIcon";
import useUserStore from "../store/useUserStore";
import useProgressStore from "../store/useProgressStore";
import useAuthStore from "../store/useAuthStore";
import GuestFeatureLock from "../components/auth/GuestFeatureLock";
import curriculum, { demBaiDaHoc } from "../data/curriculum";
// Tên chủ đề để nói cho phụ huynh biết NÊN ÔN GÌ (thẻ "tuần này").
import {
  TOPICS as PRACTICE_TOPICS,
  PRACTICE_EXTRA_TOPICS,
} from "../utils/exerciseGenerator";
import soundManager from "../utils/soundManager";
import KnowledgeRadarChart from "../components/charts/KnowledgeRadarChart";
import "./ParentDashboard.css";

// 5 Core Math Skill Domains aligned with Vietnam Primary Curriculum
const SKILL_DOMAINS = [
  {
    id: "numbers",
    title: "Số học & Nhận biết số",
    icon: "🔢",
    color: "#4facfe",
    chapters: ["g1-c1", "g1-c3", "g2-c1", "g2-c5", "g3-c3", "g3-c7"],
    description: "Đếm, đọc, viết, so sánh số và cấu tạo hệ thập phân",
  },
  {
    id: "operations",
    title: "Phép cộng & Phép trừ",
    icon: "➕",
    color: "#43e97b",
    chapters: ["g1-c2", "g1-c4", "g2-c2"],
    description: "Cộng, trừ nhẩm và đặt tính có nhớ / không nhớ",
  },
  {
    id: "multiplication",
    title: "Bảng nhân & Bảng chia",
    icon: "✖️",
    color: "#fa709a",
    chapters: ["g2-c3", "g2-c4", "g3-c1", "g3-c2"],
    description: "Bảng cửu chương 2–9, phép nhân chia số nhiều chữ số",
  },
  {
    id: "geometry",
    title: "Hình học & Không gian",
    icon: "📐",
    color: "#a18cd1",
    chapters: ["g1-c5", "g2-c7", "g3-c5"],
    description: "Nhận biết hình khối, góc, tính chu vi và diện tích",
  },
  {
    id: "measurement",
    title: "Đo lường & Giải toán có lời văn",
    icon: "📏",
    color: "#f6d365",
    chapters: ["g1-c6", "g2-c6", "g3-c4", "g3-c6", "g3-c8"],
    description:
      "Đơn vị đo (cm, kg, lít, đồng), xem đồng hồ và bài toán lời văn",
  },
];

export default function ParentDashboard() {
  const { isGuest } = useAuthStore();
  const {
    nickname,
    grade,
    _coins,
    _xp,
    _level,
    soundEnabled,
    toggleSound,
    setGrade,
  } = useUserStore();

  const { completedLessons, currentStreak, exerciseResults, mistakesQueue } =
    useProgressStore();

  // Dashboard active tab
  const [activeTab, setActiveTab] = useState("overview"); // 'overview' | 'progress' | 'skills' | 'settings'

  // Settings states
  const [backupCode, setBackupCode] = useState(null);

  const handleGenerateBackup = useCallback(() => {
    const code =
      "TV-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    setBackupCode(code);
    soundManager.playCoin();
  }, []);

  // Calculate actual stats dynamically with useMemo
  //
  // 🔴 Đếm CHÉO với cây hiện tại (`demBaiDaHoc`), không đếm thẳng số khoá trong
  // `completedLessons`: bài bị rút/xoá trong DB vẫn nằm trong sổ của bé (cố ý), nên
  // đếm thẳng sẽ ra "13 bài đã học" trong khi chương trình chỉ còn 12 bài.
  const { soBai: totalLessons, soSao: totalStars } = useMemo(
    () => demBaiDaHoc(completedLessons),
    [completedLessons],
  );
  const estimatedMinutes = useMemo(
    () => (totalLessons > 0 ? totalLessons * 12 + currentStreak * 10 : 0),
    [totalLessons, currentStreak],
  );

  // ----------------------------------------------------
  // DYNAMIC SKILL EVALUATION ALGORITHM
  // Based strictly on lessons completed and star ratings
  // ----------------------------------------------------
  const skillsEvaluation = useMemo(() => {
    return SKILL_DOMAINS.map((domain) => {
      // Find all curriculum lessons that belong to this domain's chapters
      let domainTotalLessons = 0;
      let domainCompletedLessons = [];

      curriculum.grades.forEach((gr) => {
        gr.chapters.forEach((ch) => {
          if (domain.chapters.includes(ch.id)) {
            domainTotalLessons += ch.lessons.length;
            ch.lessons.forEach((l) => {
              if (completedLessons[l.id]) {
                domainCompletedLessons.push({
                  lessonId: l.id,
                  lessonTitle: l.title,
                  stars: completedLessons[l.id].stars || 0,
                  completedAt: completedLessons[l.id].completedAt,
                });
              }
            });
          }
        });
      });

      const completedCount = domainCompletedLessons.length;

      if (completedCount === 0) {
        return {
          ...domain,
          completedCount: 0,
          totalLessons: domainTotalLessons,
          percent: 0,
          scoreLabel: "Chưa học",
          status: "not_started", // not_started | in_progress | mastered
          statusBadge: "Chưa học",
          starsEarned: 0,
          recommendation: `Bé chưa học nội dung này. Phụ huynh có thể mở các bài trong chương tương ứng để bé trải nghiệm!`,
        };
      }

      // Calculate score based on stars earned (out of 3)
      const totalStarsEarned = domainCompletedLessons.reduce(
        (sum, item) => sum + item.stars,
        0,
      );
      const maxPossibleStars = completedCount * 3;
      const accuracyScore = Math.round(
        (totalStarsEarned / maxPossibleStars) * 100,
      );

      let scoreLabel = "Tốt";
      let status = "in_progress";
      if (accuracyScore >= 90) {
        scoreLabel = "Rất Tốt";
        status = "mastered";
      } else if (accuracyScore >= 75) {
        scoreLabel = "Tốt";
        status = "in_progress";
      } else if (accuracyScore >= 60) {
        scoreLabel = "Khá";
        status = "in_progress";
      } else {
        scoreLabel = "Cần Ôn Thêm";
        status = "in_progress";
      }

      return {
        ...domain,
        completedCount,
        totalLessons: domainTotalLessons,
        percent: accuracyScore,
        scoreLabel: `${accuracyScore}% (${scoreLabel})`,
        status,
        statusBadge: scoreLabel,
        starsEarned: totalStarsEarned,
        recommendation:
          accuracyScore >= 80
            ? `Bé nắm rất vững kỹ năng này (${completedCount} bài đã hoàn thành). Hãy tiếp tục duy trì nhé!`
            : `Bé đã học ${completedCount} bài. Nên cho bé làm thêm bài tập luyện tập để củng cố kỹ năng.`,
      };
    });
  }, [completedLessons]);

  // Recent completed lessons list
  const recentActivities = useMemo(() => {
    return Object.entries(completedLessons)
      .map(([lessonId, data]) => {
        const found = curriculum.grades
          .flatMap((g) => g.chapters)
          .flatMap((c) => c.lessons)
          .find((l) => l.id === lessonId);
        return {
          id: lessonId,
          title: found?.title || lessonId,
          stars: data.stars || 0,
          date: data.completedAt
            ? new Date(data.completedAt).toLocaleDateString("vi-VN")
            : "Gần đây",
        };
      })
      .slice(-5)
      .reverse();
  }, [completedLessons]);

  // Dynamic feedback from owl mascot
  const mascotAdvice = useMemo(() => {
    if (totalLessons === 0) {
      return `Bé ${nickname} chưa hoàn thành bài học nào. Ba mẹ hãy đồng hành cùng bé chọn bài học đầu tiên trong phần "Học bài" nhé! 🚀`;
    }
    if (totalLessons < 3) {
      return `Bé ${nickname} vừa mới bắt đầu và đã hoàn thành ${totalLessons} bài học xuất sắc với ${totalStars} ⭐. Khởi đầu rất đáng khích lệ, ba mẹ hãy cùng bé duy trì 10–15 phút mỗi ngày nhé! 🌟`;
    }
    const masteredSkills = skillsEvaluation.filter(
      (s) => s.status === "mastered",
    );
    if (masteredSkills.length > 0) {
      return `Bé ${nickname} đang tiến bộ vượt bậc! Đặc biệt rất giỏi ở mảng "${masteredSkills[0].title}". Hãy tiếp tục phát huy ở các bài học tiếp theo nhé! 🦉🏆`;
    }
    return `Bé ${nickname} rất chăm chỉ học tập với chuỗi ${currentStreak} ngày liên tiếp. Hãy tiếp tục khuyến khích bé hoàn thành các bài tập để nhận thêm huy hiệu và sao thưởng nhé!`;
  }, [totalLessons, totalStars, currentStreak, nickname, skillsEvaluation]);

  // ── THẺ "TUẦN NÀY" (đợt 5.4) ────────────────────────────────────────────
  //
  // Phụ huynh cần 3 điều, và cả ba đều đã có sẵn trong máy (không gọi thêm dịch vụ nào):
  //   (1) tuần này bé học được bao nhiêu   -> `completedLessons[].completedAt`
  //   (2) bé có học đều không              -> 7 chấm theo 7 ngày gần nhất
  //   (3) NÊN ÔN GÌ                        -> `mistakesQueue` (sổ tay câu sai chưa thuộc)
  //
  // ⚠️ Bản ghi CŨ (trước khi có `completedAt`) không tính vào tuần — đúng ý: thà thiếu còn hơn
  // đếm nhầm một bài học từ tháng trước thành "tuần này".
  const tuanNay = useMemo(() => {
    const HAN_MS = 7 * 24 * 60 * 60 * 1000;
    // Thẻ này nói về "7 ngày gần nhất" nên BUỘC phải lấy mốc thời gian thật khi tính. Đây là
    // báo cáo cho phụ huynh (không phải dữ liệu để React so sánh), và memo chỉ tính lại khi
    // tiến độ đổi — đủ đúng cho mục đích này.
    // eslint-disable-next-line react/purity -- mốc "bây giờ" là thứ cần đo, không phải trạng thái
    const bayGio = Date.now();
    const tenChuDe = new Map(
      [
        ...Object.values(PRACTICE_TOPICS),
        ...Object.values(PRACTICE_EXTRA_TOPICS),
      ]
        .filter(Array.isArray)
        .flat()
        .map((t) => [t.id, t]),
    );

    const ds = Object.entries(completedLessons || {}).map(([id, v]) => ({
      id,
      stars: Number(v?.stars) || 0,
      luc: v?.completedAt ? Date.parse(v.completedAt) : NaN,
    }));
    const trongTuan = ds.filter(
      (x) => Number.isFinite(x.luc) && bayGio - x.luc <= HAN_MS,
    );
    const ngayHoc = new Set(
      trongTuan.map((x) => new Date(x.luc).toDateString()),
    ).size;

    // Kỹ năng yếu = chủ đề có nhiều câu SAI còn nằm trong sổ tay ôn bài (chưa thuộc).
    const dem = new Map();
    for (const m of mistakesQueue || []) {
      if (m?.mastered) continue;
      const ma = String(m?.ref || "").replace(/^tmpl:/, "");
      if (!ma) continue;
      dem.set(ma, (dem.get(ma) || 0) + 1);
    }
    const yeu = [...dem.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([ma, soLan]) => ({
        ma,
        soLan,
        ten: tenChuDe.get(ma)?.name || ma,
        icon: tenChuDe.get(ma)?.icon || "",
      }));

    const bieuDo = [];
    const NHAN = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
    for (let i = 6; i >= 0; i--) {
      const ngay = new Date(bayGio - i * 24 * 60 * 60 * 1000);
      bieuDo.push({
        khoa: ngay.toDateString(),
        nhan: NHAN[ngay.getDay()],
        co: trongTuan.some(
          (x) => new Date(x.luc).toDateString() === ngay.toDateString(),
        ),
      });
    }

    // TỶ LỆ LÀM BÀI ĐÚNG trong 7 ngày gần nhất.
    //
    // 🔴 VÌ SAO THAY THẺ "SAO NHẬN ĐƯỢC" (người dùng báo 2026-09-27): sao chỉ có khi bé
    // hoàn thành BÀI HỌC; bé luyện tập hoặc chơi trò chơi thì học vẫn tiến bộ mà không có
    // sao — và bài đã học rồi thì bé ít học lại. Đếm sao vì thế làm phụ huynh hiểu sai là
    // "tuần này bé không học gì". Tỷ lệ làm đúng mới nói lên mức độ nắm bài.
    //
    // Nguồn số: `exerciseResults` — mỗi lượt Luyện tập lưu `{ score, total, date }`
    // (xem `PracticePage.addExerciseResult`). Cộng dồn theo câu để đúng trọng số: lượt 10 câu
    // phải nặng hơn lượt 5 câu, không phải chia đều theo số lượt.
    let soCauDung = 0;
    let soCau = 0;
    for (const ds of Object.values(exerciseResults || {})) {
      for (const r of Array.isArray(ds) ? ds : []) {
        const luc = r?.date ? Date.parse(r.date) : NaN;
        if (!Number.isFinite(luc) || bayGio - luc > HAN_MS) continue;
        const tong = Number(r?.total) || 0;
        if (tong <= 0) continue;
        soCau += tong;
        // `score` không bao giờ lớn hơn `total`; `min` chỉ để dữ liệu hỏng không cho >100%.
        soCauDung += Math.min(Number(r?.score) || 0, tong);
      }
    }
    const tyLeDung = soCau > 0 ? Math.round((soCauDung / soCau) * 100) : null;

    return {
      soBai: trongTuan.length,
      ngayHoc,
      tyLeDung,
      soCauDung,
      soCau,
      yeu,
      bieuDo,
    };
  }, [completedLessons, mistakesQueue, exerciseResults]);

  if (isGuest) {
    return (
      <GuestFeatureLock
        icon="🛡️"
        badgeText="BẢO MẬT PHỤ HUYNH"
        title="Khu Vực Dành Riêng Cho Phụ Huynh Đăng Ký"
        subtitle="Đăng nhập tài khoản để xem báo cáo học tập chi tiết và theo dõi biểu đồ kỹ năng của bé."
        benefits={[
          {
            icon: "📊",
            title: "Báo Cáo Năng Lực Chuẩn Bộ GD&ĐT",
            desc: "Biểu đồ radar phân tích chi tiết 5 nhóm kỹ năng tư duy và tính toán của con.",
          },
          {
            icon: "⏱️",
            title: "Theo Dõi Chuyên Cần & Chuỗi Học",
            desc: "Nắm bắt thời gian học, chuỗi ngày streak và tỷ lệ làm bài chính xác của bé.",
          },
          {
            icon: "📝",
            title: "Sổ Tay Lỗi Sai & Gợi Ý Ôn Tập",
            desc: "Tổng hợp những câu bé làm sai và chủ đề cần ôn thêm trong tuần.",
          },
          {
            icon: "📱",
            title: "Đồng Bộ Tiến Độ Đa Thiết Bị",
            desc: "Theo dõi con học tập mọi lúc, mọi nơi trên máy tính bảng hoặc điện thoại.",
          },
        ]}
      />
    );
  }

  return (
    <div className="parent-dashboard-page">
      {/* Top Header */}
      <div className="parent-header">
        <div className="parent-title-group">
          <h1>👨‍👩‍👧 Bảng Điều Khiển Phụ Huynh</h1>
          <p>
            Theo dõi tiến trình học tập, sự tiến bộ và kỹ năng toán học thực tế
            của bé <strong>{nickname}</strong>.
          </p>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="parent-tabs-bar">
        <button
          className={`p-tab ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          <BarChart3 size={18} /> Tổng Quan
        </button>
        <button
          className={`p-tab ${activeTab === "progress" ? "active" : ""}`}
          onClick={() => setActiveTab("progress")}
        >
          <BookOpen size={18} /> Tiến Độ Học
        </button>
        <button
          className={`p-tab ${activeTab === "skills" ? "active" : ""}`}
          onClick={() => setActiveTab("skills")}
        >
          <Award size={18} /> Đánh Giá Kỹ Năng
        </button>
        <button
          className={`p-tab ${activeTab === "settings" ? "active" : ""}`}
          onClick={() => setActiveTab("settings")}
        >
          <Settings size={18} /> Cài Đặt
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === "overview" && (
        <div className="tab-content-section">
          {/* Thẻ "tuần này" — phụ huynh nhìn một lần là biết tuần qua thế nào. */}
          <div className="parent-week-card">
            <h3>
              <TrendingUp size={18} />
              <span>Tuần này của bé {nickname}</span>
            </h3>
            <div className="week-numbers">
              <div className="week-num">
                <span className="week-val number">{tuanNay.soBai}</span>
                <span className="week-lbl">bài hoàn thành</span>
              </div>
              <div className="week-num">
                <span className="week-val number">
                  {tuanNay.tyLeDung === null ? "—" : `${tuanNay.tyLeDung}%`}
                </span>
                <span className="week-lbl">
                  {tuanNay.tyLeDung === null
                    ? "chưa luyện tuần này"
                    : `làm đúng ${tuanNay.soCauDung}/${tuanNay.soCau} câu`}
                </span>
              </div>
              <div className="week-num">
                <span className="week-val number">{tuanNay.ngayHoc}/7</span>
                <span className="week-lbl">ngày có học</span>
              </div>
              <div className="week-num">
                <span className="week-val number">{currentStreak}</span>
                <span className="week-lbl">ngày liên tiếp</span>
              </div>
            </div>
            <div className="week-days">
              {tuanNay.bieuDo.map((d) => (
                <div
                  key={d.khoa}
                  className={`week-day ${d.co ? "co" : ""}`}
                  title={d.co ? "Có học" : "Không học"}
                >
                  {d.nhan}
                </div>
              ))}
            </div>
            <div className="week-weak">
              <span className="week-weak-title">Nên ôn thêm:</span>
              {tuanNay.yeu.length === 0 ? (
                <span className="week-weak-none">
                  Chưa có câu sai nào cần ôn — bé đang làm rất tốt!
                </span>
              ) : (
                <ul>
                  {tuanNay.yeu.map((y) => (
                    <li key={y.ma}>
                      {y.icon ? y.icon + " " : ""}
                      <b>{y.ten}</b>{" "}
                      <span className="week-weak-count">
                        ({y.soLan} câu sai còn trong sổ tay ôn bài)
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {tuanNay.soBai === 0 && (
              <p className="week-note">
                Tuần này bé chưa hoàn thành bài nào. Ba mẹ thử nhắc bé 10–15
                phút mỗi ngày nhé!
              </p>
            )}
          </div>

          <div className="parent-stats-grid">
            <div className="p-card stat-big">
              <div className="stat-icon-circle blue">
                <Clock size={28} />
              </div>
              <div className="stat-data-box">
                <span className="stat-val number">{estimatedMinutes} phút</span>
                <span className="stat-lbl">Tổng thời gian học</span>
              </div>
            </div>

            <div className="p-card stat-big">
              <div className="stat-icon-circle orange">
                <Flame size={28} />
              </div>
              <div className="stat-data-box">
                <span className="stat-val">
                  <span className="number">{currentStreak}</span> ngày
                </span>
                <span className="stat-lbl">Chuỗi ngày chăm chỉ</span>
              </div>
            </div>

            <div className="p-card stat-big">
              <div className="stat-icon-circle green">
                <BookOpen size={28} />
              </div>
              <div className="stat-data-box">
                <span className="stat-val">
                  <span className="number">{totalLessons}</span> bài
                </span>
                <span className="stat-lbl">Bài học hoàn thành</span>
              </div>
            </div>

            <div className="p-card stat-big">
              <div className="stat-icon-circle yellow">
                <Award size={28} />
              </div>
              <div className="stat-data-box">
                <span className="stat-val number">{totalStars} ⭐</span>
                <span className="stat-lbl">Ngôi sao tích lũy</span>
              </div>
            </div>
          </div>

          <div className="parent-feedback-card">
            <h3 style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <MascotIcon size={24} />
              <span>Nhận xét của Cú Mèo Thông Thái:</span>
            </h3>
            <p>{mascotAdvice}</p>
          </div>

          {/* Recent Activity */}
          <div className="recent-activity-card">
            <h3>🕒 Nhật Ký Học Tập Gần Đây</h3>
            {recentActivities.length === 0 ? (
              <div className="no-activity-state">
                <p>
                  Bé chưa có lịch sử học tập. Hãy cho bé bắt đầu bài học đầu
                  tiên nhé!
                </p>
              </div>
            ) : (
              <div className="activity-list">
                {recentActivities.map((act) => (
                  <div key={act.id} className="activity-row">
                    <div className="activity-title">
                      <span className="activity-icon">📖</span>
                      <span>{act.title}</span>
                    </div>
                    <div className="activity-meta">
                      <span className="activity-stars">
                        {"⭐".repeat(act.stars)}
                      </span>
                      <span className="activity-date">{act.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: PROGRESS BY GRADE */}
      {activeTab === "progress" && (
        <div className="tab-content-section">
          {curriculum.grades.map((gr) => {
            const allLessons = gr.chapters.flatMap((c) => c.lessons);
            const completedCount = allLessons.filter(
              (l) => completedLessons[l.id],
            ).length;
            const percent =
              allLessons.length > 0
                ? Math.round((completedCount / allLessons.length) * 100)
                : 0;

            return (
              <div key={gr.id} className="p-grade-progress-card">
                <div className="p-grade-header">
                  <div className="p-grade-title">
                    <span className="p-grade-icon">{gr.icon}</span>
                    <div>
                      <h3>
                        {gr.name} ({gr.ageRange})
                      </h3>
                      <p>{gr.description}</p>
                    </div>
                  </div>
                  <div className="p-grade-stats">
                    <span className="p-count-tag">
                      {completedCount} / {allLessons.length} bài
                    </span>
                    <span className="p-percent-tag number">{percent}%</span>
                  </div>
                </div>

                <ProgressBar
                  value={percent}
                  max={100}
                  variant="primary"
                  size="md"
                />

                <div className="chapters-mini-list">
                  {gr.chapters.map((ch) => {
                    const chLessons = ch.lessons;
                    const chCompleted = chLessons.filter(
                      (l) => completedLessons[l.id],
                    ).length;
                    const chPercent = Math.round(
                      (chCompleted / chLessons.length) * 100,
                    );
                    return (
                      <div key={ch.id} className="chapter-mini-row">
                        <span className="ch-name">{ch.name}</span>
                        <span
                          className={`ch-status number ${
                            chCompleted === chLessons.length
                              ? "done"
                              : chCompleted > 0
                                ? "doing"
                                : ""
                          }`}
                        >
                          {chCompleted === 0
                            ? "Chưa học"
                            : `${chCompleted}/${chLessons.length} bài (${chPercent}%)`}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 3: DYNAMIC SKILLS EVALUATION */}
      {activeTab === "skills" && (
        <div className="tab-content-section">
          {/* Radar Spider Chart Visualization */}
          <KnowledgeRadarChart skills={skillsEvaluation} />

          <div className="skills-overview-card">
            <div className="skills-header-row">
              <div>
                <h3>🎯 Đánh Giá Năng Lực Toán Học Theo Chuẩn Bộ GD&ĐT</h3>
                <p>
                  Hệ thống tự động phân tích theo 5 mạch kiến thức cốt lõi dựa
                  trên kết quả bài học thực tế của bé:
                </p>
              </div>
              <div className="skills-summary-pill">
                <span>
                  Đã học:{" "}
                  <strong>
                    {
                      skillsEvaluation.filter((s) => s.completedCount > 0)
                        .length
                    }{" "}
                    / 5 kỹ năng
                  </strong>
                </span>
              </div>
            </div>

            <div className="skills-bars-list">
              {skillsEvaluation.map((skill) => {
                const isLearned = skill.completedCount > 0;

                return (
                  <div
                    key={skill.id}
                    className={`skill-item-card ${isLearned ? "is-learned" : "is-unlearned"}`}
                  >
                    <div className="skill-item-header">
                      <div className="skill-title-block">
                        <span className="skill-icon">{skill.icon}</span>
                        <div>
                          <h4>{skill.title}</h4>
                          <p className="skill-desc">{skill.description}</p>
                        </div>
                      </div>

                      <div className="skill-score-block">
                        {isLearned ? (
                          <>
                            <span className="skill-score-val number">
                              {skill.scoreLabel}
                            </span>
                            <span className="skill-count-badge">
                              {skill.completedCount} bài đã hoàn thành
                            </span>
                          </>
                        ) : (
                          <span className="skill-unlearned-badge">
                            Chưa học bài nào
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="skill-progress-wrap">
                      <ProgressBar
                        value={skill.percent}
                        max={100}
                        variant={
                          skill.percent >= 80
                            ? "success"
                            : skill.percent >= 60
                              ? "primary"
                              : "warning"
                        }
                        size="sm"
                      />
                    </div>

                    <div className="skill-recommendation">
                      <span className="rec-icon">💡</span>
                      <span className="rec-text">{skill.recommendation}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SETTINGS & BACKUP */}
      {activeTab === "settings" && (
        <div className="tab-content-section">
          {/* Preferences */}
          <div className="settings-block-card">
            <h3>⚙️ Tùy Chỉnh Học Tập</h3>

            <div className="setting-item-row">
              <div>
                <h4>Khối lớp của bé</h4>
                <p>Chọn chương trình học chính hiện tại cho bé</p>
              </div>
              <select
                value={grade}
                onChange={(e) => {
                  setGrade(Number(e.target.value));
                  soundManager.playClick();
                }}
                className="grade-select"
              >
                <option value={1}>Lớp 1 (6-7 tuổi)</option>
                <option value={2}>Lớp 2 (7-8 tuổi)</option>
                <option value={3}>Lớp 3 (8-9 tuổi)</option>
              </select>
            </div>

            <div className="setting-item-row">
              <div>
                <h4>Âm thanh & Hiệu ứng</h4>
                <p>Bật hoặc tắt âm thanh vui nhộn khi bé làm bài</p>
              </div>
              <Button
                variant={soundEnabled ? "primary" : "ghost"}
                size="sm"
                onClick={toggleSound}
              >
                {soundEnabled ? "🔊 Đang bật" : "🔇 Đang tắt"}
              </Button>
            </div>
          </div>

          {/* Backup */}
          <div className="settings-block-card">
            <h3>💾 Sao Lưu & Khôi Phục</h3>
            <p>
              Tạo mã khôi phục để dễ dàng đồng bộ tiến trình học sang thiết bị
              hoặc trình duyệt khác mà không sợ bị mất dữ liệu.
            </p>
            <div className="backup-action-row">
              <Button
                variant="outline"
                size="md"
                onClick={handleGenerateBackup}
              >
                <Download size={18} /> Tạo Mã Sao Lưu
              </Button>
              {backupCode && (
                <div className="backup-code-pill">
                  <span>
                    Mã sao lưu của bạn: <strong>{backupCode}</strong>
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
