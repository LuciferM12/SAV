'use server'
import axios from "axios";
import { cookies } from "next/headers";

export const getCookie = async () => {
    const token = (await cookies()).get('sav')
    
    const response = await axios.get(`http://localhost:5000/decode`, { headers: { Authorization: token?.value } });
    return response.data
}

export const deleteCookie = async () => {
    (await cookies()).delete('sav')
}