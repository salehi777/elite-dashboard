import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import adminRoutes from "./adminRoutes";

export interface IRoute {
  path: string;
  component: () => JSX.Element;
}

function Redirect({ to }: { to: string }) {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(to);
  });
  return null;
}

export default function RoutesHandler() {
  return (
    <Routes>
      {adminRoutes.map((item) => (
        <Route key={item.path} path={item.path} element={<item.component />} />
      ))}
      <Route path="/" element={<Redirect to="/dashboard" />} />
    </Routes>
  );
}
