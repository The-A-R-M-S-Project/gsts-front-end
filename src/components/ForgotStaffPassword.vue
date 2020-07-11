<template>
  <section>
    <v-alert
      v-model="displayForgotStaffPasswordError"
      type="error"
      dismissible
      class="mx-7 mt-2 reset-error error-alert"
      :class="{'mobile-error': $vuetify.breakpoint.xs}"
    >{{ forgotStaffPasswordError }}</v-alert>
    <v-form ref="forgotStaffPasswordForm" v-model="valid" lazy-validation>
      <v-container class="d-none d-sm-block">
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="College Email"
          prepend-inner-icon="mdi-account"
          type="email"
          class="px-7"
          required
          color="purple"
        ></v-text-field>
        <div class="px-5 py-2 text-center">
          <v-btn
            rounded
            large
            depressed
            :loading="isLoading"
            ripple
            width="400"
            class="yellow font-weight-bold"
            type="submit"
            @click="submitEmail"
          >
            <v-icon>mdi-check-bold</v-icon>
            <span>&nbsp;Send Password Reset Link</span>
          </v-btn>
        </div>
      </v-container>
      <v-container class="d-block d-sm-none">
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="College Email"
          prepend-inner-icon="mdi-account"
          type="email"
          class="styled-input normal-text"
          required
          clearable
          color="purple"
        ></v-text-field>
        <div class="px-5 py-2 text-center">
          <v-btn
            rounded
            large
            depressed
            :loading="isLoading"
            ripple
            height="3rem"
            width="100%"
            class="yellow font-weight-bold"
            type="submit"
            @click="submitEmail"
          >
            <v-icon>mdi-check-bold</v-icon>
            <span>&nbsp;Send Reset Link</span>
          </v-btn>
        </div>
      </v-container>
    </v-form>
  </section>
</template>

<script>
export default {
  name: "forgot-staff-password",
  data() {
    return {
      valid: true,
      loading: false,
      displayForgotStaffPasswordError: false,
      email: "",
      emailRules: [
        emailField =>
          /.+@+/.test(emailField) || "Please enter a valid college email"
      ],
      required: [field => !!field || "This field is required"]
    };
  },
  methods: {
    submitEmail() {
      event.preventDefault();
      if (this.$refs.forgotStaffPasswordForm.validate()) {
        let resetEmail = {
          email: this.email
        };
        this.$store.dispatch("requestStaffResetLink", resetEmail).then(() => {
          if (this.forgotStaffPasswordError) {
            this.displayForgotStaffPasswordError = true;
          }
        });
      }
    }
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    },
    forgotStaffPasswordError() {
      return this.$store.getters.forgotStaffPasswordError;
    }
  }
};
</script>