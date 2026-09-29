const fs = require('fs');
const css = `
/* ========================================
   COMPACT HEIGHT FOR LAPTOPS (Prevent Scrolling)
   ======================================== */
@media (max-height: 850px) and (min-width: 641px) {
  .lesson-page {
    height: calc(100vh - 80px);
    min-height: 0;
    overflow: hidden;
  }
  .lesson-slide {
    flex: 1;
    min-height: 0;
    padding: 0 0 8px 0;
  }
  .lesson-nav {
    padding: 10px 0;
  }
  .lesson-nav-btn {
    height: 46px;
    font-size: 1rem;
  }
  .slide-visual-card,
  .slide-story-card,
  .slide-concept-card,
  .slide-quiz-card,
  .interactive-slide-container {
    padding: 16px 24px !important;
    gap: 12px !important;
    max-height: 100%;
    overflow: hidden;
  }
  .story-mascot-hero,
  .concept-mascot,
  .quiz-mascot,
  .visual-mascot {
    display: none !important;
  }
  .visual-header-banner,
  .story-header-banner,
  .concept-header-banner,
  .quiz-header-banner {
    padding-bottom: 4px !important;
  }
  .slide-visual-text,
  .story-dialog-text,
  .concept-explanation,
  .quiz-question-text {
    font-size: 1.15rem !important;
    margin: 0 !important;
  }
  .story-dialog-bubble, .concept-explanation-box, .quiz-question-box {
    padding: 10px 16px !important;
  }
  .slide-visual-card svg,
  .slide-story-card svg,
  .slide-concept-card svg,
  .slide-quiz-card svg {
    max-height: 35vh !important;
    width: auto !important;
    height: auto !important;
    margin: 0 auto !important;
  }
  .quiz-options-grid {
    gap: 8px !important;
  }
  .quiz-option-btn {
    padding: 8px 12px !important;
    min-height: 46px !important;
  }
}
`;
fs.appendFileSync('./client/src/pages/LessonPage.css', css);
console.log('Appended clean max-height CSS');
