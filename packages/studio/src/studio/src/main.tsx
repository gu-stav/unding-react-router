import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
    json
} from "react-router-dom";

import { Index } from "./routes/Index";
import { Login } from "./routes/auth/Login";

import { Provider as ConfigProvider } from './context/config';

import config from "~unding.config.js";

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

ReactDOM
  .createRoot(document.getElementById('root')!)
  .render(
    <ConfigProvider value={config}>
      <RouterProvider router={router} />
    </ConfigProvider>
  )
