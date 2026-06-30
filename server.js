import express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import dns from 'dns'

dns.setDefaultResultOrder('ipv4first')

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const transporter = nodemailer.createTransport({
  host: 'smtp.qq.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

app.post('/api/send', async (req, res) => {
  const { name, email, subject, message } = req.body
  if (!name || !email || !message) {
    return res.status(400).json({ error: '请填写必要信息' })
  }
  try {
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { margin: 0; padding: 0; background: #f4f4f7; font-family: 'Segoe UI', Arial, sans-serif; }
    .container { max-width: 600px; margin: 20px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; }
    .header h1 { color: #fff; margin: 0; font-size: 24px; font-weight: 600; }
    .header p { color: rgba(255,255,255,0.85); margin: 8px 0 0; font-size: 14px; }
    .content { padding: 30px; }
    .info-row { display: flex; padding: 14px 0; border-bottom: 1px solid #f0f0f0; }
    .info-row:last-child { border-bottom: none; }
    .info-label { width: 80px; color: #888; font-size: 13px; flex-shrink: 0; padding-top: 2px; }
    .info-value { color: #333; font-size: 14px; font-weight: 500; }
    .info-value a { color: #667eea; text-decoration: none; }
    .message-box { background: #f8f9fc; border-left: 4px solid #667eea; padding: 18px; margin-top: 20px; border-radius: 0 8px 8px 0; }
    .message-box p { margin: 0; color: #444; line-height: 1.7; white-space: pre-wrap; }
    .footer { background: #f8f9fc; padding: 20px 30px; text-align: center; border-top: 1px solid #eee; }
    .footer p { margin: 0; color: #999; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📬 新消息通知</h1>
      <p>来自个人网站的联系表单</p>
    </div>
    <div class="content">
      <div class="info-row">
        <span class="info-label">发件人</span>
        <span class="info-value">${name}</span>
      </div>
      <div class="info-row">
        <span class="info-label">邮箱</span>
        <span class="info-value"><a href="mailto:${email}">${email}</a></span>
      </div>
      <div class="info-row">
        <span class="info-label">主题</span>
        <span class="info-value">${subject || '（未填写）'}</span>
      </div>
      <div class="message-box">
        <p>${message}</p>
      </div>
    </div>
    <div class="footer">
      <p>此邮件由个人网站联系表单自动发送</p>
    </div>
  </div>
</body>
</html>`

    await transporter.sendMail({
      from: `"个人网站" <${process.env.EMAIL_USER}>`,
      to: '1372710376@qq.com',
      replyTo: email,
      subject: subject || `来自个人网站 - ${name}`,
      text: `发件人：${name}\n邮箱：${email}\n\n${message}`,
      html: htmlContent,
    })
    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: '发送失败' })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
