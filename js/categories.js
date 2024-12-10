import { camelCase } from "./init.js";
import { views } from "./views.js";
import { Cart } from "./cart.js";

export class Categories {

    /* global $ */

    constructor() {
        this.apiURL = 'https://fakestoreapi.com/';
        this.views = new views(this);
        this.cart = new Cart()
        
    }

    async getAllCategories() {
        try {
            const response = await fetch(this.apiURL + "products/categories");
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log("Categories fetched:", data);

            $(".categories").empty();
            
            data.forEach(category => {
                $(".categories").append(`
                    <a class="dropdown-item category-link" data-category="${category}" href="javascript:void(0);">
                        ${camelCase(category)}
                    </a>
                `);
            });

            this.cart.updateCartCount()
            // Bind the category click event
            this.views.bindCategoryClick(this.getSingleCategory.bind(this));

        } catch (err) {
            console.error("Failed to fetch categories:", err);
        }
    }

    async getSingleCategory(selectedCategory) {
        try {

            $("#default-product-list").empty();
            $(".product_title").empty();
            $(".product_price").empty();
            $(".product_description").empty();
            $(".product_img").empty();
            
            const response = await fetch(this.apiURL + "products/category/" + encodeURIComponent(selectedCategory));
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            console.log("Products fetched for category:", data);

            $(".products").empty(); 
           
            if (!data || data.length === 0) {
                console.log("products not found")
                return;
            }

            const productList = $("#default-product-list");
        data.forEach(product => {
            productList.append(`
                <div class="product-card">
                    <img src="${product.image}" alt="${product.title}">
                    <h3>${product.title}</h3>
                    <p>$${product.price}</p>
                    <button class="view-product" data-id="${product.id}">View Product</button>
                </div>
            `);
        });

        this.cart.updateCartCount()

        this.views.bindCartClick((product) => {
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            const existingItem = cart.find((item) => item.id === product.id);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ ...product, quantity: 1 });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            alert("Product added to cart!");
        });

        // this.views.bindDefaultProductClick(this);

        } catch (err) {
            console.error("Failed to fetch products for the selected category:", err);
        }
    }
}
