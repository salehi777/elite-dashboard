import { atom } from "recoil";

export interface Todo {
  id: string;
  name: string;
  completed: boolean;
}

const initialState: Todo[] = [
  {
    id: "1",
    name: "todo1",
    completed: false,
  },
];

const todosAtom = atom({
  key: "todos",
  default: initialState,
});

export default todosAtom;
