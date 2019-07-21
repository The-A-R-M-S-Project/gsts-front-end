<template>
  <v-container text-xs-center fluid fill-height class="register">
    <v-layout align-center justify-center>
      <v-card min-width="90%" class="elevation-24">
        <v-layout row wrap>
          <v-flex sm5>
            <v-container fill-height pa-0 overlayed>
              <v-layout align-center>
                <v-flex px-4 py-2>
                  <h1 class="display-3 font-weight-light">Welcome</h1>
                  <p class="mt-5 mb-4">
                    To keep track of your report please
                    login with your personal information
                  </p>
                  <v-btn round large depressed block to="/" class="register__login-btn grey">login</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
          <v-flex sm7>
            <v-container>
              <v-form v-model="valid">
                <v-container class="container">
                  <h2 class="headline custom-font-family">Register</h2>
                  <v-layout>
                    <v-flex>
                      <v-text-field
                        v-model="firstName"
                        :counter="10"
                        label="First name"
                        required
                        prepend-inner-icon="person"
                        height="28"
                        color="purple"
                      ></v-text-field>
                    </v-flex>

                    <v-flex>
                      <v-text-field
                        v-model="lastName"
                        :counter="10"
                        label="Last name"
                        required
                        prepend-inner-icon="person"
                        height="28"
                        color="purple"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                  <v-text-field
                    v-model="email"
                    label="Email"
                    :rules="emailRules"
                    required
                    prepend-inner-icon="person"
                    height="28"
                    color="purple"
                  ></v-text-field>
                  <v-text-field
                    v-model="phoneNumber"
                    label="Phone Number e.g +2567... or 07..."
                    :rules="phoneNumberRules"
                    required
                    prepend-inner-icon="phone"
                    height="28"
                    color="purple"
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    :rules="passwordRules(8)"
                    label="Password"
                    required
                    type="password"
                    prepend-inner-icon="lock"
                    height="28"
                    color="purple"
                  ></v-text-field>
                  <v-text-field
                    v-model="passwordConfirm"
                    label="Confirm Password"
                    :rules="passwordConfirmRules"
                    required
                    type="password"
                    prepend-inner-icon="lock"
                    height="28"
                    color="purple"
                  ></v-text-field>
                  <div class="mx-5">
                    <v-btn
                      type="submit"
                      light
                      large
                      round
                      block
                      depressed
                      ripple
                      class="yellow font-weight-bold"
                      v-on:click="handleSubmit"
                    >
                      <v-icon>person_add</v-icon>
                      <span>&nbsp;Register</span>
                    </v-btn>
                  </div>
                </v-container>
              </v-form>
            </v-container>
          </v-flex>
        </v-layout>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      firstName: "",
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
      nameRules: [],
      valid: "",
      phoneNumber: "",
      phoneNumberRules: [
        phoneNumberField =>
          /^(\+2567)[0-9]{8}|^(07)[0-9]{8}/.test(phoneNumberField) ||
          "Please enter a valid phone Number"
      ]
    };
  },
  methods: {
    handleSubmit(event) {
      event.preventDefault();
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
}
</style>


