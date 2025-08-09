// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

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

// Set minimum date to today for booking form
const tanggalInput = document.getElementById('tanggal');
const today = new Date().toISOString().split('T')[0];
tanggalInput.setAttribute('min', today);

// Generate jadwal table
function generateJadwal() {
    const jadwalBody = document.getElementById('jadwalBody');
    const hours = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
    
    jadwalBody.innerHTML = '';
    
    hours.forEach(hour => {
        const row = document.createElement('tr');
        
        // Time column
        const timeCell = document.createElement('td');
        timeCell.textContent = hour;
        timeCell.style.fontWeight = 'bold';
        row.appendChild(timeCell);
        
        // Generate random availability for each field
        const fields = ['Lapangan A', 'Lapangan B', 'Lapangan VIP'];
        fields.forEach(field => {
            const cell = document.createElement('td');
            const isBooked = Math.random() > 0.6; // 40% chance of being booked
            
            if (isBooked) {
                cell.textContent = 'Terbooking';
                cell.className = 'booked';
            } else {
                cell.textContent = 'Tersedia';
                cell.className = 'available';
            }
            
            row.appendChild(cell);
        });
        
        jadwalBody.appendChild(row);
    });
}

// Booking form handling
const bookingForm = document.getElementById('bookingForm');
const modal = document.getElementById('bookingModal');
const bookingDetails = document.getElementById('bookingDetails');
const closeBtn = document.querySelector('.close');

bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const bookingData = {
        nama: formData.get('nama'),
        telepon: formData.get('telepon'),
        lapangan: formData.get('lapangan'),
        tanggal: formData.get('tanggal'),
        waktu: formData.get('waktu'),
        durasi: formData.get('durasi')
    };
    
    // Calculate total price
    const prices = {
        'indoor-a': 150000,
        'indoor-b': 180000,
        'vip': 250000
    };
    
    const totalPrice = prices[bookingData.lapangan] * parseInt(bookingData.durasi);
    
    // Display booking details in modal
    bookingDetails.innerHTML = `
        <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
            <h4 style="color: #2a5298; margin-bottom: 0.5rem;">Detail Booking:</h4>
            <p><strong>Nama:</strong> ${bookingData.nama}</p>
            <p><strong>Telepon:</strong> ${bookingData.telepon}</p>
            <p><strong>Lapangan:</strong> ${getLapanganName(bookingData.lapangan)}</p>
            <p><strong>Tanggal:</strong> ${formatDate(bookingData.tanggal)}</p>
            <p><strong>Waktu:</strong> ${bookingData.waktu} (${bookingData.durasi} jam)</p>
            <p><strong>Total Bayar:</strong> Rp ${totalPrice.toLocaleString('id-ID')}</p>
        </div>
        <p style="color: #666; font-size: 0.9rem;">
            <i class="fas fa-info-circle"></i> 
            Silakan lakukan pembayaran DP 50% (Rp ${(totalPrice * 0.5).toLocaleString('id-ID')}) 
            untuk mengkonfirmasi booking Anda.
        </p>
    `;
    
    // Show modal
    modal.style.display = 'block';
    
    // Reset form
    this.reset();
});

// Close modal
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeModal();
    }
});

function closeModal() {
    modal.style.display = 'none';
}

function getLapanganName(lapanganCode) {
    const names = {
        'indoor-a': 'Lapangan Indoor A',
        'indoor-b': 'Lapangan Indoor B',
        'vip': 'Lapangan VIP'
    };
    return names[lapanganCode] || lapanganCode;
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

// Add scroll effect to navbar
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(30, 60, 114, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)';
        header.style.backdropFilter = 'none';
    }
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.lapangan-card, .booking-form, .booking-info, .kontak-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Generate jadwal table
    generateJadwal();
});

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
});

// Form validation
function validateForm() {
    const nama = document.getElementById('nama').value.trim();
    const telepon = document.getElementById('telepon').value.trim();
    const lapangan = document.getElementById('lapangan').value;
    const tanggal = document.getElementById('tanggal').value;
    const waktu = document.getElementById('waktu').value;
    
    if (!nama || !telepon || !lapangan || !tanggal || !waktu) {
        alert('Mohon lengkapi semua field yang diperlukan');
        return false;
    }
    
    // Validate phone number (Indonesian format)
    const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,9}$/;
    if (!phoneRegex.test(telepon.replace(/\s/g, ''))) {
        alert('Mohon masukkan nomor telepon yang valid');
        return false;
    }
    
    return true;
}

// Add form validation to submit
bookingForm.addEventListener('submit', function(e) {
    if (!validateForm()) {
        e.preventDefault();
    }
});

// Add real-time price calculation
document.getElementById('lapangan').addEventListener('change', function() {
    const durasi = document.getElementById('durasi').value;
    updatePriceDisplay(this.value, durasi);
});

document.getElementById('durasi').addEventListener('change', function() {
    const lapangan = document.getElementById('lapangan').value;
    updatePriceDisplay(lapangan, this.value);
});

function updatePriceDisplay(lapangan, durasi) {
    const prices = {
        'indoor-a': 150000,
        'indoor-b': 180000,
        'vip': 250000
    };
    
    if (lapangan && durasi) {
        const totalPrice = prices[lapangan] * parseInt(durasi);
        const priceDisplay = document.createElement('div');
        priceDisplay.innerHTML = `
            <div style="background: #e3f2fd; padding: 1rem; border-radius: 8px; margin-top: 1rem; text-align: center;">
                <strong>Total: Rp ${totalPrice.toLocaleString('id-ID')}</strong>
            </div>
        `;
        
        // Remove existing price display
        const existingPrice = document.querySelector('.price-display');
        if (existingPrice) {
            existingPrice.remove();
        }
        
        priceDisplay.className = 'price-display';
        document.querySelector('.booking-form').appendChild(priceDisplay);
    }
}

// Add search functionality for jadwal
function searchJadwal() {
    const searchTerm = document.getElementById('searchJadwal').value.toLowerCase();
    const rows = document.querySelectorAll('#jadwalBody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Initialize everything when page loads
window.addEventListener('load', function() {
    // Add search input to jadwal section if needed
    const jadwalSection = document.querySelector('.jadwal-section .container');
    if (jadwalSection && !document.getElementById('searchJadwal')) {
        const searchDiv = document.createElement('div');
        searchDiv.style.marginBottom = '1rem';
        searchDiv.innerHTML = `
            <input type="text" id="searchJadwal" placeholder="Cari jadwal..." 
                   style="padding: 8px 12px; border: 1px solid #ddd; border-radius: 5px; width: 200px;">
        `;
        jadwalSection.insertBefore(searchDiv, jadwalSection.querySelector('h2').nextSibling);
        
        document.getElementById('searchJadwal').addEventListener('input', searchJadwal);
    }
});