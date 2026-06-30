import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import './CollabDemo.css'

const QUESTIONS = [
  { id: 'Q1', title: '您对产品的整体满意度？', options: ['非常满意', '比较满意', '一般'] },
  { id: 'Q2', title: '您最看重哪个方面？', options: ['品质', '价格', '服务'] },
  { id: 'Q3', title: '您会推荐给朋友吗？', options: ['一定会', '可能会', '不会'] },
]

export default function CollabDemo() {
  const [mainQ, setMainQ] = useState(0)
  const [collabQ, setCollabQ] = useState(0)
  const [mainSelected, setMainSelected] = useState(-1)
  const [collabPrev, setCollabPrev] = useState(null)
  const [finished, setFinished] = useState(false)
  const timers = useRef([])

  const clearTimers = () => timers.current.forEach(clearTimeout)

  useEffect(() => {
    clearTimers()
    setMainQ(0)
    setCollabQ(0)
    setMainSelected(-1)
    setCollabPrev(null)
    setFinished(false)

    const t = (ms, fn) => { const id = setTimeout(fn, ms); timers.current.push(id) }

    // Q1: main selects option 1
    t(1500, () => setMainSelected(1))
    // Both move to Q2
    t(2800, () => { setMainQ(1); setCollabQ(1); setCollabPrev({ q: 'Q1', opt: '比较满意' }); setMainSelected(-1) })
    // Q2: main selects option 0
    t(4200, () => setMainSelected(0))
    // Both move to Q3
    t(5500, () => { setMainQ(2); setCollabQ(2); setCollabPrev({ q: 'Q2', opt: '品质' }); setMainSelected(-1) })
    // Q3: main selects option 0
    t(6800, () => setMainSelected(0))
    // Finish
    t(8200, () => setFinished(true))

    return clearTimers
  }, [])

  const progress = finished ? 100 : ((mainQ + (mainSelected >= 0 ? 1 : 0)) / (QUESTIONS.length + 0.5)) * 100

  const renderPanel = (isMain) => {
    const qIdx = isMain ? mainQ : collabQ

    if (finished) {
      return (
        <div className="cd-endpage success">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="cd-end-inner">
            <div className="cd-end-icon">🎉</div>
            <div className="cd-end-title">问卷已完成！</div>
            <div className="cd-end-desc">感谢您的参与，所有题目已回答完毕</div>
          </motion.div>
        </div>
      )
    }

    const q = QUESTIONS[qIdx]
    return (
      <motion.div key={`${isMain ? 'm' : 'c'}-${qIdx}`} className="cd-q-body" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
        <div className="cd-q-title">{q.title}</div>
        <div className="cd-q-opts">
          {q.options.map((opt, i) => (
            <div key={opt} className={`cd-opt ${isMain && mainSelected === i && mainQ === qIdx ? 'selected' : ''} ${!isMain ? 'disabled' : ''}`}>
              <span className="cd-opt-dot" />
              <span>{opt}</span>
            </div>
          ))}
        </div>
      </motion.div>
    )
  }

  return (
    <div className="collab-demo">
      {/* Main user panel */}
      <div className="cd-user-panel main">
        <div className="cd-panel-header">
          <span className="cd-user-avatar" style={{ background: 'linear-gradient(135deg, #6366f1, #818cf8)' }}>主</span>
          <span className="cd-user-label">主答题者</span>
          <span className="cd-mode-badge normal">正常模式</span>
        </div>
        <div className="cd-progress"><div className="cd-progress-fill main" style={{ width: `${progress}%` }} /></div>
        <div className="cd-nav">
          <span className="cd-nav-label">题目导航：</span>
          <span className="cd-nav-q">{finished ? '已完成' : `${QUESTIONS[mainQ]?.id} ${QUESTIONS[mainQ]?.title}`}</span>
        </div>
        <div className="cd-question">{renderPanel(true)}</div>
        {!finished && (
          <div className="cd-actions">
            {mainQ > 0 && <button className="cd-btn prev">上一题</button>}
            <button className="cd-btn next">下一题</button>
          </div>
        )}
      </div>

      {/* Sync indicator */}
      <div className="cd-divider">
        <motion.div className="cd-sync-pulse" animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 2, repeat: Infinity }} />
      </div>

      {/* Collab user panel */}
      <div className="cd-user-panel collab">
        <div className="cd-panel-header">
          <span className="cd-user-avatar" style={{ background: 'linear-gradient(135deg, #ec4899, #f472b6)' }}>协</span>
          <span className="cd-user-label">协作模式</span>
          <span className="cd-mode-badge collab">只查看，不可作答</span>
        </div>
        {!finished && collabPrev && (
          <motion.div className="cd-prev-answer" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
            上一题作答：{collabPrev.q} → {collabPrev.opt}
          </motion.div>
        )}
        <div className="cd-progress"><div className="cd-progress-fill collab" style={{ width: `${progress}%` }} /></div>
        <div className="cd-nav">
          <span className="cd-nav-label">题目导航：</span>
          <span className="cd-nav-q">{finished ? '已完成' : `${QUESTIONS[collabQ]?.id} ${QUESTIONS[collabQ]?.title}`}</span>
        </div>
        <div className="cd-question readonly">{renderPanel(false)}</div>
        {!finished && (
          <div className="cd-actions">
            {collabQ > 0 && <button className="cd-btn prev disabled-btn">上一题</button>}
            <button className="cd-btn next disabled-btn">下一题</button>
          </div>
        )}
      </div>
    </div>
  )
}
