<template>
  <div class="mx-auto overflow-hidden">
    <SecretaryNav />
    <OverlayLoader />
    <v-container fluid class="pt-5 fill-height-container">
      <v-row justify="start" align="start" class="px-4">
        <v-col>
          <SecretaryStudents />
        </v-col>
      </v-row>
    </v-container>
    <Footer />
  </div>
</template>
<script>
import SecretaryNav from "@/components/SecretaryNav.vue";
import OverlayLoader from "@/components/OverlayLoader.vue";
import SecretaryStudents from "@/components/SecretaryStudents.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "SecretaryDashboard",
  async created() {
    await this.$store.dispatch("fetchLoggedInStaff");
  },
  components: {
    SecretaryNav,
    OverlayLoader,
    SecretaryStudents,
    Footer,
  },
};
</script>

<style>
.fill-height-container {
  height: 90vh !important;
}
</style>