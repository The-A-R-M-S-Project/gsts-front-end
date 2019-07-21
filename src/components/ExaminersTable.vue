<template>
  <div class="pa-5">
    <v-card> 
      <v-card-title>
        <v-layout>
          <v-flex xs12 sm6 md4>
            <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
          </v-flex>
        </v-layout>
      </v-card-title>
      <v-data-table :headers="headers" :items="examiners" :search="search">
        <template v-slot:items="props">
          <router-link to="/examinersdetails"><td>{{ props.item.name }}</td></router-link>
          <td class="text-xs-left">{{ props.item.department }}</td>
          <td class="text-xs-left">{{ props.item.category }}</td>
          <td class="text-xs-left">{{ props.item.offNo }}</td>
          <td class="text-xs-left">{{ props.item.contact }}</td>
          <td class="text-xs-left">{{ props.item.email }}</td>
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
import ExaminerData from "@/services/examiners-data-service.js"
export default {
    props: {
          program: String
      },
    data() {
        return {
        search: "",
        headers: [
            {
            text: "EXAMINER NAME",
            align: "left",
            value: "name"
            },
            { text: "DEPARTMENT", value: "department" },
            { text: "CATEGORY", value: "category" },
            {text: "OFFICE NUMBER", value: "offNo"},
            { text: "CONTACT", value: "contact" },
            { text: "EMAIL", value: "email" }
        ],
        examiners: ExaminerData
        };
    }
};
</script>
