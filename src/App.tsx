import React, { useEffect } from "react";
import Layout1 from "layouts/Layout1";
import RoutesHandler from "routes/RoutesHandler";
import { useAppSelector } from "store/store";
import { languages } from "utils/constants";

export default function App() {
  const authState = useAppSelector((state) => state.auth);

  const Layout = authState.token ? Layout1 : React.Fragment;

  useEffect(() => {
    const lngCode = localStorage.getItem("i18nextLng");
    const lng = languages.find((l) => l.code === lngCode);
    if (lng?.rtl) {
      document.querySelector("html")?.setAttribute("dir", "rtl");
    }
  }, []);

  return (
    <Layout>
      <RoutesHandler authState={authState} />
    </Layout>
  );
}
