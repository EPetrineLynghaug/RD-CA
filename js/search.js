function search(input, product) {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions
    // 
    // Regex som erstatter en eller flere mellomrom globalt
    // fjerner alle mellomrom
    // \s+ matcher alle mellomrom
    input = input.replace(/\s+/g, '');
    

    let match = false;

    if (product.gender.toLowerCase() == input.toLowerCase()) { match = true }

    product.tags.map(tag => {
        if (tag.toString().toLowerCase() == input.toLowerCase()) { match = true }
    });

    if (
        product.title
            .toLowerCase()
            .includes(input.toLowerCase())
    ) { match = true }

    if (
        product.description
            .toLowerCase()
            .includes(input.toLowerCase())
    ) { match = true }

    if (
        product.price
            .toString()
            .toLowerCase()
            .includes(input.toLowerCase())
    ) { match = true }

    return match;
}



export default search;

