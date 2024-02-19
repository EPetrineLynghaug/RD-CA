import { getAllProducts } from "./api.js";
import displayProducts from "./product.js";
import { prodContainer } from "./constants.js";

const loading = document.querySelector('.loading');

async function init() {
    let products = await getAllProducts();

    displayProducts(products.slice(0, 4), prodContainer);
    loading.classList.add('hidden');
}

init();