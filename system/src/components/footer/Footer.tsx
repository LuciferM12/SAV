import React from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="dark:bg-[#08080a] bg-gray-100 text-gray-600 dark:text-white py-12 box-border">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-1 grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Sobre Nosotros</h3>
            <p className="text-sm">
              Antojitos Mary: "Sabor auténtico mexicano en cada bocado." 🌮✨
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-gray-900 transition-colors">Inicio</Link></li>
              <li><Link href="/productos" className="hover:text-gray-900 transition-colors">Productos</Link></li>
              <li><Link href="#nosotros" className="hover:text-gray-900 transition-colors">Nosotros</Link></li>
              <li><Link href="#contactanos" className="hover:text-gray-900 transition-colors">Contáctanos</Link></li>
            </ul>
          </div>
          <div id='contactanos'>
            <h3 className="font-bold text-lg mb-4">Contáctanos</h3>
            <p className="text-sm">Francisco González Bocanegra 514, 21 de Marzo, 78437 Soledad de Graciano Sánchez, S.L.P.</p>
            <p className="text-sm">Corrreo: antojitosmary@gmail.com</p>
            <p className="text-sm">Telefono: (720) 312-8909</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">&copy; 2024 Antojitos Mary. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer