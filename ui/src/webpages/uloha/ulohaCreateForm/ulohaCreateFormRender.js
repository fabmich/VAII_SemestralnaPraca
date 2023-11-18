import React, {useState} from "react";
import {Navigate, useNavigate} from "react-router-dom";
import UlohaServices from "../../../services/ulohaServices";
import './ulohaCreateFormStylesheet.css'


function UlohaCreateFormRender() {

    const ulohaServices = new UlohaServices();
    const navigate = useNavigate();

    const [formStateUloha, setFormStateUloha] = useState({
        nazov: "",
        popis: "",
        priradenyZamestnanec: "",
        deadline: "",
        vrstva: "",
        fixVersion: "",
        zadavatel: "",
        stavUlohy: "",
        cisloUlohy: "",
    });

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
        // const isValid = validateForm();

        // if (isValid) {
            ulohaServices.saveUloha(formStateUloha);
        // }
    };


    return (
        <div className="contentForm">
            <h1>Vytvorenie novej úlohy</h1>

        <form>

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="meno">*Názov:</label>
                    <input
                        type="text"
                        id="nazov"
                        name="nazov"
                        value={formStateUloha.nazov}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="priezvisko">*Deadline:</label>
                    <input
                        type="text"
                        id="deadline"
                        name="deadline"
                        value={formStateUloha.deadline}
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="meno">*Priradený zamestnanec:</label>
                    <input
                        type="text"
                        id="priradenyZamestnanec"
                        name="priradenyZamestnanec"
                        value={formStateUloha.priradenyZamestnanec}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="priezvisko">*Zadavateľ:</label>
                    <input
                        type="text"
                        id="zadavatel"
                        name="zadavatel"
                        value={formStateUloha.zadavatel}
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label htmlFor="meno">*Vrstva:</label>
                    <input
                        type="text"
                        id="vrstva"
                        name="vrstva"
                        value={formStateUloha.vrstva}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="priezvisko">Fix version:</label>
                    <input
                        type="text"
                        id="fixVersion"
                        name="fixVersion"
                        value={formStateUloha.fixVersion}
                        onChange={handleInputChange}
                    />
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




