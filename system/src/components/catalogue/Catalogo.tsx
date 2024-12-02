'use client'
import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import Card from './card/Card'

type Categorias = {
    id: string
    categoria: string
}

type Productos = {
    id_prod: number
    nomprod: string
    precio: number
    image: string
    descripcion: string
    categoria: string
}

interface CatalogoProps {
    categories: Categorias[]
    productos: Productos[]
}

const Catalogo = ({ categories, productos }: CatalogoProps) => {
    const [selectedCategory, setSelectedCategory] = useState<string>("Todos")

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category)
    }

    const filteredProducts = selectedCategory === "Todos"
        ? productos
        : productos.filter(producto => {
            return producto.categoria === selectedCategory
        })

    return (
        <div className='w-full items-center justify-center flex flex-col p-3 box-border'>
             <h1 className='font-extrabold text-center text-3xl mb-6'>Productos Principales </h1>
            <Tabs value={selectedCategory} onValueChange={handleCategoryChange} className="w-[80%]">
                <TabsList className='flex bg-transparent gap-2 flex-wrap sm:h-20'>
                <TabsTrigger className='dark:bg-gray-800 dark:text-white bg-slate-300 text-black dark:data-[state=active]:bg-slate-50 dark:data-[state=active]:text-black data-[state=active]:bg-slate-900 data-[state=active]:text-white ' value={'Todos'}>Todos</TabsTrigger>
                    {
                        categories.map((categoria, index) => (
                            <TabsTrigger className='dark:bg-gray-800 dark:text-white bg-slate-300 text-black dark:data-[state=active]:bg-slate-50 dark:data-[state=active]:text-black data-[state=active]:bg-slate-900 data-[state=active]:text-white ' key={index} value={categoria.categoria}>{categoria.categoria}</TabsTrigger>
                        ))
                    }
                </TabsList>
                <TabsContent value={selectedCategory} className='flex flex-wrap gap-3'>
                    {filteredProducts.map((producto, index) => (
                        <Card
                            key={index}
                            id={producto.id_prod}
                            nombre={producto.nomprod}
                            descripcion={producto.descripcion}
                            imagen={producto.image}
                            precio={producto.precio}
                        />
                    ))}
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default Catalogo