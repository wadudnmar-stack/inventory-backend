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

  if (username === "admin" && password === "1234") {
    res.json({ success: true, message: "تم تسجيل الدخول بنجاح" });
  } else {
    res.json({ success: false, message: "اسم المستخدم أو كلمة المرور غير صحيحة" });
  }
});

// Route: صفحة المخزن
app.get("/almakhzan", (req, res) => {
  res.sendFile(path.join(__dirname, "Frontend", "almakhzan.html"));
});

// Route: حفظ الايتم
app.post("/save-item", (req, res) => {
  const { name, color, totalQty, sizes } = req.body;

  // ✅ هنا كان الخطأ — تم تصحيحه
  if (!name  !color  !totalQty || !sizes) {
    return res.status(400).json({ success: false, message: "الحقول مطلوبة" });
  }

  console.log("📦 تم استلام الايتم:", { name, color, totalQty, sizes });

  res.json({ success: true, message: "تم حفظ الايتم بنجاح" });
});

// أي رابط غير موجود -> يرجع login.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "Frontend", "login.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});