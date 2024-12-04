import { views } from "./views.js";
import { Cart } from "./cart.js";
export class Products{

     /* global $ */

     constructor() {
        this.apiURL = 'https://fakestoreapi.com/';
        this.views=new views()
        this.cart=new Cart()
        this.views.bindProductClick((productId) => {
            console.log("Product clicked with ID:", productId);
            window.location.href = `products.html?productId=${productId}`;

        });

        // this.loadNewestProducts()
        
    }

    // async loadNewestProducts() {
    //     try {
    //         const response = await fetch(this.apiURL + 'products?sort=asc&limit=10');
    //         if (!response.ok) {
    //             throw new Error("Failed to fetch newest products");
    //         }
    //         const data = await response.json();

    //         $("#newest-products").empty();
    //         $(".products").empty();
    //         $(".product_title").empty();
    //         $(".product_price").empty();
    //         $(".product_description").empty();
    //         $(".product_img").empty();
    //         data.forEach(product => {
    //             $("#newest-products").append(`
    //                 <div class="col-md-3">
    //                     <a href="index.html?productId=${product.id}" class="product-link" data-id="${product.id}">
    //                         <img src="${product.image}" alt="${product.title}" class="product-img">
    //                         <p>${product.title}</p>
    //                     </a>
    //                 </div>
    //             `);
    //         });

    //     } catch (err) {
    //         console.error("Failed to load newest products:", err);
    //     }
    // }

    getProductIdFromUrl() {
        const params = new URLSearchParams(window.location.search);
        const productId = params.get("productId");
    console.log("Extracted Product ID:", productId);
    return productId;
      
    }
    
    loadProductDetails() {
        const productId = this.getProductIdFromUrl() || localStorage.getItem("selectedProductId");
        if (productId) {
            console.log("Loaded Product ID from storage:", productId);
            localStorage.removeItem("selectedProductId");

            $("#newest-products").addClass("hidden");
            $(".products").addClass("hidden");
            $("#product-details").removeClass("hidden");

            this.getSingleProduct(productId);
        } else {
            console.error("No product ID found in localStorage.");
    
        }
    }

    async getSingleProduct(id){
        try {
            
            $("#newest-products").empty();
            $(".products").empty();
            $(".product_title").empty();
            $(".product_price").empty();
            $(".product_description").empty();
            $(".product_img").empty();

            const response = await fetch(this.apiURL + "products/" + encodeURIComponent(id));
            if (!response.ok) {
                throw new Error(`Failed to fetch product with ID ${id}: ${response.statusText}`);
            }
            const text = await response.text();
            if (!text) {
                console.error("Empty response for product ID:", id);
                return;
            }
            const data = JSON.parse(text);
            console.log("Fetched product data:", data);

            
          
            $(".product_title").text(data.title);
            $(".product_price").text(`$${data.price}`);
            $(".product_description").text(data.description);
            $(".product_img").html(`<img src="${data.image}" alt="${data.title}">`);

            $("#product-details").append(`
                <div class="product-actions">
                    <button class="add-to-cart btn btn-primary" 
                            data-id="${data.id}" 
                            data-title="${data.title}" 
                            data-price="${data.price}"
                            data-image="${data.image}">
                        Add to Cart
                    </button>
                </div>
            `);
    
            this.views.bindCartClick((product) => {
                const cart = JSON.parse(localStorage.getItem("cart")) || [];
                cart.push(product);
                localStorage.setItem("cart", JSON.stringify(cart));
                alert("Product added to cart!");
                this.cart.loadCart(); 
            });
         
    
        } catch (err) {
            console.error("Failed to fetch product details:",id, err);
        }
    }

    
}