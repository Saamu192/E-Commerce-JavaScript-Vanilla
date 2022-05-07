import { dataBase } from "./dataBase.js";
//Cart Items

let shopperItems = [];

//Rendering the cards
function createCards () {

    //Selecting container
    const shopContainer = document.querySelector('#shop__container');
    shopContainer.innerHTML = ''

    dataBase.forEach((element) => {
        
        const section = document.createElement('section');
            section.classList.add('card__container');
        
        section.appendChild(cardImg(element.imgSrc, element.figCaption));
        section.appendChild(cardTag(element.tag, element.id))
        section.appendChild(cardTitle(element.itemTitle))
        section.appendChild(cardDescription(element.resumn))
        section.appendChild(cardPrice(element.price))
        section.appendChild(cardAddToCart(element.id))

        shopContainer.appendChild(section)
    })

    return shopContainer
}

createCards()


function cardImg (imgSrc, imgCaption) {

    const figure = document.createElement('figure');
        figure.classList.add('figure__img');

    const img = document.createElement('img');
        img.classList.add('figure__thumb');
        img.src = imgSrc;
        img.alt = imgCaption;
    
    figure.appendChild(img);

    return figure;
}

function cardTag (tag, id) {
    
    const button = document.createElement('button');
        button.classList.add('btn__category');
        button.id = id;
        button.innerText = tag;

    return button
}

function cardTitle (itemTitle) {

    const title = document.createElement('h3');
        title.classList.add('title__item');
        title.innerText = itemTitle;
    
    return title
}

function cardDescription (itemDescription) {

    const description = document.createElement('P');
        description.classList.add('resumn__item');
        description.innerText = itemDescription;

    return description
}

function cardPrice (itemPrice) {

    const price = document.createElement('small')
        price.classList.add('price__item');
        price.innerText = `R$ ${itemPrice}`

    return price
}

function cardAddToCart (id) {

    const button = document.createElement('button');
        button.classList.add('btn__addCart');
        button.id = id
        button.innerText = 'Add to Shopping Cart'
        button.addEventListener('click', (event) => {
          cartEventPush(event.currentTarget.id)
        })
    
    return button
}


//Selection addToCartBtn

function cartEventPush (event) {
    
    let find = dataBase.find((element) => {
        if (element.id === event) {
            return element
        }
    })
    shopperItems.push(find)
    return createCart()
}

    
function createCart () {
    if (shopperItems.length > 0){
        
        const container = document.querySelector('#shop__cart');
        container.classList.replace('cart__flow', 'cart__flow--active')
        container.innerHTML = ''

        shopperItems.forEach((element) => {

            const section = document.createElement('section');
                section.classList.add('cart__item');
            section.appendChild(cartItemImg(element.imgSrc));
            section.appendChild(cartItemTitle(element.itemTitle));
            section.appendChild(cartItemPrice(element.price));
            section.appendChild(cartItemRemovBtn(element.id));

            container.appendChild(section)
        })
    return container

    } else {

        const container = document.querySelector('#shop__cart');
        container.classList.remove('active')
        container.innerHTML = ''

        return container
    }

}

function cartItemImg (imgSrc) {

    const img = document.createElement('img');
        img.src = imgSrc;
        img.classList.add('cart__img');

    return img
}

function cartItemTitle (itemTitle) {

    const title = document.createElement('h3');
        title.classList.add('cart__title');
        title.innerText = itemTitle;
    
    return title
}

function cartItemPrice (itemPrice) {

    const price = document.createElement('small');
        price.classList.add('cart__price');
        price.innerText = `R$ ${itemPrice}`
    
    return price
}

function cartItemRemovBtn (id) {

    const btn = document.createElement('btn')
        btn.classList.add('cart__remove');
        btn.innerText = 'Remove Item';
        btn.id = id;
        btn.addEventListener('click', (event) => {
            removeCartItem(event.currentTarget.id)
        })
    return btn
}

function removeCartItem (event) {

    let find = shopperItems.find((element) => {
        if (element.id === event) {
            return element
        }})
    
    if (shopperItems.length === 1){
            shopperItems = []
            createCart()
    } else {
        shopperItems = shopperItems.filter((items) => {
        items.id !== find.id
        })
        createCart()
    }
}
