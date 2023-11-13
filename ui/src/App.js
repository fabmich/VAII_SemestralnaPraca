import logo from './logo.svg';
// import './App.css';
import NavBarRender from "./components/navbar/navBarRender";
import IndexRender from "./webpages/index/indexRender";
import FooterRender from "./components/footer/footerRender";
import CreateZamestnanecFormRender from "./webpages/zamestnanec/createZamestnanecForm/createZamestnanecFormRender";
import {BrowserRouter as Router, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import ZamestnanecListRender from "./webpages/zamestnanec/zamestnanecList/zamestnanecListRender";
import ZamestnanecDetailRender from "./webpages/zamestnanec/zamestnanecDetail/zamestnanecDetailRender";


function App() {
    return (
        <Router>
            <MainContent />
        </Router>
    );
}


function MainContent() {
    const navigate = useNavigate();
    const location = useLocation();
    const [firstLoad, setFirstLoad] = useState(true);

    useEffect(() => {
        const lastVisitedPage = localStorage.getItem('lastVisitedPage');

        if (firstLoad && lastVisitedPage) {
            navigate(lastVisitedPage);
            setFirstLoad(false);
        }
    }, [firstLoad, navigate]);

    useEffect(() => {
        localStorage.setItem('lastVisitedPage', location.pathname);
    }, [location.pathname]);

    return (
            <div className="App">
                <NavBarRender/>

                <Routes>
                    <Route path="/home" element={<IndexRender/>}/>

                    <Route path="/zamestnanci" element={<ZamestnanecListRender/>} />
                    <Route path="/zamestnanci/create-zamestnanec" element={<CreateZamestnanecFormRender/>} />
                    <Route path="/zamestnanci/:id/detail" element={<ZamestnanecDetailRender/>} />
                    {/*<Route path="/tasks" component={Tasks} />*/}
                    {/*<Route path="/projects" component={Projects} />*/}
                    {/*<Route path="/contacts" component={Contacts} />*/}
                </Routes>
                <FooterRender/>

                {/*<GetIdComponent/>*/}
            </div>
    );
}

export default App;
