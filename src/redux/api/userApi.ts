import {baseApi} from "./baseApi";
import {tagTypes} from "../tag-types";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userCreate: build.mutation({
      query: (userData) => ({
        url: "/user/new",
        method: "POST",
        data: userData,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    getAllUser: build.query({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    getSingleUser: build.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useGetSingleUserQuery,
  useUserCreateMutation,
  useGetAllUserQuery,
  useDeleteUserMutation,
} = userApi;
