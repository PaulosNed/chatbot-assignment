"use client";

import ChatSection from "@/components/conversation/ChatSection";
import { setConversation } from "@/store/chat/chatSlice";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const SelectedConversationPage = () => {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const isFirst = searchParams.get("isFirst");
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("is first", isFirst === "true", id);
    const fetchConversation = async () => {
      if (isFirst === "true") {
        const params = new URLSearchParams(window.location.search);
        params.delete("isFirst");
        const newUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.replaceState({}, "", newUrl);
        setLoading(false);
      } else {
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
