export const g2c4 = {
  id: "g2-c4",
  name: "Chủ đề 4: Phép cộng, phép trừ (có nhớ) trong phạm vi 100",
  description:
    "Cộng trừ có nhớ số có hai chữ số với số có một chữ số và với số có hai chữ số",
  icon: "🔢",
  color: "#ff8a65",
  totalLessons: 10,
  lessons: [
    {
      id: "g2-c4-l1",
      title: "Bài 1: Phép cộng (có nhớ) số có hai chữ số với số có một chữ số",
      type: "learn",
      description: "Đặt tính và cộng có nhớ dạng 27 + 5",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "27 + 5 thì tính thế nào nhỉ? Hàng đơn vị 7 + 5 vượt qua 10 rồi! 🤔",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Cộng có nhớ",
            explanation:
              "Khi cộng hàng đơn vị mà được từ 10 trở lên, ta viết chữ số hàng đơn vị và NHỚ 1 sang hàng chục.",
            rule: "27 + 5: 7 + 5 = 12, viết 2 nhớ 1. Hàng chục: 2 thêm 1 bằng 3. Kết quả 32.",
            points: [
              "Bước 1: cộng hàng đơn vị. Được 12 thì viết 2, nhớ 1.",
              "Bước 2: thêm 1 vào hàng chục.",
              "Đặt tính thẳng cột là điều kiện bắt buộc để không quên nhớ.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Đặt tính rồi tính: 27 + 5\nCộng từ hàng đơn vị: 7 + 5 = 12, viết 2 nhớ 1\nHàng chục: 2 thêm 1 bằng 3, viết 3\nVậy 27 + 5 = 32",
            operation: {
              left: 27,
              sign: "+",
              right: 5,
              result: 32,
            },
            placeValue: {
              headers: ["Chục", "Đơn vị"],
              digits: [2, 7],
            },
          },
        },
        {
          type: "visual",
          content: {
            baseTen: {
              tens: 2,
              ones: 7,
            },
            text: "Bước 1: 27 gồm 2 chục và 7 đơn vị\nBé đếm bằng khối: 2 thanh chục (mỗi thanh 10 ô) và 7 ô rời\nGiờ bé phải thêm 5 ô nữa.",
          },
        },
        {
          type: "visual",
          content: {
            baseTen: {
              tens: 1,
              ones: 2,
            },
            text: "Bước 2: 7 ô + 5 ô = 12 ô\n12 ô đổi được thành 1 thanh chục và 2 ô rời\nThanh chục mới này phải chuyển sang hàng chục — đó là “nhớ 1”.",
          },
        },
        {
          type: "visual",
          content: {
            numberLine: {
              from: 27,
              to: 32,
              step: 1,
              hops: [
                {
                  from: 27,
                  to: 30,
                  label: "+3",
                },
                {
                  from: 30,
                  to: 32,
                  label: "+2",
                },
              ],
            },
            text: "Bước 3: cách nhẩm nhanh — tách cho đủ một chục\nTách 5 thành 3 và 2 (vì 7 + 3 = 10)\n27 + 3 = 30\n30 + 2 = 32\nVậy 27 + 5 = 32.",
          },
        },
        {
          type: "visual",
          content: {
            cotTinh: {
              left: 27,
              right: 5,
              sign: "+",
              remember: true,
            },
            text: "Bước 4: đặt tính rồi tính — bé tự điền\nBé bấm ô “?” rồi chọn chữ số\nHàng đơn vị: 7 + 5 = 12, viết 2 nhớ 1\nHàng chục: 2 thêm 1 bằng 3, viết 3",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Chú Ý",
            title: "Ba lỗi hay gặp khi cộng có nhớ",
            explanation:
              "Nhiều bạn tính đúng hàng đơn vị nhưng quên bước nhớ 1. Bé xem ba lỗi dưới đây để tránh nhé.",
            points: [
              "Lỗi 1 — quên nhớ 1: 7 + 5 = 12 viết 2, nhưng hàng chục vẫn để 2 ⇒ ra 22 (sai). Phải là 2 + 1 = 3.",
              "Lỗi 2 — viết cả 12 vào hàng đơn vị: mỗi hàng chỉ giữ MỘT chữ số, nên chỉ viết 2, còn 1 nhớ sang trái.",
              "Lỗi 3 — đặt tính lệch cột: số 5 phải thẳng hàng với số 7, cùng hàng đơn vị.",
              "Cách tránh: vừa cộng xong hàng đơn vị thì viết ngay số 1 nhỏ trên đầu hàng chục.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            cotTinh: {
              left: 7,
              right: 5,
              sign: "+",
              remember: true,
            },
            text: "Bé tự đặt tính: 7 + 5\nhàng đơn vị 7 + 5 = 12, viết 2 nhớ 1\ncòn nhớ 1 ở hàng cao hơn, viết 1\nVậy 7 + 5 = 12.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "6 + 5 bằng bao nhiêu?",
            options: [1, 10, 11, 12],
            answer: 11,
            mascotHint: "hàng đơn vị 6 + 5 = 11, viết 1 nhớ 1. Kết quả 11.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "27 + 5 bằng bao nhiêu?",
            options: [22, 30, 32, 33],
            answer: 32,
            mascotHint: "7 + 5 = 12, viết 2 nhớ 1. 2 + 1 = 3. Kết quả 32.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Lớp 2A có 27 bạn, hôm nay có 5 bạn mới chuyển đến. Hỏi lớp 2A có tất cả bao nhiêu bạn?",
            options: [22, 30, 32, 33],
            answer: 32,
            mascotHint:
              "Làm phép cộng: 27 + 5 = 32 bạn. Nếu ra 22 là bé quên nhớ 1 rồi.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "48 + 4 bằng bao nhiêu?",
            options: [42, 43, 52, 512],
            answer: 52,
            mascotHint: "8 + 4 = 12 viết 2 nhớ 1; 4 thêm 1 bằng 5. Kết quả 52.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Cộng hàng đơn vị trước; được từ 10 trở lên thì viết chữ số hàng đơn vị và nhớ 1 sang hàng chục.",
              "Cách nhẩm nhanh: tách cho đủ một chục rồi cộng tiếp. 27 + 5: tách 5 = 3 + 2, được 27 + 3 = 30, rồi 30 + 2 = 32.",
              "Tự kiểm tra: 32 − 5 phải bằng 27. Đúng thì kết quả chắc chắn.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g2-c4-l2",
      title: "Bài 2: Luyện tập cộng có nhớ (hai chữ số với một chữ số)",
      type: "learn",
      description: "Luyện tập cộng có nhớ dạng 36 + 8, 45 + 9",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Nhớ 1 là bước dễ quên nhất đấy! Bé cùng Rô-bốt luyện cho chắc nhé 🔢",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Luyện Tập",
            title: "Chú ý bước nhớ 1",
            explanation:
              "Đa số lỗi sai ở dạng này là QUÊN nhớ 1. Bé đánh dấu nhớ bằng cách viết số 1 nhỏ trên hàng chục.",
            rule: "36 + 8: 6 + 8 = 14, viết 4 nhớ 1. Hàng chục: 3 + 1 = 4. Kết quả 44.",
            points: [
              "6 + 8 = 14 → viết 4, nhớ 1.",
              "3 chục thêm 1 chục nữa là 4 chục.",
              "45 + 9 = 36? Không! Phải là 45 + 9 = 54.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Đặt tính rồi tính: 36 + 8\nHàng đơn vị: 6 + 8 = 14, viết 4 nhớ 1\nHàng chục: 3 thêm 1 bằng 4, viết 4\nVậy 36 + 8 = 44; còn 45 + 9 = 54",
            operation: {
              left: 36,
              sign: "+",
              right: 8,
              result: 44,
            },
          },
        },
        {
          type: "visual",
          content: {
            cotTinh: {
              left: 36,
              right: 8,
              sign: "+",
              remember: true,
            },
            text: "Bé tự đặt tính: 36 + 8\nHàng đơn vị: 6 + 8 = 14, viết 4 nhớ 1\nHàng chục: 3 thêm 1 bằng 4, viết 4",
          },
        },
        {
          type: "visual",
          content: {
            numberLine: {
              from: 36,
              to: 44,
              step: 1,
              hops: [
                {
                  from: 36,
                  to: 40,
                  label: "+4",
                },
                {
                  from: 40,
                  to: 44,
                  label: "+4",
                },
              ],
            },
            text: "Cách nhẩm: tách cho đủ một chục trước\nTách 8 thành 4 và 4 (vì 6 + 4 = 10)\n36 + 4 = 40\n40 + 4 = 44\nVậy 36 + 8 = 44.",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Chú Ý",
            title: "Hai lỗi hay gặp ở dạng 36 + 8",
            explanation:
              "Dạng này sai chủ yếu vì quên nhớ 1 hoặc viết nhớ sai hàng.",
            points: [
              "Lỗi 1 — quên nhớ 1: được 4 ở hàng đơn vị nhưng hàng chục vẫn để 3 ⇒ ra 34 (sai).",
              "Lỗi 2 — viết nhớ xuống dưới: số nhớ 1 phải viết nhỏ ở TRÊN hàng chục, không viết vào hàng kết quả.",
              "Cách nhớ: 6 + 8 = 14, số 4 ở lại hàng đơn vị, số 1 “đi lên” hàng chục.",
            ],
          },
        },
        {
          type: "quiz",
          content: {
            question: "58 + 7 bằng bao nhiêu?",
            options: [55, 64, 65, 66],
            answer: 65,
            mascotHint: "8 + 7 = 15 viết 5 nhớ 1; 5 thêm 1 bằng 6. Kết quả 65.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "36 + 8 bằng bao nhiêu?",
            options: [34, 42, 44, 46],
            answer: 44,
            mascotHint: "6 + 8 = 14, viết 4 nhớ 1. 3 + 1 = 4. Kết quả 44.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "45 + 9 bằng bao nhiêu?",
            options: [44, 53, 54, 55],
            answer: 54,
            mascotHint: "5 + 9 = 14, viết 4 nhớ 1. 4 + 1 = 5. Kết quả 54.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Cộng hàng đơn vị trước; từ 10 trở lên thì nhớ 1 sang hàng chục.",
              "36 + 8 = 44; 45 + 9 = 54.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g2-c4-l3",
      title: "Bài 3: Phép cộng (có nhớ) số có hai chữ số với số có hai chữ số",
      type: "learn",
      description: "Đặt tính và cộng có nhớ dạng 38 + 25",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Giờ cả hai hàng đều có hai chữ số. Bé làm y như trước nhé! ✏️",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Cộng hai số có hai chữ số",
            explanation:
              "Vẫn tính từ hàng đơn vị sang hàng chục. Nếu hàng đơn vị được từ 10 trở lên thì nhớ 1 sang hàng chục.",
            rule: "38 + 25: 8 + 5 = 13, viết 3 nhớ 1. Hàng chục: 3 + 2 + 1 = 6. Kết quả 63.",
            points: [
              "Hàng đơn vị: 8 + 5 = 13, viết 3 nhớ 1.",
              "Hàng chục: 3 + 2 = 5, thêm 1 nhớ nữa là 6.",
              "Đừng quên cộng cả số nhớ vào hàng chục.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Đặt tính rồi tính: 38 + 25\nHàng đơn vị: 8 + 5 = 13, viết 3 nhớ 1\nHàng chục: 3 + 2 = 5, thêm 1 nhớ là 6, viết 6\nVậy 38 + 25 = 63",
            operation: {
              left: 38,
              sign: "+",
              right: 25,
              result: 63,
            },
            placeValue: {
              headers: ["Chục", "Đơn vị"],
              digits: [3, 8],
            },
          },
        },
        {
          type: "visual",
          content: {
            cotTinh: {
              left: 38,
              right: 25,
              sign: "+",
              remember: true,
            },
            text: "Bé tự đặt tính: 38 + 25\nHàng đơn vị: 8 + 5 = 13, viết 3 nhớ 1\nHàng chục: 3 + 2 = 5, thêm 1 nhớ là 6, viết 6\nChú ý: số nhớ 1 phải cộng vào hàng chục.",
          },
        },
        {
          type: "visual",
          content: {
            numberLine: {
              from: 38,
              to: 63,
              step: 1,
              hops: [
                {
                  from: 38,
                  to: 40,
                  label: "+2",
                },
                {
                  from: 40,
                  to: 63,
                  label: "+23",
                },
              ],
            },
            text: "Cách nhẩm: tách cho đủ một chục trước\nTách 25 thành 2 và 23 (vì 8 + 2 = 10)\n38 + 2 = 40\n40 + 23 = 63\nVậy 38 + 25 = 63.",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Chú Ý",
            title: "Vì sao ra 53 là sai?",
            explanation:
              "Ở dạng hai chữ số cộng hai chữ số, bé phải cộng số nhớ vào hàng chục sau khi đã cộng hai chữ số hàng chục với nhau.",
            points: [
              "Lỗi 1 — quên nhớ 1: 8 + 5 = 13 viết 3, rồi 3 + 2 = 5 ⇒ ra 53 (sai). Phải thêm 1: 3 + 2 + 1 = 6.",
              "Lỗi 2 — quên cộng hai chữ số hàng chục, chỉ tính số nhớ ⇒ ra 13 (sai).",
              "Lỗi 3 — viết cả 13 vào hàng đơn vị ⇒ ra 613 (sai). Hàng đơn vị chỉ giữ một chữ số.",
              "Cách tránh: cộng hàng chục theo đúng thứ tự 3 + 2 = 5, rồi thêm 1 nhớ được 6.",
            ],
          },
        },
        {
          type: "quiz",
          content: {
            question: "47 + 39 bằng bao nhiêu?",
            options: [76, 85, 86, 87],
            answer: 86,
            mascotHint: "7 + 9 = 16 viết 6 nhớ 1; 4 + 3 + 1 = 8. Kết quả 86.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "38 + 25 bằng bao nhiêu?",
            options: [53, 60, 63, 613],
            answer: 63,
            mascotHint: "8 + 5 = 13 viết 3 nhớ 1; 3 + 2 + 1 = 6. Kết quả 63.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "47 + 18 bằng bao nhiêu?",
            options: [55, 59, 65, 66],
            answer: 65,
            mascotHint: "7 + 8 = 15 viết 5 nhớ 1; 4 + 1 + 1 = 6. Kết quả 65.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Cộng hai số có hai chữ số: nhớ 1 khi hàng đơn vị vượt 10.",
              "38 + 25 = 63; 47 + 18 = 65.",
            ],
            mascotMood: "celebrate",
          },
        },
      ],
    },
    {
      id: "g2-c4-l4",
      title: "Bài 4: Luyện tập cộng có nhớ (hai chữ số với hai chữ số)",
      type: "learn",
      description: "Luyện tập cộng có nhớ và giải bài toán có lời văn",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Cửa hàng có 28 hộp sữa, nhập thêm 17 hộp. Có tất cả bao nhiêu hộp nhỉ? 🥛",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Luyện Tập",
            title: "Cộng có nhớ trong bài toán",
            explanation:
              "Bài toán 'có ... thêm ...' thì dùng phép cộng. Bé đặt tính rồi tính có nhớ như đã học.",
            rule: "28 + 17: 8 + 7 = 15 viết 5 nhớ 1; 2 + 1 + 1 = 4. Kết quả 45.",
            points: [
              "28 + 17 = 45 (hộp sữa).",
              "Nhớ ghi đơn vị trong đáp số.",
              "Thử lại: 45 − 17 = 28, đúng thì kết quả chính xác.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Có 28 hộp sữa, nhập thêm 17 hộp\nSơ đồ: 28 + 17 = 45 (hộp sữa)\nBé đặt tính: 8 + 7 = 15 viết 5 nhớ 1; 2 + 1 + 1 = 4",
            operation: {
              left: 28,
              sign: "+",
              right: 17,
              result: 45,
            },
            barModel: {
              rows: [
                {
                  label: "Đã có",
                  parts: 28,
                },
                {
                  label: "Thêm vào",
                  parts: 17,
                },
              ],
              braceLabel: "45 hộp sữa",
            },
          },
        },
        {
          type: "visual",
          content: {
            cotTinh: {
              left: 28,
              right: 17,
              sign: "+",
              remember: true,
            },
            text: "Bé tự đặt tính: 28 + 17\nHàng đơn vị: 8 + 7 = 15, viết 5 nhớ 1\nHàng chục: 2 + 1 = 3, thêm 1 nhớ là 4, viết 4\nVậy 28 + 17 = 45 (hộp sữa)",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Chú Ý",
            title: "Sai ở đâu khi ra 35?",
            explanation:
              "35 là kết quả khi bé quên số nhớ 1. Đây là lỗi hay gặp nhất của bài toán “có ... thêm ...”.",
            points: [
              "Quên nhớ 1: 8 + 7 = 15 viết 5, rồi 2 + 1 = 3 ⇒ ra 35 (sai). Phải thêm 1: 2 + 1 + 1 = 4.",
              "Trừ nhầm: 28 + 17 không phải là 28 − 17 = 11. Đề bài “nhập thêm” thì phải cộng.",
              "Quên ghi đơn vị: đáp số của bài toán có lời văn phải kèm “hộp sữa”.",
            ],
          },
        },
        {
          type: "quiz",
          content: {
            question: "46 + 38 bằng bao nhiêu?",
            options: [74, 83, 84, 85],
            answer: 84,
            mascotHint: "6 + 8 = 14 viết 4 nhớ 1; 4 + 3 + 1 = 8. Kết quả 84.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Cửa hàng có 28 hộp sữa, nhập thêm 17 hộp. Hỏi có tất cả bao nhiêu hộp sữa?",
            options: [35, 45, 46, 11],
            answer: 45,
            mascotHint: "28 + 17 = 45 hộp sữa.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Cộng có nhớ: nhớ 1 sang hàng chục.",
              "28 + 17 = 45. Thử lại bằng phép trừ.",
            ],
            mascotMood: "celebrate",
          },
        },
      ],
    },
    {
      id: "g2-c4-l5",
      title: "Bài 5: Luyện tập chung phép cộng có nhớ",
      type: "learn",
      description: "Ôn tập các dạng cộng có nhớ trong phạm vi 100",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Rô-bốt đố bé ba câu cộng có nhớ. Bé thử sức nhé! 🎯",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Luyện Tập Chung",
            title: "Hai dạng cộng có nhớ",
            explanation:
              "Bé đã học cộng số có hai chữ số với số có một chữ số và với số có hai chữ số. Cả hai đều nhớ 1 khi hàng đơn vị vượt 10.",
            points: [
              "56 + 7 = 63 (6 + 7 = 13, nhớ 1).",
              "56 + 27 = 83 (6 + 7 = 13, nhớ 1; 5 + 2 + 1 = 8).",
              "Muốn kiểm tra, bé lấy kết quả trừ đi một số hạng.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Hai dạng cộng có nhớ, cùng một cách làm\n56 + 7 = 63 (6 + 7 = 13 viết 3 nhớ 1; 5 thêm 1 bằng 6)\n56 + 27 = 83 (6 + 7 = 13 viết 3 nhớ 1; 5 + 2 + 1 = 8)",
            operation: {
              left: 56,
              sign: "+",
              right: 27,
              result: 83,
            },
            table: {
              headers: ["Phép tính", "Kết quả"],
              rows: [
                ["56 + 7", "63"],
                ["56 + 27", "83"],
              ],
              label: "Luyện tập chung phép cộng có nhớ",
            },
          },
        },
        {
          type: "visual",
          content: {
            cotTinh: {
              left: 56,
              right: 27,
              sign: "+",
              remember: true,
            },
            text: "Bé tự đặt tính: 56 + 27\nHàng đơn vị: 6 + 7 = 13, viết 3 nhớ 1\nHàng chục: 5 + 2 = 7, thêm 1 nhớ là 8, viết 8",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Chú Ý",
            title: "Hai dạng dễ lẫn nhau",
            explanation:
              "56 + 7 thì thêm 1 vào hàng chục (5 + 1 = 6). Còn 56 + 27 thì phải cộng nhớ theo thứ tự 5 + 2 + 1. Bé ghi nhớ số nhớ ngay khi vừa cộng hàng đơn vị.",
            points: [
              "Dạng 27 + 8: cộng nhớ vào chục của số lớn ⇒ 20 + 10 = 30, rồi 7 + 8 = 15 ⇒ 35.",
              "Dạng 27 + 18: cộng đủ ba số ở hàng chục: 2 + 1 + 1 = 4.",
              "Mẹo kiểm tra: kết quả cộng luôn LỚN HƠN mỗi số hạng. Ra nhỏ hơn là sai ngay.",
              "Mẹo nhẩm nhanh: tách số để tròn chục. 56 + 27 ⇒ 56 + 4 = 60, 60 + 23 = 83.",
            ],
          },
        },
        {
          type: "quiz",
          content: {
            question: "68 + 24 bằng bao nhiêu?",
            options: [82, 91, 92, 93],
            answer: 92,
            mascotHint: "8 + 4 = 12 viết 2 nhớ 1; 6 + 2 + 1 = 9. Kết quả 92.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "56 + 27 bằng bao nhiêu?",
            options: [73, 82, 83, 84],
            answer: 83,
            mascotHint: "6 + 7 = 13 viết 3 nhớ 1; 5 + 2 + 1 = 8. Kết quả 83.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "19 + 19 bằng bao nhiêu?",
            options: [28, 38, 39, 219],
            answer: 38,
            mascotHint: "9 + 9 = 18 viết 8 nhớ 1; 1 + 1 + 1 = 3. Kết quả 38.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Cả hai hàng đều có thể phải nhớ khi cộng hai số có hai chữ số.",
              "56 + 27 = 83; 19 + 19 = 38.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g2-c4-l6",
      title: "Bài 6: Phép trừ (có nhớ) số có hai chữ số cho số có một chữ số",
      type: "learn",
      description: "Đặt tính và trừ có mượn dạng 32 − 7",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "32 − 7 thì 2 không trừ được 7. Bé phải làm sao nhỉ? 🤔",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Mượn 1 chục",
            explanation:
              "Khi chữ số hàng đơn vị của số bị trừ bé hơn số trừ, ta MƯỢN 1 chục từ hàng chục để trừ.",
            rule: "32 − 7: 2 không trừ được 7, mượn 1 chục thành 12. 12 − 7 = 5, viết 5. Hàng chục: 3 bớt 1 còn 2. Kết quả 25.",
            points: [
              "Mượn 1 chục thì hàng chục giảm đi 1.",
              "Sau khi mượn: 12 − 7 = 5.",
              "Đây chính là phép trừ qua 10 mà bé đã học, chỉ khác là có hai chữ số.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Đặt tính rồi tính: 32 − 7\nHàng đơn vị: 2 không trừ được 7, mượn 1 chục thành 12\n12 − 7 = 5, viết 5\nHàng chục: 3 bớt 1 còn 2, viết 2 ⇒ 32 − 7 = 25",
            operation: {
              left: 32,
              sign: "−",
              right: 7,
              result: 25,
            },
            placeValue: {
              headers: ["Chục", "Đơn vị"],
              digits: [3, 2],
            },
          },
        },
        {
          type: "visual",
          content: {
            numberLine: {
              from: 7,
              to: 32,
              step: 1,
              hops: [
                {
                  from: 7,
                  to: 10,
                  label: "+3",
                },
                {
                  from: 10,
                  to: 30,
                  label: "+20",
                },
                {
                  from: 30,
                  to: 32,
                  label: "+2",
                },
              ],
            },
            text: "Cách 2: đếm thêm từ số bé để tìm hiệu\n7 + 3 = 10, 10 + 20 = 30, 30 + 2 = 32\nVậy phần thêm vào là 3 + 20 + 2 = 25\nNên 32 − 7 = 25.",
          },
        },
        {
          type: "visual",
          content: {
            cotTinh: {
              left: 32,
              right: 7,
              sign: "−",
            },
            text: "Bé tự đặt tính: 32 − 7\nHàng đơn vị: mượn 1 chục ⇒ 12 − 7 = 5, viết 5\nHàng chục: 3 bớt 1 còn 2, viết 2",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Chú Ý",
            title: "Vì sao ra 35 là sai?",
            explanation:
              "Khi mượn 1 chục thì hàng chục phải GIẢM đi 1. Quên bước này là lỗi phổ biến nhất của phép trừ có nhớ.",
            points: [
              "Quên bớt 1 ở hàng chục: 12 − 7 = 5, rồi 3 − 0 = 3 ⇒ ra 35 (sai). Phải là 3 − 1 = 2.",
              "Lấy số bé trừ số lớn: 7 − 2 = 5 ⇒ sai bản chất. Hàng đơn vị phải mượn rồi mới trừ.",
              "Mẹo nhớ: “mượn 1 chục thì trả 1 chục” — viết dấu gạch nhỏ trên chữ số hàng chục để không quên.",
              "Tự kiểm tra: 25 + 7 phải bằng 32.",
            ],
          },
        },
        {
          type: "quiz",
          content: {
            question: "54 − 9 bằng bao nhiêu?",
            options: [43, 45, 46, 55],
            answer: 45,
            mascotHint:
              "Mượn 1 chục: 14 − 9 = 5, viết 5; 5 bớt 1 còn 4. Kết quả 45.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "32 − 7 bằng bao nhiêu?",
            options: [24, 25, 26, 35],
            answer: 25,
            mascotHint: "Mượn 1 chục: 12 − 7 = 5; 3 bớt 1 còn 2. Kết quả 25.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "43 − 6 bằng bao nhiêu?",
            options: [36, 37, 38, 47],
            answer: 37,
            mascotHint: "13 − 6 = 7; 4 bớt 1 còn 3. Kết quả 37.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Khi chữ số hàng đơn vị không trừ được thì mượn 1 chục.",
              "32 − 7 = 25; 43 − 6 = 37.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g2-c4-l7",
      title: "Bài 7: Luyện tập trừ có nhớ (hai chữ số cho một chữ số)",
      type: "learn",
      description: "Luyện tập trừ có nhớ và giải bài toán có lời văn",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Trên cây có 51 quả cam, hái xuống 15 quả. Còn lại bao nhiêu quả nhỉ? 🍊",
            items: [
              {
                emoji: "🍊",
                label: "Quả cam",
                count: 1,
              },
            ],
          },
        },
        {
          type: "concept",
          content: {
            badge: "Luyện Tập",
            title: "Trừ có nhớ và bài toán bớt đi",
            explanation:
              "Bài toán 'bớt đi, cho đi, hái xuống' thì dùng phép trừ. Chú ý mượn 1 chục khi cần.",
            rule: "51 − 15: 1 không trừ được 5, mượn 1 chục: 11 − 5 = 6. Hàng chục: 5 bớt 1 còn 4, 4 − 1 = 3. Kết quả 36.",
            points: [
              "51 − 15 = 36 (quả cam).",
              "Đừng quên bớt 1 ở hàng chục sau khi mượn.",
              "Thử lại: 36 + 15 = 51, đúng thì kết quả chính xác.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Đặt tính rồi tính: 51 − 15\nHàng đơn vị: 1 không trừ được 5, mượn 1 chục thành 11\n11 − 5 = 6, viết 6\nHàng chục: 5 bớt 1 còn 4, rồi 4 − 1 = 3, viết 3 ⇒ 36",
            operation: {
              left: 51,
              sign: "−",
              right: 15,
              result: 36,
            },
          },
        },
        {
          type: "visual",
          content: {
            numberLine: {
              from: 15,
              to: 51,
              step: 1,
              hops: [
                {
                  from: 15,
                  to: 20,
                  label: "+5",
                },
                {
                  from: 20,
                  to: 50,
                  label: "+30",
                },
                {
                  from: 50,
                  to: 51,
                  label: "+1",
                },
              ],
            },
            text: "Cách 2: đếm thêm từ 15 lên 51\n15 + 5 = 20, 20 + 30 = 50, 50 + 1 = 51\nVậy 51 − 15 = 5 + 30 + 1 = 36.",
          },
        },
        {
          type: "visual",
          content: {
            cotTinh: {
              left: 51,
              right: 15,
              sign: "−",
            },
            text: "Bé tự đặt tính: 51 − 15\nHàng đơn vị: mượn 1 chục ⇒ 11 − 5 = 6, viết 6\nHàng chục: 5 bớt 1 còn 4, rồi 4 − 1 = 3, viết 3",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Chú Ý",
            title: "Vì sao ra 46 là sai?",
            explanation:
              "46 chính là kết quả khi bé quên bớt 1 ở hàng chục sau khi đã mượn.",
            points: [
              "Quên bớt 1: 11 − 5 = 6 đúng, nhưng 5 − 1 = 4 ⇒ ra 46 (sai). Phải bớt: 5 − 1 = 4 rồi mới 4 − 1 = 3.",
              "Đổi vị trí hai số: 51 − 15 khác 15 − 51. Số bị trừ luôn viết trên.",
              "Trong bài toán có lời văn: “hái xuống, bớt đi, cho đi” là phép trừ; đáp số phải kèm đơn vị.",
              "Tự kiểm tra: 36 + 15 phải bằng 51.",
            ],
          },
        },
        {
          type: "quiz",
          content: {
            question: "63 − 27 bằng bao nhiêu?",
            options: [16, 36, 44, 46],
            answer: 36,
            mascotHint: "13 − 7 = 6; 6 bớt 1 còn 5, rồi 5 − 2 = 3. Kết quả 36.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Trên cây có 51 quả cam, hái xuống 15 quả. Hỏi còn lại bao nhiêu quả cam?",
            options: [36, 46, 66, 35],
            answer: 36,
            mascotHint: "51 − 15 = 36 quả cam.",
            items: [
              {
                emoji: "🍊",
                label: "Quả cam",
                count: 1,
              },
            ],
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Bài toán 'bớt đi, cho đi, hái xuống' thì dùng phép trừ.",
              "Nhớ bớt 1 ở hàng chục sau khi mượn: 51 − 15 = 36.",
            ],
            mascotMood: "celebrate",
          },
        },
      ],
    },
    {
      id: "g2-c4-l8",
      title: "Bài 8: Phép trừ (có nhớ) số có hai chữ số cho số có hai chữ số",
      type: "learn",
      description: "Đặt tính và trừ có mượn dạng 52 − 27",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "52 − 27 thì cả hàng đơn vị lẫn hàng chục đều phải mượn. Bé cẩn thận nhé! ✏️",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Trừ hai số có hai chữ số",
            explanation:
              "Vẫn làm từ hàng đơn vị. Nếu cần thì mượn 1 chục, rồi trừ hàng chục.",
            rule: "52 − 27: 2 không trừ được 7, mượn 1 chục: 12 − 7 = 5. Hàng chục: 5 bớt 1 còn 4, 4 − 2 = 2. Kết quả 25.",
            points: [
              "Hàng đơn vị: 12 − 7 = 5.",
              "Hàng chục: 5 − 1 = 4 rồi 4 − 2 = 2.",
              "Thử lại: 25 + 27 = 52.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "Đặt tính rồi tính: 52 − 27\nHàng đơn vị: 2 không trừ được 7, mượn 1 chục: 12 − 7 = 5, viết 5\nHàng chục: 5 bớt 1 còn 4, rồi 4 − 2 = 2, viết 2 ⇒ 52 − 27 = 25",
            operation: {
              left: 52,
              sign: "−",
              right: 27,
              result: 25,
            },
          },
        },
        {
          type: "visual",
          content: {
            numberLine: {
              from: 27,
              to: 52,
              step: 1,
              hops: [
                {
                  from: 27,
                  to: 30,
                  label: "+3",
                },
                {
                  from: 30,
                  to: 52,
                  label: "+22",
                },
              ],
            },
            text: "Cách 2: đếm thêm từ 27 lên 52\n27 + 3 = 30, 30 + 22 = 52\nVậy 52 − 27 = 3 + 22 = 25.",
          },
        },
        {
          type: "visual",
          content: {
            cotTinh: {
              left: 52,
              right: 27,
              sign: "−",
            },
            text: "Bé tự đặt tính: 52 − 27\nHàng đơn vị: mượn 1 chục ⇒ 12 − 7 = 5, viết 5\nHàng chục: 5 bớt 1 còn 4, rồi 4 − 2 = 2, viết 2",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Chú Ý",
            title: "Hai hàng đều phải cẩn thận",
            explanation:
              "Ở dạng hai chữ số trừ hai chữ số, hàng đơn vị mượn bao nhiêu thì hàng chục phải trả bấy nhiêu. Bé làm lần lượt từng hàng, đừng nhảy bước.",
            points: [
              "Quên trả 1 ở hàng chục: 12 − 7 = 5, rồi 5 − 2 = 3 ⇒ ra 35 (sai). Kết quả đúng là 5 bớt 1 còn 4, 4 − 2 = 2.",
              "Chỉ trừ hàng đơn vị mà quên hàng chục ⇒ ra 5 hoặc 25 tuỳ cách viết (sai).",
              "Thứ tự bắt buộc: hàng đơn vị trước, hàng chục sau.",
              "Tự kiểm tra: 25 + 27 = 52.",
            ],
          },
        },
        {
          type: "quiz",
          content: {
            question: "81 − 46 bằng bao nhiêu?",
            options: [35, 43, 45, 47],
            answer: 35,
            mascotHint: "11 − 6 = 5; 8 bớt 1 còn 7, rồi 7 − 4 = 3. Kết quả 35.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "52 − 27 bằng bao nhiêu?",
            options: [25, 35, 39, 79],
            answer: 25,
            mascotHint: "12 − 7 = 5; 4 − 2 = 2. Kết quả 25.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "63 − 45 bằng bao nhiêu?",
            options: [18, 22, 28, 108],
            answer: 18,
            mascotHint: "13 − 5 = 8; 6 bớt 1 còn 5, 5 − 4 = 1. Kết quả 18.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Trừ hai số có hai chữ số: mượn 1 chục khi cần, rồi bớt 1 ở hàng chục.",
              "52 − 27 = 25; 63 − 45 = 18.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g2-c4-l9",
      title: "Bài 9: Luyện tập chung phép trừ có nhớ",
      type: "learn",
      description: "Ôn tập các dạng trừ có nhớ trong phạm vi 100",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Cùng Rô-bốt kiểm tra lại nào: khi nào cần mượn, khi nào không? 🎯",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Luyện Tập Chung",
            title: "Có mượn hay không?",
            explanation:
              "So hàng đơn vị: nếu chữ số của số bị trừ BÉ HƠN chữ số của số trừ thì phải mượn. Bằng hoặc lớn hơn thì trừ thẳng.",
            points: [
              "46 − 3 = 43: 6 > 3 nên không cần mượn.",
              "43 − 6 = 37: 3 < 6 nên phải mượn.",
              "74 − 28 = 46: 4 < 8 nên phải mượn.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "46 −  3 = 43   (không mượn)\n43 −  6 = 37   (có mượn)\n74 − 28 = 46   (có mượn)",
            operation: {
              left: 74,
              sign: "−",
              right: 28,
              result: 46,
            },
            table: {
              headers: ["Phép tính", "Có mượn không?"],
              rows: [
                ["46 − 3", "không mượn"],
                ["43 − 6", "có mượn"],
                ["74 − 28", "có mượn"],
              ],
              label: "Luyện tập chung phép trừ có nhớ",
            },
          },
        },
        {
          type: "visual",
          content: {
            cotTinh: {
              left: 74,
              right: 28,
              sign: "−",
            },
            text: "Bé tự đặt tính: 74 − 28\nHàng đơn vị: 4 không trừ được 8, mượn 1 chục ⇒ 14 − 8 = 6, viết 6\nHàng chục: 7 bớt 1 còn 6, rồi 6 − 2 = 4, viết 4",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Chú Ý",
            title: "Trường hợp dễ sai nhất",
            explanation:
              "Nhiều bạn thấy 6 − 2 = 4 là viết luôn, mà quên rằng hàng chục vừa cho mượn 1 chục nên phải trừ thêm 1.",
            points: [
              "4 không trừ được 8 ⇒ phải mượn. Mượn rồi thì 14 − 8 = 6.",
              "Hàng chục: 7 bớt 1 còn 6, rồi mới 6 − 2 = 4. Quên bớt 1 thì ra 46 (sai).",
              "Hai chữ số hàng đơn vị bằng nhau thì KHÔNG mượn: 46 − 6 = 40, 4 − 0 = 4.",
              "Tự kiểm tra: lấy hiệu cộng số trừ phải được số bị trừ. 46 + 28 = 74.",
            ],
          },
        },
        {
          type: "quiz",
          content: {
            question: "Phép trừ nào dưới đây PHẢI mượn 1 chục?",
            options: ["56 − 2", "62 − 8", "85 − 3", "97 − 4"],
            answer: "62 − 8",
            mascotHint:
              "2 < 8 nên phải mượn 1 chục: 12 − 8 = 4; 6 bớt 1 còn 5, 5 − 0 = 5 ⇒ 54.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Phép trừ nào dưới đây KHÔNG cần mượn?",
            options: ["46 − 3", "43 − 6", "52 − 27", "74 − 28"],
            answer: "46 − 3",
            mascotHint: "6 > 3 nên trừ thẳng được: 46 − 3 = 43.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "74 − 28 bằng bao nhiêu?",
            options: [44, 46, 54, 56],
            answer: 46,
            mascotHint: "14 − 8 = 6; 7 bớt 1 còn 6, 6 − 2 = 4. Kết quả 46.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "So hàng đơn vị để biết có phải mượn hay không.",
              "43 − 6 = 37 (phải mượn); 46 − 3 = 43 (không mượn).",
            ],
            mascotMood: "celebrate",
          },
        },
      ],
    },
    {
      id: "g2-c4-l10",
      title: "Bài 10: Ôn tập chung chủ đề 4",
      type: "learn",
      description:
        "Ôn tập cộng trừ có nhớ trong phạm vi 100, kèm bài toán có lời văn",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Bé đã tính được cộng trừ có nhớ rồi! Mình tổng kết lại nhé 🎉",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Ôn Tập",
            title: "Tổng kết chủ đề 4",
            explanation:
              "Cộng có nhớ thì NHỚ 1 sang hàng chục. Trừ có nhớ thì MƯỢN 1 chục từ hàng chục.",
            points: [
              "Cộng: 27 + 5 = 32 (nhớ 1).",
              "Trừ: 32 − 7 = 25 (mượn 1 chục).",
              "Cộng và trừ là hai phép tính ngược nhau, nên bé luôn thử lại được.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            text: "27 + 5 = 32\n32 − 5 = 27\n32 − 27 = 5",
            operation: {
              left: 27,
              sign: "+",
              right: 5,
              result: 32,
            },
            table: {
              headers: ["Phép tính", "Kết quả"],
              rows: [
                ["27 + 5", "32"],
                ["32 − 5", "27"],
                ["32 − 27", "5"],
              ],
              label: "Ôn tập chung chủ đề 4",
            },
          },
        },
        {
          type: "visual",
          content: {
            cotTinh: {
              left: 46,
              right: 8,
              sign: "+",
              remember: true,
            },
            text: "Ôn phép cộng: 46 + 8\nHàng đơn vị: 6 + 8 = 14, viết 4 nhớ 1\nHàng chục: 4 thêm 1 bằng 5, viết 5",
          },
        },
        {
          type: "visual",
          content: {
            cotTinh: {
              left: 63,
              right: 28,
              sign: "−",
            },
            text: "Ôn phép trừ: 63 − 28\nHàng đơn vị: mượn 1 chục ⇒ 13 − 8 = 5, viết 5\nHàng chục: 6 bớt 1 còn 5, rồi 5 − 2 = 3, viết 3",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Mẹo Hay",
            title: "Hai cách tự kiểm tra kết quả",
            explanation:
              "Tự kiểm tra là thói quen của người tính giỏi. Bé chỉ cần nhớ hai cách sau, không tốn thời gian.",
            points: [
              "Cách 1 — làm phép ngược: cộng thì lấy kết quả trừ đi một số hạng, phải được số hạng còn lại. 27 + 5 = 32 ⇒ 32 − 5 = 27.",
              "Cách 2 — ước lượng: 27 gần 30, 30 + 5 = 35 ⇒ kết quả phải quanh quẩn 32, không thể là 22 hay 320.",
              "Kết quả phép cộng luôn LỚN HƠN mỗi số hạng; kết quả phép trừ luôn BÉ HƠN số bị trừ.",
              "Với bài toán có lời văn, bé kiểm tra thêm một lần: đáp số có hợp với câu hỏi không, có đủ đơn vị không.",
            ],
          },
        },
        {
          type: "visual",
          content: {
            cotTinh: {
              left: 27,
              right: 5,
              sign: "+",
              remember: true,
            },
            text: "Bé tự đặt tính: 27 + 5\nhàng đơn vị 7 + 5 = 12, viết 2 nhớ 1\nhàng chục 2 + 0 + 1 (nhớ) = 3, viết 3\nVậy 27 + 5 = 32.",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Chú Ý",
            title: "Vì sao ra 22 là sai?",
            explanation:
              "22 là kết quả khi bé quên nhớ 1 ở hàng chục. Đây là lỗi hay gặp nhất của dạng cộng này.",
            points: [
              "Lỗi — quên nhớ 1 ở hàng chục: hàng đơn vị 7 + 5 = 12, viết 2 nhớ 1. Kết quả đúng phải là 32.",
              "Cách tránh: làm xong một hàng thì ghi/xoá số nhớ NGAY, đừng để sang hàng sau mới nhớ.",
              "Tự kiểm tra: 32 − 27 phải bằng 5.",
            ],
          },
        },
        {
          type: "quiz",
          content: {
            question: "53 + 8 bằng bao nhiêu?",
            options: [51, 60, 61, 62],
            answer: 61,
            mascotHint: "hàng đơn vị 3 + 8 = 11, viết 1 nhớ 1. Kết quả 61.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "47 + 8 bằng bao nhiêu?",
            options: [45, 54, 55, 56],
            answer: 55,
            mascotHint: "7 + 8 = 15 viết 5 nhớ 1; 4 thêm 1 bằng 5. Kết quả 55.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Một cửa hàng buổi sáng bán 35 chiếc bút, buổi chiều bán 18 chiếc. Hỏi cả ngày bán được bao nhiêu chiếc bút?",
            options: [43, 45, 53, 17],
            answer: 53,
            mascotHint: "35 + 18 = 53 chiếc bút (5 + 8 = 13 viết 3 nhớ 1).",
          },
        },
        {
          type: "summary",
          content: {
            title: "Bé nhớ rất tốt:",
            points: [
              "Cộng có nhớ: nhớ 1. Trừ có nhớ: mượn 1 chục.",
              "Bé đã hoàn thành chủ đề 4.",
            ],
            mascotMood: "celebrate",
          },
        },
      ],
    },
  ],
};
