import { baseUrl, token, mainContainer } from "./constants.js";
import { addToCart } from "./add-to-cart.js";

//let params = new URLSearchParams(document.location.search);
let params = new URL(document.location).searchParams;
let id = params.get("id"); 

async function getProduct() {
    try {
        // Prøv å hente produkter

        // Fetch request (RAW data)
        const response = await fetch(`${baseUrl}/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            // Data parsed with .json()
            const product = await response.json();
            console.log(product);

            mainContainer.innerHTML = displayProduct(product);

            addToCartEventlistener();
        } else {
            displayError('Kunne ikke hente produkter');
        }

        // TODO: Lag produkt kort

    } catch (error) {
        // Error hvis request feilet

        displayError('Noe gikk galt...');

        // TODO: Håndter error/vis error til bruker

    }
}

getProduct();

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
                    ${product.price}
                </div>
                <p class="product-actions">
                   ${product.description} 
                </p>
            </div>
            <div class="product-actions">
                <div class="product-quantity">
                    <label for="sizes">Størrelse</label>
                    <select name="size" id="sizes">
                        <option value="xs">XS</option>
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
        addToCart(id);
        window.location = `http://localhost:5501/handlevogn.html`;
    })
}


function displayError(message) {
    console.log(message);
}