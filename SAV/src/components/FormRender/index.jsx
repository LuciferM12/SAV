import React, { useState } from 'react'
import Input from '../Input'
import InputPassword from '../InputPassword'
import ButtonP from '../Button'
import styled from 'styled-components'
import { MdEditDocument, MdCancel } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import InputFileUpload from '../InputFile'

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
      initialValues[input.name] = input.value || ''; // Inicializa con valores vacíos
    });
    return initialValues;
  });

  const handleInputChange = (e) => {
    const { name, type, files } = e.target; // Extraer también 'type' y 'files'

    if (type === 'file' && files.length > 0) {
      // Si el input es de tipo file, tomamos el primer archivo
      setFormValues({
        ...formValues,
        [name]: files[0], // Guardamos el archivo en formValues
      });
    } else {
      setFormValues({
        ...formValues,
        [name]: e.target.value, // Actualiza el valor del input correspondiente
      });
    }
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
            input.type != "password" && input.type != "file" ?
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
              : input.type === "password" ?
                <InputPassword
                  placeholder={input.placeholder}
                  name={input.name}
                  color={input.color}
                  key={index}
                  width={input.width}
                  maxWidth={input.maxWidth}
                  required={input.required}
                  disabled={editing}
                  value={formValues[input.name]}
                  onChange={handleInputChange}
                />
                :
                <InputFileUpload
                  key={index}
                  onChange={handleInputChange}
                  texto={input.placeholder}
                />
          ))
        }
      </Entradas>
      {
        !edition ?
          <ButtonP texto={textButton} size={size} type={type} handleSubmit={handleFormSubmit} width={width} />
          :
          editing ?
            <ButtonP texto={"Editar"} size={size} type={type} handleSubmit={() => setEditing(false)} width={width} endIcon={<MdEditDocument />} />
            :
            <>
              <ButtonP texto={"Guardar"} size={size} type={type} handleSubmit={() => setEditing(true)} width={width} endIcon={<FaSave />} />
              <ButtonP texto={"Cancelar"} size={size} type={type} color='secondary' handleSubmit={() => setEditing(true)} width={width} endIcon={<MdCancel />} />
            </>
      }

    </FormEstilizado>
  )
}

export default FormRender
