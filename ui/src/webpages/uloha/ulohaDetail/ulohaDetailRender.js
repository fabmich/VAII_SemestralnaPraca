import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import './ulohaDetailStylesheet.css'
import UlohaServices from "../../../services/ulohaServices";
import {useKeycloak} from "@react-keycloak/web";

function UlohaDetailRender() {
    const {keycloak, initialized} = useKeycloak();

    const ulohaServices = new UlohaServices();
    const navigate = useNavigate();

    const {id} = useParams();

    const [ulohaDetails, setUlohaDetails] = useState({

        nazov: "",
        popis: "",
        priradenyZamestnanecId: "",
        deadline: "",
        vrstva: "",
        fixVersion: "",
        zadavatelId: "",
        stavUlohy: "",
        cisloUlohy: "",
        datumVytvorenia: "",
    });

    useEffect(() => {
        const fetchDetailUlohy = async () => {
            try {
                const response = await ulohaServices.getUloha(id);

                setUlohaDetails(response);

            } catch (error) {
                console.error("Error fetching Detail Zamestnanca:", error);
            }
        };

        fetchDetailUlohy();
    }, [id]);


    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setUlohaDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };
    const handleSelectChange = (e) => {
        const { name, value } = e.target;
        setUlohaDetails((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleButtonVymaz = () => {
        ulohaServices.deleteUloha(ulohaDetails.id, keycloak.token);
        navigate('/ulohy');
    }

    const handleButtonUprav = () => {
        const updateUlohaRequest = {
            nazov: ulohaDetails.nazov,
            popis: ulohaDetails.popis,
            priradenyZamestnanec: ulohaDetails.priradenyZamestnanecId,
            deadline: ulohaDetails.deadline,
            vrstva: ulohaDetails.vrstva,
            fixVersion: ulohaDetails.fixVersion,
            zadavatel: ulohaDetails.zadavatelId,
            stavUlohy: ulohaDetails.stavUlohy,
            cisloUlohy: ulohaDetails.cisloUlohy,
            datumVytvorenia: ulohaDetails.datumVytvorenia,
        };

        ulohaServices.updateUloha(ulohaDetails.id, updateUlohaRequest, keycloak.token);
    };

    return (<div>
            <form id="ulohaForm" className="uloha-form">
                <div className="row">
                    <div className="col">
                        <label htmlFor="nazov">Názov:</label>
                        <input type="text" id="nazov" name="nazov" value={ulohaDetails.nazov || ''}
                               onChange={handleInputChange} required />
                    </div>
                    <div className="col">
                        <label htmlFor="popis">Popis:</label>
                        <input type="text" id="popis" name="popis" value={ulohaDetails.popis || ''}
                               onChange={handleInputChange} required />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label htmlFor="priradenyZamestnanec">Priradený Zamestnanec:</label>
                        <input type="text" id="priradenyZamestnanec" name="priradenyZamestnanec"
                               value={ulohaDetails.priradenyZamestnanecId || ''} onChange={handleInputChange} required />
                    </div>
                    <div className="col">
                        <label htmlFor="deadline">Deadline:</label>
                        <input type="text" id="deadline" name="deadline" value={ulohaDetails.deadline || ''}
                               onChange={handleInputChange} required />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label htmlFor="vrstva">Vrstva:</label>
                        <input type="text" id="vrstva" name="vrstva" value={ulohaDetails.vrstva || ''}
                               onChange={handleInputChange} required />
                    </div>
                    <div className="col">
                        <label htmlFor="fixVersion">Fix Version:</label>
                        <input type="text" id="fixVersion" name="fixVersion" value={ulohaDetails.fixVersion || ''}
                               onChange={handleInputChange} required />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label htmlFor="zadavatel">Zadavatel:</label>
                        <input type="text" id="zadavatel" name="zadavatel" value={ulohaDetails.zadavatelId || ''}
                               onChange={handleInputChange} required />
                    </div>
                    <div className="col">
                        <label htmlFor="stavUlohy">Stav Úlohy:</label>
                        <select
                            id="stavUlohy"
                            name="stavUlohy"
                            value={ulohaDetails.stavUlohy || ''}
                            onChange={handleSelectChange}
                            required
                        >
                            <option value="BACKLOG">Backlog</option>
                            <option value="IN_PROGRESS">In progress</option>
                            <option value="CANCELED">Canceled</option>
                            <option value="FINISHED">Finished</option>
                            <option value="FOR_TESTING">For testing</option>
                        </select>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label htmlFor="cisloUlohy">Číslo Úlohy:</label>
                        <input type="text" id="cisloUlohy" name="cisloUlohy" value={ulohaDetails.cisloUlohy || ''}
                               onChange={handleInputChange} required disabled  />
                    </div>
                    <div className="col">
                        <label htmlFor="datumVytvorenia">Dátum Vytvorenia:</label>
                        <input type="text" id="datumVytvorenia" name="datumVytvorenia" value={ulohaDetails.datumVytvorenia || ''}
                               onChange={handleInputChange} required disabled  />
                    </div>
                </div>

                <div className="buttons">
                    <button type="submit" className="upravBtn" onClick={handleButtonUprav}>Uprav</button>
                    <button type="reset" className="vymazBtn" onClick={handleButtonVymaz}>Vymaž</button>
                </div>
            </form>
        </div>
    )
}

export default UlohaDetailRender;