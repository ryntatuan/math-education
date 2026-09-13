import React, { Component } from 'react'
import { RotateCcw, Home, AlertTriangle } from 'lucide-react'
import Button from '../ui/Button'
import MascotIcon from './MascotIcon'
import './ErrorBoundary.css'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      showDetails: false,
    }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary caught error]:', error, errorInfo)
    this.setState({ errorInfo })
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
    if (this.props.onReset) {
      this.props.onReset()
    } else {
      window.location.reload()
    }
  }

  handleGoHome = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-container">
          <div className="error-boundary-card">
            <div className="error-mascot-badge">
              <span className="error-mascot-emoji">
                <MascotIcon size={38} />
              </span>
              <span className="error-bubble">Ối chà!</span>
            </div>

            <h2 className="error-boundary-title">Có một chút trục trặc nhỏ!</h2>
            <p className="error-boundary-desc">
              Đừng lo lắng, dữ liệu điểm số và huy hiệu của bạn vẫn an toàn. Hãy thử làm mới lại trang hoặc quay về trang chủ nhé!
            </p>

            <div className="error-boundary-actions">
              <Button
                variant="primary"
                size="lg"
                onClick={this.handleReset}
                className="error-action-btn"
              >
                <RotateCcw size={18} /> Thử lại ngay
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={this.handleGoHome}
                className="error-action-btn"
              >
                <Home size={18} /> Về trang chủ
              </Button>
            </div>

            {/* Collapsible diagnostic details */}
            <div className="error-details-wrapper">
              <button
                type="button"
                className="error-details-toggle"
                onClick={() => this.setState((prev) => ({ showDetails: !prev.showDetails }))}
              >
                <AlertTriangle size={14} />
                <span>{this.state.showDetails ? 'Ẩn chi tiết kỹ thuật' : 'Xem chi tiết kỹ thuật'}</span>
              </button>

              {this.state.showDetails && (
                <div className="error-details-content">
                  <pre className="error-message-text">
                    {this.state.error?.toString()}
                  </pre>
                  {this.state.errorInfo?.componentStack && (
                    <pre className="error-stack-text">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
