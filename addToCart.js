function addToCart(productName) {
    let product = database.get("products").find( {name: productName} ).value();
    let productInCart =  database.get("cart").find( {name: productName} ).value();
    if (product == undefined) {
        return {success: false, message: "No such product exists!"};
    } else if (productInCart != undefined) {
        return {success: false, message: "Product already in cart!"};
    } else {
        database.get("cart").push(product).write();    
        return {success: true, message: "Product added to cart!"};
    };
};

exports.addToCart = addToCart;