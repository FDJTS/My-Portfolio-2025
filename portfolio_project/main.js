// الوضع الليلي
document.addEventListener('DOMContentLoaded', function () {
  const modeToggle = document.getElementById('modeToggle');
  if (modeToggle) {
    modeToggle.addEventListener('click', function () {
      document.body.classList.toggle('dark-mode');
      localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });
    // تفعيل الوضع الليلي تلقائياً إذا كان محفوظ
    if (localStorage.getItem('darkMode') === 'true') {
      document.body.classList.add('dark-mode');
    }
  }

  // تغيير اللغة
  const langSelect = document.getElementById('lang');
  if (langSelect) {
    langSelect.value = document.documentElement.lang;
    langSelect.addEventListener('change', function () {
      const lang = this.value;
      document.documentElement.lang = lang;
      document.documentElement.dir = (lang === 'en') ? 'ltr' : 'rtl';
      localStorage.setItem('lang', lang);
      // هنا يمكن إضافة دعم ترجمة النصوص إذا أردت
      location.reload();
    });
    // تفعيل اللغة المحفوظة
    const savedLang = localStorage.getItem('lang');
    if (savedLang && savedLang !== document.documentElement.lang) {
      langSelect.value = savedLang;
      langSelect.dispatchEvent(new Event('change'));
    }
  }

  // نظام المستخدمين (تسجيل وتسجيل دخول)
  // حفظ المستخدمين في localStorage
  function getUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
  }
  function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
  }
  function setCurrentUser(username) {
    localStorage.setItem('currentUser', username);
  }
  function getCurrentUser() {
    return localStorage.getItem('currentUser');
  }

  // تسجيل حساب جديد
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const username = document.getElementById('registerUsername').value.trim();
      const password = document.getElementById('registerPassword').value;
      const users = getUsers();
      if (users.find(u => u.username === username)) {
        document.getElementById('registerMessage').textContent = 'اسم المستخدم موجود بالفعل!';
        return;
      }
      users.push({ username, password });
      saveUsers(users);
      setCurrentUser(username);
      document.getElementById('registerMessage').textContent = 'تم إنشاء الحساب وتسجيل الدخول بنجاح!';
      setTimeout(() => window.location.href = 'index.html', 1200);
    });

    // تسجيل مع جوجل (وهمي)
    document.getElementById('googleRegister').addEventListener('click', function () {
      const username = 'google_user_' + Math.floor(Math.random() * 10000);
      const users = getUsers();
      users.push({ username, password: '' });
      saveUsers(users);
      setCurrentUser(username);
      document.getElementById('registerMessage').textContent = 'تم التسجيل بحساب جوجل (وهمي)!';
      setTimeout(() => window.location.href = 'index.html', 1200);
    });
  }

  // تسجيل الدخول
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const username = document.getElementById('loginUsername').value.trim();
      const password = document.getElementById('loginPassword').value;
      const users = getUsers();
      const user = users.find(u => u.username === username && u.password === password);
      if (user) {
        setCurrentUser(username);
        document.getElementById('loginMessage').textContent = 'تم تسجيل الدخول بنجاح!';
        setTimeout(() => window.location.href = 'index.html', 1200);
      } else {
        document.getElementById('loginMessage').textContent = 'بيانات الدخول غير صحيحة!';
      }
    });

    // تسجيل مع جوجل (وهمي)
    document.getElementById('googleLogin').addEventListener('click', function () {
      const username = 'google_user_' + Math.floor(Math.random() * 10000);
      const users = getUsers();
      users.push({ username, password: '' });
      saveUsers(users);
      setCurrentUser(username);
      document.getElementById('loginMessage').textContent = 'تم تسجيل الدخول بحساب جوجل (وهمي)!';
      setTimeout(() => window.location.href = 'index.html', 1200);
    });
  }

  // التعليقات (محفوظة في localStorage وتظهر للجميع)
  function getComments() {
    return JSON.parse(localStorage.getItem('comments') || '[]');
  }
  function saveComments(comments) {
    localStorage.setItem('comments', JSON.stringify(comments));
  }
  function renderComments() {
    const commentsList = document.getElementById('commentsList');
    if (commentsList) {
      commentsList.innerHTML = '';
      getComments().forEach(comment => {
        const li = document.createElement('li');
        li.textContent = `${comment.username}: ${comment.text}`;
        commentsList.appendChild(li);
      });
    }
  }
  const commentForm = document.getElementById('commentForm');
  if (commentForm) {
    renderComments();
    commentForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const text = document.getElementById('commentText').value.trim();
      const username = getCurrentUser() || 'زائر';
      if (text) {
        const comments = getComments();
        comments.push({ username, text });
        saveComments(comments);
        renderComments();
        commentForm.reset();
      }
    });
  } else {
    renderComments();
  }

  // التواصل (إرسال رسالة وهمية)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      document.getElementById('contactMessageStatus').textContent = 'تم إرسال رسالتك بنجاح! سيتم الرد عليك قريباً.';
      contactForm.reset();
    });
  }
});
// مثال: إرسال نموذج التواصل عبر AJAX
document.addEventListener('DOMContentLoaded', function () {
  // ... باقي الأكواد ...
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const data = {
        name: document.getElementById('contactName').value,
        email: document.getElementById('contactEmail').value,
        message: document.getElementById('contactMessage').value
      };
      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(res => {
        document.getElementById('contactMessageStatus').textContent = res.message;
      });
      contactForm.reset();
    });
  }
  // ... باقي الأكواد ...
});
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(cors());
app.use(bodyParser.json());

// إعداد الإيميل (Gmail SMTP)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'YOUR_EMAIL@gmail.com',      // ضع بريدك هنا
    pass: 'YOUR_APP_PASSWORD'          // ضع كلمة مرور التطبيقات هنا
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

// تسجيل حساب جديد
app.post('/api/register', (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    return res.json({ success: false, message: 'كل الحقول مطلوبة' });
  }
  const usersPath = path.join(__dirname, 'users.json');
  let users = [];
  if (fs.existsSync(usersPath)) {
    users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
  }
  if (users.find(u => u.username === username)) {
    return res.json({ success: false, message: 'اسم المستخدم موجود بالفعل' });
  }
  if (users.find(u => u.email === email)) {
    return res.json({ success: false, message: 'البريد الإلكتروني مستخدم بالفعل' });
  }
  users.push({ username, password, email });
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
  // إرسال إيميل ترحيبي
  transporter.sendMail({
    from: 'YOUR_EMAIL@gmail.com',
    to: email,
    subject: 'تم تسجيل حسابك بنجاح',
    text: `مرحباً ${username}!\n\nتم تسجيل حسابك بنجاح في موقع زياد محمد.`
  }, (err, info) => {
    // حتى لو فشل الإرسال، نعتبر التسجيل ناجح
    res.json({ success: true, message: 'تم إنشاء الحساب بنجاح! تم إرسال رسالة إلى بريدك.' });
  });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));