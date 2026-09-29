export const g4c5 = {
  id: "g4-c5",
  name: "Chủ đề 5: Phép cộng và phép trừ",
  description:
    "Cộng, trừ các số có nhiều chữ số; tính chất giao hoán và kết hợp của phép cộng; tìm hai số biết tổng và hiệu của hai số đó",
  icon: "➕",
  color: "#f59e0b",
  totalLessons: 5,
  lessons: [
    {
      id: "g4-c5-l1",
      title: "Bài 22: Phép cộng các số có nhiều chữ số",
      type: "learn",
      description:
        "Đặt tính rồi cộng các số có nhiều chữ số (có nhớ), vận dụng vào bài toán thực tế",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "happy",
            text: "Trang trại nhà Cú Mèo ngày thứ nhất thu được 180 510 lít sữa, ngày thứ hai thu được 210 365 lít. Muốn biết cả hai ngày thu được bao nhiêu, chúng mình cùng đặt tính cộng nhé! 🥛",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Cộng hai số có nhiều chữ số",
            explanation:
              "Muốn cộng hai số có nhiều chữ số, bé đặt tính sao cho các chữ số cùng hàng thẳng cột với nhau, rồi cộng từ phải sang trái — đúng như đã học với số có ít chữ số.",
            points: [
              "Viết số hạng này dưới số hạng kia sao cho các hàng thẳng cột.",
              "Cộng lần lượt từ hàng đơn vị sang trái.",
              "Hàng nào cộng được từ 10 trở lên thì viết chữ số hàng đơn vị và nhớ 1 sang hàng liền trước.",
            ],
            rule: "Cộng sai thường do lệch cột — bé kiểm lại các hàng cho thẳng.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Đặt tính rồi tính: 327 456 + 190 835",
            cotTinh: { left: 327456, right: 190835, sign: "+" },
          },
        },
        {
          type: "visual",
          content: {
            text: "Hoàn thành phép tính và kiểm tra lại kết quả",
            table: {
              headers: ["Phép tính", "Kết quả"],
              rows: [
                ["180 510 + 210 365", "390 875"],
                ["327 456 + 190 835", "518 291"],
              ],
              label: "Cộng từ phải sang trái, nhớ sang hàng liền trước",
            },
          },
        },
        {
          type: "visual",
          content: {
            cotTinh: {
              left: 327456,
              right: 190835,
              sign: "+",
              remember: true
            },
            text: "Bé tự đặt tính: 327456 + 190835\nhàng đơn vị 6 + 5 = 11, viết 1 nhớ 1\nhàng chục 5 + 3 + 1 (nhớ) = 9, viết 9\nhàng trăm 4 + 8 = 12, viết 2 nhớ 1\nVậy 327 456 + 190 835 = 518 291."
          }
        },
        {
          type: "concept",
          content: {
            badge: "Chú Ý",
            title: "Vì sao ra 417281 là sai?",
            explanation: "417281 là kết quả khi bé quên nhớ 1 ở hàng chục. Đây là lỗi hay gặp nhất của dạng cộng này.",
            points: [
              "Lỗi — quên nhớ 1 ở hàng chục: hàng đơn vị 6 + 5 = 11, viết 1 nhớ 1. Kết quả đúng phải là 518291.",
              "Cách tránh: làm xong một hàng thì ghi/xoá số nhớ NGAY, đừng để sang hàng sau mới nhớ.",
              "Tự kiểm tra: 518291 − 327456 phải bằng 190835."
            ]
          }
        },
        {
          type: "quiz",
          content: {
            question:
              "Trong 1 phút, vệ tinh màu xanh bay được 474 000 m, vệ tinh màu đỏ bay được quãng đường dài hơn vệ tinh màu xanh là 201 km. Hỏi vệ tinh màu đỏ bay được bao nhiêu mét trong 1 phút?",
            options: ["675 000 m", "474 201 m", "576 000 m", "684 000 m"],
            answer: "675 000 m",
            mascotHint:
              "Đổi 201 km = 201 000 m. Vệ tinh đỏ bay được: 474 000 + 201 000 = 675 000 (m).",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Tính: 180 510 + 210 365 = ?",
            options: ["390 875", "380 875", "391 875", "390 775"],
            answer: "390 875",
            mascotHint:
              "Cộng từng hàng từ phải sang trái: 0+5=5; 1+6=7; 5+3=8; 0+0=0; 8+1=9; 1+2=3.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Đặt tính thẳng cột theo từng hàng.",
              "Cộng từ phải sang trái.",
              "Tổng của một hàng từ 10 trở lên thì nhớ 1.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c5-l2",
      title: "Bài 23: Phép trừ các số có nhiều chữ số",
      type: "learn",
      description:
        "Đặt tính rồi trừ các số có nhiều chữ số (có mượn), vận dụng vào bài toán thực tế",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Video dạy tiếng Anh có 438 589 lượt xem, video dạy hát nhạc có 235 072 lượt xem. Video tiếng Anh nhiều hơn bao nhiêu lượt xem nhỉ? 🎬",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Trừ hai số có nhiều chữ số",
            explanation:
              "Cách trừ cũng giống như đã học: đặt tính thẳng cột rồi trừ từ phải sang trái. Nếu chữ số ở hàng đang xét không trừ được, bé mượn 1 từ hàng liền trước bên trái.",
            points: [
              "Các chữ số cùng hàng phải thẳng cột với nhau.",
              "Trừ từ phải sang trái, bắt đầu từ hàng đơn vị.",
              "Không trừ được thì mượn 1 ở hàng liền trước (1 chục bằng 10 đơn vị của hàng đó).",
            ],
            rule: "Mượn 1 ở hàng bên trái khi chữ số bị trừ nhỏ hơn chữ số trừ.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Đặt tính rồi tính: 648 390 − 382 547",
            cotTinh: { left: 648390, right: 382547, sign: "−" },
          },
        },
        {
          type: "visual",
          content: {
            text: "Kết quả hai phép trừ",
            table: {
              headers: ["Phép tính", "Kết quả"],
              rows: [
                ["438 589 − 235 072", "203 517"],
                ["648 390 − 382 547", "265 843"],
              ],
              label: "Trừ từ phải sang trái, nhớ khi mượn",
            },
          },
        },
        {
          type: "visual",
          content: {
            cotTinh: {
              left: 648390,
              right: 382547,
              sign: "−"
            },
            text: "Bé tự đặt tính: 648390 − 382547\nhàng đơn vị 0 < 7 nên mượn 1: 10 − 7 = 3, viết 3\nhàng chục 9 − 5 = 4, viết 4\nhàng trăm 3 < 5 nên mượn 1: 13 − 5 = 8, viết 8\nVậy 648 390 − 382 547 = 265 843."
          }
        },
        {
          type: "concept",
          content: {
            badge: "Chú Ý",
            title: "Vì sao ra 366853 là sai?",
            explanation: "366853 là kết quả khi bé quên bớt 1 chục sau khi mượn. Đây là lỗi hay gặp nhất của dạng trừ này.",
            points: [
              "Lỗi — quên bớt 1 chục sau khi mượn: hàng đơn vị 0 < 7 nên mượn 1: 10 − 7 = 3, viết 3. Kết quả đúng phải là 265843.",
              "Cách tránh: làm xong một hàng thì ghi/xoá số đã vay NGAY, đừng để sang hàng sau mới nhớ.",
              "Tự kiểm tra: 265843 + 382547 phải bằng 648390."
            ]
          }
        },
        {
          type: "quiz",
          content: {
            question:
              "Khi bay trong 5 phút, muỗi đập cánh khoảng 180 000 lần, ong đập cánh khoảng 60 000 lần. Muỗi đập cánh nhiều hơn ong bao nhiêu lần?",
            options: [
              "120 000 lần",
              "240 000 lần",
              "110 000 lần",
              "60 000 lần",
            ],
            answer: "120 000 lần",
            mascotHint: "180 000 − 60 000 = 120 000 (lần).",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Rô-bốt mời bốn bạn đi xem phim hết 320 000 đồng, riêng vé của Mi là 50 000 đồng. Rô-bốt đưa 500 000 đồng. Người bán vé phải trả lại bao nhiêu tiền?",
            options: [
              "130 000 đồng",
              "180 000 đồng",
              "150 000 đồng",
              "120 000 đồng",
            ],
            answer: "130 000 đồng",
            mascotHint:
              "Tổng tiền vé: 320 000 + 50 000 = 370 000 (đồng). Trả lại: 500 000 − 370 000 = 130 000 (đồng).",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Đặt tính thẳng cột rồi trừ từ phải sang trái.",
              "Không trừ được thì mượn 1 ở hàng liền trước.",
              "Thử lại bằng phép cộng: hiệu + số trừ = số bị trừ.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c5-l3",
      title: "Bài 24: Tính chất giao hoán và kết hợp của phép cộng",
      type: "learn",
      description:
        "Nhận biết a + b = b + a và (a + b) + c = a + (b + c); vận dụng để tính thuận tiện",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "thinking",
            text: "Cú Mèo mua một cốc nước cam 20 000 đồng và một cái bánh 15 000 đồng. Cô bán hàng tính 20 000 + 15 000, còn Cú Mèo tính 15 000 + 20 000 — cả hai đều ra 35 000 đồng. Vì sao lại như vậy nhỉ? 🍰",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Giao hoán và kết hợp",
            explanation:
              "Khi đổi chỗ các số hạng trong một tổng thì tổng không thay đổi: a + b = b + a. Khi cộng một tổng hai số với số thứ ba, ta có thể cộng số thứ nhất với tổng của hai số còn lại: (a + b) + c = a + (b + c).",
            points: [
              "Tính chất giao hoán: a + b = b + a.",
              "Tính chất kết hợp: (a + b) + c = a + (b + c).",
              "Nhờ hai tính chất này, bé có thể nhóm những số “tròn trăm, tròn nghìn” để tính thuận tiện.",
            ],
            rule: "Đổi chỗ hoặc nhóm lại các số hạng đều không làm thay đổi tổng.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Tính bằng cách thuận tiện: nhóm hai số có tổng tròn trăm",
            table: {
              headers: ["Biểu thức", "Cách nhóm", "Kết quả"],
              rows: [
                ["30 + 192 + 70", "(30 + 70) + 192", 292],
                ["50 + 794 + 50", "(50 + 50) + 794", 894],
                ["75 + 219 + 25", "(75 + 25) + 219", 319],
                ["725 + 199 + 125", "(725 + 125) + 199", 1049],
              ],
              label: "Nhóm trước để có tổng tròn trăm, tròn nghìn",
            },
          },
        },
        {
          type: "visual",
          content: {
            text: "Tính chất kết hợp với ba số hạng",
            table: {
              headers: ["(a + b) + c", "a + (b + c)"],
              rows: [
                [
                  "(45 000 + 75 000) + 25 000 = 120 000 + 25 000 = 145 000",
                  "45 000 + (75 000 + 25 000) = 45 000 + 100 000 = 145 000",
                ],
                [
                  "(39 + 18) + 82 = 57 + 82 = 139",
                  "39 + (18 + 82) = 39 + 100 = 139",
                ],
              ],
              label: "Hai cách tính, cùng một kết quả",
            },
          },
        },
        {
          type: "visual",
          content: {
            cotTinh: {
              left: 100,
              right: 192,
              sign: "+",
              remember: true
            },
            text: "Bé tự đặt tính: 100 + 192\nhàng đơn vị 0 + 2 = 2, viết 2\nhàng chục 0 + 9 = 9, viết 9\nhàng trăm 1 + 1 = 2, viết 2\nVậy 100 + 192 = 292."
          }
        },
        {
          type: "quiz",
          content: {
            question: "492 + 391 bằng bao nhiêu?",
            options: [783, 882, 883, 884],
            answer: 883,
            mascotHint: "hàng đơn vị 2 + 1 = 3, viết 3. Kết quả 883."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Tính bằng cách thuận tiện: 30 + 192 + 70 = ?",
            options: ["292", "282", "302", "192"],
            answer: "292",
            mascotHint: "Nhóm (30 + 70) = 100 trước: 100 + 192 = 292.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Việt đi từ nhà qua cổng làng (182 m), rồi tới cây cổ thụ (75 m), rồi tới nhà Nam (218 m). Quãng đường dài bao nhiêu mét?",
            options: ["475 m", "465 m", "485 m", "400 m"],
            answer: "475 m",
            mascotHint: "Nhóm (182 + 218) = 400 trước: 400 + 75 = 475 (m).",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "a + b = b + a (giao hoán).",
              "(a + b) + c = a + (b + c) (kết hợp).",
              "Nhóm số để tính thuận tiện, cho kết quả nhanh và ít sai.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c5-l4",
      title: "Bài 25: Tìm hai số biết tổng và hiệu của hai số đó",
      type: "learn",
      description:
        "Giải bài toán tìm hai số khi biết tổng và hiệu bằng hai cách, dùng sơ đồ đoạn thẳng",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "curious",
            text: "Mai có 25 cái kẹo, muốn chia cho mình và Mi sao cho phần của Mi hơn phần của Mai 5 cái. Rô-bốt gợi ý: đưa trước 5 cái rồi chia đều phần còn lại! 🍬",
          },
        },
        {
          type: "concept",
          content: {
            badge: "Khám Phá",
            title: "Hai cách giải bài toán Tổng – Hiệu",
            explanation:
              "Bài toán cho biết tổng và hiệu của hai số. Nếu bớt đi phần hơn thì hai số bằng nhau, nên ta tìm số bé trước; hoặc thêm phần hơn thì cũng bằng nhau, ta tìm số lớn trước.",
            points: [
              "Số bé = (Tổng − Hiệu) : 2.",
              "Số lớn = (Tổng + Hiệu) : 2.",
              "Tìm được một số thì lấy Tổng trừ đi để ra số còn lại (hoặc cộng/trừ Hiệu).",
            ],
            rule: "Số lớn thì cộng hiệu, số bé thì trừ hiệu, rồi chia đôi.",
          },
        },
        {
          type: "visual",
          content: {
            text: "Chia 25 cái kẹo cho Mai và Mi, Mi hơn Mai 5 cái",
            table: {
              headers: ["Cách làm", "Phép tính", "Kết quả"],
              rows: [
                ["Hai lần số kẹo của Mai", "25 − 5 = 20", "20 cái"],
                ["Số kẹo của Mai", "20 : 2", "10 cái"],
                ["Số kẹo của Mi", "10 + 5", "15 cái"],
              ],
              label: "Thử lại: 10 + 15 = 25 và 15 − 10 = 5 ✓",
            },
          },
        },
        {
          type: "concept",
          content: {
            badge: "Cách Học",
            title: "Bốn bước làm một bài toán",
            explanation: "Mọi bài bài toán có lời văn đều đi theo cùng một đường. Bé làm đúng thứ tự thì không bỏ sót bước nào.",
            points: [
              "Bước 1 — Đọc kỹ đề, gạch dưới các SỐ và từ khoá (thêm, bớt, gấp, chia đều).",
              "Bước 2 — Tóm tắt đề bằng hình hoặc bằng câu ngắn: đã có gì, cần tìm gì.",
              "Bước 3 — Chọn phép tính: “thêm, gộp, tất cả” → cộng; “bớt, cho đi, còn lại” → trừ; “gấp mấy lần” → nhân.",
              "Bước 4 — Đặt tính rồi tính, rồi VIẾT ĐÁP SỐ kèm đơn vị và thử lại bằng phép ngược."
            ]
          }
        },
        {
          type: "visual",
          content: {
            table: {
              headers: ["Điều cần nhớ", "Nội dung"],
              rows: [
                ["Đơn vị", "đáp số luôn kèm đơn vị như con, quả, kg, cm"],
                ["Kiểm tra", "cộng thì lấy kết quả trừ đi một số hạng"],
                ["Câu trả lời", "viết đủ câu, không chỉ ghi số"]
              ]
            },
            text: "Bảng nhớ nhanh — bài toán có lời văn\nBa điều dưới đây bé đọc lại mỗi khi làm bài.\nTrước khi nộp bài, bé tự hỏi: đã đủ ba điều này chưa?"
          }
        },
        {
          type: "quiz",
          content: {
            question: "Giải một bài toán có lời văn, bé làm gì TRƯỚC TIÊN?",
            options: [
              "Đọc kỹ đề và gạch dưới các số đã cho",
              "Viết ngay đáp số",
              "Đoán kết quả",
              "Đặt tính trước khi đọc đề"
            ],
            answer: "Đọc kỹ đề và gạch dưới các số đã cho",
            mascotHint: "Chưa đọc kỹ đề thì chưa biết đề cho gì, hỏi gì — mọi bước sau đều dễ sai."
          }
        },
        {
          type: "quiz",
          content: {
            question:
              "Tổng của hai số là 25, hiệu của hai số là 5. Số bé là bao nhiêu?",
            options: ["10", "15", "20", "5"],
            answer: "10",
            mascotHint:
              "Số bé = (Tổng − Hiệu) : 2 = (25 − 5) : 2 = 20 : 2 = 10.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Tổng của hai số là 60, hiệu của hai số là 12. Số lớn là bao nhiêu?",
            options: ["36", "24", "48", "30"],
            answer: "36",
            mascotHint:
              "Số lớn = (Tổng + Hiệu) : 2 = (60 + 12) : 2 = 72 : 2 = 36.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Một lớp có 32 học sinh, số học sinh nữ ít hơn số học sinh nam 4 bạn. Hỏi lớp đó có bao nhiêu học sinh nữ?",
            options: ["14 bạn", "18 bạn", "16 bạn", "12 bạn"],
            answer: "14 bạn",
            mascotHint:
              "Nữ là số bé: (32 − 4) : 2 = 28 : 2 = 14 (bạn). Nam: 14 + 4 = 18 (bạn). Thử lại 14 + 18 = 32 ✓",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Số bé = (Tổng − Hiệu) : 2.",
              "Số lớn = (Tổng + Hiệu) : 2.",
              "Vẽ sơ đồ đoạn thẳng để nhìn rõ phần hơn kém.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
    {
      id: "g4-c5-l5",
      title: "Bài 26: Luyện tập chung",
      type: "learn",
      description:
        "Ôn tập phép cộng, phép trừ số có nhiều chữ số và bài toán Tổng – Hiệu",
      slides: [
        {
          type: "story",
          content: {
            mascotMood: "excited",
            text: "Hôm nay chúng mình ôn lại toàn bộ Chủ đề 5: cộng trừ số lớn, tính thuận tiện và bài toán Tổng – Hiệu. Cùng làm thử thách cuối chủ đề nhé! 🎯",
          },
        },
        {
          type: "visual",
          content: {
            text: "Tính rồi kiểm tra lại kết quả",
            table: {
              headers: ["Phép tính", "Kết quả", "Kiểm tra"],
              rows: [
                [
                  "207 460 + 290 953",
                  "498 413",
                  "498 413 − 290 953 = 207 460 ✓",
                ],
                [
                  "648 390 − 382 547",
                  "265 843",
                  "265 843 + 382 547 = 648 390 ✓",
                ],
                [
                  "180 510 + 210 365",
                  "390 875",
                  "390 875 − 210 365 = 180 510 ✓",
                ],
              ],
              label: "Cộng thì thử lại bằng trừ, trừ thì thử lại bằng cộng",
            },
          },
        },
        {
          type: "visual",
          content: {
            cotTinh: {
              left: 90,
              right: 53,
              sign: "−"
            },
            text: "Bé tự đặt tính: 90 − 53\nhàng đơn vị 0 < 3 nên mượn 1: 10 − 3 = 7, viết 7\nhàng chục 9 − 6 = 3, viết 3\nVậy 90 − 53 = 37."
          }
        },
        {
          type: "concept",
          content: {
            badge: "Chú Ý",
            title: "Vì sao ra 47 là sai?",
            explanation: "47 là kết quả khi bé quên bớt 1 chục sau khi mượn. Đây là lỗi hay gặp nhất của dạng trừ này.",
            points: [
              "Lỗi — quên bớt 1 chục sau khi mượn: hàng đơn vị 0 < 3 nên mượn 1: 10 − 3 = 7, viết 7. Kết quả đúng phải là 37.",
              "Cách tránh: làm xong một hàng thì ghi/xoá số đã vay NGAY, đừng để sang hàng sau mới nhớ.",
              "Tự kiểm tra: 37 + 53 phải bằng 90."
            ]
          }
        },
        {
          type: "quiz",
          content: {
            question: "83 − 66 bằng bao nhiêu?",
            options: [16, 17, 18, 27],
            answer: 17,
            mascotHint: "hàng đơn vị 3 < 6 nên mượn 1: 13 − 6 = 7, viết 7. Kết quả 17."
          }
        },
        {
          type: "quiz",
          content: {
            question: "Kết quả của phép tính 207 460 + 290 953 là:",
            options: ["498 413", "497 413", "498 313", "488 413"],
            answer: "498 413",
            mascotHint: "Cộng từ phải sang trái và nhớ 1 ở hàng nghìn.",
          },
        },
        {
          type: "quiz",
          content: {
            question:
              "Tổng của hai số là 90, hiệu của hai số là 16. Hai số đó là:",
            options: ["53 và 37", "50 và 40", "56 và 34", "54 và 36"],
            answer: "53 và 37",
            mascotHint:
              "Số lớn = (90 + 16) : 2 = 53; số bé = 90 − 53 = 37. Thử lại 53 − 37 = 16 ✓",
          },
        },
        {
          type: "quiz",
          content: {
            question: "Tính bằng cách thuận tiện: 68 + 207 + 132 = ?",
            options: ["407", "397", "417", "307"],
            answer: "407",
            mascotHint: "Nhóm (68 + 132) = 200 trước: 200 + 207 = 407.",
          },
        },
        {
          type: "summary",
          content: {
            title: "Ghi nhớ bài học:",
            points: [
              "Cộng, trừ số nhiều chữ số: thẳng cột, tính từ phải sang trái.",
              "Thử lại kết quả bằng phép tính ngược.",
              "Bài toán Tổng – Hiệu: tìm số bé hoặc số lớn trước đều được.",
            ],
            mascotMood: "proud",
          },
        },
      ],
    },
  ],
};
