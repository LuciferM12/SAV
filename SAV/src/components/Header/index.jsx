import React, { useState, useEffect } from 'react';
import styled from "styled-components"
import Logo from '/AM_Logo.png'
import { Link } from 'react-router-dom';
import ButtonP from '../Button';

const HeaderEstilizado = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 80px;
    background-color: ${({ semovio }) => (semovio == "true" ? '#110904' : 'transparent')};
    color: white;
    padding: 0px 30px;
    box-sizing: border-box;
    position: fixed;
    top: 0px;
    transition: background-color 0.3s ease;
    z-index: 1000;
`

const OpcionesEstilizadas = styled.ul`
    display: flex;
    gap: 50px;
    height: 100%;
    align-items: center;
    justify-content: space-evenly;
    padding: 0px;
    font-size: 1rem;
    list-style-type: none;
    font-weight: 400;

    img {
        width: 90px;
    }
`

const Header = () => {
    const [semovio, setsemovio] = useState("false");

    // Función que escucha el scroll
    const handleScroll = () => {
        const scrollTop = window.scrollY;
        if (scrollTop > 50) {  // Cambia el valor si deseas que el color se aplique antes o después
            setsemovio("true");
        } else {
            setsemovio("false");
        }
    };

    useEffect(() => {
        // Agregar un event listener para detectar el scroll
        window.addEventListener('scroll', handleScroll);

        // Limpiar el event listener cuando el componente se desmonte
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <HeaderEstilizado semovio={semovio}>
            <OpcionesEstilizadas>
                <li>Inicio</li>
                <li>Nosotros</li>
                <li>Productos</li>
            </OpcionesEstilizadas>
            <OpcionesEstilizadas>
                <Link to={"/"}><li><img src={Logo} alt="logo" /></li></Link>
            </OpcionesEstilizadas>
            <OpcionesEstilizadas>
                <li>Contáctanos</li>
                <ButtonP texto={"Inicia Sesión"} ruta={"/signin"} size={"small"} color={"secondary"} />
            </OpcionesEstilizadas>
        </HeaderEstilizado>
    )
}

export default Header