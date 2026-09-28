export const g4c8 = {
  id: "g4-c8",
  name: "Chủ đề 8: Phép nhân và phép chia",
  description:
    "Nhân, chia với số có một, hai chữ số; tính chất giao hoán, kết hợp, phân phối của phép nhân; nhân chia với 10, 100, 1000; ước lượng; số trung bình cộng; bài toán rút về đơn vị",
  icon: "✖️",
  color: "#0ea5e9",
  totalLessons: 11,
  lessons: [
    {
      id: "g4-c8-l1",
      title: "Bài 38: Nhân với số có một chữ số",
      type: "learn",
      description: "Đặt tính rồi nhân số có nhiều chữ số với số có một chữ số",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Một nhà máy mỗi ngày sản xuất được 160 140 chiếc khẩu trang. Vậy trong 7 ngày nhà máy sản xuất được bao nhiêu chiếc nhỉ? 😷",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Nhân số có nhiều chữ số với số có một chữ số",
            explanation:
              "Cách nhân cũng giống như nhân số có ít chữ số: đặt tính thẳng cột rồi nhân từ phải sang trái. Khi tích của một hàng từ 10 trở lên thì viết chữ số hàng đơn vị và nhớ sang hàng liền trước.",
            points: [
              "Đặt số có nhiều chữ số ở trên, số có một chữ số ở dưới.",
              "Nhân từ phải sang trái, bắt đầu từ hàng đơn vị.",
              "Nhớ cộng thêm số nhớ vào tích của hàng kế tiếp.",
            ],
            rule: "Nhân từ phải sang trái, nhớ sang hàng kế tiếp — giống như nhân số bé.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Đặt tính rồi tính: 172 923 × 3",
            cotTinh: { left: 172923, right: 3, sign: "×" },
          },
        },
        {
          type: "visual",
          content: {
            text: "Kết quả một số phép nhân",
            table: {
              headers: ["Phép tính", "Kết quả"],
              rows: [
                ["160 140 × 7", "1 120 980"],
                ["48 102 × 5", "240 510"],
                ["32 419 × 4", "129 676"],
                ["172 923 × 3", "518 769"],
              ],
              label: "Kiểm tra bằng cách ước lượng: 172 923 × 3 ≈ 500 000",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Tính: 160 140 × 7 = ?",
            options: ["1 120 980", "1 120 080", "112 098", "1 021 980"],
            answer: "1 120 980",
            mascotHint:
              "Nhân lần lượt từ phải sang trái: 0×7=0; 4×7=28 viết 8 nhớ 2; 1×7=7 thêm 2 = 9; 0×7=0; 6×7=42 viết 2 nhớ 4; 1×7=7 thêm 4 = 11.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Tuổi thọ của bóng đèn trong nhà là 12 250 giờ. Bóng đèn đường có tuổi thọ gấp 3 lần. Tuổi thọ bóng đèn đường là bao nhiêu giờ?",
            options: ["36 750 giờ", "36 650 giờ", "3 675 giờ", "12 253 giờ"],
            answer: "36 750 giờ",
            mascotHint: "12 250 × 3 = 36 750 (giờ).",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Đặt tính thẳng cột rồi nhân từ phải sang trái.",
              "Nhớ sang hàng kế tiếp khi tích từ 10 trở lên.",
              "Ước lượng để biết kết quả có hợp lí không.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c8-l2",
      title: "Bài 39: Chia cho số có một chữ số",
      type: "learn",
      description:
        "Đặt tính rồi chia số có nhiều chữ số cho số có một chữ số (chia hết và chia có dư)",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Tổ kiến có 125 730 kiến thợ. Cứ 5 kiến thợ khênh được một hạt gạo. Vậy cả tổ khênh được bao nhiêu hạt gạo? 🐜",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Chia số có nhiều chữ số cho số có một chữ số",
            explanation:
              "Ta chia lần lượt từng chữ số của số bị chia, bắt đầu từ trái sang phải: lấy chữ số đầu (hoặc hai chữ số đầu nếu bé hơn số chia) chia cho số chia, rồi hạ chữ số tiếp theo và tiếp tục.",
            points: [
              "Chia từ trái sang phải, khác với cộng trừ nhân.",
              "Mỗi bước: chia – nhân – trừ rồi hạ chữ số tiếp theo.",
              "Số dư luôn bé hơn số chia; số dư bằng 0 là phép chia hết.",
            ],
            rule: "Chia từ trái sang phải; số dư luôn bé hơn số chia.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Đặt tính rồi tính: 125 730 : 5",
            cotTinh: { left: 125730, right: 5, sign: ":" },
          },
        },
        {
          type: "visual",
          content: {
            text: "So sánh phép chia hết và phép chia có dư",
            table: {
              headers: ["Phép chia", "Thương", "Số dư"],
              rows: [
                ["125 730 : 5", "25 146", 0],
                ["125 734 : 5", "25 146", 4],
              ],
              label: "125 734 = 25 146 × 5 + 4",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Tính: 125 730 : 5 = ?",
            options: ["25 146", "25 145", "25 046", "2 514"],
            answer: "25 146",
            mascotHint:
              "Lấy 12 : 5 = 2 dư 2; hạ 5 được 25 : 5 = 5; hạ 7 được 7 : 5 = 1 dư 2; hạ 3 được 23 : 5 = 4 dư 3; hạ 0 được 30 : 5 = 6.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Thực hiện phép chia 125 734 : 5 được thương và số dư là:",
            options: [
              "Thương 25 146, dư 4",
              "Thương 25 147, dư 0",
              "Thương 25 146, dư 3",
              "Thương 25 140, dư 4",
            ],
            answer: "Thương 25 146, dư 4",
            mascotHint:
              "Thử lại: 25 146 × 5 = 125 730; 125 734 − 125 730 = 4 ⇒ dư 4 (bé hơn 5 ✓).",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Chia từ trái sang phải.",
              "Mỗi bước: chia – nhân – trừ – hạ.",
              "Số dư luôn bé hơn số chia.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c8-l3",
      title: "Bài 40: Tính chất giao hoán và kết hợp của phép nhân",
      type: "learn",
      description:
        "Nhận biết a × b = b × a và (a × b) × c = a × (b × c); vận dụng để tính thuận tiện",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "thinking",
            text: "Cú Mèo xếp 3 hàng, mỗi hàng 4 viên bi; Rô-bốt xếp 4 hàng, mỗi hàng 3 viên bi. Cả hai đều có 12 viên bi! Vì sao lại thế nhỉ? 🔵",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Hai tính chất của phép nhân",
            explanation:
              "Khi đổi chỗ các thừa số trong một tích thì tích không thay đổi: a × b = b × a. Khi nhân một tích hai số với số thứ ba, ta có thể nhân số thứ nhất với tích của hai số còn lại: (a × b) × c = a × (b × c).",
            points: [
              "Giao hoán: a × b = b × a.",
              "Kết hợp: (a × b) × c = a × (b × c).",
              "Nhóm các thừa số để có tích tròn chục, tròn trăm — tính nhanh hơn.",
            ],
            rule: "Đổi chỗ hoặc nhóm lại các thừa số đều không làm thay đổi tích.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Tính bằng cách thuận tiện",
            table: {
              headers: ["Biểu thức", "Cách nhóm", "Kết quả"],
              rows: [
                ["25 × 7 × 4", "(25 × 4) × 7 = 100 × 7", 700],
                ["2 × 8 × 5", "(2 × 5) × 8 = 10 × 8", 80],
                ["50 × 6 × 2", "(50 × 2) × 6 = 100 × 6", 600],
                ["4 × 9 × 25", "(4 × 25) × 9 = 100 × 9", 900],
              ],
              label: "Nhóm hai thừa số có tích tròn chục, tròn trăm",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Tính bằng cách thuận tiện: 25 × 7 × 4 = ?",
            options: ["700", "70", "7000", "175"],
            answer: "700",
            mascotHint: "Nhóm (25 × 4) = 100 trước: 100 × 7 = 700.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Kết quả của 12 × 5 và 5 × 12 có quan hệ gì?",
            options: [
              "Bằng nhau",
              "12 × 5 lớn hơn",
              "5 × 12 lớn hơn",
              "Khác nhau 12",
            ],
            answer: "Bằng nhau",
            mascotHint:
              "Đổi chỗ hai thừa số thì tích không đổi: 12 × 5 = 5 × 12 = 60.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "a × b = b × a (giao hoán).",
              "(a × b) × c = a × (b × c) (kết hợp).",
              "Nhóm thừa số để tính thuận tiện.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c8-l4",
      title: "Bài 41: Nhân, chia với 10, 100, 1 000, …",
      type: "learn",
      description:
        "Nhân nhẩm với 10, 100, 1 000 và chia nhẩm cho 10, 100, 1 000",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Rô-bốt có mẹo rất hay: nhân với 10, 100, 1 000 thì chỉ cần thêm chữ số 0 vào bên phải số đó! 🤖",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Mẹo nhân, chia với 10, 100, 1 000",
            explanation:
              "Khi nhân một số với 10, 100, 1 000, ta chỉ việc viết thêm một, hai, ba chữ số 0 vào bên phải số đó. Khi chia một số tròn chục, tròn trăm, tròn nghìn cho 10, 100, 1 000, ta chỉ việc bỏ bớt một, hai, ba chữ số 0 ở bên phải số đó.",
            points: [
              "35 × 10 = 350; 35 × 100 = 3 500; 35 × 1 000 = 35 000.",
              "350 : 10 = 35; 3 500 : 100 = 35; 35 000 : 1 000 = 35.",
              "Số chữ số 0 thêm vào (hoặc bớt đi) bằng số chữ số 0 của 10, 100, 1 000.",
            ],
            rule: "Nhân thì thêm 0, chia thì bớt 0.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Nhân và chia nhẩm",
            table: {
              headers: ["Phép tính", "Kết quả"],
              rows: [
                ["24 × 10", 240],
                ["24 × 100", 2400],
                ["24 × 1 000", 24000],
                ["2 400 : 100", 24],
                ["24 000 : 1 000", 24],
              ],
              label: "Đếm chữ số 0 là làm được ngay",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Tính nhẩm: 125 × 100 = ?",
            options: ["12 500", "1 250", "125 000", "1 025"],
            answer: "12 500",
            mascotHint:
              "Nhân với 100 thì viết thêm hai chữ số 0: 125 → 12 500.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Tính nhẩm: 4 500 : 100 = ?",
            options: ["45", "450", "4 500", "450 000"],
            answer: "45",
            mascotHint: "Chia cho 100 thì bỏ bớt hai chữ số 0: 4 500 → 45.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "× 10, × 100, × 1 000: thêm 1, 2, 3 chữ số 0.",
              ": 10, : 100, : 1 000: bớt 1, 2, 3 chữ số 0.",
              "Chỉ áp dụng khi số có đủ chữ số 0 ở bên phải.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c8-l5",
      title: "Bài 42: Tính chất phân phối của phép nhân đối với phép cộng",
      type: "learn",
      description:
        "Nhận biết a × (b + c) = a × b + a × c; vận dụng để tính nhanh",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Có 11 hộp, mỗi hộp 35 viên kẹo. Cú Mèo tính 35 × 11 bằng cách tách 11 = 10 + 1: 35 × 10 + 35 × 1 = 350 + 35 = 385. Nhanh quá! 🍬",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Nhân một số với một tổng",
            explanation:
              "Muốn nhân một số với một tổng, ta có thể nhân số đó với từng số hạng của tổng rồi cộng các kết quả lại: a × (b + c) = a × b + a × c. Tính chất này cũng đúng với phép trừ.",
            points: [
              "a × (b + c) = a × b + a × c.",
              "a × (b − c) = a × b − a × c.",
              "Dùng tính chất này để tính nhẩm: 35 × 11 = 35 × 10 + 35 = 385.",
            ],
            rule: "Nhân với từng số hạng rồi cộng (trừ) lại.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Tính nhanh nhờ tách số",
            table: {
              headers: ["Biểu thức", "Tách thành", "Kết quả"],
              rows: [
                ["35 × 11", "35 × 10 + 35 × 1", 385],
                ["24 × 99", "24 × 100 − 24 × 1", 2376],
                ["15 × 101", "15 × 100 + 15 × 1", 1515],
                ["12 × 5 + 12 × 5", "12 × (5 + 5)", 120],
              ],
              label: "Tách số rồi nhân với từng phần",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Tính nhanh: 35 × 11 = ?",
            options: ["385", "350", "395", "345"],
            answer: "385",
            mascotHint: "35 × 11 = 35 × 10 + 35 × 1 = 350 + 35 = 385.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Tính nhanh: 24 × 99 = ?",
            options: ["2 376", "2 400", "2 376 000", "2 3760"],
            answer: "2 376",
            mascotHint: "24 × 99 = 24 × 100 − 24 = 2 400 − 24 = 2 376.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "a × (b + c) = a × b + a × c.",
              "a × (b − c) = a × b − a × c.",
              "Tách số thành 10 + 1, 100 − 1 để tính nhẩm.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c8-l6",
      title: "Bài 43: Nhân với số có hai chữ số",
      type: "learn",
      description:
        "Đặt tính rồi nhân với số có hai chữ số, viết hai tích riêng rồi cộng lại",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "thinking",
            text: "Một lớp học có 245 quyển vở, xếp vào 12 hộp. Muốn biết 245 × 12 bằng bao nhiêu, chúng mình đặt tính rồi viết hai tích riêng nhé! 📚",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Viết hai tích riêng rồi cộng",
            explanation:
              "Khi nhân với số có hai chữ số, ta nhân lần lượt với hàng đơn vị rồi hàng chục của số đó. Tích riêng thứ hai viết lùi sang bên trái một cột (vì nhân với chục), sau đó cộng hai tích riêng lại.",
            points: [
              "Tích riêng thứ nhất: nhân với chữ số hàng đơn vị.",
              "Tích riêng thứ hai: nhân với chữ số hàng chục, viết lùi sang trái một cột.",
              "Cộng hai tích riêng để được kết quả cuối cùng.",
            ],
            rule: "Nhân với từng chữ số của số thứ hai, tích riêng thứ hai lùi một cột.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Đặt tính rồi tính: 245 × 12",
            table: {
              headers: ["Bước", "Phép tính"],
              rows: [
                ["Tích riêng thứ nhất (245 × 2)", "490"],
                ["Tích riêng thứ hai (245 × 1, lùi một cột)", "2450"],
                ["Cộng lại", "490 + 2450 = 2940"],
              ],
              label: "245 × 12 = 2 940",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Tính: 245 × 12 = ?",
            options: ["2 940", "2 840", "2 950", "245 120"],
            answer: "2 940",
            mascotHint: "245 × 2 = 490; 245 × 10 = 2 450; 490 + 2 450 = 2 940.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Tính: 1 423 × 3 = ?",
            options: ["4 269", "4 279", "4 169", "3 269"],
            answer: "4 269",
            mascotHint:
              "1 423 × 3: 3 × 3 = 9; 2 × 3 = 6; 4 × 3 = 12 viết 2 nhớ 1; 1 × 3 = 3 thêm 1 = 4.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Nhân lần lượt với hàng đơn vị rồi hàng chục.",
              "Tích riêng thứ hai lùi sang trái một cột.",
              "Cộng hai tích riêng để ra kết quả.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c8-l7",
      title: "Bài 44: Chia cho số có hai chữ số",
      type: "learn",
      description:
        "Đặt tính rồi chia cho số có hai chữ số; ước lượng thương để tìm nhanh",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Có 672 quả cam chia đều vào các túi, mỗi túi 21 quả. Được bao nhiêu túi? Rô-bốt gợi ý: hãy ước lượng thương trước! 🍊",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Chia cho số có hai chữ số",
            explanation:
              "Khi chia cho số có hai chữ số, ta làm giống chia cho số có một chữ số: chia từ trái sang phải, mỗi bước chia – nhân – trừ rồi hạ chữ số tiếp theo. Muốn biết thương khoảng bao nhiêu, ta ước lượng bằng cách làm tròn số chia rồi nhẩm.",
            points: [
              "Lấy hai chữ số đầu của số bị chia (hoặc ba nếu bé hơn số chia) để chia.",
              "Ước lượng thương: ví dụ 672 : 21 ≈ 672 : 20 ≈ 33.",
              "Số dư luôn bé hơn số chia.",
            ],
            rule: "Ước lượng thương trước, rồi thử và điều chỉnh.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Ví dụ chia cho số có hai chữ số",
            table: {
              headers: ["Phép chia", "Thương", "Số dư"],
              rows: [
                ["672 : 21", 32, 0],
                ["7 200 : 40", 180, 0],
                ["945 : 45", 21, 0],
              ],
              label: "Thử lại: 32 × 21 = 672 ✓",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Tính: 672 : 21 = ?",
            options: ["32", "33", "31", "42"],
            answer: "32",
            mascotHint: "Thử 32 × 21 = 672 vừa đúng nên 672 : 21 = 32.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Tính: 7 200 : 40 = ?",
            options: ["180", "18", "1800", "120"],
            answer: "180",
            mascotHint:
              "Bỏ một chữ số 0 ở cả số bị chia và số chia: 720 : 4 = 180.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Chia từ trái sang phải.",
              "Ước lượng thương rồi thử lại.",
              "Số dư luôn bé hơn số chia.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c8-l8",
      title: "Bài 45: Thực hành và trải nghiệm ước lượng trong tính toán",
      type: "learn",
      description:
        "Ước lượng kết quả phép tính bằng cách làm tròn số để tính nhanh",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Đi chợ mà không có máy tính? Không sao! Cú Mèo ước lượng: 51 nghìn × 19 cái gần bằng 50 nghìn × 20 = 1 triệu. 🛒",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Thực Hành",
            title: "Ước lượng để tính nhanh",
            explanation:
              "Ước lượng là làm tròn các số rồi tính nhẩm để biết kết quả khoảng bao nhiêu. Kết quả ước lượng giúp bé kiểm tra xem kết quả tính chính xác có hợp lí không.",
            points: [
              "Làm tròn mỗi số đến hàng chục, hàng trăm cho dễ nhẩm.",
              "Nhân, chia các số đã làm tròn để được kết quả ước lượng.",
              "So sánh kết quả tính chính xác với kết quả ước lượng: lệch quá nhiều là có lỗi.",
            ],
            rule: "Làm tròn → nhẩm → so sánh với kết quả thật.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Ước lượng kết quả",
            table: {
              headers: ["Phép tính", "Ước lượng", "Kết quả ước lượng"],
              rows: [
                ["51 × 19", "50 × 20", 1000],
                ["198 × 3", "200 × 3", 600],
                ["4 012 : 4", "4 000 : 4", 1000],
                ["297 + 503", "300 + 500", 800],
              ],
              label: "Kết quả thật sẽ ở gần con số ước lượng",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Ước lượng kết quả của 51 × 19 ta được khoảng:",
            options: ["1 000", "100", "10 000", "500"],
            answer: "1 000",
            mascotHint: "Làm tròn 51 ≈ 50 và 19 ≈ 20, ta có 50 × 20 = 1 000.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Kết quả ước lượng của 4 012 : 4 là khoảng 1 000. Nếu tính ra 1 003 thì kết quả đó có hợp lí không?",
            options: [
              "Hợp lí",
              "Không hợp lí vì quá lớn",
              "Không hợp lí vì quá bé",
              "Không tính được",
            ],
            answer: "Hợp lí",
            mascotHint: "1 003 rất gần 1 000 nên kết quả hợp lí.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Làm tròn số để ước lượng nhanh.",
              "Dùng ước lượng để kiểm tra kết quả.",
              "Kết quả thật luôn gần với kết quả ước lượng.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c8-l9",
      title: "Bài 46: Tìm số trung bình cộng",
      type: "learn",
      description:
        "Tìm số trung bình cộng của nhiều số: lấy tổng chia cho số các số hạng",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Ba bạn Nam, Việt, Mai lần lượt đọc được 12, 15 và 18 trang sách. Trung bình mỗi bạn đọc được bao nhiêu trang nhỉ? 📖",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Số trung bình cộng",
            explanation:
              "Muốn tìm số trung bình cộng của nhiều số, ta tính tổng của các số đó rồi chia tổng đó cho số các số hạng.",
            points: [
              "Bước 1: tính tổng các số hạng.",
              "Bước 2: chia tổng cho số các số hạng.",
              "Ví dụ: (12 + 15 + 18) : 3 = 45 : 3 = 15.",
            ],
            rule: "Trung bình cộng = Tổng : số các số hạng.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Tìm số trung bình cộng",
            table: {
              headers: ["Các số", "Tổng", "Trung bình cộng"],
              rows: [
                ["12; 15; 18", 45, 15],
                ["20; 30", 50, 25],
                ["10; 20; 30; 40", 100, 25],
              ],
              label: "Chia tổng cho số các số hạng",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Trung bình cộng của 12; 15 và 18 là:",
            options: ["15", "45", "18", "14"],
            answer: "15",
            mascotHint: "(12 + 15 + 18) : 3 = 45 : 3 = 15.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Một lớp có 4 tổ, số học sinh lần lượt là 8, 9, 10, 9 bạn. Trung bình mỗi tổ có bao nhiêu bạn?",
            options: ["9 bạn", "36 bạn", "8 bạn", "10 bạn"],
            answer: "9 bạn",
            mascotHint: "(8 + 9 + 10 + 9) : 4 = 36 : 4 = 9 (bạn).",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Trung bình cộng = Tổng : số các số hạng.",
              "Đếm đúng số các số hạng.",
              "Đơn vị của trung bình cộng giống đơn vị của các số hạng.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c8-l10",
      title: "Bài 47: Bài toán liên quan đến rút về đơn vị",
      type: "learn",
      description:
        "Giải bài toán rút về đơn vị bằng hai bước: tìm giá trị một phần rồi nhân (hoặc chia)",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "thinking",
            text: "7 can đựng được 35 lít mật ong. Hỏi 12 can như thế đựng được bao nhiêu lít? Muốn biết, phải tìm xem MỘT can đựng bao nhiêu đã! 🍯",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Rút về đơn vị",
            explanation:
              "Với dạng bài này, ta làm hai bước: bước 1 tìm giá trị của một đơn vị (một can, một hộp, một người…), bước 2 dùng giá trị đó để tính điều đề hỏi.",
            points: [
              "Bước 1: giá trị một phần = tổng giá trị : số phần.",
              "Bước 2: nhân giá trị một phần với số phần đề hỏi (hoặc chia nếu hỏi cần bao nhiêu phần).",
              "Ghi rõ đơn vị ở mỗi bước để không lẫn.",
            ],
            rule: "Tìm một phần trước — rồi mới tính số phần đề hỏi.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Giải bài toán 7 can – 35 lít",
            table: {
              headers: ["Bước", "Phép tính", "Kết quả"],
              rows: [
                ["Một can đựng được", "35 : 7", "5 lít"],
                ["12 can đựng được", "5 × 12", "60 lít"],
              ],
              label: "Đáp số: 60 lít",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "7 can đựng 35 lít mật ong. Hỏi 12 can như thế đựng bao nhiêu lít?",
            options: ["60 lít", "50 lít", "42 lít", "70 lít"],
            answer: "60 lít",
            mascotHint: "Một can: 35 : 7 = 5 (lít). 12 can: 5 × 12 = 60 (lít).",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "5 hộp xếp được 40 quyển sách. Hỏi có 64 quyển sách thì xếp được bao nhiêu hộp như thế?",
            options: ["8 hộp", "7 hộp", "9 hộp", "10 hộp"],
            answer: "8 hộp",
            mascotHint:
              "Một hộp: 40 : 5 = 8 (quyển). 64 quyển xếp được: 64 : 8 = 8 (hộp).",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Bước 1: tìm giá trị một phần.",
              "Bước 2: nhân hoặc chia theo câu hỏi.",
              "Luôn ghi đơn vị đo ở từng bước.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c8-l11",
      title: "Bài 48: Luyện tập chung",
      type: "learn",
      description:
        "Ôn tập nhân chia, trung bình cộng, rút về đơn vị và ước lượng",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Chủ đề 8 có nhiều mẹo tính thật hay! Cùng ôn lại: nhân chia, tính chất phép nhân, trung bình cộng và rút về đơn vị. 🎯",
          },
        },
        {
          type: "visual",
          content: {
            text: "Bảng tổng hợp kiến thức Chủ đề 8",
            table: {
              headers: ["Kiến thức", "Cách làm"],
              rows: [
                [
                  "Nhân, chia số lớn",
                  "đặt tính, tính từ phải sang trái (chia từ trái sang phải)",
                ],
                ["Tính chất phép nhân", "giao hoán, kết hợp, phân phối"],
                ["Nhân chia với 10, 100, 1000", "thêm hoặc bớt chữ số 0"],
                ["Trung bình cộng", "tổng : số các số hạng"],
                ["Rút về đơn vị", "tìm một phần rồi nhân"],
              ],
              label: "Nắm chắc để làm mọi bài tập",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Tính: 48 102 × 5 = ?",
            options: ["240 510", "240 500", "245 010", "24 510"],
            answer: "240 510",
            mascotHint:
              "48 102 × 5: 2 × 5 = 10 viết 0 nhớ 1; 0 × 5 = 0 thêm 1 = 1; 1 × 5 = 5; 8 × 5 = 40 viết 0 nhớ 4; 4 × 5 = 20 thêm 4 = 24.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Trung bình cộng của 10; 20; 30 và 40 là bao nhiêu?",
            options: ["25", "30", "20", "100"],
            answer: "25",
            mascotHint: "(10 + 20 + 30 + 40) : 4 = 100 : 4 = 25.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Kết quả của 945 : 45 là bao nhiêu?",
            options: ["21", "20", "25", "19"],
            answer: "21",
            mascotHint: "Thử 21 × 45 = 945 vừa đúng nên 945 : 45 = 21.",
          },
        },
        {
          type: "buildExpression",
          content: {
            question: "Ghép phép nhân có tích bằng 1 000",
            target: "1 000",
            slots: 3,
            tiles: ["125", "×", "8", "4", "25", "40"],
            solutions: [
              ["125", "×", "8"],
              ["25", "×", "40"],
            ],
            mascotHint:
              "125 × 8 = 1 000, 25 × 40 = 1 000 và 8 × 125 cũng bằng 1 000 — đổi chỗ hai thừa số thì tích không đổi.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Nhân, chia số lớn: đặt tính rồi tính đúng thứ tự.",
              "Dùng tính chất phép nhân để tính thuận tiện.",
              "Bài toán: xác định dạng (trung bình cộng, rút về đơn vị) rồi làm theo bước.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
  ],
};
