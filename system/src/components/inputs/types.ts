export interface InputProps {
    placeholder: string
    type: 'text' | 'number' | 'email' | 'tel' | 'url' | 'password'
    min?: number
    max?: number
    minlength?: number
    maxlength?: number 
    id: string
    label: string
    className?: string
    classNameDiv?: string
    name: string
    required?: boolean
    disabled?: boolean
    value?: string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}