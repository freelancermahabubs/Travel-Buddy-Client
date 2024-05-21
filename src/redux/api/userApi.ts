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
    getSingleUser: build.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
  }),
});

export const {useGetSingleUserQuery, useUserCreateMutation} = userApi;
