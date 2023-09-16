import React from 'react';
import PropTypes from 'prop-types';
import { AuthProvider } from '../context/AuthContext';

const AuthProviderWrapper = ({ children }) => (
  <AuthProvider>{children}</AuthProvider>
);

AuthProviderWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AuthProviderWrapper;
