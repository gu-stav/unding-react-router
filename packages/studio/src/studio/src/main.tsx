import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
    json
} from "react-router-dom";

import { Index } from "./routes/Index";
import { Login } from "./routes/auth/Login";

const router = createBrowserRouter([
    {
      element: <Index />,
      path: "/"
    },

    {
      path: "/auth",
      children: [
        {
          element: <Login />,
          path: "login",
          action: async ({ params, request }) => {
            let formData = await request.formData();

            if (formData.get('email') === 'valid' && formData.get('password') === 'valid') {
              return { ok: true };
            }

            throw json(
              { message: "Invalid intent" },
              { status: 400 }
            );
          }
        },
      ]
    },
  ]);

ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />)
