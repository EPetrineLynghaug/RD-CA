import { getCart, removeProd, addProd } from "./add-to-cart.js";
import { baseUrl, token, divCartList, divCartQuantity, trCartSummary } from "./constants.js";
import { getSingleProduct } from "./api.js";

let cart = getCart();
let productSummary = [];

function getProducts() {
    cart.map(async (item) => { // item = { id, size, quantity }
        let product = await getSingleProduct(item.id);

        product.quantity = item.quantity;
        product.selectedSize = item.size;
        productSummary.push(product);

        addProductToList(product);
        calculateTotalSum();
        quantityButtonListener();
    });
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
            <p>Størrelse: ${product.selectedSize}</p>
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

            calculateTotalSum();
            totalQuantity();
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

function calculateTotalSum() {
    totalSummary = {
        discount: 0,
        delivery: 100,
        subtotal: 0,
        total: 0,
    };

    cart.map((item) => {
        let product = productSummary.find((prod) => prod.id === item.id);

        if (product.onSale) {
            let moneySaved = (product.price - product.discountedPrice) * item.quantity;
            totalSummary.discount += moneySaved;

            let subTotal = (product.discountedPrice * 0.75) * item.quantity;
            totalSummary.subtotal += subTotal;

            let total = product.discountedPrice * item.quantity;
            totalSummary.total += total;
        } else {
            let subTotal = (product.price * 0.75) * item.quantity; 
            totalSummary.subtotal += subTotal;

            let total = product.price * item.quantity;
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