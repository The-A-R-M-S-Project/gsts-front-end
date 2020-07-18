<template>
  <div>
    <ECEDesktop class="d-none d-sm-block" />
    <ECEMobile class="d-block d-sm-none" />
  </div>
</template>

<script>
import ECEDesktop from "./ECEDesktop.vue";
import ECEMobile from "./ECEMobile.vue";
export default {
  name: "ECE-dashboard",
  components: {
    ECEDesktop,
    ECEMobile
  }
};
</script>