<template>
  <v-form ref="form" v-model="form" class="login-form" name="login">
    <v-container>
      <v-text-field
        v-model="email"
        :rules="[rules.email]"
        label="College Email"
        prepend-inner-icon="person"
        type="email"
      ></v-text-field>
      <v-text-field
        v-model="password"
        :rules="[rules.length(8)]"
        counter="8"
        label="password"
        prepend-inner-icon="lock"
        type="password"
      ></v-text-field>
      <div class>
        <v-btn
          round
          large
          depressed
          ripple
          class="yellow accent-1"
          type="submit"
          v-on:click="submitForm"
        >Login</v-btn>
      </div>
    </v-container>
  </v-form>
</template>
<script>
export default {
  name: "LoginForm",
  data: () => ({
    email: undefined,
    form: false,
    password: "",
    rules: {
      email: v =>
        (v || "").match(/@cedat.mak.ac.ug/) ||
        "Please enter a valid college email",
      length: len => v =>
        (v || "").length >= len || `Invalid character length, required ${len}`,
      required: v => !!v || "This field is required"
    }
  }),
  methods: {
    submitForm() {
      console.log("Submitted");
      // document.getElementsByClassName("login-form");
    }
  }
};
</script>