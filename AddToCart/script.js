let iconCart = document.querySelector('.icon-cart')
let closeCart = document.querySelector('.close')
let body = document.querySelector('body')
let listProductHTML = document.querySelector('.listProduct')
let listCartHTML = document.querySelector('.listCart')
let iconCartSpan = document.querySelector('.icon-cart span')

let listProducts = [];
let carts = [];

iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart')
})
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart')
})

const addDataToHTML = () => {
    listProductHTML.innerHTML = '';
    if(listProducts.length > 0){
        listProducts.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.dataset.id = product.id;
            newProduct.innerHTML = ` <img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="price">Rs ${product.price}</div>
                <button class="addCart">Add To Cart
                </button>`;
           listProductHTML.appendChild(newProduct);     
        })
    }
}
listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('addCart')){
        let productId = positionClick.parentElement.dataset.id;
        addToCart(productId);
    }
})
const addToCart = (productId) => {
    let positionThisProductInCart = carts.findIndex((value) => value.productId == productId);
    if(carts.length <= 0){
        carts = [{
            productId: productId,
            quantity: 1
        }]
    }else if(positionThisProductInCart < 0){
        carts.push({
            productId: productId,
            quantity: 1
        })
    }else{
        carts[positionThisProductInCart].quantity += 1;
    }
    addCartToHTML();
    addCartToMemory();
}
const addCartToMemory = () => {
    localStorage.setItem('cart' , JSON.stringify(carts));
}
const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    if (carts.length > 0) {
        carts.forEach(cart => {
            totalQuantity += cart.quantity;
            let newCart = document.createElement('div');
            newCart.classList.add('item');
            newCart.dataset.id = cart.productId;

            let positionProduct = listProducts.findIndex((value) => value.id == cart.productId);
            
            // Check if the product exists in the listProducts
            if (positionProduct >= 0) {
                let info = listProducts[positionProduct];
                newCart.innerHTML = ` 
                    <div class="image">
                        <img src="${info.image}" alt="">
                    </div>
                    <div class="name">${info.name}</div>
                    <div class="totalPrice">Rs ${info.price}</div>
                    <div class="quantity">
                        <span class="minus">-</span>
                        <span>${cart.quantity}</span>
                        <span class="plus">+</span>
                    </div>`;
                listCartHTML.appendChild(newCart);
            } else {
                // Product not found, log a message or handle the case appropriately
                console.warn(`Product with ID ${cart.productId} not found in listProducts`);
            }
        });
    }
    iconCartSpan.innerText = totalQuantity;
}

// listCartHTML.addEventListener('click',(event) => {
//     let positionClick = event.target;
//     if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
//         let productId = positionClick.parentElement.dataset.id;
//         let type = 'minus';
//         if(positionClick.classList.contains('plus')){
//             type = 'plus';
//         }
//         changeQuantity(productId, type);
//     }
// })
listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
        // Find the closest parent element with a dataset id
        let productId = positionClick.closest('.item').dataset.id;
        let type = positionClick.classList.contains('plus') ? 'plus' : 'minus';
        changeQuantity(productId, type);
    }
});
//-----

// const changeQuantity = (productId, type) => {
//     let positionItemInCart = carts.findIndex((value) => value.productId == productId)
//     if(positionItemInCart >= 0){
//         switch (type) {
//             case 'plus':
//                 carts[positionItemInCart].quantity += 1;
//                 break;
        
//             default:
//                 let valueChange = carts[positionItemInCart].quantity - 1;
//                 if (valueChange > 0) {
//                     carts[positionItemInCart].quantity = valueChange;
//                 }else{
//                     carts.splice(positionItemInCart, 1)
//                 }
//                 break;
//         }
//     }
//     addCartToMemory();
//     addCartToHTML();
// }
const changeQuantity = (productId, type) => {
    let positionItemInCart = carts.findIndex((value) => value.productId == productId);
    
    if (positionItemInCart >= 0) {
        switch (type) {
            case 'plus':
                carts[positionItemInCart].quantity += 1; // Increase quantity
                break;
            
            case 'minus':
                let valueChange = carts[positionItemInCart].quantity - 1;
                if (valueChange > 0) {
                    carts[positionItemInCart].quantity = valueChange; // Decrease quantity
                } else {
                    carts.splice(positionItemInCart, 1); // Remove from cart if quantity is 0
                }
                break;
        }
    }
    addCartToMemory(); // Save the updated cart to local storage
    addCartToHTML();   // Update the cart display in HTML
}

const initApp = () => {
    fetch('products.json')
    .then(response => response.json())
    .then(data => {
        listProducts = data;
        addDataToHTML();  

        //get cart from memory
        if(localStorage.getItem('cart')){
            carts = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        }
    }).catch(err => {
        console.log(err);
    })
}
initApp();
