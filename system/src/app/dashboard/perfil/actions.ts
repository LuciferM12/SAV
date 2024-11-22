'use server'
import axios from "axios";
import { cookies } from "next/headers";

export const getProfile = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/profile`);
        const products = response.data
        return products
    } catch (error) {
        console.log(error)
    }
};