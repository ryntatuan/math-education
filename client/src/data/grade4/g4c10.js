export const g4c10 = {
  id: "g4-c10",
  name: "Chủ đề 10: Phân số",
  description:
    "Khái niệm phân số, phân số và phép chia số tự nhiên, tính chất cơ bản của phân số, rút gọn, quy đồng mẫu số và so sánh phân số",
  icon: "🍕",
  color: "#f97316",
  totalLessons: 7,
  lessons: [
    {
      id: "g4-c10-l1",
      title: "Bài 53: Khái niệm phân số",
      type: "learn",
      description:
        "Nhận biết phân số qua hình ảnh chia phần bằng nhau; đọc, viết tử số và mẫu số",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Mẹ chia chiếc bánh pi-za thành 6 phần bằng nhau, Cú Mèo ăn 1 phần. Vậy Cú Mèo đã ăn một phần sáu chiếc bánh — viết là bao nhiêu nhỉ? 🍕",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Phân số",
            explanation:
              "Chia một vật (hay một hình) thành nhiều phần bằng nhau rồi lấy một số phần, ta viết được một phân số. Phân số gồm tử số ở trên và mẫu số ở dưới, ngăn cách bởi gạch ngang.",
            points: [
              "Mẫu số cho biết số phần bằng nhau được chia ra.",
              "Tử số cho biết số phần được lấy đi (được tô màu).",
              "Một phần sáu viết là 1/6, đọc là “một phần sáu”.",
            ],
            rule: "Tử số trên gạch ngang, mẫu số dưới gạch ngang.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Các phân số và cách đọc",
            table: {
              headers: ["Phân số", "Đọc là", "Tử số", "Mẫu số"],
              rows: [
                ["1/2", "một phần hai", 1, 2],
                ["3/4", "ba phần tư", 3, 4],
                ["2/5", "hai phần năm", 2, 5],
              ],
              label: "Mẫu số luôn khác 0",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Chia một hình tròn thành 4 phần bằng nhau, tô màu 3 phần. Phân số chỉ số phần đã tô màu là:",
            options: ["3/4", "4/3", "1/4", "3/7"],
            answer: "3/4",
            mascotHint: "Chia 4 phần ⇒ mẫu số 4; tô 3 phần ⇒ tử số 3, viết là 3/4.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Trong phân số 2/5, mẫu số là số nào?",
            options: ["5", "2", "7", "3"],
            answer: "5",
            mascotHint: "Mẫu số là số ở dưới gạch ngang, cho biết chia thành 5 phần bằng nhau.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Phân số chỉ số phần bằng nhau được lấy ra.",
              "Tử số ở trên, mẫu số ở dưới.",
              "Đọc: tử số + “phần” + mẫu số (một phần hai, ba phần tư…).",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c10-l2",
      title: "Bài 54: Phân số và phép chia số tự nhiên",
      type: "learn",
      description:
        "Thương của phép chia số tự nhiên có thể viết thành phân số",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "thinking",
            text: "Có 3 cái bánh chia đều cho 4 bạn. Mỗi bạn được mấy phần cái bánh? Không phải là 3 : 4 viết kiểu số tự nhiên được — phải viết thành phân số! 🍰",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Thương viết thành phân số",
            explanation:
              "Kết quả của phép chia một số tự nhiên cho một số tự nhiên (khác 0) có thể viết thành một phân số: tử số là số bị chia, mẫu số là số chia.",
            points: [
              "3 : 4 = 3/4 — thương viết được thành phân số.",
              "Nếu số bị chia chia hết cho số chia thì thương là số tự nhiên: 6 : 2 = 3.",
              "Mọi số tự nhiên viết được thành phân số có mẫu số bằng 1: 5 = 5/1.",
            ],
            rule: "a : b = a/b (với b khác 0).",
          },
        },
        {
          type: "visual",
          content: {
            text: "Viết thương thành phân số",
            table: {
              headers: ["Phép chia", "Viết thành phân số", "Giá trị"],
              rows: [
                ["3 : 4", "3/4", "bé hơn 1"],
                ["5 : 5", "5/5 = 1", "bằng 1"],
                ["7 : 2", "7/2", "lớn hơn 1"],
              ],
              label: "So sánh tử số với mẫu số để biết phân số lớn hơn, bằng hay bé hơn 1",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Viết thương 3 : 4 thành phân số:",
            options: ["3/4", "4/3", "3/7", "4/7"],
            answer: "3/4",
            mascotHint: "Tử số là số bị chia 3, mẫu số là số chia 4.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Phân số nào bé hơn 1?",
            options: ["3/4", "4/3", "5/5", "7/2"],
            answer: "3/4",
            mascotHint: "Tử số bé hơn mẫu số thì phân số bé hơn 1.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "a : b = a/b với b khác 0.",
              "Tử số lớn hơn mẫu số ⇒ phân số lớn hơn 1.",
              "Số tự nhiên a viết được thành a/1.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c10-l3",
      title: "Bài 55: Tính chất cơ bản của phân số",
      type: "learn",
      description:
        "Nhân hoặc chia cả tử số và mẫu số với cùng một số tự nhiên khác 0 để được phân số bằng phân số đã cho",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Việt tô màu 2/3 băng giấy, Mai tô màu 4/6 băng giấy. Hai băng giấy được tô màu bằng nhau! Vì sao 2/3 lại bằng 4/6? 📏",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Tính chất cơ bản của phân số",
            explanation:
              "Nhân cả tử số và mẫu số của một phân số với cùng một số tự nhiên khác 0 thì được phân số bằng phân số đã cho. Chia cả tử số và mẫu số cho cùng một số tự nhiên khác 0 cũng được như vậy.",
            points: [
              "2/3 = (2 × 2)/(3 × 2) = 4/6.",
              "4/6 = (4 : 2)/(6 : 2) = 2/3.",
              "Hai phân số khác nhau nhưng vẫn có thể biểu diễn cùng một lượng.",
            ],
            rule: "Nhân (hoặc chia) cả tử và mẫu với (cho) cùng một số khác 0 — phân số không đổi.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Tính chất cơ bản của phân số",
            table: {
              headers: ["Xuất phát", "Phép làm", "Kết quả"],
              rows: [
                ["2/3", "nhân tử và mẫu với 2", "4/6"],
                ["4/6", "chia tử và mẫu cho 2", "2/3"],
                ["3/5", "nhân tử và mẫu với 4", "12/20"],
              ],
              label: "Cùng nhân (chia) thì phân số mới bằng phân số cũ",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Điền số thích hợp: 2/3 = ?/6",
            options: ["4", "3", "6", "5"],
            answer: "4",
            mascotHint: "Mẫu số 3 × 2 = 6 nên tử số 2 × 2 = 4. Ta được 4/6.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Phép chia cả tử số và mẫu số cho 3 biến phân số 9/12 thành phân số nào?",
            options: ["3/4", "3/12", "9/4", "6/9"],
            answer: "3/4",
            mascotHint: "(9 : 3)/(12 : 3) = 3/4.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Nhân cả tử và mẫu với cùng một số khác 0.",
              "Chia cả tử và mẫu cho cùng một số khác 0.",
              "Phân số mới luôn bằng phân số đã cho.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c10-l4",
      title: "Bài 56: Rút gọn phân số",
      type: "learn",
      description:
        "Rút gọn phân số đến phân số tối giản",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "thinking",
            text: "Phân số 20/35 viết hơi “nặng”. Rô-bốt nhận xét: cả 20 và 35 đều chia hết cho 5, cùng chia cho 5 sẽ gọn hơn! ✂️",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Rút gọn phân số",
            explanation:
              "Rút gọn phân số là tìm phân số mới bằng phân số ban đầu nhưng có tử số và mẫu số bé hơn. Ta chia cả tử số và mẫu số cho cùng một số tự nhiên khác 0. Cần rút gọn đến phân số tối giản — là phân số mà tử số và mẫu số không cùng chia hết cho số tự nhiên nào lớn hơn 1.",
            points: [
              "20/35 = (20 : 5)/(35 : 5) = 4/7.",
              "4/7 là phân số tối giản vì 4 và 7 không cùng chia hết cho số nào lớn hơn 1.",
              "Có thể rút gọn nhiều bước: 18/24 = 9/12 = 3/4.",
            ],
            rule: "Rút gọn đến phân số tối giản.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Rút gọn một số phân số",
            table: {
              headers: ["Phân số", "Cùng chia cho", "Phân số tối giản"],
              rows: [
                ["20/35", 5, "4/7"],
                ["18/24", "2 rồi 3", "3/4"],
                ["48/60", 12, "4/5"],
                ["9/10", "không chia hết", "9/10 (đã tối giản)"],
              ],
              label: "Kiểm tra: tử và mẫu không cùng chia hết cho số nào lớn hơn 1",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Rút gọn phân số 20/35 ta được:",
            options: ["4/7", "5/7", "4/5", "2/3"],
            answer: "4/7",
            mascotHint: "(20 : 5)/(35 : 5) = 4/7 và 4/7 đã tối giản.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Phân số nào dưới đây là phân số tối giản?",
            options: ["4/7", "6/8", "10/15", "9/12"],
            answer: "4/7",
            mascotHint: "4 và 7 không cùng chia hết cho số nào lớn hơn 1, nên 4/7 tối giản.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Rút gọn là chia cả tử và mẫu cho cùng một số.",
              "Phân số tối giản: tử và mẫu không cùng chia hết cho số nào lớn hơn 1.",
              "Rút gọn đến phân số tối giản rồi mới kết luận.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c10-l5",
      title: "Bài 57: Quy đồng mẫu số các phân số",
      type: "learn",
      description:
        "Quy đồng mẫu số hai phân số bằng cách tìm mẫu số chung",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Muốn so sánh 1/4 và 3/8, Cú Mèo thấy khó vì hai phân số khác mẫu. Làm sao đưa về cùng mẫu số nhỉ? 🧩",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Quy đồng mẫu số",
            explanation:
              "Quy đồng mẫu số hai phân số là làm cho hai phân số đó có cùng mẫu số nhưng vẫn bằng phân số ban đầu. Ta thường chọn mẫu số chung là số chia hết cho cả hai mẫu số.",
            points: [
              "Nếu mẫu số lớn chia hết cho mẫu số bé, chọn luôn mẫu số lớn làm mẫu số chung.",
              "Nhân cả tử và mẫu của phân số kia để có mẫu số chung.",
              "Ví dụ: 1/4 và 3/8 → 8 : 4 = 2 nên 1/4 = 2/8; giữ nguyên 3/8.",
            ],
            rule: "Mẫu số chung chia hết cho cả hai mẫu số.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Quy đồng mẫu số các phân số",
            table: {
              headers: ["Hai phân số", "Mẫu số chung", "Kết quả"],
              rows: [
                ["1/4 và 3/8", 8, "2/8 và 3/8"],
                ["2/3 và 5/6", 6, "4/6 và 5/6"],
                ["3/5 và 7/10", 10, "6/10 và 7/10"],
                ["1/2 và 2/3", 6, "3/6 và 4/6"],
              ],
              label: "Mẫu số chung phải chia hết cho cả hai mẫu số ban đầu",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Quy đồng mẫu số hai phân số 1/4 và 3/8 ta được:",
            options: ["2/8 và 3/8", "1/8 và 3/8", "2/8 và 6/8", "1/4 và 3/4"],
            answer: "2/8 và 3/8",
            mascotHint: "8 : 4 = 2 nên 1/4 = (1 × 2)/(4 × 2) = 2/8; giữ nguyên 3/8.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Quy đồng mẫu số 1/2 và 2/3 ta được hai phân số nào?",
            options: ["3/6 và 4/6", "2/6 và 3/6", "1/6 và 2/6", "3/5 và 4/5"],
            answer: "3/6 và 4/6",
            mascotHint: "Mẫu số chung là 6: 1/2 = 3/6; 2/3 = 4/6.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Quy đồng để hai phân số có cùng mẫu số.",
              "Chọn mẫu số chung chia hết cho cả hai mẫu số.",
              "Nhân cả tử và mẫu của một phân số để đổi mẫu số.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c10-l6",
      title: "Bài 58: So sánh phân số",
      type: "learn",
      description:
        "So sánh hai phân số cùng mẫu số, khác mẫu số và so sánh phân số với 1",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "thinking",
            text: "Ai được nhiều bánh hơn: bạn được 3/4 cái bánh hay bạn được 5/8 cái bánh? Cùng quy đồng rồi so sánh nào! 🥧",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Cách so sánh phân số",
            explanation:
              "Hai phân số cùng mẫu số: phân số nào có tử số lớn hơn thì lớn hơn. Hai phân số khác mẫu số: quy đồng mẫu số rồi so sánh tử số. Ngoài ra, phân số có tử số bé hơn mẫu số thì bé hơn 1.",
            points: [
              "Cùng mẫu: 3/7 < 5/7.",
              "Khác mẫu: 3/4 = 6/8 > 5/8 ⇒ 3/4 > 5/8.",
              "So với 1: 5/5 = 1; 7/5 > 1; 4/5 < 1.",
            ],
            rule: "Cùng mẫu thì so tử số; khác mẫu thì quy đồng trước.",
          },
        },
        {
          type: "visual",
          content: {
            text: "So sánh phân số",
            table: {
              headers: ["Hai phân số", "Cách làm", "Kết luận"],
              rows: [
                ["3/7 và 5/7", "cùng mẫu, so tử số", "3/7 < 5/7"],
                ["3/4 và 5/8", "quy đồng: 6/8 và 5/8", "3/4 > 5/8"],
                ["4/5 và 1", "4 < 5", "4/5 < 1"],
                ["7/5 và 1", "7 > 5", "7/5 > 1"],
              ],
              label: "Luôn nêu rõ cách làm trước khi kết luận",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "So sánh 3/4 và 5/8:",
            options: ["3/4 > 5/8", "3/4 < 5/8", "3/4 = 5/8", "Không so sánh được"],
            answer: "3/4 > 5/8",
            mascotHint: "Quy đồng: 3/4 = 6/8; 6/8 > 5/8 nên 3/4 > 5/8.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Phân số nào lớn hơn 1?",
            options: ["7/5", "4/5", "5/5", "3/7"],
            answer: "7/5",
            mascotHint: "7 > 5 nên 7/5 lớn hơn 1.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Cùng mẫu số: so sánh tử số.",
              "Khác mẫu số: quy đồng rồi so sánh.",
              "Tử số bé hơn mẫu số ⇒ phân số bé hơn 1.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c10-l7",
      title: "Bài 59: Luyện tập chung",
      type: "learn",
      description:
        "Ôn tập khái niệm phân số, rút gọn, quy đồng và so sánh phân số",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Cùng ôn lại cả chủ đề Phân số: đọc – viết, rút gọn, quy đồng và so sánh phân số. Sẵn sàng chưa? 🚀",
          },
        },
        {
          type: "visual",
          content: {
            text: "Bảng tổng hợp Chủ đề 10",
            table: {
              headers: ["Nội dung", "Cách làm"],
              rows: [
                ["Khái niệm phân số", "tử số trên, mẫu số dưới"],
                ["Phép chia", "a : b = a/b"],
                ["Tính chất cơ bản", "nhân (chia) cả tử và mẫu với cùng số khác 0"],
                ["Rút gọn", "chia đến phân số tối giản"],
                ["Quy đồng", "đưa về cùng mẫu số chung"],
                ["So sánh", "cùng mẫu so tử số; khác mẫu quy đồng trước"],
              ],
              label: "Ghi nhớ để làm nhanh mọi bài tập phân số",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Rút gọn phân số 48/60 ta được phân số tối giản là:",
            options: ["4/5", "2/3", "8/10", "24/30"],
            answer: "4/5",
            mascotHint: "48 và 60 cùng chia hết cho 12: (48 : 12)/(60 : 12) = 4/5.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "So sánh hai phân số 5/6 và 7/9:",
            options: ["5/6 > 7/9", "5/6 < 7/9", "5/6 = 7/9", "Không so sánh được"],
            answer: "5/6 > 7/9",
            mascotHint: "Mẫu số chung 18: 5/6 = 15/18; 7/9 = 14/18; 15/18 > 14/18.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Viết 9 : 4 thành phân số:",
            options: ["9/4", "4/9", "9/13", "4/13"],
            answer: "9/4",
            mascotHint: "Số bị chia 9 là tử số, số chia 4 là mẫu số: 9/4.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Phân số gồm tử số và mẫu số.",
              "Rút gọn đến phân số tối giản.",
              "So sánh bằng cách cùng mẫu hoặc quy đồng.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
  ],
};
