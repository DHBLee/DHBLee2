
document.addEventListener('DOMContentLoaded', function() {

    const buttons = document.querySelectorAll('.menu, .close');
    const mobileNav = document.querySelector('.mobile_nav');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('clicked1');
            toggleNavbar();
        })
    })
    

    function toggleNavbar() {
        console.log('clicked');
        if(mobileNav.style.display === 'none' || '') {
            mobileNav.style.display = 'block';
            document.querySelector('.close').style.display = 'block';
            document.querySelector('.menu').style.display = 'none';
            document.querySelector('.phones').style.display = 'none';
        } else {
            mobileNav.style.display = 'none';
            document.querySelector('.close').style.display = 'none';
            document.querySelector('.menu').style.display = 'block';
            document.querySelector('.phones').style.display = 'block';
        }
    }
    
});