<template>
  <div class="pa-5">
    <v-card elevation="18" color="teal lighten-2"> 
      <v-card-title>
        <v-layout>
          <v-flex xs12 sm6 md8>
            <div class="text-xs-left">
              <h2>{{ program }}</h2>
            </div>
          </v-flex>
          <v-flex xs12 sm6 md4>
            <v-text-field v-model="search" append-icon="search" label="Search" color="blue-grey lighten-4"></v-text-field>
          </v-flex>
        </v-layout>
      </v-card-title>
      <v-data-table :headers="headers" :items="students" :search="search">
        <template v-slot:items="props">
          <router-link class="purple--text custom-link" to="/student_view"><td>{{ props.item.name }}</td></router-link>
          <td class="text-xs-left">{{ props.item.regNo }}</td>
          <td class="text-xs-left">{{ props.item.reportStatus }}</td>
          <td class="text-xs-left">{{ props.item.vivaStatus }}</td>
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
  </div>
</template>

<script>
import StudentData from "@/services/student-data-service.js"
import DepartmentService from "@/services/departments-service.js"
export default {
    props: {
          program: String,
          _id: String
      },
    data() {
        return {
        search: "",
        headers: [
            {
            text: "STUDENT NAME",
            align: "left",
            sortable: false,
            value: "name"
            },
            {
            text: "REGISTRATION NUMBER",
            value: "regNo"
            },
            { text: "REPORT STATUS", value: "reportStatus" },
            { text: "VIVA STATUS", value: "vivaStatus" },
            { text: "VIVA DATE", value: "vivaDate" }
        ],
        students: StudentData
        };
    },
    computed:{
      studentData: () => DepartmentService.getStudentData(this._id).then(response => {
                          return response.data.students
                          })
    }
};
</script>
