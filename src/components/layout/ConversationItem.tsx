import { Conversation } from "@/types/Conversation";
import Link from "next/link";
import React from "react";
import TrashIcon from "@/icons/TrashIcon";

const ConversationItem = ({ id, title }: Conversation) => {

  return (
    <Link href={`/${id}`}>
      <div className="w-full bg-primaryContainer py-4 text-lg rounded-2xl">
        <div className="flex items-center justify-between px-4 pr-6">
            <p className="text-sm md:text-base font-[400]">{title}</p>
          <TrashIcon />
        </div>
      </div>
    </Link>
  );
};

export default ConversationItem;
