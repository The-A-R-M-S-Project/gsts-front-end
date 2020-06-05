<template>
  <v-container text-xs-center fluid fill-height class="login">
    <v-layout align-center justify-center>
      <v-card min-width="90%" class="elevation-24">
        <v-layout row wrap height>
          <v-flex sm7 pa-3>
            <v-card-text>
              <v-container>
                <v-row></v-row>
                <h2 class="headline pl-md-5 mb-5 custom-font-family">Forgot your password?</h2>
                <template v-if="!resetPassword">
                  <ForgotPassword />
                </template>
                <template v-else>
                  <span class="reset-message custom-font-family">
                    A password reset link has been sent to
                    <br />
                    <span class="purple--text">{{ resetEmail }}</span>
                  </span>
                </template>
              </v-container>
            </v-card-text>
          </v-flex>
          <v-flex sm5>
            <RegisterText />
          </v-flex>
        </v-layout>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import RegisterText from "@/components/RegisterText";
import ForgotPassword from "@/components/ForgotPassword";
export default {
  computed: {
    resetPassword() {
      return this.$store.getters.resetPassword;
    },
    resetEmail() {
      return this.$store.getters.resetEmail;
    }
  },
  components: {
    ForgotPassword,
    RegisterText
  }
};
</script>
<style lang="scss">
.login {
  &__register-btn {
    opacity: 0.65;
    width: 80%;
    margin: auto;
    font-weight: bold;
  }
  .reset-message {
    font-size: 1.3rem;
  }
}
</style>