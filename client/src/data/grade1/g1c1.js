export const g1c1 = {
  id: "g1-c1",
  name: "Chủ đề 1: Các số từ 0 đến 10",
  description:
    "Đếm, đọc, viết các số từ 0 đến 10; nhiều hơn, ít hơn, bằng nhau; so sánh số; tách và gộp số",
  icon: "🔢",
  color: "#4facfe",
  totalLessons: 11,
  lessons: [
    {
      id: "g1-c1-l1",
      title: "Bài 1: Tiết học đầu tiên",
      type: "learn",
      description: "làm quen năm bạn học cùng bé và bốn phần trong mỗi bài học",
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
            text: "Năm bạn cùng học Toán với bé",
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
            title: "Mỗi bài học thường có bốn phần nào?",
            explanation:
              "Mỗi bài đều đi theo bốn phần quen thuộc, giúp bé vừa hiểu bài vừa nhớ lâu.",
            // 🔴 KHÔNG thêm `points` ở đây nữa (người dùng gửi ảnh 2026-09-27: "nội dung khoanh đỏ
            // bị trùng lặp"). Ô nhấn mạnh + bốn dòng gạch đầu dòng nói y hệt một điều, rồi slide
            // ngay sau (`table` bốn nhãn) nói lần thứ ba. Nay slide này chỉ GIỚI THIỆU tên
            // bốn phần, slide sau mới giải nghĩa từng phần — hai slide, hai việc.
            rule: "🔍 Khám phá · 🤖 Thực hành · 📘 Luyện tập · 🎲 Trò chơi.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Bốn phần bé sẽ gặp trong mỗi bài",
            table: {
              headers: ["Phần học", "Bé làm gì?"],
              rows: [
                ["🔍 Khám Phá", "Tìm hiểu kiến thức mới"],
                ["🤖 Thực Hành", "Làm bài tập thực hành"],
                ["📘 Luyện Tập", "Ôn lại và làm bài"],
                ["🎲 Trò Chơi", "Vừa học vừa chơi"],
              ],
              label: "Bốn phần của một bài học",
            },
          },
        },
        {
          type: "concept",
          content: {
            badge: "Cách Học",
            title: "Bé học Toán như thế nào?",
            explanation:
              "Buổi đầu tiên bé chưa học số nào: việc cần làm là biết cách học trong app và cách dùng các nút bên dưới.",
            points: [
              "Bước 1 — Mỗi bài gồm nhiều trang: số trang hiện ở góc trên bên phải. Học xong một trang, bé bấm “Tiếp tục” để sang trang sau, muốn xem lại thì bấm “Trước”.",
              "Bước 2 — Đọc nhãn nhỏ ở đầu trang để biết sắp làm gì: Khám Phá, Thực Hành, Luyện Tập hay Trò Chơi.",
              "Bước 3 — Bấm nút loa 🔈 để nghe cô đọc, nếu chưa hiểu thì nghe lại.",
              "Bước 4 — Làm sai thì đọc kỹ gợi ý của Rô-bốt hiện ra rồi thử lại — sai là chuyện bình thường.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            table: {
              headers: ["Điều cần nhớ", "Nội dung"],
              rows: [
                ["Khám phá", "cô giảng bài mới"],
                ["Luyện tập", "bé tự làm bài"],
                ["Trò chơi", "vừa chơi vừa học"],
              ],
            },
            text: "Bảng nhớ nhanh — buổi học Toán đầu tiên\nBa điều dưới đây bé đọc lại mỗi khi làm bài.\nTrước khi nộp bài, bé tự hỏi: đã đủ ba điều này chưa?",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Nhãn “Trò chơi” 🎲 cho biết bé sắp làm gì?",
            options: ["Chơi trò chơi", "Đọc số", "Đo độ dài", "Tô màu"],
            answer: "Chơi trò chơi",
            mascotHint:
              "Xúc xắc là nhãn của phần Trò Chơi — bé vừa chơi vừa học.",
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
      title: "Bài 2: Các số 0, 1, 2, 3, 4, 5",
      type: "learn",
      description: "đếm, đọc, viết các số 0, 1, 2, 3, 4, 5; đếm theo điều kiện",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Bể cá thứ nhất có 1 con cá, khay bên cạnh có 1 khối. Bể rỗng thì có mấy con cá nhỉ? 🐟",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Các số 0, 1, 2, 3, 4, 5",
            explanation:
              "Số cho biết có BAO NHIÊU đồ vật. Bé đếm cá trong bể và đếm khối trong khay — hai cách đếm cho cùng một số.",
            rule: "0 không · 1 một · 2 hai · 3 ba · 4 bốn · 5 năm.",
            points: [
              "Đếm: một, hai, ba, bốn, năm.",
              "Không có gì thì là 0 — đọc là “không”.",
              "Bể có mấy con cá thì khay có bấy nhiêu khối.",
              "Bé viết: 0, 1, 2, 3, 4, 5.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Số 1 — một: bể có 1 con cá, khay có 1 khối",
            numberScene: {
              mode: "numberShow",
              kind: "tank",
              numbers: [1],
              note: "Bể có 1 con cá và khay có 1 khối — tất cả là 1. Bé đọc: một.",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Số 2 — hai: bể có 2 con cá, khay có 2 khối",
            numberScene: {
              mode: "numberShow",
              kind: "tank",
              numbers: [2],
              note: "Bể có 2 con cá và khay có 2 khối — tất cả là 2. Bé đọc: hai.",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Số 3 — ba: bể có 3 con cá, khay có 3 khối",
            numberScene: {
              mode: "numberShow",
              kind: "tank",
              numbers: [3],
              note: "Bể có 3 con cá và khay có 3 khối — tất cả là 3. Bé đọc: ba.",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Số 4 — bốn: bể có 4 con cá, khay có 4 khối",
            numberScene: {
              mode: "numberShow",
              kind: "tank",
              numbers: [4],
              note: "Bể có 4 con cá và khay có 4 khối — tất cả là 4. Bé đọc: bốn.",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Số 5 — năm: bể có 5 con cá, khay có 5 khối",
            numberScene: {
              mode: "numberShow",
              kind: "tank",
              numbers: [5],
              note: "Bể có 5 con cá và khay có 5 khối — tất cả là 5. Bé đọc: năm.",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Số 0 — không: bể rỗng, khay rỗng",
            numberScene: {
              mode: "numberShow",
              kind: "tank",
              numbers: [0],
              note: "Bể không có con cá nào, khay không có khối nào — đó là 0. Bé đọc: không.",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Quan sát tranh — bé đếm từng nhóm rồi trả lời câu hỏi bên dưới",
            numberScene: {
              mode: "manyGroups",
              groups: [
                { emoji: "🐱", n: 1 },
                { emoji: "🐶", n: 2 },
                { emoji: "🥕", n: 3 },
                { emoji: "🐟", n: 4 },
                { emoji: "🐔", n: 5 },
              ],
              unit: "Mỗi hàng là một nhóm — bé đếm từng hàng rồi đọc số",
            },
          },
        },
        {
          type: "concept",
          content: {
            badge: "Mẹo Nhớ",
            title: "Đếm cho đúng",
            explanation:
              "Đếm là việc đầu tiên của mọi bài. Đếm đúng thì mọi thứ sau đó mới đúng.",
            points: [
              "Mỗi đồ vật chỉ đếm MỘT lần — không bỏ sót, không đếm lại.",
              "Đếm lần lượt: từ trái sang phải, từ trên xuống dưới.",
              "Đếm xong thì đọc số: một, hai, ba, bốn, năm.",
              "Không có đồ vật nào thì viết số 0.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            table: {
              headers: ["Bước", "Việc bé làm"],
              rows: [
                [
                  "Bước 1 — Nhìn kỹ",
                  "nhìn hết cả hình, xem có mấy nhóm đồ vật",
                ],
                ["Bước 2 — Đếm", "đếm từng nhóm, lần lượt từ trái sang phải"],
                ["Bước 3 — Kiểm lại", "đếm lại lần nữa rồi mới đọc số"],
              ],
            },
            text: "Ba bước đếm cho đúng — bé làm lần lượt\nBé đọc bảng này trước khi làm, và đọc lại sau khi làm xong.\nBỏ một bước là bài dễ sai.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Đếm xong một nhóm đồ vật, bé nên làm gì để chắc chắn đúng?",
            options: [
              "Đếm lại một lần nữa rồi mới đọc số",
              "Đọc số luôn cho nhanh",
              "Đoán một số bất kì",
            ],
            answer: "Đếm lại một lần nữa rồi mới đọc số",
            mascotHint: "Đếm lại là cách kiểm tra chắc chắn nhất.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Trong tranh, nhóm con chó 🐶 có mấy con?",
            options: [1, 2, 3, 4],
            answer: 2,
            mascotHint: "Bé đếm: một, hai — nhóm con chó có 2 con.",
            numberScene: {
              mode: "manyGroups",
              groups: [
                { emoji: "🐱", n: 1 },
                { emoji: "🐶", n: 2 },
                { emoji: "🥕", n: 3 },
                { emoji: "🐟", n: 4 },
                { emoji: "🐔", n: 5 },
              ],
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Hình bên có mấy con cá?",
            options: [1, 2, 3, 4],
            answer: 3,
            mascotHint: "Bé đếm: một, hai, ba — có 3 con cá.",
            numberScene: {
              mode: "numberShow",
              kind: "tank",
              numbers: [3],
              showDigits: false,
              note: "Bể cá và khay khối — bé đếm xem có mấy con cá.",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Số nào chỉ “không có gì”?",
            options: [0, 1, 2, 3],
            answer: 0,
            mascotHint: "0 nghĩa là không có gì — bé viết số 0.",
          },
        },
        {
          type: "visual",
          content: {
            text: "0 · 1 · 2 · 3 · 4 · 5 — bé đọc theo thứ tự",
            numberLine: {
              from: 0,
              to: 5,
              step: 1,
              marks: [0, 1, 2, 3, 4, 5],
              label: "Các số 0, 1, 2, 3, 4, 5",
            },
          },
        },
        {
          type: "quiz",
          content: {
            question: "Đếm từ 1: số nào đếm đến sau — 3 hay 4?",
            options: [1, 3, 4, 5],
            answer: 4,
            mascotHint: "Đếm từ 1: số 4 đếm đến sau số 3.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Đếm cà rốt ĐÃ TÔ MÀU",
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
            text: "Đếm xem có mấy con ghi số 2",
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
            options: [3, 4, 5, 0],
            answer: 5,
            mascotHint: "Đếm tiếp: bốn rồi đến năm.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Hàng cá 🐟 có mấy con?",
            options: [2, 3, 4, 5],
            answer: 4,
            mascotHint: "Đếm: một, hai, ba, bốn — có 4 con cá.",
            numberScene: {
              mode: "manyGroups",
              groups: [{ emoji: "🐟", n: 4 }],
            },
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "0 không · 1 một · 2 hai · 3 ba · 4 bốn · 5 năm.",
              "Số cho biết có bao nhiêu đồ vật.",
              "Không có gì thì viết số 0.",
              "Đếm theo điều kiện: chỉ đếm củ đã tô màu, con ghi số 2.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g1-c1-l4",
      title: "Bài 3: Các số 6, 7, 8, 9, 10",
      type: "learn",
      description:
        "đếm, đọc, viết các số 6, 7, 8, 9, 10; đếm trong tranh; đếm con vật 6 chân",
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
            text: "Số 6 — sáu: 6 con ong 🐝",
            numberScene: {
              mode: "numberShow",
              kind: "living",
              numbers: [6],
              note: "Bé đếm từng con ong rồi đọc: sáu.",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Số 7 — bảy: 7 con chim 🐦",
            numberScene: {
              mode: "numberShow",
              kind: "living",
              numbers: [7],
              note: "Bé đếm từng con chim rồi đọc: bảy.",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Số 8 — tám: 8 bông hoa 🌸",
            numberScene: {
              mode: "numberShow",
              kind: "living",
              numbers: [8],
              note: "Bé đếm từng bông hoa rồi đọc: tám.",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Số 9 — chín: 9 con sao biển ⭐",
            numberScene: {
              mode: "numberShow",
              kind: "living",
              numbers: [9],
              note: "Bé đếm từng con sao biển rồi đọc: chín.",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Số 10 — mười: 10 con bọ rùa 🐞",
            numberScene: {
              mode: "numberShow",
              kind: "living",
              numbers: [10],
              note: "Bé đếm từng con bọ rùa rồi đọc: mười.",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Đếm trong tranh nông trại",
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
          type: "visual",
          content: {
            table: {
              headers: ["Bước", "Việc bé làm"],
              rows: [
                [
                  "Bước 1 — Nhìn kỹ",
                  "nhìn hết cả hình, xem có mấy nhóm đồ vật",
                ],
                ["Bước 2 — Đếm", "đếm từng nhóm, lần lượt từ trái sang phải"],
                ["Bước 3 — Kiểm lại", "đếm lại lần nữa rồi mới đọc số"],
              ],
            },
            text: "Ba bước đếm cho đúng — bé làm lần lượt\nBé đọc bảng này trước khi làm, và đọc lại sau khi làm xong.\nBỏ một bước là bài dễ sai.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Làm xong một bài, bé nên làm gì để chắc chắn kết quả đúng?",
            options: [
              "Kiểm lại một lần nữa theo điều cần nhớ",
              "Nộp bài luôn cho nhanh",
              "Đoán lại một lần nữa",
            ],
            answer: "Kiểm lại một lần nữa theo điều cần nhớ",
            mascotHint:
              "Kiểm lại một lần nữa rồi mới nộp bài — kiểm lại là thói quen của người học giỏi.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Bé đếm từ 1: số nào đếm đến sau — 4 hay 6?",
            options: [4, 6, 7, 8],
            answer: 6,
            mascotHint: "Đếm từ 1: số 6 đếm đến sau số 4.",
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
            text: "Đếm chân để tìm con vật có 6 chân",
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
            text: "Dãy số 0 → 10 có ô trống",
            numberScene: {
              mode: "numberTrain",
              kind: "ribbon",
              numbers: [0, 1, null, null, 4, 5, 6, null, 8, 9, null],
              answers: [2, 3, 7, 10],
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
            text: "Đếm trong ao",
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
      title: "Bài 4: Luyện tập — chọn số và cho thêm cho đủ",
      type: "learn",
      description: "chọn số thích hợp với số con vật; cho thêm để đủ số lượng",
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
            text: "Quan sát tranh — bé đếm từng nhóm rồi trả lời câu hỏi bên dưới",
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
          type: "visual",
          content: {
            table: {
              headers: ["Bước", "Việc bé làm"],
              rows: [
                [
                  "Bước 1 — Nhìn kỹ",
                  "nhìn hết cả hình, xem có mấy nhóm đồ vật",
                ],
                ["Bước 2 — Đếm", "đếm từng nhóm, lần lượt từ trái sang phải"],
                ["Bước 3 — Kiểm lại", "đếm lại lần nữa rồi mới đọc số"],
              ],
            },
            text: "Ba bước đếm cho đúng — bé làm lần lượt\nBé đọc bảng này trước khi làm, và đọc lại sau khi làm xong.\nBỏ một bước là bài dễ sai.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Làm xong một bài, bé nên làm gì để chắc chắn kết quả đúng?",
            options: [
              "Kiểm lại một lần nữa theo điều cần nhớ",
              "Nộp bài luôn cho nhanh",
              "Đoán lại một lần nữa",
            ],
            answer: "Kiểm lại một lần nữa theo điều cần nhớ",
            mascotHint:
              "Kiểm lại một lần nữa rồi mới nộp bài — kiểm lại là thói quen của người học giỏi.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Bé đếm từ 1: số nào đếm đến sau — 5 hay 2?",
            options: [1, 2, 5, 10],
            answer: 5,
            mascotHint: "Đếm từ 1: số 5 đếm đến sau số 2.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Có mấy con chim 🐦 trong hình?",
            options: [5, 6, 7, 8],
            answer: 7,
            mascotHint: "Đếm từng con một: có 7 con chim.",
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
          type: "visual",
          content: {
            text: "Cho thêm trứng để khay có 8 quả",
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
            text: "Cho thêm thùng để trên xe có 3 thùng",
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
              "Cho thêm đồ vật để đủ số lượng: đếm rồi thêm vào cho đủ.",
              "Dãy số 0 → 10 bé đã thuộc.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g1-c1-l6",
      title: "Bài 5: Nhiều hơn, ít hơn",
      type: "learn",
      description: "so sánh số lượng bằng cách ghép đôi — nhiều hơn, ít hơn",
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
            text: "3 con ếch và 2 chiếc lá",
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
          type: "concept",
          content: {
            badge: "Mẹo Nhớ",
            title: "Ghép đôi",
            explanation:
              "Chưa cần dấu so sánh: bé chỉ cần GHÉP ĐÔI rồi xem bên nào thừa ra.",
            points: [
              "Ghép đôi là cách so sánh dễ nhất: xếp mỗi đồ vật của nhóm này với một đồ vật của nhóm kia.",
              "Ghép xong, nhóm nào còn thừa ra thì nhóm đó NHIỀU HƠN.",
              "Ghép hết mà không nhóm nào thừa thì hai nhóm BẰNG NHAU.",
              "Ví dụ: 3 con ếch và 2 chiếc lá — ghép đôi thì thừa ra 1 con ếch, vậy ếch nhiều hơn lá.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            table: {
              headers: ["Bước", "Việc bé làm"],
              rows: [
                [
                  "Bước 1 — Đếm",
                  "đếm số lượng của mỗi bên (hoặc đọc hai số đã cho)",
                ],
                [
                  "Bước 2 — Ghép đôi",
                  "ghép từng cặp một để thấy bên nào thừa ra",
                ],
                [
                  "Bước 3 — Nói kết quả",
                  "nói lại một lần nữa: nhiều hơn, ít hơn hay bằng nhau",
                ],
              ],
            },
            text: "Ba bước so sánh — bé làm lần lượt\nBé đọc bảng này trước khi làm, và đọc lại sau khi làm xong.\nBỏ một bước là bài dễ sai.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Làm xong một bài, bé nên làm gì để chắc chắn kết quả đúng?",
            options: [
              "Kiểm lại một lần nữa theo điều cần nhớ",
              "Nộp bài luôn cho nhanh",
              "Đoán lại một lần nữa",
            ],
            answer: "Kiểm lại một lần nữa theo điều cần nhớ",
            mascotHint:
              "Kiểm lại một lần nữa rồi mới nộp bài — kiểm lại là thói quen của người học giỏi.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Số nào lớn hơn: 6 hay 3?",
            options: [2, 3, 5, 6],
            answer: 6,
            mascotHint: "Đếm từ 1: số 6 đếm đến sau số 3, nên 6 lớn hơn 3.",
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
            text: "5 ổ cắm và 4 đồ vật",
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
      title: "Bài 6: Bằng nhau",
      type: "learn",
      description:
        "nhận biết hai nhóm có số lượng bằng nhau; nối hai nhóm bằng nhau",
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
          type: "visual",
          content: {
            baseTen: {
              tens: 0,
              ones: 7,
            },
            text: "7 gồm mấy và mấy?\nBé đếm khối: một bên có 0 khối, một bên có 7 khối\nVậy 7 gồm 0 và 7",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Mẹo Nhớ",
            title: "So sánh hai số cho đúng",
            explanation:
              "Muốn biết số nào lớn hơn, bé làm hai bước sau — không cần đếm lại từ đầu.",
            points: [
              "Bước 1 — đếm số chữ số: số nào có ít chữ số hơn thì số đó BÉ hơn (ví dụ 9 < 10).",
              "Bước 2 — hai số cùng số chữ số: so chữ số đầu tiên bên TRÁI trước; số nào có chữ số ấy lớn hơn thì số đó lớn hơn. Bằng nhau thì so chữ số tiếp theo.",
              "Ví dụ: hai số đều có 1 chữ số, bé so từ trái sang phải — đến hàng đơn vị thì 3 < 7, nên 3 < 7.",
            ],
          },
        },
        {
          type: "quiz",
          content: {
            question: "Bé đếm tiếp: ngay sau số 7 thì đến số nào?",
            options: [7, 8, 9, 17],
            answer: 8,
            mascotHint: "Đếm tiếp một bước từ số đã cho thì được số đó.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Số nào LỚN NHẤT trong các số sau: 7, 3, 28, 4?",
            options: ["3", "4", "7", "28"],
            answer: "28",
            mascotHint:
              "Bé so chữ số đầu tiên bên trái của các số, bằng nhau thì so chữ số tiếp theo — số lớn nhất là 28.",
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
            text: "Nối hai nhóm có số lượng bằng nhau",
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
            text: "Cho thêm cà rốt để số cà rốt BẰNG số bắp cải",
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
      title: "Bài 7: So sánh số — dấu >, <, =",
      type: "learn",
      description:
        "dấu lớn hơn, bé hơn, bằng nhau; so sánh theo mẫu; mê cung số",
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
            text: "4 con vịt nhiều hơn 3 con vịt: 4 > 3",
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
            text: "2 con chim ít hơn 3 con chim: 2 < 3",
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
            text: "4 cái xẻng bằng 4 cái cào: 4 = 4",
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
            text: "Thẻ chấm: 5 = 5",
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
            text: "Thẻ chấm: 3 ? 5",
            numberScene: {
              mode: "dotCards",
              left: 3,
              right: 5,
              note: "Bé đếm chấm rồi điền dấu vào ô giữa.",
            },
          },
        },
        {
          type: "concept",
          content: {
            badge: "Mẹo Nhớ",
            title: "So sánh hai số bằng cách đếm",
            explanation:
              "Ở mức này, cách chắc chắn nhất là ĐẾM: số nào đếm đến sau thì số đó lớn hơn.",
            points: [
              "Đếm từ 1: “1, 2, 3, 4, 5…” — số đếm đến sau thì lớn hơn. Ví dụ 5 đến sau 2 nên 5 lớn hơn 2.",
              "Đếm từ 1: số nào đếm đến sau thì số đó lớn hơn.",
              "Ba dấu cần nhớ: “>” đọc là lớn hơn, “<” đọc là bé hơn, “=” đọc là bằng nhau.",
              "Với hai số của bài này: 4 < 8, đọc là “4 bé hơn 8”.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            table: {
              headers: ["Bước", "Việc bé làm"],
              rows: [
                [
                  "Bước 1 — Đếm",
                  "đếm số lượng của mỗi bên (hoặc đọc hai số đã cho)",
                ],
                [
                  "Bước 2 — Ghép đôi",
                  "ghép từng cặp một để thấy bên nào thừa ra",
                ],
                [
                  "Bước 3 — Nói kết quả",
                  "nói lại một lần nữa: nhiều hơn, ít hơn hay bằng nhau",
                ],
              ],
            },
            text: "Ba bước so sánh — bé làm lần lượt\nBé đọc bảng này trước khi làm, và đọc lại sau khi làm xong.\nBỏ một bước là bài dễ sai.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Làm xong một bài, bé nên làm gì để chắc chắn kết quả đúng?",
            options: [
              "Kiểm lại một lần nữa theo điều cần nhớ",
              "Nộp bài luôn cho nhanh",
              "Đoán lại một lần nữa",
            ],
            answer: "Kiểm lại một lần nữa theo điều cần nhớ",
            mascotHint:
              "Kiểm lại một lần nữa rồi mới nộp bài — kiểm lại là thói quen của người học giỏi.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Số nào lớn hơn: 8 hay 4?",
            options: [2, 4, 5, 8],
            answer: 8,
            mascotHint: "Đếm từ 1: số 8 đếm đến sau số 4, nên 8 lớn hơn 4.",
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
            text: "So sánh theo mẫu",
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
            text: "Mê cung số: đường Mai về nhà qua ô có số lớn hơn 4",
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
      title: "Bài 8: Mấy và mấy",
      type: "learn",
      description: "gộp hai nhóm lại; tách một số thành hai phần",
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
            text: "Mai có 3 con cá, Nam có 2 con cá",
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
            text: "5 gồm 2 và mấy?",
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
          type: "concept",
          content: {
            badge: "Mẹo Nhớ",
            title: "So sánh hai số bằng cách đếm",
            explanation:
              "Ở mức này, cách chắc chắn nhất là ĐẾM: số nào đếm đến sau thì số đó lớn hơn.",
            points: [
              "Đếm từ 1: “1, 2, 3, 4, 5…” — số đếm đến sau thì lớn hơn. Ví dụ 5 đến sau 2 nên 5 lớn hơn 2.",
              "Đếm từ 1: số nào đếm đến sau thì số đó lớn hơn.",
              "Ba dấu cần nhớ: “>” đọc là lớn hơn, “<” đọc là bé hơn, “=” đọc là bằng nhau.",
              "Với hai số của bài này: 5 < 9, đọc là “5 bé hơn 9”.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            table: {
              headers: ["Bước", "Việc bé làm"],
              rows: [
                [
                  "Bước 1 — Nhìn kỹ",
                  "nhìn hết cả hình, xem có mấy nhóm đồ vật",
                ],
                ["Bước 2 — Đếm", "đếm từng nhóm, lần lượt từ trái sang phải"],
                ["Bước 3 — Kiểm lại", "đếm lại lần nữa rồi mới đọc số"],
              ],
            },
            text: "Ba bước đếm cho đúng — bé làm lần lượt\nBé đọc bảng này trước khi làm, và đọc lại sau khi làm xong.\nBỏ một bước là bài dễ sai.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Làm xong một bài, bé nên làm gì để chắc chắn kết quả đúng?",
            options: [
              "Kiểm lại một lần nữa theo điều cần nhớ",
              "Nộp bài luôn cho nhanh",
              "Đoán lại một lần nữa",
            ],
            answer: "Kiểm lại một lần nữa theo điều cần nhớ",
            mascotHint:
              "Kiểm lại một lần nữa rồi mới nộp bài — kiểm lại là thói quen của người học giỏi.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Số nào lớn hơn: 9 hay 5?",
            options: [2, 3, 5, 9],
            answer: 9,
            mascotHint: "Đếm từ 1: số 9 đếm đến sau số 5, nên 9 lớn hơn 5.",
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
            text: "Tách 6 thành hai nhóm",
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
            text: "Cho thêm bánh để trên đĩa có 6 cái bánh",
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
      title: "Bài 9: Mấy và mấy trong phạm vi 10",
      type: "learn",
      description: "bảng tách số 6 và 9; tách – gộp trong phạm vi 10",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Rô-bốt có 10 viên kẹo 🍬 Bé tách 10 viên thành hai phần nhé!",
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
            text: "Bảng tách số 6",
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
            text: "Bảng tách số 9",
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
          type: "visual",
          content: {
            baseTen: {
              tens: 1,
              ones: 0,
            },
            text: "10 gồm mấy và mấy?\nBé đếm khối: một bên có 1 khối, một bên có 0 khối\nVậy 10 gồm 1 và 0",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Mẹo Nhớ",
            title: "So sánh hai số cho đúng",
            explanation:
              "Muốn biết số nào lớn hơn, bé làm hai bước sau — không cần đếm lại từ đầu.",
            points: [
              "Bước 1 — đếm số chữ số: số nào có ít chữ số hơn thì số đó BÉ hơn (ví dụ 9 < 10).",
              "Bước 2 — hai số cùng số chữ số: so chữ số đầu tiên bên TRÁI trước; số nào có chữ số ấy lớn hơn thì số đó lớn hơn. Bằng nhau thì so chữ số tiếp theo.",
              "Ví dụ: 10 có 2 chữ số, 5 có 1 chữ số — số nào có ít chữ số hơn thì bé hơn.",
            ],
          },
        },
        {
          type: "quiz",
          content: {
            question: "Bé đếm tiếp: ngay sau số 10 thì đến số nào?",
            options: [10, 11, 12, 20],
            answer: 11,
            mascotHint: "Đếm tiếp một bước từ số đã cho thì được số đó.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Số nào LỚN NHẤT trong các số sau: 10, 5, 45, 6?",
            options: ["5", "6", "10", "45"],
            answer: "45",
            mascotHint:
              "Bé so chữ số đầu tiên bên trái của các số, bằng nhau thì so chữ số tiếp theo — số lớn nhất là 45.",
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
            text: "10 viên kẹo gồm 6 viên xanh và 4 viên cam",
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
      title: "Bài 10: Luyện tập chung",
      type: "learn",
      description:
        "đếm trong tranh, tìm chậu hoa thích hợp, điền số còn thiếu, so sánh số lượng",
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
            text: "Trong mỗi bể có bao nhiêu con cá?",
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
          type: "concept",
          content: {
            badge: "Mẹo Nhớ",
            title: "So sánh hai số bằng cách đếm",
            explanation:
              "Ở mức này, cách chắc chắn nhất là ĐẾM: số nào đếm đến sau thì số đó lớn hơn.",
            points: [
              "Đếm từ 1: “1, 2, 3, 4, 5…” — số đếm đến sau thì lớn hơn. Ví dụ 5 đến sau 2 nên 5 lớn hơn 2.",
              "Đếm từ 1: số nào đếm đến sau thì số đó lớn hơn.",
              "Ba dấu cần nhớ: “>” đọc là lớn hơn, “<” đọc là bé hơn, “=” đọc là bằng nhau.",
              "Với hai số của bài này: 6 < 11, đọc là “6 bé hơn 11”.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            table: {
              headers: ["Bước", "Việc bé làm"],
              rows: [
                [
                  "Bước 1 — Đếm",
                  "đếm số lượng của mỗi bên (hoặc đọc hai số đã cho)",
                ],
                [
                  "Bước 2 — Ghép đôi",
                  "ghép từng cặp một để thấy bên nào thừa ra",
                ],
                [
                  "Bước 3 — Nói kết quả",
                  "nói lại một lần nữa: nhiều hơn, ít hơn hay bằng nhau",
                ],
              ],
            },
            text: "Ba bước so sánh — bé làm lần lượt\nBé đọc bảng này trước khi làm, và đọc lại sau khi làm xong.\nBỏ một bước là bài dễ sai.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Làm xong một bài, bé nên làm gì để chắc chắn kết quả đúng?",
            options: [
              "Kiểm lại một lần nữa theo điều cần nhớ",
              "Nộp bài luôn cho nhanh",
              "Đoán lại một lần nữa",
            ],
            answer: "Kiểm lại một lần nữa theo điều cần nhớ",
            mascotHint:
              "Kiểm lại một lần nữa rồi mới nộp bài — kiểm lại là thói quen của người học giỏi.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Số nào lớn hơn: 11 hay 6?",
            options: [1, 6, 10, 11],
            answer: 11,
            mascotHint: "Đếm từ 1: số 11 đếm đến sau số 6, nên 11 lớn hơn 6.",
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
            text: "Tìm chậu hoa thích hợp: 1 bông và 4 bông",
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
            text: "Điền số còn thiếu vào các toa tàu",
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
              answers: [5, 4, 5, 8, 9, 1],
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
            text: "Đếm trong tranh bến sông",
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
            text: "Cốc nào có nhiều hạt sen nhất?",
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
      title: "Bài 11: Luyện tập chung (tiếp theo)",
      type: "learn",
      description:
        "điền dấu, so sánh theo mẫu, đếm trong tranh cánh đồng, tách số 6 và 9",
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
            text: "So sánh rồi nói dấu vào ô trống",
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
          type: "concept",
          content: {
            badge: "Mẹo Nhớ",
            title: "So sánh hai số bằng cách đếm",
            explanation:
              "Ở mức này, cách chắc chắn nhất là ĐẾM: số nào đếm đến sau thì số đó lớn hơn.",
            points: [
              "Đếm từ 1: “1, 2, 3, 4, 5…” — số đếm đến sau thì lớn hơn. Ví dụ 5 đến sau 2 nên 5 lớn hơn 2.",
              "Đếm từ 1: số nào đếm đến sau thì số đó lớn hơn.",
              "Ba dấu cần nhớ: “>” đọc là lớn hơn, “<” đọc là bé hơn, “=” đọc là bằng nhau.",
              "Với hai số của bài này: 6 < 12, đọc là “6 bé hơn 12”.",
            ],
          },
        },
        {
          type: "quiz",
          content: {
            question: "Số nào lớn hơn: 12 hay 6?",
            options: [1, 6, 9, 12],
            answer: 12,
            mascotHint: "Đếm từ 1: số 12 đếm đến sau số 6, nên 12 lớn hơn 6.",
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
            text: "Đếm trong tranh cánh đồng",
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
            text: "Hàng nào có nhiều đồ chơi hơn?",
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
            text: "Đếm ở sân bay: 5 máy bay và 4 xe",
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
            text: "Tách số: 6 gồm 4 và mấy? 6 gồm 5 và mấy?",
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
