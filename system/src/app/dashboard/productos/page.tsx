'use client'
import Catalogo from '@/components/catalogue/Catalogo'
import React, { useState, useEffect } from 'react'
import { Toaster, toast } from 'sonner';
import { getCategories, getProducts } from './actions';

const Productos = () => {
    const [categorias, setCategorias] = useState([])
    const [productos, setProductos] = useState([])
    const [isLoadingProducts, setIsLoadingProducts] = useState<boolean>(true)
    const [isLoadingCategories, setIsLoadingCategories] = useState<boolean>(true)

    const fetchData = async () => {
        try {
            setIsLoadingCategories(true)
            setIsLoadingProducts(true)
            const categorias = await getCategories()
            setCategorias(categorias)
            setIsLoadingCategories(false)
            const productos = await getProducts()
            setProductos(productos)
            setIsLoadingProducts(false)
        } catch (error) {
            toast.error('Error de carga')
        } finally {
            setIsLoadingCategories(false)
            setIsLoadingProducts(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div className='p-24 lg:px-6 min-h-5/6'>
            <h1 className='font-extrabold text-3xl text-center mb-6'>Productos</h1>
            <Catalogo categories={categorias} productos={productos} isLoadingProducts={isLoadingProducts} isLoadingCategories={isLoadingCategories} />
            <Toaster richColors theme='dark'/>
        </div>
    )
}

export default Productos