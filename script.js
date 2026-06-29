window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});


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
   
const reservationForm = document.getElementById('reservationForm');

if (reservationForm) {
    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const guests = document.getElementById('guests').value;
        
    
        const whatsappNumber = "628123456789"; 
        
       
        const message = `Halo Admin *Aroma & Éclat*, saya ingin konfirmasi reservasi meja:\n\n` +
                        `• *Nama:* ${name}\n` +
                        `• *Tanggal:* ${date}\n` +
                        `• *Waktu:* ${time}\n` +
                        `• *Jumlah Tamu:* ${guests} Orang\n\n` +
                        `Mohon informasikan ketersediaan ruangannya. Terima kasih!`;
        
        
        const encodedMessage = encodeURIComponent(message);
        
        
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        window.open(whatsappURL, '_blank');
    });
}
});


const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            
            entry.target.classList.add('active');
            observer.unobserve(entry.target); 
        }
    });
}, {
    threshold: 0.15, 
    rootMargin: "0px 0px -50px 0px"
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});


const cursor = document.querySelector('.custom-cursor');
const follower = document.querySelector('.custom-cursor-follower');
const interactables = document.querySelectorAll('a, button, .menu-item, .ambiance-item, input, select');

if (cursor && follower) {
    window.addEventListener('mousemove', (e) => {
        
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        follower.style.left = e.clientX + 'px';
        follower.style.top = e.clientY + 'px';
    });

    
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


window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        let scrollPosition = window.pageYOffset;
        hero.style.backgroundPositionY = (scrollPosition * 0.4) + 'px';
    }
});


const burgerToggle = document.getElementById('burgerToggle');
const navLinks = document.getElementById('navLinks');
const navItems = document.querySelectorAll('.nav-links ul li');

if (burgerToggle && navLinks) {
    burgerToggle.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        
        
        burgerToggle.classList.toggle('toggle');
        
        
        navItems.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });

    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('nav-active');
            burgerToggle.classList.remove('toggle');
            navItems.forEach(link => link.style.animation = '');
        });
    });
}
