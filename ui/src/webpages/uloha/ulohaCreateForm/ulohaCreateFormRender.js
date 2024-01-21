import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import UlohaServices from "../../../services/ulohaServices";
import ZamestnanecServices from "../../../services/zamestnanecServices";
import './ulohaCreateFormStylesheet.css'
import {useKeycloak} from "@react-keycloak/web";

function UlohaCreateFormRender() {
    const ulohaServices = new UlohaServices();
    const zamestnanecServices = new ZamestnanecServices();
    const navigate = useNavigate();
    const {keycloak} = useKeycloak();

    const [formStateUloha, setFormStateUloha] = useState({
        nazov: "",
        popis: "",
        priradenyZamestnanec: "",
        deadline: "",
        vrstva: "",
        fixVersion: "",
        zadavatel: "",
        projekt: "",

    });
    const [projekty, setProjekty] = useState([]);
    const [zamestnanci, setZamestnanci] = useState([]);

    useEffect(() => {
        fetchProjekty();
        fetchZamestnanci();
    }, []);

    const fetchProjekty = async () => {
        try {
            const projects = await ulohaServices.fetchProjekty();
            setProjekty(projects);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    const fetchZamestnanci = async () => {
        try {
            const zamestnanci = await zamestnanecServices.findAllZamestnanci(null);
            setZamestnanci(zamestnanci);
        } catch (error) {
            console.error("Error fetching zamestnanci:", error);
        }
    };


    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormStateUloha(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleButtonZrusit = () => {
        navigate('/ulohy');
    }

    const handleButtonVytvorit = () => {
        ulohaServices.saveUloha(formStateUloha, keycloak.token);
    };


    return (
        <div className="create-uloha-formular">
            <h1>Vytvorenie novej úlohy</h1>
            <form>
                <div className="create-uloha-formular-row">
                    <div className="create-uloha-formular-group">
                        <label htmlFor="nazov">*Názov:</label>
                        <input
                            type="text"
                            id="nazov"
                            name="nazov"
                            value={formStateUloha.nazov}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="create-uloha-formular-group">
                        <label htmlFor="deadline">*Deadline:</label>
                        <input
                            type="text"
                            id="deadline"
                            name="deadline"
                            value={formStateUloha.deadline}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                <div className="create-uloha-formular-row">

                    <div className="create-uloha-formular-group">
                        <label htmlFor="priradenyZamestnanec">*Priradený zamestnanec:</label>
                        <select
                            id="priradenyZamestnanec"
                            name="priradenyZamestnanec"
                            value={formStateUloha.priradenyZamestnanec}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Vyber zamestnanca na priradenie</option>
                            {zamestnanci.map((zamestnanec) => (
                                <option key={zamestnanec.id} value={zamestnanec.id}>
                                    {zamestnanec.meno + " " + zamestnanec.priezvisko}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="create-uloha-formular-group">
                        <label htmlFor="zadavatel">*Zadavateľ:</label>
                        <select
                            id="zadavatel"
                            name="zadavatel"
                            value={formStateUloha.zadavatel}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Vyber zadávateľa</option>
                            {zamestnanci.map((zamestnanec) => (
                                <option key={zamestnanec.id} value={zamestnanec.id}>
                                    {zamestnanec.meno + " " + zamestnanec.priezvisko}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="create-uloha-formular-row">
                    <div className="create-uloha-formular-group">
                        <label htmlFor="vrstva">*Vrstva:</label>
                        <input
                            type="text"
                            id="vrstva"
                            name="vrstva"
                            value={formStateUloha.vrstva}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="create-uloha-formular-group">
                        <label htmlFor="fixVersion">Fix version:</label>
                        <input
                            type="text"
                            id="fixVersion"
                            name="fixVersion"
                            value={formStateUloha.fixVersion}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className="create-uloha-formular-row">
                    <div className="create-uloha-formular-group">
                        <label htmlFor="popis">Popis:</label>
                        <input
                            type="text"
                            id="popis"
                            name="popis"
                            value={formStateUloha.popis}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="create-uloha-formular-row">
                    <div className="create-uloha-formular-group">
                        <label htmlFor="projekt">Projekt:</label>
                        <select
                            id="projekt"
                            name="projekt"
                            value={formStateUloha.projekt}
                            onChange={handleInputChange}
                        >
                            <option value="">Select a project</option>
                            {projekty.map((projekt) => (
                                <option key={projekt.id} value={projekt.id}>
                                    {projekt.nazov}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </form>
            <div className="button-container">
                <button type="submit" className="vytvoritBtn" onClick={handleButtonVytvorit}>
                    Vytvoriť
                </button>
                <button type="button" className="zrusitBtn" onClick={handleButtonZrusit}>
                    Zrušiť
                </button>
            </div>
        </div>
    )
}

export default UlohaCreateFormRender;




