import { createStore } from 'vuex';
import user from './user/user.module';

const store = createStore({
  modules: {
    user,
  },
});

export default store;
