<template>
  <div>
    <v-alert
      v-model="displayLoginError"
      type="error"
      dismissible
      class="mx-7 mt-2 text-center"
      :class="{
        'button-text mobile-error': $vuetify.breakpoint.xs,
        'error-alert': !$vuetify.breakpoint.xs,
      }"
      >{{ loginError }}</v-alert
    >
    <v-form ref="staffLoginForm" v-model="valid" name="login" lazy-validation>
      <v-container>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="College Email"
          placeholder="example@cedat.mak.ac.ug"
          prepend-inner-icon="mdi-account"
          :class="{
            'pt-5 px-2 styled-input normal-text': $vuetify.breakpoint.xs,
            'px-7': !$vuetify.breakpoint.xs,
          }"
          type="email"
          clearable
          height="2rem"
          required
          color="purple"
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Password"
          prepend-inner-icon="mdi-lock"
          :class="{
            'pt-5 px-2 styled-input normal-text': $vuetify.breakpoint.xs,
            'px-7': !$vuetify.breakpoint.xs,
          }"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show ? 'text' : 'password'"
          @click:append="show = !show"
          required
          color="purple"
        ></v-text-field>
        <p
          id="forgot-staff-password"
          class="text-center purple--text"
          :class="{ 'pt-1 pb-4 normal-text': $vuetify.breakpoint.xs }"
          @click="forgotStaffPassword"
        >
          Forgot password?
        </p>
        <div class="px-5 text-center">
          <v-btn
            rounded
            large
            depressed
            :loading="isLoading"
            ripple
            width="400"
            class="yellow font-weight-bold d-none d-sm-inline-block"
            type="submit"
            @click="login"
          >
            <v-icon class>mdi-subdirectory-arrow-right</v-icon>
            <span>&nbsp;Login</span>
          </v-btn>
          <v-btn
            rounded
            large
            depressed
            width="100%"
            :loading="isLoading"
            height="3rem"
            ripple
            class="yellow font-weight-bold mb-4 button-text d-flex d-sm-none"
            type="submit"
            @click="login"
          >
            <v-icon size="2rem">mdi-subdirectory-arrow-right</v-icon>
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
      (email) => !!email || "E-mail is required",
      (email) =>
        /.+@cedat\.mak\.ac\.ug/.test(email) || "Please enter a valid email",
    ],
    password: "",
    passwordRules: (len) => [
      (passwordField) =>
        (passwordField || "").length >= len ||
        `Invalid character length, required ${len}`,
      (password) => !!password || "Password is required",
    ],
    required: [(field) => !!field || "This field is required"],
  }),
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
    },
  },
  methods: {
    login() {
      event.preventDefault();
      if (this.$refs.staffLoginForm.validate()) {
        this.$store
          .dispatch("login", {
            user: "staff",
            credentials: {
              email: this.email,
              password: this.password,
            },
          })
          .then(() => {
            if (this.isLogged) {
              if (this.$route.params.continue != null) {
                this.$router.push(this.$route.params.continue);
              } else {
                const user = this.user;
                this.$router.push({
                  name: `${user.role}-dashboard`,
                });
              }
            } else {
              this.displayLoginError = true;
            }
          });
      }
    },
    forgotStaffPassword() {
      this.$router.push("/forgot-staff-password");
    },
  },
};
</script>

<style>
.error-alert {
  border-radius: 2rem !important;
  height: 3.4rem;
}
#forgot-staff-password {
  cursor: pointer;
}
</style>
