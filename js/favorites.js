function getFavorites(array) {
    let favorites = localStorage.getItem('rd_fav');

    if (favorites) {
        array = JSON.parse(favorites);
    }

    return array;
}

function productIsFavorite(id) {
    let favorites = localStorage.getItem('rd_fav');

    if (favorites) {
        favorites = JSON.parse(favorites);
        
        let isFavorite = favorites.find(fav => fav === id);

        if (isFavorite) {
            return true;
        }
    }

    return false;
}

function addToFavorites() {
    let buttons = document.querySelectorAll('.favorite');

    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();

            let id = button.getAttribute('data-id');

            let favoriteArray = [];

            favoriteArray = getFavorites(favoriteArray);
            
            let index = favoriteArray.indexOf(id);

            if (index >= 0) {
                favoriteArray.splice(index, 1);
                button.innerText = 'Legg til i favoritter';
            } else {
                favoriteArray.push(id);
                button.innerText = 'Fjern fra favoritter';
            }

            localStorage.setItem('rd_fav', JSON.stringify(favoriteArray));
        });
    });
}

export {
    productIsFavorite,
    addToFavorites,
}