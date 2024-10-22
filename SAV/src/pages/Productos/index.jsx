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

const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"

function Productos() {
    const [value, setValue] = useState(1);
    const [categorias, setCategorias] = useState([])
    const [productos, setProductos] = useState([]) 

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await axios.get(`${URL}/categorias`)
                setCategorias(response.data)
            }catch(error){
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
