import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import './Skills.css'

const skillCategories = [
  {
    title: '后端核心',
    icon: '⚡',
    color: '#6366f1',
    skills: [
      { name: 'Java', level: 90 },
      { name: 'Spring Boot', level: 90 },
      { name: 'Spring Cloud', level: 85 },
      { name: 'MyBatis', level: 80 },
    ],
  },
  {
    title: '前端开发',
    icon: '🎨',
    color: '#a855f7',
    skills: [
      { name: 'Vue3', level: 85 },
      { name: 'Element Plus', level: 80 },
      { name: 'JavaScript', level: 85 },
    ],
  },
  {
    title: '数据与缓存',
    icon: '🗄️',
    color: '#ec4899',
    skills: [
      { name: 'MySQL', level: 88 },
      { name: 'Redis', level: 85 },
      { name: 'DorisDB', level: 82 },
    ],
  },
  {
    title: 'DevOps',
    icon: '🚀',
    color: '#14b8a6',
    skills: [
      { name: 'Docker', level: 85 },
      { name: 'Linux', level: 80 },
      { name: 'K8s', level: 70 },
    ],
  },
  {
    title: 'AI & 自动化',
    icon: '🤖',
    color: '#f59e0b',
    skills: [
      { name: 'Python', level: 82 },
      { name: 'Prompt工程', level: 80 },
      { name: 'Qwen/DashScope', level: 78 },
    ],
  },
]

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <div className="skills" ref={ref}>
      <div className="skills-inner">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">专业技能</h2>
        </motion.div>

        <div className="skills-grid-compact">
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              className="skill-compact-card"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + ci * 0.07 }}
              whileHover={{ borderColor: `${cat.color}44`, y: -3 }}
            >
              <div className="scc-header">
                <span className="scc-icon">{cat.icon}</span>
                <span className="scc-title" style={{ color: cat.color }}>{cat.title}</span>
              </div>
              <div className="scc-bars">
                {cat.skills.map((skill, si) => (
                  <div key={skill.name} className="scc-row">
                    <span className="scc-name">{skill.name}</span>
                    <div className="scc-track">
                      <motion.div
                        className="scc-fill"
                        style={{ background: cat.color }}
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: skill.level / 100 } : {}}
                        transition={{ duration: 0.7, delay: 0.35 + ci * 0.07 + si * 0.04 }}
                      />
                    </div>
                    <span className="scc-pct" style={{ color: cat.color }}>{skill.level}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
