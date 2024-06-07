document.addEventListener('DOMContentLoaded',()=>{
    const productContainer = document.getElementById('product-container');
    const searchBar =document.getElementById('search-bar');
    const sortOption = document.getElementById('sort-options');
    const loadMore = document.getElementById('load-more');

    let products = [];
    let displayedProducts = [];
    let productPerPage =10;
    let currentPage = 1;



    async function fetchProducts(){
        try {

            const response = await fetch('https://fakestoreapi.com/products');
            products = await response.json();
            displayedProducts = products.slice(0,productPerPage);
            displayProducts(displayedProducts)


            
        } catch (error) {
            console.error('Error occured:',error)
            
        }
    }

    function displayProducts(products){
        productContainer.innerHTML = '';
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            productElement.innerHTML =  `
                <img src="${product.image}" alt="${product.title}">
                <h2>${product.title}</h2>
                <p>$${product.price}</p>
                <p>Rating: ${product.rating.rate}</p>
            `;
            productContainer.appendChild(productElement);

            
        });

    }


    function filterProducts(query){
        const filteredProducts = products.filter(product=>product.title.toLowerCase().includes(query.toLowerCase()));
        displayedProducts = filteredProducts.slice(0,currentPage * productPerPage)
        displayProducts(displayedProducts)
    }

    function sortProducts(criteria){
        const sortedProducts = [...displayedProducts].sort((a,b)=>{
            if (criteria === 'price'){
                return a.price -  b.price;
            }
            if (criteria === 'rating'){
                return a.price -  b.rating.rate - a.rating.rate;
            }
            if (criteria === 'name'){
                return a.title.localeCompare(b.title);
            }
        })
        displayProducts(sortedProducts)
    }

    function loadMoreProducts(){
        currentPage++;
        displayedProducts = products.slice(0,currentPage * productPerPage);
        displayProducts(displayedProducts)


    }
    searchBar.addEventListener('input',(e) => filterProducts(e.target.value));
    sortOption.addEventListener('change',(e) => sortProducts(e.target.value));
    loadMore.addEventListener('click',loadMoreProducts)


    fetchProducts();




    

})