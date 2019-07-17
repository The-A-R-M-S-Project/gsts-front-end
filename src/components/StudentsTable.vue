<template>
  <div class="">
    <v-card>
      <v-card-title>
        DEPARTMENT NAME
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
      </v-card-title>
      <v-data-table :headers="headers" :items="students" :search="search">
        <template v-slot:items="props">
          <td>{{ props.item.name }}</td>
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
import StudentData from "@/student-data-service.js"
export default {
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
  }
};
</script>
