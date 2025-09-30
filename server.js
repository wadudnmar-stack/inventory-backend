const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// خدمة ملفات الواجهة
app.use(express.static(path.join(__dirname, "Frontend")));

// صفحة تسجيل الدخول كبداية
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Frontend", "login.html"));
});

// API تسجيل الدخول
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "1234") {
    // تسجيل دخول صحيح → إعادة توجيه للمخزن
    res.redirect("/almakhzan");
  } else {
    res.send("<h2>❌ اسم المستخدم أو كلمة المرور خطأ</h2><a href='/'>رجوع</a>");
  }
});

// صفحة المخزن
app.get("/almakhzan", (req, res) => {
  res.sendFile(path.join(__dirname, "Frontend", "almakhzan.html"));
});

// أي رابط غير موجود → يرجع login.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "Frontend", "login.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});