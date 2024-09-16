import { Outlet } from "react-router-dom";
import GlobalStyles from "../../components/GlobalStyles";
import HeaderEstilizado from "../../components";

function Base() {
    return (
        <main>
            <GlobalStyles />
            <HeaderEstilizado />
            <Outlet/>
        </main>
    )
}

export default Base