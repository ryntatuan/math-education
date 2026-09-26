export const g1c6 = {
  id: "g1-c6",
  name: "Chủ đề 6: Các số đến 100",
  description:
    "Số có hai chữ số, so sánh số có hai chữ số, bảng các số từ 1 đến 100",
  icon: "💯",
  color: "#4361ee",
  totalLessons: 12,
  lessons: [
    {
      id: "g1-c6-l1",
      title: "Bài 1: Mười và một chục",
      type: "learn",
      description: "Nhận biết 10 đơn vị gộp lại thành 1 chục",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Rô-bốt có 10 que tính rời. Bé bó lại thành một bó thì được gì nhỉ? 🧮",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "10 đơn vị = 1 chục",
            explanation: "Cứ 10 que tính rời bó lại thì được 1 BÓ CHỤC.",
            rule: "10 đơn vị = 1 chục. Một chục = 10.",
            points: [
              "Bó 10 que tính lại thành 1 chục.",
              "1 chục = 10 đơn vị.",
              "Cách bó chục giúp bé đếm nhanh hơn.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "||||||||||  (10 que rời)\n= 1 bó chục",
            baseTen: {
              tens: 1,
              ones: 0,
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "1 chục bằng bao nhiêu đơn vị?",
            options: [1, 5, 10, 100],
            answer: 10,
            mascotHint: "1 chục = 10 đơn vị.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: ["10 đơn vị = 1 chục.", "1 chục = 10."],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g1-c6-l2",
      title: "Bài 2: Các số từ 11 đến 20",
      type: "learn",
      description: "Đọc, viết các số từ 11 đến 20",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Một chục que tính và một que nữa thì được mấy que nhỉ? 🧮",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Các số từ 11 đến 20",
            explanation:
              "1 chục thêm 1 đơn vị là 11. Cứ thêm 1 đơn vị thì được số tiếp theo.",
            rule: "11 = 1 chục 1 đơn vị. 15 = 1 chục 5 đơn vị. 20 = 2 chục 0 đơn vị.",
            points: [
              "Đọc: mười một, mười hai, ..., mười chín, hai mươi.",
              "20 gồm 2 chục và 0 đơn vị.",
              "20 là số tròn chục.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "11 · 12 · 13 · 14 · 15 · 16 · 17 · 18 · 19 · 20",
            baseTen: {
              tens: 1,
              ones: 4,
              label: "14 gồm 1 chục và 4 đơn vị",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Các số từ 11 đến 20",
            numberLine: {
              from: 11,
              to: 20,
              step: 1,
              marks: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
              label: "Các số từ 11 đến 20",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Viết số và đọc số — bảng như SGK tr.4",
            table: {
              headers: ["Viết số", "Đọc số"],
              rows: [
                ["11", "mười một"],
                ["12", "mười hai"],
                ["13", "mười ba"],
                ["14", "mười bốn"],
                ["15", "mười lăm"],
                ["16", "mười sáu"],
                ["17", "mười bảy"],
                ["18", "mười tám"],
                ["19", "mười chín"],
                ["20", "hai mươi"],
              ],
              label: "Đọc từng số: mười một, mười hai… đến hai mươi",
            },
          },
        },
        {
          /**
           * SGK tr.5 (hoạt động 3): dãy số 1 → 20 vòng quanh con chim cánh cụt, có 4 ô “?”.
           * Dãy 20 số KHÔNG vừa một hàng ⇒ bộ vẽ tự chia 2 hàng (xem `oRibbon`).
           */
          type: "visual",
          content: {
            text: "Số ? — dãy số từ 1 đến 20 (SGK tr.5)",
            numberScene: {
              mode: "numberTrain",
              kind: "ribbon",
              numbers: [
                1,
                2,
                3,
                null,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12,
                null,
                null,
                15,
                16,
                17,
                null,
                19,
                20,
              ],
              answers: [4, 13, 14, 18],
              note: "Bé đọc dãy số từ 1 đến 20 rồi điền những số còn thiếu.",
            },
          },
        },
        {
          /**
           * SGK tr.6 (luyện tập 1): 6 đoàn tàu, mỗi đoàn là một dãy số liền nhau còn thiếu số.
           * Đáp án đọc theo thứ tự trái → phải, trên → dưới.
           */
          type: "visual",
          content: {
            text: "Số ? — các đoàn tàu (SGK tr.6)",
            numberScene: {
              mode: "numberTrain",
              kind: "wagons",
              rows: [
                [10, 11, 12, "?", "?"],
                ["?", "?", 16, 17, 18],
                [12, 13, "?", "?", 16],
                [15, 16, 17, "?", "?"],
                [11, 12, "?", 14, "?"],
                [16, "?", 18, "?", 20],
              ],
              answers: [13, 14, 14, 15, 14, 15, 18, 19, 13, 15, 17, 19],
              note: "Mỗi đoàn tàu là một dãy số liền nhau — bé điền các số còn thiếu.",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Số 18 đọc là gì?",
            options: ["mười tám", "mười bảy", "tám mươi", "mười chín"],
            answer: "mười tám",
            mascotHint: "18 gồm 1 chục và 8 đơn vị, đọc là mười tám.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Số 15 gồm mấy chục và mấy đơn vị?",
            options: [
              "1 chục và 5 đơn vị",
              "5 chục và 1 đơn vị",
              "15 chục",
              "1 chục và 0 đơn vị",
            ],
            answer: "1 chục và 5 đơn vị",
            mascotHint: "15 = 1 chục + 5 đơn vị.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Sau số 19 là số nào?",
            options: [18, 20, 21, 90],
            answer: 20,
            mascotHint: "19 thêm 1 được 20.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: ["Các số từ 11 đến 20.", "15 = 1 chục 5 đơn vị."],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g1-c6-l3",
      title: "Bài 3: Các số tròn chục",
      type: "learn",
      description: "Nhận biết các số tròn chục từ 10 đến 100",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Các số 10, 20, 30... có gì đặc biệt nhỉ? Bé nhìn chữ số cuối nhé! 🔢",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Số tròn chục",
            explanation:
              "Số TRÒN CHỤC là số có hàng đơn vị bằng 0. Nó gồm một số nguyên chục.",
            rule: "Các số tròn chục: 10, 20, 30, 40, 50, 60, 70, 80, 90, 100.",
            points: [
              "Số tròn chục luôn tận cùng bằng chữ số 0.",
              "20 gồm 2 chục; 50 gồm 5 chục.",
              "100 gồm 10 chục.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "10 · 20 · 30 · 40 · 50 · 60 · 70 · 80 · 90 · 100",
            numberLine: {
              from: 10,
              to: 100,
              step: 10,
              marks: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
              label: "Các số tròn chục",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Số nào dưới đây là số tròn chục?",
            options: [15, 40, 44, 4],
            answer: 40,
            mascotHint: "40 có hàng đơn vị là 0 nên là số tròn chục.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "100 gồm mấy chục?",
            options: ["1 chục", "10 chục", "100 chục"],
            answer: "10 chục",
            mascotHint: "10 chục gộp lại được 100; 100 đọc là một trăm.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "50 gồm mấy chục?",
            options: ["5 chục", "50 chục", "1 chục", "0 chục"],
            answer: "5 chục",
            mascotHint: "50 = 5 chục.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: ["Số tròn chục tận cùng bằng 0.", "10, 20, ..., 90, 100."],
            mascotMood: "celebrate",
          },
        },
      ],
    },
    {
      id: "g1-c6-l4",
      title: "Bài 4: Hàng chục và hàng đơn vị",
      type: "learn",
      description: "Phân biệt chữ số hàng chục và chữ số hàng đơn vị",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Số 34 có hai chữ số. Chữ số nào chỉ chục, chữ số nào chỉ đơn vị? 🔍",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Chục và đơn vị",
            explanation:
              "Trong số có hai chữ số, chữ số ĐỨNG TRƯỚC chỉ HÀNG CHỤC, chữ số ĐỨNG SAU chỉ HÀNG ĐƠN VỊ.",
            rule: "Số 34 gồm 3 chục và 4 đơn vị. Đọc là: ba mươi tư.",
            points: [
              "34 = 30 + 4.",
              "Số 40 gồm 4 chục và 0 đơn vị.",
              "Số 5 gồm 0 chục và 5 đơn vị.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "34",
            placeValue: {
              headers: ["Chục", "Đơn vị"],
              digits: [3, 4],
              label: "34 gồm 3 chục và 4 đơn vị",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "3 → 3 chục\n4 → 4 đơn vị\n34 = 30 + 4",
            baseTen: {
              tens: 3,
              ones: 4,
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Số 52 gồm mấy chục và mấy đơn vị?",
            options: [
              "5 chục và 2 đơn vị",
              "2 chục và 5 đơn vị",
              "52 chục",
              "5 chục và 0 đơn vị",
            ],
            answer: "5 chục và 2 đơn vị",
            mascotHint: "Chữ số 5 chỉ chục, chữ số 2 chỉ đơn vị.",
          },
        },
        {
          "type": "visual",
          "content": {
            "text": "Số ? — mỗi số gồm mấy chục và mấy đơn vị (SGK tr.14)",
            "bangTinh": {
              "headers": [
                "Đọc chục và đơn vị",
                "Viết số"
              ],
              "rows": [
                [
                  "Số gồm 3 chục và 7 đơn vị",
                  null
                ],
                [
                  "Số gồm 5 chục và 0 đơn vị",
                  null
                ],
                [
                  "Số gồm 8 chục và 4 đơn vị",
                  null
                ]
              ],
              "answers": [
                37,
                50,
                84
              ],
              "options": [
                37,
                46,
                50,
                72,
                84,
                91
              ],
              "title": "Bé chọn số điền vào ô ?",
              "hint": "3 chục là 30, thêm 7 đơn vị nữa là 37.",
              "label": "Đọc số chục và số đơn vị rồi viết thành số có hai chữ số"
            }
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Số ? — bảng các số từ 0 đến 99 còn thiếu số nào? (SGK tr.14)",
            "numberScene": {
              "mode": "numberTrain",
              "kind": "ribbon",
              "numbers": [
                60,
                61,
                62,
                null,
                null,
                null,
                null,
                67,
                68,
                69,
                70,
                71,
                72,
                null,
                null,
                null,
                null,
                77,
                78,
                79,
                80,
                81,
                82,
                null,
                null,
                null,
                null,
                87,
                88,
                89
              ],
              "answers": [
                63,
                64,
                65,
                66,
                73,
                74,
                75,
                76,
                83,
                84,
                85,
                86
              ],
              "options": [
                63,
                64,
                65,
                66,
                73,
                74,
                75,
                76,
                83,
                84,
                85,
                86
              ],
              "note": "Bảng số đi theo hàng: mỗi hàng mười số liền nhau. Bé tìm những số còn thiếu."
            }
          }
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Chữ số đầu chỉ hàng chục, chữ số sau chỉ hàng đơn vị.",
              "34 = 3 chục 4 đơn vị = 30 + 4.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g1-c6-l5",
      title: "Bài 5: Đọc và viết số có hai chữ số",
      type: "learn",
      description: "Đọc, viết số có hai chữ số theo chục và đơn vị",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Số 45 đọc thế nào nhỉ? Bé cùng Rô-bốt đọc nhé! ✏️",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Mẹo Nhớ",
            title: "Đọc số có hai chữ số",
            explanation:
              "Bé đọc SỐ CHỤC rồi đọc 'mươi', sau đó đọc số đơn vị. Riêng 1 chục thì đọc là 'mười'.",
            rule: "45 đọc là: bốn mươi lăm. 51 đọc là: năm mươi mốt. 15 đọc là: mười lăm.",
            points: [
              "45 = 4 chục 5 đơn vị → bốn mươi lăm.",
              "15 = 1 chục 5 đơn vị → mười lăm (không đọc 'mười năm').",
              "34 đọc là: ba mươi tư.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "45 → bốn mươi lăm\n51 → năm mươi mốt\n15 → mười lăm",
            placeValue: {
              headers: ["Chục", "Đơn vị"],
              digits: [4, 5],
              label: "45 đọc là bốn mươi lăm",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Số 45 đọc là gì?",
            options: ["Bốn mươi lăm", "Bốn lăm", "Năm mươi tư", "Bốn mươi năm"],
            answer: "Bốn mươi lăm",
            mascotHint: "4 chục 5 đơn vị đọc là bốn mươi lăm.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Số 'năm mươi mốt' được viết thế nào?",
            options: [15, 51, 50, 501],
            answer: 51,
            mascotHint: "Năm mươi (5 chục) mốt (1 đơn vị) → 51.",
          },
        },
        {
          "type": "quiz",
          "content": {
            "question": "Con cá ghi “mười bốn” — đó là số nào? (SGK tr.15)",
            "options": [
              14,
              42,
              58,
              76
            ],
            "answer": 14,
            "mascotHint": "Mười bốn gồm 1 chục và 4 đơn vị nên viết là 14."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Con cá ghi “bảy mươi sáu” — đó là số nào?",
            "options": [
              76,
              67,
              93,
              42
            ],
            "answer": 76,
            "mascotHint": "Bảy mươi sáu gồm 7 chục và 6 đơn vị nên viết là 76."
          }
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Đọc số chục rồi 'mươi', sau đó đọc số đơn vị.",
              "45 đọc là bốn mươi lăm.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g1-c6-l6",
      title: "Bài 6: So sánh số có hai chữ số",
      type: "learn",
      description:
        "Nhận biết số nào lớn hơn, số nào bé hơn khi cả hai số đều có hai chữ số",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "34 và 43, số nào lớn hơn? Hai số này có cùng các chữ số đấy! 🤔",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Mẹo Nhớ",
            title: "So hàng chục trước",
            explanation:
              "Bé so chữ số hàng CHỤC trước. Nếu bằng nhau thì mới so chữ số hàng ĐƠN VỊ.",
            rule: "34 và 43: 3 chục bé hơn 4 chục, nên 34 < 43.",
            points: [
              "Chục khác nhau thì xong ngay.",
              "25 và 27: cùng 2 chục, so đơn vị 5 < 7 nên 25 < 27.",
              "Số có nhiều chữ số hơn thì lớn hơn: 100 > 99.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "34  <  43\n3 chục < 4 chục",
            comparison: {
              left: 34,
              sign: "<",
              right: 43,
            },
            table: {
              headers: ["So sánh", "Vì sao"],
              rows: [
                ["34 < 43", "3 chục bé hơn 4 chục"],
                ["43 > 34", "4 chục lớn hơn 3 chục"],
              ],
              label: "So sánh số có hai chữ số: so hàng chục trước",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Trong hai số 34 và 43, số nào lớn hơn?",
            options: [34, 43, "Hai số bằng nhau"],
            answer: 43,
            mascotHint: "4 chục lớn hơn 3 chục nên 43 > 34.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Trong hai số 25 và 27, số nào bé hơn?",
            options: [25, 27, "Hai số bằng nhau"],
            answer: 25,
            mascotHint: "Cùng 2 chục, so đơn vị: 5 < 7 nên 25 bé hơn.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "So hàng chục trước, rồi đến hàng đơn vị.",
              "34 < 43; 25 < 27.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g1-c6-l7",
      title: "Bài 7: Số lớn nhất, số bé nhất",
      type: "learn",
      description: "Tìm số lớn nhất và số bé nhất trong một nhóm số",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Bé hãy tìm số lớn nhất và số bé nhất trong các số này nhé: 12, 45, 7, 30! 🔍",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Mẹo Nhớ",
            title: "Số lớn nhất và bé nhất có hai chữ số",
            explanation:
              "Muốn tìm số lớn nhất trong một nhóm, bé so từng số một. Số lớn nhất có hai chữ số là 99; số bé nhất có hai chữ số là 10.",
            rule: "Số lớn nhất có hai chữ số: 99. Số bé nhất có hai chữ số: 10.",
            points: [
              "Số có nhiều chữ số hơn thì lớn hơn: 100 > 99.",
              "Số bé nhất có một chữ số là 0.",
              "So sánh từng cặp để tìm ra số lớn nhất và bé nhất.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Lớn nhất có 2 chữ số: 99\nBé nhất có 2 chữ số: 10",
            table: {
              headers: ["Câu hỏi", "Đáp số"],
              rows: [
                ["Số lớn nhất có hai chữ số", "99"],
                ["Số bé nhất có hai chữ số", "10"],
                ["Số lớn nhất có một chữ số", "9"],
              ],
              label: "Số lớn nhất và số bé nhất",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Số lớn nhất có hai chữ số là số nào?",
            options: [90, 98, 99, 100],
            answer: 99,
            mascotHint: "99 là số lớn nhất có hai chữ số; 100 đã có ba chữ số.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Số nào có hai chữ số giống nhau?",
            options: [23, 44, 45, 50],
            answer: 44,
            mascotHint: "44 có chữ số hàng chục và hàng đơn vị đều là 4.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Số tròn chục lớn nhất mà bé hơn 100 là số nào?",
            options: [80, 90, 99, 100],
            answer: 90,
            mascotHint:
              "Các số tròn chục bé hơn 100 là 10, 20, …, 90. Lớn nhất là 90.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Trong các số 12, 45, 7, 30, số nào lớn nhất?",
            options: [12, 45, 7, 30],
            answer: 45,
            mascotHint: "45 có 4 chục — lớn nhất trong bốn số.",
          },
        },
        {
          "type": "quiz",
          "content": {
            "question": "Lớp 1A có 33 học sinh, lớp 1B có 30 học sinh. Lớp nào có nhiều học sinh hơn? (SGK tr.21)",
            "options": [
              "Lớp 1A",
              "Lớp 1B",
              "Hai lớp bằng nhau"
            ],
            "answer": "Lớp 1A",
            "mascotHint": "33 và 30 cùng 3 chục; 3 đơn vị lớn hơn 0 đơn vị nên 33 > 30."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Lớp 1B có 30 học sinh, lớp 1C có 35 học sinh. Lớp nào có ít học sinh hơn?",
            "options": [
              "Lớp 1B",
              "Lớp 1C",
              "Hai lớp bằng nhau"
            ],
            "answer": "Lớp 1B",
            "mascotHint": "30 và 35 cùng 3 chục; 0 đơn vị bé hơn 5 đơn vị nên 30 < 35."
          }
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Số lớn nhất có hai chữ số là 99.",
              "Số bé nhất có hai chữ số là 10.",
            ],
            mascotMood: "celebrate",
          },
        },
      ],
    },
    {
      id: "g1-c6-l8",
      title: "Bài 8: Số liền trước, số liền sau",
      type: "learn",
      description: "Tìm số liền trước và liền sau của số có hai chữ số",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Số 34 có hai người hàng xóm. Bé đoán xem là số nào? 🏠",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Mẹo Nhớ",
            title: "Liền trước bớt 1, liền sau thêm 1",
            explanation:
              "Số liền trước bé hơn 1 đơn vị; số liền sau lớn hơn 1 đơn vị.",
            rule: "Số liền trước của 34 là 33. Số liền sau của 34 là 35.",
            points: [
              "Số liền trước của 20 là 19.",
              "Số liền sau của 99 là 100.",
              "Số liền sau của 9 là 10.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "33 — 34 — 35\nliền trước · chính nó · liền sau",
            numberLine: {
              from: 33,
              to: 35,
              step: 1,
              marks: [33, 34, 35],
              label: "33 là số liền trước của 34 · 35 là số liền sau của 34",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Số liền trước của 34 là số nào?",
            options: [33, 35, 24, 44],
            answer: 33,
            mascotHint: "34 bớt 1 được 33.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Số liền sau của 20 là số nào?",
            options: [19, 21, 30, 200],
            answer: 21,
            mascotHint: "20 thêm 1 được 21.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Liền trước: bớt 1. Liền sau: thêm 1.",
              "Liền trước 34 là 33; liền sau 34 là 35.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g1-c6-l9",
      title: "Bài 9: Bảng các số từ 1 đến 100",
      type: "learn",
      description: "Làm quen bảng 100 số và quy luật các hàng",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Đây là bảng 100 số! Bé nhìn xem các số được xếp theo quy luật gì nhé 📊",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Bảng các số từ 1 đến 100",
            explanation:
              "Bảng 100 số có 10 hàng, mỗi hàng 10 số. Đi sang phải thì thêm 1; đi xuống dưới thì thêm 10.",
            rule: "Đi sang phải: 21, 22, 23... Đi xuống dưới: 21, 31, 41...",
            points: [
              "Hàng cuối cùng là các số tròn chục: 10, 20, ..., 100.",
              "Số 100 ở cuối bảng.",
              "Mỗi hàng có 10 số.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "1  2  3  4  5  6  7  8  9  10\n11 12 13 ...            20\n21 22 23 ...            30",
            table: {
              headers: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
              rows: [
                [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
                [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
                [31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
                [41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
              ],
              label: "Bảng các số từ 1 đến 100 (năm chục đầu)",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Trong bảng 100 số, số nào đứng ngay dưới số 45?",
            options: [46, 55, 54, 35],
            answer: 55,
            mascotHint: "Xuống một hàng là thêm 10: 45 thêm 10 được 55.",
            table: {
              headers: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
              rows: [
                [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
                [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
                [31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
                [41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
              ],
              label: "Bảng các số từ 1 đến 100 (năm chục đầu)",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Trong bảng 100 số, đi xuống dưới một hàng thì số tăng thêm bao nhiêu?",
            options: [1, 9, 10, 100],
            answer: 10,
            mascotHint: "Mỗi hàng có 10 số nên xuống một hàng là thêm 10.",
            table: {
              headers: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
              rows: [
                [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
                [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
                [31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
                [41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
              ],
              label: "Bảng các số từ 1 đến 100 (năm chục đầu)",
            },
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Bảng 100 số có 10 hàng, mỗi hàng 10 số.",
              "Sang phải thêm 1; xuống dưới thêm 10.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g1-c6-l10",
      title: "Bài 10: Đếm thêm, đếm lùi trên bảng 100 số",
      type: "learn",
      description: "Đếm thêm 1, thêm 10 và đếm lùi trên bảng số",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Bé đặt ngón tay vào số 25 rồi đếm thêm 10 nhé! Đi xuống dưới một hàng 🎯",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Mẹo Nhớ",
            title: "Đếm thêm 1 và thêm 10",
            explanation:
              "Đếm thêm 1 thì đi sang phải một ô. Đếm thêm 10 thì đi xuống dưới một hàng.",
            rule: "Từ 25: thêm 1 được 26 (sang phải). Thêm 10 được 35 (xuống dưới).",
            points: [
              "Thêm 10 thì chữ số hàng chục tăng 1, hàng đơn vị giữ nguyên.",
              "Đếm lùi 1 thì đi sang trái.",
              "Đếm lùi 10 thì đi lên trên.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "25  →  26  (thêm 1)\n25  ↓  35  (thêm 10)",
            numberScene: {
              mode: "gridWalk",
              startAt: 25,
              note: "Thêm 1 thì sang phải 1 ô · thêm 10 thì xuống 1 hàng",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "25 thêm 10 bằng bao nhiêu?",
            options: [26, 35, 45, 2510],
            answer: 35,
            mascotHint:
              "Thêm 10: hàng chục tăng 1, hàng đơn vị giữ nguyên → 35.",
          },
        },
        {
          "type": "visual",
          "content": {
            "text": "Số ? — đếm thêm 1 (SGK tr.23)",
            "numberScene": {
              "mode": "numberTrain",
              "kind": "ribbon",
              "numbers": [
                30,
                31,
                32,
                null,
                34,
                null,
                null,
                37,
                null
              ],
              "answers": [
                33,
                35,
                36,
                38
              ],
              "note": "Mỗi số hơn số liền trước 1 đơn vị."
            }
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Số ? — đếm thêm 2 (SGK tr.23)",
            "numberScene": {
              "mode": "numberTrain",
              "kind": "ribbon",
              "numbers": [
                51,
                53,
                null,
                57,
                null,
                null,
                63,
                65,
                null
              ],
              "answers": [
                55,
                59,
                61,
                67
              ],
              "note": "Mỗi số hơn số liền trước 2 đơn vị."
            }
          }
        },
        {
          "type": "visual",
          "content": {
            "text": "Số ? — đếm thêm 2, dãy số lớn (SGK tr.23)",
            "numberScene": {
              "mode": "numberTrain",
              "kind": "ribbon",
              "numbers": [
                82,
                84,
                86,
                null,
                null,
                92,
                null,
                96,
                null
              ],
              "answers": [
                88,
                90,
                94,
                98
              ],
              "note": "Cả dãy đều cách nhau 2 đơn vị — bé đọc rồi điền số còn thiếu."
            }
          }
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Thêm 1 thì sang phải; thêm 10 thì xuống dưới.",
              "25 thêm 10 bằng 35.",
            ],
            mascotMood: "celebrate",
          },
        },
      ],
    },
    {
      id: "g1-c6-l11",
      title: "Bài 11: Tìm số còn thiếu trong dãy số",
      type: "learn",
      description: "Điền số còn thiếu vào dãy số theo quy luật",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Dãy số này bị thiếu mất một số: 30, 31, ..., 33. Bé tìm giúp nhé! 🔍",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Mẹo Nhớ",
            title: "Tìm quy luật của dãy số",
            explanation:
              "Bé xem hai số đứng cạnh nhau hơn kém nhau bao nhiêu, rồi áp dụng cho cả dãy.",
            rule: "30, 31, ..., 33: các số hơn kém nhau 1 đơn vị. Vậy số còn thiếu là 32.",
            points: [
              "Dãy cách nhau 1: 30, 31, 32, 33.",
              "Dãy cách nhau 10: 30, 40, 50, 60.",
              "Tìm ra quy luật rồi mới điền số.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "30 · 31 · ? · 33\nCách nhau 1 → ? = 32",
            numberLine: {
              from: 30,
              to: 33,
              step: 1,
              marks: [30, 31, 32, 33],
              label: "30 · 31 · ? · 33 — hai số cách nhau 1, nên ? = 32",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Điền số còn thiếu: 30, 31, ?, 33",
            options: [29, 32, 34, 40],
            answer: 32,
            mascotHint: "Các số hơn kém nhau 1, nên số còn thiếu là 32.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Điền số còn thiếu: 20, 30, ?, 50",
            options: [31, 35, 40, 45],
            answer: 40,
            mascotHint: "Các số hơn kém nhau 10, nên số còn thiếu là 40.",
          },
        },
        {
          "type": "visual",
          "content": {
            "text": "Số ? — hai hàng trong bảng các số từ 1 đến 100 (SGK tr.22)",
            "numberScene": {
              "mode": "numberTrain",
              "kind": "ribbon",
              "numbers": [
                51,
                52,
                53,
                null,
                55,
                56,
                null,
                58,
                59,
                60,
                71,
                null,
                73,
                74,
                75,
                null,
                null,
                78,
                79,
                80
              ],
              "answers": [
                54,
                57,
                72,
                76,
                77
              ],
              "note": "Hai hàng của bảng số: mỗi hàng mười số liền nhau."
            }
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Trong bảng các số từ 1 đến 100, số nào đứng ngay dưới số 23? (SGK tr.23)",
            "options": [
              23,
              33,
              43,
              24
            ],
            "answer": 33,
            "mascotHint": "Đi xuống một hàng là thêm 10: 23 + 10 = 33.",
            "numberScene": {
              "mode": "numberTrain",
              "kind": "ribbon",
              "numbers": [
                51,
                52,
                53,
                null,
                55,
                56,
                null,
                58,
                59,
                60,
                71,
                null,
                73,
                74,
                75,
                null,
                null,
                78,
                79,
                80
              ],
              "answers": [
                54,
                57,
                72,
                76,
                77
              ],
              "note": "Hai hàng của bảng số: mỗi hàng mười số liền nhau."
            }
          }
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Tìm quy luật trước khi điền số.",
              "30, 31, 32, 33 và 20, 30, 40, 50.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g1-c6-l12",
      title: "Bài 12: Luyện tập chung chủ đề 6",
      type: "learn",
      description: "Ôn tập các số đến 100",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Bé đã biết các số đến 100 rồi! Mình tổng kết nhé 🎉",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Tổng kết chủ đề 6",
            explanation:
              "Bé đã học: 1 chục = 10 đơn vị, các số từ 11 đến 100, hàng chục hàng đơn vị, so sánh số và bảng 100 số.",
            points: [
              "34 gồm 3 chục và 4 đơn vị.",
              "Số tròn chục tận cùng bằng 0.",
              "Số lớn nhất có hai chữ số là 99.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Mỗi thanh là 1 chục = 10 đơn vị.",
            baseTen: {
              tens: 3,
              ones: 4,
              label: "34 = 3 chục và 4 đơn vị",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "34 = 30 + 4\nLớn nhất 2 chữ số: 99",
            placeValue: {
              headers: ["Chục", "Đơn vị"],
              digits: [3, 4],
              label: "34 = 30 + 4",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Số 78 gồm mấy chục và mấy đơn vị?",
            options: [
              "7 chục và 8 đơn vị",
              "8 chục và 7 đơn vị",
              "78 chục",
              "7 chục và 0 đơn vị",
            ],
            answer: "7 chục và 8 đơn vị",
            mascotHint: "Chữ số 7 chỉ chục, chữ số 8 chỉ đơn vị.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Trong hai số 56 và 65, số nào bé hơn?",
            options: [56, 65, "Hai số bằng nhau"],
            answer: 56,
            mascotHint: "5 chục bé hơn 6 chục nên 56 < 65.",
          },
        },
        {
          "type": "quiz",
          "content": {
            "question": "“Sáu mươi hai” viết là số nào? (SGK tr.25)",
            "options": [
              26,
              62,
              60,
              72
            ],
            "answer": 62,
            "mascotHint": "Sáu mươi là 6 chục, thêm 2 đơn vị nên viết là 62."
          }
        },
        {
          "type": "quiz",
          "content": {
            "question": "Số gồm 5 chục và 1 đơn vị — viết là số nào?",
            "options": [
              15,
              51,
              50,
              501
            ],
            "answer": 51,
            "mascotHint": "5 chục là 50, thêm 1 đơn vị nữa là 51."
          }
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Bé đã hoàn thành chủ đề 6.",
              "78 = 7 chục 8 đơn vị; 56 < 65.",
            ],
            mascotMood: "celebrate",
          },
        },
      ],
    },
  ],
};
