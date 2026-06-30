import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './QuotaDemo.css'

const QUESTIONS = [
  { id: 'gender', title: '您的性别是？', type: '单选题', options: ['男', '女'], isQuota: true, quotaTarget: '男' },
  { id: 'age', title: '您的年龄段是？', type: '单选题', options: ['18岁以下', '18-25岁', '26-35岁', '36岁以上'] },
  { id: 'city', title: '您所在的城市是？', type: '单选题', options: ['北京', '上海', '广州', '深圳', '其他'] },
]

export default function QuotaDemo() {
  const [phase, setPhase] = useState('idle')
  const [quota, setQuota] = useState(1)
  const [u1, setU1] = useState({ q: 0, opt: -1, done: false })
  const [u2, setU2] = useState({ q: 0, opt: -1, done: false })
  const [winner, setWinner] = useState(null)
  const timerRef = useRef(null)

  const runDemo = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    setPhase('filling')
    setQuota(1)
    setWinner(null)
    setU1({ q: 0, opt: -1, done: false })
    setU2({ q: 0, opt: -1, done: false })

    const steps = [
      { delay: 800, action: () => setU1(p => ({ ...p, q: 0 })) },
      { delay: 1600, action: () => setU2(p => ({ ...p, q: 0 })) },
      { delay: 2600, action: () => setU1(p => ({ ...p, opt: 0 })) },
      { delay: 3800, action: () => setU1(p => ({ ...p, q: 1, opt: -1 })) },
      { delay: 4400, action: () => setU2(p => ({ ...p, opt: 0 })) },
      { delay: 5200, action: () => setU2(p => ({ ...p, q: 1, opt: -1 })) },
      { delay: 5800, action: () => setU1(p => ({ ...p, opt: 1 })) },
      { delay: 6600, action: () => setU1(p => ({ ...p, q: 2, opt: -1 })) },
      { delay: 7200, action: () => setU2(p => ({ ...p, opt: 2 })) },
      { delay: 8000, action: () => setU2(p => ({ ...p, q: 2, opt: -1 })) },
      { delay: 8600, action: () => setU1(p => ({ ...p, opt: 2 })) },
      { delay: 9400, action: () => { setU1(p => ({ ...p, done: true })); setWinner(1); setPhase('u1-wins') } },
      { delay: 10200, action: () => setU2(p => ({ ...p, opt: 3 })) },
      { delay: 11200, action: () => { setU2(p => ({ ...p, done: true })); setPhase('u2-blocked'); clearInterval(timerRef.current) } },
    ]

    let timeoutIds = []
    let acc = 0
    steps.forEach((s) => {
      acc += s.delay - (timeoutIds.length > 0 ? steps[timeoutIds.length - 1].delay : 0)
      const id = setTimeout(s.action, acc)
      timeoutIds.push(id)
    })
    timerRef.current = { clearTimeout: () => timeoutIds.forEach(clearTimeout) }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => runDemo(), 500)
    return () => { clearTimeout(timer); if (timerRef.current) timerRef.current.clearTimeout() }
  }, [runDemo])

  const renderUser = (userId, userState) => {
    if (userState.done && winner === userId) {
      return (
        <motion.div className="qd-endpage success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="qd-endpage-icon">🎉</div>
          <div className="qd-endpage-title">问卷已完成！</div>
          <div className="qd-endpage-desc">感谢您的参与，竞争成功</div>
        </motion.div>
      )
    }
    if (userState.done && winner !== userId) {
      return (
        <motion.div className="qd-endpage fail" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="qd-endpage-icon">😔</div>
          <div className="qd-endpage-title">配额已满</div>
          <div className="qd-endpage-desc">很抱歉，该选项配额已被其他用户抢占</div>
        </motion.div>
      )
    }

    const q = QUESTIONS[userState.q]
    if (!q) return null

    return (
      <motion.div className="qd-q" key={`${userId}-${userState.q}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
        <div className="qd-q-header">
          <span className="qd-q-num">Q{userState.q + 1}</span>
          <span className="qd-q-type">{q.type}{q.isQuota ? ' · 配额限制' : ''}</span>
        </div>
        <div className="qd-q-title">{q.title}</div>
        <div className="qd-q-opts">
          {q.options.map((opt) => {
            const selected = userState.opt >= 0 && q.options[userState.opt] === opt
            return (
              <div key={opt} className={`qd-q-opt ${selected ? 'selected' : ''}`}>
                <span className="qd-q-radio" />
                <span>{opt}</span>
                {q.isQuota && opt === q.quotaTarget && <span className="qd-q-quota-badge">剩余{quota}个</span>}
              </div>
            )
          })}
        </div>
        <div className="qd-q-progress">第 {userState.q + 1} / {QUESTIONS.length} 题</div>
      </motion.div>
    )
  }

  return (
    <div className="quota-demo">
      <div className="qd-top-bar">
        <div className="qd-quota-info">
          <span className="qd-quota-label">配额剩余</span>
          <span className={`qd-quota-num ${quota <= 0 ? 'empty' : ''}`}>{quota}</span>
          <span className="qd-quota-total">/ 1（男）</span>
        </div>
        <div className="qd-status-badge">
          {phase === 'filling' && <><span className="qd-badge-dot live" /> 填写中</>}
          {phase === 'u1-wins' && <><span className="qd-badge-dot win" /> 用户A完成</>}
          {phase === 'u2-blocked' && <><span className="qd-badge-dot blocked" /> 用户B被阻断</>}
        </div>
      </div>

      <div className="qd-users-grid">
        <div className="qd-user-panel">
          <div className="qd-user-head">
            <div className="qd-user-avatar" style={{ background: 'linear-gradient(135deg, #6366f1, #818cf8)' }}>A</div>
            <span className="qd-user-name">用户 A</span>
            {winner === 1 && <span className="qd-badge win">✓ 完成</span>}
            {winner === 2 && <span className="qd-badge blocked">✗ 阻断</span>}
          </div>
          <div className="qd-user-body">
            <AnimatePresence mode="wait">
              {renderUser(1, u1)}
            </AnimatePresence>
          </div>
        </div>

        <div className="qd-divider">
          <span className="qd-vs-text">VS</span>
        </div>

        <div className="qd-user-panel">
          <div className="qd-user-head">
            <div className="qd-user-avatar" style={{ background: 'linear-gradient(135deg, #ec4899, #f472b6)' }}>B</div>
            <span className="qd-user-name">用户 B</span>
            {winner === 2 && <span className="qd-badge win">✓ 完成</span>}
            {winner === 1 && <span className="qd-badge blocked">✗ 阻断</span>}
          </div>
          <div className="qd-user-body">
            <AnimatePresence mode="wait">
              {renderUser(2, u2)}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="qd-tech-bar">
        <span className="qd-tech-icon">⚙️</span>
        <span>Redis原子计数器 + Lua脚本 → 毫秒级配额扣减，保证高并发数据强一致性</span>
      </div>
    </div>
  )
}
