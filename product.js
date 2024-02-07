import { prodContainer } from "./constants.js";

function displayProducts(products) {
    console.log('hello from product.js');

    products.map(product => {
        let card = document.createElement('section');
        card.classList.add('card');

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
    <div class="price">${product.onSale ? productPrice(product.price, product.discountedPrice) : product.price},- kr</div>
    <p class="card-description">${product.description}</p>
    <div class="card-actions">
        <div class="card-quantity">
            <label for="sizes1">Størrelse</label> 
            <select name="size" id="sizes1">
                ${product.sizes.map(size => listSizes(size))}
            </select>
        </div>
        <a class="card-button button-secondary">
            Vis produkt
        </a>
        <a class="product-button product-primary">
            <i class="fa-solid fa-cart-plus"></i> Kjøp
        </a>
    </div>
</div>`;

        prodContainer.append(card);
    });
}

function productPrice(price, discountedPrice) {
    return `SALG: <s class="before-price">${price}</s> ${discountedPrice}`;
}

function listSizes(size) {
    return `<option value="${size}">${size}</option>`;
}

export default displayProducts;
export {
    viewProduct,
};