'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Toaster, toast } from 'sonner'
import { getCategories, createProduct } from '@/app/dashboard/empleados/altaProducto/actionsProduct'
import { Button } from "@/components/ui/button"
import FormRender from '@/components/formRender/FormRender'
import { InputProps } from '@/components/inputs/types'

export default function AltaProducto() {
    const [categories, setCategories] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [formValues, setFormValues] = useState({
        producto: '',
        precio: '',
        description: '',
        categoria: '',
        image: null as File | null,
    })
    const router = useRouter()

    useEffect(() => {
        const fetchCategories = async () => {
            const fetchedCategories = await getCategories()
            setCategories(fetchedCategories)
        }
        fetchCategories()
    }, [])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = event.target
        setFormValues(prev => ({
            ...prev,
            [name]: files ? files[0] : value
        }))
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoading(true)

        const formData = new FormData()
        Object.entries(formValues).forEach(([key, value]) => {
            if (value !== null) {
                formData.append(key, value)
            }
        })
        /*
        if (!formValues.image) {
            toast.error('Por favor seleccione una imagen')
            setIsLoading(false)
            return
        }
            */

        try {
            const result = await createProduct(formData)
            if (result.success) {
                toast.success('Producto registrado con éxito')
                router.push('/productos') // Adjust this route as needed
            } else {
                toast.error(`Error al registrar producto: ${result.error}`)
            }
        } catch (error) {
            toast.error('Ocurrió un error al enviar el formulario.')
        } finally {
            setIsLoading(false)
        }
    }

    const inputs: InputProps[] = [
        {
            placeholder: "Producto",
            type: "text",
            name: "producto",
            id: "producto",
            className: 'lg:w-full p-2 dark:bg-transparent border border-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-300 lg:w-[90%]',
            classNameDiv: 'w-full lg:w-full',
            required: true,
            label: "Producto",
            value: formValues.producto
        },
        {
            placeholder: "Precio",
            type: "number",
            name: "precio",
            id: "precio",
            className: 'lg:w-full p-2 dark:bg-transparent border border-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-300 lg:w-[90%]',
            classNameDiv: 'w-full lg:w-full',
            required: true,
            label: "Precio",
            value: formValues.precio,
        },
        {
            placeholder: "Descripción",
            type: "text",
            name: "description",
            id: "description",
            className: 'lg:w-full p-2 dark:bg-transparent border border-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-300 lg:w-[90%]',
            classNameDiv: 'w-full lg:w-full',
            required: true,
            label: "Descripción",
            value: formValues.description,
        },
        {
            placeholder: "Seleccione una categoria",
            type: "text",
            name: "categoria",
            id: "categoria",
            className: 'lg:w-full p-2 dark:bg-transparent border border-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-300 lg:w-[90%]',
            classNameDiv: 'w-full lg:w-full',
            required: true,
            label: "Categoría",
            value: formValues.categoria,
        },
        {
            placeholder: "Subir Imagen",
            type: "text",
            name: "image",
            className: 'lg:w-full p-2 dark:bg-transparent border border-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-300 lg:w-[90%]',
            classNameDiv: 'w-full lg:w-full',
            id: "image",
            required: false,
            label: "Imagen",
        },
    ]

    return (
        <main className="min-h-screen bg-black flex items-center justify-center py-20 px-4">
            <div className="w-full max-w-2xl flex flex-col items-center gap-12 text-white">
                <Image
                    src="/AM_Logo.png"
                    alt="logo"
                    width={200}
                    height={100}
                    className="w-1/5"
                />
                <h1 className="text-3xl font-bold">Nuevo Producto</h1>
                <form onSubmit={handleSubmit} className="w-full space-y-6">
                    <FormRender inputs={inputs} onChange={handleChange} />
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading}>
                        {isLoading ? 'Enviando...' : 'Registrar Producto'}
                    </Button>
                </form>
            </div>
            <Toaster theme="dark" position="bottom-right" richColors />
        </main>
    )
}

