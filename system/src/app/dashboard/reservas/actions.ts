'use server'
import axios from "axios";
import { cookies } from "next/headers";

export const createReservation = async (hora: string | null, fechaReserva: string) => {
    const token = (await cookies()).get('sav')
    const values = {
        hora: hora,
        fecha: fechaReserva,
    }
    try {
        const response = await axios.post(`http://localhost:5000/reservas`, values, { headers: { Authorization: token?.value } });
        const reserva = response.data
        return { success: true, reserva }
    } catch (error) {
        console.log(error)
        return { success: false, error: 'Login failed' }
        
    }
}

export const getHours = async () => {
    try {
        const token = (await cookies()).get('sav')
        const response = await axios.get(`http://localhost:5000/horas`, { headers: { Authorization: token?.value } });
        const hours = response.data
        return hours
    } catch (error) {
        console.log(error)
    }
}
