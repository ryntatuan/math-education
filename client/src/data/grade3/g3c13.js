export const g3c13 = {
  id: "g3-c13",
  name: "Chủ đề 13: Xem đồng hồ. Tháng - năm. Tiền Việt Nam",
  description:
    "Xem đồng hồ, tháng và năm, thực hành xem lịch, giới thiệu tiền Việt Nam",
  icon: "💵",
  color: "#8338ec",
  totalLessons: 7,
  lessons: [
    {
      id: "g3-c13-l1",
      title: "Bài 1: Xem đồng hồ — giờ và phút",
      type: "learn",
      description: "Đọc giờ đúng và giờ lẻ trên đồng hồ kim",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "7 giờ 15 phút — mẹ nhắc bé đi học đấy! Bé đọc được đồng hồ chưa? ⏰",
            clock: {
              hour: 8,
              minute: 0,
            },
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Kim giờ và kim phút",
            explanation:
              "Kim NGẮN chỉ GIỜ, kim DÀI chỉ PHÚT. Một giờ có 60 phút.",
            rule: "Kim ngắn qua số 7, kim dài chỉ số 3 → 7 giờ 15 phút (vì 3 × 5 = 15 phút).",
            points: [
              "1 giờ = 60 phút.",
              "Mỗi số trên đồng hồ là 5 phút của kim dài.",
              "Kim dài chỉ số 12 là đúng giờ.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Kim ngắn → giờ\nKim dài → phút\n1 giờ = 60 phút",
            clock: {
              hour: 7,
              minute: 15,
              timeText: "7 giờ 15 phút",
            },
            table: {
              headers: ["Kim dài chỉ số", "Phút"],
              rows: [
                ["3", "3 × 5 = 15 phút"],
                ["6", "6 × 5 = 30 phút"],
                ["12", "0 phút (đúng giờ)"],
              ],
              label: "Xem đồng hồ — 1 giờ = 60 phút",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Kim ngắn chỉ số 7, kim dài chỉ số 12. Đồng hồ chỉ mấy giờ?",
            options: ["7 giờ", "12 giờ", "7 giờ 12 phút", "12 giờ 7 phút"],
            answer: "7 giờ",
            mascotHint: "Kim dài chỉ số 12 nghĩa là đúng giờ: 7 giờ.",
            clock: {
              hour: 8,
              minute: 0,
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Kim ngắn qua số 7, kim dài chỉ số 3. Đồng hồ chỉ mấy giờ?",
            options: [
              "7 giờ 3 phút",
              "7 giờ 15 phút",
              "3 giờ 35 phút",
              "7 giờ 30 phút",
            ],
            answer: "7 giờ 15 phút",
            mascotHint: "3 × 5 = 15 phút. Vậy là 7 giờ 15 phút.",
            clock: {
              hour: 8,
              minute: 0,
            },
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Kim ngắn chỉ giờ, kim dài chỉ phút.",
              "1 giờ = 60 phút; mỗi số là 5 phút.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g3-c13-l2",
      title: "Bài 2: Xem đồng hồ — giờ kém",
      type: "learn",
      description: "Đọc giờ kém theo cách nói thông thường",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Kim dài chỉ số 8, kim ngắn gần tới số 3. Người ta nói '3 giờ kém 20 phút' đấy! 🕒",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Mẹo Nhớ",
            title: "Giờ kém",
            explanation:
              "Khi kim dài chưa tới số 12 mà gần tới, bé nói theo giờ SẮP TỚI rồi trừ đi số phút còn thiếu.",
            rule: "Kim dài chỉ số 8 → còn 20 phút nữa là tới giờ. Kim ngắn gần số 3 → 2 giờ 40 phút = 3 giờ kém 20 phút.",
            points: [
              "Kim dài chỉ số 8 là 40 phút.",
              "2 giờ 40 phút cũng đọc là 3 giờ kém 20 phút.",
              "Kim dài chỉ số 11 → kém 5 phút.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Kim dài số 8 = 40 phút\n2 giờ 40 phút = 3 giờ kém 20 phút",
            clock: {
              hour: 2,
              minute: 40,
              timeText: "2 giờ 40 phút = 3 giờ kém 20 phút",
            },
            table: {
              headers: ["Kim dài chỉ số", "Nghĩa là"],
              rows: [
                ["8", "40 phút — còn 20 phút nữa là tới giờ"],
                ["9", "45 phút — kém 15 phút"],
              ],
              label: "Xem đồng hồ — giờ kém",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "2 giờ 40 phút còn đọc là gì?",
            options: [
              "2 giờ kém 40 phút",
              "3 giờ kém 40 phút",
              "3 giờ kém 20 phút",
              "2 giờ kém 20 phút",
            ],
            answer: "3 giờ kém 20 phút",
            mascotHint:
              "Còn 20 phút nữa là 3 giờ nên đọc là 3 giờ kém 20 phút.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "2 giờ 40 phút = 3 giờ kém 20 phút.",
              "Kém bao nhiêu = 60 trừ số phút.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g3-c13-l3",
      title: "Bài 3: Tháng — năm",
      type: "learn",
      description: "Biết một năm có 12 tháng và số ngày mỗi tháng",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Một năm có mấy tháng nhỉ? Bé đếm trên tờ lịch treo tường xem! 📅",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Một năm — mười hai tháng",
            explanation:
              "Một năm có 12 tháng. Các tháng có 31 ngày: 1, 3, 5, 7, 8, 10, 12. Các tháng có 30 ngày: 4, 6, 9, 11. Tháng 2 có 28 hoặc 29 ngày.",
            rule: "1 năm = 12 tháng = 365 ngày (năm nhuận 366 ngày).",
            points: [
              "31 ngày: tháng 1, 3, 5, 7, 8, 10, 12.",
              "30 ngày: tháng 4, 6, 9, 11.",
              "Tháng 2 có 28 ngày, năm nhuận có 29 ngày.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "31 ngày: 1 · 3 · 5 · 7 · 8 · 10 · 12\n30 ngày: 4 · 6 · 9 · 11\n28 hoặc 29 ngày: 2",
            table: {
              headers: ["Số ngày", "Các tháng"],
              rows: [
                ["31 ngày", "1 · 3 · 5 · 7 · 8 · 10 · 12"],
                ["30 ngày", "4 · 6 · 9 · 11"],
                ["28 hoặc 29 ngày", "Tháng 2"],
              ],
              label: "1 năm = 12 tháng = 365 ngày (năm nhuận 366 ngày)",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Một năm có bao nhiêu tháng?",
            options: [10, 11, 12, 13],
            answer: 12,
            mascotHint: "Một năm có 12 tháng.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Tháng 4 có bao nhiêu ngày?",
            options: [28, 29, 30, 31],
            answer: 30,
            mascotHint: "Tháng 4, 6, 9, 11 có 30 ngày.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "1 năm = 12 tháng.",
              "Tháng 31 ngày: 1, 3, 5, 7, 8, 10, 12.",
            ],
            mascotMood: "celebrate",
          },
        },
      ],
    },
    {
      id: "g3-c13-l4",
      title: "Bài 4: Ngày trong tháng",
      type: "learn",
      description: "Đọc ngày tháng và tính số ngày trong tháng",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Sinh nhật bé ngày 15 tháng 8. Bé viết thế nào nhỉ? ✏️",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Mẹo Nhớ",
            title: "Viết ngày, tháng, năm",
            explanation:
              "Sinh nhật bé ngày 15 tháng 8 viết gọn là 15/8. Đọc là 'ngày mười lăm tháng tám'.",
            rule: "Cách viết: ngày trước, tháng sau, năm cuối cùng. Ví dụ 15/8/2025.",
            points: [
              "Tháng 1, 3, 5, 7, 8, 10, 12 có 31 ngày.",
              "Bé có thể dùng nắm tay để nhớ: khớp nổi là 31 ngày.",
              "Ngày 31 chỉ có ở các tháng 31 ngày.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "ngày 15 tháng 8  →  15/8\nngày 1 tháng 1  →  1/1",
            table: {
              headers: ["Cách đọc", "Cách viết"],
              rows: [
                ["ngày 15 tháng 8", "15/8"],
                ["ngày 1 tháng 1", "1/1"],
              ],
              label: "Ngày trước, tháng sau, năm cuối cùng — ví dụ 15/8/2025",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Ngày 1 tháng 1 viết gọn là gì?",
            options: ["1/1", "11/1", "1/11", "11/11"],
            answer: "1/1",
            mascotHint: "Ngày trước, tháng sau: 1/1.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Viết ngày tháng: ngày trước, tháng sau.",
              "Ngày 15 tháng 8 viết là 15/8.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g3-c13-l5",
      title: "Bài 5: Tiền Việt Nam — nhận biết các tờ tiền",
      type: "learn",
      description: "Nhận biết và gọi tên các tờ tiền Việt Nam",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Bé được mừng tuổi một tờ tiền có ghi 50 000 đồng. Đó là tiền Việt Nam đấy! 💵",
            money: {
              notes: [50000],
            },
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Các tờ tiền Việt Nam",
            explanation:
              "Đơn vị tiền của Việt Nam là ĐỒNG. Trên mỗi tờ tiền đều ghi số tiền bằng chữ và bằng số.",
            rule: "Các tờ tiền thường dùng: 1 000 đồng, 2 000 đồng, 5 000 đồng, 10 000 đồng, 20 000 đồng, 50 000 đồng, 100 000 đồng, 200 000 đồng, 500 000 đồng.",
            points: [
              "Tờ 50 000 đồng lớn hơn tờ 20 000 đồng.",
              "Hai tờ 10 000 đồng bằng một tờ 20 000 đồng.",
              "Mười tờ 10 000 đồng bằng một tờ 100 000 đồng.",
            ],
            money: {
              notes: [1000, 2000, 5000, 10000, 20000, 50000],
              label: "Các tờ tiền thường dùng",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "1 000 đ · 2 000 đ · 5 000 đ · 10 000 đ",
            money: {
              notes: [1000, 5000, 10000, 50000, 100000],
              label: "Các tờ tiền thường dùng",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "20 000 đ · 50 000 đ · 100 000 đ · 200 000 đ",
            table: {
              headers: ["Tờ tiền", "Mệnh giá"],
              rows: [
                ["100 000 đồng", "100 000"],
                ["200 000 đồng", "200 000"],
                ["500 000 đồng", "500 000"],
              ],
              label: "Tiền Việt Nam — nhận biết các tờ tiền",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Hai tờ 10 000 đồng đổi được một tờ tiền nào?",
            options: [
              "5 000 đồng",
              "10 000 đồng",
              "20 000 đồng",
              "50 000 đồng",
            ],
            answer: "20 000 đồng",
            mascotHint: "10 000 + 10 000 = 20 000 đồng.",
            money: {
              notes: [10000],
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Mười tờ 10 000 đồng đổi được một tờ tiền nào?",
            options: [
              "20 000 đồng",
              "50 000 đồng",
              "100 000 đồng",
              "200 000 đồng",
            ],
            answer: "100 000 đồng",
            mascotHint: "10 × 10 000 = 100 000 đồng.",
            money: {
              notes: [10000],
            },
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Đơn vị tiền Việt Nam là đồng.",
              "10 000 + 10 000 = 20 000 đồng.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g3-c13-l6",
      title: "Bài 6: Tiền Việt Nam — tính tiền mua hàng",
      type: "learn",
      description: "Tính tổng tiền và tiền thừa khi mua hàng",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Bé mua một quyển vở 15 000 đồng và một cái bút 9 000 đồng. Bé đưa 50 000 đồng, được trả lại bao nhiêu? 🛒",
            items: [
              {
                emoji: "📔",
                label: "Quyển vở",
                count: 1,
              },
            ],
          },
        },
        {
          type: "concept",
          content: {
            badge: "Giải Toán",
            title: "Tính tiền thừa",
            explanation:
              "Trước tiên bé tính TỔNG số tiền phải trả. Sau đó lấy số tiền đưa trừ đi tổng để tìm TIỀN THỪA.",
            rule: "15 000 + 9 000 = 24 000 đồng. 50 000 − 24 000 = 26 000 đồng tiền thừa.",
            points: [
              "Tổng tiền: 15 000 + 9 000 = 24 000 đồng.",
              "Tiền thừa: 50 000 − 24 000 = 26 000 đồng.",
              "Đáp số ghi kèm chữ 'đồng'.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "15 000 + 9 000 = 24 000 (đồng)\n50 000 − 24 000 = 26 000 (đồng)",
            operation: {
              left: 50000,
              sign: "−",
              right: 24000,
              result: 26000,
            },
            money: {
              notes: [50000, 15000, 9000],
              label:
                "Mua hết 24 000 đồng, trả 50 000 đồng, tiền thừa 26 000 đồng",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Bé mua vở 15 000 đồng và bút 9 000 đồng. Bé phải trả tất cả bao nhiêu tiền?",
            options: [
              "6 000 đồng",
              "24 000 đồng",
              "25 000 đồng",
              "34 000 đồng",
            ],
            answer: "24 000 đồng",
            mascotHint: "15 000 + 9 000 = 24 000 đồng.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Bé đưa 50 000 đồng để trả 24 000 đồng. Bé được trả lại bao nhiêu?",
            options: [
              "16 000 đồng",
              "24 000 đồng",
              "26 000 đồng",
              "34 000 đồng",
            ],
            answer: "26 000 đồng",
            mascotHint: "50 000 − 24 000 = 26 000 đồng.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Tính tổng tiền rồi mới tính tiền thừa.",
              "24 000 đồng; tiền thừa 26 000 đồng.",
            ],
            mascotMood: "celebrate",
          },
        },
      ],
    },
    {
      id: "g3-c13-l7",
      title: "Bài 7: Luyện tập chung chủ đề 13",
      type: "learn",
      description: "Ôn tập thời gian, tháng năm và tiền Việt Nam",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Bé đã biết xem đồng hồ, xem lịch và đếm tiền rồi! Tổng kết nhé 🎉",
            clock: {
              hour: 8,
              minute: 0,
            },
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Tổng kết chủ đề 13",
            explanation:
              "Bé đã học thời gian (giờ, phút, tháng, năm) và tiền Việt Nam.",
            points: [
              "1 giờ = 60 phút; kim ngắn chỉ giờ, kim dài chỉ phút.",
              "1 năm = 12 tháng.",
              "Tháng 31 ngày: 1, 3, 5, 7, 8, 10, 12.",
              "Đơn vị tiền Việt Nam là đồng.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "1 giờ = 60 phút · 1 năm = 12 tháng\n2 giờ 40 phút = 3 giờ kém 20 phút",
            clock: {
              hour: 2,
              minute: 40,
              timeText: "2 giờ 40 phút = 3 giờ kém 20 phút",
            },
            table: {
              headers: ["Đại lượng", "Bằng"],
              rows: [
                ["1 giờ", "60 phút"],
                ["1 năm", "12 tháng"],
                ["1 tuần", "7 ngày"],
              ],
              label: "Luyện tập chung chủ đề 13",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Kim ngắn qua số 9, kim dài chỉ số 6. Đồng hồ chỉ mấy giờ?",
            options: [
              "9 giờ 6 phút",
              "9 giờ 30 phút",
              "6 giờ 45 phút",
              "9 giờ 15 phút",
            ],
            answer: "9 giờ 30 phút",
            mascotHint: "6 × 5 = 30 phút. Vậy là 9 giờ 30 phút.",
            clock: {
              hour: 8,
              minute: 0,
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Tháng nào dưới đây có 31 ngày?",
            options: ["Tháng 4", "Tháng 6", "Tháng 9", "Tháng 10"],
            answer: "Tháng 10",
            mascotHint: "Tháng 1, 3, 5, 7, 8, 10, 12 có 31 ngày.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Bé mua hai quyển vở, mỗi quyển 8 000 đồng. Bé phải trả bao nhiêu tiền?",
            options: [
              "8 000 đồng",
              "10 000 đồng",
              "16 000 đồng",
              "18 000 đồng",
            ],
            answer: "16 000 đồng",
            mascotHint: "8 000 × 2 = 16 000 đồng.",
            items: [
              {
                emoji: "📔",
                label: "Quyển vở",
                count: 1,
              },
            ],
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Bé đã hoàn thành chủ đề 13.",
              "9 giờ 30 phút; 16 000 đồng.",
            ],
            mascotMood: "celebrate",
          },
        },
      ],
    },
  ],
};
