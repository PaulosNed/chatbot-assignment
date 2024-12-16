"use client"

import ChatSection from "@/components/conversation/ChatSection";
import { GetConversationResponseBody } from "./[id]/page";
import { useState } from "react";

export default function Home() {
  const [conversation, setConversation] = useState<GetConversationResponseBody>({
    id: "1",
    title: "Start New Chat",
    startTime: new Date(),
    conversation: [
    {
      id: "1",
      text: "How can I help you today?",
      isUser: false,
      createdAt: "",
      updatedAt: ""
    }
  ]})
  return (
    <div className="h-full">
      <ChatSection setConversation={setConversation} conversation={conversation.conversation} loading={false} startTime={new Date()}/>
    </div>
  );
}
