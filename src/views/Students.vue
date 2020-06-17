<template>
  <div>
    <Navigation />
    <v-container fluid class="pt-1">
      <v-row class="mx-1">
        <StudentsTable />
      </v-row>
    </v-container>
  </div>
</template>
<style>
</style>
<script>
import StudentsTable from "@/components/StudentsTable.vue";
import Navigation from "@/components/Navbar.vue";

export default {
  components: {
    StudentsTable,
    Navigation
  }
};
</script>