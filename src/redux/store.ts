import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/apiSlice";
import userReducer from "./features/user/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    [api.reducerPath]: api.reducer, //! sync backend data with frontend data (RTK Query). This is basically connection the store with api layer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
