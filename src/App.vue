<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  import * as socketService from '@/services/socket.service';

  import EmptyLayout from '@/layouts/empty';

  import '@/resources/user/user.handlers';

  export default {
    components: {
      EmptyLayout,
    },

    computed: {
      layout() {
        return this.$route.meta.layout || EmptyLayout;
      },
      ...mapGetters('user', ['userId']),
    },

    watch: {
      userId(newUserId, oldUserId) {
        if (oldUserId) {
          socketService.disconnect();
        }

        if (newUserId) {
          socketService.connect();
        }
      },

    },

    async created() {
      await this.getCurrentUser();
    },

    unmounted() {
      socketService.disconnect();
    },

    methods: {
      ...mapActions('user', ['getCurrentUser']),
    },
  };
</script>
