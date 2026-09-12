import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Edit3, Eraser, Trash2, X, Minimize2, Maximize2, PenTool } from 'lucide-react'
import Button from '../ui/Button'
import soundManager from '../../utils/soundManager'
import './ScratchpadModal.css'

const INK_COLORS = [
  { id: 'purple', label: 'Mực Tím', color: '#7950F2' },
  { id: 'blue', label: 'Mực Xanh', color: '#1C7ED6' },
  { id: 'red', label: 'Mực Đỏ', color: '#E03131' },
]

export default function ScratchpadModal({ isOpen, onClose }) {
  const canvasRef = useRef(null)
  const isDrawingRef = useRef(false)
  const [currentColor, setCurrentColor] = useState(INK_COLORS[0].color)
  const [isEraser, setIsEraser] = useState(false)
  const [lineWidth, setLineWidth] = useState(3)
  const [isMinimized, setIsMinimized] = useState(false)

  // Draw Vietnamese student notebook grid (vở 4 ô ly)
  const drawGrid = (ctx, width, height) => {
    ctx.save()
    ctx.fillStyle = '#FAFCFF'
    ctx.fillRect(0, 0, width, height)

    // Major grid lines (đường kẻ đậm)
    const step = 28
    ctx.strokeStyle = '#D0EBFF'
    ctx.lineWidth = 1

    for (let x = 0; x < width; x += step) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()
    }

    for (let y = 0; y < height; y += step) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }

    // Horizontal main lines (đường kẻ ly ngang)
    ctx.strokeStyle = '#A5D8FF'
    ctx.lineWidth = 1.2
    for (let y = 0; y < height; y += step * 4) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }

    ctx.restore()
  }

  // Setup canvas size
  useEffect(() => {
    if (!isOpen) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    drawGrid(ctx, rect.width, rect.height)
  }, [isOpen, isMinimized])

  // Get coordinates
  const getPos = (e) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }
    const rect = canvas.getBoundingClientRect()
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }

  const startDrawing = (e) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const { x, y } = getPos(e)

    isDrawingRef.current = true
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const draw = (e) => {
    if (!isDrawingRef.current) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const { x, y } = getPos(e)

    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    if (isEraser) {
      ctx.strokeStyle = '#FAFCFF'
      ctx.lineWidth = 18
    } else {
      ctx.strokeStyle = currentColor
      ctx.lineWidth = lineWidth
    }

    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const stopDrawing = () => {
    isDrawingRef.current = false
  }

  const handleClear = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    drawGrid(ctx, rect.width, rect.height)
    soundManager.playClick()
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className={`scratchpad-backdrop ${isMinimized ? 'minimized' : ''}`}>
        <motion.div
          className={`scratchpad-container ${isMinimized ? 'is-min' : ''}`}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        >
          {/* Header Bar */}
          <div className="scratchpad-header">
            <div className="scratchpad-title">
              <span className="title-icon">📝</span>
              <span>Bảng Viết Nháp Đặt Tính</span>
              <span className="paper-tag">Vở Ô Ly Học Sinh</span>
            </div>

            <div className="scratchpad-controls">
              {/* Color selectors */}
              <div className="color-pills">
                {INK_COLORS.map((c) => (
                  <button
                    key={c.id}
                    className={`color-dot ${currentColor === c.color && !isEraser ? 'active' : ''}`}
                    style={{ backgroundColor: c.color }}
                    title={c.label}
                    onClick={() => {
                      setCurrentColor(c.color)
                      setIsEraser(false)
                      soundManager.playClick()
                    }}
                  />
                ))}
              </div>

              {/* Eraser */}
              <button
                className={`tool-btn ${isEraser ? 'active' : ''}`}
                onClick={() => {
                  setIsEraser(!isEraser)
                  soundManager.playClick()
                }}
                title="Cục Tẩy"
              >
                <Eraser size={18} />
                <span className="tool-btn-label">Tẩy</span>
              </button>

              {/* Clear */}
              <button className="tool-btn danger" onClick={handleClear} title="Xóa sạch">
                <Trash2 size={18} />
                <span className="tool-btn-label">Xóa hết</span>
              </button>

              {/* Minimize / Maximize */}
              <button
                className="tool-btn icon-only"
                onClick={() => setIsMinimized(!isMinimized)}
                title={isMinimized ? 'Mở rộng' : 'Thu nhỏ'}
              >
                {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
              </button>

              {/* Close */}
              <button className="tool-btn close-btn" onClick={onClose} title="Đóng bảng nháp">
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Canvas Board */}
          <div className="scratchpad-body">
            <canvas
              ref={canvasRef}
              className="scratchpad-canvas"
              onPointerDown={startDrawing}
              onPointerMove={draw}
              onPointerUp={stopDrawing}
              onPointerLeave={stopDrawing}
            />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
