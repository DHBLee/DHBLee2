
document.addEventListener('DOMContentLoaded', function() {

    const buttons = document.querySelectorAll('.header__menu, .header__close');
    const mobileNav = document.querySelector('.mobile_nav');

    const emailBtn = document.querySelector('.footer__btn');
    const input = document.querySelector('.footer__input');
    const errorMessage = document.querySelector('.footer__error-message');

    const testimonialsDesktop = document.querySelectorAll('.desk');
    const testimonialsDesktopSecond = document.querySelector('.desk_second');
    const testimonials = document.querySelector('.section3__wrapper2');
    const circles = document.querySelectorAll('.circle');
    let count = 1;
    let second = false;


    emailBtn.addEventListener('click', function() {
        const email = input.value.trim();
        if (!isValidEmail(email)) {
          input.classList.add('footer__invalid');
          errorMessage.textContent = "Please insert a valid email";
          errorMessage.style.display = 'block';
          input.focus(); // Focus on the input field
        } else {
          input.classList.remove('footer__invalid');
          errorMessage.style.display = 'none';
        }
    });

    testimonials.addEventListener('click', function() {
            toggleTestimonials(testimonials);
        
        });

    testimonialsDesktop.forEach(testi => {
        testi.addEventListener('click', function() {
            toggleTestimonials();
        })
    })

    testimonialsDesktopSecond.addEventListener('click', function() {
        toggleTestimonials();
    })

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('clicked1');
            toggleNavbar();
        })
    })


    function checkScreenSize() {
        if (window.matchMedia('(max-width: 767px)').matches) {
            console.log('768px or less');
            testimonialsDesktop.forEach(testi => {
                testi.style.display = 'none';
            });
        } else {
            console.log('greater than 768px');
            testimonialsDesktop.forEach(testi => {
                testi.style.display = 'flex';
            });
        }
    }
    

    checkScreenSize();

    window.addEventListener('resize', checkScreenSize);
    

    function toggleNavbar() {
        console.log('clicked');
        if(mobileNav.style.display === 'none' || '') {
            mobileNav.style.display = 'block';
            document.querySelector('.header__close').style.display = 'block';
            document.querySelector('.header__menu').style.display = 'none';
        } else {
            mobileNav.style.display = 'none';
            document.querySelector('.header__close').style.display = 'none';
            document.querySelector('.header__menu').style.display = 'block';
        }
    }

    function toggleTestimonials(testimonials) {
        if (window.matchMedia('(max-width: 768px)').matches) {

            testimonials.classList.add('slide-out');
    
            testimonials.addEventListener('animationend', function handler(e) {
                if (e.animationName === 'slideOut') {
    
                    if (count === 4) {
                        count = 0;
                    }
    
                    if (count === 0) {
                        testimonials.innerHTML = `
                        <img class="section3__img" src="./images/avatar-ali.png" alt="ali">
                        <span class="section3__subtitle">Ali Bravo</span>
                        <span class="section3__subsubtitle">
                          "We have been able to cancel so many other subscriptions since using Manage. There is no more cross-channel confusion and everyone is much more focused."
                        </span>
                        `;
                    } else if (count === 1) {
                        testimonials.innerHTML = `
                        <img class="section3__img" src="./images/avatar-richard.png" alt="richard">
                        <span class="section3__subtitle">Richard Watts</span>
                        <span class="section3__subsubtitle">
                            "Manage allows us to provide structure and process. It keeps us organized and focused. I can't stop recommending them to everyone I talk to!"
                        </span>
                        `;
                    } else if (count === 2) {
                        testimonials.innerHTML = `
                        <img class="section3__img" src="./images/avatar-shanai.png" alt="shanai">
                        <span class="section3__subtitle">Shanai Gough</span>
                        <span class="section3__subsubtitle">
                            "Their software allows us to track, manage and collaborate on our projects from anywhere. It keeps the whole team in-sync without being intrusive."
                        </span>
                        `;
                    } else if (count === 3) {
                        testimonials.innerHTML = `
                        <img class="section3__img" src="./images/avatar-anisha.png" alt="anisha">
                        <span class="section3__subtitle">Anisha Li</span>
                        <span class="section3__subsubtitle">
                            "Manage has supercharged our team's workflow. The ability to maintain visibility on larger milestones at all times keeps everyone motivated."
                        </span>
                        `;
                    }
    
                    updateActiveCircle(count);
                    count++;
    
                    testimonials.classList.remove('slide-out');
                    testimonials.classList.add('slide-in');
    
                    testimonials.removeEventListener('animationend', handler);
                }
            });
        } else {
            console.log('Desktop view: toggle testimonials');
    
            if (!second) {
                console.log('false');
                testimonialsDesktop.forEach(test => {
                    test.classList.remove('slide-in');
                    test.classList.add('slide-out');
                    test.style.display = 'none';
                });
    
                testimonialsDesktopSecond.classList.remove('slide-out');
                testimonialsDesktopSecond.classList.add('slide-in');
                testimonialsDesktopSecond.style.display = 'flex';
    
            } else {
                console.log('true');
                testimonialsDesktop.forEach(test => {
                    test.classList.remove('slide-out');
                    test.classList.add('slide-in');
                    test.style.display = 'flex';
                });
    
                testimonialsDesktopSecond.classList.add('slide-out');
                testimonialsDesktopSecond.classList.add('slide-out');
                testimonialsDesktopSecond.style.display = 'none'; 
    
            }
    
            second = !second;
        }
    }
    
    function updateActiveCircle(count) {

        circles.forEach(circle => circle.style.backgroundColor = 'transparent');

        circles[count].style.backgroundColor = 'hsl(12, 88%, 59%)';
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      }
});