'use client'
import React from 'react'
import { InputProps, TextAreaProps } from '../inputs/types'
import Input from '../inputs/Input'
import InputPassword from '../inputs/InputPassword'
import TextArea from '../inputs/TextArea'

export interface FormRenderProps {
    inputs: (InputProps | TextAreaProps)[]
    onChange?: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const FormRender = ({ inputs, onChange }: FormRenderProps) => {
    return (
        <>
            {inputs.map((input, index) => {
                if ('type' in input) {
                    if (input.type === 'password') {
                        return <InputPassword {...input} onChange={onChange} key={index} />
                    } else {
                        return <Input {...input} onChange={onChange} key={index} />
                    }
                } else {
                    return <TextArea {...input} onChange={onChange} key={index} />
                }
            })}
        </>
    )
}

export default FormRender