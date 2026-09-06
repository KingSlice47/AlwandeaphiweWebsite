document.addEventListener('DOMContentLoaded', () => {
    // Burger menu functionality
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            const isOpen = nav.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
            burger.setAttribute('aria-expanded', String(isOpen));
        });
    }

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

    // Initial display - only run where testimonials actually exist
    if (testimonials.length) {
        showTestimonial(currentTestimonial);

        // Auto-advance testimonials every 5 seconds
        setInterval(nextTestimonial, 5000);
    }

    // -----------------------------------------------------------------
    // Contact form
    //
    // TO MAKE THE FORM LIVE: set FORM_ENDPOINT to your form service URL.
    // It works with any service that accepts a POST and returns 2xx, e.g.
    // Formspree ('https://formspree.io/f/YOUR_ID') or Web3Forms.
    //
    // While FORM_ENDPOINT is empty the form does NOT claim success - it
    // shows the phone number and email address instead, so that no
    // enquiry is silently lost.
    // -----------------------------------------------------------------
    const FORM_ENDPOINT = '';

    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm && formMessage) {
        const setFormMessage = (text, type) => {
            formMessage.textContent = text;
            formMessage.className = type ? 'form-message ' + type : 'form-message';
        };

        const clearFieldError = (field) => {
            field.classList.remove('is-invalid');
            field.removeAttribute('aria-invalid');
            const group = field.closest('.form-group');
            const note = group && group.querySelector('.field-error');
            if (note) {
                note.remove();
            }
        };

        const showFieldError = (field, text) => {
            clearFieldError(field);
            field.classList.add('is-invalid');
            field.setAttribute('aria-invalid', 'true');
            const note = document.createElement('p');
            note.className = 'field-error';
            note.textContent = text;
            const group = field.closest('.form-group');
            if (group) {
                group.appendChild(note);
            }
        };

        // Validate one field. Returns true when the value is acceptable.
        const validateField = (field) => {
            const value = field.value.trim();
            const label = field.getAttribute('data-label') || 'This field';

            if (!value) {
                showFieldError(field, label + ' is required.');
                return false;
            }
            if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
                showFieldError(field, 'Enter an email address we can reply to, such as name@example.co.za.');
                return false;
            }
            clearFieldError(field);
            return true;
        };

        const fields = Array.from(contactForm.querySelectorAll('input, textarea'));
        const submitButton = contactForm.querySelector('button[type="submit"]');

        // Re-check a field once the visitor has left it, but only after it
        // has already failed once - correcting as you type, not nagging.
        fields.forEach((field) => {
            field.addEventListener('blur', () => {
                if (field.classList.contains('is-invalid')) {
                    validateField(field);
                }
            });
            field.addEventListener('input', () => {
                if (field.classList.contains('is-invalid')) {
                    validateField(field);
                }
            });
        });

        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Validate everything, then focus the first problem.
            const failed = fields.filter((field) => !validateField(field));
            if (failed.length) {
                setFormMessage('Check the highlighted fields and try again.', 'error');
                failed[0].focus();
                return;
            }

            if (!FORM_ENDPOINT) {
                setFormMessage(
                    'This form is not connected yet. Please email info@alwandeaphiwe.co.za or call 072 015 9303 and we will respond the same working day.',
                    'error'
                );
                return;
            }

            setFormMessage('Sending your message...', '');
            if (submitButton) {
                submitButton.disabled = true;
            }

            fetch(FORM_ENDPOINT, {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: new FormData(contactForm)
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Request failed with status ' + response.status);
                    }
                    setFormMessage('Thank you - your message has reached us. We will respond the same working day.', 'success');
                    contactForm.reset();
                    fields.forEach(clearFieldError);
                })
                .catch(() => {
                    setFormMessage(
                        'Your message could not be sent. Please email info@alwandeaphiwe.co.za or call 072 015 9303.',
                        'error'
                    );
                })
                .then(() => {
                    if (submitButton) {
                        submitButton.disabled = false;
                    }
                });
        });
    }

    // -----------------------------------------------------------------
    // F-02: the back-to-top button is not on every page. Without these
    // guards a null reference here aborted the rest of this routine on
    // contact.html and news.html, disabling every feature defined below.
    // -----------------------------------------------------------------
    const backToTopBtn = document.getElementById('backToTop');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            backToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

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