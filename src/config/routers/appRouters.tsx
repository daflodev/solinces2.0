import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Settings from "../../modules/configuration";
import LoadPages from "../../modules/load";


const AppRouter = () => {

    return (
        <Router>
            <Routes>
                <Route path="/layout/:option" element={<Settings/>} />
                <Route path="/" element={<LoadPages/>} />
            </Routes>
        </Router>
    )
}

export default AppRouter;
