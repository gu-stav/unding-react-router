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

const PLUGIN_ROUTES = config.plugins.flatMap((plugin) => {
  const routes = plugin?.routes();

  return routes.map((route) => ({
    ...route,
    path: `/${plugin.slug}/${route.path}`
  }))
});

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

  ...PLUGIN_ROUTES
]);

ReactDOM
  .createRoot(document.getElementById('root')!)
  .render(
    <ConfigProvider value={config}>
      <RouterProvider router={router} />
    </ConfigProvider>
  )
