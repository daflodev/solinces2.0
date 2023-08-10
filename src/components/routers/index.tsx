import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Settings from "@/pages/configuration";
import NoPermissionPage from "@/pages/noPermitionPage";
import LoadPages from "@/pages/load";
import IframeForo  from "../IframeForo/iframeForo";


const AppRouter = () => {

    return (
        <Router>
            <Routes>
                <Route path="/no_permission" element={<NoPermissionPage/>} />
                <Route path="/test" element={<IframeForo/>} />

                <Route path="/layout/:option" element={<Settings/>} />
                
                <Route path="/" element={<LoadPages/>} />
            </Routes>
        </Router>
    )
}

export default AppRouter;
