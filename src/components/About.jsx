import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiCode, FiServer, FiCpu, FiCloud } from 'react-icons/fi'
import './About.css'

const stats = [
  { number: '3', label: '大型商业项目主导' },
  { number: '10亿+', label: '数据处理量级' },
  { number: '94%', label: '性能优化提升' },
  { number: '50%+', label: '开发效率提升' },
]

const highlights = [
  { icon: <FiCode />, title: '全栈开发', desc: 'Java + Vue3前后端一体化开发' },
  { icon: <FiServer />, title: '微服务架构', desc: 'Spring Cloud Alibaba生态深度实践' },
  { icon: <FiCpu />, title: 'AI工程化', desc: '大模型集成与Prompt工程落地' },
  { icon: <FiCloud />, title: '云原生部署', desc: 'Docker + K8s容器化运维' },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="about" ref={ref}>
      <div className="about-inner">
        <motion.div
          className="about-header"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="section-title">关于我</h2>
          <p className="about-subtitle">广东工商职业技术大学 · 软件工程本科 · GPA 3.73</p>
        </motion.div>

        <div className="about-grid">
          <motion.div
            className="about-text-card glass-card"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p>
              一名充满热情的全栈开发工程师，专注于构建高性能、可扩展的分布式系统。
              在微服务架构设计、高并发优化和AI工程化落地方面有丰富的实战经验。
            </p>
            <p>
              曾主导青岛啤酒10亿级数据分析平台建设，将核心查询从45秒优化至2.8秒；
              独立设计分布式问卷系统微服务架构，实现毫秒级配额控制与高可用保障。
              同时积极探索AI在业务系统中的深度应用，推动大模型赋能自动化测试与智能脚本生成。
            </p>
            <p>
              始终保持对新技术的好奇心，擅长将前沿技术转化为业务价值，追求代码质量与系统优雅性的统一。
            </p>
          </motion.div>

          <motion.div
            className="about-stats"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="stat-item glass-card"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
              >
                <span className="stat-number gradient-text">{stat.number}</span>
                <span className="stat-label">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="about-highlights">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              className="highlight-card glass-card"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
              whileHover={{ y: -5, borderColor: 'rgba(99, 102, 241, 0.3)' }}
            >
              <div className="highlight-icon">{item.icon}</div>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
