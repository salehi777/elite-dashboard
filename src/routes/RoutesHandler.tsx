import { Routes, Route } from "react-router-dom";
import adminRoutes from "./adminRoutes";

export interface IRoute {
  path: string;
  component: () => JSX.Element;
}

export default function RoutesHandler() {
  return (
    <Routes>
      {adminRoutes.map((item) => (
        <Route path={item.path} element={<item.component />} />
      ))}
    </Routes>
  );
}
