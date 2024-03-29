import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from 'react-router-dom';
import ProjektServices from "../../../services/projektServices";
import "./projektDetailStylesheet.css"
import {useKeycloak} from "@react-keycloak/web";

function ProjektDetailRender() {
    const navigate = useNavigate();
    const projektServices = new ProjektServices();
    const {id} = useParams();
    const {keycloak} = useKeycloak();

    const [projektDetail, setProjektDetail] = useState({
        nazov: "",
        popis: "",
        zakaznik: "",
        prefix: ""
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setProjektDetail(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    useEffect(() => {
        const fetchDetailProjektu = async () => {
            try {
                const response = await projektServices.getProjekt(id)

                setProjektDetail(response);

            } catch (error) {
                console.error("Error fetching Detail Zamestnanca:", error);
            }
        };

        fetchDetailProjektu();
    }, [id]);

    const handleButtonZrusit = () => {
        navigate('/projekty');
    }
    const handleButtonUprav = () => {
        const updateProjektRequest = {
            nazov: projektDetail.nazov,
            popis: projektDetail.popis,
            zakaznik: projektDetail.zakaznik,
            prefix: projektDetail.prefix
        }

        projektServices.updateProjekt(id, updateProjektRequest, keycloak.token);

    }


    return (
        <div className="projekt-uprav-formular">
            <h1>Vytvorenie nového projektu</h1>
            <form>
                <div className="projekt-uprav-formular-row">
                    <div className="projekt-uprav-formular-group">
                        <label htmlFor="nazov">*Názov:</label>
                        <input
                            type="text"
                            id="nazov"
                            name="nazov"
                            value={projektDetail.nazov}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="projekt-uprav-formular-group">
                        <label htmlFor="deadline">*Prefix:</label>
                        <input
                            type="text"
                            id="prefix"
                            name="prefix"
                            value={projektDetail.prefix}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                <div className="projekt-uprav-formular-row">

                    <div className="projekt-uprav-formular-group">
                        <label htmlFor="deadline">*Zakazník:</label>
                        <input
                            type="text"
                            id="zakaznik"
                            name="zakaznik"
                            value={projektDetail.zakaznik}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="projekt-uprav-formular-group">
                        <label htmlFor="deadline">Popis:</label>
                        <input
                            type="text"
                            id="popis"
                            name="popis"
                            value={projektDetail.popis}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>
            </form>

            <div className="projekt-uprav-button-container">
                <button type="submit" className="projekt-uprav-upravtBtn" onClick={handleButtonUprav}>
                    Uprav
                </button>
                <button type="button" className="projekt-uprav-zrusitBtn" onClick={handleButtonZrusit}>
                    Zrušiť
                </button>
            </div>
        </div>
    );

}

export default ProjektDetailRender;