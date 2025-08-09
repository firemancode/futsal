# Futsal Center - Website Penyewaan Lapangan Futsal

Website modern dan responsif untuk menampilkan informasi penyewaan lapangan futsal dengan fitur booking online.

## 🚀 Fitur Utama

### 1. **Tampilan Lapangan**
- Informasi detail 3 jenis lapangan (Indoor A, Indoor B, VIP)
- Gambar lapangan dengan efek hover
- Spesifikasi ukuran, kapasitas, dan fasilitas
- Harga per jam yang transparan

### 2. **Sistem Booking Online**
- Form booking yang user-friendly
- Validasi input real-time
- Kalkulasi harga otomatis
- Konfirmasi booking dengan modal popup
- Pembatasan tanggal (minimal hari ini)

### 3. **Jadwal Real-time**
- Tabel jadwal harian dengan status ketersediaan
- Warna berbeda untuk status "Tersedia" dan "Terbooking"
- Fitur pencarian jadwal
- Jam operasional 08:00 - 23:00

### 4. **Desain Responsif**
- Mobile-first design
- Navigation hamburger menu untuk mobile
- Grid layout yang adaptif
- Animasi smooth scrolling

### 5. **Informasi Kontak**
- Alamat lengkap dengan Google Maps
- Nomor telepon dan WhatsApp
- Email dan social media links
- Jam operasional

## 🛠️ Teknologi yang Digunakan

- **HTML5** - Struktur semantik
- **CSS3** - Styling modern dengan Flexbox dan Grid
- **JavaScript (ES6+)** - Interaktivitas dan validasi
- **Font Awesome** - Icons
- **Google Fonts** - Typography

## 📁 Struktur File

```
futsal-center/
├── index.html          # File HTML utama
├── styles.css          # File CSS styling
├── script.js           # File JavaScript
└── README.md           # Dokumentasi
```

## 🎨 Desain & UX

### Color Scheme
- **Primary**: #2a5298 (Blue)
- **Secondary**: #1e3c72 (Dark Blue)
- **Accent**: #ffd700 (Gold)
- **Success**: #2e7d32 (Green)
- **Error**: #c62828 (Red)

### Typography
- **Font Family**: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- **Responsive**: Font size menyesuaikan dengan screen size

### Animations
- Smooth scrolling navigation
- Hover effects pada cards
- Loading animations
- Modal popup dengan slide effect

## 📱 Responsive Breakpoints

- **Desktop**: > 768px
- **Tablet**: 768px - 480px
- **Mobile**: < 480px

## 🔧 Cara Menjalankan

1. **Clone atau download** semua file ke direktori lokal
2. **Buka file** `index.html` di browser modern
3. **Atau gunakan live server** untuk development

```bash
# Jika menggunakan Python
python -m http.server 8000

# Jika menggunakan Node.js
npx serve .

# Jika menggunakan PHP
php -S localhost:8000
```

## 📋 Fitur Booking

### Validasi Form
- Nama wajib diisi
- Nomor telepon format Indonesia
- Tanggal minimal hari ini
- Semua field required

### Kalkulasi Harga
- **Lapangan Indoor A**: Rp 150.000/jam
- **Lapangan Indoor B**: Rp 180.000/jam
- **Lapangan VIP**: Rp 250.000/jam

### Sistem Pembayaran
- DP 50% saat booking
- Pembayaran lunas saat check-in
- Pembatalan maksimal 2 jam sebelum jadwal

## 🎯 Target Pengguna

- **Tim futsal** yang ingin booking lapangan
- **Event organizer** untuk turnamen
- **Pelatih** untuk sesi latihan
- **Pemain casual** untuk bermain santai

## 🔄 Update & Maintenance

### Jadwal Update
- Jadwal di-generate secara dinamis
- Status ketersediaan random (untuk demo)
- Bisa diintegrasikan dengan database real

### Backup & Recovery
- Semua data tersimpan di localStorage
- Form validation mencegah data error
- Modal confirmation untuk setiap booking

## 📞 Kontak & Support

### Informasi Lapangan
- **Alamat**: Jl. Futsal No. 123, Jakarta Selatan
- **Telepon**: +62 21 1234 5678
- **WhatsApp**: +62 812 3456 7890
- **Email**: info@futsalcenter.com

### Jam Operasional
- **Senin - Minggu**: 08:00 - 23:00
- **Booking Online**: 24/7

## 🚀 Deployment

Website ini bisa di-deploy ke berbagai platform:

### Static Hosting
- **Netlify**: Drag & drop folder
- **Vercel**: Connect GitHub repository
- **GitHub Pages**: Push ke repository

### Web Server
- **Apache**: Upload ke htdocs
- **Nginx**: Configure static files
- **IIS**: Setup virtual directory

## 🔒 Keamanan

- Form validation di client-side
- Sanitasi input data
- HTTPS recommended untuk production
- Regular security updates

## 📈 Analytics & Monitoring

Untuk production, disarankan menambahkan:
- Google Analytics
- Error tracking (Sentry)
- Performance monitoring
- User behavior analytics

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Dibuat dengan ❤️ untuk komunitas futsal Indonesia**
