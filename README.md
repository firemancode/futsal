# 🏟️ Futsal Center - Website Penyewaan Lapangan

Website modern dan responsif untuk penyewaan lapangan futsal dengan fitur booking online, informasi harga, dan kontak yang lengkap.

## ✨ Fitur Utama

### 🏠 **Beranda**
- Hero section dengan background menarik
- Call-to-action untuk booking langsung
- Navigasi smooth scroll

### 🏟️ **Informasi Lapangan**
- 3 lapangan indoor dengan spesifikasi berbeda
- Status ketersediaan real-time
- Gambar dan deskripsi fasilitas
- Animasi hover yang menarik

### 💰 **Daftar Harga**
- Harga weekday, weekend, dan malam
- Paket populer dengan badge khusus
- Informasi jam operasional
- Fasilitas yang termasuk

### 📅 **Sistem Booking**
- Form booking yang user-friendly
- Validasi input real-time
- Kalkulator harga otomatis
- Konfirmasi booking dengan loading state

### 📞 **Kontak & Informasi**
- Form kontak yang lengkap
- Informasi lokasi dan jam operasional
- Social media links
- Validasi email dan telepon

## 🛠️ Teknologi yang Digunakan

- **HTML5** - Struktur semantik yang bersih
- **CSS3** - Styling modern dengan Flexbox dan Grid
- **JavaScript (ES6+)** - Interaktivitas dan validasi form
- **Font Awesome** - Icon library
- **Responsive Design** - Mobile-first approach

## 🎨 Fitur Desain

### Responsive Design
- Mobile-first approach
- Breakpoints: 480px, 768px, 1200px
- Hamburger menu untuk mobile
- Touch-friendly interface

### Animasi & Efek
- Smooth scrolling navigation
- Fade-in animations on scroll
- Hover effects pada cards
- Loading animations
- Countdown timer (demo)

### UI/UX Features
- Modern gradient backgrounds
- Card-based layout
- Consistent color scheme
- Typography hierarchy
- Interactive form elements

## 📱 Responsivitas

Website ini fully responsive dengan breakpoints:
- **Mobile**: < 480px
- **Tablet**: 480px - 768px  
- **Desktop**: > 768px

## 🚀 Cara Menjalankan

1. **Clone repository**
   ```bash
   git clone [repository-url]
   cd futsal-center
   ```

2. **Buka file index.html**
   - Buka file `index.html` di browser
   - Atau gunakan live server extension di VS Code

3. **Atau gunakan Python server**
   ```bash
   python -m http.server 8000
   ```
   Kemudian buka `http://localhost:8000`

## 📋 Struktur File

```
futsal-center/
├── index.html          # File HTML utama
├── styles.css          # File CSS styling
├── script.js           # File JavaScript
└── README.md           # Dokumentasi
```

## 🎯 Fitur JavaScript

### Form Handling
- Validasi input real-time
- Phone number validation (format Indonesia)
- Email validation
- Date/time validation
- Loading states

### Interactive Features
- Mobile navigation toggle
- Smooth scrolling
- Scroll-based animations
- Active navigation highlighting
- Price calculator
- Availability checker (demo)

### User Experience
- Success/error messages
- Form auto-reset
- Minimum date validation
- Responsive countdown timer

## 🎨 Color Scheme

- **Primary**: #27ae60 (Green)
- **Secondary**: #2c3e50 (Dark Blue)
- **Accent**: #3498db (Blue)
- **Background**: #f8f9fa (Light Gray)
- **Text**: #333 (Dark Gray)

## 📞 Informasi Kontak (Demo)

- **Telepon**: 0812-3456-7890
- **Email**: info@futsalcenter.com
- **Alamat**: Jl. Futsal No. 123, Jakarta Selatan
- **Jam Operasional**: 08:00 - 02:00 (Setiap Hari)

## 💰 Daftar Harga (Demo)

| Paket | Harga | Jam Operasional |
|-------|-------|-----------------|
| Weekday | Rp 150.000/jam | Senin-Jumat, 08:00-22:00 |
| Weekend | Rp 200.000/jam | Sabtu-Minggu, 08:00-22:00 |
| Malam | Rp 180.000/jam | Setiap hari, 22:00-02:00 |

## 🔧 Customization

### Mengubah Informasi
1. Edit file `index.html` untuk mengubah konten
2. Update `styles.css` untuk styling
3. Modifikasi `script.js` untuk interaktivitas

### Menambah Lapangan
1. Duplikasi section `.lapangan-card`
2. Update gambar dan deskripsi
3. Tambahkan ke form booking

### Mengubah Harga
1. Update harga di `index.html`
2. Sesuaikan kalkulator di `script.js`

## 🌟 Fitur Tambahan

### Demo Features
- Random availability checker
- Countdown timer promo
- Simulated API calls
- Loading animations

### Real Implementation
Untuk implementasi nyata, tambahkan:
- Backend API integration
- Database untuk booking
- Payment gateway
- Email notifications
- Admin panel

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

Untuk pertanyaan atau dukungan, silakan hubungi:
- Email: support@futsalcenter.com
- Telepon: 0812-3456-7890

---

**Dibuat dengan ❤️ untuk komunitas futsal Indonesia**