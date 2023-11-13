document.addEventListener("DOMContentLoaded", function () {
    const navbarContainer = document.getElementById("navbar-container");

    if (navbarContainer) {
        fetch("../../components/navbar/navbar.html")
            .then((response) => response.text())
            .then((navbarHtml) => {
                navbarContainer.innerHTML = navbarHtml;

                const scriptElement = document.createElement('script');
                scriptElement.src = '../../components/navbar/navbarScript.js';
                document.body.appendChild(scriptElement);
            })
            .catch((error) => {
                console.error("Error loading the navigation bar:", error);
            });
    }

    const footer = document.getElementById("footer");

    if (footer) {
        fetch("/components/footer/footer.html")
            .then((response) => response.text())
            .then((footerHtml) => {
                footer.innerHTML = footerHtml;

            })
            .catch((error) => {
                console.error("Error loading the footer:", error);
            });
    }
});



