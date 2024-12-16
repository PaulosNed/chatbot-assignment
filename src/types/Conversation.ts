import { Message } from "./Message";

export type Conversation = {
    id: string,
    title: string,
}

export type GetConversationResponseBody = {
    id: string;
    title: string;
    startTime: string;
    conversation: Message[];
  };