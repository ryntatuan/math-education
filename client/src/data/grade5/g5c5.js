export const g5c5 = {
  id: "g5-c5",
  name: "Chủ đề 5: Một số hình phẳng. Chu vi và diện tích",
  description:
    "Hình tam giác, hình thang, đường tròn; diện tích hình tam giác, hình thang, chu vi và diện tích hình tròn; thực hành đo, vẽ, lắp ghép",
  icon: "📐",
  color: "#3b82f6",
  totalLessons: 5,
  lessons: [
    {
      id: "g5-c5-l1",
      title: "Bài 25: Hình tam giác. Diện tích hình tam giác",
      type: "learn",
      description:
        "Nhận biết hình tam giác và tính diện tích theo công thức S = a × h : 2",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Một lá cờ hình tam giác có đáy dài 12 cm và chiều cao 8 cm. Muốn biết diện tích, Cú Mèo dùng công thức S = a × h : 2. 📐",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Diện tích hình tam giác",
            explanation:
              "Hình tam giác có 3 cạnh và 3 đỉnh. Muốn tính diện tích hình tam giác, ta lấy độ dài đáy nhân với chiều cao (cùng một đơn vị đo) rồi chia cho 2.",
            points: [
              "S = a × h : 2 (a là độ dài đáy, h là chiều cao).",
              "a = 12 cm, h = 8 cm ⇒ S = 12 × 8 : 2 = 48 cm².",
              "Đáy và chiều cao phải cùng đơn vị đo.",
            ],
            rule: "S = đáy × chiều cao : 2",
          },
        },
        {
          type: "visual",
          content: {
            text: "Công thức diện tích hình tam giác",
            planeShape: {
              kind: "triangle",
              labels: ["đáy a", "chiều cao h"],
              formula: "S = a × h : 2",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Hình tam giác có độ dài đáy 12 cm và chiều cao 8 cm. Diện tích là:",
            options: ["48 cm²", "96 cm²", "20 cm²", "40 cm²"],
            answer: "48 cm²",
            mascotHint: "S = 12 × 8 : 2 = 96 : 2 = 48 (cm²).",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Hình tam giác có đáy 5 m và chiều cao 4 m. Diện tích là bao nhiêu?",
            options: ["10 m²", "20 m²", "9 m²", "40 m²"],
            answer: "10 m²",
            mascotHint: "S = 5 × 4 : 2 = 10 (m²).",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Tam giác có 3 cạnh, 3 đỉnh.",
              "S = đáy × chiều cao : 2",
              "Đổi về cùng đơn vị đo trước khi tính.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g5-c5-l2",
      title: "Bài 26: Hình thang. Diện tích hình thang",
      type: "learn",
      description:
        "Nhận biết hình thang và tính diện tích theo công thức S = (a + b) × h : 2",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "thinking",
            text: "Một thửa ruộng hình thang có đáy lớn 12 m, đáy bé 8 m, chiều cao 5 m. Diện tích là bao nhiêu? 🌾",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Diện tích hình thang",
            explanation:
              "Hình thang có một cặp cạnh đối diện song song gọi là hai đáy. Muốn tính diện tích hình thang, ta lấy tổng độ dài hai đáy nhân với chiều cao (cùng một đơn vị đo) rồi chia cho 2.",
            points: [
              "S = (a + b) × h : 2 với a là đáy lớn, b là đáy bé.",
              "Hình thang có đáy lớn 12 m, đáy bé 8 m, chiều cao 5 m thì 12 + 8 = 20 (m); 20 × 5 = 100 (m²); 100 : 2 = 50 (m²).",
              "Hình thang vuông có một cạnh bên vuông góc với hai đáy.",
            ],
            rule: "S = (đáy lớn + đáy bé) × chiều cao : 2",
          },
        },
        {
          type: "visual",
          content: {
            text: "Công thức diện tích hình thang",
            planeShape: {
              kind: "trapezoid",
              labels: ["đáy lớn a", "đáy bé b", "chiều cao h"],
              formula: "S = (a + b) × h : 2",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Hình thang có đáy lớn 12 cm, đáy bé 8 cm, chiều cao 5 cm. Diện tích là:",
            options: ["50 cm²", "100 cm²", "40 cm²", "48 cm²"],
            answer: "50 cm²",
            mascotHint: "S = (12 + 8) × 5 : 2 = 20 × 5 : 2 = 50 (cm²).",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Hình thang có đặc điểm gì?",
            options: [
              "Có một cặp cạnh đối diện song song",
              "Có bốn góc vuông",
              "Có bốn cạnh bằng nhau",
              "Có ba cạnh bằng nhau",
            ],
            answer: "Có một cặp cạnh đối diện song song",
            mascotHint: "Cặp cạnh song song đó là hai đáy của hình thang.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Hình thang có hai đáy song song.",
              "S = (đáy lớn + đáy bé) × chiều cao : 2",
              "Nhớ chia cho 2 ở cuối cùng.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g5-c5-l3",
      title: "Bài 27: Đường tròn. Chu vi và diện tích hình tròn",
      type: "learn",
      description:
        "Bán kính, đường kính; chu vi C = d × 3,14; diện tích S = r × r × 3,14",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Một cái nắp hộp hình tròn có bán kính 5 cm. Chu vi là 31,4 cm, diện tích là 78,5 cm². Số 3,14 thật kì diệu! ⭕",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Chu vi và diện tích hình tròn",
            explanation:
              "Hình tròn có tâm và bán kính r; đường kính d dài gấp đôi bán kính. Muốn tính chu vi hình tròn, ta lấy đường kính nhân với 3,14. Muốn tính diện tích hình tròn, ta lấy bán kính nhân với bán kính rồi nhân với 3,14.",
            points: [
              "C = d × 3,14 hoặc C = r × 2 × 3,14.",
              "S = r × r × 3,14.",
              "r = 5 cm ⇒ C = 31,4 cm; S = 5 × 5 × 3,14 = 78,5 cm².",
            ],
            rule: "Chu vi dùng đường kính (hoặc bán kính × 2); diện tích dùng bán kính × bán kính.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Hình tròn: tâm O, bán kính r, đường kính d = 2 × r",
            circleParts: {
              radius: 3,
              diameter: 6,
              showCenter: true,
              pointLabels: { center: "O" },
              radiusLabel: "bán kính r",
              diameterLabel: "đường kính d",
              label: "Chu vi C = d × 3,14 · Diện tích S = r × r × 3,14",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Hình tròn có bán kính 5 cm. Chu vi hình tròn là:",
            options: ["31,4 cm", "15,7 cm", "78,5 cm", "62,8 cm"],
            answer: "31,4 cm",
            mascotHint: "C = 5 × 2 × 3,14 = 10 × 3,14 = 31,4 (cm).",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Hình tròn có bán kính 5 cm. Diện tích hình tròn là:",
            options: ["78,5 cm²", "31,4 cm²", "15,7 cm²", "25 cm²"],
            answer: "78,5 cm²",
            mascotHint: "S = 5 × 5 × 3,14 = 25 × 3,14 = 78,5 (cm²).",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "d = 2 × r.",
              "C = d × 3,14 = r × 2 × 3,14.",
              "S = r × r × 3,14.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g5-c5-l4",
      title: "Bài 28: Thực hành và trải nghiệm đo, vẽ, lắp ghép, tạo hình",
      type: "learn",
      description:
        "Vận dụng kiến thức hình phẳng để đo, vẽ và ghép hình trong thực tế",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Cùng cắt giấy và ghép thành hình ngôi nhà, chiếc thuyền, con cá! Từ những hình phẳng đã học, em tạo được rất nhiều hình thú vị. ✂️",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Thực Hành",
            title: "Đo, vẽ, lắp ghép và tạo hình",
            explanation:
              "Trong thực hành, ta dùng thước để đo độ dài cạnh, ê-ke để kiểm tra góc vuông, compa để vẽ đường tròn. Từ các hình phẳng đã học, ta cắt và ghép lại thành hình mới.",
            points: [
              "Đo độ dài đáy và chiều cao trước khi tính diện tích.",
              "Vẽ đường tròn: đặt kim compa ở tâm, mở compa đúng bán kính.",
              "Ghép các hình tam giác, hình thang, hình tròn thành hình mới.",
            ],
            rule: "Chọn đúng dụng cụ đo cho từng việc.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Chuẩn bị đo và vẽ hình",
            table: {
              headers: ["Việc cần làm", "Dụng cụ"],
              rows: [
                ["Đo độ dài cạnh", "thước kẻ có vạch chia"],
                ["Kiểm tra góc vuông", "ê-ke"],
                ["Vẽ đường tròn", "compa"],
                ["Cắt hình để ghép", "kéo và giấy màu"],
              ],
              label: "Đo chính xác rồi mới tính toán",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Muốn vẽ một đường tròn có bán kính 4 cm, em làm thế nào?",
            options: [
              "Mở compa rộng 4 cm rồi quay quanh tâm",
              "Mở compa rộng 2 cm rồi quay quanh tâm",
              "Mở compa rộng 8 cm rồi quay quanh tâm",
              "Dùng thước kẻ vẽ một vòng tròn",
            ],
            answer: "Mở compa rộng 4 cm rồi quay quanh tâm",
            mascotHint: "Khoảng mở của compa chính là bán kính hình tròn.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Một tấm bìa hình chữ nhật dài 10 cm, rộng 6 cm được cắt thành hai hình tam giác bằng nhau. Diện tích mỗi hình tam giác là:",
            options: ["30 cm²", "60 cm²", "16 cm²", "15 cm²"],
            answer: "30 cm²",
            mascotHint: "Diện tích tấm bìa 10 × 6 = 60 cm²; mỗi tam giác chiếm một nửa: 60 : 2 = 30 cm².",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Dùng đúng dụng cụ: thước, ê-ke, compa.",
              "Đo chính xác trước khi tính.",
              "Ghép hình để tạo hình mới từ hình đã học.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g5-c5-l5",
      title: "Bài 29: Luyện tập chung",
      type: "learn",
      description:
        "Luyện tập tính diện tích hình tam giác, hình thang, chu vi và diện tích hình tròn",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Ba công thức cần nhớ: tam giác S = a × h : 2; hình thang S = (a + b) × h : 2; hình tròn S = r × r × 3,14. 📏",
          },
        },
        {
          type: "visual",
          content: {
            text: "Bảng tổng hợp công thức hình phẳng",
            table: {
              headers: ["Hình", "Công thức"],
              rows: [
                ["Tam giác", "S = đáy × chiều cao : 2"],
                ["Hình thang", "S = (đáy lớn + đáy bé) × chiều cao : 2"],
                ["Hình tròn (chu vi)", "C = d × 3,14"],
                ["Hình tròn (diện tích)", "S = r × r × 3,14"],
              ],
              label: "Nhớ đơn vị diện tích là cm², m²…",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Hình tam giác có đáy 9 m, chiều cao 6 m. Diện tích là:",
            options: ["27 m²", "54 m²", "15 m²", "30 m²"],
            answer: "27 m²",
            mascotHint: "9 × 6 : 2 = 54 : 2 = 27 (m²).",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Hình thang có đáy lớn 14 dm, đáy bé 6 dm, chiều cao 10 dm. Diện tích là:",
            options: ["100 dm²", "200 dm²", "120 dm²", "80 dm²"],
            answer: "100 dm²",
            mascotHint: "(14 + 6) × 10 : 2 = 20 × 10 : 2 = 100 (dm²).",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Hình tròn có đường kính 6 cm. Chu vi hình tròn là:",
            options: ["18,84 cm", "9,42 cm", "37,68 cm", "28,26 cm"],
            answer: "18,84 cm",
            mascotHint: "C = 6 × 3,14 = 18,84 (cm).",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Tam giác và hình thang: nhớ chia 2.",
              "Hình tròn: chu vi dùng d, diện tích dùng r × r.",
              "Ghi đúng đơn vị đo diện tích.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
  ],
};
