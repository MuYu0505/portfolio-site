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
    </motion.nav>
  )
}
