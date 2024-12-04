import Footer from '@/components/footer/Footer'
import Header from '@/components/headers/Header'
import React from 'react'
import { CartProvider } from '../context/carrito/CartContext'

interface LayoutProps {
    children?: React.ReactNode
}

const layout = ({ children }: LayoutProps) => {
    return (
        <div className='h-screen'>
            <Header />
            <CartProvider>
            {
                children
            }
            </CartProvider>
            <Footer />
        </div>

    )
}

export default layout