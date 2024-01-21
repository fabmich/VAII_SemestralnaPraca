import React from "react";
import "./loginRenderStylesheet.css"
import { useKeycloak } from "@react-keycloak/web";
import navBarLogoImage from '../../pictures/navBarLogo.png';

function LoginRender() {

    const {keycloak} = useKeycloak();

    return (
        <div className="container">
            <header>
                <div className="logo-container">
                    <img src={navBarLogoImage} alt="Navbar Logo" className="logo" />
                </div>
                <h1>WorkFlow Manager</h1>
            </header>

            <div className="content">
                <p>This is some text below the header.</p>

                <div className="authButtons">
                    {!keycloak.authenticated && (
                        <button
                            type="button"
                            className="loginButton"
                            onClick={() => keycloak.login()}
                        >
                            Prihlásiť sa
                        </button>
                    )}

                    {!!keycloak.authenticated && (
                        <button
                            type="button"
                            className="logoutbtn"
                            onClick={() => keycloak.logout()}
                        >
                            Odhlásiť sa ({keycloak.tokenParsed.preferred_username})
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
export default LoginRender;