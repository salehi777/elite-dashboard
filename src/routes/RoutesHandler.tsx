import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import adminRoutes from "./adminRoutes";
import authRoutes from "./authRoutes";
import { IAuth } from "store/auth";

export interface IRoute {
  path: string;
  component: () => JSX.Element;
}

type RoutesHandlerProps = {
  authState: IAuth | null;
};
type RedirectProps = {
  to: string;
};

function Redirect({ to }: RedirectProps) {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(to);
  });
  return null;
}

export default function RoutesHandler({ authState }: RoutesHandlerProps) {
  const routes = authState ? adminRoutes : authRoutes;

  return (
    <Routes>
      {routes.map((item) => (
        <Route key={item.path} path={item.path} element={<item.component />} />
      ))}
      <Route
        path="*"
        element={<Redirect to={authState ? "/dashboard" : "/login"} />}
      />
    </Routes>
  );
}
