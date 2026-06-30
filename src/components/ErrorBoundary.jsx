import { Component } from 'react'

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: '#10101c',
    color: '#e0e0e0',
    fontFamily: "'Inter', 'Noto Sans SC', sans-serif",
    padding: '2rem',
    textAlign: 'center',
  },
  icon: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 700,
    marginBottom: '0.5rem',
    background: 'linear-gradient(135deg, #6366f1, #a855f7, #ec4899)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  desc: {
    color: '#888',
    marginBottom: '1.5rem',
    maxWidth: '500px',
    lineHeight: 1.7,
  },
  btn: {
    padding: '12px 28px',
    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontWeight: 600,
    fontSize: '0.95rem',
    cursor: 'pointer',
    fontFamily: 'inherit',
  },
}

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={styles.wrapper}>
          <div style={styles.icon}>⚠</div>
          <h1 style={styles.title}>页面出错了</h1>
          <p style={styles.desc}>
            抱歉，页面渲染遇到了一些问题。请尝试刷新页面，如果问题仍然存在请联系我。
          </p>
          <button style={styles.btn} onClick={() => window.location.reload()}>
            刷新页面
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
