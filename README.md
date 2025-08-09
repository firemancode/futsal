# Futsal Arena — Situs Informasi Penyewaan Lapangan Futsal

Situs statis yang menampilkan informasi penyewaan lapangan futsal: daftar lapangan, harga, jadwal (contoh), fasilitas, lokasi, dan kontak/WhatsApp.

## Menjalankan secara lokal

- Buka file `futsal-site/index.html` langsung di browser, atau
- Jalankan server statis:

```bash
python3 -m http.server --directory /workspace/futsal-site 8000
```

Lalu buka `http://localhost:8000` di browser Anda.

## Kustomisasi

- Ubah nomor WhatsApp pada `script.js` di variabel `phoneNumber`.
- Perbarui daftar lapangan, harga, serta jadwal contoh di `script.js` sesuai kebutuhan.
- Edit teks, alamat, dan peta di `index.html`.

## Struktur

- `futsal-site/index.html` — Halaman utama
- `futsal-site/styles.css` — Gaya tampilan
- `futsal-site/script.js` — Interaktivitas dan data contoh