import { getCart, removeProd, addProd } from "./add-to-cart.js";
import { baseUrl, token, divCartList, divCartQuantity, trCartSummary } from "./constants.js";

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
                quantityButtonListener();
            } else {
                console.log('Kunne ikke hente produkt: ' + product.id);
            }
        });
    } catch (error) {
        console.log('Kunne ikke hente produktene');
        console.log(error);
    }
}

getProducts();

function addProductToList(product) {
    divCartList.innerHTML += `<div class="cart-card" id="card-${product.id}">
        <div class="cart-card-img">
            <img src="${product.image}" alt="${product.title}" />
        </div>
        <div class="cart-card-container">
            <h2><b>${product.title}</b></h2>
            <span class="price">$ ${product.price}</span>
            <p>Farge: olivengrønn</p>
            <div class="cart-actions">
                <button class="cart-quantity-action" data-id="${product.id}">-</button>
                <div id="quantity-${product.id}">${product.quantity}</div>
                <button class="cart-quantity-action" data-id="${product.id}">+</button>
            </div>
            <p>Størrelse: S (FIX ME!)</p>
        </div>
    </div>`;
}

function quantityButtonListener() {
    let buttons = document.querySelectorAll('.cart-quantity-action');

    buttons.forEach(btn => {
        btn.addEventListener('click', (event) => {
            event.preventDefault();

            let id = btn.getAttribute('data-id');

            if (btn.innerText === "-") {
                cart = removeProd(id, cart);
            } else {
                cart = addProd(id, cart);
            }
        });
    });
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

    trCartSummary.innerHTML = `
    <td>$ ${totalSummary.discount.toFixed(2)}</td>
    <td>$ ${totalSummary.subtotal.toFixed(2)}</td>
    <td>$ ${totalSummary.delivery.toFixed(2)}</td>
    <td>$ ${totalSummary.total.toFixed(2)}</td>
    `
}