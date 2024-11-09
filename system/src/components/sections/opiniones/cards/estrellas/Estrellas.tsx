import React from 'react'
import { FaRegStar } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";

interface EstrellasProps {
    stars: number
}

const Estrellas = ({ stars }: EstrellasProps) => {
    const totalStars = 5
    return (
        <div className='flex w-2/4 gap-1 text-slate-800 dark:text-yellow-300 justify-center text-lg py-1'>
            {
                Array.from({ length: totalStars }, (_, index) =>
                    index < stars ? <FaStar key={index} /> : <FaRegStar key={index} />
                )
            }
        </div>
    )
}

export default Estrellas