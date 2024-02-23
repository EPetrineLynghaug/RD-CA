import { getSingleProduct } from "./api.js";
import { checkoutTable, loading, trCartSummary } from "./constants.js";
import { getCart } from "./add-to-cart.js";

let cart = getCart();
let productSummary = [];

function init() {
    let cartHTML = '';

    cart.map(async (item) =>{
        let product = await getSingleProduct(item.id);

        product.quantity = item.quantity;
        product.selectedSize = item.size;
        productSummary.push(product);

        cartHTML += addProductToTable(product);
    });

    setTimeout(() => {
        loading.classList.add('hidden');
        checkoutTable.innerHTML = cartHTML;
        calculateTotalSum();

        localStorage.clear('rd_cart');
    }, 1250);
}

init();

function addProductToTable(product) {
    return `<tr>
        <td>
            <img src="${product.image}" width="64" />
        </td>
        <td>${product.title}</td>
        <td>${product.selectedSize}</td>
        <td>${product.quantity}</td>
        <td>
            ${
                product.onSale
                    ? product.discountedPrice
                    : product.price
            }
        </td>
        <td>
            ${
                product.onSale
                    ? product.discountedPrice * product.quantity
                    : product.price * product.quantity
            }
        </td>
    </tr> `;
}

let totalSummary = {
    discount: 0,
    delivery: 100,
    subtotal: 0,
    total: 0,
};

function calculateTotalSum() {
    totalSummary = {
        discount: 0,
        delivery: 100,
        subtotal: 0,
        total: 0,
    };

    cart.map((item) => {
        let product = productSummary.find((prod) => prod.id === item.id);

        if (product.onSale) {
            let moneySaved = (product.price - product.discountedPrice) * item.quantity;
            totalSummary.discount += moneySaved;

            let subTotal = (product.discountedPrice * 0.75) * item.quantity;
            totalSummary.subtotal += subTotal;

            let total = product.discountedPrice * item.quantity;
            totalSummary.total += total;
        } else {
            let subTotal = (product.price * 0.75) * item.quantity; 
            totalSummary.subtotal += subTotal;

            let total = product.price * item.quantity;
            totalSummary.total += total;

            totalSummary.total += totalSummary.delivery;
        }
    });

    trCartSummary.innerHTML = `
    <td>$ ${totalSummary.discount.toFixed(2)}</td>
    <td>$ ${totalSummary.subtotal.toFixed(2)}</td>
    <td>$ ${totalSummary.delivery.toFixed(2)}</td>
    <td>$ ${totalSummary.total.toFixed(2)}</td>
    `;
}