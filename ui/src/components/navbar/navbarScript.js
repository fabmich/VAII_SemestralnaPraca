
let isMobileMenuOpen = false;

export function closeMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    mobileMenu.style.display = 'none';
    navLinks.classList.remove('active');
}
export function toggleMobileNavbar(event) {
    event.stopPropagation(); // Stop event propagation

    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    isMobileMenuOpen = !isMobileMenuOpen;

    if (isMobileMenuOpen) {
        navLinks.classList.add('active');
    } else {
        navLinks.classList.remove('active');
    }
}