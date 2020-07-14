<template>
  <div>
    <v-toolbar fixed color="purple" class="white--text">
      <v-toolbar-title class="font-weight-bold">GSTS</v-toolbar-title>
      <v-spacer></v-spacer>
      <div>
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

