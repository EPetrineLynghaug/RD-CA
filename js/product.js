function displayProducts(products, prodContainer) {
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
                ${createButton('Vis produkt', 'show-product card-button button-secondary', product.id)}
                <a class="product-button product-primary">
                    <i class="fa-solid fa-cart-plus"></i> Kjøp
                </a>
            </div>
        </div>`;

        prodContainer.append(card);
    });

    showProductsListener();
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

            window.location = `http://localhost:5501/ulriken.html?id=${id}`;
        });
    });
}

export default displayProducts;