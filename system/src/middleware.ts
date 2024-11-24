import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/dashboard/')) {
        try {
            if (!request.cookies.has('sav')) {
                return NextResponse.redirect(new URL('/dashboard', request.url))
            }
            const token = request.cookies.get('sav')
            const response = await axios.get(`http://localhost:5000/decode`, { headers: { Authorization: token?.value } })
        } catch (error) {
            console.log(error)
        }
    } else if ((request.nextUrl.pathname.startsWith('/login') || (request.nextUrl.pathname.startsWith('/register'))) && request.cookies.has('sav')) {
        try {
            const token = request.cookies.get('sav')
            const response = await axios.get(`http://localhost:5000/decode`, { headers: { Authorization: token?.value } })
            console.log(response.status)
            if (response.status === 200) {
                return NextResponse.redirect(new URL('/dashboard', request.url))
            }
        } catch (error: any) {
            console.log(error.message)
        }
    }
    NextResponse.next()
}

export const config = {
    matcher: ['/dashboard/:path*', '/login', '/register']
}