import { createAsyncThunk } from '@reduxjs/toolkit';
import { setConversation } from './chatSlice';

const BASE_URL = process.env.NEXT_PUBLIC_ENDPOINT;

export const fetchConversation = createAsyncThunk(
  'conversation/fetchConversation',
  async (id: number, { dispatch }) => {
    const response = await fetch(`${BASE_URL}/api/conversations/${id}`);
    const data = await response.json();

    dispatch(setConversation(data));
  }
);