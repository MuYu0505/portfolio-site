import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { FiX } from 'react-icons/fi'
import './Projects.css'

const projects = [
  {
    title: '易察问卷调查系统',
    subtitle: '分布式微服务架构',
    period: '2025-06 ~ 至今',
    role: '全栈开发（后端主导）',
    desc: '基于Spring Boot + Vue3 + Redis + MongoDB + DorisDB，面向市场研究团队提供复杂问卷编制、发布、回收、分析全流程支持。',
    tags: ['Spring Boot', 'Vue3', 'Redis', 'MongoDB', 'DorisDB', 'Docker', 'K8s', 'AI'],
    highlights: [
      '高并发配额控制：Redis原子计数器 + Lua脚本实现毫秒级配额扣减',
      '可编程题目引擎：内置JS脚本编辑器与沙箱隔离',
      'AI智能脚本生成：集成Qwen大模型，Prompt工程自动优化',
      'AI驱动自动化测试：Python + 大模型实现批量自动化测试',
    ],
    color: '#6366f1',
    mockupType: 'questionnaire',
  },
  {
    title: '青岛啤酒即时零售经营分析平台',
    subtitle: '亿级数据分析中台',
    period: '2025-03 ~ 至今',
    role: '全栈开发',
    desc: '面向全国省市/区县多级销售用户的大数据分析管理平台，支持300+并发用户实时查询千万级销售数据。',
    tags: ['Spring Boot', 'MyBatis', 'Redis', 'DorisDB', 'RBAC', 'Linux', 'Nginx'],
    highlights: [
      '高并发高负载优化：查询响应从30s降至3s内',
      '亿级数据SQL性能优化：从45s降至2.8s',
      'RBAC权限控制系统：动态路由鉴权，秒级生效',
      '服务器运维与自动化：systemd守护 + shell故障自恢复',
    ],
    color: '#a855f7',
    mockupType: 'dashboard',
  },
  {
    title: '电商平台上架自动化系统',
    subtitle: 'Python全栈自动化',
    period: '2026-02 ~ 至今',
    role: '独立开发',
    desc: '基于FastAPI + Vue3 + Element Plus开发电商平台商品上架全链路自动化系统。',
    tags: ['FastAPI', 'Vue3', 'Python', 'AI', 'WebSocket', 'DashScope'],
    highlights: [
      'AI深度业务落地：接入DashScope自动生成中英文上架文案',
      '复杂网页自动化工程化：Web Components/Shadow DOM场景处理',
      '多规格变体智能识别与合并',
      'WebSocket实时日志推送 + 分步调试API',
    ],
    color: '#ec4899',
    mockupType: 'automation',
  },
]

function QuestionnaireMockup() {
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
          <motion.div className="mock-question" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}>
            <div className="mock-q-num">Q3</div>
            <div className="mock-q-body">
              <div className="mock-q-title">请描述您的购买体验</div>
              <div className="mock-q-type">开放题</div>
              <div className="mock-textarea">产品口感很好，包装设计也很有质感...</div>
            </div>
          </motion.div>
          <motion.div className="mock-ai-bar" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
            <span className="mock-ai-icon">AI</span>
            <span>Qwen大模型已优化3道题逻辑跳转</span>
            <span className="mock-ai-status">已完成</span>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function DashboardMockup() {
  return (
    <div className="mockup-container mockup-dashboard">
      <div className="mock-sidebar">
        <div className="mock-sidebar-title">经营分析</div>
        <div className="mock-sidebar-item active">销售概览</div>
        <div className="mock-sidebar-item">渠道分析</div>
        <div className="mock-sidebar-item">区域报表</div>
        <div className="mock-sidebar-item">费用核销</div>
      </div>
      <div className="mock-main">
        <div className="mock-topbar">
          <span className="mock-breadcrumb">首页 / 销售概览</span>
          <span className="mock-date">2025-06</span>
        </div>
        <div className="mock-kpi-row">
          {[
            { label: '本月销售额', value: '2,847万', change: '+12.3%', up: true },
            { label: '订单总量', value: '156,832', change: '+8.7%', up: true },
            { label: '活跃经销商', value: '3,241', change: '+5.1%', up: true },
            { label: '查询耗时', value: '2.8s', change: '-93.8%', up: true },
          ].map((kpi, i) => (
            <motion.div className="mock-kpi" key={kpi.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }}>
              <div className="mock-kpi-label">{kpi.label}</div>
              <div className="mock-kpi-value">{kpi.value}</div>
              <div className={`mock-kpi-change ${kpi.up ? 'up' : ''}`}>{kpi.change}</div>
            </motion.div>
          ))}
        </div>
        <div className="mock-charts-row">
          <motion.div className="mock-chart" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            <div className="mock-chart-title">月度销售趋势</div>
            <div className="mock-bars">
              {[40, 55, 45, 70, 65, 80, 75, 90, 85, 95, 88, 100].map((h, i) => (
                <motion.div className="mock-bar" key={i} style={{ height: `${h}%` }} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: 0.8 + i * 0.05 }} />
              ))}
            </div>
          </motion.div>
          <motion.div className="mock-chart" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
            <div className="mock-chart-title">渠道占比</div>
            <div className="mock-donut">
              <div className="mock-donut-ring" />
              <div className="mock-donut-center">5渠道</div>
            </div>
            <div className="mock-legend">
              <span><i style={{background:'#6366f1'}}/> 饿了么 35%</span>
              <span><i style={{background:'#a855f7'}}/> 美团 28%</span>
              <span><i style={{background:'#ec4899'}}/> 京东 22%</span>
              <span><i style={{background:'#14b8a6'}}/> 其他 15%</span>
            </div>
          </motion.div>
        </div>
        <motion.div className="mock-table" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
          <div className="mock-table-title">区域销售排名</div>
          <div className="mock-table-header">
            <span>区域</span><span>销售额</span><span>订单数</span><span>同比</span>
          </div>
          {[
            { region: '广州天河区', sales: '487万', orders: '23,412', growth: '+15.2%' },
            { region: '深圳南山区', sales: '421万', orders: '19,876', growth: '+11.8%' },
            { region: '佛山顺德区', sales: '356万', orders: '17,234', growth: '+9.3%' },
          ].map((row) => (
            <div className="mock-table-row" key={row.region}>
              <span>{row.region}</span><span>{row.sales}</span><span>{row.orders}</span><span className="up">{row.growth}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

function AutomationMockup() {
  return (
    <div className="mockup-container mockup-automation">
      <div className="mock-sidebar">
        <div className="mock-sidebar-title">自动化中心</div>
        <div className="mock-sidebar-item">任务列表</div>
        <div className="mock-sidebar-item active">上架流程</div>
        <div className="mock-sidebar-item">运行日志</div>
        <div className="mock-sidebar-item">AI配置</div>
      </div>
      <div className="mock-main">
        <div className="mock-topbar">
          <span className="mock-breadcrumb">自动化 / 商品上架流程</span>
          <div className="mock-topbar-actions">
            <span className="mock-btn-sm running">运行中</span>
          </div>
        </div>
        <div className="mock-workflow">
          <div className="mock-flow-title">上架流程编排</div>
          <div className="mock-flow-steps">
            {[
              { name: '商品信息抓取', status: 'done', icon: '🌐' },
              { name: 'AI文案生成', status: 'done', icon: '🤖' },
              { name: '图片重绘处理', status: 'done', icon: '🎨' },
              { name: '表单智能填充', status: 'active', icon: '📝' },
              { name: '变体合并发布', status: 'pending', icon: '📦' },
            ].map((step, i) => (
              <motion.div key={step.name} className={`mock-flow-step ${step.status}`} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.15 }}>
                <div className="mock-step-icon">{step.icon}</div>
                <div className="mock-step-name">{step.name}</div>
                {i < 4 && <div className="mock-step-line" />}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="mock-automation-split">
          <motion.div className="mock-product-preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
            <div className="mock-product-title">AI生成的上架内容</div>
            <div className="mock-product-field"><label>标题</label><div className="mock-field-val">Premium Wireless Bluetooth Headphones...</div></div>
            <div className="mock-product-field"><label>描述</label><div className="mock-field-val desc">Experience crystal-clear audio with our latest noise-cancelling technology...</div></div>
            <div className="mock-product-field"><label>变体</label>
              <div className="mock-variants">
                <span className="mock-variant">黑色 / 标准版</span>
                <span className="mock-variant">白色 / 标准版</span>
                <span className="mock-variant">黑色 / Pro版</span>
              </div>
            </div>
          </motion.div>
          <motion.div className="mock-log-console" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
            <div className="mock-log-title">WebSocket 实时日志</div>
            <div className="mock-log-body">
              <div className="mock-log-line done">[14:23:01] 商品信息抓取完成 ✓</div>
              <div className="mock-log-line done">[14:23:05] AI文案生成完成 (DashScope) ✓</div>
              <div className="mock-log-line done">[14:23:08] 图片重绘处理完成 ✓</div>
              <div className="mock-log-line active">[14:23:12] 正在填充表单... (3/5)</div>
              <div className="mock-log-line pending">[ -- ] 等待变体合并...</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

const mockups = {
  questionnaire: QuestionnaireMockup,
  dashboard: DashboardMockup,
  automation: AutomationMockup,
}

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeMockup, setActiveMockup] = useState(null)

  return (
    <section id="projects" className="projects" ref={ref}>
      <div className="projects-inner">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="section-title">项目作品</h2>
          <p className="proj-subtitle">点击查看系统效果展示</p>
        </motion.div>

        <div className="projects-list">
          {projects.map((project, i) => {
            const MockThumb = mockups[project.mockupType]
            return (
              <motion.div
                key={project.title}
                className="project-card glass-card"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                whileHover={{ borderColor: `${project.color}33` }}
              >
                <div className="proj-body-split">
                  <div className="proj-text-side">
                    <div className="proj-header">
                      <div className="proj-number" style={{ color: project.color }}>0{i + 1}</div>
                      <div className="proj-info">
                        <h3 className="proj-title">{project.title}</h3>
                        <p className="proj-subtitle-text" style={{ color: project.color }}>{project.subtitle}</p>
                      </div>
                      <div className="proj-meta">
                        <span className="proj-period">{project.period}</span>
                        <span className="proj-role">{project.role}</span>
                      </div>
                    </div>

                    <p className="proj-desc">{project.desc}</p>

                    <div className="proj-tags">
                      {project.tags.map((tag) => (
                        <span key={tag} className="proj-tag" style={{ borderColor: `${project.color}33` }}>{tag}</span>
                      ))}
                    </div>

                    <div className="proj-highlights">
                      <div className="highlights-inner">
                        <h4 className="highlights-title">技术亮点</h4>
                        <ul>
                          {project.highlights.map((h, hi) => (
                            <li key={hi}><span className="highlight-bullet" style={{ background: project.color }} />{h}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="proj-preview-side">
                    <motion.button
                      className="proj-preview-btn"
                      style={{ '--accent': project.color }}
                      whileHover={{ scale: 1.03, boxShadow: `0 8px 30px ${project.color}44` }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setActiveMockup(project.mockupType)}
                    >
                      <span className="preview-dot" style={{ background: project.color }} />
                      查看系统效果
                      <span className="btn-arrow-down">↓</span>
                    </motion.button>
                    <div className="proj-preview-frame" style={{ borderColor: `${project.color}33` }} onClick={() => setActiveMockup(project.mockupType)}>
                      <div className="proj-preview-thumb">
                        <MockThumb />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      <AnimatePresence>
        {activeMockup && (
          <motion.div
            className="mockup-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveMockup(null)}
          >
            <motion.div
              className="mockup-modal"
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mockup-modal-header">
                <h3>{projects.find(p => p.mockupType === activeMockup)?.title}</h3>
                <button className="mockup-close" onClick={() => setActiveMockup(null)}>
                  <FiX />
                </button>
              </div>
              <div className="mockup-modal-body">
                {(() => {
                  const C = mockups[activeMockup]
                  return <C />
                })()}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
