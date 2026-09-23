import { g5c1 } from './grade5/g5c1.js';
import { g5c2 } from './grade5/g5c2.js';
import { g5c3 } from './grade5/g5c3.js';
import { g5c4 } from './grade5/g5c4.js';
import { g5c5 } from './grade5/g5c5.js';

export const grade5Data = {
  id: 5,
  name: "Lớp 5",
  description: "Phân số, số thập phân, tỉ số phần trăm, diện tích & thể tích hình khối, toán chuyển động đều",
  icon: "🎓",
  color: "#6366f1",
  ageRange: "10-11 tuổi",
  chapters: [
    g5c1,
    g5c2,
    g5c3,
    g5c4,
    g5c5
  ]
};
