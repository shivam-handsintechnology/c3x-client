// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// const APi_Url = "http://localhost:8997/api/";
const APi_Url = "https://c3expressapi.handsintechnology.in/api/";

const clearAuthToken = () => {
  localStorage.removeItem("token");
};
const getAuthToken = () => {
  return localStorage.getItem("token");
};
// Define a service using a base URL and expected endpoints
export const RTKQueryApi = createApi({
  reducerPath: "RTKQueryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: APi_Url,
    tagTypes: ["Post"],
    prepareHeaders: (headers) => {
      // Get the authentication token
      const authToken = getAuthToken(); // Replace with your actual token
      // If you have an authentication token, add it to the headers
      if (authToken) {
        headers.set("Authorization", `Bearer ${authToken}`);
      }
      // You can also set other headers as needed
      headers.set("Content-Type", "application/json");
      return headers;
    },
    prepareBody: (body, { method, url }) => {
      //console.log("body", body);
      //console.log({ method, url });
      // Modify the body here before sending it
      if (method === 'POST' || method === 'PUT') {
        // Modify the body for POST and PUT requests
        // For example, you can stringify JSON objects
        delete body.AccountNo;
        return JSON.stringify(body);
      }
      // For other methods, you can leave the body unchanged
      return body;
    },
  }),
  endpoints: (builder) => ({
    getUerProfile: builder.query({
      query: () => `auth/profile`,
    }),
    trackByReference: builder.mutation({
      query: (data) => ({
        url: 'TrackByReference', // Replace with your API endpoint
        method: 'POST',
        body: data,
      }),
    }),
    trackByTracking: builder.mutation({
      query: (data) => ({
        url: 'Tracking', // Replace with your API endpoint
        method: 'POST',
        body: data,
      }),
    }),
    getUsersData: builder.query({
      query: ({ activate, search, page, limit }) => ({
        url: `users`,
        params: { activate, search, page, limit },
      }),
    }),
    Register: builder.mutation({
      query: (payload) => ({
        url: "auth/register",
        method: "POST",
        body: payload,
      }),
    }),
    changePassword: builder.mutation({
      query: (payload) => ({
        url: "auth/changepassword",
        method: "PUT",
        body: payload,
      }),
    }),
    getShipmentHistoryData: builder.mutation({
      query: (payload) => ({
        url: "ShipmentHistory",
        method: "POST",
        body: payload,
      }),
    }),
    login: builder.mutation({
      query: (payload) => ({
        url: "auth/signin",
        method: "POST",
        body: payload,
      }),
    }),
    getCreateAirwayBillyData: builder.mutation({
      query: (payload) => ({
        url: "CreateAirwayBill",
        method: "POST",
        body: payload,
      }),
    }),
    PostasaGuestSchedulePickupData: builder.mutation({
      query: (payload) => ({
        url: "asaGuestSchedulePickup",
        method: "POST",
        body: payload,
      }),
    }),
    PostSchedulePickupyData: builder.mutation({
      query: (payload) => ({
        url: "SchedulePickup",
        method: "POST",
        body: payload,
      }),
    }),
    PostSPickupHistoryData: builder.mutation({
      query: (payload) => ({
        url: "BookingHistory",
        method: "POST",
        body: payload,
      }),
    }),
    PostAirwayBillPDFFormatData: builder.mutation({
      query: (payload) => ({
        url: "AirwayBillPDFFormat",
        method: "POST",
        body: payload,
      }),
    }),
    PostDueInvoicesData: builder.mutation({
      query: (payload) => ({
        url: "DueInvoices",
        method: "POST",
        body: payload,
      }),
    }),
    getDueInvoicesData: builder.query({
      query: () => `DueInvoices`,
    }),
    getPaymentDuesData: builder.query({
      query: () => `PaymentDues`,
    }),
    getPrepaidPaymentHistoryData: builder.query({
      query: () => `PrepaidPaymentHistory`,
    }),
    UpdateUserData: builder.mutation({
      query: (payload) => ({
        url: "users",
        method: "PUT",
        body: payload,
      }),
    }),
    AddUserData: builder.mutation({
      query: (payload) => ({
        url: "users",
        method: "POST",
        body: payload,
      }),
    }),
    DeleteUserData: builder.mutation({
      query: (payload) => ({
        url: "users?userId=" + payload._id,
        method: "DELETE",
        body: payload,
      }),
    }),
    PostCityList: builder.mutation({

      query: (payload) => ({
        url: "CityList",
        method: "POST",
        body: payload,
      }),
    }),
    PostAccountDayWiseShipments: builder.mutation({

      query: (payload) => ({
        url: "AccountDayWiseShipments",
        method: "POST",
        body: payload,
      }),
    }),
    PostPickupSummaryForAccounts: builder.mutation({

      query: (payload) => ({
        url: "PickupSummaryForAccounts",
        method: "POST",
        body: payload,
      }),
    }),
    PostDeliveryDetailsForAccounts: builder.mutation({
      query: (payload) => ({
        url: "DeliveryDetailsForAccounts",
        method: "POST",
        body: payload,
      }),
    }),
    UpdateAddress: builder.mutation({
      query: (payload) => ({
        url: "users/address",
        method: "PUT",
        body: payload,
      }),
    }),
    PostRateFInder: builder.mutation({
      query: (payload) => ({
        url: "RateFinder",
        method: "POST",
        body: payload,
      }),
    }),
    getCountryMaster: builder.query({
      query: (country) => `CountryMaster?Country=${country}`,
    }),
    getPrepaidAccountStatus: builder.query({
      query: () => `PrepaidAccountStatus`,
    }),
    // Address Api
    getAddressData: builder.query({
      query: ({ search, page, limit }) => {
        return {
          url: `addresses`,
          params: { search, page, limit },

        }
      },
    }),
    PostAddressData: builder.mutation({
      query: (payload) => ({
        url: "addresses",
        method: "POST",
        body: payload,
      }),
    }),

    PostUpdateAddressData: builder.mutation({
      query: (payload) => ({
        url: "addresses",
        method: "PUT",
        body: payload,
      }),
    }),
    PostDeleteAddressData: builder.mutation({
      query: (payload) => ({
        url: `addresses?_id=${payload._id}`,
        method: "DELETE",
        body: payload,
      }),
    }),
    // Service Types Api
    getServiceTypesData: builder.query({
      query: (search) => {
        return {
          url: `ServiceTypes`,
          params: { search },

        }
      },
    }),
    getActiveServiceTypesData: builder.query({
      query: () => `activeServicetypes`
    }),
    PostServiceTypesData: builder.mutation({
      query: (payload) => ({
        url: "ServiceTypes",
        method: "POST",
        body: payload,
      }),
    }),

    PostUpdateServiceTypesData: builder.mutation({
      query: (payload) => ({
        url: "ServiceTypes",
        method: "PUT",
        body: payload,
      }),
    }),
    PostDeleteServiceTypesData: builder.mutation({
      query: (payload) => ({
        url: `ServiceTypes?_id=${payload._id}`,
        method: "DELETE",
        body: payload,
      }),
    }),


  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
// //console.log(RTKQueryApi);
export const {
  // tracking
  useTrackByReferenceMutation, useTrackByTrackingMutation,
  useLoginMutation,
  useGetUerProfileQuery,
  useGetUsersDataQuery,
  useGetShipmentHistoryDataMutation,
  useGetCreateAirwayBillyDataMutation,
  usePostasaGuestSchedulePickupDataMutation,
  usePostSchedulePickupyDataMutation,
  usePostSPickupHistoryDataMutation,
  usePostAirwayBillPDFFormatDataMutation,
  usePostDueInvoicesDataMutation,
  useGetDueInvoicesDataQuery,
  useGetPaymentDuesDataQuery,
  useGetPrepaidPaymentHistoryDataQuery,
  useUpdateUserDataMutation,
  useDeleteUserDataMutation,
  useGetCountryMasterQuery,
  usePostCityListMutation,
  useAddUserDataMutation,
  usePostAccountDayWiseShipmentsMutation,
  usePostPickupSummaryForAccountsMutation,
  usePostDeliveryDetailsForAccountsMutation,
  useGetPrepaidAccountStatusQuery,
  usePostRateFInderMutation,
  useGetAddressDataQuery,
  usePostAddressDataMutation,
  usePostUpdateAddressDataMutation,
  usePostDeleteAddressDataMutation,
  // Service Types
  useGetServiceTypesDataQuery,
  usePostServiceTypesDataMutation,
  usePostUpdateServiceTypesDataMutation,
  usePostDeleteServiceTypesDataMutation,
  useGetActiveServiceTypesDataQuery,
  useRegisterMutation,
  useChangePasswordMutation,
} = RTKQueryApi;
