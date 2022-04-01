import React from "react";
import Layout1 from "layouts/Layout1";
import RoutesHandler from "routes/RoutesHandler";
import { useAppSelector } from "store/store";

export default function App() {
  const authState = useAppSelector((state) => state.auth);

  const Layout = authState.token ? Layout1 : React.Fragment;

  return (
    <Layout>
      <RoutesHandler authState={authState} />
    </Layout>
  );
}
