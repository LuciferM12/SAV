import React from 'react'
import styled from 'styled-components'
import GlobalStyles from '../../components/GlobalStyles'
import Input from '../../components/Input'
import InputPassword from '../../components/InputPassword'
import Logo from '/AM_Logo.png';

const InicioSesionEstilizado = styled.main`
    width: 100%;
    height: 100vh;
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Divisor = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 50px;
    color: white;
    img {
        width: 20%;
    }
    @media (max-width: 1020px) {
        width: 90%;
        img {
            width: 50%;
        }
    }
`

const ImagenDivisor = styled.div`
    width: 50%;
    background-image: url('/about-section.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    overflow: hidden; 
    position: relative;
    height: 100%;
    &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 50px; /* Ancho del difuminado */
        height: 100%;
        background: linear-gradient(to right, rgba(0, 0, 0, 1), transparent); 
        z-index: 2;
    }

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7); /* Color negro semi-transparente */
        z-index: 1; 
    }

    @media (max-width: 1020px) {
        display: none;
    }
`

function Login() {
    return (
        <>
            <GlobalStyles />
            <InicioSesionEstilizado>
                <Divisor >
                    <img src={Logo} alt="logo" />
                    <h1>Inicie Sesión</h1>
                    <Input placeholder={"Usuario"} color={"secondary"} id={"usuario"} type={'text'} name={"user"} />
                    <InputPassword name={"password"} />
                </Divisor>
                <ImagenDivisor />
            </InicioSesionEstilizado>
        </>
    )
}

export default Login

