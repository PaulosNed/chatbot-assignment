"use client";

import ChatbotIcon from "@/icons/ChatbotIcon";
import UserIcon from "@/icons/UserIcon";
import { Message } from "@/types/Message";
import React, { useEffect, useState } from "react";

// import { TextField, InputAdornment, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Spinner from "../layout/Spinner";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  addMessage,
  ConversationState,
  replaceMessage,
  setIsFirstFalse,
  setIsFirstTrue,
} from "@/store/chat/chatSlice";

interface ChatSectionProps {
  loading: boolean;
}

const ChatSection = ({ loading }: ChatSectionProps) => {
  const isFirstText = useSelector(
    (state: { chat: ConversationState }) => state.chat.isFirstText
  );
  const { startTime, conversation } = useSelector(
    (state: { chat: ConversationState }) => state.chat.conversationResponseBody
  );

  const [question, setQuestion] = useState<string>("");
  const router = useRouter();

  const chatTime = new Date(startTime).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const dispatch = useDispatch();

  const handleClick = () => {
    if (!question) return;

    dispatch(
      addMessage({
        id: conversation.length.toString(),
        text: question,
        isUser: true,
        createdAt: startTime,
        updatedAt: startTime,
      })
    );
    if (conversation.length === 2) {
      dispatch(setIsFirstTrue());

      // Make request to backend to create a conversation then push to the id
      router.replace(`/${2}`);
    } else {
      getResponse();
    }

    setQuestion("");
  };

  const getResponse = () => {
    // show animation for two seconds
    dispatch(
      addMessage({
        id: conversation.length.toString(),
        text: "Typing...",
        isUser: false,
        createdAt: startTime,
        updatedAt: startTime,
      })
    );

    setTimeout(() => {
      dispatch(
        replaceMessage({
          id: (conversation.length + 1).toString(),
          text: "This is a response from the chatbot.",
          isUser: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
      );
    }, 2000);
  };

  useEffect(() => {
    if (isFirstText) {
      getResponse();
      dispatch(setIsFirstFalse());
    }
  }, [isFirstText]);

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
      <div className="fixed z-10 bg-surface md:bg-white md:rounded-b-3xl bottom-3 md:absolute md:bottom-5 left-0 w-full">
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
