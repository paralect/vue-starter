import * as socketService from '@/services/socket.service';
import store from '@/resources/store';

import { apiClient } from '@/services/api';

apiClient.on('error', (error) => {
  if (error.status === 401) {
    store.dispatch('user/signOut');
  }
});

socketService.on('connect', () => {
  const userId = store.getters['user/userId'];
  socketService.emit('subscribe', `user-${userId}`);
});

socketService.on('user:updated', (user) => {
  store.commit('user/setUser', user);
});
