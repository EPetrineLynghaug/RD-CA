// import
import displayProducts from "./product.js";
import { token, baseUrl, prodContainer } from './constants.js';

// Laget variabler for API og token
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
            displayProducts(products.slice(0, 4), prodContainer);

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