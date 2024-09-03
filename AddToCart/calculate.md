## to calculate total

***javacript 
// Selecting DOM elements
let iconCart = document.querySelector('.icon-cart');
let closeCart = document.querySelector('.close');
let body = document.querySelector('body');
let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCartSpan = document.querySelector('.icon-cart span');
let totalCartHTML = document.querySelector('.totalCart'); // New element to show total price

// Initializing product and cart arrays
let listProducts = [];
let carts = [];

// Event listeners for opening and closing the cart
iconCart.addEventListener('click', () => {
body.classList.toggle('showCart');
});
closeCart.addEventListener('click', () => {
body.classList.toggle('showCart');
});

// Function to add product data to HTML
const addDataToHTML = () => {
listProductHTML.innerHTML = '';
if (listProducts.length > 0) {
listProducts.forEach(product => {
let newProduct = document.createElement('div');
newProduct.classList.add('item');
newProduct.dataset.id = product.id;
newProduct.innerHTML = `              <img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="price">Rs ${product.price}</div>
                <button class="addCart">Add To Cart</button>
         `;
listProductHTML.appendChild(newProduct);
});
}
};

// Event listener to handle adding products to the cart
listProductHTML.addEventListener('click', (event) => {
let positionClick = event.target;
if (positionClick.classList.contains('addCart')) {
let productId = positionClick.parentElement.dataset.id;
addToCart(productId);
}
});

// Function to add products to the cart
const addToCart = (productId) => {
let positionThisProductInCart = carts.findIndex((value) => value.productId == productId);
if (carts.length <= 0) {
carts = [{
productId: productId,
quantity: 1
}];
} else if (positionThisProductInCart < 0) {
carts.push({
productId: productId,
quantity: 1
});
} else {
carts[positionThisProductInCart].quantity += 1;
}
addCartToHTML();
addCartToMemory();
};

// Function to save cart data to localStorage
const addCartToMemory = () => {
localStorage.setItem('cart', JSON.stringify(carts));
};

// Function to display cart items and total price
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
                    </div>
                `;
                listCartHTML.appendChild(newCart);
            } else {
                console.warn(`Product with ID ${cart.productId} not found in listProducts`);
            }
        });
    }
    iconCartSpan.innerText = totalQuantity;
    calculateTotal(); // Calculate and display the total price

};

// Event listener to handle quantity changes
listCartHTML.addEventListener('click', (event) => {
let positionClick = event.target;
if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
let productId = positionClick.closest('.item').dataset.id;
let type = positionClick.classList.contains('plus') ? 'plus' : 'minus';
changeQuantity(productId, type);
}
});

// Function to change the quantity of items in the cart
const changeQuantity = (productId, type) => {
let positionItemInCart = carts.findIndex((value) => value.productId == productId);

    if (positionItemInCart >= 0) {
        switch (type) {
            case 'plus':
                carts[positionItemInCart].quantity += 1;
                break;
            case 'minus':
                let valueChange = carts[positionItemInCart].quantity - 1;
                if (valueChange > 0) {
                    carts[positionItemInCart].quantity = valueChange;
                } else {
                    carts.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToMemory();
    addCartToHTML();

};

// Function to calculate and display the total price of items in the cart
const calculateTotal = () => {
let total = 0;
carts.forEach(cart => {
let product = listProducts.find(p => p.id == cart.productId);
if (product) {
total += product.price \* cart.quantity;
}
});
totalCartHTML.innerText = `Total: Rs ${total}`;
};

// Initialize the application
const initApp = () => {
fetch('products.json')
.then(response => response.json())
.then(data => {
listProducts = data;
addDataToHTML();

            // Retrieve cart from localStorage
            if (localStorage.getItem('cart')) {
                carts = JSON.parse(localStorage.getItem('cart'));
                addCartToHTML();
            }
        })
        .catch(err => {
            console.log(err);
        });

};

initApp();

***
