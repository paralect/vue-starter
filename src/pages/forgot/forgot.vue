<template>
  <div class="container">
    <h1 class="title">
      Forgot Password
    </h1>

    <template v-if="isLinkSent">
      <p class="description">
        We sent a reset link to your email: <b> {{ form.email }} </b>
      </p>
    </template>

    <template v-else>
      <p
        v-if="formErrors.email"
        class="common-error"
      >
        {{ formErrors.email }}
      </p>

      <p class="description">
        We’ll send a reset link to your email
      </p>

      <a-form
        ref="forgotPasswordForm"
        :model="form"
        :rules="rules"
        @finish="handleSubmit"
      >
        <a-form-item name="email">
          <a-input
            v-model:value="form.email"
            placeholder="Email"
            autocomplete="off"
          />
        </a-form-item>

        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            :disabled="isLoading"
          >
            Send reset link
          </a-button>
        </a-form-item>
      </a-form>

      <div class="links">
        <div class="row">
          Remember the password?
          <router-link :to="{name: 'signIn'}">
            Sign in
          </router-link>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  import { formatErrors, userRules } from '@/helpers/formValidation';

  export default {
    data() {
      return {
        isSubmitted: false,
        isLoading: false,
        errors: null,
        form: {
          email: '',
        },
        rules: {
          email: userRules.email,
        },
      };
    },

    computed: {
      isLinkSent() {
        return this.isSubmitted && !this.isLoading && !this.errors;
      },

      formErrors() {
        return formatErrors(this.errors);
      },
    },

    methods: {
      ...mapActions('user', ['forgot']),

      async handleSubmit() {
        try {
          this.isLoading = true;
          const data = { email: this.form.email };
          await this.forgot(data);
          this.isSubmitted = true;
        } catch (error) {
          console.log(error); // eslint-disable-line no-console
          if (error.data) {
            this.errors = error.data.errors;
          }
        } finally {
          this.isLoading = false;
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

    & .row + .row {
      margin-top: 16px;
    }

    & .links {
      margin-top: 32px;
    }
  }
</style>
