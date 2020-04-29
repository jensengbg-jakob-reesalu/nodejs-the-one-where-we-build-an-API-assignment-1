export async function listCart() {
    let products = await fetchCart();
    await displayCart(products);
}

async function fetchCart() {
    let response = await fetch("http://localhost:8000/api/getCart");
    let data = await response.json();
    // let emptyCart = document.querySelector("#empty-cart");
    console.log(data);
    if (data.success == true) {
        return data.message;
    } else {
        let main = document.querySelector("#main-cart");
        main.innerHTML += `<article id="empty-cart">
                                <h2>Your cart is empty.</h2>
                                <p>Visit our <a href="index.html">store page</a> to buy something!</p>
                            </article>`
        return data;
    };
};

function displayCart(array) {
    for (let i = 0; i < array.length; i++) {
        console.log("started loop...");
        let name = array[i].name;
        let price = array[i].price;
        let image = array[i].image;
        let article = document.createElement("article");
        article.classList.toggle("article-cart");
        document.getElementById("main-cart").appendChild(article);
        
        article.innerHTML = `
        <section class="img-wrapper">
            <img src=${image}>
        </section>
        <h2>${name}</h2>
        <p>${price} SEK</p>
        <a id="remove-${name}" class="remove-btn">
            <div class="remove-wrapper">
                <div></div>
                <div></div>
            </div>    
        </a>`;
        assignListener(name, article);
    };
};

function assignListener(productName, parentArticle) {    
    document.getElementById(`remove-${productName}`).addEventListener("click", async () => {
        let response = await fetch(`http://localhost:8000/api/removeFromCart/${productName}`, {method: "DELETE"});
        let data = await response.json();
        console.log(data);
        parentArticle.classList.toggle("remove-effect");
        setTimeout(() => {parentArticle.remove()}, 500); //Removes element after effect-duration
        setTimeout(() => fetchCart(), 1000); //Checking if cart is empty
    });
}; 