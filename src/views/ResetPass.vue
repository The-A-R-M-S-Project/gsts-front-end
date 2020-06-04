<template>
  <v-container text-xs-center fluid fill-height class="login">
    <v-layout align-center justify-center>
      <v-card min-width="90%" class="elevation-24">
        <v-layout row wrap height>
          <v-flex sm7 pa-3>
            <v-card-text>
              <v-container>
                <h2 class="headline pl-md-5 mb-5 custom-font-family">Reset your password</h2>
                <ResetPassword />
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
import ResetPassword from "@/components/ResetPassword";
export default {
  components: {
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
  .reset-message {
    font-size: 1.3rem;
  }
}
</style>