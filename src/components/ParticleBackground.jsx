import { useEffect, useRef } from 'react'
import './ParticleBackground.css'

export default function ParticleBackground() {
  const canvasRef = useRef(null)
  const trailRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animFrame
    let stars = []
    let nodes = []
    let mouse = { x: -1000, y: -1000 }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    let mouseTimer
    const handleMouse = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      trailRef.current.push({
        x: e.clientX,
        y: e.clientY,
        life: 1,
        size: Math.random() * 2 + 1,
      })
      if (trailRef.current.length > 15) trailRef.current.shift()
      clearTimeout(mouseTimer)
      mouseTimer = setTimeout(() => {}, 100)
    }
    window.addEventListener('mousemove', handleMouse)

    class Star {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 1.5 + 0.3
        this.twinkleSpeed = Math.random() * 0.03 + 0.01
        this.twinklePhase = Math.random() * Math.PI * 2
        this.color = ['#fff', '#e0e7ff', '#c7d2fe', '#ddd6fe', '#f0e6ff'][Math.floor(Math.random() * 5)]
      }
      update() {
        this.twinklePhase += this.twinkleSpeed
        this.opacity = 0.3 + Math.abs(Math.sin(this.twinklePhase)) * 0.7
      }
      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.globalAlpha = this.opacity || 0.5
        ctx.fill()
        if (this.size > 1) {
          ctx.beginPath()
          ctx.arc(this.x, this.y, this.size * 2.5, 0, Math.PI * 2)
          ctx.fillStyle = this.color
          ctx.globalAlpha = (this.opacity || 0.5) * 0.15
          ctx.fill()
        }
        ctx.globalAlpha = 1
      }
    }

    class Node {
      constructor() {
        this.reset()
      }
      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2.5 + 1
        this.baseSize = this.size
        this.speedX = (Math.random() - 0.5) * 0.25
        this.speedY = (Math.random() - 0.5) * 0.25
        this.opacity = Math.random() * 0.5 + 0.3
        this.color = ['#818cf8', '#a78bfa', '#c084fc', '#e879f9', '#f472b6'][Math.floor(Math.random() * 5)]
        this.pulse = Math.random() * Math.PI * 2
        this.pulseSpeed = Math.random() * 0.015 + 0.008
      }
      update() {
        this.pulse += this.pulseSpeed
        this.size = this.baseSize + Math.sin(this.pulse) * 0.8
        const dx = mouse.x - this.x
        const dy = mouse.y - this.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 180) {
          const force = (180 - dist) / 180
          this.x -= dx * force * 0.006
          this.y -= dy * force * 0.006
          this.opacity = Math.min(1, this.opacity + force * 0.4)
        } else {
          this.x += this.speedX
          this.y += this.speedY
          this.opacity += (0.45 - this.opacity) * 0.01
        }
        if (this.x < -30) this.x = canvas.width + 30
        if (this.x > canvas.width + 30) this.x = -30
        if (this.y < -30) this.y = canvas.height + 30
        if (this.y > canvas.height + 30) this.y = -30
      }
      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.globalAlpha = this.opacity
        ctx.shadowBlur = 20
        ctx.shadowColor = this.color
        ctx.fill()
        ctx.globalAlpha = 1
        ctx.shadowBlur = 0
      }
    }

    const starCount = Math.min(200, Math.floor((canvas.width * canvas.height) / 5000))
    for (let i = 0; i < starCount; i++) stars.push(new Star())

    const nodeCount = Math.min(60, Math.floor((canvas.width * canvas.height) / 20000))
    for (let i = 0; i < nodeCount; i++) nodes.push(new Node())

    const connectNodes = () => {
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 160) {
            const opacity = (1 - dist / 160) * 0.12
            ctx.beginPath()
            ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }
    }

    const drawMouseGlow = () => {
      if (mouse.x > 0 && mouse.y > 0) {
        const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 300)
        gradient.addColorStop(0, 'rgba(129, 140, 248, 0.1)')
        gradient.addColorStop(0.5, 'rgba(167, 139, 250, 0.04)')
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
        ctx.fillStyle = gradient
        ctx.fillRect(mouse.x - 300, mouse.y - 300, 600, 600)
      }
    }

    const drawTrail = () => {
      const trail = trailRef.current
      for (let i = trail.length - 1; i >= 0; i--) {
        trail[i].life -= 0.035
        if (trail[i].life <= 0) { trail.splice(i, 1); continue }
        ctx.beginPath()
        ctx.arc(trail[i].x, trail[i].y, trail[i].size * trail[i].life, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(167, 139, 250, ${trail[i].life * 0.5})`
        ctx.fill()
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawMouseGlow()
      stars.forEach((s) => { s.update(); s.draw() })
      connectNodes()
      drawTrail()
      nodes.forEach((n) => { n.update(); n.draw() })
      animFrame = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animFrame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouse)
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="particle-canvas" />
      <div className="bg-gradient-mesh" />
    </>
  )
}
