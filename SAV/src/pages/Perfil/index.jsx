import React from 'react'
import Avvvatars from 'avvvatars-react'
import styled from 'styled-components'
import FormRender from '../../components/FormRender'

const Contenedor = styled.div`
    width: 100%;
    min-height: 110vh;
    display: flex;
    background-color: #110904;
    color: white;
    padding: 50px;
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
`

const Perfil = () => {
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
  return (
    <Contenedor>
      <Avvvatars value="best_user@gmail.com" size={200} style='shape' />
      <p>best_user@gmail.com</p>
      <FormRender inputs={inputs} />


    </Contenedor>

  )
}

export default Perfil
