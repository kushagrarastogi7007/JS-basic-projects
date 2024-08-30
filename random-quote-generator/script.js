let quote = document.querySelector('#quote');
let author = document.querySelector('#author');
let button = document.querySelector('#btn');

const url = "https://api.quotable.io/random";

let getQuote = () => {
    fetch(url)
    .then((data) => data.json())
    .then((item) => {
        console.log(item.content);
        console.log(item.author);
        quote.innerText = item.content;
        author.innerText = item.author;
    });
};

let changeColor;
window.addEventListener('load', getQuote);
button.addEventListener('click', getQuote);
