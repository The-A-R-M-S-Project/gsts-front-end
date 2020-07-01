<template>
  <div>
    <v-alert
      v-model="displayResetError"
      type="error"
      dismissible
      class="mx-7 mt-2 reset-error error-alert"
    >
      <span>
        {{ resetPasswordError }}. Click
        <span
          class="yellow--text forgot-link"
          @click="getAnotherLink"
        >here</span> to get a link
      </span>
    </v-alert>
    <v-form ref="resetPasswordForm" v-model="valid" lazy-validation>
      <v-container>
        <v-text-field
          v-model="password"
          :rules="passwordRules(8)"
          label="Password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          @click:append="showPassword = !showPassword"
          prepend-inner-icon="mdi-lock"
          height="28"
          color="purple"
          class="px-7"
          required
        ></v-text-field>
        <v-text-field
          v-model="passwordConfirm"
          label="Confirm Password"
          :rules="passwordConfirmRules"
          :append-icon="showConfirm ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showConfirm ? 'text' : 'password'"
          @click:append="showConfirm = !showConfirm"
          prepend-inner-icon="mdi-lock"
          height="28"
          color="purple"
          class="px-7"
          required
        ></v-text-field>
        <div class="px-5 text-center">
          <v-btn
            rounded
            large
            width="400"
            depressed
            :loading="isLoading"
            ripple
            class="yellow font-weight-bold mt-2"
            type="submit"
            @click="submitEmail"
          >
            <v-icon>mdi-restore</v-icon>
            <span>&nbsp;Reset</span>
          </v-btn>
        </div>
      </v-container>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "reset-password-form",
  data() {
    return {
      valid: true,
      loading: false,
      displayResetError: false,
      showPassword: false,
      showConfirm: false,
      password: "",
      passwordRules: len => [
        passwordField =>
          (passwordField || "").length >= len ||
          `Invalid password length, requires ${len} characters`
      ],
      passwordConfirm: "",
      passwordConfirmRules: [
        passwordField =>
          passwordField === this.password || `Passwords do not match!`
      ],
      required: [field => !!field || "This field is required"]
    };
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    },
    resetPasswordError() {
      return this.$store.getters.resetPasswordError;
    },
    isLogged() {
      return this.$store.getters.isLoggedIn;
    },
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    submitEmail() {
      event.preventDefault();
      let token = this.$route.query.reset_password_token;
      if (this.$refs.resetPasswordForm.validate()) {
        let resetPassword = {
          password: this.password,
          passwordConfirm: this.passwordConfirm
        };
        let userRole = this.setUserRole();
        this.$store
          .dispatch("resetPassword", {
            role: userRole,
            passwords: resetPassword,
            resetToken: token
          })
          .then(() => {
            if (this.isLogged) {
              const user = this.user;
              this.$router.push({
                name: `${user.role}-dashboard`
              });
            } else {
              this.displayResetError = true;
            }
          });
      }
    },
    setUserRole() {
      if (this.$route.params.role == "student") return "student";
      return "staff";
    },
    getAnotherLink() {
      this.$router.push(`/forgot-${this.setUserRole()}-password`);
    }
  }
};
</script>

<style>
.reset-error {
  font-size: 1rem !important;
}
.forgot-link {
  cursor: pointer;
}
</style>