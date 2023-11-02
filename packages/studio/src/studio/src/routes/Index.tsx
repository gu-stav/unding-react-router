import { Link, Navigate, Outlet } from "react-router-dom";

import { useCookie } from "../hooks/useCookie";

export function Index() {
    const [ cookie, , delCookie ] = useCookie('token');

    function deleteCookie() {
        delCookie('token');
    }

    return <>
        {cookie !== 'set' && <Navigate to="/auth/login" />}

        <button type="button" onClick={deleteCookie}>
            Logout
        </button>

        <Outlet />
    </>
}
