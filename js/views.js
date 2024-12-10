export class views{


    bindCategoryClick(categoryClickHandler) {
        $(".category-link").off("click").on("click", function (event) {
            const selectedCategory = $(event.currentTarget).data("category");
            categoryClickHandler(selectedCategory);
        });
    }

    bindClearDefault(){
        $(".nav-link").on("click", function () {
           return products.clearDefaultProducts();
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

        $("#product-details").off("click", ".add-to-cart");
        $("#product-details").on("click", ".add-to-cart", function (event) {
            const productId = $(event.currentTarget).data("id");
            const title = $(event.currentTarget).data("title");
            const price = $(event.currentTarget).data("price");
            const image = $(event.currentTarget).data("image"); 
            if (productId && title && price&& image) {
                cartClickHandler({ id: productId, title, price , image });
                window.location.reload();
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

    bindRemoveItem(removeItemHandler) {
        $(document).on("click", ".remove-item", (event) => {
            const index = $(event.currentTarget).data("index");
            removeItemHandler(index);
        });
    }

    bindDefaultProductClick(productsInstance) {
        $("#default-product-list").on("click", ".view-product", (event) => {
            const productId = $(event.currentTarget).data("id");
            productsInstance.getSingleProduct(productId); 
        });
    }
    

    bindDefaultProductClick(productsInstance) {
        $("#default-product-list").on("click", ".view-product", async (event) => {
          const productId = $(event.currentTarget).data("id");
          const product = await productsInstance.fetchProductDetails(productId);
      
         
          $("#modal-product-image").attr("src", product.image);
          $("#modal-product-title").text(product.title);
          $("#modal-product-description").text(product.description);
          $("#modal-product-price").text(`$${product.price}`);
          $("#modal-product-quantity").val(1);
          $("#add-to-cart").data("product", product); 
      
          
          $("#productDetailModal").modal("show");
        });
      
       
        $("#decrease-quantity").on("click", () => {
          const qty = parseInt($("#modal-product-quantity").val());
          if (qty > 1) $("#modal-product-quantity").val(qty - 1);
        });
      
        $("#increase-quantity").on("click", () => {
          const qty = parseInt($("#modal-product-quantity").val());
          $("#modal-product-quantity").val(qty + 1);
        });
      
       
        $("#add-to-cart").on("click", () => {
          const product = $("#add-to-cart").data("product");
          const quantity = parseInt($("#modal-product-quantity").val());
      
          const cart = JSON.parse(localStorage.getItem("cart")) || [];
          const existingItem = cart.find((item) => item.id === product.id);
      
          if (existingItem) {
            existingItem.quantity += quantity;
          } else {
            cart.push({ ...product, quantity });
          }
      
          localStorage.setItem("cart", JSON.stringify(cart));
          $("#productDetailModal").modal("hide");
          alert("Product added to cart!");
          window.location.reload();
        });
      }
      

}

