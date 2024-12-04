'use client'
import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import Card from './card/Card'
import CardSkeleton from '../skeletons/CardSkeleton'
import { Skeleton } from '../ui/skeleton'

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
    isLoadingProducts: boolean
    isLoadingCategories: boolean
}

const Catalogo = ({ categories, productos, isLoadingProducts, isLoadingCategories }: CatalogoProps) => {
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
            <Tabs value={selectedCategory} onValueChange={handleCategoryChange} className="w-[80%]">
                {
                    isLoadingCategories ?
                        <div className='flex bg-transparent gap-2 flex-wrap justify-center sm:h-20 mb-4'>
                            {[...Array(5)].map((_, index) => (
                                <Skeleton key={index} className="h-10 w-24" />
                            ))}
                        </div> :
                        <TabsList className='flex bg-transparent gap-2 flex-wrap sm:h-20'>
                            <TabsTrigger className='dark:bg-gray-800 dark:text-white bg-slate-300 text-black dark:data-[state=active]:bg-slate-50 dark:data-[state=active]:text-black data-[state=active]:bg-slate-900 data-[state=active]:text-white ' value={'Todos'}>Todos</TabsTrigger>
                            {
                                categories.map((categoria, index) => (
                                    <TabsTrigger className='dark:bg-gray-800 dark:text-white bg-slate-300 text-black dark:data-[state=active]:bg-slate-50 dark:data-[state=active]:text-black data-[state=active]:bg-slate-900 data-[state=active]:text-white ' key={index} value={categoria.categoria}>{categoria.categoria}</TabsTrigger>
                                ))
                            }
                        </TabsList>

                }

                {
                    isLoadingProducts ?
                        <div className='flex flex-wrap gap-3 mt-2'>
                            {[...Array(6)].map((_, index) => (
                                <CardSkeleton key={index} />
                            ))}
                        </div> :
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
                }

            </Tabs>
        </div>
    )
}

export default Catalogo