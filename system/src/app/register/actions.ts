'use server'
import axios from "axios";
import { cookies } from "next/headers";

export const getLogo = async () => {
    const response = await axios.get(`http://localhost:5000/logo`, {
        responseType: 'arraybuffer', // Esto permite obtener la imagen en formato binario
    });
    const base64 = Buffer.from(response.data, 'binary').toString('base64');
    const mimeType = response.headers['content-type'];
    return `data:${mimeType};base64,${base64}`;
};

export const createProfile = async (formData: FormData) => {
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
        const response = await axios.post(`http://localhost:5000/usuarios`, values);
        const user = response.data
        return { success: true, user }
    } catch (error) {
        console.log(error)
        return { success: false, error: 'Login failed' }
        
    }
}