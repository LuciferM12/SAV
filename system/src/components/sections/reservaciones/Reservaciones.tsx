'use client'
import React, { useEffect, useState } from 'react'
import { getReservationImage } from './actions';
import ButtonRender from '@/components/buttons/Button';


const Reservaciones = ({ logged }: { logged: boolean }) => {
    const [image, setImage] = useState<string | null>(null);

    useEffect(() => {
        const fetchImageReservation = async () => {
            const imageR = await getReservationImage()
            setImage(imageR)
        }
        fetchImageReservation()
    })

    return (
        <section className='w-full min-h-52 flex p-12 box-border  items-center justify-center xs:p-5'>
            <div className='w-[80%] flex flex-wrap xs:w-[100%] gap-12'>
                <div className='w-[48%] p-2 flex flex-col items-center 2xl:w-full'>
                    {image && <img className='w-[70%] md:w-[90%] rounded-xl xs:w-[100%]' src={image} alt="Logo" />}
                </div>
                <div className='w-[48%] p-2 flex flex-col items-center 2xl:w-full'>
                    <h1 className='font-extrabold text-3xl mb-3'>Reserva</h1>
                    <p className='leading-normal font-light mb-3 '>¡Vive una experiencia llena de sabor sin contratiempos! En Antojitos Mary, queremos que disfrutes cada momento, por eso te ofrecemos la opción de reservar tu lugar de forma rápida y sencilla.
                        📅 Reserva ahora y asegura tu mesa para compartir los mejores antojitos mexicanos con familia o amigos.</p>
                    {!logged ?
                        <ButtonRender text='Inicia Sesión' link='/login' variant='default' /> :
                        <ButtonRender text='Reserva' link='/reservas' variant='default' />
                    }

                </div>
            </div>
        </section>
    )
}

export default Reservaciones