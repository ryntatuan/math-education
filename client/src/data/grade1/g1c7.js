export const g1c7 = {
  id: "g1-c7",
  name: "Chủ đề 7: Độ dài và đo độ dài",
  description:
    "Dài hơn ngắn hơn; đơn vị đo độ dài xăng-ti-mét; thực hành ước lượng và đo",
  icon: "📏",
  color: "#ef476f",
  totalLessons: 9,
  lessons: [
    {
      id: "g1-c7-l1",
      title: "Bài 1: Dài hơn, ngắn hơn",
      type: "learn",
      description: "So sánh độ dài của hai vật bằng cách nhìn trực tiếp",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Bút chì xanh và bút chì đỏ, cái nào dài hơn nhỉ? Bé nhìn xem! ✏️",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Dài hơn, ngắn hơn",
            explanation:
              "Muốn so sánh độ dài hai vật, bé đặt chúng CẠNH NHAU, cho hai đầu bằng nhau, rồi xem đầu nào thừa ra.",
            rule: "Bút xanh dài hơn bút đỏ. Bút đỏ ngắn hơn bút xanh.",
            points: [
              "Đặt hai vật sát nhau, một đầu thẳng hàng.",
              "Đầu nào thừa ra thì vật đó dài hơn.",
              "Nếu hai đầu đều bằng nhau thì hai vật dài bằng nhau.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "✏️✏️✏️✏️✏️  (bút xanh)\n✏️✏️✏️      (bút đỏ)\nBút xanh dài hơn",
            ruler: {
              lengthCm: 5,
              measure: {
                from: 0,
                to: 5,
              },
              label: "Bút xanh dài 5 cm, bút đỏ dài 3 cm — bút xanh dài hơn",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "So sánh độ dài hai vật thì bé nên làm gì?",
            options: [
              "Đặt hai vật cạnh nhau, một đầu thẳng hàng",
              "Đoán bằng mắt thôi",
              "Cân hai vật lên",
              "Đặt hai vật cách xa nhau",
            ],
            answer: "Đặt hai vật cạnh nhau, một đầu thẳng hàng",
            mascotHint:
              "Đặt cạnh nhau và cho một đầu thẳng hàng để so cho đúng.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Đặt hai vật cạnh nhau, một đầu thẳng hàng.",
              "Đầu thừa ra là vật dài hơn.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g1-c7-l9",
      title: "Bài 2: Cao hơn, thấp hơn",
      type: "learn",
      description:
        "So sánh chiều cao của hai vật bằng cách đặt cùng một mặt phẳng",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Cây cau cao hơn cây chuối. Vậy cây nào thấp hơn nhỉ? Bé cùng Rô-bốt so chiều cao nhé! 🌴",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Cao hơn, thấp hơn",
            explanation:
              "Muốn biết vật nào cao hơn, bé để hai vật cùng đứng trên MỘT mặt phẳng rồi nhìn xem vật nào vươn cao hơn.",
            rule: "Vật vươn cao hơn là vật CAO HƠN. Vật vươn thấp hơn là vật THẤP HƠN.",
            points: [
              "So chiều cao cũng giống so độ dài: hai vật phải cùng một mốc bắt đầu.",
              "Cao hơn — thấp hơn dùng cho chiều cao; dài hơn — ngắn hơn dùng cho chiều dài.",
              "Đứng lên ghế mà cao hơn thì đó không phải chiều cao thật của bạn ấy.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Chiều cao của ba cây trong vườn (mỗi vạch là 1 gang tay)",
            barChart: {
              title: "Chiều cao của ba cây",
              items: [
                {
                  label: "Cây A",
                  value: 5,
                },
                {
                  label: "Cây B",
                  value: 3,
                },
                {
                  label: "Cây C",
                  value: 4,
                },
              ],
              unit: "gang tay",
              highlight: 0,
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Cây A cao 5 gang tay, cây B cao 3 gang tay. Cây nào cao hơn?",
            options: ["Cây A", "Cây B", "Hai cây cao bằng nhau"],
            answer: "Cây A",
            mascotHint: "5 gang tay nhiều hơn 3 gang tay nên cây A cao hơn.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Cây B cao 3 gang tay, cây C cao 4 gang tay. Cây nào thấp hơn?",
            options: ["Cây B", "Cây C", "Hai cây cao bằng nhau"],
            answer: "Cây B",
            mascotHint: "3 gang tay ít hơn 4 gang tay nên cây B thấp hơn.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Con vật nào cao hơn: hươu cao cổ hay ngựa?",
            options: ["Hươu cao cổ", "Ngựa", "Cao bằng nhau"],
            answer: "Hươu cao cổ",
            mascotHint: "Hươu cao cổ vươn cổ lên rất cao nên cao hơn ngựa.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Cao hơn — thấp hơn: so chiều cao khi hai vật cùng đứng trên một mặt phẳng.",
              "Trong ba cây, cây A cao 5 gang tay là cây cao nhất.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g1-c7-l2",
      title: "Bài 3: So sánh độ dài gián tiếp qua vật trung gian",
      type: "learn",
      description: "So sánh độ dài khi không đặt được hai vật cạnh nhau",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Bé không đặt được bàn và cửa sát nhau. Vậy so độ dài thế nào nhỉ? 🪑",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Mẹo Nhớ",
            title: "Dùng vật trung gian",
            explanation:
              "Khi không thể đặt hai vật cạnh nhau, bé dùng một vật thứ ba để đo cả hai, rồi so kết quả.",
            rule: "Bàn dài 3 gang tay, cửa sổ dài 2 gang tay. Vậy bàn dài hơn cửa sổ.",
            points: [
              "Dùng cùng một vật để đo cả hai thì mới so được.",
              "Bàn 3 gang tay > cửa sổ 2 gang tay.",
              "Cách này gọi là so sánh gián tiếp.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Bàn     = 3 gang tay\nCửa sổ  = 2 gang tay\n→ Bàn dài hơn",
            table: {
              headers: ["Vật", "Số gang tay"],
              rows: [
                ["Bàn học", "3"],
                ["Cửa sổ", "2"],
              ],
              label: "Bàn dài 3 gang tay, cửa sổ dài 2 gang tay → bàn dài hơn",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Bàn dài 3 gang tay, cửa sổ dài 2 gang tay. Vật nào dài hơn?",
            options: [
              "Cái bàn",
              "Cửa sổ",
              "Hai vật bằng nhau",
              "Không so sánh được",
            ],
            answer: "Cái bàn",
            mascotHint: "3 gang tay nhiều hơn 2 gang tay nên bàn dài hơn.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Dùng cùng một vật để đo cả hai rồi so kết quả.",
              "3 gang tay > 2 gang tay.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g1-c7-l3",
      title: "Bài 4: Xăng-ti-mét — đơn vị đo độ dài",
      type: "learn",
      description: "Nhận biết đơn vị xăng-ti-mét và thước có vạch chia",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Rô-bốt có một cây thước có vạch số. Bé xem thước dùng để làm gì nhé! 📏",
            ruler: {
              from: 0,
              to: 10,
              unit: "cm",
              markAt: [0, 5, 10],
              label: "Thước có vạch chia xăng-ti-mét",
            },
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Xăng-ti-mét",
            explanation:
              "XĂNG-TI-MÉT là đơn vị đo độ dài. Viết tắt là cm. Thước kẻ có các vạch chia từng xăng-ti-mét.",
            rule: "Tẩy bút chì dài khoảng 3 cm. Đọc là: ba xăng-ti-mét.",
            points: [
              "Trên thước, mỗi khoảng giữa hai vạch liền nhau là 1 cm.",
              "Thước bắt đầu từ vạch 0.",
              "Đơn vị cm giúp bé nói chính xác vật dài bao nhiêu.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "📏  0 — 1 — 2 — 3 — 4 — 5 ...\nMỗi khoảng = 1 cm",
            ruler: {
              lengthCm: 5,
              measure: {
                from: 0,
                to: 5,
              },
              label: "Mỗi khoảng trên thước dài 1 cm",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Đơn vị xăng-ti-mét viết tắt là gì?",
            options: ["cm", "m", "kg", "xăng"],
            answer: "cm",
            mascotHint: "Xăng-ti-mét viết tắt là cm.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Xăng-ti-mét viết tắt là cm.",
              "Mỗi khoảng trên thước là 1 cm.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g1-c7-l4",
      title: "Bài 5: Dùng thước kẻ đo độ dài",
      type: "learn",
      description: "Đặt thước và đọc số đo độ dài của vật",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Đo bút chì thế nào cho đúng nhỉ? Bé cùng Rô-bốt làm nhé! ✏️",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Thực Hành",
            title: "Ba bước đo độ dài",
            explanation:
              "Đặt vạch 0 của thước trùng với một đầu vật. Giữ thước thẳng theo vật. Đọc số ở đầu kia của vật.",
            rule: "Bút chì dài 8 cm nếu đầu kia của bút trùng vạch số 8.",
            points: [
              "Luôn đặt vạch 0 vào đầu vật — đây là bước hay bị quên nhất.",
              "Giữ thước thẳng, không xiên.",
              "Đọc số ở đầu còn lại và ghi kèm cm.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "0 ——————— 8\nĐầu vật ở vạch 0, đầu kia ở vạch 8\n→ dài 8 cm",
            ruler: {
              lengthCm: 8,
              measure: {
                from: 0,
                to: 8,
              },
              label: "Đầu vật đặt ở vạch 0, đầu kia ở vạch 8 → vật dài 8 cm",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Khi đo độ dài, bé đặt vạch số mấy của thước vào một đầu vật?",
            options: ["Vạch 0", "Vạch 1", "Vạch 5", "Vạch cuối thước"],
            answer: "Vạch 0",
            ruler: {
              lengthCm: 10,
              label: "Vạch 0 nằm ở đầu trái của thước",
            },
            mascotHint:
              "Đặt vạch 0 trùng với một đầu vật rồi đọc số ở đầu kia.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Một đoạn thẳng có đầu ở vạch 0 và đầu kia ở vạch 6. Đoạn thẳng dài bao nhiêu?",
            options: ["5 cm", "6 cm", "7 cm", "60 cm"],
            answer: "6 cm",
            ruler: {
              lengthCm: 10,
              measure: {
                from: 0,
                to: 6,
              },
              label: "Đoạn thẳng dài 6 cm",
            },
            mascotHint: "Đọc số ở đầu kia: 6 cm.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Đặt vạch 0 vào đầu vật rồi đọc số ở đầu kia.",
              "Vật dài 6 cm thì ghi kèm đơn vị cm.",
            ],
            mascotMood: "celebrate",
          },
        },
      ],
    },
    {
      id: "g1-c7-l5",
      title: "Bài 6: Vẽ đoạn thẳng có độ dài cho trước",
      type: "learn",
      description: "Dùng thước vẽ đoạn thẳng dài đúng số xăng-ti-mét",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Bé hãy vẽ một đoạn thẳng dài 5 cm nhé! Rô-bốt hướng dẫn từng bước 📐",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Thực Hành",
            title: "Vẽ đoạn thẳng dài 5 cm",
            explanation:
              "Chấm một điểm ở vạch 0. Chấm điểm thứ hai ở vạch 5. Nối hai điểm lại theo mép thước.",
            rule: "Vạch 0 → điểm đầu. Vạch 5 → điểm cuối. Nối lại được đoạn thẳng 5 cm.",
            points: [
              "Vạch 0 phải trùng đúng điểm đầu.",
              "Giữ thước không xê dịch khi vẽ.",
              "Vẽ xong có thể đo lại để kiểm tra.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "0 •—————————• 5\nHai điểm ở vạch 0 và vạch 5",
            ruler: {
              lengthCm: 5,
              measure: {
                from: 0,
                to: 5,
              },
              label: "Đoạn thẳng dài 5 cm: hai điểm ở vạch 0 và vạch 5",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Muốn vẽ đoạn thẳng dài 7 cm, bé chấm điểm thứ hai ở vạch số mấy?",
            options: ["Vạch 0", "Vạch 1", "Vạch 7", "Vạch 70"],
            answer: "Vạch 7",
            mascotHint: "Điểm thứ nhất ở vạch 0, điểm thứ hai ở vạch 7.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Chấm điểm ở vạch 0 và vạch cần vẽ, rồi nối lại.",
              "Đoạn thẳng 5 cm có hai đầu ở vạch 0 và vạch 5.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g1-c7-l6",
      title: "Bài 7: Thực hành ước lượng và đo độ dài",
      type: "learn",
      description: "Ước lượng độ dài trước rồi đo để kiểm tra",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Bé hãy đoán xem quyển vở dài bao nhiêu cm, rồi mình đo thử nhé! 📏",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Thực Hành",
            title: "Ước lượng rồi đo",
            explanation:
              "ƯỚC LƯỢNG là đoán trước độ dài. Sau đó bé đo thật để xem đoán có gần đúng không.",
            rule: "Bé đoán quyển vở dài khoảng 20 cm. Đo thật được 20 cm — đoán đúng!",
            points: [
              "Ước lượng giúp bé biết độ dài mà không cần đo.",
              "Đo lại để kiểm tra mình đoán đúng hay chưa.",
              "Luyện nhiều thì bé đoán càng chính xác.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Ước lượng: khoảng 20 cm\nĐo thật:    20 cm  ✓",
            ruler: {
              lengthCm: 20,
              measure: {
                from: 0,
                to: 20,
              },
              label: "Ước lượng 20 cm — đo thật 20 cm ✓",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Ước lượng là gì?",
            options: [
              "Đoán trước độ dài rồi đo để kiểm tra",
              "Đo thật rất chính xác",
              "Cân vật lên",
              "Đếm số vật",
            ],
            answer: "Đoán trước độ dài rồi đo để kiểm tra",
            mascotHint: "Ước lượng là đoán trước, sau đó đo thật để kiểm tra.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Ước lượng trước, đo thật sau.",
              "Luyện nhiều thì ước lượng càng đúng.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g1-c7-l7",
      title: "Bài 8: Đo độ dài bằng gang tay, bước chân",
      type: "learn",
      description: "Đo độ dài bằng các đơn vị không chính thức",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Không có thước thì đo thế nào nhỉ? Rô-bốt dùng gang tay đấy! 🖐️",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Thực Hành",
            title: "Đo bằng gang tay, bước chân",
            explanation:
              "Khi chưa có thước, bé có thể đo bằng gang tay, bước chân, sải tay.",
            rule: "Bàn học dài 4 gang tay. Nền nhà dài 12 bước chân.",
            points: [
              "Gang tay, bước chân là đơn vị đo 'không chính thức'.",
              "Vì mỗi người có gang tay khác nhau nên kết quả có thể khác nhau.",
              "Muốn đo chính xác thì phải dùng thước có vạch cm.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "🖐️ gang tay  → đo bàn, sách\n🚶 bước chân → đo nền nhà, sân",
            table: {
              headers: ["Cách đo", "Đo được"],
              rows: [
                ["Gang tay", "Bàn học, quyển sách"],
                ["Bước chân", "Nền nhà, sân"],
              ],
              label: "Đo độ dài bằng gang tay, bước chân",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Vì sao đo bằng gang tay có thể cho kết quả khác nhau giữa các bạn?",
            options: [
              "Vì mỗi bạn có gang tay dài ngắn khác nhau",
              "Vì gang tay đổi màu",
              "Vì vật đổi độ dài",
              "Vì đo bằng gang tay là sai hoàn toàn",
            ],
            answer: "Vì mỗi bạn có gang tay dài ngắn khác nhau",
            mascotHint:
              "Gang tay mỗi người một khác, nên kết quả có thể lệch nhau.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Có thể đo bằng gang tay, bước chân khi chưa có thước.",
              "Muốn chính xác thì dùng thước có vạch cm.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g1-c7-l8",
      title: "Bài 9: Luyện tập chung chủ đề 7",
      type: "learn",
      description: "Ôn tập so sánh và đo độ dài",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Bé đã biết đo độ dài rồi! Mình tổng kết nhé 🎉",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Tổng kết chủ đề 7",
            explanation:
              "Bé đã học dài hơn ngắn hơn, đơn vị xăng-ti-mét, cách đo bằng thước và cách ước lượng.",
            points: [
              "So sánh độ dài: đặt cạnh nhau, một đầu thẳng hàng.",
              "Xăng-ti-mét viết tắt là cm.",
              "Đo bằng thước: đặt vạch 0 vào đầu vật.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "1 cm = 1 khoảng trên thước\nĐặt vạch 0 vào đầu vật",
            ruler: {
              lengthCm: 5,
              measure: {
                from: 0,
                to: 5,
              },
              label: "1 cm = 1 khoảng trên thước — nhớ đặt vạch 0 vào đầu vật",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Đoạn thẳng có đầu ở vạch 0 và đầu kia ở vạch 9 của thước. Đoạn thẳng dài bao nhiêu?",
            options: ["8 cm", "9 cm", "10 cm", "90 cm"],
            answer: "9 cm",
            ruler: {
              lengthCm: 10,
              measure: {
                from: 0,
                to: 9,
              },
              label: "Đọc số ở đầu kia của đoạn thẳng: 9 cm",
            },
            mascotHint: "Đọc số ở đầu kia: 9 cm.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Đo độ dài bằng thước có vạch cm.",
              "Bé đã hoàn thành chủ đề 7.",
            ],
            mascotMood: "celebrate",
          },
        },
      ],
    },
  ],
};
