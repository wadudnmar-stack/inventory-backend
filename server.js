const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// بيانات تجريبية
const products = [
  { id: 1, name: "T-shirt", price: 15000 },
  { id: 2, name: "Pants", price: 25000 },
  { id: 3, name: "Shoes", price: 40000 }
];

// API للمنتجات
app.get("/products", (req, res) => {
  res.json(products);
});

// خدم ملفات الواجهة الأمامية (Frontend)
app.use(express.static(path.join(__dirname, "Frontend")));

// أي مسار غير معروف يرجع index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "Frontend", "index.html"));
});

// تشغيل السيرفر
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});