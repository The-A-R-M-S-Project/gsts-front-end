<template>
  <div>
    <v-toolbar fixed color="purple" class="white--text">
      <v-toolbar-title>G.S.T.S</v-toolbar-title>
      <v-spacer></v-spacer>
      <div>
        <v-btn
          flat
          small
          :loading="logoutLoading"
          class="title custom-font-family text-capitalize white--text"
          v-on:click="logOut"
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
    logoutLoading() {
      return this.$store.state.logoutLoading;
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

