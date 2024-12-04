'use client'
import React from 'react'
import ButtonRender from '@/components/buttons/Button';

interface ReservacionesProps {
    logged: boolean
    imgRes: string
    reservacionesText: string
}


const Reservaciones = ({ logged, imgRes, reservacionesText }: ReservacionesProps) => {
    return (
        <section className='w-full min-h-52 flex p-12 box-border  items-center justify-center xs:p-5'>
            <div className='w-[80%] flex flex-wrap xs:w-[100%] gap-12'>
                <div className='w-[48%] p-2 flex flex-col items-center 2xl:w-full'>
                     <img className='w-[70%] md:w-[90%] rounded-xl xs:w-[100%]' src={imgRes} alt="Logo" />
                </div>
                <div className='w-[48%] p-2 flex flex-col items-center 2xl:w-full'>
                    <h1 className='font-extrabold text-3xl mb-3'>Reserva</h1>
                    <p className='leading-normal font-light mb-3 '>{reservacionesText}</p>
                    {!logged ?
                        <ButtonRender text='Inicia Sesión' link='/login' variant='default' /> :
                        <ButtonRender text='Reserva' link='/dashboard/reservas' variant='default' />
                    }

                </div>
            </div>
        </section>
    )
}

export default Reservaciones