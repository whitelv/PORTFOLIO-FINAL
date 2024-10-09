function toggleMenu(){
    const menu = document.querySelector(".menu-links")
    const icon = document.querySelector(".hamburger-icon")
    menu.classList.toggle("open")
    icon.classList.toggle("open")
}



const days = document.querySelector(".days")
const hours = document.querySelector(".hours")
const minutes = document.querySelector(".minutes")
const seconds = document.querySelector(".seconds")




const endDiscount = new Date(`November 1 2024  00:00:00`)

function countDownTime(){
    const currentDate = new Date();
    const diff = endDiscount - currentDate;

    const d = Math.floor(diff / 1000 / 60 / 60 / 24);
    const h  = Math.floor(diff / 1000 / 60 / 60) % 24;
    const m  = Math.floor(diff / 1000 / 60) % 60;
    const s  = Math.floor(diff / 1000) % 60;

    days.innerHTML = d.toString().padStart(2,"0");
    hours.innerHTML = h.toString().padStart(2,"0");
    minutes.innerHTML = m.toString().padStart(2,"0");
    seconds.innerHTML = s.toString().padStart(2,"0");
}

setInterval(countDownTime, 1000);
