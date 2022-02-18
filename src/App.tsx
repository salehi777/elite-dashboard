import React from "react";
import Layout1 from "layouts/Layout1";
import RoutesHandler from "routes/RoutesHandler";

// recoil
import authAtom, { IAuth } from "store/auth";
import { useRecoilValue } from "recoil";

export default function App() {
  const authState = useRecoilValue<IAuth | null>(authAtom);

  const Layout = authState ? Layout1 : React.Fragment;

  return (
    <Layout>
      <RoutesHandler authState={authState} />
    </Layout>
  );
}
