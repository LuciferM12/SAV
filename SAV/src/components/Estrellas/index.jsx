import React from 'react'
import { FaRegStar } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import styled from 'styled-components';

const ContenedorStar = styled.div`
    display: flex;
    width: 50%;
    gap: 5px;
    color: yellow;
    justify-content: center;
    font-size: 40px;
    
`

function Estrellas({ stars }) {
    const totalStars = 5
    return (
        <ContenedorStar>
            {Array.from({ length: totalStars }, (_, index) =>
                index < stars ? <FaStar key={index} /> : <FaRegStar key={index} />
            )}
        </ContenedorStar>
    )
}

export default Estrellas
