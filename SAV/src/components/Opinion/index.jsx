import React from 'react'
import styled from 'styled-components'
import OpinionCard from '../OpinionCard'

const SectionEstilizado = styled.section`
  width: 100%;
  min-height: 200px;
  display: flex;
  background-color: #110904;
  color: white;
  padding: 50px;
  box-sizing: border-box;
  gap: 50px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  @media (max-width: 480px) {
    padding: 20px;
  }
`

const ContenedorOpiniones = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 30px;
`

function Opinion() {
    return (
        <SectionEstilizado>
            <h1>Opiniones</h1>
            <ContenedorOpiniones>
                <OpinionCard />
                <OpinionCard />
                <OpinionCard />
            </ContenedorOpiniones>
        </SectionEstilizado>
    )
}

export default Opinion
