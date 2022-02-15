import Sidebar from "./Sidebar";

type Layout1Props = {
  children: JSX.Element;
};

export default function Layout1({ children }: Layout1Props) {
  return (
    <div className="flex">
      <div className="min-h-screen w-60 fixed">
        <Sidebar />
      </div>
      <main className="min-h-screen grow p-8 ml-60">{children}</main>
    </div>
  );
}
