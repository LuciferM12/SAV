import { BrowserRouter, Route, Routes } from "react-router-dom";
import Base from "./pages/Base";
import Inicio from "./pages/Inicio";
import Login from "./pages/login";
import SignUp from "./pages/SignUp";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Base />} >
                    <Route index element={<Inicio />}></Route>
                </Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/register" element={<SignUp />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes