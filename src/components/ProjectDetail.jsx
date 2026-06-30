import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import QuotaDemo from './QuotaDemo'
import AIScriptDemo from './AIScriptDemo'
import AutoTestDemo from './AutoTestDemo'
import CollabDemo from './CollabDemo'
import DashboardDemo from './DashboardDemo'
import AutomationDemo from './AutomationDemo'
import './ProjectDetail.css'
import './Projects.css'

const proj1Demos = [
  { id: 'quota', label: '配额效果展示', icon: '🎯' },
  { id: 'ai-script', label: 'AI智能脚本生成', icon: '🤖' },
  { id: 'ai-test', label: 'AI驱动自动化测试', icon: '🧪' },
  { id: 'collab', label: '协作模式展示', icon: '👥' },
]

function QuestionnaireMockupInner() {
  return (
    <div className="mockup-container">
      <div className="mock-sidebar">
        <div className="mock-sidebar-title">问卷列表</div>
        <div className="mock-sidebar-item active">消费者满意度调查</div>
        <div className="mock-sidebar-item">品牌认知度调研</div>
        <div className="mock-sidebar-item">新品反馈问卷</div>
      </div>
      <div className="mock-main">
        <div className="mock-topbar">
          <span className="mock-breadcrumb">问卷编辑 / 消费者满意度调查</span>
          <div className="mock-topbar-actions">
            <span className="mock-btn-sm">预览</span>
            <span className="mock-btn-primary-sm">发布</span>
          </div>
        </div>
        <div className="mock-editor">
          <motion.div className="mock-question" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <div className="mock-q-num">Q1</div>
            <div className="mock-q-body">
              <div className="mock-q-title">您对我们的产品整体满意度如何？</div>
              <div className="mock-q-type">单选题</div>
              <div className="mock-options">
                <div className="mock-opt"><span className="mock-radio checked" /> 非常满意</div>
                <div className="mock-opt"><span className="mock-radio" /> 比较满意</div>
                <div className="mock-opt"><span className="mock-radio" /> 一般</div>
                <div className="mock-opt"><span className="mock-radio" /> 不太满意</div>
              </div>
            </div>
          </motion.div>
          <motion.div className="mock-question" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
            <div className="mock-q-num">Q2</div>
            <div className="mock-q-body">
              <div className="mock-q-title">您最看重产品的哪些方面？</div>
              <div className="mock-q-type">多选题</div>
              <div className="mock-options">
                <div className="mock-opt"><span className="mock-check checked" /> 品质</div>
                <div className="mock-opt"><span className="mock-check checked" /> 价格</div>
                <div className="mock-opt"><span className="mock-check" /> 包装</div>
                <div className="mock-opt"><span className="mock-check" /> 服务</div>
              </div>
            </div>
          </motion.div>
          <motion.div className="mock-ai-bar" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
            <span className="mock-ai-icon">AI</span>
            <span>Qwen大模型已优化3道题逻辑跳转</span>
            <span className="mock-ai-status">已完成</span>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

const mockupComponents = {
  questionnaire: QuestionnaireMockupInner,
  dashboard: DashboardDemo,
  automation: AutomationDemo,
}

export default function ProjectDetail({ project }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [activeDemo, setActiveDemo] = useState('quota')
  const MockComp = mockupComponents[project.mockupType]

  const isProj1 = project.id === 'proj1'
  const [showDemoFull, setShowDemoFull] = useState(false)

  return (
    <div className="project-detail" ref={ref}>
      <div className="pd-inner">
        <motion.div
          className="pd-text"
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="pd-label" style={{ color: project.color }}>
            <span className="pd-dot" style={{ background: project.color }} />
            {project.role} · {project.period}
          </div>
          <h2 className="pd-title">{project.title}</h2>
          <p className="pd-subtitle" style={{ color: project.color }}>{project.subtitle}</p>
          <p className="pd-desc">{project.desc}</p>
          <div className="pd-tags">
            {project.tags.map((tag) => (
              <span key={tag} className="pd-tag" style={{ borderColor: `${project.color}44` }}>{tag}</span>
            ))}
          </div>
          <div className="pd-highlights">
            <h4>核心亮点</h4>
            <ul>
              {project.highlights.map((h, i) => (
                <li key={i}><span className="pd-hl-dot" style={{ background: project.color }} />{h}</li>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div
          className="pd-preview"
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {isProj1 ? (
            <div className="pd-interactive-wrapper">
              <motion.button
                className="pd-view-full-btn"
                style={{ '--accent': project.color }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowDemoFull(true)}
              >
                查看完整效果 ↓
              </motion.button>
              <div className="pd-interactive-demo" style={{ borderColor: `${project.color}33` }} onClick={() => setShowDemoFull(true)}>
                <div className="pd-demo-sidebar">
                  <div className="pd-demo-sidebar-title">功能展示</div>
                  {proj1Demos.map((demo) => (
                    <button
                      key={demo.id}
                      className={`pd-demo-tab ${activeDemo === demo.id ? 'active' : ''}`}
                      onClick={(e) => { e.stopPropagation(); setActiveDemo(demo.id) }}
                    >
                      <span className="pd-demo-tab-icon">{demo.icon}</span>
                      <span>{demo.label}</span>
                    </button>
                  ))}
                </div>
                <div className="pd-demo-content">
                  <AnimatePresence mode="wait">
                    {activeDemo === 'quota' && (
                      <motion.div key="quota" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} style={{ height: '100%' }}>
                        <QuotaDemo />
                      </motion.div>
                    )}
                    {activeDemo === 'ai-script' && (
                      <motion.div key="ai-script" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} style={{ height: '100%' }}>
                        <AIScriptDemo />
                      </motion.div>
                    )}
                    {activeDemo === 'ai-test' && (
                      <motion.div key="ai-test" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} style={{ height: '100%' }}>
                        <AutoTestDemo />
                      </motion.div>
                    )}
                    {activeDemo === 'collab' && (
                      <motion.div key="collab" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} style={{ height: '100%' }}>
                        <CollabDemo />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          ) : (
            <div className="pd-interactive-wrapper">
              <motion.button
                className="pd-view-full-btn"
                style={{ '--accent': project.color }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowDemoFull(true)}
              >
                查看完整效果 ↓
              </motion.button>
              <div className="pd-preview-frame" style={{ borderColor: `${project.color}33`, cursor: 'pointer' }} onClick={() => setShowDemoFull(true)}>
                <div className="pd-preview-bar">
                  <span className="pd-preview-dot" style={{ background: '#ff5f57' }} />
                  <span className="pd-preview-dot" style={{ background: '#febc2e' }} />
                  <span className="pd-preview-dot" style={{ background: '#28c840' }} />
                  <span className="pd-preview-url">{project.title}</span>
                </div>
                <div className="pd-preview-content">
                  <div className="pd-preview-inner">
                    <MockComp />
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      <AnimatePresence>
        {showDemoFull && (
          <motion.div
            className="pd-fullscreen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDemoFull(false)}
          >
            <motion.div
              className="pd-fullscreen-inner"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="pd-fullscreen-header">
                <h3>{project.title} - 功能展示</h3>
                <button className="pd-close" onClick={() => setShowDemoFull(false)}>✕</button>
              </div>
              <div className="pd-fullscreen-body">
                {isProj1 ? (
                  <>
                    <div className="pd-demo-sidebar">
                      <div className="pd-demo-sidebar-title">功能展示</div>
                      {proj1Demos.map((demo) => (
                        <button
                          key={demo.id}
                          className={`pd-demo-tab ${activeDemo === demo.id ? 'active' : ''}`}
                          onClick={() => setActiveDemo(demo.id)}
                        >
                          <span className="pd-demo-tab-icon">{demo.icon}</span>
                          <span>{demo.label}</span>
                        </button>
                      ))}
                    </div>
                    <div className="pd-demo-content" style={{ flex: 1 }}>
                      <AnimatePresence mode="wait">
                        {activeDemo === 'quota' && (
                          <motion.div key="quota" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} style={{ height: '100%' }}>
                            <QuotaDemo />
                          </motion.div>
                        )}
                        {activeDemo === 'ai-script' && (
                          <motion.div key="ai-script" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} style={{ height: '100%' }}>
                            <AIScriptDemo />
                          </motion.div>
                        )}
                        {activeDemo === 'ai-test' && (
                          <motion.div key="ai-test" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} style={{ height: '100%' }}>
                            <AutoTestDemo />
                          </motion.div>
                        )}
                        {activeDemo === 'collab' && (
                          <motion.div key="collab" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} style={{ height: '100%' }}>
                            <CollabDemo />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </>
                ) : (
                  <div style={{ flex: 1, width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <MockComp />
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
