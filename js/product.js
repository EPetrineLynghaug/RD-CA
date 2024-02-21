import { addToFavorites, productIsFavorite } from "./favorites.js";
import { url }from "./constants.js";

function displayProducts(products, prodContainer) {
    products.map(product => {
        let isFavorite = productIsFavorite(product.id);

        let card = document.createElement('section');
        card.classList.add('card');
        card.id = `prod-${product.id}`;

        card.innerHTML = `<div class="card-image">
            <a href="./ulriken.html">
            <img
                src="${product.image}"
                alt="100% wool jacket, sturdy zipper, good pockets on each side."
            />
            </a>
        </div>

        <div class="card-content">
            <h2>${product.title}</h2>
            <div class="price">$ ${product.onSale ? productPrice(product.price, product.discountedPrice) : product.price}</div>
            <p class="card-description">${product.description}</p>
            <div class="card-actions">
                ${createButton(
                    'Vis produkt',
                    'show-product card-button button-secondary',
                    product.id
                )}
                ${createButton(
                    isFavorite 
                        ? 'Fjern fra favoritter'
                        : 'Legg til i favoritter',
                    'favorite product-button product-primary',
                    product.id
                )}

            </div>
        </div>`;

        prodContainer.append(card);
    });

    showProductsListener();
    addToFavorites();
}

function productPrice(price, discountedPrice) {
    return `SALG: <s class="before-price">${price}</s> ${discountedPrice}`;
}

function listSizes(size) {
    return `<option value="${size}">${size}</option>`;
}

function createButton(text, classes, id) {
    let button = `<a class="${classes}" data-id="${id}">
        ${text}
    </a>`;

    return button;
}

function showProductsListener() {
    let buttons = document.querySelectorAll('.show-product');

    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();

            let id = button.getAttribute('data-id');

            window.location = `${url}/ulriken.html?id=${id}`;
        });
    });
}

export default displayProducts;