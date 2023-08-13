import { auth } from "../../../lib/firebase";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

interface IUserState {
  user: {
    email: string | null;
  };
  isLoading: boolean;
  isError: boolean;
  error: string | null;
}

interface ICredential {
  email: string;
  password: string;
}

const initialState: IUserState = {
  user: {
    email: null,
  },
  isLoading: false,
  isError: false,
  error: null,
};

export const createUser = createAsyncThunk(
  "user/createUser", //! prefix
  //! async function
  async ({ email, password }: ICredential) => {
    const data = await createUserWithEmailAndPassword(auth, email, password);

    return data?.user.email; //! this will be stored on action.payload
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser", //! prefix
  //! async function
  async ({ email, password }: ICredential) => {
    const data = await signInWithEmailAndPassword(auth, email, password);

    return data?.user.email; //! this will be stored on action.payload
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    //! creating normal reducer to set user in the state
    setUser: (state, action: PayloadAction<string | null>) => {
      state.user.email = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.user.email = action.payload; //! async functions result will be stored in action.payload automatically
        state.isLoading = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.user.email = null;
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message!;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user.email = action.payload; //! async functions result will be stored in action.payload automatically
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.user.email = null;
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message!;
      });
  },
});

export const { setUser, setLoading } = userSlice.actions;

export default userSlice.reducer;
