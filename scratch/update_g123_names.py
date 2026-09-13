# -*- coding: utf-8 -*-
def update_names():
    # Grade 1
    p1 = r'd:\1.Jobs\6.PersonalProject\Education\client\src\data\grade1Data.js'
    with open(p1, 'r', encoding='utf-8') as f:
        c1 = f.read()
    repls_g1 = [
        ("Chương 1: Các số đến 10", "Chủ đề 1: Các số từ 0 đến 10"),
        ("Chương 2: Phép cộng trừ phạm vi 10", "Chủ đề 2: Phép cộng, phép trừ trong phạm vi 10"),
        ("Chương 3: Các số đến 20", "Chủ đề 3: Các số trong phạm vi 20"),
        ("Chương 4: Phép cộng trừ phạm vi 20", "Chủ đề 4: Phép cộng, phép trừ trong phạm vi 20"),
        ("Chương 5: Các số đến 100", "Chủ đề 5: Các số đến 100 & So sánh số"),
        ("Chương 6: Hình học & Đo lường", "Chủ đề 6: Làm quen với một số hình phẳng & Đo độ dài"),
        ("Chương 7: Phép cộng trừ không nhớ trong phạm vi 100", "Chủ đề 7: Phép cộng, phép trừ (không nhớ) trong phạm vi 100"),
        ("Chương 8: Đo thời gian & Lịch tuần lễ", "Chủ đề 8: Thời gian, giờ và lịch tuần lễ"),
        ("Chương 9: Khối không gian & Xếp hình sáng tạo", "Chủ đề 9: Làm quen với một số hình khối & Xếp hình"),
        ("Chương 10: Ôn tập cuối năm Lớp 1", "Chủ đề 10: Ôn tập cuối năm Lớp 1"),
    ]
    for old, new in repls_g1:
        c1 = c1.replace(old, new)
    with open(p1, 'w', encoding='utf-8') as f:
        f.write(c1)

    # Grade 2
    p2 = r'd:\1.Jobs\6.PersonalProject\Education\client\src\data\grade2Data.js'
    with open(p2, 'r', encoding='utf-8') as f:
        c2 = f.read()
    repls_g2 = [
        ("Chương 1: Ôn tập & Bổ sung", "Chủ đề 1: Ôn tập & Bổ sung (Tia số, Số liền trước - liền sau)"),
        ("Chương 2: Phép cộng trừ có nhớ trong phạm vi 100", "Chủ đề 2: Phép cộng, phép trừ (có nhớ) trong phạm vi 100"),
        ("Chương 3: Bảng nhân 2, 3, 4, 5", "Chủ đề 3: Phép nhân & Bảng nhân 2, 3, 4, 5"),
        ("Chương 4: Bảng chia 2, 3, 4, 5 & Một phần mấy", "Chủ đề 4: Phép chia & Bảng chia 2, 3, 4, 5"),
        ("Chương 5: Các số đến 1000", "Chủ đề 5: Các số trong phạm vi 1 000"),
        ("Chương 6: Đo lường (dm, m, km, kg, lít)", "Chủ đề 6: Khối lượng, dung tích & Đo độ dài (kg, lít, dm, m, km)"),
        ("Chương 7: Hình học & Giải toán", "Chủ đề 7: Hình phẳng & Hình khối (Đường gấp khúc, tứ giác, trụ, cầu)"),
        ("Chương 8: Phép cộng trừ có nhớ trong phạm vi 1000", "Chủ đề 8: Phép cộng, phép trừ trong phạm vi 1 000"),
        ("Chương 9: Thu thập, phân loại & Biểu đồ tranh", "Chủ đề 9: Làm quen với thống kê & xác suất (Biểu đồ tranh, khả năng xảy ra)"),
        ("Chương 10: Ôn tập cuối năm Lớp 2", "Chủ đề 10: Ôn tập cuối năm Lớp 2"),
    ]
    for old, new in repls_g2:
        c2 = c2.replace(old, new)
    with open(p2, 'w', encoding='utf-8') as f:
        f.write(c2)

    # Grade 3
    p3 = r'd:\1.Jobs\6.PersonalProject\Education\client\src\data\grade3Data.js'
    with open(p3, 'r', encoding='utf-8') as f:
        c3 = f.read()
    repls_g3 = [
        ("Chương 1: Ôn tập & Số đến 10.000", "Chủ đề 1: Ôn tập & Bổ sung (Số đến 1 000 & 10 000)"),
        ("Chương 2: Bảng nhân 6, 7, 8, 9", "Chủ đề 2: Bảng nhân 6, 7, 8, 9 & Một phần mấy"),
        ("Chương 3: Bảng chia 6, 7, 8, 9 & Chia có dư", "Chủ đề 3: Bảng chia 6, 7, 8, 9 & Phép chia có dư"),
        ("Chương 4: Các số đến 100.000", "Chủ đề 4: Các số đến 100 000 & Chữ số La Mã"),
        ("Chương 5: Làm quen với Phân số", "Chủ đề 5: Khái niệm phân số & Biểu thức số"),
        ("Chương 6: Chu vi & Diện tích hình học", "Chủ đề 6: Chu vi & Diện tích một số hình phẳng (cm²)"),
        ("Chương 7: Đo lường & Tiền Việt Nam", "Chủ đề 7: Đo lường (mm, gam, ml, °C) & Tiền Việt Nam"),
        ("Chương 8: Giải toán bằng hai bước tính", "Chủ đề 8: Giải bài toán bằng hai bước tính"),
        ("Chương 9: Bảng số liệu & Khả năng xảy ra của sự kiện", "Chủ đề 9: Thống kê số liệu & Khả năng xảy ra của sự kiện"),
        ("Chương 10: Ôn tập cuối năm Lớp 3", "Chủ đề 10: Ôn tập cuối năm Lớp 3"),
    ]
    for old, new in repls_g3:
        c3 = c3.replace(old, new)
    with open(p3, 'w', encoding='utf-8') as f:
        f.write(c3)

    print("Updated Grade 1, 2, 3 standardized Chủ đề names successfully!")

update_names()
