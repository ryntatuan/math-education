export const g2c5 = {
  id: "g2-c5",
  name: "Chủ đề 5: Làm quen với hình phẳng",
  description:
    "Điểm, đoạn thẳng, đường thẳng, đường cong, ba điểm thẳng hàng, đường gấp khúc, hình tứ giác",
  icon: "📐",
  color: "#8e7cc3",
  totalLessons: 8,
  lessons: [
    {
      id: "g2-c5-l1",
      title: "Bài 1: Điểm và đoạn thẳng",
      type: "learn",
      description: "Nhận biết điểm, đoạn thẳng và cách gọi tên",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Rô-bốt chấm hai chấm nhỏ lên giấy rồi nối lại. Bé xem được hình gì nhé! 📐",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Điểm và đoạn thẳng",
            explanation:
              "ĐIỂM là một chấm nhỏ, được đặt tên bằng chữ in hoa: A, B, C... Nối hai điểm với nhau ta được một ĐOẠN THẲNG.",
            rule: "Nối điểm A với điểm B ta được đoạn thẳng AB. Đọc là: đoạn thẳng A B.",
            pointLine: {
              kind: "segment",
              points: ["A", "B"],
              formula: "Nối A với B được đoạn thẳng AB",
            },
            points: [
              "Đoạn thẳng có hai đầu mút là hai điểm.",
              "Người ta dùng thước thẳng để nối và đo.",
              "Đoạn thẳng AB cũng chính là đoạn thẳng BA.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Nối điểm A với điểm B ta được đoạn thẳng AB",
            pointLine: {
              kind: "segment",
              points: ["A", "B"],
              formula: "Đoạn thẳng AB có hai đầu mút là A và B",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Nối hai điểm A và B ta được hình gì?",
            pointLine: {
              kind: "pointsOnly",
              points: ["A", "B"],
              formula: "Hai điểm A và B — nối lại thì được hình gì?",
            },
            options: [
              "Đoạn thẳng AB",
              "Đường cong",
              "Hình tứ giác",
              "Đường gấp khúc",
            ],
            answer: "Đoạn thẳng AB",
            mascotHint: "Nối hai điểm được một đoạn thẳng.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Điểm đặt tên bằng chữ in hoa: A, B, C.",
              "Nối hai điểm được đoạn thẳng có hai đầu mút.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g2-c5-l2",
      title: "Bài 2: Đường thẳng và đường cong",
      type: "learn",
      description: "Phân biệt đường thẳng, đoạn thẳng và đường cong",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Đoạn thẳng và đường thẳng khác nhau ở đâu nhỉ? Bé cùng tìm hiểu nhé! 🤔",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Đường thẳng và đường cong",
            explanation:
              "ĐƯỜNG THẲNG là đường kéo dài mãi về hai phía, không có đầu mút. ĐƯỜNG CONG là đường uốn lượn, không thẳng.",
            rule: "Đoạn thẳng AB có hai đầu mút. Đường thẳng AB kéo dài mãi cả hai phía. Đường cong thì uốn lượn như con rắn.",
            points: [
              "Đoạn thẳng có giới hạn, đường thẳng không có giới hạn.",
              "Dây cung, mép bàn thẳng là đường thẳng.",
              "Sợi dây thừng uốn lượn, con đường quanh co là đường cong.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Đoạn thẳng AB: chỉ từ A đến B",
            pointLine: {
              kind: "segment",
              points: ["A", "B"],
              formula: "Đoạn thẳng AB có hai đầu mút A và B",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Đường thẳng AB: kéo dài mãi về hai phía",
            pointLine: {
              kind: "line",
              points: ["A", "B"],
              formula: "Đường thẳng AB đi qua A, B và kéo dài mãi hai phía",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Đường cong: uốn lượn, không thẳng",
            pointLine: {
              kind: "curve",
              formula: "Đường cong uốn lượn, không có đầu mút thẳng",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Ba loại đường — bé phân biệt nhé",
            table: {
              headers: ["Loại", "Đặc điểm"],
              rows: [
                ["Đoạn thẳng AB", "có hai đầu mút"],
                ["Đường thẳng AB", "kéo dài mãi về hai phía"],
                ["Đường cong", "uốn lượn, không thẳng"],
              ],
              label: "Đường thẳng và đường cong",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Đường thẳng khác đoạn thẳng ở điểm nào?",
            options: [
              "Đường thẳng kéo dài mãi hai phía, không có đầu mút",
              "Đường thẳng ngắn hơn",
              "Đường thẳng uốn lượn",
              "Đường thẳng chỉ có một đầu",
            ],
            answer: "Đường thẳng kéo dài mãi hai phía, không có đầu mút",
            mascotHint:
              "Đoạn thẳng có hai đầu mút, đường thẳng kéo dài mãi không có đầu mút.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Đoạn thẳng có hai đầu mút, đường thẳng kéo dài mãi.",
              "Đường cong thì uốn lượn, không thẳng.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g2-c5-l3",
      title: "Bài 3: Ba điểm thẳng hàng",
      type: "learn",
      description: "Nhận biết ba điểm cùng nằm trên một đường thẳng",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Ba bạn kiến đứng xếp thành một hàng thẳng tắp! Đó gọi là ba điểm thẳng hàng đấy 🐞",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Ba điểm thẳng hàng",
            explanation:
              "Ba điểm được gọi là THẲNG HÀNG khi chúng cùng nằm trên một đường thẳng.",
            rule: "Ba điểm A, B, C cùng nằm trên một đường thẳng thì A, B, C là ba điểm thẳng hàng.",
            pointLine: {
              kind: "collinear",
              points: ["A", "B", "C"],
              formula: "A, B, C cùng nằm trên một đường thẳng",
            },
            points: [
              "Muốn kiểm tra, bé đặt thước thẳng qua hai điểm rồi xem điểm thứ ba có nằm trên mép thước không.",
              "Ba điểm không cùng nằm trên một đường thẳng thì không thẳng hàng.",
              "Ba điểm thẳng hàng có thể theo thứ tự A, B, C — khi đó B nằm giữa A và C.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Ba điểm A, B, C cùng nằm trên một đường thẳng",
            pointLine: {
              kind: "collinear",
              points: ["A", "B", "C"],
              formula:
                "A, B, C cùng nằm trên một đường thẳng ⇒ ba điểm THẲNG HÀNG",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Điểm C không nằm trên đường thẳng AB",
            pointLine: {
              kind: "notCollinear",
              points: ["A", "B", "C"],
              formula:
                "C không nằm trên đường thẳng AB ⇒ ba điểm KHÔNG thẳng hàng",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Ba điểm thẳng hàng hay không?",
            table: {
              headers: ["Ba điểm", "Kết luận"],
              rows: [
                ["A, B, C cùng nằm trên một đường thẳng", "thẳng hàng"],
                ["A, B cùng đường, C nằm ngoài", "không thẳng hàng"],
              ],
              label: "Ba điểm thẳng hàng",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Khi nào ba điểm được gọi là thẳng hàng?",
            options: [
              "Khi chúng cùng nằm trên một đường thẳng",
              "Khi chúng cách nhau đều nhau",
              "Khi chúng nằm trên một đường cong",
              "Khi chúng tạo thành hình tứ giác",
            ],
            answer: "Khi chúng cùng nằm trên một đường thẳng",
            mascotHint: "Cùng nằm trên một đường thẳng thì gọi là thẳng hàng.",
            planeShapes: [
              {
                kind: "rectangle",
                color: "#ec4899",
              },
            ],
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Ba điểm thẳng hàng khi cùng nằm trên một đường thẳng.",
              "Dùng thước thẳng để kiểm tra.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g2-c5-l4",
      title: "Bài 4: Đường gấp khúc",
      type: "learn",
      description: "Nhận biết đường gấp khúc và gọi tên đường gấp khúc",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Rô-bốt đi theo đường zích zắc! Đó chính là đường gấp khúc đấy 🎯",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Đường gấp khúc",
            explanation:
              "ĐƯỜNG GẤP KHÚC gồm nhiều đoạn thẳng nối tiếp nhau, không cùng nằm trên một đường thẳng.",
            rule: "Hình gồm ba đoạn thẳng AB, BC, CD nối tiếp nhau tạo thành đường gấp khúc ABCD.",
            pointLine: {
              kind: "polyline",
              points: ["A", "B", "C", "D"],
              formula: "AB, BC, CD nối tiếp nhau ⇒ đường gấp khúc ABCD",
            },
            points: [
              "Mỗi đoạn thẳng trong đường gấp khúc gọi là một đoạn của đường gấp khúc.",
              "Đường gấp khúc ABCD gồm ba đoạn: AB, BC và CD.",
              "Các điểm A, B, C, D gọi là các điểm của đường gấp khúc.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Đường gấp khúc ABCD gồm ba đoạn: AB, BC, CD",
            pointLine: {
              kind: "polyline",
              points: ["A", "B", "C", "D"],
              formula: "Đường gấp khúc ABCD = AB + BC + CD",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Đường gấp khúc ABCD gồm bao nhiêu đoạn thẳng?",
            pointLine: {
              kind: "polyline",
              points: ["A", "B", "C", "D"],
              formula: "Đếm các đoạn của đường gấp khúc",
            },
            options: ["2 đoạn", "3 đoạn", "4 đoạn", "5 đoạn"],
            answer: "3 đoạn",
            mascotHint: "Bốn điểm A, B, C, D tạo thành ba đoạn: AB, BC, CD.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Đường gấp khúc gồm nhiều đoạn thẳng nối tiếp nhau.",
              "Đường gấp khúc ABCD có ba đoạn thẳng.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g2-c5-l5",
      title: "Bài 5: Tính độ dài đường gấp khúc",
      type: "learn",
      description: "Tính độ dài đường gấp khúc bằng tổng các đoạn thẳng",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Rô-bốt đi hết đường gấp khúc dài bao nhiêu xăng-ti-mét nhỉ? 🐾",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Mẹo Nhớ",
            title: "Cộng độ dài các đoạn lại",
            explanation:
              "Muốn tính độ dài đường gấp khúc, ta cộng độ dài các đoạn thẳng của nó lại với nhau.",
            rule: "Đường gấp khúc ABCD có AB = 3 cm, BC = 4 cm, CD = 5 cm. Độ dài đường gấp khúc là 3 + 4 + 5 = 12 cm.",
            points: [
              "Đơn vị của kết quả giống đơn vị của các đoạn: cm.",
              "Có bao nhiêu đoạn thì cộng bấy nhiêu số.",
              "Đọc kĩ hình để biết số đo từng đoạn.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "AB = 3 cm · BC = 4 cm · CD = 5 cm\n3 + 4 + 5 = 12 (cm)",
            operation: {
              left: 7,
              sign: "+",
              right: 5,
              result: 12,
            },
            table: {
              headers: ["Đoạn", "Dài"],
              rows: [
                ["AB", "3 cm"],
                ["BC", "4 cm"],
                ["CD", "5 cm"],
                ["Cả đường gấp khúc", "3 + 4 + 5 = 12 cm"],
              ],
              label: "Độ dài đường gấp khúc bằng tổng độ dài các đoạn",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Đường gấp khúc ABCD có AB = 3 cm, BC = 4 cm, CD = 5 cm. Đường gấp khúc dài bao nhiêu?",
            options: ["9 cm", "12 cm", "15 cm", "7 cm"],
            answer: "12 cm",
            mascotHint: "3 + 4 + 5 = 12 cm.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Đường gấp khúc có hai đoạn: đoạn thứ nhất 6 cm, đoạn thứ hai 8 cm. Đường gấp khúc dài bao nhiêu?",
            options: ["2 cm", "14 cm", "48 cm", "86 cm"],
            answer: "14 cm",
            mascotHint: "6 + 8 = 14 cm.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Độ dài đường gấp khúc bằng tổng độ dài các đoạn thẳng.",
              "3 + 4 + 5 = 12 cm.",
            ],
            mascotMood: "celebrate",
          },
        },
      ],
    },
    {
      id: "g2-c5-l6",
      title: "Bài 6: Hình tứ giác",
      type: "learn",
      description: "Nhận biết hình tứ giác và các đặc điểm của nó",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Rô-bốt cắt một hình có bốn cạnh. Bé đoán xem đó là hình gì? ✂️",
            planeShape: {
              kind: "parallelogram",
              labels: ["cạnh", "cạnh"],
              vertices: true,
              showName: false,
              formula: "Hình có 4 cạnh",
            },
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Hình tứ giác",
            explanation: "Hình TỨ GIÁC là hình có 4 cạnh và 4 đỉnh.",
            rule: "Hình tứ giác ABCD có 4 cạnh: AB, BC, CD, DA và 4 đỉnh: A, B, C, D.",
            points: [
              "Mép bàn, viên gạch, mặt quyển sách đều có dạng tứ giác.",
              "Hình vuông và hình chữ nhật cũng là hình tứ giác — loại đặc biệt.",
              "Đếm kĩ: 4 cạnh, 4 đỉnh.",
            ],
            planeShape: {
              kind: "quad",
              labels: ["AB", "BC", "CD", "DA"],
              vertexLabels: ["A", "B", "C", "D"],
              formula: "Tứ giác ABCD: 4 cạnh, 4 đỉnh",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Hình tứ giác ABCD: 4 cạnh AB, BC, CD, DA · 4 đỉnh A, B, C, D",
            planeShape: {
              kind: "quad",
              labels: ["AB", "BC", "CD", "DA"],
              vertexLabels: ["A", "B", "C", "D"],
              formula: "4 cạnh: AB, BC, CD, DA · 4 đỉnh: A, B, C, D",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Hình tứ giác có mấy cạnh và mấy đỉnh?",
            options: [
              "3 cạnh, 3 đỉnh",
              "4 cạnh, 4 đỉnh",
              "4 cạnh, 3 đỉnh",
              "5 cạnh, 5 đỉnh",
            ],
            answer: "4 cạnh, 4 đỉnh",
            mascotHint: "'Tứ' nghĩa là bốn: 4 cạnh và 4 đỉnh.",
            planeShapes: [
              {
                kind: "rectangle",
                color: "#ec4899",
              },
            ],
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Hình tứ giác có 4 cạnh và 4 đỉnh.",
              "Hình vuông, hình chữ nhật cũng là hình tứ giác.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g2-c5-l7",
      title: "Bài 7: Thực hành vẽ đoạn thẳng, gấp cắt ghép hình",
      type: "learn",
      description: "Dùng thước vẽ đoạn thẳng có độ dài cho trước",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Hôm nay bé làm thợ thủ công! Mình vẽ và gấp hình nhé ✂️",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Thực Hành",
            title: "Vẽ đoạn thẳng dài 4 cm",
            explanation:
              "Đặt thước sao cho vạch 0 trùng với điểm đầu. Chấm điểm thứ hai ở đúng vạch số cần vẽ, rồi nối hai điểm lại.",
            rule: "Vẽ đoạn thẳng AB dài 4 cm: đặt vạch 0 tại A, chấm B ở vạch 4, nối A với B.",
            pointLine: {
              kind: "segment",
              points: ["A", "B"],
              formula: "Đoạn thẳng AB dài 4 cm",
            },
            points: [
              "Vạch 0 phải trùng đúng điểm đầu.",
              "Giữ thước thật chắc để đường vẽ không bị lệch.",
              "Gấp, cắt, ghép hình giúp bé nhận ra các hình đã học.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Vạch 0 tại A, chấm B ở vạch 4\nA •————• B  = 4 cm",
            ruler: {
              lengthCm: 4,
              measure: {
                from: 0,
                to: 4,
              },
              label:
                "Vẽ đoạn thẳng AB dài 4 cm: đặt vạch 0 tại A, chấm B ở vạch 4",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Muốn vẽ đoạn thẳng dài 5 cm, bé đặt vạch số mấy của thước vào điểm đầu?",
            options: ["Vạch 0", "Vạch 1", "Vạch 5", "Vạch 10"],
            answer: "Vạch 0",
            ruler: {
              lengthCm: 10,
              measure: {
                from: 0,
                to: 5,
              },
              label: "Vạch 0 ở điểm đầu, chấm điểm thứ hai ở vạch 5",
            },
            mascotHint:
              "Luôn đặt vạch 0 trùng với điểm đầu, rồi chấm điểm thứ hai ở vạch 5.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Đặt vạch 0 vào điểm đầu khi vẽ đoạn thẳng.",
              "Gấp, cắt, ghép hình giúp nhận biết các hình phẳng.",
            ],
            mascotMood: "celebrate",
          },
        },
      ],
    },
    {
      id: "g2-c5-l8",
      title: "Bài 8: Luyện tập chung chủ đề 5",
      type: "learn",
      description:
        "Ôn tập điểm, đoạn thẳng, ba điểm thẳng hàng, đường gấp khúc, tứ giác",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Bé đã học xong các hình phẳng rồi! Mình tổng kết nhé 🎉",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Tổng kết chủ đề 5",
            explanation:
              "Bé đã học điểm, đoạn thẳng, đường thẳng, đường cong, ba điểm thẳng hàng, đường gấp khúc và hình tứ giác.",
            points: [
              "Đoạn thẳng có hai đầu mút; đường thẳng kéo dài mãi.",
              "Độ dài đường gấp khúc bằng tổng các đoạn.",
              "Hình tứ giác có 4 cạnh, 4 đỉnh.",
            ],
            planeShapes: [
              {
                kind: "rectangle",
                color: "#ec4899",
              },
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Đường gấp khúc: cộng các đoạn",
            planeShape: {
              kind: "rectangle",
              formula: "Hình tứ giác: 4 cạnh · 4 đỉnh",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Hình tứ giác: 4 cạnh, 4 đỉnh",
            ruler: {
              lengthCm: 10,
              measure: {
                from: 0,
                to: 10,
              },
              label: "Đường gấp khúc: cộng độ dài các đoạn lại",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Đường gấp khúc gồm 3 đoạn dài 2 cm, 3 cm và 4 cm. Độ dài đường gấp khúc là bao nhiêu?",
            options: ["7 cm", "9 cm", "10 cm", "24 cm"],
            answer: "9 cm",
            mascotHint: "2 + 3 + 4 = 9 cm.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Hình nào dưới đây KHÔNG phải là hình tứ giác?",
            options: [
              "Hình tam giác",
              "Hình chữ nhật",
              "Hình vuông",
              "Hình thang",
            ],
            answer: "Hình tam giác",
            mascotHint: "Hình tam giác có 3 cạnh nên không phải tứ giác.",
            planeShapes: [
              {
                kind: "square",
                color: "#3b82f6",
              },
            ],
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Đường gấp khúc: cộng độ dài các đoạn.",
              "Tứ giác: 4 cạnh, 4 đỉnh. Tam giác: 3 cạnh.",
            ],
            mascotMood: "celebrate",
          },
        },
      ],
    },
  ],
};
