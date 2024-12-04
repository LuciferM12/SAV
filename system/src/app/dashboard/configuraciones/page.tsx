'use client'
import ButtonRender from '@/components/buttons/Button'
import FormRender from '@/components/formRender/FormRender'
import { InputProps } from '@/components/inputs/types'
import React, { useEffect, useState } from 'react'
import { FaEdit, FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { getProfile, updateProfile } from './actions'
import LoadingScreen from '@/components/loading/loading'
import { toast, Toaster } from 'sonner'
import Authorizer from '@/components/security/Authorizer'
import { getLogo } from '@/components/headers/actions'
import CustomImageInput from '@/components/inputs/InputFile'
import { useRouter } from 'next/navigation'

interface ImageFiles {
    logo: File | null;
    banner: File | null;
    nosotrosimg: File | null;
    reservasimg: File | null;
}

const Company = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(true);
    const [logo, setLogo] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false)
    const [isbusy, setIsBusy] = useState<boolean>(false)
    const [companyData, setCompanyData] = useState({
        nombre: '',
        descripcion: '',
        tipo: '',
        nosotros: '',
        telefono: '',
        ubicacion: '',
        reservastext: '',
    })

    const [imageFiles, setImageFiles] = useState<ImageFiles>({
        logo: null,
        banner: null,
        nosotrosimg: null,
        reservasimg: null,
    })

    const formRender: InputProps[] = [
        {
            placeholder: '',
            type: "text",
            id: 'nombre',
            label: 'Nombre del Negocio',
            className: 'lg:w-full p-2 dark:bg-transparent border border-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-300 lg:w-[90%]',
            classNameDiv: 'w-5/12 lg:w-full',
            name: 'nombre',
            required: false,
            disabled: false,
            value: companyData.nombre,
        },
        {
            placeholder: '',
            type: "text",
            id: 'descripcion',
            label: 'Descripción',
            className: 'p-2 dark:bg-transparent border border-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-300',
            classNameDiv: 'w-5/12 lg:w-full ',
            name: 'descripcion',
            required: false,
            disabled: false,
            value: companyData.descripcion,
        },
        {
            placeholder: '',
            type: "text",
            id: 'tipo',
            label: 'Tipo de establecimiento',
            className: 'lg:w-full p-2 dark:bg-transparent border border-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-300 lg:w-[90%]',
            classNameDiv: 'w-5/12 lg:w-full',
            name: 'tipo',
            required: false,
            disabled: false,
            value: companyData.tipo,
        },
        {
            placeholder: '',
            type: "text",
            id: 'nosotros',
            label: 'Texto de nosotros',
            className: ' p-2 dark:bg-transparent border border-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-300',
            classNameDiv: 'w-5/12 lg:w-full',
            name: 'nosotros',
            required: false,
            disabled: false,
            value: companyData.nosotros,
        },
        {
            placeholder: '',
            type: "tel",
            id: 'telefono',
            label: 'Telefono',
            className: 'lg:w-full p-2 dark:bg-transparent border border-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-300 lg:w-[90%]',
            classNameDiv: 'w-5/12 lg:w-full',
            name: 'telefono',
            required: false,
            disabled: false,
            value: companyData.telefono,
        },
        {
            placeholder: '',
            type: "text",
            id: 'ubicacion',
            label: 'Ubicacion',
            className: 'lg:w-full p-2 dark:bg-transparent border border-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-300',
            classNameDiv: 'w-5/12 lg:w-full',
            name: 'ubicacion',
            required: false,
            disabled: false,
            min: 1,
            value: companyData.ubicacion,
        },
        {
            placeholder: '',
            type: "text",
            id: 'reservastext',
            label: 'Texto de reservas',
            className: 'lg:w-full p-2 dark:bg-transparent border border-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-300 lg:w-[90%]',
            classNameDiv: 'w-5/6 lg:w-full',
            name: 'username',
            required: false,
            disabled: false,
            value: companyData.reservastext,
        },

    ]

    const fetchData = async () => {
        try {
            const info = await getProfile()
            setCompanyData({
                nombre: info.nombre || '',
                descripcion: info.descripcion || '',
                tipo: info.tipo || '',
                nosotros: info.nosotros || '',
                telefono: info.telefono || '',
                ubicacion: info.ubicacion || '',
                reservastext: info.reservastext || '',
            })
            const imagen = await getLogo()
            setLogo(imagen)
            setLoading(false)
        } catch (error) {
            console.error("Error fetching profile data:", error)
            setLoading(false)
        }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsBusy(true)
        const formData = new FormData(event.currentTarget)
        Object.entries(imageFiles).forEach(([key, file]) => {
            if (file) {
                formData.append(key, file);
            }
        })
        const result = await updateProfile(formData)
        setIsBusy(false)
        setIsEditing(!isEditing)
        fetchData()
        if (result.success) {
            toast.success('Datos correctamente actualizados')
            router.refresh()
        } else {
            toast.error('Error al actualizar')
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setCompanyData(prev => ({ ...prev, [name]: value }))
    }

    const handleImageChange = (file: File | null, imageType: keyof ImageFiles) => {
        setImageFiles(prev => ({ ...prev, [imageType]: file }));
    }

    if (loading) {
        return <LoadingScreen />
    }

    return (
        <div className='p-24 lg:px-6'>
            <Authorizer allowedRoles={[8]}>
                <div className='flex box-border items-center justify-center flex-col gap-5'>

                    <h3 className='font-bold text-lg'>Informacion</h3>
                    <form className='w-full flex gap-4 lg:flex-col  justify-center flex-wrap box-border ' onSubmit={handleSubmit} id='profile'>
                        <FormRender inputs={formRender} onChange={handleInputChange} />
                        <CustomImageInput onChange={(file) => handleImageChange(file, 'logo')} label='Logo' name='logo' />
                        <CustomImageInput onChange={(file) => handleImageChange(file, 'banner')} label='Imagen de Banner Principal' name='banner' />
                        <CustomImageInput onChange={(file) => handleImageChange(file, 'nosotrosimg')} label='Imagen Seccion Nosotros' name='imgnosotros' />
                        <CustomImageInput onChange={(file) => handleImageChange(file, 'reservasimg')} label='Imagen Seccion Reservas' name='reservas' />

                    </form>



                    <div className='flex items-center justify-center min-w-full gap-5 pt-4'>
                        <ButtonRender
                            type='submit'
                            form='profile'
                            text='Guardar'
                            icon={<FaSave />}
                            variant={'default'}
                            loader={isbusy}
                        />
                        <ButtonRender
                            text='Cancelar'
                            type='button'
                            icon={<MdCancel />}
                            variant={'default'}
                            onClick={() => {
                                fetchData()
                            }}
                            loader={isbusy}
                        />
                    </div>




                </div>
                <Toaster theme='dark' richColors />
            </Authorizer>
        </div>
    )
}

export default Company