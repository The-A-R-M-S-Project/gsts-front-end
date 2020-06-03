<template>
  <div>
    <v-form ref="forgotPasswordForm" v-model="valid" lazy-validation>
      <v-container>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="College Email"
          prepend-inner-icon="mdi-account"
          type="email"
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
            @click="submitEmail"
          >
            <v-icon>mdi-check-bold</v-icon>
            <span>&nbsp;Submit</span>
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
      email: "",
      emailRules: [
        emailField =>
          /.+@+/.test(emailField) || "Please enter a valid college email"
      ],
      required: [field => !!field || "This field is required"]
    };
  },
  methods: {
    submitEmail() {
      event.preventDefault();
      if (this.$refs.forgotPasswordForm.validate()) {
        let resetEmail = {
          email: this.email
        };
        this.$store.dispatch("sumbitEmail", resetEmail);
        console.log("isLoading: ", this.isLoading);
      }
    }
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    }
  }
};
</script>