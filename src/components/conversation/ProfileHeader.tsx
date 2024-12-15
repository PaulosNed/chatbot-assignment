
import ChatbotIcon from "@/icons/ChatbotIcon";
import React from "react";
import Divider from "@mui/material/Divider";
import Sidebar from "../layout/Sidebar";

const ProfileHeader = () => {
  return (
    <div className="w-full">
      <div className="block md:hidden">
        <Divider />
      </div>
      <div className="flex justify-between">
        <div className="px-4 md:px-10 flex gap-4 items-center py-4">
          <ChatbotIcon />
          <p className="text-lg">Chatbot</p>
        </div>

        <Sidebar />
      </div>
      <Divider />
    </div>
  );
};

export default ProfileHeader;
