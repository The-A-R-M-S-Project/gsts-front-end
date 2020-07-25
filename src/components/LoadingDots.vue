<template>
  <span class="loading">
    <v-icon class="loading-dots" color="black">mdi-circle-medium</v-icon>
    <v-icon class="loading-dots" color="black">mdi-circle-medium</v-icon>
    <v-icon class="loading-dots" color="black">mdi-circle-medium</v-icon>
  </span>
</template>

<script>
export default {
  name: "loading-dots",
};
</script>

<style>
@keyframes blink {
  0% {
    opacity: 0.2;
  }
  20% {
    opacity: 1;
  }
  100% {
    opacity: 0.2;
  }
}
.loading .loading-dots {
  animation-name: blink;
  animation-duration: 1.4s;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
}
.loading .loading-dots:nth-child(2) {
  animation-delay: 0.2s;
}
.loading .loading-dots:nth-child(3) {
  animation-delay: 0.4s;
}
</style>