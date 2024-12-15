"use client";

import React, { useEffect, useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Link from "next/link";
import { Conversation } from "@/types/Conversation";
import ConversationItem from "./ConversationItem";
import Spinner from "@/components/layout/Spinner";

const ConversationList = () => {
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    const fetchConversations = async () => {
      // fetch conversations here
      setTimeout(() => {
        // Simulate fetching conversation
        console.log("Fetched conversation");
        setConversations([
          {
            id: "1",
            title: "Conversation 1",
          },
          {
            id: "2",
            title: "Conversation 2",
          },
          {
            id: "3",
            title: "Conversation 3",
          },
        ]);
        setLoading(false);
      }, 2000);
    };

    fetchConversations();
  }, []);

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
      {loading && (
        <div className="h-full -mt-10 flex items-center justify-center">
          <Spinner />
        </div>
      )}
      {!loading && (
        <div className="h-full mt-4 md:mt-6 flex flex-col gap-1 md:gap-2">
          {conversations.map((conversation) => (
            <ConversationItem key={conversation.id} {...conversation} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ConversationList;
