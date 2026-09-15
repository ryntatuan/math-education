// Interactive Math Stories Data (Visual Novel / Storybook format)
// Comprehensive Curriculum Alignment for Grades 1 to 5
export const MATH_STORIES = [
  // ----------------------------------------------------
  // STORY 1: LỚP 1 - 2
  // ----------------------------------------------------
  {
    id: 'story_picnic',
    title: 'Chuyến Dã Ngoại Của Thỏ Và Rùa',
    icon: '🧺',
    coverGradient: 'linear-gradient(135deg, #a8ff78 0%, #78ffd6 100%)',
    ageRange: 'Lớp 1 - 2',
    gradeLevel: 1,
    topic: 'Phép cộng & trừ trong phạm vi 20',
    description: 'Cùng Thỏ Trắng và Rùa Con chuẩn bị thức ăn và vượt qua cây cầu gỗ của Bác Gấu!',
    rewardCoins: 40,
    rewardXp: 80,
    scenes: [
      {
        id: 'scene_1',
        background: '🏡',
        character: '🐰',
        characterName: 'Thỏ Trắng',
        dialogue:
          'Xin chào bạn nhỏ! Hôm nay trời nắng đẹp, tớ và bạn Rùa Con muốn đi dã ngoại trên đồi hoa. Bé có muốn đi cùng chúng tớ không nào?',
        question: null,
      },
      {
        id: 'scene_2',
        background: '🥕',
        character: '🐰',
        characterName: 'Thỏ Trắng',
        dialogue:
          'Trong giỏ của tớ đã có sẵn 7 củ cà rốt giòn ngọt. Tớ vừa hái thêm được 5 củ cà rốt nữa ngoài vườn. Đố bé biết bây giờ trong giỏ tớ có tất cả bao nhiêu củ cà rốt?',
        question: {
          prompt: '7 + 5 = ?',
          options: [11, 12, 13, 14],
          answer: 12,
          hint: 'Bé lấy 7 cộng 3 để thành 10, rồi cộng thêm 2 nữa nhé!',
          successMessage: 'Chính xác! Giỏ có đúng 12 củ cà rốt vàng ươm! 🥕✨',
        },
      },
      {
        id: 'scene_3',
        background: '🍓',
        character: '🐢',
        characterName: 'Rùa Con',
        dialogue:
          'Chào Thỏ, chào bạn nhỏ! Tớ đem theo 16 quả dâu tây đỏ mọng. Nhưng trên đường đi, tớ đã mời bác Chim Sâu ăn mất 6 quả rồi. Đố bạn biết tớ còn lại bao nhiêu quả dâu tây?',
        question: {
          prompt: '16 - 6 = ?',
          options: [8, 9, 10, 11],
          answer: 10,
          hint: 'Lấy 16 trừ đi 6 đơn vị tận cùng nhé!',
          successMessage: 'Tuyệt đỉnh! Rùa Con còn đúng 10 quả dâu ngọt lịm! 🍓🍓',
        },
      },
      {
        id: 'scene_4',
        background: '🪵',
        character: '🐻',
        characterName: 'Bác Gấu Giữ Cầu',
        dialogue:
          'Dừng lại nào các cháu! Muốn qua cây cầu gỗ này lên đỉnh đồi dã ngoại, các cháu phải giúp bác tính nhẩm: Thỏ có 12 củ cà rốt, Rùa có 10 quả dâu tây. Hỏi cả hai bạn có tất cả bao nhiêu củ và quả mang theo?',
        question: {
          prompt: '12 củ cà rốt + 10 quả dâu tây = ?',
          options: [20, 21, 22, 24],
          answer: 22,
          hint: 'Cộng hàng chục trước: 10 + 10 = 20, rồi cộng thêm 2 đơn vị nhé!',
          successMessage: 'Bác Gấu cười toe toét: Đúng rồi, có tất cả 22 củ và quả! Mời các cháu qua cầu!',
        },
      },
      {
        id: 'scene_5',
        background: '🌻',
        character: '🎉',
        characterName: 'Thỏ & Rùa',
        dialogue:
          'Tuyệt vời quá! Nhờ có sự giúp đỡ thông minh của bạn nhỏ, chúng tớ đã lên tới đỉnh đồi dã ngoại rồi! Cảm ơn bạn rất nhiều nhé! ❤️',
        question: null,
      },
    ],
  },

  // ----------------------------------------------------
  // STORY 2: LỚP 1 - 2
  // ----------------------------------------------------
  {
    id: 'story_ocean',
    title: 'Thám Hiểm Đại Dương & Rạn San Hô',
    icon: '🐬',
    coverGradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    ageRange: 'Lớp 1 - 2',
    gradeLevel: 1,
    topic: 'Đo lường độ dài (cm, dm) & phép cộng phạm vi 100',
    description: 'Lặn xuống đáy biển sâu cùng Cá Heo Xanh tìm ngọc trai và đo độ dài cây san hô thần kỳ!',
    rewardCoins: 45,
    rewardXp: 90,
    scenes: [
      {
        id: 'scene_1',
        background: '🌊',
        character: '🐬',
        characterName: 'Cá Heo Xanh',
        dialogue:
          'Vút! Xin chào nhà thám hiểm nhí! Tớ là Cá Heo Xanh. Hôm nay chúng mình sẽ cùng bơi xuống Thung Lũng San Hô để tìm kiếm viên Ngọc Trai Trí Tuệ nhé!',
        question: null,
      },
      {
        id: 'scene_2',
        background: '📏',
        character: '🐬',
        characterName: 'Cá Heo Xanh',
        dialogue:
          'Cây cầu san hô thứ nhất dài 1 đề-xi-mét (1 dm). Đố bạn nhỏ biết 1 đề-xi-mét (1 dm) bằng bao nhiêu xăng-ti-mét (cm)?',
        question: {
          prompt: '1 dm = ? cm',
          options: ['1 cm', '5 cm', '10 cm', '100 cm'],
          answer: '10 cm',
          hint: '1 đề-xi-mét gấp 10 lần 1 xăng-ti-mét đó bé!',
          successMessage: 'Chính xác 100%! 1 dm = 10 cm! Chúng ta bơi qua cầu san hô an toàn! 🌊✨',
        },
      },
      {
        id: 'scene_3',
        background: '🐠',
        character: '🐡',
        characterName: 'Cá Nóc Vàng',
        dialogue:
          'Xin chào! Đàn cá hề đỏ có 35 bạn, đàn cá đuôi gai xanh có 20 bạn đang bơi cùng nhau. Đố bé cả hai đàn cá có tất cả bao nhiêu bạn cá?',
        question: {
          prompt: '35 + 20 = ?',
          options: [45, 50, 55, 65],
          answer: 55,
          hint: 'Cộng hàng chục: 3 chục + 2 chục = 5 chục (50), cộng thêm 5 đơn vị!',
          successMessage: 'Xuất sắc! Có tất cả 55 bạn cá đang tung tăng bơi lội! 🐠🐟',
        },
      },
      {
        id: 'scene_4',
        background: '🦪',
        character: '🐬',
        characterName: 'Cá Heo Xanh',
        dialogue:
          'Nhìn kìa! Rương ngọc trai phát sáng có ổ khóa mật mã hình học: "Khối nào có 6 mặt đều là hình vuông bằng nhau?". Giúp tớ chọn đúng để mở rương nào!',
        question: {
          prompt: 'Khối có 6 mặt đều là hình vuông là:',
          options: ['Khối lập phương', 'Khối chữ nhật', 'Khối trụ', 'Khối cầu'],
          answer: 'Khối lập phương',
          hint: 'Giống như viên xúc xắc đồ chơi của bé vậy!',
          successMessage: 'Keng! Rương ngọc trai đã mở, tỏa ánh sáng lung linh khắp đại dương! 💎🐬',
        },
      },
      {
        id: 'scene_5',
        background: '🌈',
        character: '🐬',
        characterName: 'Cá Heo Xanh',
        dialogue:
          'Chuyến thám hiểm thành công rực rỡ! Bé đã nhận được Huy Hiệu Thám Hiểm Đại Dương! Hẹn gặp lại bé ở chuyến lặn biển lần sau nhé! 🌊❤️',
        question: null,
      },
    ],
  },

  // ----------------------------------------------------
  // STORY 3: LỚP 2 - 3
  // ----------------------------------------------------
  {
    id: 'story_space',
    title: 'Phi Thuyền Vũ Trụ & Mật Mã Hành Tinh',
    icon: '🚀',
    coverGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    ageRange: 'Lớp 2 - 3',
    gradeLevel: 2,
    topic: 'Bảng nhân & chia 2, 5, đại lượng kg & lít',
    description: 'Nạp nhiên liệu cho tên lửa, vượt qua vành đai tiểu hành tinh và thám hiểm Sao Hỏa!',
    rewardCoins: 50,
    rewardXp: 100,
    scenes: [
      {
        id: 'scene_1',
        background: '🌌',
        character: '👨‍🚀',
        characterName: 'Phi Hành Gia Mèo Ú',
        dialogue:
          'Chào đồng chí chỉ huy nhí! Tàu Apollo Mèo Con chuẩn bị phóng vào không gian khám phá Hệ Mặt Trời. Hãy kiểm tra các thông số toán học trước khi đếm ngược!',
        question: null,
      },
      {
        id: 'scene_2',
        background: '⛽',
        character: '👨‍🚀',
        characterName: 'Phi Hành Gia Mèo Ú',
        dialogue:
          'Phi thuyền có 5 bình chứa nhiên liệu lỏng đặc biệt. Mỗi bình chứa đúng 6 lít nhiên liệu. Hỏi phi thuyền có tất cả bao nhiêu lít nhiên liệu?',
        question: {
          prompt: '5 bình × 6 lít = ?',
          options: [25, 30, 35, 40],
          answer: 30,
          hint: 'Dùng bảng nhân 5: 5 × 6 = 30!',
          successMessage: 'Chính xác! Đã nạp đủ 30 lít nhiên liệu! Động cơ tên lửa gầm vang! 🔥🚀',
        },
      },
      {
        id: 'scene_3',
        background: '🪐',
        character: '🤖',
        characterName: 'Robot Dẫn Đường',
        dialogue:
          'Bíp bíp! Robot phát hiện 18 thiên thạch đang bay tới. Robot cần chia đều 18 thiên thạch này thành 2 luồng né tránh. Mỗi luồng có bao nhiêu thiên thạch?',
        question: {
          prompt: '18 : 2 = ?',
          options: [7, 8, 9, 10],
          answer: 9,
          hint: 'Mấy nhân 2 bằng 18 nhỉ? 2 × 9 = 18!',
          successMessage: 'Tuyệt vời! 18 : 2 = 9 thiên thạch! Phi thuyền lướt qua an toàn!',
        },
      },
      {
        id: 'scene_4',
        background: '🔴',
        character: '👨‍🚀',
        characterName: 'Phi Hành Gia Mèo Ú',
        dialogue:
          'Chúng ta đã đáp xuống Sao Hỏa! Mèo Ú thu thập được 25 kg đất đỏ, Robot thu thập được 35 kg mẫu đá. Hỏi cả đội thu thập được bao nhiêu ki-lô-gam mẫu vật?',
        question: {
          prompt: '25 kg + 35 kg = ?',
          options: [50, 55, 60, 65],
          answer: 60,
          hint: '5 + 5 = 10, nhớ 1 sang hàng chục: 2 + 3 + 1 = 6 chục (60 kg)!',
          successMessage: 'Chuẩn không cần chỉnh! Đạt đúng 60 kg mẫu vật quý giá! 🪨✨',
        },
      },
      {
        id: 'scene_5',
        background: '⭐',
        character: '🎉',
        characterName: 'Mèo Ú & Robot',
        dialogue:
          'Sứ mệnh Sao Hỏa toàn thắng! Cảm ơn chỉ huy nhí đã tính toán chuẩn xác từng bước đi! Cắm cờ chiến thắng nào! 🚩🛰️',
        question: null,
      },
    ],
  },

  // ----------------------------------------------------
  // STORY 4: LỚP 2 - 3
  // ----------------------------------------------------
  {
    id: 'story_bakery',
    title: 'Tiệm Bánh Kỳ Diệu Của Bác Gấu',
    icon: '🎂',
    coverGradient: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
    ageRange: 'Lớp 2 - 3',
    gradeLevel: 2,
    topic: 'Khái niệm phân số cơ bản & phép nhân chia bảng 3, 4',
    description: 'Trở thành phụ bếp nhí chia bánh sinh nhật và nướng bánh quy thơm lừng!',
    rewardCoins: 50,
    rewardXp: 100,
    scenes: [
      {
        id: 'scene_1',
        background: '🧁',
        character: '🐻‍❄️',
        characterName: 'Bác Gấu Bếp Trưởng',
        dialogue:
          'Hôm nay tiệm bánh rừng xanh đông khách quá! Bác rất cần một bạn nhỏ tính toán nhanh nhẹn giúp bác phục vụ các vị khách quý!',
        question: null,
      },
      {
        id: 'scene_2',
        background: '🍕',
        character: '🦊',
        characterName: 'Bạn Cáo Con',
        dialogue:
          'Cháu muốn mua 1 chiếc bánh pizza nướng! Bác chia đều chiếc bánh thành 4 miếng bằng nhau, và cháu xin ăn 1 miếng nhé! Miếng bánh cháu ăn chiếm bao nhiêu phần của chiếc bánh?',
        question: {
          prompt: 'Chia 4 phần bằng nhau, lấy 1 phần gọi là:',
          options: ['1/2', '1/3', '1/4', '1/5'],
          answer: '1/4',
          hint: '1 phần trên tổng số 4 phần bằng nhau gọi là một phần tư!',
          successMessage: 'Chính xác! Đó chính là 1/4 chiếc bánh pizza thơm giòn! 🍕',
        },
      },
      {
        id: 'scene_3',
        background: '🍪',
        character: '🐻‍❄️',
        characterName: 'Bác Gấu Bếp Trưởng',
        dialogue:
          'Bác đang nướng một khay bánh quy bơ. Khay bánh có 3 hàng, mỗi hàng có đúng 5 chiếc bánh. Phụ bếp nhí tính giúp bác xem cả khay có tất cả bao nhiêu chiếc bánh quy?',
        question: {
          prompt: '3 hàng × 5 chiếc = ?',
          options: [12, 15, 18, 20],
          answer: 15,
          hint: 'Bé có thể đếm cách 5: 5, 10, 15!',
          successMessage: 'Tuyệt cú mèo! 3 × 5 = 15 chiếc bánh vàng ươm giòn rụm! 🍪',
        },
      },
      {
        id: 'scene_4',
        background: '🍰',
        character: '🐿️',
        characterName: 'Sóc Nhỏ',
        dialogue:
          'Em có 12 hạt dẻ thơm ngon muốn chia đều cho 3 bạn sóc trong tổ. Mỗi bạn sóc sẽ nhận được mấy hạt dẻ vậy bé ơi?',
        question: {
          prompt: '12 : 3 = ?',
          options: [3, 4, 5, 6],
          answer: 4,
          hint: 'Mấy nhân với 3 thì bằng 12 nhỉ?',
          successMessage: 'Hoan hô! 12 chia 3 bằng 4 hạt dẻ cho mỗi bạn! 🌰',
        },
      },
      {
        id: 'scene_5',
        background: '🌟',
        character: '🐻‍❄️',
        characterName: 'Bác Gấu Bếp Trưởng',
        dialogue:
          'Bác trao cho cháu huy hiệu "Bếp Trưởng Nhí Xuất Sắc"! Mọi khách hàng đều khen ngợi sự thông minh của cháu! 🏅🎉',
        question: null,
      },
    ],
  },

  // ----------------------------------------------------
  // STORY 5: LỚP 3
  // ----------------------------------------------------
  {
    id: 'story_detective',
    title: 'Thám Tử Rừng Xanh & Bí Mật Hình Học',
    icon: '🔍',
    coverGradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)',
    ageRange: 'Lớp 3',
    gradeLevel: 3,
    topic: 'Hình học, chu vi hình chữ nhật & xem đồng hồ',
    description: 'Cùng Thám Tử Cú Mèo lần theo các mật mã hình học để mở rương kho báu tri thức!',
    rewardCoins: 60,
    rewardXp: 120,
    scenes: [
      {
        id: 'scene_1',
        background: '🦉',
        character: '🦉',
        characterName: 'Thám Tử Cú Mèo',
        dialogue:
          'Tớ là Thám tử Cú Mèo! Tớ vừa phát hiện một bức mật thư bí mật dẫn đến Kho Báu Tri Thức của vương quốc Rừng Xanh. Hãy đi cùng tớ giải mã nhé!',
        question: null,
      },
      {
        id: 'scene_2',
        background: '📐',
        character: '🦉',
        characterName: 'Thám Tử Cú Mèo',
        dialogue:
          'Manh mối thứ nhất khắc trên tảng đá cổ: "Một hình có 3 cạnh và 3 đỉnh nhọn". Đố bé đó là hình gì?',
        question: {
          prompt: 'Hình có 3 cạnh và 3 góc nhọn là:',
          options: ['Hình vuông', 'Hình tam giác', 'Hình tròn', 'Hình chữ nhật'],
          answer: 'Hình tam giác',
          hint: 'Tam nghĩa là ba đó bé!',
          successMessage: 'Quá đỉnh! Cửa đá hình tam giác bí mật vừa mở ra! 🔺✨',
        },
      },
      {
        id: 'scene_3',
        background: '📏',
        character: '🦉',
        characterName: 'Thám Tử Cú Mèo',
        dialogue:
          'Bé nhìn chiếc thảm trải sàn hình chữ nhật này xem: Chiều dài là 6 mét, chiều rộng là 4 mét. Chu vi của chiếc thảm này là bao nhiêu mét để tớ giăng lưới bảo vệ?',
        question: {
          prompt: 'Chu vi hình chữ nhật = (6 + 4) × 2 = ?',
          options: [18, 20, 24, 28],
          answer: 20,
          hint: 'Tính (6 + 4) = 10, rồi gấp đôi 10 lên nhé!',
          successMessage: 'Chính xác! Chu vi là 20 mét! Manh mối số 2 đã được hóa giải!',
        },
      },
      {
        id: 'scene_4',
        background: '⏰',
        character: '🦉',
        characterName: 'Thám Tử Cú Mèo',
        dialogue:
          'Đồng hồ trên rương kho báu chỉ kim ngắn vào số 3, kim dài chỉ đúng vào số 12. Bây giờ là mấy giờ đúng để xoay mật khẩu mở rương?',
        question: {
          prompt: 'Kim ngắn chỉ số 3, kim dài chỉ số 12 là:',
          options: ['12 giờ', '3 giờ', '6 giờ', '9 giờ'],
          answer: '3 giờ',
          hint: 'Kim ngắn chỉ giờ, kim dài chỉ phút!',
          successMessage: 'Tách! Chiếc khóa cổ đã mở tung! Kho báu tri thức tỏa sáng rực rỡ! 💎✨',
        },
      },
      {
        id: 'scene_5',
        background: '🏆',
        character: '🦉',
        characterName: 'Thám Tử Cú Mèo',
        dialogue:
          'Bé thật xứng danh là Đại Thám Tử Nhí Thông Thái! Vương quốc Rừng Xanh tôn vinh trí tuệ sáng ngời của bé! 🌟🎓',
        question: null,
      },
    ],
  },

  // ----------------------------------------------------
  // STORY 6: LỚP 3 - 4
  // ----------------------------------------------------
  {
    id: 'story_kingdom',
    title: 'Hiệp Sĩ Rồng & Tòa Tháp Phép Thuật',
    icon: '🏰',
    coverGradient: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
    ageRange: 'Lớp 3 - 4',
    gradeLevel: 3,
    topic: 'Diện tích hình chữ nhật, nhân chia số lớn & bảng cửu chương',
    description: 'Vượt qua 4 tầng Tháp Phép Thuật, giải cứu chú Rồng Con bị phong ấn!',
    rewardCoins: 65,
    rewardXp: 130,
    scenes: [
      {
        id: 'scene_1',
        background: '🏰',
        character: '🐲',
        characterName: 'Hiệp Sĩ Rồng',
        dialogue:
          'Gầm! Chào hiệp sĩ nhí can đảm! Tớ là Rồng Lửa Con. Pháp sư bóng tối vừa phong ấn cánh cổng phép thuật của tòa tháp. Chỉ có toán học thông thái mới mở được các phong ấn này!',
        question: null,
      },
      {
        id: 'scene_2',
        background: '⚡',
        character: '🐲',
        characterName: 'Hiệp Sĩ Rồng',
        dialogue:
          'Phong ấn Tầng 1: Cổng điện có 7 cột năng lượng, mỗi cột tích trữ 8 tia sét ma thuật. Hỏi có tất cả bao nhiêu tia sét đang chắn giữ cửa?',
        question: {
          prompt: '7 × 8 = ?',
          options: [54, 56, 58, 64],
          answer: 56,
          hint: 'Dùng bảng nhân 7 hoặc 8: 7 × 8 = 56!',
          successMessage: 'Sấm chớp tan biến! 7 × 8 = 56! Cửa Tầng 1 mở toang! ⚡💥',
        },
      },
      {
        id: 'scene_3',
        background: '🟩',
        character: '🧙‍♂️',
        characterName: 'Thần Giữ Cửa',
        dialogue:
          'Muốn qua Tầng 2, hãy tính diện tích của căn phòng ma thuật hình chữ nhật có chiều dài 8 mét và chiều rộng 5 mét!',
        question: {
          prompt: 'Diện tích hình chữ nhật = 8 × 5 = ? m²',
          options: ['26 m²', '35 m²', '40 m²', '45 m²'],
          answer: '40 m²',
          hint: 'Diện tích hình chữ nhật bằng Chiều dài nhân Chiều rộng!',
          successMessage: 'Tuyệt đỉnh! Diện tích phòng là đúng 40 m²! Phong ấn vỡ vụn! 🛡️✨',
        },
      },
      {
        id: 'scene_4',
        background: '🗝️',
        character: '🐲',
        characterName: 'Hiệp Sĩ Rồng',
        dialogue:
          'Ổ khóa đỉnh tháp có mật mã số: "Số gồm 4 nghìn, 5 trăm, 2 chục và 8 đơn vị". Đó là số nào?',
        question: {
          prompt: '4 nghìn, 5 trăm, 2 chục, 8 đơn vị viết là:',
          options: ['4528', '4258', '4582', '4825'],
          answer: '4528',
          hint: 'Ghép thứ tự các hàng: Nghìn (4) - Trăm (5) - Chục (2) - Đơn vị (8)!',
          successMessage: 'Keng! Số 4528 chính xác! Phong ấn bóng tối hoàn toàn bị tiêu diệt! 🗝️🎉',
        },
      },
      {
        id: 'scene_5',
        background: '👑',
        character: '🐲',
        characterName: 'Hiệp Sĩ Rồng',
        dialogue:
          'Rồng Lửa đã được tự do và dang rộng đôi cánh bay lượn! Cảm ơn bạn nhỏ dũng cảm và tài ba nhất vương quốc! 🐲👑🔥',
        question: null,
      },
    ],
  },

  // ----------------------------------------------------
  // STORY 7: LỚP 4 - 5
  // ----------------------------------------------------
  {
    id: 'story_fraction_island',
    title: 'Đảo Hoang Bí Ẩn & Lâu Đài Phân Số',
    icon: '🏝️',
    coverGradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    ageRange: 'Lớp 4 - 5',
    gradeLevel: 4,
    topic: 'Cộng trừ phân số, quy đồng mẫu số & đại lượng tấn/tạ/yến',
    description: 'Giúp Thuyền Trưởng Vẹt Khéo chia đều bản đồ kho báu và tính toán tải trọng tàu chở vàng!',
    rewardCoins: 70,
    rewardXp: 140,
    scenes: [
      {
        id: 'scene_1',
        background: '🏴‍☠️',
        character: '🦜',
        characterName: 'Thuyền Trưởng Vẹt',
        dialogue:
          'Quác quác! Chào hoa tiêu nhí! Con tàu Ngọc Trai Đen vừa cập bến Đảo Phân Số. Kho báu vàng cổ xưa đang chờ chúng ta giải mã!',
        question: null,
      },
      {
        id: 'scene_2',
        background: '🗺️',
        character: '🦜',
        characterName: 'Thuyền Trưởng Vẹt',
        dialogue:
          'Bản đồ dẫn đường bị rách thành hai mảnh: Buổi sáng ta ghép được 2/7 tấm bản đồ, buổi chiều ghép thêm được 3/7 tấm bản đồ nữa. Hỏi cả ngày ta đã hoàn thành bao nhiêu phần tấm bản đồ?',
        question: {
          prompt: '2/7 + 3/7 = ?',
          options: ['5/14', '5/7', '6/7', '1/7'],
          answer: '5/7',
          hint: 'Cùng mẫu số 7, ta giữ nguyên mẫu số và cộng tử số: 2 + 3 = 5!',
          successMessage: 'Quá chuẩn xác! Ta đã có 5/7 tấm bản đồ chi tiết! 🗺️🦜',
        },
      },
      {
        id: 'scene_3',
        background: '⚖️',
        character: '🦜',
        characterName: 'Thuyền Trưởng Vẹt',
        dialogue:
          'Cây cầu treo chỉ chịu được tải trọng tối đa 2 tấn. Thùng rương kho báu nặng đúng 15 tạ. Đố hoa tiêu nhí 2 tấn bằng bao nhiêu tạ, và cầu có chở được rương không?',
        question: {
          prompt: '2 tấn = ? tạ',
          options: ['20 tạ', '200 tạ', '10 tạ', '2000 tạ'],
          answer: '20 tạ',
          hint: '1 tấn = 10 tạ, vậy 2 tấn = 20 tạ (lớn hơn 15 tạ nên qua cầu an toàn)!',
          successMessage: 'Chính xác! 2 tấn = 20 tạ! Cầu treo vững chãi cho rương 15 tạ đi qua! ⚖️💪',
        },
      },
      {
        id: 'scene_4',
        background: '💎',
        character: '🦜',
        characterName: 'Thuyền Trưởng Vẹt',
        dialogue:
          'Rương báu có 24 viên kim cương sáng chói. Ta thưởng cho hoa tiêu nhí 3/4 số kim cương đó. Hỏi bé được nhận bao nhiêu viên kim cương?',
        question: {
          prompt: 'Tìm 3/4 của 24 = (24 : 4) × 3 = ?',
          options: [16, 18, 20, 22],
          answer: 18,
          hint: 'Tính 24 chia 4 bằng 6, sau đó lấy 6 nhân 3!',
          successMessage: 'Tuyệt vời! Bé nhận trọn vẹn 18 viên kim cương lấp lánh! 💎💎💎',
        },
      },
      {
        id: 'scene_5',
        background: '🚢',
        character: '🦜',
        characterName: 'Thuyền Trưởng Vẹt',
        dialogue:
          'Hạ buồm căng gió trở về đất liền thôi! Hoa tiêu nhí xứng đáng là Đô Đốc Thông Thái của mọi vùng biển! 🚢🌊🎉',
        question: null,
      },
    ],
  },

  // ----------------------------------------------------
  // STORY 8: LỚP 5
  // ----------------------------------------------------
  {
    id: 'story_time_travel',
    title: 'Cỗ Máy Thời Gian & Cuộc Đua Vận Tốc',
    icon: '⚡',
    coverGradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    ageRange: 'Lớp 5',
    gradeLevel: 5,
    topic: 'Số thập phân, tỉ số phần trăm & bài toán chuyển động (s = v × t)',
    description: 'Khởi động cỗ máy thời gian lượng tử, du hành đến tương lai và giải cứu thành phố!',
    rewardCoins: 80,
    rewardXp: 160,
    scenes: [
      {
        id: 'scene_1',
        background: '⏳',
        character: '🤖',
        characterName: 'Giáo Sư Robot Einstein',
        dialogue:
          'Xin chào tiến sĩ toán học tương lai! Cỗ máy thời gian Chronos đang thiếu hụt năng lượng lượng tử để kích hoạt cổng không-thời gian. Hãy giúp ta tính toán các thông số phức tạp nhé!',
        question: null,
      },
      {
        id: 'scene_2',
        background: '🔋',
        character: '🤖',
        characterName: 'Giáo Sư Robot Einstein',
        dialogue:
          'Khối pin lượng tử A có dung lượng 4,75 Gigawatt, khối pin B có dung lượng 3,25 Gigawatt. Tổng năng lượng của hai khối pin là bao nhiêu?',
        question: {
          prompt: '4,75 + 3,25 = ?',
          options: [7, 7.5, 8, 8.2],
          answer: 8,
          hint: '0,75 + 0,25 = 1,00; 4 + 3 + 1 = 8,0 (tức là 8)!',
          successMessage: 'Hoàn hảo! Tổng năng lượng đạt đúng 8 Gigawatt! Cổng thời gian phát sáng! ⚡🔋',
        },
      },
      {
        id: 'scene_3',
        background: '🏎️',
        character: '🤖',
        characterName: 'Giáo Sư Robot Einstein',
        dialogue:
          'Cỗ máy bay với vận tốc đều v = 80 km/giờ. Để vượt qua đường hầm thời gian dài s = 240 km, cỗ máy cần bay trong thời gian t là bao nhiêu giờ?',
        question: {
          prompt: 'Thời gian t = s : v = 240 : 80 = ? giờ',
          options: ['2 giờ', '3 giờ', '4 giờ', '5 giờ'],
          answer: '3 giờ',
          hint: 'Lấy quãng đường 240 chia cho vận tốc 80: 24 : 8 = 3!',
          successMessage: 'Chính xác tuyệt đối! Cần đúng 3 giờ bay! Cỗ máy vượt qua hầm an toàn! ⏱️🏎️',
        },
      },
      {
        id: 'scene_4',
        background: '📊',
        character: '🤖',
        characterName: 'Giáo Sư Robot Einstein',
        dialogue:
          'Lá chắn bảo vệ thành phố ban đầu có 500 điểm giáp. Sau trận bão từ trường, lá chắn chỉ còn 40% công suất. Hỏi lá chắn hiện tại còn lại bao nhiêu điểm giáp?',
        question: {
          prompt: 'Tìm 40% của 500 = (500 × 40) : 100 = ?',
          options: [150, 200, 250, 300],
          answer: 200,
          hint: '500 × 40 = 20000; 20000 chia 100 bằng 200!',
          successMessage: 'Kỳ diệu! Lá chắn duy trì đúng 200 điểm giáp vững chắc! Thành phố đã được cứu! 🛡️✨',
        },
      },
      {
        id: 'scene_5',
        background: '🌟',
        character: '🤖',
        characterName: 'Giáo Sư Robot Einstein',
        dialogue:
          'Chúc mừng Nhà Khoa Học Toán Học Vĩ Đại! Bạn đã làm chủ không gian, thời gian và những đỉnh cao tri thức toán học Lớp 5! 🎓🚀🌟',
        question: null,
      },
    ],
  },
]

export default MATH_STORIES
