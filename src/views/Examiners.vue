<template>
  <div>
    <div class="navbar">
      <Navigation />
    </div>
    <v-row class="pt-4">
      <v-col class="scroll-y pt-5">
        <v-container fluid>
          <h1 class="text-center">Table Of Examiners</h1>
          <ExaminersTable :program="program"></ExaminersTable>
        </v-container>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import Navigation from "@/components/Navbar.vue";
import ExaminersTable from "@/components/ExaminersTable.vue";
export default {
  components: {
    Navigation,
    ExaminersTable
  }
};
</script>
