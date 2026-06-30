import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FiCalendar, FiMapPin, FiBriefcase } from 'react-icons/fi'
import './Experience.css'

const experiences = [
  {
    company: '广州易察市场研究有限公司',
    role: 'Java开发工程师',
    period: '2025-03 ~ 至今',
    location: '广州',
    color: '#6366f1',
    gradient: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(168,85,247,0.08))',
    metrics: [
      { label: '数据查询优化', value: '45s → 2.8s', icon: '⚡' },
      { label: '效率提升', value: '50%+', icon: '📈' },
      { label: '并发支持', value: '300+', icon: '👥' },
    ],
    highlights: [
      '搭建青岛啤酒10亿级数据分析平台',
      '0→1搭建分布式问卷微服务架构',
      '集成Qwen大模型自动生成脚本',
      'Docker容器化部署，构建标准化镜像',
    ],
  },
  {
    company: '小脉网络科技(广州)有限公司',
    role: '全栈开发工程师(实习)',
    period: '2024-10 ~ 2025-01',
    location: '广州',
    color: '#a855f7',
    gradient: 'linear-gradient(135deg, rgba(168,85,247,0.15), rgba(192,132,252,0.08))',
    metrics: [
      { label: '项目类型', value: '医疗SaaS', icon: '🏥' },
      { label: '开发模式', value: '全栈', icon: '💻' },
    ],
    highlights: [
      '负责香港私立医院价格模块全栈开发',
      '实现病人身份识别与优惠动态计算',
      '日常Bug修复与功能迭代',
    ],
  },
]

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div className="experience" ref={ref}>
      <div className="experience-inner">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">工作经历</h2>
        </motion.div>

        <div className="exp-cards">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              className="exp-card"
              style={{ background: exp.gradient, borderColor: `${exp.color}22` }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              whileHover={{ borderColor: `${exp.color}44`, y: -4 }}
            >
              <div className="exp-card-top">
                <div className="exp-card-icon" style={{ background: `${exp.color}22`, color: exp.color }}>
                  <FiBriefcase />
                </div>
                <div className="exp-card-info">
                  <h3 className="exp-card-company">{exp.company}</h3>
                  <span className="exp-card-role" style={{ color: exp.color }}>{exp.role}</span>
                </div>
              </div>

              <div className="exp-card-meta">
                <span><FiCalendar /> {exp.period}</span>
                <span><FiMapPin /> {exp.location}</span>
              </div>

              <div className="exp-metrics">
                {exp.metrics.map((m, mi) => (
                  <motion.div
                    key={m.label}
                    className="exp-metric"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.15 + mi * 0.08 }}
                  >
                    <span className="metric-icon">{m.icon}</span>
                    <span className="metric-value" style={{ color: exp.color }}>{m.value}</span>
                    <span className="metric-label">{m.label}</span>
                  </motion.div>
                ))}
              </div>

              <ul className="exp-card-list">
                {exp.highlights.map((h, hi) => (
                  <motion.li
                    key={hi}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.6 + i * 0.15 + hi * 0.04 }}
                  >
                    <span className="exp-bullet" style={{ background: exp.color }} />
                    {h}
                  </motion.li>
                ))}
              </ul>

              <div className="exp-card-glow" style={{ background: `radial-gradient(circle at 30% 50%, ${exp.color}11, transparent 70%)` }} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
