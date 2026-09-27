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
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Chọn số đo phù hợp",
            explanation:
              "Mỗi đồ vật dài một khoảng khác nhau. Bé ước lượng rồi chọn số đo phù hợp với đồ vật đó.",
            rule: "Hộp bút dài hơn bút chì rất nhiều, còn gang tay thì ngắn — số đo phải chọn cho khớp với đồ vật.",
            points: [
              "Bút máy dài khoảng 12 cm.",
              "Cục tẩy dài khoảng 4 cm.",
              "Bút chì dài khoảng 1 gang tay.",
              "Bút vẽ màu dài khoảng 8 cm.",
              "Hộp bút dài khoảng 25 cm.",
            ],
          },
        },
        {
          type: "quiz",
          content: {
            question: "Đồ vật nào dài khoảng 25 cm?",
            options: ["Hộp bút", "Cục tẩy", "Bút máy", "Bút chì"],
            answer: "Hộp bút",
            mascotHint:
              "Cục tẩy chỉ 4 cm, bút máy 12 cm, còn hộp bút dài tới 25 cm.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Bút chì dài khoảng bao nhiêu?",
            options: ["1 gang tay", "30 cm", "4 cm", "25 cm"],
            answer: "1 gang tay",
            mascotHint: "Bút chì chỉ dài bằng khoảng một gang tay của bé.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Đo ba đồ chơi bằng thước vạch xăng-ti-mét (SGK tr.38).",
            measureBoard: {
              rulerMax: 12,
              orientation: "row",
              objects: [
                { name: "Đoàn tàu", kind: "train", cm: 11 },
                { name: "Xe khách", kind: "bus", cm: 7 },
                { name: "Xe trộn xi măng", kind: "mixerTruck", cm: 5 },
              ],
              label:
                "Đặt một đầu đồ chơi vào vạch 0 rồi đọc số ở đầu kia của đồ chơi.",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Trong ba đồ chơi vừa đo, đồ chơi nào dài nhất?",
            options: ["Đoàn tàu", "Xe khách", "Xe trộn xi măng"],
            answer: "Đoàn tàu",
            mascotHint:
              "Đoàn tàu dài 11 cm, dài hơn xe khách 7 cm và xe trộn xi măng 5 cm.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Trong ba đồ chơi vừa đo, đồ chơi nào ngắn nhất?",
            options: ["Xe trộn xi măng", "Xe khách", "Đoàn tàu"],
            answer: "Xe trộn xi măng",
            mascotHint: "Xe trộn xi măng dài 5 cm, ngắn nhất trong ba đồ chơi.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Đo ba đồ chơi khác (SGK tr.38).",
            measureBoard: {
              rulerMax: 6,
              orientation: "row",
              objects: [
                { name: "Xe lu", kind: "roller", cm: 4 },
                { name: "Xe ô tô con", kind: "car", cm: 4 },
                { name: "Xe cẩu", kind: "crane", cm: 5 },
              ],
              label:
                "Cũng đặt vạch 0 vào một đầu đồ chơi rồi đọc số ở đầu kia.",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Trong ba xe vừa đo, xe nào dài nhất?",
            options: ["Xe cẩu", "Xe lu", "Xe ô tô con"],
            answer: "Xe cẩu",
            mascotHint: "Xe cẩu dài 5 cm; xe lu và xe ô tô con đều dài 4 cm.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Đo độ dài mỗi đồ vật (SGK tr.39).",
            measureBoard: {
              rulerMax: 10,
              orientation: "row",
              objects: [
                { name: "Bản chải", kind: "toothbrush", cm: 7 },
                { name: "Tua-vít", kind: "screwdriver", cm: 9 },
                { name: "Điều khiển", kind: "gamepad", cm: 3 },
              ],
              label:
                "Ba đồ vật cùng đặt ở vạch 0 — bé đọc số ở đầu kia của mỗi vật.",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Trong ba đồ vật vừa đo, đồ vật nào dài nhất?",
            options: ["Tua-vít", "Bản chải", "Điều khiển"],
            answer: "Tua-vít",
            mascotHint: "Tua-vít dài 9 cm, bản chải 7 cm, điều khiển 3 cm.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Đo độ dài ba bút chì (SGK tr.39).",
            measureBoard: {
              rulerMax: 13,
              orientation: "row",
              objects: [
                { name: "Bút chì A", kind: "pencil", cm: 10 },
                { name: "Bút chì B", kind: "pencil", cm: 8 },
                { name: "Bút chì C", kind: "pencil", cm: 12 },
              ],
              label:
                "Ba bút chì cùng đặt ở vạch 0 — bé đọc số ở đầu kia của mỗi bút.",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Bút chì nào dài hơn 8 cm?",
            options: [
              "Bút chì A và bút chì C",
              "Chỉ bút chì B",
              "Cả ba bút chì",
              "Không bút chì nào",
            ],
            answer: "Bút chì A và bút chì C",
            mascotHint:
              "Bút chì B dài đúng 8 cm, còn A dài 10 cm và C dài 12 cm.",
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
          type: "visual",
          content: {
            text: "Đồ vật nào dài hơn? (SGK tr.40)",
            measureBoard: {
              rulerMax: 8,
              orientation: "row",
              showRuler: false,
              objects: [
                { name: "Bút chì", kind: "pencil", cm: 7.5 },
                { name: "Bút bi", kind: "pen", cm: 4.2 },
              ],
              label: "Hai đồ vật đặt cạnh nhau — bé nhìn xem vật nào dài hơn.",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Bút chì và bút bi, đồ vật nào dài hơn?",
            options: ["Bút chì", "Bút bi", "Hai vật dài bằng nhau"],
            answer: "Bút chì",
            mascotHint: "Bút chì dài hơn bút bi.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Đồ vật nào dài hơn? (SGK tr.40)",
            measureBoard: {
              rulerMax: 3,
              orientation: "row",
              showRuler: false,
              objects: [
                { name: "Cục tẩy", kind: "eraser", cm: 2 },
                { name: "Ghim kẹp giấy", kind: "paperclip", cm: 1.6 },
              ],
              label: "Hai đồ vật đặt cạnh nhau — bé nhìn xem vật nào dài hơn.",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Cục tẩy và ghim kẹp giấy, đồ vật nào dài hơn?",
            options: ["Cục tẩy", "Ghim kẹp giấy", "Hai vật dài bằng nhau"],
            answer: "Cục tẩy",
            mascotHint: "Cục tẩy dài hơn ghim kẹp giấy một chút.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Bốn bạn Nam, Mi, Việt, Mai đứng cạnh nhau (SGK tr.40).",
            measureBoard: {
              rulerMax: 4,
              orientation: "column",
              showRuler: false,
              objects: [
                { name: "Nam", kind: "kid", cm: 4 },
                { name: "Mi", kind: "kid", girl: true, cm: 3 },
                { name: "Việt", kind: "kid", cm: 3.6 },
                { name: "Mai", kind: "kid", girl: true, cm: 3.3 },
              ],
              label:
                "Mỗi cột màu là chiều cao của một bạn — bé so xem ai cao nhất, ai thấp nhất.",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Bạn nào cao nhất và bạn nào thấp nhất?",
            options: [
              "Nam cao nhất, Mi thấp nhất",
              "Mi cao nhất, Nam thấp nhất",
              "Việt cao nhất, Mai thấp nhất",
              "Mai cao nhất, Mi thấp nhất",
            ],
            answer: "Nam cao nhất, Mi thấp nhất",
            mascotHint: "Nam cao nhất, Mi thấp nhất.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Con nào cao hơn: hươu cao cổ hay ngựa vằn? (SGK tr.40)",
            measureBoard: {
              rulerMax: 5,
              orientation: "column",
              showRuler: false,
              objects: [
                { name: "Hươu cao cổ", kind: "giraffe", cm: 5 },
                { name: "Ngựa vằn", kind: "zebra", cm: 2.6 },
              ],
              label:
                "Hai con vật đứng trên cùng một mặt đất — bé so chiều cao.",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Con nào cao hơn?",
            options: ["Hươu cao cổ", "Ngựa vằn", "Hai con cao bằng nhau"],
            answer: "Hươu cao cổ",
            mascotHint: "Hươu cao cổ cao hơn ngựa vằn.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Cây thước dài hơn quyển sách. Quyển sách dài hơn cây bút chì. Vậy cây thước hay cây bút chì dài hơn?",
            options: ["Cây thước", "Cây bút chì", "Hai vật dài bằng nhau"],
            answer: "Cây thước",
            mascotHint:
              "Thước dài hơn sách, sách dài hơn bút chì — nên thước dài hơn bút chì.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Đo chiều dài bút chì và bút sáp màu (SGK tr.41).",
            measureBoard: {
              rulerMax: 9,
              orientation: "column",
              objects: [
                { name: "Bút chì", kind: "pencil", cm: 8 },
                { name: "Bút sáp màu", kind: "crayon", cm: 6 },
              ],
              label:
                "Hai đồ vật cùng đặt ở vạch 0 — bé đọc số đo của mỗi vật theo thước.",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Bút sáp màu dài bao nhiêu xăng-ti-mét?",
            options: ["5 cm", "6 cm", "7 cm", "8 cm"],
            answer: "6 cm",
            mascotHint: "Bút sáp màu dài 6 cm.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Đo chiều dài đồng hồ đeo tay và điện thoại (SGK tr.41).",
            measureBoard: {
              rulerMax: 13,
              orientation: "column",
              objects: [
                { name: "Đồng hồ đeo tay", kind: "watch", cm: 12 },
                { name: "Điện thoại", kind: "phone", cm: 10 },
              ],
              label:
                "Bé đọc số ở đầu trên của mỗi vật theo vạch thước bên trái.",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Đồng hồ đeo tay dài bao nhiêu xăng-ti-mét?",
            options: ["10 cm", "11 cm", "12 cm", "13 cm"],
            answer: "12 cm",
            mascotHint: "Đồng hồ đeo tay dài 12 cm.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Điện thoại dài bao nhiêu xăng-ti-mét?",
            options: ["6 cm", "8 cm", "10 cm", "12 cm"],
            answer: "10 cm",
            mascotHint: "Điện thoại dài 10 cm.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Bút chì dài 9 cm, cái thước dài 20 cm, cục tẩy dài 3 cm. Hộp bút dài 15 cm. Đồ vật nào cho được vào trong hộp bút?",
            options: [
              "Bút chì và cục tẩy",
              "Chỉ có cái thước",
              "Cả ba đồ vật",
              "Không có đồ vật nào",
            ],
            answer: "Bút chì và cục tẩy",
            mascotHint:
              "Bút chì 9 cm và cục tẩy 3 cm đều ngắn hơn 15 cm; cái thước 20 cm thì không.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Thỏ, cáo và sóc chạy thi. Bạn về đích thứ nhất đứng ở bục cao nhất (SGK tr.42).",
            measureBoard: {
              rulerMax: 3,
              orientation: "column",
              showRuler: false,
              objects: [
                { name: "Thỏ", kind: "podium", animal: "rabbit", cm: 3 },
                { name: "Cáo", kind: "podium", animal: "fox", cm: 2 },
                { name: "Sóc", kind: "podium", animal: "squirrel", cm: 1 },
              ],
              label: "Bục càng cao thì bạn đứng trên đó về đích càng sớm.",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Bạn nào về đích thứ nhất?",
            options: ["Thỏ", "Cáo", "Sóc"],
            answer: "Thỏ",
            mascotHint: "Bục của thỏ cao nhất nên thỏ về đích thứ nhất.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Cáo cách thỏ 3 cây, còn cách sóc 6 cây. Cáo đứng gần bạn nào hơn?",
            options: ["Thỏ", "Sóc", "Xa bằng nhau"],
            answer: "Thỏ",
            mascotHint: "3 cây gần hơn 6 cây, nên cáo gần thỏ hơn.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Sóc đi đường thứ nhất hết 8 bước chân. Đường thứ hai sóc đi 4 bước rồi đi thêm 6 bước nữa. Đường nào ngắn hơn?",
            options: [
              "Đường thứ nhất",
              "Đường thứ hai",
              "Hai đường dài bằng nhau",
            ],
            answer: "Đường thứ nhất",
            mascotHint: "4 + 6 = 10 bước, mà 8 bước ngắn hơn 10 bước.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Đo độ dài mỗi bút chì (SGK tr.43).",
            measureBoard: {
              rulerMax: 10,
              orientation: "row",
              objects: [
                { name: "Bút chì A", kind: "pencil", cm: 7 },
                { name: "Bút chì B", kind: "pencil", cm: 8 },
                { name: "Bút chì C", kind: "pencil", cm: 3 },
                { name: "Bút chì D", kind: "pencil", cm: 5 },
                { name: "Bút chì E", kind: "pencil", cm: 9 },
              ],
              label:
                "Năm bút chì cùng đặt ở vạch 0 — bé đọc số ở đầu kia của mỗi bút.",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Bút chì nào dài nhất?",
            options: ["Bút chì A", "Bút chì B", "Bút chì D", "Bút chì E"],
            answer: "Bút chì E",
            mascotHint: "Bút chì E dài 9 cm, dài nhất trong năm bút.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Bút chì nào ngắn nhất?",
            options: ["Bút chì A", "Bút chì C", "Bút chì D", "Bút chì E"],
            answer: "Bút chì C",
            mascotHint: "Bút chì C chỉ dài 3 cm, ngắn nhất.",
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
