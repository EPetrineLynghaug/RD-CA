// import

// Laget variabler for API og token
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlBldHJpbmUiLCJpYXQiOjE3MDcwNTcxNDR9.Agi6gGucuhgfZd5q_4d0AuUo-lGsqNA5xQCJIBlmSz4';
const baseUrl = 'https://api.noroff.dev/api/v1/rainy-days';
const prodContainer = document.getElementById('productsContainer');
const loading = document.querySelector('.loading');

// TODO: Lag loading

async function getProducts() {
    try {
        // Prøv å hente produkter

        // Fetch request (RAW data)
        const response = await fetch(baseUrl, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            // Data parsed with .json()
            const products = await response.json();
            console.log(products)

            // Create product cards
            displayProducts(products.slice(0, 4));

            // Hide loading
            loading.classList.add('hidden');
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

getProducts();

function displayError(message) {
    console.log(message);
}

function displayProducts(products) {
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
    <a href="./ulriken.html" class="card-button button-secondary">Vis produkt</a>
    <a href="./ulriken.html" class="product-button product-primary">
        <i class="fa-solid fa-cart-plus"></i>Kjøp</a>
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