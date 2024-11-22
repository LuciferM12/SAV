'use client'
import React from 'react'
import { InputProps } from '../inputs/types'
import Input from '../inputs/Input'
import InputPassword from '../inputs/InputPassword'

export interface FormRenderProps {
    inputs: InputProps[]
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const FormRender = ({ inputs, onChange }: FormRenderProps) => {
    return (
        <>
            {
                inputs.map((input, index) => (
                    input.type === 'text' || input.type === 'number' || input.type === 'tel' ?
                        <Input {...input} onChange={onChange} key={index} /> :
                        input.type === 'password' &&
                        <InputPassword {...input} onChange={onChange} key={index} />
                ))
            }
        </>
    )
}

export default FormRender