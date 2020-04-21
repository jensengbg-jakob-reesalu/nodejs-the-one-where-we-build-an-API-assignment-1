const lowdb = require("lowdb");
const filesync = require("lowdb/adapters/FileSync");
const adapter = new filesync("online-store.json");
const database = lowdb(adapter);

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

function removeFromCart(productName) {
    let productInCart = database.get("cart").find( {name: productName} ).value();
    if (productInCart == undefined) {
        return {success: false, message: "No such product in cart!"};
    } else {
        let index = database.get("cart").indexOf(productInCart).value();    
        database.get("cart").splice(index, 1).write();
        return {success: true, message: "Product removed from cart!"};
    };
};

exports.addToCart = addToCart;
exports.removeFromCart = removeFromCart;