/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Conversation,
  GetConversationResponseBody,
} from "@/types/Conversation";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { addMessage, setConversation, setIsFirstTrue } from "../chat/chatSlice";
import { Message } from "@/types/Message";

const BASE_URL = process.env.NEXT_PUBLIC_ENDPOINT;

export const conversationApi = createApi({
  reducerPath: "conversationApi",

  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["Conversations", "Conversation"],

  endpoints: (builder) => ({
    getConversation: builder.query<GetConversationResponseBody, string>({
      query: (id: string) => `/api/conversations/${id}/`,
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setConversation(data));
        } catch (error) {
          console.error("Error fetching conversation:", error);
        }
      },
      // providesTags: (result, error, id) => [{ type: 'Conversation', id }],
    }),

    getConversations: builder.query<Conversation[], void>({
      query: () => `/api/conversations/`,
      providesTags: [{ type: "Conversations", id: "LIST" }],
    }),

    createConversation: builder.mutation<Conversation, Partial<Conversation>>({
      query: (data) => ({
        url: `/api/conversations/`,
        method: "POST",
        body: data,
      }),
      // async onQueryStarted(data, { dispatch, queryFulfilled, getState }) {
      //   try {
      //     const { data } = await queryFulfilled;
      //     dispatch(setIsFirstTrue());
      //     const state = getState();
      //     const messages = (state as any).chat.conversationResponseBody.messages;
      //     messages.forEach((message: Message) => {
      //       console.log("messages being added", message.content, data)
      //       dispatch(conversationApi.endpoints.createMessage.initiate({
      //         ...message,
      //         conversationId: data.id
      //       }));
      //     });
      //   } catch (error) {
      //     console.error("Error creating conversation:", error);
      //   }
      // },
      invalidatesTags: [{ type: "Conversations", id: "LIST" }],
    }),

    createMessage: builder.mutation<Omit<Message, "createdAt">, any>({
      query: (data) => ({
        url: `/api/messages/`,
        method: "POST",
        body: data,
      }),
      // async onQueryStarted(data, { dispatch, queryFulfilled }) {
      //   try {
      //     const { data: response } = await queryFulfilled;
      //     dispatch(
      //       addMessage({
      //         ...response,
      //         createdAt: new Date().toISOString(),
      //       })
      //     );
      //   } catch (error) {
      //     console.error("Error creating message:", error);
      //   }
      // },
      // invalidatesTags: (result, error, { id }) => [{ type: 'Conversation', id }],
    }),

    deleteConversation: builder.mutation<void, number>({
      query: (id) => ({
        url: `/api/conversations/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Conversations", id: "LIST" }],
    }),
  }),
});

export const {
  useGetConversationQuery,
  useGetConversationsQuery,
  useDeleteConversationMutation,
  useCreateConversationMutation,
  useCreateMessageMutation,
} = conversationApi;
