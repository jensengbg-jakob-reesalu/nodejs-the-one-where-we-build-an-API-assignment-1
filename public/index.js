import { listProducts } from "./modules/listProducts.js";
listProducts();


let socketIO = io();


document.getElementById("chat-btn").addEventListener("click", () => {
    let chatWindowWrapper = document.querySelector(".chat-window-wrapper");
    chatWindowWrapper.classList.toggle("hidden"); 
    chatWindowWrapper.classList.toggle("expand");
    document.getElementById("remove-p").classList.add("hidden");
    document.getElementById("costumer-support-p").classList.add("hidden");
});

document.getElementById("remove-p").addEventListener("click", () => {
    document.getElementById("remove-p").classList.add("hidden");
    document.getElementById("costumer-support-p").classList.add("hidden");
});

document.getElementById("submit-btn").addEventListener("click", () => {
    document.querySelector("#username-window").classList.toggle("hidden");
    document.querySelector("#chat-window").classList.toggle("hidden");
})


















// const usernameElem = document.querySelector("#message");
// const submitButton = document.querySelector("#submit");
// const chatMessageInput = document.querySelector("#chat-message");
// const sendButton = document.querySelector("send");
// const login = document.querySelector(".login");
// const chat = document.querySelector(".chat");
// const chatArea = document.querySelector(".chat-area");


// submitButton.addEventListener("click", () => {
//     console.log("test");
//     let username = usernameElem.value;
//     socketIO.emit("join", username);
//     login.classList.toggle("hide");
//     chat.classList.toggle("hide");
// });