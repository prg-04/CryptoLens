import userReducer, { addUser, userDetail } from './userSlice';

describe('userSlice', () => {
  it('should add a user to the state', () => {
    const initialState = {
      user: [],
    };
    const user = { id: 1, name: 'John' };
    const expectedState = {
      user: [user],
    };

    const nextState = userReducer(initialState, addUser(user));

    expect(nextState).toEqual(expectedState);
  });

  it('should select the user details', () => {
    const user = { id: 1, name: 'John' };
    const state = {
      user: [user],
    };

    const userDetails = userDetail({ user: state });

    expect(userDetails).toEqual([user]);
  });
});

describe('userReducer (default export)', () => {
  it('should return the initial state', () => {
    const initialState = userReducer(undefined, {});

    expect(initialState).toEqual({
      user: [],
    });
  });
});
