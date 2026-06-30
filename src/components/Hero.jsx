import { motion } from 'framer-motion'
import { FiArrowDown, FiGithub, FiMail, FiDownload } from 'react-icons/fi'
import { showToast } from './Toast'
import siteConfig from '../config'
import './Hero.css'

export default function Hero({ onNavigate }) {
  const textVariants = {
    hidden: { opacity: 0 },
    visible: (i) => ({
      opacity: 1,
      transition: { delay: i * 0.15, duration: 0.8, ease: [0.4, 0, 0.2, 1] },
    }),
  }

  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="badge-dot" />
          Available for work
        </motion.div>

        <div className="hero-text">
          <motion.p className="hero-greeting" custom={0} variants={textVariants} initial="hidden" animate="visible">
            你好，我是
          </motion.p>
          <motion.h1 className="hero-name" custom={1} variants={textVariants} initial="hidden" animate="visible">
            <span className="name-zh">陈伟鹏</span>
            <span className="name-en gradient-text">Chen Weipeng</span>
          </motion.h1>
          <motion.div className="hero-title-wrap" custom={2} variants={textVariants} initial="hidden" animate="visible">
            <h2 className="hero-title">全栈开发工程师</h2>
            <div className="title-tags">
              <span className="tag">Java</span>
              <span className="tag">Spring Cloud</span>
              <span className="tag">Vue3</span>
              <span className="tag">Python</span>
              <span className="tag">AI</span>
            </div>
          </motion.div>
          <motion.p className="hero-desc" custom={3} variants={textVariants} initial="hidden" animate="visible">
            专注微服务架构与AI工程化落地，擅长高并发系统设计与性能优化。<br />
            曾主导10亿级数据平台建设，推动AI大模型在业务系统中的深度应用。
          </motion.p>
          <motion.p className="hero-motto" custom={4} variants={textVariants} initial="hidden" animate="visible">
            Code the Stars, Build the Future
          </motion.p>
        </div>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <button className="btn-primary" onClick={() => onNavigate('proj1')}>
            查看作品
            <FiArrowDown className="btn-icon" />
          </button>
          <button className="btn-outline" onClick={() => onNavigate('contact')}>
            联系我
          </button>
        </motion.div>

        <motion.div
          className="hero-socials"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
        >
          <a href={siteConfig.github} target="_blank" rel="noopener" className="social-link">
            <FiGithub />
          </a>
          <a href="#" className="social-link" onClick={(e) => { e.preventDefault(); navigator.clipboard.writeText(siteConfig.email); showToast('邮箱已复制到剪贴板') }}>
            <FiMail />
          </a>
          <a href={siteConfig.resumePath} download className="social-link" title="下载简历">
            <FiDownload />
          </a>
        </motion.div>
      </div>

      <motion.div
        className="hero-scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <motion.div
          className="scroll-mouse"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="scroll-wheel" />
        </motion.div>
        <span>向下滚动</span>
      </motion.div>

      <div className="hero-gradient-orb orb-1" />
      <div className="hero-gradient-orb orb-2" />
    </section>
  )
}
