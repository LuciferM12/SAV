import Footer from '@/components/footer/Footer'
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
            <Footer />
        </>

    )
}

export default layout