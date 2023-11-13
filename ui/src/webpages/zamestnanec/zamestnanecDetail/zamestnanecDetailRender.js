import React, {useEffect, useState} from "react";
import './zamestnanecDetailStyleSheet.css'
import {useNavigate, useParams} from "react-router-dom";
import ZamestnanecServices from "../../../services/zamestnanecServices";

function ZamestnanecDetailRender() {
    const zamestnanecServices = new ZamestnanecServices();
    const navigate = useNavigate();


    const { id } = useParams();

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
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
            kontraktDo: zamestnanecDetails.kontraktDo,
            typZamestnanca: zamestnanecDetails.typZamestnanca,
            pozicia: zamestnanecDetails.pozicia,
        };

        // const isValid = validateForm();
        //
        // if (isValid) {
            zamestnanecServices.updateZamestnanec(zamestnanecDetails.id ,updateZamestnanecRequest);
        // }
    };

    //TODO refactor - byvalych zamestnancov netreba mazat, iba nastavit im flag neviditelny/odstranene/byvaly na true a nebude sa ukazovat v zozname a pod
    const handleButtonVymaz = () => {
        zamestnanecServices.deleteZamestnanec(zamestnanecDetails.id);
        navigate('/zamestnanci');
    }


    return (
        <div>
            <form id="zamestnanecForm" className="zamestnanec-form" >
                <div className="row">
                    <div className="col">
                        <label htmlFor="id">ID:</label>
                        <input type="text" id="id" name="id" value={zamestnanecDetails?.id || ''} onChange={handleInputChange} required />
                    </div>
                    <div className="col">
                        <label htmlFor="meno">Meno:</label>
                        <input type="text" id="meno" name="meno" value={zamestnanecDetails?.meno || ''} onChange={handleInputChange} required />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label htmlFor="priezvisko">Priezvisko:</label>
                        <input type="text" id="priezvisko" name="priezvisko" value={zamestnanecDetails?.priezvisko || ''}  onChange={handleInputChange} required />
                    </div>
                    <div className="col">
                        <label htmlFor="vek">Vek:</label>
                        <input type="text" id="vek" name="vek" value={zamestnanecDetails?.vek || ''}  onChange={handleInputChange} required />
                    </div>
                </div>

                <div className="row">
                    {/*<div className="col">*/}
                    {/*    <label htmlFor="displayName">Display Name:</label>*/}
                    {/*    <input type="text" id="displayName" name="displayName" value={zamestnanecDetails?.displayName || ''} onChange={handleInputChange} required />*/}
                    {/*</div>*/}

                    <div className="col">
                        <label htmlFor="zamestnanyOd">Zamestnaný Od:</label>
                        <input type="text" id="zamestnanyOd" name="zamestnanyOd" value={zamestnanecDetails?.zamestnanyOd || ''} onChange={handleInputChange} required />
                    </div>
                    <div className="col">
                        <label htmlFor="kontraktDo">Kontrakt Do:</label>
                        <input type="text" id="kontraktDo" name="kontraktDo" value={zamestnanecDetails?.kontraktDo || ''} onChange={handleInputChange} required />
                    </div>
                </div>

                <div className="row">

                    <div className="col">
                        <label htmlFor="typZamestnanca">Typ Zamestnanca:</label>
                        <input type="text" id="typZamestnanca" name="typZamestnanca" value={zamestnanecDetails?.typZamestnanca || ''} onChange={handleInputChange} required />
                    </div>
                    <div className="col">
                        <label htmlFor="Pozicia">Pozícia:</label>
                        <input type="text" id="Pozicia" name="Pozicia" value={zamestnanecDetails?.pozicia || ''} onChange={handleInputChange} required />
                    </div>
                </div>



                <div className="buttons">
                    <button type="submit" className="upravBtn" onClick={handleButtonUprav}>Uprav</button>
                    <button type="reset" className="vymazBtn" onClick={handleButtonVymaz}>Vymaž</button>
                </div>
            </form>
        </div>
    );
}

export default ZamestnanecDetailRender;