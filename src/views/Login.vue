<template>
  <v-container text-xs-center fluid fill-height class="login">
    <v-layout align-center justify-center>
        <v-card min-width="90%" class="elevation-24">
          <v-layout row wrap height>
            <v-flex sm7 pa-3>
              <v-card-text>
                <v-container>
                  <h2 class="headline text-md-left">Login</h2>
                  <v-tabs
                    v-model="tabs"
                    fixed-tabs
                    flat
                  >
                    <v-tabs-slider></v-tabs-slider>
                    <v-tab href="#mobile-tabs-5-1" class="primary--text">
                      <p>Admin</p>
                    </v-tab>
          
                    <v-tab href="#mobile-tabs-5-2" class="primary--text">
                      <p>Student</p>
                    </v-tab>
                  </v-tabs>
                  <v-tabs-items v-model="tabs" class="white elevation-0">
                    <v-tab-item
                      v-for="i in 2"
                      :key="i"
                      :value="'mobile-tabs-5-' + i"
                    >
                        <LoginForm/>
                    </v-tab-item>
                  </v-tabs-items>
                </v-container>
              </v-card-text>
            </v-flex>
            <v-flex sm5>
              <v-container fill-height pa-0 overlayed>
                <v-layout align-center>
                  <v-flex px-4 py-3>
                      <h1 class="display-2 font-weight-light">Graduate Student Tracking System</h1>
                      <p>A system for tracking master's students reports</p>
                      <p class="subheading">Are you a student? Register Here!</p>
                      <v-btn round depressed block to="/register" class="grey login__register-btn">
                        <v-icon>person_add</v-icon>
                        <span>&nbsp;Register</span>
                      </v-btn>
                  </v-flex>
                </v-layout>   
              </v-container>
            </v-flex>     
          </v-layout>
        </v-card>
    </v-layout>
  </v-container>
</template>

<script>
  import LoginForm from "@/components/LoginForm"
  export default {
    components: {
      LoginForm,
    },
    data(){
      return{
        tabs: null,
      }
    }
  }
</script>
<style lang="scss">
.overlayed {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-image: linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url("~@/assets/img/login-2.jpg");
  position: relative;
  color: white;
  background-position: center;
}
.overlayed p {
  font-size: 18px;
  letter-spacing: 150%;
}
.overlayed h1{
  font-size: 25px;
  font-weight: lighter;
}
.login {
  &__register-btn {
    opacity: .65;
    // width: 80%;
    margin: auto;
    font-weight: bold;
  }
}
</style>

