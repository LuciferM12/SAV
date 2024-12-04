'use client'
import React from 'react'

interface HistoriaProps {
    historia: string
    imgNos: string
}

const Historia = ({ historia, imgNos }: HistoriaProps) => {
    

    return (
        <section className='w-full min-h-52 flex p-12 box-border  items-center justify-center xs:p-5'>
            <div className='w-[80%] flex flex-wrap xs:w-[100%] gap-12'>
                <div className='w-[48%] p-2 flex flex-col items-center 2xl:w-full'>
                    <h1 className='font-extrabold text-3xl mb-3'>Nosotros</h1>
                    <p className='leading-normal font-light '>{historia}</p>
                </div>
                <div className='w-[48%] p-2 flex flex-col items-center 2xl:w-full'>
                    <img className='w-[70%] md:w-[90%] rounded-xl xs:w-[100%]' src={imgNos} alt="Nosotros" />
                </div>
            </div>
        </section>
    )
}

export default Historia