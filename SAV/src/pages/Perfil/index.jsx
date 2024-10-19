import React from 'react'
import Avvvatars from 'avvvatars-react'
import styled from 'styled-components'
import FormRender from '../../components/FormRender'

const Contenedor = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    background-color: #110904;
    color: white;
    padding-top: 100px;
    padding-bottom: 100px;
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
      width: 700,
      required: true,
      value: "Iguaneitor93"
    },
    {
      placeholder: "Password",
      color: "secondary",
      type: "password",
      name: "password",
      id: "password",
      width: 700,
      required: true,
      value: "1234"
    },
    {
      placeholder: "Nombres",
      color: "secondary",
      id: "firstname",
      type: "text",
      name: "firstname",
      width: 700,
      required: true,
      value: "Victor"
    },
    {
      placeholder: "Apellidos",
      color: "secondary",
      id: "lastname",
      type: "text",
      name: "lastname",
      width: 700,
      required: true,
      value: "Castro"
    },
    {
      placeholder: "Edad",
      color: "secondary",
      id: "age",
      type: "number",
      name: "age",
      width: 700,
      required: true,
      value: 20
    },
    {
      placeholder: "Telefono",
      color: "secondary",
      id: "phone",
      type: "tel",
      name: "phone",
      width: 700,
      required: false,
      value: "444444444"
    }
  ]
  return (
    <Contenedor>
      <Avvvatars value="nazi" size={200} style='shape' />
      <h3>Cliente</h3>
      <FormRender inputs={inputs} edition={true} />
    </Contenedor>

  )
}

export default Perfil
