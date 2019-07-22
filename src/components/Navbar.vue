<template>
  <div>
    <v-toolbar fixed color="white">
      <v-toolbar-title>G.S.T.S</v-toolbar-title>
      <div>
        <v-btn flat small to="/dashboard">Dashboard</v-btn>
        <v-btn flat small to="/departments">Departments</v-btn>
        <v-btn flat small to="/examiners">Examiners</v-btn>  
      </div>
    </v-toolbar>
  </div>
</template>
<script>
export default {
  name: "navbar"
};
</script>

