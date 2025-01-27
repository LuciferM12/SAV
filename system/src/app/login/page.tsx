'use client'
import React, { useEffect, useState } from 'react'
import { getImagenLogin, login } from './actions';
import { getLogo } from '@/components/headers/actions';
import ButtonRender from '@/components/buttons/Button';
import { Toaster, toast } from 'sonner'
import { useRouter } from 'next/navigation';
import LoadingScreen from '@/components/loading/loading';
import { useSession } from '../context/sesiones/SessionContext';
import FormRender, { FormRenderProps } from '@/components/formRender/FormRender';

const Login = () => {
    const router = useRouter()
    const { setUser, user } = useSession()
    const [image, setImage] = useState<string | null>(null);
    const [logo, setLogo] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isbusy, setIsBusy] = useState<boolean>(false)

    const formRender: FormRenderProps = {
        inputs: [
            {
                placeholder: 'Ingrese su usuario',
                type: "text",
                id: 'email',
                label: 'Usuario',
                className: 'w-3/4 lg:w-full p-2 dark:bg-transparent border border-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-300 lg:w-[90%]',
                name: 'email',
                required: true,
                disabled: false,
            },
            {
                placeholder: 'Ingrese su contraseña',
                type: "password",
                id: 'password',
                label: 'Contraseña',
                className: 'lg:w-full p-2 dark:bg-transparent border border-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-300 lg:w-[90%]',
                classNameDiv: 'w-3/4 lg:w-full',
                name: 'password',
                required: true,
                disabled: false,
            }
        ]
    }

    const fetchData = async () => {
        try {
            setIsLoading(true)
            const imagen = await getImagenLogin()
            setImage(imagen)
            const logo = await getLogo()
            setLogo(logo)
        } catch (error) {
            toast.error('Error de carga')
        } finally {
            setIsLoading(false)
        }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsBusy(true)
        const formData = new FormData(event.currentTarget)
        const result = await login(formData)
        setIsBusy(false)
        if (result.success) {
            setUser(result.user)
            router.push('/dashboard')
        } else {
            toast.error('Contraseña o correo equivocados')
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    if (isLoading) {
        return (
            <LoadingScreen />
        )
    }

    return (
        <div className='w-screen h-screen flex'>
            <div className='w-2/4 h-full p-20  flex flex-col justify-center lg:w-full'>
                {logo && <img className='w-[100px] mb-4' src={logo} alt="Logo" />}
                <h1 className='text-3xl font-bold mb-1'>¡Bienvenido de vuelta!</h1>
                <p>Ingresa para tener acceso a todos nuestros servicios.</p>
                <form className='flex flex-col mt-5 gap-2' onSubmit={handleSubmit}>
                    <FormRender inputs={formRender.inputs} />
                    <ButtonRender
                        text='Entrar'
                        type='submit'
                        variant="default"
                        onClick={() => null}
                        className='w-3/4 lg:w-full mt-6 font-bold'
                        loader={isbusy}
                    />
                </form>
                <ButtonRender
                        text='Registrarse'
                        type='button'
                        variant="secondary"
                        link='/register'
                        className='w-3/4 lg:w-full mt-6 font-bold'
                        loader={isbusy}
                    />
            </div>
            <div className='w-2/4 h-full bg-cover bg-no-repeat blur-sm lg:hidden'
                style={{
                    backgroundImage: image ? `url(${image})` : 'none',
                }}>

            </div>
            <Toaster theme='dark' position='bottom-right' richColors />
        </div>
    )
}

export default Login