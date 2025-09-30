const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// ربط Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// الصفحة الرئيسية
app.get("/", (req, res) => {
  res.send("✅ السيرفر شغال! جرّب /products للبيانات");
});

// API: جلب المنتجات
app.get("/products", async (req, res) => {
  try {
    const { data, error } = await supabase.from("products").select("*");
    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error("خطأ في جلب المنتجات:", err);
    res.status(500).json({ error: "فشل في جلب المنتجات" });
  }
});

// تشغيل السيرفر
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});