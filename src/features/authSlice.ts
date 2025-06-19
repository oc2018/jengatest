import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  user: {
    name: string;
    email: string;
    _id: string;
  };
  jengaToken: {
    token: string | null;
    refreshToken: string | null;
    expiresAt: number | null;
  };
}

const initialState: UserState = {
  user: { name: "", email: "", _id: "" },
  jengaToken: { token: null, refreshToken: null, expiresAt: null },
};

export const userSlice = createSlice({
  initialState,
  name: "userSlice",
  reducers: {
    logout: () => {
      localStorage.clear();
      return initialState;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (
      state,
      action: PayloadAction<{
        token: string;
        refreshToken: string;
        expiresIn: number;
      }>
    ) => {
      state.jengaToken.token = action.payload.token;
      state.jengaToken.refreshToken = action.payload.refreshToken;
      state.jengaToken.expiresAt = action.payload.expiresIn;
    },
  },
});

export default userSlice.reducer;
export const { logout, setUser, setToken } = userSlice.actions;
