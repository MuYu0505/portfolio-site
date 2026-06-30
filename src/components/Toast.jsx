import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Toast.css'

let showToastFn = null

export function showToast(msg) {
  if (showToastFn) showToastFn(msg)
}

export default function Toast() {
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    showToastFn = (msg) => {
      setMessage(msg)
      setVisible(true)
      setTimeout(() => setVisible(false), 2000)
    }
    return () => { showToastFn = null }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="toast"
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <span className="toast-icon">✓</span>
          <span className="toast-msg">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
