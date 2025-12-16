document.addEventListener('DOMContentLoaded', () => {

    /* =========================
       SCROLL SUAVE
    ========================= */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const targetId = anchor.getAttribute('href');
            if (targetId && targetId !== '#') {
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    /* =========================
       HEADER SHADOW
    ========================= */
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.style.boxShadow =
                window.scrollY > 50
                    ? '0 5px 15px rgba(0,0,0,0.1)'
                    : '0 2px 10px rgba(0,0,0,0.1)';
        });
    }

    /* =========================
       FORM CONTACT
    ========================= */
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', e => {
            e.preventDefault();
            alert('Thank you for your message! We will contact you soon.');
            contactForm.reset();
        });
    }

    /* =========================
       🌍 MAP PINS TOOLTIPS
    ========================= */
    document.querySelectorAll('.map-pin').forEach(pin => {
        let tooltip;

        pin.addEventListener('mouseenter', () => {
            tooltip = document.createElement('div');
            tooltip.className = 'pin-tooltip';
            tooltip.innerHTML = pin.dataset.info;
            document.body.appendChild(tooltip);

            const rect = pin.getBoundingClientRect();
            tooltip.style.left = rect.left + rect.width / 2 + 'px';
            tooltip.style.top = rect.top - 10 + 'px';
        });

        pin.addEventListener('mouseleave', () => {
            if (tooltip) {
                tooltip.remove();
                tooltip = null;
            }
        });
    });

    /* =========================
       TESTIMONIALS CAROUSEL
    ========================= */
    const testimonials = [
        {
            text: "Excellent support and quick turnaround. VENTO always delivers.",
            author: "- MRO Supplier"
        },
        {
            text: "Reliable, fast, and professional. An ideal partner for aircraft components.",
            author: "- Airline Procurement Manager"
        },
        {
            text: "Their global network really shortens lead times. Highly recommended.",
            author: "- Fleet Manager"
        }
    ];

    const testimonialCard = document.getElementById("testimonial-card");
    const textEl = document.getElementById("testimonial-text");
    const authorEl = document.getElementById("testimonial-author");
    const bar = document.querySelector(".story-bar");

    if (testimonialCard && textEl && authorEl && bar) {
        let index = 0;
        const duration = 4000;

        function showTestimonial(i) {
            testimonialCard.classList.add("hide");
            testimonialCard.classList.remove("show");

            setTimeout(() => {
                textEl.textContent = "“" + testimonials[i].text + "”";
                authorEl.textContent = testimonials[i].author;

                bar.style.width = "0%";
                bar.animate(
                    [{ width: "0%" }, { width: "100%" }],
                    { duration: duration, easing: "linear" }
                );

                testimonialCard.classList.remove("hide");
                testimonialCard.classList.add("show");
            }, 400);
        }

        if (testimonials.length > 0) {
            showTestimonial(index);

            setInterval(() => {
                index = (index + 1) % testimonials.length;
                showTestimonial(index);
            }, duration);
        }
    }

    /* =========================
       COUNTERS
    ========================= */
    const countersContainer = document.querySelector('.counters');

    if (countersContainer) {
        function animateCounter(id, target) {
            let count = 0;
            const step = target / 200;
            const element = document.getElementById(id);
            
            if (!element) return;

            function update() {
                count += step;
                if (count < target) {
                    element.textContent = Math.floor(count).toLocaleString();
                    requestAnimationFrame(update);
                } else {
                    element.textContent = target.toLocaleString();
                }
            }
            update();
        }

        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                animateCounter('counter1', 85000);
                animateCounter('counter2', 400000);
                observer.disconnect();
            }
        }, { threshold: 0.4 });

        observer.observe(countersContainer);
    }

});
