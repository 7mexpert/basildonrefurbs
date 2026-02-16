// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Product Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        // Filter products
        productCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease-out';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Scroll Animation for Navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Contact Form Handling
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const subject = contactForm.querySelector('input[type="text"]:nth-child(3)').value;
    const message = contactForm.querySelector('textarea').value;
    
    // Simple validation
    if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Newsletter Form Handling
const newsletterForm = document.querySelector('.newsletter-form');
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const email = emailInput.value;
    
    if (!email) {
        alert('Please enter your email address.');
        return;
    }
    
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Simulate newsletter subscription
    const submitBtn = newsletterForm.querySelector('button');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-check"></i>';
    submitBtn.style.background = '#4CAF50';
    
    setTimeout(() => {
        alert('Thank you for subscribing to our newsletter!');
        newsletterForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
    }, 2000);
});

// Email validation helper function
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

// Product Card Hover Effects
productCards.forEach(card => {
    const btn = card.querySelector('.product-btn');
    
    card.addEventListener('mouseenter', () => {
        btn.style.transform = 'scale(1.05)';
    });
    
    card.addEventListener('mouseleave', () => {
        btn.style.transform = 'scale(1)';
    });
    
    // For Buy Now links, let them work normally (open in new tab)
    if (btn.tagName === 'A') {
        btn.addEventListener('click', (e) => {
            const title = card.querySelector('.product-title').textContent;
            console.log(`Redirecting to buy "${title}"`);
            // The link will handle the navigation, we just add a small delay for visual feedback
            btn.style.background = '#4CAF50';
            setTimeout(() => {
                btn.style.background = '';
            }, 300);
        });
    } else {
        // For button elements (if any remain)
        btn.addEventListener('click', () => {
            const title = card.querySelector('.product-title').textContent;
            alert(`Added "${title}" to your cart!`);
            
            // Add visual feedback
            btn.style.background = '#4CAF50';
            btn.innerHTML = '<i class="fas fa-check"></i> Added to Cart';
            
            setTimeout(() => {
                btn.style.background = '';
                btn.innerHTML = 'Add to Cart';
            }, 2000);
        });
    }
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animations to sections
document.querySelectorAll('.feature-card, .product-card, .stat-item, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Parallax Effect for Hero Section
const heroImage = document.querySelector('.device-showcase');
if (heroImage) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        heroImage.style.transform = `translateY(${rate}px)`;
    });
}

// Back to Top Button
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopBtn.className = 'back-to-top';
backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--primary-color);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.2rem;
    box-shadow: 0 4px 15px rgba(160, 129, 229, 0.4);
    transition: all 0.3s ease;
    display: none;
    z-index: 1000;
`;

document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.style.display = 'block';
        backToTopBtn.style.transform = 'translateY(0)';
    } else {
        backToTopBtn.style.transform = 'translateY(20px)';
        setTimeout(() => {
            backToTopBtn.style.display = 'none';
        }, 300);
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add CSS for back-to-top button
const style = document.createElement('style');
style.textContent = `
    .back-to-top:hover {
        background: var(--primary-dark);
        transform: translateY(-3px);
    }
    
    .back-to-top:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(160, 129, 229, 0.3);
    }
`;
document.head.appendChild(style);

// Typing Effect for Hero Title (Optional Enhancement)
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    
    // Only run typing effect on first load
    if (!sessionStorage.getItem('typingDone')) {
        setTimeout(typeWriter, 1000);
        sessionStorage.setItem('typingDone', 'true');
    }
}

// Product Modal Functionality
const productImages = document.querySelectorAll('.product-img-clickable');
const modal = document.getElementById('product-modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalCategory = document.getElementById('modal-category');
const modalSpecsList = document.getElementById('modal-specs-list');
const modalDescription = document.getElementById('modal-description');
const modalPrice = document.getElementById('modal-price');
const modalOldPrice = document.getElementById('modal-old-price');
const modalFeaturesList = document.getElementById('modal-features-list');
const modalBuyBtn = document.getElementById('modal-buy-btn');
const closeBtn = document.querySelector('.close-btn');
const modalCloseBtn = document.querySelector('.modal-close-btn');

// Product data
const productData = {
    'example-laptop': {
        title: 'Example Laptop',
        category: 'Laptop',
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        specs: [
            'M1 Chip (8-core CPU, 8-core GPU)',
            '8GB Unified Memory',
            '256GB SSD Storage',
            '13.3-inch Retina Display',
            'Touch Bar and Touch ID',
            'Up to 17 hours battery life'
        ],
        description: 'The Example Laptop with M1 chip delivers exceptional performance and battery life in a compact design. Perfect for professionals and students who need powerful computing on the go.',
        price: '£799',
        oldPrice: '£1,199',
        features: [
            'Blazing fast M1 performance',
            'Crisp Retina display',
            'All-day battery life',
            'Silent fanless design',
            'macOS ecosystem'
        ],
        buyUrl: 'https://buy.stripe.com/9B6cN5dQdbT72F0aPS6Zy00'
    },
    'dell-xps': {
        title: 'Dell XPS 15',
        category: 'Laptop',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        specs: [
            'Intel Core i7-11800H Processor',
            '16GB DDR4 Memory',
            '512GB NVMe SSD',
            '15.6-inch 4K UHD+ Display',
            'NVIDIA GeForce RTX 3050 Ti',
            'Windows 11 Pro'
        ],
        description: 'The Dell XPS 15 combines stunning 4K display quality with powerful performance, making it ideal for creative professionals and power users.',
        price: '£1,099',
        oldPrice: '£1,599',
        features: [
            'Stunning 4K+ display',
            'Professional-grade performance',
            'Premium build quality',
            'Excellent color accuracy',
            'Thunderbolt 4 connectivity'
        ],
        buyUrl: 'https://example.com/dell-xps'
    },
    'ipad-pro': {
        title: 'iPad Pro 11"',
        category: 'Tablet',
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        specs: [
            'Apple M1 Chip',
            '128GB Storage',
            '11-inch Liquid Retina Display',
            '8GB RAM',
            'Wi-Fi + Cellular',
            'Face ID',
            'USB-C Port'
        ],
        description: 'The iPad Pro 11" with M1 chip transforms your workflow with desktop-class performance in a portable tablet form factor.',
        price: '£649',
        oldPrice: '£899',
        features: [
            'Desktop-class M1 performance',
            'Liquid Retina display',
            'Apple Pencil support',
            'Magic Keyboard compatible',
            'ProMotion 120Hz refresh rate'
        ],
        buyUrl: 'https://example.com/ipad-pro'
    },
    'iphone-13': {
        title: 'iPhone 13',
        category: 'Phone',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        specs: [
            'A15 Bionic Chip',
            '128GB Storage',
            '6.1-inch Super Retina XDR Display',
            '12MP Dual Camera System',
            'Ceramic Shield Front Cover',
            'IP68 Water Resistant',
            'iOS 15'
        ],
        description: 'The iPhone 13 delivers incredible performance, advanced camera system, and all-day battery life in a beautiful design.',
        price: '£499',
        oldPrice: '£799',
        features: [
            'A15 Bionic performance',
            'Advanced dual-camera system',
            'Super Retina XDR display',
            'Cinematic mode video',
            'All-day battery life'
        ],
        buyUrl: 'https://example.com/iphone-13'
    }
};

// Open modal function
function openModal(productId) {
    const data = productData[productId];
    if (!data) return;

    modalImg.src = data.image;
    modalImg.alt = data.title;
    modalTitle.textContent = data.title;
    modalCategory.textContent = data.category;
    modalDescription.textContent = data.description;
    modalPrice.textContent = data.price;
    modalOldPrice.textContent = data.oldPrice;
    modalBuyBtn.href = data.buyUrl;

    // Populate specs list
    modalSpecsList.innerHTML = '';
    data.specs.forEach(spec => {
        const li = document.createElement('li');
        li.textContent = spec;
        modalSpecsList.appendChild(li);
    });

    // Populate features list
    modalFeaturesList.innerHTML = '';
    data.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        modalFeaturesList.appendChild(li);
    });

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Close modal function
function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable background scrolling
}

// Event listeners for opening modals
productImages.forEach(img => {
    img.addEventListener('click', (e) => {
        const productCard = img.closest('.product-card');
        const productId = productCard.getAttribute('data-modal');
        openModal(productId);
    });
});

// Event listeners for closing modals
closeBtn.addEventListener('click', closeModal);
modalCloseBtn.addEventListener('click', closeModal);

// Close modal when clicking outside of content
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeModal();
    }
});

