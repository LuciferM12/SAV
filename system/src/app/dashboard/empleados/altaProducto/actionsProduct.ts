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

export async function createProduct(formData: FormData) {
  const token = (await cookies()).get('sav')
  const values = {
    producto: formData.get('producto'),
    precio: formData.get('precio'),
    description: formData.get('description'),
    categoria: formData.get('categoria'),
    imagen: formData.get('image'),
  } 
  try {
    const response = await axios.post(`http://localhost:5000/productos`, values,{ headers: { Authorization: token?.value } });
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error creating product:', error);
    return { success: false, error: 'Failed to create product' };
  }
}