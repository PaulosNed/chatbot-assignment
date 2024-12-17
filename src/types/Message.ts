export type Message = {
    id: number,
    conversationId: number,
    content: string,
    isUser: boolean,
    createdAt: string,
    isTyping?: boolean
}