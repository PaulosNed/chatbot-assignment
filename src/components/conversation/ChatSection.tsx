"use client";

import ChatbotIcon from "@/icons/ChatbotIcon";
import UserIcon from "@/icons/UserIcon";
import { Message } from "@/types/Message";
import React from "react";

// import { TextField, InputAdornment, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

interface ChatSectionProps {
  conversation: Message[];
}

const ChatSection = ({ conversation }: ChatSectionProps) => {
  return (
    <div className="h-full relative">
      <div className="flex flex-col justify-end h-full">
        <div className="flex-auto flex flex-col gap-2 px-4 md:px-10">
          <p className="w-full text-center text-sm">Jan 27, 12:53 PM</p>

          <div className="mt-4 flex flex-col gap-4 w-full">
            {conversation.map((message: Message) => (
              <div
                key={message.id}
                className={`flex gap-2 items-center ${
                  message.isUser
                    ? "flex-row-reverse justify-start"
                    : "flex-row justify-start"
                }`}
              >
                {message.isUser ? <UserIcon /> : <ChatbotIcon />}
                <p
                  className={`px-4 py-2 rounded-xl ${
                    message.isUser
                      ? "bg-surfaceContainerLow rounded-br-none text-white"
                      : "rounded-bl-none bg-surfaceContainerHigh"
                  }`}
                >
                  {message.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="fixed bottom-2 md:absolute md:bottom-5 left-0 w-full">
        <div className="w-full px-2 py-2">
          <div className="flex items-center w-full rounded-full bg-surfaceContainerHigh px-4 py-3 shadow-sm">
            <input
              type="text"
              placeholder="Reply to Chatbot"
              className="w-full bg-transparent outline-none text-sm tex-ons"
            />
            <button
              className="ml-2 text-gray-600 hover:text-gray-800"
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
