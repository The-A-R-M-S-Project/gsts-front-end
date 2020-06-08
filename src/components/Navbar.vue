<template>
  <div>
    <v-toolbar fixed color="purple" class="white--text">
      <v-toolbar-title>G.S.T.S</v-toolbar-title>
      <div>
        <v-btn
          text
          small
          class="title custom-font-family text-capitalize font-weight-bold white--text"
          to="/ECE-dashboard"
        >Dashboard</v-btn>
        <v-btn
          text
          small
          class="title custom-font-family text-capitalize white--text"
          to="/departments"
        >Departments</v-btn>
        <v-btn
          text
          small
          class="title custom-font-family text-capitalize white--text"
          to="/examiners"
        >Examiners</v-btn>
        <v-btn
          text
          :loading="isLoading"
          class="title custom-font-family text-capitalize white--text"
          @click="logOut"
        >
          <v-icon>mdi-power</v-icon>
          <span>&nbsp;logout</span>
        </v-btn>
      </div>
    </v-toolbar>
  </div>
</template>
<script>
export default {
  name: "navbar",
  data() {
    return {
      loading: false
    };
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/");
      });
    }
  }
};
</script>

