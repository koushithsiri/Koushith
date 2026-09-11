document.addEventListener("DOMContentLoaded", () => {
    // Initialize Lucide Icons
    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

    // Dynamic Copyright Year
    const yearSpan = document.getElementById("current-year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Mobile Navigation Toggle
    const hamburgerBtn = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileLinks = document.querySelectorAll(".mobile-link");

    if (hamburgerBtn && mobileMenu) {
        hamburgerBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("open");
        });

        // Close mobile menu when a navigation link is clicked
        mobileLinks.forEach((link) => {
            link.addEventListener("click", () => {
                mobileMenu.classList.remove("open");
            });
        });

        // Close menu on click outside
        document.addEventListener("click", (e) => {
            if (!hamburgerBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.remove("open");
            }
        });
    }

    // Active Navigation Highlight on Scroll
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    const highlightNavOnScroll = () => {
        const scrollY = window.pageYOffset;

        sections.forEach((current) => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute("id");

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach((link) => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    };

    window.addEventListener("scroll", highlightNavOnScroll);

    // Testimonial Carousel Interactivity
    const testimonialCards = document.querySelectorAll(".testimonial-card");
    const dots = document.querySelectorAll(".dot");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");

    let currentSlide = 0;
    const totalSlides = testimonialCards.length;

    const showSlide = (index) => {
        testimonialCards.forEach((card, i) => {
            card.classList.remove("active");
            if (dots[i]) dots[i].classList.remove("active");
        });

        if (testimonialCards[index]) {
            testimonialCards[index].classList.add("active");
        }
        if (dots[index]) {
            dots[index].classList.add("active");
        }
    };

    if (prevBtn && nextBtn && totalSlides > 0) {
        nextBtn.addEventListener("click", () => {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        });

        prevBtn.addEventListener("click", () => {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            showSlide(currentSlide);
        });

        dots.forEach((dot) => {
            dot.addEventListener("click", (e) => {
                const slideIndex = parseInt(e.target.getAttribute("data-slide"), 10);
                if (!isNaN(slideIndex)) {
                    currentSlide = slideIndex;
                    showSlide(currentSlide);
                }
            });
        });
    }
});