// script.js
import {closeMobileMenu} from "../../components/navbar/navbarScript";

export function initializeIndex() {
    document.addEventListener("DOMContentLoaded", function () {
        const navbarContainer = document.getElementById("navbar-container");

        // if (navbarContainer) {
        //     fetch("../../components/navbar/navbar.html")
        //         .then((response) => response.text())
        //         .then((navbarHtml) => {
        //             navbarContainer.innerHTML = navbarHtml;
        //
        //             const scriptElement = document.createElement('script');
        //             scriptElement.src = '../../components/navbar/navbarScript.js';
        //             document.body.appendChild(scriptElement);
        //         })
        //         .catch((error) => {
        //             console.error("Error loading the navigation bar:", error);
        //         });
        // }


        // const footer = document.getElementById("footer");
        //
        // if (footer) {
        //     fetch("../../components/footer/footer.html")
        //         .then((response) => response.text())
        //         .then((footerHtml) => {
        //             footer.innerHTML = footerHtml;
        //
        //         })
        //         .catch((error) => {
        //             console.error("Error loading the footer:", error);
        //         });
        // }
    });
}

export function resizerIndex() {
    window.addEventListener('resize', function () {
        const mobileBreakpoint = 768; // Example breakpoint
        const mobileMenu = document.querySelector('.mobile-menu');

        if (window.innerWidth > mobileBreakpoint) {
            mobileMenu.style.display = 'none';
            closeMobileMenu()
        } else {
            mobileMenu.style.display = 'block';
        }
    });
}




