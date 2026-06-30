import { FiGithub, FiMail } from 'react-icons/fi'
import { showToast } from './Toast'
import siteConfig from '../config'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="glow-line" />
      <div className="footer-inner">
        <div className="footer-left">
          <span className="footer-logo-text">Code the Stars</span>
          <p className="footer-text">
            &copy; {new Date().getFullYear()} 陈伟鹏. All rights reserved.
          </p>
        </div>
        <div className="footer-right">
          <a href={siteConfig.github} target="_blank" rel="noopener" className="footer-link">
            <FiGithub />
          </a>
          <a href="#" className="footer-link" onClick={(e) => { e.preventDefault(); navigator.clipboard.writeText(siteConfig.email); showToast('邮箱已复制到剪贴板') }}>
            <FiMail />
          </a>
        </div>
      </div>
    </footer>
  )
}
