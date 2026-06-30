import { motion } from 'framer-motion'
import './Preloader.css'

export default function Preloader() {
  return (
    <motion.div
      className="preloader"
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="preloader-content">
        <motion.div
          className="preloader-ring"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
        <motion.h1
          className="preloader-name"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          陈伟鹏
        </motion.h1>
        <motion.p
          className="preloader-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          全栈开发工程师
        </motion.p>
        <motion.div
          className="preloader-bar"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
    </motion.div>
  )
}
