<template>
  <v-navigation-drawer dark stateless value="true" style="height: 89vh;" elevation="23">
    <v-list>
      <v-list-tile>
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>Departments</v-list-tile-title>
      </v-list-tile>

      <v-list-group
        prepend-icon
        active-class
        :value="false"
        v-for="department in departments"
        :key="department._id"
        v-on:click="clickedDepartment(department.name)"
      >
        <template v-slot:activator>
          <v-list-tile>
            <v-list-tile-title>{{ department.name }}</v-list-tile-title>
          </v-list-tile>
        </template>
        <v-list-tile 
          v-for="program in programmes.filter(x => x.department === department._id)" 
          :key="program._id"
        >
            <v-icon small dark>star</v-icon>
            <v-list-tile-action
              style="font-size: 12px;"
              v-on:click="clickedLink(program.name, program._id)"
            >
                {{ program.name }}
            </v-list-tile-action>
        </v-list-tile>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import EngDepartments from "@/services/departments-service.js";

export default {
  data() {
    return {
      departments: [],
      programmes: []
    };
  },

  created() {
    EngDepartments.getEngDepartments().then(department => {
      this.departments = department.departments
    }),
    EngDepartments.getDeptProgramme().then(programme => {
      this.programmes = programme.programs
    })
  },

  methods: {
    clickedLink: function(programName, programID) {
      this.$emit("clickedLink", programName, programID);
    },
    clickedDepartment: function(departmentName) {
      this.$emit("clickedDepartment", departmentName);
    }
  }

};
</script>

