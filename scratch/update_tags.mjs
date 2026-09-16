import fs from 'fs';

const filePath = 'client/src/utils/exerciseGenerator.js';
let content = fs.readFileSync(filePath, 'utf-8');

// Replace review chapters with explicit names
content = content.replace(/{ id: 'g1_final_review', name: 'Ôn tập cuối năm Lớp 1', icon: '🏆', chapter: 'Chương 10' }/g, 
  "{ id: 'g1_final_review', name: 'Ôn tập cuối năm Lớp 1', icon: '🏆', chapter: 'Tổng hợp cuối năm' }");

content = content.replace(/{ id: 'g3_final_review', name: 'Ôn tập cuối năm Lớp 3', icon: '🏆', chapter: 'Chương 10' }/g, 
  "{ id: 'g3_final_review', name: 'Ôn tập cuối năm Lớp 3', icon: '🏆', chapter: 'Tổng hợp cuối năm' }");

content = content.replace(/{ id: 'g4_final_review', name: 'Ôn tập cuối năm Lớp 4', icon: '🏆', chapter: 'Chương 6' }/g, 
  "{ id: 'g4_final_review', name: 'Ôn tập cuối năm Lớp 4', icon: '🏆', chapter: 'Tổng hợp cuối năm' }");

content = content.replace(/{ id: 'g5_final_review', name: 'Ôn tập cuối năm & Thi chuyển cấp', icon: '🏆', chapter: 'Chương 5' }/g, 
  "{ id: 'g5_final_review', name: 'Ôn tập cuối năm & Thi chuyển cấp', icon: '🏆', chapter: 'Tổng hợp cuối năm' }");

content = content.replace(/{ id: 'g2_review_100', name: 'Ôn tập & Bổ sung \\(Tia số, liền trước, liền sau\\)', icon: '🔙', chapter: 'Chương 1' }/g, 
  "{ id: 'g2_review_100', name: 'Ôn tập & Bổ sung (Tia số, liền trước, liền sau)', icon: '🔙', chapter: 'Ôn tập đầu năm' }");

content = content.replace(/{ id: 'g3_review_1000', name: 'Ôn tập & Bổ sung \\(Số đến 1 000\\)', icon: '🔙', chapter: 'Chương 1' }/g, 
  "{ id: 'g3_review_1000', name: 'Ôn tập & Bổ sung (Số đến 1 000)', icon: '🔙', chapter: 'Ôn tập đầu năm' }");

// Inject g2_final_review
if (!content.includes("g2_final_review")) {
  content = content.replace(
    "{ id: 'g2_time_calendar', name: 'Xem đồng hồ (giờ, phút) & Lịch tháng', icon: '📅', chapter: 'Chương 10' }",
    "{ id: 'g2_time_calendar', name: 'Xem đồng hồ (giờ, phút) & Lịch tháng', icon: '📅', chapter: 'Chương 10' },\n    { id: 'g2_final_review', name: 'Ôn tập cuối năm Lớp 2', icon: '🏆', chapter: 'Tổng hợp cuối năm' }"
  );

  content = content.replace(
    "if (topic === 'g2_review_100')",
    "if (topic === 'g2_final_review') return generateQuestion(2, TOPICS.GRADE_2[randInt(1, 9)].id);\n  if (topic === 'g2_review_100')"
  );
}

fs.writeFileSync(filePath, content);
console.log('Updated tags successfully!');
