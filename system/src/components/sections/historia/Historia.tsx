'use client'
import React, { useEffect, useState } from 'react'
import { getHistoryImage } from './actions';



const Historia = () => {
    const [image, setImage] = useState<string | null>(null);

    useEffect(() => {
        const fetchLogo = async () => {
            const logo = await getHistoryImage()
            setImage(logo)
        }
        fetchLogo()
    })

    return (
        <section className='w-full min-h-52 flex p-12 box-border  items-center justify-center xs:p-5'>
            <div className='w-[80%] flex flex-wrap xs:w-[100%] gap-12'>
                <div className='w-[48%] p-2 flex flex-col items-center 2xl:w-full'>
                    <h1 className='font-extrabold text-3xl mb-3'>Nosotros</h1>
                    <p className='leading-normal font-light '>En Antojitos Mary, cada platillo está preparado con amor y tradición, trayendo a tu mesa los sabores auténticos de México. Desde tacos al pastor que se derriten en tu boca, hasta quesadillas recién hechas y salsas que despiertan tus sentidos, nuestro menú es un viaje culinario que no puedes perderte.
Ya sea que busques un desayuno delicioso, una comida llena de sabor o un antojito para calmar ese deseo, en Antojitos Mary encontrarás un rincón acogedor donde la calidad y el sazón casero son nuestra promesa. ❤️
¡Ven y descubre por qué en cada bocado sentirás el sabor de casa! 🫔🌽</p>
                </div>
                <div className='w-[48%] p-2 flex flex-col items-center 2xl:w-full'>
                {image && <img className='w-[70%] md:w-[90%] rounded-xl xs:w-[100%]'  src={image} alt="Logo" />}
                </div>
            </div>
        </section>
    )
}

export default Historia