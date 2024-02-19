import { getAllProducts } from "./api.js";
import { prodContainer } from "./constants.js";
import displayProducts from "./product.js";

async function init(){
    let products = await getAllProducts();

    displayProducts(products, prodContainer);
}

init();

// <section class="card">
//     <div class="card-image">
//         <a href="./ulriken.html">
//             <img
//                 src="./media/RainyDays_Jacket7_1_11zon.jpg"
//                 alt="100% wool jacket, sturdy zipper, good pockets on each side."
//             />
//         </a>
//     </div>
// 
//     <div class="card-content">
//         <h2>Ulriken 100% ulljakke <small>-kr 1699.-</small></h2>
//         <p class="card-description">
//             Møt "Ulriken 100% ull" - vår lokale stolthet. Håndlaget i Bergen,
//             denne jakken er både tradisjonell og førsteklasses. Laget av
//             førsteklasses ull, gir den varme og stil til eventyrene dine. Med
//             vår dedikasjon til lokal produksjon får du en jakke som beskytter
//             mot elementene, uansett hvor du går i Bergen. Velg "Ulriken 100%
//             ull" for varme, stil og tilknytning til vår kulturarv. En jakke som
//             er like egnet for fjellturer som for bylivet.
//         </p>
//         <div class="card-actions">
//             <div class="card-quantity">
//                 <label for="sizes1">Størrelse</label>
//                 <select name="size" id="sizes1">
//                     <option value="xs">XS</option>
//                     <option value="small">Small</option>
//                     <option value="medium">Medium</option>
//                     <option value="large">Large</option>
//                     <option value="xl">X-Large</option>
//                 </select>
//             </div>
//             <a href="./ulriken.html" class="card-button button-secondary">
//                 Vis produkt
//             </a>
//             <a href="./ulriken.html" class="product-button product-primary">
//                 <i class="fa-solid fa-cart-plus"></i> Kjøp
//             </a>
//         </div>
//     </div>
// </section>