import { baseUrl, token, mainContainer } from "./constants.js";

//let params = new URLSearchParams(document.location.search);
let params = new URL(document.location).searchParams;
let id = params.get("id"); 

async function getProduct() {
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
            console.log(product);

            mainContainer.innerHTML = displayProduct(product);
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

getProduct();

function displayProduct(product) {
    return `<section class="product">
        <div class="product-image">
            <a href="./ulriken.html">
            <img
                src="${product.image}"
                alt="Green 100% wool jacket, sturdy zipper, good pockets on each side. Unisex model. Also available in black and red"
            />
            </a>
        </div>
        <div class="product-content">
            <div>
                <h1>${product.title}</h1>
                <div class ="price">
                    ${product.price}
                </div>
                <p class="product-actions">
                   ${product.description} 
                </p>
            </div>
            <div class="product-actions">
                <div class="product-quantity">
                    <label for="sizes">Størrelse</label>
                    <select name="size" id="sizes">
                        <option value="xs">XS</option>
                        ${product.sizes.map(size => listSizes(size))}
                    </select>
                </div>
                <a href="./handlevogn.html" class="product-button product-primary">
                    <i class="fa-solid fa-cart-plus"></i> Kjøp
                </a>
            </div>
        </div>
    </section>`;
}
function listSizes (size){
    return `<option value="${size}">${size}</option>`;
}
{/* <section class="product">
    <div class="product-image">
        <a href="./ulriken.html">
        <img
            src="./media/RainyDays_Jacket7_1_11zon.jpg"
            alt="Green 100% wool jacket, sturdy zipper, good pockets on each side. Unisex model. Also available in black and red"
        />
        </a>
    </div>
    <div class="product-content">
        <div>
            <h1>Ulriken 100% ulljakke <small>-kr 1699.-</small></h1>
            <p class="product-actions">
                Møt "Ulriken 100% ull" - vår lokale stolthet. Håndlaget i Bergen,
                denne jakken er både tradisjonell og førsteklasses. Laget av
                førsteklasses ull, gir den varme og stil til eventyrene dine. Med
                vår dedikasjon til lokal produksjon får du en jakke som beskytter
                mot elementene, uansett hvor du går i Bergen. Velg "Ulriken 100%
                ull" for varme, stil og tilknytning til vår kulturarv. En jakke
                som er like egnet for fjellturer som for bylivet.
            </p>
        </div>
        <div class="product-actions">
            <div class="product-quantity">
                <label for="sizes">Størrelse</label>
                <select name="size" id="sizes">
                <option value="xs">XS</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
                <option value="xl">X-Large</option>
                </select>
            </div>
            <a href="./handlevogn.html" class="product-button product-primary">
                <i class="fa-solid fa-cart-plus"></i> Kjøp
            </a>
        </div>
    </div>
</section> */}