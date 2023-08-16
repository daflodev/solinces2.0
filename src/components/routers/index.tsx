import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Settings from "@/pages/configuration";
import NoPermissionPage from "@/pages/noPermitionPage";
import LoadPages from "@/pages/load";
import IframeGestor from "../IframeGestor/IframeGestor";

import PreloaderPage from "../IframeGestor/index"



const AppRouter = () => {


  
const tokenF1 = localStorage.getItem("accesToken")

let type_user = localStorage.getItem("type_user")
console.log(type_user)



    return (
        <Router>
            <Routes>
                <Route path="/no_permission" element={<NoPermissionPage />} />
                <Route path="/layout/:option" element={<Settings />} />
                <Route path="/" element={<LoadPages />} />



                {/*ROUTES PARA INGRESAR A FASE 1*/}
                <Route path="/GESTOR-ACTIVIDADES" element={<PreloaderPage/>}/>
                <Route path="/PLANILLA-ACTIVIDADES" element={<PreloaderPage/>}/>

                {/* <Route path="/GESTOR-ACTIVIDADES" element={<PreloaderPage/>}/>

                <Route path="/GESTOR-ACTIVIDADES" element={<PreloaderPage/>}/> */}


                {/* <Route path="/PLANILLA-ACTIVIDADES" element={<IframeGestor  srcurl={`http://localhost:4046/initial/${tokenF1}/planilla/planilla-actividades/${type_user}`} />} /> */}
                {/* <Route path="/AGENDA" element={<IframeGestor />} />
                <Route path="/MONITOREO" element={<IframeGestor />} /> */}
            </Routes>
        </Router>
    )
}

export default AppRouter;
