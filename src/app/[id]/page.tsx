"use client";

import ChatSection from "@/components/conversation/ChatSection";
import { setConversation } from "@/store/chat/chatSlice";
import { GetConversationResponseBody } from "@/types/Conversation";
// import Spinner from "@/components/layout/Spinner";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SelectedConversationPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const { isFirstText } = useSelector(
    (state: {
      chat: {
        isFirstText: boolean;
        conversationResponseBody: GetConversationResponseBody;
      };
    }) => state.chat
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchConversation = async () => {
      if (!isFirstText) {
        setTimeout(() => {
          // Simulate fetching conversation
          console.log("Fetched conversation", id);
          dispatch(
            setConversation({
              id: id as string,
              title: `Conversation ${id}`,
              startTime: new Date().toISOString(),
              conversation: [
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
              ],
            })
          );
          setLoading(false);
        }, 2000);
      } else {
        setLoading(false);
      }
    };

    fetchConversation();
  }, []);

  return (
    <div className="h-full">
      <ChatSection loading={loading} />
    </div>
  );
};

export default SelectedConversationPage;
