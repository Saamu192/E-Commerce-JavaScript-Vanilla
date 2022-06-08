import { dataBase } from "./dataBase.js";
//Cart Items

let shopperItems = [];

//Rendering the cards
function createCards(cards = dataBase) {
  //Selecting container
  const shopContainer = document.querySelector("#shop__container");
  shopContainer.innerHTML = "";

  cards.forEach((element) => {
    const section = document.createElement("section");
    section.classList.add("card__container");

    section.appendChild(cardImg(element.imgSrc, element.figCaption));
    section.appendChild(cardTag(element.tag, element.id));
    section.appendChild(cardTitle(element.itemTitle));
    section.appendChild(cardDescription(element.resumn));
    section.appendChild(cardPrice(element.price));
    section.appendChild(cardAddToCart(element.id));

    shopContainer.appendChild(section);
  });

  return shopContainer;
}

createCards();

function cardImg(imgSrc, imgCaption) {
  const figure = document.createElement("figure");
  figure.classList.add("figure__img");

  const img = document.createElement("img");
  img.classList.add("figure__thumb");
  img.src = imgSrc;
  img.alt = imgCaption;

  figure.appendChild(img);

  return figure;
}

function cardTag(tag, id) {
  const button = document.createElement("button");
  button.classList.add("btn__category");
  button.id = id;
  button.innerText = tag;
  button.addEventListener("click", (event) => {
    event.preventDefault;
    tagCategoryFilter(event.target.innerText);
  });

  return button;
}

function cardTitle(itemTitle) {
  const title = document.createElement("h3");
  title.classList.add("title__item");
  title.innerText = itemTitle;

  return title;
}

function cardDescription(itemDescription) {
  const description = document.createElement("p");
  description.classList.add("resumn__item");
  description.innerText = itemDescription;

  return description;
}

function cardPrice(itemPrice) {
  const price = document.createElement("small");
  price.classList.add("price__item");
  price.innerText = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(itemPrice);
  return price;
}

function cardAddToCart(id) {
  const button = document.createElement("button");
  button.classList.add("btn__addCart");
  button.id = id;
  button.innerText = "Add to Shopping Cart";
  button.addEventListener("click", (event) => {
    cartEventPush(event.currentTarget.id);
  });

  return button;
}

//Selecting addToCartBtn

function cartEventPush(event) {
  let find = dataBase.find((element) => {
    if (element.id === event) {
      return element;
    }
  });
  shopperItems.push(find);
  return createCart();
}

function createCart(cards = shopperItems) {
  if (cards.length > 0) {
    const container = document.querySelector("#shop__cart");
    container.classList.replace("cart__flow", "cart__flow--active");
    container.innerHTML = "";

    cards.forEach((element) => {
      const section = document.createElement("section");
      section.classList.add("cart__item");
      section.appendChild(cartItemImg(element.imgSrc));
      section.appendChild(cartItemTitle(element.itemTitle));
      section.appendChild(cartItemPrice(element.price));
      section.appendChild(cartItemRemovBtn(element.id));

      container.appendChild(section);
    });

    //selecting aside
    const aside = document.querySelector("#shop__aside");
    const cartTotal = document.querySelector(".cart__total");
    if (cartTotal !== null) {
      aside.removeChild(cartTotal);
    }
    aside.appendChild(cartAmountData(cards));

    return container;
  } else {
    const container = document.querySelector("#shop__cart");
    container.innerHTML = "";
    container.classList.replace("cart__flow--active", "cart__flow");

    let h3 = document.createElement("h3");
    h3.innerText = "Cart Empty";
    container.appendChild(h3);

    let small = document.createElement("small");
    small.classList.add("cart__msgbuy");
    small.innerText = "Add items to cart!";
    container.appendChild(small);

    const aside = document.querySelector("#shop__aside");
    const cartTotal = document.querySelector(".cart__total");
    if (cartTotal !== null) {
      aside.removeChild(cartTotal);
    }

    return container;
  }
}

function cartItemImg(imgSrc) {
  const img = document.createElement("img");
  img.src = imgSrc;
  img.classList.add("cart__img");

  return img;
}

function cartItemTitle(itemTitle) {
  const title = document.createElement("h3");
  title.classList.add("cart__title");
  title.innerText = itemTitle;

  return title;
}

function cartItemPrice(itemPrice) {
  const price = document.createElement("small");
  price.classList.add("cart__price");
  price.innerText = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(itemPrice);

  return price;
}

function cartItemRemovBtn(id) {
  const btn = document.createElement("btn");
  btn.classList.add("cart__remove");
  btn.innerText = "Remove Item";
  btn.id = id;
  btn.addEventListener("click", (event) => {
    removeCartItem(event.currentTarget.id);
  });
  return btn;
}

function removeCartItem(event) {
  let find = shopperItems.findIndex((element) => {
    if (element.id === event) {
      return element;
    }
  });

  shopperItems.splice(find, 1);
  createCart(shopperItems);
}

function cartAmountData(cartAmount) {
  let items = cartAmount.length;
  let amount = 0;
  cartAmount.forEach((element) => {
    amount += element.price;
  });

  return cartAmountTemplate(items, amount);
}

function cartAmountTemplate(itemAmount, itemPrice) {
  const container = document.createElement("section");
  container.classList.add("cart__total");

  const smallItems = document.createElement("small");
  smallItems.innerText = `Items: ${itemAmount}`;

  const smallPrice = document.createElement("small");
  smallPrice.innerText = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(itemPrice);

  container.appendChild(smallItems);
  container.appendChild(smallPrice);

  return container;
}

//funções de pesquisa

function navCategoryEvent() {
  const navSelector = document.querySelectorAll(".page__now");
  const navItems = [...navSelector];
  navItems.forEach((element) => {
    element.addEventListener("click", (event) => {
      event.preventDefault();
      navCategoryFilter(event.target);
    });
  });
}
navCategoryEvent();

function navCategoryFilter(event) {
  const nextNav = event;
  const navText = event.innerText;
  let newData = [];
  const previusNav = document.querySelector(".load");
  previusNav.classList.remove("load");
  nextNav.classList.add("load");
  if (navText !== "All") {
    newData = dataBase.filter((element) => {
      if (element.tag === navText) {
        return element;
      }
    });
    return createCards(newData);
  } else {
    return createCards();
  }
}

function tagCategoryFilter(event) {
  const navSelector = document.querySelectorAll(".page__now");
  const navItems = [...navSelector];
  navItems.forEach((element) => {
    if (element.innerText === event) {
      element.classList.add("load");
    } else if (element.classList.contains("load")) {
      element.classList.remove("load");
    }
  });
  let newData = [];
  newData = dataBase.filter((element) => {
    if (element.tag === event) {
      return element;
    }
  });
  return createCards(newData);
}
