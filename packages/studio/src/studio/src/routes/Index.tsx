import { Link, Navigate, Outlet } from "react-router-dom";
import { Button } from "@unding/ui/react";

import { useCookie } from "@/hooks/useCookie";
import { useConfig } from "@/context/config";

export function Index() {
    const [ cookie, , delCookie ] = useCookie('token');
    const config = useConfig();
    const { Button: ExtensibleButton } = config.components;

    function deleteCookie() {
        delCookie('token');
    }

    console.log('got config', { config });

    return <>
        {cookie !== 'set' && <Navigate to="/auth/login" />}

        <nav>
            {config.plugins.map((plugin) => {

                return <Link to={`/${plugin.slug}`}>
                    {plugin.name}
                </Link>;
            })
            }
        </nav>

        <button type="button" onClick={deleteCookie}>
            Logout
        </button>

        <ExtensibleButton type="button" renderDefault={(props) => <button {...props}>Default Button</button>} />

        <Button>
            my first lit component in react
        </Button>

        <Outlet />
    </>
}
