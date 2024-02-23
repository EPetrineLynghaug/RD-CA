import { spanCartBadge } from "./constants.js";
import { getCart } from "./add-to-cart.js";

function updateNavbar() {
    let cart = getCart();
    let numberOfItems = 0;

    cart.map(item => numberOfItems += item.quantity);

    spanCartBadge.innerText = numberOfItems;
}

updateNavbar();

export default updateNavbar;