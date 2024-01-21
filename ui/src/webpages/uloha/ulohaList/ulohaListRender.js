import React, {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import {useKeycloak} from "@react-keycloak/web";
import UlohaServices from "../../../services/ulohaServices";
import "./ulohaListStylesheet.css"
import ZpuServices from "../../../services/zpuServices";

function UlohaListRender() {
    const [listOfUlohy, setListOfUlohy] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const {keycloak, initialized} = useKeycloak();
    const ulohaServices = new UlohaServices();
    const [projekty, setProjekty] = useState([]);

    const [findAllRequest, setFindAllRequest] = useState({pageNumber: "0", pageSize: "5"});
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedProjektId, setSelectedProjektId] = useState("");


    const handleButtonCreateUloha = () => {
        navigate('/ulohy/create-uloha');
    };

    const handleClickUlohaDetail = (id) => {

        navigate('/ulohy/' + id + '/detail');

    };

    const fetchProjekty = async () => {
        try {
            const projects = await ulohaServices.fetchProjekty();
            setProjekty(projects);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    useEffect(() => {
        const fetchUlohy = async () => {
            try {
                const zpuServices = new ZpuServices();
                const response = await zpuServices.findAllUlohy(null, {
                    pageNumber: (currentPage - 1).toString(),
                    pageSize: "5",
                    projektId: selectedProjektId,
                });
                setListOfUlohy(response.content);
                setTotalPages(response.totalPages);
            } catch (error) {
                console.error("Error fetching Zamestnanci:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUlohy();
        fetchProjekty()
    }, [currentPage, selectedProjektId]);



    const handlePageChange = async (pageNumber) => {
        try {
            const zpuServices = new ZpuServices();
            const response = await zpuServices.findAllUlohy(keycloak.token, {
                pageNumber: (pageNumber - 1).toString(),
                pageSize: findAllRequest.pageSize,
                projektId: selectedProjektId,
            });
            setListOfUlohy(response.content);
            setCurrentPage(pageNumber);
        } catch (error) {
            console.error("Error fetching Ulohy:", error);
        }
    };

    const handleFirstPage = () => {
        handlePageChange(1);
    };

    const handlePreviousPage = () => {
        const newPage = Math.max(1, currentPage - 1);
        handlePageChange(newPage);
    };

    const handleNextPage = () => {
        const newPage = Math.min(totalPages, currentPage + 1);
        handlePageChange(newPage);
    };

    const handleLastPage = () => {
        handlePageChange(totalPages);
    };


    const handlePageSizeChange = async (pageSize) => {
        const updatedFindAllRequest = { ...findAllRequest, pageSize: pageSize.toString() };
        setFindAllRequest(updatedFindAllRequest);

        if (pageSize.toString() === "Všetky") {
            updatedFindAllRequest.pageSize = 1000;
        }

        try {
            const zpuServices = new ZpuServices();
            const response = await zpuServices.findAllUlohy(keycloak.token, {
                pageNumber: 0,
                pageSize: updatedFindAllRequest.pageSize,
                projektId: selectedProjektId,
            });
            setListOfUlohy(response.content);
            setCurrentPage(1);
        } catch (error) {
            console.error("Error fetching Ulohy:", error);
        }
    };
    const handleProjektChange = (event) => {
        const selectedProjekt = event.target.value;
        setSelectedProjektId(selectedProjekt);
    };

    const renderPageSizeDropdown = () => {
        const pageSizes = ["5", "10", "20", "Všetky"];

        return (
            <div className="page-size-dropdown">
                <select
                    value={findAllRequest.pageSize}
                    onChange={(e) => handlePageSizeChange(e.target.value)}
                >
                    {pageSizes.map((size) => (
                        <option key={size} value={size}>{size}</option>
                    ))}
                </select>
            </div>
        );
    };


    return (
        <div className="uloha-list-content">
            <div className="add-button-container">
                <h2 className="uloha-list-header">Zoznam úloh</h2>
                {renderPageSizeDropdown()}
                <button className="add-button" onClick={handleButtonCreateUloha}>+</button>
            </div>


            <select className="uloha-list-projekt-dropdown"
                id="projekt"
                name="projekt"
                value={selectedProjektId}
                onChange={handleProjektChange}
            >
                <option value="">Všetky projekty</option>
                {projekty.map((projekt) => (
                    <option key={projekt.id} value={projekt.id}>
                        {projekt.nazov}
                    </option>
                ))}
            </select>

            <ul className="ulohy-zoznam-list">
                <li className="uloha-header-list-item uloha-header">
                    <div className="uloha-header-info-row">
                        <div className="uloha-header-column">
                            <p>ID</p>
                        </div>
                        <div className="uloha-header-column">
                            <p>Nazov</p>
                        </div>
                        <div className="uloha-header-column">
                            <p>Vrstva</p>
                        </div>
                        <div className="uloha-header-column">
                            <p>Deadline</p>
                        </div>
                        <div className="uloha-header-column">
                            <p>Stav Ulohy</p>
                        </div>
                    </div>
                </li>
                {listOfUlohy.map((uloha) => (
                    <li key={uloha.id} className="uloha-list-item" onClick={() => handleClickUlohaDetail(uloha.id)}>
                        <div className="uloha-info-row">
                            <div className="uloha-info-column">
                                <p>{uloha.prefix + '-' + uloha.cisloUlohy}</p>
                            </div>
                            <div className="uloha-info-column">
                                <p>{uloha.nazov}</p>
                            </div>
                            <div className="uloha-info-column">
                                <p>{uloha.vrstva}</p>
                            </div>
                            <div className="uloha-info-column">
                                <p>{uloha.deadline}</p>
                            </div>
                            <div className="uloha-info-column">
                                <p>{uloha.stavUlohy}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="pagination-container">
                <button className="pagination-button" onClick={handleFirstPage}>
                    &lt;&lt;
                </button>
                <button className="pagination-button" onClick={handlePreviousPage}>
                    &lt;
                </button>
                {/* Dynamicky redender cisel */}
                {Array.from({length: totalPages}, (_, index) => (
                    <button key={index} className="pagination-button" onClick={() => handlePageChange(index + 1)}>
                        {index + 1}
                    </button>
                ))}
                <button className="pagination-button" onClick={handleNextPage}>
                    &gt;
                </button>
                <button className="pagination-button" onClick={handleLastPage}>
                    &gt;&gt;
                </button>
            </div>
        </div>
    );
}

export default UlohaListRender;