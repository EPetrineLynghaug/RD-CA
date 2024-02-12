import { getCart } from "./add-to-cart.js";
import { baseUrl, token, divCartList, divCartQuantity } from "./constants.js";

let cart = getCart();
let productSummary = [];

function getProducts() {
    try{
        cart.map(async (prod) => {
            const response = await fetch(`${baseUrl}/${prod.id}`, {
                headers: {
                    'Authorization': `Bearer${token}`
                } 
            });

            if (response.ok) {
                const product = await response.json();
                productSummary.push(product);
                addProductToList(product, prod.quantity);
            } else {
                console.log('Kunne ikke hente produkt: ' + product.id);
            }
        });
    } catch (error) {
        console.log(error);
        console.log('Kunne ikke hente produktene');
    }
}

getProducts();

function addProductToList(product, quantity) {
    let card = document.createElement('div');
    card.classList.add('cart-card');

    card.innerHTML =  `<div class="cart-card-img">
        <img src="${product.image}" alt="${product.title}" />
        </div>
        <div class="cart-card-container">
        <h2><b>${product.title} <sup>(${quantity})</sup></b></h2>
        <span class="price">kr ${product.price},-</span>
        <p>Farge: olivengrønn</p>
        <p>Størrelse: S (FIX ME!)</p>
        </div>`;

    divCartList.append(card);
}

function totalQuantity() {
    let quantity = 0;

    cart.map(product => {
        quantity += product.quantity;
    });
    divCartQuantity.innerText = `(${quantity})`;  
};

totalQuantity();