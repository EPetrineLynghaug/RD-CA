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
                product.quantity = prod.quantity;
                productSummary.push(product);
                addProductToList(product);
                summary();
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

function addProductToList(product) {
    let card = document.createElement('div');
    card.classList.add('cart-card');

    card.innerHTML =  `<div class="cart-card-img">
        <img src="${product.image}" alt="${product.title}" />
        </div>
        <div class="cart-card-container">
        <h2><b>${product.title} <sup>(${product.quantity})</sup></b></h2>
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

let totalSummary = {
    discount: 0,
    delivery: 100,
    subtotal: 0,
    total: 0,
};

function summary() {
    productSummary.map((product) => {
        if (product.onSale) {
            let moneySaved = (product.price - product.discountedPrice) * product.quantity;
            totalSummary.discount += moneySaved;

            let subTotal = (product.discountedPrice * 0.75) * product.quantity;
            totalSummary.subtotal += subTotal;

            let total = product.discountedPrice * product.quantity;
            totalSummary.total += total;
        } else {
            let subTotal = (product.price * 0.75) * product.quantity; 
            totalSummary.subtotal += subTotal;

            let total = product.price * product.quantity;
            totalSummary.total += total;

            totalSummary.total += totalSummary.delivery;
        }
    });

    console.log(totalSummary.subtotal.toFixed(2));
}