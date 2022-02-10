// layouts
import AdminLayout from "layouts/AdminLayout";

// routes
import adminRoutes from "routes/adminRoutes";
import RoutesHandler from "routes/RoutesHandler";

export default function App() {
  return (
    <AdminLayout adminRoutes={adminRoutes}>
      <RoutesHandler adminRoutes={adminRoutes} />
    </AdminLayout>
  );
}
