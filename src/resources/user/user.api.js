import { apiClient } from '@/services/api';

export const signIn = ({
  email,
  password,
}) => apiClient.post('/account/signin', {
  email,
  password,
});

export const signUp = ({
  firstName,
  lastName,
  email,
  password,
}) => apiClient.post('/account/signup', {
  firstName,
  lastName,
  email,
  password,
});

export const forgot = ({ email }) => apiClient.post('/account/forgot-password', { email });

export const reset = ({ password, token }) => apiClient.put('/account/reset-password', { password, token });

export const signOut = () => apiClient.post('/account/logout');

export const getCurrentUser = () => apiClient.get('/users/current');

export const updateCurrentUser = (data) => apiClient.put('/users/current', data);
