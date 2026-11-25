import { tesloApi } from "@/api/tesloApi";
import type { AuthResponse } from "../interface/auth.response";


export const checkAuthAction = async () => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token Found');

    try {
        const { data } = await tesloApi.get<AuthResponse>('auth/check-status');
        localStorage.setItem('token', data.token);
        return data;

    } catch (error) {
        localStorage.removeItem('token');
        throw new Error("Token expirado o invalido")


    }

}
