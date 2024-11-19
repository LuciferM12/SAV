'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"

export interface Producto {
    id: number
    nombre: string
    precio: number
    cantidad: number
}

export interface Cart {
    carrito: Producto[]
    agregarCarrito: (producto: Producto) => void
    modifProd: (id: number, cantidad: number) => void 
    quitarProducto: (id: number) => void
}

const CartContext = createContext<Cart | undefined>(undefined)

interface CartProviderProps {
    children: ReactNode
}

export const CartProvider = ({ children }: CartProviderProps) => {
    const [carrito, setCarrito] = useState<Producto[]>([])

    useEffect(() => {
        const carritos = localStorage.getItem('carrito');
        const carritoLS = carritos ? JSON.parse(carritos) : [];
        setCarrito(carritoLS)
    }, [])

    useEffect(() => {
        if (carrito.length > 0) {
            localStorage.setItem('carrito', JSON.stringify(carrito));
        }
    }, [carrito])

    const agregarCarrito = (producto: Producto) => {
        if (carrito.some((articulo) => articulo.id === producto.id)) {
            const carritoActualizado = carrito.map((articulo) => {
                if (articulo.id === producto.id) {
                    articulo.cantidad = producto.cantidad + articulo.cantidad
                }
                return articulo
            })
            setCarrito(carritoActualizado)
        } else {
            setCarrito([...carrito, producto])
        }
    }

    const modifProd = (id: number, cantidad: number) => {
        const carritoActualizado = carrito.map((articulo) => {
            if (articulo.id === id) {
                articulo.cantidad = articulo.cantidad + cantidad
            }
            return articulo
        })
        setCarrito(carritoActualizado)
    }

    const quitarProducto = (id: number) => {
        const carritoActualizado = carrito.filter(articulo => articulo.id !== id)
        setCarrito(carritoActualizado)
    }

    const contextValue: Cart = {
        carrito,
        agregarCarrito,
        modifProd,
        quitarProducto
    }

    return (
        <CartContext.Provider value={contextValue}>
            {
                children
            }
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useCart debe ser usado dentro de un CartProvider')
    }
    return context
}

