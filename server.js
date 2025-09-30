const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// اختبار السيرفر شغال
app.get("/", (req, res) => {
  res.send("✅ Server is running on Render!");
});

// إضافة مسار للـ products
app.get("/products", (req, res) => {
  res.json([
    { id: 1, name: "Product A" },
    { id: 2, name: "Product B" }
  ]);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});