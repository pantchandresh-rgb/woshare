document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Scroll Animations (AOS)
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 1000, once: true });
    }

    // 2. Navbar Scroll Effect
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('py-2', 'shadow-lg');
            nav.classList.remove('py-4');
        } else {
            nav.classList.add('py-4');
            nav.classList.remove('py-2', 'shadow-lg');
        }
    });

    // 3. Populate Driver Slider
    const driverList = document.getElementById('driver-list');
    if (driverList) {
        const drivers = [
            { name: "Neha Sharma", car: "Hyundai i20", img: "https://randomuser.me/api/portraits/women/44.jpg", route: "Ghaziabad ↔ Noida 62" },
            { name: "Priya Mehta", car: "Maruti Baleno", img: "https://randomuser.me/api/portraits/women/65.jpg", route: "Noida 63 ↔ Ghaziabad" },
            { name: "Aditi Singh", car: "Honda City", img: "https://randomuser.me/api/portraits/women/22.jpg", route: "Ghaziabad ↔ Noida 63" },
            { name: "Kavya Nair", car: "Tata Nexon", img: "https://randomuser.me/api/portraits/women/17.jpg", route: "Noida 62 ↔ Ghaziabad" },
            { name: "Ritu Kapoor", car: "Maruti Brezza", img: "https://randomuser.me/api/portraits/women/32.jpg", route: "Ghaziabad ↔ Noida 62" }
        ];

        driverList.innerHTML = drivers.map(d => `
            <div class="swiper-slide bg-white p-8 rounded-[2rem] shadow-sm border border-purple-50 text-center hover:border-purple-200 transition-all">
                <img src="${d.img}" class="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow-lg object-cover">
                <h4 class="font-bold text-gray-800 text-lg">${d.name}</h4>
                <p class="text-sm text-gray-500 mb-4">${d.car}</p>
                <div class="text-[10px] uppercase tracking-tighter bg-purple-50 text-purple-700 py-2 px-3 rounded-lg font-bold">${d.route}</div>
            </div>
        `).join('');

        // Initialize Swiper
        new Swiper(".driverSwiper", {
            slidesPerView: 1,
            spaceBetween: 20,
            pagination: { el: ".swiper-pagination", clickable: true },
            breakpoints: {
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
            }
        });
    }

    // 4. WhatsApp Booking Helper
    window.bookRide = (phone, route, time) => {
        const msg = encodeURIComponent(`Hello! I saw your ride on Womshare for ${route} at ${time}. Can I book a seat?`);
        window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
    };
});