import React, {useState} from "react";
import './createZamestnanecFormStyleSheet.css'
import ZamestnanecServices from '../../services/zamestnanecServices'
// import Api from '../../open-api.json'

function CreateZamestnanecFormRender() {


    const [formState, setFormState] = useState({
        meno: "",
        priezvisko: "",
        email: "",
        telefon: "",
        poznamka: "",
        // oddelenie: "",
        // pozicia: "",

            vek:"1",
            kontraktDo:"1980-04-09T10:15:30+07:00",
            typZamestnanca:"TPP",
            pozicia:"PROGRAMATOR"
    });

    const zamestnanecServices = new ZamestnanecServices();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleButtonClick = () => {
        zamestnanecServices.saveZamestnanec(formState);
    };

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
                {/*<div className="row">*/}
                {/*    <div className="col">*/}
                {/*        <div className="form-group">*/}
                {/*            <label htmlFor="oddelenie">Oddelenie:</label>*/}
                {/*            <select*/}
                {/*                id="oddelenie"*/}
                {/*                name="oddelenie"*/}
                {/*                value={formState.oddelenie}*/}
                {/*                onChange={handleInputChange}*/}
                {/*            >*/}
                {/*                <option value="Option 1">Personálne</option>*/}
                {/*                <option value="Option 2">Testovacie</option>*/}
                {/*                <option value="Option 3">Vývojárske</option>*/}
                {/*            </select>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <div className="col">*/}
                {/*        <div className="form-group">*/}
                {/*            <label htmlFor="pozicia">Pozícia:</label>*/}
                {/*            <select*/}
                {/*                id="pozicia"*/}
                {/*                name="pozicia"*/}
                {/*                value={formState.pozicia}*/}
                {/*                onChange={handleInputChange}*/}
                {/*            >*/}
                {/*                <option value="Option A">Tester</option>*/}
                {/*                <option value="Option B">Vývojár</option>*/}
                {/*                <option value="Option C">CEO</option>*/}
                {/*            </select>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </form>
            <div className="button-container">
                <button type="submit" className="vytvoritBtn" onClick={handleButtonClick}>
                    Vytvoriť
                </button>
                <button type="button" className="zrusitBtn">
                    Zrušiť
                </button>
            </div>
        </div>
    );
}

export default CreateZamestnanecFormRender;
