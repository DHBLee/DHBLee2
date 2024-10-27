document.addEventListener('DOMContentLoaded', function() {
    const headerBtn = document.querySelector('.header__bars');
    let mobileNav = document.querySelector('.mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-nav__link');

    let isMobileNavOpen = false;

    headerBtn.addEventListener('click', () => {
        isMobileNavOpen = !isMobileNavOpen;
        if (isMobileNavOpen) {
            mobileNav.style.display =  'flex';
            document.body.style.overflowY = 'hidden';
        } else {
            mobileNav.style.display =  'none';
            document.body.style.overflowY = 'auto';
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            isMobileNavOpen = false;
            mobileNav.style.display = 'none';
            document.body.style.overflowY = 'auto';
             
        });
    })

    const themeToggleBtns = document.querySelectorAll('#theme-toggle');

    const theme = localStorage.getItem('theme');


    theme && document.body.classList.add(theme);

    const handleThemeToggle = () => {
        document.body.classList.toggle('light-mode');
        if (document.body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light-mode'); 
        } else {
            localStorage.removeItem('theme'); 
        }
    }

    themeToggleBtns.forEach(btn => 
        btn.addEventListener('click', handleThemeToggle)
    );
})

