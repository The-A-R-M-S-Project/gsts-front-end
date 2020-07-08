<template>
  <section>
    <v-alert
      v-model="displayForgotStudentPasswordError"
      type="error"
      dismissible
      class="mx-7 mt-2 reset-error error-alert"
      :class="{'mobile-error': $vuetify.breakpoint.xs}"
    >{{ forgotStudentPasswordError }}</v-alert>
    <v-form ref="ForgotStudentPasswordForm" v-model="valid" lazy-validation>
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
            type="submit"
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
      <v-container class="d-inline-block d-sm-none">
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="College Email"
          prepend-inner-icon="mdi-account"
          type="email"
          class="styled-input sub-heading mx-2"
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
            width="100%"
            class="yellow font-weight-bold"
            type="submit"
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
  name: "forgot-student-password",
  data() {
    return {
      valid: true,
      loading: false,
      displayForgotStudentPasswordError: false,
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
      if (this.$refs.ForgotStudentPasswordForm.validate()) {
        let resetEmail = {
          email: this.email
        };
        this.$store.dispatch("requestStudentResetLink", resetEmail).then(() => {
          if (this.forgotStudentPasswordError) {
            this.displayForgotStudentPasswordError = true;
          }
        });
      }
    }
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    },
    forgotStudentPasswordError() {
      return this.$store.getters.forgotStudentPasswordError;
    }
  }
};
</script>