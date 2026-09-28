export const g4c2 = {
  id: "g4-c2",
  name: "Chủ đề 2: Góc và đơn vị đo góc",
  description:
    "Làm quen với độ (đơn vị đo góc), cách đo góc bằng thước đo góc; nhận biết góc nhọn, góc vuông, góc tù, góc bẹt",
  icon: "📐",
  color: "#0ea5e9",
  totalLessons: 3,
  lessons: [
    {
      id: "g4-c2-l1",
      title: "Bài 7: Đo góc. Đơn vị đo góc",
      type: "learn",
      description:
        "Biết độ là đơn vị đo góc; biết cách đặt thước đo góc và đọc số đo của một góc",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Rô-bốt và Cú Mèo cùng ngắm hai góc: góc đỉnh O cạnh OA, OB và góc đỉnh P cạnh PM, PN. Muốn biết góc nào rộng hơn thì phải đo mới chắc được! 📐",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Độ — đơn vị đo góc",
            explanation:
              "Để đo góc ta dùng đơn vị là độ, viết kí hiệu là °. Góc đỉnh O cạnh OA, OB rộng bằng ba mươi độ thì số đo của góc đó là 30°.",
            points: [
              "Độ là đơn vị đo góc; viết tắt là °. Một độ viết là 1°.",
              "Đặt TÂM của thước đo góc trùng với ĐỈNH của góc.",
              "Đặt một cạnh của góc nằm trên đường kính (vạch số 0) của thước.",
              "Cạnh còn lại đi qua vạch nào thì số đo góc chính là số ghi ở vạch đó.",
            ],
            rule: "Muốn biết góc rộng bao nhiêu, bé đo bằng thước đo góc và đọc kết quả theo ĐƠN VỊ ĐỘ (°).",
          },
        },
        {
          type: "visual",
          content: {
            text: "Cách đo góc đỉnh O; cạnh OA, OB",
            angle: {
              kind: "acute",
              degrees: 30,
              vertexLetter: "O",
              armLetters: ["A", "B"],
              label: "Góc đỉnh O; cạnh OA, OB bằng 30°",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Cạnh OA đi qua vạch 70 trên thước đo góc",
            angle: {
              kind: "acute",
              degrees: 70,
              vertexLetter: "O",
              armLetters: ["C", "D"],
              label: "Góc đỉnh O; cạnh OC, OD bằng 70°",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Bốn góc của hình vuông ABCD",
            table: {
              headers: ["Góc", "Số đo"],
              rows: [
                ["Góc đỉnh A; cạnh AB, AD", "90°"],
                ["Góc đỉnh B; cạnh BA, BC", "90°"],
                ["Góc đỉnh C; cạnh CB, CD", "90°"],
                ["Góc đỉnh D; cạnh DA, DC", "90°"],
              ],
              label: "Bốn góc của hình vuông đều bằng 90°",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Đơn vị đo góc là gì?",
            options: [
              "Độ (°)",
              "Xăng-ti-mét (cm)",
              "Ki-lô-gam (kg)",
              "Giây (s)",
            ],
            answer: "Độ (°)",
            mascotHint: "Độ là đơn vị đo góc, kí hiệu là °.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Khi đo một góc bằng thước đo góc, bé đặt tâm của thước như thế nào?",
            options: [
              "Trùng với đỉnh của góc",
              "Trùng với một cạnh của góc",
              "Nằm ngoài góc",
              "Trùng với số 90 trên thước",
            ],
            answer: "Trùng với đỉnh của góc",
            mascotHint:
              "Tâm thước trùng đỉnh góc, một cạnh nằm trên vạch số 0 của thước.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Một cạnh của góc nằm ở vạch số 0, cạnh kia đi qua vạch ghi số 30. Số đo của góc là bao nhiêu?",
            options: ["3°", "30°", "60°", "90°"],
            answer: "30°",
            mascotHint: "Đọc đúng số ở vạch mà cạnh kia đi qua: 30°.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Đơn vị đo góc là độ, kí hiệu °.",
              "Đặt tâm thước trùng đỉnh góc, một cạnh trùng vạch 0.",
              "Đọc số đo ở vạch mà cạnh còn lại đi qua.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c2-l2",
      title: "Bài 8: Góc nhọn, góc tù, góc bẹt",
      type: "learn",
      description:
        "Nhận biết góc nhọn (bé hơn góc vuông), góc tù (lớn hơn góc vuông), góc bẹt (bằng hai góc vuông)",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "surprised",
            text: "Hai chiếc bút chì đặt trên bàn tạo thành hai góc: một góc hẹp, một góc rộng. Góc hẹp là góc nhọn, góc rộng là góc tù. Còn khi hai cạnh duỗi thẳng ra thì sao nhỉ? ✏️",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Bốn loại góc bé cần nhớ",
            explanation:
              "So với góc vuông, ta có: góc nhọn bé hơn góc vuông, góc tù lớn hơn góc vuông, còn góc bẹt thì bằng đúng hai góc vuông ghép lại.",
            points: [
              "Góc nhọn: bé hơn góc vuông (nhỏ hơn 90°).",
              "Góc vuông: bằng 90°.",
              "Góc tù: lớn hơn góc vuông (lớn hơn 90°).",
              "Góc bẹt: bằng hai góc vuông (180°) — hai cạnh duỗi thẳng thành một đường.",
            ],
            rule: "Nhìn vào độ mở của góc: hẹp hơn ê-ke là góc nhọn, rộng hơn là góc tù, duỗi thẳng là góc bẹt.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Góc nhọn đỉnh O; cạnh OA, OB",
            angle: {
              kind: "acute",
              degrees: 45,
              vertexLetter: "O",
              armLetters: ["A", "B"],
              label: "Góc nhọn bé hơn góc vuông",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Góc tù đỉnh O; cạnh OM, ON",
            angle: {
              kind: "obtuse",
              degrees: 130,
              vertexLetter: "O",
              armLetters: ["M", "N"],
              label: "Góc tù lớn hơn góc vuông",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Góc bẹt đỉnh O; cạnh OC, OD",
            angle: {
              kind: "straight",
              degrees: 180,
              vertexLetter: "O",
              armLetters: ["C", "D"],
              label: "Góc bẹt bằng hai góc vuông",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Hai kim đồng hồ tạo thành những góc nào?",
            table: {
              headers: ["Đồng hồ chỉ", "Góc tạo bởi hai kim"],
              rows: [
                ["2 giờ", "60° — góc nhọn"],
                ["3 giờ", "90° — góc vuông"],
                ["4 giờ", "120° — góc tù"],
                ["6 giờ", "180° — góc bẹt"],
              ],
              label: "Mỗi giờ, hai kim lại tạo một loại góc khác nhau",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Góc bẹt bằng mấy góc vuông?",
            options: [
              "Một góc vuông",
              "Hai góc vuông",
              "Ba góc vuông",
              "Nửa góc vuông",
            ],
            answer: "Hai góc vuông",
            mascotHint: "Hai góc vuông 90° ghép lại thành góc bẹt 180°.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Lúc 3 giờ đúng, kim giờ và kim phút tạo thành góc gì?",
            options: ["Góc nhọn", "Góc vuông", "Góc tù", "Góc bẹt"],
            answer: "Góc vuông",
            mascotHint:
              "Kim giờ chỉ số 3, kim phút chỉ số 12 — hai kim vuông góc với nhau (90°).",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Lúc 6 giờ đúng, kim giờ và kim phút tạo thành góc gì?",
            options: ["Góc nhọn", "Góc vuông", "Góc tù", "Góc bẹt"],
            answer: "Góc bẹt",
            mascotHint:
              "Kim giờ chỉ số 6, kim phút chỉ số 12 — hai kim duỗi thẳng thành góc bẹt 180°.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Góc nhọn bé hơn góc vuông; góc tù lớn hơn góc vuông.",
              "Góc bẹt bằng hai góc vuông (180°).",
              "Dùng ê-ke hoặc thước đo góc để kiểm tra cho chắc.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c2-l3",
      title: "Bài 9: Luyện tập chung",
      type: "learn",
      description:
        "Tìm góc nhọn, góc vuông, góc tù, góc bẹt trong hình vẽ và trong thực tế",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Hôm nay chúng mình đi tìm các loại góc trong hình vẽ, trên chiếc quạt xoè và cả trên mặt đồng hồ nhé! 🔍",
          },
        },
        {
          type: "visual",
          content: {
            text: "Quan sát rồi gọi tên các góc",
            table: {
              headers: ["Hình", "Loại góc", "Vì sao"],
              rows: [
                ["Góc đỉnh A; cạnh AB, AC", "góc nhọn", "hẹp hơn góc vuông"],
                ["Góc đỉnh M; cạnh MN, MP", "góc vuông", "bằng 90°"],
                ["Góc đỉnh E; cạnh EG, EH", "góc tù", "rộng hơn góc vuông"],
                ["Góc đỉnh K; cạnh KI, KL", "góc bẹt", "hai cạnh duỗi thẳng"],
              ],
              label: "Mỗi góc một tên gọi khác nhau",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Góc nhọn có số đo như thế nào so với góc vuông?",
            options: [
              "Bé hơn góc vuông",
              "Bằng góc vuông",
              "Lớn hơn góc vuông",
              "Bằng hai góc vuông",
            ],
            answer: "Bé hơn góc vuông",
            mascotHint: "Góc nhọn hẹp hơn góc vuông nên số đo bé hơn 90°.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Chiếc quạt xoè ra tạo thành một góc 120°. Đó là loại góc nào?",
            options: ["Góc nhọn", "Góc vuông", "Góc tù", "Góc bẹt"],
            answer: "Góc tù",
            mascotHint: "120° lớn hơn 90° nên là góc tù.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Trong hình chữ nhật, mỗi góc của hình là loại góc nào?",
            options: ["Góc nhọn", "Góc vuông", "Góc tù", "Góc bẹt"],
            answer: "Góc vuông",
            mascotHint: "Bốn góc của hình chữ nhật đều là góc vuông 90°.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Bé hãy tìm một thời điểm mà kim giờ và kim phút của đồng hồ tạo thành góc vuông (ngoài 3 giờ).",
            options: ["9 giờ", "6 giờ", "2 giờ", "4 giờ"],
            answer: "9 giờ",
            mascotHint:
              "Lúc 9 giờ, kim giờ chỉ số 9, kim phút chỉ số 12 — hai kim vuông góc (90°).",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Góc nhọn < góc vuông < góc tù < góc bẹt.",
              "Góc bẹt bằng hai góc vuông.",
              "Quan sát kĩ rồi mới kết luận loại góc.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
  ],
};
