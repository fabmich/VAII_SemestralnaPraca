import React, {useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import './createZamestnanecFormStyleSheet.css'
import '../../../components/errorMessage/errorMessageStylesheet.css'
import ZamestnanecServices from '../../../services/zamestnanecServices'
import {useKeycloak} from "@react-keycloak/web";


function CreateZamestnanecFormRender() {
    const zamestnanecServices = new ZamestnanecServices();
    const {keycloak, initialized} = useKeycloak();

    const navigate = useNavigate();

    const [formState, setFormState] = useState({
        meno: "",
        priezvisko: "",
        email: "",
        telefonneCislo: "",
        // poznamka: "",
        vek: "",
        typZamestnanca: "",
        pozicia: "",
        fotkaZamestnanca: null
    });


    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSelectChange = (e) => {
        const {name, value} = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleButtonZrusit = () => {
        navigate('/zamestnanci');
    }

    const [validationErrors, setValidationErrors] = useState({});
    const validateForm = () => {
        const errors = {};


        //MENO validacie
        if (!formState.meno.trim()) {
            errors.meno = "Meno je povinné!";
        } else if

        (!/^[^\d]+$/.test(formState.meno)) {
            errors.meno = "Meno nesmie obsahovať čísla!";
        }


        //PRIEZVISKO validacie
        if (!formState.priezvisko.trim()) {
            errors.priezvisko = "Priezvisko je povinné!";
        } else if (!/^[^\d]+$/.test(formState.priezvisko)) {
            errors.priezvisko = "Priezvisko nesmie obsahovať čísla!";
        }

        //EMAIL validacie
        if (!formState.email.trim()) {
            errors.email = "Email je povinný!";
        } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
            errors.email = "Neplatný email formát.";
        }


        //TELEFON validacie
        if (!formState.telefonneCislo.trim()) {
            errors.telefon = "Telefón je povinný!";
        } else if (!/^[0-9()+\s-]+$/.test(formState.telefonneCislo)) {
            errors.telefon = "Neplatný formát telefónneho čísla";
        }

        //VEK validacie
        if (!formState.vek.trim()) {
            errors.vek = "Vek je povinný!";
        } else if (!/^\d+$/.test(formState.vek)) {
            errors.vek = "Vek nie je číslo!";
        }

        setValidationErrors(errors);

        return Object.keys(errors).length === 0;
    };


    const handleButtonVytvorit = () => {
        const isValid = validateForm();

        if (isValid) {
            zamestnanecServices.saveZamestnanec(formState, file, keycloak.token);
        }
    };

    return (
        <div className="contentForm">
            <h1>Vytvorenie nového zamestnanca</h1>
            <form>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="meno">Meno*:</label>
                        {validationErrors.meno && <span className="error">{validationErrors.meno}</span>}
                        <input
                            type="text"
                            id="meno"
                            name="meno"
                            value={formState.meno}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="priezvisko">Priezvisko*:</label>
                        {validationErrors.priezvisko && <span className="error">{validationErrors.priezvisko}</span>}
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
                        <label htmlFor="email">Email*:</label>
                        {validationErrors.email && <span className="error">{validationErrors.email}</span>}
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={formState.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="telefon">Telefónne číslo*:</label>
                        {validationErrors.telefon && <span className="error">{validationErrors.telefon}</span>}
                        <input
                            type="text"
                            id="telefonneCislo"
                            name="telefonneCislo"
                            value={formState.telefonneCislo}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="vek">Vek*:</label>
                        {validationErrors.vek && <span className="error">{validationErrors.vek}</span>}
                        <input
                            type="text"
                            id="vek"
                            name="vek"
                            value={formState.vek}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="typZamestnanca">Typ zmluvy:</label>
                            <select
                                id="typZamestnanca"
                                name="typZamestnanca"
                                value={formState.typZamestnanca}
                                onChange={handleSelectChange}
                            >
                                <option value="TPP">Trvalý pracovný pomer</option>
                                <option value="DOHODAR">Dohodár</option>
                                {/*<option value="VYVOJARSKE">Vývojárske</option>*/}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row">

                    <div className="col">
                        <div className="form-group">
                            <label htmlFor="pozicia">Pozícia:</label>
                            <select
                                id="pozicia"
                                name="pozicia"
                                value={formState.pozicia}
                                onChange={handleSelectChange}
                            >
                                <option value="TESTER">Tester</option>
                                <option value="PROGRAMATOR">Programátor</option>
                                <option value="CEO">CEO</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div>
                        <input type="file" onChange={handleFileChange}/>
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
