const apiUrl = 'https://dummyjson.com/products';
const limit = 12;
let currentPage = 1;

const productList = document.getElementById('product-list');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const pageInfo = document.getElementById('page-info');

// Function to fetch products
async function fetchProducts(page) {
    const skip = (page - 1) * limit;
    const url = `${apiUrl}?limit=${limit}&skip=${skip}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        // console.log(data);
        return data.products;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}
// Function to render products
function renderProducts(products) {
    productList.innerHTML = '';
    if (products.length === 0) {
        productList.innerHTML = '<p>No products found.</p>';
        return;
    }

    products.forEach(product => {
        productList.innerHTML += `
        <div class="col-lg-3 col-md-6 col-sm-12 mb-4">
          <div class="card border-2 shadow-sm h-100 position-relative hover-scale">
            <a href="#">
              <img src="${product.images[0]}" class="card-img-top img-fluid" alt="Product1" style="height: 200px; object-fit: cover;">
            </a>
            <div class="card-body text-center">
              <h5 class="card-title text-truncate fw-bold text-dark">${product.title}</h5>
              <p class="card-text text-muted small">${product.description.substring(0, 100)}...</p>
              <p class="card-text fw-bold text-danger">$${product.price}</p>
              <p class="text-uppercase text-secondary small fw-semibold">${product.category}</p>
            </div>
            <div class="card-footer text-center bg-white border-0">
              <a href="#" class="btn btn-warning btn-sm w-100">View Product</a>
            </div>
          </div>
        </div>
        <style>
          .hover-scale {
            transition: transform 0.3s ease-in-out;
          }
          .hover-scale:hover {
            transform: scale(1.05);
          }
        </style>
        `;
        


    });
}

// Update the pagination state
function updatePaginationState(totalProducts) {
    pageInfo.textContent = `Page ${currentPage}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage * limit >= totalProducts;
}

// Load and display products for the current page
async function loadPage(page) {
    const products = await fetchProducts(page);
    renderProducts(products);

    // Assuming the total products count is fixed (e.g., 100)
    const totalProducts = 100;
    updatePaginationState(totalProducts);
}

// Event listeners for buttons
prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        loadPage(currentPage);
    }
});

nextBtn.addEventListener('click', () => {
    currentPage++;
    loadPage(currentPage);
});



// Initial load
loadPage(currentPage);
