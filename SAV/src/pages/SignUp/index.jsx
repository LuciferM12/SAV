import React from 'react'
import styled from 'styled-components'
import GlobalStyles from '../../components/GlobalStyles'
import Logo from '/AM_Logo.png';
import FormRender from '../../components/FormRender'
import { Link } from 'react-router-dom';

const Registrar = styled.main`
    width: 100%;
    min-height: 100vh;
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Divisor = styled.div`
    width: 90%;
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
`

function SignUp() {
    const inputs = [
        {
            placeholder: "Usuario",
            color: "secondary",
            id: "usuario",
            type: "text",
            name: "username",
            width: 700
        },
        {
            placeholder: "Password",
            color: "secondary",
            type: "password",
            name: "password",
            id: "password",
            width: 700
        },
        {
            placeholder: "Nombres",
            color: "secondary",
            id: "firstname",
            type: "text",
            name: "firstname",
            width: 700
        },
        {
            placeholder: "Apellidos",
            color: "secondary",
            id: "lastname",
            type: "text",
            name: "lastname",
            width: 700
        },
        {
            placeholder: "Edad",
            color: "secondary",
            id: "age",
            type: "number",
            name: "age",
            width: 700
        },
        {
            placeholder: "Telefono",
            color: "secondary",
            id: "phone",
            type: "tel",
            name: "phone",
            width: 700
        }

    ]

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Enviado')
    }

    return (
        <>
            <GlobalStyles />
            <Registrar>
                <Divisor >
                    <img src={Logo} alt="logo" />
                    <h1>Registrate</h1>
                    <FormRender inputs={inputs} handleSubmit={handleSubmit} align='flex-start' width={200} />
                </Divisor>
            </Registrar>
        </>
    )
}

export default SignUp