<template>
  <div>
    <v-alert
      v-model="displayLoginError"
      type="error"
      dismissible
      class="mx-7 mt-2 error-alert"
    >{{ loginError }}</v-alert>
    <v-form ref="staffLoginForm" v-model="valid" class="login-form" name="login" lazy-validation>
      <v-container>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="College Email"
          prepend-inner-icon="mdi-account"
          class="px-7"
          type="email"
          required
          color="purple"
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="password"
          prepend-inner-icon="mdi-lock"
          class="px-7"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show ? 'text' : 'password'"
          @click:append="show = !show"
          required
          color="purple"
        ></v-text-field>
        <p
          id="forgot-password"
          class="text-center purple--text"
          @click="ForgotStaffPassword"
        >Forgot password?</p>
        <div class="px-5 text-center">
          <v-btn
            rounded
            large
            depressed
            :loading="isLoading"
            ripple
            width="400"
            class="yellow font-weight-bold"
            type="submit"
            @click="login"
          >
            <v-icon>mdi-subdirectory-arrow-right</v-icon>
            <span>&nbsp;Login</span>
          </v-btn>
        </div>
      </v-container>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "staff-login-form",
  data: () => ({
    valid: true,
    loading: false,
    show: false,
    displayLoginError: false,
    email: "",
    emailRules: [
      emailField =>
        /.+@+/.test(emailField) || "Please enter a valid college email"
    ],
    password: "",
    passwordRules: len => [
      passwordField =>
        (passwordField || "").length >= len ||
        `Invalid character length, required ${len}`,
      password => !!password || "Password is required"
    ],
    required: [field => !!field || "This field is required"]
  }),
  methods: {
    login() {
      event.preventDefault();
      if (this.$refs.staffLoginForm.validate()) {
        this.$store
          .dispatch("login", {
            user: "staff",
            credentials: {
              email: this.email,
              password: this.password
            }
          })
          .then(() => {
            if (this.isLogged) {
              if (this.$route.params.continue != null) {
                this.$router.push(this.$route.params.continue);
              } else {
                const user = this.user;
                this.$router.push({
                  name: `${user.role}-dashboard`
                });
              }
            } else {
              this.displayLoginError = true;
            }
          })
          .catch(error => {
            console.log("Generic message: ", error);
          });
      }
    },
    ForgotStaffPassword() {
      this.$router.push("/forgot-password");
    }
  },
  computed: {
    isLogged() {
      return this.$store.getters.isLoggedIn;
    },
    user() {
      return this.$store.getters.user;
    },
    isLoading() {
      return this.$store.getters.isLoading;
    },
    loginError() {
      return this.$store.getters.loginError;
    }
  }
};
</script>

<style>
.error-alert {
  border-radius: 2rem !important;
  height: 3.4rem;
}
#forgot-password {
  cursor: pointer;
}
</style>
