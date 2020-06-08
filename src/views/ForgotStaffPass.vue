<template>
  <v-container text-xs-center fluid fill-height class="login">
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
                    <span class="headline pl-md-5 mb-5 custom-font-family">Forgot your password?</span>
                  </v-col>
                </v-row>

                <template v-if="!resetStaffPassword">
                  <ForgotStaffPassword />
                </template>
                <template v-else>
                  <v-row align="center" justify="center" class="py-12">
                    <span class="reset-message custom-font-family text-center">
                      A password reset link has been sent
                      to
                      <br />
                      <span class="purple--text">
                        {{
                        resetEmail
                        }}
                      </span>
                    </span>
                  </v-row>
                </template>
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
</template>

<script>
import RegisterText from "@/components/RegisterText";
import ForgotStaffPassword from "@/components/ForgotStaffPassword";
export default {
  mounted() {
    this.$store.dispatch("resetStaffToggle", false);
  },
  computed: {
    resetStaffPassword() {
      return this.$store.getters.resetStaffPassword;
    },
    resetEmail() {
      return this.$store.getters.resetEmail;
    }
  },
  components: {
    ForgotStaffPassword,
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
