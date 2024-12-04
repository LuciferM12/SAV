'use server'
import axios from "axios";
import { cookies } from "next/headers";

export const getImagenBanner = async () => {
    const response = await axios.get(`http://localhost:5000/img/banner`, {
        responseType: 'arraybuffer', // Esto permite obtener la imagen en formato binario
    });
    const base64 = Buffer.from(response.data, 'binary').toString('base64');
    const mimeType = response.headers['content-type'];
    return `data:${mimeType};base64,${base64}`;
};

export const getImagenNosotros = async () => {
    const response = await axios.get(`http://localhost:5000/img/nosotros`, {
        responseType: 'arraybuffer', // Esto permite obtener la imagen en formato binario
    });
    const base64 = Buffer.from(response.data, 'binary').toString('base64');
    const mimeType = response.headers['content-type'];
    return `data:${mimeType};base64,${base64}`;
};

export const getImagenReserva = async () => {
    const response = await axios.get(`http://localhost:5000/img/reserva`, {
        responseType: 'arraybuffer', // Esto permite obtener la imagen en formato binario
    });
    const base64 = Buffer.from(response.data, 'binary').toString('base64');
    const mimeType = response.headers['content-type'];
    return `data:${mimeType};base64,${base64}`;
};

export const getCategories = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/categorias/principalesproductos`);
        const categorias = response.data
        return categorias
    } catch (error) {
        console.log(error)
    }
};

export const getInformacion = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/informacion`);
        const desc = response.data
        return desc
    } catch (error) {
        console.log(error)
    }
};

export const getProducts = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/pproductos`);
        const products = response.data
        return products
    } catch (error) {
        console.log(error)
    }
};

export const getCookie = async () => {
    const token = (await cookies()).get('sav')
    
    const response = await axios.get(`http://localhost:5000/decode`, { headers: { Authorization: token?.value } });
    return response.data
}