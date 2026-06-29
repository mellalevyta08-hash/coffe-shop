// 1. Efek Header Berubah Warna Saat Di-scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// 2. Navigasi Aktif Otomatis Berdasarkan Posisi Halaman (Scroll Spy)
const sections = document.querySelectorAll('section');
const navLi = document.querySelectorAll('nav ul li a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLi.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').includes(current)) {
            a.classList.add('active');
        }
    });
    // 3. Penanganan Form Reservasi
const reservationForm = document.getElementById('reservationForm');

if (reservationForm) {
    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 1. Ambil data dari form
        const name = document.getElementById('name').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const guests = document.getElementById('guests').value;
        
        // 2. Nomor WhatsApp Toko (Ganti dengan nomor aktif toko Anda, gunakan kode negara tanpa tanda '+')
        // Contoh: 628123456789
        const whatsappNumber = "628123456789"; 
        
        // 3. Format pesan yang akan dikirim
        const message = `Halo Admin *Aroma & Éclat*, saya ingin konfirmasi reservasi meja:\n\n` +
                        `• *Nama:* ${name}\n` +
                        `• *Tanggal:* ${date}\n` +
                        `• *Waktu:* ${time}\n` +
                        `• *Jumlah Tamu:* ${guests} Orang\n\n` +
                        `Mohon informasikan ketersediaan ruangannya. Terima kasih!`;
        
        // 4. Encode pesan agar sesuai format URL
        const encodedMessage = encodeURIComponent(message);
        
        // 5. Arahkan pengguna ke WhatsApp
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        window.open(whatsappURL, '_blank');
    });
}
});

// 4. Animasi Reveal on Scroll menggunakan Intersection Observer
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Menambahkan class 'active' untuk memicu transisi CSS
            entry.target.classList.add('active');
            // Menghapus observer setelah animasi berjalan agar tidak berulang saat di-scroll balik (opsional, memberikan kesan bersih)
            observer.unobserve(entry.target); 
        }
    });
}, {
    threshold: 0.15, // Elemen akan terpicu jika 15% bagiannya sudah terlihat di layar
    rootMargin: "0px 0px -50px 0px" // Memberikan sedikit jarak sebelum memicu animasi
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});

// 5. Logika Custom Cursor (Desktop)
const cursor = document.querySelector('.custom-cursor');
const follower = document.querySelector('.custom-cursor-follower');
const interactables = document.querySelectorAll('a, button, .menu-item, .ambiance-item, input, select');

if (cursor && follower) {
    window.addEventListener('mousemove', (e) => {
        // Mengikuti koordinat x dan y dari mouse
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        follower.style.left = e.clientX + 'px';
        follower.style.top = e.clientY + 'px';
    });

    // Efek membesar saat pointer berada di atas elemen interaktif
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            follower.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            follower.classList.remove('hover');
        });
    });
}

// 6. Soft Parallax Effect untuk Latar Belakang Hero
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        let scrollPosition = window.pageYOffset;
        // Menggeser background image sedikit lebih lambat (0.4x) dari kecepatan scroll asli
        hero.style.backgroundPositionY = (scrollPosition * 0.4) + 'px';
    }
});

// 7. Logika Hamburger Menu (Burger Nav)
const burgerToggle = document.getElementById('burgerToggle');
const navLinks = document.getElementById('navLinks');
const navItems = document.querySelectorAll('.nav-links ul li');

if (burgerToggle && navLinks) {
    burgerToggle.addEventListener('click', () => {
        // Toggle Navigasi Keluar/Masuk
        navLinks.classList.toggle('nav-active');
        
        // Toggle Animasi Bentuk Burger ke Silang (X)
        burgerToggle.classList.toggle('toggle');
        
        // Animasi Teks Menu Link agar Muncul Bergantian
        navItems.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                // Memberikan delay bertahap untuk kesan transisi yang mewah
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });

    // Otomatis menutup menu kembali ketika salah satu link diklik
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('nav-active');
            burgerToggle.classList.remove('toggle');
            navItems.forEach(link => link.style.animation = '');
        });
    });
}