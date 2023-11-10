import * as React from "react";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
  json,
} from "react-router-dom";
import { z } from "zod";

import { Provider as ConfigProvider } from "./context/config";

const Plugin = React.lazy(() =>
  import("./routes/:plugin/Index").then((module) => ({
    default: module.Plugin,
  })),
);
const Login = React.lazy(() =>
  import("./routes/auth/Login").then((module) => ({ default: module.Login })),
);

const PLUGIN_ROUTE_SCHEMA = z.array(
  z.object({
    element: z.function(),
    path: z.string(),
  }),
);

export function Studio({ config }) {
  const PLUGIN_ROUTES = config.plugins.flatMap((plugin) => {
    const routes = plugin?.routes();
    const result = PLUGIN_ROUTE_SCHEMA.safeParse(routes);

    if (!result.success) {
      throw new Error(result.error.message);
    }

    return {
      element: <Plugin />,
      path: `/${plugin.slug}`,
      children: routes.map((route) => {
        const Component = React.lazy(() => route.element());

        return {
          ...route,
          element: <Component />,
          path: `/${plugin.slug}/${route.path}`,
        };
      }),
    };
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
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          action: async ({ params, request }) => {
            let formData = await request.formData();

            if (
              formData.get("email") === "valid" && formData.get("password") === "valid"
            ) {
              return { ok: true };
            }

            throw json({ message: "Invalid intent" }, { status: 400 });
          },
        },
      ],
    },
    ...PLUGIN_ROUTES,
  ]);

  return (
    <ConfigProvider value={config}>
      <React.Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </React.Suspense>
    </ConfigProvider>
  );
}
