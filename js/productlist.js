const productList = document.querySelector(".productlist");
const searchBtn = document.querySelector("#searchBtn");
searchBtn.classList.add("basbtnStyle")

//hämtar data från JSON.
const fetchProductData = async () => {
  const response = await fetch("./js/products.json");
  return await response.json();
};

//skapar variabel för querystring där jag hämtar category.
const queryStringCategory = new URLSearchParams(location.search);

//toLowerCase för att komma runt eventuella stavfel.
let qsCategory = queryStringCategory.get("category").toLowerCase();
console.log(qsCategory);

//kör funktionen som renderar ut produkter vid klick på sök-knappen.
searchBtn.addEventListener("click", function () {
  renderedFilteredProducts();
});

//funktion som ritar ut alla produkter på sidan när den laddas.
const renderedFilteredProducts = () => {
  fetchProductData().then((data) => {
    const searchText = document.querySelector("#search-text").value;

    //hämtar alla json-produkter.
    const products = data.products.filter(
      (product) =>
        //filtrerar ut produkter efter kategori.
        product.category.toLowerCase() == qsCategory &&
        //filtrerar ut produkter i samma kategori baserat på namn eller beskrivning.
        (product.name.toLowerCase().includes(searchText) ||
          product.description.toLowerCase().includes(searchText))
    );

    //skriver över productList div:ens innehåll med tom sträng så att alla tidigare renderade produkter tas bort innan nya ritas ut.
    productList.innerHTML = "";

    //för varje produkt skapas ett produktkort.
    products.forEach(function (product) {

      //skapar html-element för produkten.
      const productCardList = document.createElement("div");
      productCardList.classList.add("productCard");

      const productHeading = document.createElement("h3");
      productHeading.innerText = product.name;

      const imageWrapper = document.createElement("a");
      imageWrapper.href = `produktsida.html?name=${product.name}`;

      const productImage = document.createElement("img");
      productImage.src = product.image;

      const productPrice = document.createElement("p");
      productPrice.innerText = product.price + " VNĐ";

      //skapar köpknapp.
      const buyBtn = document.createElement("button");
      buyBtn.classList.add("buyBtn");

      //funktion för att lägga till produkten i varukorgen via köpknappen.
      buyBtn.addEventListener("click", function () {
        addProductToCart(product.id);
      });

      buyBtn.innerText = "Thêm vào giỏ";

      //lägger till element till productCardList.
      productCardList.appendChild(productHeading);
      //lägger till img till a-tagg.
      imageWrapper.appendChild(productImage);
      //lägger till a-tagg med img till productCardList.
      productCardList.appendChild(imageWrapper);

      productCardList.appendChild(productPrice);

      productCardList.appendChild(buyBtn);

      //lägger till productCardList-div:en till productList-section.
      productList.appendChild(productCardList);
    });
  });
};

//kör funktionen som ritar ut alla produkter när sidan laddas.
renderedFilteredProducts();
