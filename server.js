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

// بيانات مؤقتة
let products = [
  { id: 1, name: "T-shirt", price: 15000 },
  { id: 2, name: "Pants", price: 25000 },
  { id: 3, name: "Shoes", price: 40000 }
];

// ✅ API: جلب المنتجات
app.get("/products", (req, res) => {
  res.json(products);
});

// ✅ API: تسجيل الدخول
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "1234") {
    res.json({ success: true, message: "تم تسجيل الدخول بنجاح" });
  } else {
    res.json({ success: false, message: "اسم المستخدم أو كلمة المرور غير صحيحة" });
  }
});

// ✅ API: إضافة منتج
app.post("/add-item", (req, res) => {
  const { name, color, totalQty, sizes } = req.body;

  // شرط بسيط وواضح
  if (!name  !color  !totalQty || !sizes) {
    return res.status(400).json({ error: "الرجاء إدخال جميع الحقول" });
  }

  const newItem = {
    id: products.length + 1,
    name,
    color,
    totalQty,
    sizes
  };

  products.push(newItem);
  res.json({ success: true, message: "✅ تمت إضافة المادة", item: newItem });
});

// ✅ صفحة المخزن
app.get("/almakhzan", (req, res) => {
  res.sendFile(path.join(__dirname, "Frontend", "almakhzan.html"));
});

// ✅ أي رابط غير موجود → يرجع index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "Frontend", "index.html"));
});

// ✅ تشغيل السيرفر
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});