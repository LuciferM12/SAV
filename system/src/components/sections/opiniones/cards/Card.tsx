import Avvvatars from 'avvvatars-react'
import React from 'react'
import Estrellas from './estrellas/Estrellas'

interface CardProps {
    usuario: string
    stars: number
    descripcion: string
}

export const Card = ({ usuario, stars, descripcion }: CardProps) => {
    return (
        <div className='w-[32%] min-w-72 rounded-xl bg-[#bfbfbf] dark:bg-slate-800 flex gap-1 items-center justify-center flex-col 2xl:w-[45%] md:w-full'>
            <div className='flex flex-col items-center gap-1'>
                <div className='p-2 box-border'>
                    <Avvvatars value={usuario} size={115} style='shape' />
                </div>
                <h3 className='my-2 leading-[10px] font-bold text-lg'>{usuario}</h3>
                <h5 className='leading-[10px] font-semibold'>Cliente</h5>
                <Estrellas stars={stars} />
                <p className='m-0 p-1 font-normal max-w-[90%] overflow-hidden overflow-ellipsis'
                    style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                    }}
                >
                    {descripcion}
                </p>
            </div>
        </div>
    )
}
