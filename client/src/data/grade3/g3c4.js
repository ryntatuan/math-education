export const g3c4 = {
  id: "g3-c4",
  name: "Chủ đề 4: Phép nhân, phép chia trong phạm vi 100",
  description:
    "Nhân số có hai chữ số với số có một chữ số; gấp một số lên nhiều lần; phép chia hết, phép chia có dư; giảm một số đi nhiều lần; bài toán giải bằng hai bước tính",
  icon: "🔢",
  color: "#8e7cc3",
  totalLessons: 10,
  lessons: [
    {
      id: "g3-c4-l1",
      title: "Bài 1: Nhân số có hai chữ số với số có một chữ số (không nhớ)",
      type: "learn",
      description: "Đặt tính và nhân dạng 32 × 3",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Mỗi hộp có 32 chiếc bánh, có 3 hộp. Có tất cả bao nhiêu chiếc bánh? 🍪",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Nhân hai chữ số với một chữ số",
            explanation:
              "Bé nhân lần lượt từ HÀNG ĐƠN VỊ rồi đến HÀNG CHỤC với số có một chữ số.",
            rule: "32 × 3: 2 × 3 = 6, viết 6. 3 × 3 = 9, viết 9. Kết quả 96.",
            points: [
              "Đặt số có một chữ số thẳng cột hàng đơn vị.",
              "Nhân hàng đơn vị trước, hàng chục sau.",
              "Cả hai hàng đều bé hơn 10 nên không nhớ.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Bé đặt tính rồi nhân: 32 × 3",
            cotTinh: {
              left: 32,
              right: 3,
              sign: "×",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "32 × 3 bằng bao nhiêu?",
            options: [66, 96, 35, 69],
            answer: 96,
            mascotHint: "2 × 3 = 6; 3 × 3 = 9. Kết quả 96.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "21 × 4 bằng bao nhiêu?",
            options: [64, 84, 25, 44],
            answer: 84,
            mascotHint: "1 × 4 = 4; 2 × 4 = 8. Kết quả 84.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Nhân hàng đơn vị trước, hàng chục sau.",
              "32 × 3 = 96; 21 × 4 = 84.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g3-c4-l2",
      title: "Bài 2: Nhân số có hai chữ số với số có một chữ số (có nhớ)",
      type: "learn",
      description: "Đặt tính và nhân dạng 26 × 3",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "26 × 3 thì 6 × 3 = 18, vượt qua 10 rồi. Bé phải làm sao? 🤔",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Nhân có nhớ",
            explanation:
              "Khi nhân hàng đơn vị mà được từ 10 trở lên, ta viết chữ số hàng đơn vị và NHỚ sang hàng chục.",
            rule: "26 × 3: 6 × 3 = 18, viết 8 nhớ 1. 2 × 3 = 6, thêm 1 nhớ = 7. Kết quả 78.",
            points: [
              "Nhớ 1 khi hàng đơn vị nhân ra từ 10 trở lên.",
              "Đừng quên cộng số nhớ vào hàng chục.",
              "24 × 4 = 96 (4 × 4 = 16 viết 6 nhớ 1; 2 × 4 + 1 = 9).",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Bé đặt tính rồi nhân: 26 × 3 (nhớ 1)",
            cotTinh: {
              left: 26,
              right: 3,
              sign: "×",
              remember: true,
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "26 × 3 bằng bao nhiêu?",
            options: [68, 78, 88, 29],
            answer: 78,
            mascotHint: "6 × 3 = 18 viết 8 nhớ 1; 2 × 3 + 1 = 7. Kết quả 78.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "24 × 4 bằng bao nhiêu?",
            options: [86, 96, 106, 28],
            answer: 96,
            mascotHint: "4 × 4 = 16 viết 6 nhớ 1; 2 × 4 + 1 = 9. Kết quả 96.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Nhân có nhớ: nhớ 1 sang hàng chục.",
              "26 × 3 = 78; 24 × 4 = 96.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g3-c4-l3",
      title: "Bài 3: Gấp một số lên một số lần",
      type: "learn",
      description: "Nhận biết và tính gấp một số lên nhiều lần",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Băng giấy đỏ dài 4 cm. Băng giấy xanh dài gấp 3 lần. Băng xanh dài bao nhiêu? 📏",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Gấp lên một số lần",
            explanation:
              "Muốn gấp một số lên nhiều lần, ta lấy số đó NHÂN với số lần.",
            rule: "4 cm gấp 3 lần là 4 × 3 = 12 cm.",
            points: [
              "'Gấp 3 lần' nghĩa là lấy 3 lần số ban đầu.",
              "Gấp lên thì số TĂNG, dùng phép nhân.",
              "6 gấp 4 lần là 6 × 4 = 24.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "4 cm   →   gấp 3 lần   →   12 cm\n4 × 3 = 12",
            numberLine: {
              from: 4,
              to: 12,
              step: 4,
              marks: [4, 12],
              hops: [
                {
                  from: 4,
                  to: 12,
                  label: "gấp 3 lần",
                },
              ],
              label: "4 cm gấp 3 lần là 4 × 3 = 12 cm",
            },
            operation: {
              left: 4,
              sign: "×",
              right: 3,
              result: 12,
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Băng giấy đỏ dài 4 cm, băng giấy xanh dài gấp 3 lần. Băng giấy xanh dài bao nhiêu?",
            options: ["7 cm", "12 cm", "1 cm", "43 cm"],
            answer: "12 cm",
            barModel: {
              rows: [
                {
                  label: "Băng đỏ",
                  parts: 4,
                },
                {
                  label: "Băng xanh",
                  parts: 12,
                },
              ],
              unit: "cm",
              note: "Băng xanh gấp 3 lần: 4 × 3 = 12 cm",
            },
            mascotHint: "Gấp 3 lần thì nhân 3: 4 × 3 = 12 cm.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "6 gấp lên 4 lần bằng bao nhiêu?",
            options: [10, 24, 2, 64],
            answer: 24,
            mascotHint: "6 × 4 = 24.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Gấp lên nhiều lần thì nhân với số lần.",
              "4 gấp 3 lần = 12; 6 gấp 4 lần = 24.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g3-c4-l4",
      title: "Bài 4: Phép chia hết",
      type: "learn",
      description: "Nhận biết phép chia hết khi chia vừa đủ",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Có 12 chiếc kẹo chia đều cho 3 bạn. Có bạn nào bị thiếu kẹo không? 🍬",
            items: [
              {
                emoji: "🍬",
                label: "Kẹo",
                count: 1,
              },
            ],
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Phép chia hết",
            explanation:
              "PHÉP CHIA HẾT là phép chia mà chia vừa đủ, KHÔNG còn thừa ra.",
            rule: "12 : 3 = 4 (không dư). Mỗi bạn được 4 chiếc kẹo, không thừa chiếc nào.",
            points: [
              "Chia hết thì không có số dư.",
              "15 : 5 = 3 là chia hết.",
              "Thử lại: 3 × 4 = 12 ✓",
            ],
            items: [
              {
                emoji: "🍬",
                label: "Kẹo",
                count: 1,
              },
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Đặt tính 12 : 3 rồi viết thương vào ô trống.\nThử lại: 4 × 3 = 12 (đúng, không dư)",
            cotTinh: {
              left: 12,
              right: 3,
              sign: ":",
            },
            table: {
              headers: ["Phép chia", "Thử lại"],
              rows: [["12 : 3 = 4 (không dư)", "4 × 3 = 12"]],
              label:
                "Phép chia hết — mỗi bạn 4 chiếc kẹo, không thừa chiếc nào",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Phép chia hết là phép chia thế nào?",
            options: [
              "Chia vừa đủ, không còn thừa",
              "Chia còn thừa ra",
              "Không chia được",
              "Chia cho 0",
            ],
            answer: "Chia vừa đủ, không còn thừa",
            mascotHint: "Chia hết thì không có phần thừa ra.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: ["Chia hết: không còn thừa.", "12 : 3 = 4 là chia hết."],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g3-c4-l5",
      title: "Bài 5: Phép chia có dư",
      type: "learn",
      description: "Nhận biết phép chia có dư và điều kiện của số dư",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Có 13 chiếc kẹo chia cho 3 bạn. Chia đều thì thừa ra mấy chiếc? 🍬",
            items: [
              {
                emoji: "🍬",
                label: "Kẹo",
                count: 1,
              },
            ],
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Phép chia có dư",
            explanation:
              "PHÉP CHIA CÓ DƯ là phép chia còn THỪA RA một phần không chia hết. Phần thừa đó gọi là SỐ DƯ.",
            rule: "13 : 3 = 4 (dư 1). Đọc là: mười ba chia ba bằng bốn, dư một.",
            points: [
              "SỐ DƯ luôn BÉ HƠN SỐ CHIA.",
              "Thử lại: 4 × 3 + 1 = 13 ✓",
              "Số dư bé nhất là 1, lớn nhất là số chia trừ 1.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Đặt tính 13 : 3 rồi viết thương và số dư vào ô trống.\nThử lại: 4 × 3 + 1 = 13",
            cotTinh: {
              left: 13,
              right: 3,
              sign: ":",
            },
            table: {
              headers: ["Phép chia", "Thử lại"],
              rows: [["13 : 3 = 4 (dư 1)", "4 × 3 + 1 = 13"]],
              label: "Phép chia có dư — mười ba chia ba bằng bốn, dư một",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "13 : 3 bằng bao nhiêu?",
            options: ["4 dư 1", "4 dư 2", "3 dư 1", "4 dư 3"],
            answer: "4 dư 1",
            mascotHint: "3 × 4 = 12, còn thừa 1. Vậy 13 : 3 = 4 dư 1.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Trong phép chia cho 3, số dư có thể là những số nào?",
            options: ["0, 1, 2", "0, 1, 2, 3", "1, 2, 3", "Bất kì số nào"],
            answer: "0, 1, 2",
            mascotHint:
              "Số dư luôn bé hơn số chia là 3, nên chỉ có thể là 0, 1 hoặc 2.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: ["Số dư luôn bé hơn số chia.", "13 : 3 = 4 dư 1."],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g3-c4-l6",
      title: "Bài 6: Chia số có hai chữ số cho số có một chữ số",
      type: "learn",
      description: "Đặt tính và chia số có hai chữ số cho số có một chữ số",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "48 : 4 thì làm thế nào nhỉ? Bé chia từng hàng nhé! ✏️",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Chia từng hàng từ trái sang phải",
            explanation: "Bé chia hàng CHỤC trước, rồi đến hàng ĐƠN VỊ.",
            rule: "48 : 4: 4 : 4 = 1, viết 1. 8 : 4 = 2, viết 2. Kết quả 12.",
            points: [
              "Chia từ trái sang phải (ngược với cộng trừ nhân).",
              "48 : 4 = 12.",
              "Thử lại: 12 × 4 = 48 ✓",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Đặt tính 48 : 4 — chia từng hàng từ trái sang phải, bé điền thương.",
            cotTinh: {
              left: 48,
              right: 4,
              sign: ":",
            },
            placeValue: {
              headers: ["Chục", "Đơn vị"],
              digits: [4, 8],
              label: "48 : 4: 4 : 4 = 1; 8 : 4 = 2 ⇒ 12",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "48 : 4 bằng bao nhiêu?",
            options: [11, 12, 22, 14],
            answer: 12,
            mascotHint: "4 : 4 = 1; 8 : 4 = 2. Kết quả 12.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "69 : 3 bằng bao nhiêu?",
            options: [21, 23, 32, 33],
            answer: 23,
            mascotHint: "6 : 3 = 2; 9 : 3 = 3. Kết quả 23.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Chia từ hàng chục rồi đến hàng đơn vị.",
              "48 : 4 = 12; 69 : 3 = 23.",
            ],
            mascotMood: "celebrate",
          },
        },
      ],
    },
    {
      id: "g3-c4-l7",
      title: "Bài 7: Giảm một số đi một số lần",
      type: "learn",
      description: "Nhận biết và tính giảm một số đi nhiều lần",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Băng giấy đỏ dài 12 cm. Băng xanh ngắn hơn, chỉ bằng 1/3. Băng xanh dài bao nhiêu? 📏",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Giảm đi một số lần",
            explanation:
              "Muốn giảm một số đi nhiều lần, ta lấy số đó CHIA cho số lần.",
            rule: "12 cm giảm 3 lần là 12 : 3 = 4 cm.",
            points: [
              "'Giảm 3 lần' nghĩa là chia thành 3 phần bằng nhau, lấy 1 phần.",
              "Giảm đi thì số NHỎ lại, dùng phép chia.",
              "Chú ý phân biệt: GẤP lên thì NHÂN, GIẢM đi thì CHIA.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Gấp lên 3 lần:  4 × 3 = 12",
            numberLine: {
              from: 4,
              to: 12,
              step: 4,
              marks: [4, 12],
              hops: [
                {
                  from: 12,
                  to: 4,
                  label: "giảm 3 lần",
                },
              ],
              label: "12 cm giảm 3 lần là 12 : 3 = 4 cm",
            }
          },
        },
        {
          type: "visual",
          content: {
            text:"Giảm đi 3 lần: 12 : 3 = 4",
            table: {
              headers: ["Thao tác", "Kết quả"],
              rows: [
                ["Gấp lên 3 lần", "4 × 3 = 12"],
                ["Giảm đi 3 lần", "12 : 3 = 4"],
              ],
              label: "Gấp lên và giảm đi",
            }
          },
        },
        {
          type: "quiz",
          content: {
            question: "12 giảm đi 3 lần bằng bao nhiêu?",
            options: [4, 9, 15, 36],
            answer: 4,
            mascotHint: "Giảm đi 3 lần thì chia 3: 12 : 3 = 4.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Muốn giảm một số đi 4 lần, bé làm phép tính gì?",
            options: ["Chia cho 4", "Nhân với 4", "Cộng thêm 4", "Trừ đi 4"],
            answer: "Chia cho 4",
            mascotHint: "Giảm đi nhiều lần thì chia cho số lần.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Gấp lên thì nhân; giảm đi thì chia.",
              "12 giảm 3 lần = 4.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g3-c4-l8",
      title: "Bài 8: Bài toán giải bằng hai bước tính",
      type: "learn",
      description: "Giải bài toán cần hai phép tính",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Hàng trên có 8 quả cam, hàng dưới có nhiều hơn 4 quả. Cả hai hàng có bao nhiêu quả? 🍊",
            items: [
              {
                emoji: "🍊",
                label: "Quả cam",
                count: 1,
              },
            ],
          },
        },
        {
          type: "concept",
          content: {
            badge: "Giải Toán",
            title: "Hai bước tính",
            explanation:
              "Bài toán dạng này cần HAI phép tính: tính phần chưa biết trước, rồi mới tính tổng.",
            rule: "Bước 1: hàng dưới có 8 + 4 = 12 (quả). Bước 2: cả hai hàng có 8 + 12 = 20 (quả).",
            points: [
              "Đọc kĩ đề để biết cần mấy bước.",
              "Bước 1 tính phần chưa biết.",
              "Bước 2 mới tính câu hỏi chính.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Hàng trên: 8 quả\nHàng dưới: 8 + 4 = 12 quả\nCả hai: 8 + 12 = 20 quả",
            operation: {
              left: 8,
              sign: "+",
              right: 12,
              result: 20,
            },
            barModel: {
              rows: [
                {
                  label: "Hàng trên",
                  parts: 8,
                },
                {
                  label: "Hàng dưới",
                  parts: 12,
                },
              ],
              braceLabel: "Cả hai hàng: 8 + 12 = 20 quả",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Hàng trên có 8 quả cam, hàng dưới nhiều hơn 4 quả. Hỏi cả hai hàng có bao nhiêu quả cam?",
            options: [12, 16, 20, 4],
            answer: 20,
            mascotHint: "Hàng dưới 12 quả; cả hai hàng 8 + 12 = 20 quả.",
            items: [
              {
                emoji: "🍊",
                label: "Quả cam",
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
              "Bài toán hai bước: tính phần chưa biết trước, rồi tính tổng.",
              "8 + 4 = 12; 8 + 12 = 20.",
            ],
            mascotMood: "celebrate",
          },
        },
      ],
    },
    {
      id: "g3-c4-l9",
      title: "Bài 9: Luyện tập phép chia có dư",
      type: "learn",
      description: "Thực hành chia có dư và kiểm tra số dư",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Bé hãy nhớ: số dư luôn bé hơn số chia. Cùng luyện tập nhé! 🎯",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Luyện Tập",
            title: "Ba bước chia có dư",
            explanation:
              "Tìm số lớn nhất nhân với số chia mà không vượt quá số bị chia. Rồi lấy số bị chia trừ tích đó để ra số dư.",
            rule: "19 : 3: 3 × 6 = 18 (không vượt quá 19). Số dư là 19 − 18 = 1. Vậy 19 : 3 = 6 dư 1.",
            points: [
              "3 × 6 = 18 < 19 ✓; 3 × 7 = 21 > 19 ✗.",
              "Số dư = số bị chia − tích.",
              "Luôn kiểm: số dư bé hơn số chia.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Đặt tính 19 : 3 — bé viết thương rồi viết số dư vào ô trống.",
            cotTinh: {
              left: 19,
              right: 3,
              sign: ":",
            },
            table: {
              headers: ["Bước", "Làm"],
              rows: [
                ["1", "3 × 6 = 18 (không vượt quá 19)"],
                ["2", "Số dư = 19 − 18 = 1"],
                ["Kết quả", "19 : 3 = 6 (dư 1)"],
              ],
              label: "Luyện tập phép chia có dư",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "19 : 3 bằng bao nhiêu?",
            options: ["5 dư 4", "6 dư 1", "6 dư 2", "7 dư 1"],
            answer: "6 dư 1",
            mascotHint: "3 × 6 = 18, còn dư 1. Vậy 19 : 3 = 6 dư 1.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "29 : 4 bằng bao nhiêu?",
            options: ["6 dư 5", "7 dư 1", "7 dư 4", "8 dư 1"],
            answer: "7 dư 1",
            mascotHint: "4 × 7 = 28, còn dư 1. Vậy 29 : 4 = 7 dư 1.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Số dư = số bị chia − tích.",
              "19 : 3 = 6 dư 1; 29 : 4 = 7 dư 1.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g3-c4-l10",
      title: "Bài 10: Luyện tập chung chủ đề 4",
      type: "learn",
      description: "Ôn tập nhân chia trong phạm vi 100",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Bé đã biết nhân chia hai chữ số rồi! Tổng kết nhé 🎉",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Tổng kết chủ đề 4",
            explanation:
              "Bé đã học nhân chia số có hai chữ số với số có một chữ số, gấp lên và giảm đi nhiều lần, chia hết và chia có dư.",
            points: [
              "Nhân: nhân từng hàng, nhớ 1 khi cần.",
              "Chia: chia từng hàng từ trái sang phải.",
              "Gấp lên thì nhân; giảm đi thì chia.",
              "Số dư luôn bé hơn số chia.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "26 × 3 = 78\n48 : 4 = 12\n19 : 3 = 6 (dư 1)",
            operation: {
              left: 26,
              sign: "×",
              right: 3,
              result: 78,
            },
            table: {
              headers: ["Phép tính", "Kết quả"],
              rows: [
                ["26 × 3", "78"],
                ["48 : 4", "12"],
                ["19 : 3", "6 (dư 1)"],
              ],
              label: "Luyện tập chung chủ đề 4",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "34 × 2 bằng bao nhiêu?",
            options: [58, 68, 36, 62],
            answer: 68,
            mascotHint: "4 × 2 = 8; 3 × 2 = 6. Kết quả 68.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "96 : 3 bằng bao nhiêu?",
            options: [22, 32, 33, 93],
            answer: 32,
            mascotHint: "9 : 3 = 3; 6 : 3 = 2. Kết quả 32.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: ["Bé đã hoàn thành chủ đề 4.", "34 × 2 = 68; 96 : 3 = 32."],
            mascotMood: "celebrate",
          },
        },
      ],
    },
  ],
};
