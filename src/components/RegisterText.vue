<template>
  <v-container fill-height overlayed>
    <v-row :class="{'register-text': $vuetify.breakpoint.xs}">
      <v-col class="px-4 px-sm-4 py-7 text-center">
        <h1 class="display-2 font-weight-light mb-6 text-center">Graduate Student Tracking System</h1>
        <p
          :class="{'normal-text': $vuetify.breakpoint.xs}"
          class="text-center"
        >A system for tracking master's students reports</p>
        <p class="text-center">Are you a student? Register Here!</p>
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
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
.register-text {
  width: 10% !important;
}
</style>