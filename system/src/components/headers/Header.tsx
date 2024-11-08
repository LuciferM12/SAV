'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import ButtonRender from '../buttons/Button'
import { Menu, X } from 'lucide-react'
import { getLogo } from './actions'

const Header = () => {
    const [image, setImage] = useState<string | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const fetchLogo = async () => {
            const logo = await getLogo()
            setImage(logo)
        }
        fetchLogo()
    })

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    return (
        <nav className='relative'>
            <div className={`dark:bg-[#08080a] bg-[#C0C0C0] flex flex-col w-screen fixed top-0 z-50 shadow-custom transition-all duration-300 ease-in-out ${isMenuOpen ? 'h-80' : 'h-20'}`}>
                <div className='flex items-center justify-between p-5 h-20'>
                    <div className='flex items-center justify-center'>
                        {image && <img className='w-[90px]' src={image} alt="Logo" />}
                    </div>

                    {/* Botón del menú hamburguesa */}
                    <button
                        className='md:block hidden text-gray-700'
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    {/* Menú de escritorio */}
                    <div className='block md:hidden'>
                        <ul className='flex gap-9 h-full items-center justify-evenly p-0 text-base list-none font-normal'>
                            <li><Link href="/">Inicio</Link></li>
                            <li><Link href="/registro">Nosotros</Link></li>
                            <li><Link href="/productos">Productos</Link></li>
                            <li><Link href="/altaproducto">Contáctanos</Link></li>
                            <ButtonRender variant={"default"} text='Iniciar Sesión' link='/login' />
                        </ul>
                    </div>
                </div>

                {/* Menú desplegable móvil */}
                <div className={`md:block hidden transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'opacity-100 max-h-60' : 'opacity-0 max-h-0'}`}>
                    <ul className='flex flex-col items-center py-4 gap-4'>
                        <li><Link href="/" onClick={toggleMenu}>Inicio</Link></li>
                        <li><Link href="/registro" onClick={toggleMenu}>Nosotros</Link></li>
                        <li><Link href="/productos" onClick={toggleMenu}>Productos</Link></li>
                        <li><Link href="/altaproducto" onClick={toggleMenu}>Contáctanos</Link></li>
                        <li>
                            <ButtonRender
                                variant={"default"}
                                text='Iniciar Sesión'
                                link='/login'
                                onClick={toggleMenu}
                            />
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header
