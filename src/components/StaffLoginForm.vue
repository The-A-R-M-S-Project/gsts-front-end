<template>
  <div>
    <v-form ref="form" v-model="form" class="login-form" name="login">
      <v-container>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="College Email"
          prepend-inner-icon="person"
          type="email"
          required
          color="purple"
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="password"
          prepend-inner-icon="lock"
          :append-icon="show ? 'visibility' : 'visibility_off'"
          :type="show ? 'text' : 'password'"
          @click:append="show = !show"
          required
          color="purple"
        ></v-text-field>
        <div class="px-5">
          <v-btn
            round
            large
            block
            depressed
            :loading="isLoading"
            ripple
            class="yellow font-weight-bold"
            type="submit"
            @click="login"
          >
            <v-icon>subdirectory_arrow_right</v-icon>
            <span>&nbsp;Login</span>
          </v-btn>
        </div>
      </v-container>
    </v-form>
    <Alert :show="message" />
  </div>
</template>

<script>
import Alert from "@/components/Alert.vue";

export default {
  name: "staff-login-form",
  components: {
    Alert
  },
  data: () => ({
    form: false,
    loading: false,
    message: false,
    show: false,
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
      if (!this.password == "" && !this.email == "") {
        this.$store
          .dispatch("login", {
            email: this.email,
            password: this.password
          })
          .then(() => {
            if (this.isLogged) {
              if (this.$route.params.continue != null) {
                this.$router.push(this.$route.params.continue);
              } else {
                const user = this.user;
                this.$router.push({ name: `${user.role}-dashboard` });
              }
            }
          })
          .catch(error => {
            this.message = true;
            console.log(error);
            console.log(this.loginError);
          });
      } else {
        alert("Please provide both email and password to log in!");
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
    loginError() {
      return this.$store.getters.loginError;
    }
  }
};
</script>