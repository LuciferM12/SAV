import Banner from "../../components/Banner"
import Historia from "../../components/Historia"
import Productos from "../../components/Productos"
import Fondo from '../../assets/images/POSTRES.JPG'

const Inicio = () => {
    return (
        <>
            <Banner
                image={Fondo}
                titulo={"Antojitos Mary"}
                tipo={"Restaurante"}
                descripcion={"Uno de los restaurantes más prestigiosos de San Luis Potosí. Con precios accesibles y uno de los mejores servicios."}
            />
            <Historia />
            <Productos />
        </>
    )
}

export default Inicio