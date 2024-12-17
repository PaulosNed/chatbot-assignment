import { Message } from "./Message";

export type Conversation = {
    id: number,
    title: string,
}

export type GetConversationResponseBody = {
    id: number;
    title: string;
    createdAt: string;
    messages: Message[];
  };