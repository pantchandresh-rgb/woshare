document.addEventListener("DOMContentLoaded", () => {

    /* -------------------------------
    1. Initialize AOS Animations
    --------------------------------*/

    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 900,
            once: true,
            easing: "ease-out-cubic"
        });
    }


    /* -------------------------------
    2. Navbar Scroll Effect
    --------------------------------*/

    const nav = document.querySelector("nav");

    if (nav) {
        window.addEventListener("scroll", () => {

            if (window.scrollY > 50) {
                nav.classList.add("py-2", "shadow-lg");
                nav.classList.remove("py-4");
            } else {
                nav.classList.add("py-4");
                nav.classList.remove("py-2", "shadow-lg");
            }

        });
    }


    /* -------------------------------
    3. Populate Driver Slider
    --------------------------------*/

    const driverList = document.getElementById("driver-list");

    if (driverList) {

        const drivers = [

            {
                name: "Neha Sharma",
                car: "Hyundai i20",
                img: "https://randomuser.me/api/portraits/women/44.jpg",
                route: "Ghaziabad ↔ Noida 62",
                rating: "4.9",
                rides: "120"
            },

            {
                name: "Priya Mehta",
                car: "Maruti Baleno",
                img: "https://randomuser.me/api/portraits/women/65.jpg",
                route: "Noida 63 ↔ Ghaziabad",
                rating: "4.8",
                rides: "95"
            },

            {
                name: "Aditi Singh",
                car: "Honda City",
                img: "https://randomuser.me/api/portraits/women/22.jpg",
                route: "Ghaziabad ↔ Noida 63",
                rating: "5.0",
                rides: "210"
            },

            {
                name: "Kavya Nair",
                car: "Tata Nexon",
                img: "https://randomuser.me/api/portraits/women/17.jpg",
                route: "Noida 62 ↔ Ghaziabad",
                rating: "4.7",
                rides: "80"
            },

            {
                name: "Ritu Kapoor",
                car: "Maruti Brezza",
                img: "https://randomuser.me/api/portraits/women/32.jpg",
                route: "Ghaziabad ↔ Noida 62",
                rating: "4.9",
                rides: "150"
            }

        ];


        driverList.innerHTML = drivers.map(driver => `

            <div class="swiper-slide text-center">

                <img src="${driver.img}" 
                class="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow-lg object-cover">

                <h4 class="font-bold text-gray-800 text-lg">
                ${driver.name}
                <span class="text-green-500 text-sm">✔</span>
                </h4>

                <p class="text-sm text-gray-500 mb-3">${driver.car}</p>

                <div class="text-xs bg-purple-50 text-purple-700 py-2 px-3 rounded-lg font-bold mb-3">
                ${driver.route}
                </div>

                <p class="text-sm text-yellow-500 font-semibold">
                ⭐ ${driver.rating} • ${driver.rides} rides
                </p>

            </div>

        `).join("");

		import { getRides } from "./firestore.js";

async function loadDrivers() {

const rides = await getRides();

const driverList = document.getElementById("driver-list");

if (!driverList) return;

driverList.innerHTML = rides.map(r => `

<div class="swiper-slide text-center">

<h4 class="font-bold text-lg">${r.driverName}</h4>

<p class="text-sm text-gray-500">${r.car}</p>

<p class="text-xs bg-purple-50 p-2 rounded-lg">${r.route}</p>

</div>

`).join("");

}

loadDrivers();


        /* -------------------------------
        4. Initialize Swiper
        --------------------------------*/

        if (typeof Swiper !== "undefined") {

            new Swiper(".driverSwiper", {

                slidesPerView: 1,
                spaceBetween: 25,
                loop: true,
                grabCursor: true,

                pagination: {
                    el: ".swiper-pagination",
                    clickable: true
                },

                autoplay: {
                    delay: 3500,
                    disableOnInteraction: false
                },

                breakpoints: {

                    640: {
                        slidesPerView: 2
                    },

                    1024: {
                        slidesPerView: 3
                    }

                }

            });

        }

    }


    /* -------------------------------
    5. WhatsApp Booking Helper
    --------------------------------*/

    window.bookRide = (phone, route, time) => {

        const message =
            `Hello! I saw your ride on Womshare for ${route} at ${time}. Can I book a seat?`;

        const encodedMessage = encodeURIComponent(message);

        const whatsappURL =
            `https://wa.me/${phone}?text=${encodedMessage}`;

        window.open(whatsappURL, "_blank");

    };

});


import { addRide } from "./firestore.js";

const rideForm = document.getElementById("rideForm");

if (rideForm) {

rideForm.addEventListener("submit", async (e) => {

e.preventDefault();

const rideData = {

driverName: document.getElementById("name").value,

car: document.getElementById("car").value,

route: document.getElementById("route").value,

time: document.getElementById("time").value,

seats: document.getElementById("seats").value,

createdAt: new Date()

};

await addRide(rideData);

});

}