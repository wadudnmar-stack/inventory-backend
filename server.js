const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// بيانات المنتجات (مثال بسيط)
const products = [
  { id: 1, name: 'T-shirt', price: 15000 },
  { id: 2, name: 'Pants', price: 25000 },
  { id: 3, name: 'Shoes', price: 40000 }
];

// ✅ Route رئيسي للتأكد إن السيرفر شغال
app.get('/', (req, res) => {
  res.send('✅ Server is running on Railway!');
});

// ✅ Route يرجع المنتجات بصيغة JSON
app.get('/products', (req, res) => {
  res.json(products);
});

// ✅ Route يعرض المنتجات على شكل صفحة HTML
app.get('/products-page', (req, res) => {
  let html = `
    <h1>📦 قائمة المنتجات</h1>
    <table border="1" cellpadding="10" cellspacing="0">
      <tr><th>ID</th><th>Name</th><th>Price</th></tr>
      ${products.map(p => `
        <tr>
          <td>${p.id}</td>
          <td>${p.name}</td>
          <td>${p.price}</td>
        </tr>
      `).join('')}
    </table>
  `;
  res.send(html);
});

// ✅ تشغيل السيرفر
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});