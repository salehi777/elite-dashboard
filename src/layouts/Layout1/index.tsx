import Sidebar from "./Sidebar";

type Layout1Props = {
  children: React.ReactNode;
};

export default function Layout1({ children }: Layout1Props) {
  return (
    <div className="flex">
      <div className="min-h-screen w-80">
        <Sidebar />
      </div>
      <div className="flex flex-col min-h-screen grow">
        <main className="grow">{children}</main>
      </div>
    </div>
  );
}
