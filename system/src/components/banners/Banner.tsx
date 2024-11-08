import React from 'react'
import ButtonRender from '../buttons/Button'

interface BannerProps {
    height?: string
    image: string | null
    tipo: string
    titulo: string
    descripcion: string
    secundario: boolean
}


const Banner = ({ height = '90vh', image, tipo, titulo, descripcion, secundario = false }: BannerProps) => {
    return (
        <div className="w-full flex bg-cover bg-center bg-no-repeat items-center justify-center"
            style={{
                backgroundImage: image ? `url(${image})` : 'none',
                height: height
            }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-70 z-10"></div>
            <div className='z-20 flex gap-3 w-[60%] flex-col items-center'>
                {
                    secundario ?
                        <h2 className='text-[4vmax] p-0 m-0'>{titulo}</h2> :
                        <>
                            <h1 className='text-[3vmax] leading-none'>{tipo}</h1>
                            <h2 className='text-[4vmax] p-0 m-0'>{titulo}</h2>
                            <p className='font-medium'>{descripcion}</p>
                            <ButtonRender text='Productos' variant={"default"} link='/productos' />
                        </>
                }
            </div>

        </div>
    )
}

export default Banner