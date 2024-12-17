import { configureStore } from '@reduxjs/toolkit'
import chatReducer from './chat/chatSlice'
import { conversationApi } from './conversation/conversationApi'


export const store = configureStore({
  reducer: {
    chat: chatReducer,
    [conversationApi.reducerPath]: conversationApi.reducer,
  },

  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(conversationApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch