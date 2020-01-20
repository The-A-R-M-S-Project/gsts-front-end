<template>
  <div>
    <v-toolbar fixed color="purple" class="white--text">
      <v-toolbar-title>G.S.T.S</v-toolbar-title>
      <div>
        <v-btn
          flat
          small
          class="title custom-font-family text-capitalize font-weight-bold white--text"
          to="/examiner-dashboard"
        >Dashboard</v-btn>
        <v-btn
          flat
          small
          class="title custom-font-family text-capitalize white--text"
          to=""
        >Departments</v-btn>
      </div>
    </v-toolbar>
  </div>
</template>
<script>
export default {
  name: "navbar"
};
</script>

