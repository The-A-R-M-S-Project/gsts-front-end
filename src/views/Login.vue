<template>
  <v-container text-xs-center fluid fill-height>
    <v-layout align-center justify-center>
        <v-card>
          <v-layout row wrap>
            <v-flex sm7 pa-3>
              <v-card-text>
                <h1 class="text-xs-center">Login</h1>
                <v-container>
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
                  <v-flex>
                      <h1>Graduate Student Tracking System</h1>
                      <p>Are you a student? Register Here!</p>
                      <v-btn round dark to="/register">Register</v-btn>
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
<style>
.overlayed {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-image: linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)),url("https://images.unsplash.com/photo-1519682337058-a94d519337bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80");
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
</style>

