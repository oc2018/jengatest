import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setUser: (state, action: PayloadAction<any>) => {
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
