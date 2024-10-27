document.addEventListener('DOMContentLoaded', function () {
    const Btns = document.querySelectorAll('.btn');
    let allItems = 0; // Track total number of items in the cart
    let totalPrice = 0;
    const itemsAll = document.querySelector('.all_products');
    const itemTotal = document.querySelector('.cart__itemstotal');
    const Totalitem = document.querySelector('.shopping__itemstotal');
    
    const cartItemsMap = new Map(); 
    const shoppingItemsMap = new Map();// Store cart items by product title
    let cartIsDisplay = true;

    Btns.forEach(link => {
        link.addEventListener('click', () => {
            const btnPressed = link.nextElementSibling;

            
            document.querySelector('.cart__img').style.display = 'none';
            document.querySelector('.cart__info').style.display = 'none';
            document.querySelector('.cart__hidden').style.display = 'block';
            
            cartIsDisplay = false;

            if (btnPressed && btnPressed.classList.contains('pressed')) {
                // Product is being added to the cart
                if (!cartIsDisplay) {
                    btnPressed.style.display = 'flex';
                    link.style.display = 'none';
                } else {
                    btnPressed.style.display = 'none';
                    link.style.display = 'flex';
                }

                // Get product info
                const productTitle = link.getAttribute('data-title').trim();
                const unitCost = parseFloat(link.getAttribute('data-price'));
                const productImage = link.getAttribute('data-image');
                const quantityElement = btnPressed.querySelector('.pressed__quantity');

                const firstWord = productTitle.split(" ")[0];
                let mobileImage, desktopImage
                if (firstWord == 'Vanilla') {
                    console.log('gumana');
                    const secondWord = productTitle.split(" ")[1];
                    console.log(secondWord);
                    mobileImage = document.querySelector(`.images_mobile.${secondWord}`);
                    desktopImage = document.querySelector(`.images_desktop.${secondWord}`);
                } else {
                    mobileImage = document.querySelector(`.images_mobile.${firstWord}`);
                    desktopImage = document.querySelector(`.images_desktop.${firstWord}`);
                }
                console.log(firstWord)

            // Select the corresponding image based on the first word


                console.log(mobileImage);
                console.log(desktopImage);
                mobileImage.style.borderWidth = '5px';
                desktopImage.style.borderWidth = '5px';

                mobileImage.style.borderColor = 'red';
                desktopImage.style.borderColor = 'red';
                // Check if product is already in cart
                let currentQuantity = 1;

                if (cartItemsMap.has(productTitle)) {
                    const cartItem = cartItemsMap.get(productTitle);
                    currentQuantity = parseInt(cartItem.querySelector('.cart__quantity').textContent) || 1;
                }

                // Create a new cart item if it doesn't exist
                if (!cartItemsMap.has(productTitle)) {
                    const { cartItem, shoppingItem } = createCartItem(currentQuantity, productTitle, unitCost, productImage, mobileImage, desktopImage);
                    const cartContainer = document.querySelector('.cart__after');
                    const shoppingContainer = document.querySelector('.shopping-cart__empty');
                    shoppingContainer.appendChild(shoppingItem)
                    cartContainer.appendChild(cartItem);
                    cartItemsMap.set(productTitle, cartItem);
                    shoppingItemsMap.set(productTitle, shoppingItem); // Store reference to the cart item
                }

                allItems += currentQuantity; // Add the initial quantity to allItems
                totalPrice += (currentQuantity * unitCost);
                itemsAll.textContent = allItems;
                itemTotal.textContent = `$${totalPrice.toFixed(2)}`;
                Totalitem.textContent = `$${totalPrice.toFixed(2)}`;
                quantityElement.textContent = currentQuantity;

                // Remove any existing event listeners before adding new ones
                if (btnPressed.dataset.listenersAdded) {
                    removeButtonListeners(btnPressed);
                }

                // Add event listeners for the plus and minus buttons
                const plusBtn = btnPressed.querySelector('.pressed_plus');
                const minusBtn = btnPressed.querySelector('.pressed__minus');

                // Remove existing listeners, if any, to prevent multiple firings
                plusBtn.removeEventListener('click', handlePlusClick);
                minusBtn.removeEventListener('click', handleMinusClick);

                // Add the event listeners
                plusBtn.addEventListener('click', handlePlusClick);
                minusBtn.addEventListener('click', handleMinusClick);

                // Mark that listeners have been added
                btnPressed.dataset.listenersAdded = 'true';

                // Define the click event handler functions here
                function handlePlusClick(event) {
                    event.preventDefault();
                    currentQuantity++;
                    allItems++;
                    totalPrice += unitCost; // Increment total cart items

                    itemsAll.textContent = allItems;
                    itemTotal.textContent = `$${totalPrice.toFixed(2)}`;
                    Totalitem.textContent = `$${totalPrice.toFixed(2)}`;
                    quantityElement.textContent = currentQuantity;

                    const cartItem = cartItemsMap.get(productTitle);
                    const shoppingItem = shoppingItemsMap.get(productTitle);
                    updateCartItem(cartItem, shoppingItem, currentQuantity);
                }

                function handleMinusClick(event) {
                    event.preventDefault();
                    if (currentQuantity > 1) {
                        currentQuantity--;
                        allItems--; // Decrement total cart items
                        totalPrice -= unitCost;
                    }

                    itemsAll.textContent = allItems;
                    itemTotal.textContent = `$${totalPrice.toFixed(2)}`;
                    Totalitem.textContent = `$${totalPrice.toFixed(2)}`;
                    quantityElement.textContent = currentQuantity;

                    const cartItem = cartItemsMap.get(productTitle);
                    const shoppingItem = shoppingItemsMap.get(productTitle);
                    updateCartItem(cartItem, shoppingItem, currentQuantity);
                }
            } else {
                console.log('Hindi Gumana');
            }
        });
    });

    function createCartItem(quantity, title, unitCost, image, mobile, desktop) {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart__item';

        const detailsDiv = document.createElement('div');
        detailsDiv.className = 'cart__details';
        detailsDiv.innerHTML = `
            <span class="cart__title">${title}</span>
            <div>
                <span class="cart__quantity">${quantity}x</span>
                <span class="cart__unitcost" data-unitcost="${unitCost.toFixed(2)}">@$${unitCost.toFixed(2)}</span>
                <span class="cart__totalcost" data-totalcost="${(quantity * unitCost).toFixed(2)}">$${(quantity * unitCost).toFixed(2)}</span>
            </div>
        `;

        const additionalInfoDiv = document.createElement('button');
        additionalInfoDiv.className = 'cart__btn';
        additionalInfoDiv.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" class="cart__cancel" width="10" height="10" fill="none" viewBox="0 0 10 10">
                <path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/>
            </svg>
        `;

        const horizontalLine = document.createElement('hr');

        cartItem.appendChild(detailsDiv);
        cartItem.appendChild(additionalInfoDiv);
        cartItem.appendChild(horizontalLine);


        const shoppingItem = document.createElement('div');
        shoppingItem.className = 'shopping-cart__item';


        const IshoppingItem = document.createElement('div');
        IshoppingItem.className = 'shopping-cart__details';
        IshoppingItem.innerHTML = `
            <img src="assets/images/image-${image}-thumbnail.jpg" alt="Baklava" class="shopping-cart__image">
            <div class="shopping-cart__details-info">
                <span class="shopping-cart__title">${title}</span>
                <div class="shopping-cart__price-info">
                    <span class="shopping-cart__quantity">${quantity}x</span>
                    <span class="shopping-cart__unitcost"  data-unitcost="${unitCost.toFixed(2)}">@$${unitCost.toFixed(2)}</span>
                </div>
            </div>
        `;

        const additionalShoppingDiv = document.createElement('div');
        additionalShoppingDiv.className = 'shopping-cart__btn-container';
        additionalShoppingDiv.innerHTML = `
            <span class="shopping-cart__totalcost" data-totalcost="${(quantity * unitCost).toFixed(2)}">$${(quantity * unitCost).toFixed(2)}</span>
        `;

        shoppingItem.appendChild(IshoppingItem);
        shoppingItem.appendChild(additionalShoppingDiv);

        additionalInfoDiv.addEventListener('click', () => {
            const quantityElement = cartItem.querySelector('.cart__quantity');
            const currentQuantity = parseInt(quantityElement.textContent) || 0;
            cartItem.remove();
            shoppingItem.remove();

            const btnPressed = document.querySelector(`.pressed[data-title="${title}"]`);
            const btn = document.querySelector(`.btn[data-title="${title}"]`);
            const pressedQuantity = document.querySelector(`.pressed__quantity[data-title="${title}"]`);
            if (btnPressed) {
                console.log("it works, yehey")
                btnPressed.style.display = 'none';
                btn.style.display = 'flex';
                pressedQuantity.textContent = '';
                mobile.style.borderWidth = '1px';
                mobile.style.borderWidth = 'black';
                desktop.style.borderWidth = '1px';
                desktop.style.borderWidth = 'black';
            }

            cartIsDisplay = true;
            console.log(`${title} removed from the cart.`);

            allItems -= currentQuantity; // Decrement total items by the quantity removed
            totalPrice -= (currentQuantity * parseFloat(detailsDiv.querySelector('.cart__unitcost').dataset.unitcost)); // Decrement total price
            itemTotal.textContent = `$${totalPrice.toFixed(2)}`;
            itemsAll.textContent = `$${allItems.toFixed(2)}`;
            Totalitem.textContent = `$${totalPrice.toFixed(2)}`;
            cartItemsMap.delete(title); 
            shoppingItemsMap.delete(title);// Remove from the map

            btnPressed.dataset.listenersAdded = '';

            if (cartItemsMap.size === 0) {
                location.reload();
                document.querySelector('.cart__img').style.display = 'block';
                document.querySelector('.cart__info').style.display = 'block';
                allItems = 0;
                totalPrice = 0;
                itemsAll.textContent = allItems;
                itemTotal.textContent = `$${totalPrice.toFixed(2)}`;
                Totalitem.textContent = `$${totalPrice.toFixed(2)}`;
            }
        });

        return { cartItem, shoppingItem };
    }

    function updateCartItem(cartItem, shoppingItem, quantity) {
        const quantityElement = cartItem.querySelector('.cart__quantity');
        const unitCostElement = cartItem.querySelector('.cart__unitcost');
        const totalCostElement = cartItem.querySelector('.cart__totalcost');

        const sQuantityElement = shoppingItem.querySelector('.shopping-cart__quantity');
        const sUnitCostElement = shoppingItem.querySelector('.shopping-cart__unitcost');
        const sTotalCostElement = shoppingItem.querySelector('.shopping-cart__totalcost');


        const unitCost = parseFloat(unitCostElement.getAttribute('data-unitcost'));
        quantityElement.textContent = `${quantity}x`;
        totalCostElement.textContent = `$${(quantity * unitCost).toFixed(2)}`;

        const sUnitCost = parseFloat(sUnitCostElement.getAttribute('data-unitcost'));
        sQuantityElement.textContent = `${quantity}x`;
        sTotalCostElement.textContent = `$${(quantity * unitCost).toFixed(2)}`;
        
        console.log(sTotalCostElement);

    }

    // Remove all listeners on an element by creating a new element
    function removeButtonListeners(btnPressed) {
        const newBtnPressed = btnPressed.cloneNode(true);  // Create a clone of the node
        btnPressed.parentNode.replaceChild(newBtnPressed, btnPressed);  // Replace the old node
    }

    document.querySelector('.cart__confirm').addEventListener('click', () => {

        document.querySelector('.shopping__confirm').style.display = 'flex';
        const container = document.querySelector('.container');

        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        overlay.style.content = ""; // This line is not necessary in JavaScript
        overlay.style.position = 'absolute';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '115%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // Semi-transparent overlay
        overlay.style.zIndex = '0'; // Place behind other content

        document.body.style.overflow = 'hidden';
        // Append the overlay to the container
        container.appendChild(overlay);

        document.querySelector('.shopping__confirm').scrollIntoView({
            behavior: 'smooth',
            block: 'center'  // Centers it in the viewport
        });
    })

    

    document.querySelector('.shopping-cart__btn').addEventListener('click', () => {
        const container = document.querySelector('.container');
        document.querySelector('.shopping__confirm').style.display = 'none';
        document.body.style.overflow = '';

        const overlay = container.querySelector('.overlay');
        if (overlay) {
            container.removeChild(overlay);
        }

        location.reload();
    })
});
