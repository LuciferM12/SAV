import { BrowserRouter, Route, Routes } from "react-router-dom";
import Base from "./pages/Base";
import Inicio from "./pages/Inicio";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Base />} >
                    <Route index element={<Inicio />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes