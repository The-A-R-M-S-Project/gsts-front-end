<template>
  <v-form ref="form" v-model="form" class="login-form" name="login">
    <v-container>
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="College Email"
        prepend-inner-icon="person"
        type="email"
        color="purple"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        :rules="passwordRules(8)"
        counter="8"
        label="password"
        prepend-inner-icon="lock"
        type="password"
        color="purple"
        required
      ></v-text-field>
      <div class="px-5">
        <v-btn
          block
          round
          large
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
  name: "student-login-form",
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
            "https://arms-graduate-student-tracker.herokuapp.com/api/student/login",
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
              if (this.$route.params.continue != null) {
                this.$router.push(this.$route.params.continue);
              } else {
                const user = response.data.data.user;
                this.$router.push({ name: `student-dashboard` });
              }
            }
          })
          .catch(error => {
            console.log(error.response.data.message);
          });
      } else {
        alert("Please provide both email and password to log in");
      }
    }
  }
};
</script>

