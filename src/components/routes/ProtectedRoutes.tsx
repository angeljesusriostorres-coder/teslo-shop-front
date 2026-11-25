import { useAuthStore } from "@/auth/store/auth.state";
import type { PropsWithChildren } from "react";
import { Navigate } from "react-router";

export const AutheticatedRoute = ({ children }: PropsWithChildren) => {

    const { authstatus } = useAuthStore();

    if (authstatus === 'checking') return null;
    if (authstatus === 'not-authenticated') return <Navigate to="auth/login" />

    return children;
}
export const NotAuthenticatedRoute = ({ children }: PropsWithChildren) => {

    const { authstatus } = useAuthStore();

    if (authstatus === 'checking') return null;
    if (authstatus === 'authenticated') return <Navigate to="/" />

    return children;
}
export const AdminRoute = ({ children }: PropsWithChildren) => {

    const { authstatus, isAdmin } = useAuthStore();


    if (authstatus === 'checking') return null;
    if (authstatus === 'not-authenticated') return <Navigate to="auth/login" />
    if (!isAdmin()) return <Navigate to="/" />

    return children;
}
