<template>
  <div class="container">
    <template v-if="isRegistered">
      <h1 class="title">
        Thanks!
      </h1>

      <div class="row">
        We just sent an email with a confirmation link to <b>{{ form.email }}</b>.
      </div>

      <div class="row">
        Please follow the instructions from the email to complete a sign up
        process.
      </div>

      <div
        v-if="signupToken"
        class="links"
      >
        <div class="row">
          You look like a cool developer.
          <a :href="verifyUrl"> Verify email </a>
        </div>
      </div>
    </template>

    <template v-else>
      <a-form
        ref="signUpForm"
        :model="form"
        :rules="rules"
        @finish="handleSumbit"
      >
        <h1 class="title">
          Sign Up
        </h1>

        <p
          v-if="formErrors.email"
          class="common-error"
        >
          {{ formErrors.email }}
        </p>

        <a-form-item name="firstName">
          <a-input
            v-model:value="form.firstName"
            placeholder="First Name"
            autocomplete="off"
          />
        </a-form-item>

        <a-form-item name="lastName">
          <a-input
            v-model:value="form.lastName"
            placeholder="Last Name"
            autocomplete="off"
          />
        </a-form-item>

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
            Sign Up
          </a-button>
        </a-form-item>
      </a-form>

      <div class="links">
        <div class="row">
          Already have an account?
          <router-link :to="{ name: 'signIn' }">
            Sign in
          </router-link>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import config from '@/config';

  import { formatErrors, userRules } from '@/helpers/formValidation';

  export default {
    data() {
      return {
        form: {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
        },
        isRegistered: false,
        isLoading: false,
        errors: null,
        rules: userRules,
      };
    },

    computed: {
      formErrors() {
        return formatErrors(this.errors);
      },

      verifyUrl() {
        return this.signupToken
          ? `${config.apiUrl}/account/verify-email?token=${this.signupToken}`
          : null;
      },
    },

    methods: {
      ...mapActions('user', ['signUp']),

      async handleSubmit() {
        try {
          this.isLoading = true;
          const { signupToken } = await this.signUp(this.form);
          if (signupToken) {
            this.signupToken = signupToken;
            this.isRegistered = true;
          }
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
