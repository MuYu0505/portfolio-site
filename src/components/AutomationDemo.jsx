import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './AutomationDemo.css'

const PRODUCT = {
  name: 'Cute Cat Paw Print Soft Fluffy Rug',
  price: '$29.99',
  specs: '120x80cm, Polyester, Non-slip',
  rating: '4.7',
  reviews: '12,847',
  img: '🐱',
  seller: 'PetHome Official Store',
  platform: 'Amazon',
}

const AI_COPY = `【商品标题】宠物猫爪印柔软地毯 客厅卧室地垫 北欧风格防滑脚垫 120x80cm
【商品描述】采用优质涤纶面料，柔软亲肤，猫爪印设计可爱治愈，底部防滑橡胶底，不易移位，适合客厅、卧室、书房等多种场景，可机洗方便清洁。
【关键词】宠物地毯、猫爪、柔软、防滑、北欧风、卧室地垫、客厅
【变体】猫爪灰 / 猫爪粉 / 猫爪棕 / 猫爪白`

const VARIANTS = [
  { color: '猫爪灰', sku: 'CAT-GRAY-001', stock: 320, price: '$29.99' },
  { color: '猫爪粉', sku: 'CAT-PINK-002', stock: 280, price: '$29.99' },
  { color: '猫爪棕', sku: 'CAT-BROWN-003', stock: 195, price: '$31.99' },
  { color: '猫爪白', sku: 'CAT-WHITE-004', stock: 410, price: '$29.99' },
]

export default function AutomationDemo() {
  const [phase, setPhase] = useState('scraping')
  const [scraped, setScraped] = useState(false)
  const [aiStep, setAiStep] = useState(0)
  const [typedCopy, setTypedCopy] = useState('')
  const [fillFields, setFillFields] = useState([])
  const [variantIdx, setVariantIdx] = useState(-1)
  const [done, setDone] = useState(false)
  const timerRef = useRef([])

  const clearTimers = () => timerRef.current.forEach(clearTimeout)

  useEffect(() => {
    clearTimers()
    setPhase('scraping')
    setScraped(false)
    setAiStep(0)
    setTypedCopy('')
    setFillFields([])
    setVariantIdx(-1)
    setDone(false)

    const t = (ms, fn) => { const id = setTimeout(fn, ms); timerRef.current.push(id) }

    // Phase 1: Scraping
    t(1800, () => setScraped(true))
    t(3200, () => setPhase('ai'))

    // Phase 2: AI
    t(4000, () => setAiStep(1))
    t(5000, () => setAiStep(2))
    t(5200, () => {
      let idx = 0
      const timer = setInterval(() => {
        if (idx < AI_COPY.length) {
          idx++
          setTypedCopy(AI_COPY.slice(0, idx))
        } else {
          clearInterval(timer)
          t(800, () => setPhase('fill'))
          t(1500, () => setFillFields(['title']))
          t(2500, () => setFillFields(['title', 'desc']))
              t(3500, () => setFillFields(['title', 'desc', 'price']))
              t(4500, () => setFillFields(['title', 'desc', 'price', 'specs']))
              t(5500, () => setPhase('variant'))
              t(6200, () => setVariantIdx(0))
              t(7000, () => setVariantIdx(1))
              t(7800, () => setVariantIdx(2))
              t(8600, () => setVariantIdx(3))
              t(9500, () => { setPhase('done'); setDone(true) })
        }
      }, 15)
      timerRef.current.push(timer)
    })

    return clearTimers
  }, [])

  const phases = ['scraping', 'ai', 'fill', 'variant', 'done']
  const currentIdx = phases.indexOf(phase)

  return (
    <div className="auto-demo">
      <div className="ad-layout">
        <div className="ad-workflow">
          <div className="ad-wf-title">自动化上架流程</div>
          <div className="ad-wf-steps">
            {[
              { name: '商品信息抓取', icon: '🌐' },
              { name: 'AI文案生成', icon: '🤖' },
              { name: '表单智能填充', icon: '📝' },
              { name: '变体合并发布', icon: '📦' },
            ].map((step, i) => {
              const status = i < currentIdx ? 'done' : i === currentIdx ? 'active' : 'pending'
              return (
                <motion.div key={step.name} className={`ad-wf-step ${status}`} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.1 }}>
                  <div className="ad-step-icon">{step.icon}</div>
                  <div className="ad-step-name">{step.name}</div>
                  {i < 3 && <div className="ad-step-line" />}
                </motion.div>
              )
            })}
          </div>
        </div>

        <div className="ad-content">
          <AnimatePresence mode="wait">
            {phase === 'scraping' && (
              <motion.div key="scrape" className="ad-panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="ad-panel-header"><span className="ad-panel-icon">🌐</span><span>商品信息抓取 - Amazon</span></div>
                <div className="ad-scrape-area">
                  <div className="ad-source-card">
                    <div className="ad-source-badge">amazon.com</div>
                    <div className="ad-source-img-large">🐱</div>
                    <div className="ad-source-name">{PRODUCT.name}</div>
                    <div className="ad-source-rating">⭐ {PRODUCT.rating} ({PRODUCT.reviews} reviews)</div>
                    <div className="ad-source-price-large">{PRODUCT.price}</div>
                    <div className="ad-source-specs">{PRODUCT.specs}</div>
                    <div className="ad-source-seller">by {PRODUCT.seller}</div>
                    {!scraped && <div className="ad-scanning-overlay"><motion.div className="ad-scan-line" animate={{ y: [0, 100, 0] }} transition={{ duration: 1.5, repeat: Infinity }} /></div>}
                  </div>
                  <div className="ad-arrow"><motion.span animate={{ x: [0, 8, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>→</motion.span></div>
                  <div className="ad-result-card">
                    <div className="ad-result-title">抓取结果</div>
                    {scraped ? (
                      <motion.div className="ad-result-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <div className="ad-result-row"><span className="ad-result-label">名称</span><span className="ad-result-val">{PRODUCT.name}</span></div>
                        <div className="ad-result-row"><span className="ad-result-label">价格</span><span className="ad-result-val">{PRODUCT.price}</span></div>
                        <div className="ad-result-row"><span className="ad-result-label">规格</span><span className="ad-result-val">{PRODUCT.specs}</span></div>
                        <div className="ad-result-row"><span className="ad-result-label">评分</span><span className="ad-result-val">⭐ {PRODUCT.rating}</span></div>
                        <div className="ad-result-row"><span className="ad-result-label">评论数</span><span className="ad-result-val">{PRODUCT.reviews}</span></div>
                        <div className="ad-result-check">✓ 抓取完成</div>
                      </motion.div>
                    ) : (
                      <div className="ad-result-placeholder">等待抓取...</div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {phase === 'ai' && (
              <motion.div key="ai" className="ad-panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="ad-panel-header"><span className="ad-panel-icon">🤖</span><span>AI文案生成 - DashScope</span></div>
                <div className="ad-ai-area">
                  <div className="ad-ai-sidebar">
                    <div className={`ad-ai-step ${aiStep >= 1 ? 'done' : ''}`}><span>1</span> 分析商品属性</div>
                    <div className={`ad-ai-step ${aiStep >= 2 ? 'done' : ''}`}><span>2</span> 生成中文标题</div>
                    <div className={`ad-ai-step ${typedCopy.length >= AI_COPY.length ? 'done' : ''}`}><span>3</span> 输出完整文案</div>
                  </div>
                  <div className="ad-ai-output">
                    <div className="ad-ai-out-header"><span>AI生成结果</span><span className="ad-ai-status">{typedCopy.length >= AI_COPY.length ? '✓ 完成' : '生成中...'}</span></div>
                    <pre className="ad-ai-code">{typedCopy}<span className="ad-cursor">|</span></pre>
                  </div>
                </div>
              </motion.div>
            )}

            {phase === 'fill' && (
              <motion.div key="fill" className="ad-panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="ad-panel-header"><span className="ad-panel-icon">📝</span><span>表单智能填充</span></div>
                <div className="ad-fill-area">
                  <div className="ad-form-preview">
                    <div className="ad-form-header">商品上架表单</div>
                    <div className={`ad-form-field ${fillFields.includes('title') ? 'filled' : ''}`}>
                      <label>商品标题</label>
                      <div className="ad-form-val">{fillFields.includes('title') ? '宠物猫爪印柔软地毯 客厅卧室地垫 北欧风格防滑脚垫 120x80cm' : <span className="ad-placeholder">点击填充...</span>}</div>
                    </div>
                    <div className={`ad-form-field ${fillFields.includes('desc') ? 'filled' : ''}`}>
                      <label>商品描述</label>
                      <div className="ad-form-val desc">{fillFields.includes('desc') ? '采用优质涤纶面料，柔软亲肤，猫爪印设计可爱治愈，底部防滑橡胶底...' : <span className="ad-placeholder">点击填充...</span>}</div>
                    </div>
                    <div className="ad-form-row">
                      <div className={`ad-form-field ${fillFields.includes('price') ? 'filled' : ''}`}>
                        <label>价格</label>
                        <div className="ad-form-val">{fillFields.includes('price') ? '$29.99' : <span className="ad-placeholder">¥0.00</span>}</div>
                      </div>
                      <div className={`ad-form-field ${fillFields.includes('specs') ? 'filled' : ''}`}>
                        <label>规格</label>
                        <div className="ad-form-val">{fillFields.includes('specs') ? '120x80cm' : <span className="ad-placeholder">请选择</span>}</div>
                      </div>
                    </div>
                    <div className="ad-form-progress">
                      <div className="ad-progress-bar"><div className="ad-progress-fill" style={{ width: `${(fillFields.length / 4) * 100}%` }} /></div>
                      <span className="ad-progress-text">{fillFields.length}/4 已填充</span>
                    </div>
                  </div>
                  <div className="ad-fill-status">
                    <div className="ad-fill-anim">
                      {fillFields.length < 4 && <motion.div className="ad-fill-cursor" animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }} />}
                    </div>
                    <div className="ad-fill-log">
                      {fillFields.map((f, i) => (
                        <motion.div key={f} className="ad-log-item" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                          <span className="ad-log-check">✓</span>
                          <span>{f === 'title' ? '填充标题' : f === 'desc' ? '填充描述' : f === 'price' ? '填充价格' : '填充规格'}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {phase === 'variant' && (
              <motion.div key="variant" className="ad-panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="ad-panel-header"><span className="ad-panel-icon">📦</span><span>变体合并发布</span></div>
                <div className="ad-variant-area">
                  <div className="ad-variant-source">
                    <div className="ad-variant-title">检测到多规格变体</div>
                    <div className="ad-variant-desc">AI自动识别颜色属性，合并为父商品</div>
                    <div className="ad-variant-parent">
                      <span className="ad-variant-parent-img">🐱</span>
                      <div>
                        <div className="ad-variant-parent-name">{PRODUCT.name}</div>
                        <div className="ad-variant-parent-sub">4个变体 SKU</div>
                      </div>
                    </div>
                  </div>
                  <div className="ad-variant-arrow"><motion.span animate={{ y: [0, 5, 0] }} transition={{ duration: 1, repeat: Infinity }}>↓</motion.span></div>
                  <div className="ad-variant-list">
                    {VARIANTS.map((v, i) => (
                      <motion.div key={v.sku} className={`ad-variant-item ${variantIdx >= i ? 'added' : ''}`} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }}>
                        <span className="ad-v-color" style={{ background: v.color === '猫爪灰' ? '#888' : v.color === '猫爪粉' ? '#f9a8d4' : v.color === '猫爪棕' ? '#a3734c' : '#e5e5e5' }} />
                        <span className="ad-v-name">{v.color}</span>
                        <span className="ad-v-sku">{v.sku}</span>
                        <span className="ad-v-stock">库存 {v.stock}</span>
                        <span className="ad-v-price">{v.price}</span>
                        {variantIdx >= i && <motion.span className="ad-v-check" initial={{ scale: 0 }} animate={{ scale: 1 }}>✓</motion.span>}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {done && (
              <motion.div key="done" className="ad-panel ad-done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                <div className="ad-done-icon">✅</div>
                <div className="ad-done-title">商品上架完成！</div>
                <div className="ad-done-desc">AI自动生成文案 + 智能表单填充 + 变体合并，全流程自动化</div>
                <div className="ad-done-stats">
                  <div className="ad-stat"><span className="ad-stat-val">3.2s</span><span className="ad-stat-label">处理耗时</span></div>
                  <div className="ad-stat"><span className="ad-stat-val">100%</span><span className="ad-stat-label">填充准确率</span></div>
                  <div className="ad-stat"><span className="ad-stat-val">0</span><span className="ad-stat-label">人工操作</span></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
