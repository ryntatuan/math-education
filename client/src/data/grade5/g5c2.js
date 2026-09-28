export const g5c2 = {
  id: "g5-c2",
  name: "Chủ đề 2: Số thập phân",
  description:
    "Khái niệm số thập phân, so sánh số thập phân, viết số đo đại lượng dưới dạng số thập phân, làm tròn số thập phân",
  icon: "🔢",
  color: "#0ea5e9",
  totalLessons: 5,
  lessons: [
    {
      id: "g5-c2-l1",
      title: "Bài 10: Khái niệm số thập phân",
      type: "learn",
      description:
        "Nhận biết số thập phân, phần nguyên, phần thập phân và các hàng của số thập phân",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "1 dm bằng 1/10 m, mà 1/10 = 0,1. Vậy 1 dm = 0,1 m. Số 0,1 đọc là “không phẩy một” — đó là số thập phân! 📏",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Số thập phân",
            explanation:
              "Số thập phân gồm hai phần: phần nguyên ở bên trái dấu phẩy và phần thập phân ở bên phải dấu phẩy. Các phân số thập phân như 1/10, 1/100, 1/1000… viết được thành số thập phân.",
            points: [
              "1 dm = 1/10 m = 0,1 m; 3 dm = 0,3 m.",
              "1 cm = 1/100 m = 0,01 m; 7 cm = 0,07 m.",
              "Số 5,7 gồm phần nguyên 5 và phần thập phân 7/10.",
            ],
            rule: "Dấu phẩy ngăn cách phần nguyên và phần thập phân.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Các hàng của số 5,406",
            placeValue: {
              digits: "5,406",
              label: "5 đơn vị · 4 phần mười · 0 phần trăm · 6 phần nghìn",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Phân số thập phân và số thập phân",
            table: {
              headers: ["Phân số thập phân", "Số thập phân", "Đọc là"],
              rows: [
                ["1/10", "0,1", "không phẩy một"],
                ["3/10", "0,3", "không phẩy ba"],
                ["25/100", "0,25", "không phẩy hai mươi lăm"],
                ["7/1000", "0,007", "không phẩy không trăm linh bảy"],
              ],
              label: "Số chữ số 0 ở mẫu số cho biết số chữ số ở phần thập phân",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Viết 3/10 thành số thập phân:",
            options: ["0,3", "3,0", "0,03", "3,10"],
            answer: "0,3",
            mascotHint: "3/10 = 0,3 vì mẫu số 10 có một chữ số 0.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Số 5,406 có phần thập phân gồm những hàng nào?",
            options: [
              "4 phần mười, 0 phần trăm, 6 phần nghìn",
              "4 phần trăm, 0 phần nghìn",
              "6 phần mười, 4 phần trăm",
              "4 đơn vị, 6 phần mười",
            ],
            answer: "4 phần mười, 0 phần trăm, 6 phần nghìn",
            mascotHint: "Đọc từng chữ số sau dấu phẩy theo hàng: phần mười, phần trăm, phần nghìn.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Số thập phân có phần nguyên và phần thập phân.",
              "Dấu phẩy ngăn cách hai phần.",
              "1/10 = 0,1; 1/100 = 0,01; 1/1000 = 0,001.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g5-c2-l2",
      title: "Bài 11: So sánh các số thập phân",
      type: "learn",
      description:
        "So sánh hai số thập phân bằng cách so sánh phần nguyên rồi phần thập phân",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "thinking",
            text: "Bạn nào cao hơn: bạn cao 1,45 m hay bạn cao 1,5 m? Cùng so sánh hai số thập phân xem! 📐",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "So sánh số thập phân",
            explanation:
              "Muốn so sánh hai số thập phân, ta so sánh phần nguyên trước: số nào có phần nguyên lớn hơn thì lớn hơn. Nếu phần nguyên bằng nhau, ta so sánh lần lượt từng hàng của phần thập phân từ trái sang phải.",
            points: [
              "1,5 > 1,45 vì hàng phần mười 5 > 4.",
              "12,5 < 20,1 vì 12 < 20.",
              "Có thể viết thêm chữ số 0 vào bên phải phần thập phân mà không đổi giá trị: 1,5 = 1,50.",
            ],
            rule: "So sánh phần nguyên trước, rồi đến phần thập phân.",
          },
        },
        {
          type: "visual",
          content: {
            text: "So sánh các số thập phân",
            table: {
              headers: ["Hai số", "Cách so sánh", "Kết luận"],
              rows: [
                ["1,5 và 1,45", "cùng phần nguyên 1, so hàng phần mười 5 > 4", "1,5 > 1,45"],
                ["3,08 và 3,8", "hàng phần mười 0 < 8", "3,08 < 3,8"],
                ["12,5 và 20,1", "phần nguyên 12 < 20", "12,5 < 20,1"],
                ["0,7 và 0,70", "0,7 = 0,70", "0,7 = 0,70"],
              ],
              label: "Viết thêm (hoặc bỏ) chữ số 0 tận cùng bên phải không làm đổi giá trị",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "So sánh 1,5 và 1,45:",
            options: ["1,5 > 1,45", "1,5 < 1,45", "1,5 = 1,45", "Không so sánh được"],
            answer: "1,5 > 1,45",
            mascotHint: "Cùng phần nguyên 1; hàng phần mười 5 > 4 nên 1,5 > 1,45.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Sắp xếp ba số 2,5; 2,45; 2,9 theo thứ tự từ bé đến lớn:",
            options: [
              "2,45; 2,5; 2,9",
              "2,5; 2,45; 2,9",
              "2,9; 2,5; 2,45",
              "2,45; 2,9; 2,5",
            ],
            answer: "2,45; 2,5; 2,9",
            mascotHint: "Hàng phần mười lần lượt là 4; 5; 9 nên thứ tự là 2,45 < 2,5 < 2,9.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "So sánh phần nguyên trước.",
              "Bằng nhau thì so từng hàng phần thập phân.",
              "Thêm hoặc bớt chữ số 0 tận cùng không đổi giá trị.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g5-c2-l3",
      title: "Bài 12: Viết số đo đại lượng dưới dạng số thập phân",
      type: "learn",
      description:
        "Đổi các số đo độ dài, khối lượng, diện tích sang số thập phân",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Một bạn cao 1 m 45 cm. Viết gọn lại thành 1,45 m! Cùng học cách đổi đơn vị đo thành số thập phân nhé. 📏",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Số đo đại lượng dạng số thập phân",
            explanation:
              "Dựa vào quan hệ giữa các đơn vị đo, ta viết số đo có hai đơn vị thành số thập phân theo đơn vị lớn hơn. Phần nguyên là số đo theo đơn vị lớn, phần thập phân là số đo theo đơn vị bé hơn.",
            points: [
              "1 m 45 cm = 1,45 m (vì 45 cm = 45/100 m).",
              "2 kg 45 g = 2,045 kg.",
              "7 dm 8 cm = 7,8 dm.",
            ],
            rule: "Mỗi đơn vị bé hơn liền sau bằng 1/10 đơn vị lớn hơn.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Đổi số đo thành số thập phân",
            table: {
              headers: ["Số đo", "Viết thành số thập phân"],
              rows: [
                ["1 m 45 cm", "1,45 m"],
                ["2 kg 45 g", "2,045 kg"],
                ["7 dm 8 cm", "7,8 dm"],
                ["3 m 5 cm", "3,05 m"],
              ],
              label: "Kiểm tra bằng phân số thập phân: 45 cm = 45/100 m",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Viết 1 m 45 cm thành số thập phân với đơn vị mét:",
            options: ["1,45 m", "1,045 m", "14,5 m", "0,145 m"],
            answer: "1,45 m",
            mascotHint: "45 cm = 45/100 m = 0,45 m nên 1 m 45 cm = 1,45 m.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Viết 2 kg 45 g thành số thập phân với đơn vị ki-lô-gam:",
            options: ["2,045 kg", "2,45 kg", "2,405 kg", "20,45 kg"],
            answer: "2,045 kg",
            mascotHint: "45 g = 45/1000 kg = 0,045 kg nên 2 kg 45 g = 2,045 kg.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Xác định đơn vị cần viết.",
              "Đổi đơn vị bé thành phân số thập phân của đơn vị lớn.",
              "Ghép phần nguyên và phần thập phân.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g5-c2-l4",
      title: "Bài 13: Làm tròn số thập phân",
      type: "learn",
      description:
        "Làm tròn số thập phân đến hàng đơn vị, hàng phần mười, hàng phần trăm",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "thinking",
            text: "Cân nặng của Cú Mèo là 3,46 kg. Nếu nói gần đúng thì khoảng 3,5 kg. Đó là làm tròn số thập phân! ⚖️",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Làm tròn số thập phân",
            explanation:
              "Muốn làm tròn số thập phân đến một hàng nào đó, ta xem chữ số liền sau hàng cần làm tròn: nếu chữ số đó từ 5 trở lên thì thêm 1 vào chữ số của hàng cần làm tròn rồi bỏ các chữ số phía sau; nếu bé hơn 5 thì giữ nguyên rồi bỏ các chữ số phía sau.",
            points: [
              "3,46 làm tròn đến hàng phần mười: 3,5 (vì 6 > 5).",
              "3,42 làm tròn đến hàng phần mười: 3,4 (vì 2 < 5).",
              "12,678 làm tròn đến hàng phần trăm: 12,68.",
            ],
            rule: "Chữ số liền sau từ 5 trở lên thì thêm 1.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Làm tròn số thập phân",
            table: {
              headers: ["Số", "Làm tròn đến", "Kết quả"],
              rows: [
                ["3,46", "hàng phần mười", "3,5"],
                ["3,42", "hàng phần mười", "3,4"],
                ["12,678", "hàng phần trăm", "12,68"],
                ["7,5", "hàng đơn vị", 8],
              ],
              label: "Nhìn đúng chữ số liền sau hàng cần làm tròn",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Làm tròn số 3,46 đến hàng phần mười ta được:",
            options: ["3,5", "3,4", "3,46", "4"],
            answer: "3,5",
            mascotHint: "Chữ số hàng phần trăm là 6 (từ 5 trở lên) nên 3,46 ≈ 3,5.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Làm tròn số 12,678 đến hàng phần trăm ta được:",
            options: ["12,68", "12,67", "12,7", "13"],
            answer: "12,68",
            mascotHint: "Chữ số hàng phần nghìn là 8 nên 12,678 ≈ 12,68.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Xác định hàng cần làm tròn.",
              "Nhìn chữ số liền sau hàng đó.",
              "Từ 5 trở lên thì thêm 1, bé hơn 5 thì giữ nguyên.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g5-c2-l5",
      title: "Bài 14: Luyện tập chung",
      type: "learn",
      description:
        "Ôn tập số thập phân: đọc viết, so sánh, đổi đơn vị, làm tròn",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Cùng ôn tập toàn bộ kiến thức về số thập phân trước khi sang chủ đề đo diện tích! 📚",
          },
        },
        {
          type: "visual",
          content: {
            text: "Bảng tổng hợp Chủ đề 2",
            table: {
              headers: ["Nội dung", "Cách làm"],
              rows: [
                ["Khái niệm", "phần nguyên và phần thập phân"],
                ["So sánh", "so phần nguyên, rồi từng hàng phần thập phân"],
                ["Đổi đơn vị", "dùng phân số thập phân"],
                ["Làm tròn", "xem chữ số liền sau hàng làm tròn"],
              ],
              label: "Luyện đọc số thập phân thành thạo",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Số 0,25 đọc là:",
            options: [
              "không phẩy hai mươi lăm",
              "không phẩy hai năm",
              "hai mươi lăm phẩy không",
              "hai phẩy năm",
            ],
            answer: "không phẩy hai mươi lăm",
            mascotHint: "Đọc phần nguyên rồi “phẩy” rồi đọc phần thập phân: không phẩy hai mươi lăm.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Sắp xếp các số 0,9; 0,45; 0,5 theo thứ tự từ lớn đến bé:",
            options: [
              "0,9; 0,5; 0,45",
              "0,45; 0,5; 0,9",
              "0,5; 0,9; 0,45",
              "0,9; 0,45; 0,5",
            ],
            answer: "0,9; 0,5; 0,45",
            mascotHint: "So hàng phần mười: 9 > 5 > 4 nên 0,9 > 0,5 > 0,45.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Làm tròn 5,87 đến hàng phần mười:",
            options: ["5,9", "5,8", "6", "5,87"],
            answer: "5,9",
            mascotHint: "Chữ số hàng phần trăm là 7 (từ 5 trở lên) nên 5,87 ≈ 5,9.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Nắm chắc phần nguyên và phần thập phân.",
              "So sánh, sắp xếp số thập phân.",
              "Đổi đơn vị đo và làm tròn số thập phân.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
  ],
};
