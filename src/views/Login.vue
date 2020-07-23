<template>
  <div :class="{ 'auth-pages': !$vuetify.breakpoint.xs }">
    <v-container fluid text-xs-center class="login d-none d-sm-flex">
      <v-row align="center" justify="center">
        <v-card max-width="90%" class="elevation-24">
          <v-row no-gutters>
            <v-col md="5" class="d-flex d-md-none">
              <RegisterText />
            </v-col>
            <v-col md="7" class="pa-3">
              <v-card-text>
                <v-container>
                  <h2 class="headline pl-md-5 mb-8 custom-font-family text-center">Login</h2>
                  <v-tabs v-model="tabs" centered>
                    <v-tabs-slider color="purple"></v-tabs-slider>

                    <v-tab href="#staff" class="text-capitalize black--text py-4">
                      <span class="tab-headings px-7">Staff</span>
                    </v-tab>

                    <v-tab href="#student" class="text-capitalize black--text py-4">
                      <span class="tab-headings px-7">Student</span>
                    </v-tab>
                  </v-tabs>

                  <v-tabs-items v-model="tabs">
                    <v-tab-item :value="'staff'">
                      <StaffLoginForm />
                    </v-tab-item>
                    <v-tab-item :value="'student'">
                      <StudentLoginForm />
                    </v-tab-item>
                  </v-tabs-items>
                </v-container>
              </v-card-text>
            </v-col>
            <v-col md="5" class="d-none d-md-flex">
              <RegisterText />
            </v-col>
          </v-row>
        </v-card>
      </v-row>
    </v-container>
    <div class="d-block d-sm-none">
      <v-row no-gutters>
        <v-col class="register-text" md="5" xs="12">
          <RegisterText />
        </v-col>
        <v-col md="7" xs="12" class="pa-3">
          <h2 class="heading pl-md-5 mb-8 mt-8 custom-font-family text-center">Login</h2>
          <v-tabs v-model="tabs" centered>
            <v-tabs-slider color="purple"></v-tabs-slider>

            <v-tab href="#staff" class="text-capitalize black--text py-4">
              <span class="sub-heading px-3">Staff</span>
            </v-tab>

            <v-tab href="#student" class="text-capitalize black--text py-4">
              <span class="sub-heading px-3">Student</span>
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tabs">
            <v-tab-item :value="'staff'">
              <StaffLoginForm />
            </v-tab-item>
            <v-tab-item :value="'student'">
              <StudentLoginForm />
            </v-tab-item>
          </v-tabs-items>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import StaffLoginForm from "@/components/StaffLoginForm";
import StudentLoginForm from "@/components/StudentLoginForm";
import RegisterText from "@/components/RegisterText";
export default {
  components: {
    StaffLoginForm,
    StudentLoginForm,
    RegisterText,
  },
  data() {
    return {
      tabs: null,
    };
  },
};
</script>
<style lang="scss">
.tab-headings {
  font-size: 1.25rem;
}
.auth-pages {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;
  padding: 12px;
  margin-right: auto;
  margin-left: auto;
}
.register-text {
  height: 93vh;
}
.login {
  &__register-btn {
    opacity: 0.65;
    width: 80%;
    margin: auto;
    font-weight: bold;
  }
}
</style>
