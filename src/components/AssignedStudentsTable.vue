<template>
  <div class="pt-3">
    <v-card elevation="24">
      <v-card-title justify-center>
        <h2 class="text-xs-center">Students Assigned</h2>
      </v-card-title>
      <v-data-table :headers="headers" :items="assignedStudents">
        <template v-slot:items="props">
          <router-link class="purple--text custom-link" to="/student_view">
            <td>{{ props.item.name }}</td>
          </router-link>
          <td class="text-xs-left">{{ props.item.reportState }}</td>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import AssignedStudentData from "@/services/assigned-students-service.js";
export default {
  props: {
    program: String
  },
  data() {
    return {
      search: "",
      headers: [
        {
          text: "STUDENT NAME",
          align: "left",
          value: "name"
        },
        { text: "REPORT STATE", value: "reportState" }
      ],
      assignedStudents: AssignedStudentData
    };
  }
};
</script>
