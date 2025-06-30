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
});