<template>
  <div class="container">
    <a-form
      ref="resetPasswordForm"
      :rules="rules"
      :model="form"
      @finish="handleSubmit"
    >
      <h1 class="title">
        Reset Password
      </h1>

      <p
        v-if="formErrors.token"
        class="common-error"
      >
        {{ formErrors.token }}
      </p>

      <p>Please choose your new password</p>

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
          Save New Password
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  import { formatErrors, userRules } from '@/helpers/formValidation';

  export default {
    data() {
      return {
        token: null,
        isLoading: false,
        errors: null,
        form: {
          password: '',
        },
        rules: {
          password: userRules.password,
        },
      };
    },

    computed: {
      formErrors() {
        return formatErrors(this.errors);
      },
    },

    created() {
      const searchParams = new URLSearchParams(window.location.search);
      const token = searchParams.get('token');

      if (!token) {
        this.$router.replace({ name: 'notFound' });
        return;
      }
      this.token = token;
    },

    methods: {
      ...mapActions('user', ['reset']),

      async handleSubmit() {
        try {
          this.isLoading = true;
          const data = { password: this.form.password, token: this.token };
          await this.reset(data);
          this.$router.replace({ name: 'signIn' });
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
  }
</style>
