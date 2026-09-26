export const g1c4 = {
  id: "g1-c4",
  name: "Chủ đề 4: Làm quen với một số hình khối",
  description:
    "Khối lập phương, khối hộp chữ nhật; vị trí và định hướng trong không gian",
  icon: "🧊",
  color: "#8e7cc3",
  totalLessons: 7,
  lessons: [
    {
      id: "g1-c4-l1",
      title: "Bài 1: Khối lập phương",
      type: "learn",
      description:
        "SGK Bài 14 (tr.92–93): nhận biết khối lập phương — hộp quà, con xúc xắc",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Rô-bốt có một hộp quà 🎁. Sáu mặt của hộp đều là hình vuông bằng nhau. Đố bé đó là khối gì nhỉ?",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Khối lập phương",
            explanation:
              "Khối lập phương có 6 mặt, và cả 6 mặt đều là HÌNH VUÔNG bằng nhau.",
            rule: "Khối lập phương có 6 mặt đều là hình vuông bằng nhau.",
            points: [
              "Hộp quà vuông 🎁 và con xúc xắc 🎲 có dạng khối lập phương.",
              "Đặt thế nào cũng đứng vững được.",
              "Xếp chồng lên nhau được.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "🎁 Hộp quà có 6 mặt đều là hình vuông",
            solid: {
              kind: "cube",
              dims: {
                a: 3,
              },
              label: "Khối lập phương",
              formula: "6 mặt đều là hình vuông bằng nhau",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "🎲 Con xúc xắc cũng có dạng khối lập phương — bé thấy được 3 mặt của nó",
            spatialScene: {
              mode: "diceFaces",
              note: "Một khối lập phương có 6 mặt, nhưng chỉ nhìn thấy 3 mặt cùng lúc.",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Khối lập phương có mấy mặt?",
            options: [4, 5, 6, 8],
            answer: 6,
            mascotHint: "Khối lập phương có 6 mặt, đều là hình vuông.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Vật nào có dạng khối lập phương?",
            options: ["Con xúc xắc", "Hộp sữa", "Quả bóng", "Cái đĩa"],
            answer: "Con xúc xắc",
            mascotHint: "Xúc xắc có 6 mặt vuông bằng nhau — khối lập phương.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Khối lập phương có 6 mặt đều là hình vuông bằng nhau.",
              "Hộp quà vuông và con xúc xắc có dạng khối lập phương.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g1-c4-l2",
      title: "Bài 2: Khối hộp chữ nhật",
      type: "learn",
      description:
        "SGK Bài 14 (tr.92–93): nhận biết khối hộp chữ nhật — hộp bánh, viên gạch, bao diêm",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Hộp bánh 🍪 của Rô-bốt cũng có 6 mặt, nhưng các mặt không đều nhau. Đó là khối gì?",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Khối hộp chữ nhật",
            explanation:
              "Khối hộp chữ nhật có 6 mặt. Các mặt là hình chữ nhật nên KHÔNG đều bằng nhau như khối lập phương.",
            rule: "Khối hộp chữ nhật có 6 mặt, các mặt không đều nhau.",
            points: [
              "Hộp bánh 🍪, viên gạch 🧱, bao diêm có dạng khối hộp chữ nhật.",
              "Khối hộp chữ nhật có thể dài hơn hoặc cao hơn khối lập phương.",
              "Cũng xếp chồng lên nhau được.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "🍪 Hộp bánh — 6 mặt không đều nhau",
            solid: {
              kind: "cuboid",
              dims: {
                a: 4,
                b: 3,
                c: 2,
              },
              label: "Khối hộp chữ nhật",
              formula: "6 mặt, các mặt không đều nhau",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "🧱 Viên gạch dài — cũng là khối hộp chữ nhật",
            solid: {
              kind: "cuboid",
              dims: {
                a: 5,
                b: 2,
                c: 2,
              },
              label: "Viên gạch",
              formula: "Mặt trước là hình chữ nhật dài",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Khối hộp chữ nhật khác khối lập phương ở điểm nào?",
            options: [
              "Các mặt không đều bằng nhau",
              "Có 4 mặt",
              "Không xếp chồng được",
              "Không có mặt nào",
            ],
            answer: "Các mặt không đều bằng nhau",
            mascotHint:
              "Khối lập phương có 6 mặt vuông bằng nhau; khối hộp chữ nhật thì không.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Vật nào có dạng khối hộp chữ nhật?",
            options: ["Viên gạch", "Con xúc xắc", "Quả bóng", "Cái đĩa"],
            answer: "Viên gạch",
            mascotHint:
              "Viên gạch dài, các mặt không đều nhau — khối hộp chữ nhật.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Khối hộp chữ nhật có 6 mặt, các mặt không đều nhau.",
              "Hộp bánh, viên gạch, bao diêm có dạng khối hộp chữ nhật.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g1-c4-l3",
      title: "Bài 3: Phân biệt hai khối",
      type: "learn",
      description:
        "SGK Bài 14 (tr.94–95): phân biệt khối lập phương và khối hộp chữ nhật — lâu đài bạn Mai, chữ T–H–C",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Bạn Mai xếp một lâu đài bằng khối gỗ 🏰. Bé thử đếm xem hàng nền có mấy khối lập phương nhé!",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Thực Hành",
            title: "Phân biệt hai khối",
            explanation:
              "Bé nhìn vào các MẶT để phân biệt: 6 mặt vuông bằng nhau là khối lập phương; các mặt không đều nhau là khối hộp chữ nhật.",
            rule: "Mặt vuông bằng nhau → khối lập phương. Mặt không đều nhau → khối hộp chữ nhật.",
            points: [
              "Khối lập phương: 6 mặt vuông bằng nhau.",
              "Khối hộp chữ nhật: 6 mặt, không đều nhau.",
              "Cả hai đều đứng vững và xếp chồng được.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "🏰 Lâu đài bạn Mai (SGK tr.94) — hàng nền có mấy khối lập phương?",
            spatialScene: {
              mode: "maisCastle",
              note: "Hàng nền là các khối lập phương; mái và hai thanh đỏ là khối hộp chữ nhật.",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "🔤 Ba chữ T, H, C xếp bằng khối lập phương nhỏ (SGK tr.94)",
            spatialScene: {
              mode: "lettersTHC",
              note: "Mỗi ô vuông nhỏ là một khối lập phương. Chữ H dùng nhiều khối nhất.",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Những hình nào là khối lập phương? (SGK tr.100)",
            spatialScene: {
              mode: "solidSort",
              round: 1,
              note: "Hình D là khối trụ nên không phải khối lập phương.",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Còn những hình nào là khối hộp chữ nhật? (SGK tr.100)",
            spatialScene: {
              mode: "solidSort",
              round: 2,
              note: "Hình B cao và hẹp, hình G dài — cả hai đều là khối hộp chữ nhật.",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Lâu đài bạn Mai có mấy khối lập phương ở hàng nền?",
            options: [3, 4, 5, 6],
            answer: 5,
            mascotHint: "Bé đếm từng khối ở hàng nền: có 5 khối lập phương.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Chữ nào xếp bằng nhiều khối lập phương nhỏ nhất?",
            options: ["Chữ T", "Chữ H", "Chữ C", "Ba chữ bằng nhau"],
            answer: "Chữ H",
            mascotHint:
              "Chữ T dùng 5 khối, chữ C dùng 5 khối, chữ H dùng 7 khối.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Trong hình A, B, C, D, E, G thì hình nào là khối hộp chữ nhật?",
            options: [
              "Hình B và hình G",
              "Hình A và hình C",
              "Hình D",
              "Hình E",
            ],
            answer: "Hình B và hình G",
            mascotHint:
              "Hình B cao hẹp, hình G dài — các mặt không đều nhau nên là khối hộp chữ nhật.",
            spatialScene: {
              mode: "solidSort",
              round: 2,
              note: "Hình B cao và hẹp, hình G dài — cả hai đều là khối hộp chữ nhật.",
            },
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "6 mặt vuông bằng nhau → khối lập phương.",
              "6 mặt không đều nhau → khối hộp chữ nhật.",
              "Đếm khối thì đếm từng mặt nhìn thấy.",
            ],
            mascotMood: "celebrate",
          },
        },
      ],
    },
    {
      id: "g1-c4-l4",
      title: "Bài 4: Vị trí — trên, dưới, trước, sau",
      type: "learn",
      description:
        "SGK Bài 15 (tr.96–97): vị trí trên – dưới – trước – sau; búp bê & mèo, ba chú thỏ, đoàn tàu, đèn giao thông",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Búp bê ngồi trên bàn, mèo nấp dưới gầm bàn 🐱. Bé cùng Rô-bốt nói vị trí của các bạn nhé!",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Trên — dưới, trước — sau",
            explanation:
              "Bé dùng các từ TRÊN, DƯỚI, TRƯỚC, SAU để nói vị trí của đồ vật.",
            rule: "Búp bê ở TRÊN bàn. Mèo ở DƯỚI gầm bàn.",
            points: [
              "TRÊN là ở phía cao hơn.",
              "DƯỚI là ở phía thấp hơn.",
              "TRƯỚC là phía bé nhìn thấy; SAU là phía sau lưng.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "🪑 Búp bê ở trên bàn, mèo ở dưới gầm bàn (SGK tr.96)",
            spatialScene: {
              mode: "dollCatTable",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "🐰 Ba chú thỏ chạy về phía củ cà rốt — ai trước, ai giữa, ai sau? (SGK tr.96)",
            spatialScene: {
              mode: "rabbitQueue",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "🚂 Đoàn tàu: đầu máy ở phía trước, rồi đến toa 1 · 2 · 3 · 4 (SGK tr.96)",
            spatialScene: {
              mode: "trainCars",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "🚦 Cột đèn giao thông: đèn nào ở trên cùng, ở giữa, dưới cùng? (SGK tr.96)",
            spatialScene: {
              mode: "trafficLight",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Búp bê ở đâu so với mặt bàn?",
            options: ["Ở trên", "Ở dưới", "Ở trước", "Ở sau"],
            answer: "Ở trên",
            mascotHint: "Ngồi trên mặt bàn nghĩa là ở phía trên.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Ba chú thỏ chạy về phía củ cà rốt. Thỏ nào ở giữa?",
            options: ["Thỏ nâu", "Thỏ khoang", "Thỏ xám", "Không có thỏ nào"],
            answer: "Thỏ khoang",
            mascotHint: "Thỏ nâu ở trước, thỏ khoang ở giữa, thỏ xám ở sau.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Trên cột đèn giao thông, đèn đỏ ở vị trí nào?",
            options: ["Trên cùng", "Ở giữa", "Dưới cùng", "Bên trái"],
            answer: "Trên cùng",
            mascotHint:
              "Đèn đỏ ở trên cùng, đèn vàng ở giữa, đèn xanh ở dưới cùng.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Đoàn tàu có 4 toa. Toa nào ở ngay sau đầu máy?",
            options: ["Toa 1", "Toa 2", "Toa 3", "Toa 4"],
            answer: "Toa 1",
            mascotHint: "Đầu máy đi trước, ngay sau đầu máy là toa 1.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Dùng các từ trên, dưới, trước, sau để nói vị trí.",
              "Trên là phía cao hơn; dưới là phía thấp hơn.",
              "Trước là phía bé nhìn thấy; sau là phía sau lưng.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g1-c4-l5",
      title: "Bài 5: Vị trí — trái, phải",
      type: "learn",
      description:
        "SGK Bài 15 (tr.98): vị trí TRÁI – PHẢI; thỏ & rùa, hàng Mai – Nam – Rô-bốt; tay trái, tay phải",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Thỏ đứng bên trái, rùa đứng bên phải 🐢. Bé có biết bên nào là bên phải của mình không?",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Bên trái và bên phải",
            explanation:
              "Bé dùng tay phải để viết, tay trái để giữ vở. Bên có tay phải là bên phải.",
            rule: "Tay phải ở bên phải, tay trái ở bên trái.",
            points: [
              "Bên phải là bên tay bé cầm bút.",
              "Bên trái là bên còn lại.",
              "Trái – phải của người đối diện thì ngược với trái – phải của bé.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "🐰 Bên trái là thỏ, bên phải là rùa 🐢 (SGK tr.98)",
            spatialScene: {
              mode: "rabbitTurtleLeftRight",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Mai — Nam — Rô-bốt: ai ở bên trái, ai ở bên phải? (SGK tr.98)",
            spatialScene: {
              mode: "kidsLeftRight",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Từ TRÁI sang PHẢI: hình tam giác, hình vuông, hình tròn, hình chữ nhật (SGK tr.99)",
            /**
             * 🔴 HÌNH PHẢI VẼ RA, KHÔNG CHỈ LIỆT KÊ TÊN. Bản cũ là một **bảng chữ**
             * “thứ 1 (trái cùng) … thứ 4 (phải cùng)” ⇒ trẻ không thấy hình nào với hình nào
             * (người dùng báo 2026-09-24). SGK tr.99 in đúng hàng ngang 4 hình: tam giác,
             * vuông, tròn, chữ nhật — nay vẽ đúng như sách.
             */
            spatialScene: {
              mode: "shapeRow",
              note: "Bốn hình xếp theo thứ tự từ trái sang phải — bé đọc tên từng hình.",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Trong hàng Mai — Nam — Rô-bốt, ai đứng ở bên trái?",
            options: ["Mai", "Nam", "Rô-bốt", "Không có ai"],
            answer: "Mai",
            mascotHint: "Từ trái sang phải là: Mai, Nam, rồi Rô-bốt.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Bé cầm bút bằng tay phải để viết. Tay đó ở bên nào?",
            options: ["Bên phải", "Bên trái", "Ở giữa", "Phía sau"],
            answer: "Bên phải",
            mascotHint: "Tay phải ở bên phải.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Bốn hình xếp từ trái sang phải: tam giác, hình vuông, hình tròn, hình chữ nhật. Hình nào ở giữa hình tam giác và hình tròn?",
            options: [
              "Hình vuông",
              "Hình chữ nhật",
              "Hình tam giác",
              "Không có hình nào",
            ],
            answer: "Hình vuông",
            mascotHint:
              "Giữa hình tam giác (thứ 1) và hình tròn (thứ 3) là hình vuông (thứ 2).",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Tay phải ở bên phải, tay trái ở bên trái.",
              "Trong hàng Mai — Nam — Rô-bốt: Mai ở bên trái, Rô-bốt ở bên phải.",
              "Trái – phải của người đối diện thì ngược với bé.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g1-c4-l6",
      title: "Bài 6: Định hướng trong không gian",
      type: "learn",
      description:
        "SGK Bài 15 (tr.96–99): mô tả vị trí đồ vật; phần luyện tập tr.97 và tr.99",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Rô-bốt giấu quả bóng 🎯. Bé nghe Rô-bốt nói vị trí rồi tìm giúp bạn ấy nhé!",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Thực Hành",
            title: "Mô tả vị trí đồ vật",
            explanation:
              "Bé dùng các từ trên, dưới, trái, phải, trước, sau để nói rõ đồ vật ở đâu.",
            rule: "Quả bóng ở TRÊN bàn, bên PHẢI quyển sách.",
            points: [
              "Nói từng bước: ở trên, ở dưới, bên trái, bên phải.",
              "Vừa nói vừa chỉ tay cho rõ hơn.",
              "Chơi trò tìm đồ vật theo lời chỉ dẫn sẽ giúp bé nhớ rất nhanh.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "⚽ Quả bóng ở dưới gầm bàn — bé tìm giúp Rô-bốt",
            spatialScene: {
              mode: "ballUnderTableQuiz",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "🚗 Xe ô tô ở bên trái hay bên phải của Rô-bốt?",
            spatialScene: {
              mode: "carLeftQuiz",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Hai hàng bạn cùng quay về phía ti vi: hàng sau và hàng trước (SGK tr.97)",
            spatialScene: {
              mode: "movieRows",
              front: 4,
              back: 6,
              note: "Hàng gần ti vi hơn là hàng TRƯỚC; hàng xa ti vi hơn là hàng SAU.",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Ba hàng gạch: trên cùng, ở giữa, dưới cùng (SGK tr.97)",
            spatialScene: {
              mode: "brickRows",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Hai hàng bạn cùng quay về phía ti vi. Hàng nào ở gần ti vi hơn?",
            options: [
              "Hàng trước",
              "Hàng sau",
              "Hai hàng bằng nhau",
              "Không có hàng nào",
            ],
            answer: "Hàng trước",
            mascotHint: "Hàng trước ở gần ti vi hơn, hàng sau ở xa ti vi hơn.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Hàng sau có 6 bạn, hàng trước có 4 bạn. Cả hai hàng có tất cả bao nhiêu bạn?",
            options: [8, 9, 10, 11],
            answer: 10,
            mascotHint:
              "Đếm lần lượt từng hàng rồi cộng lại: 6 bạn thêm 4 bạn nữa.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Ba hàng gạch: hàng trên cùng 2 viên, hàng giữa 3 viên, hàng dưới cùng 4 viên. Cả ba hàng có tất cả bao nhiêu viên gạch?",
            options: [7, 8, 9, 10],
            answer: 9,
            mascotHint: "2 + 3 + 4 = 9 viên gạch.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Khối lập phương A có mặt trước màu đỏ, mặt trên màu xanh, mặt bên phải màu vàng. Khối B giống hệt A nhưng quay lại. Mặt bên phải của khối B màu gì? (SGK tr.99)",
            options: ["Màu đỏ", "Màu xanh", "Màu vàng", "Màu trắng"],
            answer: "Màu đỏ",
            mascotHint:
              "Khối B quay lại nên mặt bên phải của B chính là mặt trước của A — màu đỏ.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Mô tả vị trí bằng các từ: trên, dưới, trái, phải, trước, sau.",
              "Nói rõ từng bước để bạn khác tìm được.",
              "Quay một khối đi thì mặt ở phía khác sẽ đổi chỗ cho nhau.",
            ],
            mascotMood: "celebrate",
          },
        },
      ],
    },
    {
      id: "g1-c4-l7",
      title: "Bài 7: Luyện tập chung chủ đề 4",
      type: "learn",
      description:
        "SGK Bài 16 (tr.100–101): luyện tập chung — 4 hoạt động của sách",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Hôm nay bé ôn lại hai khối và các vị trí nhé. Cùng Rô-bốt làm 4 hoạt động của SGK tr.100–101!",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Ôn lại hai khối và vị trí",
            explanation:
              "Khối lập phương có 6 mặt vuông bằng nhau. Khối hộp chữ nhật có 6 mặt không đều nhau.",
            points: [
              "Vị trí: trên, dưới, trái, phải, trước, sau.",
              "Đếm khối thì đếm từng mặt nhìn thấy.",
              "So sánh số khối của hai hình bằng cách đếm rồi so sánh.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Hoạt động 1: Những hình nào là khối lập phương? (SGK tr.100)",
            spatialScene: {
              mode: "solidSort",
              round: 1,
              note: "Hình A, C, E có mặt trước là hình vuông nên là khối lập phương.",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Còn những hình nào là khối hộp chữ nhật? (SGK tr.100)",
            spatialScene: {
              mode: "solidSort",
              round: 2,
              note: "Hình B và hình G là khối hộp chữ nhật; hình D là khối trụ.",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Hoạt động 2: Con xúc xắc có mấy chấm ở mỗi mặt? (SGK tr.100)",
            spatialScene: {
              mode: "diceFaces",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "(a) Mặt trước của con xúc xắc có mấy chấm?",
            options: [3, 4, 5, 6],
            answer: 5,
            mascotHint:
              "Mặt trước có 4 chấm ở bốn góc và 1 chấm ở giữa: 5 chấm.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "(b) Mặt bên phải của con xúc xắc có mấy chấm?",
            options: [3, 4, 5, 6],
            answer: 6,
            mascotHint: "Mặt bên phải có 2 cột, mỗi cột 3 chấm: 6 chấm.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "(c) Mặt trên của con xúc xắc có mấy chấm?",
            options: [2, 3, 4, 5],
            answer: 3,
            mascotHint: "Mặt trên có 3 chấm nằm chéo nhau.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Hoạt động 3: Câu nào đúng? (SGK tr.101)",
            spatialScene: {
              mode: "cubeWalls",
              note: "Bé đếm số khối nhỏ của từng hình rồi so sánh.",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Hình bên trái và hình bên phải, hình nào có nhiều khối lập phương nhỏ hơn?",
            options: [
              "Hình bên phải có nhiều hơn",
              "Hai hình có số khối bằng nhau",
              "Hình bên trái có nhiều hơn",
              "Không đếm được",
            ],
            answer: "Hai hình có số khối bằng nhau",
            mascotHint:
              "Hình bên trái có 8 khối, hình bên phải có 4 × 2 = 8 khối — bằng nhau.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Hoạt động 4: Từ 8 khối lập phương nhỏ, xếp thành một khối lập phương lớn (SGK tr.101)",
            spatialScene: {
              mode: "cubeComposite2x2",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Xếp 8 khối lập phương nhỏ thành một khối lập phương lớn thì mỗi tầng có mấy khối?",
            options: [2, 3, 4, 8],
            answer: 4,
            mascotHint:
              "Mỗi tầng xếp 2 hàng, mỗi hàng 2 khối: 4 khối một tầng, 2 tầng là 8 khối.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Hai loại khối: lập phương và hộp chữ nhật.",
              "Đếm chấm trên xúc xắc: mặt trước 5, mặt bên phải 6, mặt trên 3.",
              "Hai hình có thể có số khối bằng nhau dù xếp khác nhau.",
              "Bé đã hoàn thành chủ đề 4.",
            ],
            mascotMood: "celebrate",
          },
        },
      ],
    },
  ],
};
