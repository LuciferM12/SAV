import React from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="dark:bg-[#08080a] bg-gray-100 text-gray-600 dark:text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-1 grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">About Us</h3>
            <p className="text-sm">
              We are a company dedicated to providing high-quality products and excellent customer service.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-gray-900 transition-colors">Home</Link></li>
              <li><Link href="/products" className="hover:text-gray-900 transition-colors">Products</Link></li>
              <li><Link href="/about" className="hover:text-gray-900 transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-gray-900 transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <p className="text-sm">123 Main St, Anytown, USA 12345</p>
            <p className="text-sm">Email: info@example.com</p>
            <p className="text-sm">Phone: (123) 456-7890</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">&copy; 2023 Your Company Name. All rights reserved.</p>
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