export async function listProducts() {
    let products = await fetchProducts();
    await displayProducts(products);
};

async function fetchProducts() {
    let response = await fetch("http://localhost:8000/api/getAllProducts");
    let data = await response.json();
    return data;
};

function displayProducts(array) {
    let listItems = [];
    for (let i = 0; i < array.length; i++) {
        let name = array[i].name;
        let price = array[i].price;
        let image = array[i].image;
        let specs = array[i].specs;
        for (let j = 0; j < specs.length; j++) {
            listItems.push(`<li>${specs[j]}</li>`);
        };
        let article = document.createElement("article");
        article.classList.toggle("article-index");
        document.getElementById("main").appendChild(article);   
        let ul = `ul${i}`;

        article.innerHTML = `
        <section class="img-wrapper">
            <img src=${image}>
        </section>
        <section class="text-section">
            <h2>${name}</h2>
            <ul id="${ul}"></ul>
            <p>${price} SEK</p>
            <button id="buy-${name}" class="add-btn">ADD TO CART</button>
        </section>
        `;
        listItems.forEach((element) => document.getElementById(`${ul}`).innerHTML += element);
        listItems = [];
        

        assignListener(name);
    };
};

function assignListener(productName) {
    document.getElementById(`buy-${productName}`).addEventListener("click", async () => {
        let response = await fetch(`http://localhost:8000/api/addToCart/${productName}`, {method: "POST"});
        let data = await response.json();
        console.log(data);
    });
}; 