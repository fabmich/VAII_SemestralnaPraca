import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import {useKeycloak} from "@react-keycloak/web";
import UlohaServices from "../../../services/ulohaServices";


function UlohaListRender() {
    const [listOfUlohy, setListOfUlohy] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { keycloak, initialized } = useKeycloak();


    const handleButtonCreateUloha = () => {
        navigate('/ulohy/create-uloha');
    };

    const handleClickUlohaDetail = (id) => {

        navigate('/ulohy/' + id + '/detail');

    };

    useEffect(() => {
        const fetchUlohy = async () => {
            try {
                const ulohaServices = new UlohaServices();
                const response = await ulohaServices.findAllUlohy(keycloak.token);
                setListOfUlohy(response);
            } catch (error) {
                console.error("Error fetching Zamestnanci:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUlohy();
    }, []);

    return (
        <div>
            <div className="add-button-container">
                <button className="add-button" onClick={handleButtonCreateUloha}>+</button>
            </div>

            <h2>Uloha List</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul className="ulohy-list">
                    {listOfUlohy.map((uloha) => (
                        <li key={uloha.id} className="uloha-item" onClick={() => handleClickUlohaDetail(uloha.id)}>
                            <div className="row">
                                <p className="uloha-info">ID: {uloha.id}</p>
                                <p className="uloha-info">Názov: {uloha.nazov}</p>
                                <p className="uloha-info">Dátum vytvorenia: {uloha.datumVytvorenia}</p>
                                <p className="uloha-info">popis: {uloha.popis}</p>
                            </div>
                            <div className="row">
                                {/*<p className="uloha-info">Zamestnany od: {uloha.priradenyZamestnanec.meno + " " + uloha.priradenyZamestnanec.priezvisko}</p>*/}
                                <p className="uloha-info">Deadline: {uloha.deadline}</p>
                                <p className="uloha-info">Vrstva: {uloha.vrstva}</p>
                                <p className="uloha-info">Fix Version: {uloha.fixVersion}</p>
                                {/*<p className="uloha-info">Pozicia: {uloha.zadavatel.meno + " " + uloha.zadavatel.priezvisko}</p>*/}
                                <p className="uloha-info">Stav úlohy: {uloha.stavUlohy}</p>
                                <p className="uloha-info">Číslo úlohy: {uloha.cisloUlohy}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );



}
export default UlohaListRender;