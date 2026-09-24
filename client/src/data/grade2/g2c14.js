export const g2c14 = {
  id: "g2-c14",
  name: "Chủ đề 14: Ôn tập cuối năm",
  description:
    "Ôn tập số trong phạm vi 1 000, bốn phép tính, hình học, đo lường, thống kê",
  icon: "🎓",
  color: "#06d6a0",
  totalLessons: 9,
  lessons: [
    {
      id: "g2-c14-l1",
      title: "Bài 1: Ôn tập các số trong phạm vi 1 000",
      type: "learn",
      description: "Ôn tập đọc, viết, so sánh số trong phạm vi 1 000",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Sắp hết năm học rồi! Mình cùng ôn lại các số thật chắc nhé 📚",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Số trong phạm vi 1 000",
            explanation: "Bé nhớ lại cấu tạo số có ba chữ số và cách so sánh.",
            rule: "386 gồm 3 trăm, 8 chục, 6 đơn vị. 386 = 300 + 80 + 6. So sánh: 386 < 396 vì 8 chục < 9 chục.",
            points: [
              "10 đơn vị = 1 chục; 10 chục = 1 trăm; 10 trăm = 1 nghìn.",
              "Số tròn chục tận cùng là 0; số tròn trăm tận cùng là 00.",
              "So hàng trăm → hàng chục → hàng đơn vị.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "386 = 300 + 80 + 6\n386  <  396",
            placeValue: {
              headers: ["Trăm", "Chục", "Đơn vị"],
              digits: [3, 8, 6],
              label: "386 = 300 + 80 + 6",
            },
            comparison: {
              left: 386,
              sign: "<",
              right: 396,
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Số 386 gồm mấy trăm, mấy chục, mấy đơn vị?",
            options: [
              "3 trăm, 8 chục, 6 đơn vị",
              "6 trăm, 8 chục, 3 đơn vị",
              "38 chục, 6 đơn vị",
              "3 trăm, 6 chục, 8 đơn vị",
            ],
            answer: "3 trăm, 8 chục, 6 đơn vị",
            mascotHint: "Đọc từ trái sang: 3 là trăm, 8 là chục, 6 là đơn vị.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "386 = 300 + 80 + 6.",
              "So sánh số: hàng trăm → hàng chục → hàng đơn vị.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g2-c14-l2",
      title: "Bài 2: Ôn tập phép cộng, phép trừ trong phạm vi 100",
      type: "learn",
      description:
        "Ôn tập phép cộng, phép trừ trong phạm vi 100 trước khi lên lớp 3",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Nhớ 1, mượn 1 — hai việc quan trọng nhất khi tính. Bé làm vài câu nhé! ✏️",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Cộng trừ trong phạm vi 100",
            explanation:
              "Cộng: nhớ 1 khi hàng đơn vị vượt 10. Trừ: mượn 1 chục khi không đủ để trừ.",
            rule: "46 + 38 = 84 (6+8=14 viết 4 nhớ 1; 4+3+1=8). 83 − 47 = 36 (13−7=6; 7−4=3).",
            points: [
              "Luôn đặt tính thẳng cột.",
              "Thử lại bằng phép tính ngược.",
              "Bài toán 'thêm' cộng, 'bớt' trừ, 'hơn kém' trừ.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "  46          83\n+ 38        − 47\n  84          36",
            operation: {
              left: 46,
              sign: "+",
              right: 38,
              result: 84,
            },
            table: {
              headers: ["Phép tính", "Kết quả"],
              rows: [
                ["46 + 38", "84"],
                ["83 − 47", "36"],
              ],
              label: "Ôn tập cộng trừ trong phạm vi 100",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "57 + 26 bằng bao nhiêu?",
            options: [73, 83, 82, 831],
            answer: 83,
            mascotHint: "7+6=13 viết 3 nhớ 1; 5+2+1=8. Kết quả 83.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Cộng có nhớ: nhớ 1. Trừ có mượn: mượn 1 chục.",
              "57 + 26 = 83.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g2-c14-l3",
      title: "Bài 3: Ôn tập phép cộng, phép trừ trong phạm vi 1 000",
      type: "learn",
      description: "Ôn tập cộng trừ với số có ba chữ số",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Ba chữ số cũng làm y như hai chữ số thôi. Bé thử nhé! 🔢",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Cộng trừ trong phạm vi 1 000",
            explanation:
              "Vẫn tính từ phải sang trái, vẫn nhớ và mượn như đã học.",
            rule: "235 + 412 = 647 (không nhớ). 256 + 173 = 429 (có nhớ). 534 − 268 = 266 (có mượn).",
            points: [
              "Cộng không nhớ: từng hàng đều bé hơn 10.",
              "Trừ không mượn: từng hàng đều trừ được.",
              "Thử lại để chắc chắn.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "  256          534\n+ 173        − 268\n  429          266",
            operation: {
              left: 256,
              sign: "+",
              right: 173,
              result: 429,
            },
            table: {
              headers: ["Phép tính", "Kết quả"],
              rows: [
                ["235 + 412", "647 (không nhớ)"],
                ["256 + 173", "429 (có nhớ)"],
                ["534 − 268", "266 (có mượn)"],
              ],
              label: "Ôn tập cộng trừ trong phạm vi 1 000",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "425 + 138 bằng bao nhiêu?",
            options: [553, 563, 573, 462],
            answer: 563,
            mascotHint: "5+8=13 viết 3 nhớ 1; 2+3+1=6; 4+1=5. Kết quả 563.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Cộng trừ số có ba chữ số làm như số có hai chữ số.",
              "425 + 138 = 563.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g2-c14-l4",
      title: "Bài 4: Ôn tập phép nhân, phép chia",
      type: "learn",
      description: "Ôn tập bảng nhân 2, bảng nhân 5, bảng chia 2, bảng chia 5",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Bốn bảng nhân chia của bé vẫn còn nhớ chứ? Kiểm tra nhé! 🎯",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Bốn bảng của Lớp 2",
            explanation: "Lớp 2 học bốn bảng: nhân 2, nhân 5, chia 2, chia 5.",
            rule: "2 × 8 = 16; 5 × 7 = 35; 18 : 2 = 9; 45 : 5 = 9.",
            points: [
              "Từ một phép nhân viết được hai phép chia.",
              "5 × 7 = 35 → 35 : 5 = 7 và 35 : 7 = 5.",
              "Đổi chỗ hai thừa số thì tích không đổi: 2 × 5 = 5 × 2.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "2 × 8 = 16\n5 × 7 = 35\n18 : 2 = 9\n45 : 5 = 9",
            operation: {
              left: 5,
              sign: "×",
              right: 7,
              result: 35,
            },
            table: {
              headers: ["Phép tính", "Kết quả"],
              rows: [
                ["2 × 8", "16"],
                ["5 × 7", "35"],
                ["18 : 2", "9"],
                ["45 : 5", "9"],
              ],
              label: "Ôn tập phép nhân, phép chia",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "5 × 7 bằng bao nhiêu?",
            options: [12, 30, 35, 40],
            answer: 35,
            mascotHint: "5 × 7 = 35 (đếm thêm 5 bảy lần).",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Có 18 cái kẹo chia đều cho 2 bạn. Mỗi bạn được mấy cái?",
            options: [6, 8, 9, 16],
            answer: 9,
            mascotHint: "18 : 2 = 9 cái kẹo.",
            groupScene: {
              mode: "equalGroups",
              kind: "trays",
              n: 2,
              k: 9,
              emoji: "🍬",
              hidePerGroup: true,
              pile: 18,
              captionText: "cái kẹo",
            },
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Lớp 2 học bảng nhân 2, nhân 5, chia 2, chia 5.",
              "5 × 7 = 35; 18 : 2 = 9.",
            ],
            mascotMood: "celebrate",
          },
        },
      ],
    },
    {
      id: "g2-c14-l5",
      title: "Bài 5: Ôn tập hình học",
      type: "learn",
      description: "Ôn tập hình phẳng và hình khối đã học",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Hình phẳng và hình khối — bé còn nhớ hết không? 📐",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Tổng kết hình học Lớp 2",
            explanation:
              "Bé đã học điểm, đoạn thẳng, đường thẳng, đường cong, ba điểm thẳng hàng, đường gấp khúc, tứ giác, khối trụ và khối cầu.",
            rule: "Độ dài đường gấp khúc bằng tổng các đoạn. Hình tứ giác có 4 cạnh, 4 đỉnh.",
            points: [
              "Khối trụ xếp chồng được; khối cầu lăn mọi hướng.",
              "Đoạn thẳng có hai đầu mút; đường thẳng kéo dài mãi.",
              "Muốn tính độ dài đường gấp khúc thì cộng các đoạn lại.",
            ],
            solid: {
              kind: "cylinder",
              color: "#ef4444",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Hình tứ giác: 4 cạnh · 4 đỉnh",
            planeShape: {
              kind: "rectangle",
              labels: ["cạnh", "cạnh"],
              vertices: true,
              formula: "Hình tứ giác: 4 cạnh · 4 đỉnh",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Khối trụ xếp chồng · Khối cầu lăn mọi hướng",
            solid: {
              kind: "sphere",
              dims: {
                a: 3,
              },
              label: "Khối cầu lăn mọi hướng",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Đường gấp khúc gồm 3 đoạn dài 5 cm, 6 cm và 7 cm. Độ dài đường gấp khúc là bao nhiêu?",
            options: ["11 cm", "18 cm", "13 cm", "567 cm"],
            answer: "18 cm",
            mascotHint: "5 + 6 + 7 = 18 cm.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Đường gấp khúc: cộng độ dài các đoạn.",
              "Khối trụ xếp chồng được, khối cầu thì không.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g2-c14-l6",
      title: "Bài 6: Ôn tập đo lường",
      type: "learn",
      description: "Ôn tập đơn vị đo độ dài, khối lượng, dung tích",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Bé đã học bao nhiêu đơn vị đo rồi nhỉ? Kể lại xem! 📏",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Các đơn vị đo của Lớp 2",
            explanation:
              "Độ dài: cm, dm, m, km. Khối lượng: kg. Dung tích: l. Thời gian: giờ, phút, ngày, tuần, tháng.",
            rule: "1 dm = 10 cm; 1 m = 100 cm; 1 km = 1000 m; 1 giờ = 60 phút; 1 tuần = 7 ngày.",
            points: [
              "Chọn đơn vị đo phù hợp với vật.",
              "1 ngày = 24 giờ; 1 năm = 12 tháng.",
              "Số đo phải ghi kèm đơn vị.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "1 dm = 10 cm\n1 m = 100 cm\n1 km = 1000 m\n1 giờ = 60 phút",
            table: {
              headers: ["Đổi", "Được"],
              rows: [
                ["1 dm", "10 cm"],
                ["1 m", "100 cm"],
                ["1 km", "1000 m"],
                ["1 giờ", "60 phút"],
                ["1 tuần", "7 ngày"],
              ],
              label: "Ôn tập đo lường",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "4 m bằng bao nhiêu xăng-ti-mét?",
            options: ["40 cm", "400 cm", "4000 cm", "14 cm"],
            answer: "400 cm",
            mascotHint: "4 m = 4 × 100 = 400 cm.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "2 giờ bằng bao nhiêu phút?",
            options: ["20 phút", "60 phút", "120 phút", "100 phút"],
            answer: "120 phút",
            mascotHint: "2 × 60 = 120 phút.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: ["1 m = 100 cm; 1 km = 1000 m.", "1 giờ = 60 phút."],
            mascotMood: "celebrate",
          },
        },
      ],
    },
    {
      id: "g2-c14-l7",
      title: "Bài 7: Ôn tập kiểm đếm số liệu và khả năng",
      type: "learn",
      description: "Ôn tập biểu đồ tranh và ba mức khả năng",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Biểu đồ tranh và ba mức khả năng — bài cuối cùng của phần thống kê! 📊",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Số liệu và khả năng",
            explanation:
              "Đọc biểu đồ tranh: đếm số hình rồi nhân với số lượng mỗi hình. Ba mức khả năng: chắc chắn, có thể, không thể.",
            rule: "Mỗi hình là 4 quyển vở, có 3 hình thì có 3 × 4 = 12 quyển vở.",
            points: [
              "Đọc kĩ chú thích của biểu đồ trước khi tính.",
              "So sánh hai nhóm thì so số hình với nhau.",
              "Không thể: chắc chắn không xảy ra.",
            ],
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
          type: "visual",
          content: {
            text: "Mỗi hình = 4 quyển\n3 hình → 3 × 4 = 12 quyển",
            barChart: {
              title: "Số quyển vở đã quyên góp (mỗi hình = 4 quyển)",
              items: [
                {
                  label: "Nhóm 1",
                  value: 12,
                },
                {
                  label: "Nhóm 2",
                  value: 8,
                },
              ],
              unit: "quyển",
              highlight: 0,
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Trên biểu đồ, mỗi hình là 4 quyển vở. Nhóm có 3 hình. Hỏi nhóm đó có bao nhiêu quyển vở?",
            options: [7, 12, 34, 43],
            answer: 12,
            items: [
              {
                emoji: "📘",
                count: 3,
              },
            ],
            mascotHint: "3 × 4 = 12 quyển vở.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Đếm hình rồi nhân với số lượng mỗi hình.",
              "Ba mức khả năng: chắc chắn, có thể, không thể.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g2-c14-l8",
      title: "Bài 8: Ôn tập chung cuối năm",
      type: "learn",
      description: "Ôn tập tổng hợp toàn bộ chương trình Lớp 2",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Bé đã đi hết cả năm Lớp 2 rồi! Cùng nhìn lại chặng đường nhé 🎉",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập Chung",
            title: "Cả năm Lớp 2 bé đã học gì?",
            explanation:
              "Số đến 1 000; cộng trừ có nhớ trong phạm vi 100 và 1 000; phép nhân chia với bảng 2 và bảng 5; đo lường; hình học và thống kê.",
            points: [
              "Bốn phép tính: cộng, trừ, nhân, chia.",
              "Đơn vị đo: cm, dm, m, km, kg, l, giờ, phút, tháng.",
              "Hình: đường gấp khúc, tứ giác, khối trụ, khối cầu.",
              "Thống kê: biểu đồ tranh; khả năng: chắc chắn, có thể, không thể.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Số đến 1000 · Bốn phép tính · Đo lường · Hình học · Thống kê",
            table: {
              headers: ["Mạch kiến thức", "Ví dụ"],
              rows: [
                ["Số đến 1000", "386 = 300 + 80 + 6"],
                ["Bốn phép tính", "5 × 7 = 35"],
                ["Đo lường", "1 m = 100 cm"],
                ["Hình học", "khối trụ, khối cầu"],
                ["Thống kê", "biểu đồ tranh"],
              ],
              label: "Ôn tập chung cuối năm",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Một cửa hàng có 250 quyển vở, bán đi 135 quyển. Hỏi còn lại bao nhiêu quyển vở?",
            options: [115, 125, 135, 385],
            answer: 115,
            mascotHint: "250 − 135 = 115 quyển vở.",
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
          type: "quiz",
          content: {
            question:
              "Có 5 đĩa, mỗi đĩa 2 quả cam. Hỏi có tất cả bao nhiêu quả cam?",
            options: [7, 10, 12, 25],
            answer: 10,
            mascotHint: "2 × 5 = 10 quả cam.",
            groupScene: {
              mode: "equalGroups",
              kind: "trays",
              n: 5,
              k: 2,
              emoji: "🍊",
              captionText: "5 đĩa, mỗi đĩa 2 quả",
            },
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé giỏi lắm:",
            points: [
              "Bé đã ôn xong toàn bộ chương trình Lớp 2.",
              "Bốn phép tính, đo lường, hình học và thống kê đều đã nắm chắc.",
            ],
            mascotMood: "celebrate",
          },
        },
      ],
    },
    {
      id: "g2-c14-l9",
      title: "Bài 9: Luyện đề cuối năm Lớp 2",
      type: "learn",
      description: "Luyện tập tổng hợp dạng đề kiểm tra cuối năm",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Đây là những dạng bài bé sẽ gặp trong bài kiểm tra cuối năm. Mình thử sức nhé! 🏆",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Luyện Đề",
            title: "Các dạng bài thường gặp",
            explanation:
              "Đề cuối năm thường có: đọc viết số, so sánh số, đặt tính rồi tính, tìm thành phần chưa biết, bài toán có lời văn, hình học và thống kê.",
            points: [
              "Đặt tính cẩn thận, đừng quên nhớ và mượn.",
              "Đọc kĩ đề để chọn đúng phép tính.",
              "Ghi đơn vị và đáp số đầy đủ.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Đọc số · So sánh · Đặt tính · Tìm x · Giải toán · Hình học · Biểu đồ",
            table: {
              headers: ["Dạng bài", "Ví dụ"],
              rows: [
                ["Đọc số", "386"],
                ["So sánh", "386 < 396"],
                ["Đặt tính", "256 + 173 = 429"],
                ["Tìm x", "x + 145 = 320"],
                ["Giải toán", "245 + 168 = 413"],
                ["Hình học", "khối cầu"],
                ["Biểu đồ", "mỗi hình = 4 quyển"],
              ],
              label: "Luyện đề cuối năm Lớp 2",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Tìm số còn thiếu: 700 − ? = 350",
            options: [250, 350, 450, 1050],
            answer: 350,
            mascotHint: "Số trừ = 700 − 350 = 350.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Một hình vuông có cạnh dài 4 cm. Chu vi hình vuông là bao nhiêu?",
            options: ["8 cm", "12 cm", "16 cm", "44 cm"],
            answer: "16 cm",
            mascotHint: "Chu vi hình vuông = 4 × 4 = 16 cm.",
            planeShapes: [
              {
                kind: "square",
                color: "#3b82f6",
              },
            ],
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé giỏi lắm:",
            points: [
              "Bé đã hoàn thành chương trình Toán Lớp 2 theo đúng SGK.",
              "Chúc mừng bé lên Lớp 3!",
            ],
            mascotMood: "celebrate",
          },
        },
      ],
    },
  ],
};
