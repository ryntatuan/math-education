import fs from 'fs';
import path from 'path';

const dataDir = './client/src/data';
const grades = ['grade1', 'grade2', 'grade3', 'grade4', 'grade5'];

for (const grade of grades) {
  const dir = path.join(dataDir, grade);
  if (!fs.existsSync(dir)) continue;
  
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'));
  console.log(`\n=== ${grade.toUpperCase()} ===`);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Extract chapter name and ID using basic regex
    const nameMatch = content.match(/name:\s*["']([^"']+)["']/);
    const idMatch = content.match(/id:\s*["']([^"']+)["']/);
    
    const chapterName = nameMatch ? nameMatch[1] : 'Unknown';
    const chapterId = idMatch ? idMatch[1] : file;
    
    let hasSolid = /kind:\s*['"](cuboid|cube|cylinder|sphere)['"]/.test(content);
    let hasSolidText = /(khối hộp chữ nhật|khối lập phương|khối trụ|khối cầu)/i.test(content);
    let hasFraction = /phân số/i.test(content) || /fraction/.test(content);
    let hasPlaneShape = /kind:\s*['"](square|rectangle|circle|triangle)['"]/.test(content);
    
    let warnings = [];
    
    // Grade 1 Rules
    if (grade === 'grade1') {
      if (hasFraction) warnings.push('⚠️ Có chứa Phân số (Grade 1 chưa học)');
      if (hasSolid && chapterId !== 'g1-c4') warnings.push('⚠️ Có chứa Hình khối 3D ngoài chương 4');
      if (hasSolidText && chapterId !== 'g1-c4') warnings.push('⚠️ Có nhắc đến Khối 3D ngoài chương 4');
      if (chapterId === 'g1-c4' && hasPlaneShape) warnings.push('⚠️ Chương 4 nhắc lại quá nhiều hình phẳng? (Check thủ công)');
    }
    
    // Grade 2 Rules
    if (grade === 'grade2') {
      if (hasFraction) warnings.push('⚠️ Có chứa Phân số (Grade 2 chưa học)');
      if (hasSolid && chapterId !== 'g2-c9' && chapterId !== 'g2-c5') { // c5 might be ôn tập? Let's check any solid outside c9/c5
        warnings.push('⚠️ Có chứa Hình khối 3D ngoài chương 9/5');
      }
      if (hasSolidText && chapterId !== 'g2-c9' && chapterId !== 'g2-c5' && chapterId !== 'g2-c6') {
        warnings.push('⚠️ Có nhắc đến Khối 3D ngoài chương 9/5/6');
      }
    }
    
    // Grade 3 Rules
    if (grade === 'grade3') {
      if (hasFraction) warnings.push('⚠️ Có chứa Phân số (Grade 3 chưa học - Grade 4 mới học)');
    }

    if (warnings.length > 0) {
      console.log(`[${chapterId}] ${chapterName}`);
      warnings.forEach(w => console.log(`  -> ${w}`));
    }
  }
}
