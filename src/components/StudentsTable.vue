<template>
  <v-card elevation="18" width="100%" color="teal lighten-2">
    <v-card-title>
      <span class="mx-auto font-weight-bold sub-heading">Students</span>
    </v-card-title>
    <v-card-subtitle class="py-1">
      <v-row>
        <template v-if="user.role === 'principal'">
          <v-col cols="12" xs="12" sm="6" md="4" class="text-xs-left" align-self="center">
            <v-select
              label="Select a school"
              :items="schools"
              item-text="name"
              return-object
              flat
              dense
              light
              hide-details
              single-line
              @input="fetchDepartments"
              v-model="selectedSchool"
            ></v-select>
          </v-col>
          <v-col cols="12" xs="12" sm="6" md="4" class="text-xs-left" align-self="center">
            <v-select
              label="Filter by department"
              :class="{'select-department': (!$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm)}"
              :items="departments"
              item-text="name"
              return-object
              flat
              dense
              light
              hide-details
              single-line
              v-model="selectedDepartment"
            ></v-select>
          </v-col>
        </template>
        <template v-else-if="user.role === 'dean'">
          <v-col xs="12" sm="6" md="8" class="text-xs-left" align-self="center">
            <v-select
              label="Filter by department"
              :class="{'dean-select-department': (!$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm)}"
              :items="departments"
              item-text="name"
              return-object
              flat
              dense
              light
              hide-details
              single-line
              v-model="selectedDepartment"
            ></v-select>
          </v-col>
        </template>

        <v-col cols="12" xs="12" :sm="user.role==='dean'?'6':'12'" md="4">
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            color="blue-grey lighten-4"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-subtitle>
    <v-data-table :headers="headers" :items="students" :search="search">
      <template v-slot:items="props">
        <router-link class="purple--text custom-link" to="/student_view">
          <td>{{ props.item.name }}</td>
        </router-link>
        <td class="text-xs-left">{{ props.item.regNo }}</td>
        <td class="text-xs-left">{{ props.item.reportStatus }}</td>
        <td class="text-xs-left">{{ props.item.vivaDate }}</td>
      </template>
      <template v-slot:no-results>
        <v-alert
          :value="true"
          color="error"
          icon="warning"
        >Your search for "{{ search }}" found no results.</v-alert>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import StudentData from "@/services/student-data-service.js";
import DepartmentService from "@/services/departments-service.js";
export default {
  props: {
    program: String,
    _id: String,
  },
  data() {
    return {
      search: "",
      headers: [
        {
          text: "STUDENT NAME",
          align: "left",
          sortable: false,
          value: "name",
        },
        {
          text: "REGISTRATION NUMBER",
          value: "regNo",
        },
        { text: "STATUS", value: "reportStatus" },
        { text: "VIVA DATE", value: "vivaDate" },
      ],
      students: StudentData,
      selectedSchool: null,
      selectedDepartment: null,
    };
  },
  created() {
    if (this.user.role === "dean") {
      this.$store.dispatch("fetchDepartments", this.user.school);
    }
  },
  computed: {
    studentData: () =>
      DepartmentService.getStudentData(this._id).then((response) => {
        return response.data.students;
      }),
    departments() {
      return this.$store.getters.departments;
    },
    schools() {
      return this.$store.getters.schools;
    },
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    fetchDepartments() {
      this.$store.dispatch("fetchDepartments", this.selectedSchool._id);
    },
  },
};
</script>
<style>
.students-table {
  width: 100%;
}
.select-department {
  width: 90%;
}
.dean-select-department {
  width: 50%;
}
</style>
