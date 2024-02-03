// import



// Laget variabler for API og token
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlBldHJpbmUiLCJpYXQiOjE3MDY4NjI2OTh9.WfQZ4-t5gGc1pVkdtr5dokVca2XtK5VXLaxqqV1WK5o';
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
        console.log(response);

        if (response.ok) {
            // Data parsed with .json()
            const products = await response.json();
            console.log(products);
            displayProducts(products);
            // loading.style.display = 'none';
            loading.classList.add('hidden');
        } else {
            displayError('Kunne ikke hente produkter');
        }

        // TODO: Lag produkt kort

    } catch (error) {
        // Error hvis request feilet

        displayError('Kunne ikke hente produkter');

        // TODO: Håndter error/vis error til bruker

    }
}

function displayError(message) {
    console.log(message);
}

function displayProducts(products) {
    products.map(product => {
        console.log(product);
        // Lager denne: <section class="card">
        let card = createElement('section', ['card']);

        // Lager denne: <div class="card-image">
        let cardImage = createElement('div', ['card-image']);

        let cardContent = createElement('div', ['card-content']);

        let h2 = createElement('h2', ['product-card-title'], product.title);
        cardContent.append(h2);

        card.append(cardImage);
        card.append(cardContent);

        prodContainer.append(card);
    });
}

function createElement(tag, classes, text) {
    let newElement = document.createElement(tag);
    classes.map(classname => newElement.classList.add(classname));

    if (text) {
        newElement.innerText = text;
    }

    return newElement;
}

getProducts();

// <section class="card">
//     <div class="card-image">
//         <a href="./ulriken.html">
//         <img
//             src="./media/RainyDays_Jacket7_1_11zon.jpg"
//             alt="100% wool jacket, sturdy zipper, good pockets on each side."
//         />
//         </a>
//     </div>
// 
//     <div class="card-content">
//         <h2>Ulriken 100% ulljakke <small>-kr 1699.-</small></h2>
//         <p class="card-description">
//         Møt "Ulriken 100% ull" - vår lokale stolthet. Håndlaget i Bergen,
//         denne jakken er både tradisjonell og førsteklasses. Laget av
//         førsteklasses ull, gir den varme og stil til eventyrene dine. Med
//         vår dedikasjon til lokal produksjon får du en jakke som beskytter
//         mot elementene, uansett hvor du går i Bergen. Velg "Ulriken 100%
//         ull" for varme, stil og tilknytning til vår kulturarv. En jakke som
//         er like egnet for fjellturer som for bylivet.
//         </p>
//         <div class="card-actions">
//         <div class="card-quantity">
//             <label for="sizes1">Størrelse</label>
//             <select name="size" id="sizes1">
//             <option value="xs">XS</option>
//             <option value="small">Small</option>
//             <option value="medium">Medium</option>
//             <option value="large">Large</option>
//             <option value="x-large">X-Large</option>
//             </select>
//         </div>
//         <a href="./ulriken.html" class="card-button button-secondary">Vis produkt</a>
//         <a href="./ulriken.html" class="product-button product-primary">
//             <i class="fa-solid fa-cart-plus"></i>Kjøp</a>
//         </div>
//     </div>
// </section>