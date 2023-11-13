import React, {useState} from "react";
import './createZamestnanecFormStyleSheet.css'
import ZamestnanecServices from '../../services/zamestnanecServices'
import {Navigate, useNavigate} from "react-router-dom";

// import Api from '../../open-api.json'

function CreateZamestnanecFormRender() {
    const navigate = useNavigate();

    const [formState, setFormState] = useState({
        meno: "",
        priezvisko: "",
        email: "",
        telefon: "",
        poznamka: "",
        // oddelenie: "",
        // pozicia: "",

        vek: "",
        kontraktDo: "1980-04-09T10:15:30+07:00",
        typZamestnanca: "TPP",
        pozicia: "PROGRAMATOR"
    });

    const zamestnanecServices = new ZamestnanecServices();

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleButtonVytvorit = () => {
        zamestnanecServices.saveZamestnanec(formState);
    };

    const handleButtonZrusit = () => {
        navigate('/zamestnanci');

    }

    return (
        <div className="contentForm">
            <h1>Vytvorenie nového zamestnanca</h1>
            <form>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="meno">Meno:</label>
                        <input
                            type="text"
                            id="meno"
                            name="meno"
                            value={formState.meno}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="priezvisko">Priezvisko:</label>
                        <input
                            type="text"
                            id="priezvisko"
                            name="priezvisko"
                            value={formState.priezvisko}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={formState.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="telefon">Telefónne číslo:</label>
                        <input
                            type="text"
                            id="telefon"
                            name="telefon"
                            value={formState.telefon}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="poznamka">Poznámka ku zamestnancovi:</label>
                        <input
                            type="text"
                            id="poznamka"
                            name="poznamka"
                            value={formState.poznamka}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="vek">Vek:</label>
                        <input
                            type="text"
                            id="vek"
                            name="vek"
                            value={formState.vek}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="oddelenie">Oddelenie:</label>
                            <select
                                id="oddelenie"
                                name="oddelenie"
                                value={formState.oddelenie}
                                onChange={handleInputChange}
                            >
                                <option value="PERSONALNE">Personálne</option>
                                <option value="TESTOVACIE">Testovacie</option>
                                <option value="VYVOJARSKE">Vývojárske</option>
                            </select>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="pozicia">Pozícia:</label>
                            <select
                                id="pozicia"
                                name="pozicia"
                                value={formState.pozicia}
                                onChange={handleInputChange}
                            >
                                <option value="TESTER">Tester</option>
                                <option value="PROGRAMATOR">Programátor</option>
                                <option value="CEO">CEO</option>
                            </select>
                        </div>
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
    );
}

export default CreateZamestnanecFormRender;
