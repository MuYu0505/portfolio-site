import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './AIScriptDemo.css'

const AI_RESPONSE = `// 执行前脚本 - 逻辑跳转
function beforeExecute(ctx) {
  const gender = ctx.getAnswer('S1');
  const age = ctx.getAnswer('S2');
  if (gender === '男' && age === '18-25岁') {
    ctx.jumpTo('S5');
  }
  if (gender === '女') {
    ctx.hideQuestion('S8');
  }
  return true;
}`

const PROMPT_TEXT = '在执行前脚本中，当用户选择男性且年龄18-25岁时，自动跳转到S5题目'

export default function AIScriptDemo() {
  const [phase, setPhase] = useState('editor')
  const [showAI, setShowAI] = useState(false)
  const [typedPrompt, setTypedPrompt] = useState('')
  const [showResponse, setShowResponse] = useState(false)
  const [typedResponse, setTypedResponse] = useState('')
  const timers = useRef([])

  const clearTimers = () => timers.current.forEach(clearTimeout)

  useEffect(() => {
    clearTimers()
    setPhase('editor')
    setShowAI(false)
    setTypedPrompt('')
    setShowResponse(false)
    setTypedResponse('')

    const t = (ms, fn) => { const id = setTimeout(fn, ms); timers.current.push(id) }

    t(800, () => setShowAI(true))
    t(1500, () => setPhase('typing'))

    let typeIdx = 0
    const startTyping = () => {
      const typeTimer = setInterval(() => {
        if (typeIdx < PROMPT_TEXT.length) {
          typeIdx++
          setTypedPrompt(PROMPT_TEXT.slice(0, typeIdx))
        } else {
          clearInterval(typeTimer)
          t(800, () => setShowResponse(true))
          let respIdx = 0
          const respTimer = setInterval(() => {
            if (respIdx < AI_RESPONSE.length) {
              respIdx++
              setTypedResponse(AI_RESPONSE.slice(0, respIdx))
            } else {
              clearInterval(respTimer)
              t(1200, () => setShowAI(false))
              t(1800, () => setPhase('done'))
            }
          }, 10)
          timers.current.push(respTimer)
        }
      }, 40)
      timers.current.push(typeTimer)
    }

    t(2000, startTyping)

    return clearTimers
  }, [])

  return (
    <div className="aiscript-demo">
      <div className="aisd-layout">
        <div className="aisd-survey-area">
          <div className="aisd-survey-header">
            <span className="aisd-survey-title">问卷设计</span>
            <div className="aisd-survey-tabs">
              <span className="aisd-stab active">编辑</span>
              <span className="aisd-stab">统计</span>
              <span className="aisd-stab">数据</span>
            </div>
          </div>
          <div className="aisd-survey-questions">
            {[
              { id: 'S1', type: '单选题', text: 'S1.请问您的性别是？【单选】', highlight: '性别' },
              { id: 'S2', type: '单选题', text: 'S2.您的年龄段是？【单选】', highlight: null },
              { id: 'S5', type: '单选题', text: 'S5.您最常购买的品牌是？【单选】', highlight: null },
            ].map((q) => (
              <div key={q.id} className="aisd-q-block">
                <div className="aisd-q-row">
                  <span className="aisd-q-badge">{q.id}</span>
                  <span className="aisd-q-type">{q.type}</span>
                </div>
                <div className="aisd-q-text">
                  {q.highlight ? (
                    <>S1.请问您的<strong>{q.highlight}</strong>是？【单选】</>
                  ) : q.text}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="aisd-script-panel">
          <div className="aisd-panel-tabs">
            <span className="aisd-ptab">设置</span>
            <span className="aisd-ptab">逻辑</span>
            <span className="aisd-ptab active">脚本</span>
          </div>
          <div className="aisd-panel-current">当前题目：S1</div>
          <div className="aisd-script-tabs">
            <span className="aisd-stab2 active">执行前</span>
            <span className="aisd-stab2">执行中</span>
            <span className="aisd-stab2">执行后</span>
          </div>
          <div className="aisd-code-editor">
            <div className="aisd-code-lines">
              {phase === 'done' ? (
                typedResponse.split('\n').map((line, i) => (
                  <div key={i} className="aisd-code-line">
                    <span className="aisd-line-num">{i + 1}</span>
                    <span className="aisd-line-code">{line}</span>
                  </div>
                ))
              ) : (
                <div className="aisd-code-line">
                  <span className="aisd-line-num">1</span>
                  <span className="aisd-line-code aisd-cursor">|</span>
                </div>
              )}
            </div>
            <div className="aisd-ai-btn">✨</div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showAI && (
          <motion.div className="aisd-ai-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <motion.div className="aisd-ai-modal" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} transition={{ duration: 0.3 }}>
              <div className="aisd-ai-header">
                <span className="aisd-ai-icon">🤖</span>
                <div>
                  <div className="aisd-ai-title">AI脚本助手</div>
                  <div className="aisd-ai-sub">根据描述生成校验、格式化与交互脚本</div>
                </div>
              </div>
              <div className="aisd-ai-chat">
                <div className="aisd-ai-msg ai">
                  <span className="aisd-ai-avatar">AI</span>
                  <span>你好，请描述需要生成的脚本逻辑与触发时机</span>
                </div>
                {typedPrompt && (
                  <motion.div className="aisd-ai-msg user" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>
                    <span>{typedPrompt}</span>
                    <span className="aisd-ai-avatar user">U</span>
                  </motion.div>
                )}
                {showResponse && (
                  <motion.div className="aisd-ai-msg ai" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <span className="aisd-ai-avatar">AI</span>
                    <span className="aisd-ai-code">{typedResponse}</span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
