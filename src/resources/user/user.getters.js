const getters = {
  user: ({ user }) => user,
  username: ({ user }) => (user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : null),
  userId: ({ user }) => (user ? user._id : null),
  isAuthenticated: ({ user }) => user !== null,
  isLoading: ({ isLoading }) => isLoading,
  errors: ({ errors }) => errors,
};

export default getters;
