export const g5c10 = {
  id: "g5-c10",
  name: "Chủ đề 10: Số đo thời gian, vận tốc. Các bài toán liên quan đến chuyển động đều",
  description:
    "Các đơn vị đo thời gian; cộng, trừ, nhân, chia số đo thời gian; vận tốc, quãng đường, thời gian của chuyển động đều",
  icon: "🚗",
  color: "#ea580c",
  totalLessons: 7,
  lessons: [
    {
      id: "g5-c10-l1",
      title: "Bài 56: Các đơn vị đo thời gian",
      type: "learn",
      description: "Ôn tập quan hệ giữa các đơn vị đo thời gian",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Một năm có 12 tháng, một ngày có 24 giờ, một giờ có 60 phút. Cùng ôn lại bảng đơn vị đo thời gian nhé! ⏰",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Các đơn vị đo thời gian",
            explanation:
              "Các đơn vị đo thời gian theo thứ tự từ lớn đến bé: thế kỉ, năm, tháng, tuần, ngày, giờ, phút, giây. Mỗi đơn vị có quan hệ riêng với đơn vị liền kề, không theo quy luật 10 hay 100.",
            points: [
              "1 thế kỉ = 100 năm; 1 năm = 12 tháng.",
              "1 tuần = 7 ngày; 1 ngày = 24 giờ.",
              "1 giờ = 60 phút; 1 phút = 60 giây.",
            ],
            rule: "Cần học thuộc quan hệ giữa các đơn vị đo thời gian.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Bảng đơn vị đo thời gian",
            table: {
              headers: ["Đơn vị lớn", "Bằng", "Đơn vị bé"],
              rows: [
                ["1 thế kỉ", 100, "năm"],
                ["1 năm", 12, "tháng"],
                ["1 ngày", 24, "giờ"],
                ["1 giờ", 60, "phút"],
                ["1 phút", 60, "giây"],
              ],
              label: "1 tháng có 30 hoặc 31 ngày; tháng 2 có 28 hoặc 29 ngày",
            },
          },
        },
        {
          type: "visual",
          content: {
            table: {
              headers: ["Đơn vị", "Bằng bao nhiêu đơn vị liền sau"],
              rows: [
                ["1 giờ", "60 phút"],
                ["1 phút", "60 giây"]
              ]
            },
            text: "Bậc thang đơn vị đo thời gian\n· giờ\n· phút\n· giây\nĐi XUỐNG một bậc thì nhân hệ số của bậc đó; đi LÊN một bậc thì chia."
          }
        },
        {
          type: "concept",
          content: {
            badge: "Mẹo Nhớ",
            title: "Cách đổi đơn vị đo thời gian",
            explanation: "Bé chỉ cần nhớ đúng BẬC THANG đơn vị rồi nhân hoặc chia theo hệ số của từng bậc.",
            points: [
              "1 giờ = 60 phút.",
              "Đi xuống hai bậc thì nhân hai lần: 1 giờ = 60 × 60 = 3600 giây.",
              "Đổi số lớn ra số bé: NHÂN. Ví dụ 2 giờ = 120 phút.",
              "Đổi số bé ra số lớn: CHIA. Ví dụ 180 phút = 3 giờ."
            ]
          }
        },
        {
          type: "quiz",
          content: {
            question: "1 giờ bằng bao nhiêu phút?",
            options: [6, 60, 600, 3600],
            answer: 60,
            mascotHint: "Hai đơn vị liền nhau: 1 giờ = 60 phút."
          }
        },
        {
          type: "quiz",
          content: {
            question: "3 giờ bằng bao nhiêu phút?",
            options: [60, 180, 240, 1800],
            answer: 180,
            mascotHint: "Đổi số lớn ra số bé thì nhân: 3 × 60 = 180."
          }
        },
        {
          type: "quiz",
          content: {
            question: "1 giờ bằng bao nhiêu giây?",
            options: ["3 600 giây", "60 giây", "600 giây", "360 giây"],
            answer: "3 600 giây",
            mascotHint: "1 giờ = 60 phút = 60 × 60 = 3 600 giây.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "5 thế kỉ bằng bao nhiêu năm?",
            options: ["500 năm", "50 năm", "5 000 năm", "150 năm"],
            answer: "500 năm",
            mascotHint: "1 thế kỉ = 100 năm nên 5 thế kỉ = 500 năm.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "1 giờ = 60 phút = 3 600 giây.",
              "1 ngày = 24 giờ; 1 tuần = 7 ngày.",
              "1 thế kỉ = 100 năm; 1 năm = 12 tháng.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g5-c10-l2",
      title: "Bài 57: Cộng, trừ số đo thời gian",
      type: "learn",
      description: "Cộng, trừ số đo thời gian có hai đơn vị",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "thinking",
            text: "Buổi sáng học 3 giờ 15 phút, buổi chiều học 2 giờ 35 phút. Cả ngày học bao lâu nhỉ? ⏳",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Cộng, trừ số đo thời gian",
            explanation:
              "Muốn cộng (trừ) số đo thời gian, ta đặt tính sao cho các đơn vị cùng loại thẳng cột với nhau, rồi cộng (trừ) từng cột như số tự nhiên. Nếu số đo ở cột bé nhiều hơn hoặc bằng đơn vị liền kề thì đổi sang đơn vị lớn hơn; khi trừ mà số đo bé hơn thì phải đổi một đơn vị lớn thành 60 đơn vị bé.",
            points: [
              "3 giờ 15 phút + 2 giờ 35 phút = 5 giờ 50 phút.",
              "2 giờ 20 phút + 1 giờ 45 phút = 4 giờ 5 phút (vì 20 + 45 = 65 phút = 1 giờ 5 phút).",
              "4 giờ 20 phút − 1 giờ 35 phút = 2 giờ 45 phút.",
            ],
            rule: "60 phút = 1 giờ; 60 giây = 1 phút.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Cộng, trừ số đo thời gian",
            table: {
              headers: ["Phép tính", "Cách làm", "Kết quả"],
              rows: [
                [
                  "3 giờ 15 phút + 2 giờ 35 phút",
                  "cộng từng cột",
                  "5 giờ 50 phút",
                ],
                [
                  "2 giờ 20 phút + 1 giờ 45 phút",
                  "65 phút = 1 giờ 5 phút",
                  "4 giờ 5 phút",
                ],
                [
                  "4 giờ 20 phút − 1 giờ 35 phút",
                  "đổi: 3 giờ 80 phút",
                  "2 giờ 45 phút",
                ],
              ],
              label: "Kiểm tra: kết quả phải đổi gọn nhất có thể",
            },
          },
        },
        {
          type: "visual",
          content: {
            cotTinh: {
              left: 80,
              right: 35,
              sign: "−"
            },
            text: "Bé tự đặt tính: 80 − 35\nhàng đơn vị 0 < 5 nên mượn 1: 10 − 5 = 5, viết 5\nhàng chục 8 − 4 = 4, viết 4\nVậy 80 − 35 = 45."
          }
        },
        {
          type: "concept",
          content: {
            badge: "Chú Ý",
            title: "Vì sao ra 55 là sai?",
            explanation: "55 là kết quả khi bé quên bớt 1 chục sau khi mượn. Đây là lỗi hay gặp nhất của dạng trừ này.",
            points: [
              "Lỗi — quên bớt 1 chục sau khi mượn: hàng đơn vị 0 < 5 nên mượn 1: 10 − 5 = 5, viết 5. Kết quả đúng phải là 45.",
              "Cách tránh: làm xong một hàng thì ghi/xoá số đã vay NGAY, đừng để sang hàng sau mới nhớ.",
              "Tự kiểm tra: 45 + 35 phải bằng 80."
            ]
          }
        },
        {
          type: "visual",
          content: {
            table: {
              headers: ["Đơn vị", "Bằng bao nhiêu đơn vị liền sau"],
              rows: [
                ["1 giờ", "60 phút"],
                ["1 phút", "60 giây"]
              ]
            },
            text: "Bậc thang đơn vị đo thời gian\n· giờ\n· phút\n· giây\nĐi XUỐNG một bậc thì nhân hệ số của bậc đó; đi LÊN một bậc thì chia."
          }
        },
        {
          type: "concept",
          content: {
            badge: "Mẹo Nhớ",
            title: "Cách đổi đơn vị đo thời gian",
            explanation: "Bé chỉ cần nhớ đúng BẬC THANG đơn vị rồi nhân hoặc chia theo hệ số của từng bậc.",
            points: [
              "1 giờ = 60 phút.",
              "Đi xuống hai bậc thì nhân hai lần: 1 giờ = 60 × 60 = 3600 giây.",
              "Đổi số lớn ra số bé: NHÂN. Ví dụ 2 giờ = 120 phút.",
              "Đổi số bé ra số lớn: CHIA. Ví dụ 180 phút = 3 giờ."
            ]
          }
        },
        {
          type: "quiz",
          content: {
            question: "1 giờ bằng bao nhiêu phút?",
            options: [6, 60, 600, 3600],
            answer: 60,
            mascotHint: "Hai đơn vị liền nhau: 1 giờ = 60 phút."
          }
        },
        {
          type: "quiz",
          content: {
            question: "3 giờ bằng bao nhiêu phút?",
            options: [60, 180, 240, 1800],
            answer: 180,
            mascotHint: "Đổi số lớn ra số bé thì nhân: 3 × 60 = 180."
          }
        },
        {
          type: "quiz",
          content: {
            question: "65 − 27 bằng bao nhiêu?",
            options: [37, 38, 39, 48],
            answer: 38,
            mascotHint: "hàng đơn vị 5 < 7 nên mượn 1: 15 − 7 = 8, viết 8. Kết quả 38."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Tính: 3 giờ 15 phút + 2 giờ 35 phút = ?",
            options: [
              "5 giờ 50 phút",
              "6 giờ 50 phút",
              "5 giờ 40 phút",
              "5 giờ 5 phút",
            ],
            answer: "5 giờ 50 phút",
            mascotHint: "15 phút + 35 phút = 50 phút; 3 giờ + 2 giờ = 5 giờ.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Tính: 4 giờ 20 phút − 1 giờ 35 phút = ?",
            options: [
              "2 giờ 45 phút",
              "3 giờ 15 phút",
              "2 giờ 15 phút",
              "3 giờ 55 phút",
            ],
            answer: "2 giờ 45 phút",
            mascotHint:
              "Đổi 4 giờ 20 phút = 3 giờ 80 phút; 80 − 35 = 45 phút; 3 − 1 = 2 giờ.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Đặt tính thẳng cột theo từng đơn vị.",
              "60 phút = 1 giờ; 60 giây = 1 phút.",
              "Khi trừ thiếu thì mượn 1 đơn vị lớn = 60 đơn vị bé.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g5-c10-l3",
      title: "Bài 58: Nhân, chia số đo thời gian với một số",
      type: "learn",
      description: "Nhân, chia số đo thời gian cho một số tự nhiên",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Mỗi tiết học kéo dài 35 phút. Một buổi có 3 tiết thì kéo dài 1 giờ 45 phút! ⏱️",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Nhân, chia số đo thời gian",
            explanation:
              "Muốn nhân một số đo thời gian với một số tự nhiên, ta nhân từng đơn vị với số đó rồi đổi sang đơn vị lớn hơn nếu được. Muốn chia, ta chia từng đơn vị cho số đó (chia phần lớn trước, nếu còn dư thì đổi sang đơn vị bé hơn rồi chia tiếp).",
            points: [
              "1 giờ 15 phút × 3 = 3 giờ 45 phút.",
              "35 phút × 3 = 105 phút = 1 giờ 45 phút.",
              "4 giờ 30 phút : 3 = 1 giờ 30 phút.",
            ],
            rule: "Nhân (chia) từng đơn vị rồi đổi cho gọn.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Nhân, chia số đo thời gian",
            table: {
              headers: ["Phép tính", "Cách làm", "Kết quả"],
              rows: [
                ["1 giờ 15 phút × 3", "nhân từng đơn vị", "3 giờ 45 phút"],
                ["35 phút × 3", "105 phút = 1 giờ 45 phút", "1 giờ 45 phút"],
                [
                  "7 giờ 12 phút : 4",
                  "432 phút : 4 = 108 phút",
                  "1 giờ 48 phút",
                ],
              ],
              label: "Chia không hết thì đổi sang đơn vị bé hơn",
            },
          },
        },
        {
          type: "visual",
          content: {
            table: {
              headers: ["Đơn vị", "Bằng bao nhiêu đơn vị liền sau"],
              rows: [
                ["1 giờ", "60 phút"],
                ["1 phút", "60 giây"]
              ]
            },
            text: "Bậc thang đơn vị đo thời gian\n· giờ\n· phút\n· giây\nĐi XUỐNG một bậc thì nhân hệ số của bậc đó; đi LÊN một bậc thì chia."
          }
        },
        {
          type: "concept",
          content: {
            badge: "Mẹo Nhớ",
            title: "Cách đổi đơn vị đo thời gian",
            explanation: "Bé chỉ cần nhớ đúng BẬC THANG đơn vị rồi nhân hoặc chia theo hệ số của từng bậc.",
            points: [
              "1 giờ = 60 phút.",
              "Đi xuống hai bậc thì nhân hai lần: 1 giờ = 60 × 60 = 3600 giây.",
              "Đổi số lớn ra số bé: NHÂN. Ví dụ 2 giờ = 120 phút.",
              "Đổi số bé ra số lớn: CHIA. Ví dụ 180 phút = 3 giờ."
            ]
          }
        },
        {
          type: "quiz",
          content: {
            question: "1 giờ bằng bao nhiêu phút?",
            options: [6, 60, 600, 3600],
            answer: 60,
            mascotHint: "Hai đơn vị liền nhau: 1 giờ = 60 phút."
          }
        },
        {
          type: "quiz",
          content: {
            question: "3 giờ bằng bao nhiêu phút?",
            options: [60, 180, 240, 1800],
            answer: 180,
            mascotHint: "Đổi số lớn ra số bé thì nhân: 3 × 60 = 180."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Tính: 1 giờ 15 phút × 3 = ?",
            options: [
              "3 giờ 45 phút",
              "3 giờ 15 phút",
              "4 giờ 15 phút",
              "3 giờ 5 phút",
            ],
            answer: "3 giờ 45 phút",
            mascotHint: "1 giờ × 3 = 3 giờ; 15 phút × 3 = 45 phút.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Tính: 4 giờ 30 phút : 3 = ?",
            options: [
              "1 giờ 30 phút",
              "1 giờ 10 phút",
              "2 giờ 30 phút",
              "1 giờ 5 phút",
            ],
            answer: "1 giờ 30 phút",
            mascotHint:
              "4 giờ 30 phút = 270 phút; 270 : 3 = 90 phút = 1 giờ 30 phút.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Nhân (chia) từng đơn vị với số tự nhiên.",
              "Đổi 60 phút = 1 giờ cho kết quả gọn.",
              "Khi chia còn dư thì đổi sang đơn vị bé hơn.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g5-c10-l4",
      title: "Bài 59: Vận tốc của một chuyển động đều",
      type: "learn",
      description: "Tính vận tốc khi biết quãng đường và thời gian: v = s : t",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Ô tô đi 120 km trong 2 giờ. Trung bình mỗi giờ ô tô đi được 60 km — đó chính là vận tốc 60 km/giờ! 🚗",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Vận tốc",
            explanation:
              "Vận tốc của một chuyển động đều cho biết mỗi đơn vị thời gian vật đi được bao nhiêu đơn vị độ dài. Muốn tính vận tốc, ta lấy quãng đường chia cho thời gian.",
            points: [
              "v = s : t (v là vận tốc, s là quãng đường, t là thời gian).",
              "120 km trong 2 giờ ⇒ v = 60 km/giờ.",
              "Đơn vị vận tốc: km/giờ, m/giây, m/phút…",
            ],
            rule: "Vận tốc = quãng đường : thời gian.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Tính vận tốc",
            table: {
              headers: ["Quãng đường", "Thời gian", "Vận tốc"],
              rows: [
                ["120 km", "2 giờ", "60 km/giờ"],
                ["6 km", "1,5 giờ", "4 km/giờ"],
                ["150 m", "30 giây", "5 m/giây"],
                ["900 m", "15 phút", "60 m/phút"],
              ],
              label: "Đơn vị vận tốc phụ thuộc đơn vị quãng đường và thời gian",
            },
          },
        },
        {
          type: "visual",
          content: {
            table: {
              headers: ["Đơn vị", "Bằng bao nhiêu đơn vị liền sau"],
              rows: [
                ["1 giờ", "60 phút"],
                ["1 phút", "60 giây"]
              ]
            },
            text: "Bậc thang đơn vị đo thời gian\n· giờ\n· phút\n· giây\nĐi XUỐNG một bậc thì nhân hệ số của bậc đó; đi LÊN một bậc thì chia."
          }
        },
        {
          type: "concept",
          content: {
            badge: "Mẹo Nhớ",
            title: "Cách đổi đơn vị đo thời gian",
            explanation: "Bé chỉ cần nhớ đúng BẬC THANG đơn vị rồi nhân hoặc chia theo hệ số của từng bậc.",
            points: [
              "1 giờ = 60 phút.",
              "Đi xuống hai bậc thì nhân hai lần: 1 giờ = 60 × 60 = 3600 giây.",
              "Đổi số lớn ra số bé: NHÂN. Ví dụ 2 giờ = 120 phút.",
              "Đổi số bé ra số lớn: CHIA. Ví dụ 180 phút = 3 giờ."
            ]
          }
        },
        {
          type: "quiz",
          content: {
            question: "1 giờ bằng bao nhiêu phút?",
            options: [6, 60, 600, 3600],
            answer: 60,
            mascotHint: "Hai đơn vị liền nhau: 1 giờ = 60 phút."
          }
        },
        {
          type: "quiz",
          content: {
            question: "3 giờ bằng bao nhiêu phút?",
            options: [60, 180, 240, 1800],
            answer: 180,
            mascotHint: "Đổi số lớn ra số bé thì nhân: 3 × 60 = 180."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Ô tô đi 120 km trong 2 giờ. Vận tốc của ô tô là:",
            options: ["60 km/giờ", "120 km/giờ", "240 km/giờ", "30 km/giờ"],
            answer: "60 km/giờ",
            mascotHint: "v = 120 : 2 = 60 (km/giờ).",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Người đi bộ đi 6 km trong 1,5 giờ. Vận tốc của người đó là:",
            options: ["4 km/giờ", "9 km/giờ", "3 km/giờ", "6 km/giờ"],
            answer: "4 km/giờ",
            mascotHint: "v = 6 : 1,5 = 4 (km/giờ).",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "v = s : t.",
              "Đơn vị vận tốc phụ thuộc đơn vị đo.",
              "Đổi đơn vị đo cho đúng trước khi tính.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g5-c10-l5",
      title: "Bài 60: Quãng đường, thời gian của một chuyển động đều",
      type: "learn",
      description: "Tính quãng đường s = v × t và thời gian t = s : v",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "thinking",
            text: "Xe máy đi với vận tốc 45 km/giờ trong 3 giờ thì đi được 135 km. Còn muốn biết đi 150 km trong bao lâu thì lấy 150 : 50! 🏍️",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Quãng đường và thời gian",
            explanation:
              "Muốn tính quãng đường, ta lấy vận tốc nhân với thời gian. Muốn tính thời gian, ta lấy quãng đường chia cho vận tốc.",
            points: [
              "s = v × t.",
              "t = s : v.",
              "45 km/giờ × 3 giờ = 135 km; 150 km : 50 km/giờ = 3 giờ.",
            ],
            rule: "Ba công thức liên hệ: v = s : t; s = v × t; t = s : v.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Ba công thức của chuyển động đều",
            table: {
              headers: ["Cần tìm", "Công thức", "Ví dụ"],
              rows: [
                ["Vận tốc", "v = s : t", "120 km : 2 giờ = 60 km/giờ"],
                ["Quãng đường", "s = v × t", "45 km/giờ × 3 giờ = 135 km"],
                ["Thời gian", "t = s : v", "150 km : 50 km/giờ = 3 giờ"],
              ],
              label: "Đổi đơn vị thời gian cho khớp với đơn vị vận tốc",
            },
          },
        },
        {
          type: "visual",
          content: {
            cotTinh: {
              left: 45,
              right: 3,
              sign: "×",
              remember: true
            },
            text: "Bé tự đặt tính: 45 × 3\nhàng đơn vị 5 × 3 = 15, viết 5 nhớ 1\nhàng chục 4 × 3 + 1 (nhớ) = 13, viết 3 nhớ 1\ncòn nhớ 1 ở hàng cao hơn, viết 1\nVậy 45 × 3 = 135."
          }
        },
        {
          type: "concept",
          content: {
            badge: "Chú Ý",
            title: "Vì sao ra 25 là sai?",
            explanation: "25 là kết quả khi bé quên nhớ khi nhân từng hàng. Đây là lỗi hay gặp nhất của dạng nhân này.",
            points: [
              "Lỗi — quên nhớ khi nhân từng hàng: hàng đơn vị 5 × 3 = 15, viết 5 nhớ 1. Kết quả đúng phải là 135.",
              "Cách tránh: làm xong một hàng thì ghi/xoá số nhớ NGAY, đừng để sang hàng sau mới nhớ.",
              "Tự kiểm tra: 135 : 3 phải bằng 45."
            ]
          }
        },
        {
          type: "visual",
          content: {
            table: {
              headers: ["Đơn vị", "Bằng bao nhiêu đơn vị liền sau"],
              rows: [
                ["1 km", "10 hm"],
                ["1 hm", "10 dam"],
                ["1 dam", "10 m"],
                ["1 m", "10 dm"],
                ["1 dm", "10 cm"],
                ["1 cm", "10 mm"]
              ]
            },
            text: "Bậc thang đơn vị đo độ dài\n· km\n· hm\n· dam\n· m\n· dm\n· cm\n· mm\nĐi XUỐNG một bậc thì nhân hệ số của bậc đó; đi LÊN một bậc thì chia."
          }
        },
        {
          type: "concept",
          content: {
            badge: "Mẹo Nhớ",
            title: "Cách đổi đơn vị đo độ dài",
            explanation: "Bé chỉ cần nhớ đúng BẬC THANG đơn vị rồi nhân hoặc chia theo hệ số của từng bậc.",
            points: [
              "1 km = 10 hm.",
              "Đi xuống hai bậc thì nhân hai lần: 1 km = 10 × 10 = 100 dam.",
              "Đổi số lớn ra số bé: NHÂN. Ví dụ 2 km = 20 hm.",
              "Đổi số bé ra số lớn: CHIA. Ví dụ 30 hm = 3 km."
            ]
          }
        },
        {
          type: "quiz",
          content: {
            question: "1 km bằng bao nhiêu hm?",
            options: [1, 10, 11, 100],
            answer: 10,
            mascotHint: "Hai đơn vị liền nhau: 1 km = 10 hm."
          }
        },
        {
          type: "quiz",
          content: {
            question: "3 km bằng bao nhiêu hm?",
            options: [10, 30, 40, 300],
            answer: 30,
            mascotHint: "Đổi số lớn ra số bé thì nhân: 3 × 10 = 30."
          }
        },
        {
          type: "quiz",
          content: {
            question: "82 × 5 bằng bao nhiêu?",
            options: [409, 410, 411, 412],
            answer: 410,
            mascotHint: "hàng đơn vị 2 × 5 = 10, viết 0 nhớ 1. Kết quả 410."
          }
        },
        {
          type: "quiz",
          content: {
            question:
              "Xe máy đi 45 km/giờ trong 3 giờ. Quãng đường đi được là:",
            options: ["135 km", "48 km", "15 km", "150 km"],
            answer: "135 km",
            mascotHint: "s = 45 × 3 = 135 (km).",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Một ô tô đi quãng đường 150 km với vận tốc 50 km/giờ. Thời gian đi là:",
            options: ["3 giờ", "2 giờ", "3,5 giờ", "5 giờ"],
            answer: "3 giờ",
            mascotHint: "t = 150 : 50 = 3 (giờ).",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "s = v × t.",
              "t = s : v.",
              "Đơn vị thời gian phải khớp đơn vị vận tốc.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g5-c10-l6",
      title:
        "Bài 61: Thực hành tính toán và ước lượng về vận tốc, quãng đường, thời gian trong chuyển động đều",
      type: "learn",
      description:
        "Đổi đơn vị vận tốc và ước lượng kết quả trong bài toán chuyển động",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Xe chạy 36 km/giờ tức là mỗi giây đi được 10 m. Đổi đơn vị vận tốc cũng cần thiết khi làm bài! 🛵",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Thực Hành",
            title: "Đổi đơn vị vận tốc và ước lượng",
            explanation:
              "Để đổi vận tốc từ km/giờ sang m/giây, ta đổi 1 giờ = 3 600 giây và 1 km = 1 000 m rồi tính. Trong thực hành, ta cũng có thể ước lượng kết quả bằng cách làm tròn số đo để kiểm tra.",
            points: [
              "36 km/giờ = 36 000 m : 3 600 giây = 10 m/giây.",
              "18 km/giờ = 5 m/giây.",
              "Ước lượng: 42 km/giờ trong 3 giờ ≈ 120 km.",
            ],
            rule: "1 km/giờ = 1 000 m : 3 600 giây.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Đổi đơn vị vận tốc",
            table: {
              headers: ["Vận tốc", "Đổi sang m/giây"],
              rows: [
                ["36 km/giờ", "10 m/giây"],
                ["18 km/giờ", "5 m/giây"],
                ["72 km/giờ", "20 m/giây"],
                ["54 km/giờ", "15 m/giây"],
              ],
              label: "Chia vận tốc km/giờ cho 3,6 để được m/giây",
            },
          },
        },
        {
          type: "visual",
          content: {
            table: {
              headers: ["Đơn vị", "Bằng bao nhiêu đơn vị liền sau"],
              rows: [
                ["1 giờ", "60 phút"],
                ["1 phút", "60 giây"]
              ]
            },
            text: "Bậc thang đơn vị đo thời gian\n· giờ\n· phút\n· giây\nĐi XUỐNG một bậc thì nhân hệ số của bậc đó; đi LÊN một bậc thì chia."
          }
        },
        {
          type: "concept",
          content: {
            badge: "Mẹo Nhớ",
            title: "Cách đổi đơn vị đo thời gian",
            explanation: "Bé chỉ cần nhớ đúng BẬC THANG đơn vị rồi nhân hoặc chia theo hệ số của từng bậc.",
            points: [
              "1 giờ = 60 phút.",
              "Đi xuống hai bậc thì nhân hai lần: 1 giờ = 60 × 60 = 3600 giây.",
              "Đổi số lớn ra số bé: NHÂN. Ví dụ 2 giờ = 120 phút.",
              "Đổi số bé ra số lớn: CHIA. Ví dụ 180 phút = 3 giờ."
            ]
          }
        },
        {
          type: "quiz",
          content: {
            question: "1 giờ bằng bao nhiêu phút?",
            options: [6, 60, 600, 3600],
            answer: 60,
            mascotHint: "Hai đơn vị liền nhau: 1 giờ = 60 phút."
          }
        },
        {
          type: "quiz",
          content: {
            question: "3 giờ bằng bao nhiêu phút?",
            options: [60, 180, 240, 1800],
            answer: 180,
            mascotHint: "Đổi số lớn ra số bé thì nhân: 3 × 60 = 180."
          }
        },
        {
          type: "quiz",
          content: {
            question: "36 km/giờ đổi sang m/giây là:",
            options: ["10 m/giây", "36 m/giây", "6 m/giây", "100 m/giây"],
            answer: "10 m/giây",
            mascotHint: "36 000 m : 3 600 giây = 10 m/giây.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Một người đi xe đạp với vận tốc 12 km/giờ trong 2 giờ 30 phút. Quãng đường đi được là:",
            options: ["30 km", "24 km", "36 km", "28 km"],
            answer: "30 km",
            mascotHint: "2 giờ 30 phút = 2,5 giờ; 12 × 2,5 = 30 (km).",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Đổi đơn vị vận tốc đúng cách.",
              "Đổi thời gian ra số thập phân khi cần.",
              "Ước lượng để kiểm tra kết quả.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g5-c10-l7",
      title: "Bài 62: Luyện tập chung",
      type: "learn",
      description: "Luyện tập số đo thời gian và các bài toán chuyển động đều",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Cùng giải bài toán chuyển động thật thú vị: hai xe đi ngược chiều, xe đi trước xe đi sau… 🚙🚕",
          },
        },
        {
          type: "visual",
          content: {
            text: "Bảng tổng hợp Chủ đề 10",
            table: {
              headers: ["Nội dung", "Công thức / cách làm"],
              rows: [
                ["Số đo thời gian", "1 giờ = 60 phút; 1 phút = 60 giây"],
                ["Cộng, trừ thời gian", "đặt tính theo từng đơn vị"],
                ["Nhân, chia thời gian", "nhân, chia từng đơn vị"],
                ["Vận tốc", "v = s : t"],
                ["Quãng đường", "s = v × t"],
                ["Thời gian", "t = s : v"],
              ],
              label: "Đọc kĩ đề để biết cần tìm đại lượng nào",
            },
          },
        },
        {
          type: "visual",
          content: {
            cotTinh: {
              left: 20,
              right: 45,
              sign: "+",
              remember: true
            },
            text: "Bé tự đặt tính: 20 + 45\nhàng đơn vị 0 + 5 = 5, viết 5\nhàng chục 2 + 4 = 6, viết 6\nVậy 20 + 45 = 65."
          }
        },
        {
          type: "visual",
          content: {
            table: {
              headers: ["Đơn vị", "Bằng bao nhiêu đơn vị liền sau"],
              rows: [
                ["1 giờ", "60 phút"],
                ["1 phút", "60 giây"]
              ]
            },
            text: "Bậc thang đơn vị đo thời gian\n· giờ\n· phút\n· giây\nĐi XUỐNG một bậc thì nhân hệ số của bậc đó; đi LÊN một bậc thì chia."
          }
        },
        {
          type: "concept",
          content: {
            badge: "Mẹo Nhớ",
            title: "Cách đổi đơn vị đo thời gian",
            explanation: "Bé chỉ cần nhớ đúng BẬC THANG đơn vị rồi nhân hoặc chia theo hệ số của từng bậc.",
            points: [
              "1 giờ = 60 phút.",
              "Đi xuống hai bậc thì nhân hai lần: 1 giờ = 60 × 60 = 3600 giây.",
              "Đổi số lớn ra số bé: NHÂN. Ví dụ 2 giờ = 120 phút.",
              "Đổi số bé ra số lớn: CHIA. Ví dụ 180 phút = 3 giờ."
            ]
          }
        },
        {
          type: "quiz",
          content: {
            question: "1 giờ bằng bao nhiêu phút?",
            options: [6, 60, 600, 3600],
            answer: 60,
            mascotHint: "Hai đơn vị liền nhau: 1 giờ = 60 phút."
          }
        },
        {
          type: "quiz",
          content: {
            question: "3 giờ bằng bao nhiêu phút?",
            options: [60, 180, 240, 1800],
            answer: 180,
            mascotHint: "Đổi số lớn ra số bé thì nhân: 3 × 60 = 180."
          }
        },
        {
          type: "quiz",
          content: {
            question: "51 + 21 bằng bao nhiêu?",
            options: [71, 72, 73, 74],
            answer: 72,
            mascotHint: "hàng đơn vị 1 + 1 = 2, viết 2. Kết quả 72."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Tính: 2 giờ 20 phút + 1 giờ 45 phút = ?",
            options: [
              "4 giờ 5 phút",
              "3 giờ 65 phút",
              "4 giờ 15 phút",
              "3 giờ 5 phút",
            ],
            answer: "4 giờ 5 phút",
            mascotHint: "20 + 45 = 65 phút = 1 giờ 5 phút; 2 + 1 + 1 = 4 giờ.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Hai xe cùng khởi hành, xe thứ nhất đi 3 giờ với vận tốc 40 km/giờ, xe thứ hai đi 2 giờ với vận tốc 55 km/giờ. Xe nào đi được quãng đường dài hơn?",
            options: [
              "Xe thứ nhất",
              "Xe thứ hai",
              "Bằng nhau",
              "Không so sánh được",
            ],
            answer: "Xe thứ nhất",
            mascotHint:
              "Xe thứ nhất: 40 × 3 = 120 km; xe thứ hai: 55 × 2 = 110 km ⇒ xe thứ nhất đi dài hơn.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Một người chạy 400 m trong 80 giây. Vận tốc là:",
            options: ["5 m/giây", "4 m/giây", "8 m/giây", "50 m/giây"],
            answer: "5 m/giây",
            mascotHint: "v = 400 : 80 = 5 (m/giây).",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Xác định đại lượng cần tìm trước khi tính.",
              "Dùng đúng công thức v = s : t; s = v × t; t = s : v.",
              "Kiểm tra đơn vị và kết quả.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
  ],
};
