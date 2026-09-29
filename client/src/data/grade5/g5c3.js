export const g5c3 = {
  id: "g5-c3",
  name: "Chủ đề 3: Một số đơn vị đo diện tích",
  description:
    "Ki-lô-mét vuông, héc-ta và các đơn vị đo diện tích; thực hành, trải nghiệm với đơn vị đo đại lượng",
  icon: "🗺️",
  color: "#14b8a6",
  totalLessons: 4,
  lessons: [
    {
      id: "g5-c3-l1",
      title: "Bài 15: Ki-lô-mét vuông. Héc-ta",
      type: "learn",
      description:
        "Nhận biết đơn vị đo diện tích ki-lô-mét vuông (km²) và héc-ta (ha)",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Diện tích một khu rừng lớn đến mức phải đo bằng ki-lô-mét vuông. Còn một cánh đồng thì đo bằng héc-ta. Cùng tìm hiểu nhé! 🌳",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Ki-lô-mét vuông và héc-ta",
            explanation:
              "Ki-lô-mét vuông là diện tích của hình vuông có cạnh dài 1 km, viết tắt là km². Héc-ta là diện tích của hình vuông có cạnh dài 100 m, viết tắt là ha.",
            points: [
              "1 km² = 1 000 000 m².",
              "1 ha = 10 000 m².",
              "1 km² = 100 ha.",
            ],
            rule: "Mỗi đơn vị đo diện tích hơn kém nhau 100 lần.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Quan hệ giữa các đơn vị đo diện tích",
            table: {
              headers: ["Đơn vị", "Quan hệ"],
              rows: [
                ["1 km²", "1 000 000 m²"],
                ["1 ha", "10 000 m²"],
                ["1 m²", "100 dm²"],
                ["1 dm²", "100 cm²"],
              ],
              label: "1 km² lớn hơn 1 ha rất nhiều: 1 km² = 100 ha",
            },
          },
        },
        {
          type: "visual",
          content: {
            table: {
              headers: ["Đơn vị", "Bằng bao nhiêu đơn vị liền sau"],
              rows: [
                ["1 m²", "100 dm²"],
                ["1 dm²", "100 cm²"]
              ]
            },
            text: "Bậc thang đơn vị đo diện tích\n· m²\n· dm²\n· cm²\nĐi XUỐNG một bậc thì nhân hệ số của bậc đó; đi LÊN một bậc thì chia."
          }
        },
        {
          type: "concept",
          content: {
            badge: "Mẹo Nhớ",
            title: "Cách đổi đơn vị đo diện tích",
            explanation: "Bé chỉ cần nhớ đúng BẬC THANG đơn vị rồi nhân hoặc chia theo hệ số của từng bậc.",
            points: [
              "1 m² = 100 dm².",
              "Đi xuống hai bậc thì nhân hai lần: 1 m² = 100 × 100 = 10000 cm².",
              "Đổi số lớn ra số bé: NHÂN. Ví dụ 2 m² = 200 dm².",
              "Đổi số bé ra số lớn: CHIA. Ví dụ 300 dm² = 3 m²."
            ]
          }
        },
        {
          type: "quiz",
          content: {
            question: "1 m² bằng bao nhiêu dm²?",
            options: [10, 100, 1000, 10000],
            answer: 100,
            mascotHint: "Hai đơn vị liền nhau: 1 m² = 100 dm²."
          }
        },
        {
          type: "quiz",
          content: {
            question: "3 m² bằng bao nhiêu dm²?",
            options: [100, 300, 400, 3000],
            answer: 300,
            mascotHint: "Đổi số lớn ra số bé thì nhân: 3 × 100 = 300."
          }
        },
        {
          type: "quiz",
          content: {
            question: "1 km² bằng bao nhiêu héc-ta?",
            options: ["100 ha", "10 ha", "1 000 ha", "10 000 ha"],
            answer: "100 ha",
            mascotHint:
              "1 km² = 1 000 000 m², mà 1 ha = 10 000 m² nên 1 km² = 100 ha.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Một khu rừng rộng 5 km² bằng bao nhiêu mét vuông?",
            options: ["5 000 000 m²", "50 000 m²", "500 000 m²", "5 000 m²"],
            answer: "5 000 000 m²",
            mascotHint: "1 km² = 1 000 000 m² nên 5 km² = 5 000 000 m².",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "1 km² = 1 000 000 m² = 100 ha.",
              "1 ha = 10 000 m².",
              "Dùng ha, km² cho diện tích lớn.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g5-c3-l2",
      title: "Bài 16: Các đơn vị đo diện tích",
      type: "learn",
      description: "Bảng đơn vị đo diện tích và cách đổi giữa các đơn vị",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "thinking",
            text: "Từ mi-li-mét vuông đến ki-lô-mét vuông có rất nhiều đơn vị. Mỗi đơn vị hơn kém nhau bao nhiêu lần nhỉ? 📐",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Bảng đơn vị đo diện tích",
            explanation:
              "Các đơn vị đo diện tích theo thứ tự từ lớn đến bé là: ki-lô-mét vuông, héc-tô-mét vuông, đề-ca-mét vuông, mét vuông, đề-xi-mét vuông, xăng-ti-mét vuông, mi-li-mét vuông. Mỗi đơn vị gấp 100 lần đơn vị bé hơn liền sau.",
            points: [
              "1 hm² (héc-tô-mét vuông) = 1 ha = 10 000 m².",
              "1 m² = 100 dm²; 1 dm² = 100 cm²; 1 cm² = 100 mm².",
              "Khi đổi từ đơn vị lớn sang bé thì nhân với 100 (mỗi bậc).",
            ],
            rule: "Mỗi đơn vị đo diện tích gấp 100 lần đơn vị liền sau.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Bảng đơn vị đo diện tích",
            table: {
              headers: ["Lớn hơn mét vuông", "Mét vuông", "Bé hơn mét vuông"],
              rows: [
                ["km² · hm² (ha) · dam²", "m²", "dm² · cm² · mm²"],
                [
                  "1 km² = 100 hm²",
                  "1 m² = 100 dm²",
                  "1 dm² = 100 cm² = 10 000 mm²",
                ],
              ],
              label: "Từ lớn sang bé: nhân 100 mỗi bậc",
            },
          },
        },
        {
          type: "visual",
          content: {
            table: {
              headers: ["Đơn vị", "Bằng bao nhiêu đơn vị liền sau"],
              rows: [
                ["1 m²", "100 dm²"],
                ["1 dm²", "100 cm²"]
              ]
            },
            text: "Bậc thang đơn vị đo diện tích\n· m²\n· dm²\n· cm²\nĐi XUỐNG một bậc thì nhân hệ số của bậc đó; đi LÊN một bậc thì chia."
          }
        },
        {
          type: "concept",
          content: {
            badge: "Mẹo Nhớ",
            title: "Cách đổi đơn vị đo diện tích",
            explanation: "Bé chỉ cần nhớ đúng BẬC THANG đơn vị rồi nhân hoặc chia theo hệ số của từng bậc.",
            points: [
              "1 m² = 100 dm².",
              "Đi xuống hai bậc thì nhân hai lần: 1 m² = 100 × 100 = 10000 cm².",
              "Đổi số lớn ra số bé: NHÂN. Ví dụ 2 m² = 200 dm².",
              "Đổi số bé ra số lớn: CHIA. Ví dụ 300 dm² = 3 m²."
            ]
          }
        },
        {
          type: "quiz",
          content: {
            question: "1 m² bằng bao nhiêu dm²?",
            options: [10, 100, 1000, 10000],
            answer: 100,
            mascotHint: "Hai đơn vị liền nhau: 1 m² = 100 dm²."
          }
        },
        {
          type: "quiz",
          content: {
            question: "3 m² bằng bao nhiêu dm²?",
            options: [100, 300, 400, 3000],
            answer: 300,
            mascotHint: "Đổi số lớn ra số bé thì nhân: 3 × 100 = 300."
          }
        },
        {
          type: "quiz",
          content: {
            question: "1 m² bằng bao nhiêu xăng-ti-mét vuông?",
            options: ["10 000 cm²", "1 000 cm²", "100 cm²", "100 000 cm²"],
            answer: "10 000 cm²",
            mascotHint:
              "1 m² = 100 dm² và 1 dm² = 100 cm² nên 1 m² = 100 × 100 = 10 000 cm².",
          },
        },
        {
          type: "quiz",
          content: {
            question: "3 hm² bằng bao nhiêu mét vuông?",
            options: ["30 000 m²", "3 000 m²", "300 000 m²", "300 m²"],
            answer: "30 000 m²",
            mascotHint: "1 hm² = 10 000 m² nên 3 hm² = 30 000 m².",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Đơn vị đo diện tích hơn kém nhau 100 lần.",
              "1 m² = 100 dm² = 10 000 cm².",
              "Đổi đơn vị lớn sang bé thì nhân 100.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g5-c3-l3",
      title: "Bài 17: Thực hành và trải nghiệm với một số đơn vị đo đại lượng",
      type: "learn",
      description:
        "Vận dụng các đơn vị đo diện tích, khối lượng vào tình huống thực tế",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Cả nhà đi mua đất: mảnh đất rộng 1 200 m². Ông nói “một nghìn hai trăm mét vuông, tức là 0,12 ha”. Cùng thực hành đổi đơn vị nhé! 🏡",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Thực Hành",
            title: "Đổi đơn vị đo trong thực tế",
            explanation:
              "Trong thực tế, người ta thường dùng héc-ta để nói diện tích đất nông nghiệp, dùng tấn và tạ cho khối lượng hàng hóa. Ta cần đổi đơn vị cho phù hợp với cách nói thông thường.",
            points: [
              "1 200 m² = 0,12 ha.",
              "6 500 kg = 6,5 tấn.",
              "350 kg = 3,5 tạ.",
            ],
            rule: "Đơn vị lớn hơn thì dùng khi số đo rất lớn.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Đổi đơn vị trong tình huống thực tế",
            table: {
              headers: ["Cách nói thường ngày", "Đổi đơn vị"],
              rows: [
                ["Đất rộng 1 200 m²", "0,12 ha"],
                ["Thu hoạch 6 500 kg", "6,5 tấn"],
                ["Bao gạo 350 kg", "3,5 tạ"],
                ["Cánh đồng 2 km²", "200 ha"],
              ],
              label: "Đổi rồi so sánh xem cách nói nào gọn hơn",
            },
          },
        },
        {
          type: "visual",
          content: {
            table: {
              headers: ["Đơn vị", "Bằng bao nhiêu đơn vị liền sau"],
              rows: [
                ["1 tấn", "10 tạ"],
                ["1 tạ", "10 yến"],
                ["1 yến", "10 kg"],
                ["1 kg", "1000 g"]
              ]
            },
            text: "Bậc thang đơn vị đo khối lượng\n· tấn\n· tạ\n· yến\n· kg\n· g\nĐi XUỐNG một bậc thì nhân hệ số của bậc đó; đi LÊN một bậc thì chia."
          }
        },
        {
          type: "concept",
          content: {
            badge: "Mẹo Nhớ",
            title: "Cách đổi đơn vị đo khối lượng",
            explanation: "Bé chỉ cần nhớ đúng BẬC THANG đơn vị rồi nhân hoặc chia theo hệ số của từng bậc.",
            points: [
              "1 tấn = 10 tạ.",
              "Đi xuống hai bậc thì nhân hai lần: 1 tấn = 10 × 10 = 100 yến.",
              "Đổi số lớn ra số bé: NHÂN. Ví dụ 2 tấn = 20 tạ.",
              "Đổi số bé ra số lớn: CHIA. Ví dụ 30 tạ = 3 tấn."
            ]
          }
        },
        {
          type: "quiz",
          content: {
            question: "1 tấn bằng bao nhiêu tạ?",
            options: [1, 10, 11, 100],
            answer: 10,
            mascotHint: "Hai đơn vị liền nhau: 1 tấn = 10 tạ."
          }
        },
        {
          type: "quiz",
          content: {
            question: "3 tấn bằng bao nhiêu tạ?",
            options: [10, 30, 40, 300],
            answer: 30,
            mascotHint: "Đổi số lớn ra số bé thì nhân: 3 × 10 = 30."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Mảnh đất rộng 1 200 m² bằng bao nhiêu héc-ta?",
            options: ["0,12 ha", "12 ha", "1,2 ha", "0,012 ha"],
            answer: "0,12 ha",
            mascotHint:
              "1 ha = 10 000 m² nên 1 200 m² = 1 200 : 10 000 = 0,12 ha.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Một cánh đồng rộng 2 km² bằng bao nhiêu héc-ta?",
            options: ["200 ha", "20 ha", "2 000 ha", "1 000 ha"],
            answer: "200 ha",
            mascotHint: "1 km² = 100 ha nên 2 km² = 200 ha.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Chọn đơn vị đo phù hợp với thực tế.",
              "Đổi mét vuông sang héc-ta: chia cho 10 000.",
              "Đổi ki-lô-gam sang tấn: chia cho 1 000.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g5-c3-l4",
      title: "Bài 18: Luyện tập chung",
      type: "learn",
      description: "Luyện tập đổi đơn vị đo diện tích và tính diện tích",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Một khu vườn hình chữ nhật dài 40 m, rộng 25 m. Diện tích là 1 000 m² — tức 0,1 ha. Cùng luyện tập thật nhiều nhé! 🌾",
          },
        },
        {
          type: "visual",
          content: {
            text: "Luyện tập đổi đơn vị đo diện tích",
            table: {
              headers: ["Số đo", "Đổi đơn vị"],
              rows: [
                ["5 m²", "500 dm²"],
                ["7 ha", "70 000 m²"],
                ["3 km²", "300 ha"],
                ["4 000 m²", "0,4 ha"],
              ],
              label: "Nhớ: mỗi bậc đổi 100 lần",
            },
          },
        },
        {
          type: "visual",
          content: {
            table: {
              headers: ["Đơn vị", "Bằng bao nhiêu đơn vị liền sau"],
              rows: [
                ["1 m²", "100 dm²"],
                ["1 dm²", "100 cm²"]
              ]
            },
            text: "Bậc thang đơn vị đo diện tích\n· m²\n· dm²\n· cm²\nĐi XUỐNG một bậc thì nhân hệ số của bậc đó; đi LÊN một bậc thì chia."
          }
        },
        {
          type: "concept",
          content: {
            badge: "Mẹo Nhớ",
            title: "Cách đổi đơn vị đo diện tích",
            explanation: "Bé chỉ cần nhớ đúng BẬC THANG đơn vị rồi nhân hoặc chia theo hệ số của từng bậc.",
            points: [
              "1 m² = 100 dm².",
              "Đi xuống hai bậc thì nhân hai lần: 1 m² = 100 × 100 = 10000 cm².",
              "Đổi số lớn ra số bé: NHÂN. Ví dụ 2 m² = 200 dm².",
              "Đổi số bé ra số lớn: CHIA. Ví dụ 300 dm² = 3 m²."
            ]
          }
        },
        {
          type: "quiz",
          content: {
            question: "1 m² bằng bao nhiêu dm²?",
            options: [10, 100, 1000, 10000],
            answer: 100,
            mascotHint: "Hai đơn vị liền nhau: 1 m² = 100 dm²."
          }
        },
        {
          type: "quiz",
          content: {
            question: "3 m² bằng bao nhiêu dm²?",
            options: [100, 300, 400, 3000],
            answer: 300,
            mascotHint: "Đổi số lớn ra số bé thì nhân: 3 × 100 = 300."
          }
        },
        {
          type: "quiz",
          content: {
            question: "1 km² bằng bao nhiêu mét vuông?",
            options: ["1 000 000 m²", "100 000 m²", "10 000 m²", "1 000 m²"],
            answer: "1 000 000 m²",
            mascotHint:
              "1 km² là diện tích hình vuông cạnh 1 km = 1 000 m, nên bằng 1 000 × 1 000 m².",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Khu vườn hình chữ nhật dài 40 m, rộng 25 m có diện tích là:",
            options: ["1 000 m²", "130 m²", "650 m²", "100 m²"],
            answer: "1 000 m²",
            mascotHint: "40 × 25 = 1 000 (m²) = 0,1 ha.",
          },
        },
        {
          type: "quiz",
          content: {
            question: "7 ha bằng bao nhiêu mét vuông?",
            options: ["70 000 m²", "7 000 m²", "700 000 m²", "700 m²"],
            answer: "70 000 m²",
            mascotHint: "1 ha = 10 000 m² nên 7 ha = 70 000 m².",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "1 km² = 1 000 000 m² = 100 ha.",
              "1 ha = 10 000 m².",
              "Tính diện tích rồi đổi đơn vị cho gọn.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
  ],
};
