<template>
  <div :class="{ 'auth-pages': !$vuetify.breakpoint.xs }">
    <v-container class="register d-none d-sm-flex" fluid fill-height>
      <v-row align="center" justify="center">
        <v-card max-width="90%" class="elevation-24">
          <v-row no-gutters>
            <v-col md="5">
              <v-container class="text-center overlayed" fill-height>
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
                    class="mx-7 mt-2 error-alert text-center"
                  >{{signupError}}</v-alert>
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
                      prepend-inner-icon="mdi-email"
                      height="28"
                      color="purple"
                    ></v-text-field>
                    <v-autocomplete
                      v-model="program"
                      :items="programs"
                      item-text="name"
                      prepend-inner-icon="mdi-school"
                      label="Select your program"
                      single-line
                      height="28"
                      :rules="nameRules"
                      return-object
                      color="purple"
                    ></v-autocomplete>
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
                      :append-icon="
                                                showPassword
                                                    ? 'mdi-eye'
                                                    : 'mdi-eye-off'
                                            "
                      :type="
                                                showPassword
                                                    ? 'text'
                                                    : 'password'
                                            "
                      @click:append="
                                                showPassword = !showPassword
                                            "
                      prepend-inner-icon="mdi-lock"
                      height="28"
                      color="purple"
                    ></v-text-field>
                    <v-text-field
                      v-model="passwordConfirm"
                      label="Confirm Password"
                      :rules="passwordConfirmRules"
                      required
                      :append-icon="
                                                showConfirm
                                                    ? 'mdi-eye'
                                                    : 'mdi-eye-off'
                                            "
                      :type="
                                                showConfirm
                                                    ? 'text'
                                                    : 'password'
                                            "
                      @click:append="
                                                showConfirm = !showConfirm
                                            "
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
    <v-container class="d-block d-sm-none">
      <v-form ref="registerForm" v-model="valid" class="text-center">
        <v-row justify="start" align="center" class="pt-4" no-gutters>
          <v-col cols="1">
            <v-btn to="/" icon>
              <v-icon large color="black">mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="11">
            <h2 class="sub-heading custom-font-family py-2">Register</h2>
          </v-col>
        </v-row>

        <v-alert
          v-model="displaySignUpError"
          type="error"
          dismissible
          class="mx-3 mt-2 mobile-error button-text text-center"
        >{{ signupError }}</v-alert>
        <v-container class="text-center">
          <v-row no-gutters>
            <v-col cols="12" xs="12">
              <v-text-field
                v-model="firstName"
                label="First name"
                :rules="nameRules"
                prepend-inner-icon="mdi-account"
                height="2rem"
                class="styled-input normal-text"
                color="purple"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" xs="12">
              <v-text-field
                v-model="lastName"
                label="Last name"
                :rules="nameRules"
                prepend-inner-icon="mdi-account"
                class="mt-5 styled-input normal-text"
                height="2rem"
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
            prepend-inner-icon="mdi-email"
            class="mt-5 styled-input normal-text"
            height="2rem"
            color="purple"
          ></v-text-field>
          <v-autocomplete
            v-model="program"
            :items="programs"
            item-text="name"
            hide-details
            prepend-inner-icon="mdi-school"
            label="Select your program"
            single-line
            :rules="nameRules"
            return-object
            color="purple"
          ></v-autocomplete>
          <v-text-field
            v-model="phoneNumber"
            label="Phone Number e.g +2567... or 07..."
            :rules="phoneNumberRules"
            required
            prepend-inner-icon="mdi-phone"
            class="mt-5 styled-input normal-text"
            height="2rem"
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
            class="mt-5 styled-input normal-text"
            prepend-inner-icon="mdi-lock"
            height="2rem"
            color="purple"
          ></v-text-field>
          <v-text-field
            v-model="passwordConfirm"
            label="Confirm Password"
            :rules="passwordConfirmRules"
            required
            :append-icon="showConfirm ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showConfirm ? 'text' : 'password'"
            class="mt-5 styled-input normal-text"
            @click:append="showConfirm = !showConfirm"
            prepend-inner-icon="mdi-lock"
            height="2rem"
            color="purple"
          ></v-text-field>
          <div class="text-center my-6">
            <v-btn
              type="submit"
              large
              width="85%"
              rounded
              height="3rem"
              :loading="isLoading"
              depressed
              ripple
              class="yellow button-text font-weight-bold"
              @click="register"
            >
              <v-icon size="2rem">mdi-account-plus</v-icon>
              <span>&nbsp;Register</span>
            </v-btn>
          </div>
        </v-container>
      </v-form>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      firstName: "",
      program: "",
      showPassword: false,
      showConfirm: false,
      loading: false,
      displaySignUpError: false,
      lastName: "",
      email: "",
      emailRules: [
        (emailField) =>
          /.+@cedat\.mak\.ac\.ug/.test(emailField) ||
          "Please enter a valid email",
      ],
      password: "",
      passwordRules: (len) => [
        (passwordField) =>
          (passwordField || "").length >= len ||
          `Invalid password length, requires ${len} characters`,
      ],
      passwordConfirm: "",
      passwordConfirmRules: [
        (passwordField) =>
          passwordField === this.password || `Passwords do not match!`,
      ],
      nameRules: [(name) => !!name || "This field is required"],
      valid: true,
      phoneNumber: "",
      phoneNumberRules: [
        (phoneNumberField) =>
          /^(\+2567)[0-9]{8}|^(07)[0-9]{8}/.test(phoneNumberField) ||
          "Please enter a valid phone Number",
      ],
    };
  },
  created() {
    this.$store.dispatch("fetchPrograms");
  },
  computed: {
    programs() {
      return this.$store.getters.programs;
    },
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
    },
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
            program: this.program._id,
            password: this.password,
            passwordConfirm: this.passwordConfirm,
            phoneNumber: this.phoneNumber,
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
              this.displaySignUpError = true;
            }
          });
      }
    },
    showProgram() {
      console.log(this.program);
    },
  },
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
}
.overlayed {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url("~@/assets/img/login-2.jpg");
  position: relative;
  color: white;
  background-position: center;
}
.auth-pages {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;
  padding: 12px;
  margin-right: auto;
  margin-left: auto;
}
</style>
