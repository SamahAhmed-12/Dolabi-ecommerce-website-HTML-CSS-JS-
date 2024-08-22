// Function to display the selected product details
function displayProductDetails() {
    const productDetails = JSON.parse(localStorage.getItem('selectedProduct'));

    if (productDetails) {
        document.getElementById('product-image').src = productDetails.image || 'default-image.jpg';
        document.getElementById('product-category').textContent = `Home/${productDetails.category}`;
        document.getElementById('product-title').textContent = productDetails.title;
        document.getElementById('product-price').textContent = `$${productDetails.total}`;
        document.getElementById('product-description').textContent = productDetails.description;
    } else {
        console.log('No product selected');
    }
}

// Call the function to display product details when the page loads
window.addEventListener('load', displayProductDetails);
