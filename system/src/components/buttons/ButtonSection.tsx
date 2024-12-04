import React, { ReactNode } from 'react'

interface ButtonSectionProps {
    text: string
    icon: ReactNode
    onClick: () => void
}

const ButtonSection = ({ text, icon, onClick }: ButtonSectionProps) => {
    return (
        <div className='group' onClick={onClick}>
            <div className=' cursor-pointer border h-80 w-96 md:w-full dark:bg-zinc-950 bg-zinc-200 rounded-lg flex flex-col items-center justify-center gap-10 p-5 dark:text-zinc-200 text-black transition-all duration-300 ease-in-out hover:shadow-[0_10px_20px_rgba(0,0,0,0.7)] hover:-translate-y-2 dark:hover:bg-zinc-200 hover:bg-zinc-900 dark:hover:text-black'>
                <div className='flex flex-col items-center justify-center gap-10 transition-all duration-300 ease-in-out group-hover:scale-105'>
                    <div className='text-8xl transition-all duration-300 ease-in-out dark:text-zinc-100 text-black group-hover:text-zinc-100 dark:group-hover:text-black'>
                        {icon}
                    </div>
                    <h1 className='font-bold text-center text-3xl transition-all duration-300 ease-in-out text-black group-hover:text-zinc-100 dark:text-zinc-100 dark:group-hover:text-black'>{text}</h1>
                </div>
            </div>
        </div>
    )
}

export default ButtonSection