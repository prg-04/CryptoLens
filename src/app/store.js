import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/user/userSlice';
import newsReducer from '../redux/news/newsSlice';
import globalNews from '../redux/IntlNews/globalNewsSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    news: newsReducer,
    globalNews,
  },
});

export default store;
