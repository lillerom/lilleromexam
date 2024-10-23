// script.js

// Når siden indlæses, tjekker vi om brugeren allerede har valgt et tema
window.onload = function() {
    const savedTheme = localStorage.getItem('theme'); // Tjek gemt tema i LocalStorage
    const themeStyle = document.getElementById('theme-style'); // Hent <link> til CSS
    const themeToggle = document.getElementById('theme-toggle'); // Tema-ikonet
    const logo = document.getElementById('logo'); // Referencer til logoet
    
    if (savedTheme) {
        // Hvis der er gemt et tema, anvend det
        themeStyle.setAttribute('href', savedTheme);

        // Opdater ikonet og logoet afhængigt af tema
        if (savedTheme === 'dark.css') {
            themeToggle.src = 'images/sol.png'; // Ændrer ikonet til sol (mørkt tema aktivt)
            logo.src = 'images/eventulogodarkmode.png'; // Skift til dark mode logo
        } else {
            themeToggle.src = 'images/maane.png'; // Ændrer ikonet til måne (lyst tema aktivt)
            logo.src = 'images/eventulogo.png'; // Skift til normalt mode logo
        }
    }
};

// Funktion til at skifte mellem temaer
function toggleTheme() {
    const themeStyle = document.getElementById('theme-style');
    const currentTheme = themeStyle.getAttribute('href'); // Tjek hvilket tema der bruges nu
    const themeToggle = document.getElementById('theme-toggle'); // Tema-ikonet
    const logo = document.getElementById('logo'); // Referencer til logoet

    if (currentTheme === 'normal.css') {
        // Skift til dark.css og gem det i LocalStorage
        themeStyle.setAttribute('href', 'dark.css');
        localStorage.setItem('theme', 'dark.css'); // Gem valget i LocalStorage
        themeToggle.src = 'images/sol.png'; // Ændrer ikonet til sol for mørkt tema
        logo.src = 'images/eventulogodarkmode.png'; // Skift til dark mode logo
    } else {
        // Skift til normal.css og gem det i LocalStorage
        themeStyle.setAttribute('href', 'normal.css');
        localStorage.setItem('theme', 'normal.css'); // Gem valget i LocalStorage
        themeToggle.src = 'images/maane.png'; // Ændrer ikonet til måne for lyst tema
        logo.src = 'images/eventulogo.png'; // Skift til normalt mode logo
    }
}

function toggleMenu() { 
    // Funktion til at vise/skjule menuen
    const menu = document.querySelector('.menu'); 
    // Finder menuen
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block'; 
    // Skifter mellem at vise og skjule menuen
}


function searchSite() {
    const query = document.getElementById('search').value;
    if (query) {
        window.find(query);
    }
}


function searchSite() {
    const query = document.getElementById('search').value;
    if (query) {
        // Brug en mere robust søgefunktion
        if (!window.find(query)) {
            alert('Søgeordet blev ikke fundet.');
        }
    }
}

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slide");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex-1].style.display = "block";
}

document.addEventListener('DOMContentLoaded', function() {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=55.6759&longitude=12.5655&current=temperature_2m,wind_speed_10m,precipitation&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m')
        .then(response => response.json())
        .then(data => {
            const weatherDataDiv = document.getElementById('weather-data');
            const current = data.current;
            const hourly = data.hourly;

            weatherDataDiv.innerHTML = `
                <h2>Vejret lige nu</h2>
                <p>Temperature: ${current.temperature_2m}°C</p>
                <p>Wind Speed: ${current.wind_speed_10m} m/s</p>
                <p>Rain: ${current.precipitation} mm</p>  
                   
            `;
        })
        .catch(error => console.error('Error fetching weather data:', error));
});





