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

    // Enhanced scroll animation for sections
    const animatedSections = document.querySelectorAll('main section, .card, .testimonial-item, .service-card, .director-profile');
    const animateOnScroll = () => {
        animatedSections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight - 100;
            
            if (isVisible) {
                section.style.opacity = 1;
                section.style.transform = 'none';
                section.style.transition = `all 0.6s ease ${index * 0.1}s`;
            } else if (!section.hasAttribute('data-animated')) {
                section.style.opacity = 0;
                section.style.transform = 'translateY(40px)';
            }
            
            if (isVisible) {
                section.setAttribute('data-animated', 'true');
            }
        });
    };

    // Service cards hover effect enhancement
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Director image hover effect
    const directorImage = document.querySelector('.director-image img');
    if (directorImage) {
        const directorContainer = document.querySelector('.director-image');
        directorContainer.addEventListener('mouseenter', () => {
            directorImage.style.transform = 'scale(1.1)';
        });
        
        directorContainer.addEventListener('mouseleave', () => {
            directorImage.style.transform = 'scale(1)';
        });
    }

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
});