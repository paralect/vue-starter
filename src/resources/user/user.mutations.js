const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  deleteUser(state) {
    state.user = null;
  },
  setIsLoading(state, isLoading) {
    state.isLoading = isLoading;
  },
  setErrors(state, errors) {
    state.errors = errors;
  },
};

export default mutations;
