"use client";

import ChatbotIcon from "@/icons/ChatbotIcon";
import UserIcon from "@/icons/UserIcon";
import { Message } from "@/types/Message";
import React, { useState } from "react";

// import { TextField, InputAdornment, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Spinner from "../layout/Spinner";
import { GetConversationResponseBody } from "@/app/[id]/page";
import { useRouter } from "next/navigation";

interface ChatSectionProps {
  conversation: Message[];
  setConversation: React.Dispatch<
    React.SetStateAction<GetConversationResponseBody>
  >;
  loading: boolean;
  startTime: Date;
}

const ChatSection = ({
  conversation,
  setConversation,
  loading,
  startTime,
}: ChatSectionProps) => {
  const [question, setQuestion] = useState<string>("");
  const router = useRouter();
  const chatTime = startTime.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const handleClick = async () => {
    console.log("Question: ", question);

    handleQuestion(conversation.length === 1);

    // handle post to backend
  };

  const handleQuestion = async (isFirst: boolean) => {
    setConversation((prev) => ({
      ...prev,
      conversation: [
        ...prev.conversation,
        {
          id: conversation.length.toString(),
          text: question,
          isUser: true,
          createdAt: startTime.toISOString(),
          updatedAt: startTime.toISOString(),
        },
      ],
    }));
    setQuestion("");

    // show animation for two seconds
    setConversation((prev) => ({
      ...prev,
      conversation: [
        ...prev.conversation,
        {
          id: conversation.length.toString(),
          text: "Typing...",
          isUser: false,
          createdAt: startTime.toISOString(),
          updatedAt: startTime.toISOString(),
        },
      ],
    }));

    setTimeout(() => {
      setConversation((prev) => ({
        ...prev,
        conversation: [
          ...prev.conversation.slice(0, -1),
          {
            id: (conversation.length + 1).toString(),
            text: "This is a response from the chatbot.",
            isUser: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
      }));
      if (isFirst) {
        router.replace("/1");
      }
    }, 2000);
  };

  return (
    <div className="h-full relative">
      <div className="flex flex-col justify-end h-full">
        {loading && (
          <div className="h-full md:mt-40">
            <Spinner />
          </div>
        )}
        {!loading && (
          <div className="md:max-h-[63vh] md:mb-4 flex-auto flex flex-col gap-2 px-4 md:px-10 pb-20 overflow-y-hidden">
            <p className="w-full text-center text-sm">{chatTime}</p>

            <div className="mt-4 flex flex-col gap-4 w-full overflow-y-auto">
              {conversation.map((message: Message, idx: number) => (
                <div
                  key={idx}
                  className={`flex gap-2 items-center ${
                    message.isUser
                      ? "flex-row-reverse justify-start"
                      : "flex-row justify-start"
                  }`}
                >
                  {message.isUser ? <UserIcon /> : <ChatbotIcon />}
                  <div
                    className={`px-4 py-2 rounded-xl ${
                      message.isUser
                        ? "bg-surfaceContainerLow rounded-br-none text-white"
                        : "rounded-bl-none bg-surfaceContainerHigh"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="fixed z-10 bg-surface md:bg-white md:rounded-b-3xl bottom-0 md:absolute md:bottom-5 left-0 w-full">
        <div className="w-full px-4">
          <div className="flex items-center w-full rounded-full bg-surfaceContainerHigh px-4 py-3 shadow-sm">
            <input
              value={question}
              type="text"
              placeholder="Reply to Chatbot"
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full bg-transparent outline-none text-sm tex-ons"
            />
            <button
              className="ml-2 text-gray-600 hover:text-gray-800"
              onClick={handleClick}
              aria-label="send"
            >
              <SendIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSection;
