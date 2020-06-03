<template>
  <v-container fill-height pa-0 overlayed>
    <v-layout align-center>
      <v-flex px-4 py-3>
        <h1 class="display-2 font-weight-light mb-4">Graduate Student Tracking System</h1>
        <p>A system for tracking master's students reports</p>
        <p class="subheading">Are you a student? Register Here!</p>
        <v-btn round large depressed block to="/register" class="grey login__register-btn">
          <v-icon>mdi-account-plus</v-icon>
          <span>&nbsp;Register</span>
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>