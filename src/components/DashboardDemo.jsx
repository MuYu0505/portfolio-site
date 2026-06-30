import { useState } from 'react'
import { motion } from 'framer-motion'
import './DashboardDemo.css'

const TABS = ['销售概览', '渠道分析', '区域报表', '费用核销']

function SalesOverview() {
  return (
    <div className="db-content">
      <div className="db-kpi-row">
        {[
          { label: '本月销售额', value: '2.87亿', change: '+12.3%' },
          { label: '订单总量', value: '1,568,320', change: '+8.7%' },
          { label: '活跃经销商', value: '32,410', change: '+5.1%' },
          { label: '查询耗时', value: '2.8s', change: '-93.8%' },
        ].map((kpi, i) => (
          <motion.div className="db-kpi" key={kpi.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.08 }}>
            <div className="db-kpi-label">{kpi.label}</div>
            <div className="db-kpi-value">{kpi.value}</div>
            <div className="db-kpi-change up">{kpi.change}</div>
          </motion.div>
        ))}
      </div>
      <div className="db-charts-row">
        <motion.div className="db-chart" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <div className="db-chart-title">月度销售趋势</div>
          <div className="db-bars">
            {[40, 55, 45, 70, 65, 80, 75, 90, 85, 95, 88, 100].map((h, i) => (
              <motion.div className="db-bar" key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: 0.5 + i * 0.04 }} />
            ))}
          </div>
        </motion.div>
        <motion.div className="db-chart" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <div className="db-chart-title">渠道占比</div>
          <div className="db-donut"><div className="db-donut-center">5渠道</div></div>
          <div className="db-legend">
            <span><i style={{background:'#6366f1'}}/> 美团 35%</span>
            <span><i style={{background:'#a855f7'}}/> 京东 28%</span>
            <span><i style={{background:'#ec4899'}}/> 饿了么 22%</span>
            <span><i style={{background:'#14b8a6'}}/> 其他 15%</span>
          </div>
        </motion.div>
      </div>
      <motion.div className="db-table" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
        <div className="db-table-title">区域销售TOP5</div>
        <div className="db-table-header"><span>区域</span><span>销售额</span><span>订单数</span><span>同比</span></div>
        {[
          { region: '广州天河区', sales: '4,870万', orders: '234,120', growth: '+15.2%' },
          { region: '深圳南山区', sales: '4,210万', orders: '198,760', growth: '+11.8%' },
          { region: '佛山顺德区', sales: '3,560万', orders: '172,340', growth: '+9.3%' },
        ].map((r) => (
          <div className="db-table-row" key={r.region}><span>{r.region}</span><span>{r.sales}</span><span>{r.orders}</span><span className="up">{r.growth}</span></div>
        ))}
      </motion.div>
    </div>
  )
}

function ChannelAnalysis() {
  const channels = [
    { name: '美团', sales: '1.00亿', orders: '548,912', share: '35%', growth: '+15.6%', color: '#6366f1' },
    { name: '京东到家', sales: '8,036万', orders: '439,130', share: '28%', growth: '+18.2%', color: '#a855f7' },
    { name: '饿了么', sales: '6,314万', orders: '345,030', share: '22%', growth: '+9.7%', color: '#ec4899' },
    { name: '朴朴超市', sales: '2,870万', orders: '156,832', share: '10%', growth: '+22.1%', color: '#14b8a6' },
    { name: '其他渠道', sales: '1,435万', orders: '78,416', share: '5%', growth: '+5.3%', color: '#f59e0b' },
  ]
  return (
    <div className="db-content">
      <div className="db-kpi-row">
        {[
          { label: '渠道总数', value: '5', change: '' },
          { label: '渠道月销售额', value: '2.87亿', change: '+14.2%' },
          { label: '渠道月订单量', value: '1,568,320', change: '+10.1%' },
          { label: '最佳渠道', value: '美团', change: '35%' },
        ].map((kpi, i) => (
          <motion.div className="db-kpi" key={kpi.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.08 }}>
            <div className="db-kpi-label">{kpi.label}</div>
            <div className="db-kpi-value">{kpi.value}</div>
            {kpi.change && <div className="db-kpi-change up">{kpi.change}</div>}
          </motion.div>
        ))}
      </div>
      <div className="db-charts-row">
        <motion.div className="db-chart" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <div className="db-chart-title">渠道销售对比</div>
          <div className="db-hbars">
            {channels.map((ch, i) => (
              <motion.div className="db-hbar-row" key={ch.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.08 }}>
                <span className="db-hbar-label">{ch.name}</span>
                <div className="db-hbar-track">
                  <motion.div className="db-hbar-fill" style={{ background: ch.color }} initial={{ width: 0 }} animate={{ width: `${parseInt(ch.share) * 2.8}%` }} transition={{ delay: 0.6 + i * 0.08 }} />
                </div>
                <span className="db-hbar-val">{ch.sales}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div className="db-chart" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <div className="db-chart-title">渠道订单趋势</div>
          <div className="db-bars multi">
            {[1,2,3,4,5,6,7,8,9,10,11,12].map((m) => (
              <div className="db-bar-group" key={m}>
                <div className="db-bar-sm" style={{ height: `${30 + Math.random() * 60}%`, background: '#6366f1' }} />
                <div className="db-bar-sm" style={{ height: `${25 + Math.random() * 50}%`, background: '#a855f7' }} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      <motion.div className="db-table" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
        <div className="db-table-title">渠道明细</div>
        <div className="db-table-header"><span>渠道</span><span>销售额</span><span>订单数</span><span>占比</span><span>同比</span></div>
        {channels.map((ch) => (
          <div className="db-table-row" key={ch.name}><span style={{color:ch.color}}>{ch.name}</span><span>{ch.sales}</span><span>{ch.orders}</span><span>{ch.share}</span><span className="up">{ch.growth}</span></div>
        ))}
      </motion.div>
    </div>
  )
}

function RegionReport() {
  const regions = [
    { name: '广州', sales: '5,820万', orders: '284,560', growth: '+16.8%', dealers: '4,210' },
    { name: '深圳', sales: '4,930万', orders: '238,720', growth: '+14.2%', dealers: '3,850' },
    { name: '佛山', sales: '3,670万', orders: '178,340', growth: '+11.5%', dealers: '2,940' },
    { name: '东莞', sales: '3,120万', orders: '152,180', growth: '+18.7%', dealers: '2,560' },
    { name: '珠海', sales: '2,180万', orders: '106,420', growth: '+9.3%', dealers: '1,870' },
    { name: '中山', sales: '1,890万', orders: '92,160', growth: '+12.1%', dealers: '1,540' },
    { name: '惠州', sales: '1,560万', orders: '76,280', growth: '+8.6%', dealers: '1,230' },
    { name: '江门', sales: '1,230万', orders: '60,140', growth: '+6.2%', dealers: '980' },
  ]
  return (
    <div className="db-content">
      <div className="db-kpi-row">
        {[
          { label: '覆盖城市', value: '8', change: '' },
          { label: '总销售额', value: '2.44亿', change: '+13.5%' },
          { label: '经销商总数', value: '19,180', change: '+7.8%' },
          { label: '城市覆盖率', value: '92.6%', change: '+3.2%' },
        ].map((kpi, i) => (
          <motion.div className="db-kpi" key={kpi.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.08 }}>
            <div className="db-kpi-label">{kpi.label}</div>
            <div className="db-kpi-value">{kpi.value}</div>
            {kpi.change && <div className="db-kpi-change up">{kpi.change}</div>}
          </motion.div>
        ))}
      </div>
      <div className="db-charts-row">
        <motion.div className="db-chart" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <div className="db-chart-title">城市销售排名</div>
          <div className="db-bars">
            {[95, 80, 60, 50, 35, 30, 25, 20].map((h, i) => (
              <motion.div className="db-bar" key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: 0.5 + i * 0.06 }} />
            ))}
          </div>
          <div className="db-bar-labels">
            {regions.map((r) => <span key={r.name}>{r.name}</span>)}
          </div>
        </motion.div>
        <motion.div className="db-chart" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <div className="db-chart-title">区域增长趋势</div>
          <div className="db-bars multi">
            {[1,2,3,4,5,6].map((m) => (
              <div className="db-bar-group" key={m}>
                <div className="db-bar-sm" style={{ height: `${40 + Math.random() * 55}%`, background: '#6366f1' }} />
                <div className="db-bar-sm" style={{ height: `${35 + Math.random() * 45}%`, background: '#ec4899' }} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      <motion.div className="db-table" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
        <div className="db-table-title">区域明细</div>
        <div className="db-table-header"><span>城市</span><span>销售额</span><span>订单数</span><span>经销商</span><span>同比</span></div>
        {regions.map((r) => (
          <div className="db-table-row" key={r.name}><span>{r.name}</span><span>{r.sales}</span><span>{r.orders}</span><span>{r.dealers}</span><span className="up">{r.growth}</span></div>
        ))}
      </motion.div>
    </div>
  )
}

function ExpenseVerify() {
  const items = [
    { name: '广告投放费', budget: '2,800万', used: '2,450万', rate: '87.5%', status: '正常' },
    { name: '渠道返利', budget: '4,500万', used: '4,120万', rate: '91.6%', status: '预警' },
    { name: '促销活动费', budget: '1,200万', used: '980万', rate: '81.7%', status: '正常' },
    { name: '物流配送费', budget: '3,600万', used: '3,280万', rate: '91.1%', status: '预警' },
    { name: '人员费用', budget: '1,800万', used: '1,650万', rate: '91.7%', status: '预警' },
  ]
  return (
    <div className="db-content">
      <div className="db-kpi-row">
        {[
          { label: '年度预算总额', value: '1.39亿', change: '' },
          { label: '已核销金额', value: '1.25亿', change: '' },
          { label: '核销进度', value: '89.9%', change: '' },
          { label: '剩余预算', value: '1,400万', change: '' },
        ].map((kpi, i) => (
          <motion.div className="db-kpi" key={kpi.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.08 }}>
            <div className="db-kpi-label">{kpi.label}</div>
            <div className="db-kpi-value">{kpi.value}</div>
          </motion.div>
        ))}
      </div>
      <div className="db-charts-row">
        <motion.div className="db-chart" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <div className="db-chart-title">月度核销趋势</div>
          <div className="db-bars">
            {[60, 70, 65, 80, 75, 85, 82, 90, 88, 92, 95, 100].map((h, i) => (
              <motion.div className="db-bar expense" key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: 0.5 + i * 0.04 }} />
            ))}
          </div>
        </motion.div>
        <motion.div className="db-chart" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <div className="db-chart-title">预算使用率</div>
          <div className="db-donut expense"><div className="db-donut-center">89.9%</div></div>
          <div className="db-legend">
            <span><i style={{background:'#22c55e'}}/> 已核销 89.9%</span>
            <span><i style={{background:'#334155'}}/> 剩余 10.1%</span>
          </div>
        </motion.div>
      </div>
      <motion.div className="db-table" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
        <div className="db-table-title">费用明细</div>
        <div className="db-table-header"><span>费用类型</span><span>预算</span><span>已核销</span><span>使用率</span><span>状态</span></div>
        {items.map((item) => (
          <div className="db-table-row" key={item.name}>
            <span>{item.name}</span><span>{item.budget}</span><span>{item.used}</span><span>{item.rate}</span>
            <span className={item.status === '预警' ? 'warn' : 'up'}>{item.status}</span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default function DashboardDemo() {
  const [activeTab, setActiveTab] = useState('销售概览')
  const [querying, setQuerying] = useState(false)

  const handleQuery = () => {
    setQuerying(true)
    setTimeout(() => setQuerying(false), 800)
  }

  const renderContent = () => {
    switch (activeTab) {
      case '销售概览': return <SalesOverview />
      case '渠道分析': return <ChannelAnalysis />
      case '区域报表': return <RegionReport />
      case '费用核销': return <ExpenseVerify />
      default: return <SalesOverview />
    }
  }

  return (
    <div className="dashboard-demo">
      <div className="dd-sidebar">
        <div className="dd-sidebar-title">经营分析</div>
        {TABS.map((tab) => (
          <button key={tab} className={`dd-sidebar-item ${activeTab === tab ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); setActiveTab(tab); setQuerying(false) }}>
            {tab}
          </button>
        ))}
      </div>
      <div className="dd-main">
        <div className="dd-topbar">
          <span className="dd-breadcrumb">首页 / {activeTab}</span>
          <span className="dd-date">2025-06</span>
        </div>
        <div className="dd-filter-bar" onClick={(e) => e.stopPropagation()}>
          <div className="dd-filter-item">
            <span className="dd-filter-label">渠道</span>
            <span className="dd-filter-val">全部渠道 ▾</span>
          </div>
          <div className="dd-filter-item">
            <span className="dd-filter-label">平台</span>
            <span className="dd-filter-val">美团 / 京东 / 饿了么 ▾</span>
          </div>
          <div className="dd-filter-item">
            <span className="dd-filter-label">日期</span>
            <span className="dd-filter-val">2025-06-01 ~ 2025-06-30</span>
          </div>
          <motion.button className="dd-query-btn" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={(e) => { e.stopPropagation(); handleQuery() }}>
            {querying ? '查询中...' : '查询'}
          </motion.button>
        </div>
        {querying ? (
          <div className="dd-loading">
            <motion.div className="dd-loading-spinner" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} />
            <span>数据加载中... 10亿级数据查询优化至2.8s</span>
          </div>
        ) : (
          renderContent()
        )}
      </div>
    </div>
  )
}
