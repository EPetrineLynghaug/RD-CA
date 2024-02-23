// Globale variabler

const url = location.origin;
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlBldHJpbmUiLCJpYXQiOjE3MDcwNTcxNDR9.Agi6gGucuhgfZd5q_4d0AuUo-lGsqNA5xQCJIBlmSz4';
const baseUrl = 'https://api.noroff.dev/api/v1/rainy-days';
const prodContainer = document.getElementById('productsContainer');
const mainContainer = document.getElementById('main');
const divCartList = document.querySelector('.cart-list');
const divCartQuantity = document.querySelector('.cart-total-quantity');
const trCartSummary = document.querySelector('#cart-summary');
const loading = document.querySelector('.loading');
const spanCartBadge = document.getElementById('cartBadge');
const checkoutTable = document.getElementById('checkoutTbody');

export {
    url,
    token,
    baseUrl,
    prodContainer,
    mainContainer,
    divCartList,
    divCartQuantity,
    trCartSummary,
    loading,
    spanCartBadge,
    checkoutTable,
};