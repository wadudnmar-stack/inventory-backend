const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve frontend (static files)
app.use(express.static(path.join(__dirname, "Frontend")));

// منتجات تجريبية
let products = [
  { id: 1, name: "T-shirt", price: 15000 },
  { id: 2, name: "Pants", price: 25000 },
  { id: 3, name: "Shoes", price: 40000 }
];

// Route: API للمنتجات
app.get("/products", (req, res) => {
  res.json(products);
});

// Route: تسجيل الدخول
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // بيانات تسجيل دخول تجريبية
  if (username === "admin" && password === "1234") {
    res.json({ success: true, message: "تم تسجيل الدخول بنجاح" });
  } else {
    res.json({ success: false, message: "اسم المستخدم أو كلمة المرور غير صحيحة" });
  }
});

// ✅ Route: صفحة المخزن
app.get("/almakhzan", (req, res) => {
  res.sendFile(path.join(__dirname, "Frontend", "almakhzan.html"));
});

// أي رابط غير موجود -> يرجع index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "Frontend", "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});