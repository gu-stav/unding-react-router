import { Navigate, Outlet } from "react-router-dom";

import { useCookie } from "@/hooks/useCookie";
import { useConfig } from "@/context/config";

export function Index() {
    const [ cookie, , delCookie ] = useCookie('token');
    const config = useConfig();

    function deleteCookie() {
        delCookie('token');
    }

    console.log('got config', { config });

    return <>
        {cookie !== 'set' && <Navigate to="/auth/login" />}

        <button type="button" onClick={deleteCookie}>
            Logout
        </button>

        <Outlet />
    </>
}
