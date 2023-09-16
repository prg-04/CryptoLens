import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import SignUp from './SignUp';
import AuthProviderWrapper from '../utils/AuthProviderWrapper';
import store from '../app/store';

jest.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    currentUser: null,
    signUp: jest.fn(),
  }),
  // eslint-disable-next-line react/prop-types
  AuthProvider: ({ children }) => <div>{children}</div>,
}));

test('renders SignUp component', () => {
  render(
    <Provider store={store}>
      <Router>
        <AuthProviderWrapper>
          <SignUp />
        </AuthProviderWrapper>
      </Router>
    </Provider>,
  );

  const signUpButton = screen.getByRole('heading', {
    name: /sign up/i,
    level: 2,
  });
  const firstNameInput = screen.getByPlaceholderText('First Name');
  const lastNameInput = screen.getByPlaceholderText('Last Name');
  const emailInput = screen.getByPlaceholderText('Enter email');
  const passwordInput = screen.getByPlaceholderText('Password');
  const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');

  expect(signUpButton).toBeInTheDocument();
  expect(firstNameInput).toBeInTheDocument();
  expect(lastNameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(confirmPasswordInput).toBeInTheDocument();
});

AuthProviderWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
