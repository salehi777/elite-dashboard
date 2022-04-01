import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IAuth {
  token: string | null;
  user: any;
}

const initialState: IAuth = { token: null, user: null };

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IAuth>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    signup: (state, action: PayloadAction<IAuth>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { login, signup, logout } = authSlice.actions;

export default authSlice.reducer;
