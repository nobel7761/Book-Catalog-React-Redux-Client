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
    login: builder.mutation({
      query: (user) => ({
        url: "/user/login",
        method: "POST",
        body: user,
      }),
    }),
    getSingleUserByEmail: builder.query({
      query: (email) => `/user/${email}`,
      providesTags: ["user"],
    }),
    updateUserWishListByEmail: builder.mutation({
      query: ({ id, data }) => ({
        url: `/user/wish-list/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    updateUserReadSoonListByEmail: builder.mutation({
      query: ({ id, data }) => ({
        url: `/user/read-soon/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    updateUserReadFutureListByEmail: builder.mutation({
      query: ({ id, data }) => ({
        url: `/user/read-future/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    updateUserFinishReadingListByEmail: builder.mutation({
      query: ({ id, data }) => ({
        url: `/user/finish-reading/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginMutation,
  useGetSingleUserByEmailQuery,
  useUpdateUserWishListByEmailMutation,
  useUpdateUserReadSoonListByEmailMutation,
  useUpdateUserReadFutureListByEmailMutation,
  useUpdateUserFinishReadingListByEmailMutation,
} = userApi;
