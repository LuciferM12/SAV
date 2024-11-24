'use server'
import axios from "axios";
import { cookies } from "next/headers";

export const getProfile = async () => {
    try {
        const token = (await cookies()).get('sav')
        const response = await axios.get(`http://localhost:5000/profile`, { headers: { Authorization: token?.value } });
        const products = response.data
        return products
    } catch (error) {
        console.log(error)
    }
}

export const updateProfile = async (formData: FormData) => {
    const token = (await cookies()).get('sav')
    const values = {
        fnombre: formData.get('fnombre'),
        snombre: formData.get('snombre'),
        apellidop: formData.get('apellidop'),
        apellidom: formData.get('apellidom'),
        telefono: formData.get('telefono'),
        edad: formData.get('edad'),
        usuario: formData.get('username'),
        password: formData.get('password'),
    }
    try {
        const response = await axios.put(`http://localhost:5000/profile`, values, { headers: { Authorization: token?.value } });
        const user = response.data
        return { success: true, user }
    } catch (error) {
        console.log(error)
        return { success: false, error: 'Login failed' }
        
    }
}