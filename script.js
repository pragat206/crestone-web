// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
        navbar.classList.remove('transparent');
    } else {
        navbar.classList.remove('scrolled');
        navbar.classList.add('transparent');
    }
});

// Initialize navbar as transparent
document.getElementById('navbar').classList.add('transparent');

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Hero Slider
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.hero-slide');
let slideInterval;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
    });
    
    if (index >= slides.length) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = slides.length - 1;
    } else {
        currentSlideIndex = index;
    }
    
    slides[currentSlideIndex].classList.add('active');
}

function autoSlide() {
    currentSlideIndex++;
    showSlide(currentSlideIndex);
}

function resetSlideInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(autoSlide, 5000);
}

// Start auto-sliding
slideInterval = setInterval(autoSlide, 5000);

// Pause auto-slide on hover
const heroSlider = document.querySelector('.hero-slider');
heroSlider.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

heroSlider.addEventListener('mouseleave', () => {
    resetSlideInterval();
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

// Observe all elements with data-aos attribute
document.querySelectorAll('[data-aos]').forEach(element => {
    observer.observe(element);
});

// Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        
        // Show success message (you can customize this)
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        contactForm.reset();
        
        // Here you would typically send the form data to a server
        // Example:
        // fetch('/api/contact', {
        //     method: 'POST',
        //     body: formData
        // }).then(response => response.json())
        //   .then(data => console.log(data));
    });
}

// Lazy Loading for Videos
const videos = document.querySelectorAll('video');
const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const video = entry.target;
            video.play();
        } else {
            const video = entry.target;
            video.pause();
        }
    });
}, { threshold: 0.5 });

videos.forEach(video => {
    videoObserver.observe(video);
});

// Parallax Effect for CTA Section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const ctaSection = document.querySelector('.cta-section');
    if (ctaSection) {
        const offset = ctaSection.offsetTop;
        const height = ctaSection.offsetHeight;
        
        if (scrolled > offset - window.innerHeight && scrolled < offset + height) {
            ctaSection.style.backgroundPositionY = (scrolled - offset) * 0.5 + 'px';
        }
    }
});

// Add active state to navigation based on scroll position
window.addEventListener('scroll', function() {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Counter Animation for Stats
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value + '+';
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Observe stats section
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statItems = entry.target.querySelectorAll('.stat-item h3');
            statItems.forEach((item, index) => {
                const values = [100, 50, 15];
                animateCounter(item, 0, values[index], 2000);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsGrid = document.querySelector('.stats-grid');
if (statsGrid) {
    statsObserver.observe(statsGrid);
}

// Disable right-click on videos and images (optional security feature)
document.querySelectorAll('video, img').forEach(element => {
    element.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
});

// Loading Animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

