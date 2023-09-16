import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import getNews from './newsApi';

const key = process.env.REACT_APP_API_KEY;

const metadataUrl = 'https://api.marketaux.com/v1/news/all?filter_entities=true&language=en&countries=';

const initialState = {
  news: [],
};

export const fetchNews = createAsyncThunk('news/fetchNews', async (symbol) => {
  const response = await getNews(`${metadataUrl}${symbol}&api_token=${key}`);
  return response;
});

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.news = action.payload;
      });
  },
});

export const selectNews = (state) => state.news.news;
export default newsSlice.reducer;
