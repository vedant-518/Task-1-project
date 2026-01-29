let isLogin=true;

function toggleForm(){
 isLogin=!isLogin;
 document.getElementById("title").innerText=isLogin?"Login":"Register";
 document.getElementById("name").style.display=isLogin?"none":"block";
}

function submitForm(){
 let name=nameEl().value;
 let email=emailEl().value;
 let pass=passEl().value;
 let users=JSON.parse(localStorage.getItem("users"))||[];

 if(isLogin){
  let u=users.find(x=>x.email==email && x.pass==pass);
  if(u){localStorage.setItem("user",email);location="product.html";}
  else msg("Invalid login");
 }else{
  users.push({name,email,pass});
  localStorage.setItem("users",JSON.stringify(users));
  msg("Registered successfully");
  toggleForm();
 }
}

function loadProducts(){
 let products=[
  {id:1,name:"Shoes",price:1200},
  {id:2,name:"Bag",price:900},
  {id:3,name:"Watch",price:1500}
 ];
 let html="";
 products.forEach(p=>{
  html+=`<div>
    <h3>${p.name}</h3>
    <p>₹${p.price}</p>
    <button onclick="addToCart(${p.id})">Add</button>
  </div>`;
 });
 document.getElementById("product-list").innerHTML=html;
 localStorage.setItem("products",JSON.stringify(products));
}

function addToCart(id){
 let cart=JSON.parse(localStorage.getItem("cart"))||[];
 cart.push(id);
 localStorage.setItem("cart",JSON.stringify(cart));
 alert("Added to cart");
}

function loadCart(){
 let cart=JSON.parse(localStorage.getItem("cart"))||[];
 let products=JSON.parse(localStorage.getItem("products"));
 let html="";
 cart.forEach(id=>{
  let p=products.find(x=>x.id==id);
  html+=`<p>${p.name} - ₹${p.price}</p>`;
 });
 document.getElementById("cart").innerHTML=html;
}

function confirmOrder(){
 localStorage.removeItem("cart");
 alert("Order placed successfully!");
}

function checkLogin(){
 if(!localStorage.getItem("user")) location="index.html";
}

function logout(){
 localStorage.clear();
 location="index.html";
}

function msg(t){document.getElementById("msg").innerText=t;}
function nameEl(){return document.getElementById("name")}
function emailEl(){return document.getElementById("email")}
function passEl(){return document.getElementById("pass")}