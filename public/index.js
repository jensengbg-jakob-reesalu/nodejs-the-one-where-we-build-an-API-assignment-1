import { listProducts } from "./modules/listProducts.js";
listProducts();


let socketIO = io();

let chatBtn = document.querySelector("#chat-btn");
let chatWindowWrapper = document.querySelector(".chat-window-wrapper");
let removeP = document.querySelector("#remove-p");
let customerSupportP = document.querySelector("#costumer-support-p");
let submitBtn = document.querySelector("#submit-btn");
let usernameWindow = document.querySelector("#username-window");
let chatWindow = document.querySelector("#chat-window");

chatBtn.addEventListener("click", () => {
    chatWindowWrapper.classList.toggle("hidden"); 
    chatWindowWrapper.classList.toggle("expand");
    removeP.classList.add("hidden");
    customerSupportP.classList.add("hidden");
});

removeP.addEventListener("click", () => {
    removeP.classList.add("hidden");
    customerSupportP.classList.add("hidden");
});

submitBtn.addEventListener("click", () => {
    usernameWindow.classList.toggle("hidden");
    chatWindow.classList.toggle("hidden");

    let username = document.querySelector("#username-input").value;
    socketIO.emit("join", username);
    // socketIO.on("received", (username) => {
    //     let messages = document.querySelector("#message-display");
    //     messages.innerHTML += `${username} joined the chat.`;
    // });
});


















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