"use client";

import ChatSection from "@/components/conversation/ChatSection";
// import Spinner from "@/components/layout/Spinner";
import { Message } from "@/types/Message";
import React, { useEffect, useState } from "react";

const SelectedConversationPage = () => {
  const [loading, setLoading] = useState(true);
  const [conversation, setConversation] = useState<Message[]>([]);

  useEffect(() => {
    const fetchConversation = async () => {
      // fetch conversations here
      setTimeout(() => {
        // Simulate fetching conversation
        console.log("Fetched conversation");
        setConversation([
          {
            id: "1",
            text: "How can I help you today?",
            isUser: false,
            createdAt: "",
            updatedAt: "",
          },
          {
            id: "2",
            text: "I am a user and I am typing a response",
            isUser: true,
            createdAt: "",
            updatedAt: "",
          },
          {
            id: "3",
            text: "This is an AI generated response",
            isUser: false,
            createdAt: "",
            updatedAt: "",
          },
          {
            id: "4",
            text: "How can I help you today?",
            isUser: true,
            createdAt: "",
            updatedAt: "",
          },
          {
            id: "5",
            text: "I am a user and I am typing a response",
            isUser: false,
            createdAt: "",
            updatedAt: "",
          },
          {
            id: "6",
            text: "This is an AI generated response",
            isUser: true,
            createdAt: "",
            updatedAt: "",
          },
          {
            id: "7",
            text: "I am a user and I am typing a response",
            isUser: false,
            createdAt: "",
            updatedAt: "",
          },
          {
            id: "8",
            text: "This is an AI generated response",
            isUser: true,
            createdAt: "",
            updatedAt: "",
          },
          {
            id: "9",
            text: "I am a user and I am typing a response",
            isUser: false,
            createdAt: "",
            updatedAt: "",
          },
          {
            id: "10",
            text: "This is an AI generated response",
            isUser: true,
            createdAt: "",
            updatedAt: "",
          },
        ]);
        setLoading(false);
      }, 2000);
    };

    fetchConversation();
  }, []);

  // if (loading) {
  //   return (
  //     <div className="w-full h-full -mt-10 flex items-center justify-center">
  //       <Spinner />;
  //     </div>
  //   );
  // }

  return (
    <div className="h-full">
      <ChatSection conversation={conversation} loading={loading}/>
    </div>
  );
};

export default SelectedConversationPage;
