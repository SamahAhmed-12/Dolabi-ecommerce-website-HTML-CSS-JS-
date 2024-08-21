// Initialize product array
const product = [
    {
        "title": "Men shirt",
        "price": "1000",
        "taxes": "10",
        "discount": "5",
        "description": "plaid men shirt",
        "total": "950",
        "count": "2",
        "category": "men clothes",
        "image": "./images/product-7.jpg"
    },
    {
        "title": "Bag",
        "price": "200",
        "taxes": "20",
        "discount": "15",
        "description": "stylis backpack",
        "total": "205",
        "count": "1",
        "category": "accessories",
        "image": "./images/product-20.jpg"
    },
    {
        "title": "Blouse",
        "price": "300",
        "taxes": "30",
        "discount": "25",
        "description": "Floral women blouse",
        "total": "305",
        "count": "3",
        "category": "women clothes",
        "image": "./images/product-23.jpg"
    },
    {
        "title": "shirt",
        "price": "400",
        "taxes": "30",
        "discount": "25",
        "description": "green cotton shirt",
        "total": "400",
        "count": "3",
        "category": "men clothes",
        "image": "./images/product-3.jpg"
    },
    {
        "title": "Midi Dress",
        "price": "800",
        "taxes": "30",
        "discount": "5",
        "description": "Viscose women dress",
        "total": "800",
        "count": "10",
        "category": "women clothes",
        "image": "./images/product-10.jpg"
    },
    {
        "title": "Slippers",
        "price": "350",
        "taxes": "15",
        "discount": "0",
        "description": "Strappy leather slippers",
        "total": "405",
        "count": "3",
        "category": "accessories",
        "image": "./images/product-14.jpg"
    },
    {
        "title": "Gloves",
        "price": "300",
        "taxes": "30",
        "discount": "25",
        "description": "stylish leather gloves",
        "total": "150",
        "count": "3",
        "category": "accessories",
        "image": "./images/product-28.jpg"
    },
    {
        "title": "Sweat pants",
        "price": "700",
        "taxes": "20",
        "discount": "0",
        "description": "Cotton sweatpants",
        "total": "720",
        "count": "7",
        "category": "men clothes",
        "image": "./images/product-29.jpg"
    },
    {
        "title": "women skirt",
        "price": "800",
        "taxes": "30",
        "discount": "25",
        "description": "Viscose women skirt",
        "total": "750",
        "count": "6",
        "category": "women clothes",
        "image": "./images/product-21.jpg"
    },
    {
        "title": "Midi Dress",
        "price": "1500",
        "taxes": "30",
        "discount": "25",
        "description": "cotton women dress",
        "total": "1200",
        "count": "2",
        "category": "women clothes",
        "image": "./images/product-12.jpg"
    },
    {
        "title": "Tote bag",
        "price": "2000",
        "taxes": "30",
        "discount": "0",
        "description": "big tote bag",
        "total": "2000",
        "count": "9",
        "category": "accessories",
        "image": "./images/product-16.jpg"
    },
    {
        "title": "Shirt",
        "price": "900",
        "taxes": "30",
        "discount": "0",
        "description": "short sleeved navy cotton shirt",
        "total": "930",
        "count": "3",
        "category": "men clothes",
        "image": "./images/product-6.jpg"
    }
];

// Function to store products locally
function storeProductsLocally() {
    localStorage.setItem('product', JSON.stringify(product));
    console.log('Products stored locally');
}

// Call to store products initially
storeProductsLocally();

// Function to display products on the page
function displayProducts() {
    const dataPro = JSON.parse(localStorage.getItem('product'));
    if (!dataPro) {
        console.log('No products found in localStorage');
        return;
    }

    // Filter products to only include those in the "women clothes" category
    const womenClothesProducts = dataPro.filter(product => product.category.toLowerCase() === 'women clothes');

    const container = document.getElementById('products-container');
    container.innerHTML = '';

    womenClothesProducts.forEach(product => {
        const productHTML = `
            <div class="product-item">
                <div class="overlay">
                    <a href="productDetails.html" class="product-thumb" data-id="${product.title}">
                        <img src="${product.image || 'default-image.jpg'}" alt="${product.title}" />
                    </a>
                    <span class="discount">${product.discount}%</span>
                </div>
                <div class="product-info">
                    <span>${product.category.toUpperCase()}</span>
                    <a href="productDetails.html" class="product-link" data-id="${product.title}">${product.title}</a>
                    <h4>$${product.total}</h4>
                    <button class="add-cart" data-id="${product.title}" data-price="${product.price}" data-name="${product.title}">Add to Cart</button>
                </div>
                <ul class="icons">
                    <li><i class="bx bx-heart"></i></li>
                </ul>
            </div>
        `;
        container.innerHTML += productHTML;
    });

    // Event listener for product link click
    document.querySelectorAll('.product-link, .product-thumb').forEach(link => {
        link.addEventListener('click', (e) => {
            const productId = e.target.getAttribute('data-id');
            const selectedProduct = womenClothesProducts.find(product => product.title === productId);

            // Store the selected product details in localStorage
            localStorage.setItem('selectedProduct', JSON.stringify(selectedProduct));
        });
    });

    // Add event listeners for "Add to Cart" buttons
    document.querySelectorAll('.add-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.getAttribute('data-id');
            const productName = e.target.getAttribute('data-name');
            const productPrice = parseFloat(e.target.getAttribute('data-price'));

            addToCart(productId, productName, productPrice);
        });
    });
}

// Function to display product details on a separate page
function displayProductDetails() {
    const productDetails = JSON.parse(localStorage.getItem('selectedProduct'));

    if (productDetails) {
        document.querySelector('.product-detail .image-container img').src = productDetails.image || 'default-image.jpg';
        document.querySelector('.product-detail .right span').textContent = `Home/${productDetails.category}`;
        document.querySelector('.product-detail .right h1').textContent = productDetails.title;
        document.querySelector('.product-detail .right .price').textContent = `$${productDetails.total}`;
        document.querySelector('.product-detail .right p').textContent = productDetails.description;
    } else {
        console.log('No product selected');
    }
}

// Call the function to display products when the page loads
window.addEventListener('load', () => {
    if (document.getElementById('products-container')) {
        displayProducts();
    }

    if (document.querySelector('.product-detail')) {
        displayProductDetails();
    }
});
