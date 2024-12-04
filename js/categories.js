import { camelCase } from "./init.js";
import { views } from "./views.js";

export class Categories {

    /* global $ */

    constructor() {
        this.apiURL = 'https://fakestoreapi.com/';
        this.views = new views();
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

            // Bind the category click event
            this.views.bindCategoryClick(this.getSingleCategory.bind(this));

        } catch (err) {
            console.error("Failed to fetch categories:", err);
        }
    }

    async getSingleCategory(selectedCategory) {
        try {

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

            $(".products").empty(); // Clear existing products
           
            if (!data || data.length === 0) {
                console.log("products not found")
                return;
            }

            data.forEach(product => {
                $(".products").append(`
                    <div class="col-md-3">
                        <a href="index.html" class="product-link" data-id="${product.id}">
                            <img src="${product.image}" alt="${product.title}" class="product-img">
                            <p>${product.title}</p>
                        </a>
                    </div>
                `);
            });

        } catch (err) {
            console.error("Failed to fetch products for the selected category:", err);
        }
    }
}
