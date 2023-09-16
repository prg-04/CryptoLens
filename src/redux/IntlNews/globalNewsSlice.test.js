import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import globalNewsReducer, {
  fetchAllNews,
  selectAllNews,
} from './globalNewsSlice';
import * as newsApi from '../news/newsApi';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../news/newsApi');

describe('globalNewsSlice', () => {
  let store;

  beforeEach(() => {
    store = mockStore({ allNews: [] });
  });

  it('should create fetchAllNews action', async () => {
    const fakeNewsData = [{ id: 1, title: 'News 1' }];
    newsApi.default.mockResolvedValue(fakeNewsData);

    await store.dispatch(fetchAllNews());
  });

  it('should handle fetchAllNews.fulfilled', () => {
    const prevState = {
      allNews: [],
    };
    const action = {
      type: fetchAllNews.fulfilled.type,
      payload: [{ id: 1, title: 'News 1' }],
    };
    const expectedState = {
      allNews: action.payload,
    };

    const nextState = globalNewsReducer(prevState, action);

    expect(nextState).toEqual(expectedState);
  });

  it('should select allNews from state', () => {
    const state = {
      allNews: {
        allNews: [{ id: 1, title: 'News 1' }],
      },
    };

    const selectedAllNews = selectAllNews(state);

    expect(selectedAllNews).toEqual(state.allNews.allNews);
  });
});
