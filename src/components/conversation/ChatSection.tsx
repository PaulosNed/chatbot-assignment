/* eslint-disable react-hooks/exhaustive-deps */
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
} from "@/store/chat/chatSlice";
import {
  useCreateConversationMutation,
  useCreateMessageMutation,
} from "@/store/conversation/conversationApi";
import TypingDots from "../layout/TypingDots";
import ErrorPage from "@/app/ErrorPage";

interface ChatSectionProps {
  loading: boolean;
}

const ChatSection = ({ loading }: ChatSectionProps) => {
  const isFirstText = useSelector(
    (state: { chat: ConversationState }) => state.chat.isFirstText
  );
  const { id, createdAt, messages } = useSelector(
    (state: { chat: ConversationState }) => state.chat.conversationResponseBody
  );

  const [question, setQuestion] = useState<string>("");
  const [isTyping, setIsTyping] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const router = useRouter();

  const [createConversation, { isError: isCreateConversationError }] =
    useCreateConversationMutation();
  const [createMessage, { isError: isCreateMessageError }] =
    useCreateMessageMutation();

  const chatTime = new Date(createdAt).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
    setIsTyping(e.target.value.length > 0 && !isDisabled);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  const handleClick = async () => {
    if (!question) return;

    const questionCopy = question;
    setQuestion("");
    setIsDisabled(true);
    setIsTyping(false);

    dispatch(
      addMessage({
        id: messages.length,
        content: questionCopy,
        isUser: true,
        createdAt: createdAt,
        conversationId: id,
      })
    );
    if (messages.length === 1) {
      // dispatch(setIsFirstTrue());

      const res = await createConversation({
        title: `Conversation ${messages.length + 1}`,
      });

      if (res?.data?.id) {
        console.log("conversation created", res);
        const convId = res?.data?.id;
        console.log("number id", Number(convId));

        await createMessage({
          content: "How Can I help you today?",
          isUser: false,
          conversationId: convId,
        });
        await createMessage({
          content: questionCopy,
          isUser: true,
          conversationId: convId,
        });

        router.replace(`/${convId}?isFirst=true`);
      }
    } else {
      getResponse();
    }
  };

  const getResponse = async () => {
    // show animation for two seconds
    dispatch(
      addMessage({
        id: messages.length,
        content: "Typing...",
        isUser: false,
        createdAt: createdAt,
        conversationId: id,
        isTyping: true,
      })
    );

    setTimeout(async () => {
      dispatch(
        replaceMessage({
          id: messages.length + 1,
          content: "This is a response from the chatbot.",
          isUser: false,
          createdAt: new Date().toISOString(),
          conversationId: id,
        })
      );
      setIsDisabled(false);
    }, 2000);
    if (!isFirstText) {
      await createMessage({
        content: question,
        isUser: true,
        conversationId: id,
      });
    }
    await createMessage({
      content: "This is a response from the chatbot.",
      isUser: false,
      conversationId: id,
    });
  };

  useEffect(() => {
    if (isFirstText) {
      console.log("found first text in chatsecction");
      getResponse();
      dispatch(setIsFirstFalse());
    }
  }, [isFirstText]);

  if (isCreateConversationError || isCreateMessageError) {
    return <ErrorPage />;
  }

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
              {messages.map((message: Message, idx: number) => (
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
                    {"isTyping" in message && message.isTyping ? (
                      <TypingDots />
                    ) : (
                      message.content
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="fixed z-10 bg-surface md:bg-white md:rounded-b-3xl bottom-0 pt-2 pb-3 md:absolute md:bottom-5 left-0 w-full">
        <div className="w-full px-4">
          <div
            className={`flex items-center w-full rounded-full bg-surfaceContainerHigh px-4 py-3 shadow-sm ${
              isTyping && !isDisabled ? "border-2 border-black" : ""
            }`}
          >
            <input
              value={question}
              type="text"
              placeholder="Reply to Chatbot"
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className={`w-full bg-transparent outline-none text-sm tex-ons ${
                isDisabled ? "opacity-20" : ""
              }`}
              disabled={isDisabled}
            />
            <button
              className="ml-2 text-gray-600 hover:text-gray-800"
              onClick={handleClick}
              aria-label="send"
              disabled={isDisabled}
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