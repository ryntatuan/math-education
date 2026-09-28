export const g5c9 = {
  id: "g5-c9",
  name: "Chủ đề 9: Diện tích và thể tích của một số hình khối",
  description:
    "Hình khai triển; diện tích xung quanh, diện tích toàn phần của hình hộp chữ nhật và hình lập phương; thể tích của hai hình đó",
  icon: "📦",
  color: "#7c3aed",
  totalLessons: 7,
  lessons: [
    {
      id: "g5-c9-l1",
      title:
        "Bài 49: Hình khai triển của hình lập phương, hình hộp chữ nhật và hình trụ",
      type: "learn",
      description:
        "Nhận biết hình khai triển của hình lập phương, hình hộp chữ nhật và hình trụ",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Cắt một chiếc hộp giấy rồi trải phẳng ra, Cú Mèo thấy 6 hình chữ nhật nối với nhau. Đó chính là hình khai triển của hình hộp! ✂️",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Hình khai triển",
            explanation:
              "Khi cắt một hình khối theo các cạnh rồi trải phẳng ra, ta được hình khai triển của hình khối đó. Từ hình khai triển, ta thấy rõ các mặt của hình khối.",
            points: [
              "Hình hộp chữ nhật có 6 mặt, nên hình khai triển gồm 6 hình chữ nhật.",
              "Hình lập phương có 6 mặt vuông bằng nhau.",
              "Hình trụ có hai mặt tròn (đáy) và một mặt cong — khi trải ra được một hình chữ nhật và hai hình tròn.",
            ],
            rule: "Hình khai triển cho thấy tất cả các mặt của hình khối.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Các mặt của hình hộp chữ nhật",
            solid: {
              kind: "cuboid",
              dims: { a: 5, b: 4, c: 3 },
              label: "Hình hộp chữ nhật",
              formula: "6 mặt: 2 mặt đáy và 4 mặt bên",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Hình khai triển của hình lập phương gồm mấy hình vuông?",
            options: [
              "6 hình vuông",
              "4 hình vuông",
              "8 hình vuông",
              "12 hình vuông",
            ],
            answer: "6 hình vuông",
            mascotHint: "Hình lập phương có 6 mặt là 6 hình vuông bằng nhau.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Hình trụ có những mặt nào?",
            options: [
              "Hai mặt tròn và một mặt cong",
              "Sáu mặt chữ nhật",
              "Sáu mặt vuông",
              "Bốn mặt tam giác",
            ],
            answer: "Hai mặt tròn và một mặt cong",
            mascotHint:
              "Hình trụ có hai đáy là hai hình tròn và mặt xung quanh là mặt cong.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Cắt và trải phẳng hình khối được hình khai triển.",
              "Hình hộp chữ nhật và hình lập phương có 6 mặt.",
              "Hình trụ có hai mặt tròn và một mặt cong.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g5-c9-l2",
      title:
        "Bài 50: Diện tích xung quanh và diện tích toàn phần của hình hộp chữ nhật",
      type: "learn",
      description:
        "Tính diện tích xung quanh và diện tích toàn phần của hình hộp chữ nhật",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "thinking",
            text: "Một chiếc hộp dài 5 cm, rộng 4 cm, cao 3 cm. Muốn dán giấy quanh hộp, cần biết diện tích xung quanh của hộp! 📦",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Diện tích xung quanh và toàn phần",
            explanation:
              "Diện tích xung quanh của hình hộp chữ nhật là tổng diện tích bốn mặt bên, bằng chu vi mặt đáy nhân với chiều cao. Diện tích toàn phần bằng diện tích xung quanh cộng với diện tích hai mặt đáy.",
            points: [
              "Sxq = (a + b) × 2 × c (a, b là chiều dài, chiều rộng; c là chiều cao).",
              "Stp = Sxq + a × b × 2.",
              "Ví dụ a = 5 cm, b = 4 cm, c = 3 cm: 5 + 4 = 9 (cm); 9 × 2 = 18 (cm); 18 × 3 = 54 (cm²).",
            ],
            rule: "Sxq = chu vi mặt đáy × chiều cao.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Hình hộp chữ nhật dài 5 cm, rộng 4 cm, cao 3 cm",
            solid: {
              kind: "cuboid",
              dims: { a: 5, b: 4, c: 3 },
              label: "Hình hộp chữ nhật",
              formula: "Sxq = chu vi đáy × cao = 18 × 3 = 54 (cm²)",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Tính diện tích của hình hộp chữ nhật",
            table: {
              headers: ["Đại lượng", "Phép tính", "Kết quả"],
              rows: [
                ["Chu vi mặt đáy", "(5 + 4) × 2", "18 cm"],
                ["Diện tích xung quanh", "18 × 3", "54 cm²"],
                ["Diện tích một mặt đáy", "5 × 4", "20 cm²"],
                ["Diện tích toàn phần", "54 + 20 × 2", "94 cm²"],
              ],
              label: "Stp = Sxq + diện tích hai đáy",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Hình hộp chữ nhật dài 5 cm, rộng 4 cm, cao 3 cm có diện tích xung quanh là:",
            options: ["54 cm²", "60 cm²", "27 cm²", "94 cm²"],
            answer: "54 cm²",
            mascotHint: "Sxq = (5 + 4) × 2 × 3 = 9 × 2 × 3 = 54 (cm²).",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Diện tích toàn phần của hình hộp đó là bao nhiêu?",
            options: ["94 cm²", "54 cm²", "74 cm²", "108 cm²"],
            answer: "94 cm²",
            mascotHint: "Stp = 54 + 5 × 4 × 2 = 54 + 40 = 94 (cm²).",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Sxq = (dài + rộng) × 2 × cao.",
              "Stp = Sxq + dài × rộng × 2.",
              "Ghi đơn vị là cm², m²…",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g5-c9-l3",
      title:
        "Bài 51: Diện tích xung quanh và diện tích toàn phần của hình lập phương",
      type: "learn",
      description:
        "Tính diện tích xung quanh và diện tích toàn phần của hình lập phương",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Một khối lập phương cạnh 3 cm có 4 mặt bên giống nhau, mỗi mặt 9 cm². Vậy diện tích xung quanh là 36 cm²! 🎲",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Diện tích của hình lập phương",
            explanation:
              "Hình lập phương có 6 mặt là 6 hình vuông bằng nhau. Diện tích xung quanh bằng diện tích một mặt nhân với 4. Diện tích toàn phần bằng diện tích một mặt nhân với 6.",
            points: [
              "Diện tích một mặt = a × a.",
              "Sxq = a × a × 4.",
              "Stp = a × a × 6.",
            ],
            rule: "Với hình lập phương: Sxq = a × a × 4; Stp = a × a × 6.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Hình lập phương cạnh 3 cm",
            solid: {
              kind: "cube",
              dims: { a: 3 },
              label: "Hình lập phương",
              formula: "Sxq = 3 × 3 × 4 = 36 cm²",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Hình lập phương cạnh 3 cm có diện tích xung quanh là:",
            options: ["36 cm²", "54 cm²", "27 cm²", "12 cm²"],
            answer: "36 cm²",
            mascotHint: "Sxq = 3 × 3 × 4 = 36 (cm²).",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Hình lập phương cạnh 3 cm có diện tích toàn phần là:",
            options: ["54 cm²", "36 cm²", "27 cm²", "45 cm²"],
            answer: "54 cm²",
            mascotHint: "Stp = 3 × 3 × 6 = 54 (cm²).",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Diện tích một mặt = a × a.",
              "Sxq = a × a × 4.",
              "Stp = a × a × 6.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g5-c9-l4",
      title: "Bài 52: Thể tích của hình hộp chữ nhật",
      type: "learn",
      description: "Tính thể tích hình hộp chữ nhật: V = a × b × c",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "thinking",
            text: "Muốn biết chiếc hộp chứa được bao nhiêu nước, cần tính thể tích. Hộp dài 5 cm, rộng 4 cm, cao 3 cm chứa được 60 cm³! 🚰",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Thể tích hình hộp chữ nhật",
            explanation:
              "Muốn tính thể tích hình hộp chữ nhật, ta lấy chiều dài nhân với chiều rộng rồi nhân với chiều cao (ba kích thước phải cùng đơn vị đo).",
            points: [
              "V = a × b × c.",
              "a = 5 cm, b = 4 cm, c = 3 cm ⇒ V = 5 × 4 × 3 = 60 cm³.",
              "Thể tích là số hình lập phương 1 cm³ xếp đầy trong hộp.",
            ],
            rule: "V = chiều dài × chiều rộng × chiều cao.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Thể tích hình hộp chữ nhật",
            solid: {
              kind: "cuboid",
              dims: { a: 5, b: 4, c: 3 },
              label: "Hình hộp chữ nhật",
              formula: "V = 5 × 4 × 3 = 60 cm³",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Hình hộp chữ nhật dài 5 cm, rộng 4 cm, cao 3 cm có thể tích là:",
            options: ["60 cm³", "54 cm³", "12 cm³", "94 cm³"],
            answer: "60 cm³",
            mascotHint: "V = 5 × 4 × 3 = 60 (cm³).",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Một bể cá dài 6 dm, rộng 4 dm, cao 3 dm. Thể tích bể cá là:",
            options: ["72 dm³", "24 dm³", "13 dm³", "144 dm³"],
            answer: "72 dm³",
            mascotHint: "V = 6 × 4 × 3 = 72 (dm³) = 72 lít nước.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "V = dài × rộng × cao.",
              "Ba kích thước cùng đơn vị đo.",
              "1 dm³ = 1 lít nên thể tích bể đổi ra lít rất tiện.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g5-c9-l5",
      title: "Bài 53: Thể tích của hình lập phương",
      type: "learn",
      description: "Tính thể tích hình lập phương: V = a × a × a",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Khối lập phương cạnh 3 cm: thể tích là 3 × 3 × 3 = 27 cm³. Nhớ công thức “cạnh nhân cạnh nhân cạnh”! 🎲",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Thể tích hình lập phương",
            explanation:
              "Hình lập phương có ba kích thước bằng nhau. Muốn tính thể tích hình lập phương, ta lấy cạnh nhân với cạnh rồi nhân với cạnh.",
            points: [
              "V = a × a × a.",
              "a = 3 cm ⇒ V = 3 × 3 × 3 = 27 cm³.",
              "a = 2 dm ⇒ V = 2 × 2 × 2 = 8 dm³.",
            ],
            rule: "V = cạnh × cạnh × cạnh.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Thể tích hình lập phương cạnh 3 cm",
            table: {
              headers: ["Đại lượng", "Phép tính", "Kết quả"],
              rows: [
                ["Diện tích một mặt", "3 × 3", "9 cm²"],
                ["Diện tích xung quanh", "9 × 4", "36 cm²"],
                ["Diện tích toàn phần", "9 × 6", "54 cm²"],
                ["Thể tích", "3 × 3 × 3", "27 cm³"],
              ],
              label: "Diện tích dùng cm², thể tích dùng cm³",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Hình lập phương cạnh 3 cm có thể tích là:",
            options: ["27 cm³", "9 cm³", "54 cm³", "36 cm³"],
            answer: "27 cm³",
            mascotHint: "V = 3 × 3 × 3 = 27 (cm³).",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Hình lập phương cạnh 2 dm có thể tích là:",
            options: ["8 dm³", "6 dm³", "4 dm³", "12 dm³"],
            answer: "8 dm³",
            mascotHint: "V = 2 × 2 × 2 = 8 (dm³).",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "V = cạnh × cạnh × cạnh.",
              "Diện tích dùng đơn vị cm²; thể tích dùng cm³.",
              "1 dm³ = 1 lít.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g5-c9-l6",
      title:
        "Bài 54: Thực hành tính toán và ước lượng thể tích một số hình khối",
      type: "learn",
      description: "Ứng dụng tính và ước lượng thể tích vào đồ vật quanh em",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Hộp sữa dài 5 cm, rộng 4 cm, cao 10 cm ⇒ thể tích 200 cm³. Xếp đầy hộp bằng các khối 1 cm³ sẽ cần 200 khối! 📦",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Thực Hành",
            title: "Tính và ước lượng thể tích",
            explanation:
              "Trong thực hành, ta đo ba kích thước của đồ vật rồi tính thể tích. Khi chưa đo chính xác, ta có thể ước lượng bằng cách làm tròn kích thước để biết thể tích khoảng bao nhiêu.",
            points: [
              "Đo chiều dài, chiều rộng, chiều cao cùng đơn vị.",
              "Tính thể tích theo công thức phù hợp với hình.",
              "Ước lượng bằng cách làm tròn các kích thước.",
            ],
            rule: "Thể tích của vật lớn dùng đơn vị lớn (m³, dm³).",
          },
        },
        {
          type: "visual",
          content: {
            text: "Tính thể tích một số đồ vật",
            table: {
              headers: ["Đồ vật", "Kích thước", "Thể tích"],
              rows: [
                ["Hộp sữa", "5 cm × 4 cm × 10 cm", "200 cm³"],
                ["Bể cá", "6 dm × 4 dm × 3 dm", "72 dm³"],
                ["Thùng hàng", "1 m × 0,8 m × 0,5 m", "0,4 m³"],
              ],
              label: "0,4 m³ = 400 dm³ = 400 lít",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Hộp có ba kích thước 5 cm, 4 cm và 10 cm. Thể tích của hộp là:",
            options: ["200 cm³", "19 cm³", "100 cm³", "40 cm³"],
            answer: "200 cm³",
            mascotHint: "V = 5 × 4 × 10 = 200 (cm³).",
          },
        },
        {
          type: "quiz",
          content: {
            question: "0,4 m³ bằng bao nhiêu lít?",
            options: ["400 lít", "40 lít", "4 000 lít", "4 lít"],
            answer: "400 lít",
            mascotHint: "0,4 m³ = 400 dm³ và 1 dm³ = 1 lít nên bằng 400 lít.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Đo rồi tính thể tích theo công thức.",
              "Đổi đơn vị thể tích cho phù hợp.",
              "Có thể ước lượng bằng cách làm tròn kích thước.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g5-c9-l7",
      title: "Bài 55: Luyện tập chung",
      type: "learn",
      description:
        "Luyện tập diện tích xung quanh, toàn phần và thể tích hình khối",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Cùng ôn lại tất cả công thức về hình hộp chữ nhật và hình lập phương nào! 🧠",
          },
        },
        {
          type: "visual",
          content: {
            text: "Bảng tổng hợp công thức hình khối",
            table: {
              headers: [
                "Hình",
                "Diện tích xung quanh",
                "Diện tích toàn phần",
                "Thể tích",
              ],
              rows: [
                [
                  "Hình hộp chữ nhật",
                  "(a + b) × 2 × c",
                  "Sxq + a × b × 2",
                  "a × b × c",
                ],
                ["Hình lập phương", "a × a × 4", "a × a × 6", "a × a × a"],
              ],
              label: "Ghi đúng đơn vị: cm² cho diện tích, cm³ cho thể tích",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Hình hộp chữ nhật dài 8 cm, rộng 5 cm, cao 4 cm có thể tích là:",
            options: ["160 cm³", "80 cm³", "104 cm³", "17 cm³"],
            answer: "160 cm³",
            mascotHint: "V = 8 × 5 × 4 = 160 (cm³).",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Hình lập phương cạnh 5 cm có diện tích toàn phần là:",
            options: ["150 cm²", "100 cm²", "125 cm²", "25 cm²"],
            answer: "150 cm²",
            mascotHint: "Stp = 5 × 5 × 6 = 150 (cm²).",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Hình lập phương cạnh 5 cm có thể tích là:",
            options: ["125 cm³", "150 cm³", "100 cm³", "25 cm³"],
            answer: "125 cm³",
            mascotHint: "V = 5 × 5 × 5 = 125 (cm³).",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Phân biệt diện tích xung quanh, toàn phần và thể tích.",
              "Dùng đúng công thức cho từng hình.",
              "Kiểm tra đơn vị của kết quả.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
  ],
};
