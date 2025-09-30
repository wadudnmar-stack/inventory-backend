// script.js
async function loadProducts() {
  const response = await fetch("http://localhost:3000");
  const products = await response.json();

  const list = document.getElementById("product-list");
  list.innerHTML = "";

  products.forEach(p => {
    const item = document.createElement("li");
    item.textContent = ${p.name} - ${p.price} IQD - ${p.color} - ${p.size};
    list.appendChild(item);
  });
}

loadProducts();