'use server'
import axios from "axios";
import { cookies } from "next/headers";

export const getImagenLogin = async () => {
    const response = await axios.get(`http://localhost:5000/image/19`, {
        responseType: 'arraybuffer', // Esto permite obtener la imagen en formato binario
    });
    const base64 = Buffer.from(response.data, 'binary').toString('base64');
    const mimeType = response.headers['content-type'];
    return `data:${mimeType};base64,${base64}`;
};

export const login = async (formData: FormData) => {
    const credenciales = {
        username: formData.get('email'),
        password: formData.get('password')
    }

    try {
        const response = await axios.post(`http://localhost:5000/login`, credenciales)
        const { token } = response.data

        const expires = new Date()
        expires.setDate(expires.getDate() + 1);

        (await cookies()).set('sav', token, {
            expires,
            httpOnly: true,
            path: '/',
            sameSite: 'lax'
        });

        return { success: true };
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, error: 'Login failed' };
    }
}