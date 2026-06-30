import { useState, useEffect, useRef, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import ProjectDetail from './components/ProjectDetail'
import Contact from './components/Contact'
import SideNav from './components/SideNav'
import ParticleBackground from './components/ParticleBackground'
import Toast from './components/Toast'
import './App.css'

const projects = [
  {
    id: 'proj1',
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
    id: 'proj2',
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
    id: 'proj3',
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

const sectionIds = ['hero', 'about', 'skills', 'experience', ...projects.map(p => p.id), 'contact']

function App() {
  const [loading, setLoading] = useState(true)
  const [activeIdx, setActiveIdx] = useState(0)
  const lockRef = useRef(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200)
    return () => clearTimeout(timer)
  }, [])

  const goTo = useCallback((idx) => {
    if (idx < 0 || idx >= sectionIds.length || lockRef.current) return
    lockRef.current = true
    setActiveIdx(idx)
    setTimeout(() => {
      lockRef.current = false
    }, 800)
  }, [])

  useEffect(() => {
    if (loading) return
    const handleWheel = (e) => {
      e.preventDefault()
      if (lockRef.current) return
      if (e.deltaY > 30) goTo(activeIdx + 1)
      else if (e.deltaY < -30) goTo(activeIdx - 1)
    }

    let touchStartY = 0
    const handleTouchStart = (e) => { touchStartY = e.touches[0].clientY }
    const handleTouchEnd = (e) => {
      const diff = touchStartY - e.changedTouches[0].clientY
      if (Math.abs(diff) > 50) {
        if (diff > 0) goTo(activeIdx + 1)
        else goTo(activeIdx - 1)
      }
    }

    const handleKey = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') { e.preventDefault(); goTo(activeIdx + 1) }
      if (e.key === 'ArrowUp' || e.key === 'PageUp') { e.preventDefault(); goTo(activeIdx - 1) }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    window.addEventListener('keydown', handleKey)
    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('keydown', handleKey)
    }
  }, [loading, activeIdx, goTo])

  const scrollTo = (id) => {
    const idx = sectionIds.indexOf(id)
    if (idx !== -1) goTo(idx)
  }

  const sectionLabels = {
    hero: '首页',
    about: '关于',
    skills: '技能',
    experience: '经历',
    proj1: '项目一',
    proj2: '项目二',
    proj3: '项目三',
    contact: '联系',
  }

  const [direction, setDirection] = useState(1)
  const prevIdx = useRef(activeIdx)

  useEffect(() => {
    const dir = activeIdx > prevIdx.current ? 1 : -1
    setDirection(dir)
    prevIdx.current = activeIdx
  }, [activeIdx])

  const slideVariants = {
    enterDown: { y: '100%', opacity: 0, scale: 0.95 },
    enterUp: { y: '-100%', opacity: 0, scale: 0.95 },
    center: { y: 0, opacity: 1, scale: 1 },
    exitDown: { y: '100%', opacity: 0, scale: 0.95 },
    exitUp: { y: '-100%', opacity: 0, scale: 0.95 },
  }

  const renderSection = (idx) => {
    const id = sectionIds[idx]
    if (id === 'hero') return <Hero onNavigate={scrollTo} />
    if (id === 'about') return <About />
    if (id === 'skills') return <Skills />
    if (id === 'experience') return <Experience />
    if (id === 'contact') return <Contact />
    const proj = projects.find(p => p.id === id)
    if (proj) return <ProjectDetail project={proj} />
    return null
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" />}
      </AnimatePresence>

      {!loading && (
        <div className="app">
          <ParticleBackground />
          <Navbar onNavigate={scrollTo} activeSection={sectionIds[activeIdx]} />

          <div className="snap-container">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={sectionIds[activeIdx]}
                className="snap-section"
                initial={direction > 0 ? 'enterDown' : 'enterUp'}
                animate="center"
                exit={direction > 0 ? 'exitUp' : 'exitDown'}
                variants={slideVariants}
                transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
              >
                {renderSection(activeIdx)}
              </motion.div>
            </AnimatePresence>
          </div>

          <SideNav
            sections={sectionIds}
            labels={sectionLabels}
            active={sectionIds[activeIdx]}
            onNavigate={scrollTo}
          />
        </div>
      )}
      <Toast />
    </>
  )
}

export default App
