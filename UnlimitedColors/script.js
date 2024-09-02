const start = document.querySelector('#start')
const stopColor = document.querySelector('#stop')
const body = document.querySelector('body')

const randomColor = function(){
    const hex = "0123456789abcdef";
    let color = '#';
    for (let i = 0; i < 6; i++) {
    color += hex[Math.floor(Math.random() * 16)]
    }
    return color
}
console.log(randomColor());

let intervalId;

let startChangingColor = function() {
   if(!intervalId){
    intervalId =  setInterval(changeBgColor,1000)
   }

    function changeBgColor() {
        body.style.backgroundColor = randomColor()
        // IF YOU WANT COLOR CODES
        // console.log(randomColor());
    }
}

let stopChangingColor = function() {
    clearInterval(intervalId)
    intervalId = null;
};

start.addEventListener('click', startChangingColor)

stopColor.addEventListener('click',stopChangingColor)

// This only works when , while the key is pressed
window.addEventListener('keydown',(e) => {
    if(e.key === 'Enter' || e.key === ' '){
        stopChangingColor();
    } 
})
