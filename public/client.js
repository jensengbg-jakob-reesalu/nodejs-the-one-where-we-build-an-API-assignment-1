// Fetch all products from database 
// Create product articles
let products = [];
fetchProducts();




async function fetchProducts() {
    let response = await fetch("http://localhost:8000/api/getAllProducts");
    let data = await response.json();
    displayProducts(data);
    // for (let i = 0; i < data.length; i++) {
    //     products.push(data[i]);
    // };
    console.log("fetchProducts finished");
};

let listItems = [];
function displayProducts(array) {
    for (let i = 0; i < array.length; i++) {
        let name = array[i].name;
        let price = array[i].price;
        let image = array[i].image;
        let specs = array[i].specs;
        for (let j = 0; j < specs.length; j++) {
            listItems.push(`<li>${specs[j]}</li>`);
        };
        let article = document.createElement("article");
        let ul = `ul${i}`;

        article.innerHTML = `
        <section id="img-wrapper">
            <img src=${image}>
        </section>
        <section>
            <h2>${name}</h2>
            <ul id="${ul}"></ul>
            <button class="buy-btn">BUY</button>
        </section>
        `;
        document.getElementById("main").appendChild(article);   
        listItems.forEach(element => document.getElementById(`${ul}`).innerHTML += element)
        listItems = [];
    };
    
    console.log("displayProducts finished");
};

