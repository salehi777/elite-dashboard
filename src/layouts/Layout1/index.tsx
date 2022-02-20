import Sidebar from "./Sidebar";

type Layout1Props = {
  children: JSX.Element;
};

export default function Layout1({ children }: Layout1Props) {
  return (
    <div className="flex">
      <div className="fixed min-h-screen w-60">
        <Sidebar />
      </div>
      <main className="min-h-screen p-8 grow ml-60">{children}</main>
    </div>
  );
}
