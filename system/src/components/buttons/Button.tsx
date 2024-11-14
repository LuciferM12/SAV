import { Loader2 } from "lucide-react"
import React, { ReactNode } from 'react'
import { Button } from "@/components/ui/button"
import { ButtonProps as ShadcButtonProps } from '@/components/ui/button'
import Link from 'next/link'

interface ButtonProps {
    text: string
    variant: ShadcButtonProps['variant']
    link?: string
    icon?: ReactNode
    loader?: boolean
    className?: string
    onClick?: () => void
}

const ButtonRender = ({ text, variant, link, icon, loader, className, onClick }: ButtonProps) => {
    if (link) {
        return (
            <Button asChild variant={variant}>
                <Link href={link}>{text}</Link>
            </Button>
        )
    }

    return (
        <Button variant={variant} className={className} disabled={loader} onClick={onClick}>
            {loader && <Loader2 className="animate-spin"/>}
            {icon && icon}
            {text}
        </Button>
    )
}

export default ButtonRender