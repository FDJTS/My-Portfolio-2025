const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());

// إعداد الإيميل (Gmail SMTP)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'YOUR_EMAIL@gmail.com',
    pass: 'YOUR_APP_PASSWORD'
  }
});

// استقبال رسائل التواصل
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.json({ success: false, message: 'كل الحقول مطلوبة' });
  }
  transporter.sendMail({
    from: email,
    to: 'YOUR_EMAIL@gmail.com',
    subject: 'رسالة جديدة من الموقع',
    text: `من: ${name}\nالإيميل: ${email}\n\n${message}`
  }, (err, info) => {
    if (err) return res.json({ success: false, message: 'حدث خطأ أثناء الإرسال' });
    res.json({ success: true, message: 'تم إرسال رسالتك بنجاح! سيتم الرد عليك قريباً.' });
  });
});

// ... أضف هنا باقي الـ APIs للتعليقات والمستخدمين ...

app.listen(3000, () => console.log('Server running on http://localhost:3000'));