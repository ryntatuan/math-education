export const g4c3 = {
  id: "g4-c3",
  name: "Chủ đề 3: Số có nhiều chữ số",
  description:
    "Số có sáu chữ số, số 1 000 000; hàng và lớp; các số trong phạm vi lớp triệu; làm tròn số đến hàng trăm nghìn; so sánh số có nhiều chữ số; dãy số tự nhiên",
  icon: "🔢",
  color: "#8b5cf6",
  totalLessons: 7,
  lessons: [
    {
      id: "g4-c3-l1",
      title: "Bài 10: Số có sáu chữ số. Số 1 000 000",
      type: "learn",
      description:
        "Đọc, viết số có sáu chữ số; làm quen số 1 000 000 (một triệu); tìm số liền trước, số liền sau",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Cú Mèo đọc tin: dân số thành phố Cà Mau năm 2019 là 226 372 người. Số này có sáu chữ số — đọc thế nào nhỉ? 👀",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Đọc số có sáu chữ số",
            explanation:
              "Số có sáu chữ số gồm hai lớp: lớp nghìn đứng trước, lớp đơn vị đứng sau. Ta đọc theo từng lớp từ trái sang phải, sau lớp nghìn đọc thêm chữ “nghìn”.",
            points: [
              "Các hàng từ trái sang phải: trăm nghìn · chục nghìn · nghìn · trăm · chục · đơn vị.",
              "226 372 đọc là: hai trăm hai mươi sáu nghìn ba trăm bảy mươi hai.",
              "Mười trăm nghìn hợp thành một triệu: 1 000 000.",
              "Số liền sau của 999 999 là 1 000 000.",
            ],
            rule: "Đọc số theo từng lớp: lớp nghìn trước, rồi lớp đơn vị.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Cấu tạo của số 226 372",
            placeValue: {
              headers: [
                "Trăm nghìn",
                "Chục nghìn",
                "Nghìn",
                "Trăm",
                "Chục",
                "Đơn vị",
              ],
              digits: [2, 2, 6, 3, 7, 2],
              label: "226 372 = 200 000 + 20 000 + 6000 + 300 + 70 + 2",
            },
          },
        },
        {
          type: "concept",
          content: {
            badge: "Mẹo Nhớ",
            title: "So sánh hai số bằng cách đếm",
            explanation: "Ở mức này, cách chắc chắn nhất là ĐẾM: số nào đếm đến sau thì số đó lớn hơn.",
            points: [
              "Đếm từ 1: “1, 2, 3, 4, 5…” — số đếm đến sau thì lớn hơn. Ví dụ 5 đến sau 2 nên 5 lớn hơn 2.",
              "Trên tia số, số đứng bên PHẢI lớn hơn số đứng bên TRÁI.",
              "Ba dấu cần nhớ: “>” đọc là lớn hơn, “<” đọc là bé hơn, “=” đọc là bằng nhau.",
              "Với hai số của bài này: 10 < 1000000, đọc là “10 bé hơn 1000000”."
            ]
          }
        },
        {
          type: "visual",
          content: {
            table: {
              headers: ["Bước", "Việc bé làm"],
              rows: [
                ["Bước 1 — Đơn vị", "viết kết quả luôn kèm đơn vị"],
                ["Bước 2 — Bậc thang", "đi xuống thì nhân, đi lên thì chia"],
                ["Bước 3 — Kiểm lại", "lấy kết quả đổi ngược lại xem có về số ban đầu"]
              ]
            },
            text: "Ba bước làm bài — bé làm lần lượt\nBé đọc bảng này trước khi làm, và đọc lại sau khi làm xong.\nBỏ một bước là bài dễ sai."
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
            question: "Số nào lớn hơn: 10 hay 1000000?",
            options: [10, 2019, 226372, 1000000],
            answer: 1000000,
            mascotHint: "Đếm từ 1: số 1000000 đếm đến sau số 10, nên 1000000 lớn hơn 10."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Số 1 000 000 đọc là gì?",
            options: ["Một trăm nghìn", "Một triệu", "Mười nghìn", "Một tỉ"],
            answer: "Một triệu",
            mascotHint: "1 000 000 đọc là một triệu — gồm mười trăm nghìn.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Số liền sau của số 999 999 là số nào?",
            options: ["999 998", "1 000 000", "1 000 001", "999 990"],
            answer: "1 000 000",
            mascotHint: "999 999 thêm 1 được 1 000 000 — đọc là một triệu.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Số có sáu chữ số gồm lớp nghìn và lớp đơn vị.",
              "1 000 000 là một triệu.",
              "Số liền sau bằng số đã cho cộng thêm 1.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c3-l2",
      title: "Bài 11: Hàng và lớp",
      type: "learn",
      description:
        "Nhận biết ba hàng của lớp nghìn và ba hàng của lớp đơn vị; nêu giá trị của chữ số theo hàng, lớp",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "thinking",
            text: "Cú Mèo chỉ vào số 514 293 rồi hỏi: ba chữ số 5, 1, 4 thuộc lớp nào nhỉ? Rô-bốt trả lời ngay: lớp nghìn! Còn ba chữ số 2, 9, 3 là lớp đơn vị. 🔎",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Lớp nghìn và lớp đơn vị",
            explanation:
              "Mỗi lớp gồm ba hàng. Từ phải sang trái, cứ ba hàng hợp thành một lớp: lớp đơn vị (trăm, chục, đơn vị) rồi đến lớp nghìn (nghìn, chục nghìn, trăm nghìn).",
            points: [
              "Lớp đơn vị: hàng trăm · hàng chục · hàng đơn vị.",
              "Lớp nghìn: hàng nghìn · hàng chục nghìn · hàng trăm nghìn.",
              "Số 514 293: các chữ số 5, 1, 4 thuộc lớp nghìn; 2, 9, 3 thuộc lớp đơn vị.",
              "Giá trị của mỗi chữ số phụ thuộc vào hàng nó đứng.",
            ],
            rule: "Cứ ba hàng từ phải sang trái là một lớp: đơn vị → nghìn → triệu.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Chữ số thuộc hàng nào, lớp nào?",
            table: {
              headers: ["Số", "Chữ số được xét", "Hàng", "Lớp"],
              rows: [
                [362820, 3, "trăm nghìn", "nghìn"],
                [810003, 1, "trăm nghìn", "nghìn"],
                [738772, 8, "nghìn", "nghìn"],
                [256837, 8, "chục", "đơn vị"],
              ],
              label: "Cùng tìm giá trị của chữ số theo hàng",
            },
          },
        },
        {
          type: "visual",
          content: {
            baseTen: {
              tens: 1,
              ones: 1
            },
            text: "11 gồm mấy chục và mấy đơn vị?\nBé đếm khối: 1 thanh chục và 1 ô rời\nVậy 11 = 1 chục và 1 đơn vị"
          }
        },
        {
          type: "concept",
          content: {
            badge: "Mẹo Nhớ",
            title: "So sánh hai số cho đúng",
            explanation: "Muốn biết số nào lớn hơn, bé làm hai bước sau — không cần đếm lại từ đầu.",
            points: [
              "Bước 1 — đếm số chữ số: số nào có ít chữ số hơn thì số đó BÉ hơn (ví dụ 9 < 10).",
              "Bước 2 — hai số cùng số chữ số: so chữ số đầu tiên bên TRÁI trước; số nào có chữ số ấy lớn hơn thì số đó lớn hơn. Bằng nhau thì so chữ số tiếp theo.",
              "Ví dụ: 514293 có 6 chữ số, 11 có 2 chữ số — số nào có ít chữ số hơn thì bé hơn.",
              "Số liền sau = số đó thêm 1; số liền trước = số đó bớt 1."
            ]
          }
        },
        {
          type: "quiz",
          content: {
            question: "Số liền sau của số 11 là số nào?",
            options: [11, 12, 13, 21],
            answer: 12,
            mascotHint: "Số liền sau hơn số đã cho 1 đơn vị: 11 + 1 = 12."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Số nào LỚN NHẤT trong các số sau: 11, 514293, 5, 1?",
            options: ["1", "5", "11", "514293"],
            answer: "514293",
            mascotHint: "Bé so chữ số đầu tiên bên trái của các số, bằng nhau thì so chữ số tiếp theo — số lớn nhất là 514293."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Trong số 514 293, các chữ số 5, 1, 4 thuộc lớp nào?",
            options: ["Lớp đơn vị", "Lớp nghìn", "Lớp triệu", "Lớp chục"],
            answer: "Lớp nghìn",
            mascotHint: "Ba chữ số đứng đầu (5, 1, 4) là lớp nghìn.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Số 738 772 có chữ số 8 thuộc hàng nào?",
            options: [
              "Hàng trăm nghìn",
              "Hàng chục nghìn",
              "Hàng nghìn",
              "Hàng trăm",
            ],
            answer: "Hàng nghìn",
            mascotHint:
              "Đếm từ phải sang trái: 2 (đơn vị), 7 (chục), 7 (trăm), 8 (nghìn) — hàng nghìn.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Mỗi lớp gồm ba hàng.",
              "Lớp đơn vị: trăm · chục · đơn vị.",
              "Lớp nghìn: nghìn · chục nghìn · trăm nghìn.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c3-l3",
      title: "Bài 12: Các số trong phạm vi lớp triệu",
      type: "learn",
      description:
        "Làm quen lớp triệu: hàng triệu, chục triệu, trăm triệu; đọc viết số đến 1 000 000 000",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "surprised",
            text: "Cú Mèo cho biết: dân số Việt Nam năm 2022 khoảng một trăm triệu người. Một trăm triệu viết là 100 000 000 — chín chữ số! 😮",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Lớp triệu",
            explanation:
              "Ba hàng triệu, chục triệu, trăm triệu hợp thành lớp triệu. Mười triệu còn gọi là một chục triệu; một trăm triệu viết là 100 000 000; một nghìn triệu là một tỉ: 1 000 000 000.",
            points: [
              "Mười triệu = một chục triệu = 10 000 000.",
              "Một trăm triệu = 100 000 000.",
              "Số liền sau của 999 999 999 là 1 000 000 000 — đọc là một tỉ.",
              "Số có chín chữ số thì chữ số đầu tiên thuộc hàng trăm triệu.",
            ],
            rule: "Đọc số theo từng lớp: triệu → nghìn → đơn vị.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Khoảng cách Trái Đất – Mặt Trời: 149 597 876 km",
            placeValue: {
              headers: [
                "Trăm triệu",
                "Chục triệu",
                "Triệu",
                "Trăm nghìn",
                "Chục nghìn",
                "Nghìn",
                "Trăm",
                "Chục",
                "Đơn vị",
              ],
              digits: [1, 4, 9, 5, 9, 7, 8, 7, 6],
              label:
                "149 597 876 = 100 000 000 + 40 000 000 + 9 000 000 + 500 000 + 90 000 + 7000 + 800 + 70 + 6",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Viết số thành tổng theo mẫu",
            table: {
              headers: ["Số", "Viết thành tổng"],
              rows: [
                ["27 000 900", "20 000 000 + 7 000 000 + 900"],
                ["10 914 090", "10 000 000 + 900 000 + 10 000 + 4000 + 90"],
                ["1 304 530", "1 000 000 + 300 000 + 4000 + 500 + 30"],
              ],
              label: "Mỗi số tách theo từng hàng",
            },
          },
        },
        {
          type: "concept",
          content: {
            badge: "Mẹo Nhớ",
            title: "So sánh hai số bằng cách đếm",
            explanation: "Ở mức này, cách chắc chắn nhất là ĐẾM: số nào đếm đến sau thì số đó lớn hơn.",
            points: [
              "Đếm từ 1: “1, 2, 3, 4, 5…” — số đếm đến sau thì lớn hơn. Ví dụ 5 đến sau 2 nên 5 lớn hơn 2.",
              "Trên tia số, số đứng bên PHẢI lớn hơn số đứng bên TRÁI.",
              "Ba dấu cần nhớ: “>” đọc là lớn hơn, “<” đọc là bé hơn, “=” đọc là bằng nhau.",
              "Với hai số của bài này: 12 < 2022, đọc là “12 bé hơn 2022”."
            ]
          }
        },
        {
          type: "quiz",
          content: {
            question: "Số nào lớn hơn: 12 hay 2022?",
            options: [12, 2022, 90000, 500000],
            answer: 2022,
            mascotHint: "Đếm từ 1: số 2022 đếm đến sau số 12, nên 2022 lớn hơn 12."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Số 10 000 000 đọc là gì?",
            options: [
              "Một triệu",
              "Mười triệu",
              "Một trăm triệu",
              "Mười nghìn",
            ],
            answer: "Mười triệu",
            mascotHint:
              "10 000 000 đọc là mười triệu, còn gọi là một chục triệu.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Số 14 021 983 — chữ số 4 thuộc lớp nào?",
            options: ["Lớp nghìn", "Lớp đơn vị", "Lớp triệu", "Lớp trăm"],
            answer: "Lớp triệu",
            mascotHint: "Hai chữ số 1 và 4 đứng đầu, thuộc lớp triệu.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Ba hàng triệu · chục triệu · trăm triệu hợp thành lớp triệu.",
              "1 000 000 000 đọc là một tỉ.",
              "Đọc, viết số lần lượt theo từng lớp.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c3-l4",
      title: "Bài 13: Làm tròn số đến hàng trăm nghìn",
      type: "learn",
      description:
        "Làm tròn số đến hàng trăm nghìn dựa vào chữ số hàng chục nghìn",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Công ty A bán được 2 712 615 xe máy trong năm 2020. Báo chí viết “khoảng 2 700 000 xe”. Vì sao lại làm tròn như vậy nhỉ? 🛵",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Làm tròn đến hàng trăm nghìn",
            explanation:
              "Muốn làm tròn số đến hàng trăm nghìn, bé nhìn chữ số hàng chục nghìn: nếu chữ số đó bé hơn 5 thì làm tròn xuống, nếu từ 5 trở lên thì làm tròn lên.",
            points: [
              "Bước 1: xác định chữ số hàng chục nghìn.",
              "Bước 2: so chữ số đó với 5.",
              "Bước 3: làm tròn xuống hoặc lên rồi thay các hàng sau bằng 0.",
              "Ví dụ: 2 712 615 có hàng chục nghìn là 1 (< 5) nên làm tròn thành 2 700 000.",
            ],
            rule: "Nhìn chữ số hàng chục nghìn: bé hơn 5 thì xuống, từ 5 trở lên thì lên.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Làm tròn số xe máy bán ra mỗi năm đến hàng trăm nghìn",
            table: {
              headers: ["Năm", "Số xe bán ra", "Làm tròn đến hàng trăm nghìn"],
              rows: [
                [2016, 3121023, 3100000],
                [2017, 3272353, 3300000],
                [2018, 3386097, 3400000],
                [2019, 3254964, 3300000],
              ],
              label: "So chữ số hàng chục nghìn rồi làm tròn",
            },
          },
        },
        {
          type: "visual",
          content: {
            baseTen: {
              tens: 1,
              ones: 3
            },
            text: "13 gồm mấy chục và mấy đơn vị?\nBé đếm khối: 1 thanh chục và 3 ô rời\nVậy 13 = 1 chục và 3 đơn vị"
          }
        },
        {
          type: "concept",
          content: {
            badge: "Mẹo Nhớ",
            title: "So sánh hai số cho đúng",
            explanation: "Muốn biết số nào lớn hơn, bé làm hai bước sau — không cần đếm lại từ đầu.",
            points: [
              "Bước 1 — đếm số chữ số: số nào có ít chữ số hơn thì số đó BÉ hơn (ví dụ 9 < 10).",
              "Bước 2 — hai số cùng số chữ số: so chữ số đầu tiên bên TRÁI trước; số nào có chữ số ấy lớn hơn thì số đó lớn hơn. Bằng nhau thì so chữ số tiếp theo.",
              "Ví dụ: 2020 có 4 chữ số, 13 có 2 chữ số — số nào có ít chữ số hơn thì bé hơn.",
              "Số liền sau = số đó thêm 1; số liền trước = số đó bớt 1."
            ]
          }
        },
        {
          type: "quiz",
          content: {
            question: "Số liền sau của số 13 là số nào?",
            options: [13, 14, 15, 23],
            answer: 14,
            mascotHint: "Số liền sau hơn số đã cho 1 đơn vị: 13 + 1 = 14."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Số nào LỚN NHẤT trong các số sau: 13, 2020, 5, 1?",
            options: ["1", "5", "13", "2020"],
            answer: "2020",
            mascotHint: "Bé so chữ số đầu tiên bên trái của các số, bằng nhau thì so chữ số tiếp theo — số lớn nhất là 2020."
          }
        },
        {
          type: "quiz",
          content: {
            question:
              "Số nào dưới đây làm tròn đến hàng trăm nghìn thì được 200 000?",
            options: ["149 000", "190 001", "250 001", "284 910"],
            answer: "190 001",
            mascotHint:
              "190 001 có hàng chục nghìn là 9 (≥ 5) nên làm tròn lên: 200 000. Còn 149 000 → 100 000; 250 001 và 284 910 → 300 000.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Làm tròn số 3 365 200 đến hàng trăm nghìn ta được số nào?",
            options: ["3 300 000", "3 400 000", "3 000 000", "3 500 000"],
            answer: "3 400 000",
            mascotHint:
              "Hàng chục nghìn là 6 (≥ 5) nên làm tròn lên: 3 400 000.",
          },
        },
        {
          type: "numberLineAnswer",
          content: {
            question: "Kéo con trỏ tới số làm tròn đúng",
            expression: "4 600 ≈",
            answer: 5000,
            min: 4000,
            max: 6000,
            step: 500,
            mascotHint: "4 600 vượt qua mốc giữa 4 500 nên làm tròn đến hàng nghìn là 5 000.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Làm tròn đến hàng trăm nghìn: nhìn chữ số hàng chục nghìn.",
              "Bé hơn 5: làm tròn xuống. Từ 5 trở lên: làm tròn lên.",
              "Các hàng sau khi làm tròn đều thành 0.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c3-l5",
      title: "Bài 14: So sánh các số có nhiều chữ số",
      type: "learn",
      description:
        "So sánh hai số có nhiều chữ số: so số chữ số, rồi so từng hàng từ trái sang phải",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "thinking",
            text: "Việt nói: “37 003 847 và 23 938 399 có cùng số chữ số, mà 9 > 7 nên 23 938 399 lớn hơn!”. Bạn ấy nói sai ở đâu nhỉ? 🤔",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Cách so sánh hai số",
            explanation:
              "Muốn so sánh hai số, trước hết bé so số chữ số: số nào có nhiều chữ số hơn thì lớn hơn. Nếu hai số có cùng số chữ số, bé so từng cặp chữ số ở cùng một hàng, kể từ TRÁI sang PHẢI.",
            points: [
              "230 000 000 và 108 000 000 cùng chín chữ số: so hàng trăm triệu 2 > 1 nên 230 000 000 lớn hơn.",
              "37 003 847 > 23 938 399 vì hàng chục triệu 3 > 2 — không được so chữ số tận cùng!",
              "Có thể so một số với một tổng: 3 405 000 = 3 000 000 + 400 000 + 5 000.",
            ],
            rule: "So từ trái sang phải, hàng nào hơn thì số đó lớn hơn.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Điền dấu >, <, = thích hợp",
            table: {
              headers: ["So sánh", "Dấu", "Vì sao"],
              rows: [
                ["278 992 000 và 278 999", ">", "nhiều chữ số hơn"],
                ["200 000 000 và 99 999 999", ">", "chín chữ số > tám chữ số"],
                ["37 338 449 và 37 839 449", "<", "hàng trăm nghìn 3 < 8"],
                [
                  "3 405 000 và 3 000 000 + 400 000 + 5 000",
                  "=",
                  "tổng bằng đúng 3 405 000",
                ],
              ],
              label: "So sánh từng cặp chữ số cùng hàng",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Số lượng gia súc ở Việt Nam (Niên giám thống kê 2020)",
            table: {
              headers: ["Loại", "Số con"],
              rows: [
                ["Trâu", 2332800],
                ["Bò", 6230500],
                ["Lợn", 22027900],
              ],
              label: "Lợn nhiều nhất (22 027 900), trâu ít nhất (2 332 800)",
            },
          },
        },
        {
          type: "visual",
          content: {
            baseTen: {
              tens: 1,
              ones: 4
            },
            text: "14 gồm mấy chục và mấy đơn vị?\nBé đếm khối: 1 thanh chục và 4 ô rời\nVậy 14 = 1 chục và 4 đơn vị"
          }
        },
        {
          type: "concept",
          content: {
            badge: "Mẹo Nhớ",
            title: "So sánh hai số cho đúng",
            explanation: "Muốn biết số nào lớn hơn, bé làm hai bước sau — không cần đếm lại từ đầu.",
            points: [
              "Bước 1 — đếm số chữ số: số nào có ít chữ số hơn thì số đó BÉ hơn (ví dụ 9 < 10).",
              "Bước 2 — hai số cùng số chữ số: so chữ số đầu tiên bên TRÁI trước; số nào có chữ số ấy lớn hơn thì số đó lớn hơn. Bằng nhau thì so chữ số tiếp theo.",
              "Ví dụ: 14 có 2 chữ số, 9 có 1 chữ số — số nào có ít chữ số hơn thì bé hơn.",
              "Số liền sau = số đó thêm 1; số liền trước = số đó bớt 1."
            ]
          }
        },
        {
          type: "quiz",
          content: {
            question: "Số liền sau của số 14 là số nào?",
            options: [14, 15, 16, 24],
            answer: 15,
            mascotHint: "Số liền sau hơn số đã cho 1 đơn vị: 14 + 1 = 15."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Số nào LỚN NHẤT trong các số sau: 14, 9, 7, 2?",
            options: ["2", "7", "9", "14"],
            answer: "14",
            mascotHint: "Bé so chữ số đầu tiên bên trái của các số, bằng nhau thì so chữ số tiếp theo — số lớn nhất là 14."
          }
        },
        {
          type: "quiz",
          content: {
            question:
              "Trong ba loại gia súc trên, loại nào được nuôi nhiều nhất?",
            options: ["Trâu", "Bò", "Lợn", "Bò nhiều bằng trâu"],
            answer: "Lợn",
            mascotHint:
              "22 027 900 > 6 230 500 > 2 332 800 nên lợn nhiều nhất.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "So sánh 37 003 847 và 23 938 399, kết luận nào đúng?",
            options: [
              "37 003 847 > 23 938 399",
              "37 003 847 < 23 938 399",
              "Hai số bằng nhau",
              "Không so sánh được",
            ],
            answer: "37 003 847 > 23 938 399",
            mascotHint:
              "So từ trái sang phải: hàng chục triệu 3 > 2 ⇒ 37 003 847 lớn hơn. Không được so chữ số tận cùng!",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Số nào có nhiều chữ số hơn thì lớn hơn.",
              "Cùng số chữ số: so từng hàng từ trái sang phải.",
              "Đừng bao giờ so chữ số tận cùng để kết luận.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c3-l6",
      title: "Bài 15: Làm quen với dãy số tự nhiên",
      type: "learn",
      description:
        "Nhận biết dãy số tự nhiên; số tự nhiên bé nhất là 0; hai số tự nhiên liên tiếp hơn kém nhau 1 đơn vị",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Cú Mèo đếm mãi: 0, 1, 2, 3,… rồi hỏi: có số tự nhiên nào lớn nhất không? Rô-bốt lắc đầu: không có đâu, cứ thêm 1 là lại có số mới! 🔢",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Dãy số tự nhiên",
            explanation:
              "Các số 0, 1, 2, 3,… là các số tự nhiên. Sắp xếp theo thứ tự từ bé đến lớn ta được dãy số tự nhiên. Số tự nhiên bé nhất là 0, và không có số tự nhiên lớn nhất.",
            points: [
              "Dãy số tự nhiên: 0, 1, 2, 3, 4, 5,…",
              "Số tự nhiên bé nhất là 0; không có số tự nhiên lớn nhất.",
              "Hai số tự nhiên liên tiếp hơn kém nhau 1 đơn vị.",
              "Số liền trước bé hơn số đã cho 1 đơn vị; số liền sau lớn hơn 1 đơn vị.",
            ],
            rule: "Thêm 1 được số liền sau; bớt 1 được số liền trước.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Tìm số liền trước, số liền sau",
            table: {
              headers: ["Số đã cho", "Số liền trước", "Số liền sau"],
              rows: [
                [8, 7, 9],
                [100, 99, 101],
                [1000000, 999999, 1000001],
              ],
              label: "Liền trước: bớt 1 · Liền sau: thêm 1",
            },
          },
        },
        {
          type: "concept",
          content: {
            badge: "Mẹo Nhớ",
            title: "So sánh hai số bằng cách đếm",
            explanation: "Ở mức này, cách chắc chắn nhất là ĐẾM: số nào đếm đến sau thì số đó lớn hơn.",
            points: [
              "Đếm từ 1: “1, 2, 3, 4, 5…” — số đếm đến sau thì lớn hơn. Ví dụ 5 đến sau 2 nên 5 lớn hơn 2.",
              "Trên tia số, số đứng bên PHẢI lớn hơn số đứng bên TRÁI.",
              "Ba dấu cần nhớ: “>” đọc là lớn hơn, “<” đọc là bé hơn, “=” đọc là bằng nhau.",
              "Với hai số của bài này: 1 < 15, đọc là “1 bé hơn 15”."
            ]
          }
        },
        {
          type: "visual",
          content: {
            table: {
              headers: ["Bước", "Việc bé làm"],
              rows: [
                ["Bước 1 — Đơn vị", "viết kết quả luôn kèm đơn vị"],
                ["Bước 2 — Bậc thang", "đi xuống thì nhân, đi lên thì chia"],
                ["Bước 3 — Kiểm lại", "lấy kết quả đổi ngược lại xem có về số ban đầu"]
              ]
            },
            text: "Ba bước làm bài — bé làm lần lượt\nBé đọc bảng này trước khi làm, và đọc lại sau khi làm xong.\nBỏ một bước là bài dễ sai."
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
            question: "Số nào lớn hơn: 15 hay 1?",
            options: [1, 2, 3, 15],
            answer: 15,
            mascotHint: "Đếm từ 1: số 15 đếm đến sau số 1, nên 15 lớn hơn 1."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Số liền trước của 1 000 000 là số nào?",
            options: ["999 999", "1 000 001", "999 990", "100 000"],
            answer: "999 999",
            mascotHint: "Bớt 1 đơn vị: 1 000 000 − 1 = 999 999.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Ba số tự nhiên liên tiếp: 98, …, 100. Số còn thiếu là số nào?",
            options: ["97", "99", "101", "98"],
            answer: "99",
            mascotHint:
              "Hai số tự nhiên liên tiếp hơn kém nhau 1 đơn vị nên số giữa là 99.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Dãy số tự nhiên: 0, 1, 2, 3,…",
              "Số tự nhiên bé nhất là 0, không có số lớn nhất.",
              "Hai số tự nhiên liên tiếp hơn kém nhau 1 đơn vị.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c3-l7",
      title: "Bài 16: Luyện tập chung",
      type: "learn",
      description:
        "Ôn tập tổng hợp: hàng và lớp, so sánh số, làm tròn số, dãy số tự nhiên",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Hôm nay chúng mình ôn lại toàn bộ Chủ đề 3: hàng, lớp, so sánh số, làm tròn số và dãy số tự nhiên. Cùng làm thử thách của Rô-bốt nhé! 🤖",
          },
        },
        {
          type: "visual",
          content: {
            text: "Hoàn thành bảng: giá trị của chữ số theo hàng",
            table: {
              headers: ["Số", "Chữ số", "Giá trị"],
              rows: [
                [182729119, 8, "80 000 000"],
                [74810331, 4, "4 000 000"],
                [3037933, 3, "3 000 000"],
                [981381070, 9, "900 000 000"],
              ],
              label: "Giá trị = chữ số × giá trị của hàng",
            },
          },
        },
        {
          type: "visual",
          content: {
            baseTen: {
              tens: 1,
              ones: 6
            },
            text: "16 gồm mấy chục và mấy đơn vị?\nBé đếm khối: 1 thanh chục và 6 ô rời\nVậy 16 = 1 chục và 6 đơn vị"
          }
        },
        {
          type: "concept",
          content: {
            badge: "Mẹo Nhớ",
            title: "So sánh hai số cho đúng",
            explanation: "Muốn biết số nào lớn hơn, bé làm hai bước sau — không cần đếm lại từ đầu.",
            points: [
              "Bước 1 — đếm số chữ số: số nào có ít chữ số hơn thì số đó BÉ hơn (ví dụ 9 < 10).",
              "Bước 2 — hai số cùng số chữ số: so chữ số đầu tiên bên TRÁI trước; số nào có chữ số ấy lớn hơn thì số đó lớn hơn. Bằng nhau thì so chữ số tiếp theo.",
              "Ví dụ: 16 có 2 chữ số, 3 có 1 chữ số — số nào có ít chữ số hơn thì bé hơn.",
              "Số liền sau = số đó thêm 1; số liền trước = số đó bớt 1."
            ]
          }
        },
        {
          type: "quiz",
          content: {
            question: "Số liền sau của số 16 là số nào?",
            options: [16, 17, 18, 26],
            answer: 17,
            mascotHint: "Số liền sau hơn số đã cho 1 đơn vị: 16 + 1 = 17."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Số nào LỚN NHẤT trong các số sau: 16, 3, 7, 2?",
            options: ["2", "3", "7", "16"],
            answer: "16",
            mascotHint: "Bé so chữ số đầu tiên bên trái của các số, bằng nhau thì so chữ số tiếp theo — số lớn nhất là 16."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Số nào lớn nhất trong các số sau?",
            options: [
              "738 829 192",
              "391 130 031",
              "250 030 000",
              "222 222 222",
            ],
            answer: "738 829 192",
            mascotHint:
              "Cả bốn số đều chín chữ số, so hàng trăm triệu: 7 > 3 > 2 nên 738 829 192 lớn nhất.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Làm tròn số 451 900 đến hàng trăm nghìn ta được:",
            options: ["400 000", "450 000", "500 000", "460 000"],
            answer: "500 000",
            mascotHint: "Hàng chục nghìn là 5 nên làm tròn lên: 500 000.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Trong các số sau, số nào có hai chữ số ở lớp nghìn?",
            options: ["4 519", "100 000", "45 000", "115 806 715"],
            answer: "45 000",
            mascotHint:
              "45 000 có lớp nghìn gồm hai chữ số 4 và 5 (đọc là bốn mươi lăm nghìn).",
          },
        },
        {
          type: "visual",
          content: {
            text: "Số học sinh tiểu học tăng dần qua từng năm học",
            table: {
              headers: ["Năm học", "Số học sinh tiểu học"],
              rows: [
                ["2016 – 2017", 7801560],
                ["2017 – 2018", 8041842],
                ["2018 – 2019", 8541451],
                ["2019 – 2020", 8741545],
              ],
              label: "Sắp xếp lại theo thứ tự tăng dần",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Năm học nào có nhiều học sinh tiểu học nhất trong bảng trên?",
            options: [
              "2016 – 2017",
              "2017 – 2018",
              "2018 – 2019",
              "2019 – 2020",
            ],
            answer: "2019 – 2020",
            mascotHint:
              "8 741 545 là số lớn nhất trong bảng, thuộc năm học 2019 – 2020.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Cứ ba hàng là một lớp: đơn vị · nghìn · triệu.",
              "So sánh số: so từ hàng lớn nhất trở xuống.",
              "Làm tròn và tìm số liền trước, liền sau thành thạo.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
  ],
};
