function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if(user && pass){ 
    document.getElementById("login").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
  } else {
    alert("ادخل البيانات بشكل صحيح!");
  }
}

function loadProducts() {
  fetch("https://inventory-backend-production-f924.up.railway.app/products")
    .then(res => res.json())
    .then(data => {
      let content = "<h3>قائمة المنتجات</h3><table border='1' width='100%'><tr><th>ID</th><th>Name</th><th>Price</th></tr>";
      data.forEach(p => {
        content += <tr><td>${p.id}</td><td>${p.name}</td><td>${p.price}</td></tr>;
      });
      content += "</table>";
      document.getElementById("content").innerHTML = content;
    });
}