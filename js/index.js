import { getAllProducts } from "./api.js";
import displayProducts from "./product.js";
import { prodContainer, loading } from "./constants.js";

async function init() {
    let products = await getAllProducts();

    setTimeout(() => {
        displayProducts(products.slice(0, 4), prodContainer);
        loading.classList.add('hidden');
    }, 1250);
}

 init();