document.addEventListener('DOMContentLoaded', () => {
    const AddToCart = document.querySelectorAll(".add_to_cart");
    const emptyPic = document.querySelector(".empty_pic");
    const Basic = document.querySelector(".basic_info");
    const ConfirmationButton = document.querySelector(".confirmation_button");
    const CarbonNeutral = document.querySelector(".carbon_neutral");
    const CartSection = document.querySelector('.cart_section');
    const orderTotal = document.querySelector('.order_total');
    const carts = document.querySelector('.cart');
    const PopUp=document.querySelector('.popup');
    const Items = [
        { name: "Pistachio Balava", price: 150 },
        { name: "Salted Caramel Brownie", price: 300 },
        { name: "Red Velvet Cake", price: 350 },
        { name: "Macron mix of Five", price: 200 },
        { name: "Vanilla Creme", price: 150 },
        { name: "Lemon Meringue Pie", price: 150 },
        { name: "Vanilla Panacotta", price: 270 },
        { name: "Waffle With Berries", price: 180 },
        { name: "Lemon PannaCotta", price: 150 }
    ];

    let totalCartAmount = 0; // Initialize total amount
    let totalItemCount = 0; // Initialize item count

    function updateCartTotal() {
        orderTotal.innerHTML = `<p class="order">Total</p><p class="sum">Rs. ${totalCartAmount.toFixed(2)}</p>`;
    }

    function updateCartCount() {
        carts.innerHTML = `Your Cart (${totalItemCount})`;
    }

    function updateItemTotals() {
        totalCartAmount = 0; // Reset total amount
        totalItemCount = 0; // Reset item count

        // Iterate through all items and recalculate total
        document.querySelectorAll('.selected_food_item').forEach(item => {
            const quantity = parseInt(item.querySelector('.quantity').textContent, 10);
            const price = parseFloat(item.querySelector('.price_selected').textContent.replace('Rs. ', ''));
            totalCartAmount += quantity * price;
            totalItemCount += quantity;
        });

        updateCartTotal();
        updateCartCount();
    }

    AddToCart.forEach((cart, index) => {
        let hasBeenClicked = false; // Flag to track if the button has been clicked

        cart.addEventListener('click', () => {
            if (!hasBeenClicked) { // Check if the button has not been clicked yet
                hasBeenClicked = true; // Set the flag to true

                let quantity = 1; // Initial quantity
                const item = Items[index]; // Get the item based on index

                // Adding CSS classes
                cart.classList.add('change_on_click');
                emptyPic.classList.add('pic');
                Basic.classList.add('basic');
                ConfirmationButton.classList.add('button');
                CarbonNeutral.classList.add('carbon');

                // Create and configure the SelectedFoodItem element
                const SelectedFoodItem = document.createElement('div');
                SelectedFoodItem.classList.add('selected_food_item');

                
                // Create the inner HTML for the SelectedFoodItem
                SelectedFoodItem.innerHTML = `
                    <p class="food">${item.name}</p>
                    <p class="quantity_price">
                        <span class="quantity">${quantity}</span>
                        <span class="price_selected">Rs. ${item.price}</span>
                        <svg class="close_icon" xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10">
                            <path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/>
                        </svg>
                    </p>`;

                // Append increment and decrement buttons to the SelectedFoodItem
                const increment=cart.querySelector('.increment')
                    const decrement=cart.querySelector('.decrement')
        
        
                    
        
                    // Increment button functionality
                    increment.addEventListener('click', () => {
                        quantity++;
                        const totalAmount = quantity * item.price;
                        SelectedFoodItem.querySelector('.quantity').textContent = quantity;
                        updateItemTotals();
                    });
        
                    // Decrement button functionality
                    decrement.addEventListener('click', () => {
                        if (quantity > 1) {
                            quantity--;
                            const totalAmount = quantity * item.price;
                            SelectedFoodItem.querySelector('.quantity').textContent = quantity;
                            updateItemTotals();
                        }
                    });

                // To remove the selected item
                SelectedFoodItem.querySelector('.close_icon').addEventListener('click', () => {
                    CartSection.removeChild(SelectedFoodItem);
                    updateItemTotals();
                    hasBeenClicked = false; // Reset the flag to allow adding again
                    cart.classList.remove('change_on_click');
                    ConfirmationButton.classList.remove('button');
                });

                // Append the SelectedFoodItem to the CartSection
                CartSection.append(SelectedFoodItem);

                // Check if CarbonNeutral and ConfirmationButton already exist
                if (!document.querySelector('.carbon_neutral')) {
                    const carbonNeutralDiv = document.createElement('div');
                    carbonNeutralDiv.classList.add('carbon_neutral');
                    carbonNeutralDiv.textContent = 'Carbon Neutral';
                    CartSection.append(carbonNeutralDiv);
                }

                if (!document.querySelector('.confirmation_button')) {
                    const confirmationButtonDiv = document.createElement('div');
                    confirmationButtonDiv.classList.add('confirmation_button');
                    confirmationButtonDiv.textContent = 'Confirm';
                    CartSection.append(confirmationButtonDiv);
                }

                // Initial cart update
                updateItemTotals();

                // To show the order confirmation Popup
                ConfirmationButton.addEventListener('click', () => {
                    // Confirmation logic here
                    PopUp.classList.add('popup_open')
                    const FinalOrdrerList=document.createElement('div')
                    FinalOrdrerList.classList.add('final_order_list')
                    FinalOrdrerList.innerHTML=`<p class="food">${item.name}</p>
                    <p class="quantity_price">
                        <span class="quantity">${quantity}</span>
                        <span class="price_selected">Rs. ${item.price}</span></p>`
                    PopUp.append(FinalOrdrerList)
                    
                });
                const startNewOrderButton = document.querySelector('.start_new_order');
                if (startNewOrderButton) {
                    startNewOrderButton.addEventListener('click', () => {
                        window.location.reload(); // Reload the page
                    });
                }
            }
        });
    });
});