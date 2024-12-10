export class Cart {
    constructor() {
        this.cartItemsElement = $("#cartItems");
        this.totalPriceElement = $("#totalPrice");
        
    }

    loadCart() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        this.cartItemsElement.empty(); 
        let total = 0;
    
        if (cart.length === 0) {
            this.cartItemsElement.append(`<p>Your cart is empty.</p>`);
        } else {
            cart.forEach((item, index) => {
                const itemTotal = parseFloat(item.price) * item.quantity;
                total += itemTotal;
                this.cartItemsElement.append(`
                    <div>
          <img src="${item.image}" alt="${item.title}" class="cart-item-image">
          <p>${item.title} - $${item.price} x ${item.quantity}</p>
          <div class="d-flex align-items-center">
            <button class="btn btn-sm btn-secondary decrease-cart-quantity" data-index="${index}">-</button>
            <input type="number" value="${item.quantity}" min="1" class="form-control w-25 mx-2 cart-item-quantity" data-index="${index}">
            <button class="btn btn-sm btn-secondary increase-cart-quantity" data-index="${index}">+</button>
          </div>
          <button class="remove-item btn btn-danger btn-sm" data-index="${index}">Remove</button>
        </div>
                `);
            });
        }
    
        this.totalPriceElement.text(`$${total.toFixed(2)}`);

        this.updateCartCount();

        $(".decrease-cart-quantity").on("click", (event) => {
            const index = $(event.currentTarget).data("index");
            cart[index].quantity = Math.max(1, cart[index].quantity - 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            this.loadCart();
          });
        
          $(".increase-cart-quantity").on("click", (event) => {
            const index = $(event.currentTarget).data("index");
            cart[index].quantity++;
            localStorage.setItem("cart", JSON.stringify(cart));
            this.loadCart();
          });
    }
    

    removeItem(index) {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        this.loadCart();
    }

    // bindRemoveItem() {
        
    //     $(document).on("click", ".remove-item", (event) => {
    //         const index = $(event.currentTarget).data("index");
    //         this.removeItem(index);
    //     });
    // }

    updateCartCount() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0); 
        $("#cartCount").text(totalCount); 
        
    }


    
}


export const cart = new Cart();
