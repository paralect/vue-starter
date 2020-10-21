<template>
  <a-layout-header class="header">
    <a-menu
      :selected-keys="currentRoute"
      mode="horizontal"
      theme="dark"
      class="menu"
    >
      <a-menu-item
        key="logo"
        class="logo-item"
      >
        <router-link
          class="logo-link"
          :to="{ name: 'home' }"
        >
          <logo class="logo" />
        </router-link>
      </a-menu-item>

      <a-menu-item
        v-for="link in links"
        :key="link.to"
      >
        <router-link :to="{ name: link.to }">
          {{ link.label }}
        </router-link>
      </a-menu-item>
    </a-menu>

    <a-dropdown :trigger="['click']">
      <a
        class="ant-dropdown-link user-link"
        @click="e => e.preventDefault()"
      >👤</a>
      <template #overlay>
        <a-menu
          class="user-menu"
          theme="dark"
          @click="handleMenuClick"
        >
          <a-menu-item key="profile">
            <router-link :to="{ name: 'profile' }">
              Profile
            </router-link>
          </a-menu-item>
          <a-menu-item key="logout">
            Log out
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </a-layout-header>
</template>

<script>
  import { mapActions } from 'vuex';

  import Logo from '@/static/images/logo.vue';

  const links = [
    {
      label: 'Dashboard',
      to: 'home',
    },
  ];

  export default {
    components: {
      Logo,
    },
    data() {
      return {
        links,
      };
    },
    computed: {
      currentRoute() {
        return [this.$route.name];
      },
    },

    methods: {
      ...mapActions('user', ['signOut']),

      async handleMenuClick({ key }) {
        if (key === 'logout') {
          await this.signOut();
          this.$router.push({ name: 'signIn' });
        }
      },
    },
  };
</script>

<style lang="postcss" scoped>
  .header {
    display: flex;
    justify-content: space-between;

    & .menu {
      display: flex;
      line-height: 64px;
    }

    & .logo-item {
      display: flex;
      align-items: center;
      padding: 0 32px;

      & .logo-link, & .logo {
        height: 46px;
        width: 46px;
      }
    }

    & .user-link {
      padding: 0 12px;
    }
  }

  .user-menu {
    width: 120px;
  }
</style>
