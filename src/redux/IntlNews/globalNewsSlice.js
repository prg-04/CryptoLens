import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import getNews from '../news/newsApi';

const key = process.env.REACT_APP_API_KEY;
const allNews = `https://api.marketaux.com/v1/news/all?symbols=TSLA%2CAMZN%2CMSFT&filter_entities=true&language=en&api_token=${key}`;

const initialState = {
  allNews: [],
};

export const fetchAllNews = createAsyncThunk('news/fetchNews', async () => {
  const response = await getNews(allNews);
  return response;
});

const globalNewsSlice = createSlice({
  name: 'allNews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllNews.fulfilled, (state, action) => {
      state.allNews = action.payload;
    });
  },
});

export const selectAllNews = (state) => state.allNews.allNews;
export default globalNewsSlice.reducer;
