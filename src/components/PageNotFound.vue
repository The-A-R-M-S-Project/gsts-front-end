<template>
  <div id="page-not-found">
    <span class="grey--text display-1 emptyPane text-center custom-font-family">
      <v-icon large color="purple">mdi-power-plug-off</v-icon>&nbsp; That link has no power here!
      <br />
      <span class="title custom-font-family">
        Please sign in
        <span
          class="yellow--text text--darken-3"
          style="cursor: pointer"
          @click="returnToApp"
        >here</span>
      </span>
    </span>
  </div>
</template>

<script>
export default {
  name: "PageNotFound",
  methods: {
    returnToApp() {
      this.$router.push("/");
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