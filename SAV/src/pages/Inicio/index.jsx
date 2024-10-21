import Banner from "../../components/Banner"
import Historia from "../../components/Historia"
import Productos from "../../components/Catalogo"
import Fondo from '../../assets/images/POSTRES.JPG'
import Opinion from "../../components/Opinion"

const Inicio = () => {
    const productos = [
        { foto: '/Totita.jpg', nombre: 'Platillo 1', costo: 50.50, descripcion: 'Descripción 1', categoria: 'Platillos' },
        { foto: '/limonada.jpg', nombre: 'Bebida 3', costo: 70.00, descripcion: 'Descripción 2', categoria: 'Bebidas' },
        { foto: '/monster.jpg', nombre: 'Bebida 1', costo: 30.00, descripcion: 'Descripción 3', categoria: 'Bebidas' },
        { foto: '/jamaica.jpg', nombre: 'Bebida 2', costo: 40.00, descripcion: 'Descripción 4', categoria: 'Bebidas' },
        // Más productos...
    ];

    const categorias = [
        { id: 1, nombre: "Platillos" },
        { id: 2, nombre: "Bebidas" },
    ]

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
            />
            <Opinion />
        </>
    )
}

export default Inicio