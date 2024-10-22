import { useState, useEffect } from "react"
import axios from "axios"
import Banner from "../../components/Banner"
import Historia from "../../components/Historia"
import Productos from "../../components/Catalogo"
import Fondo from '../../assets/images/POSTRES.JPG'
import Opinion from "../../components/Opinion"

const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"

const Inicio = () => {
    const [categorias, setCategorias] = useState([])
    const [productos, setProductos] = useState([])
    const [value, setValue] = useState(1);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await axios.get(`${URL}/tipos`)
                setCategorias(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        const fetchProductos = async () => {
            try {
                const response = await axios.get(`${URL}/productos`);
                setProductos(response.data);
            } catch (error) {
                console.error('Error al obtener productos:', error);
            }
        }
        fetchProductos()
        fetchCategorias()
    }, [])

    return (
        <>
            <Banner
                image={Fondo}
                titulo={"Antojitos Mary"}
                tipo={"Restaurante"}
                descripcion={"Uno de los restaurantes más prestigiosos de San Luis Potosí. Con precios accesibles y uno de los mejores servicios."}
            />
            <Historia />
            <Productos
                productos={productos}
                categorias={categorias}
                titulo={"Principales Productos"}
                value={value}
                setValue={setValue}
                caso={2}
            />
            <Opinion />
        </>
    )
}

export default Inicio