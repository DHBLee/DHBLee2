document.addEventListener('DOMContentLoaded', function() {

    const createInput = document.getElementById('create');
    const container = document.querySelector('.two_three');
    const desktopIndicators = document.querySelector('.desktop_indicators');

    let currentItems;
    let visibleTags = getVisibleTags();

    let numberOfItems = 0;

    const clearCompleted = document.querySelectorAll('.clear_completed');

    const themes = document.querySelectorAll('#moon, #sun');
    let imageLight;
    let imageDark;
    let imageTheme = 'sun';


    checkScreenSize();


    window.addEventListener('resize', checkScreenSize);

    createInput.addEventListener('keydown', function(event) {
        if(event.key === 'Enter') {
            const userInput = createInput.value.trim();
            if (userInput) {
                addItem(userInput);

                createInput.value = '';
            } else {
                console.log('Input is empty');
            }
        }
    })

    document.querySelectorAll('.items').forEach(item => {
        if (getComputedStyle(item).display !== 'none') {
            currentItems = item;
        }
    });

    themes.forEach(theme => {
        theme.addEventListener('click', function() {


            if(theme.id === 'moon') {
                theme.style.display = 'none';
                themes[1].style.display = 'block';
                document.body.classList.add('dark_theme');

                imageDark.style.display = 'block';
                imageLight.style.display = 'none';
                imageTheme = 'moon';


            } else if(theme.id === 'sun') {
                theme.style.display = 'none';
                themes[0].style.display = 'block';
                document.body.classList.remove('dark_theme');

                imageDark.style.display = 'none';
                imageLight.style.display = 'block';
                imageTheme = 'sun';
            } else {
                return
            }
        });
    });

    visibleTags.forEach(tag => {
        tag.addEventListener('click', function(event) {
            event.preventDefault();
            visibleTags.forEach(tag => tag.classList.remove('blue'));

            tag.classList.add('blue');
            const listDescription = getListDescription();

            switch(tag.classList[0]) {
                case 'all':
                    numberOfItems = 0;
                    listDescription.forEach(list => { 
                        if(list && list.classList.contains('active')) {
                            numberOfItems++
                        };
                        list.style.display = 'flex';
                    });

                    currentItems.textContent = numberOfItems;

                    break;
                case 'active':
                    numberOfItems = 0;
                    listDescription.forEach(list => {
                        if (list.classList.contains('active')) {
                            list.style.display = 'flex';
                            numberOfItems++
                        } else {
                            list.style.display = 'none';
                        }
                    });

                    currentItems.textContent = numberOfItems;
                
                    break;
                case 'completed':
                    numberOfItems = 0;
                    listDescription.forEach(list => {
                        if (list.classList.contains('completed')) {
                            list.style.display = 'flex';
                        } else {
                            numberOfItems++;
                            list.style.display = 'none';
                        }
                    });

                    currentItems.textContent = numberOfItems;

                    break;
                default:
                    
            }
        });
    });




    clearCompleted.forEach(clear => {

        clear.addEventListener('click', function(event) {
            event.preventDefault();
            const listDescription = getListDescription();
            listDescription.forEach(list => {
                if(list.classList.contains('completed')) {
                    list.remove();
                }
            });
        })
    });


    function updateDescription(list, circle) {
        const colorOfBorder = circle.querySelector('.circle');
        const colorOfCircle = circle.querySelector('.image_container');
        const displayOfCheck = circle.querySelector('.image');

        if(list.classList.contains('active')) {

            colorOfBorder.classList.add('completed_color_of_border');
            colorOfCircle.classList.add('completed_color_of_circle');
            numberOfItems--;

            list.classList.remove('active');
            list.classList.add('completed');

            displayOfCheck.style.display = 'block';
        } else {

            colorOfBorder.classList.remove('completed_color_of_border');
            colorOfCircle.classList.remove('completed_color_of_circle');

            numberOfItems++;

            list.classList.remove('completed');
            list.classList.add('active');

            displayOfCheck.style.display = 'none';
        }

        currentItems.textContent = numberOfItems;
    }

    function initializeAlphaDiv() {
        const listDescription = getListDescription();

        listDescription.forEach(list => {
            if (!list.dataset.initialized) {
                list.dataset.initialized = true;
            
                list.addEventListener('click', function() {
                    
                    const circle = list.querySelector('.relative');
                    updateDescription(list, circle);
                })
        
                const close = list.querySelector('.close');
        
                close.addEventListener('click', function(event) {
                    event.stopPropagation();
                    if(list.classList.contains('active')) {
                        numberOfItems--;
                    }
                    list.remove();
                    currentItems.textContent = numberOfItems;
                });
            }
        });
    }; 

    function updateItems() {
        numberOfItems = 0;
        const listDescription = getListDescription();
        listDescription.forEach(item => {
            if (item.classList.contains('active')) {
                numberOfItems++;
            }
        })

        currentItems.textContent = numberOfItems;
    }

function addItem(item) {
    const alphaDiv = document.createElement('div');
    alphaDiv.classList.add('alpha', 'active');
    

    alphaDiv.id = 'alpha-' + Date.now(); 

    alphaDiv.setAttribute('draggable', 'true');

    alphaDiv.innerHTML = `
        <div class="two_inputs">
            <div class="two_description">
                <div class="relative" style="relative">
                    <div class="circle"></div>
                    <div class="image_container">
                        <img class="image" src="./images/icon-check.svg" alt="check">
                    </div>
                </div>
                <span id="input">${item}</span>
            </div>
            <a href="#"><img class="close" src="./images/icon-cross.svg" alt="close"></a>
        </div>
        <hr>
    `;

    container.insertBefore(alphaDiv, desktopIndicators);
    updateItems();
    initializeAlphaDiv();

    alphaDiv.addEventListener('dragstart', handleDragStart);
    alphaDiv.addEventListener('dragover', handleDragOver);
    alphaDiv.addEventListener('drop', handleDrop);
}

function handleDragStart(event) {

    event.dataTransfer.setData('text', event.target.id);
    event.target.classList.add('dragging');
}

function handleDragOver(event) {
    event.preventDefault(); 
}

function handleDrop(event) {
    event.preventDefault();

    const draggedElementId = event.dataTransfer.getData('text');
    const draggedElement = document.getElementById(draggedElementId);

    const targetElement = event.target.closest('.alpha'); 

    if (draggedElement !== targetElement) {
        const parent = draggedElement.parentNode;


        const targetRect = targetElement.getBoundingClientRect();
        

        if (event.clientY < targetRect.top + targetRect.height / 2) {

            parent.insertBefore(draggedElement, targetElement);
        } else {
            parent.insertBefore(draggedElement, targetElement.nextElementSibling);
        }

        draggedElement.classList.remove('dragging');
    }
}


    function getListDescription() {
        return document.querySelectorAll('.alpha');
    }

    function getVisibleTags() {
        const allTags = document.querySelectorAll('.all, .active, .completed');
        const visibleTags = Array.from(allTags).filter(tag => {
            return getComputedStyle(tag).display !== 'none';
        });
        return visibleTags;
    }

    function checkScreenSize() {
        if(window.matchMedia('(max-width: 768px)').matches) {
            imageLight = document.querySelector('.mobile.light');
            imageDark = document.querySelector('.mobile.dark');

            document.querySelector('.desktop.light').style.display = 'none';
            document.querySelector('.desktop.dark').style.display = 'none';

        } else {
            imageLight = document.querySelector('.desktop.light');
            imageDark = document.querySelector('.desktop.dark');

            document.querySelector('.mobile.light').style.display = 'none';
            document.querySelector('.mobile.dark').style.display = 'none';

        }

        if(imageTheme === 'moon') {
            imageDark.style.display = 'block';
        } else if (imageTheme === 'sun') {
            imageLight.style.display = 'block';
        }
    }

})