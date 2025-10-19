// script.js
// Hent resultater fra LocalStorage
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





function toggleMenu() { 
    // Funktion til at vise/skjule menuen
    const menu = document.querySelector('.menu'); 
    // Finder menuen
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block'; 
    // Skifter mellem at vise og skjule menuen
}


function searchSite() {
    var query = document.getElementById('search').value;
    if (query) {
        window.location.href = 'searchResults.html?q=' + encodeURIComponent(query);
    }
    return false; // Forhindrer formens standardindsendelse
}
