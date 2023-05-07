import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Settings from "../../modules/configuration";


const AppRouter = () => {

    return (
        <Router>
            <Routes>
                <Route path="/layout/:option" element={<Settings/>} />
            </Routes>
        </Router>
    )
}

export default AppRouter;
