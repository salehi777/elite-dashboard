import { atom } from "recoil";
import { IAuth } from "./index";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const initialState: IAuth | null = null;

const authAtom = atom({
  key: "auth",
  default: initialState,
  effects_UNSTABLE: [persistAtom],
});

export default authAtom;
