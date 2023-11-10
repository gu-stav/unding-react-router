import * as React from "react";
import { Link, Navigate, Outlet } from "react-router-dom";

import { useCookie } from "@/hooks/useCookie";
import { useConfig } from "@/context/config";

export function Plugin() {
  const [cookie, , delCookie] = useCookie("token");
  const config = useConfig();

  function deleteCookie() {
    delCookie("token");
  }

  return (
    <>
      {cookie !== "set" && <Navigate to="/auth/login" />}

      <nav>
        {config.plugins.map((plugin) => (
          <Link key={plugin.slug} to={`/${plugin.slug}`}>{plugin.name}</Link>
        ))}
      </nav>

      <button type="button" onClick={deleteCookie}>
        Logout
      </button>

      <Outlet />
    </>
  );
}
