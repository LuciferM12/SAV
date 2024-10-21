import React from 'react'
import styled from 'styled-components'

const OpinionEstilizada = styled.div`
    width: 32%;
    min-width: 300px;
    border-radius: 10px;
    height: 300px;
    background-color: #141414;
    
    @media (max-width: 1600px) {
        width: 45%;
    }

    @media (max-width: 700px) {
        width: 99%;
    }
`

function OpinionCard() {
    return (
        <OpinionEstilizada />
    )
}

export default OpinionCard
