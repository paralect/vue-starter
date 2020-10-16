import { createWebHistory, createRouter } from 'vue-router';
import _some from 'lodash/some';
import _includes from 'lodash/includes';

import store from '@/resources/store';
import { routes } from './routes';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authRequired = _some(to.matched, (route) => route.meta.requiresAuth);
  let loggedIn = store.getters['user/isAuthenticated'];

  if (!loggedIn) {
    await store.dispatch('user/getCurrentUser');
    loggedIn = store.getters['user/isAuthenticated'];
  }

  if (_includes(['signIn', 'signUp', 'forgot', 'reset'], to.name) && loggedIn) {
    next({ name: 'home' });
  } else if (authRequired && !loggedIn) {
    const nextRoute = {
      name: 'signIn',
    };

    if (to.name !== 'home') {
      nextRoute.query = { redirectFrom: to.fullPath };
    }

    next(nextRoute);
  } else {
    next();
  }
});

export default router;
