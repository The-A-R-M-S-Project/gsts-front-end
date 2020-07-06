<template>
  <v-container fluid fill-height overlayed>
    <v-row>
      <v-col>
        <v-row align="center" justify="center">
          <v-col class="px-4 px-sm-4 py-7 text-center">
            <h1 class="display-2 font-weight-light mb-6">Graduate Student Tracking System</h1>
            <p
              :class="{'normal-text': $vuetify.breakpoint.xs}"
            >A system for tracking master's students reports</p>
            <p>Are you a student? Register Here!</p>
            <v-btn
              rounded
              large
              depressed
              to="/register"
              class="grey login__register-btn d-none d-sm-flex"
            >
              <v-icon>mdi-account-plus</v-icon>
              <span>&nbsp;Register</span>
            </v-btn>
            <v-btn
              rounded
              height="3.5rem"
              depressed
              to="/register"
              class="grey login__register-btn d-flex d-sm-none"
            >
              <v-icon large>mdi-account-plus</v-icon>
              <span class="button-text">&nbsp;Register</span>
            </v-btn>
            <span class="mx-auto my-6 arrow-down d-flex d-sm-none">tree</span>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
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
@-webkit-keyframes downarrow {
  0% {
    -webkit-transform: translateY(0);
    opacity: 0.4;
  }
  100% {
    -webkit-transform: translateY(0.4em);
    opacity: 0.9;
  }
}
.arrow-down {
  border-color: transparent;
  border-style: solid;
  border-width: 0 1rem;
  display: block;
  height: 0;
  opacity: 0.4;
  text-indent: -9999px;
  transform-origin: 50% 50%;
  width: 0;
  -webkit-animation: downarrow 0.6s infinite alternate ease-in-out;
  border-top: 1rem solid white;
}
</style>