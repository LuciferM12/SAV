import { BrowserRouter, Route, Routes } from "react-router-dom";
import Base from "./pages/Base";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Base />} >

                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes