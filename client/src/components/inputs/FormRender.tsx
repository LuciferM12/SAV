import { InputsProps } from '@/types/inputs'
import React from 'react'

interface FormRenderProps {
    inputs: InputsProps[]
    onChange: (name: string, value: string) => void
    editable?: boolean
    className?: string 
}


const FormRender = () => {
  return (
    <div>FormRender</div>
  )
}

export default FormRender