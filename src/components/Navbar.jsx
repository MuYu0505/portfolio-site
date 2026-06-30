import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSun, FiMoon } from 'react-icons/fi'
import { useTheme } from '../theme'
import './Navbar.css'

const navItems = [
  { label: '首页', id: 'hero' },
  { label: '关于', id: 'about' },
  { label: '技能', id: 'skills' },
  { label: '经历', id: 'experience' },
  { label: '作品', id: 'proj1' },
  { label: '联系', id: 'contact' },
]

export default function Navbar({ onNavigate, activeSection }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { theme, toggle } = useTheme()

  const handleClick = (id) => {
    onNavigate(id)
    setMobileOpen(false)
  }

  return (
    <motion.nav
      className="navbar scrolled"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="nav-inner">
        <motion.button
          className="nav-logo"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onNavigate('hero')}
        >
          <span className="logo-text">Code the Stars</span>
        </motion.button>

        <div className="nav-links desktop">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              onClick={() => handleClick(item.id)}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.div
                  className="nav-indicator"
                  layoutId="navIndicator"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>

        <div className="nav-actions">
          <motion.button
            className="theme-toggle"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggle}
            title={theme === 'dark' ? '切换亮色模式' : '切换暗色模式'}
          >
            {theme === 'dark' ? <FiSun /> : <FiMoon />}
          </motion.button>
          <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
            <div className={`hamburger ${mobileOpen ? 'open' : ''}`}>
              <span /><span /><span />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navItems.map((item, i) => (
              <motion.button
                key={item.id}
                className={`mobile-link ${activeSection === item.id ? 'active' : ''}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => handleClick(item.id)}
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
