import React, {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import ProjektServices from "../../../services/projektServices";
import "./projektListStylesheet.css"
import {useKeycloak} from "@react-keycloak/web";

function ProjektListRender() {
    const [listOfProjekty, setListOfProjekty] = useState([]);
    const [expandedProjektId, setExpandedProjektId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const projektServices = new ProjektServices();
    const [projektIdToDelete, setProjektIdToDelete] = useState(null);
    const {keycloak} = useKeycloak();


    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleToggleProjekt = (id) => {
        setExpandedProjektId((prevId) => (prevId === id ? null : id));
    };

    const handleButtonCreateUloha = () => {
        navigate('/projekty/create-projekt');
    };

    const handleClickUlohaDetail = (id) => {
        navigate('/projekty/' + id + '/detail');
    };


    const handleButtonVymaz = (id) => {
        setProjektIdToDelete(id);
        setShowModal(true);
    }

    const handleModalYes = async () => {
        try {
            await projektServices.deleteProjekt(projektIdToDelete, keycloak.token);
            const response = await projektServices.findAllProjekty();
            setListOfProjekty(response);
        } catch (error) {
            console.error("Error deleting Projekt:", error);
        } finally {
            setShowModal(false);
            setProjektIdToDelete(null);
        }
    };

    const handleModalNo = () => {
        setShowModal(false);
        setProjektIdToDelete(null);

    };
    const handleButtonUprav = (id) => {
        navigate('/projekty/' + id + '/detail');
        setShowModal(false);
    }


    useEffect(() => {
        const fetchProjekty = async () => {
            try {
                const response = await projektServices.findAllProjekty();
                setListOfProjekty(response);
            } catch (error) {
                console.error("Error fetching Projekty:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjekty();
    }, []);

    return (
        <div className="projekt-list-container">
            <h1>Zoznam projektov</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <button className="create-project-button" onClick={handleButtonCreateUloha}>Nový projekt</button>
                    <ul className="projekt-list">
                        {listOfProjekty.map((projekt) => (
                            <li
                                key={projekt.id}
                                className={`projekt-list-item ${expandedProjektId === projekt.id ? 'expanded' : ''}`}
                                onClick={() => handleToggleProjekt(projekt.id)}
                            >
                                <div>
                                    <strong>Nazov:</strong> {projekt.nazov}
                                </div>
                                <div className="projekt-details">
                                    <strong>Prefix:</strong> {projekt.prefix}
                                </div>
                                <div className="projekt-details">
                                    <strong>Zakaznik:</strong> {projekt.zakaznik}
                                </div>
                                {expandedProjektId === projekt.id && (
                                    <div className="projekt-details">
                                        <strong>Id:</strong> {projekt.id}
                                    </div>
                                )}
                                {expandedProjektId === projekt.id && (
                                    <div className="projekt-details">
                                        <strong>Popis:</strong> {projekt.popis}
                                    </div>
                                )}
                                {expandedProjektId === projekt.id && (
                                    <div className="buttons">
                                        <button type="submit" className="upravBtn"
                                                onClick={() => handleButtonUprav(projekt.id)}>Uprav
                                        </button>
                                        <button
                                            type="reset"
                                            className="vymazBtn"
                                            onClick={() => handleButtonVymaz(projekt.id)}
                                        >
                                            Vymaž
                                        </button>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <div className={`modal ${showModal ? 'show' : ''}`}>
                <div className="modal-content">
                    <p>Chcete naozaj vymazať tento projekt?</p>
                    <button className="Áno" onClick={handleModalYes}>Yes</button>
                    <button className="Nie" onClick={handleModalNo}>No</button>
                </div>
            </div>
        </div>
    );
}

export default ProjektListRender;
