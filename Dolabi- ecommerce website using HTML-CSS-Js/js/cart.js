
// Function to add items to the cart
function addToCart(productId, productName, productPrice) {
    const userEmail = localStorage.getItem('email') || sessionStorage.getItem('email') || 'guest'; // Default to 'guest' if no user is logged in
    let cart = JSON.parse(localStorage.getItem(`cart_${userEmail}`)) || [];

    const existingProduct = cart.find(item => item.id === productId);
    if (existingProduct) {
        existingProduct.quantity += 1; // Increase quantity if already in cart
    } else {
        cart.push({
            id: productId,
            title: productName,
            price: productPrice,
            quantity: 1
        });
    }

    localStorage.setItem(`cart_${userEmail}`, JSON.stringify(cart));
    updateCartDisplay();
}

// Function to update the cart display
function updateCartDisplay() {
    const userEmail = localStorage.getItem('email') || sessionStorage.getItem('email') || 'guest'; // Default to 'guest' if no user is logged in
    const cart = JSON.parse(localStorage.getItem(`cart_${userEmail}`)) || [];
    console.log('Cart Contents:', cart);

    const cartIcon = document.getElementById('cart-icon');
    const cartContent = document.querySelector('.cart-content');
    const totalPrice = document.querySelector('.total-price');

    cartIcon.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

    cartContent.innerHTML = cart.map(item => `
        <div class="cart-item">
            <span>${item.title || 'Unknown Product'}</span>
            <span>$${item.price || '0.00'}
                <button class="quantity-button" data-id="${item.id || ''}" data-action="decrease">-</button>
                ${item.quantity || '0'}
                <button class="quantity-button" data-id="${item.id || ''}" data-action="increase">+</button>
            </span>
            <button class="remove-item" data-id="${item.id || ''}">Remove</button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalPrice.textContent = `$${total.toFixed(2)}`;
}

// Function to change item quantity
function changeItemQuantity(productId, action) {
    const userEmail = localStorage.getItem('email') || sessionStorage.getItem('email') || 'guest';
    let cart = JSON.parse(localStorage.getItem(`cart_${userEmail}`)) || [];

    cart = cart.map(item => {
        if (item.id === productId) {
            if (action === 'increase') {
                item.quantity += 1;
            } else if (action === 'decrease') {
                item.quantity = Math.max(item.quantity - 1, 1); // Ensure quantity does not go below 1
            }
        }
        return item;
    });

    localStorage.setItem(`cart_${userEmail}`, JSON.stringify(cart));
    updateCartDisplay();
}

// Function to clear cart data from localStorage
function clearCart() {
    const userEmail = localStorage.getItem('email') || sessionStorage.getItem('email') || 'guest';
    localStorage.removeItem(`cart_${userEmail}`);
    updateCartDisplay(); // Update the cart display after clearing
}

// Function to check if the cart is empty
function isCartEmpty() {
    const userEmail = localStorage.getItem('email') || sessionStorage.getItem('email') || 'guest';
    const cartItems = localStorage.getItem(`cart_${userEmail}`);
    if (!cartItems) return true;
    const items = JSON.parse(cartItems);
    return items.length === 0;
}

// Function to handle the "Check Out" button click
function handleCheckOut() {
    if (!isCartEmpty()) {
        window.location.href = 'payment.html'; // Replace with your actual payment page URL
    } else {
        alert('Your cart is empty. Please add items to your cart before proceeding.');
    }
}

// Event listeners for DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    updateCartDisplay();

    const closeCart = document.getElementById('cart-close');
    const cart = document.querySelector('.cart');
    const cartIcon = document.getElementById('cart-icon');

    cartIcon.addEventListener('click', () => {
        cart.classList.add('active');
    });

    closeCart.addEventListener('click', () => {
        cart.classList.remove('active');
    });

    document.querySelector('.cart-content').addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item')) {
            const productId = e.target.getAttribute('data-id');
            const userEmail = localStorage.getItem('email') || sessionStorage.getItem('email') || 'guest';

            let cart = JSON.parse(localStorage.getItem(`cart_${userEmail}`)) || [];
            cart = cart.filter(item => item.id !== productId);
            localStorage.setItem(`cart_${userEmail}`, JSON.stringify(cart));
            updateCartDisplay();
        } else if (e.target.classList.contains('quantity-button')) {
            const productId = e.target.getAttribute('data-id');
            const action = e.target.getAttribute('data-action');
            changeItemQuantity(productId, action);
        }
    });

    document.getElementById('clear-cart').addEventListener('click', clearCart);
    document.getElementById('btn-buy').addEventListener('click', handleCheckOut);
});
