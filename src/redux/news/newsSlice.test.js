import newsReducer, { fetchNews, selectNews } from './newsSlice';
import getNews from './newsApi';

jest.mock('./newsApi', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('newsSlice', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create fetchNews action', () => {
    const symbol = 'TSLA';
    const dispatch = jest.fn();
    const getState = jest.fn();

    const fakeNewsData = [{ id: 1, title: 'News 1' }];
    getNews.mockResolvedValue(fakeNewsData);

    const expectedAction = {
      type: fetchNews.pending.type,
      meta: {
        requestId: expect.any(String),
        arg: symbol,
        requestStatus: 'pending',
      },
    };

    fetchNews(symbol)(dispatch, getState, undefined);

    expect(dispatch).toHaveBeenCalledWith(expectedAction);
    expect(getNews).toHaveBeenCalledWith(
      expect.stringContaining(
        'https://api.marketaux.com/v1/news/all?filter_entities=true&language=en&countries=TSLA&api_token=wR10Bq8LurRj3H1F1xr4I5nvfXWH1FStYUTMz1AS',
      ),
    );
  });

  it('should handle fetchNews.fulfilled', () => {
    const prevState = {
      news: [],
    };
    const action = {
      type: fetchNews.fulfilled.type,
      payload: [{ id: 1, title: 'News 1' }],
    };
    const expectedState = {
      news: action.payload,
    };

    const nextState = newsReducer(prevState, action);

    expect(nextState).toEqual(expectedState);
  });

  it('should select news from state', () => {
    const state = {
      news: {
        news: [{ id: 1, title: 'News 1' }],
      },
    };

    const selectedNews = selectNews(state);

    expect(selectedNews).toEqual(state.news.news);
  });
});
