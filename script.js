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

        // Show success message
        showNotification('Booking berhasil! Kami akan menghubungi Anda segera.', 'success');
        
        // Reset form
        this.reset();
        
        // Simulate booking process
        simulateBookingProcess(bookingData);
    });
}

// Form validation
function validateBookingForm(data) {
    const errors = [];
    
    if (!data.nama || data.nama.trim().length < 3) {
        errors.push('Nama harus diisi minimal 3 karakter');
    }
    
    if (!data.telepon || !/^[0-9+\-\s()]+$/.test(data.telepon)) {
        errors.push('Nomor telepon tidak valid');
    }
    
    if (!data.lapangan) {
        errors.push('Silakan pilih lapangan');
    }
    
    if (!data.tanggal) {
        errors.push('Silakan pilih tanggal');
    }
    
    if (!data.waktu) {
        errors.push('Silakan pilih waktu');
    }
    
    if (!data.durasi) {
        errors.push('Silakan pilih durasi');
    }
    
    // Check if date is in the past
    const selectedDate = new Date(data.tanggal + ' ' + data.waktu);
    const now = new Date();
    if (selectedDate < now) {
        errors.push('Tanggal dan waktu tidak boleh di masa lalu');
    }
    
    if (errors.length > 0) {
        showNotification(errors.join('\n'), 'error');
        return false;
    }
    
    return true;
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        .notification-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            margin-left: 1rem;
        }
        .notification-message {
            white-space: pre-line;
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Simulate booking process
function simulateBookingProcess(bookingData) {
    // Show loading state
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Memproses...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Show booking details
        const bookingDetails = `
            Detail Booking:
            Nama: ${bookingData.nama}
            Lapangan: ${getLapanganName(bookingData.lapangan)}
            Tanggal: ${formatDate(bookingData.tanggal)}
            Waktu: ${bookingData.waktu}
            Durasi: ${bookingData.durasi} jam
        `;
        
        showNotification(bookingDetails, 'success');
    }, 2000);
}

// Helper functions
function getLapanganName(lapanganCode) {
    const lapanganNames = {
        'indoor-a': 'Lapangan Indoor A',
        'indoor-b': 'Lapangan Indoor B',
        'outdoor': 'Lapangan Outdoor'
    };
    return lapanganNames[lapanganCode] || lapanganCode;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Price calculation
function calculatePrice(lapangan, waktu) {
    const prices = {
        'indoor-a': { pagi: 150000, siang: 200000, malam: 250000 },
        'indoor-b': { pagi: 150000, siang: 200000, malam: 250000 },
        'outdoor': { pagi: 120000, siang: 150000, malam: 200000 }
    };
    
    const hour = parseInt(waktu.split(':')[0]);
    let timeSlot;
    
    if (hour >= 6 && hour < 12) timeSlot = 'pagi';
    else if (hour >= 12 && hour < 18) timeSlot = 'siang';
    else timeSlot = 'malam';
    
    return prices[lapangan]?.[timeSlot] || 0;
}

// Real-time price calculation
const lapanganSelect = document.getElementById('lapangan');
const waktuInput = document.getElementById('waktu');
const durasiSelect = document.getElementById('durasi');

function updatePriceDisplay() {
    const lapangan = lapanganSelect.value;
    const waktu = waktuInput.value;
    const durasi = durasiSelect.value;
    
    if (lapangan && waktu && durasi) {
        const pricePerHour = calculatePrice(lapangan, waktu);
        const totalPrice = pricePerHour * parseInt(durasi);
        
        // Show price information
        const priceInfo = document.getElementById('price-info') || createPriceInfo();
        priceInfo.innerHTML = `
            <div class="price-display">
                <h4>Estimasi Harga:</h4>
                <p>Rp ${pricePerHour.toLocaleString('id-ID')}/jam</p>
                <p><strong>Total: Rp ${totalPrice.toLocaleString('id-ID')}</strong></p>
            </div>
        `;
    }
}

function createPriceInfo() {
    const priceInfo = document.createElement('div');
    priceInfo.id = 'price-info';
    priceInfo.style.cssText = `
        background: #f8f9fa;
        padding: 1rem;
        border-radius: 10px;
        margin-top: 1rem;
        border-left: 4px solid #27ae60;
    `;
    
    const form = document.querySelector('.booking-form');
    form.appendChild(priceInfo);
    return priceInfo;
}

// Add event listeners for price calculation
if (lapanganSelect) lapanganSelect.addEventListener('change', updatePriceDisplay);
if (waktuInput) waktuInput.addEventListener('change', updatePriceDisplay);
if (durasiSelect) durasiSelect.addEventListener('change', updatePriceDisplay);

// Set minimum date to today
const tanggalInput = document.getElementById('tanggal');
if (tanggalInput) {
    const today = new Date().toISOString().split('T')[0];
    tanggalInput.min = today;
}

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.lapangan-card, .harga-card, .booking-form, .booking-info, .kontak-item');
    animatedElements.forEach(el => observer.observe(el));
});

// Lapangan status update simulation
function updateLapanganStatus() {
    const statusElements = document.querySelectorAll('.status');
    statusElements.forEach(status => {
        // Simulate random status changes
        if (Math.random() > 0.7) {
            if (status.classList.contains('available')) {
                status.textContent = 'Dibooking';
                status.classList.remove('available');
                status.classList.add('booked');
            } else {
                status.textContent = 'Tersedia';
                status.classList.remove('booked');
                status.classList.add('available');
            }
        }
    });
}

// Update status every 30 seconds
setInterval(updateLapanganStatus, 30000);

// Add loading animation for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
});

// Add hover effects for interactive elements
document.addEventListener('DOMContentLoaded', () => {
    const interactiveElements = document.querySelectorAll('.lapangan-card, .harga-card, .cta-button, .submit-btn');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.transform = element.style.transform || 'scale(1.02)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = '';
        });
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        // Close notifications
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(notification => notification.remove());
    }
});

// Add touch support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - could be used for next section
            console.log('Swiped left');
        } else {
            // Swipe right - could be used for previous section
            console.log('Swiped right');
        }
    }
}

// Performance optimization - lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}