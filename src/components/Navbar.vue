<template>
  <div>
    <v-toolbar fixed color="purple" class="white--text">
      <v-toolbar-title>G.S.T.S</v-toolbar-title>
      <div>
        <v-btn
          flat
          small
          class="title custom-font-family text-capitalize font-weight-bold white--text"
          to="/ECE-dashboard"
        >Dashboard</v-btn>
        <v-btn
          flat
          small
          class="title custom-font-family text-capitalize white--text"
          to="/departments"
        >Departments</v-btn>
        <v-btn
          flat
          small
          class="title custom-font-family text-capitalize white--text"
          to="/examiners"
        >Examiners</v-btn>
      </div>
    </v-toolbar>
  </div>
</template>
<script>
export default {
  name: "navbar"
};
</script>

