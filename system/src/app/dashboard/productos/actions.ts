'use server'
import axios from "axios";

export const getCategories = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/categorias`);
        const categorias = response.data
        return categorias
    } catch (error) {
        console.log(error)
    }
};

export const getProducts = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/productos`);
        const products = response.data
        return products
    } catch (error) {
        console.log(error)
    }
};