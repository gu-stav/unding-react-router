import * as React from 'react';
import { Navigate, Form, useLoaderData, useActionData } from 'react-router-dom';

import { useCookie } from "../../hooks/useCookie";

export function Login() {
    const [ cookie, updateCookie ] = useCookie('token');
    const data = useActionData();

    function setCookie() {
        updateCookie('set');
    }

    React.useEffect(() => {
        if (data?.ok) {
            updateCookie('set');
        }
    }, [data]);

    return <Form method="post">
        <h1>Login</h1>

        {cookie === 'set' && (
            <Navigate to="/" />
        )}

        <label>
            Email
            <input type="text" name="email" />
        </label>

        <label>
            Password
            <input type="password" name="password" />
        </label>

        <button type="submit">
            Login
        </button>
    </Form>
}
