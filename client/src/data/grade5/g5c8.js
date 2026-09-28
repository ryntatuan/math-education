export const g5c8 = {
  id: "g5-c8",
  name: "Chủ đề 8: Thể tích. Đơn vị đo thể tích",
  description:
    "Thể tích của một hình; xăng-ti-mét khối, đề-xi-mét khối, mét khối và quan hệ giữa các đơn vị",
  icon: "🧊",
  color: "#0891b2",
  totalLessons: 4,
  lessons: [
    {
      id: "g5-c8-l1",
      title: "Bài 45: Thể tích của một hình",
      type: "learn",
      description:
        "Nhận biết thể tích của một hình qua việc so sánh bằng các hình lập phương nhỏ",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Chiếc hộp nào chứa được nhiều hơn: hộp đựng 8 khối lập phương hay hộp đựng 12 khối? Hình nào chiếm nhiều không gian hơn thì có thể tích lớn hơn! 🧊",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Thể tích của một hình",
            explanation:
              "Thể tích của một hình là lượng không gian mà hình đó chiếm chỗ. Ta có thể so sánh thể tích hai hình bằng cách đếm xem mỗi hình gồm bao nhiêu hình lập phương nhỏ như nhau.",
            points: [
              "Hình nào gồm nhiều hình lập phương nhỏ hơn thì thể tích lớn hơn.",
              "Hình lập phương cạnh 1 cm có thể tích là 1 xăng-ti-mét khối.",
              "Hai hình bằng nhau thì có thể tích bằng nhau.",
            ],
            rule: "Thể tích là phần không gian mà hình chiếm chỗ.",
          },
        },
        {
          type: "visual",
          content: {
            text: "So sánh thể tích bằng khối lập phương nhỏ",
            table: {
              headers: ["Hình", "Số khối lập phương nhỏ", "So sánh"],
              rows: [
                ["Hình A", 8, "Thể tích bé hơn"],
                ["Hình B", 12, "Thể tích lớn hơn"],
                ["Hình C", 12, "Bằng thể tích hình B"],
              ],
              label: "Các khối lập phương dùng để so sánh phải bằng nhau",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Hình A gồm 8 khối lập phương nhỏ, hình B gồm 12 khối như thế. Hình nào có thể tích lớn hơn?",
            options: ["Hình B", "Hình A", "Bằng nhau", "Không so sánh được"],
            answer: "Hình B",
            mascotHint: "12 khối nhiều hơn 8 khối nên hình B chiếm nhiều không gian hơn.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Thể tích của một hình là gì?",
            options: [
              "Phần không gian mà hình đó chiếm chỗ",
              "Độ dài đường bao quanh hình",
              "Số mặt của hình",
              "Số đỉnh của hình",
            ],
            answer: "Phần không gian mà hình đó chiếm chỗ",
            mascotHint: "Thể tích nói về không gian hình chiếm, khác với chu vi, diện tích.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Thể tích là lượng không gian hình chiếm chỗ.",
              "So sánh thể tích bằng cách đếm khối lập phương nhỏ.",
              "Hình bằng nhau thì thể tích bằng nhau.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g5-c8-l2",
      title: "Bài 46: Xăng-ti-mét khối. Đề-xi-mét khối",
      type: "learn",
      description:
        "Nhận biết đơn vị đo thể tích cm³, dm³ và quan hệ 1 dm³ = 1 000 cm³",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "thinking",
            text: "Một khối lập phương cạnh 1 cm có thể tích 1 cm³. Khối lập phương cạnh 1 dm thì thể tích lớn hơn rất nhiều: 1 dm³ = 1 000 cm³! 📦",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Xăng-ti-mét khối và đề-xi-mét khối",
            explanation:
              "Xăng-ti-mét khối là thể tích của hình lập phương có cạnh dài 1 cm, viết tắt là cm³. Đề-xi-mét khối là thể tích của hình lập phương có cạnh dài 1 dm, viết tắt là dm³.",
            points: [
              "1 dm³ = 1 000 cm³.",
              "1 dm³ còn được gọi là 1 lít: 1 dm³ = 1 l.",
              "Thể tích nước trong chai 1 lít là 1 dm³.",
            ],
            rule: "1 dm³ = 1 000 cm³ = 1 lít.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Quan hệ giữa cm³ và dm³",
            table: {
              headers: ["Đơn vị", "Cạnh của hình lập phương", "Quan hệ"],
              rows: [
                ["1 cm³", "1 cm", "đơn vị bé"],
                ["1 dm³", "1 dm", "1 dm³ = 1 000 cm³"],
                ["1 lít", "1 dm cạnh", "1 l = 1 dm³ = 1 000 cm³"],
              ],
              label: "Đơn vị đo thể tích liền kề hơn kém nhau 1 000 lần",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "1 dm³ bằng bao nhiêu xăng-ti-mét khối?",
            options: ["1 000 cm³", "100 cm³", "10 cm³", "10 000 cm³"],
            answer: "1 000 cm³",
            mascotHint: "Mỗi đơn vị đo thể tích liền kề hơn kém nhau 1 000 lần.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "3 dm³ bằng bao nhiêu xăng-ti-mét khối?",
            options: ["3 000 cm³", "300 cm³", "30 cm³", "30 000 cm³"],
            answer: "3 000 cm³",
            mascotHint: "3 × 1 000 = 3 000 (cm³).",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "cm³ là thể tích hình lập phương cạnh 1 cm.",
              "dm³ là thể tích hình lập phương cạnh 1 dm.",
              "1 dm³ = 1 000 cm³ = 1 lít.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g5-c8-l3",
      title: "Bài 47: Mét khối",
      type: "learn",
      description:
        "Nhận biết mét khối (m³) và quan hệ với dm³, cm³, lít",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Bể bơi ở trường chứa được 60 m³ nước. 1 m³ là thể tích của hình lập phương cạnh 1 m — to bằng cả một chiếc thùng lớn! 🏊",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Mét khối",
            explanation:
              "Mét khối là thể tích của hình lập phương có cạnh dài 1 m, viết tắt là m³. Mét khối được dùng để đo thể tích của những vật lớn như bể nước, căn phòng, thùng hàng.",
            points: [
              "1 m³ = 1 000 dm³.",
              "1 m³ = 1 000 000 cm³.",
              "1 m³ = 1 000 lít.",
            ],
            rule: "Đơn vị đo thể tích lớn hơn liền trước gấp 1 000 lần.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Quan hệ giữa các đơn vị đo thể tích",
            table: {
              headers: ["Đơn vị", "Quan hệ"],
              rows: [
                ["1 m³", "1 000 dm³"],
                ["1 dm³", "1 000 cm³"],
                ["1 m³", "1 000 000 cm³"],
                ["1 m³", "1 000 lít"],
              ],
              label: "Mỗi bậc đổi 1 000 lần",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "1 m³ bằng bao nhiêu đề-xi-mét khối?",
            options: ["1 000 dm³", "100 dm³", "10 000 dm³", "10 dm³"],
            answer: "1 000 dm³",
            mascotHint: "Hình lập phương cạnh 1 m chứa được 10 × 10 × 10 = 1 000 hình lập phương cạnh 1 dm.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Bể bơi chứa 60 m³ nước. Số nước đó tương ứng bao nhiêu lít?",
            options: ["60 000 lít", "6 000 lít", "600 lít", "600 000 lít"],
            answer: "60 000 lít",
            mascotHint: "1 m³ = 1 000 lít nên 60 m³ = 60 000 lít.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "1 m³ = 1 000 dm³.",
              "1 dm³ = 1 000 cm³.",
              "1 m³ = 1 000 lít.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g5-c8-l4",
      title: "Bài 48: Luyện tập chung",
      type: "learn",
      description:
        "Luyện tập đổi đơn vị đo thể tích và so sánh thể tích",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Một thùng chứa 2,5 m³ nước tức là 2 500 dm³. Cùng luyện tập đổi đơn vị đo thể tích nhé! 🛢️",
          },
        },
        {
          type: "visual",
          content: {
            text: "Luyện tập đổi đơn vị đo thể tích",
            table: {
              headers: ["Số đo", "Đổi đơn vị"],
              rows: [
                ["2,5 m³", "2 500 dm³"],
                ["3 000 cm³", "3 dm³"],
                ["0,5 m³", "500 dm³"],
                ["7 dm³", "7 000 cm³"],
              ],
              label: "Đổi từ lớn sang bé thì nhân 1 000",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "3 000 cm³ bằng bao nhiêu đề-xi-mét khối?",
            options: ["3 dm³", "30 dm³", "300 dm³", "0,3 dm³"],
            answer: "3 dm³",
            mascotHint: "3 000 : 1 000 = 3 (dm³).",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Sắp xếp các số đo 2 dm³; 500 cm³; 1 dm³ theo thứ tự từ bé đến lớn:",
            options: [
              "500 cm³; 1 dm³; 2 dm³",
              "1 dm³; 500 cm³; 2 dm³",
              "2 dm³; 1 dm³; 500 cm³",
              "500 cm³; 2 dm³; 1 dm³",
            ],
            answer: "500 cm³; 1 dm³; 2 dm³",
            mascotHint: "Đổi về cùng đơn vị: 500 cm³ = 0,5 dm³ < 1 dm³ < 2 dm³.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "0,5 m³ bằng bao nhiêu đề-xi-mét khối?",
            options: ["500 dm³", "50 dm³", "5 000 dm³", "5 dm³"],
            answer: "500 dm³",
            mascotHint: "0,5 × 1 000 = 500 (dm³).",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Mỗi bậc đơn vị thể tích đổi 1 000 lần.",
              "Đổi về cùng đơn vị trước khi so sánh.",
              "1 dm³ = 1 lít.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
  ],
};
