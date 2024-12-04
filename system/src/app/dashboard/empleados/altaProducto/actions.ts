'use server'

import axios from "axios";
import { cookies } from "next/headers";

export async function getCategories() {
  try {
    const response = await axios.get(`http://localhost:5000/categorias`);
    console.log(response.data)
    return response.data.map((cat: any) => ({
      value: cat.id_cat.toString(),
      label: cat.categoria
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}


export const createProduct = async (formData: FormData) => {
  const token = (await cookies()).get('sav')
  
  // Create a new FormData object to send to the server
  const dataToSend = new FormData();

  // Add all form fields to the FormData
  const fields = ['producto', 'precio', 'description', 'categoria'];
  fields.forEach(field => {
      const value = formData.get(field);
      if (value !== null) {
          dataToSend.append(field, value as string);
      }
  });

  // Add image files to the FormData
  const imageFields = ['prod'];
  imageFields.forEach(field => {
      const file = formData.get(field) as File;
      if (file && file.size > 0) {
          dataToSend.append(field, file);
      }
  });

  try {
      const response = await axios.post(`http://localhost:5000/createNewProduct`, dataToSend, {
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
