<template>
  <div class="mx-auto overflow-hidden">
    <DeanNav class="d-none d-sm-block" />
    <MobileDrawer />
    <v-container fluid class="pt-1">
      <v-row class="mx-1">
        <ExaminersTable />
      </v-row>
    </v-container>
    <Footer />
  </div>
</template>
<script>
import DeanNav from "@/components/DeanNav.vue";
import ExaminersTable from "@/components/ExaminersTable.vue";
import MobileDrawer from "@/components/MobileDrawer.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "examiners",
  components: {
    DeanNav,
    MobileDrawer,
    ExaminersTable,
    Footer,
  },
};
</script>
