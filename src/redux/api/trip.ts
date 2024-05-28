import {baseApi} from "./baseApi";
import {tagTypes} from "../tag-types";
import {ITrip} from "@/types/trip";
import {IMeta} from "@/types";
interface IApiResponse {
  data: ITrip[];
  meta: IMeta;
}

export const tripApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    tripCreate: build.mutation({
      query: (tripData) => ({
        url: "/trip/new",
        method: "POST",
        data: tripData,
      }),
      invalidatesTags: [tagTypes.trip],
    }),
    getAllTrips: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/trip/",
        method: "GET",
        params: arg,
      }),
      transformResponse: (response: IApiResponse) => {
        return {
          trips: response.data,
          meta: response.meta,
        };
      },
      providesTags: [tagTypes.trip],
    }),

    getSingleTrip: build.query({
      query: (id) => ({
        url: `/trip/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.trip],
    }),
    deleteTrip: build.mutation({
      query: (id) => ({
        url: `/trip/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.trip],
    }),
  }),
});

export const {
  useTripCreateMutation,
  useGetAllTripsQuery,
  useGetSingleTripQuery,
  useDeleteTripMutation,
} = tripApi;
