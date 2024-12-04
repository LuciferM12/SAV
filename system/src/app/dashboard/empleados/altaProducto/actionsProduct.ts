'use server'

import axios from "axios";
import { cookies } from "next/headers";

export async function getCategories() {
  try {
    const response = await axios.get(`http://localhost:5000/categorias`);
    return response.data.map((cat: any) => ({
      value: cat.id_cat,
      label: cat.descripcion
    }));
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}
/*
export async function createProduct(formData: FormData) {
  const token = (await cookies()).get('sav')
  const dataToSend = new FormData();
  const values = {
    producto: formData.get('producto'),
    precio: formData.get('precio'),
    description: formData.get('description'),
    categoria: formData.get('categoria')
  } 
  dataToSend.append('producto',formData.get('producto'))

  // Add image files to the FormData
  const imageFields = ['imagen'];
  imageFields.forEach(field => {
      const file = formData.get(field) as File;
      if (file && file.size > 0) {
          dataToSend.append(field, file);
      }
  });

  try {
    const response = await axios.post(`http://localhost:5000/productos`, values,{ headers: { Authorization: token?.value } });
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error creating product:', error);
    return { success: false, error: 'Failed to create product' };
  }
}*/

export async function createProduct(formData: FormData) {
  const token = (await cookies()).get('sav');
  const dataToSend = new FormData();

  console.log('Contenido original del formData:');
  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }

  // Append all fields from formData to dataToSend
  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      // If it's a file, only append if it has content
      if (value.size > 0) {
        console.log(`Añadiendo archivo: ${key}, tamaño: ${value.size}`);
        dataToSend.append(key, value, value.name);
      } else {
        console.log(`Archivo ${key} está vacío, no se añadirá.`);
      }
    } else {
      console.log(`Añadiendo campo: ${key}, valor: ${value}`);
      dataToSend.append(key, value);
    }
  }

  console.log('Contenido final de dataToSend:');
  for (const [key, value] of dataToSend.entries()) {
    console.log(key, value);
  }

  try {
    const response = await axios.post(
      'http://localhost:5000/product-image', 
      dataToSend, 
      { 
        headers: { 
          Authorization: token?.value,
          'Content-Type': 'multipart/form-data'
        } 
      }
    );
    console.log('Respuesta del servidor:', response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error creating product:', error);
    if (axios.isAxiosError(error) && error.response) {
      console.error('Respuesta del servidor:', error.response.data);
    }
    return { success: false, error: 'Failed to create product' };
  }
}
