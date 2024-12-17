"use client";

import React from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Link from "next/link";
import ConversationItem from "./ConversationItem";
import Spinner from "@/components/layout/Spinner";
import { useGetConversationsQuery } from "@/store/conversation/conversationApi";

const ConversationList = () => {
  const { data: conversations, isLoading } = useGetConversationsQuery();
  
  return (
    <div className="w-full h-full">
      <Link href="/">
        <div className="w-full bg-primaryContainer py-4 text-lg rounded-2xl shadow-lg">
          <div className="flex gap-4 items-center justify-center text-onPrimaryContainer">
            <AddCircleOutlineIcon className="text-2xl" />
            <p className="font-[500] text-sm md:text-base">Conversations</p>
          </div>
        </div>
      </Link>
      {isLoading && (
        <div className="h-full md:-mt-10 flex items-center justify-center">
          <Spinner />
        </div>
      )}
      {!isLoading && (
        <div className="h-full mt-4 md:mt-6 flex flex-col gap-1 md:gap-2">
          {conversations?.map((conversation) => (
            <ConversationItem key={conversation.id} {...conversation} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ConversationList;
