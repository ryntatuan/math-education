# -*- coding: utf-8 -*-
import json

def generate_grade5_file():
    chapters = [
        {
            "id": "g5-c1",
            "name": "Chương 1: Ôn tập phân số, Giải toán tỉ lệ & Bảng đơn vị diện tích",
            "description": "Ôn tập phân số, phân số thập phân, hỗn số; giải toán tỉ lệ thuận/nghịch; bảng đơn vị đo diện tích dam², hm², ha",
            "icon": "🍰",
            "color": "#3b82f6",
            "totalLessons": 9,
            "lessons": [
                {
                    "id": "g5-c1-l1",
                    "title": "Bài 1: Khái niệm, tính chất cơ bản & So sánh phân số",
                    "description": "Ôn tập cấu tạo phân số, tính chất cơ bản nhân/chia cùng một số, quy tắc so sánh phân số",
                    "slides": [
                        {"type": "story", "content": {"mascotMood": "excited", "text": "Chào mừng các bạn đến với Toán Lớp 5! Robot và Cú Mèo sẽ cùng các bạn chinh phục năm học cuối cấp tiểu học thật xuất sắc nhé! 🦉🤖"}},
                        {"type": "visual", "content": {"text": "- Phân số có tử số và mẫu số (khác 0).\n- Tính chất cơ bản: Nhân hoặc chia cả tử và mẫu với cùng số khác 0 được phân số bằng nó.\n- So sánh cùng mẫu: tử số lớn hơn thì lớn hơn. Khác mẫu: quy đồng rồi so sánh."}},
                        {"type": "quiz", "content": {"question": "Phân số nào sau đây bằng phân số 3/5?", "options": ["9/15", "6/15", "9/10", "12/25"], "answer": "9/15", "mascotHint": "Nhân cả tử và mẫu với 3: 3×3 / 5×3 = 9/15!"}},
                        {"type": "quiz", "content": {"question": "Trong các phân số 4/7; 5/7; 3/7; 6/7, phân số lớn nhất là:", "options": ["6/7", "5/7", "4/7", "3/7"], "answer": "6/7", "mascotHint": "Cùng mẫu số 7, tử số 6 lớn nhất nên 6/7 lớn nhất!"}},
                        {"type": "summary", "content": {"title": "Ghi nhớ:", "points": ["Phân số tối giản không thể rút gọn thêm.", "So sánh với 1: Tử < Mẫu -> bé hơn 1; Tử > Mẫu -> lớn hơn 1."], "mascotMood": "proud"}}
                    ]
                },
                {
                    "id": "g5-c1-l2",
                    "title": "Bài 2: Phân số thập phân",
                    "description": "Các phân số có mẫu số là 10, 100, 1000... gọi là phân số thập phân",
                    "slides": [
                        {"type": "story", "content": {"mascotMood": "happy", "text": "Các phân số như 3/10, 25/100, 125/1000 có mẫu số là 10, 100, 1000... được gọi là PHÂN SỐ THẬP PHÂN! 💡"}},
                        {"type": "visual", "content": {"text": "Chuyển phân số thường thành phân số thập phân:\n- 1/2 = (1×5)/(2×5) = 5/10\n- 3/4 = (3×25)/(4×25) = 75/100\n- 7/20 = (7×5)/(20×5) = 35/100"}},
                        {"type": "quiz", "content": {"question": "Chuyển phân số 2/5 thành phân số thập phân có mẫu số 10:", "options": ["4/10", "2/10", "5/10", "6/10"], "answer": "4/10", "mascotHint": "Nhân cả tử và mẫu với 2: (2×2)/(5×2) = 4/10!"}},
                        {"type": "summary", "content": {"title": "Ghi nhớ:", "points": ["Phân số thập phân có mẫu số là 10, 100, 1000...", "Muốn chuyển về phân số thập phân: tìm số nhân sao cho mẫu là 10, 100, 1000..."], "mascotMood": "celebrate"}}
                    ]
                },
                {
                    "id": "g5-c1-l3",
                    "title": "Bài 3: Ôn tập bốn phép tính với phân số",
                    "description": "Cộng, trừ, nhân, chia phân số và bài toán tìm phân số của một số",
                    "slides": [
                        {"type": "story", "content": {"mascotMood": "happy", "text": "Cùng Robot ôn lại 4 phép tính phân số:\n- Cộng/trừ: quy đồng rồi tính.\n- Nhân: tử × tử, mẫu × mẫu.\n- Chia: nhân với phân số đảo ngược! 🔄"}},
                        {"type": "visual", "content": {"text": "Ví dụ tổng hợp:\n- 2/3 + 1/4 = 8/12 + 3/12 = 11/12\n- 3/5 × 10/9 = (3×10)/(5×9) = 30/45 = 2/3\n- 2/7 : 4/5 = 2/7 × 5/4 = 10/28 = 5/14"}},
                        {"type": "quiz", "content": {"question": "Tính: 3/4 - 1/3 = ?", "options": ["5/12", "2/1", "2/12", "1/12"], "answer": "5/12", "mascotHint": "9/12 - 4/12 = 5/12!"}},
                        {"type": "quiz", "content": {"question": "Tìm 3/5 của 45 kg:", "options": [27, 25, 30, 35], "answer": 27, "mascotHint": "45 × 3/5 = (45 × 3) : 5 = 27 kg!"}},
                        {"type": "summary", "content": {"title": "Quy tắc cốt lõi:", "points": ["Nhân: Tử nhân tử, mẫu nhân mẫu.", "Chia: Lấy phân số thứ nhất nhân phân số thứ hai đảo ngược."], "mascotMood": "proud"}}
                    ]
                },
                {
                    "id": "g5-c1-l4",
                    "title": "Bài 4: Hỗn số và các phép tính với hỗn số",
                    "description": "Khái niệm hỗn số gồm phần nguyên và phần phân số; cách chuyển hỗn số thành phân số",
                    "slides": [
                        {"type": "story", "content": {"mascotMood": "excited", "text": "Có 2 cái bánh nguyên và 3/4 cái bánh, ta viết là 2 3/4 (đọc là hai và ba phần tư)! Đó chính là HỖN SỐ! 🥞"}},
                        {"type": "visual", "content": {"text": "Chuyển hỗn số thành phân số:\nTử số = (Phần nguyên × Mẫu số) + Tử số cũ\nMẫu số = Giữ nguyên mẫu số cũ\nVí dụ: 2 3/4 = (2 × 4 + 3) / 4 = 11/4"}},
                        {"type": "quiz", "content": {"question": "Chuyển hỗn số 3 1/2 thành phân số:", "options": ["7/2", "5/2", "6/2", "4/2"], "answer": "7/2", "mascotHint": "(3 × 2 + 1) / 2 = 7/2!"}},
                        {"type": "summary", "content": {"title": "Công thức chuyển hỗn số:", "points": ["Tử số mới = Phần nguyên × Mẫu + Tử.", "Mẫu số mới giữ nguyên."], "mascotMood": "celebrate"}}
                    ]
                },
                {
                    "id": "g5-c1-l5",
                    "title": "Bài 5: Ôn tập và bổ sung về giải toán (Tỉ lệ thuận & nghịch)",
                    "description": "Phương pháp rút về đơn vị và phương pháp tìm tỉ số",
                    "slides": [
                        {"type": "story", "content": {"mascotMood": "thinking", "text": "Hai đại lượng tỉ lệ thuận: cái này tăng bao nhiêu lần thì cái kia tăng bấy nhiêu lần (mua nhiều bút tốn nhiều tiền). Tỉ lệ nghịch: cái này tăng bao nhiêu lần thì cái kia GIẢM bấy nhiêu lần (nhiều người làm thì tốn ít ngày)! ⚖️"}},
                        {"type": "visual", "content": {"text": "Ví dụ (Tỉ lệ thuận): Mua 5 quyển vở hết 40 000 đồng. Mua 8 quyển vở hết bao nhiêu tiền?\nCách 1: Rút về đơn vị: 1 quyển hết 40 000 : 5 = 8 000 đồng -> 8 quyển hết 8 000 × 8 = 64 000 đồng."}},
                        {"type": "quiz", "content": {"question": "Một ô tô đi trong 2 giờ được 90 km. Hỏi với vận tốc đó, ô tô đi trong 4 giờ được bao nhiêu km?", "options": [180, 160, 200, 135], "answer": 180, "mascotHint": "Thời gian gấp 4 : 2 = 2 lần -> Quãng đường = 90 × 2 = 180 km!"}},
                        {"type": "quiz", "content": {"question": "Có 10 người đắp xong đoạn đường trong 6 ngày. Hỏi muốn đắp xong trong 3 ngày cần bao nhiêu người? (Mức làm như nhau)", "options": [20, 15, 12, 18], "answer": 20, "mascotHint": "Tỉ lệ nghịch: Thời gian giảm 6 : 3 = 2 lần -> Số người phải gấp 2 lần: 10 × 2 = 20 người!"}},
                        {"type": "summary", "content": {"title": "Ghi nhớ 2 phương pháp:", "points": ["Phương pháp 1: Rút về đơn vị.", "Phương pháp 2: Tìm tỉ số."], "mascotMood": "proud"}}
                    ]
                },
                {
                    "id": "g5-c1-l6",
                    "title": "Bài 6: Bảng đơn vị đo độ dài & Bảng đơn vị đo khối lượng",
                    "description": "Hệ thống hóa km, hm, dam, m, dm, cm, mm và tấn, tạ, yến, kg, hg, dag, g",
                    "slides": [
                        {"type": "story", "content": {"mascotMood": "happy", "text": "Hai đơn vị đo độ dài (hoặc khối lượng) liền kề hơn kém nhau đúng 10 lần! Đơn vị lớn gấp 10 lần đơn vị bé, đơn vị bé bằng 1/10 đơn vị lớn! 📏"}},
                        {"type": "visual", "content": {"text": "- Bảng độ dài: km > hm > dam > m > dm > cm > mm (mỗi bước ×10 hoặc :10)\n- Bảng khối lượng: tấn > tạ > yến > kg > hg > dag > g"}},
                        {"type": "quiz", "content": {"question": "3 km 50 m bằng bao nhiêu mét?", "options": [3050, 3500, 3005, 350], "answer": 3050, "mascotHint": "3 km = 3000 m. 3000 + 50 = 3050 m!"}},
                        {"type": "summary", "content": {"title": "Ghi nhớ:", "points": ["Mỗi đơn vị đo độ dài/khối lượng gấp 10 lần đơn vị bé hơn liền kề.", "Mỗi đơn vị bé bằng 1/10 (hay 0,1) đơn vị lớn liền kề."], "mascotMood": "proud"}}
                    ]
                },
                {
                    "id": "g5-c1-l7",
                    "title": "Bài 7: Đề-ca-mét vuông (dam²), Héc-tô-mét vuông (hm²)",
                    "description": "Các đơn vị đo diện tích đất: 1 dam² = 100 m²; 1 hm² = 100 dam² = 10 000 m²",
                    "slides": [
                        {"type": "story", "content": {"mascotMood": "happy", "text": "Đề-ca-mét vuông (dam²) là diện tích hình vuông cạnh 1 dam (10 m). Héc-tô-mét vuông (hm²) là diện tích hình vuông cạnh 1 hm (100 m)! 🟩"}},
                        {"type": "visual", "content": {"text": "Bảng đơn vị đo diện tích:\nkm² > hm² > dam² > m² > dm² > cm² > mm²\nChú ý: Hai đơn vị đo diện tích liền nhau hơn kém nhau 100 LẦN!\n1 hm² = 100 dam² = 10 000 m²"}},
                        {"type": "quiz", "content": {"question": "2 hm² bằng bao nhiêu mét vuông?", "options": [20000, 2000, 200, 200000], "answer": 20000, "mascotHint": "1 hm² = 10 000 m² nên 2 hm² = 20 000 m²!"}},
                        {"type": "summary", "content": {"title": "Ghi nhớ bảng diện tích:", "points": ["Mỗi đơn vị đo diện tích gấp 100 lần đơn vị bé hơn liền sau.", "1 hm² = 100 dam² = 10 000 m²."], "mascotMood": "celebrate"}}
                    ]
                },
                {
                    "id": "g5-c1-l8",
                    "title": "Bài 8: Héc-ta (ha)",
                    "description": "Đơn vị đo diện tích đất nông, lâm nghiệp: 1 ha = 1 hm² = 10 000 m²",
                    "slides": [
                        {"type": "story", "content": {"mascotMood": "excited", "text": "Trong đời sống thực tế, người ta thường dùng đơn vị Héc-ta (viết tắt là ha) để đo diện tích các trang trại, cánh đồng lúa, cánh rừng! 🌾🌲"}},
                        {"type": "visual", "content": {"text": "Quy đổi héc-ta:\n1 ha = 1 hm² = 10 000 m²\n1 km² = 100 ha\nMột sân bóng đá tiêu chuẩn có diện tích gần bằng 1 ha đấy!"}},
                        {"type": "quiz", "content": {"question": "Khu rừng có diện tích 5 ha, diện tích khu rừng đó bằng bao nhiêu mét vuông?", "options": ["50 000 m²", "5 000 m²", "500 m²", "500 000 m²"], "answer": "50 000 m²", "mascotHint": "1 ha = 10 000 m² nên 5 ha = 50 000 m²!"}},
                        {"type": "quiz", "content": {"question": "Đổi: 4 km² = ... ha", "options": [400, 40, 4000, 40000], "answer": 400, "mascotHint": "1 km² = 100 ha nên 4 km² = 400 ha!"}},
                        {"type": "summary", "content": {"title": "Ghi nhớ héc-ta:", "points": ["1 ha = 10 000 m²", "1 km² = 100 ha"], "mascotMood": "proud"}}
                    ]
                },
                {
                    "id": "g5-c1-l9",
                    "title": "Bài 9: Luyện tập chung Chương 1",
                    "description": "Tổng kết kiến thức phân số, toán tỉ lệ và bảng đơn vị đo diện tích",
                    "slides": [
                        {"type": "story", "content": {"mascotMood": "proud", "text": "Bé đã hoàn thành xuất sắc Chương 1! Cùng Cú Mèo làm bài thử thách tổng kết nào! 🏅"}},
                        {"type": "quiz", "content": {"question": "Một mảnh đất hình chữ nhật có chiều dài 200 m, chiều rộng 100 m. Diện tích mảnh đất đó là bao nhiêu héc-ta?", "options": ["2 ha", "20 ha", "0,2 ha", "200 ha"], "answer": "2 ha", "mascotHint": "Diện tích = 200 × 100 = 20 000 m². 20 000 m² = 2 ha!"}},
                        {"type": "summary", "content": {"title": "Hoàn thành Chương 1:", "points": ["Vững vàng phân số và hỗn số.", "Thành thạo chuyển đổi đơn vị đo diện tích và ha."], "mascotMood": "celebrate"}}
                    ]
                }
            ]
        },
        {
            "id": "g5-c2",
            "name": "Chương 2: Số thập phân & Các phép tính số thập phân",
            "description": "Khái niệm, các hàng của số thập phân; cộng, trừ, nhân, chia số thập phân; tỉ số phần trăm và 3 bài toán tỉ số %",
            "icon": "🔢",
            "color": "#10b981",
            "totalLessons": 10,
            "lessons": [
                {
                    "id": "g5-c2-l1",
                    "title": "Bài 10: Khái niệm & Hàng của số thập phân",
                    "description": "Phần nguyên đứng trước dấu phẩy, phần thập phân đứng sau; hàng phần mười, hàng phần trăm, hàng phần nghìn",
                    "slides": [
                        {"type": "story", "content": {"mascotMood": "happy", "text": "Mỗi số thập phân gồm hai phần: Phần nguyên (bên trái dấu phẩy) và Phần thập phân (bên phải dấu phẩy)! Ví dụ: 8,56 gồm phần nguyên 8 và phần thập phân 56 phần trăm! 🎯"}},
                        {"type": "visual", "content": {"text": "Cấu tạo số thập phân 375,429:\n- Phần nguyên: 3 trăm, 7 chục, 5 đơn vị\n- Dấu phẩy ngăn cách\n- Phần thập phân: 4 phần mười (hàng phần mười), 2 phần trăm (hàng phần trăm), 9 phần nghìn (hàng phần nghìn)"}},
                        {"type": "quiz", "content": {"question": "Trong số thập phân 18,256, chữ số 5 thuộc hàng nào?", "options": ["Hàng phần trăm", "Hàng phần mười", "Hàng phần nghìn", "Hàng chục"], "answer": "Hàng phần trăm", "mascotHint": "Đứng ngay sau dấu phẩy là phần mười (2), tiếp theo là phần trăm (5)!"}},
                        {"type": "quiz", "content": {"question": "Phân số thập phân 7/100 viết dưới dạng số thập phân là:", "options": ["0,07", "0,7", "7,0", "0,007"], "answer": "0,07", "mascotHint": "Mẫu số có hai chữ số 0 nên có 2 chữ số sau dấu phẩy: 0,07!"}},
                        {"type": "summary", "content": {"title": "Ghi nhớ cấu tạo:", "points": ["Phần nguyên bên trái, phần thập phân bên phải dấu phẩy.", "Các hàng phần thập phân: phần mười, phần trăm, phần nghìn..."], "mascotMood": "proud"}}
                    ]
                },
                {
                    "id": "g5-c2-l2",
                    "title": "Bài 11: Số thập phân bằng nhau & So sánh số thập phân",
                    "description": "Thêm hoặc bớt chữ số 0 ở bên phải phần thập phân giá trị không đổi; so sánh phần nguyên trước rồi đến phần thập phân",
                    "slides": [
                        {"type": "story", "content": {"mascotMood": "excited", "text": "Nếu viết thêm (hoặc xóa bớt) chữ số 0 ở tận cùng bên phải phần thập phân thì được một số thập phân bằng nó! Ví dụ: 0,9 = 0,90 = 0,900! ✨"}},
                        {"type": "visual", "content": {"text": "Quy tắc so sánh hai số thập phân:\n1. So sánh phần nguyên: Số nào có phần nguyên lớn hơn thì lớn hơn (ví dụ: 12,5 > 9,89).\n2. Nếu phần nguyên bằng nhau: So sánh lần lượt từng hàng ở phần thập phân từ trái sang phải: hàng phần mười, phần trăm, phần nghìn..."}},
                        {"type": "quiz", "content": {"question": "Điền dấu thích hợp: 7,85 ... 7,9", "options": ["<", ">", "="], "answer": "<", "mascotHint": "Phần nguyên bằng 7. Hàng phần mười: 8 < 9 nên 7,85 < 7,90!"}},
                        {"type": "quiz", "content": {"question": "Số nào bé nhất trong các số: 5,4; 5,04; 5,404; 5,004?", "options": ["5,004", "5,04", "5,4", "5,404"], "answer": "5,004", "mascotHint": "Hàng phần nghìn nhỏ nhất: 5,004 có phần thập phân 0,004 bé nhất!"}},
                        {"type": "summary", "content": {"title": "Ghi nhớ:", "points": ["0,5 = 0,50 = 0,500.", "So sánh phần nguyên trước; nếu bằng nhau thì so sánh hàng phần mười, phần trăm..."], "mascotMood": "celebrate"}}
                    ]
                },
                {
                    "id": "g5-c2-l3",
                    "title": "Bài 12: Viết số đo đại lượng dưới dạng số thập phân",
                    "description": "Viết số đo độ dài, khối lượng, diện tích bằng số thập phân (ví dụ: 3 m 5 dm = 3,5 m)",
                    "slides": [
                        {"type": "story", "content": {"mascotMood": "happy", "text": "Số thập phân giúp ta viết số đo đại lượng vô cùng gọn gàng! Ví dụ: 2 m 7 cm = 2 và 7/100 m = 2,07 m! 📏"}},
                        {"type": "visual", "content": {"text": "Cách chuyển đổi:\n- Độ dài: 5 m 6 dm = 5,6 m; 4 km 250 m = 4,25 km\n- Khối lượng: 2 kg 50 g = 2,05 kg; 3 tấn 500 kg = 3,5 tấn\n- Diện tích: 4 m² 25 dm² = 4,25 m² (vì 1 m² = 100 dm²)"}},
                        {"type": "quiz", "content": {"question": "Viết số đo 3 m 45 cm dưới dạng số thập phân có đơn vị là mét:", "options": ["3,45 m", "34,5 m", "0,345 m", "3,045 m"], "answer": "3,45 m", "mascotHint": "45 cm = 45/100 m = 0,45 m -> 3,45 m!"}},
                        {"type": "summary", "content": {"title": "Ghi nhớ quy tắc đổi:", "points": ["Xác định mối quan hệ giữa 2 đơn vị.", "Viết dưới dạng hỗn số rồi chuyển sang số thập phân."], "mascotMood": "proud"}}
                    ]
                },
                {
                    "id": "g5-c2-l4",
                    "title": "Bài 13: Phép cộng số thập phân & Tổng nhiều số",
                    "description": "Đặt tính sao cho các chữ số ở cùng một hàng và dấu phẩy thẳng cột với nhau",
                    "slides": [
                        {"type": "story", "content": {"mascotMood": "happy", "text": "Quy tắc vàng khi cộng số thập phân: Đặt các dấu phẩy thẳng cột với nhau! Cộng như cộng số tự nhiên rồi hạ dấu phẩy thẳng cột xuống kết quả! ➕"}},
                        {"type": "visual", "content": {"text": "Đặt tính cộng:\n   15,82\n+   9,35\n--------\n   25,17\n(Hạ dấu phẩy thẳng cột xuống giữa 25 và 17)"}},
                        {"type": "quiz", "content": {"question": "Tính: 38,5 + 24,15 = ?", "options": ["62,65", "62,20", "63,65", "62,55"], "answer": "62,65", "mascotHint": "38,50 + 24,15 = 62,65!"}},
                        {"type": "summary", "content": {"title": "Ghi nhớ:", "points": ["Dấu phẩy thẳng cột.", "Cộng như số tự nhiên, nhớ hạ dấu phẩy."], "mascotMood": "proud"}}
                    ]
                },
                {
                    "id": "g5-c2-l5",
                    "title": "Bài 14: Phép trừ hai số thập phân",
                    "description": "Đặt tính dấu phẩy thẳng cột; thêm số 0 vào phần thập phân nếu cần để trừ",
                    "slides": [
                        {"type": "story", "content": {"mascotMood": "happy", "text": "Khi trừ số thập phân, nếu số chữ số phần thập phân của số bị trừ ít hơn số trừ, ta có thể viết thêm các chữ số 0 vào bên phải để trừ dễ dàng! ➖"}},
                        {"type": "visual", "content": {"text": "Ví dụ: 45,8 - 19,25\nViết thành: 45,80 - 19,25 = 26,55"}},
                        {"type": "quiz", "content": {"question": "Tính: 50 - 23,75 = ?", "options": ["26,25", "27,25", "26,35", "27,35"], "answer": "26,25", "mascotHint": "50,00 - 23,75 = 26,25!"}},
                        {"type": "summary", "content": {"title": "Ghi nhớ phép trừ:", "points": ["Viết thêm số 0 vào bên phải phần thập phân nếu cần.", "Dấu phẩy luôn thẳng hàng."], "mascotMood": "celebrate"}}
                    ]
                },
                {
                    "id": "g5-c2-l6",
                    "title": "Bài 15: Phép nhân số thập phân",
                    "description": "Nhân như nhân số tự nhiên; đếm số chữ số phần thập phân của cả hai thừa số để tách dấu phẩy",
                    "slides": [
                        {"type": "story", "content": {"mascotMood": "excited", "text": "Quy tắc nhân số thập phân: Nhân như số tự nhiên! Sau đó đếm xem trong phần thập phân của cả hai thừa số có bao nhiêu chữ số rồi dùng dấu phẩy tách ở tích ra bấy nhiêu chữ số kể từ phải sang trái! ✖️"}},
                        {"type": "visual", "content": {"text": "Ví dụ: 2,35 × 1,4\n- Nhân 235 × 14 = 3290\n- Hai thừa số có 2 + 1 = 3 chữ số ở phần thập phân\n- Tách 3 chữ số từ phải sang trái: 3,290 = 3,29\nNhân nhẩm với 10, 100, 1000: Dịch dấu phẩy sang phải 1, 2, 3 chữ số!"}},
                        {"type": "quiz", "content": {"question": "Tính: 3,45 × 10 = ?", "options": [34.5, 345, 0.345, 3450], "answer": 34.5, "mascotHint": "Chuyển dấu phẩy sang bên phải một chữ số: 34,5!"}},
                        {"type": "quiz", "content": {"question": "Tính: 1,2 × 0,4 = ?", "options": [0.48, 4.8, 0.048, 48], "answer": 0.48, "mascotHint": "12 × 4 = 48. Có 1 + 1 = 2 chữ số thập phân -> 0,48!"}},
                        {"type": "summary", "content": {"title": "Ghi nhớ:", "points": ["Nhân như số tự nhiên.", "Đếm tổng số chữ số thập phân của 2 thừa số rồi tách ở tích."], "mascotMood": "proud"}}
                    ]
                },
                {
                    "id": "g5-c2-l7",
                    "title": "Bài 16: Phép chia số thập phân",
                    "description": "Chia số thập phân cho số tự nhiên; chia cho 10, 100; chia số tự nhiên cho số tự nhiên ra thương thập phân; chia cho số thập phân",
                    "slides": [
                        {"type": "story", "content": {"mascotMood": "thinking", "text": "Chia số thập phân cho số tự nhiên: Chia phần nguyên trước, trước khi lấy chữ số đầu tiên của phần thập phân thì viết dấu phẩy vào bên phải thương! ➗"}},
                        {"type": "visual", "content": {"text": "Chia cho số thập phân (ví dụ: 12 : 2,5):\n- Số chia có 1 chữ số thập phân, ta chuyển dấu phẩy ở cả hai số sang phải 1 vị trí: thành 120 : 25 = 4,8!\nChia nhẩm cho 10, 100, 1000: Dịch dấu phẩy sang TRÁI 1, 2, 3 chữ số."}},
                        {"type": "quiz", "content": {"question": "Tính: 45,6 : 10 = ?", "options": [4.56, 456, 0.456, 45.6], "answer": 4.56, "mascotHint": "Dịch dấu phẩy sang trái 1 chữ số: 4,56!"}},
                        {"type": "quiz", "content": {"question": "Tính: 15 : 4 = ?", "options": [3.75, 3.5, 3.25, 4], "answer": 3.75, "mascotHint": "15 : 4 = 3 dư 3. Thêm dấu phẩy và thêm 0: 30 : 4 = 7 dư 2; 20 : 4 = 5 -> 3,75!"}},
                        {"type": "summary", "content": {"title": "Ghi nhớ phép chia:", "points": ["Đặt dấu phẩy vào thương ngay khi chia sang phần thập phân.", "Bỏ dấu phẩy ở số chia bằng cách chuyển dấu phẩy ở cả 2 số sang phải."], "mascotMood": "celebrate"}}
                    ]
                },
                {
                    "id": "g5-c2-l8",
                    "title": "Bài 17: Tỉ số phần trăm",
                    "description": "Khái niệm tỉ số phần trăm và ký hiệu % (1% = 1/100)",
                    "slides": [
                        {"type": "story", "content": {"mascotMood": "excited", "text": "1 phần trăm viết là 1%! 100 phần trăm là 100% (toàn bộ). Tỉ số phần trăm xuất hiện khắp nơi trong đời sống: giảm giá 20%, pin điện thoại 85%! 📱🏷️"}},
                        {"type": "visual", "content": {"text": "Cách viết:\n- 1/100 = 0,01 = 1%\n- 35/100 = 0,35 = 35%\n- 3/4 = 75/100 = 75%\nMuốn tìm tỉ số phần trăm của hai số a và b:\n1. Tìm thương của a và b: a : b\n2. Nhân thương đó với 100 và viết thêm ký hiệu %."}},
                        {"type": "quiz", "content": {"question": "Tỉ số phần trăm của 3 và 5 là:", "options": ["60%", "30%", "50%", "75%"], "answer": "60%", "mascotHint": "3 : 5 = 0,6 = 60%!"}},
                        {"type": "summary", "content": {"title": "Ghi nhớ:", "points": ["a : b = thương -> thương × 100 rồi thêm ký hiệu %.", "100% = 1."], "mascotMood": "proud"}}
                    ]
                },
                {
                    "id": "g5-c2-l9",
                    "title": "Bài 18: Giải toán về tỉ số phần trăm (3 bài toán cơ bản)",
                    "description": "1. Tìm tỉ số % của 2 số; 2. Tìm giá trị % của 1 số; 3. Tìm 1 số biết giá trị % của nó",
                    "slides": [
                        {"type": "story", "content": {"mascotMood": "excited", "text": "3 bài toán tỉ số phần trăm kinh điển:\n1. Tìm tỉ số %: a : b × 100%\n2. Tìm a% của B: B × a : 100\n3. Tìm số biết a% là B: B : a × 100! 💡"}},
                        {"type": "visual", "content": {"text": "Ví dụ: Lớp có 40 học sinh, trong đó có 60% là nữ.\nSố học sinh nữ là: 40 × 60 : 100 = 24 học sinh."}},
                        {"type": "quiz", "content": {"question": "Tìm 25% của 80 kg gạo:", "options": [20, 25, 30, 15], "answer": 20, "mascotHint": "80 × 25 : 100 = 20 kg!"}},
                        {"type": "quiz", "content": {"question": "Biết 30% của một số là 45. Số đó là:", "options": [150, 120, 135, 160], "answer": 150, "mascotHint": "45 : 30 × 100 = 1,5 × 100 = 150!"}},
                        {"type": "summary", "content": {"title": "3 Công thức vàng:", "points": ["Dạng 1: a : b × 100%", "Dạng 2: B × % : 100", "Dạng 3: B : % × 100"], "mascotMood": "celebrate"}}
                    ]
                },
                {
                    "id": "g5-c2-l10",
                    "title": "Bài 19: Máy tính bỏ túi & Luyện tập chung Chương 2",
                    "description": "Làm quen các phím cơ bản trên máy tính bỏ túi và ôn tập số thập phân",
                    "slides": [
                        {"type": "story", "content": {"mascotMood": "happy", "text": "Máy tính bỏ túi là công cụ đắc lực giúp kiểm tra lại kết quả tính toán nhanh chóng! Nhớ sử dụng phím ON/C để bật và xóa màn hình nhé! 📲"}},
                        {"type": "quiz", "content": {"question": "Tính nhẩm: 4,5 × 0,1 = ?", "options": [0.45, 45, 0.045, 4.5], "answer": 0.45, "mascotHint": "Nhân với 0,1 bằng chia cho 10: 4,5 : 10 = 0,45!"}},
                        {"type": "summary", "content": {"title": "Tổng kết Chương 2:", "points": ["Thành thạo 4 phép tính với số thập phân.", "Vận dụng linh hoạt 3 bài toán tỉ số phần trăm."], "mascotMood": "celebrate"}}
                    ]
                }
            ]
        },
        {
            "id": "g5-c3",
            "name": "Chương 3: Hình học & Thể tích hình khối",
            "description": "Diện tích hình tam giác, hình thang; chu vi & diện tích hình tròn; diện tích xung quanh, toàn phần và thể tích hình hộp chữ nhật, lập phương",
            "icon": "📐",
            "color": "#f59e0b",
            "totalLessons": 9,
            "lessons": [
                {
                    "id": "g5-c3-l1",
                    "title": "Bài 20: Hình tam giác & Diện tích hình tam giác",
                    "description": "Đáy và đường cao tương ứng; Công thức diện tích S = (a × h) : 2",
                    "slides": [
                        {"type": "story", "content": {"mascotMood": "excited", "text": "Muốn tính diện tích hình tam giác: Lấy độ dài đáy nhân với chiều cao (cùng đơn vị đo) rồi chia cho 2! 📐"}},
                        {"type": "visual", "content": {"text": "Công thức:\nS = (a × h) : 2\nTrong đó: a là độ dài đáy, h là chiều cao tương ứng."}},
                        {"type": "quiz", "content": {"question": "Một hình tam giác có đáy 10 cm và chiều cao 8 cm. Diện tích của hình tam giác là:", "options": ["40 cm²", "80 cm²", "20 cm²", "18 cm²"], "answer": "40 cm²", "mascotHint": "S = (10 × 8) : 2 = 80 : 2 = 40 cm²!"}},
                        {"type": "summary", "content": {"title": "Công thức tam giác:", "points": ["S = (đáy × cao) : 2", "Độ dài đáy = (S × 2) : h; Chiều cao = (S × 2) : a"], "mascotMood": "proud"}}
                    ]
                },
                {
                    "id": "g5-c3-l2",
                    "title": "Bài 21: Hình thang & Diện tích hình thang",
                    "description": "Đáy lớn, đáy bé, chiều cao; Công thức diện tích S = ((a + b) × h) : 2",
                    "slides": [
                        {"type": "story", "content": {"mascotMood": "happy", "text": "Bài ca hình thang quen thuộc: Muốn tính diện tích hình thang / Đáy lớn đáy bé ta mang cộng vào / Thế rồi nhân với chiều cao / Chia đôi lấy nửa thế nào cũng ra! 🎶"}},
                        {"type": "visual", "content": {"text": "Công thức diện tích hình thang:\nS = (a + b) × h : 2\nTrong đó:\n- a là đáy lớn\n- b là đáy bé\n- h là chiều cao (cùng đơn vị đo)"}},
                        {"type": "quiz", "content": {"question": "Hình thang có đáy lớn 12 cm, đáy bé 8 cm và chiều cao 5 cm. Diện tích là:", "options": ["50 cm²", "100 cm²", "40 cm²", "48 cm²"], "answer": "50 cm²", "mascotHint": "S = (12 + 8) × 5 : 2 = 20 × 5 : 2 = 100 : 2 = 50 cm²!"}},
                        {"type": "summary", "content": {"title": "Công thức hình thang:", "points": ["S = (đáy lớn + đáy bé) × chiều cao : 2", "Nhớ đưa về cùng đơn vị đo trước khi tính."], "mascotMood": "celebrate"}}
                    ]
                },
                {
                    "id": "g5-c3-l3",
                    "title": "Bài 22: Hình tròn & Chu vi hình tròn",
                    "description": "Bán kính r, đường kính d (d = 2 × r); Chu vi C = d × 3,14 = r × 2 × 3,14",
                    "slides": [
                        {"type": "story", "content": {"mascotMood": "happy", "text": "Hình tròn có tâm O, bán kính r và đường kính d = 2 × r. Số 3,14 là số Pi kỳ diệu gắn liền với mọi hình tròn! ⭕"}},
                        {"type": "visual", "content": {"text": "Công thức tính chu vi hình tròn:\nC = d × 3,14\nhoặc C = r × 2 × 3,14\n(d là đường kính, r là bán kính)"}},
                        {"type": "quiz", "content": {"question": "Một hình tròn có bán kính r = 5 cm. Chu vi hình tròn đó là:", "options": ["31,4 cm", "15,7 cm", "78,5 cm", "314 cm"], "answer": "31,4 cm", "mascotHint": "C = 5 × 2 × 3,14 = 10 × 3,14 = 31,4 cm!"}},
                        {"type": "summary", "content": {"title": "Ghi nhớ chu vi hình tròn:", "points": ["C = d × 3,14 = r × 2 × 3,14", "Đường kính = Chu vi : 3,14."], "mascotMood": "proud"}}
                    ]
                },
                {
                    "id": "g5-c3-l4",
                    "title": "Bài 23: Diện tích hình tròn",
                    "description": "Công thức tính diện tích hình tròn: S = r × r × 3,14",
                    "slides": [
                        {"type": "story", "content": {"mascotMood": "excited", "text": "Muốn tính diện tích hình tròn: Lấy bán kính nhân với bán kính rồi nhân với số 3,14! 🎯"}},
                        {"type": "visual", "content": {"text": "Công thức:\nS = r × r × 3,14\nTrong đó: r là bán kính hình tròn."}},
                        {"type": "quiz", "content": {"question": "Một hình tròn có bán kính r = 2 cm. Diện tích hình tròn đó là:", "options": ["12,56 cm²", "6,28 cm²", "25,12 cm²", "12 cm²"], "answer": "12,56 cm²", "mascotHint": "S = 2 × 2 × 3,14 = 4 × 3,14 = 12,56 cm²!"}},
                        {"type": "summary", "content": {"title": "Ghi nhớ diện tích hình tròn:", "points": ["S = r × r × 3,14", "Nếu đề bài cho đường kính d: tính r = d : 2 trước."], "mascotMood": "celebrate"}}
                    ]
                },
                {
                    "id": "g5-c3-l5",
                    "title": "Bài 24: Biểu đồ hình quạt",
                    "description": "Biểu đồ hình tròn chia thành từng hình quạt biểu thị tỉ lệ phần trăm",
                    "slides": [
                        {"type": "story", "content": {"mascotMood": "happy", "text": "Biểu đồ hình quạt giống như một chiếc bánh pizza tròn được cắt thành từng miếng quạt! Toàn bộ hình tròn tương ứng với 100%! 🍕📊"}},
                        {"type": "visual", "content": {"text": "Ví dụ: Biểu đồ kết quả học tập:\n- Xuất sắc: 50% (nửa hình tròn)\n- Tốt: 30%\n- Hoàn thành: 20%\nTổng phần trăm luôn bằng 100%."}},
                        {"type": "quiz", "content": {"question": "Nếu trường có 400 học sinh, trong đó có 25% học sinh xếp loại xuất sắc. Số học sinh xuất sắc là:", "options": [100, 80, 120, 50], "answer": 100, "mascotHint": "400 × 25 : 100 = 100 học sinh!"}},
                        {"type": "summary", "content": {"title": "Ghi nhớ:", "points": ["Cả hình tròn = 100%.", "Nửa hình tròn = 50%, một phần tư hình tròn = 25%."], "mascotMood": "proud"}}
                    ]
                },
                {
                    "id": "g5-c3-l6",
                    "title": "Bài 25: Hình hộp chữ nhật & Hình lập phương",
                    "description": "Nhận biết 6 mặt, 8 đỉnh, 12 cạnh; các kích thước: chiều dài, chiều rộng, chiều cao",
                    "slides": [
                        {"type": "story", "content": {"mascotMood": "happy", "text": "Bao diêm, viên gạch có dạng hình hộp chữ nhật! Con súc sắc có dạng hình lập phương! Cả hai hình đều có: 6 mặt, 8 đỉnh và 12 cạnh! 🎲📦"}},
                        {"type": "visual", "content": {"text": "- Hình hộp chữ nhật: Có 3 kích thước: chiều dài a, chiều rộng b, chiều cao c. 6 mặt đều là hình chữ nhật.\n- Hình lập phương: Là hình hộp chữ nhật đặc biệt có chiều dài = chiều rộng = chiều cao (6 mặt là hình vuông bằng nhau)."}},
                        {"type": "quiz", "content": {"question": "Hình lập phương có mấy mặt, mấy đỉnh, mấy cạnh?", "options": ["6 mặt, 8 đỉnh, 12 cạnh", "6 mặt, 12 đỉnh, 8 cạnh", "8 mặt, 6 đỉnh, 12 cạnh", "4 mặt, 4 đỉnh, 6 cạnh"], "answer": "6 mặt, 8 đỉnh, 12 cạnh", "mascotHint": "Ghi nhớ: 6 mặt, 8 đỉnh, 12 cạnh!"}},
                        {"type": "summary", "content": {"title": "Ghi nhớ:", "points": ["Hình lập phương có 6 mặt là các hình vuông bằng nhau.", "Hình hộp chữ nhật có các mặt đối diện bằng nhau."], "mascotMood": "proud"}}
                    ]
                },
                {
                    "id": "g5-c3-l7",
                    "title": "Bài 26: Diện tích xung quanh & Toàn phần hình hộp, lập phương",
                    "description": "Sxq = Chu vi đáy × Chiều cao; Stp = Sxq + Diện tích 2 đáy",
                    "slides": [
                        {"type": "story", "content": {"mascotMood": "excited", "text": "Diện tích xung quanh là tổng diện tích 4 mặt bên! Còn diện tích toàn phần là lấy diện tích xung quanh cộng thêm 2 mặt đáy! 📦"}},
                        {"type": "visual", "content": {"text": "1. Hình hộp chữ nhật:\n- Sxq = (a + b) × 2 × c (Chu vi đáy × Chiều cao)\n- Stp = Sxq + 2 × (a × b)\n2. Hình lập phương (cạnh a):\n- Sxq = a × a × 4\n- Stp = a × a × 6"}},
                        {"type": "quiz", "content": {"question": "Một hình lập phương có cạnh 5 cm. Diện tích toàn phần của nó là:", "options": ["150 cm²", "100 cm²", "125 cm²", "25 cm²"], "answer": "150 cm²", "mascotHint": "Stp = a × a × 6 = 5 × 5 × 6 = 25 × 6 = 150 cm²!"}},
                        {"type": "summary", "content": {"title": "Công thức cốt lõi:", "points": ["Hộp chữ nhật: Sxq = Chu vi đáy × Cao; Stp = Sxq + 2 đáy.", "Lập phương: Sxq = a × a × 4; Stp = a × a × 6."], "mascotMood": "celebrate"}}
                    ]
                },
                {
                    "id": "g5-c3-l8",
                    "title": "Bài 27: Thể tích hình hộp chữ nhật & Hình lập phương",
                    "description": "cm³, dm³, m³; 1 dm³ = 1 lít = 1000 cm³; V hộp = a × b × c; V lập phương = a × a × a",
                    "slides": [
                        {"type": "story", "content": {"mascotMood": "happy", "text": "Thể tích cho biết một vật chiếm bao nhiêu khoảng không gian! Thể tích hình hộp bằng tích 3 kích thước: dài × rộng × cao! 🧊"}},
                        {"type": "visual", "content": {"text": "Công thức thể tích:\n- Hình hộp chữ nhật: V = a × b × c\n- Hình lập phương: V = a × a × a\nĐơn vị đo thể tích:\n1 m³ = 1000 dm³ = 1 000 000 cm³\nĐặc biệt: 1 dm³ = 1 lít (l)!"}},
                        {"type": "quiz", "content": {"question": "Một hình hộp chữ nhật có dài 6 cm, rộng 4 cm, cao 5 cm. Thể tích là:", "options": ["120 cm³", "60 cm³", "15 cm³", "100 cm³"], "answer": "120 cm³", "mascotHint": "V = a × b × c = 6 × 4 × 5 = 120 cm³!"}},
                        {"type": "quiz", "content": {"question": "Hình lập phương có cạnh 3 dm. Thể tích của nó là bao nhiêu lít?", "options": ["27 lít", "9 lít", "18 lít", "270 lít"], "answer": "27 lít", "mascotHint": "V = 3 × 3 × 3 = 27 dm³ = 27 lít!"}},
                        {"type": "summary", "content": {"title": "Ghi nhớ thể tích:", "points": ["V hộp = a × b × c", "V lập phương = a × a × a", "1 m³ = 1000 dm³; 1 dm³ = 1 lít = 1000 cm³."], "mascotMood": "proud"}}
                    ]
                },
                {
                    "id": "g5-c3-l9",
                    "title": "Bài 28: Hình trụ, Hình cầu & Luyện tập chung",
                    "description": "Nhận biết hình trụ (hộp sữa, lon nước), hình cầu (quả bóng, trái đất) và ôn tập hình học",
                    "slides": [
                        {"type": "story", "content": {"mascotMood": "excited", "text": "Lon nước ngọt có dạng hình trụ (gồm 2 mặt đáy là hình tròn bằng nhau và 1 mặt xung quanh). Quả bóng tròn xoe có dạng hình cầu! ⚽🥫"}},
                        {"type": "quiz", "content": {"question": "Vật nào sau đây có dạng hình trụ?", "options": ["Hộp sữa đặc Ông Thọ", "Quả bóng đá", "Viên gạch", "Kim tự tháp"], "answer": "Hộp sữa đặc Ông Thọ", "mascotHint": "Hộp sữa đặc hình trụ với 2 đáy là 2 hình tròn bằng nhau!"}},
                        {"type": "summary", "content": {"title": "Tổng kết Hình học:", "points": ["Nắm chắc diện tích tam giác, thang, tròn.", "Thành thạo diện tích và thể tích hình hộp, lập phương."], "mascotMood": "celebrate"}}
                    ]
                }
            ]
        },
        {
            "id": "g5-c4",
            "name": "Chương 4: Số đo thời gian & Toán chuyển động đều",
            "description": "Bảng đơn vị đo thời gian, phép tính thời gian; toán chuyển động đều: vận tốc, quãng đường, thời gian; hai chuyển động ngược chiều, cùng chiều",
            "icon": "🏎️",
            "color": "#ec4899",
            "totalLessons": 6,
            "lessons": [
                {
                    "id": "g5-c4-l1",
                    "title": "Bài 29: Bảng đơn vị đo thời gian & Cộng, trừ số đo thời gian",
                    "description": "Năm, tháng, ngày, giờ, phút, giây; Đặt tính cộng trừ số đo thời gian",
                    "slides": [
                        {"type": "story", "content": {"mascotMood": "happy", "text": "1 năm = 12 tháng. 1 ngày = 24 giờ. 1 giờ = 60 phút. 1 phút = 60 giây! Khi cộng trừ thời gian, ta đặt thẳng cột theo từng đơn vị đo! ⏳"}},
                        {"type": "visual", "content": {"text": "Ví dụ cộng: 3 giờ 15 phút + 2 giờ 35 phút = 5 giờ 50 phút.\nVí dụ trừ: 4 giờ 20 phút - 1 giờ 35 phút\nĐổi: 4 giờ 20 phút = 3 giờ 80 phút. Trừ: 3 giờ 80 phút - 1 giờ 35 phút = 2 giờ 45 phút!"}},
                        {"type": "quiz", "content": {"question": "Tính: 2 giờ 30 phút + 1 giờ 45 phút = ?", "options": ["4 giờ 15 phút", "3 giờ 75 phút", "4 giờ 30 phút", "3 giờ 15 phút"], "answer": "4 giờ 15 phút", "mascotHint": "3 giờ 75 phút đổi 60 phút thành 1 giờ -> 4 giờ 15 phút!"}},
                        {"type": "summary", "content": {"title": "Ghi nhớ:", "points": ["Cộng trừ từ đơn vị nhỏ đến đơn vị lớn.", "Nếu số phút/giây >= 60 thì đổi sang đơn vị lớn hơn."], "mascotMood": "proud"}}
                    ]
                },
                {
                    "id": "g5-c4-l2",
                    "title": "Bài 30: Nhân, chia số đo thời gian với một số",
                    "description": "Nhân/chia từng đơn vị đo thời gian với số tự nhiên",
                    "slides": [
                        {"type": "story", "content": {"mascotMood": "happy", "text": "Nhân hoặc chia từng loại đơn vị thời gian với số đó! Nếu có dư khi chia, ta đổi sang đơn vị bé hơn rồi chia tiếp! ⏱️"}},
                        {"type": "visual", "content": {"text": "Ví dụ nhân: 1 giờ 25 phút × 3 = 3 giờ 75 phút = 4 giờ 15 phút.\nVí dụ chia: 7 giờ 40 phút : 4\n- 7 giờ : 4 = 1 giờ dư 3 giờ\n- Đổi 3 giờ = 180 phút. 180 + 40 = 220 phút.\n- 220 phút : 4 = 55 phút -> Kết quả: 1 giờ 55 phút."}},
                        {"type": "quiz", "content": {"question": "Tính: (1 phút 15 giây) × 4 = ?", "options": ["5 phút", "4 phút 60 giây", "4 phút 15 giây", "5 phút 15 giây"], "answer": "5 phút", "mascotHint": "4 phút 60 giây = 5 phút tròn!"}},
                        {"type": "summary", "content": {"title": "Ghi nhớ:", "points": ["Nhân/chia từng đơn vị từ lớn đến bé.", "Phần dư đổi sang đơn vị bé hơn rồi chia tiếp."], "mascotMood": "celebrate"}}
                    ]
                },
                {
                    "id": "g5-c4-l3",
                    "title": "Bài 31: Vận tốc (v = s : t)",
                    "description": "Khái niệm vận tốc; Công thức: Vận tốc = Quãng đường : Thời gian (km/giờ, m/giây)",
                    "slides": [
                        {"type": "story", "content": {"mascotMood": "excited", "text": "Vận tốc cho biết mức độ chuyển động nhanh hay chậm của một vật! Đơn vị thường dùng là km/giờ hoặc m/giây! 🚗💨"}},
                        {"type": "visual", "content": {"text": "Công thức tính vận tốc:\nv = s : t\nTrong đó:\n- v là vận tốc\n- s là quãng đường\n- t là thời gian"}},
                        {"type": "quiz", "content": {"question": "Một ô tô đi được quãng đường 120 km trong 3 giờ. Vận tốc của ô tô là:", "options": ["40 km/giờ", "360 km/giờ", "60 km/giờ", "45 km/giờ"], "answer": "40 km/giờ", "mascotHint": "v = s : t = 120 : 3 = 40 km/giờ!"}},
                        {"type": "summary", "content": {"title": "Công thức vàng:", "points": ["Vận tốc = Quãng đường : Thời gian (v = s : t)", "Đơn vị vận tốc tương ứng: km/giờ (nếu s là km, t là giờ)."], "mascotMood": "proud"}}
                    ]
                },
                {
                    "id": "g5-c4-l4",
                    "title": "Bài 32: Quãng đường (s = v × t)",
                    "description": "Muốn tính quãng đường ta lấy vận tốc nhân với thời gian",
                    "slides": [
                        {"type": "story", "content": {"mascotMood": "excited", "text": "Biết vận tốc và thời gian, ta tìm được quãng đường đã đi được bằng phép nhân: s = v × t! 🛣️"}},
                        {"type": "visual", "content": {"text": "Công thức quãng đường:\ns = v × t\nVí dụ: Một người đi xe đạp với vận tốc 15 km/giờ trong 2 giờ. Quãng đường đi được là: s = 15 × 2 = 30 km."}},
                        {"type": "quiz", "content": {"question": "Một máy bay bay với vận tốc 800 km/giờ trong 2,5 giờ. Quãng đường máy bay đã bay là:", "options": ["2 000 km", "1 600 km", "2 400 km", "1 800 km"], "answer": "2 000 km", "mascotHint": "s = v × t = 800 × 2,5 = 2 000 km!"}},
                        {"type": "summary", "content": {"title": "Công thức:", "points": ["Quãng đường = Vận tốc × Thời gian (s = v × t).", "Thời gian và vận tốc phải cùng hệ đơn vị đo."], "mascotMood": "celebrate"}}
                    ]
                },
                {
                    "id": "g5-c4-l5",
                    "title": "Bài 33: Thời gian (t = s : v)",
                    "description": "Muốn tính thời gian ta lấy quãng đường chia cho vận tốc",
                    "slides": [
                        {"type": "story", "content": {"mascotMood": "happy", "text": "Muốn tính thời gian đi hết quãng đường: Lấy quãng đường chia cho vận tốc: t = s : v! ⏱️"}},
                        {"type": "visual", "content": {"text": "Công thức thời gian:\nt = s : v\nVí dụ: Quãng đường AB dài 90 km, xe máy đi với vận tốc 45 km/giờ. Thời gian đi là: t = 90 : 45 = 2 giờ."}},
                        {"type": "quiz", "content": {"question": "Một người chạy bộ quãng đường 800 m với vận tốc 4 m/giây. Thời gian người đó chạy là:", "options": ["200 giây", "20 giây", "3200 giây", "400 giây"], "answer": "200 giây", "mascotHint": "t = s : v = 800 : 4 = 200 giây!"}},
                        {"type": "summary", "content": {"title": "Bộ 3 công thức chuyển động:", "points": ["v = s : t", "s = v × t", "t = s : v"], "mascotMood": "proud"}}
                    ]
                },
                {
                    "id": "g5-c4-l6",
                    "title": "Bài 34: Hai chuyển động cùng chiều & Ngược chiều",
                    "description": "Hai xe đi ngược chiều gặp nhau: t = s : (v1 + v2); Hai xe cùng chiều đuổi kịp: t = s : (v1 - v2)",
                    "slides": [
                        {"type": "story", "content": {"mascotMood": "excited", "text": "Bài toán hai chuyển động kinh điển:\n- Đi NGƯỢC CHIỀU gặp nhau: Mỗi giờ cả 2 xe đi được tổng vận tốc (v1 + v2). Thời gian gặp = s : (v1 + v2)!\n- Đi CÙNG CHIỀU đuổi kịp: Mỗi giờ xe sau rút ngắn được hiệu vận tốc (v1 - v2). Thời gian đuổi kịp = s : (v1 - v2)! 🚗🚙"}},
                        {"type": "visual", "content": {"text": "1. Ngược chiều:\nThời gian gặp nhau = Khoảng cách ban đầu : (v1 + v2)\n2. Cùng chiều (xe sau nhanh hơn đuổi xe trước):\nThời gian đuổi kịp = Khoảng cách ban đầu : (v1 - v2)"}},
                        {"type": "quiz", "content": {"question": "Hai thành phố A và B cách nhau 150 km. Ô tô đi từ A với 60 km/h, xe máy đi từ B với 40 km/h khởi hành cùng lúc đi ngược chiều nhau. Sau bao lâu hai xe gặp nhau?", "options": ["1,5 giờ", "2 giờ", "1 giờ", "2,5 giờ"], "answer": "1,5 giờ", "mascotHint": "Tổng vận tốc = 60 + 40 = 100 km/h. Thời gian gặp = 150 : 100 = 1,5 giờ!"}},
                        {"type": "summary", "content": {"title": "Ghi nhớ công thức hai chuyển động:", "points": ["Ngược chiều gặp nhau: t = s : (v1 + v2)", "Cùng chiều đuổi kịp: t = s : (v1 - v2)"], "mascotMood": "celebrate"}}
                    ]
                }
            ]
        },
        {
            "id": "g5-c5",
            "name": "Chương 5: Ôn tập cuối năm & Luyện thi chuyển cấp",
            "description": "Tổng ôn tập toàn bộ chương trình Toán tiểu học: Số học, hình học phẳng & khối, toán chuyển động, toán phần trăm",
            "icon": "🏆",
            "color": "#6366f1",
            "totalLessons": 6,
            "lessons": [
                {
                    "id": "g5-c5-l1",
                    "title": "Bài 35: Ôn tập về số tự nhiên, phân số, số thập phân",
                    "description": "Đọc, viết, so sánh, giá trị theo hàng, các dạng số đã học ở tiểu học",
                    "slides": [
                        {"type": "story", "content": {"mascotMood": "proud", "text": "Chào mừng bạn đến với chặng về đích của toàn bộ bậc Tiểu học! Cùng Cú Mèo rà soát lại toàn bộ kiến thức nhé! 🎓🦉"}},
                        {"type": "quiz", "content": {"question": "Viết phân số 3/4 dưới dạng số thập phân:", "options": ["0,75", "0,34", "0,43", "7,5"], "answer": "0,75", "mascotHint": "3 : 4 = 0,75!"}},
                        {"type": "summary", "content": {"title": "Ôn tập số học:", "points": ["Mối liên hệ giữa phân số, số thập phân và tỉ số phần trăm."], "mascotMood": "proud"}}
                    ]
                },
                {
                    "id": "g5-c5-l2",
                    "title": "Bài 36: Ôn tập các phép tính số tự nhiên, phân số, số thập phân",
                    "description": "Tính giá trị biểu thức và vận dụng các tính chất giao hoán, kết hợp, phân phối",
                    "slides": [
                        {"type": "story", "content": {"mascotMood": "excited", "text": "Rèn luyện tính nhanh và tính chuẩn xác các biểu thức toán học phức tạp! 🧮"}},
                        {"type": "quiz", "content": {"question": "Tính thuận tiện: 3,7 × 4,5 + 3,7 × 5,5 = ?", "options": ["37", "370", "3,7", "35"], "answer": "37", "mascotHint": "3,7 × (4,5 + 5,5) = 3,7 × 10 = 37!"}},
                        {"type": "summary", "content": {"title": "Kỹ năng tính nhanh:", "points": ["Áp dụng công thức a × b + a × c = a × (b + c)."], "mascotMood": "celebrate"}}
                    ]
                },
                {
                    "id": "g5-c5-l3",
                    "title": "Bài 37: Ôn tập chu vi, diện tích hình phẳng",
                    "description": "Tam giác, hình thang, hình tròn, hình chữ nhật, hình vuông, hình thoi",
                    "slides": [
                        {"type": "story", "content": {"mascotMood": "happy", "text": "Hệ thống toàn bộ công thức diện tích hình phẳng của tiểu học! 📐"}},
                        {"type": "visual", "content": {"text": "- Tam giác: S = (a × h) / 2\n- Hình thang: S = ((a + b) × h) / 2\n- Hình tròn: S = r × r × 3,14\n- Hình thoi: S = (m × n) / 2"}},
                        {"type": "quiz", "content": {"question": "Một hình tròn có chu vi là 18,84 cm. Diện tích của hình tròn đó là:", "options": ["28,26 cm²", "18,84 cm²", "9,42 cm²", "12,56 cm²"], "answer": "28,26 cm²", "mascotHint": "r = 18,84 : 3,14 : 2 = 3 cm. S = 3 × 3 × 3,14 = 28,26 cm²!"}},
                        {"type": "summary", "content": {"title": "Ghi nhớ công thức:", "points": ["Nhớ chia 2 cho tam giác, thang, thoi.", "Hình tròn dùng bán kính r."], "mascotMood": "proud"}}
                    ]
                },
                {
                    "id": "g5-c5-l4",
                    "title": "Bài 38: Ôn tập diện tích & Thể tích hình khối",
                    "description": "Hình hộp chữ nhật, hình lập phương: Sxq, Stp, Thể tích V",
                    "slides": [
                        {"type": "story", "content": {"mascotMood": "happy", "text": "Ôn tập thể tích hình hộp chữ nhật V = a × b × c và hình lập phương V = a × a × a! 🧊📦"}},
                        {"type": "quiz", "content": {"question": "Một bể cá dạng hình hộp chữ nhật có lòng trong dài 8 dm, rộng 5 dm, cao 6 dm. Bể chứa được tối đa bao nhiêu lít nước?", "options": ["240 lít", "2400 lít", "19 dm³", "120 lít"], "answer": "240 lít", "mascotHint": "V = 8 × 5 × 6 = 240 dm³ = 240 lít!"}},
                        {"type": "summary", "content": {"title": "Ghi nhớ thể tích:", "points": ["1 dm³ = 1 lít.", "Đổi về cùng đơn vị đo trước khi nhân."], "mascotMood": "celebrate"}}
                    ]
                },
                {
                    "id": "g5-c5-l5",
                    "title": "Bài 39: Ôn tập toán chuyển động đều & Tỉ số phần trăm",
                    "description": "Bài toán hai xe ngược chiều, cùng chiều và các bài toán thực tế tỉ số %",
                    "slides": [
                        {"type": "story", "content": {"mascotMood": "excited", "text": "Đây là hai dạng toán có tần suất xuất hiện cao nhất trong các đề thi chuyển cấp vào lớp 6! Cùng thử sức nhé! 🚀"}},
                        {"type": "quiz", "content": {"question": "Một cửa hàng bán chiếc xe đạp giá 2 000 000 đồng, nhân dịp lễ giảm giá 15%. Giá xe sau khi giảm là:", "options": ["1 700 000 đồng", "1 800 000 đồng", "1 850 000 đồng", "1 500 000 đồng"], "answer": "1 700 000 đồng", "mascotHint": "Số tiền giảm = 2 000 000 × 15 : 100 = 300 000 đồng. Giá sau giảm = 2 000 000 - 300 000 = 1 700 000 đồng!"}},
                        {"type": "summary", "content": {"title": "Ghi nhớ:", "points": ["Đọc kỹ bài toán tỉ số % xác định số tiền tăng/giảm.", "Áp dụng đúng công thức chuyển động."], "mascotMood": "proud"}}
                    ]
                },
                {
                    "id": "g5-c5-l6",
                    "title": "Bài 40: Thử thách Trạng Nguyên Toán Lớp 5 - Chinh phục Lớp 6",
                    "description": "Đề thi thử Trạng Nguyên Toán Tiểu học vinh danh học sinh xuất sắc",
                    "slides": [
                        {"type": "story", "content": {"mascotMood": "celebrate", "text": "Nhiệt liệt chúc mừng bạn đã đến với bài học cuối cùng của chương trình Toán Tiểu Học! Bạn là một chiến binh toán học tuyệt vời! 🏅🎉🎓"}},
                        {"type": "quiz", "content": {"question": "Một người đi từ A lúc 7 giờ và đến B lúc 9 giờ 30 phút với vận tốc 42 km/giờ. Quãng đường AB dài bao nhiêu km?", "options": ["105 km", "84 km", "126 km", "90 km"], "answer": "105 km", "mascotHint": "Thời gian = 9 giờ 30 phút - 7 giờ = 2 giờ 30 phút = 2,5 giờ. Quãng đường = 42 × 2,5 = 105 km!"}},
                        {"type": "summary", "content": {"title": "Chúc mừng bạn đã hoàn thành xuất sắc Chương trình Toán Tiểu học!", "points": ["Bạn đã làm chủ mọi kiến thức Toán từ Lớp 1 đến Lớp 5!", "Sẵn sàng tự tin bước chân vào Cánh cửa Trường Trung học Cơ sở (Lớp 6)! 🚀🌟"], "mascotMood": "celebrate"}}
                    ]
                }
            ]
        }
    ]

    out = "// Data for Grade 5 (Lop 5) - 5 Chuong, 40 bai hoc chuan SGK Bo Giao Duc\n"
    out += "// Duoc chuan hoa tu sach Toan 5 Chinh Thuc\n\n"
    out += "function makeLesson(id, title, desc, slides = []) {\n"
    out += "  return {\n    id,\n    title,\n    type: 'learn',\n    description: desc,\n    slides,\n  }\n}\n\n"
    out += "export const grade5Data = {\n"
    out += "  id: 5,\n"
    out += "  name: 'Lớp 5',\n"
    out += "  description: 'Phân số, số thập phân, tỉ số phần trăm, diện tích & thể tích hình khối, toán chuyển động đều',\n"
    out += "  icon: '🎓',\n"
    out += "  color: '#6366f1',\n"
    out += "  ageRange: '10-11 tuổi',\n"
    out += "  chapters: [\n"

    for chap in chapters:
        out += "    {\n"
        out += f"      id: '{chap['id']}',\n"
        out += f"      name: '{chap['name']}',\n"
        out += f"      description: '{chap['description']}',\n"
        out += f"      icon: '{chap['icon']}',\n"
        out += f"      color: '{chap['color']}',\n"
        out += f"      totalLessons: {len(chap['lessons'])},\n"
        out += "      lessons: [\n"
        for les in chap["lessons"]:
            slides_json = json.dumps(les["slides"], ensure_ascii=False, indent=10)
            out += f"        makeLesson('{les['id']}', '{les['title']}', '{les['description']}', {slides_json}),\n"
        out += "      ],\n"
        out += "    },\n"

    out += "  ],\n"
    out += "}\n"

    with open(r'd:\1.Jobs\6.PersonalProject\Education\client\src\data\grade5Data.js', 'w', encoding='utf-8') as f:
        f.write(out)
    print("Generated grade5Data.js successfully!")

generate_grade5_file()
