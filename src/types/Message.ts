export type Message = {
    id: string,
    text: string,
    user: {
        id: string,
        name: string,
    },
    chat: {
        id: string,
    },
    createdAt: string,
    updatedAt: string,
}