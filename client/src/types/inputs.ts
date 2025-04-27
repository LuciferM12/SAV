
export type InputTypes = 'image' | 'text' | 'number'


export interface Inputs {
    label?: string
    name: string
    value: string
    required: boolean
    placeholder?: string
    type: InputTypes
    disabled: boolean
    id: string
    className?: string
    maxLength?: number,
}

export interface InputsProps extends Inputs {
    onChange: (name: string, value: string) => void
}

