<template>
  <div class="text-center">
    <v-overlay :value="overlayLoader">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>
<script>
export default {
  computed: {
    overlayLoader() {
      return this.$store.getters.overlayLoader;
    }
  }
};
</script>