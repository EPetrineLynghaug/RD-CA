function getCart() {
    let cart = localStorage.getItem('rd_cart');

    if (cart) {
        cart = JSON.parse(cart);
    } else {
        cart = [];
    }

    return cart;
}

function addToCart(id) {
    let cart = getCart();

    // Finn index av produkt i handlekurv
    let product = cart.find(product => product.id === id);

    if (product) {
        product.quantity++;
    } else {
        let product = {
            id: id,
            quantity: 1,
        };

        cart.push(product);
    }

    setCart(cart);
}

function removeProd(id) {
    console.log(id);
    let cart = getCart();

    let product = cart.find(prod => prod.id === id);

    console.log(product);
}

function setCart(cart) {
    localStorage.setItem('rd_cart', JSON.stringify(cart));
}

export {
    getCart,
    addToCart,
    removeProd,
};