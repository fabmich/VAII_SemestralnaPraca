import React, {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import ProjektServices from "../../../services/projektServices";
import "./projektCreateFormStylesheet.css"
import keycloak from "../../../keycloak";
import {useKeycloak} from "@react-keycloak/web";

function ProjektCreateFormRender() {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const projektServices = new ProjektServices();
    const {keycloak, initialized} = useKeycloak();

    const [formStateProjekt, setFormStateProjekt] = useState({
        nazov: "",
        popis: "",
        zakaznik: "",
        prefix: ""
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormStateProjekt(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleButtonZrusit = () => {
        navigate('/projekty');
    }


    const handleButtonVytvorit = () => {
        projektServices.saveProjekt(formStateProjekt, keycloak.token);
        navigate('/projekty');
    };

    return (
        <div className="contentForm">
            <h1>Vytvorenie nového projektu</h1>
            <form>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="nazov">*Názov:</label>
                        <input
                            type="text"
                            id="nazov"
                            name="nazov"
                            value={formStateProjekt.nazov}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="deadline">*Prefix:</label>
                        <input
                            type="text"
                            id="prefix"
                            name="prefix"
                            value={formStateProjekt.prefix}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-row">

                    <div className="form-group">
                        <label htmlFor="deadline">*Zakazník:</label>
                        <input
                            type="text"
                            id="zakaznik"
                            name="zakaznik"
                            value={formStateProjekt.zakaznik}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="deadline">Popis:</label>
                        <input
                            type="text"
                            id="popis"
                            name="popis"
                            value={formStateProjekt.popis}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>
            </form>

            <div className="button-container">
                <button type="submit" className="projekt-create-vytvoritBtn" onClick={handleButtonVytvorit}>
                    Vytvoriť
                </button>
                <button type="button" className="projekt-create-zrusitBtn" onClick={handleButtonZrusit}>
                    Zrušiť
                </button>
            </div>
        </div>
    );

}

export default ProjektCreateFormRender;