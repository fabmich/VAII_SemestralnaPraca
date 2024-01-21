import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import './indesStyleSheet.css';
import {initializeIndex, resizerIndex} from "./script";

import peopleImage from '../../../../ui/src/pictures/people.png';
import taskImage from '../../../../ui/src/pictures/task.png';
import projectImage from '../../../../ui/src/pictures/project.png';

function IndexRender() {
    useEffect(() => {
        initializeIndex();
    }, []);

    useEffect(() => {
        resizerIndex();
    }, []);

    return (
        <div>
            <div className="content">
                <div className="tiles-container">
                    <Link to="/zamestnanci" className="tile">
                        <div className="tile-content">
                            <img src={peopleImage} alt="Zamestnanci"/>
                            <p>Zamestnanci</p>
                        </div>
                    </Link>
                    <Link to="/ulohy" className="tile">
                        <div className="tile-content">
                            <img src={taskImage} alt="Úlohy"/>
                            <p>Úlohy</p>
                        </div>
                    </Link>
                    <Link to="/projekty" className="tile">
                        <div className="tile-content">
                            <img src={projectImage} alt="Projekty"/>
                            <p>Projekty</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>

    );
}

export default IndexRender;
