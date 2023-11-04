import * as React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
    json
} from "react-router-dom";

import { Provider as ConfigProvider } from './context/config';

import config from "~unding.config.js";

const Index = React.lazy(() => import('./routes/Index').then((module) => ({ default: module.Index })));
const Login = React.lazy(() => import('./routes/auth/Login').then((module) => ({ default: module.Login })));

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
