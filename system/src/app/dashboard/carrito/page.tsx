'use client'

import React, { useMemo } from 'react';
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/app/context/carrito/CartContext';
import ButtonRender from '@/components/buttons/Button';

const Carrito = () => {
  const {
    carrito,
    modifProd,
    quitarProducto
  } = useCart()

  const total = useMemo(() => {
    return carrito.reduce((total, item) => total + item.precio * item.cantidad, 0).toFixed(2);
  }, [carrito])

  return (
    <div className='p-24 lg:px-6 h-5/6'>
      <h1 className='font-extrabold text-3xl text-center mb-6'>Carrito</h1>
      <div className='w-full flex justify-between items-center md:flex-col gap-4'>
        <div className='dark:bg-zinc-900 shadow-lg rounded-xl overflow-hidden w-[70%] md:w-[90%]'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead>Cantidad</TableHead>
                <TableHead className="text-right">Precio</TableHead>
                <TableHead className="text-right">Subtotal</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {carrito.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.nombre}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => modifProd(product.id, -1)}
                        disabled={product.cantidad <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span>{product.cantidad}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => modifProd(product.id, 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">${product.precio}</TableCell>
                  <TableCell className="text-right">${(product.precio * product.cantidad).toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant='ghost'
                      size="sm"
                      onClick={() => quitarProducto(product.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-700" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className='w-[25%] md:w-[90%] rounded-xl bg-[#fafafa] text-black h-56 flex items-center justify-center flex-col gap-2 shadow-md'>
          <span className='font-bold text-xl'>Total: ${total}</span>
          <ButtonRender variant={"default"} text='Proceder a compra' className='bg-[#08080a] text-white rounded-2xl hover:bg-slate-900' />
          <Button variant="secondary" >Limpiar Carrito</Button>
        </div>
      </div>
    </div>
  )
}

export default Carrito
