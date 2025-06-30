document.addEventListener('DOMContentLoaded', () => {
    // Burger menu functionality
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    });

    // Testimonial Slider functionality
    const testimonials = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.dot');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = 'none';
            if (i === index) {
                testimonial.style.display = 'block';
            }
        });
        dots.forEach((dot, i) => {
            dot.classList.remove('active');
            if (i === index) {
                dot.classList.add('active');
            }
        });
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentTestimonial = index;
            showTestimonial(currentTestimonial);
        });
    });

    // Initial display
    showTestimonial(currentTestimonial);

    // Auto-advance testimonials every 5 seconds
    setInterval(nextTestimonial, 5000);

    // Contact Form Submission (Client-side simulation)
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent actual form submission

            // Simulate form submission success
            formMessage.textContent = 'Thank you for your message! We will get back to you shortly.';
            formMessage.className = 'form-message success';

            // Clear form fields after a short delay
            setTimeout(() => {
                contactForm.reset();
                formMessage.textContent = '';
                formMessage.className = 'form-message';
            }, 3000);

            // In a real application, you would send the form data to a server here
            // using fetch() or XMLHttpRequest.
            // Example:
            /*
            fetch(this.action, {
                method: this.method,
                body: new FormData(this)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    formMessage.textContent = 'Thank you for your message! We will get back to you shortly.';
                    formMessage.className = 'form-message success';
                    contactForm.reset();
                } else {
                    formMessage.textContent = 'There was an error sending your message. Please try again.';
                    formMessage.className = 'form-message error';
                }
            })
            .catch(error => {
                formMessage.textContent = 'There was an error sending your message. Please try again.';
                formMessage.className = 'form-message error';
                console.error('Error:', error);
            });
            */
        });
    }

    // Back to Top Button functionality
    const backToTopBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Comprehensive Animation System
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    // Create intersection observer for scroll animations
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Add animated class with a slight delay for better effect
                setTimeout(() => {
                    element.classList.add('animated');
                }, 100);
                
                // Stop observing once animated (one-time animation)
                animationObserver.unobserve(element);
            }
        });
    }, observerOptions);

    // Observe all animation elements
    const animationElements = document.querySelectorAll(
        '.animate-on-scroll, .animate-left, .animate-right, .animate-scale'
    );
    
    animationElements.forEach(element => {
        animationObserver.observe(element);
    });

    // Stagger animation delays for grouped elements
    const staggerGroups = document.querySelectorAll('.stagger-animation');
    staggerGroups.forEach((element, index) => {
        element.style.transitionDelay = `${(index * 0.1) + 0.2}s`;
    });

    // Special animations for specific elements
    const specialAnimations = () => {
        // Animate service cards on the homepage
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.1}s`;
        });

        // Animate testimonial items
        const testimonialItems = document.querySelectorAll('.testimonial-item');
        testimonialItems.forEach(item => {
            item.classList.add('animate-on-scroll');
            animationObserver.observe(item);
        });

        // Animate news cards
        const newsCards = document.querySelectorAll('.news-cards .card');
        newsCards.forEach((card, index) => {
            card.classList.add('animate-on-scroll', 'stagger-animation');
            card.style.transitionDelay = `${index * 0.15}s`;
            animationObserver.observe(card);
        });

        // Animate choose-us items with top border effect
        const chooseUsItems = document.querySelectorAll('.choose-us-item');
        chooseUsItems.forEach(item => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('animated');
                        }, 200);
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            observer.observe(item);
        });

        // Animate director profile elements
        const directorInfo = document.querySelector('.director-info');
        if (directorInfo) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('animated');
                            
                            // Animate specialization tags
                            const specializations = entry.target.querySelector('.specializations');
                            if (specializations) {
                                setTimeout(() => {
                                    specializations.classList.add('animated');
                                }, 300);
                            }
                        }, 200);
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            observer.observe(directorInfo);
        }
    };

    // Initialize special animations
    specialAnimations();

    // Enhanced hover effects for interactive elements
    const enhanceHoverEffects = () => {
        // Service cards hover enhancement
        const serviceCards = document.querySelectorAll('.service-card, .choose-us-item');
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-15px) scale(1.02)';
                this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.08)';
            });
        });

        // Director image hover effect
        const directorImage = document.querySelector('.director-image');
        if (directorImage) {
            directorImage.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
                this.style.boxShadow = '0 25px 50px rgba(0,0,0,0.2)';
            });
            
            directorImage.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 15px 35px rgba(0,0,0,0.1)';
            });
        }

        // About image hover effect
        const aboutImage = document.querySelector('.about-image');
        if (aboutImage) {
            aboutImage.addEventListener('mouseenter', function() {
                const img = this.querySelector('img');
                if (img) img.style.transform = 'scale(1.05)';
            });
            
            aboutImage.addEventListener('mouseleave', function() {
                const img = this.querySelector('img');
                if (img) img.style.transform = 'scale(1)';
            });
        }
    };

    // Initialize hover effects
    enhanceHoverEffects();

    // Mobile-specific optimizations
    const isMobile = window.innerWidth <= 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isMobile || prefersReducedMotion) {
        // Reduce animation intensity on mobile or for users who prefer reduced motion
        const allAnimatedElements = document.querySelectorAll(
            '.animate-on-scroll, .animate-left, .animate-right, .animate-scale'
        );
        
        allAnimatedElements.forEach(element => {
            if (isMobile) {
                // Reduce transform values for mobile
                element.style.setProperty('--mobile-transform', 'translateY(20px)');
            }
            
            if (prefersReducedMotion) {
                // Disable animations for users who prefer reduced motion
                element.style.transition = 'none';
                element.classList.add('animated');
            }
        });
    }

    // Performance optimization: Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(() => {
            // Any additional scroll-based animations can be added here
        }, 10);
    });
});