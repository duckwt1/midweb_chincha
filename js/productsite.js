const productWrapper = document.querySelector(".productside");
let productComponent = (item) => `

  <h3 class="productheading" id="productname">${item.name}</h3>
  <div class="productImg"><img src="${item.image}" alt="" /></div>
  <p class="producttext" id="productpara">${item.description}</p>
  <div class="productinfo">
  <p class="price"> ${item.price} VNĐ</p>
  <div class="productCard">
    <button class="buyBtn uppBtn" data-id="${item.id}">Thêm vào giỏ hàng</button>
  </div>
</div>
`;
//hämtar data från JSON
const fetchProductData = async () => {
  const response = await fetch("./js/products.json");
  const data = await response.json();
  return data;
};
//skapar variabel för qs där jag hämtar name.
const queryString = new URLSearchParams(location.search);
let qsName = queryString.get("name");
//alla JSON produkter
fetchProductData().then((data) => {
  const products = data.products;

  //funktion hämtar variablen products, för varje prod - kolla om name är samma som qsName. Om så skriv ut i productWrapper.
  function selectedProd(item) {
    console.log(item, qsName);
    item.forEach((prod) => {
      if (prod.name.toLowerCase() == qsName.toLowerCase()) {
        console.log("hej");
        productWrapper.innerHTML = productComponent(prod);
        const buyBtn = document.querySelector(".buyBtn");
        console.log(buyBtn);
        buyBtn.addEventListener("click", function () {addProductToCart (prod.id)});
      }
    });
  
  }
  selectedProd(products);

});


