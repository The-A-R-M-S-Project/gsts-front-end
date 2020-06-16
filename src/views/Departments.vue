<template>
  <div>
    <Navigation />
    <v-container fluid class="pt-1">
      <v-row class="mx-1">
        <StudentsTable />
      </v-row>
    </v-container>
  </div>
  <!-- <div>
    <div class="navbar">
      <Navigation />
    </div>
    <v-row class="pt-4">
      <v-flex md3 pt-5>
        <SideNav @clickedLink="setProgram" @clickedDepartment="setDepartment"></SideNav>
      </v-flex>
      <v-flex md9 pt-5 style="height: 95vh;" class="scroll-y">
        <v-container>
          <h1 class="text-xs-center">{{ department+' Engineering'}}</h1>
          <StudentsTable :program="program" :_id="programID"></StudentsTable>
        </v-container>
      </v-flex>
    </v-row>
  </div>-->
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
  },
  data() {
    return {
      program: null,
      department: "Electrical and Computer",
      programID: null
    };
  },
  methods: {
    setProgram(programName, programID) {
      this.program = programName;
      this.programID = programID;
    },
    setDepartment(departmentName) {
      this.department = departmentName;
    }
  }
};
</script>