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

// Smooth scrolling for navigation links
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

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for fade in animation
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.lapangan-card, .harga-card, .booking-form, .booking-info, .kontak-info, .kontak-form');
    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Booking Form Handling
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const bookingData = {
            nama: formData.get('nama'),
            telepon: formData.get('telepon'),
            lapangan: formData.get('lapangan'),
            tanggal: formData.get('tanggal'),
            waktu: formData.get('waktu'),
            durasi: formData.get('durasi')
        };
        
        // Validate form data
        if (!validateBookingForm(bookingData)) {
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<span class="loading"></span> Memproses...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Show success message
            showMessage('Booking berhasil! Kami akan menghubungi Anda segera untuk konfirmasi.', 'success');
            
            // Reset form
            this.reset();
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Contact Form Handling
const contactForm = document.getElementById('kontakForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const contactData = {
            nama: formData.get('kontak-nama'),
            email: formData.get('kontak-email'),
            subjek: formData.get('kontak-subjek'),
            pesan: formData.get('kontak-pesan')
        };
        
        // Validate form data
        if (!validateContactForm(contactData)) {
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<span class="loading"></span> Mengirim...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Show success message
            showMessage('Pesan berhasil dikirim! Kami akan membalas email Anda segera.', 'success');
            
            // Reset form
            this.reset();
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Form validation functions
function validateBookingForm(data) {
    // Check if all fields are filled
    for (let key in data) {
        if (!data[key]) {
            showMessage(`Mohon isi field ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`, 'error');
            return false;
        }
    }
    
    // Validate phone number
    const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,9}$/;
    if (!phoneRegex.test(data.telepon)) {
        showMessage('Nomor telepon tidak valid', 'error');
        return false;
    }
    
    // Validate date (must be future date)
    const selectedDate = new Date(data.tanggal);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate <= today) {
        showMessage('Tanggal booking harus hari ini atau masa depan', 'error');
        return false;
    }
    
    // Validate time
    const selectedTime = data.waktu;
    const [hours, minutes] = selectedTime.split(':').map(Number);
    
    if (hours < 8 || hours > 22) {
        showMessage('Jam booking hanya tersedia antara 08:00 - 22:00', 'error');
        return false;
    }
    
    return true;
}

function validateContactForm(data) {
    // Check if all fields are filled
    for (let key in data) {
        if (!data[key]) {
            showMessage(`Mohon isi field ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`, 'error');
            return false;
        }
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showMessage('Format email tidak valid', 'error');
        return false;
    }
    
    return true;
}

// Message display function
function showMessage(message, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message element
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;
    messageElement.textContent = message;
    
    // Insert message before the form
    const form = document.querySelector('form');
    if (form) {
        form.parentNode.insertBefore(messageElement, form);
    }
    
    // Auto remove message after 5 seconds
    setTimeout(() => {
        if (messageElement.parentNode) {
            messageElement.remove();
        }
    }, 5000);
}

// Set minimum date for booking form
document.addEventListener('DOMContentLoaded', () => {
    const dateInput = document.getElementById('tanggal');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }
});

// Lapangan availability checker
function checkLapanganAvailability() {
    const lapanganCards = document.querySelectorAll('.lapangan-card');
    
    lapanganCards.forEach(card => {
        const statusElement = card.querySelector('.status');
        if (statusElement) {
            // Simulate random availability (for demo purposes)
            const isAvailable = Math.random() > 0.3;
            
            if (isAvailable) {
                statusElement.textContent = 'Tersedia';
                statusElement.className = 'status available';
            } else {
                statusElement.textContent = 'Dibooking';
                statusElement.className = 'status booked';
            }
        }
    });
}

// Update availability every 30 seconds (for demo)
setInterval(checkLapanganAvailability, 30000);

// Price calculator
function calculatePrice() {
    const lapanganSelect = document.getElementById('lapangan');
    const durasiSelect = document.getElementById('durasi');
    const priceDisplay = document.getElementById('price-display');
    
    if (lapanganSelect && durasiSelect) {
        const lapangan = lapanganSelect.value;
        const durasi = parseInt(durasiSelect.value);
        
        if (lapangan && durasi) {
            // Base prices (in IDR)
            const basePrices = {
                'indoor-a': 150000,
                'indoor-b': 150000,
                'indoor-c': 200000
            };
            
            const basePrice = basePrices[lapangan];
            const totalPrice = basePrice * durasi;
            
            // Format price
            const formattedPrice = new Intl.NumberFormat('id-ID').format(totalPrice);
            
            if (priceDisplay) {
                priceDisplay.textContent = `Total: Rp ${formattedPrice}`;
                priceDisplay.style.display = 'block';
            }
        }
    }
}

// Add event listeners for price calculation
document.addEventListener('DOMContentLoaded', () => {
    const lapanganSelect = document.getElementById('lapangan');
    const durasiSelect = document.getElementById('durasi');
    
    if (lapanganSelect) {
        lapanganSelect.addEventListener('change', calculatePrice);
    }
    
    if (durasiSelect) {
        durasiSelect.addEventListener('change', calculatePrice);
    }
});

// Add price display element to booking form
document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        const priceDisplay = document.createElement('div');
        priceDisplay.id = 'price-display';
        priceDisplay.style.display = 'none';
        priceDisplay.style.fontSize = '1.2rem';
        priceDisplay.style.fontWeight = 'bold';
        priceDisplay.style.color = '#27ae60';
        priceDisplay.style.textAlign = 'center';
        priceDisplay.style.marginTop = '1rem';
        priceDisplay.style.padding = '1rem';
        priceDisplay.style.background = '#f8f9fa';
        priceDisplay.style.borderRadius = '8px';
        
        bookingForm.appendChild(priceDisplay);
    }
});

// Add smooth reveal animation for sections
function revealOnScroll() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
}

// Initialize section animations
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Trigger initial check
    revealOnScroll();
});

// Add scroll event listener for reveal animation
window.addEventListener('scroll', revealOnScroll);

// Add active navigation highlighting
function highlightActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Add scroll event listener for navigation highlighting
window.addEventListener('scroll', highlightActiveNav);

// Add CSS for active navigation state
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #27ae60 !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Futsal Center website loaded successfully!');
    
    // Add some interactive features
    addHoverEffects();
    initializeCountdown();
});

// Add hover effects for cards
function addHoverEffects() {
    const cards = document.querySelectorAll('.lapangan-card, .harga-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize countdown timer (for demo purposes)
function initializeCountdown() {
    const countdownElement = document.createElement('div');
    countdownElement.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 1rem;
        border-radius: 10px;
        font-weight: bold;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(39, 174, 96, 0.3);
    `;
    
    // Only show on desktop
    if (window.innerWidth > 768) {
        document.body.appendChild(countdownElement);
        
        // Update countdown every second
        setInterval(() => {
            const now = new Date();
            const endOfDay = new Date();
            endOfDay.setHours(23, 59, 59, 999);
            
            const timeLeft = endOfDay - now;
            const hours = Math.floor(timeLeft / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            countdownElement.textContent = `Promo Hari Ini: ${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    }
}