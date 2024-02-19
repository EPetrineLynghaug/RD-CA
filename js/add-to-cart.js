function getCart() {
    let cart = localStorage.getItem('rd_cart');

    if (cart) {
        cart = JSON.parse(cart);
    } else {
        cart = [];
    }

    return cart;
}

function addToCart(id, size) {
    let cart = getCart();

    // Finn index av produkt i handlekurv
    let product = cart.find(product => product.id === id);

    if (product) {
        product.quantity++;
    } else {
        let product = {
            id: id,
            size: size,
            quantity: 1,
        };

        cart.push(product);
    }

    setCart(cart);
}

function removeProd(id, cart) {
    let product = cart.find(prod => prod.id === id);
    let index = cart.indexOf(product);

    if (index >= 0) {
        if (product.quantity >= 2) {
            let divQuantity = document.getElementById('quantity-' + id);

            let newQuantity = product.quantity - 1;
            cart[index].quantity = newQuantity;
            divQuantity.innerText = newQuantity;
        } else {
            let divCard = document.getElementById('card-' + id);

            cart.splice(index, 1);

            divCard.remove();
        }

        setCart(cart);
        return cart;
    }
}

function addProd(id, cart) {
    let product = cart.find(prod => prod.id === id);
    let index = cart.indexOf(product);

    if (index >= 0) {
        let divQuantity = document.getElementById('quantity-' + id);

        let newQuantity = product.quantity + 1;
        cart[index].quantity = newQuantity;
        divQuantity.innerText = newQuantity;

        setCart(cart);
        return cart;
    }
}

function setCart(cart) {
    localStorage.setItem('rd_cart', JSON.stringify(cart));
}

export {
    getCart,
    addToCart,
    removeProd,
    addProd,
};