//section 1
// Active Link Toggle Handler
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

//section 2
// Hero Banner Auto Slider (Changes every 5 seconds)
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.hero-banner-section .slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        const totalSlides = slides.length;

        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % totalSlides;
            slides[currentSlide].classList.add('active');
        }, 5000); // 5000ms = 5 seconds
    }
});
// section 3

// SECTION 3: MOBILE ONLY CONTINUOUS INFINITE RIGHT-LEFT AUTOMATIC SCROLL
document.addEventListener('DOMContentLoaded', () => {
    const gridWrapper = document.querySelector('.collections-grid-wrapper');
    let autoScrollInterval = null;
    let scrollDirection = 'right'; // 'right' ya 'left'

    function handleContinuousMobileScroll() {
        // Sirf Mobile Screens (<= 768px) ke liye
        if (!gridWrapper || window.innerWidth > 768) {
            if (autoScrollInterval) clearInterval(autoScrollInterval);
            return;
        }

        let userInteracted = false;

        // Agar user khud touch ya drag kare to animation pause ho jaye
        const stopLoopOnTouch = () => {
            userInteracted = true;
            if (autoScrollInterval) clearInterval(autoScrollInterval);
        };

        gridWrapper.addEventListener('touchstart', stopLoopOnTouch, { passive: true });
        gridWrapper.addEventListener('mousedown', stopLoopOnTouch, { passive: true });

        // Intersection Observer: Jab section screen par dikhe tabhi animation chale
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !userInteracted && !autoScrollInterval) {
                    
                    // Continuous Loop every 2.5 seconds
                    autoScrollInterval = setInterval(() => {
                        if (userInteracted) {
                            clearInterval(autoScrollInterval);
                            return;
                        }

                        const maxScroll = gridWrapper.scrollWidth - gridWrapper.clientWidth;
                        const currentScroll = gridWrapper.scrollLeft;

                        if (scrollDirection === 'right') {
                            // Right Scroll Step (~160px card size)
                            const targetScroll = Math.min(currentScroll + 160, maxScroll);
                            gridWrapper.scrollTo({
                                left: targetScroll,
                                behavior: 'smooth'
                            });

                            // End tak pahunch kar direction change
                            if (targetScroll >= maxScroll - 10) {
                                scrollDirection = 'left';
                            }
                        } else {
                            // Left Scroll Step
                            const targetScroll = Math.max(currentScroll - 160, 0);
                            gridWrapper.scrollTo({
                                left: targetScroll,
                                behavior: 'smooth'
                            });

                            // Start tak pahunch kar direction change
                            if (targetScroll <= 10) {
                                scrollDirection = 'right';
                            }
                        }
                    }, 2500); // 2.5 Seconds Delay
                } else if (!entry.isIntersecting && autoScrollInterval) {
                    // Screen se baher jaane par memory save karne ke liye pause
                    clearInterval(autoScrollInterval);
                    autoScrollInterval = null;
                }
            });
        }, { threshold: 0.3 });

        observer.observe(gridWrapper);
    }

    // Initial run & Resize event listener
    handleContinuousMobileScroll();
    window.addEventListener('resize', handleContinuousMobileScroll);
});