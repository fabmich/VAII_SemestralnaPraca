import React from "react";
import "./loginRenderStylesheet.css"
import { useKeycloak } from "@react-keycloak/web";



function LoginRender() {

    const { keycloak, initialized } = useKeycloak();


    return (


        <div >

            <div className="authButtons" >
                {!keycloak.authenticated && (
                    <button
                        type="button"
                        className="loginButton"
                        onClick={() => keycloak.login()}
                    >
                        Login
                    </button>
                )}

                {!!keycloak.authenticated && (
                    <button
                        type="button"
                        className="logoutbtn"
                        onClick={() => keycloak.logout()}
                    >
                        Logout ({keycloak.tokenParsed.preferred_username})
                    </button>
                )}
            </div>
        </div>
    );

}
export default LoginRender;