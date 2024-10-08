import React from 'react'
import Avvvatars from 'avvvatars-react'
import styled from 'styled-components'

const Contenedor = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Perfil = () => {
  return (
    <Contenedor>
        <Avvvatars value="best_user@gmail.com" size={200} style='shape' />
    </Contenedor>
    
  )
}

export default Perfil
