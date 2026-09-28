export const g4c4 = {
  id: "g4-c4",
  name: "Chủ đề 4: Một số đơn vị đo đại lượng",
  description:
    "Đơn vị đo khối lượng yến, tạ, tấn; đơn vị đo diện tích đề-xi-mét vuông, mét vuông, mi-li-mét vuông; giây và thế kỉ",
  icon: "⚖️",
  color: "#22c55e",
  totalLessons: 5,
  lessons: [
    {
      id: "g4-c4-l1",
      title: "Bài 17: Yến, tạ, tấn",
      type: "learn",
      description:
        "Làm quen đơn vị đo khối lượng lớn: yến, tạ, tấn và cách đổi giữa các đơn vị",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "surprised",
            text: "Cá voi xanh là loài vật nặng nhất thế giới, có con nặng tới 190 tấn! Rô-bốt thắc mắc: 190 tấn lớn hơn 190 kg không nhỉ? 🐋",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Ba đơn vị đo khối lượng lớn",
            explanation:
              "Để đo những vật nặng, người ta dùng yến, tạ, tấn. Mỗi đơn vị liền sau gấp 10 lần đơn vị liền trước: 1 yến = 10 kg, 1 tạ = 10 yến = 100 kg, 1 tấn = 10 tạ = 1000 kg.",
            points: [
              "1 yến = 10 kg; 1 tạ = 10 yến = 100 kg; 1 tấn = 10 tạ = 1000 kg.",
              "Đổi từ đơn vị lớn sang bé thì nhân với 10 (hoặc 100, 1000).",
              "Đổi từ đơn vị bé sang lớn thì chia cho 10 (hoặc 100, 1000).",
              "190 tấn lớn hơn 190 kg rất nhiều: 190 tấn = 190 000 kg.",
            ],
            rule: "Yến → tạ → tấn: cứ lên một bậc thì gấp 10 lần.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Đổi đơn vị đo khối lượng",
            table: {
              headers: ["Đơn vị lớn", "Đổi ra"],
              rows: [
                ["2 yến", "20 kg"],
                ["3 tạ", "300 kg"],
                ["4 tạ", "40 yến"],
                ["2 tấn", "2000 kg"],
                ["3 tấn", "30 tạ"],
              ],
              label: "Mỗi bậc gấp 10 lần",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Thực hiện phép tính với đơn vị đo khối lượng",
            table: {
              headers: ["Phép tính", "Kết quả"],
              rows: [
                ["45 tấn − 18 tấn", "27 tấn"],
                ["17 tạ + 36 tạ", "53 tạ"],
                ["25 yến × 4", "100 yến"],
                ["138 tấn : 3", "46 tấn"],
              ],
              label: "Cùng đơn vị đo thì tính như số bình thường",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Chim cánh cụt bố và mẹ nặng tổng cộng 80 kg. Cả ba con chim (bố, mẹ và con) nặng 1 tạ. Chim cánh cụt con nặng bao nhiêu ki-lô-gam?",
            options: ["20 kg", "30 kg", "10 kg", "18 kg"],
            answer: "20 kg",
            mascotHint: "1 tạ = 100 kg. Chim con: 100 − 80 = 20 (kg).",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Xe tải chở được nhiều nhất 7 tạ hàng. Trên xe đã có 300 kg. Mỗi thùng na nặng 5 kg. Xe có chở thêm được 90 thùng na không?",
            options: [
              "Không, vì 450 kg > 400 kg",
              "Có, vì 450 kg < 700 kg",
              "Có, vì 90 thùng chỉ nặng 90 kg",
              "Không, vì xe đã chở đủ",
            ],
            answer: "Không, vì 450 kg > 400 kg",
            mascotHint:
              "7 tạ = 700 kg. Xe còn chở được: 700 − 300 = 400 (kg). 90 thùng nặng: 90 × 5 = 450 (kg) > 400 kg ⇒ không chở thêm được.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "1 yến = 10 kg · 1 tạ = 100 kg · 1 tấn = 1000 kg.",
              "Đổi đơn vị: lên một bậc thì gấp 10 lần.",
              "Tính toán phải đổi về cùng một đơn vị đo.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c4-l2",
      title: "Bài 18: Đề-xi-mét vuông, mét vuông, mi-li-mét vuông",
      type: "learn",
      description:
        "Làm quen các đơn vị đo diện tích dm², m², mm² và đổi giữa các đơn vị đó",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Rô-bốt muốn lát nền ngôi nhà đồ chơi bằng 100 hình vuông cạnh 1 cm, và băn khoăn không biết dùng đơn vị nào cho vừa. Có đơn vị nào lớn hơn xăng-ti-mét vuông không nhỉ? 🏠",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Đơn vị đo diện tích: dm², m², mm²",
            explanation:
              "Đề-xi-mét vuông là diện tích hình vuông cạnh 1 dm. Mét vuông là diện tích hình vuông cạnh 1 m. Mi-li-mét vuông là diện tích hình vuông cạnh 1 mm — dùng cho vật rất nhỏ như nhãn vở, con tem.",
            points: [
              "1 dm² = 100 cm²; 1 m² = 100 dm²; 1 cm² = 100 mm².",
              "Cứ xuống một bậc thì nhân 100; lên một bậc thì chia 100.",
              "Chọn đơn vị cho hợp lí: mặt bàn dùng dm², nền nhà dùng m², nhãn vở dùng cm².",
            ],
            rule: "Hai đơn vị đo diện tích liền nhau gấp (kém) nhau 100 lần.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Đổi đơn vị đo diện tích",
            table: {
              headers: ["Đơn vị lớn", "Đổi ra"],
              rows: [
                ["3 dm²", "300 cm²"],
                ["6 dm² 50 cm²", "650 cm²"],
                ["5 m²", "500 dm²"],
                ["3 m² 9 dm²", "309 dm²"],
                ["2 cm²", "200 mm²"],
              ],
              label: "Mỗi bậc 100 lần",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Điền số thích hợp: 500 dm² = … m²",
            options: ["5 m²", "50 m²", "5000 m²", "0,5 m²"],
            answer: "5 m²",
            mascotHint: "1 m² = 100 dm² nên 500 dm² = 500 : 100 = 5 (m²).",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Chú Tư ghép hai tấm pin mặt trời hình vuông cạnh 1 m thành một tấm hình chữ nhật dài 2 m. Diện tích tấm pin đó là bao nhiêu?",
            options: ["200 m²", "200 dm²", "200 cm²", "200 mm²"],
            answer: "200 dm²",
            mascotHint: "Diện tích tấm pin: 2 × 1 = 2 (m²). Mà 2 m² = 200 dm².",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Sàn phòng Nam hình vuông cạnh 3 m, bố lát bằng các tấm gỗ dài 5 dm, rộng 1 dm. Bố cần bao nhiêu tấm gỗ?",
            options: ["180 tấm", "90 tấm", "18 tấm", "900 tấm"],
            answer: "180 tấm",
            mascotHint:
              "Diện tích sàn: 3 × 3 = 9 (m²) = 900 (dm²). Mỗi tấm gỗ: 5 × 1 = 5 (dm²). Số tấm: 900 : 5 = 180 (tấm).",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "1 dm² = 100 cm² · 1 m² = 100 dm² · 1 cm² = 100 mm².",
              "Hai đơn vị diện tích liền nhau hơn kém nhau 100 lần.",
              "Chọn đơn vị đo phù hợp với kích thước vật.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c4-l3",
      title: "Bài 19: Giây, thế kỉ",
      type: "learn",
      description:
        "Làm quen đơn vị đo thời gian giây và thế kỉ; đổi đơn vị và xác định năm thuộc thế kỉ nào",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Cú Mèo khoe cháy được trong mười giây, còn Rô-bốt thì đã sống được một thế kỉ! Một thế kỉ dài bằng bao nhiêu năm nhỉ? ⏱️",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Giây và thế kỉ",
            explanation:
              "Kim giây trên đồng hồ đi được một vạch là một giây. Thế kỉ là đơn vị đo thời gian dài: 1 thế kỉ = 100 năm. Từ năm 1 đến năm 100 là thế kỉ I, từ 101 đến 200 là thế kỉ II, cứ như thế tiếp tục.",
            points: [
              "1 phút = 60 giây; 1 giờ = 60 phút.",
              "1 tuần = 7 ngày; 1 ngày = 24 giờ.",
              "1 thế kỉ = 100 năm. Thế kỉ XX là từ 1901 đến 2000; thế kỉ XXI từ 2001 đến 2100.",
            ],
            rule: "Đổi thời gian: 60 giây = 1 phút; 60 phút = 1 giờ; 100 năm = 1 thế kỉ.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Đổi đơn vị đo thời gian",
            table: {
              headers: ["Đơn vị", "Đổi ra"],
              rows: [
                ["3 phút", "180 giây"],
                ["2 giờ", "120 phút"],
                ["2 phút 11 giây", "131 giây"],
                ["4 thế kỉ", "400 năm"],
                ["28 ngày", "4 tuần"],
              ],
              label: "Mỗi bậc: 60 hoặc 100 lần",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Mỗi năm thuộc thế kỉ nào?",
            table: {
              headers: ["Năm", "Thế kỉ"],
              rows: [
                ["1698", "XVII"],
                ["1900", "XIX"],
                ["1960", "XX"],
                ["2004", "XXI"],
              ],
              label: "Thế kỉ XIX: 1801–1900 · thế kỉ XX: 1901–2000",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Lễ kỉ niệm 300 năm thành phố Sài Gòn được tổ chức năm 1998. Vậy thành phố được thành lập năm nào và năm đó thuộc thế kỉ nào?",
            options: [
              "Năm 1698 — thế kỉ XVII",
              "Năm 1698 — thế kỉ XVIII",
              "Năm 1798 — thế kỉ XVIII",
              "Năm 1598 — thế kỉ XVI",
            ],
            answer: "Năm 1698 — thế kỉ XVII",
            mascotHint:
              "1998 − 300 = 1698. Từ năm 1601 đến 1700 là thế kỉ XVII.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Một chiếc máy bay thực hiện 25 chuyến mỗi tháng, hoạt động từ ngày 1 tháng 1 năm 1996 đến hết năm 2016. Máy bay đó thực hiện bao nhiêu chuyến bay?",
            options: [
              "6 300 chuyến",
              "5 400 chuyến",
              "300 chuyến",
              "6 000 chuyến",
            ],
            answer: "6 300 chuyến",
            mascotHint:
              "Mỗi năm 25 × 12 = 300 (chuyến). Từ 1996 đến hết 2016 là 21 năm: 300 × 21 = 6 300 (chuyến).",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "1 phút = 60 giây · 1 giờ = 60 phút.",
              "1 thế kỉ = 100 năm.",
              "Thế kỉ XXI tính từ năm 2001 đến năm 2100.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c4-l4",
      title: "Bài 20: Thế kỉ",
      type: "learn",
      description:
        "Xác định năm thuộc thế kỉ nào; làm quen năm nhuận và mốc thời gian lịch sử",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "thinking",
            text: "Rô-bốt tìm hiểu về các nhân vật lịch sử: Trần Hưng Đạo sinh năm 1228, Đinh Bộ Lĩnh sinh năm 924. Mỗi năm đó thuộc thế kỉ nào nhỉ? 📜",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Cách xác định thế kỉ của một năm",
            explanation:
              "Một thế kỉ có 100 năm. Thế kỉ thứ nhất bắt đầu từ năm 1 đến năm 100; thế kỉ thứ hai từ 101 đến 200; cứ tiếp tục như vậy. Vậy năm 1228 thuộc thế kỉ XIII, còn năm 924 thuộc thế kỉ X.",
            points: [
              "Từ năm 1 đến 100: thế kỉ I; 101–200: thế kỉ II; 201–300: thế kỉ III.",
              "Từ năm 1901 đến 2000: thế kỉ XX; 2001–2100: thế kỉ XXI.",
              "Năm nhuận là năm tháng Hai có 29 ngày; thế kỉ XXI có 24 năm nhuận (2004, 2008, …, 2096).",
            ],
            rule: "Lấy năm chia cho 100 rồi làm tròn lên để tìm thế kỉ (trừ khi năm chia hết cho 100).",
          },
        },
        {
          type: "visual",
          content: {
            text: "Năm sinh của các nhân vật lịch sử",
            table: {
              headers: ["Nhân vật", "Năm sinh", "Thế kỉ"],
              rows: [
                ["Đinh Bộ Lĩnh", 924, "X"],
                ["Trần Hưng Đạo", 1228, "XIII"],
                ["Nguyễn Trãi", 1380, "XIV"],
                ["Nguyễn Huệ", 1753, "XVIII"],
              ],
              label: "Năm 924 nằm trong khoảng 901–1000 ⇒ thế kỉ X",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Trần Hưng Đạo sinh năm 1228. Năm đó thuộc thế kỉ nào?",
            options: ["Thế kỉ XI", "Thế kỉ XII", "Thế kỉ XIII", "Thế kỉ XIV"],
            answer: "Thế kỉ XIII",
            mascotHint:
              "Năm 1228 nằm trong khoảng 1201–1300 nên thuộc thế kỉ XIII.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Biết năm 1900 là năm Canh Tý. Cứ 60 năm lại có một năm Canh Tý. Năm Canh Tý tiếp theo thuộc thế kỉ nào?",
            options: ["Thế kỉ XIX", "Thế kỉ XX", "Thế kỉ XXI", "Thế kỉ XVIII"],
            answer: "Thế kỉ XX",
            mascotHint:
              "1900 + 60 = 1960. Năm 1960 nằm trong khoảng 1901–2000 ⇒ thế kỉ XX.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Năm cuối cùng của thế kỉ XX là một năm nhuận. Đó là năm nào?",
            options: ["1999", "2000", "2004", "1900"],
            answer: "2000",
            mascotHint:
              "Thế kỉ XX kết thúc năm 2000. Năm 2000 chia hết cho 400 nên là năm nhuận (tháng Hai có 29 ngày).",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Mỗi thế kỉ dài 100 năm.",
              "Thế kỉ XXI: từ 2001 đến 2100.",
              "Năm nhuận (tháng Hai 29 ngày) thường là năm chia hết cho 4.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c4-l5",
      title: "Bài 21: Luyện tập chung",
      type: "learn",
      description:
        "Vận dụng đơn vị đo khối lượng, diện tích và thời gian vào các tình huống thực tế",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Khối lớp Bốn chuẩn bị Hội trại mùa Thu: chọn tấm gỗ làm biển tên trại, chọn vị trí dựng trại rộng nhất và chuẩn bị chai lọc nước cho buổi triển lãm khoa học. Cùng đọc kĩ để chọn cho đúng nhé! ⛺",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Luyện Tập",
            title: "Chọn đơn vị đo cho hợp lí",
            explanation:
              "Khi giải bài thực tế, bé cần ước lượng kích thước trước rồi mới chọn đơn vị đo: tấm biển tên trại không thể rộng vài mét vuông, cũng không thể chỉ vài mi-li-mét vuông.",
            points: [
              "Đổi về cùng một đơn vị rồi mới so sánh hoặc tính toán.",
              "Ước lượng trước để loại những số đo vô lí.",
              "Ghi rõ đơn vị đo trong câu trả lời.",
            ],
            rule: "Ước lượng kích thước thật → chọn đơn vị → đổi cho cùng đơn vị → tính.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Thời gian lọc 500 ml nước của ba chai",
            table: {
              headers: ["Chai", "Thời gian", "Đổi ra giây"],
              rows: [
                ["Chai A", "250 giây", 250],
                ["Chai B", "4 phút", 240],
                ["Chai C", "3 phút 50 giây", 230],
              ],
              label: "Đổi hết về giây rồi so sánh",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Trong ba chai lọc nước trên, chai nào lọc 500 ml nước nhanh nhất?",
            options: ["Chai A", "Chai B", "Chai C", "Ba chai như nhau"],
            answer: "Chai C",
            mascotHint:
              "Chai A: 250 giây; chai B: 4 phút = 240 giây; chai C: 3 phút 50 giây = 230 giây. Chai C ít thời gian nhất.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Người ta đặt dưới mỗi chai lọc nước một tấm bìa hình vuông cạnh 3 dm. Diện tích mỗi tấm bìa là bao nhiêu?",
            options: ["9 mm²", "9 cm²", "9 dm²", "9 m²"],
            answer: "9 dm²",
            mascotHint: "Diện tích hình vuông: 3 × 3 = 9 (dm²).",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Em cần một tấm gỗ làm biển tên trại của lớp. Nên chọn tấm gỗ có diện tích khoảng bao nhiêu?",
            options: ["40 mm²", "4 m²", "40 dm²", "40 cm²"],
            answer: "40 dm²",
            mascotHint:
              "40 dm² = 4000 cm², tức khoảng 60 cm × 65 cm — vừa đủ làm biển tên trại. 4 m² là cả một chiếc bàn lớn!",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Đổi về cùng đơn vị trước khi so sánh.",
              "Ước lượng kích thước thật để chọn đơn vị đo hợp lí.",
              "1 tấn = 10 tạ = 100 yến = 1000 kg.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
  ],
};
