export const g4c6 = {
  id: "g4-c6",
  name: "Chương 6: Ôn tập cuối năm",
  description:
    "Hệ thống hóa toàn bộ kiến thức Toán lớp 4: Số tự nhiên, 4 phép tính, phân số, hình học, các bài toán có lời văn điển hình",
  icon: "🏆",
  color: "#6366f1",
  totalLessons: 10,
  lessons: [
    {
      id: "g4-c6-l1",
      title: "Bài 1: Ôn tập về số tự nhiên & Phép tính số tự nhiên",
      type: "learn",
      description:
        "Ôn tập đọc viết số đến lớp triệu, tính nhanh và tính giá trị biểu thức",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "proud",
            text: "Chúc mừng các bạn đã bước vào chặng cuối cùng của lớp 4! Hãy cùng Cú Mèo ôn lại kiến thức số tự nhiên nhé! 🦉✨",
          },
        },
        {
          type: "concept",
          content: {
            placeValue: {
              headers: [
                "Trăm nghìn",
                "Chục nghìn",
                "Nghìn",
                "Trăm",
                "Chục",
                "Đơn vị",
              ],
              digits: [6, 8, 3, 5, 2, 0],
              label: "Ôn tập số tự nhiên — 683 520",
            },
            operation: {
              left: 483526,
              sign: "+",
              right: 254138,
              result: 737664,
            },
            badge: "Kiến Thức Trọng Tâm",
            title: "Ôn tập về số tự nhiên & Phép tính số tự nhiên",
            explanation: "Ôn lại số tự nhiên và bốn phép tính với số tự nhiên.",
            points: [
              "Đọc, viết, so sánh số tự nhiên và nêu giá trị của từng chữ số theo hàng.",
              "Bốn phép tính cộng, trừ, nhân, chia — đặt tính thẳng cột.",
              "Tính chất giao hoán, kết hợp và nhân một số với một tổng.",
            ],
            rule: "Thử lại kết quả bằng phép tính ngược trước khi kết luận.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Tính nhanh: 125 × 38 × 8 = ?",
            options: ["38 000", "3 800", "380 000", "30 000"],
            answer: "38 000",
            mascotHint: "(125 × 8) × 38 = 1000 × 38 = 38 000!",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ôn tập số tự nhiên:",
            points: [
              "Nắm chắc hàng và lớp.",
              "Áp dụng giao hoán và kết hợp để tính nhanh.",
            ],
            mascotMood: "celebrate",
          },
        },
      ],
    },
    {
      id: "g4-c6-l2",
      title: "Bài 2: Ôn tập về đại lượng & Bảng khối lượng, thời gian",
      type: "learn",
      description:
        "Chuyển đổi yến, tạ, tấn; dm², m², km²; giây, phút, giờ, thế kỉ",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Thử thách trí nhớ với bảng đo khối lượng, diện tích và thế kỉ nào! ⏱️⚖️",
          },
        },
        {
          type: "concept",
          content: {
            table: {
              headers: ["Đổi", "Bằng"],
              rows: [
                ["1 tấn", "1 000 kg"],
                ["1 tạ", "100 kg"],
                ["1 thế kỉ", "100 năm"],
                ["1 phút", "60 giây"],
              ],
              label: "Ôn tập đại lượng — đổi về cùng một đơn vị rồi mới tính",
            },
            badge: "Kiến Thức Trọng Tâm",
            title: "Ôn tập về đại lượng & Bảng khối lượng, thời gian",
            explanation:
              "Ôn lại các đơn vị đo khối lượng, độ dài, diện tích và thời gian.",
            points: [
              "Khối lượng: 1 tấn = 10 tạ = 100 yến = 1000 kg.",
              "Thời gian: 1 giờ = 60 phút; 1 phút = 60 giây; 1 thế kỉ = 100 năm.",
              "Diện tích: 1 m² = 100 dm² = 10 000 cm².",
            ],
            rule: "Đổi về cùng một đơn vị đo rồi mới tính.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Đổi: 2 tấn 5 tạ = ... kg",
            options: ["2 500 kg", "250 kg", "20 500 kg", "2 050 kg"],
            answer: "2 500 kg",
            mascotHint: "2 tấn = 2 000 kg; 5 tạ = 500 kg, nên là 2 500 kg!",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ôn tập đại lượng:",
            points: [
              "1 tấn = 1 000 kg; 1 tạ = 100 kg; 1 yến = 10 kg.",
              "1 m² = 100 dm²; 1 km² = 1 000 000 m².",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c6-l3",
      title: "Bài 3: Ôn tập về phân số & Các phép tính phân số",
      type: "learn",
      description: "Rút gọn, quy đồng, cộng trừ nhân chia phân số",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Phân số là trọng tâm số một của học kì 2! Cùng làm bài kiểm tra phân số nhé! 🍰",
          },
        },
        {
          type: "concept",
          content: {
            fractionBar: {
              rows: [
                {
                  parts: 6,
                  shaded: 3,
                  extra: 2,
                  label: "1/2 + 1/3 = 3/6 (xanh) + 2/6 (hồng) = 5/6",
                },
                {
                  parts: 12,
                  shaded: 8,
                  groups: 4,
                  label: "8 ô nhỏ trong 12 ô nhỏ = 2 ô lớn trong 3 ô lớn",
                },
                {
                  parts: 3,
                  shaded: 2,
                  label: "gộp 4 ô nhỏ thành 1 ô lớn ⇒ 8/12 = 2/3",
                },
              ],
              label:
                "Quy đồng mẫu số: 1/2 = 3/6 · 1/3 = 2/6 ⇒ 1/2 + 1/3 = 3/6 + 2/6 = 5/6; gộp 4 ô nhỏ thành 1 ô lớn thì 8/12 = 2/3",
            },
            badge: "Kiến Thức Trọng Tâm",
            title: "Ôn tập về phân số & Các phép tính phân số",
            explanation: "Ôn lại phân số và bốn phép tính với phân số.",
            points: [
              "Rút gọn phân số: chia cả tử số và mẫu số cho cùng một số.",
              "Cộng, trừ phân số cùng mẫu: cộng, trừ tử số rồi giữ nguyên mẫu số.",
              "Nhân phân số: nhân tử số với tử số, mẫu số với mẫu số.",
            ],
            rule: "Khác mẫu số thì phải quy đồng mẫu số trước khi cộng hoặc trừ.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Tính: 3/4 + 1/2 = ?",
            options: ["5/4", "4/6", "1", "3/8"],
            answer: "5/4",
            mascotHint: "3/4 + 2/4 = 5/4!",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Tính: 2/5 × 10 = ?",
            options: [4, 5, 20, 2],
            answer: 4,
            mascotHint: "(2 × 10) : 5 = 20 : 5 = 4!",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ôn tập phân số:",
            points: ["Nhớ rút gọn kết quả về phân số tối giản."],
            mascotMood: "celebrate",
          },
        },
      ],
    },
    {
      id: "g4-c6-l4",
      title: "Bài 4: Ôn tập về hình học",
      type: "learn",
      description:
        "Chu vi và diện tích hình vuông, hình chữ nhật, hình bình hành, hình thoi",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Tổng kết 4 công thức diện tích quan trọng nhất lớp 4! 📐",
          },
        },
        {
          type: "visual",
          content: {
            text: "- Hình chữ nhật: S = a × b - Hình vuông: S = a × a - Hình bình hành: S = a × h - Hình thoi: S = (m × n) : 2",
            planeShape: {
              kind: "parallelogram",
              labels: ["đáy a", "chiều cao h"],
              formula: "S = a × h",
            }
          },
        },
        {
          type: "visual",
          content: {
            text: "Ôn tập hình học",
            table: {
              headers: ["Hình", "Công thức diện tích"],
              rows: [
                ["Hình chữ nhật", "S = a × b"],
                ["Hình vuông", "S = a × a"],
                ["Hình bình hành", "S = a × h"],
                ["Hình thoi", "S = (m × n) : 2"],
              ],
              label: "Ôn tập hình học",
            }
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Một thửa ruộng hình bình hành có đáy 20 m và chiều cao 15 m. Diện tích thửa ruộng là:",
            options: ["300 m²", "150 m²", "70 m²", "350 m²"],
            answer: "300 m²",
            mascotHint: "S = a × h = 20 × 15 = 300 m²!",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ công thức hình học:",
            points: [
              "Hình bình hành: S = đáy × cao.",
              "Hình thoi: S = tích 2 đường chéo : 2.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c6-l5",
      title: "Bài 5: Ôn tập giải toán có lời văn",
      type: "learn",
      description: "Tổng - Hiệu, Tổng - Tỉ, Hiệu - Tỉ, Tìm số trung bình cộng",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Phân biệt 3 bài toán kinh điển: Tổng-Hiệu dùng cộng/trừ chia 2; Tổng-Tỉ dùng tổng số phần; Hiệu-Tỉ dùng hiệu số phần! 💡",
          },
        },
        {
          type: "concept",
          content: {
            barModel: {
              rows: [
                {
                  label: "Số bé",
                  parts: 2,
                },
                {
                  label: "Số lớn",
                  parts: 3,
                },
              ],
              braceLabel: "Tóm tắt đề bằng sơ đồ đoạn thẳng trước khi giải",
            },
            badge: "Kiến Thức Trọng Tâm",
            title: "Ôn tập giải toán có lời văn",
            explanation: "Ôn lại các dạng toán có lời văn đã học ở Lớp 4.",
            points: [
              "Dạng tìm hai số khi biết tổng và hiệu của chúng.",
              "Dạng tìm hai số khi biết tổng và tỉ, hoặc hiệu và tỉ.",
              "Dạng toán trung bình cộng và dạng toán rút về đơn vị.",
            ],
            rule: "Tóm tắt đề bằng sơ đồ đoạn thẳng trước khi giải.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Hai thùng chứa 60 lít dầu, thùng thứ nhất gấp đôi thùng thứ hai. Hỏi thùng thứ hai chứa bao nhiêu lít?",
            options: [20, 40, 30, 15],
            answer: 20,
            mascotHint:
              "Tổng-Tỉ: Tỉ số là 2/1. Tổng số phần = 3. Thùng 2 = 60 : 3 × 1 = 20 lít!",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ phương pháp giải:",
            points: [
              "Đọc kỹ đề bài xác định đúng dạng toán.",
              "Luôn kiểm tra lại kết quả.",
            ],
            mascotMood: "celebrate",
          },
        },
      ],
    },
    {
      id: "g4-c6-l7",
      title: "Bài 6: Ôn tập dấu hiệu chia hết và tìm thành phần chưa biết",
      type: "learn",
      description: "Tổng hợp dấu hiệu chia hết và dạng bài tìm số chưa biết",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Ôn lại dấu hiệu chia hết và dạng bài tìm số chưa biết — hai dạng bài luôn có trong đề kiểm tra! 📝",
          },
        },
        {
          type: "concept",
          content: {
            table: {
              headers: ["Cần tìm", "Cách làm"],
              rows: [
                ["Số hạng chưa biết", "tổng − số hạng đã biết"],
                ["Số bị trừ", "hiệu + số trừ"],
                ["Số trừ", "số bị trừ − hiệu"],
              ],
              label: "Ôn tập dấu hiệu chia hết và tìm thành phần chưa biết",
            },
            badge: "Ôn Tập Chia Hết",
            title: "Tổng hợp quy tắc",
            points: [
              "Chia hết cho 2: chữ số tận cùng là 0, 2, 4, 6, 8.",
              "Chia hết cho 5: chữ số tận cùng là 0 hoặc 5.",
              "Chia hết cho 3 hoặc 9: xét tổng các chữ số.",
              "Tìm số chưa biết: dùng phép tính ngược lại.",
            ],
            rule: "Tìm số hạng thì lấy tổng trừ số hạng đã biết; tìm số bị trừ thì lấy hiệu cộng số trừ.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Tìm x, biết: x + 1 250 = 4 300",
            options: [3050, 5550, 3005, 3550],
            answer: 3050,
            mascotHint: "x = 4 300 - 1 250 = 3 050!",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ:",
            points: [
              "Số hạng = Tổng - số hạng đã biết",
              "Số bị trừ = Hiệu + số trừ",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c6-l8",
      title: "Bài 7: Ôn tập toán Tổng - Tỉ và Hiệu - Tỉ",
      type: "learn",
      description: "Ôn hai dạng toán điển hình của Lớp 4",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Hai dạng toán 'ăn điểm' nhất trong đề kiểm tra cuối năm — cùng ôn thật chắc! 🎯",
          },
        },
        {
          type: "concept",
          content: {
            barModel: {
              rows: [
                {
                  label: "Số bé",
                  parts: 1,
                },
                {
                  label: "Số lớn",
                  parts: 4,
                },
              ],
              braceLabel: "Hiệu 24 ⇒ 8 và 32 · kiểm tra lại 8 + 24 = 32",
            },
            badge: "Ôn Tập Hai Dạng",
            title: "Cách phân biệt nhanh",
            points: [
              "Đề cho tổng ⇒ chia cho TỔNG số phần.",
              "Đề cho hiệu ⇒ chia cho HIỆU số phần.",
              "Ví dụ Tổng - Tỉ: tổng 96, tỉ số 3 : 5 ⇒ một phần = 96 : 8 = 12 ⇒ hai số là 36 và 60.",
              "Ví dụ Hiệu - Tỉ: hiệu 24, tỉ số 1 : 4 ⇒ một phần = 24 : 3 = 8 ⇒ hai số là 8 và 32.",
            ],
            rule: "Luôn kiểm tra lại tổng (hoặc hiệu) của hai số vừa tìm được."
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập Hai Dạng",
            title: "Ôn tập toán Tổng – Tỉ và Hiệu – Tỉ",
            table: {
              headers: ["Dạng", "Công thức"],
              rows: [
                ["Tổng – Tỉ", "chia cho TỔNG số phần"],
                ["Hiệu – Tỉ", "chia cho HIỆU số phần"],
              ],
              label: "Ôn tập toán Tổng – Tỉ và Hiệu – Tỉ",
            }
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Hiệu hai số là 24, tỉ số của hai số là 1 : 4. Số bé là bao nhiêu?",
            options: [8, 32, 6, 12],
            answer: 8,
            mascotHint:
              "Hiệu số phần = 4 - 1 = 3; giá trị một phần = 24 : 3 = 8 ⇒ số bé = 8!",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ:",
            points: ["Đề cho tổng ⇒ tổng số phần · Đề cho hiệu ⇒ hiệu số phần"],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c6-l9",
      title: "Bài 8: Luyện đề cuối năm Lớp 4 - Đề số 1",
      type: "learn",
      description: "Luyện đề cuối năm Lớp 4 - Đề số 1",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Đề luyện số 1 — bé hãy làm như thi thật nhé! 📝",
          },
        },
        {
          type: "concept",
          content: {
            table: {
              headers: ["Nội dung", "Ví dụ"],
              rows: [
                [
                  "Số tự nhiên",
                  "432 516 = 400 000 + 30 000 + 2 000 + 500 + 10 + 6",
                ],
                ["Bốn phép tính", "128 472 : 6 = 21 412"],
                ["Dấu hiệu chia hết", "1 250 chia hết cho 2 và 5"],
                ["Phân số", "1/2 + 1/3 = 5/6"],
                ["Hình học", "S hình thoi = (m × n) : 2"],
              ],
              label: "Luyện đề cuối năm Lớp 4 — Đề số 1",
            },
            operation: {
              left: 128472,
              sign: ":",
              right: 6,
              result: 21412,
            },
            badge: "Đề Số 1",
            title: "Năm dạng bài hay gặp",
            points: [
              "Dạng 1: Số tự nhiên, so sánh số, dấu hiệu chia hết.",
              "Dạng 2: Bốn phép tính và tìm thành phần chưa biết.",
              "Dạng 3: Phân số và bốn phép tính phân số.",
              "Dạng 4: Hình học: diện tích hình bình hành, hình thoi.",
              "Dạng 5: Toán Tổng - Tỉ, Hiệu - Tỉ.",
            ],
            rule: "Làm câu dễ trước, kiểm tra lại trước khi hết giờ.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Một hình bình hành có độ dài đáy 25 cm và chiều cao 12 cm. Diện tích hình bình hành là:",
            options: ["300 cm²", "37 cm²", "150 cm²", "74 cm²"],
            answer: "300 cm²",
            mascotHint: "S = 25 × 12 = 300 cm²!",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Tính: 5/6 - 1/3 = ?",
            options: ["1/2", "4/3", "1/3", "4/6"],
            answer: "1/2",
            mascotHint: "1/3 = 2/6; 5/6 - 2/6 = 3/6 = 1/2!",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ:",
            points: ["Kiểm tra lại từng bước tính trước khi kết luận"],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c6-l10",
      title: "Bài 9: Luyện đề cuối năm Lớp 4 - Đề số 2",
      type: "learn",
      description: "Luyện đề cuối năm Lớp 4 - Đề số 2",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Đề luyện số 2 có thêm toán Tổng - Tỉ và hình học. Bé đã sẵn sàng chưa? 🚀",
          },
        },
        {
          type: "concept",
          content: {
            barModel: {
              rows: [
                {
                  label: "Số bé",
                  parts: 2,
                },
                {
                  label: "Số lớn",
                  parts: 3,
                },
              ],
              braceLabel: "Tổng (hiệu) số phần ⇒ giá trị một phần ⇒ từng số",
            },
            badge: "Đề Số 2",
            title: "Ba dạng bài nâng cao",
            points: [
              "Dạng 1: Tìm hai số khi biết tổng và tỉ số.",
              "Dạng 2: Tìm hai số khi biết hiệu và tỉ số.",
              "Dạng 3: Hình học: diện tích hình bình hành, hình thoi.",
            ],
            rule: "Viết ra nháp: tổng (hiệu) số phần ⇒ giá trị một phần ⇒ từng số."
          },
        },
        {
          type: "concept",
          content: {
            badge: "Đề Số 2",
            title: "Luyện đề cuối năm Lớp 4 — Đề số 2",
            table: {
              headers: ["Bước", "Làm"],
              rows: [
                ["1", "vẽ sơ đồ đoạn thẳng"],
                ["2", "tính tổng (hiệu) số phần"],
                ["3", "tính giá trị một phần"],
                ["4", "tính từng số và kiểm tra lại"],
              ],
              label: "Luyện đề cuối năm Lớp 4 — Đề số 2",
            }
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Tổng hai số là 150, tỉ số của hai số là 2 : 3. Số lớn là bao nhiêu?",
            options: [90, 60, 30, 75],
            answer: 90,
            mascotHint: "2 + 3 = 5 phần; 150 : 5 = 30 ⇒ số lớn = 30 × 3 = 90!",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Một mảnh vườn hình bình hành có diện tích 96 m² và chiều cao 8 m. Độ dài đáy là bao nhiêu?",
            options: ["12 m", "104 m", "88 m", "24 m"],
            answer: "12 m",
            mascotHint: "Đáy = Diện tích : Chiều cao = 96 : 8 = 12 m!",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ:",
            points: ["Làm bài cẩn thận và kiểm tra lại kết quả"],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c6-l6",
      title: "Bài 10: Thử thách Trạng Nguyên Toán Lớp 4",
      type: "learn",
      description: "Bài kiểm tra tổng hợp cuối năm vinh danh Trạng Nguyên",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "celebrate",
            text: "Chào mừng bạn đến với thử thách Trạng Nguyên Toán 4! Hãy phát huy hết khả năng để giành huy chương Vàng nhé! 🏅🎓",
          },
        },
        {
          type: "concept",
          content: {
            table: {
              headers: ["Dạng bài", "Ví dụ"],
              rows: [
                ["Đọc số", "68 352"],
                ["So sánh", "100 000 > 99 999"],
                ["Tổng – Tỉ", "14 và 21"],
                ["Hiệu – Tỉ", "8 và 32"],
                ["Hình học", "S = a × h"],
              ],
              label:
                "Thử thách Trạng Nguyên Toán Lớp 4 — đọc kỹ đề, nhận dạng bài rồi mới giải",
            },
            badge: "Kiến Thức Trọng Tâm",
            title: "Thử thách Trạng Nguyên Toán Lớp 4",
            explanation:
              "Bài cuối của Lớp 4: tổng hợp toàn bộ kiến thức đã học.",
            points: [
              "Số tự nhiên, phân số, dấu hiệu chia hết cho 2, 3, 5, 9.",
              "Đại lượng và hình học: chu vi, diện tích, thể tích.",
              "Giải toán có lời văn và toán về tỉ lệ bản đồ.",
            ],
            rule: "Đọc kỹ đề, nhận dạng bài rồi mới chọn cách giải.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Một mảnh đất hình thoi có đường chéo thứ nhất là 14 m, đường chéo thứ hai bằng 1/2 đường chéo thứ nhất. Diện tích mảnh đất là:",
            options: ["49 m²", "98 m²", "28 m²", "21 m²"],
            answer: "49 m²",
            mascotHint:
              "Đường chéo 2 = 14 : 2 = 7 m. Diện tích = (14 × 7) : 2 = 49 m²!",
            planeShapes: [
              {
                kind: "rhombus",
                color: "#8b5cf6",
              },
            ],
          },
        },
        {
          type: "summary",
          content: {
            title: "Chúc mừng bạn đã hoàn thành xuất sắc Toán Lớp 4!",
            points: [
              "Bạn đã nắm vững toàn bộ kiến thức cốt lõi của Toán 4!",
              "Sẵn sàng tự tin bước vào Toán Lớp 5! 🚀",
            ],
            mascotMood: "celebrate",
          },
        },
      ],
    },
  ],
};
