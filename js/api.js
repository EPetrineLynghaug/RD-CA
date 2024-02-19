// import
import { token, baseUrl } from './constants.js';

async function getAllProducts() {
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

            return products;
        } else {
            displayError('Kunne ikke hente produkter');
        }

    } catch (error) {
        // Error hvis request feilet
        displayError('Noe gikk galt...');
    }
}

async function getSingleProduct(id) {
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

            return product;
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

function displayError(message) {
    console.log(message);
}

export {
    getAllProducts,
    getSingleProduct,
};