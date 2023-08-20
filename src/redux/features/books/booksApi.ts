import { api } from "../../api/apiSlice";

const booksApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: (searchAndFilterTerms) => `/books?${searchAndFilterTerms}`,
      providesTags: ["book"],
    }),
    getSingleBook: builder.query({
      query: (id) => `/book/${id}`,
      providesTags: ["book"],
    }),
    updateSingleBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/book/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["book"],
    }),
    createBook: builder.mutation({
      query: (data) => ({
        url: "/add-new-book",
        method: "POST",
        body: data,
      }),
      // invalidatesTags: ["book"],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
        // body: data,
      }),
      // invalidatesTags: ["book"],
    }),
    getReviews: builder.query({
      query: (id) => `/reviews/${id}`,
      providesTags: ["book"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetSingleBookQuery,
  useUpdateSingleBookMutation,
  useCreateBookMutation,
  useDeleteBookMutation,
  useGetReviewsQuery,
} = booksApi;
