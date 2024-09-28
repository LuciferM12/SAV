import React from 'react'
import Input from '../Input'
import InputPassword from '../InputPassword'
import ButtonP from '../Button'
import styled from 'styled-components'

const FormEstilizado = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`

const Entradas = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${({ align }) => (align === 'center' ? 'center' : 'flex-start')};
  width: 90%;
  gap: 50px;
  flex-wrap: wrap;
  @media (max-width: 1024px) {
    justify-content: center;
  }
`

function FormRender({ inputs, textButton = "Enviar", handleSubmit, type, size, width, align = "center" }) {
  return (
    <FormEstilizado>
      <Entradas $align={align}>
        {
          inputs.map((input, index) => (
            input.type != "password" ?
              <Input
                placeholder={input.placeholder}
                name={input.name}
                color={input.color}
                type={input.type}
                key={index}
                id={input.id}
                width={input.width}
                maxWidth={input.maxWidth}
              />
              :
              <InputPassword
                placeholder={input.placeholder}
                name={input.name}
                color={input.color}
                key={index}
                width={input.width}
                maxWidth={input.maxWidth}
              />
          ))
        }
      </Entradas>
      <ButtonP texto={textButton} size={size} type={type} handleSubmit={handleSubmit} width={width} />
    </FormEstilizado>
  )
}

export default FormRender
