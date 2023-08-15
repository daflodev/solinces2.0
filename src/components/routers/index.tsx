import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Settings from "@/pages/configuration";
import NoPermissionPage from "@/pages/noPermitionPage";
import LoadPages from "@/pages/load";
import IframeGestor from "../IframeGestor/IframeGestor";



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
                <Route path="/GESTOR-ACTIVIDADES" element={<IframeGestor srcurl={`http://localhost:4046/initial/${tokenF1}/agenda/gestor-actividades/${type_user}`}/>}/>
                {/* <Route path="/PLANILLA-ACTIVIDADES" element={<IframeGestor />} />
                <Route path="/AGENDA" element={<IframeGestor />} />
                <Route path="/MONITOREO" element={<IframeGestor />} /> */}
            </Routes>
        </Router>
    )
}

export default AppRouter;
