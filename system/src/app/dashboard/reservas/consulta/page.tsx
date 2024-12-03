'use client'
import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from 'lucide-react';
import { deleteReserva, getReservas } from './actions';
import { Reserva } from '../types';
import { Toaster, toast } from 'sonner';
import { ReservationSkeleton } from '@/components/skeletons/Reservation-skeleton'

const ReservationConsulting = () => {
    const [loading, setLoading] = useState(true);
    const [isbusy, setIsBusy] = useState<boolean>(false)
    const [reservas, setReservas] = useState<Reserva[]>([])
    
    const fetchData = async () => {
        try {
            setLoading(true)
            const reserva = await getReservas()
            setReservas(reserva || [])  // Initialize as empty array if undefined
        } catch (error) {
            console.error("Error fetching reservation data:", error)
            toast.error('Error al cargar las reservas')
            setReservas([])  // Set to empty array on error
        } finally {
            setLoading(false)
        }
    }

    const eliminarReserva = async (id_reser: number) => {
        setIsBusy(true)
        try {
            const result = await deleteReserva(id_reser)
            if (result.success) {
                toast.success('Reserva eliminada correctamente')
                setReservas(prevReservas => prevReservas.filter(reserva => reserva.id_reser !== id_reser))
            } else {
                toast.error('Error al eliminar la reserva')
            }
        } catch (error) {
            console.error("Error deleting reservation:", error)
            toast.error('Error al eliminar la reserva')
        } finally {
            setIsBusy(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className='p-24 lg:px-6 min-h-screen'>
            <h1 className='font-extrabold text-3xl text-center mb-6'>Consulta tus reservas</h1>
            <div className='w-full flex justify-center items-center md:flex-col gap-4'>
                <div className='dark:bg-zinc-900 shadow-lg rounded-xl overflow-hidden w-[90%] md:w-full'>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className='text-center'>Reserva</TableHead>
                                <TableHead className='text-center'>Fecha</TableHead>
                                <TableHead className="text-center">Hora</TableHead>
                                <TableHead className="text-center">Servicio</TableHead>
                                <TableHead className="text-center">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <ReservationSkeleton />
                            ) : reservas && reservas.length > 0 ? (
                                reservas.map((reserva) => (
                                    <TableRow key={reserva.id_reser}>
                                        <TableCell className="font-medium text-center">{reserva.id_reser}</TableCell>
                                        <TableCell className="font-medium text-center">{reserva.fecha.split("T")[0]}</TableCell>
                                        <TableCell className="text-center">{reserva.hora}</TableCell>
                                        <TableCell className="text-center">{reserva.servicio || "---"}</TableCell>
                                        <TableCell className="text-center">
                                            <Button
                                                variant='ghost'
                                                size="sm"
                                                disabled={isbusy}
                                                onClick={() => eliminarReserva(reserva.id_reser)}
                                                aria-label={`Eliminar reserva ${reserva.id_reser}`}
                                            >
                                                <Trash2 className="h-4 w-4 text-red-700" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-4">
                                        No hay reservas disponibles
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
            <Toaster theme='dark' richColors />
        </div>
    )
}

export default ReservationConsulting

