import { mainContainer, loading } from "./constants.js";
import { addToCart } from "./add-to-cart.js";
import { getSingleProduct } from "./api.js";
import {url} from "./constants.js";

//let params = new URLSearchParams(document.location.search);
let params = new URL(document.location).searchParams;
let id = params.get("id"); 

async function init() {
    let product = await getSingleProduct(id);

    setTimeout(() => {
        loading.classList.add('hidden');
        mainContainer.innerHTML = displayProduct(product);
        addToCartEventlistener();
    }, 1250);
}

init();

function displayProduct(product) {
    return `<section class="product">
        <div class="product-image">
            <a href="./ulriken.html">
            <img
                src="${product.image}"
                alt="Green 100% wool jacket, sturdy zipper, good pockets on each side. Unisex model. Also available in black and red"
            />
            </a>
        </div>
        <div class="product-content">
            <div>
                <h1>${product.title}</h1>
                <div class ="price">
                    $${product.price}
                </div>
                <p class="product-actions">
                   ${product.description} 
                </p>
            </div>
            <div class="product-actions">
                <div class="product-quantity">
                    <label for="sizes">Størrelse</label>
                    <select name="size" id="sizes">
                        ${product.sizes.map(size => listSizes(size))}
                    </select>
                </div>
                ${addToCartButton()}
            </div>
        </div>
    </section>`;
}

function listSizes (size){
    return `<option value="${size}">${size}</option>`;
}

function addToCartButton() {
    let button = `<a class="add-to-cart product-button product-primary">
        <i class="fa-solid fa-cart-plus"></i> Kjøp
    </a>`;

    return button;
}

function addToCartEventlistener() {
    let button = document.querySelector(".add-to-cart");

    button.addEventListener("click", (event) => {
        event.preventDefault();

        let selectedSize = document.querySelector('#sizes').value;
        
        addToCart(id, selectedSize);
        window.location = `${url}/handlevogn.html`;
    });
}


function displayError(message) {
    console.log(message);
}