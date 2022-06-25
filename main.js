let cart=[] 
   
   
document.addEventListener('DOMContentLoaded',
fetchProducts(),
)
  
  
  
  //product properties for post method

  let productName=document.querySelector('form #productName');
 let productPrice= document.querySelector('form #price')
  let productimage=  document.querySelector('form #image')
  let productCategory=document.querySelector('form #categery')
  let productDescription=document.querySelector('form #message')
  let form=document.querySelector('form')
  
  form.addEventListener('submit',handleSubmit)

  function clear() {
    productName.value=""
    productPrice.value=""
    productimage.value=""
    productCategory.value=""
    productDescription.value=""
  }



function handleSubmit(e) {
  e.preventDefault();
  let productObject={
    title:e.target.productName.value,
    price: e.target.price.value,
    description: e.target.message.value,
    image: e.target.image.value,
    category: e.target.categery.value,
    }

    updatestore(productObject)
    renderToDom(productObject)
   
//console.log(e.target.price)
  clear()
}


function renderToDom(object) {
  document.querySelector('#cards').innerHTML+=`<div class="card">
   <h1 class="title">${object.title}</h1>
   <img src=${object.image}  class="images" alt="" >    
   <p>${object.description}</p>
   <p id="catergory">${object.category}</p>
   <p id="price">$ ${object.price} </p>
   <div id="card-buttons">
   <button class="button-cards addCart" onclick="addToCart(${object.id})" >Buy me</button>
   </div>
   </div>`
   
}
  
function renderCartDom(item) {
     document.querySelector('#cardCart').innerHTML+=`
     <div class="card">
     <h1 class="title">${item.title}</h1>
     <img src=${item.image}  class="images" alt="" >    
     <p>${item.description}</p>
     <p id="catergory">${item.category}</p>
     <p id="price">$ ${item.price} </p>
     <div id="card-buttons">
     <button class="button-complete"  id="remove" onclick="removeItemFromCart(${item.id})">Remove from cart</button>
     <div class="btn-plus button-bardge" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>
     <button class="button-bardge">${item.numberOfUnits}</button>
     <div class="btn-minus button-bardge" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
     </div>
     </div>
     `
    
  

}
  



let cards=document.querySelector('#cards');
let price=document.querySelector('.card #price');
let catergory=document.querySelector('.card #catergory');
let title=document.querySelector('.card h1');
let cardImg=document.querySelector('.card img');
let description=document.querySelector('.card p');
let cartValue=document.querySelector('#cart-btn i')
let addCartbtn=document.querySelector('#addCart');
let subTotal=document.querySelector('.total p')

function fetchProducts() {   
fetch('https://fakestoreapi.com/products')
.then(res=>res.json())
.then(complete=>{
complete.forEach(cards => {
   let list;
   list=`<div class="card">
   <h1 class="title">${cards.title}</h1>
   <img src=${cards.image}  class="images" alt="" >    
   <p>${cards.description}</p>
   <p id="catergory">${cards.category}</p>
   <p id="price">$ ${cards.price} </p>
   <div id="card-buttons">
   <button class="button-cards addCart" onclick="addToCart(${cards.id})" >Buy me</button>
   </div>
   </div>`
   document.querySelector('#cards').innerHTML+=list

});  
})}





function addToCart(id) {
fetch('https://fakestoreapi.com/products')
.then(res=>res.json())
.then(complete=>{
if (cart.some((item) => item.id === id)) {
   changeNumberOfUnits("plus", id);
    }
    else{
 const item = complete.find((card) => card.id === id);
 
 cart.push({
   ...item,
   numberOfUnits: 1,
 });
 
  }
  
})
updateCart(); 

 }

 function updateCart() {
   renderCartItems();
   renderSubtotal();
  updatestore();
 }
 

 function renderCartItems() {
   document.querySelector('#cardCart').innerHTML=" "
   cart.forEach((item) => {
      document.querySelector('#cardCart').innerHTML+=`
      <div class="card">
      <h1 class="title">${item.title}</h1>
      <img src=${item.image}  class="images" alt="" >    
      <p>${item.description}</p>
      <p id="catergory">${item.category}</p>
      <p id="price">$ ${item.price} </p>
      <div id="card-buttons">
      <button class="button-complete"  id="remove" onclick="removeItemFromCart(${item.id})">Remove from cart</button>
      <div class="btn-plus button-bardge" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>
      <button class="button-bardge">${item.numberOfUnits}</button>
      <div class="btn-minus button-bardge" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
      </div>
      </div>
      `
     
   })

 }


 function changeNumberOfUnits(action, id) {
   cart = cart.map((item) => {
     let numberOfUnits = item.numberOfUnits;
 
     if (item.id === id) {
       if (action === "minus" && numberOfUnits > 1) {
         numberOfUnits--;
       } else if (action === "plus" && numberOfUnits < item.price) {
         numberOfUnits++;
       }
     }
 
     return {
       ...item,
       numberOfUnits,
     };
   });
 
   updateCart();
 }


 function removeItemFromCart(id) {
   cart = cart.filter((item) => item.id !== id);
 
   updateCart();
 }




 function renderSubtotal() {
   let totalPrice = 0,
     totalItems = 0;
 
   cart.forEach((item) => {
     totalPrice += item.price * item.numberOfUnits;
     totalItems += item.numberOfUnits;
   });
 
   subTotal.innerHTML = `$ ${totalPrice}`
   cartValue.innerHTML = totalItems;
 }



function updatestore(product){
  
   fetch(`https://fakestoreapi.com/products`,{
   method:"POST",
   body:JSON.stringify(
      {
      product
     }
     
   )
   
})
   .then(res=>res.json())
   .then(json=>{product.id=json
   }
    
     )
}

console.log(document.querySelector('form #categery'))
