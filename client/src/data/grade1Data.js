import { g1c1 } from './grade1/g1c1.js';
import { g1c2 } from './grade1/g1c2.js';
import { g1c3 } from './grade1/g1c3.js';
import { g1c4 } from './grade1/g1c4.js';
import { g1c5 } from './grade1/g1c5.js';
import { g1c6 } from './grade1/g1c6.js';
import { g1c7 } from './grade1/g1c7.js';
import { g1c8 } from './grade1/g1c8.js';
import { g1c9 } from './grade1/g1c9.js';
import { g1c10 } from './grade1/g1c10.js';

export const grade1Data = {
  id: 1,
  name: "Lớp 1",
  description: "Các số đến 100, phép cộng trừ trong phạm vi 10 và 100 (không nhớ), hình học, đo lường và thời gian",
  icon: "🌱",
  color: "#4facfe",
  ageRange: "6-7 tuổi",
  chapters: [
    g1c1,
    g1c2,
    g1c3,
    g1c4,
    g1c5,
    g1c6,
    g1c7,
    g1c8,
    g1c9,
    g1c10
  ]
};
