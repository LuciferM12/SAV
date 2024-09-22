import { Outlet } from "react-router-dom";
import GlobalStyles from "../../components/GlobalStyles";
import HeaderEstilizado from "../../components/Header";
import Footer from "../../components/Footer";

function Base() {
    return (
        <main>
            <GlobalStyles />
            <HeaderEstilizado />
            <Outlet />
            <Footer />
        </main>
    )
}

export default Base