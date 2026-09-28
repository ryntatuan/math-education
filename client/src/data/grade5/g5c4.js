export const g5c4 = {
  id: "g5-c4",
  name: "Chủ đề 4: Các phép tính với số thập phân",
  description:
    "Cộng, trừ, nhân, chia số thập phân; nhân chia với 10, 100, 1 000 và với 0,1; 0,01; 0,001",
  icon: "🧮",
  color: "#f59e0b",
  totalLessons: 6,
  lessons: [
    {
      id: "g5-c4-l1",
      title: "Bài 19: Phép cộng số thập phân",
      type: "learn",
      description:
        "Cộng hai số thập phân: đặt tính thẳng hàng, cộng như số tự nhiên rồi đặt dấu phẩy",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Cú Mèo mua 3,4 kg gạo rồi mua thêm 2,75 kg nữa. Cả hai lần mua bao nhiêu ki-lô-gam? 🍚",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Cộng hai số thập phân",
            explanation:
              "Muốn cộng hai số thập phân, ta viết số hạng này dưới số hạng kia sao cho các chữ số ở cùng một hàng thẳng cột với nhau, cộng như cộng số tự nhiên, rồi đặt dấu phẩy ở tổng thẳng cột với dấu phẩy của các số hạng.",
            points: [
              "3,4 viết thành 3,40 để hai số cùng số chữ số ở phần thập phân.",
              "3,4 + 2,75 = 3,40 + 2,75 = 6,15.",
              "Dấu phẩy của tổng thẳng cột với dấu phẩy của các số hạng.",
            ],
            rule: "Các chữ số cùng hàng phải thẳng cột với nhau.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Cộng số thập phân",
            table: {
              headers: ["Phép tính", "Cách làm", "Kết quả"],
              rows: [
                ["3,4 + 2,75", "viết 3,4 = 3,40", "6,15"],
                ["12,5 + 7,25", "thẳng hàng", "19,75"],
                ["0,25 + 0,5", "viết 0,5 = 0,50", "0,75"],
                ["4,8 + 12", "viết 12 = 12,0", "16,8"],
              ],
              label: "Có thể viết thêm chữ số 0 vào bên phải phần thập phân",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Tính: 3,4 + 2,75 = ?",
            options: ["6,15", "5,15", "6,09", "6,5"],
            answer: "6,15",
            mascotHint: "3,40 + 2,75 = 6,15.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Tính: 4,8 + 12 = ?",
            options: ["16,8", "12,48", "5,2", "16,08"],
            answer: "16,8",
            mascotHint: "12 = 12,0; 4,8 + 12,0 = 16,8.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Đặt tính cho các hàng thẳng cột.",
              "Cộng như số tự nhiên.",
              "Đặt dấu phẩy thẳng cột với các dấu phẩy trên.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g5-c4-l2",
      title: "Bài 20: Phép trừ số thập phân",
      type: "learn",
      description: "Trừ hai số thập phân theo quy tắc đặt tính thẳng hàng",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Một chai nước nặng 8,6 kg, vỏ chai nặng 2,45 kg. Nước trong chai nặng bao nhiêu? Phải trừ số thập phân! 🥤",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Trừ hai số thập phân",
            explanation:
              "Muốn trừ một số thập phân cho một số thập phân, ta viết số trừ dưới số bị trừ sao cho các chữ số ở cùng một hàng thẳng cột với nhau, trừ như trừ số tự nhiên, rồi đặt dấu phẩy ở hiệu thẳng cột với dấu phẩy của hai số.",
            points: [
              "8,6 − 2,45 = 8,60 − 2,45 = 6,15.",
              "15 − 3,7 = 15,0 − 3,7 = 11,3.",
              "Thử lại: hiệu + số trừ = số bị trừ.",
            ],
            rule: "Có thể viết thêm chữ số 0 để dễ trừ.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Trừ số thập phân",
            table: {
              headers: ["Phép tính", "Cách làm", "Kết quả"],
              rows: [
                ["8,6 − 2,45", "8,60 − 2,45", "6,15"],
                ["15 − 3,7", "15,0 − 3,7", "11,3"],
                ["9,5 − 4,25", "9,50 − 4,25", "5,25"],
                ["7,2 − 0,8", "thẳng hàng", "6,4"],
              ],
              label: "Thử lại bằng phép cộng",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Tính: 8,6 − 2,45 = ?",
            options: ["6,15", "6,25", "5,15", "6,45"],
            answer: "6,15",
            mascotHint: "8,60 − 2,45 = 6,15.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Tính: 15 − 3,7 = ?",
            options: ["11,3", "12,3", "11,7", "18,7"],
            answer: "11,3",
            mascotHint: "15,0 − 3,7 = 11,3.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Đặt tính thẳng hàng như phép cộng.",
              "Trừ như số tự nhiên rồi đặt dấu phẩy.",
              "Thử lại bằng phép cộng.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g5-c4-l3",
      title: "Bài 21: Phép nhân số thập phân",
      type: "learn",
      description:
        "Nhân số thập phân với số tự nhiên và nhân hai số thập phân",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "thinking",
            text: "Một mét dây nặng 0,25 kg. Vậy 4 mét dây nặng bao nhiêu? 0,25 × 4 = 1 kg. Đếm chữ số ở phần thập phân để đặt dấu phẩy! 🪢",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Nhân số thập phân",
            explanation:
              "Muốn nhân một số thập phân với một số tự nhiên, ta nhân như nhân các số tự nhiên rồi đếm xem phần thập phân của số thập phân có bao nhiêu chữ số để dùng dấu phẩy tách ở tích bấy nhiêu chữ số kể từ phải sang trái. Nhân hai số thập phân cũng làm như vậy với tổng số chữ số ở phần thập phân của cả hai thừa số.",
            points: [
              "0,25 × 4 = 1,00 = 1 (phần thập phân có 2 chữ số).",
              "2,5 × 3 = 7,5.",
              "1,2 × 4,5: 12 × 45 = 540, hai thừa số có 2 chữ số ở phần thập phân ⇒ 5,4.",
            ],
            rule: "Đếm chữ số ở phần thập phân để đặt dấu phẩy trong tích.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Nhân số thập phân",
            table: {
              headers: ["Phép tính", "Nhân như số tự nhiên", "Kết quả"],
              rows: [
                ["2,5 × 3", "25 × 3 = 75", "7,5"],
                ["1,2 × 4,5", "12 × 45 = 540", "5,4"],
                ["0,25 × 4", "25 × 4 = 100", 1],
                ["3,6 × 2,5", "36 × 25 = 900", 9],
              ],
              label: "Tổng số chữ số phần thập phân của hai thừa số = số chữ số ở tích",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Tính: 1,2 × 4,5 = ?",
            options: ["5,4", "54", "0,54", "6,4"],
            answer: "5,4",
            mascotHint: "12 × 45 = 540; hai thừa số có 2 chữ số phần thập phân ⇒ 5,40 = 5,4.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Tính: 3,6 × 2,5 = ?",
            options: ["9", "90", "0,9", "8,5"],
            answer: "9",
            mascotHint: "36 × 25 = 900; hai chữ số phần thập phân ⇒ 9,00 = 9.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Nhân như số tự nhiên trước.",
              "Đếm chữ số phần thập phân của các thừa số.",
              "Tách ở tích đúng bấy nhiêu chữ số.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g5-c4-l4",
      title: "Bài 22: Phép chia số thập phân",
      type: "learn",
      description:
        "Chia số thập phân cho số tự nhiên và chia cho số thập phân",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "4,8 lít nước chia đều vào 1,2 chai? Khoan — đề đúng là chia 4,8 lít vào các can 1,2 lít thì được mấy can. 4,8 : 1,2 = 4 can! 🧴",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Chia số thập phân",
            explanation:
              "Chia số thập phân cho số tự nhiên: chia phần nguyên, đến lượt chia hàng nào thì đặt dấu phẩy ở thương ngay sau hàng đó rồi tiếp tục chia phần thập phân. Khi chia cho số thập phân, ta đếm xem phần thập phân của số chia có bao nhiêu chữ số thì chuyển dấu phẩy của số bị chia sang bên phải bấy nhiêu chữ số rồi bỏ dấu phẩy ở số chia và thực hiện phép chia.",
            points: [
              "7,5 : 3 = 2,5.",
              "4,8 : 1,2 = 48 : 12 = 4.",
              "12,5 : 0,5 = 125 : 5 = 25.",
            ],
            rule: "Chia cho số thập phân: chuyển dấu phẩy của số bị chia sang phải.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Chia số thập phân",
            table: {
              headers: ["Phép tính", "Đưa về phép chia mới", "Kết quả"],
              rows: [
                ["7,5 : 3", "chia phần nguyên, đặt dấu phẩy ở thương", "2,5"],
                ["4,8 : 1,2", "48 : 12", 4],
                ["12,5 : 0,5", "125 : 5", 25],
                ["0,36 : 0,4", "3,6 : 4", "0,9"],
              ],
              label: "Số chia có một chữ số phần thập phân ⇒ dịch dấu phẩy một chữ số",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Tính: 4,8 : 1,2 = ?",
            options: ["4", "0,4", "40", "5"],
            answer: "4",
            mascotHint: "Đưa về 48 : 12 = 4.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Tính: 12,5 : 0,5 = ?",
            options: ["25", "2,5", "250", "5"],
            answer: "25",
            mascotHint: "Số chia 0,5 có 1 chữ số phần thập phân nên 12,5 : 0,5 = 125 : 5 = 25.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Chia cho số tự nhiên: đặt dấu phẩy đúng lúc ở thương.",
              "Chia cho số thập phân: dời dấu phẩy của số bị chia.",
              "Thử lại: thương × số chia = số bị chia.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g5-c4-l5",
      title: "Bài 23: Nhân, chia số thập phân với 10; 100; 1 000… hoặc với 0,1; 0,01; 0,001…",
      type: "learn",
      description:
        "Nhân, chia nhẩm bằng cách dịch chuyển dấu phẩy",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Nhân với 10, 100, 1 000 thì chỉ cần dời dấu phẩy sang phải! Còn nhân với 0,1; 0,01 thì dời sang trái. Nhanh như chớp mắt! ⚡",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Nhân, chia nhẩm với 10; 100; 1 000… và 0,1; 0,01; 0,001…",
            explanation:
              "Nhân một số thập phân với 10, 100, 1 000… ta chỉ việc chuyển dấu phẩy của số đó lần lượt sang bên phải một, hai, ba… chữ số. Chia một số thập phân cho 10, 100, 1 000… ta chuyển dấu phẩy sang bên trái. Nhân với 0,1 chính là chia cho 10, nhân với 0,01 là chia cho 100…",
            points: [
              "2,35 × 10 = 23,5; 2,35 × 100 = 235.",
              "45,6 : 10 = 4,56; 45,6 : 100 = 0,456.",
              "24 × 0,1 = 2,4 (tức 24 : 10).",
              "3,5 : 0,01 = 350 (tức 3,5 × 100).",
            ],
            rule: "Nhân 10, 100… thì dịch phải; chia 10, 100… thì dịch trái.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Nhân, chia nhẩm số thập phân",
            table: {
              headers: ["Phép tính", "Dịch dấu phẩy", "Kết quả"],
              rows: [
                ["2,35 × 100", "sang phải 2 chữ số", 235],
                ["45,6 : 10", "sang trái 1 chữ số", "4,56"],
                ["24 × 0,1", "sang trái 1 chữ số", "2,4"],
                ["3,5 : 0,01", "sang phải 2 chữ số", 350],
              ],
              label: "Thiếu chữ số thì viết thêm chữ số 0",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Tính nhẩm: 2,35 × 100 = ?",
            options: ["235", "23,5", "2 350", "0,0235"],
            answer: "235",
            mascotHint: "Nhân 100 thì dịch dấu phẩy sang phải 2 chữ số: 2,35 → 235.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Tính nhẩm: 45,6 : 100 = ?",
            options: ["0,456", "4,56", "456", "0,0456"],
            answer: "0,456",
            mascotHint: "Chia 100 thì dịch dấu phẩy sang trái 2 chữ số: 45,6 → 0,456.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "× 10; 100; 1 000: dịch dấu phẩy sang phải.",
              ": 10; 100; 1 000: dịch dấu phẩy sang trái.",
              "× 0,1 = : 10; × 0,01 = : 100.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g5-c4-l6",
      title: "Bài 24: Luyện tập chung",
      type: "learn",
      description:
        "Luyện tập tổng hợp bốn phép tính với số thập phân",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Cùng luyện tập cả bốn phép tính với số thập phân để tính toán thành thạo như một “chiếc máy tính nhỏ”! 🤖",
          },
        },
        {
          type: "visual",
          content: {
            text: "Bảng tổng hợp bốn phép tính với số thập phân",
            table: {
              headers: ["Phép tính", "Ví dụ", "Kết quả"],
              rows: [
                ["Cộng", "3,4 + 2,75", "6,15"],
                ["Trừ", "8,6 − 2,45", "6,15"],
                ["Nhân", "1,2 × 4,5", "5,4"],
                ["Chia", "4,8 : 1,2", 4],
                ["Nhẩm", "2,35 × 100", 235],
              ],
              label: "Kiểm tra kết quả bằng phép tính ngược",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Tính: 6,25 + 3,75 = ?",
            options: ["10", "9", "10,5", "9,9"],
            answer: "10",
            mascotHint: "6,25 + 3,75 = 10,00 = 10.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Tính: 7,5 : 2,5 = ?",
            options: ["3", "0,3", "30", "2,5"],
            answer: "3",
            mascotHint: "Đưa về 75 : 25 = 3.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Tính nhẩm: 3,5 : 0,01 = ?",
            options: ["350", "0,35", "35", "3 500"],
            answer: "350",
            mascotHint: "Chia cho 0,01 tức nhân 100: 3,5 × 100 = 350.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Đặt dấu phẩy đúng vị trí trong mỗi phép tính.",
              "Tính nhẩm bằng cách dịch dấu phẩy.",
              "Kiểm tra lại bằng phép tính ngược.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
  ],
};
