export const g4c6 = {
  id: "g4-c6",
  name: "Chủ đề 6: Đường thẳng vuông góc. Đường thẳng song song",
  description:
    "Hai đường thẳng vuông góc, hai đường thẳng song song, cách vẽ bằng ê-ke; hình bình hành và hình thoi với các cạnh đối diện song song",
  icon: "📏",
  color: "#ef4444",
  totalLessons: 6,
  lessons: [
    {
      id: "g4-c6-l1",
      title: "Bài 27: Hai đường thẳng vuông góc",
      type: "learn",
      description:
        "Nhận biết hai đường thẳng vuông góc; dùng ê-ke để kiểm tra và vẽ hai đường thẳng vuông góc",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Cú Mèo đang buộc hai thanh tre vuông góc với nhau để làm con diều. Vì sao người ta phải đặt chúng vuông góc nhỉ? 🪁",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Thế nào là hai đường thẳng vuông góc?",
            explanation:
              "Kéo dài hai cạnh AB và AD của hình chữ nhật ABCD, ta được hai đường thẳng vuông góc với nhau. Hai đường thẳng vuông góc tạo thành bốn góc vuông có chung một đỉnh.",
            points: [
              "Hai đường thẳng vuông góc tạo thành bốn góc vuông chung một đỉnh.",
              "Ta thường dùng ê-ke để kiểm tra hoặc vẽ hai đường thẳng vuông góc.",
              "Đặt một cạnh góc vuông của ê-ke trùng với đường thẳng đã cho, cạnh còn lại đi qua điểm cần vẽ.",
            ],
            rule: "Ê-ke khớp đúng với góc tạo bởi hai đường thẳng thì hai đường thẳng đó vuông góc.",
            planeShape: {
              kind: "rectangle",
              labels: ["AB", "BC", "CD", "DA"],
              vertexLabels: ["A", "B", "C", "D"],
              formula: "Kéo dài hai cạnh AB và AD của hình chữ nhật ABCD ta được hai đường thẳng vuông góc",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Hai đường thẳng OM và ON vuông góc với nhau",
            angle: {
              kind: "right",
              degrees: 90,
              vertexLetter: "O",
              armLetters: ["M", "N"],
              label: "Bốn góc vuông chung đỉnh O",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Vẽ đường thẳng CD đi qua điểm H và vuông góc với AB",
            table: {
              headers: ["Bước", "Việc làm"],
              rows: [
                [
                  "Bước 1",
                  "Đặt một cạnh góc vuông của ê-ke trùng với đường thẳng AB, cạnh góc vuông thứ hai gặp điểm H",
                ],
                [
                  "Bước 2",
                  "Vạch đường thẳng theo cạnh góc vuông thứ hai của ê-ke, ta được đường thẳng CD",
                ],
              ],
              label: "Cách vẽ hai đường thẳng vuông góc bằng ê-ke",
            },
          },
        },
        {
          type: "visual",
          content: {
            planeShape: {
              kind: "rectangle",
              vertices: true,
              vertexLabel: "đỉnh"
            },
            text: "hình chữ nhật bé học hôm nay có gì đặc biệt?\n· 4 góc vuông\n· hai cặp cạnh dài bằng nhau\nBé đếm cạnh, đếm đỉnh ngay trên hình vẽ rồi đọc lại hai đặc điểm trên nhé."
          }
        },
        {
          type: "concept",
          content: {
            badge: "Ghi Nhớ",
            title: "Đặc điểm của hình chữ nhật",
            explanation: "Nhìn hình và gọi tên đúng là bước đầu; bước sau là nêu được đặc điểm của hình chữ nhật.",
            points: [
              "hình chữ nhật có 4 góc vuông.",
              "hình chữ nhật có hai cặp cạnh dài bằng nhau.",
              "hình chữ nhật có cạnh dài là chiều dài, cạnh ngắn là chiều rộng.",
              "Cách kiểm tra: bé đếm cạnh, đếm đỉnh; nếu đếm ra khác các đặc điểm trên thì đã nhìn nhầm hình."
            ]
          }
        },
        {
          type: "quiz",
          content: {
            question: "Hình nào có 4 góc vuông?",
            options: [
              "hình chữ nhật",
              "hình khối lập phương",
              "hình khối hộp chữ nhật",
              "hình khối trụ"
            ],
            answer: "hình chữ nhật",
            mascotHint: "hình chữ nhật: 4 góc vuông · hai cặp cạnh dài bằng nhau · cạnh dài là chiều dài, cạnh ngắn là chiều rộng."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Trong bài hôm nay có hình chữ nhật và hình góc vuông và hình đường thẳng. Hình nào có hai cặp cạnh dài bằng nhau?",
            options: [
              "hình chữ nhật",
              "hình khối lập phương",
              "hình khối hộp chữ nhật",
              "hình khối trụ"
            ],
            answer: "hình chữ nhật",
            mascotHint: "Đáp án là hình chữ nhật: 4 góc vuông · hai cặp cạnh dài bằng nhau · cạnh dài là chiều dài, cạnh ngắn là chiều rộng."
          }
        },
        {
          type: "quiz",
          content: {
            question:
              "Dùng dụng cụ nào để kiểm tra hai đường thẳng có vuông góc với nhau hay không?",
            options: ["Ê-ke", "Compa", "Thước dây", "Cân đồng hồ"],
            answer: "Ê-ke",
            mascotHint: "Ê-ke có một góc vuông nên dùng để kiểm tra góc vuông.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Hai đường thẳng vuông góc với nhau cắt nhau tại một điểm thì tạo thành mấy góc vuông?",
            options: ["1 góc", "2 góc", "3 góc", "4 góc"],
            answer: "4 góc",
            mascotHint:
              "Hai đường thẳng cắt nhau tạo bốn góc; cả bốn đều là góc vuông.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Hai đường thẳng vuông góc tạo bốn góc vuông chung một đỉnh.",
              "Dùng ê-ke để kiểm tra và để vẽ.",
              "Đặt cạnh góc vuông của ê-ke trùng đường thẳng đã cho.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c6-l2",
      title: "Bài 28: Hai đường thẳng song song",
      type: "learn",
      description:
        "Nhận biết hai đường thẳng song song — không bao giờ cắt nhau dù kéo dài mãi",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "thinking",
            text: "Hai đường thẳng màu xanh trên hình như không bao giờ cắt nhau. Cú Mèo thử kéo dài mãi mà chúng vẫn không gặp nhau! 🛤️",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Hai đường thẳng song song",
            explanation:
              "Kéo dài hai cạnh AB và DC của hình chữ nhật ABCD, ta được hai đường thẳng song song với nhau. Hai đường thẳng song song thì không bao giờ cắt nhau, dù có kéo dài thêm bao xa.",
            points: [
              "Hai đường thẳng song song không bao giờ cắt nhau.",
              "Trong hình chữ nhật: AB song song với DC; AD song song với BC.",
              "Trong hình vuông: hai cặp cạnh đối diện cũng song song với nhau.",
            ],
            rule: "Song song = cùng hướng và cách nhau một khoảng không đổi.",
            planeShape: {
              kind: "rectangle",
              labels: ["AB", "BC", "CD", "DA"],
              vertexLabels: ["A", "B", "C", "D"],
              formula: "Kéo dài hai cạnh AB và DC của hình chữ nhật ABCD ta được hai đường thẳng song song",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Các cặp cạnh song song trong hình chữ nhật và hình vuông",
            table: {
              headers: ["Hình", "Cặp cạnh song song"],
              rows: [
                ["Hình chữ nhật ABCD", "AB // DC và AD // BC"],
                ["Hình vuông MNPQ", "MN // QP và MQ // NP"],
              ],
              label: "Kí hiệu // nghĩa là song song",
            },
          },
        },
        {
          type: "visual",
          content: {
            planeShape: {
              kind: "square",
              vertices: true,
              vertexLabel: "đỉnh"
            },
            text: "hình vuông bé học hôm nay có gì đặc biệt?\n· 4 cạnh dài bằng nhau\n· 4 góc vuông\nBé đếm cạnh, đếm đỉnh ngay trên hình vẽ rồi đọc lại hai đặc điểm trên nhé."
          }
        },
        {
          type: "concept",
          content: {
            badge: "Ghi Nhớ",
            title: "Đặc điểm của hình vuông",
            explanation: "Nhìn hình và gọi tên đúng là bước đầu; bước sau là nêu được đặc điểm của hình vuông.",
            points: [
              "hình vuông có 4 cạnh dài bằng nhau.",
              "hình vuông có 4 góc vuông.",
              "hình vuông có hai đường chéo bằng nhau.",
              "Cách kiểm tra: bé đếm cạnh, đếm đỉnh; nếu đếm ra khác các đặc điểm trên thì đã nhìn nhầm hình."
            ]
          }
        },
        {
          type: "visual",
          content: {
            table: {
              headers: ["Bước", "Việc bé làm"],
              rows: [
                ["Bước 1 — Đặt thước", "đặt vạch 0 của thước trùng với một đầu vật"],
                ["Bước 2 — Đọc số", "nhìn đầu kia của vật xem tới vạch nào"],
                ["Bước 3 — Ghi kết quả", "viết số đo kèm đơn vị, rồi đo lại lần nữa"],
              ]
            },
            text: "Ba bước đo cho đúng — bé làm lần lượt\nBé đọc bảng này trước khi làm, và đọc lại sau khi làm xong.\nBỏ một bước là bài dễ sai."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Làm xong một bài, bé nên làm gì để chắc chắn kết quả đúng?",
            options: [
              "Thử lại bằng phép tính ngược hoặc kiểm tra theo điều cần nhớ",
              "Nộp bài luôn cho nhanh",
              "Đoán lại một lần nữa"
            ],
            answer: "Thử lại bằng phép tính ngược hoặc kiểm tra theo điều cần nhớ",
            mascotHint: "Người tính giỏi luôn thử lại: cộng thì lấy kết quả trừ đi một số hạng."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Hình nào có 4 cạnh dài bằng nhau?",
            options: [
              "hình vuông",
              "hình khối lập phương",
              "hình khối hộp chữ nhật",
              "hình khối trụ"
            ],
            answer: "hình vuông",
            mascotHint: "hình vuông: 4 cạnh dài bằng nhau · 4 góc vuông · hai đường chéo bằng nhau."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Trong bài hôm nay có hình vuông và hình chữ nhật và hình đường thẳng. Hình nào có 4 góc vuông?",
            options: [
              "hình vuông",
              "hình khối lập phương",
              "hình khối hộp chữ nhật",
              "hình khối trụ"
            ],
            answer: "hình vuông",
            mascotHint: "Đáp án là hình vuông: 4 cạnh dài bằng nhau · 4 góc vuông · hai đường chéo bằng nhau."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Hai đường thẳng song song thì thế nào?",
            options: [
              "Không bao giờ cắt nhau",
              "Cắt nhau tại một điểm",
              "Vuông góc với nhau",
              "Luôn cắt nhau ở giữa",
            ],
            answer: "Không bao giờ cắt nhau",
            mascotHint:
              "Dù kéo dài mãi, hai đường thẳng song song vẫn không gặp nhau.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Trong hình chữ nhật ABCD, cặp cạnh nào song song với nhau?",
            options: ["AB và DC", "AB và BC", "AD và DC", "BC và CD"],
            answer: "AB và DC",
            mascotHint:
              "Hai cạnh đối diện của hình chữ nhật song song với nhau: AB // DC, AD // BC.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Hai đường thẳng song song không bao giờ cắt nhau.",
              "Hình chữ nhật, hình vuông có hai cặp cạnh song song.",
              "Kí hiệu // đọc là “song song”.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c6-l3",
      title: "Bài 29: Thực hành vẽ hai đường thẳng vuông góc, song song",
      type: "learn",
      description:
        "Thực hành vẽ hai đường thẳng vuông góc và song song bằng ê-ke, thước kẻ",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Lớp 4A nhận dự án “Khung tranh kỉ niệm”: dùng các que gỗ vuông góc và song song để làm khung tranh. Việt còn vẽ cả đường chạy trên sân thể dục nữa! 📐",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Thực Hành",
            title: "Vẽ hai đường thẳng song song",
            explanation:
              "Muốn vẽ đường thẳng CD đi qua điểm H và song song với đường thẳng AB, ta làm hai bước: vẽ một đường thẳng đi qua H và vuông góc với AB, rồi vẽ đường thẳng đi qua H vuông góc với đường thẳng vừa vẽ.",
            points: [
              "Bước 1: vẽ đường thẳng MN qua H vuông góc với AB.",
              "Bước 2: vẽ đường thẳng CD qua H vuông góc với MN.",
              "Vậy CD song song với AB. Dùng ê-ke và thước kẻ để vẽ chính xác.",
            ],
            rule: "Cùng vuông góc với một đường thẳng thì hai đường thẳng đó song song với nhau.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Bản thiết kế đường chạy của Việt",
            table: {
              headers: ["Bước", "Việc làm"],
              rows: [
                ["1", "Vẽ vạch xuất phát MN dài 2 cm, vẽ trung điểm H của MN"],
                ["2", "Vẽ đoạn MP vuông góc với MN, MP = 10 cm"],
                ["3", "Vẽ HK và NQ song song với MP, HK = NQ = 10 cm"],
                ["4", "Nối P với Q ta được vạch đích"],
              ],
              label: "Muốn song song thì cùng vuông góc với MN",
            },
          },
        },
        {
          type: "visual",
          content: {
            angle: {
              kind: "right",
              degrees: 90,
              vertexLetter: "O",
              armLetters: ["A", "B"]
            },
            text: "góc vuông bé học hôm nay có gì đặc biệt?\n· đúng bằng góc của ê-ke\n· hai cạnh của góc vuông góc với nhau\nBé đặt ê-ke vào góc, nếu trùng khít là góc vuông ngay trên hình vẽ rồi đọc lại hai đặc điểm trên nhé."
          }
        },
        {
          type: "concept",
          content: {
            badge: "Ghi Nhớ",
            title: "Đặc điểm của góc vuông",
            explanation: "Nhìn hình và gọi tên đúng là bước đầu; bước sau là nêu được đặc điểm của góc vuông.",
            points: [
              "góc vuông có đúng bằng góc của ê-ke.",
              "góc vuông có hai cạnh của góc vuông góc với nhau.",
              "Cách kiểm tra: bé đặt ê-ke vào góc, nếu trùng khít là góc vuông; nếu đếm ra khác các đặc điểm trên thì đã nhìn nhầm hình."
            ]
          }
        },
        {
          type: "quiz",
          content: {
            question: "Hình nào có đúng bằng góc của ê-ke?",
            options: [
              "góc vuông",
              "hình khối lập phương",
              "hình khối hộp chữ nhật",
              "hình khối trụ"
            ],
            answer: "góc vuông",
            mascotHint: "góc vuông: đúng bằng góc của ê-ke · hai cạnh của góc vuông góc với nhau."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Trong bài hôm nay có hình góc vuông và hình đường thẳng. Hình nào có hai cạnh của góc vuông góc với nhau?",
            options: [
              "góc vuông",
              "hình khối lập phương",
              "hình khối hộp chữ nhật",
              "hình khối trụ"
            ],
            answer: "góc vuông",
            mascotHint: "Đáp án là góc vuông: đúng bằng góc của ê-ke · hai cạnh của góc vuông góc với nhau."
          }
        },
        {
          type: "quiz",
          content: {
            question:
              "Để vẽ đường thẳng song song với AB, bước đầu tiên bé cần vẽ đường thẳng nào?",
            options: [
              "Đường thẳng vuông góc với AB",
              "Đường thẳng song song với AB",
              "Đường thẳng cắt AB",
              "Đường tròn",
            ],
            answer: "Đường thẳng vuông góc với AB",
            mascotHint:
              "Vẽ đường vuông góc với AB trước, rồi vẽ đường vuông góc với đường đó — ta được đường song song với AB.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Hai đường thẳng cùng vuông góc với một đường thẳng thứ ba thì chúng thế nào với nhau?",
            options: [
              "Song song với nhau",
              "Vuông góc với nhau",
              "Cắt nhau",
              "Trùng nhau",
            ],
            answer: "Song song với nhau",
            mascotHint:
              "Cùng vuông góc với một đường thẳng thì chúng song song.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Vẽ song song: vẽ hai lần vuông góc.",
              "Dùng ê-ke đặt đúng cạnh góc vuông.",
              "Kiểm tra lại bằng cách quan sát xem hai đường có cắt nhau không.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c6-l4",
      title: "Bài 30: Hình bình hành",
      type: "learn",
      description:
        "Nhận biết hình bình hành: hai cặp cạnh đối diện song song và bằng nhau",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Cú Mèo ghép hình con gà từ các miếng bìa. Đuôi con gà có dạng một hình đặc biệt — đó là hình bình hành! 🐔",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Hình bình hành ABCD",
            explanation:
              "Hình bình hành có hai cặp cạnh đối diện song song với nhau và hai cặp cạnh đối diện bằng nhau. Trong hình bình hành ABCD: AB song song với DC, AD song song với BC, và AB = DC, AD = BC.",
            points: [
              "AB và DC là hai cạnh đối diện; AD và BC cũng là hai cạnh đối diện.",
              "Cạnh AB song song với cạnh DC; cạnh AD song song với cạnh BC.",
              "AB = DC và AD = BC.",
            ],
            rule: "Hình bình hành: hai cặp cạnh đối diện vừa SONG SONG vừa BẰNG NHAU.",
            planeShape: {
              kind: "parallelogram",
              labels: ["AB", "BC", "CD", "DA"],
              vertexLabels: ["A", "B", "C", "D"],
              formula: "Hình bình hành ABCD: AB song song và bằng DC; AD song song và bằng BC",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Các cặp cạnh của hình bình hành ABCD",
            planeShape: {
              kind: "parallelogram",
              labels: ["AB", "BC", "CD", "DA"],
              vertexLabels: ["A", "B", "C", "D"],
              formula: "Hình bình hành ABCD có hai cặp cạnh đối diện song song và bằng nhau",
            },
            table: {
              headers: ["Cặp cạnh đối diện", "Quan hệ"],
              rows: [
                ["AB và DC", "song song và bằng nhau"],
                ["AD và BC", "song song và bằng nhau"],
              ],
              label:
                "Hình bình hành ABCD có hai cặp cạnh đối diện song song, bằng nhau",
            },
          },
        },
        {
          type: "concept",
          content: {
            badge: "Cách Học",
            title: "Bốn bước làm một bài toán",
            explanation: "Mọi bài bài toán có lời văn đều đi theo cùng một đường. Bé làm đúng thứ tự thì không bỏ sót bước nào.",
            points: [
              "Bước 1 — Đọc kỹ đề, gạch dưới các SỐ và từ khoá (thêm, bớt, gấp, chia đều).",
              "Bước 2 — Tóm tắt đề bằng hình hoặc bằng câu ngắn: đã có gì, cần tìm gì.",
              "Bước 3 — Chọn phép tính: “thêm, gộp, tất cả” → cộng; “bớt, cho đi, còn lại” → trừ; “gấp mấy lần” → nhân.",
              "Bước 4 — Đặt tính rồi tính, rồi VIẾT ĐÁP SỐ kèm đơn vị và thử lại bằng phép ngược."
            ]
          }
        },
        {
          type: "visual",
          content: {
            table: {
              headers: ["Điều cần nhớ", "Nội dung"],
              rows: [
                ["Đơn vị", "đáp số luôn kèm đơn vị như con, quả, kg, cm"],
                ["Kiểm tra", "cộng thì lấy kết quả trừ đi một số hạng"],
                ["Câu trả lời", "viết đủ câu, không chỉ ghi số"]
              ]
            },
            text: "Bảng nhớ nhanh — bài toán có lời văn\nBa điều dưới đây bé đọc lại mỗi khi làm bài.\nTrước khi nộp bài, bé tự hỏi: đã đủ ba điều này chưa?"
          }
        },
        {
          type: "quiz",
          content: {
            question: "Giải một bài toán có lời văn, bé làm gì TRƯỚC TIÊN?",
            options: [
              "Đọc kỹ đề và gạch dưới các số đã cho",
              "Viết ngay đáp số",
              "Đoán kết quả",
              "Đặt tính trước khi đọc đề"
            ],
            answer: "Đọc kỹ đề và gạch dưới các số đã cho",
            mascotHint: "Chưa đọc kỹ đề thì chưa biết đề cho gì, hỏi gì — mọi bước sau đều dễ sai."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Hình bình hành có đặc điểm gì về các cạnh đối diện?",
            options: [
              "Song song và bằng nhau",
              "Cắt nhau",
              "Vuông góc với nhau",
              "Không bằng nhau",
            ],
            answer: "Song song và bằng nhau",
            mascotHint:
              "Hai cặp cạnh đối diện của hình bình hành song song và bằng nhau.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Một hình bình hành có một cạnh dài 3 dm. Cạnh đối diện với cạnh đó dài bao nhiêu đề-xi-mét?",
            options: ["3 dm", "6 dm", "1,5 dm", "9 dm"],
            mascotHint:
              "Hai cạnh đối diện của hình bình hành thì bằng nhau, nên cạnh đối diện cũng dài 3 dm.",
            answer: "3 dm",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Hình bình hành có hai cặp cạnh đối diện song song.",
              "Hai cặp cạnh đối diện đó cũng bằng nhau.",
              "Nhìn thấy cặp cạnh song song và bằng nhau là nghĩ tới hình bình hành.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c6-l5",
      title: "Bài 31: Hình thoi",
      type: "learn",
      description:
        "Nhận biết hình thoi: bốn cạnh bằng nhau, hai cặp cạnh đối diện song song; hai đường chéo vuông góc",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "surprised",
            text: "Kim nam châm của la bàn có dạng hình thoi! Hình này có gì đặc biệt mà lại dùng làm la bàn nhỉ? 🧭",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Hình thoi ABCD",
            explanation:
              "Hình thoi có hai cặp cạnh đối diện song song với nhau và bốn cạnh đều bằng nhau. Trong hình thoi ABCD: AB song song với DC, AD song song với BC và AB = BC = CD = DA.",
            points: [
              "Bốn cạnh của hình thoi bằng nhau.",
              "Hai cặp cạnh đối diện song song như hình bình hành.",
              "Hai đường chéo của hình thoi vuông góc với nhau (kiểm tra bằng ê-ke).",
            ],
            rule: "Hình thoi = hình bình hành có bốn cạnh bằng nhau.",
            planeShape: {
              kind: "rhombus",
              labels: ["AB", "BC", "CD", "DA"],
              vertexLabels: ["A", "B", "C", "D"],
              formula: "Hình thoi ABCD: AB = BC = CD = DA",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "So sánh hình bình hành và hình thoi",
            table: {
              headers: ["Đặc điểm", "Hình bình hành", "Hình thoi"],
              rows: [
                ["Hai cặp cạnh đối diện song song", "có", "có"],
                ["Cạnh đối diện bằng nhau", "có", "có"],
                ["Bốn cạnh bằng nhau", "không", "có"],
                ["Hai đường chéo vuông góc", "không", "có"],
              ],
              label: "Hình thoi là hình bình hành đặc biệt",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Hai đường chéo của hình thoi vuông góc với nhau",
            angle: {
              kind: "right",
              degrees: 90,
              vertexLetter: "O",
              armLetters: ["A", "C"],
              label: "AC vuông góc với BD tại O",
            },
          },
        },
        {
          type: "concept",
          content: {
            badge: "Cách Học",
            title: "Bốn bước làm một bài toán",
            explanation: "Mọi bài so sánh số đều đi theo cùng một đường. Bé làm đúng thứ tự thì không bỏ sót bước nào.",
            points: [
              "Bước 1 — Đếm số CHỮ SỐ của từng số trước.",
              "Bước 2 — Số nào nhiều chữ số hơn thì lớn hơn — xong, không cần so tiếp.",
              "Bước 3 — Cùng số chữ số thì so từng hàng từ TRÁI sang phải, gặp hàng khác nhau thì dừng.",
              "Bước 4 — Đọc lại kết quả và đặt đúng dấu (>, <, =)."
            ]
          }
        },
        {
          type: "visual",
          content: {
            table: {
              headers: ["Điều cần nhớ", "Nội dung"],
              rows: [
                ["Nhiều chữ số hơn", "thì số đó lớn hơn"],
                ["So từ trái", "hàng nghìn rồi mới tới trăm, chục, đơn vị"],
                ["Dấu lớn mở về phía", "số lớn hơn"]
              ]
            },
            text: "Bảng nhớ nhanh — so sánh số\nBa điều dưới đây bé đọc lại mỗi khi làm bài.\nTrước khi nộp bài, bé tự hỏi: đã đủ ba điều này chưa?"
          }
        },
        {
          type: "quiz",
          content: {
            question: "Muốn so sánh hai số, bé bắt đầu bằng việc gì?",
            options: [
              "Đếm xem số nào có nhiều chữ số hơn",
              "So chữ số hàng đơn vị trước",
              "Cộng hai số lại",
              "Đọc từ phải sang trái"
            ],
            answer: "Đếm xem số nào có nhiều chữ số hơn",
            mascotHint: "Số nhiều chữ số hơn chắc chắn lớn hơn, nên chỉ cần so từng hàng khi hai số bằng số chữ số."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Hình thoi có đặc điểm gì về độ dài bốn cạnh?",
            options: [
              "Bốn cạnh bằng nhau",
              "Hai cạnh dài hơn hai cạnh kia",
              "Bốn cạnh khác nhau",
              "Chỉ hai cạnh bằng nhau",
            ],
            answer: "Bốn cạnh bằng nhau",
            mascotHint:
              "Hình thoi có bốn cạnh đều bằng nhau: AB = BC = CD = DA.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Hai đường chéo của hình thoi có quan hệ gì?",
            options: [
              "Vuông góc với nhau",
              "Song song với nhau",
              "Không cắt nhau",
              "Bằng nhau và song song",
            ],
            answer: "Vuông góc với nhau",
            mascotHint:
              "Dùng ê-ke kiểm tra sẽ thấy hai đường chéo của hình thoi vuông góc.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Hình thoi có bốn cạnh bằng nhau.",
              "Hai cặp cạnh đối diện song song với nhau.",
              "Hai đường chéo vuông góc với nhau.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c6-l6",
      title: "Bài 32: Luyện tập chung",
      type: "learn",
      description:
        "Ôn tập đường thẳng vuông góc, song song, hình bình hành và hình thoi",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Hôm nay chúng mình ôn lại cả chủ đề: tìm đường thẳng song song, đường thẳng vuông góc và gọi tên hình bình hành, hình thoi nhé! 🔍",
          },
        },
        {
          type: "visual",
          content: {
            text: "Nhận biết nhanh các hình đã học",
            table: {
              headers: ["Hình", "Dấu hiệu nhận biết"],
              rows: [
                ["Hình vuông", "4 góc vuông, 4 cạnh bằng nhau"],
                [
                  "Hình chữ nhật",
                  "4 góc vuông, hai cặp cạnh đối diện bằng nhau",
                ],
                [
                  "Hình bình hành",
                  "hai cặp cạnh đối diện song song và bằng nhau",
                ],
                ["Hình thoi", "bốn cạnh bằng nhau, hai đường chéo vuông góc"],
              ],
              label: "Đọc dấu hiệu rồi mới kết luận",
            },
          },
        },
        {
          type: "visual",
          content: {
            planeShape: {
              kind: "square",
              vertices: true,
              vertexLabel: "đỉnh"
            },
            text: "hình vuông bé học hôm nay có gì đặc biệt?\n· 4 cạnh dài bằng nhau\n· 4 góc vuông\nBé đếm cạnh, đếm đỉnh ngay trên hình vẽ rồi đọc lại hai đặc điểm trên nhé."
          }
        },
        {
          type: "concept",
          content: {
            badge: "Ghi Nhớ",
            title: "Đặc điểm của hình vuông",
            explanation: "Nhìn hình và gọi tên đúng là bước đầu; bước sau là nêu được đặc điểm của hình vuông.",
            points: [
              "hình vuông có 4 cạnh dài bằng nhau.",
              "hình vuông có 4 góc vuông.",
              "hình vuông có hai đường chéo bằng nhau.",
              "Cách kiểm tra: bé đếm cạnh, đếm đỉnh; nếu đếm ra khác các đặc điểm trên thì đã nhìn nhầm hình."
            ]
          }
        },
        {
          type: "visual",
          content: {
            table: {
              headers: ["Bước", "Việc bé làm"],
              rows: [
                ["Bước 1 — Gọi tên", "nhìn hình rồi nói đúng tên hình (hoặc khối)"],
                ["Bước 2 — Đếm", "đếm cạnh, đếm đỉnh rồi đọc lại hai đặc điểm của hình"],
                ["Bước 3 — Kiểm lại", "đếm lại lần nữa bằng mắt, không đoán"],
              ]
            },
            text: "Ba bước làm bài hình — bé làm lần lượt\nBé đọc bảng này trước khi làm, và đọc lại sau khi làm xong.\nBỏ một bước là bài dễ sai."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Làm xong một bài, bé nên làm gì để chắc chắn kết quả đúng?",
            options: [
              "Thử lại bằng phép tính ngược hoặc kiểm tra theo điều cần nhớ",
              "Nộp bài luôn cho nhanh",
              "Đoán lại một lần nữa"
            ],
            answer: "Thử lại bằng phép tính ngược hoặc kiểm tra theo điều cần nhớ",
            mascotHint: "Người tính giỏi luôn thử lại: cộng thì lấy kết quả trừ đi một số hạng."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Hình nào có 4 cạnh dài bằng nhau?",
            options: [
              "hình vuông",
              "hình khối lập phương",
              "hình khối hộp chữ nhật",
              "hình khối trụ"
            ],
            answer: "hình vuông",
            mascotHint: "hình vuông: 4 cạnh dài bằng nhau · 4 góc vuông · hai đường chéo bằng nhau."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Trong bài hôm nay có hình vuông và hình tròn và hình tam giác và hình chữ nhật và hình góc vuông và hình đường thẳng. Hình nào có 4 góc vuông?",
            options: [
              "hình vuông",
              "hình khối lập phương",
              "hình khối hộp chữ nhật",
              "hình khối trụ"
            ],
            answer: "hình vuông",
            mascotHint: "Đáp án là hình vuông: 4 cạnh dài bằng nhau · 4 góc vuông · hai đường chéo bằng nhau."
          }
        },
        {
          type: "quiz",
          content: {
            question:
              "Hình nào dưới đây vừa có cặp cạnh song song vừa có cặp cạnh vuông góc?",
            options: [
              "Hình chữ nhật",
              "Hình thoi",
              "Hình bình hành",
              "Hình tam giác",
            ],
            answer: "Hình chữ nhật",
            mascotHint:
              "Hình chữ nhật có hai cặp cạnh đối diện song song và bốn góc vuông (các cạnh kề vuông góc).",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Cho hai miếng ghép giống nhau là hai hình tam giác vuông bằng nhau. Bé có thể ghép được hình nào sau đây?",
            options: [
              "Hình bình hành",
              "Hình tròn",
              "Hình lục giác đều",
              "Hình cầu",
            ],
            answer: "Hình bình hành",
            mascotHint:
              "Ghép hai tam giác vuông bằng nhau áp cạnh huyền vào nhau sẽ được hình bình hành hoặc hình chữ nhật.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Song song: hai đường không bao giờ cắt nhau.",
              "Vuông góc: tạo bốn góc vuông chung một đỉnh.",
              "Hình thoi là hình bình hành có bốn cạnh bằng nhau.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
  ],
};
