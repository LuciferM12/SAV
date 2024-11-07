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

}

const ButtonRender = ({ text, variant, link, icon, loader }: ButtonProps) => {
    if (link) {
        return (
            <Button asChild variant={variant}>
                <Link href={link}>{text}</Link>
            </Button>
        )
    }

    return (
        <Button variant={variant} disabled={loader}>
            {loader && <Loader2 className="animate-spin"/>}
            {icon && icon}
            {text}
        </Button>
    )
}

export default ButtonRender