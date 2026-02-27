document.addEventListener('DOMContentLoaded', () => {
    /* =========================================
       Navigation & Mobile Menu
       ========================================= */
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');

    // Change navbar styling on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Toggle hamburger icon (bars to X)
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when a link is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    /* =========================================
       Scroll Animations (Intersection Observer)
       ========================================= */
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15, // 15% of the element must be visible
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before the element hits bottom
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return; // Do nothing if not intersecting
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target); // Stop observing once it has appeared
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    /* =========================================
       Smooth Scrolling for Anchor Links
       ========================================= */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Ignore if it's just "#"
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Keep offset in mind for fixed navbar
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                     top: offsetPosition,
                     behavior: "smooth"
                });
            }
        });
    });
});
