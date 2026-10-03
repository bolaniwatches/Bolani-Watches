// ==========================================================================
// BOLANI WATCHES - GSAP & SCROLL ANIMATIONS
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // GSAP Register Plugins
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // 1. Navbar Entry Animation (Fade in from Top)
        gsap.from('.main-header', {
            y: -100,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out'
        });

        // 2. Staggered Nav Links Entrance
        gsap.from('.nav-item', {
            y: -20,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            delay: 0.3,
            ease: 'power2.out'
        });
    }

    // 3. Header Blur & Height Shrink on Scroll Trigger
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});

// GSAP Animation Script - Fixed Version
document.addEventListener('DOMContentLoaded', () => {
    // Check if GSAP and ScrollTrigger exist
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        // Register Plugin explicitly
        gsap.registerPlugin(ScrollTrigger);

        // Section 4 GSAP Entrance Animation
        gsap.fromTo('.social-card', 
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.12,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.socials-section',
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );

        // Section 5 GSAP Entrance Animation
        gsap.fromTo('.process-card', 
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.process-section',
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );

        // Images Load Hone ke baad ScrollTrigger Recalculate Logic
        window.addEventListener('load', () => {
            ScrollTrigger.refresh();
        });
    }
});