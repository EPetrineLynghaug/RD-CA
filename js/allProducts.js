import { getAllProducts } from "./api.js";
import { prodContainer } from "./constants.js";
import displayProducts from "./product.js";

const loading = document.querySelector('.loading');
const searchBar = document.getElementById('search');

let products = [];

async function init() {
    products = await getAllProducts();
    displayProducts(products, prodContainer);
    loading.classList.add('hidden');
}

init();

// https://www.freecodecamp.org/news/javascript-debounce-example/
// Debounce function with timeout
function debounce(func, timeout = 500) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}
// Function to run the search
function executeSearch() {
    let userInput = searchBar.value;

    products.map((product) => {
        let productCard = document.getElementById(`prod-${product.id}`)

        console.log(productCard);

        if (product.title.toLowerCase().includes(userInput.toLowerCase())) {
            productCard.classList.remove('hidden');
        } else {
            productCard.classList.add('hidden');
        }
    });
}

// Input eventlistener on user input change
function searchListener() {
    searchBar.addEventListener('input', debounce(() => executeSearch()));
}

searchListener();