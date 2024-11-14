import Header from '@/components/headers/Header'
import React from 'react'

interface LayoutProps {
    children?: React.ReactNode
}

const layout = ({ children }: LayoutProps) => {
    return (
        <>
            <Header />
            {
                children
            }
        </>

    )
}

export default layout