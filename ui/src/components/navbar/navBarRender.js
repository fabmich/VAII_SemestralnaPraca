import React, {useEffect} from "react";
import "./navBarStyleSheet.css";
import {closeMobileMenu, openMobileNavbar, toggleMobileNavbar} from './navbarScript.js'

import navBarLogoImage from '../../../../ui/src/pictures/navBarLogo.png';
import {Link} from "react-router-dom";

function NavBar() {
    useEffect(() => {
        const mobileMenu = document.getElementById("mobile-menu");
        if (mobileMenu) {
            mobileMenu.addEventListener("click", toggleMobileNavbar);
        }

        return () => {
            if (mobileMenu) {
                mobileMenu.removeEventListener("click", toggleMobileNavbar);
            }
        };
    }, []);

    return (
        <nav className="navbar">
            <div className="logo">
                <img src={navBarLogoImage} alt="Logo"></img>
            </div>

            <div id="nav-links" className="nav-links">
                <ul>
                    <li><Link to="/home">Domov</Link></li>
                    <li><Link to="/zamestnanci">Zamestnanci</Link></li>
                    <li><Link to="/ulohy">Úlohy</Link></li>
                    <li><Link to="/projects">Projekty</Link></li>
                    <li><Link to="/contacts">Kontakty</Link></li>
                </ul>
            </div>
            <div className="website-name website-name-extended">
                Workflow Manager
            </div>
            <div id="mobile-menu" className="mobile-menu">
                <div className="hamburger-menu">
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
            </div>
        </nav>
    );

}

export default NavBar;
