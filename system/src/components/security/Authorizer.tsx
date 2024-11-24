'use client'
import { useSession } from '@/app/context/sesiones/SessionContext'
//import { useRouter } from 'next/navigation'
import React, { ReactNode, useEffect } from 'react'
import { MdLock } from 'react-icons/md'
import LoadingScreen from '../loading/loading'

interface AuthorizerProps {
    children: ReactNode
    allowedRoles: number[]
}

const Restricted = () => {
    return (
        <div className='w-full h-full flex box-border gap-3 items-center justify-center flex-col text-center'>
            <h1><MdLock className='font-bold text-9xl' /></h1>
            <h1 className='font-bold text-8xl'> Restricted access</h1>
            <p>Solicita acceso a tu administrador</p>
        </div>
    )
}

const Authorizer = ({ children, allowedRoles }: AuthorizerProps) => {
    //const router = useRouter()
    const { user, loading } = useSession()

    /*useEffect(() => {
        if (!loading && !user) {
            router.push('/dashboard')
        }
    }, [loading])*/

    return (
        <>
            {
                loading && <LoadingScreen />
            }
            {
                user && allowedRoles.includes(user.rol) ?
                    children
                    :
                    user && !allowedRoles.includes(user.rol) &&
                    <Restricted />
            }
        </>
    )
}

export default Authorizer