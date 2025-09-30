const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve frontend
app.use(express.static(path.join(__dirname, "Frontend")));

// منتجات تجريبية
let products = [
  { id: 1, name: "T-shirt", price: 15000 },
  { id: 2, name: "Pants", price: 25000 },
  { id: 3, name: "Shoes", price: 40000 }
];

// API: جلب المنتجات
app.get("/products", (req, res) => {
  res.json(products);
});

// API: تسجيل الدخول
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "1234") {
    res.json({ success: true, redirect: "/almakhzan" });
  } else {
    res.json({ success: false, message: "❌ اسم المستخدم أو كلمة المرور غير صحيحة" });
  }
});

// صفحة المخزن
app.get("/almakhzan", (req, res) => {
  res.sendFile(path.join(__dirname, "Frontend", "almakhzan.html"));
});

// API: حفظ مادة جديدة
app.post("/save-item", (req, res) => {
  const { name, color, totalQty, sizes } = req.body;

  if (!name || !color || !totalQty || !sizes) {
    return res.status(400).json({ success: false, message: "⚠ البيانات ناقصة" });
  }

  const newItem = {
    id: products.length + 1,
    name,
    color,
    totalQty,
    sizes
  };

  products.push(newItem);
  res.json({ success: true, message: "✅ تم الحفظ", item: newItem });
});

// أي رابط غير موجود → يرجع login.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "Frontend", "login.html"));
});

// تشغيل السيرفر
app.listen(PORT, () => {
 console.log(`🚀 Server is running on port ${PORT}`);
});