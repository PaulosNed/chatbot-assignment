"use client";

import ChatSection from "@/components/conversation/ChatSection";
import { resetChat } from "@/store/chat/chatSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetChat());
  }, []);

  return (
    <div className="h-full">
      <ChatSection loading={false} />
    </div>
  );
}
