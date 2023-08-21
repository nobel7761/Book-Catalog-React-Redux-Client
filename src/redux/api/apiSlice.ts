import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://book-catalog-backend-omega.vercel.app/api/v1",
  }),
  tagTypes: ["book", "user"], //! for data cache revalidation
  endpoints: () => ({}),
});
