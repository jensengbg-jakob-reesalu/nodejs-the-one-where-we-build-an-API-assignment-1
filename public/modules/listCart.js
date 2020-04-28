export async function listCart() {
    let products = await fetchCart();
    await displayCart(products);
    
}

async function fetchCart() {
    let response = await fetch("http://localhost:8000/api/getCart");
    let data = await response.json();
    return data;
};

function displayCart(array) {
    for (let i = 0; i < array.length; i++) {
        let name = array[i].name;
        let price = array[i].price;
        let image = array[i].image;
        let article = document.createElement("article");
        article.classList.toggle("article-cart");
        document.getElementById("main2").appendChild(article);
        
        article.innerHTML = `
        <section class="img-wrapper">
            <img src=${image}>
        </section>
        <h2>${name}</h2>
        <p>${price} SEK</p>
        <a id="remove-${name}" class="remove-btn">
            <div class="cancel-cross-wrapper">
                <div></div>
                <div></div>
            </div>    
        </a>
        `;   

        // <section class="img-wrapper">
        // <img src=${image}>
        // </section>
        // <section class="text-section">
        // <h2>${name}</h2>
        // <p>${price} SEK</p>
        // <button id="buy-${name}" class="buy-btn">BUY</button>
        // </section>

    };
}

function assignListener(productName) {
    document.getElementById(`buy-${productName}`).addEventListener("click", async () => {
        let response = await fetch(`http://localhost:8000/api/addToCart/${productName}`, {method: "POST"});
        let data = await response.json();
        console.log(data);
    });
}; 