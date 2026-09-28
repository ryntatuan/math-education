export const g5c11 = {
  id: "g5-c11",
  name: "Chủ đề 11: Một số yếu tố thống kê và xác suất",
  description:
    "Thu thập, phân loại, sắp xếp số liệu; biểu đồ hình quạt tròn; tỉ số của số lần lặp lại một sự kiện",
  icon: "📊",
  color: "#0d9488",
  totalLessons: 5,
  lessons: [
    {
      id: "g5-c11-l1",
      title: "Bài 63: Thu thập, phân loại, sắp xếp các số liệu",
      type: "learn",
      description:
        "Thu thập số liệu, phân loại theo tiêu chí và sắp xếp theo thứ tự",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Cả lớp khảo sát môn thể thao yêu thích. Sau khi thu thập, Rô-bốt phân loại và đếm xem mỗi môn có bao nhiêu bạn chọn. 📋",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Thu thập, phân loại, sắp xếp số liệu",
            explanation:
              "Để có số liệu, ta thu thập thông tin bằng cách quan sát, hỏi hoặc đo đạc. Sau đó ta phân loại số liệu theo tiêu chí (nhóm, loại, mức…) rồi có thể sắp xếp theo thứ tự từ bé đến lớn hoặc ngược lại.",
            points: [
              "Thu thập: hỏi từng bạn rồi ghi lại.",
              "Phân loại: xếp mỗi bạn vào một nhóm theo tiêu chí.",
              "Sắp xếp: xếp các số liệu theo thứ tự tăng hoặc giảm.",
            ],
            rule: "Số liệu sắp xếp theo thứ tự thì dễ nhận xét hơn.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Số bạn yêu thích mỗi môn thể thao",
            barChart: {
              title: "Số bạn yêu thích mỗi môn thể thao",
              items: [
                { label: "Bóng đá", value: 12 },
                { label: "Bóng rổ", value: 8 },
                { label: "Bơi", value: 6 },
                { label: "Cầu lông", value: 4 },
              ],
              unit: "bạn",
              highlight: 0,
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Số liệu 12; 8; 6; 4 được sắp xếp theo thứ tự từ bé đến lớn là:",
            options: [
              "4; 6; 8; 12",
              "12; 8; 6; 4",
              "6; 4; 8; 12",
              "4; 8; 6; 12",
            ],
            answer: "4; 6; 8; 12",
            mascotHint: "Sắp xếp từ bé đến lớn: 4 < 6 < 8 < 12.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Khảo sát xong, có 12 bạn chọn bóng đá, 8 bạn chọn bóng rổ, 6 bạn chọn bơi. Tổng số bạn tham gia khảo sát (chưa tính cầu lông) là:",
            options: ["26 bạn", "24 bạn", "30 bạn", "20 bạn"],
            answer: "26 bạn",
            mascotHint: "12 + 8 + 6 = 26 (bạn).",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Thu thập số liệu bằng quan sát, hỏi, đo đạc.",
              "Phân loại theo một tiêu chí rõ ràng.",
              "Sắp xếp để dễ so sánh và nhận xét.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g5-c11-l2",
      title: "Bài 64: Biểu đồ hình quạt tròn",
      type: "learn",
      description: "Đọc và nhận xét số liệu trên biểu đồ hình quạt tròn",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Biểu đồ hình quạt tròn biểu diễn tỉ số phần trăm bằng các phần của một hình tròn. Cả hình tròn là 100%! 🥧",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Biểu đồ hình quạt tròn",
            explanation:
              "Biểu đồ hình quạt tròn dùng một hình tròn chia thành các phần để biểu diễn số liệu. Mỗi phần được ghi tỉ số phần trăm; tổng các phần luôn bằng 100%.",
            points: [
              "Cả hình tròn biểu diễn 100%.",
              "Phần lớn hơn thì chiếm tỉ số phần trăm lớn hơn.",
              "Đọc số liệu bằng cách xem phần được tô màu và chú thích.",
            ],
            rule: "Tổng tỉ số phần trăm của các phần bằng 100%.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Môn thể thao yêu thích của học sinh khối 5",
            pieChart: {
              title: "Môn thể thao yêu thích nhất",
              items: [
                { label: "Bóng đá", percent: 40 },
                { label: "Bóng rổ", percent: 25 },
                { label: "Bơi", percent: 20 },
                { label: "Cầu lông", percent: 15 },
              ],
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Biểu đồ quạt tròn ghi: bóng đá 40%, bóng rổ 25%, bơi 20%, cầu lông 15%. Tổng các phần này bằng bao nhiêu?",
            options: ["100%", "90%", "110%", "95%"],
            answer: "100%",
            mascotHint: "40 + 25 + 20 + 15 = 100 (%).",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Môn nào được nhiều bạn yêu thích nhất?",
            options: ["Bóng đá", "Bóng rổ", "Bơi", "Cầu lông"],
            answer: "Bóng đá",
            mascotHint: "40% là tỉ số phần trăm lớn nhất.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Biểu đồ quạt tròn biểu diễn tỉ số phần trăm.",
              "Cả hình tròn là 100%.",
              "So sánh các phần nhờ tỉ số phần trăm.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g5-c11-l3",
      title:
        "Bài 65: Tỉ số của số lần lặp lại một sự kiện so với tổng số lần thực hiện",
      type: "learn",
      description:
        "Ghi lại kết quả thực hiện nhiều lần và tính tỉ số của số lần một sự kiện lặp lại",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Rô-bốt gieo xúc xắc 20 lần, có 4 lần xuất hiện mặt 5 chấm. Vậy tỉ số là 4/20 tức 1/5. 🎲",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Tỉ số của số lần lặp lại",
            explanation:
              "Khi thực hiện một hoạt động nhiều lần, ta ghi lại số lần mỗi sự kiện xảy ra. Tỉ số của số lần lặp lại một sự kiện so với tổng số lần thực hiện là số lần sự kiện đó xảy ra chia cho tổng số lần thực hiện.",
            points: [
              "Gieo xúc xắc 20 lần, mặt 5 chấm xuất hiện 4 lần ⇒ tỉ số 4/20 = 1/5.",
              "Tổng các tỉ số của mọi sự kiện bằng 1.",
              "Có thể viết tỉ số dưới dạng phân số hoặc tỉ số phần trăm.",
            ],
            rule: "Tỉ số = số lần sự kiện xảy ra : tổng số lần thực hiện.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Kết quả gieo xúc xắc 20 lần",
            table: {
              headers: ["Số chấm", "Số lần xuất hiện", "Tỉ số so với 20 lần"],
              rows: [
                ["1 chấm", 3, "3/20"],
                ["3 chấm", 5, "5/20 = 1/4"],
                ["5 chấm", 4, "4/20 = 1/5"],
              ],
              label: "Tổng số lần ghi được của các mặt bằng 20",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Gieo xúc xắc 20 lần, mặt 5 chấm xuất hiện 4 lần. Tỉ số của số lần xuất hiện mặt 5 chấm so với tổng số lần gieo là:",
            options: ["1/5", "1/4", "4/5", "5/20"],
            answer: "1/5",
            mascotHint: "4/20 rút gọn thành 1/5.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Tung đồng xu 50 lần, có 22 lần xuất hiện mặt sấp. Tỉ số của số lần mặt sấp xuất hiện so với tổng số lần tung là:",
            options: ["22/50", "28/50", "50/22", "22/100"],
            answer: "22/50",
            mascotHint: "Tỉ số = 22 : 50 = 22/50.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Ghi lại số lần mỗi sự kiện xảy ra.",
              "Tỉ số = số lần xảy ra : tổng số lần thực hiện.",
              "Có thể rút gọn hoặc đổi thành tỉ số phần trăm.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g5-c11-l4",
      title:
        "Bài 66: Thực hành và trải nghiệm thu thập, phân tích, biểu diễn các số liệu thống kê",
      type: "learn",
      description:
        "Thực hiện một cuộc khảo sát nhỏ: thu thập, phân tích và biểu diễn số liệu",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Cả lớp cùng làm một cuộc khảo sát về phương tiện đến trường, rồi vẽ biểu đồ cột để trình bày kết quả! 🚲",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Thực Hành",
            title: "Quy trình làm một cuộc khảo sát",
            explanation:
              "Để thực hành thống kê, ta làm theo ba bước: thu thập số liệu, phân tích số liệu (đếm, so sánh, tính tổng) và biểu diễn số liệu bằng bảng hoặc biểu đồ.",
            points: [
              "Bước 1: hỏi và ghi lại câu trả lời.",
              "Bước 2: đếm, so sánh và rút ra nhận xét.",
              "Bước 3: biểu diễn bằng bảng số liệu hoặc biểu đồ cột.",
            ],
            rule: "Số liệu thu thập phải chính xác và đầy đủ.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Phương tiện đến trường của học sinh lớp 5A",
            barChart: {
              title: "Phương tiện đến trường của lớp 5A",
              items: [
                { label: "Đi bộ", value: 8 },
                { label: "Xe đạp", value: 14 },
                { label: "Xe máy", value: 10 },
                { label: "Ô tô", value: 4 },
              ],
              unit: "bạn",
              highlight: 1,
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Lớp 5A có 8 bạn đi bộ, 14 bạn đi xe đạp, 10 bạn đi xe máy, 4 bạn đi ô tô. Tổng số bạn của lớp là:",
            options: ["36 bạn", "32 bạn", "34 bạn", "40 bạn"],
            answer: "36 bạn",
            mascotHint: "8 + 14 + 10 + 4 = 36 (bạn).",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Phương tiện nào được nhiều bạn sử dụng nhất?",
            options: ["Xe đạp", "Xe máy", "Đi bộ", "Ô tô"],
            answer: "Xe đạp",
            mascotHint: "14 bạn là số lớn nhất trong bảng.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Thu thập → phân tích → biểu diễn.",
              "Đếm chính xác, ghi đủ số liệu.",
              "Nhận xét dựa trên số liệu đã có.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g5-c11-l5",
      title: "Bài 67: Luyện tập chung",
      type: "learn",
      description:
        "Luyện tập số liệu thống kê, biểu đồ quạt tròn và tỉ số của số lần lặp lại",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Cùng ôn tập cách đọc số liệu, đọc biểu đồ quạt tròn và tính tỉ số của số lần lặp lại! 📈",
          },
        },
        {
          type: "visual",
          content: {
            text: "Tỉ số phần trăm số sách các loại trong thư viện",
            pieChart: {
              title: "Các loại sách trong thư viện",
              items: [
                { label: "Truyện thiếu nhi", percent: 45 },
                { label: "Sách khoa học", percent: 30 },
                { label: "Sách khác", percent: 25 },
              ],
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Biểu đồ quạt tròn ghi: truyện thiếu nhi 45%, sách khoa học 30%, sách khác 25%. Loại sách nào chiếm nhiều nhất?",
            options: [
              "Truyện thiếu nhi",
              "Sách khoa học",
              "Sách khác",
              "Bằng nhau",
            ],
            answer: "Truyện thiếu nhi",
            mascotHint: "45% lớn nhất trong ba tỉ số phần trăm.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Tung đồng xu 25 lần, có 12 lần xuất hiện mặt ngửa. Tỉ số của số lần mặt ngửa so với tổng số lần tung là:",
            options: ["12/25", "13/25", "25/12", "12/50"],
            answer: "12/25",
            mascotHint: "Tỉ số = 12 : 25 = 12/25.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Số liệu 45%; 30%; 25% được sắp xếp theo thứ tự từ lớn đến bé là:",
            options: [
              "45%; 30%; 25%",
              "25%; 30%; 45%",
              "30%; 45%; 25%",
              "45%; 25%; 30%",
            ],
            answer: "45%; 30%; 25%",
            mascotHint: "Từ lớn đến bé: 45 > 30 > 25.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Đọc và nhận xét số liệu đã thu thập.",
              "Biểu đồ quạt tròn luôn có tổng 100%.",
              "Tỉ số của số lần lặp lại = số lần : tổng số lần.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
  ],
};
