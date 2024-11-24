import { Loader2 } from "lucide-react"
import React, { ReactNode } from 'react'
import { Button } from "@/components/ui/button"
import { ButtonProps as ShadcButtonProps } from '@/components/ui/button'
import Link from 'next/link'

interface ButtonProps {
    text?: string
    variant: ShadcButtonProps['variant']
    link?: string
    icon?: ReactNode
    loader?: boolean
    className?: string
    size?: ShadcButtonProps['size']
    onClick?: () => void
    type?: 'submit' | 'reset' | 'button'  // Especificar los tipos explícitamente
    form?: string
}

const ButtonRender = ({ 
    text, 
    form, 
    type = 'button',  // Establecer 'button' como valor por defecto
    variant, 
    link, 
    size, 
    icon, 
    loader = false, 
    className, 
    onClick 
}: ButtonProps) => {
    if (link) {
        return (
            <Button 
                form={form} 
                asChild 
                variant={variant} 
                className={className} 
                disabled={loader} 
                size={size}
            >
                <Link href={link}>{text}</Link>
            </Button>
        )
    }

    return (
        <Button 
            type={type}  // Asegurarnos que type se pasa correctamente
            form={form} 
            variant={variant} 
            className={className} 
            size={size} 
            disabled={loader} 
            onClick={onClick}
        >
            {loader && <Loader2 className="animate-spin"/>}
            {icon && icon}
            {text}
        </Button>
    )
}

export default ButtonRender