import React from 'react'
import { InputProps } from '../inputs/types'
import Input from '../inputs/Input'
import InputPassword from '../inputs/InputPassword'

export interface FormRenderProps {
    inputs: InputProps[]
}

const FormRender = ({ inputs }: FormRenderProps) => {
    return (
        <>
            {
                inputs.map((input, index) => (
                    input.type === 'text' ?
                        <Input {...input} key={index} /> :
                        input.type === 'password' &&
                        <InputPassword {...input} key={index} />
                ))
            }
        </>
    )
}

export default FormRender