'use client'
import ButtonRender from '@/components/buttons/Button'
import FormRender from '@/components/formRender/FormRender'
import { InputProps } from '@/components/inputs/types'
import React, { useEffect, useState } from 'react'
import { createProfile, getLogo } from './actions'
import LoadingScreen from '@/components/loading/loading'
import { toast, Toaster } from 'sonner'
import Authorizer from '@/components/security/Authorizer'
import { useRouter } from 'next/navigation'

const register = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false)
    const [logo, setLogo] = useState<string | null>(null);
    const [isbusy, setIsBusy] = useState<boolean>(false)
    const [profileData, setProfileData] = useState({
        fnombre: '',
        snombre: '',
        apellidop: '',
        apellidom: '',
        telefono: '',
        edad: '',
        username: '',
        password: ''
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
            disabled: false,
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
            disabled: false,
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
            disabled: false,
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
            disabled: false,
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
            disabled: false,
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
            disabled: false,
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
            disabled: false,
            value: profileData.username,
        },
        {
            placeholder: '',
            type: "password",
            id: 'password',
            label: 'Contraseña',
            className: ' p-2 dark:bg-transparent border border-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-300',
            classNameDiv: 'w-5/12 lg:w-full',
            name: 'password',
            required: true,
            disabled: false,
            value: profileData.password
        }
    ]

    const fetchData = async () => {
        try {
            const imagen = await getLogo()
            setLogo(imagen)
            setLoading(false)
        } catch (error) {
            console.error("Error fetching data:", error)
            setLoading(false)
        }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsBusy(true)
        const formData = new FormData(event.currentTarget)
        const result = await createProfile(formData)
        setIsBusy(false)
        setIsEditing(!isEditing)
        fetchData()
        if (result.success) {
            toast.success('Usuario registrado')
            router.push('/dashboard')
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
            
                <div className='flex box-border items-center justify-center flex-col gap-5'>
                    {logo && <img className='w-[200px] h-[200px]' src={logo} />}
                    <h3 className='font-bold text-lg'>¡Registrese para tener acceso total!</h3>
                    <form className='w-full flex gap-4 lg:flex-col  justify-center flex-wrap box-border ' onSubmit={handleSubmit} id='profile'>
                        <FormRender inputs={formRender} onChange={handleInputChange} />
                        <div className='min-w-full flex justify-center pt-[20px]'>
                            <ButtonRender
                                type='submit'
                                form='profile'
                                text='Registrate'
                                variant={'default'}
                                loader={isbusy}
                            />
                        </div>
                    </form>
                    <ButtonRender
                                type='button'
                                link='/login'
                                text='Regresar'
                                variant={'secondary'}
                                loader={isbusy}
                            />
                </div>
                <Toaster theme='dark' richColors />
        </div>
    )
}

export default register