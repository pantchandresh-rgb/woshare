// Initialize Animations
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize AOS (Animate on Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }

    // 2. Sticky Navbar Logic
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('shadow-md', 'py-2');
            nav.classList.remove('py-3');
        } else {
            nav.classList.remove('shadow-md', 'py-2');
            nav.classList.add('py-3');
        }
    });

    // 3. Dynamic WhatsApp Link Generator (Utility)
    window.generateWALink = (phone, route, time) => {
        const baseUrl = "https://wa.me/";
        const cleanPhone = phone.replace(/\D/g, ''); // Remove non-digits
        const message = encodeURIComponent(
            `Hello! I found your ride on Womshare.\n📍 Route: ${route}\n⏰ Time: ${time}\nI'd like to book a seat. Is it available?`
        );
        return `${baseUrl}${cleanPhone}?text=${message}`;
    };

    // 4. Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// 5. Global Error Handling for UI
window.showToast = (message, type = 'info') => {
    const toast = document.createElement('div');
    toast.className = `fixed bottom-5 right-5 px-6 py-3 rounded-xl text-white font-bold transition-all transform translate-y-20 z-[100]`;
    toast.style.backgroundColor = type === 'error' ? '#fb7185' : '#7c3aed';
    toast.innerText = message;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => toast.style.transform = 'translateY(0)', 100);
    // Remove after 3s
    setTimeout(() => {
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => toast.remove(), 500);
    }, 3000);
};