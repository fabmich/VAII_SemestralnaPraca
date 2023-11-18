import logo from './logo.svg';
// import './App.css';
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
import {ReactKeycloakProvider} from "@react-keycloak/web";
import PrivateRoute from "./helpers/privateRoute";
import LoginRender from "./webpages/login/loginRender";


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
                        <Route path="/" element={<LoginRender />} />

                        {/*<Route path="/home" element={<PrivateRoute> <IndexRender/> </PrivateRoute> } />*/}
                        <Route path="/home" element={ <IndexRender/>  } />
                        {/*<Route path="/zamestnanci" element={<PrivateRoute> <ZamestnanecListRender/> </PrivateRoute>}/>*/}
                        <Route path="/zamestnanci" element={<ZamestnanecListRender/> }/>


                        {/*<Route path="/zamestnanci" element={<PrivateRoute>*/}
                            {/*    <ZamestnanecListRender/>*/}
                            {/*</PrivateRoute>} />*/}

                        <Route path="/zamestnanci/create-zamestnanec" element={<CreateZamestnanecFormRender/>}/>
                        <Route path="/zamestnanci/:id/detail" element={<ZamestnanecDetailRender/>}/>


                        <Route path="/ulohy" element={<UlohaListRender/>}/>

                            {/*<Route path="/tasks" component={Tasks} />*/}
                            {/*<Route path="/projects" component={Projects} />*/}
                            {/*<Route path="/contacts" component={Contacts} />*/}
                    </Routes>
                <FooterRender/>

            </ReactKeycloakProvider>
            {/*<GetIdComponent/>*/}
        </div>
    );
}

export default App;
