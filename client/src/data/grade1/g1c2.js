export const g1c2 = {
  id: "g1-c2",
  name: "Chủ đề 2: Làm quen với một số hình phẳng",
  description:
    "Hình vuông, hình tròn, hình tam giác, hình chữ nhật; lắp ghép và xếp hình",
  icon: "🔷",
  color: "#f6c23e",
  totalLessons: 8,
  lessons: [
    {
      id: "g1-c2-l1",
      title: "Bài 1: Hình vuông",
      type: "learn",
      description: "Nhận biết hình vuông và các vật có dạng hình vuông",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Viên gạch hoa nhà Rô-bốt có bốn cạnh dài bằng nhau. Đó là hình gì nhỉ? 🔷",
            shapePicture: {
              kind: "brick",
              note: "Viên gạch hoa có dạng hình vuông",
            },
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Hình vuông",
            explanation: "HÌNH VUÔNG có 4 cạnh và 4 cạnh đều DÀI BẰNG NHAU.",
            rule: "Hình vuông có 4 cạnh dài bằng nhau.",
            points: [
              "Viên gạch hoa, ô cửa sổ vuông có dạng hình vuông.",
              "Bốn cạnh bằng nhau, không cạnh nào dài hơn cạnh nào.",
              "Đếm đỉnh: hình vuông có 4 đỉnh.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "▢\n4 cạnh dài bằng nhau · 4 đỉnh",
            planeShape: {
              kind: "square",
              labels: ["cạnh"],
              vertices: true,
              formula: "4 cạnh dài bằng nhau · 4 đỉnh",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Hình vuông có mấy cạnh?",
            options: [3, 4, 5, 6],
            answer: 4,
            mascotHint: "Hình vuông có 4 cạnh bằng nhau.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Đặc điểm nào đúng với hình vuông?",
            planeShape: { kind: "square" },
            options: [
              "Bốn cạnh dài bằng nhau",
              "Ba cạnh",
              "Đường bao cong",
              "Hai cạnh dài, hai cạnh ngắn",
            ],
            answer: "Bốn cạnh dài bằng nhau",
            mascotHint: "Hình vuông có 4 cạnh đều bằng nhau.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Hình vuông có 4 cạnh bằng nhau.",
              "Viên gạch hoa có dạng hình vuông.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g1-c2-l2",
      title: "Bài 2: Hình tròn",
      type: "learn",
      description: "Nhận biết hình tròn và các vật có dạng hình tròn",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Mặt đồng hồ tròn xoe, không có cạnh nào cả. Đó là hình gì nhỉ? ⭕",
            shapePicture: {
              kind: "clock",
              note: "Mặt đồng hồ có dạng hình tròn",
            },
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Hình tròn",
            explanation:
              "HÌNH TRÒN có đường bao CONG, khép kín, không có cạnh và không có đỉnh.",
            rule: "Hình tròn không có cạnh và không có đỉnh.",
            points: [
              "Bánh xe, mặt đồng hồ, cái đĩa có dạng hình tròn.",
              "Bánh xe có dạng hình tròn nên lăn được.",
              "Hình tròn khác hình vuông: không có cạnh, không có đỉnh.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "⭕\nĐường bao cong, không cạnh, không đỉnh",
            planeShape: {
              kind: "circle",
              formula: "Đường bao cong · không có cạnh, không có đỉnh",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Hình tròn có mấy cạnh?",
            planeShape: { kind: "circle" },
            options: [1, 2, 4, "Không có cạnh nào"],
            answer: "Không có cạnh nào",
            mascotHint: "Hình tròn không có cạnh, chỉ có đường bao cong.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Hình tròn có đường bao cong, không cạnh, không đỉnh.",
              "Bánh xe có dạng hình tròn.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g1-c2-l3",
      title: "Bài 3: Hình tam giác",
      type: "learn",
      description: "Nhận biết hình tam giác và các vật có dạng hình tam giác",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Mái nhà của Rô-bốt có ba cạnh. Bé đoán xem đó là hình gì? 🔺",
            shapePicture: {
              kind: "roof",
              note: "Mái nhà có dạng hình tam giác",
            },
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Hình tam giác",
            explanation: "HÌNH TAM GIÁC có 3 cạnh và 3 đỉnh.",
            rule: "Hình tam giác có 3 cạnh, 3 đỉnh.",
            points: [
              "'Tam' nghĩa là ba — hình tam giác có 3 cạnh.",
              "Mái nhà, biển báo giao thông có dạng tam giác.",
              "Đếm đỉnh: hình tam giác có 3 đỉnh.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "🔺\n3 cạnh · 3 đỉnh",
            planeShape: {
              kind: "triangle",
              labels: ["cạnh"],
              vertices: true,
              formula: "3 cạnh · 3 đỉnh",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Hình tam giác có mấy cạnh?",
            planeShape: { kind: "triangle" },
            options: [2, 3, 4, 5],
            answer: 3,
            mascotHint: "'Tam' là ba — hình tam giác có 3 cạnh.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Hình tam giác có 3 cạnh, 3 đỉnh.",
              "Mái nhà có dạng hình tam giác.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g1-c2-l4",
      title: "Bài 4: Hình chữ nhật",
      type: "learn",
      description: "Nhận biết hình chữ nhật và phân biệt với hình vuông",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Quyển sách của bé có bốn cạnh, nhưng hai cạnh dài hơn hai cạnh kia. Đó là hình gì? 📕",
            shapePicture: {
              kind: "book",
              note: "Quyển sách có dạng hình chữ nhật",
            },
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Hình chữ nhật",
            explanation:
              "HÌNH CHỮ NHẬT có 4 cạnh: hai cạnh DÀI bằng nhau và hai cạnh NGẮN bằng nhau.",
            rule: "Hình chữ nhật có 4 cạnh, 4 đỉnh. Hai cạnh dài bằng nhau, hai cạnh ngắn bằng nhau.",
            points: [
              "Quyển sách, cửa ra vào, mặt bàn có dạng hình chữ nhật.",
              "Hình chữ nhật khác hình vuông: 4 cạnh KHÔNG bằng nhau.",
              "Cả hai đều có 4 cạnh, 4 đỉnh.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "▭\n2 cạnh dài bằng nhau · 2 cạnh ngắn bằng nhau",
            planeShape: {
              kind: "rectangle",
              labels: ["chiều dài", "chiều rộng"],
              formula: "2 cạnh dài bằng nhau · 2 cạnh ngắn bằng nhau",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Hình chữ nhật khác hình vuông ở điểm nào?",
            planeShapes: [{ kind: "square" }, { kind: "rectangle" }],
            options: [
              "Bốn cạnh không bằng nhau, chỉ hai dài bằng nhau và hai ngắn bằng nhau",
              "Có ba cạnh",
              "Không có đỉnh",
              "Có đường bao cong",
            ],
            answer:
              "Bốn cạnh không bằng nhau, chỉ hai dài bằng nhau và hai ngắn bằng nhau",
            mascotHint:
              "Hình vuông có 4 cạnh bằng nhau; hình chữ nhật thì không.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Hình chữ nhật có 4 cạnh, 4 đỉnh.",
              "Hai cạnh dài bằng nhau, hai cạnh ngắn bằng nhau.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g1-c2-l5",
      title: "Bài 5: Nhận biết các hình trong đồ vật quanh em",
      type: "learn",
      description: "Tìm các hình đã học trong đồ vật thực tế",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Rô-bốt đi một vòng quanh nhà và tìm được rất nhiều hình! Bé cùng tìm nhé 🔍",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Thực Hành",
            title: "Hình ở quanh em",
            explanation:
              "Các hình phẳng có ở khắp nơi quanh bé. Bé nhìn và gọi tên hình của đồ vật.",
            rule: "Mặt đồng hồ tròn → hình tròn. Viên gạch vuông → hình vuông. Mái nhà → hình tam giác. Quyển sách → hình chữ nhật.",
            points: [
              "Hình tròn: bánh xe, cái đĩa, mặt đồng hồ.",
              "Hình vuông: viên gạch hoa, khung ảnh vuông.",
              "Hình tam giác: mái nhà, biển báo.",
              "Hình chữ nhật: cửa ra vào, mặt bàn, quyển sách.",
            ],
          },
        },
        {
          type: "quiz",
          content: {
            question: "Mặt đồng hồ có dạng hình gì?",
            shapePicture: { kind: "clock", showShape: false },
            options: [
              "Hình tròn",
              "Hình vuông",
              "Hình tam giác",
              "Hình chữ nhật",
            ],
            answer: "Hình tròn",
            mascotHint:
              "Mặt đồng hồ có đường bao cong, không có cạnh — đấy là hình tròn.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Viên gạch lát nền có dạng hình gì?",
            shapePicture: { kind: "brick", showShape: false },
            options: [
              "Hình vuông",
              "Hình tròn",
              "Hình chữ nhật",
              "Hình tam giác",
            ],
            answer: "Hình vuông",
            mascotHint: "Viên gạch có bốn cạnh dài bằng nhau — hình vuông.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Mái nhà có dạng hình gì?",
            shapePicture: { kind: "roof", showShape: false },
            options: [
              "Hình tam giác",
              "Hình vuông",
              "Hình tròn",
              "Hình chữ nhật",
            ],
            answer: "Hình tam giác",
            mascotHint: "Mái nhà có ba cạnh — hình tam giác.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Quyển sách có dạng hình gì?",
            shapePicture: { kind: "book", showShape: false },
            options: [
              "Hình chữ nhật",
              "Hình vuông",
              "Hình tam giác",
              "Hình tròn",
            ],
            answer: "Hình chữ nhật",
            mascotHint:
              "Quyển sách có hai cạnh dài và hai cạnh ngắn — hình chữ nhật.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Bé nhìn đồ vật và gọi tên hình của nó",
            table: {
              headers: ["Đồ vật", "Có dạng hình"],
              rows: [
                ["Mặt đồng hồ", "Hình tròn"],
                ["Viên gạch lát nền", "Hình vuông"],
                ["Mái nhà", "Hình tam giác"],
                ["Quyển sách", "Hình chữ nhật"],
              ],
              label: "Tìm hình trong đồ vật quanh em",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Bánh xe đạp có dạng hình gì?",
            shapePicture: {
              kind: "wheel",
              note: "Bánh xe có dạng hình tròn",
            },
            options: [
              "Hình tròn",
              "Hình vuông",
              "Hình tam giác",
              "Hình chữ nhật",
            ],
            answer: "Hình tròn",
            mascotHint: "Bánh xe tròn và lăn được — hình tròn.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Cửa ra vào của lớp học có dạng hình gì?",
            shapePicture: {
              kind: "door",
              note: "Cửa ra vào có dạng hình chữ nhật",
            },
            options: [
              "Hình chữ nhật",
              "Hình tròn",
              "Hình tam giác",
              "Hình vuông",
            ],
            answer: "Hình chữ nhật",
            mascotHint: "Cửa cao hơn bề ngang nên là hình chữ nhật.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Bé nhận ra hình tròn, hình vuông, hình tam giác, hình chữ nhật.",
              "Các hình có ở khắp nơi quanh bé.",
            ],
            mascotMood: "celebrate",
          },
        },
      ],
    },
    {
      id: "g1-c2-l6",
      title: "Bài 6: Thực hành lắp ghép, xếp hình",
      type: "learn",
      description: "Dùng các hình đã học để xếp thành hình mới",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Rô-bốt ghép hai hình tam giác thành một hình vuông! Bé thử xem được không nhé 🔷",
            shapeJoin: {
              piece: "rightTriangle",
              pieces: 2,
              note: "Hai tam giác vuông ghép lại thành một hình vuông",
            },
          },
        },
        {
          type: "concept",
          content: {
            badge: "Thực Hành",
            title: "Ghép hình",
            explanation:
              "Bé có thể ghép nhiều hình nhỏ thành một hình lớn hơn, hoặc cắt một hình thành nhiều hình nhỏ.",
            rule: "Hai hình tam giác ghép lại có thể được một hình vuông.",
            points: [
              "Ghép hai tam giác → một hình vuông.",
              "Ghép bốn hình vuông nhỏ → một hình vuông lớn.",
              "Dùng bộ xếp hình để thử nhiều cách khác nhau.",
            ],
            shapeJoin: {
              piece: "rightTriangle",
              pieces: 2,
              note: "Hai tam giác vuông ghép lại thành một hình vuông",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Ghép 2 tam giác vuông → 1 hình vuông",
            shapeJoin: {
              piece: "rightTriangle",
              pieces: 2,
              note: "Hai tam giác vuông ghép lại thành một hình vuông",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Ghép 4 hình vuông nhỏ → 1 hình vuông lớn",
            shapeJoin: {
              piece: "square",
              pieces: 4,
              note: "Bốn hình vuông nhỏ ghép lại thành một hình vuông lớn",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Hai hình tam giác giống nhau ghép lại có thể được hình gì?",
            options: [
              "Hình vuông",
              "Hình tròn",
              "Hình tam giác lớn hơn nữa",
              "Không được hình nào",
            ],
            answer: "Hình vuông",
            mascotHint: "Ghép hai tam giác giống nhau được một hình vuông.",
            shapeJoin: {
              piece: "rightTriangle",
              pieces: 2,
              showResult: false,
              note: "Hai tam giác vuông giống nhau — ghép lại sẽ được hình gì?",
            },
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Ghép hình nhỏ thành hình lớn.",
              "Hai tam giác ghép được một hình vuông.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g1-c2-l7",
      title: "Bài 7: Đếm hình trong một hình vẽ",
      type: "learn",
      description: "Đếm số hình đã học có trong một hình ghép",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Trong hình ngôi nhà này có bao nhiêu hình nhỉ? Bé đếm thật kĩ nhé! 🏠",
            shapePicture: {
              kind: "house",
              windows: 2,
              note: "Ngôi nhà có mái tam giác, thân chữ nhật và các cửa sổ vuông",
            },
          },
        },
        {
          type: "concept",
          content: {
            badge: "Mẹo Nhớ",
            title: "Đếm hình theo từng loại",
            explanation:
              "Hình ghép có nhiều hình nhỏ bên trong. Bé đếm lần lượt từng LOẠI hình để không sót.",
            rule: "Ngôi nhà: 1 mái là hình tam giác, 1 thân là hình chữ nhật, 2 cửa sổ là 2 hình vuông.",
            points: [
              "Đếm hình tam giác trước, rồi hình vuông, rồi hình chữ nhật.",
              "Đếm theo loại sẽ không bị sót.",
              "Đếm xong ghi số lượng từng loại.",
            ],
            shapePicture: {
              kind: "house",
              windows: 2,
              note: "Ngôi nhà có mái tam giác, thân chữ nhật và các cửa sổ vuông",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "🏠 → 1 hình tam giác (mái)\n     1 hình chữ nhật (thân)\n     2 hình vuông (2 cửa sổ)",
            shapePicture: {
              kind: "house",
              windows: 2,
              note: "1 hình tam giác (mái) · 1 hình chữ nhật (thân) · 2 hình vuông (2 cửa sổ)",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Ngôi nhà dưới đây có mái tam giác, thân chữ nhật và các cửa sổ vuông. Hỏi có mấy hình vuông?",
            shapePicture: {
              kind: "house",
              windows: 2,
              note: "Ngôi nhà gồm mái tam giác, thân chữ nhật và các cửa sổ vuông",
            },
            options: [1, 2, 3, 4],
            answer: 2,
            mascotHint: "Có 2 cửa sổ hình vuông.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Đếm hình theo từng loại để không sót.",
              "Ngôi nhà có 1 tam giác, 1 chữ nhật, 2 hình vuông.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g1-c2-l8",
      title: "Bài 8: Luyện tập chung chủ đề 2",
      type: "learn",
      description: "Ôn tập bốn hình phẳng đã học",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Bé đã biết bốn hình phẳng rồi! Mình tổng kết nhé 🎉",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Bốn hình phẳng",
            explanation:
              "Bé đã học hình vuông, hình tròn, hình tam giác và hình chữ nhật.",
            points: [
              "Hình vuông: 4 cạnh bằng nhau.",
              "Hình tròn: đường bao cong, không cạnh.",
              "Hình tam giác: 3 cạnh.",
              "Hình chữ nhật: 4 cạnh, hai dài bằng nhau và hai ngắn bằng nhau.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "▢ hình vuông · ⭕ hình tròn\n🔺 hình tam giác · ▭ hình chữ nhật",
            table: {
              headers: ["Hình", "Đặc điểm"],
              rows: [
                ["Hình vuông", "4 cạnh dài bằng nhau"],
                ["Hình tròn", "Đường bao cong, không cạnh"],
                ["Hình tam giác", "3 cạnh, 3 đỉnh"],
                ["Hình chữ nhật", "2 cạnh dài, 2 cạnh ngắn"],
              ],
              label: "Bốn hình phẳng bé đã học",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Hình nào có 3 cạnh?",
            planeShapes: [
              { kind: "rectangle", showName: false },
              { kind: "triangle", showName: false },
              { kind: "square", showName: false },
              { kind: "circle", showName: false },
            ],
            options: [
              "Hình tam giác",
              "Hình vuông",
              "Hình tròn",
              "Hình chữ nhật",
            ],
            answer: "Hình tam giác",
            mascotHint: "Hình tam giác có 3 cạnh.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Hình nào KHÔNG có cạnh nào?",
            planeShapes: [
              { kind: "circle", showName: false },
              { kind: "square", showName: false },
              { kind: "triangle", showName: false },
              { kind: "rectangle", showName: false },
            ],
            options: [
              "Hình tròn",
              "Hình vuông",
              "Hình tam giác",
              "Hình chữ nhật",
            ],
            answer: "Hình tròn",
            mascotHint: "Hình tròn chỉ có đường bao cong, không có cạnh.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Những hình nào là hình tròn?",
            planeShapes: [
              { kind: "square", label: "A", showName: false },
              { kind: "circle", label: "B", showName: false },
              { kind: "triangle", label: "C", showName: false },
              { kind: "rectangle", label: "D", showName: false },
              { kind: "circle", label: "E", showName: false },
            ],
            options: ["B và E", "B và C", "A và D", "C và D"],
            answer: "B và E",
            mascotHint:
              "Hình tròn có đường bao cong. Bé tìm xem hình nào cong tròn nhé.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Những hình nào là hình tam giác?",
            planeShapes: [
              { kind: "triangle", label: "A", showName: false },
              { kind: "square", label: "B", showName: false },
              { kind: "triangle", label: "C", showName: false },
              { kind: "circle", label: "D", showName: false },
              { kind: "rectangle", label: "E", showName: false },
            ],
            options: ["A và C", "A và B", "B và E", "C và D"],
            answer: "A và C",
            mascotHint:
              "Hình tam giác có ba cạnh. Hai hình A và C đều có ba cạnh.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Những hình nào KHÔNG là hình vuông?",
            planeShapes: [
              { kind: "square", label: "A", showName: false },
              { kind: "rectangle", label: "B", showName: false },
              { kind: "circle", label: "C", showName: false },
              { kind: "square", label: "D", showName: false },
              { kind: "triangle", label: "E", showName: false },
            ],
            options: ["B, C và E", "A và D", "B và D", "C và E"],
            answer: "B, C và E",
            mascotHint:
              "A và D là hình vuông (bốn cạnh dài bằng nhau) nên các hình còn lại không phải hình vuông.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Hình thích hợp đặt vào dấu ? — quy luật theo MÀU (SGK tr.55)",
            patternRow: {
              shapes: [
                "circle",
                "circle",
                "circle",
                "circle",
                "circle",
                "circle",
                "?",
                "circle",
                "circle",
              ],
              colors: [
                "#ef4444",
                "#facc15",
                "#38bdf8",
                "#ef4444",
                "#facc15",
                "#38bdf8",
                "#ef4444",
                "#facc15",
                "#38bdf8",
              ],
              answers: ["circle"],
              options: ["circle", "triangle", "square"],
              label: "Đỏ · vàng · xanh — lặp lại ba màu một lượt",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Dãy hình tròn lặp lại ba màu: đỏ, vàng, xanh. Hình tròn ở dấu ? có màu gì?",
            patternRow: {
              shapes: [
                "circle",
                "circle",
                "circle",
                "circle",
                "circle",
                "circle",
                "?",
                "circle",
                "circle",
              ],
              colors: [
                "#ef4444",
                "#facc15",
                "#38bdf8",
                "#ef4444",
                "#facc15",
                "#38bdf8",
                null,
                "#facc15",
                "#38bdf8",
              ],
            },
            options: ["Màu đỏ", "Màu vàng", "Màu xanh"],
            answer: "Màu đỏ",
            mascotHint: "Cứ ba hình là một lượt: đỏ, vàng, xanh rồi lại đỏ.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Hình thích hợp đặt vào dấu ? — quy luật theo HÌNH (SGK tr.55)",
            patternRow: {
              shapes: [
                "triangle",
                "circle",
                "square",
                "triangle",
                "circle",
                "square",
                "?",
                "circle",
                "square",
              ],
              answers: ["triangle"],
              options: ["triangle", "circle", "square"],
              label: "Tam giác · tròn · vuông — lặp lại ba hình một lượt",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Dãy hình lặp lại theo thứ tự: tam giác, tròn, vuông. Hình ở dấu ? là hình nào?",
            patternRow: {
              shapes: [
                "triangle",
                "circle",
                "square",
                "triangle",
                "circle",
                "square",
                "?",
                "circle",
                "square",
              ],
            },
            options: ["Hình tam giác", "Hình tròn", "Hình vuông"],
            answer: "Hình tam giác",
            mascotHint:
              "Cứ ba hình là một lượt: tam giác, tròn, vuông rồi lại tam giác.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Bốn hình phẳng: vuông, tròn, tam giác, chữ nhật.",
              "Bé đã hoàn thành chủ đề 2.",
            ],
            mascotMood: "celebrate",
          },
        },
      ],
    },
  ],
};
