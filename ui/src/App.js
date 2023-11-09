import logo from './logo.svg';
// import './App.css';
import GetIdComponent from './components/GetIdComponent';
import NavBarRender from "./components/navbar/navBarRender";
import IndexRender from "./webpages/index/indexRender";
import FooterRender from "./components/footer/footerRender";
import CreateZamestnanecFormRender from "./webpages/createZamestnanecForm/createZamestnanecFormRender";
import {BrowserRouter as Router, Route, Routes, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";


function App() {
    return (
        <Router>
            <MainContent />
        </Router>
    );
}


function MainContent() {
    const navigate = useNavigate();
    const [firstLoad, setFirstLoad] = useState(true);

    useEffect(() => {
        if (firstLoad) {
            navigate("/home");
            setFirstLoad(false);
        }
    }, [firstLoad, navigate]);

    return (
            <div className="App">
                <NavBarRender/>
                {/*<h1>AAA</h1>*/}

                <Routes>
                    <Route path="/home" element={<IndexRender/>}/>
                    <Route path="/zamestnanci" element={<CreateZamestnanecFormRender/>} />
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
