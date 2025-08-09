(function () {
  const phoneNumber = "6281234567890"; // Ganti ke nomor WA Anda

  const fields = [
    {
      id: "A",
      name: "Lapangan A",
      surface: "Rumput sintetis",
      size: "20 × 40 m",
      pricePerHour: 150000,
      image:
        "https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "B",
      name: "Lapangan B",
      surface: "Vinyl premium",
      size: "18 × 36 m",
      pricePerHour: 130000,
      image:
        "https://images.unsplash.com/photo-1609692814858-fd2b2e1f9c6d?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "C",
      name: "Lapangan C",
      surface: "Rumput sintetis pro",
      size: "20 × 40 m",
      pricePerHour: 180000,
      image:
        "https://images.unsplash.com/photo-1559703248-dcaaec9fab78?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  // Contoh jadwal yang sudah dipesan (hari ini). Format "HH:MM-HH:MM".
  const bookedToday = {
    A: ["09:00-10:00", "17:00-18:00", "20:00-21:00"],
    B: ["10:00-11:00", "19:00-20:00"],
    C: ["08:00-09:00", "21:00-22:00"],
  };

  function rupiah(amount) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(amount);
  }

  function buildWhatsAppLink(message) {
    const encoded = encodeURIComponent(message);
    return `https://wa.me/${phoneNumber}?text=${encoded}`;
  }

  function renderFieldCards() {
    const container = document.getElementById("fieldCards");
    if (!container) return;

    container.innerHTML = fields
      .map((f) => {
        const msg = `Halo, saya ingin reservasi ${f.name}. Mohon info ketersediaan jadwal hari ini.`;
        const waLink = buildWhatsAppLink(msg);
        return `
          <article class="card">
            <img src="${f.image}" alt="${f.name}" />
            <div class="card-body">
              <h3 class="card-title">${f.name}</h3>
              <div class="card-meta">${f.surface} • ${f.size}</div>
              <div class="card-meta">Mulai ${rupiah(f.pricePerHour)}/jam</div>
              <div class="card-actions">
                <a href="#jadwal" class="btn btn-outline">Cek Jadwal</a>
                <a class="btn btn-primary" target="_blank" rel="noreferrer" href="${waLink}">Reservasi</a>
              </div>
            </div>
          </article>`;
      })
      .join("");
  }

  function generateSlots(start = 8, end = 23) {
    const slots = [];
    for (let hour = start; hour < end; hour += 1) {
      const h = String(hour).padStart(2, "0");
      const h2 = String(hour + 1).padStart(2, "0");
      slots.push(`${h}:00-${h2}:00`);
    }
    return slots;
  }

  function isSoon(slot) {
    // Tandai slot "segera" jika akan dimulai dalam 60 menit dari sekarang
    const [start] = slot.split("-");
    const [h, m] = start.split(":").map(Number);
    const now = new Date();
    const slotDate = new Date(now);
    slotDate.setHours(h, m, 0, 0);
    const diffMs = slotDate - now;
    return diffMs > 0 && diffMs <= 60 * 60 * 1000;
  }

  function renderSchedule() {
    const root = document.getElementById("schedule");
    if (!root) return;

    const today = new Date();
    const dayLabel = today.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "2-digit",
      month: "long",
    });

    const slots = generateSlots(8, 23);

    let html = "";
    html += `<div style="padding: 12px 14px; color: var(--muted)">Jadwal ${dayLabel}</div>`;
    html += `<table class="schedule-table">`;

    // Head
    html += `<thead><tr><th>Lapangan</th>`;
    html += slots.map((s) => `<th>${s.replace(":00", "")}</th>`).join("");
    html += `</tr></thead>`;

    // Body per field
    html += `<tbody>`;
    for (const f of fields) {
      html += `<tr>`;
      html += `<th style="text-align:left">${f.name}</th>`;
      for (const s of slots) {
        const booked = (bookedToday[f.id] || []).includes(s);
        const cls = booked ? "no" : isSoon(s) ? "soon" : "ok";
        const label = booked ? "Penuh" : isSoon(s) ? "Segera" : "OK";
        html += `<td><span class="slot ${cls}">${label}</span></td>`;
      }
      html += `</tr>`;
    }
    html += `</tbody>`;

    html += `</table>`;

    root.innerHTML = html;
  }

  function hydrateContact() {
    const year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());

    const waHero = document.getElementById("waHero");
    if (waHero) {
      const msg = "Halo, saya ingin tanya ketersediaan lapangan futsal hari ini.";
      waHero.href = buildWhatsAppLink(msg);
    }

    const waKontak = document.getElementById("waKontak");
    if (waKontak) {
      waKontak.textContent = `wa.me/${phoneNumber}`;
      waKontak.href = buildWhatsAppLink("Halo admin Futsal Arena");
    }

    const waReservasi = document.getElementById("waReservasi");
    if (waReservasi) {
      waReservasi.href = buildWhatsAppLink("Halo, saya ingin reservasi lapangan");
    }

    const telKontak = document.getElementById("telKontak");
    if (telKontak) {
      telKontak.href = `tel:+${phoneNumber}`;
    }

    const select = document.getElementById("lapanganSelect");
    if (select) {
      select.innerHTML = fields.map((f) => `<option value="${f.name}">${f.name}</option>`).join("");
    }

    const waFormBtn = document.getElementById("waForm");
    if (waFormBtn) {
      waFormBtn.addEventListener("click", () => {
        const form = waFormBtn.closest("form");
        if (!form) return;
        const [nama, tanggal, jam] = form.querySelectorAll("input");
        const lapangan = form.querySelector("select");
        const catatan = form.querySelector("textarea");
        const pesan = `Halo admin Futsal Arena,\n\nNama: ${nama.value}\nLapangan: ${lapangan.value}\nTanggal: ${tanggal.value}\nJam: ${jam.value}\nCatatan: ${catatan.value}\n\nMohon konfirmasi ketersediaan. Terima kasih.`;
        window.open(buildWhatsAppLink(pesan), "_blank");
      });
    }

    const navToggle = document.getElementById("navToggle");
    const navLinks = document.getElementById("navLinks");
    if (navToggle && navLinks) {
      navToggle.addEventListener("click", () => navLinks.classList.toggle("show"));
      navLinks.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => navLinks.classList.remove("show")));
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderFieldCards();
    renderSchedule();
    hydrateContact();
  });
})();