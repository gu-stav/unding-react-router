import * as React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    redirect,
    RouterProvider,
    json
} from "react-router-dom";

import { Provider as ConfigProvider } from './context/config';

import config from "~unding.config.js";

const Plugin = React.lazy(() => import('./routes/:plugin/Index').then((module) => ({ default: module.Plugin })));
const Login = React.lazy(() => import('./routes/auth/Login').then((module) => ({ default: module.Login })));

const PLUGIN_ROUTES = config.plugins.flatMap((plugin) => {
  const routes = plugin?.routes();

  return {
    element: <Plugin />,
    path: `/${plugin.slug}`,
    children: routes.map((route) => {
      const Component = React.lazy(() => route.element());

      return {
        ...route,
        element: <Component />,
        path: `/${plugin.slug}/${route.path}`
      }
    })
  }
});

const router = createBrowserRouter([
  {
    loader() {
      return redirect(PLUGIN_ROUTES[0].path);
    },
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
      <React.Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </React.Suspense>
    </ConfigProvider>
  )
