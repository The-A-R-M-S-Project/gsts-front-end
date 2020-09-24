<template>
  <div :class="{ 'auth-pages': !$vuetify.breakpoint.xs }">
    <v-container text-xs-center fluid fill-height class="login d-none d-sm-flex">
      <v-row align="center" justify="center">
        <v-card max-width="90%" class="elevation-24">
          <v-row no-gutters>
            <v-col md="7" class="pa-3">
              <v-card-text>
                <v-container>
                  <v-row justify="start" align="center" class="px-9">
                    <v-col cols="12" md="3">
                      <v-btn to="/" icon>
                        <v-icon color="black">mdi-arrow-left</v-icon>
                      </v-btn>
                    </v-col>
                    <v-col cols="12" md="9">
                      <span class="headline pl-md-5 mb-5 custom-font-family">Reset your password</span>
                    </v-col>
                  </v-row>
                  <ResetPasswordForm />
                </v-container>
              </v-card-text>
            </v-col>
            <v-col md="5">
              <RegisterText />
            </v-col>
          </v-row>
        </v-card>
      </v-row>
    </v-container>
    <v-container class="d-block d-sm-none">
      <v-row justify="start" align="center" class="pt-4" no-gutters>
        <v-col cols="1">
          <v-btn to="/" icon>
            <v-icon large color="black">mdi-arrow-left</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="11">
          <h2 class="normal-text custom-font-family py-2 text-center">Reset password?</h2>
        </v-col>
      </v-row>
      <v-row align="center" justify="center" class="mobile-container">
        <ResetPasswordForm />
      </v-row>
    </v-container>
  </div>
</template>

<script>
import RegisterText from "@/components/RegisterText";
import ResetPasswordForm from "@/components/ResetPasswordForm";
export default {
  components: {
    ResetPasswordForm,
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
