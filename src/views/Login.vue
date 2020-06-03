<template>
  <v-container text-xs-center fluid fill-height class="login">
    <v-layout align-center justify-center>
      <v-card min-width="90%" class="elevation-24">
        <v-layout row wrap height>
          <v-flex sm7 pa-3>
            <v-card-text>
              <v-container>
                <h2 class="headline pl-md-5 mb-5 custom-font-family">Login</h2>
                <v-tabs v-model="tabs" fixed-tabs flat>
                  <v-tabs-slider color="purple"></v-tabs-slider>
                  <v-tab href="#staff" class="text-capitalize title custom-font-family">
                    <p>Staff</p>
                  </v-tab>
                  <v-tab href="#student" class="text-capitalize title custom-font-family">
                    <p>Student</p>
                  </v-tab>
                </v-tabs>
                <v-tabs-items v-model="tabs" class="white elevation-0">
                  <v-tab-item :value="'staff'">
                    <StaffLoginForm />
                  </v-tab-item>
                  <v-tab-item :value="'student'">
                    <StudentLoginForm />
                  </v-tab-item>
                </v-tabs-items>
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
import StaffLoginForm from "@/components/StaffLoginForm";
import StudentLoginForm from "@/components/StudentLoginForm";
import RegisterText from "@/components/RegisterText";
export default {
  components: {
    StaffLoginForm,
    StudentLoginForm,
    RegisterText
  },
  data() {
    return {
      tabs: null
    };
  }
};
</script>
<style lang="scss">
.overlayed {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url("~@/assets/img/login-2.jpg");
  position: relative;
  color: white;
  background-position: center;
}
.overlayed p {
  font-size: 18px;
  letter-spacing: 150%;
}
.overlayed h1 {
  font-size: 25px;
  font-weight: lighter;
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

