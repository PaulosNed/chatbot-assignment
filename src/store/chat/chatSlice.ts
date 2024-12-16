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
    id: "1",
    title: "Start New Chat",
    startTime: new Date().toISOString(),
    conversation: [
      {
        id: "1",
        text: "How can I help you today?",
        isUser: false,
        createdAt: "",
        updatedAt: "",
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
      console.log("in set converaation", state, action.payload);
      state.isFirstText = false;
      state.conversationResponseBody = action.payload;
    },
    setIsFirstTrue: (state) => {
      state.isFirstText = true;
    },
    setIsFirstFalse: (state) => {
      state.isFirstText = false;
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      console.log("in add message", state, action.payload);
      state.isFirstText = false;
      state.conversationResponseBody = {
        ...state.conversationResponseBody,
        conversation: [
          ...state.conversationResponseBody.conversation,
          action.payload,
        ],
      };
    },
    replaceMessage: (state, action: PayloadAction<Message>) => {
      const lastIndex = state.conversationResponseBody.conversation.length - 1;
      if (lastIndex >= 0) {
        state.conversationResponseBody.conversation[lastIndex] = action.payload;
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
