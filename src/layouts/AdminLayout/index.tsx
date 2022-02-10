import Sidebar from "./Sidebar";

export default function AdminLayout({ adminRoutes, children }) {
  return (
    <div className="flex">
      <div className="min-h-screen w-80">
        <Sidebar adminRoutes={adminRoutes} />
      </div>
      <div className="flex flex-col min-h-screen grow">
        <div>header</div>
        <main className="grow">{children}</main>
      </div>
    </div>
  );
}
