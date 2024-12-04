'use client'
import ButtonRender from '@/components/buttons/Button'
import FormRender from '@/components/formRender/FormRender'
import { InputProps } from '@/components/inputs/types'
import Avvvatars from 'avvvatars-react'
import React, { useEffect, useState } from 'react'
import { FaEdit, FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { getProfile, updateProfile } from './actions'
import LoadingScreen from '@/components/loading/loading'
import { toast, Toaster } from 'sonner'
import Authorizer from '@/components/security/Authorizer'

const Perfil = () => {
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false)
    const [isbusy, setIsBusy] = useState<boolean>(false)
    const [profileData, setProfileData] = useState({
        fnombre: '',
        snombre: '',
        apellidop: '',
        apellidom: '',
        telefono: '',
        edad: '',
        usuario: '',
    })

    const formRender: InputProps[] = [
        {
            placeholder: '',
            type: "text",
            id: 'fnombre',
            label: 'Primer Nombre',
            className: 'lg:w-full p-2 dark:bg-transparent border border-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-300 lg:w-[90%]',
            classNameDiv: 'w-5/12 lg:w-full',
            name: 'fnombre',
            required: true,
            disabled: !isEditing,
            value: profileData.fnombre,
        },
        {
            placeholder: '',
            type: "text",
            id: 'snombre',
            label: 'Segundo Nombre',
            className: 'p-2 dark:bg-transparent border border-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-300',
            classNameDiv: 'w-5/12 lg:w-full ',
            name: 'snombre',
            required: false,
            disabled: !isEditing,
            value: profileData.snombre,
        },
        {
            placeholder: '',
            type: "text",
            id: 'apellidop',
            label: 'Apellido Paterno',
            className: 'lg:w-full p-2 dark:bg-transparent border border-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-300 lg:w-[90%]',
            classNameDiv: 'w-5/12 lg:w-full',
            name: 'apellidop',
            required: true,
            disabled: !isEditing,
            value: profileData.apellidop,
        },
        {
            placeholder: '',
            type: "text",
            id: 'apellidom',
            label: 'Apellido Materno',
            className: ' p-2 dark:bg-transparent border border-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-300',
            classNameDiv: 'w-5/12 lg:w-full',
            name: 'apellidom',
            required: false,
            disabled: !isEditing,
            value: profileData.apellidom,
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
            disabled: !isEditing,
            value: profileData.telefono,
        },
        {
            placeholder: '',
            type: "number",
            id: 'edad',
            label: 'Edad',
            className: 'lg:w-full p-2 dark:bg-transparent border border-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-300',
            classNameDiv: 'w-5/12 lg:w-full',
            name: 'edad',
            required: false,
            disabled: !isEditing,
            min: 1,
            value: profileData.edad,
        },
        {
            placeholder: '',
            type: "text",
            id: 'username',
            label: 'Usuario',
            className: 'lg:w-full p-2 dark:bg-transparent border border-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-300 lg:w-[90%]',
            classNameDiv: 'w-5/12 lg:w-full',
            name: 'username',
            required: true,
            disabled: !isEditing,
            value: profileData.usuario,
        },
        {
            placeholder: 'Deje en blanco si no desea hacer modificaciones.',
            type: "password",
            id: 'password',
            label: 'Contraseña',
            className: ' p-2 dark:bg-transparent border border-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-300',
            classNameDiv: 'w-5/12 lg:w-full',
            name: 'password',
            required: false,
            disabled: !isEditing,
        }
    ]

    const fetchData = async () => {
        try {
            const info = await getProfile()
            setProfileData({
                fnombre: info.fnombre || '',
                snombre: info.snombre || '',
                apellidop: info.apellidop || '',
                apellidom: info.apellidom || '',
                telefono: info.telefono || '',
                edad: info.edad !== null ? String(info.edad) : '',
                usuario: info.usuario || '',
            })
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
        const result = await updateProfile(formData)
        setIsBusy(false)
        setIsEditing(!isEditing)
        fetchData()
        if (result.success) {
            toast.success('Datos correctamente actualizados')
        } else {
            toast.error('Error al actualizar')
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setProfileData(prev => ({ ...prev, [name]: value }))
    }

    if (loading) {
        return <LoadingScreen />
    }

    return (
        <div className='p-24 lg:px-6'>
            <Authorizer allowedRoles={[7,8]}>
                <div className='flex box-border items-center justify-center flex-col gap-5'>
                    <Avvvatars value={profileData.fnombre} size={200} style='shape' />
                    <h3 className='font-bold text-lg'>Cliente</h3>
                    <form className='w-full flex gap-4 lg:flex-col  justify-center flex-wrap box-border ' onSubmit={handleSubmit} id='profile'>
                        <FormRender inputs={formRender} onChange={handleInputChange} />
                        {!isEditing && (
                            <div className='min-w-full flex justify-center pt-[20px]'>
                                <ButtonRender
                                    text='Editar'
                                    type='button'
                                    icon={<FaEdit />}
                                    onClick={() => setIsEditing(!isEditing)}
                                    variant={'default'}
                                    loader={isbusy}
                                />
                            </div>
                        )}
                    </form>

                    {
                        isEditing && (
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
                                        setIsEditing(false)
                                        fetchData()
                                    }}
                                    loader={isbusy}
                                />
                            </div>
                        )
                    }


                </div>
                <Toaster theme='dark' richColors />
            </Authorizer>
        </div>
    )
}

export default Perfil