'use server'
import axios from "axios";
import { cookies } from "next/headers";

export const getProfile = async () => {
    try {
        const token = (await cookies()).get('sav')
        const response = await axios.get(`http://localhost:5000/informacion`, { headers: { Authorization: token?.value } });
        const company = response.data
        return company
    } catch (error) {
        console.log(error)
    }
}

export const updateProfile = async (formData: FormData) => {
    const token = (await cookies()).get('sav')
    
    // Create a new FormData object to send to the server
    const dataToSend = new FormData();

    // Add all form fields to the FormData
    const fields = ['nombre', 'descripcion', 'tipo', 'nosotros', 'telefono', 'ubicacion', 'reservastext'];
    fields.forEach(field => {
        const value = formData.get(field);
        if (value !== null) {
            dataToSend.append(field, value as string);
        }
    });

    // Add image files to the FormData
    const imageFields = ['logo', 'banner', 'nosotrosimg', 'reservasimg'];
    imageFields.forEach(field => {
        const file = formData.get(field) as File;
        if (file && file.size > 0) {
            dataToSend.append(field, file);
        }
    });

    try {
        const response = await axios.post(`http://localhost:5000/upload-images`, dataToSend, {
            headers: { 
                Authorization: token?.value,
                'Content-Type': 'multipart/form-data'
            }
        });
        const updatedProfile = response.data;
        return { success: true, profile: updatedProfile };
    } catch (error) {
        console.error(error);
        return { success: false, error: 'Profile update failed' };
    }
}