
const orderWrapper = document.querySelector(".endproduct");
const orderForm = document.querySelector (".orderFormular");
const orderContainer = document.querySelector (".orderContainer");
let total = document.querySelector(".total");

let oneOrder = (item) => `
  <div class="oneproduct">
    <img src="${item.image}" alt=""/>
    <div class="orderCardContainer">
      <h2>${item.name}</h2>
      <p> Số lượng ${item.antal}</p>
      <p>${item.price} VNĐ</p>
    </div>
  </div>
  <div class="line"></div>
`;

const localCart = localStorage.getItem("cart");

if(localCart){
 let cartProduct= JSON.parse(localCart)
 orderContainer.innerHTML = cartProduct.map(oneOrder).join("")

 function getUniqueProds(prodList){
  const returnArray = []
  let totalPrice = 0
  prodList.forEach(product =>{
    const alreadyExists = returnArray.find(retProd =>{
      return retProd.id === product.id;
    });
    if (!alreadyExists){
      returnArray.push({
        ...product,
        antal:1
      });
    }else{
      alreadyExists.antal += 1;
      alreadyExists.price = parseInt(product.price) * alreadyExists.antal;
    }
    totalPrice = totalPrice + parseInt(product.price)
   
  });
  total.innerHTML= totalPrice + " VNĐ";
  return returnArray;
   };
   const uniqueArray = getUniqueProds(cartProduct)
   sort(uniqueArray)
   orderContainer.innerHTML= uniqueArray.map(oneOrder).join("")
}

const currentOrderForm = document.querySelector("#orderForm");

const orderName = document.querySelector("#orderName");
const orderAdress = document.querySelector("#orderAdress");
const orderZipcode = document.querySelector("#orderZipcode");
const orderCity = document.querySelector("#orderCity");
const orderEmail = document.querySelector("#orderEmail");
const orderPhone = document.querySelector("#orderPhone");
const orderComments = document.querySelector("#orderComments");

let currentUserObj = localStorage.getItem("loggedInUser");

if(currentUserObj) {
  let users = JSON.parse(localStorage.users);
  currentUserObj = JSON.parse(currentUserObj);
  
  const currentUser = users.find((item) => {
    return currentUserObj.email === item.email
  });
  orderName.value = currentUser.name;
  orderAdress.value = currentUser.adress;
  orderZipcode.value = currentUser.zipcode;
  orderCity.value = currentUser.city;
  orderEmail.value = currentUser.email;
  orderPhone.value = currentUser.phone;
}

const orderArr = () => {
  localStorage.removeItem("orders")
  localStorage.setItem("orders", JSON.stringify({
    "Namn": orderName.value, 
    "Adress": orderAdress.value,
    "Postnummer": orderZipcode.value,
    "Stad": orderCity.value,
    "Epost": orderEmail.value,
    "Telefon": orderPhone.value,
    "Kommentar": orderComments.value
    })
  );
};

const viewkvitto = document.querySelector("#kvitto");
function getOrderNum(max) {
  return Math.floor(Math.random() * max);
}

let kvitto = () => `
<div class="kvittocontainer">
  <div class="kvittohead">
    <h2 class="kvitto-headings">KVITTO</h2>
    <h3 class="kvitto-headings">Tack för din beställning</h3>
    <p>Ditt ordernummer är : ${getOrderNum(99999999)}</p>
  </div>
  <ul id="kvittoProduktLista"></ul>
  <div id="kvittototal" class="total"></div>
  <div id="kvittopersinfo" class="kvittopersinfo">
    <h3 class="kvitto-headings">Leveransinformation</h3>
  </div>
  <button class="buyBtn" id="end">Avsluta</button>
</div>
`;

function getUniqueProds(prodList){
  const returnArray = []
  let totalPrice = 0
  prodList.forEach(product =>{
    const alreadyExists = returnArray.find(retProd =>{
      return retProd.id === product.id;
    });
    if (!alreadyExists){
      returnArray.push({
        ...product,
        antal:1
      });
    }else{
      alreadyExists.antal += 1;
      alreadyExists.price = parseInt(product.price) * alreadyExists.antal;
    }
    totalPrice = totalPrice + product.price
   
  });
  total.innerHTML= totalPrice + " VNĐ";
  return returnArray;
};

let kvittoFunc = () => {
  let persinfo = localStorage.getItem("orders");
  let cartProduct = JSON.parse(localCart)
  viewkvitto.style.display = "hidden";
  viewkvitto.innerHTML = kvitto();
  const kvittoProduktLista = document.querySelector('#kvittoProduktLista');
  const kvittopersinfo = document.querySelector("#kvittopersinfo")
  const kvittototal = document.querySelector("#kvittototal");

  let totalPrice = 0

  cartProduct = getUniqueProds(cartProduct)

  cartProduct.forEach((vald)=>{
    const liProd = document.createElement("li");
    const liDiv = document.createElement("div");
    liDiv.classList.add("line")
    liProd.innerText = vald.name + " " + vald.antal + "sp " + vald.price + " VNĐ";
    liProd.appendChild(liDiv)
    kvittoProduktLista.appendChild(liProd)
  
    totalPrice = totalPrice + vald.price
  })

  kvittototal.innerHTML = "Tổng tiền : " + totalPrice + " VNĐ";

  let persInfo = JSON.parse(persinfo);

  for (let property in persInfo) {
    const godbaytext = document.createElement("p");
    godbaytext.innerHTML = `${property}: ${persInfo[property]}`
    kvittopersinfo.appendChild(godbaytext);
    godbaytext.style.textAlign = "center";
  }

  const totaldelete = document.querySelector("#end")

  totaldelete.addEventListener("click", function(){
   localStorage.removeItem("cart");
   localStorage.removeItem("orders");
   window.location.href = "index.html";
  })
}

currentOrderForm.addEventListener("submit", (e) => {
  localStorage.removeItem("orders");
  e.preventDefault();
  orderArr();
  kvittoFunc();
});