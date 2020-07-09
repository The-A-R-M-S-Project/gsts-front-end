<template>
  <div>
    <v-alert
      v-model="displayLoginError"
      type="error"
      dismissible
      class="mx-7 mt-2 error-alert"
      :class="{ 'normal-text': $vuetify.breakpoint.xs }"
    >{{ loginError }}</v-alert>
    <v-form ref="studentLoginForm" v-model="valid" class="login-form" name="login">
      <v-container>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="College Email"
          prepend-inner-icon="mdi-account"
          :class="{
                        'pt-5 px-2 styled-input normal-text':
                            $vuetify.breakpoint.xs,
                        'px-7': !$vuetify.breakpoint.xs,
                    }"
          type="email"
          color="purple"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Password"
          prepend-inner-icon="mdi-lock"
          :class="{
                        'pt-5 px-2 styled-input normal-text':
                            $vuetify.breakpoint.xs,
                        'px-7': !$vuetify.breakpoint.xs,
                    }"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show ? 'text' : 'password'"
          @click:append="show = !show"
          color="purple"
          required
        ></v-text-field>
        <p
          id="forgot-staff-password"
          class="text-center purple--text"
          :class="{ 'pt-1 pb-4 normal-text': $vuetify.breakpoint.xs }"
          @click="forgotStudentPassword"
        >Forgot password?</p>
        <div class="px-5 text-center">
          <v-btn
            rounded
            large
            depressed
            ripple
            width="400"
            :loading="isLoading"
            class="yellow font-weight-bold d-none d-sm-inline-block"
            type="submit"
            v-on:click="login"
          >
            <v-icon>mdi-subdirectory-arrow-right</v-icon>
            <span>&nbsp;Login</span>
          </v-btn>
          <v-btn
            rounded
            large
            depressed
            :loading="isLoading"
            ripple
            width="100%"
            height="3rem"
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
  name: "student-login-form",
  data: () => ({
    valid: true,
    show: false,
    displayLoginError: false,
    loading: false,
    email: "",
    emailRules: [
      emailField =>
        /.+@+/.test(emailField) || "Please enter a valid college email"
    ],
    password: "",
    passwordRules: len => [
      passwordField =>
        (passwordField || "").length >= len ||
        `Invalid character length, required ${len}`
    ],
    required: [field => !!field || "This field is required"]
  }),
  methods: {
    login() {
      event.preventDefault();
      if (this.$refs.studentLoginForm.validate()) {
        this.$store
          .dispatch("login", {
            user: "student",
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
            console.log("Generic message", error);
          });
      }
    },
    forgotStudentPassword() {
      this.$router.push("/forgot-student-password");
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
