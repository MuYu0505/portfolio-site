import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { FiMail, FiPhone, FiMapPin, FiGithub, FiSend, FiCopy, FiExternalLink } from 'react-icons/fi'
import { showToast } from './Toast'
import siteConfig from '../config'
import './Contact.css'

const contactInfo = [
  {
    icon: <FiPhone />,
    label: '电话',
    value: siteConfig.phone,
    action: () => { navigator.clipboard.writeText(siteConfig.phone); showToast('电话已复制到剪贴板') },
    hint: '点击复制',
  },
  {
    icon: <FiMail />,
    label: '邮箱',
    value: siteConfig.email,
    action: () => { navigator.clipboard.writeText(siteConfig.email); showToast('邮箱已复制到剪贴板') },
    hint: '点击复制',
  },
  {
    icon: <FiMapPin />,
    label: '地点',
    value: siteConfig.location,
    action: () => { navigator.clipboard.writeText(siteConfig.location); showToast('地点已复制到剪贴板') },
    hint: '点击复制',
  },
  {
    icon: <FiGithub />,
    label: 'GitHub',
    value: 'MuYu0505',
    action: () => { window.open(siteConfig.github, '_blank', 'noopener') },
    hint: '点击访问',
  },
]

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      showToast('请填写姓名、邮箱和消息')
      return
    }

    setSubmitting(true)
    try {
      const apiUrl = siteConfig.apiBase
        ? `${siteConfig.apiBase}/api/send`
        : '/api/send'
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        showToast('消息已发送成功！')
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        showToast('发送失败，请稍后重试')
      }
    } catch {
      showToast('发送失败，请稍后重试')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="contact" ref={ref}>
      <div className="contact-inner">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="section-title">联系我</h2>
          <p className="contact-subtitle">期待与你的合作</p>
        </motion.div>

        <div className="contact-grid">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="contact-desc">
              无论是项目合作、技术交流还是工作机会，都欢迎随时联系我。
              我会尽快回复你的消息。
            </p>

            <div className="contact-items">
              {contactInfo.map((item, i) => (
                <motion.button
                  key={item.label}
                  className="contact-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  onClick={item.action}
                  title={item.hint}
                >
                  <div className="contact-icon">{item.icon}</div>
                  <div className="contact-detail">
                    <span className="contact-label">{item.label}</span>
                    <span className="contact-value">{item.value}</span>
                  </div>
                  <div className="contact-item-arrow">
                    {item.label === 'GitHub' ? <FiExternalLink /> : <FiCopy />}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="contact-form glass-card"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>姓名 / 公司</label>
                  <input type="text" placeholder="你的名字或公司名称" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} />
                </div>
                <div className="form-group">
                  <label>邮箱</label>
                  <input type="email" placeholder="你的邮箱" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} />
                </div>
              </div>
              <div className="form-group">
                <label>主题</label>
                <input type="text" placeholder="消息主题" value={form.subject} onChange={(e) => setForm({...form, subject: e.target.value})} />
              </div>
              <div className="form-group">
                <label>消息</label>
                <textarea rows="5" placeholder="你想说什么..." value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} />
              </div>
              <motion.button
                type="submit"
                className="submit-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={submitting}
              >
                <FiSend /> {submitting ? '发送中...' : '发送消息'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
