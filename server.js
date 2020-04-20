// ---------------------------------------------- SERVER CONSTANTS ----------------------------------------------
const express = require("express");
const app = express();
const port = process.env.port || 8000;

// ---------------------------------------------- DATABASE CONSTANTS ----------------------------------------------
const lowdb = require("lowdb");
const filesync = require("lowdb/adapters/FileSync");
const adapter = new filesync("online-store.json");
const database = lowdb(adapter);


app.use(express.json());
app.listen(port, () => {
    console.log("Started server.");
});

// ---------------------------------------------- ROUTING ----------------------------------------------
app.get("/", (req, res) => {
    res.send("Welcome to the online store!");
})

// Get all products
app.get("/api/getAllProducts", (req, res) => {
    console.log("Request from client: ", req.url);
    let products = database.get("products").value();
    res.send(products);
    console.log("Response sent.");
});

// Add to cart
app.post("/api/addToCart/:productName", (req, res) => {
    console.log("Request from client: ", req.url);
    let reqProductName = req.params.productName;
    let clientResponse = addToCart(reqProductName);
    res.send(clientResponse);
});

// Remove from cart
app.delete("/api/removeFromCart/:productName", (req, res) => {
    console.log("Request from client: ", req.url);
    let reqProductName = req.params.productName;
    let clientResponse = removeFromCart(reqProductName);
    res.send(clientResponse);
});

// Get cart
app.get("/api/getCart", (req, res) => {
    console.log("Request from client: ", req.url);
    let cart = database.get("cart").value();
    res.send(cart);
    console.log("Response sent.");
});


// ---------------------------------------------- FUNCTIONS ----------------------------------------------
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

// **Krav på funktionalitet**
// * Endpoint:s för följande:
//     * Hämta alla produkter (sedan nedan på vad en produkt ska innehålla).
//     * Kunna lägga till produkter i en varukorg.
//     * Kunna ta bort produkter i varukorgen.
//     * Hämta varukorgen med alla tillagda produkter.
// * Man ska inte kunna lägga till samma produkt i varukorgen igen.
// * Man ska få ett felmeddelande om man försöker lägga till en produkt som inte finns.
// * Man ska få ett felmeddelande om man försöker ta bort en produkt som inte finns.