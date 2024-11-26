document.addEventListener('DOMContentLoaded', function() {

    const images = [
        './images/image-product-1.jpg',
        './images/image-product-2.jpg',
        './images/image-product-3.jpg',
        './images/image-product-4.jpg',

    ]

    let currentIndex = 0;

    const productImage = document.querySelectorAll('.product_img');
    const nextBtn = document.querySelector('#next');
    const previousBtn = document.querySelector('#previous');
    const productThumbnail = document.querySelectorAll('.main_one_preview div');
    const preview = document.querySelector('.preview');
    const closePreview = document.querySelector('#close_preview');

    const menuBtn = document.querySelector('#menu');
    const closeBtn = document.querySelector('#close');
    const mobileNav = document.querySelector('.mobile_nav');

    const cartBtn = document.querySelector('.header_cart');
    const cartList = document.querySelector('.cart_info');

    const minusBtn = document.querySelector('#minus');
    const plusBtn = document.querySelector('#plus');
    const quantity = document.querySelectorAll('.quantity');
    const priceFinal = document.querySelector('#final_price');
    const price = document.querySelector('#unit_price');

    const addBtn = document.querySelector('.main_btn');
    const cartInfo = document.querySelector('#cart_info');
    const productInfo = document.querySelectorAll('.cart_details');
    const emptyDisplay = document.querySelector('#empty');
    const deleteBtn = document.querySelector('#delete');

    let quantityNum = 0;

    let value;
    buttons = [menuBtn, closeBtn, cartBtn];

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            toggleBtns(button);
        });
    });

    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % images.length;
        updateImage(currentIndex);
    });

    previousBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateImage(currentIndex);
    })

    minusBtn.addEventListener('click', function() {
        if(quantityNum === 0) {
            return
        } else {
            quantityNum--;
        }

        quantity.forEach(quan => {
            quan.innerHTML = quantityNum;    
        })

        updatePrice(quantityNum)
    })

    plusBtn.addEventListener('click', function() {
        quantityNum++;
    

        quantity.forEach(quan => {
            quan.innerHTML = quantityNum;    
        })

        updatePrice(quantityNum);
    })

    addBtn.addEventListener('click', function() {
        if(quantityNum != 0) {
            addToCart();
        } else {
            return;
        }
    })

    deleteBtn.addEventListener('click', function() {
        deleteFromCart();
    })

    productThumbnail.forEach(thumbnailContainer => {
        
        thumbnailContainer.addEventListener('click', function() {
            const thumbnail = thumbnailContainer.querySelector('img');

            productImage.forEach(product => {
                product.src = thumbnail.src.replace('-thumbnail', '');

            })

            productThumbnail.forEach(div => {
                div.removeAttribute('id');
            });
    
            // Add the border id to the clicked thumbnail's container
            thumbnailContainer.setAttribute('id', 'border')
        });
    });

    productImage.forEach(product => {
            product.addEventListener('click', function() {
            document.body.classList.toggle('open');
            preview.style.display = 'flex';
        });

    });

    closePreview.addEventListener('click', function() {
        document.body.classList.toggle('open');
        preview.style.display = 'none';
    });


    function toggleBtns(button) {

        if(button === menuBtn || button === closeBtn) {
            document.body.classList.toggle('open');

            value = mobileNav;
        } else {
            value = cartList;
        }
    
        if(value.style.display === 'none' || '') {
            value.style.display = 'flex';
        } else {
            value.style.display = 'none';
        }
    }

    function updateImage(index) {
        productImage.forEach(product => {
            product.src = images[index];
        })
    }

    function updatePrice(quantity) {
        const unitPriceText = price.textContent;
        const unitPrice = parseFloat(unitPriceText.replace('$', '').trim());
        priceFinal.innerHTML = `$${(quantity * unitPrice).toFixed(2)}`; 
    }

    function addToCart() {
        cartInfo.style.display = 'block';

        productInfo.forEach(info => {
            info.style.display = 'flex';
        })
        emptyDisplay.style.display = 'none';

    }

    function deleteFromCart() {
        cartInfo.style.display = 'none';
        productInfo.forEach(info => {
            info.style.display = 'none';
        })
        emptyDisplay.style.display = 'block';
    }
})









