export class Cart {
    constructor() {
        this.cartItemsElement = $("#cartItems");
        this.totalPriceElement = $("#totalPrice");
    }

    loadCart() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        this.cartItemsElement.empty(); // Clear previous cart items
        let total = 0;
    
        if (cart.length === 0) {
            this.cartItemsElement.append(`<p>Your cart is empty.</p>`);
        } else {
            cart.forEach((item, index) => {
                total += parseFloat(item.price);
                this.cartItemsElement.append(`
                    <div>
                        <img src="${item.image}" alt="${item.title}" class="cart-item-image">
                        <p>${item.title} - $${item.price}</p>
                        <button class="remove-item btn btn-danger btn-sm" data-index="${index}">
                            Remove
                        </button>
                    </div>
                `);
            });
        }
    
        this.totalPriceElement.text(`$${total.toFixed(2)}`);
    }
    

    removeItem(index) {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        this.loadCart();
    }

    bindRemoveItem() {
        
        $(document).on("click", ".remove-item", (event) => {
            const index = $(event.currentTarget).data("index");
            this.removeItem(index);
        });
    }
}


export const cart = new Cart();
