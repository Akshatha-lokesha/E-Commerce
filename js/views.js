export class views{


    bindCategoryClick(categoryClickHandler) {
        $(".category-link").on("click", function (event) {
            const selectedCategory = $(event.currentTarget).data("category");
            categoryClickHandler(selectedCategory);
        });
    }

    bindProductClick(productClickHandler) {
        $(".products").on("click", ".product-link", function (event) {
            const selectedProductId = $(event.currentTarget).data("id");
            console.log("Product ID clicked:", selectedProductId);
            if (selectedProductId) {
              
                localStorage.setItem("selectedProductId", selectedProductId);
              
                window.location.href = "products.html";
            } else {
                console.error("No product ID found on click.");
            }
        });
    }


    bindCartClick(cartClickHandler) {
        $("#product-details").on("click", ".add-to-cart", function (event) {
            const productId = $(event.currentTarget).data("id");
            const title = $(event.currentTarget).data("title");
            const price = $(event.currentTarget).data("price");
            const image = $(event.currentTarget).data("image"); 
            if (productId && title && price&& image) {
                cartClickHandler({ id: productId, title, price , image });
            } else {
                console.error("Add to Cart button missing required data attributes.");
            }
        });
    }
    

    bindRegisterSubmit(registerSubmitHandler) {
        $('#registerForm').on('submit', function (event) {
            event.preventDefault();
            const username = $('#username').val();
            const password = $('#password').val();
            registerSubmitHandler(username, password);
        });
    }

    bindLoginSubmit(loginSubmitHandler) {
        $('#loginForm').on('submit', function (event) {
            event.preventDefault();
            const username = $('#username').val();
            const password = $('#password').val();
            loginSubmitHandler(username, password);
        });
    }

}