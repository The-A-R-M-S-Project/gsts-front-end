<template>
  <div>
    <v-form ref="resetPasswordForm" v-model="valid" lazy-validation>
      <v-container>
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
            @click="submitEmail"
          >
            <v-icon>mdi-restore</v-icon>
            <span>&nbsp;Reset</span>
          </v-btn>
        </div>
      </v-container>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "staff-login-form",
  data() {
    return {
      valid: true,
      loading: false,
      showPassword: false,
      showConfirm: false,
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
      required: [field => !!field || "This field is required"]
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    }
  },
  methods: {
    submitEmail() {
      event.preventDefault();
      if (this.$refs.resetPasswordForm.validate()) {
        let resetEmail = {
          email: this.email
        };
        this.$store.dispatch("sumbitEmail", resetEmail);
      }
    }
  }
};
</script>