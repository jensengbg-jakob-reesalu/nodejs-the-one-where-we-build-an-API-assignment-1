// Server constants
const express = require("express");
const app = express();
const port = process.env.port || 8000;

// Database constants
const lowdb = require("lowdb");
const filesync = require("lowdb/adapters/FileSync");
const adapter = new filesync("online-store.json");
const database = lowdb(adapter);

// app.use(express.static("public"));
app.use(express.json());

app.listen(port, () => {
    console.log("Started server.");
});

// Routing
app.get("/", (req, res) => {
    res.send("Welcome to the online store!");
})

app.get("/api/getAllProducts", (req, res) => {
    console.log("Request from client: ", req.url);
    let products = database.get("products").value();
    res.send(products);
    console.log("Response sent.");
});

app.post("/api/addToCart/:product", (req, res) => {
    console.log("Request from client: ", req.url);
    let productName = req.params.product;
    let findProduct = database.get("products").find( {name: productName} ).value();
    console.log(findProduct);
    database.get("cart").push(findProduct).write();
});

app.delete("/api/removeFromCart", (req, res) => {
    
});

app.get("/api/getCart", (req, res) => {
    console.log("Request from client: ", req.url);
    let cart = database.get("cart").value();
    res.send(cart);
    console.log("Response sent.");
});


// **Krav på funktionalitet**
// * Endpoint:s för följande:
//     * Hämta alla produkter (sedan nedan på vad en produkt ska innehålla).
//     * Kunna lägga till produkter i en varukorg.
//     * Kunna ta bort produkter i varukorgen.
//     * Hämta varukorgen med alla tillagda produkter.
// * Man ska inte kunna lägga till samma produkt i varukorgen igen.
// * Man ska få ett felmeddelande om man försöker lägga till en produkt som inte finns.
// * Man ska få ett felmeddelande om man försöker ta bort en produkt som inte finns.