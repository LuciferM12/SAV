import React from 'react'

interface CardProps {
    nombre: string
    descripcion: string
    imagen: string
    precio: number
}

const Card = ({ nombre, descripcion, imagen, precio }: CardProps) => {
    return (
        <div className='w-[30%] xl:w-[48%] md:w-full h-[450px] dark:bg-slate-800 bg-[#bfbfbf] flex flex-col rounded-xl text-center box-border ease-in duration-300 hover:scale-95'>
            <div className='w-[100%] h-80 rounded-t-xl'>
                <img className='w-full h-full object-cover rounded-t-xl' src={imagen} alt={nombre} />
            </div>
            <div className='w-full h-16 flex items-center justify-center'>
                <div className='bg-black text-white p-2 h-fit rounded flex items-center justify-center text-xl font-semibold box-border'>
                    {`$${precio}`}
                </div>
            </div>
            <h3 className='m-2 font-semibold text-xl'>{nombre}</h3>
            <p className='m-0 whitespace-nowrap font-normal py-1 overflow-hidden overflow-ellipsis'>{descripcion}</p>
        </div>
    )
}

export default Card