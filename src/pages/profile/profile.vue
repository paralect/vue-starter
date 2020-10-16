<template>
  <div class="container">
    <a-form
      ref="profileForm"
      :model="form"
      :rules="rules"
      @finish="handleSubmit"
    >
      <h1 class="title">
        Profile
      </h1>

      <p
        v-if="formErrors.email"
        class="common-error"
      >
        {{ formErrors.email }}
      </p>

      <a-form-item
        name="firstName"
        label="First Name"
      >
        <a-input
          v-model:value="form.firstName"
          autocomplete="off"
        />
      </a-form-item>

      <a-form-item
        name="lastName"
        label="Last Name"
      >
        <a-input
          v-model:value="form.lastName"
          autocomplete="off"
        />
      </a-form-item>

      <a-form-item
        name="email"
        label="Email"
      >
        <a-input
          v-model:value="form.email"
          autocomplete="off"
        />
      </a-form-item>

      <a-form-item class="buttons">
        <a-button
          class="cancel-button"
          :disabled="isLoading"
          @click="handleCancel"
        >
          Cancel
        </a-button>

        <a-button
          type="primary"
          html-type="submit"
          class="save-button"
          :disabled="isLoading"
        >
          Save
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  import { formatErrors, userRules } from '@/helpers/formValidation';

  export default {
    data() {
      return {
        form: {
          firstName: '',
          lastName: '',
          email: '',
        },
        rules: {
          firstName: userRules.firstName,
          lastName: userRules.lastName,
          email: userRules.email,
        },
      };
    },

    computed: {
      ...mapGetters('user', ['user', 'isLoading', 'errors']),

      formErrors() {
        return formatErrors(this.errors);
      },
    },

    watch: {
      errors(newErrors) {
        if (newErrors && newErrors._global) {
          this.$message.error(newErrors._global.join(', '));
        }
      },
    },

    created() {
      this.updateForm();
    },

    methods: {
      ...mapActions('user', ['updateCurrentUser', 'setErrors']),

      updateForm() {
        const { firstName, lastName, email } = this.user;
        this.form.firstName = firstName;
        this.form.lastName = lastName;
        this.form.email = email;
      },

      handleCancel() {
        this.updateForm();
        this.$refs.profileForm.resetFields();
        this.setErrors(null);
      },

      async handleSubmit() {
        try {
          await this.updateCurrentUser(this.form);
          if (!this.errors) {
            this.$message.success('User info updated!');
          }
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

    & .title {
      margin: 0;
      margin-bottom: 32px;
    }

    & .common-error {
      color: #f44336;
    }

    & .buttons {
      & .cancel-button {
        margin-right: 12px;
      }
    }
  }
</style>
