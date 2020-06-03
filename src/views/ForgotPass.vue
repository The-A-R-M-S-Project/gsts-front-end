<template>
  <v-container text-xs-center fluid fill-height class="login">
    <v-layout align-center justify-center>
      <v-card min-width="90%" class="elevation-24">
        <v-layout row wrap height>
          <v-flex sm7 pa-3>
            <v-card-text>
              <v-container>
                <template v-if="!resetPassword">
                  <h2 class="headline pl-md-5 mb-5 custom-font-family">Forgot your password?</h2>
                  <ForgotPassword />
                </template>
                <template v-else>
                  <h2 class="headline pl-md-5 mb-5 custom-font-family">Reset your password</h2>
                  <ResetPassword />
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
import ResetPassword from "@/components/ResetPassword";
export default {
  updated() {
    console.log("resetPassword: ", this.resetPassword);
  },
  computed: {
    resetPassword() {
      return this.$store.getters.resetPassword;
    }
  },
  components: {
    ForgotPassword,
    ResetPassword,
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
}
</style>