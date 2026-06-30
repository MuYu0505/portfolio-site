import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import './AutoTestDemo.css'

const QUESTIONS = [
  { id: 'S1', type: '单选', title: '您的性别是？', options: ['男', '女'] },
  { id: 'S2', type: '单选', title: '您的年龄段是？', options: ['18岁以下', '18-25岁', '26-35岁', '36岁以上'] },
  { id: 'S3', type: '多选', title: '您关注的品类？', options: ['食品', '饮料', '日用品', '电子产品'] },
  { id: 'S4', type: '填空', title: '请填写您的职业' },
]

const LOGS = [
  { time: '14:23:01', type: 'scan', msg: '扫描问卷结构... 发现4道题' },
  { time: '14:23:02', type: 'ai', msg: 'AI分析：S1选"男"会触发配额竞争，已标记规避' },
  { time: '14:23:03', type: 'click', msg: 'S1 选择"女" ✓' },
  { time: '14:23:04', type: 'ai', msg: 'AI分析：S2无限制，随机选择' },
  { time: '14:23:05', type: 'click', msg: 'S2 选择"26-35岁" ✓' },
  { time: '14:23:06', type: 'click', msg: 'S3 勾选"饮料""食品" ✓' },
  { time: '14:23:07', type: 'type', msg: 'S4 自动填写"软件工程师" ✓' },
  { time: '14:23:08', type: 'done', msg: '问卷提交成功！用时7.2s' },
]

export default function AutoTestDemo() {
  const [logIdx, setLogIdx] = useState(-1)
  const [activeQ, setActiveQ] = useState(-1)
  const [selectedOpts, setSelectedOpts] = useState({})
  const timerRef = useRef(null)

  useEffect(() => {
    setLogIdx(-1)
    setActiveQ(-1)
    setSelectedOpts({})

    const steps = LOGS.map((log, i) => {
      return {
        delay: i === 0 ? 800 : 1400,
        fn: () => {
          setLogIdx(i)
          if (log.type === 'click' || log.type === 'type') {
            const qId = log.msg.split(' ')[0]
            setActiveQ(qId)
            setSelectedOpts(prev => {
              const q = QUESTIONS.find(q => q.id === qId)
              if (!q) return prev
              if (q.type === '多选') {
                const opt = log.msg.match(/"(.+?)"/)?.[1]
                const existing = prev[qId] || []
                return { ...prev, [qId]: [...existing, opt] }
              }
              if (q.type === '填空') {
                return { ...prev, [qId]: '软件工程师' }
              }
              const opt = log.msg.match(/"(.+?)"/)?.[1]
              return { ...prev, [qId]: opt }
            })
          }
        }
      }
    })

    let acc = 0
    const ids = []
    steps.forEach((s) => {
      acc += s.delay
      ids.push(setTimeout(s.fn, acc))
    })
    timerRef.current = ids

    return () => ids.forEach(clearTimeout)
  }, [])

  return (
    <div className="autotest-demo">
      <div className="atd-left">
        <div className="atd-survey">
          <div className="atd-survey-title">问卷预览</div>
          {QUESTIONS.map((q) => (
            <div key={q.id} className={`atd-q ${activeQ === q.id ? 'active' : ''}`}>
              <div className="atd-q-header">
                <span className="atd-q-badge">{q.id}</span>
                <span className="atd-q-type">{q.type}题</span>
              </div>
              <div className="atd-q-title">{q.title}</div>
              {q.options && (
                <div className="atd-q-opts">
                  {q.options.map((opt) => (
                    <div key={opt} className={`atd-opt ${(selectedOpts[q.id] === opt || (Array.isArray(selectedOpts[q.id]) && selectedOpts[q.id].includes(opt))) ? 'selected' : ''}`}>
                      <span className="atd-opt-dot" />
                      <span>{opt}</span>
                    </div>
                  ))}
                </div>
              )}
              {q.type === '填空' && (
                <div className="atd-q-input">
                  {selectedOpts[q.id] || <span className="atd-cursor">|</span>}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="atd-right">
        <div className="atd-panel-header">
          <span className="atd-panel-icon">🧪</span>
          <span className="atd-panel-title">自动化测试引擎</span>
          <span className={`atd-status ${logIdx >= LOGS.length - 1 ? 'done' : logIdx >= 0 ? 'running' : ''}`}>
            {logIdx >= LOGS.length - 1 ? '✓ 完成' : logIdx >= 0 ? '● 运行中' : '等待启动'}
          </span>
        </div>
        <div className="atd-log-area">
          {LOGS.slice(0, logIdx + 1).map((log, i) => (
            <motion.div
              key={i}
              className={`atd-log-line ${log.type}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              <span className="atd-log-time">{log.time}</span>
              <span className={`atd-log-tag ${log.type}`}>
                {log.type === 'scan' && '🔍'}
                {log.type === 'ai' && '🤖'}
                {log.type === 'click' && '👆'}
                {log.type === 'type' && '⌨️'}
                {log.type === 'done' && '✅'}
              </span>
              <span className="atd-log-msg">{log.msg}</span>
            </motion.div>
          ))}
          {logIdx < LOGS.length - 1 && logIdx >= 0 && (
            <div className="atd-log-cursor">_</div>
          )}
        </div>
        <div className="atd-tech-bar">
          <span>Python + Playwright + Qwen大模型</span>
          <span className="atd-tech-tag">智能规避逻辑陷阱与配额限制</span>
        </div>
      </div>
    </div>
  )
}
