import {
  Conversation,
  GetConversationResponseBody,
} from "@/types/Conversation";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = process.env.NEXT_PUBLIC_ENDPOINT;

export const conversationApi = createApi({
  reducerPath: "conversationApi",

  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),

  endpoints: (builder) => ({
    getConversation: builder.query<GetConversationResponseBody, string>({
      query: (id: string) => `/api/conversations/${id}/`,
    }),

    getConversations: builder.query<Conversation[], void>({
      query: () => `/api/conversations/`,
    }),

    createConversation: builder.mutation<Conversation, Partial<Conversation>>({
      query: (data) => ({
        url: `/api/conversations/`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
    useGetConversationQuery,
    useGetConversationsQuery,
    useCreateConversationMutation,
} = conversationApi;
