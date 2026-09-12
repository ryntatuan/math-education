// Interactive Math Stories Data (Visual Novel / Storybook format)
export const MATH_STORIES = [
  {
    id: 'story_picnic',
    title: 'Chuyến Dã Ngoại Của Thỏ Và Rùa',
    icon: '🧺',
    coverGradient: 'linear-gradient(135deg, #a8ff78 0%, #78ffd6 100%)',
    ageRange: 'Lớp 1 - 2',
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
        background: '🐢',
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
  {
    id: 'story_bakery',
    title: 'Tiệm Bánh Kỳ Diệu Của Bác Gấu',
    icon: '🎂',
    coverGradient: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
    ageRange: 'Lớp 2 - 3',
    topic: 'Khái niệm phân số & phép nhân cơ bản',
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
          successMessage: 'Chính xác! Đó chính là 1/4 chiếc bánh pizza thơm giòn!',
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
          successMessage: 'Hoan hô! 12 chia 3 bằng 4 hạt dẻ cho mỗi bạn!',
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
  {
    id: 'story_detective',
    title: 'Thám Tử Rừng Xanh & Bí Mật Hình Học',
    icon: '🔍',
    coverGradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)',
    ageRange: 'Lớp 2 - 4',
    topic: 'Hình học, chu vi & đo lường đơn vị',
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
]

export default MATH_STORIES
