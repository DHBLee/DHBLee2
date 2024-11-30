
document.addEventListener('DOMContentLoaded', function() {

    const buttons = document.querySelectorAll('.header__menu, .header__close');
    const mobileNav = document.querySelector('.mobile_nav');

    const testimonials = document.querySelector('.section3__wrapper2');
    const circles = document.querySelectorAll('.circle');
    let count = 1;
    testimonials.addEventListener('click', function() {
        toggleTestimonials(testimonials);
    
    })

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
            document.querySelector('.header__close').style.display = 'block';
            document.querySelector('.header__menu').style.display = 'none';
        } else {
            mobileNav.style.display = 'none';
            document.querySelector('.header__close').style.display = 'none';
            document.querySelector('.header__menu').style.display = 'block';
        }
    }

    function toggleTestimonials(testimonials) {

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


                } else if(count === 1) {
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
    }
    
    function updateActiveCircle(count) {

        circles.forEach(circle => circle.style.backgroundColor = 'transparent');

        circles[count].style.backgroundColor = 'hsl(12, 88%, 59%)';
    }
});