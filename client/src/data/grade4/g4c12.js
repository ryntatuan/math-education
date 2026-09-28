export const g4c12 = {
  id: "g4-c12",
  name: "Chủ đề 12: Phép nhân, phép chia phân số",
  description:
    "Nhân, chia hai phân số; tìm phân số của một số và luyện tập chung",
  icon: "✖️",
  color: "#06b6d4",
  totalLessons: 4,
  lessons: [
    {
      id: "g4-c12-l1",
      title: "Bài 63: Phép nhân phân số",
      type: "learn",
      description: "Nhân hai phân số: tử số nhân tử số, mẫu số nhân mẫu số",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "thinking",
            text: "Một tấm bìa hình vuông được chia thành các ô nhỏ. Muốn tô 2/3 rồi lại tô 4/5 của phần đó, Cú Mèo phải nhân hai phân số! 🟦",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Nhân hai phân số",
            explanation:
              "Muốn nhân hai phân số, ta lấy tử số nhân với tử số, mẫu số nhân với mẫu số. Trước khi nhân, nếu tử số và mẫu số của hai phân số cùng chia hết cho một số thì ta rút gọn để tính dễ hơn.",
            points: [
              "2/3 × 4/5 = (2 × 4)/(3 × 5) = 8/15.",
              "Rút gọn chéo trước khi nhân: 3/4 × 8/9 = (3 × 8)/(4 × 9) = 2/3.",
              "Kết quả luôn rút gọn về phân số tối giản.",
            ],
            rule: "Tử nhân tử, mẫu nhân mẫu.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Nhân phân số",
            table: {
              headers: ["Phép tính", "Tử × tử, mẫu × mẫu", "Kết quả"],
              rows: [
                ["2/3 × 4/5", "(2 × 4)/(3 × 5)", "8/15"],
                ["1/2 × 3/7", "(1 × 3)/(2 × 7)", "3/14"],
                ["3/4 × 8/9", "rút gọn chéo rồi nhân", "2/3"],
                ["5/6 × 6/5", "tử và mẫu bằng nhau", 1],
              ],
              label: "Có thể rút gọn trước khi nhân để kết quả gọn ngay",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Tính: 2/3 × 4/5 = ?",
            options: ["8/15", "6/8", "8/8", "6/15"],
            answer: "8/15",
            mascotHint: "Tử: 2 × 4 = 8; mẫu: 3 × 5 = 15 ⇒ 8/15.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Tính: 3/4 × 8/9 = ?",
            options: ["2/3", "24/36", "11/13", "3/9"],
            answer: "2/3",
            mascotHint: "(3 × 8)/(4 × 9) = 24/36; rút gọn cho 12 được 2/3.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Nhân tử với tử, mẫu với mẫu.",
              "Rút gọn chéo để tính nhanh hơn.",
              "Đưa kết quả về phân số tối giản.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c12-l2",
      title: "Bài 64: Phép chia phân số",
      type: "learn",
      description:
        "Chia hai phân số bằng cách nhân với phân số đảo ngược",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Muốn chia 3/4 cho 2/5, Rô-bốt không chia trực tiếp mà lấy 3/4 nhân với phân số đảo ngược của 2/5 là 5/2. Vì sao lại làm được thế nhỉ? 🤔",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Chia hai phân số",
            explanation:
              "Muốn chia một phân số cho một phân số, ta nhân phân số thứ nhất với phân số thứ hai đảo ngược (đổi chỗ tử số và mẫu số).",
            points: [
              "3/4 : 2/5 = 3/4 × 5/2 = 15/8.",
              "Phân số đảo ngược của 2/5 là 5/2 (5/2 × 2/5 = 1).",
              "Số tự nhiên cũng viết được thành phân số: 2 = 2/1 nên 5/6 : 2 = 5/12.",
            ],
            rule: "Chia là nhân với phân số đảo ngược.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Chia phân số",
            table: {
              headers: ["Phép tính", "Đảo ngược rồi nhân", "Kết quả"],
              rows: [
                ["3/4 : 2/5", "3/4 × 5/2", "15/8"],
                ["1/2 : 3/7", "1/2 × 7/3", "7/6"],
                ["5/6 : 2", "5/6 × 1/2", "5/12"],
                ["4/9 : 4/9", "4/9 × 9/4", 1],
              ],
              label: "Phân số nhân với phân số đảo ngược của nó luôn bằng 1",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Tính: 3/4 : 2/5 = ?",
            options: ["15/8", "6/20", "8/15", "15/20"],
            answer: "15/8",
            mascotHint: "3/4 × 5/2 = 15/8.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Phân số đảo ngược của 7/3 là phân số nào?",
            options: ["3/7", "7/3", "1/7", "3/1"],
            answer: "3/7",
            mascotHint: "Đảo ngược là đổi chỗ tử số và mẫu số: 7/3 → 3/7.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Chia là nhân với phân số đảo ngược.",
              "Phân số đảo ngược: đổi chỗ tử số và mẫu số.",
              "Rút gọn kết quả rồi kết luận.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c12-l3",
      title: "Bài 65: Tìm phân số của một số",
      type: "learn",
      description:
        "Tìm phân số của một số bằng hai bước: chia cho mẫu số rồi nhân với tử số",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Rổ có 9 quả cam. Cú Mèo lấy ra 2/3 số cam đó. Lấy ra bao nhiêu quả? Ta chia 9 thành 3 phần rồi lấy 2 phần! 🍊",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Tìm phân số của một số",
            explanation:
              "Muốn tìm một phần mấy của một số, ta chia số đó cho mẫu số để biết giá trị một phần, rồi nhân với tử số để biết số phần cần lấy.",
            points: [
              "2/3 của 9: 9 : 3 = 3 (một phần), 3 × 2 = 6.",
              "3/5 của 20: 20 : 5 = 4, 4 × 3 = 12.",
              "Cũng có thể viết gọn: 2/3 của 9 = 9 × 2 : 3 = 6.",
            ],
            rule: "Chia cho mẫu số rồi nhân với tử số.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Tìm phân số của một số",
            table: {
              headers: ["Bài toán", "Một phần", "Kết quả"],
              rows: [
                ["2/3 của 9", "9 : 3 = 3", 6],
                ["3/5 của 20", "20 : 5 = 4", 12],
                ["1/4 của 32", "32 : 4 = 8", 8],
                ["5/8 của 40", "40 : 8 = 5", 25],
              ],
              label: "Giá trị một phần × tử số = số cần tìm",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "2/3 của 9 quả cam là bao nhiêu quả?",
            options: ["6 quả", "3 quả", "9 quả", "12 quả"],
            answer: "6 quả",
            mascotHint: "9 : 3 = 3 rồi 3 × 2 = 6 (quả cam).",
          },
        },
        {
          type: "quiz",
          content: {
            question: "3/5 của 20 kg là bao nhiêu ki-lô-gam?",
            options: ["12 kg", "15 kg", "4 kg", "60 kg"],
            answer: "12 kg",
            mascotHint: "20 : 5 = 4 rồi 4 × 3 = 12 (kg).",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Chia số đó cho mẫu số.",
              "Nhân kết quả với tử số.",
              "Kiểm tra kết quả bé hơn số ban đầu.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c12-l4",
      title: "Bài 66: Luyện tập chung",
      type: "learn",
      description:
        "Ôn tập nhân, chia phân số và tìm phân số của một số",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Một mảnh vườn có diện tích 60 m², người ta trồng hoa trên 3/4 diện tích. Trồng hoa trên bao nhiêu mét vuông? 🌻",
          },
        },
        {
          type: "visual",
          content: {
            text: "Ôn tập nhân, chia phân số",
            table: {
              headers: ["Phép tính", "Kết quả"],
              rows: [
                ["2/7 × 3/4", "3/14"],
                ["5/6 : 2/3", "5/4"],
                ["3/4 của 60 m²", "45 m²"],
                ["2/5 của 15 l", "6 l"],
              ],
              label: "Tìm phân số của một số: chia mẫu rồi nhân tử",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Tính: 5/6 : 2/3 = ?",
            options: ["5/4", "10/18", "4/5", "5/9"],
            answer: "5/4",
            mascotHint: "5/6 × 3/2 = 15/12 = 5/4.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Một mảnh vườn rộng 60 m², trồng hoa trên 3/4 diện tích. Diện tích trồng hoa là:",
            options: ["45 m²", "20 m²", "15 m²", "80 m²"],
            answer: "45 m²",
            mascotHint: "60 : 4 = 15 rồi 15 × 3 = 45 (m²).",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Tính: 2/7 × 3/4 = ?",
            options: ["3/14", "6/28", "5/11", "6/11"],
            answer: "3/14",
            mascotHint: "(2 × 3)/(7 × 4) = 6/28; rút gọn cho 2 được 3/14.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Nhân: tử nhân tử, mẫu nhân mẫu.",
              "Chia: nhân với phân số đảo ngược.",
              "Tìm phân số của một số: chia mẫu, nhân tử.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
  ],
};
