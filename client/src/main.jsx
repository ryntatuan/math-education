import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Đặt lại toàn bộ tiến độ học tập từ đầu theo yêu cầu
const APP_DATA_VERSION = 'v1_fresh_start_reset'
if (typeof window !== 'undefined' && localStorage.getItem('math_edu_data_version') !== APP_DATA_VERSION) {
  try {
    localStorage.removeItem('toan-vui-user')
    localStorage.removeItem('toan-vui-progress')
    localStorage.removeItem('toan-vui-pet')
    localStorage.removeItem('math_edu_league_storage')
    localStorage.setItem('math_edu_data_version', APP_DATA_VERSION)
  } catch (e) {
    console.warn('Lỗi reset dữ liệu cục bộ:', e)
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

