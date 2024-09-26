import React from 'react'
import Input from '../Input'
import InputPassword from '../InputPassword'
import ButtonP from '../Button'

function FormRender({ inputs, textButton = "Enviar", handleSubmit, type }) {
  return (
    <>
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
            />
            :
            <InputPassword
              placeholder={input.placeholder}
              name={input.name}
              color={input.color}
              key={index}
            />
        ))
      }
      <ButtonP texto={textButton} size={"large"} type={type} handleSubmit={handleSubmit} />
    </>
  )
}

export default FormRender
