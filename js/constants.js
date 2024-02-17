// Globale variabler

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlBldHJpbmUiLCJpYXQiOjE3MDcwNTcxNDR9.Agi6gGucuhgfZd5q_4d0AuUo-lGsqNA5xQCJIBlmSz4';
const baseUrl = 'https://api.noroff.dev/api/v1/rainy-days';
const prodContainer = document.getElementById('productsContainer');
const mainContainer = document.getElementById('main');
const divCartList = document.querySelector('.cart-list');
const divCartQuantity = document.querySelector('.cart-total-quantity');
const trCartSummary = document.querySelector('#cart-summary');

export {
    token,
    baseUrl,
    prodContainer,
    mainContainer,
    divCartList,
    divCartQuantity,
    trCartSummary,
};