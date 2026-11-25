import type { User } from '@/interfaces/user.interface'
import { create } from 'zustand'
import { loginAction } from '../actions/login.action'
import { checkAuthAction } from '../actions/check-auth.action';
import { registerAction } from '../actions/register.action';
import axios from 'axios';
import type { ErrorResponse } from '@/interfaces/error.response';

type AuthStatus = 'authenticated' | 'not-authenticated' | 'checking';

type AuthState = {
    //properties
    user: User | null,
    token: string | null
    authstatus: AuthStatus;
    //getters
    isAdmin: () => boolean;

    //actions
    login: (email: string, password: string) => Promise<boolean>;
    register: (name: string, email: string, password: string) => Promise<string>;
    logout: () => void;
    cheackAuthStatus: () => Promise<boolean>;


}

export const useAuthStore = create<AuthState>()((set, get) => ({
    user: null,
    token: null,
    authstatus: 'checking',
    login: async (email: string, password: string) => {
        try {
            const data = await loginAction(email, password);
            localStorage.setItem('token', data.token);
            set({ user: data.user, token: data.token, authstatus: 'authenticated' });
            return true;


        } catch (error) {
            localStorage.removeItem('token');
            set({ user: null, token: null, authstatus: 'not-authenticated' });
            return false;
        }




    },
    register: async (name: string, email: string, password: string) => {
        try {
            const data = await registerAction(name, email, password);
            localStorage.setItem('token', data.token);
            set({ user: data.user, token: data.token, authstatus: 'authenticated' });
            return "success";


        } catch (error) {
            localStorage.removeItem('token');
            set({ user: null, token: null, authstatus: 'not-authenticated' });

            if (axios.isAxiosError<ErrorResponse>(error)) {
                const respuesta = error.response?.data;
                return respuesta?.message ?? error.message;

            } else if (error instanceof Error) {
                console.log(error.message);
            }
            return "validar error";


        }




    },
    isAdmin: () => {
        const roles = get().user?.roles.filter(Boolean) || [];
        return roles.includes('admin');

    },
    logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null, authstatus: 'not-authenticated' });
    },
    cheackAuthStatus: async () => {
        try {
            const { user, token } = await checkAuthAction();
            set({
                user: user,
                token: token,
                authstatus: 'authenticated'
            })
            return true;
        } catch (error) {
            set({
                user: undefined,
                token: undefined,
                authstatus: 'not-authenticated'
            })
            return false;
        }
    }
}))

