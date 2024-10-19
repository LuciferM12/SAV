import React, { useState } from 'react'
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

function FormRender({ inputs, textButton = "Enviar", handleSubmit, type, size, width, align = "center", edition = false, textButtonEdition }) {

  const [formValues, setFormValues] = useState(() => {
  const initialValues = {};
  inputs.forEach(input => {
    initialValues[input.name] = input.value; // Inicializa con valores vacíos
  });
    return initialValues;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value, // Actualiza el valor del input correspondiente
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Evita que la página se recargue
    handleSubmit(formValues); // Llama la función handleSubmit pasando los valores del formulario
  };

  const [editing, setEditing] = useState(edition)
  return (
    <FormEstilizado>
      <Entradas align={align}>
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
                required={input.required}
                disabled={editing}
                value={formValues[input.name]}
                onChange={handleInputChange}
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
      {
        !edition ? <ButtonP texto={textButton} size={size} type={type} handleSubmit={handleFormSubmit} width={width} />
          :
          <ButtonP texto={"Editar"} size={size} type={type} handleSubmit={handleFormSubmit} width={width} />

      }

    </FormEstilizado>
  )
}

export default FormRender
