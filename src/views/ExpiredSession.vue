<template>
  <div id="page-not-found">
    <span class="grey--text display-1 emptyPane text-center custom-font-family">
      <v-icon large color="purple">mdi-exclamation-thick</v-icon>&nbsp;
      Your session expired
      <br />
      <span class="title custom-font-family">
        Please sign in again
        <v-btn
          color="yellow darken-3"
          :loading="isLoading"
          text
          tile
          class="text-lowercase title"
          @click="returnToApp"
        >here</v-btn>
      </span>
    </span>
  </div>
</template>

<script>
export default {
  name: "PageNotFound",
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    }
  },
  methods: {
    returnToApp() {
      this.$store.dispatch("logout").then(() => {
        this.$store.dispatch("setLoginTime", new Date());
        this.$router.push("/");
      });
    }
  }
};
</script>

<style>
.emptyPane {
  display: inline-block;
  margin-top: 40vh;
}
#page-not-found {
  text-align: center;
}
</style>
