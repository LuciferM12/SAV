import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import Banner from '../../components/Banner'
import Fondo from '../../assets/images/defaultCarne.jpg'
import Catalogo from '../../components/Catalogo'

const Contenedor = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    background-color: #110904;
    color: white;
    padding-top: 50px;
    padding-bottom: 100px;
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
`

function Productos() {
    const [value, setValue] = useState(1);
    const [categorias, setCategorias] = useState([])
    const [productos, setProductos] = useState([]) 
    /*const productos = [
        { foto: '/Totita.jpg', nombre: 'Platillo 1', costo: 50.50, descripcion: 'Descripción 1', categoria: 'Carnes' },
        { foto: '/limonada.jpg', nombre: 'Bebida 3', costo: 70.00, descripcion: 'Descripción 2', categoria: 'Ensaladas' },
        { foto: '/monster.jpg', nombre: 'Bebida 1', costo: 30.00, descripcion: 'Descripción 3', categoria: 'Postres' },
        { foto: '/jamaica.jpg', nombre: 'Bebida 2', costo: 40.00, descripcion: 'Descripción 4', categoria: 'Bebidas' },
        // Más productos...
    ];*/

    /*const categorias = [
        { id: 1, nombre: "Carnes" },
        { id: 2, nombre: "Ensaladas" },
        { id: 3, nombre: "Postres" },
        { id: 4, nombre: "Bebidas" },
    ]*/

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await axios.get('http://localhost:3000/categorias')
                setCategorias(response.data)
            }catch(error){
                console.log(error)
            }
        }
        const fetchProductos = async () => {
            try {
                const response = await axios.get('http://localhost:3000/productos');
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
                height='50vh'
                image={Fondo}
                secundario={true}
                titulo={"Productos"}
            />
            <Contenedor>
                <Catalogo
                    productos={productos}
                    categorias={categorias}
                    titulo={"Nustros Productos"}
                    value={value}
                    setValue={setValue}
                />
            </Contenedor>
        </>
    )
}

export default Productos
