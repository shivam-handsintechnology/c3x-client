// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import CryptoJS from "crypto-js"
const APi_Url = "http://localhost:8997/api/";
// const APi_Url = "https://c3expressapi.handsintechnology.in/api/";

const secretKey = "98684707692312139868470769231213";
const iv = "9868470769231213";
const algorithm = 'aes-256-cbc';

const encryptedBody = (password) => {
  const key = CryptoJS.enc.Hex.parse(secretKey);
  const ivHex = CryptoJS.enc.Hex.parse(iv);

  const encrypted = CryptoJS.AES.encrypt(
    password,
    key,
    {
      iv: ivHex,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );

  return `${iv}:${encrypted.ciphertext.toString(CryptoJS.enc.Hex)}`;
};



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

  }),
  endpoints: (builder) => ({

    getUerProfile: builder.query({
      query: () => `auth/profile`,
    }),
    trackByReference: builder.mutation({
      query: (data) => ({
        url: 'TrackByReference', // Replace with your API endpoint
        method: 'POST',
        body: encryptedBody(data),
      }),
    }),
    trackByTracking: builder.mutation({
      query: (data) => ({
        url: 'Tracking', // Replace with your API endpoint
        method: 'POST',
        body: encryptedBody(data),
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
        body: encryptedBody(payload)
      }),
    }),
    changePassword: builder.mutation({
      query: (payload) => ({
        url: "auth/changepassword",
        method: "PUT",
        body: encryptedBody(payload),
      }),
    }),
    getShipmentHistoryData: builder.mutation({
      query: (payload) => ({
        url: "ShipmentHistory",
        method: "POST",
        body: encryptedBody(payload),
      }),
    }),
    login: builder.mutation({
      query: (payload) => ({
        url: "auth/signin",
        method: "POST",
        body: encryptedBody(payload),
      }),
    }),
    getCreateAirwayBillyData: builder.mutation({
      query: (payload) => ({
        url: "CreateAirwayBill",
        method: "POST",
        body: encryptedBody(payload),
      }),
    }),
    PostasaGuestSchedulePickupData: builder.mutation({
      query: (payload) => ({
        url: "asaGuestSchedulePickup",
        method: "POST",
        body: encryptedBody(payload),
      }),
    }),
    PostSchedulePickupyData: builder.mutation({
      query: (payload) => ({
        url: "SchedulePickup",
        method: "POST",
        body: encryptedBody(payload),
      }),
    }),
    PostSPickupHistoryData: builder.mutation({
      query: (payload) => ({
        url: "BookingHistory",
        method: "POST",
        body: encryptedBody(payload),
      }),
    }),
    PostAirwayBillPDFFormatData: builder.mutation({
      query: (payload) => ({
        url: "AirwayBillPDFFormat",
        method: "POST",
        body: encryptedBody(payload),
      }),
    }),
    PostDueInvoicesData: builder.mutation({
      query: (payload) => ({
        url: "DueInvoices",
        method: "POST",
        body: encryptedBody(payload),
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
        body: encryptedBody(payload),
      }),
    }),
    AddUserData: builder.mutation({
      query: (payload) => ({
        url: "users",
        method: "POST",
        body: encryptedBody(payload),
      }),
    }),
    DeleteUserData: builder.mutation({
      query: (payload) => ({
        url: "users?userId=" + payload._id,
        method: "DELETE",
        body: encryptedBody(payload),
      }),
    }),
    PostCityList: builder.mutation({

      query: (payload) => ({
        url: "CityList",
        method: "POST",
        body: encryptedBody(payload),
      }),
    }),
    PostAccountDayWiseShipments: builder.mutation({

      query: (payload) => ({
        url: "AccountDayWiseShipments",
        method: "POST",
        body: encryptedBody(payload),
      }),
    }),
    PostPickupSummaryForAccounts: builder.mutation({

      query: (payload) => ({
        url: "PickupSummaryForAccounts",
        method: "POST",
        body: encryptedBody(payload),
      }),
    }),
    PostDeliveryDetailsForAccounts: builder.mutation({
      query: (payload) => ({
        url: "DeliveryDetailsForAccounts",
        method: "POST",
        body: encryptedBody(payload),
      }),
    }),
    UpdateAddress: builder.mutation({
      query: (payload) => ({
        url: "users/address",
        method: "PUT",
        body: encryptedBody(payload),
      }),
    }),
    PostRateFInder: builder.mutation({
      query: (payload) => ({
        url: "RateFinder",
        method: "POST",
        body: encryptedBody(payload),
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
        body: encryptedBody(payload),
      }),
    }),

    PostUpdateAddressData: builder.mutation({
      query: (payload) => ({
        url: "addresses",
        method: "PUT",
        body: encryptedBody(payload),
      }),
    }),
    PostDeleteAddressData: builder.mutation({
      query: (payload) => ({
        url: `addresses?_id=${payload._id}`,
        method: "DELETE",
        body: encryptedBody(payload),
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
        body: encryptedBody(payload),
      }),
    }),

    PostUpdateServiceTypesData: builder.mutation({
      query: (payload) => ({
        url: "ServiceTypes",
        method: "PUT",
        body: encryptedBody(payload),
      }),
    }),
    PostDeleteServiceTypesData: builder.mutation({
      query: (payload) => ({
        url: `ServiceTypes?_id=${payload._id}`,
        method: "DELETE",
        body: encryptedBody(payload),
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
