<template>
  <v-container class="register" fluid fill-height>
    <v-row align="center" justify="center">
      <v-card max-width="90%" class="elevation-24">
        <v-row no-gutters>
          <v-col md="5">
            <v-container class="text-center" fill-height overlayed>
              <v-row>
                <v-col class="px-4 py-2">
                  <h1 class="display-3 font-weight-light">Welcome</h1>
                  <p class="mt-5 mb-4">
                    To keep track of your report please
                    login with your personal information
                  </p>
                  <v-btn rounded large depressed to="/" class="register__login-btn grey">
                    <v-icon>mdi-subdirectory-arrow-right</v-icon>
                    <span>&nbsp;Login</span>
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
          <v-col md="7">
            <v-container>
              <v-form ref="registerForm" v-model="valid">
                <h2 class="headline py-2 text-center">Register</h2>
                <v-alert
                  v-model="displaySignUpError"
                  type="error"
                  dismissible
                  class="mx-7 mt-2 error-alert"
                >{{ signupError }}</v-alert>
                <v-container class="container px-8 text-center">
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="firstName"
                        label="First name"
                        :rules="nameRules"
                        prepend-inner-icon="mdi-account"
                        height="28"
                        color="purple"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col>
                      <v-text-field
                        v-model="lastName"
                        label="Last name"
                        :rules="nameRules"
                        prepend-inner-icon="mdi-account"
                        height="28"
                        color="purple"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-text-field
                    v-model="email"
                    label="Email"
                    :rules="emailRules"
                    required
                    prepend-inner-icon="mdi-account"
                    height="28"
                    color="purple"
                  ></v-text-field>
                  <v-text-field
                    v-model="phoneNumber"
                    label="Phone Number e.g +2567... or 07..."
                    :rules="phoneNumberRules"
                    required
                    prepend-inner-icon="mdi-phone"
                    height="28"
                    color="purple"
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    :rules="passwordRules(8)"
                    label="Password"
                    required
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword ? 'text' : 'password'"
                    @click:append="showPassword = !showPassword"
                    prepend-inner-icon="mdi-lock"
                    height="28"
                    color="purple"
                  ></v-text-field>
                  <v-text-field
                    v-model="passwordConfirm"
                    label="Confirm Password"
                    :rules="passwordConfirmRules"
                    required
                    :append-icon="showConfirm ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showConfirm ? 'text' : 'password'"
                    @click:append="showConfirm = !showConfirm"
                    prepend-inner-icon="mdi-lock"
                    height="28"
                    color="purple"
                  ></v-text-field>
                  <div class="mx-5">
                    <v-btn
                      type="submit"
                      large
                      width="400"
                      rounded
                      :loading="isLoading"
                      depressed
                      ripple
                      class="yellow font-weight-bold"
                      @click="register"
                    >
                      <v-icon>mdi-account-plus</v-icon>
                      <span>&nbsp;Register</span>
                    </v-btn>
                  </div>
                </v-container>
              </v-form>
            </v-container>
          </v-col>
        </v-row>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      firstName: "",
      showPassword: false,
      showConfirm: false,
      loading: false,
      displaySignUpError: false,
      lastName: "",
      email: "",
      emailRules: [
        emailField => /.+@+/.test(emailField) || "Please enter a valid email"
      ],
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
      nameRules: [name => !!name || "This field is required"],
      valid: true,
      phoneNumber: "",
      phoneNumberRules: [
        phoneNumberField =>
          /^(\+2567)[0-9]{8}|^(07)[0-9]{8}/.test(phoneNumberField) ||
          "Please enter a valid phone Number"
      ]
    };
  },
  methods: {
    register() {
      event.preventDefault();
      if (this.$refs.registerForm.validate()) {
        this.$store
          .dispatch("register", {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
            passwordConfirm: this.passwordConfirm,
            phoneNumber: this.phoneNumber
          })
          .then(() => {
            if (this.isLogged) {
              if (this.$route.params.continue != null) {
                this.$router.push(this.$route.params.continue);
              } else {
                const user = this.user;
                this.$router.push({ name: `${user.role}-dashboard` });
              }
            } else {
              this.displaySignUpError = true;
            }
          });
      }
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
    signupError() {
      return this.$store.getters.signupError;
    }
  }
};
</script>
<style lang="scss">
.register {
  &__login-btn {
    opacity: 0.65;
    width: 80%;
    margin: auto;
    font-weight: bold;
  }
  .alert {
    color: red;
    border: solid red 1px;
    border-radius: 10px;
    margin-bottom: 0.5rem;
  }
}
</style>