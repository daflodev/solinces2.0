import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Settings from "../../../modules/configuration";
import NoPermissionPage from "../../../modules/noPermitionPage";
import LoadPages from "../../../modules/load";


const AppRouter = () => {

    return (
        <Router>
            <Routes>
                <Route path="/no_permission" element={<NoPermissionPage/>} />
                <Route path="/layout/:option" element={<Settings/>} />
                <Route path="/" element={<LoadPages/>} />
            </Routes>
        </Router>
    )
}

export default AppRouter;
