const hamburgerBtn = document.querySelector(".hamburger-container");
const navBar = document.querySelector(".nav");
const cartBtn = document.querySelector(".cart");
let active = false;

cartBtn.addEventListener("click", () => {
  window.location.href = "./varukorg.html";
});
hamburgerBtn.addEventListener("click", () => {
  if (!active) {
    active = true;
    navBar.classList.add("active");
    hamburgerBtn.classList.add("activeBtn");
  } else {
    active = false;
    navBar.classList.remove("active");
    hamburgerBtn.classList.remove("activeBtn");
  }
});

//sortera funktion, kan användas till lite allt möjligt med name.
//används bl.a i varukorgen för att sortera produkter.
function sort(event) {
  event.sort((a, b) => {
    const nameA = a.name;
    const nameB = b.name;
    if (nameA > nameB) {
      return 1;
    } else if (nameA < nameB) {
      return -1;
    } else {
      return 0;
    }
  });
}

//uppdaterar shopping cart count baserat på hur många produkter som finns i local storage (shopping cart).
const updateCartCount = () => {
  let shoppingCart = JSON.parse(localStorage.getItem("cart") || "[]");

  const countDisplay = document.querySelector("#quantity");
  countDisplay.innerHTML = shoppingCart.length;
};

updateCartCount();

//funktion som lägger till produkt i kundvagn.
const addProductToCart = (productId) => {
  console.log(productId);
  fetchProductData().then((data) => {
    //hämtar all data från storage, letar upp produkter med samma ID (välj den första/enda med samma ID).
    const productToBuy = data.products.filter(
      (product) => product.id == productId
    )[0];

    let shoppingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    //lägger till vald produkt i shoppingCart-arrayen.
    shoppingCart.push(productToBuy);

    localStorage.setItem("cart", JSON.stringify(shoppingCart));
    console.log(shoppingCart);

    updateCartCount();
  });
};

const loginMenuLink = document.querySelector("#loginMenuLink");
const loginATag = document.querySelector("#loginMenuLink > a");
const loginMenuList = document.querySelector("#loginMenuList");

let loggedInUserObj = localStorage.getItem("loggedInUser");

if (loggedInUserObj) {
  let users = JSON.parse(localStorage.users);
  loggedInUserObj = JSON.parse(loggedInUserObj);
  loginMenuLink.classList.add("hidden-login");
  loginATag.classList.add("hidden-login");

  const currentUser = users.find((item) => {
    return loggedInUserObj.email === item.email;
  });

  let li = document.createElement("li");
  li.innerText = "Inloggad som:\n" + currentUser.name;
  loginMenuList.appendChild(li);

  li.style.color = "#ECF2F3";
  li.style.textAlign = "center";
}
