'use client'
import React from 'react'
import { Toaster } from 'sonner'
import { FaCalendarAlt } from "react-icons/fa";
import { MdContentPasteSearch } from "react-icons/md";
import ButtonSection from '@/components/buttons/ButtonSection';
import { useRouter } from 'next/navigation';

const Reservas = () => {
  const router = useRouter()
  return (
    <div className='p-24 w-full min-h-5/6 flex items-center justify-center flex-col gap-5'>
      <h1 className='font-extrabold text-3xl mb-6  text-center'>Reservas</h1>
      <div className='w-full flex justify-center gap-4 flex-wrap'>
        <ButtonSection text='Agendar reservación' icon={<FaCalendarAlt />} onClick={() => router.push("/dashboard/reservas/agenda")} />
        <ButtonSection text='Consultar reservación' icon={<MdContentPasteSearch />} onClick={() => router.push("/dashboard/reservas/consulta")} />
      </div>
      <Toaster richColors theme='dark' />
    </div>
  )
}

export default Reservas

