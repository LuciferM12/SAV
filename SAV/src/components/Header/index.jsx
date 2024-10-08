import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import Logo from '/AM_Logo.png';
import { Link } from 'react-router-dom';
import ButtonP from '../Button';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const HeaderEstilizado = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 80px;
    background-color: ${({ semovio }) => (semovio === "true" ? '#141414' : 'transparent')};
    color: white;
    padding: 0px 30px;
    box-sizing: border-box;
    position: fixed;
    top: 0px;
    transition: background-color 0.3s ease;
    z-index: 1000;
    
    box-shadow: ${({ semovio }) => (semovio === "true" && '0px 10px 5px -8px rgba(0,0,0,0.75)')};  
    -webkit-box-shadow: ${({ semovio }) => (semovio === "true" && '0px 10px 5px -8px rgba(0,0,0,0.75)')}; 
    -moz-box-shadow:${({ semovio }) => (semovio === "true" && '0px 10px 5px -8px rgba(0,0,0,0.75)')}; 

    @media (max-width: 768px) {
        padding: 10px 20px;
        justify-content: space-between;
        background-color: #141414;
    }
`;

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

    @media (max-width: 768px) {
        display: ${({ isopen }) => (isopen === 'true' ? 'flex' : 'none')};
        flex-direction: column;
        gap: 20px;
        position: absolute;
        top: 51px;
        left: 0;
        background-color: #141414;
        width: 100%;
        padding: 20px 0;
        box-sizing: border-box;
        z-index: 999;
        height: fit-content;
    }
`;

const MenuButton = styled.button`
    display: none;
    background: none;
    border: none;
    color: white;
    cursor: pointer;

    @media (max-width: 768px) {
        display: block;
    }
`;

const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    img {
        width: 90px;
    }
`;

const Header = () => {
    const [semovio, setsemovio] = useState("false");
    const [menuOpen, setMenuOpen] = useState('false');

    // Función que escucha el scroll
    const handleScroll = () => {
        const scrollTop = window.scrollY;
        if (scrollTop > 50) {
            setsemovio("true");
        } else {
            setsemovio("false");
        }
    };

    // Manejar el estado del menú
    const toggleMenu = () => {
        setMenuOpen(menuOpen === 'true' ? 'false' : 'true')
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
            {/* Botón de Menú para pantallas pequeñas */}
            <MenuButton onClick={toggleMenu}>
                {menuOpen === 'true' ? <CloseIcon fontSize="large" /> : <MenuIcon fontSize="large" />}
            </MenuButton>

            {/* Logo */}
            <LogoContainer>
                <Link to={"/"}>
                    <img src={Logo} alt="logo" />
                </Link>
            </LogoContainer>

            {/* Opciones del menú */}
            <OpcionesEstilizadas isopen={menuOpen}>
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/nosotros">Nosotros</Link></li>
                <li><Link to="/productos">Productos</Link></li>
                <li><Link to="/contacto">Contáctanos</Link></li>
                <ButtonP texto={"Inicia Sesión"} ruta={"/login"} size={"small"} color={"secondary"} />
            </OpcionesEstilizadas>
        </HeaderEstilizado>
    );
}

export default Header;