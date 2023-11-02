import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import { Index } from "./routes/Index";
import { Login } from "./routes/auth/Login";

const router = createBrowserRouter([
    {
      element: <Index />,
      path: "/",
    },

    {
      path: "/auth",
      children: [
        {
          element: <Login />,
          path: "login",
        },
      ]
    },
  ]);

ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />)
