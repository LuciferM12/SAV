'use server'
import axios from "axios";

export const getLogo = async () => {
    const response = await axios.get(`http://localhost:5000/logo`, {
        responseType: 'arraybuffer', // Esto permite obtener la imagen en formato binario
    });
    const base64 = Buffer.from(response.data, 'binary').toString('base64');
    const mimeType = response.headers['content-type'];
    return `data:${mimeType};base64,${base64}`;
};