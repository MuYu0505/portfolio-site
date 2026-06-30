import { motion } from 'framer-motion'
import './SideNav.css'

export default function SideNav({ sections, labels, active, onNavigate }) {
  return (
    <motion.nav
      className="side-nav"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
    >
      {sections.map((id) => (
        <button
          key={id}
          className={`side-nav-dot ${active === id ? 'active' : ''}`}
          onClick={() => onNavigate(id)}
          title={labels[id]}
        >
          <span className="dot-circle" />
          <span className="dot-label">{labels[id]}</span>
        </button>
      ))}

      {active !== sections[0] && (
        <motion.button
          className="side-nav-dot side-nav-top"
          onClick={() => onNavigate(sections[0])}
          title="返回顶部"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="dot-circle top-dot" />
          <span className="dot-label">顶部</span>
        </motion.button>
      )}
    </motion.nav>
  )
}
