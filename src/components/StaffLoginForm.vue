<template>
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
        :rules="passwordRules(8)"
        counter="8"
        label="password"
        prepend-inner-icon="lock"
        type="password"
        required
        color="purple"
      ></v-text-field>
      <div class="px-5">
        <v-btn
          round
          large
          block
          depressed
          ripple
          class="yellow font-weight-bold"
          type="submit"
          v-on:click="submitForm"
        >
          <v-icon>subdirectory_arrow_right</v-icon>
          <span>&nbsp;Login</span>
        </v-btn>
      </div>
    </v-container>
  </v-form>
</template>
<script>
export default {
  name: "staff-login-form",
  data: () => ({
    form: false,
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
    submitForm(event) {
      event.preventDefault();
      if (!this.password == "" && !this.email == "") {
        this.$http
          .post(
            "https://arms-graduate-student-tracker.herokuapp.com/api/lecturer/login",
            {
              email: this.email,
              password: this.password
            }
          )
          .then(response => {
            console.log({ response });
            localStorage.setItem(
              "user",
              JSON.stringify(response.data.data.user)
            );
            localStorage.setItem("jwt", response.data.token);

            if (localStorage.getItem("jwt") != null) {
              this.$emit("loggedIn");
              if (localStorage.getItem("user").role == "principal") {
                this.$emit("is-admin");
              }
              // if (this.$route.params.nextUrl != null) {
              //   this.$router.push(this.$route.params.nextUrl);
              // } else {
              //   if (is_admin == 1) {
              //     this.$router.push("admin");
              //   } else {
              //     this.$router.push("dashboard");
              //   }
              // }
            }
          })
          .catch(err => {
            console.log("The error is", err);
          });
      } else {
        alert("Please provide both email and password to log in");
      }
    }
  }
};
</script>