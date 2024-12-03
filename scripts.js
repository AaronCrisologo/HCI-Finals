document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.getElementById('main-menu');
    const navElement = document.querySelector('nav');
    const navList = navElement?.querySelector('ul');
    const scrollToTopButton = document.getElementById('scroll-to-top');

    if (mobileMenuToggle && navMenu) {
        // Toggle menu visibility
        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('menu-active');
            const isExpanded = navMenu.classList.contains('menu-active');
            mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
        });

        // Close the menu on link click or outside click
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('menu-active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            });
        });

        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                navMenu.classList.remove('menu-active');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const targetElement = document.querySelector(anchor.getAttribute('href'));
            targetElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // Mobile menu toggle for small screens
    if (navList) {
        const menuToggle = document.createElement('div');
        menuToggle.classList.add('menu-toggle');
        menuToggle.innerHTML = `<span></span><span></span><span></span>`;
        navElement.insertBefore(menuToggle, navList);

        menuToggle.addEventListener('click', () => {
            navList.classList.toggle('mobile-active');
            menuToggle.classList.toggle('active');
        });

        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('mobile-active');
                menuToggle.classList.remove('active');
            });
        });
    }

    // Form validation
    const contactForm = document.querySelector('.contact-form');
    contactForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = contactForm.querySelector('input[type="text"]');
        const emailInput = contactForm.querySelector('input[type="email"]');
        const messageInput = contactForm.querySelector('textarea');

        if (!nameInput?.value.trim()) return alert('Please enter your name');
        if (!emailInput?.value.trim() || !isValidEmail(emailInput.value)) return alert('Please enter a valid email address');
        if (!messageInput?.value.trim()) return alert('Please enter a message');

        alert('Message sent successfully!');
        contactForm.reset();
    });

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());

    // Typewriter effect
    const textElement = document.getElementById("typewriter-text");
    if (textElement) {
        const phrases = ["Computer Science Student", "Web Developer", "Lifelong Learner"];
        let currentPhraseIndex = 0, currentCharIndex = 0, isDeleting = false;

        function type() {
            const currentPhrase = phrases[currentPhraseIndex];
            textElement.textContent = currentPhrase.substring(0, currentCharIndex);
            currentCharIndex += isDeleting ? -1 : 1;

            if (!isDeleting && currentCharIndex === currentPhrase.length) {
                isDeleting = true;
                setTimeout(type, 1000);
            } else if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            }
            setTimeout(type, isDeleting ? 50 : 100);
        }

        type();
    }

    // Show or hide the button when scrolling
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopButton.classList.add('show');
        } else {
            scrollToTopButton.classList.remove('show');
        }
    });

    // Scroll to top when the button is clicked
    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
