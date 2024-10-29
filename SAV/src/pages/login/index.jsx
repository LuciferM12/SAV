import React from 'react'
import styled from 'styled-components'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import GlobalStyles from '../../components/GlobalStyles'
import Logo from '/AM_Logo.png';
import FormRender from '../../components/FormRender'

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

const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"

function Login() {
    const [cookies, setCookie] = useCookies(['session_token'])
    const navigate = useNavigate()
    const inputs = [
        {
            placeholder: "Usuario",
            color: "secondary",
            id: "usuario",
            type: "text",
            name: "username",
            width: "70%"
        },
        {
            placeholder: "Password",
            color: "secondary",
            type: "password",
            name: "password",
            id: "password",
            width: "70%"
        }
    ]

    const handleSubmit = async (formValues) => {
        try {
            const response = await axios.post(`${URL}/login`, formValues)
            const expiration = new Date()
            expiration.setDate(expiration.getDate() + 3)
            setCookie('session_token', response.data.token, { path: '/', expires: expiration })
            navigate('/protected')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <GlobalStyles />
            <InicioSesionEstilizado>
                <Divisor >
                    <img src={Logo} alt="logo" />
                    <h1>Inicie Sesión</h1>
                    <FormRender inputs={inputs} handleSubmit={handleSubmit} size={"large"} />
                </Divisor>
                <ImagenDivisor />
            </InicioSesionEstilizado>
        </>
    )
}

export default Login

