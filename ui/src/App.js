import logo from './logo.svg';
import './App.css';
import NavBarRender from "./components/navbar/navBarRender";
import IndexRender from "./webpages/index/indexRender";
import FooterRender from "./components/footer/footerRender";
import CreateZamestnanecFormRender from "./webpages/zamestnanec/createZamestnanecForm/createZamestnanecFormRender";
import UlohaListRender from "./webpages/uloha/ulohaList/ulohaListRender";
import {BrowserRouter, BrowserRouter as Router, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import ZamestnanecListRender from "./webpages/zamestnanec/zamestnanecList/zamestnanecListRender";
import ZamestnanecDetailRender from "./webpages/zamestnanec/zamestnanecDetail/zamestnanecDetailRender";
import keycloak from "./keycloak";
import {ReactKeycloakProvider, useKeycloak} from "@react-keycloak/web";
import PrivateRoute from "./helpers/privateRoute";
import LoginRender from "./webpages/login/loginRender";
import UlohaCreateFormRender from "./webpages/uloha/ulohaCreateForm/ulohaCreateFormRender";
import UlohaDetailRender from "./webpages/uloha/ulohaDetail/ulohaDetailRender";
import ProjektListRender from "./webpages/projekt/projektList/projektListRender";
import ProjektCreateFormRender from "./webpages/projekt/projektCreateForm/projektCreateFormRender";
import ProjektDetailRender from "./webpages/projekt/projektDetail/projektDetailRender";

function App() {
    return (
        <Router>
            <MainContent/>
        </Router>
    );
}


function MainContent() {

    const navigate = useNavigate();
    const location = useLocation();
    const [firstLoad, setFirstLoad] = useState(true);

    // useEffect(() => {
    //     const lastVisitedPage = localStorage.getItem('lastVisitedPage');
    //
    //     if (firstLoad) {
    //         if (lastVisitedPage) {
    //             // If there's a lastVisitedPage, navigate to it on the first load
    //             navigate(lastVisitedPage);
    //         } else {
    //             // If there's no lastVisitedPage (app restarted), navigate to home
    //         }
    //
    //     }
    //     setFirstLoad(false);
    //
    // }, [firstLoad, navigate]);
    //
    // useEffect(() => {
    //     localStorage.setItem('lastVisitedPage', location.pathname);
    // }, [location.pathname]);

    return (
        <div className="App">
            <ReactKeycloakProvider authClient={keycloak}>
                <NavBarRender/>

                    <Routes>
                        <Route path="/" element={<LoginRender/>}/>

                        <Route path="/home" element={ <PrivateRoute> <IndexRender/></PrivateRoute>}/>
                        <Route path="/zamestnanci" element={ <PrivateRoute><ZamestnanecListRender/></PrivateRoute>}/>

                        <Route path="/zamestnanci/create-zamestnanec" element={ <PrivateRoute><CreateZamestnanecFormRender/></PrivateRoute>}/>
                        <Route path="/zamestnanci/:id/detail" element={ <PrivateRoute><ZamestnanecDetailRender/></PrivateRoute>}/>

                        <Route path="/ulohy" element={ <PrivateRoute><UlohaListRender/></PrivateRoute>}/>
                        <Route path="/ulohy/create-uloha" element={ <PrivateRoute><UlohaCreateFormRender/></PrivateRoute>}/>
                        <Route path="/ulohy/:id/detail" element={ <PrivateRoute><UlohaDetailRender/></PrivateRoute>}/>

                        <Route path="/projekty" element={ <PrivateRoute><ProjektListRender/></PrivateRoute>}/>
                        <Route path="/projekty/create-projekt" element={ <PrivateRoute><ProjektCreateFormRender/></PrivateRoute>}/>
                        <Route path="/projekty/:id/detail" element={ <PrivateRoute><ProjektDetailRender/></PrivateRoute>}/>

                    </Routes>

                <FooterRender/>

            </ReactKeycloakProvider>
            {/*<GetIdComponent/>*/}
        </div>
    );
}

export default App;
