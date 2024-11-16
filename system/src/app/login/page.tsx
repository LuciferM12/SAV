'use client'
import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import { getImagenLogin, login } from './actions';
import { getLogo } from '@/components/headers/actions';
import { InputProps } from '@/components/inputs/types';
import Input from '@/components/inputs/Input';
import ButtonRender from '@/components/buttons/Button';
import InputPassword from '@/components/inputs/InputPassword';
import { Toaster, toast } from 'sonner'
import { useRouter } from 'next/navigation';
import LoadingScreen from '@/components/loading/loading';

const Login = () => {
    const router = useRouter()
    const [image, setImage] = useState<string | null>(null);
    const [logo, setLogo] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const handleSubmit = async (formData: FormData) => {
        try {
            await login(formData)
            router.push('/dashboard')
        } catch (error) {
            toast.error('Contraseña o correo equivocados')
        }
    }

    const inputs: InputProps = {
        placeholder: 'Ingrese su correo electrónico',
        type: "text",
        id: 'email',
        label: 'Correo electrónico',
        className: 'w-3/4 p-2 dark:bg-transparent border border-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-300 lg:w-[90%]',
        name: 'email',
        required: true,
        disabled: false,
    }

    const inputP: InputProps = {
        placeholder: 'Ingrese su contraseña',
        type: "password",
        id: 'password',
        label: 'Contraseña',
        className: 'w-3/4 p-2 dark:bg-transparent border border-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-300 lg:w-[90%]',
        name: 'password',
        required: true,
        disabled: false,
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
            <div className='w-2/4 h-full p-20  flex flex-col justify-center'>
                {logo && <img className='w-[100px] mb-4' src={logo} alt="Logo" />}
                <h1 className='text-3xl font-bold mb-1'>¡Bienvenido de vuelta!</h1>
                <p>Ingresa para tener acceso a todos nuestros servicios.</p>
                <form className='flex flex-col mt-5 gap-2' action={handleSubmit}>
                    <Input {...inputs} />
                    <InputPassword {...inputP} />
                    <ButtonRender
                        text='Entrar'
                        variant="default"
                        onClick={() => null}
                        className='w-3/4 mt-6 font-bold'
                    />
                </form>
            </div>
            <div className='w-2/4 h-full bg-cover bg-no-repeat blur-sm'
                style={{
                    backgroundImage: image ? `url(${image})` : 'none',
                }}>

            </div>
            <Toaster theme='dark' position='bottom-right' richColors />
        </div>
    )
}

export default Login