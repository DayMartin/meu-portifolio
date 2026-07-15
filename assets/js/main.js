/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close'),
    headerEl = document.getElementById('header')

/*=============== MENU SHOW ===============*/
/* Validate if constant exists */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
        if (headerEl) headerEl.style.pointerEvents = 'auto'
    })
}

/*=============== MENU HIDDEN ===============*/
/* Validate if constant exists */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
        if (headerEl) headerEl.style.pointerEvents = 'none'
    })
}


/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () => {
    const navMenu = document.getElementById('nav-menu')
    //When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
    if (headerEl) headerEl.style.pointerEvents = 'none'
}
navLink.forEach(n => {
    n.addEventListener('click', linkAction)
})

/*=============== CHANGE BACKGROUND HEADER ===============*/

/*=============== SWIPER PROJECTS ===============*/

if (typeof Swiper !== 'undefined') {
    let swiperProjects = new Swiper(".projects__container", {
        loop: true,
        spaceBetween: 24,

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
        },
        breakpoints: {
            1200: {
                slidesPerView: 2,
                spaceBetween: -56,
            },
        },
    });

    /*=============== SWIPER TESTIMONIAL ===============*/
    let swiperTestimonial = new Swiper(".testimonial__container", {
        grabCursor: true,

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
}

/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById('contact-form'),
    contactName = document.getElementById('contact-name'),
    contactEmail = document.getElementById('contact-email'),
    contactProject = document.getElementById('contact-project'),
    contactMessage = document.getElementById('contact-message')

const getTranslation = (text) => {
    const lang = localStorage.getItem('selected-lang') || 'pt';
    if (lang === 'en' && typeof translationDict !== 'undefined' && translationDict[text]) {
        return translationDict[text];
    }
    return text;
};

const sendEmail = (e) => {
    e.preventDefault()

    // Check if the fiel has a value
    if (contactName.value === '' || contactEmail.value === '' || contactProject.value === '') {
        // Add and remove color
        contactMessage.classList.remove('color-blue')
        contactMessage.classList.add('color-red')

        // Show message
        contactMessage.textContent = getTranslation('Escreva algo na caixa 📤')
    }else{
        // serviceID - templateID - #form - publicKey
        emailjs.sendForm('service_un4v70a','template_uif4xtc', '#contact-form','v-_82sEU-EFYnh2Kr')
            .then(() =>{
                // Show message and add color 
                contactMessage.classList.add('color-blue')
                contactMessage.textContent = getTranslation('Menssagem enviada, entraremos em contato em breve ✅')

                // Remove message after five seconds
                setTimeout(() =>{
                    contactMessage.textContent = ''
                }, 5000)
            
            }, (error) =>{
                alert('OOPS! SOMETHING HAS FAILED...', error)
            })
         // To clear the input field
         contactName.value = ''
         contactEmail.value = ''
         contactProject.value = ''
    }
}
if (contactForm) {
    contactForm.addEventListener('submit', sendEmail)
}

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/

const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 58
        const sectionId = current.getAttribute('id')
        const sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

        if (sectionsClass) {
            if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
                sectionsClass.classList.add('active-link')
            }else{
                sectionsClass.classList.remove('active-link')
            }
        }

    })
}
window.addEventListener('scroll', scrollActive)

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () =>{
    const scrollUpEl = document.getElementById('scroll-up')
    if (scrollUpEl) {
        window.scrollY >= 350 ? scrollUpEl.classList.add('show-scroll')
                              : scrollUpEl.classList.remove('show-scroll')
    }
}
window.addEventListener('scroll', scrollUp)


/*=============== DARK LIGHT THEME ===============*/

const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton && themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

//We validate if user previously chose a topic
if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
}
if (selectedIcon && themeButton) {
    if (selectedIcon === 'ri-sun-line') {
        themeButton.classList.remove('ri-moon-line')
        themeButton.classList.add('ri-sun-line')
    } else {
        themeButton.classList.remove('ri-sun-line')
        themeButton.classList.add('ri-moon-line')
    }
}

// Activate / deactivate the theme manually with the button is handled inline in HTML to avoid script delays and conflicts.



/*=============== CHANGE BACKGROUND HEADER ===============*/

const scrollHeader = () =>{
    const header = document.getElementById('header')
    if (header) {
        window.scrollY >= 50 ? header.classList.add('bg-header')
                           : header.classList.remove('bg-header')
    }
}

window.addEventListener('scroll', scrollHeader)


/*=============== SCROLL REVEAL ANIMATION ===============*/
if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({
        origin: 'top',
        distance: '60px',
        duration: 2500,
        delay: 400,
       //  reset:  true /* Animations repeat */
    })

    sr.reveal(`.home__data, .projects__container, .testimonial__container .footer__container`)
    sr.reveal(`.home__info div`,{delay:600, origin: 'bottom', interval: 100})
    sr.reveal(`.skills__content:nth-child(1), contact__content:nth-child(1)`,{origin: 'left' })
    sr.reveal(`.skills__content:nth-child(2), contact__content:nth-child(2)`,{origin: 'rigth'})
    sr.reveal(`.qualification__content, .services__card`,{interval: 100})
}
