import { Link } from "react-router-dom";

export function Index() {
    return <>
        <h1>App</h1>
        <Link to="/auth/login">Login</Link>
    </>
}
