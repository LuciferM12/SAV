'use server'
import axios from "axios";
import { cookies } from "next/headers";

export const getReservas = async () => {
    try {
        const token = (await cookies()).get('sav')
        const response = await axios.get(`http://localhost:5000/reservas`, { headers: { Authorization: token?.value } });
        const reserva = response.data
        return reserva
    } catch (error) {
        console.log(error)
    }
}

export const deleteReserva = async (id: number) => {

    const token = (await cookies()).get('sav')
    try {
        const response = await axios.delete(`http://localhost:5000/reservas/${id}`, { headers: { Authorization: token?.value } })
        const reserva = response.data
        return { success: true, reserva }
    } catch (error) {
        console.log(error)
        return { success: false, error: 'Error eliminando' }

    }
}