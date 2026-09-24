export const g1c1 = {
  id: "g1-c1",
  name: "Chủ đề 1: Các số từ 0 đến 10",
  description:
    "Đếm, đọc, viết các số từ 0 đến 10; nhiều hơn, ít hơn, bằng nhau; so sánh số; tách và gộp số",
  icon: "🔢",
  color: "#4facfe",
  totalLessons: 12,
  lessons: [
    {
      id: "g1-c1-l1",
      title: "Bài 1: Tiết học đầu tiên",
      type: "learn",
      description:
        "SGK (tr.6–7): làm quen năm bạn, sách Toán và các biểu tượng chỉ dẫn trong sách",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Chào bé! Mình là Rô-bốt. Nam, Mai, Việt, Mi và mình sẽ cùng bé học Toán Lớp 1 đấy! 🚀",
          },
        },
        {
          type: "visual",
          content: {
            text: "Năm bạn cùng học Toán với bé (SGK tr.6)",
            numberScene: {
              mode: "fiveFriends",
              note: "Nam, Mai, Rô-bốt, Việt và Mi — các bạn ấy sẽ học cùng bé suốt năm học.",
            },
          },
        },
        {
          type: "concept",
          content: {
            badge: "Làm Quen",
            title: "Trong sách Toán có những biểu tượng gì?",
            explanation:
              "Mỗi biểu tượng nhắc bé biết mình sắp làm gì: khám phá điều mới, làm bài tập, hay chơi trò chơi.",
            rule: "🔍 khám phá · 🤖 hoạt động · 📘 luyện tập · 🎲 trò chơi.",
            points: [
              "🔍 Khám phá: tìm hiểu kiến thức mới.",
              "🤖 Hoạt động: làm bài tập thực hành.",
              "📘 Luyện tập: ôn lại và làm bài.",
              "🎲 Trò chơi: vừa học vừa chơi.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Bốn biểu tượng bé sẽ gặp trong sách (SGK tr.6)",
            table: {
              headers: ["Biểu tượng", "Bé làm gì?"],
              rows: [
                ["🔍 Khám phá", "Tìm hiểu kiến thức mới"],
                ["🤖 Hoạt động", "Làm bài tập thực hành"],
                ["📘 Luyện tập", "Ôn lại và làm bài"],
                ["🎲 Trò chơi", "Vừa học vừa chơi"],
              ],
              label: "Bốn biểu tượng chỉ dẫn trong sách Toán 1",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Khi bấm sai một câu hỏi, bé nên làm gì?",
            options: [
              "Đọc gợi ý của Rô-bốt rồi thử lại",
              "Bỏ luôn bài học",
              "Không học nữa",
              "Chuyển sang bài khác ngay",
            ],
            answer: "Đọc gợi ý của Rô-bốt rồi thử lại",
            mascotHint:
              "Sai là chuyện bình thường! Rô-bốt luôn có gợi ý cho bé.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Biểu tượng nào cho biết bé sắp được chơi trò chơi?",
            options: ["🎲", "🔍", "📘", "🤖"],
            answer: "🎲",
            mascotHint: "Biểu tượng xúc xắc 🎲 là trò chơi.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Năm bạn học cùng bé: Nam, Mai, Rô-bốt, Việt, Mi.",
              "Bốn biểu tượng: khám phá · hoạt động · luyện tập · trò chơi.",
              "Sai thì đọc gợi ý rồi thử lại.",
            ],
            mascotMood: "celebrate",
          },
        },
      ],
    },
    {
      id: "g1-c1-l2",
      title: "Bài 2: Các số 0, 1, 2, 3",
      type: "learn",
      description: "SGK Bài 1 (tr.8–10): đếm, đọc, viết các số 0, 1, 2, 3",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Bể cá thứ nhất có 1 khối, bể thứ hai có 2 khối… Bể rỗng thì có mấy khối nhỉ? 🐟",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Các số 0, 1, 2, 3",
            explanation: "Số cho biết có BAO NHIÊU đồ vật. Bé đếm rồi đọc số.",
            rule: "1 một · 2 hai · 3 ba · 0 không.",
            points: [
              "Đếm: một, hai, ba.",
              "Không có gì thì là 0 — đọc là “không”.",
              "Số 0 bé nhất trong các số bé đã học.",
              "Bé viết: 0, 1, 2, 3.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Khám phá: đếm khối trong bể (SGK tr.8)",
            numberScene: {
              mode: "numberShow",
              kind: "tank",
              note: "Bể rỗng là 0. Bé vừa đếm vừa đọc: một, hai, ba, bốn, năm, không.",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Đếm rồi chọn số thích hợp (SGK tr.9)",
            numberScene: {
              mode: "manyGroups",
              groups: [
                {
                  emoji: "🐱",
                  n: 1,
                },
                {
                  emoji: "🥕",
                  n: 3,
                },
                {
                  emoji: "🐶",
                  n: 2,
                },
              ],
              unit: "Mỗi hàng là một nhóm — bé đếm từng nhóm",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Bể cá thứ ba trong hình có mấy khối?",
            options: [1, 2, 3, 4],
            answer: 3,
            mascotHint: "Bể thứ ba có 3 khối: một, hai, ba.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Số nào bé nhất trong các số 0, 1, 2, 3?",
            options: [0, 1, 2, 3],
            answer: 0,
            mascotHint: "0 là số bé nhất — 0 nghĩa là không có gì.",
          },
        },
        {
          type: "visual",
          content: {
            text: "0 · 1 · 2 · 3 — bé đọc theo thứ tự",
            numberLine: {
              from: 0,
              to: 5,
              step: 1,
              marks: [0, 1, 2, 3],
              label: "Các số 0, 1, 2, 3",
            },
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "0 không · 1 một · 2 hai · 3 ba.",
              "Số cho biết có bao nhiêu đồ vật.",
              "Không có gì thì viết số 0.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g1-c1-l3",
      title: "Bài 3: Các số 4, 5",
      type: "learn",
      description:
        "SGK Bài 1 (tr.10–13): đếm, đọc, viết các số 4 và 5; đếm theo điều kiện (tr.11)",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Bé giơ bàn tay lên nhé — có mấy ngón tay? Đúng rồi, 5 ngón! 🖐️",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Các số 4, 5",
            explanation: "Đếm tiếp sau 3 thì đến 4 rồi 5.",
            rule: "4 bốn · 5 năm.",
            points: [
              "Bàn tay có 5 ngón — số 5.",
              "Xe ô tô có 4 bánh — số 4.",
              "Bé đếm: một, hai, ba, bốn, năm.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Khám phá: bể có 4 khối và 5 khối (SGK tr.8)",
            numberScene: {
              mode: "numberShow",
              kind: "tank",
              note: "Bể có 4 khối gọi là bốn; bể có 5 khối gọi là năm.",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Đếm số con vật rồi chọn số thích hợp (SGK tr.10)",
            numberScene: {
              mode: "manyGroups",
              groups: [
                {
                  emoji: "🐔",
                  n: 5,
                },
                {
                  emoji: "🐰",
                  n: 3,
                },
                {
                  emoji: "🐟",
                  n: 4,
                },
              ],
              unit: "Bé đếm từng hàng rồi đọc số",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Hàng cá 🐟 có mấy con?",
            options: [3, 4, 5, 6],
            answer: 4,
            mascotHint: "Đếm: một, hai, ba, bốn — có 4 con cá.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Đếm cà rốt ĐÃ TÔ MÀU (SGK tr.11)",
            numberScene: {
              mode: "countFiltered",
              kind: "colored",
              cols: 6,
              colored: [0, 2, 4],
              note: "Củ nào còn nhạt là chưa tô màu nhé.",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Có bao nhiêu củ cà rốt đã tô màu?",
            options: [2, 3, 4, 5],
            answer: 3,
            mascotHint: "Bé chỉ đếm các củ đậm màu: có 3 củ.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Đếm xem có mấy con ghi số 2 (SGK tr.11)",
            numberScene: {
              mode: "countFiltered",
              kind: "labeled",
              labels: [1, 4, 5, 2, 2, 1, 2, 3, 0],
              note: "Mỗi con gà có một số — bé tìm đúng số 2.",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Có bao nhiêu con gà ghi số 2?",
            options: [2, 3, 4, 5],
            answer: 3,
            mascotHint: "Bé đếm các con ghi số 2: có 3 con.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Số nào đứng ngay sau số 4?",
            options: [3, 5, 6, 0],
            answer: 5,
            mascotHint: "Đếm tiếp: bốn rồi đến năm.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "4 bốn · 5 năm.",
              "Đếm đồ vật rồi đọc số.",
              "Đếm theo điều kiện: chỉ đếm củ đã tô màu, con ghi số 2.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g1-c1-l4",
      title: "Bài 4: Các số 6, 7, 8, 9, 10",
      type: "learn",
      description:
        "SGK Bài 2 (tr.14–17): đếm, đọc, viết các số 6, 7, 8, 9, 10; đếm trong tranh; đếm con vật 6 chân",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "6 con ong 🐝 đang hút mật, 7 con chim 🐦 đậu trên cành… Bé đếm cùng Rô-bốt nhé!",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Các số từ 6 đến 10",
            explanation: "Đếm tiếp sau 5: sáu, bảy, tám, chín, mười.",
            rule: "6 sáu · 7 bảy · 8 tám · 9 chín · 10 mười.",
            points: [
              "6 con ong 🐝 — số 6.",
              "9 con sao biển ⭐ — số 9.",
              "10 con bọ rùa 🐞 — số 10.",
              "10 là số lớn nhất trong phạm vi 10.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Khám phá: ong · chim · hoa · sao biển · bọ rùa (SGK tr.14)",
            numberScene: {
              mode: "numberShow",
              kind: "living",
              note: "Bé đếm từng nhóm rồi đọc số: sáu, bảy, tám, chín, mười.",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Đếm trong tranh nông trại (SGK tr.13)",
            numberScene: {
              mode: "sceneCount",
              kind: "farm",
              legend: [
                {
                  emoji: "🐄",
                },
                {
                  emoji: "🐔",
                },
                {
                  emoji: "🌻",
                },
                {
                  emoji: "☁️",
                },
                {
                  emoji: "☀️",
                },
                {
                  emoji: "🐟",
                },
              ],
              note: "Bé chọn một loại rồi đếm thật kĩ.",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Trong tranh nông trại có mấy con bò 🐄?",
            options: [1, 2, 3, 4],
            answer: 2,
            mascotHint: "Có 2 con bò ở phía bên trái tranh.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Trong tranh nông trại có mấy bông hoa hướng dương 🌻?",
            options: [3, 4, 5, 6],
            answer: 5,
            mascotHint: "Đếm các bông hoa vàng: có 5 bông.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Đếm chân để tìm con vật có 6 chân (SGK tr.17)",
            numberScene: {
              mode: "countFiltered",
              kind: "legs",
              kinds: ["ladybug", "beetle", "spider", "beetle", "beetle"],
              note: "Nhện có 8 chân, còn các con khác có 6 chân.",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Có mấy con vật có 6 chân?",
            options: [2, 3, 4, 5],
            answer: 4,
            mascotHint:
              "Con nhện có 8 chân nên không tính — còn lại 4 con có 6 chân.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Dãy số 0 → 10 có ô trống (SGK tr.10, tr.16)",
            numberScene: {
              mode: "numberTrain",
              kind: "ribbon",
              numbers: [0, 1, null, null, 4, 5, 6, null, 8, 9, null],
              note: "Bé đếm xuôi rồi điền số còn thiếu vào ô có dấu ?.",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Đếm xuôi: 0, 1, 2, 3, 4, 5, 6, 7, … số tiếp theo là số nào?",
            options: [6, 8, 9, 10],
            answer: 8,
            mascotHint: "Sau 7 là 8.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Đếm trong ao (SGK tr.17)",
            numberScene: {
              mode: "sceneCount",
              kind: "pond",
              legend: [
                {
                  emoji: "🐰",
                },
                {
                  emoji: "🌳",
                },
                {
                  emoji: "🦆",
                },
                {
                  emoji: "☁️",
                },
                {
                  emoji: "🐦",
                },
              ],
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Trong ao có mấy con vịt 🦆?",
            options: [3, 4, 5, 6],
            answer: 5,
            mascotHint: "Đếm các con vịt bơi dưới nước: có 5 con.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "6 sáu · 7 bảy · 8 tám · 9 chín · 10 mười.",
              "10 là số lớn nhất trong phạm vi 10.",
              "Đếm trong tranh thì đếm từng loại một.",
            ],
            mascotMood: "celebrate",
          },
        },
      ],
    },
    {
      id: "g1-c1-l5",
      title: "Bài 5: Luyện tập — chọn số và cho thêm cho đủ",
      type: "learn",
      description:
        "SGK Bài 2, phần Luyện tập (tr.18): chọn số thích hợp với số con vật; cho thêm để đủ số lượng",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Bé đã biết các số từ 0 đến 10 rồi! Mình cùng luyện tập nhé 🎯",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Luyện Tập",
            title: "Đếm rồi chọn số",
            explanation: "Bé đếm số đồ vật trong hình, rồi chọn số đúng.",
            rule: "Đếm kĩ rồi hãy chọn — đừng đoán.",
            points: [
              "Dãy số: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10.",
              "Đếm xong mới chọn số.",
              "Có thể cho thêm đồ vật để đủ số lượng.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Chọn số thích hợp với số con vật (SGK tr.18)",
            numberScene: {
              mode: "manyGroups",
              groups: [
                {
                  emoji: "🐦",
                  n: 7,
                },
              ],
              unit: "Bé đếm xem có mấy con chim",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Có mấy con chim 🐦 trong hình?",
            options: [5, 6, 7, 8],
            answer: 7,
            mascotHint: "Đếm từng con một: có 7 con chim.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Cho thêm trứng để khay có 8 quả (SGK tr.18)",
            numberScene: {
              mode: "addToReach",
              have: 5,
              target: 8,
              a: 2,
              b: 3,
              emoji: "🥚",
              note: "Khay đang có 5 quả trứng. A thêm 2 quả, B thêm 3 quả.",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Khay đang có 5 quả trứng. Cho thêm A (2 quả) hay B (3 quả) để trong khay có 8 quả?",
            options: [
              "A (2 quả)",
              "B (3 quả)",
              "Cả A và B đều đúng",
              "Không cần cho thêm",
            ],
            answer: "B (3 quả)",
            mascotHint: "5 thêm 3 nữa là 8 — vậy chọn B.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Cho thêm thùng để trên xe có 3 thùng (SGK tr.12)",
            numberScene: {
              mode: "addToReach",
              have: 1,
              target: 3,
              a: 1,
              b: 2,
              emoji: "📦",
              note: "Trên xe đang có 1 thùng. A thêm 1 thùng, B thêm 2 thùng.",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Trên xe đang có 1 thùng. Cho thêm A (1 thùng) hay B (2 thùng) để trên xe có 3 thùng?",
            options: [
              "A (1 thùng)",
              "B (2 thùng)",
              "Cả A và B đều đúng",
              "Không cần cho thêm",
            ],
            answer: "B (2 thùng)",
            mascotHint: "1 thêm 2 nữa là 3 — vậy chọn B.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Số nào đứng ngay trước số 10?",
            options: [8, 9, 10, 0],
            answer: 9,
            mascotHint: "Đếm: tám, chín, mười — số đứng trước 10 là 9.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Đếm kĩ rồi mới chọn số.",
              "Cho thêm đồ vật để đủ số lượng: đếm rồi cộng thêm.",
              "Dãy số 0 → 10 bé đã thuộc.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g1-c1-l6",
      title: "Bài 6: Nhiều hơn, ít hơn",
      type: "learn",
      description:
        "SGK Bài 3 (tr.20–21): so sánh số lượng bằng cách ghép đôi — nhiều hơn, ít hơn",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Trong ao có 3 con ếch 🐸 mà chỉ có 2 chiếc lá 🍃. Số ếch nhiều hơn hay số lá nhiều hơn?",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Nhiều hơn, ít hơn",
            explanation:
              "Muốn biết bên nào nhiều hơn, bé GHÉP ĐÔI từng đồ vật với nhau. Bên nào THỪA RA thì bên đó nhiều hơn.",
            rule: "3 con ếch nhiều hơn 2 chiếc lá; 2 chiếc lá ít hơn 3 con ếch.",
            points: [
              "Ghép đôi là cách so sánh dễ nhất.",
              "Bên thừa ra là bên nhiều hơn.",
              "5 nhiều hơn 3; 3 ít hơn 5.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "3 con ếch và 2 chiếc lá (SGK tr.20)",
            numberScene: {
              mode: "manyGroups",
              groups: [
                {
                  emoji: "🐸",
                  n: 3,
                  label: "A",
                },
                {
                  emoji: "🍃",
                  n: 2,
                  label: "B",
                },
              ],
              paired: true,
              note: "Đường nét đứt nối từng đôi một: số ếch thừa ra 1 con.",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "5 cái kẹo và 3 cái kẹo — nhóm nào nhiều hơn?",
            numberScene: {
              mode: "manyGroups",
              groups: [
                {
                  emoji: "🍬",
                  n: 5,
                  label: "A",
                },
                {
                  emoji: "🍬",
                  n: 3,
                  label: "B",
                },
              ],
              paired: true,
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Nhóm A có 5 cái kẹo, nhóm B có 3 cái kẹo. Nhóm nào nhiều hơn?",
            options: [
              "Nhóm A",
              "Nhóm B",
              "Hai nhóm bằng nhau",
              "Không so sánh được",
            ],
            answer: "Nhóm A",
            mascotHint: "5 nhiều hơn 3 nên nhóm A nhiều hơn.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Ao có 3 con ếch và 2 chiếc lá. Câu nào đúng?",
            options: [
              "Số ếch nhiều hơn số lá",
              "Số lá nhiều hơn số ếch",
              "Số ếch bằng số lá",
            ],
            answer: "Số ếch nhiều hơn số lá",
            mascotHint: "Ghép đôi thì ếch thừa ra 1 con, nên số ếch nhiều hơn.",
          },
        },
        {
          type: "visual",
          content: {
            text: "5 ổ cắm và 4 đồ vật (SGK tr.21)",
            numberScene: {
              mode: "manyGroups",
              groups: [
                {
                  emoji: "🔌",
                  n: 5,
                  label: "A",
                },
                {
                  emoji: "🔌",
                  n: 4,
                  label: "B",
                },
              ],
              note: "Hàng A là các ổ cắm, hàng B là các đồ vật cần cắm điện.",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Có 5 ổ cắm và 4 đồ vật. Câu nào đúng?",
            options: [
              "Số ổ cắm nhiều hơn số đồ vật",
              "Số đồ vật nhiều hơn số ổ cắm",
              "Số ổ cắm bằng số đồ vật",
            ],
            answer: "Số ổ cắm nhiều hơn số đồ vật",
            mascotHint: "5 nhiều hơn 4 nên số ổ cắm nhiều hơn.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Có 5 con tằm và 4 chiếc lá. Câu nào đúng?",
            options: [
              "Số tằm nhiều hơn số lá",
              "Số lá nhiều hơn số tằm",
              "Số tằm bằng số lá",
            ],
            answer: "Số tằm nhiều hơn số lá",
            mascotHint: "5 nhiều hơn 4 nên số tằm nhiều hơn số lá.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Ghép đôi để biết bên nào nhiều hơn.",
              "Bên thừa ra là bên nhiều hơn.",
              "3 nhiều hơn 2; 2 ít hơn 3.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g1-c1-l7",
      title: "Bài 7: Bằng nhau",
      type: "learn",
      description:
        "SGK Bài 3 (tr.22–23, 28): nhận biết hai nhóm có số lượng bằng nhau; nối hai nhóm bằng nhau",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Rô-bốt xếp 4 cái bút ✏️ và 4 quyển vở 📓. Ghép đôi hết mà không thừa cái nào!",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Bằng nhau",
            explanation:
              "Ghép đôi mà KHÔNG bên nào thừa ra thì hai nhóm có số lượng BẰNG NHAU.",
            rule: "4 cái bút ghép đủ với 4 quyển vở — không thừa cái nào. Vậy 4 bằng 4.",
            points: [
              "Ghép đôi hết, không thừa → bằng nhau.",
              "Thừa ra 1 → bên đó nhiều hơn 1.",
              "Thừa ra 2 → bên đó nhiều hơn 2.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "4 cái bút và 4 quyển vở — ghép đôi vừa đủ",
            numberScene: {
              mode: "manyGroups",
              groups: [
                {
                  emoji: "✏️",
                  n: 4,
                  label: "A",
                },
                {
                  emoji: "📓",
                  n: 4,
                  label: "B",
                },
              ],
              paired: true,
              note: "Mỗi cái bút ghép với một quyển vở — không thừa ra cái nào.",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Ghép đôi 4 cái bút với 4 quyển vở thì thế nào?",
            options: [
              "Hai nhóm bằng nhau",
              "Bút nhiều hơn vở",
              "Vở nhiều hơn bút",
              "Không so sánh được",
            ],
            answer: "Hai nhóm bằng nhau",
            mascotHint:
              "Ghép đôi không thừa ra cái nào nên hai nhóm bằng nhau.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Nối hai nhóm có số lượng bằng nhau (SGK tr.28)",
            numberScene: {
              mode: "matchEqual",
              pairs: [
                [
                  {
                    emoji: "🍚",
                    n: 1,
                  },
                  {
                    emoji: "🥣",
                    n: 1,
                  },
                ],
                [
                  {
                    emoji: "🐖",
                    n: 4,
                  },
                  {
                    emoji: "🐷",
                    n: 4,
                  },
                ],
                [
                  {
                    emoji: "🥄",
                    n: 1,
                  },
                  {
                    emoji: "🍜",
                    n: 1,
                  },
                ],
                [
                  {
                    emoji: "🦆",
                    n: 5,
                  },
                  {
                    emoji: "🌊",
                    n: 5,
                  },
                ],
              ],
              note: "Hàng đầu là mẫu: 1 bát cơm nối với 1 cái bát.",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Nhóm lợn có 4 con, nhóm lợn con có 4 con. Hai nhóm thế nào?",
            options: [
              "Bằng nhau",
              "Nhóm lợn nhiều hơn",
              "Nhóm lợn con nhiều hơn",
              "Không so sánh được",
            ],
            answer: "Bằng nhau",
            mascotHint: "Cùng là 4 con nên hai nhóm bằng nhau.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Cho thêm cà rốt để số cà rốt BẰNG số bắp cải (SGK tr.23)",
            numberScene: {
              mode: "addToReach",
              have: 2,
              target: 4,
              a: 2,
              b: 3,
              emoji: "🥕",
              note: "Có 4 cây bắp cải và 2 củ cà rốt. A thêm 2 củ, B thêm 3 củ.",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Có 2 củ cà rốt và 4 cây bắp cải. Cho thêm A (2 củ) hay B (3 củ) để số cà rốt bằng số bắp cải?",
            options: [
              "A (2 củ)",
              "B (3 củ)",
              "Cả A và B đều đúng",
              "Không cần cho thêm",
            ],
            answer: "A (2 củ)",
            mascotHint: "2 thêm 2 nữa là 4 — bằng số bắp cải.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Ghép đôi không thừa ra thì hai nhóm bằng nhau.",
              "4 bằng 4; 5 bằng 5.",
              "Thừa ra bao nhiêu thì bên đó nhiều hơn bấy nhiêu.",
            ],
            mascotMood: "celebrate",
          },
        },
      ],
    },
    {
      id: "g1-c1-l8",
      title: "Bài 8: So sánh số — dấu >, <, =",
      type: "learn",
      description:
        "SGK Bài 4 (tr.24–31): dấu lớn hơn, bé hơn, bằng nhau; so sánh theo mẫu; mê cung số",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Rô-bốt có ba dấu bí mật ✏️ Bé có nhớ dấu nào quay về số nào không?",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Mẹo Nhớ",
            title: "Ba dấu so sánh",
            explanation:
              "Dấu > là LỚN HƠN, dấu < là BÉ HƠN, dấu = là BẰNG NHAU.",
            rule: "5 > 2 (năm lớn hơn hai) · 2 < 5 (hai bé hơn năm) · 5 = 5 (năm bằng năm).",
            points: [
              "Miệng dấu luôn quay về số LỚN hơn.",
              "4 > 3 vì miệng quay về 4.",
              "2 < 3 vì miệng quay về 3.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "4 con vịt nhiều hơn 3 con vịt: 4 > 3 (SGK tr.24)",
            numberScene: {
              mode: "manyGroups",
              groups: [
                {
                  emoji: "🦆",
                  n: 4,
                  label: "A",
                },
                {
                  emoji: "🦆",
                  n: 3,
                  label: "B",
                },
              ],
              note: "4 nhiều hơn 3 nên ta viết 4 > 3.",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "2 con chim ít hơn 3 con chim: 2 < 3 (SGK tr.26)",
            numberScene: {
              mode: "manyGroups",
              groups: [
                {
                  emoji: "🐦",
                  n: 2,
                  label: "A",
                },
                {
                  emoji: "🐦",
                  n: 3,
                  label: "B",
                },
              ],
              note: "2 ít hơn 3 nên ta viết 2 < 3.",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "4 cái xẻng bằng 4 cái cào: 4 = 4 (SGK tr.28)",
            numberScene: {
              mode: "manyGroups",
              groups: [
                {
                  emoji: "🛠️",
                  n: 4,
                  label: "A",
                },
                {
                  emoji: "🧹",
                  n: 4,
                  label: "B",
                },
              ],
              note: "Hai nhóm bằng nhau nên ta viết 4 = 4.",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Thẻ chấm: 5 = 5 (mẫu SGK tr.30)",
            numberScene: {
              mode: "dotCards",
              left: 5,
              right: 5,
              sign: "=",
              note: "Hai thẻ chấm bằng nhau nên điền dấu =.",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Thẻ chấm: 3 ? 5 (SGK tr.30)",
            numberScene: {
              mode: "dotCards",
              left: 3,
              right: 5,
              note: "Bé đếm chấm rồi điền dấu vào ô giữa.",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Điền dấu thích hợp: 3 ? 5",
            options: [">", "<", "="],
            answer: "<",
            mascotHint: "3 bé hơn 5 nên điền dấu <.",
          },
        },
        {
          type: "visual",
          content: {
            text: "So sánh theo mẫu (SGK tr.42)",
            numberScene: {
              mode: "comparePairs",
              pairs: [
                [5, 2],
                [3, 4],
                [6, 6],
                [4, 7],
              ],
              model: ">",
              note: "Hàng đầu là mẫu: 5 > 2. Ba hàng sau bé so sánh rồi NÓI dấu (>, < hoặc =).",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Điền dấu thích hợp: 6 ? 6",
            options: [">", "<", "="],
            answer: "=",
            mascotHint: "6 bằng 6 nên điền dấu =.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Điền dấu thích hợp: 4 ? 7",
            options: [">", "<", "="],
            answer: "<",
            mascotHint: "4 bé hơn 7 nên điền dấu <.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Mê cung số: đường Mai về nhà qua ô có số lớn hơn 4 (SGK tr.25)",
            numberScene: {
              mode: "numberMaze",
              grid: [
                [6, 4, 3, 2, 1, 0],
                [7, 5, 3, 4, 2, 1],
                [4, 8, 6, 5, 3, 2],
                [3, 9, 5, 6, 4, 3],
                [2, 10, 7, 9, 5, 4],
                [1, 4, 3, 8, 6, 5],
              ],
              note: "Chỉ đi qua ô có số lớn hơn 4: 6, 7, 5, 8, 9, 10.",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Mai chỉ đi qua ô có số lớn hơn 4. Ô nào dưới đây Mai KHÔNG đi qua?",
            options: [7, 8, 10, 4],
            answer: 4,
            mascotHint: "4 không lớn hơn 4 nên Mai không đi qua ô số 4.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Miệng dấu quay về số lớn hơn.",
              "4 > 3; 2 < 3; 5 = 5.",
              "Đếm chấm hoặc đếm đồ vật rồi mới so sánh.",
            ],
            mascotMood: "celebrate",
          },
        },
      ],
    },
    {
      id: "g1-c1-l9",
      title: "Bài 9: Mấy và mấy",
      type: "learn",
      description:
        "SGK Bài 5 (tr.32–35): gộp hai nhóm lại; tách một số thành hai phần",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Mai có 3 con cá 🐟, Nam có 2 con cá 🐟. Vậy cả hai bạn có mấy con cá?",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Mấy và mấy",
            explanation:
              "Gộp hai nhóm lại thì được một số lớn hơn. Ngược lại, một số có thể TÁCH thành hai phần.",
            rule: "3 con cá và 2 con cá được 5 con cá. Ta nói: 5 gồm 3 và 2.",
            points: [
              "Đếm từng nhóm, rồi đếm cả hai nhóm.",
              "5 gồm 3 và 2.",
              "5 gồm 2 và 3.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Mai có 3 con cá, Nam có 2 con cá (SGK tr.32)",
            numberScene: {
              mode: "manyGroups",
              groups: [
                {
                  emoji: "🐟",
                  n: 3,
                  label: "Mai",
                },
                {
                  emoji: "🐟",
                  n: 2,
                  label: "Nam",
                },
              ],
              note: "Gộp cá của hai bạn lại thì được 5 con cá.",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "5 gồm 2 và mấy? (SGK tr.32)",
            numberScene: {
              mode: "numberBond",
              kind: "bond",
              total: 5,
              left: 2,
              note: "Một phần là 2, phần kia là mấy? Bé đếm rồi điền.",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "5 gồm 2 và mấy?",
            options: [2, 3, 4, 5],
            answer: 3,
            mascotHint: "2 thêm 3 nữa là 5, nên 5 gồm 2 và 3.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Tách 6 thành hai nhóm (SGK tr.35)",
            numberScene: {
              mode: "numberBond",
              kind: "bond",
              total: 6,
              note: "Bé tách 6 thành hai phần — có nhiều cách: 1 và 5, 2 và 4, 3 và 3.",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "6 gồm 1 và mấy?",
            options: [3, 4, 5, 6],
            answer: 5,
            mascotHint: "1 thêm 5 nữa là 6, nên 6 gồm 1 và 5.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Cho thêm bánh để trên đĩa có 6 cái bánh (SGK tr.15)",
            numberScene: {
              mode: "addToReach",
              have: 4,
              target: 6,
              a: 1,
              b: 2,
              emoji: "🍪",
              note: "Trên đĩa đang có 4 cái bánh. A thêm 1 cái, B thêm 2 cái.",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Trên đĩa có 4 cái bánh. Cho thêm A (1 cái) hay B (2 cái) để trên đĩa có 6 cái bánh?",
            options: [
              "A (1 cái)",
              "B (2 cái)",
              "Cả A và B đều đúng",
              "Không cần cho thêm",
            ],
            answer: "B (2 cái)",
            mascotHint: "4 thêm 2 nữa là 6 — vậy chọn B.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Gộp hai nhóm lại thì được số lớn hơn.",
              "5 gồm 3 và 2; 5 gồm 2 và 3.",
              "6 gồm 1 và 5; 6 gồm 3 và 3.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g1-c1-l10",
      title: "Bài 10: Mấy và mấy trong phạm vi 10",
      type: "learn",
      description:
        "SGK Bài 5 (tr.36–37, 45): bảng tách số 6 và 9; tách – gộp trong phạm vi 10",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Rô-bốt có 10 viên kẹo 🍬 Bé chia 10 viên thành hai phần nhé!",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Tách – gộp trong phạm vi 10",
            explanation:
              "Một số có thể tách thành hai phần theo nhiều cách khác nhau. Gộp hai phần đó lại thì được số ban đầu.",
            rule: "10 gồm 6 và 4 · 10 gồm 5 và 5 · 10 gồm 8 và 2.",
            points: [
              "10 gồm 6 và 4 → 6 + 4 = 10.",
              "10 gồm 5 và 5.",
              "Càng luyện tách số, bé càng tính nhanh về sau.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Bảng tách số 6 (SGK tr.45)",
            numberScene: {
              mode: "numberBond",
              kind: "table",
              total: 6,
              parts: [1, 2, 3],
              note: "6 gồm 1 và 5; 6 gồm 2 và 4; 6 gồm 3 và 3.",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Bảng tách số 9 (SGK tr.45)",
            numberScene: {
              mode: "numberBond",
              kind: "table",
              total: 9,
              parts: [1, 2, 3],
              note: "9 gồm 1 và 8; 9 gồm 2 và 7; 9 gồm 3 và 6.",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "6 gồm 2 và mấy?",
            options: [3, 4, 5, 6],
            answer: 4,
            mascotHint: "2 thêm 4 nữa là 6, nên 6 gồm 2 và 4.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "9 gồm 3 và mấy?",
            options: [5, 6, 7, 8],
            answer: 6,
            mascotHint: "3 thêm 6 nữa là 9, nên 9 gồm 3 và 6.",
          },
        },
        {
          type: "visual",
          content: {
            text: "10 viên kẹo gồm 6 viên xanh và 4 viên cam (SGK tr.37)",
            numberScene: {
              mode: "manyGroups",
              groups: [
                {
                  emoji: "🔵",
                  n: 6,
                  label: "A",
                },
                {
                  emoji: "🟠",
                  n: 4,
                  label: "B",
                },
              ],
              note: "Gộp hai nhóm này lại được 10 viên kẹo.",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Có 10 viên kẹo, trong đó 6 viên màu xanh. Vậy có mấy viên màu cam?",
            options: [2, 3, 4, 5],
            answer: 4,
            mascotHint: "10 gồm 6 và 4 nên có 4 viên màu cam.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "10 gồm 6 và 4, gồm 5 và 5, gồm 8 và 2.",
              "6 gồm 1 và 5; 9 gồm 3 và 6.",
              "Tách rồi gộp lại thì về số ban đầu.",
            ],
            mascotMood: "celebrate",
          },
        },
      ],
    },
    {
      id: "g1-c1-l11",
      title: "Bài 11: Luyện tập chung",
      type: "learn",
      description:
        "SGK Bài 6 (tr.38–41): đếm trong tranh, tìm chậu hoa thích hợp, điền số còn thiếu, so sánh số lượng",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Bé đã biết hết các số từ 0 đến 10 rồi! Mình cùng luyện tập chung nhé 🎯",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Ôn lại nào",
            explanation:
              "Bé đã học: đếm từ 0 đến 10, nhiều hơn ít hơn bằng nhau, so sánh số và tách gộp số.",
            points: [
              "Dãy số: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10.",
              "Miệng dấu quay về số lớn hơn.",
              "Mọi số đều tách được thành hai phần.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Trong mỗi bể có bao nhiêu con cá? (SGK tr.38)",
            numberScene: {
              mode: "manyGroups",
              groups: [
                {
                  emoji: "🐟",
                  n: 4,
                  label: "A",
                },
                {
                  emoji: "🐟",
                  n: 1,
                  label: "B",
                },
                {
                  emoji: "🐟",
                  n: 0,
                  label: "C",
                },
              ],
              note: "Bể C không có con cá nào.",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Bể C không có con cá nào. Vậy bể C có mấy con cá?",
            options: [0, 1, 2, 4],
            answer: 0,
            mascotHint: "Không có con nào thì là 0 con.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Tìm chậu hoa thích hợp: 1 bông và 4 bông (SGK tr.39)",
            numberScene: {
              mode: "manyGroups",
              groups: [
                {
                  emoji: "🌸",
                  n: 1,
                  label: "A",
                },
                {
                  emoji: "🌸",
                  n: 4,
                  label: "B",
                },
              ],
              note: "Gộp 1 bông hoa và 4 bông hoa thì được mấy bông?",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "1 bông hoa và 4 bông hoa, gộp lại được mấy bông?",
            options: [3, 4, 5, 6],
            answer: 5,
            mascotHint: "1 thêm 4 nữa là 5 bông hoa.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Điền số còn thiếu vào các toa tàu (SGK tr.40)",
            numberScene: {
              mode: "numberTrain",
              kind: "wagons",
              rows: [
                [2, 3, 4, "?"],
                [3, "?", 5],
                [4, "?", 6],
                [7, "?", 9],
                [8, "?", 10],
                [0, "?", 2],
              ],
              note: "Mỗi đoàn tàu là một dãy số tăng dần — bé tìm số còn thiếu.",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Đoàn tàu [8] [?] [10]. Số còn thiếu là số nào?",
            options: [7, 8, 9, 11],
            answer: 9,
            mascotHint: "8 rồi 9 rồi 10 — số còn thiếu là 9.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Đếm trong tranh bến sông (SGK tr.39)",
            numberScene: {
              mode: "sceneCount",
              kind: "river",
              legend: [
                {
                  emoji: "🛶",
                },
                {
                  emoji: "🌴",
                },
                {
                  emoji: "🏠",
                },
                {
                  emoji: "🐟",
                },
              ],
              note: "Bé đếm từng loại: thuyền, cây dừa, ngôi nhà, con cá.",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Bến sông có mấy chiếc thuyền 🛶?",
            options: [2, 3, 4, 5],
            answer: 3,
            mascotHint: "Có 3 chiếc thuyền trên sông.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Cốc nào có nhiều hạt sen nhất? (SGK tr.41)",
            numberScene: {
              mode: "manyGroups",
              groups: [
                {
                  emoji: "🫘",
                  n: 3,
                  label: "A",
                },
                {
                  emoji: "🫘",
                  n: 5,
                  label: "B",
                },
                {
                  emoji: "🫘",
                  n: 4,
                  label: "C",
                },
                {
                  emoji: "🫘",
                  n: 2,
                  label: "D",
                },
              ],
              note: "Bé so sánh bốn cốc rồi tìm cốc nhiều nhất.",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Cốc nào có nhiều hạt sen nhất?",
            options: ["Cốc A", "Cốc B", "Cốc C", "Cốc D"],
            answer: "Cốc B",
            mascotHint: "Cốc B có 5 hạt — nhiều nhất trong bốn cốc.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Đếm trong tranh thì đếm từng loại một.",
              "So sánh số lượng rồi mới kết luận.",
              "Số còn thiếu trong dãy số: đếm xuôi để tìm.",
            ],
            mascotMood: "celebrate",
          },
        },
      ],
    },
    {
      id: "g1-c1-l12",
      title: "Bài 12: Luyện tập chung (tiếp theo)",
      type: "learn",
      description:
        "SGK Bài 6 (tr.42–45): điền dấu, so sánh theo mẫu, đếm trong tranh cánh đồng, tách số 6 và 9",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Cùng Rô-bốt làm nốt các bài tập của Chủ đề 1 nhé! 🎉",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "So sánh và tách số",
            explanation:
              "Bé điền dấu >, <, = vào ô trống, đếm số trong tranh và tách số thành hai phần.",
            points: [
              "Điền dấu: miệng dấu quay về số lớn hơn.",
              "Đếm trong tranh: đếm từng loại.",
              "Tách số: gộp hai phần lại thì về số ban đầu.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "So sánh rồi nói dấu vào ô trống (SGK tr.42)",
            numberScene: {
              mode: "comparePairs",
              pairs: [
                [1, 2],
                [2, 3],
                [4, 4],
                [6, 5],
                [8, 7],
                [10, 5],
              ],
              model: "<",
              note: "Hàng đầu là mẫu: 1 < 2. Năm hàng sau bé so sánh rồi NÓI dấu (>, < hoặc =).",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Điền dấu thích hợp: 8 ? 7",
            options: [">", "<", "="],
            answer: ">",
            mascotHint: "8 lớn hơn 7 nên điền dấu >.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Điền dấu thích hợp: 4 ? 4",
            options: [">", "<", "="],
            answer: "=",
            mascotHint: "4 bằng 4 nên điền dấu =.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Đếm trong tranh cánh đồng (SGK tr.40)",
            numberScene: {
              mode: "sceneCount",
              kind: "field",
              legend: [
                {
                  emoji: "🐃",
                },
                {
                  emoji: "🏠",
                },
                {
                  emoji: "🌾",
                },
                {
                  emoji: "☀️",
                },
                {
                  emoji: "☁️",
                },
              ],
              note: "Bé đếm trâu, nhà, bó lúa, ông mặt trời và đám mây.",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Cánh đồng có mấy con trâu 🐃?",
            options: [3, 4, 5, 6],
            answer: 5,
            mascotHint: "Bé đếm các con trâu: có 5 con.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Hàng nào có nhiều đồ chơi hơn? (SGK tr.44)",
            numberScene: {
              mode: "manyGroups",
              groups: [
                {
                  emoji: "🧸",
                  n: 4,
                  label: "A",
                },
                {
                  emoji: "🚗",
                  n: 6,
                  label: "B",
                },
              ],
              note: "Hai hàng đồ chơi — bé đếm rồi so sánh.",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Hàng A có 4 đồ chơi, hàng B có 6 đồ chơi. Hàng nào nhiều hơn?",
            options: [
              "Hàng A",
              "Hàng B",
              "Hai hàng bằng nhau",
              "Không so sánh được",
            ],
            answer: "Hàng B",
            mascotHint: "6 nhiều hơn 4 nên hàng B nhiều hơn.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Đếm ở sân bay: 5 máy bay và 4 xe (SGK tr.44)",
            numberScene: {
              mode: "manyGroups",
              groups: [
                {
                  emoji: "✈️",
                  n: 5,
                  label: "A",
                },
                {
                  emoji: "🚌",
                  n: 4,
                  label: "B",
                },
              ],
              note: "Hàng A là máy bay, hàng B là xe.",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Có 5 máy bay và 4 xe. Câu nào đúng?",
            options: [
              "Số xe ít hơn số máy bay",
              "Số xe bằng số máy bay",
              "Số xe nhiều hơn số máy bay",
            ],
            answer: "Số xe ít hơn số máy bay",
            mascotHint: "4 bé hơn 5 nên số xe ít hơn số máy bay.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Tách số: 6 gồm 4 và mấy? 6 gồm 5 và mấy? (SGK tr.45)",
            numberScene: {
              mode: "numberBond",
              kind: "table",
              total: 6,
              parts: [4, 5],
              note: "6 gồm 4 và 2; 6 gồm 5 và 1.",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "6 gồm 4 và mấy?",
            options: [1, 2, 3, 4],
            answer: 2,
            mascotHint: "4 thêm 2 nữa là 6, nên 6 gồm 4 và 2.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Bé đã hoàn thành Chủ đề 1: các số từ 0 đến 10.",
              "Điền dấu, đếm trong tranh, tách – gộp số bé đều làm được.",
              "Sang Chủ đề 2, bé sẽ làm quen với các hình phẳng.",
            ],
            mascotMood: "celebrate",
          },
        },
      ],
    },
  ],
};
