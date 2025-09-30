import express from "express";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app = express();
const PORT = 3000;

// ربط Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

// تحديد مجلد الواجهة (frontend)
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "frontend")));

// API للمنتجات
app.get("/api/products", async (req, res) => {
  console.log("Connecting to table: products");
  const { data, error } = await supabase.from("products").select("*");

  if (error) {
    console.error("Supabase error:", error);
    return res.status(500).send("❌ خطأ في الاتصال بقاعدة البيانات");
  }

  res.json(data);
});

// تشغيل السيرفر
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});