"use client";

import ChatSection from "@/components/conversation/ChatSection";
import { setConversationId, setIsFirstTrue } from "@/store/chat/chatSlice";
import { fetchConversation } from "@/store/chat/chatThunk";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store";

const SelectedConversationPage = () => {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const isFirst = searchParams.get("isFirst");
  const [loading, setLoading] = useState(true);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    console.log("is first", isFirst === "true", id);
    const fetchChat = async () => {
      if (isFirst === "true") {
        dispatch(setConversationId(Number(id)));
        dispatch(setIsFirstTrue());
        const params = new URLSearchParams(window.location.search);
        params.delete("isFirst");
        const newUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.replaceState({}, "", newUrl);
        setLoading(false);
      } else {
        setTimeout(() => {
          dispatch(fetchConversation(Number(id)))
            .unwrap()
            .then(() => setLoading(false))
            .catch(() => setLoading(false));
        }, 2000);
      }
    };

    fetchChat();
  }, []);

  return (
    <div className="h-full">
      <ChatSection loading={loading} />
    </div>
  );
};

export default SelectedConversationPage;
