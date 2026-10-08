/* =========================
   UNDANGAN PERNIKAHAN
========================= */

const tanggalPernikahan = new Date("2027-01-15T09:00:00+07:00").getTime();

/* BUKA UNDANGAN */
function bukaUndangan() {
    const opening = document.getElementById("opening");
    const main = document.getElementById("main-content");
    const musicButton = document.getElementById("musicButton");

    opening.classList.add("hidden");
    main.classList.remove("hidden");
    musicButton.classList.add("show");
    document.body.classList.remove("locked");

    window.scrollTo({ top: 0, behavior: "smooth" });
}

/* COUNTDOWN */
function updateCountdown() {
    const sekarang = Date.now();
    const jarak = tanggalPernikahan - sekarang;

    const hari = Math.max(Math.floor(jarak / 86400000), 0);
    const jam = Math.max(Math.floor((jarak % 86400000) / 3600000), 0);
    const menit = Math.max(Math.floor((jarak % 3600000) / 60000), 0);
    const detik = Math.max(Math.floor((jarak % 60000) / 1000), 0);

    document.getElementById("days").textContent = hari;
    document.getElementById("hours").textContent = jam;
    document.getElementById("minutes").textContent = menit;
    document.getElementById("seconds").textContent = detik;
}

updateCountdown();
setInterval(updateCountdown, 1000);

/* UCAPAN & DOA
   Disimpan di browser pengunjung. Untuk penyimpanan online,
   perlu backend/database seperti Firebase/Supabase/PHP. */
function kirimUcapan(event) {
    event.preventDefault();

    const nama = document.getElementById("nama").value.trim();
    const ucapan = document.getElementById("ucapanText").value.trim();

    if (!nama || !ucapan) return;

    const div = document.createElement("div");
    div.className = "wish";

    const strong = document.createElement("strong");
    strong.textContent = nama;

    const p = document.createElement("p");
    p.textContent = ucapan;

    div.append(strong, p);
    document.getElementById("daftarUcapan").prepend(div);

    document.getElementById("nama").value = "";
    document.getElementById("ucapanText").value = "";
}

/* GALERI / LIGHTBOX */
function bukaFoto(src, caption) {
    const lightbox = document.getElementById("lightbox");
    document.getElementById("lightboxImage").src = src;
    document.getElementById("lightboxImage").alt = caption;
    document.getElementById("lightboxCaption").textContent = caption;
    lightbox.classList.add("show");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("locked");
}

function tutupFoto(event) {
    if (event && event.target.id === "lightboxImage") return;

    const lightbox = document.getElementById("lightbox");
    lightbox.classList.remove("show");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("locked");
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        tutupFoto();
    }
});

/* WHATSAPP */
function bagikanWhatsApp() {
    const pesan =
        "Assalamu'alaikum. Kami mengundang Anda untuk hadir dalam acara pernikahan Ifan Maulana & Firma Naelun Tazila pada 15 Januari 2027. Silakan buka undangan kami.";

    const url = "https://wa.me/?text=" + encodeURIComponent(pesan);
    window.open(url, "_blank", "noopener");
}

/* SALIN LINK */
async function salinLink() {
    const status = document.getElementById("copyStatus");

    try {
        await navigator.clipboard.writeText(window.location.href);
        status.textContent = "Link undangan berhasil disalin.";
    } catch {
        status.textContent = "Silakan salin alamat halaman dari browser.";
    }

    setTimeout(() => {
        status.textContent = "";
    }, 3000);
}

/* MUSIK
   Belum menyalakan audio karena file musik belum disertakan.
   Setelah punya MP3, tambahkan:
   <audio id="weddingMusic" src="musik.mp3" loop></audio>
   lalu fungsi ini bisa diaktifkan. */
let musikSedangDiputar = false;

function toggleMusic() {
    const audio = document.getElementById("weddingMusic");
    const button = document.getElementById("musicButton");

    if (!audio) {
        alert("Musik belum ditambahkan. Jika Anda mengirim file MP3, musik bisa dipasang ke tombol ini.");
        return;
    }

    if (musikSedangDiputar) {
        audio.pause();
        button.classList.remove("playing");
        button.textContent = "🎵";
    } else {
        audio.play()
            .then(() => {
                button.classList.add("playing");
                button.textContent = "⏸️";
            })
            .catch(() => {
                alert("Browser memblokir pemutaran otomatis. Tekan tombol musik sekali lagi.");
            });
    }

    musikSedangDiputar = !musikSedangDiputar;
}

/* Kunci scroll saat cover masih terbuka */
document.body.classList.add("locked");
