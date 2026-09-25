export const g3c8 = {
  id: "g3-c8",
  name: "Chủ đề 8: Các số đến 10 000",
  description:
    "Các số có bốn chữ số, số 10 000, so sánh số, chữ số La Mã, làm tròn số",
  icon: "💯",
  color: "#118ab2",
  totalLessons: 8,
  lessons: [
    {
      id: "g3-c8-l1",
      title: "Bài 1: Các số có bốn chữ số",
      type: "learn",
      description: "Nhận biết hàng nghìn, trăm, chục, đơn vị",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Một nghìn quyển vở là rất nhiều! Số 2 475 có tới bốn chữ số đấy 📚",
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
            badge: "Khám Phá",
            title: "Số có bốn chữ số",
            explanation:
              "Số có bốn chữ số gồm HÀNG NGHÌN, HÀNG TRĂM, HÀNG CHỤC và HÀNG ĐƠN VỊ.",
            rule: "Số 2 475 gồm 2 nghìn, 4 trăm, 7 chục và 5 đơn vị.",
            points: [
              "2 475 = 2 000 + 400 + 70 + 5.",
              "Chữ số tận cùng bên trái chỉ hàng nghìn.",
              "10 trăm = 1 nghìn.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "2 475\n2 → nghìn · 4 → trăm · 7 → chục · 5 → đơn vị",
            placeValue: {
              headers: ["Nghìn", "Trăm", "Chục", "Đơn vị"],
              digits: [2, 4, 7, 5],
              label: "2 475 gồm 2 nghìn, 4 trăm, 7 chục và 5 đơn vị",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Số 3 582 gồm mấy nghìn, mấy trăm, mấy chục, mấy đơn vị?",
            options: [
              "3 nghìn, 5 trăm, 8 chục, 2 đơn vị",
              "2 nghìn, 8 trăm, 5 chục, 3 đơn vị",
              "3 nghìn, 8 trăm, 5 chục, 2 đơn vị",
              "35 trăm và 82 đơn vị",
            ],
            answer: "3 nghìn, 5 trăm, 8 chục, 2 đơn vị",
            mascotHint:
              "Đọc từ trái sang: 3 là nghìn, 5 là trăm, 8 là chục, 2 là đơn vị.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Số có bốn chữ số gồm nghìn, trăm, chục, đơn vị.",
              "2 475 = 2 000 + 400 + 70 + 5.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g3-c8-l2",
      title: "Bài 2: Số 10 000",
      type: "learn",
      description: "Nhận biết 10 nghìn bằng 10 000",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Rô-bốt có 9 999 viên bi, được cho thêm 1 viên nữa. Có bao nhiêu viên nhỉ? 🔵",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Mười nghìn",
            explanation:
              "10 nghìn gộp lại thành 1 CHỤC NGHÌN. Số mười nghìn viết là 10 000.",
            rule: "10 000 = 10 nghìn. Đọc là: mười nghìn.",
            points: [
              "9 999 thêm 1 được 10 000.",
              "10 000 là số có năm chữ số đầu tiên.",
              "10 000 gồm 1 chục nghìn, 0 nghìn, 0 trăm, 0 chục, 0 đơn vị.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "9 999  —  10 000\n10 nghìn = 1 chục nghìn",
            placeValue: {
              headers: ["Chục nghìn", "Nghìn", "Trăm", "Chục", "Đơn vị"],
              digits: [1, 0, 0, 0, 0],
              label: "10 000 = 1 chục nghìn — đọc là mười nghìn",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Số liền sau của 9 999 là số nào?",
            options: [9998, 10000, 10001, 100000],
            answer: 10000,
            mascotHint: "9 999 thêm 1 được 10 000.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "10 000 gồm mấy chục nghìn?",
            options: [
              "1 chục nghìn",
              "10 chục nghìn",
              "0 chục nghìn",
              "100 chục nghìn",
            ],
            answer: "1 chục nghìn",
            mascotHint: "10 000 = 1 chục nghìn.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "10 000 = 10 nghìn = 1 chục nghìn.",
              "Số liền sau của 9 999 là 10 000.",
            ],
            mascotMood: "celebrate",
          },
        },
      ],
    },
    {
      id: "g3-c8-l3",
      title: "Bài 3: Đọc và viết số có bốn chữ số",
      type: "learn",
      description: "Đọc, viết số có bốn chữ số kể cả khi có chữ số 0",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Số 4 005 đọc thế nào nhỉ? Có hai chữ số 0 ở giữa đấy! ✏️",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Mẹo Nhớ",
            title: "Đọc số có bốn chữ số",
            explanation:
              "Bé đọc hàng nghìn, rồi hàng trăm, hàng chục, hàng đơn vị. Chữ số 0 ở giữa thì đọc là 'không' hoặc 'linh' tuỳ vị trí.",
            rule: "2 475 đọc là: hai nghìn bốn trăm bảy mươi lăm. 4 005 đọc là: bốn nghìn không trăm linh năm.",
            points: [
              "4 005: hàng trăm là 0 nên đọc 'không trăm'.",
              "4 050 đọc là: bốn nghìn không trăm năm mươi.",
              "4 500 đọc là: bốn nghìn năm trăm.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "2 475 → hai nghìn bốn trăm bảy mươi lăm",
            placeValue: {
              headers: ["Nghìn", "Trăm", "Chục", "Đơn vị"],
              digits: [4, 0, 0, 5],
              label: "4 005 đọc là bốn nghìn không trăm linh năm",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "4 005 → bốn nghìn không trăm linh năm",
            table: {
              headers: ["Số", "Đọc là"],
              rows: [
                ["2 475", "hai nghìn bốn trăm bảy mươi lăm"],
                ["4 005", "bốn nghìn không trăm linh năm"],
              ],
              label: "Đọc và viết số có bốn chữ số",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Số 3 060 đọc là gì?",
            options: [
              "Ba nghìn không trăm sáu mươi",
              "Ba nghìn sáu mươi",
              "Ba nghìn sáu trăm",
              "Ba mươi nghìn sáu mươi",
            ],
            answer: "Ba nghìn không trăm sáu mươi",
            mascotHint: "Hàng trăm là 0 nên đọc 'không trăm'.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Đọc lần lượt nghìn, trăm, chục, đơn vị.",
              "Chữ số 0 ở hàng trăm thì đọc 'không trăm'.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g3-c8-l4",
      title: "Bài 4: So sánh các số trong phạm vi 10 000",
      type: "learn",
      description: "So sánh hai số có bốn chữ số theo từng hàng",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "3 456 và 3 465, số nào lớn hơn? Hai số này giống nhau quá! 🤔",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Mẹo Nhớ",
            title: "So từng hàng từ trái sang phải",
            explanation:
              "Bé so hàng NGHÌN trước. Bằng nhau thì so hàng TRĂM, rồi hàng CHỤC, rồi hàng ĐƠN VỊ.",
            rule: "3 456 và 3 465: nghìn bằng nhau (3 = 3), trăm bằng nhau (4 = 4), chục 5 < 6. Vậy 3 456 < 3 465.",
            points: [
              "Chỉ so tiếp khi hàng trước bằng nhau.",
              "Số có nhiều chữ số hơn thì lớn hơn: 10 000 > 9 999.",
              "4 500 > 3 999 vì 4 nghìn > 3 nghìn.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "3 456  <  3 465\n(3=3; 4=4; 5 < 6)",
            comparison: {
              left: 3456,
              sign: "<",
              right: 3465,
            },
            table: {
              headers: ["Hàng", "So sánh"],
              rows: [
                ["Nghìn", "3 = 3"],
                ["Trăm", "4 = 4"],
                ["Chục", "5 < 6"],
              ],
              label: "3 456 < 3 465 vì hàng chục 5 < 6",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Trong hai số 3 456 và 3 465, số nào lớn hơn?",
            options: [3456, 3465, "Hai số bằng nhau"],
            answer: 3465,
            mascotHint:
              "Nghìn và trăm bằng nhau, so chục: 5 < 6 nên 3 456 < 3 465.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Trong hai số 5 200 và 4 999, số nào lớn hơn?",
            options: [5200, 4999, "Hai số bằng nhau"],
            answer: 5200,
            mascotHint: "5 nghìn > 4 nghìn nên 5 200 > 4 999.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "So từ hàng nghìn sang hàng đơn vị.",
              "3 456 < 3 465; 5 200 > 4 999.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g3-c8-l5",
      title: "Bài 5: Làm quen với chữ số La Mã",
      type: "learn",
      description: "Nhận biết các chữ số La Mã thường dùng",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Trên mặt đồng hồ cổ có ghi I, II, III... Đó là chữ số La Mã đấy! 🕰️",
            clock: {
              hour: 8,
              minute: 0,
              roman: true,
            },
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Ba chữ số La Mã cơ bản",
            explanation:
              "CHỮ SỐ LA MÃ dùng các chữ cái để viết số. Ba chữ cái bé cần nhớ: I = 1, V = 5, X = 10.",
            rule: "I = 1 · V = 5 · X = 10.",
            points: [
              "I là một vạch: 1.",
              "V là hình chữ V: 5.",
              "X là hình chữ X: 10.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "I = 1   V = 5   X = 10",
            table: {
              headers: ["Chữ số La Mã", "Giá trị"],
              rows: [
                ["I", 1],
                ["V", 5],
                ["X", 10],
              ],
              label: "Làm quen với chữ số La Mã",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Chữ số La Mã V có giá trị là bao nhiêu?",
            options: [1, 5, 10, 50],
            answer: 5,
            mascotHint: "V = 5.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "I = 1; V = 5; X = 10.",
              "Chữ số La Mã dùng chữ cái để viết số.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g3-c8-l6",
      title: "Bài 6: Đọc và viết số La Mã từ I đến XII",
      type: "learn",
      description: "Đọc, viết các số La Mã thường dùng trên đồng hồ",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Bé đọc được hết các số La Mã trên mặt đồng hồ chưa? 🕐",
            clock: {
              hour: 8,
              minute: 0,
              roman: true,
            },
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Các số La Mã từ I đến XII",
            explanation:
              "Chữ I đứng trước X hoặc V thì bớt đi 1; đứng sau thì thêm vào.",
            rule: "I, II, III, IV, V, VI, VII, VIII, IX, X, XI, XII.",
            points: [
              "IV = 5 − 1 = 4 (I đứng trước V).",
              "VI = 5 + 1 = 6 (I đứng sau V).",
              "IX = 10 − 1 = 9.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "I II III IV V VI VII VIII IX X XI XII\n1  2   3   4 5  6   7    8  9 10 11 12",
            table: {
              headers: [
                "I",
                "II",
                "III",
                "IV",
                "V",
                "VI",
                "VII",
                "VIII",
                "IX",
                "X",
                "XI",
                "XII",
              ],
              rows: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]],
              label: "Chữ số La Mã từ I đến XII — dùng để ghi giờ và số thứ tự",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Số La Mã IV có giá trị là bao nhiêu?",
            options: [4, 6, 5, 9],
            answer: 4,
            mascotHint: "I đứng trước V nên bớt 1: 5 − 1 = 4.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Số 9 viết bằng chữ số La Mã thế nào?",
            options: ["VIIII", "IX", "XI", "IV"],
            answer: "IX",
            mascotHint: "I đứng trước X nên 10 − 1 = 9 → IX.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "IV = 4; VI = 6; IX = 9; XI = 11.",
              "Chữ I đứng trước thì bớt 1, đứng sau thì thêm 1.",
            ],
            mascotMood: "celebrate",
          },
        },
      ],
    },
    {
      id: "g3-c8-l7",
      title: "Bài 7: Làm tròn số đến hàng chục, hàng trăm",
      type: "learn",
      description: "Làm tròn số theo chữ số bên phải",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Có 24 bạn, nói 'khoảng 20 bạn' hay 'khoảng 30 bạn' gần đúng hơn nhỉ? 🤔",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Mẹo Nhớ",
            title: "Quy tắc làm tròn",
            explanation:
              "Bé nhìn chữ số ĐỨNG NGAY SAU hàng cần làm tròn. Nếu chữ số đó là 1, 2, 3, 4 thì làm tròn XUỐNG. Nếu là 5, 6, 7, 8, 9 thì làm tròn LÊN.",
            rule: "24 làm tròn đến hàng chục: chữ số sau hàng chục là 4 < 5 nên làm tròn xuống → 20. 27 → 30 (vì 7 ≥ 5).",
            points: [
              "1, 2, 3, 4 → làm tròn xuống.",
              "5, 6, 7, 8, 9 → làm tròn lên.",
              "Làm tròn đến hàng trăm thì nhìn chữ số hàng chục.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "LÀM TRÒN ĐẾN HÀNG CHỤC",
            numberLine: {
              from: 20,
              to: 30,
              step: 1,
              marks: [20, 24, 25, 30],
              hops: [
                {
                  from: 24,
                  to: 20,
                  label: "24 → 20",
                },
                {
                  from: 27,
                  to: 30,
                  label: "27 → 30",
                },
              ],
              label: "Làm tròn đến hàng chục: 24 → 20, 27 → 30",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "24 → 20   (hàng đơn vị 4 < 5: xuống)\n27 → 30   (hàng đơn vị 7 ≥ 5: lên)",
            table: {
              headers: ["Số đã cho", "Làm tròn hàng chục"],
              rows: [
                ["24", "20 (vì 4 < 5: xuống)"],
                ["27", "30 (vì 7 ≥ 5: lên)"],
              ],
              label: "Làm tròn đến HÀNG CHỤC: nhìn chữ số hàng đơn vị",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "LÀM TRÒN ĐẾN HÀNG TRĂM",
            numberLine: {
              from: 300,
              to: 400,
              step: 20,
              marks: [300, 320, 360, 400],
              hops: [
                {
                  from: 320,
                  to: 300,
                  label: "320 → 300",
                },
                {
                  from: 360,
                  to: 400,
                  label: "360 → 400",
                },
              ],
              label: "Làm tròn đến hàng trăm: 320 → 300, 360 → 400",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "320 → 300 (hàng chục 2 < 5: xuống)\n360 → 400 (hàng chục 6 ≥ 5: lên)",
            table: {
              headers: ["Số đã cho", "Làm tròn hàng trăm"],
              rows: [
                ["320", "300 (vì hàng chục 2 < 5: xuống)"],
                ["360", "400 (vì hàng chục 6 ≥ 5: lên)"],
              ],
              label: "Làm tròn đến HÀNG TRĂM: nhìn chữ số hàng chục",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Làm tròn số 24 đến hàng chục ta được số nào?",
            options: [20, 25, 30, 14],
            answer: 20,
            mascotHint: "Chữ số sau hàng chục là 4 < 5 nên làm tròn xuống: 20.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Làm tròn số 360 đến hàng trăm ta được số nào?",
            options: [300, 350, 400, 360],
            answer: 400,
            mascotHint: "Chữ số hàng chục là 6 ≥ 5 nên làm tròn lên: 400.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "1–4 thì làm tròn xuống; 5–9 thì làm tròn lên.",
              "24 → 20; 360 → 400.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g3-c8-l8",
      title: "Bài 8: Luyện tập chung chủ đề 8",
      type: "learn",
      description: "Ôn tập số đến 10 000, chữ số La Mã và làm tròn",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Bé đã biết số đến 10 000 rồi! Tổng kết nhé 🎉",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Tổng kết chủ đề 8",
            explanation:
              "Bé đã học số có bốn chữ số, số 10 000, chữ số La Mã và làm tròn số.",
            points: [
              "2 475 = 2 000 + 400 + 70 + 5.",
              "10 000 = 1 chục nghìn.",
              "IV = 4; IX = 9.",
              "Làm tròn: 1–4 xuống, 5–9 lên.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "2 475 = 2 000 + 400 + 70 + 5",
            placeValue: {
              headers: ["Nghìn", "Trăm", "Chục", "Đơn vị"],
              digits: [2, 4, 7, 5],
              label: "2 475 = 2 000 + 400 + 70 + 5",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "27 → 30",
            table: {
              headers: ["Làm tròn", "Được"],
              rows: [
                ["27 đến hàng chục", "30"],
                ["24 300 đến hàng nghìn", "24 000"],
              ],
              label: "Luyện tập chung chủ đề 8",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Số 6 408 gồm mấy nghìn, mấy trăm, mấy chục, mấy đơn vị?",
            options: [
              "6 nghìn, 4 trăm, 0 chục, 8 đơn vị",
              "6 nghìn, 0 trăm, 4 chục, 8 đơn vị",
              "6 nghìn, 4 trăm, 8 chục, 0 đơn vị",
              "64 trăm và 8 đơn vị",
            ],
            answer: "6 nghìn, 4 trăm, 0 chục, 8 đơn vị",
            mascotHint: "6 408: 6 nghìn, 4 trăm, 0 chục, 8 đơn vị.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Làm tròn số 47 đến hàng chục ta được số nào?",
            options: [40, 45, 50, 47],
            answer: 50,
            mascotHint: "Chữ số 7 ≥ 5 nên làm tròn lên: 50.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Bé đã hoàn thành chủ đề 8.",
              "6 408 = 6 nghìn 4 trăm 0 chục 8 đơn vị; 47 → 50.",
            ],
            mascotMood: "celebrate",
          },
        },
      ],
    },
  ],
};
