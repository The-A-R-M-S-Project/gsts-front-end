<template>
  <section>
    <v-alert
      v-model="displayForgotStaffPasswordError"
      type="error"
      dismissible
      class="mx-7 mt-2 reset-error error-alert"
    >{{ ForgotStaffPasswordError }}</v-alert>
    <v-form ref="ForgotStaffPasswordForm" v-model="valid" lazy-validation>
      <v-container>
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
            @click="submitEmail"
          >
            <v-icon>mdi-check-bold</v-icon>
            <span>&nbsp;Send Password Reset Link</span>
          </v-btn>
        </div>
      </v-container>
    </v-form>
  </section>
</template>

<script>
export default {
  name: "staff-login-form",
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
      if (this.$refs.ForgotStaffPasswordForm.validate()) {
        let resetEmail = {
          email: this.email
        };
        this.$store.dispatch("requestResetLink", resetEmail).then(() => {
          if (this.ForgotStaffPasswordError) {
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
    ForgotStaffPasswordError() {
      return this.$store.getters.ForgotStaffPasswordError;
    }
  }
};
</script>

<style>
.alert {
  color: red;
  border: solid red 1px;
  border-radius: 1rem;
  padding: 0.4rem;
}
</style>
