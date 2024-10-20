import { BrowserRouter, Route, Routes } from "react-router-dom";
import Base from "./pages/Base";
import Inicio from "./pages/Inicio";
import Login from "./pages/login";
import SignUp from "./pages/SignUp";
import Perfil from "./pages/Perfil";
import Productos from "./pages/Productos";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Base />} >
                    <Route index element={<Inicio />}></Route>
                    <Route path="profile" element={<Perfil />}/>
                    <Route path="productos" element={<Productos />} />
                </Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/register" element={<SignUp />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes