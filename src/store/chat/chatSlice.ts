import { GetConversationResponseBody } from "@/types/Conversation";
import { Message } from "@/types/Message";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ConversationState = {
  isFirstText: boolean;
  conversationResponseBody: GetConversationResponseBody;
};

const initialState: ConversationState = {
  isFirstText: false,
  conversationResponseBody: {
    id: 0,
    title: "Start New Chat",
    createdAt: new Date().toISOString(),
    messages: [
      {
        id: 0,
        content: "How can I help you today?",
        isUser: false,
        createdAt: "",
        conversationId: 0,
      },
    ],
  },
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setConversation: (
      state,
      action: PayloadAction<GetConversationResponseBody>
    ) => {
      //   console.log("in set converaation", state, action.payload);
      state.isFirstText = false;
      state.conversationResponseBody = action.payload;
    },
    setIsFirstTrue: (state) => {
      console.log("updating is first text to true");
      state.isFirstText = true;
    },
    setIsFirstFalse: (state) => {
      state.isFirstText = false;
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      console.log("in add message", state, action.payload);
      state.conversationResponseBody = {
        ...state.conversationResponseBody,
        messages: [...state.conversationResponseBody.messages, action.payload],
      };
    },
    replaceMessage: (state, action: PayloadAction<Message>) => {
      const lastIndex = state.conversationResponseBody.messages.length - 1;
      if (lastIndex >= 0) {
        state.conversationResponseBody.messages[lastIndex] = action.payload;
      }
    },
    resetChat: () => initialState,
  },
});

export const {
  setIsFirstFalse,
  setIsFirstTrue,
  addMessage,
  setConversation,
  replaceMessage,
  resetChat,
} = chatSlice.actions;

export default chatSlice.reducer;
