import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  user: {
    name: string;
    email: string;
    _id: string;
  };
  token: string;
}

const initialState: UserState = {
  user: { name: "", email: "", _id: "" },
  token: "",
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
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { logout, setUser, setToken } = userSlice.actions;
