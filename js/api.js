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
        displayError(error);
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

        displayError(error);

        // TODO: Håndter error/vis error til bruker

    }
}

function displayError(message) {
    console.error(message);
}

export {
    getAllProducts,
    getSingleProduct,
};