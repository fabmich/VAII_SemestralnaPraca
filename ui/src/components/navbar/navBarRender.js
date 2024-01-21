import React, {useEffect, useState} from "react";
import "./navBarStyleSheet.css";
import {closeMobileMenu, openMobileNavbar, toggleMobileNavbar} from './navbarScript.js'
import {useKeycloak} from "@react-keycloak/web";
import navBarLogoImage from '../../../../ui/src/pictures/navBarLogo.png';
import {Link} from "react-router-dom";
import {KeycloakLogoutOptions} from "keycloak-js";


function NavBar() {
    const {keycloak, initialized} = useKeycloak();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

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

    const handleLogoutClick = () => {
        keycloak.logout("/")
    };


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
                    <li><Link to="/projekty">Projekty</Link></li>
                    <li><Link to="/kontakty">Kontakty</Link></li>
                    {/*<li> {isMobile ? ("Odhlásiť sa") : ("")  } </li>*/}
                </ul>
            </div>
            <div className="website-name website-name-extended">
                {/*Workflow Manager*/}
                {keycloak.authenticated ?
                    <span className="logout-link" onClick={() => keycloak.logout()}>
                    Odhlásiť sa  ({(keycloak.tokenParsed.preferred_username)})
                </span>
                    :
                    <span className="logout-link" onClick={() => keycloak.login()}>
                    Prihlásiť sa
                </span>
                }


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
