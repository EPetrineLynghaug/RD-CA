import { getAllProducts } from "./api.js";
import { prodContainer, loading } from "./constants.js";
import displayProducts from "./product.js";
import search from "./search.js";

const searchBar = document.getElementById('search');

let products = [];

async function init() {
    products = await getAllProducts();

    setTimeout(() => {
        displayProducts(products, prodContainer);
        loading.classList.add('hidden');
    }, 1250);
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

        // Søk etter tittel, pris, kjønn, beskrivelse
        if (search(userInput, product)) {
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

