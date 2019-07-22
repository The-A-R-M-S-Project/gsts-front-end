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
        v-for="(department, i) in departments"
        :key="i"
        v-on:click="clickedDepartment(department.name)"
      >
        <template v-slot:activator>
          <v-list-tile>
            <v-list-tile-title>{{ department.name }}</v-list-tile-title>
          </v-list-tile>
        </template>

        <v-list-tile v-for="(program, i) in department.programs" :key="i">
          <v-icon small dark>star</v-icon>
          <v-list-tile-action
            style="font-size: 12px;"
            v-on:click="clickedLink(program.name)"
          >{{ program.name }}</v-list-tile-action>
        </v-list-tile>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import Departments from "@/services/departments-service.js";
export default {
  data() {
    return {
      departments: Departments.ECEdepartments
    };
  },
  methods: {
    clickedLink: function(programName) {
      this.$emit("clickedLink", programName);
    },
    clickedDepartment: function(departmentName) {
      this.$emit("clickedDepartment", departmentName);
    }
  }
};
</script>

