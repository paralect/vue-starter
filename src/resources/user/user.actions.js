import * as api from './user.api';

const actions = {
  setErrors({ commit }, errors) {
    commit('setErrors', errors);
  },

  async signIn({ commit }, {
    email,
    password,
  }) {
    try {
      commit('setIsLoading', true);
      commit('setErrors', null);

      const user = await api.signIn({
        email,
        password,
      });
      commit('setUser', user);
    } catch (error) {
      console.log(error); // eslint-disable-line no-console
      commit('setErrors', error.data.errors);
    } finally {
      commit('setIsLoading', false);
    }
  },

  async signUp(_, {
    firstName,
    lastName,
    email,
    password,
  }) {
    const { signupToken } = await api.signUp({
      firstName,
      lastName,
      email,
      password,
    });

    return { signupToken };
  },

  async forgot(_, { email }) {
    await api.forgot({ email });
  },

  async reset(_, { password, token }) {
    await api.reset({ password, token });
  },

  async signOut({ commit }) {
    try {
      await api.signOut();
      commit('deleteUser');
    } catch (error) {
      console.log(error); // eslint-disable-line no-console
    }
  },

  async getCurrentUser({ commit }) {
    try {
      const user = await api.getCurrentUser();
      commit('setUser', user);
    } catch (error) {
      console.log(error); // eslint-disable-line no-console
    }
  },

  async updateCurrentUser({ commit }, data) {
    try {
      commit('setIsLoading', true);
      commit('setErrors', null);

      await api.updateCurrentUser(data);
    } catch (error) {
      console.log(error); // eslint-disable-line no-console
      commit('setErrors', error.data.errors);
    } finally {
      commit('setIsLoading', false);
    }
  },
};

export default actions;
