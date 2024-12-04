'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Toaster, toast } from 'sonner'
import { getCategories, createProduct } from '@/app/dashboard/empleados/altaProducto/actions'
import { Button } from "@/components/ui/button"
import FormRender from '@/components/formRender/FormRender'
import CustomImageInput from '@/components/inputs/InputFile'
import { InputProps } from '@/components/inputs/types'
import { getLogo } from '@/components/headers/actions'
import { FlexibleSelect } from '@/components/inputs/InputSelect'
import ButtonRender from '@/components/buttons/Button'

interface ImageFiles {
    prod: File | null;
}

export default function AltaProducto() {
    const [categories, setCategories] = useState([])
    const [logo, setLogo] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false)
    const [isbusy, setIsBusy] = useState<boolean>(false)
    const [formValues, setFormValues] = useState({
        producto: '',
        precio: '',
        description: '',
        categoria: ''
    })
    const router = useRouter()

    const [imageFiles, setImageFiles] = useState<ImageFiles>({
        prod: null
    })

    const fetchData = async () => {
        try {
            const imagen = await getLogo()
            setLogo(imagen)
            const fetchedCategories = await getCategories()
            setCategories(fetchedCategories)
            setIsLoading(false)
        } catch (error) {
            console.error("Error fetching data:", error)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = event.target
        setFormValues(prev => ({
            ...prev,
            [name]: files ? files[0] : value
        }))
    }

    const handleSelectChange = (name: string) => (value: string) => {
        console.log(value)
        setFormValues(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleImageChange = (file: File | null, imageType: keyof ImageFiles) => {
        setImageFiles(prev => ({ ...prev, [imageType]: file }));
    }


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsBusy(true)

        const formData = new FormData()
        Object.entries(formValues).forEach(([key, value]) => {
            if (value !== null) {
                formData.append(key, value)
            }
        })
        // Add the image file to FormData
        if (imageFiles.prod) {
            formData.append('prod', imageFiles.prod)
        } else {
            toast.error('Por favor seleccione una imagen del producto')
            setIsBusy(false)
            return
        }

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
            setIsBusy(false)
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

    ]

    return (
        <main className="min-h-screen bg-black flex items-center justify-center py-20 px-4">
            <div className="w-full max-w-2xl flex flex-col items-center gap-12 text-white">
                {logo && <img className='w-[200px] h-[200px]' src={logo} />}
                <h1 className="text-3xl font-bold">Nuevo Producto</h1>
                <form onSubmit={handleSubmit} className="w-full space-y-6">
                    <FormRender inputs={inputs} onChange={handleChange} />
                    <FlexibleSelect
                        options={categories}
                        onChange={handleSelectChange('categoria')}
                        value={formValues.categoria}
                        placeholder="Seleccione una categoría"
                        label="Categoria"
                        name="categoria"
                        className="w-full"
                    />
                    <CustomImageInput onChange={(file) => handleImageChange(file, 'prod')} label='Imagen de Producto' name='prod' />
                    <div className='w-full flex justify-center'>
                    <ButtonRender
                        type='submit'
                        text='Guardar'
                        variant={'default'}
                        loader={isbusy}
                    />
                    </div>
                </form>
            </div>
            <Toaster theme="dark" position="bottom-right" richColors />
        </main>
    )
}

