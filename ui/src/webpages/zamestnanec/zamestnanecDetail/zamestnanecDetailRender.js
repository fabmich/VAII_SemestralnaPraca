import React, {useEffect, useState} from "react";
import './zamestnanecDetailStyleSheet.css'
import {useNavigate, useParams} from "react-router-dom";
import ZamestnanecServices from "../../../services/zamestnanecServices";
import {useKeycloak} from "@react-keycloak/web";

function ZamestnanecDetailRender() {
    const zamestnanecServices = new ZamestnanecServices();
    const navigate = useNavigate();
    const [ListOfUlohy, setListOfUlohy] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const {keycloak, initialized} = useKeycloak();
    const {id} = useParams();

    const [zamestnanecDetails, setZamestnanecDetails] = useState({
        id: '',
        meno: '',
        priezvisko: '',
        vek: '',
        displayName: '',
        zamestnanyOd: '',
        kontraktDo: '',
        typZamestnanca: '',
        pozicia: '',
        telefonneCislo: '',
        email: ''
    });

    useEffect(() => {
        const fetchDetailZamestnanca = async () => {
            try {
                const response = await zamestnanecServices.getZamestnanec(id);

                setZamestnanecDetails(response);

            } catch (error) {
                console.error("Error fetching Detail Zamestnanca:", error);
            }
        };

        fetchDetailZamestnanca();
    }, [id]);

    useEffect(() => {
        const fetchUlohy = async () => {
            try {
                const zamestnanecServices = new ZamestnanecServices();
                const response = await zamestnanecServices.getUlohyZamestnanca(id);
                setListOfUlohy(response);
            } catch (error) {
                console.error("Error fetching UlohyZamestnanca:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUlohy();
    }, [id]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setZamestnanecDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleButtonUprav = () => {
        const updateZamestnanecRequest = {
            meno: zamestnanecDetails.meno,
            priezvisko: zamestnanecDetails.priezvisko,
            vek: zamestnanecDetails.vek,
            zamestnanyOd: zamestnanecDetails.zamestnanyOd,
            typZamestnanca: zamestnanecDetails.typZamestnanca,
            pozicia: zamestnanecDetails.pozicia,
            telefonneCislo: zamestnanecDetails.telefonneCislo,
            email: zamestnanecDetails.email
        };

        zamestnanecServices.updateZamestnanec(zamestnanecDetails.id, updateZamestnanecRequest, keycloak.token);
    };

    const handleButtonVymaz = () => {
        setShowModal(true);
    }

    const handleSelectChange = (e) => {
        const {name, value} = e.target;
        setZamestnanecDetails((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleModalYes = () => {
        zamestnanecServices.deleteZamestnanec(zamestnanecDetails.id, keycloak.token);
        navigate('/zamestnanci');

        setShowModal(false);
    };

    const handleModalNo = () => {
        setShowModal(false);
    };


    return (
        <div className="zamestnanec-detail-contentForm">
            <h2 className="zamestnanec-detail-header">Údaje o zamestnancovi</h2>

            <form id="zamestnanecForm" className="zamestnanec-form">
                <div className="row">
                    <div className="col">
                        <label htmlFor="id">ID:</label>
                        <input type="text" id="id" name="id" value={zamestnanecDetails?.id || ''}
                               onChange={handleInputChange} disabled/>
                    </div>
                    <div className="col">
                        <label htmlFor="meno">Meno:</label>
                        <input type="text" id="meno" name="meno" value={zamestnanecDetails?.meno || ''}
                               onChange={handleInputChange} required/>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label htmlFor="priezvisko">Priezvisko:</label>
                        <input type="text" id="priezvisko" name="priezvisko"
                               value={zamestnanecDetails?.priezvisko || ''} onChange={handleInputChange} required/>
                    </div>
                    <div className="col">
                        <label htmlFor="vek">Vek:</label>
                        <input type="text" id="vek" name="vek" value={zamestnanecDetails?.vek || ''}
                               onChange={handleInputChange} required/>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label htmlFor="zamestnanyOd">Zamestnaný Od:</label>
                        <input type="text" id="zamestnanyOd" name="zamestnanyOd"
                               value={zamestnanecDetails?.zamestnanyOd || ''} onChange={handleInputChange} required
                               disabled/>
                    </div>
                </div>

                <div className="row">

                    <div className="col">
                        <label htmlFor="typZamestnanca">Typ zmluvy:</label>
                        <select
                            id="typZamestnanca"
                            name="typZamestnanca"
                            value={zamestnanecDetails.typZamestnanca}
                            onChange={handleSelectChange}
                        >
                            <option value="TPP">Trvalý pracovný pomer</option>
                            <option value="DOHODAR">Dohodár</option>
                        </select>
                    </div>
                    <div className="col">
                        <label htmlFor="pozicia">Pozícia:</label>
                        <select
                            id="pozicia"
                            name="pozicia"
                            value={zamestnanecDetails.pozicia}
                            onChange={handleSelectChange}
                        >
                            <option value="TESTER">Tester</option>
                            <option value="PROGRAMATOR">Programátor</option>
                            <option value="CEO">CEO</option>
                            <option value="UCTOVNIK">Účtovník</option>
                            <option value="SEF_PROGRAMATOROV">Šef programátorov</option>
                            <option value="UPRATOVAC">Upratovač</option>
                        </select>
                    </div>
                </div>
                <div className="row">


                    <div className="col">
                        <label htmlFor="telefonneCislo">Telefónne číslo</label>
                        <input type="text" id="telefonneCislo" name="telefonneCislo"
                               value={zamestnanecDetails?.telefonneCislo || ''} onChange={handleInputChange} required/>
                    </div>
                    <div className="col">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" name="email"
                               value={zamestnanecDetails?.email || ''} onChange={handleInputChange} required/>
                    </div>
                </div>


                <div className="buttons">
                    <button type="submit" className="upravBtn" onClick={handleButtonUprav}>Uprav</button>
                    <button type="reset" className="vymazBtn" onClick={handleButtonVymaz}>Vymaž</button>
                </div>
            </form>

            <h2>Zoznam úloh zamestnanca</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul className="ulohy-list">
                    {ListOfUlohy.map((uloha) => (
                        <li key={uloha.id} className="uloha-item">
                            <div className="row">
                                <p className="uloha-info">ID: {uloha.id}</p>
                                <p className="uloha-info">Názov: {uloha.nazov}</p>
                            </div>
                            <div className="row">
                                <p className="uloha-info">Zadávateľ: {uloha.zadavatel.meno + " " + uloha.zadavatel.priezvisko}</p>
                                <p className="uloha-info">Stav úlohy: {uloha.stavUlohy}</p>
                                <p className="uloha-info">Cislo ulohy: {uloha.cisloUlohy}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            <div className={`modal ${showModal ? 'show' : ''}`}>
                <div className="modal-content">
                    <p>Chcete naozaj vymazať tohto zamestnanca?</p>
                    <button className="yes" onClick={handleModalYes}>Áno</button>
                    <button className="no" onClick={handleModalNo}>Nie</button>
                </div>
            </div>
        </div>
    );
}

export default ZamestnanecDetailRender;