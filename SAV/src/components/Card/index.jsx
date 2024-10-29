import React from 'react'
import styled from 'styled-components'

const CardEstilizada = styled.div`
    width: 32%;
    height: 500px;
    background-color: #ff7043;
    display: flex;
    min-width: 300px;
    flex-direction: column;
    border-radius: 10px;
    text-align: center;
    color: black;
    box-sizing: border-box;
    transition: .3s ease-in;

    &:hover{
        scale: 0.95;
    }

    h3 {
        margin: 10px;
    }
    p {
        margin: 0;
        white-space: nowrap; 
        font-weight: 400;
        padding: 0 10px;
        overflow: hidden;             
        text-overflow: ellipsis; 
    }
    
    @media (max-width: 1600px) {
        width: 45%;
    }

    @media (max-width: 700px) {
        width: 99%;
    }

`

const CardImagen = styled.div`
    width: 100%;
    height: 350px;
    background-color: aliceblue;
    border-radius: 10px 10px 0 0;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px 10px 0 0;
    }
`

const CajaPrecio = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Precio = styled.div`
    background-color: black;
    color: white;
    padding: 15px;
    height: fit-content;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: 600;
`


function Card({ nombre, descripcion, imagen, precio }) {
    return (
        <CardEstilizada>
            <CardImagen>
                <img src={imagen} alt={nombre} />
            </CardImagen>
            <CajaPrecio>
                <Precio>
                    {`$ ${precio}`}
                </Precio>
            </CajaPrecio>
            <h3>{nombre}</h3>
            <p>{descripcion}</p>
        </CardEstilizada>
    )
}



export default Card
