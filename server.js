const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// منتجات تجريبية
const products = [
  { id: 1, name: "T-shirt", price: 15000 },
  { id: 2, name: "Pants", price: 25000 },
  { id: 3, name: "Shoes", price: 40000 }
];

// راوت رئيسي
app.get('/', (req, res) => {
  res.send('✅ Server is running on Render!');
});

// راوت للمنتجات
app.get('/products', (req, res) => {
  res.json(products);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});