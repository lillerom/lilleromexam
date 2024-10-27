// script.js
// Hent resultater fra LocalStorage
document.addEventListener('DOMContentLoaded', function() {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=55.9279&longitude=12.3008&current=temperature_2m,wind_speed_10m,precipitation&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m')
        .then(response => response.json())
        .then(data => {
            const weatherDataDiv = document.getElementById('weather-data');
            const current = data.current;
            const hourly = data.hourly;

            weatherDataDiv.innerHTML = `
                <h2></h2>
                <p>Test: ${current.temperature_2m}°C</p>
                <p>Vindhastighed: ${current.wind_speed_10m} m/s</p>
                <p>Nedbør: ${current.precipitation} mm</p>      
            `;
        })
        .catch(error => console.error('Error fetching weather data:', error));
});

document.addEventListener('DOMContentLoaded', function() {
    // Check om brugeren har accepteret cookies og vis banneret hvis ikke
    if (!localStorage.getItem('cookieAccepted')) {
        showCookieBanner();
    }
});

// Funktion til at vise cookie-banneret
function showCookieBanner() {
    const cookieBanner = document.getElementById('cookieBanner');
    cookieBanner.classList.add('show');
    cookieBanner.style.display = 'block';
}

// Funktion til at skjule cookie-banneret
function hideCookieBanner() {
    const cookieBanner = document.getElementById('cookieBanner');
    cookieBanner.classList.remove('show');
    setTimeout(function() {
        cookieBanner.style.display = 'none';
    }, 500); // Matcher transitionens varighed
}

function acceptCookies() {
    // Brugeren accepterer cookies, så vi skjuler banneret og gemmer accept
    hideCookieBanner();
    localStorage.setItem('cookieAccepted', 'true'); // Gem accept i LocalStorage
}

function declineCookies() {
    // Brugeren afviser cookies, så vi skjuler banneret og fjerner eventuel accept
    hideCookieBanner();
    localStorage.removeItem('cookieAccepted'); // Fjern accept fra LocalStorage
    localStorage.removeItem('theme'); // Fjern gemt tema fra LocalStorage
}

// Når siden indlæses, tjekker vi om brugeren allerede har valgt et tema
window.onload = function() {
    const cookieAccepted = localStorage.getItem('cookieAccepted');
    if (cookieAccepted) {
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
    }
};

// Funktion til at skifte mellem temaer
function toggleTheme() {
    const cookieAccepted = localStorage.getItem('cookieAccepted');
    if (!cookieAccepted) {
        // Hvis cookies ikke er accepteret, vis cookie-banneret igen
        showCookieBanner();
        return;
    }

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
        logo.src = 'images/eventulogo.png'; // Skift til normalt logo
    }
}


function toggleMenu() { 
    // Funktion til at vise/skjule menuen
    const menu = document.querySelector('.menu'); 
    // Finder menuen
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block'; 
    // Skifter mellem at vise og skjule menuen
}


async function searchSite() {
    const query = document.getElementById('search').value.toLowerCase();
    if (!query) return;

    // Hent JSON-filen med søgedata
    const response = await fetch('https://lillerom.github.io/lilleromexam/searchData.json');
    const data = await response.json();

    // Filtrer resultater, der matcher søgeordet
    const results = data.filter(page => 
        page.title.toLowerCase().includes(query) || 
        page.description.toLowerCase().includes(query)
    );

    // Gem resultaterne i LocalStorage, og åbn en ny side for at vise dem
    localStorage.setItem('searchResults', JSON.stringify(results));
    window.open('searchResults.html', '_blank');
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
const results = JSON.parse(localStorage.getItem('searchResults'));
const resultsDiv = document.getElementById('results');

// Tjek om der er resultater
if (results && results.length > 0) {
    console.log("Resultater fundet:", results);
    results.forEach(result => {
        const link = document.createElement('a');
        link.href = result.url;
        link.target = '_blank';
        link.textContent = result.title;

        const description = document.createElement('p');
        description.textContent = result.description;

        resultsDiv.appendChild(link);
        resultsDiv.appendChild(description);
    });
} else {
    console.log("Ingen resultater fundet.");
    resultsDiv.textContent = 'Ingen resultater fundet.';
}
