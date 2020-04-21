// NOTE: As there is no frontend client for this project, the POST and DELETE endpoints works only in Postman.


// SERVER CONSTANTS + SETUP
const express = require("express");
const app = express();
const port = process.env.port || 8000;

app.use(express.json());
app.listen(port, () => {
    console.log("Started server.");
});

// DATABASE CONSTANTS 
const lowdb = require("lowdb");
const filesync = require("lowdb/adapters/FileSync");
const adapter = new filesync("online-store.json");
const database = lowdb(adapter);

// MODULE CONSTANTS 
const apiFunction = require("./API-functions.js");

// ROUTING/API-ENDPOINTS 
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
    let clientResponse = apiFunction.addToCart(reqProductName);
    res.send(clientResponse);
});

// Remove from cart
app.delete("/api/removeFromCart/:productName", (req, res) => {
    console.log("Request from client: ", req.url);
    let reqProductName = req.params.productName;
    let clientResponse = apiFunction.removeFromCart(reqProductName);
    res.send(clientResponse);
});

// Get cart
app.get("/api/getCart", (req, res) => {
    console.log("Request from client: ", req.url);
    let cart = database.get("cart").value();
    res.send(cart);
    console.log("Response sent.");
});