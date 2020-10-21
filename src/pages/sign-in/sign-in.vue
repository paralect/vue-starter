<template>
  <div class="container">
    <a-form
      ref="signInForm"
      :rules="rules"
      :model="form"
      @finish="handleSubmit"
    >
      <h1 class="title">
        Sign In
      </h1>

      <p
        v-if="formErrors.credentials"
        class="common-error"
      >
        {{ formErrors.credentials }}
      </p>
      <p
        v-if="formErrors.email"
        class="common-error"
      >
        {{ formErrors.email }}
      </p>

      <a-form-item name="email">
        <a-input
          v-model:value="form.email"
          placeholder="Email"
          autocomplete="off"
        />
      </a-form-item>

      <a-form-item name="password">
        <a-input
          v-model:value="form.password"
          type="password"
          placeholder="Password"
          autocomplete="off"
        />
      </a-form-item>

      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          :disabled="isLoading"
        >
          Sign In
        </a-button>
      </a-form-item>
    </a-form>

    <div class="links">
      <div class="row">
        Don’t have an account?
        <router-link :to="{name: 'signUp'}">
          Sign up
        </router-link>
      </div>

      <div class="row">
        <router-link :to="{name: 'forgot'}">
          Forgot password?
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  import { formatErrors, userRules } from '@/helpers/formValidation';

  export default {
    data() {
      return {
        form: {
          email: '',
          password: '',
        },
        rules: {
          email: userRules.email,
          password: userRules.password,
        },
      };
    },

    computed: {
      ...mapGetters('user', ['isLoading', 'errors', 'userId']),

      formErrors() {
        return formatErrors(this.errors);
      },
    },

    watch: {
      userId() {
        const searchParams = new URLSearchParams(window.location.search);
        this.$router.replace(searchParams.get('redirectFrom') || { name: 'home' });
      },
    },

    methods: {
      ...mapActions('user', ['signIn']),

      async handleSubmit() {
        try {
          await this.signIn(this.form);
        } catch (error) {
          console.log(error); // eslint-disable-line no-console
        }
      },
    },
  };
</script>

<style lang="postcss" scoped>
  .container {
    width: 350px;
    background: #fff;
    border-radius: 4px;
    padding: 24px;

    & .title {
      margin: 0;
      margin-bottom: 32px;
    }

    & .common-error {
      color: #f44336;
    }

    & .links {
      margin-top: 32px;

      & .row + .row {
        margin-top: 16px;
      }
    }
  }
</style>
