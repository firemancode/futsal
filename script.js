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
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Booking Form Handling
const bookingForm = document.getElementById('bookingForm');

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
    showBookingSuccess(bookingData);
    
    // Reset form
    this.reset();
});

function validateBookingForm(data) {
    // Check if all fields are filled
    for (let key in data) {
        if (!data[key]) {
            showError('Mohon lengkapi semua field yang diperlukan');
            return false;
        }
    }
    
    // Validate phone number
    const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,9}$/;
    if (!phoneRegex.test(data.telepon)) {
        showError('Nomor telepon tidak valid');
        return false;
    }
    
    // Validate date (must be today or future)
    const selectedDate = new Date(data.tanggal);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        showError('Tanggal booking tidak boleh di masa lalu');
        return false;
    }
    
    // Validate time (must be within operating hours)
    const selectedTime = data.waktu;
    const hour = parseInt(selectedTime.split(':')[0]);
    
    if (hour < 8 || hour >= 24) {
        showError('Jam operasional: 08:00 - 24:00');
        return false;
    }
    
    return true;
}

function showBookingSuccess(data) {
    // Create success modal
    const modal = document.createElement('div');
    modal.className = 'success-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <i class="fas fa-check-circle"></i>
                <h3>Booking Berhasil!</h3>
            </div>
            <div class="modal-body">
                <p><strong>Nama:</strong> ${data.nama}</p>
                <p><strong>Telepon:</strong> ${data.telepon}</p>
                <p><strong>Lapangan:</strong> ${getLapanganName(data.lapangan)}</p>
                <p><strong>Tanggal:</strong> ${formatDate(data.tanggal)}</p>
                <p><strong>Waktu:</strong> ${data.waktu} (${data.durasi} jam)</p>
                <p class="note">Tim kami akan menghubungi Anda untuk konfirmasi booking.</p>
            </div>
            <button class="modal-close">Tutup</button>
        </div>
    `;
    
    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .success-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }
        
        .modal-content {
            background: white;
            border-radius: 15px;
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            text-align: center;
            animation: slideIn 0.3s ease;
        }
        
        .modal-header {
            margin-bottom: 1.5rem;
        }
        
        .modal-header i {
            font-size: 3rem;
            color: #27ae60;
            margin-bottom: 1rem;
        }
        
        .modal-header h3 {
            color: #2c3e50;
            margin: 0;
        }
        
        .modal-body {
            text-align: left;
            margin-bottom: 1.5rem;
        }
        
        .modal-body p {
            margin-bottom: 0.5rem;
            color: #666;
        }
        
        .modal-body .note {
            background: #e8f5e8;
            padding: 1rem;
            border-radius: 8px;
            margin-top: 1rem;
            color: #155724;
            font-weight: 500;
        }
        
        .modal-close {
            background: #27ae60;
            color: white;
            border: none;
            padding: 0.8rem 2rem;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            transition: background 0.3s ease;
        }
        
        .modal-close:hover {
            background: #219a52;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideIn {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(modal);
    
    // Close modal functionality
    modal.querySelector('.modal-close').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

function showError(message) {
    // Create error notification
    const notification = document.createElement('div');
    notification.className = 'error-notification';
    notification.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <span>${message}</span>
    `;
    
    // Add notification styles
    const style = document.createElement('style');
    style.textContent = `
        .error-notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #f8d7da;
            color: #721c24;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            z-index: 10001;
            animation: slideInRight 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
        
        .error-notification i {
            font-size: 1.2rem;
        }
        
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            document.body.removeChild(notification);
        }
    }, 5000);
}

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

// Lapangan Status Update (Simulation)
function updateLapanganStatus() {
    const statusElements = document.querySelectorAll('.status');
    
    statusElements.forEach(status => {
        // Simulate random availability changes
        if (Math.random() > 0.7) {
            if (status.classList.contains('available')) {
                status.classList.remove('available');
                status.classList.add('booked');
                status.textContent = 'Dibooking';
            } else {
                status.classList.remove('booked');
                status.classList.add('available');
                status.textContent = 'Tersedia';
            }
        }
    });
}

// Update status every 30 seconds (for demo purposes)
setInterval(updateLapanganStatus, 30000);

// Intersection Observer for animations
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.lapangan-card, .harga-card, .booking-form, .booking-info');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Price Calculator (Optional feature)
function calculatePrice() {
    const lapanganSelect = document.getElementById('lapangan');
    const durasiSelect = document.getElementById('durasi');
    const tanggalInput = document.getElementById('tanggal');
    
    if (lapanganSelect.value && durasiSelect.value && tanggalInput.value) {
        const selectedDate = new Date(tanggalInput.value);
        const isWeekend = selectedDate.getDay() === 0 || selectedDate.getDay() === 6;
        const durasi = parseInt(durasiSelect.value);
        
        let basePrice = isWeekend ? 200000 : 150000; // Weekend vs Weekday
        let totalPrice = basePrice * durasi;
        
        // Apply package discounts
        if (durasi === 2) {
            totalPrice = 350000;
        } else if (durasi === 4) {
            totalPrice = 650000;
        }
        
        // Show price (you can add a price display element)
        console.log(`Total harga: Rp ${totalPrice.toLocaleString('id-ID')}`);
    }
}

// Add event listeners for price calculation
document.getElementById('lapangan')?.addEventListener('change', calculatePrice);
document.getElementById('durasi')?.addEventListener('change', calculatePrice);
document.getElementById('tanggal')?.addEventListener('change', calculatePrice);

// Set minimum date to today
document.addEventListener('DOMContentLoaded', () => {
    const tanggalInput = document.getElementById('tanggal');
    if (tanggalInput) {
        const today = new Date().toISOString().split('T')[0];
        tanggalInput.min = today;
    }
});