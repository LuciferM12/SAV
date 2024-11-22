'use client'
import ButtonRender from '@/components/buttons/Button'
import FormRender from '@/components/formRender/FormRender'
import { InputProps } from '@/components/inputs/types'
import Avvvatars from 'avvvatars-react'
import React, { useEffect, useState } from 'react'
import { FaEdit, FaSave } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { getProfile } from './actions'
import LoadingScreen from '@/components/loading/loading'

const Perfil = () => {
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false)
    const [profileData, setProfileData] = useState({
        fnombre: '',
        snombre: '',
        apellidop: '',
        apellidom: '',
        telefono: '',
        edad: '',
        usuario: '',
    })

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

    useEffect(() => {
        fetchData()
    }, [])

    const formRender: InputProps[] = [
        {
            placeholder: '',
            type: "text",
            id: 'fnombre',
            label: 'Primer Nombre',
            className: ' p-2 dark:bg-transparent border border-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-300 lg:w-[90%]',
            classNameDiv: 'w-5/12',
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
            classNameDiv: 'w-5/12 ',
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
            className: ' p-2 dark:bg-transparent border border-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-300 lg:w-[90%]',
            classNameDiv: 'w-5/12',
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
            className: 'p-2 dark:bg-transparent border border-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-300',
            classNameDiv: 'w-5/12',
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
            className: ' p-2 dark:bg-transparent border border-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-300 lg:w-[90%]',
            classNameDiv: 'w-5/12',
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
            className: 'p-2 dark:bg-transparent border border-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-300',
            classNameDiv: 'w-5/12',
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
            className: ' p-2 dark:bg-transparent border border-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-300 lg:w-[90%]',
            classNameDiv: 'w-5/12',
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
            className: 'p-2 dark:bg-transparent border border-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-300',
            classNameDiv: 'w-5/12',
            name: 'password',
            required: false,
            disabled: !isEditing,
        }
    ]

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setProfileData(prev => ({ ...prev, [name]: value }))
    }

    if (loading) {
        return <LoadingScreen />
    }

    return (
        <div className=' h-fit p-24'>
            <div className='flex box-border items-center justify-center flex-col gap-5'>
                <Avvvatars value={profileData.fnombre} size={200} style='shape' />
                <h3 className='font-bold text-lg'>Cliente</h3>
                <form className='w-full flex gap-4 justify-center flex-wrap box-border '>
                    <FormRender inputs={formRender} onChange={handleInputChange} />

                </form>
                <div className='flex items-center justify-center gap-3 pt-4'>
                {
                    !isEditing ?
                        <ButtonRender text='Editar' icon={<FaEdit />} onClick={() => setIsEditing(!isEditing)} variant={'default'} /> :
                        <>
                            <ButtonRender text='Guardar' icon={<FaSave/>} variant={'default'} onClick={() => {
                                // Add logic to save the updated profile data
                                setIsEditing(false)
                            }} />
                            <ButtonRender text='Cancelar' icon={<MdCancel/>} variant={'default'} onClick={() => {
                                setIsEditing(false)
                                fetchData() // Refetch the original data
                            }} />
                        </>
                }
                </div>
            </div>
        </div>
    )
}

export default Perfil