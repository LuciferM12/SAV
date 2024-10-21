import Avvvatars from 'avvvatars-react'
import React from 'react'
import styled from 'styled-components'
import Estrellas from '../Estrellas'

const OpinionEstilizada = styled.div`
    width: 32%;
    min-width: 300px;
    border-radius: 10px;
    height: 300px;
    background-color: #141414;
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    p {
        margin: 0;
        padding: 0 10px;
        font-weight: 400;
        max-width: 90%; /* Limitar el ancho máximo del párrafo */
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2; /* Mostrar solo 3 líneas */
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
    }
    
    @media (max-width: 1600px) {
        width: 45%;
    }

    @media (max-width: 700px) {
        width: 99%;
    }
`

const Contenido = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px; /* Añadir espacio entre los elementos */

    & h2, h3, h5 {
        margin: 5px 0;
        line-height: 10px /* Reducir el margen entre los títulos */
    }
`;

const Icono = styled.div`
    padding: 10px;
    box-sizing: border-box;
`

function OpinionCard({ usuario, stars }) {
    return (
        <OpinionEstilizada>
            <Contenido>
                <Icono>
                    <Avvvatars value={usuario} size={115} style='shape' />
                </Icono>
                <h3>{usuario}</h3>
                <h5>Cliente</h5>
                <Estrellas stars={stars} />
            </Contenido>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, laboriosam nesciunt ullam unde quaerat dolorem quibusdam ut ea rerum similique. Libero deleniti magni blanditiis reprehenderit iure accusamus rerum cum incidunt aliquam autem nisi amet tempore expedita quas voluptatum facilis praesentium hic perspiciatis impedit, ad labore suscipit dicta pariatur quod. Quisquam?</p>
        </OpinionEstilizada>
    )
}

export default OpinionCard;