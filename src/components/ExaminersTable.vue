<template>
    <v-card elevation="18" width="100%" color="teal lighten-2">
        <v-card-title class="py-1">
            <v-row>
                <v-col
                    xs="12"
                    sm="12"
                    md="8"
                    class="text-xs-left"
                    align-self="center"
                >
                    <v-select
                        label="Filter by department"
                        class="dean-select-department"
                        :items="departments"
                        item-text="name"
                        return-object
                        width="50%"
                        flat
                        dense
                        light
                        hide-details
                        single-line
                        v-model="selectedDepartment"
                    ></v-select>
                </v-col>
                <v-col xs="12" sm="6" md="4">
                    <v-text-field
                        v-model="search"
                        append-icon="search"
                        label="Search"
                        color="blue-grey lighten-4"
                    ></v-text-field>
                </v-col>
            </v-row>
        </v-card-title>
        <v-data-table :headers="headers" :items="examiners" :search="search">
            <template v-slot:items="props">
                <router-link
                    to="/examinersdetails"
                    class="purple--text custom-link"
                >
                    <td>{{ props.item.name }}</td>
                </router-link>
                <td class="text-xs-left">{{ props.item.department }}</td>
                <td class="text-xs-left">{{ props.item.category }}</td>
                <td class="text-xs-left">{{ props.item.offNo }}</td>
                <td class="text-xs-left">{{ props.item.contact }}</td>
                <td class="text-xs-left">{{ props.item.email }}</td>
            </template>
            <template v-slot:no-results>
                <v-alert :value="true" color="error" icon="warning"
                    >Your search for "{{ search }}" found no results.</v-alert
                >
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
import ExaminerData from "@/services/examiners-data-service.js";
export default {
    data() {
        return {
            search: "",
            selectedDepartment: null,
            headers: [
                {
                    text: "EXAMINER NAME",
                    align: "left",
                    value: "name",
                },
                { text: "DEPARTMENT", value: "department" },
                { text: "CATEGORY", value: "category" },
                { text: "OFFICE NUMBER", value: "offNo" },
                { text: "CONTACT", value: "contact" },
                { text: "EMAIL", value: "email" },
            ],
            examiners: ExaminerData,
        };
    },
    created() {
        this.$store.dispatch("fetchDepartments", this.user.school);
    },
    computed: {
        departments() {
            return this.$store.getters.departments;
        },
        user() {
            return this.$store.getters.user;
        },
    },
};
</script>
