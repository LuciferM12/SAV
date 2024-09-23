import { BrowserRouter, Route, Routes } from "react-router-dom";
import Base from "./pages/Base";
import Inicio from "./pages/Inicio";
import Login from "./pages/login";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Base />} >
                    <Route index element={<Inicio />}></Route>
                </Route>
                <Route path="/login" element={<Login />}></Route>

            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes