import SignIn from '@/pages/sign-in';
import SignUp from '@/pages/sign-up';
import Forgot from '@/pages/forgot';
import Reset from '@/pages/reset';
import NotFound from '@/pages/not-found';
import Home from '@/pages/home';
import Profile from '@/pages/profile';

import AuthLayout from '@/layouts/auth';
import MainLayout from '@/layouts/main';
import EmptyLayout from '@/layouts/empty';

export const routes = [
  {
    name: 'home',
    path: '/',
    component: Home,
    meta: {
      requiresAuth: true,
      layout: MainLayout,
    },
  },
  {
    name: 'signIn',
    path: '/signin',
    component: SignIn,
    meta: {
      requiresAuth: false,
      layout: AuthLayout,
    },
  },
  {
    name: 'signUp',
    path: '/signup',
    component: SignUp,
    meta: {
      requiresAuth: false,
      layout: AuthLayout,
    },
  },
  {
    name: 'forgot',
    path: '/forgot',
    component: Forgot,
    meta: {
      requiresAuth: false,
      layout: AuthLayout,
    },
  },
  {
    name: 'reset',
    path: '/reset',
    component: Reset,
    meta: {
      requiresAuth: false,
      layout: AuthLayout,
    },
  },
  {
    name: 'profile',
    path: '/profile',
    component: Profile,
    meta: {
      requiresAuth: true,
      layout: MainLayout,
    },
  },
  {
    name: 'notFound',
    path: '/:pathMatch(.*)*',
    component: NotFound,
    meta: {
      requiresAuth: false,
      layout: EmptyLayout,
    },
  },
];
