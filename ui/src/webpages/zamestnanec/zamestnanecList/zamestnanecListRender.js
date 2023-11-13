import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import ZamestnanecServices from "../../../services/zamestnanecServices";
import './zamestnanecListStylesheet.css'


function ZamestnanecListRender() {

    const [listOfZamestnanec, setListOfZamestnanec] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleButtonCreateZamestnanecForm = () => {
        navigate('/zamestnanci/create-zamestnanec');
    };

    const handleClickZamestnanecDetail = (id) => {

      navigate('/zamestnanci/' + id + '/detail');

    };

    useEffect(() => {
        const fetchZamestnanci = async () => {
            try {
                const zamestnanecServices = new ZamestnanecServices();
                const response = await zamestnanecServices.findAllZamestnanci();
                setListOfZamestnanec(response);
            } catch (error) {
                console.error("Error fetching Zamestnanci:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchZamestnanci();
    }, []);



    return (
        <div>
            <div className="add-button-container">
                <button className="add-button" onClick={handleButtonCreateZamestnanecForm}>+</button>
            </div>

            <h2>Zamestnanci List</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul className="employee-list">
                    {listOfZamestnanec.map((zamestnanec) => (
                        <li key={zamestnanec.id} className="employee-item" onClick={() => handleClickZamestnanecDetail(zamestnanec.id)}>
                            <div className="row">
                                <p className="employee-info">ID: {zamestnanec.id}</p>
                                <p className="employee-info">Meno: {zamestnanec.meno}</p>
                                <p className="employee-info">Priezvisko: {zamestnanec.priezvisko}</p>
                                <p className="employee-info">Vek: {zamestnanec.vek}</p>
                            </div>
                            <div className="row">
                                <p className="employee-info">Zamestnany od: {zamestnanec.zamestnanyOd}</p>
                                <p className="employee-info">Kontrakt do: {zamestnanec.kontraktDo}</p>
                                <p className="employee-info">Typ zamestnanca: {zamestnanec.typZamestnanca}</p>
                                <p className="employee-info">Pozicia: {zamestnanec.pozicia}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ZamestnanecListRender;
