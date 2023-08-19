import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IUser {
  user: {
    email: string | null;
  };
}

const initialState: IUser = {
  user: {
    email: null,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<string | null>) => {
      state.user.email = action.payload;
    },
    signOut: (state) => {
      state.user.email = null;
    },
  },
});

export const { signIn, signOut } = userSlice.actions;

export default userSlice.reducer;
