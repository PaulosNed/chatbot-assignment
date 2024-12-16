import ChatSection from "@/components/conversation/ChatSection";
import { Message } from "@/types/Message";

export default function Home() {
  const conversation: Message[] =[
    {
      id: "1",
      text: "How can I help you today?",
      isUser: false,
      createdAt: "",
      updatedAt: ""
    }
  ]
  return (
    <div className="h-full">
      <ChatSection conversation={conversation} loading={false} startTime={new Date()}/>
    </div>
  );
}
