import { api } from "../../api/apiSlice";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (user) => ({
        url: "/user/signup",
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const { useCreateUserMutation } = userApi;
