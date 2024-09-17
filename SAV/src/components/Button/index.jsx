import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';

const BotonEstilizado = styled.input`
   width: 150px;
   background-color: #1DF2F2;
   color: #0D0D0D;
   height: 50px;
   border-radius: 10px;
   border-style: none;
   text-align: center;
   font-weight: 700;
   transition: .3s ease-in;
   &:hover{
    background-color: #192744;
    color: white;
   }
`

function Buttton({ texto, icono, ruta, tipo = "button" }) {
    return (
        <Link to={ruta}>
            <BotonEstilizado type={tipo} value={texto} />
        </Link>
    )
}

export default Buttton
