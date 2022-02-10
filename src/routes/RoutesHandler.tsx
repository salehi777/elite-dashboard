import { Routes, Route } from "react-router-dom";

export interface IRoute {
  path: string;
  name: string;
  icon?: React.ReactNode;
  component?: () => React.ReactNode;
  inMainMenu?: boolean;
  menuSubRoutes?: IRoute[];
}

export default function RoutesHandler({ adminRoutes }) {
  return (
    <Routes>
      {adminRoutes.map((item) =>
        item.menuSubRoutes ? (
          item.menuSubRoutes.map((item) => (
            <Route path={item.path} element={<item.component />} />
          ))
        ) : (
          <Route path={item.path} element={<item.component />} />
        )
      )}
    </Routes>
  );
}
