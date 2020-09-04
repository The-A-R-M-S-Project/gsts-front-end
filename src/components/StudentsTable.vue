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
    <v-data-table
      :headers="headers"
      :items="filteredStudents"
      :search="search"
      :custom-sort="sortStudentsByProcess"
      :expanded="expanded"
      @click:row="itemClicked"
      show-expand
      item-key="_id"
      :loading="tableLoading"
    >
      <template v-slot:header="{ props: { headers } }">
        <thead>
          <tr>
            <th :colspan="headers.length">
              <div v-if="filters.hasOwnProperty('status')">
                <v-select
                  flat
                  hide-details
                  prepend-icon="mdi-filter-variant"
                  small
                  multiple
                  label="Filter by status"
                  clearable
                  :items="columnValueList('status')"
                  v-model="filters['status']"
                >
                  <template v-slot:item="{item}">{{ progressEvents[`${item}`].message }}</template>
                  <template
                    v-slot:selection="{item}"
                  >{{ progressEvents[`${item}`].message }}, &nbsp;</template>
                </v-select>
              </div>
            </th>
          </tr>
          <tr v-show="displayStudentTableFeedback">
            <th :colspan="headers.length">
              <v-alert
                color="success"
                dark
                class="text-center"
                dismissible
              >You've assigned examiner, {{ assignedExaminer.firstName }} {{assignedExaminer.lastName}} to {{student.name}}'s report</v-alert>
            </th>
          </tr>
        </thead>
      </template>

      <template v-slot:no-results>
        <v-alert
          :value="true"
          color="error"
          icon="warning"
        >Your search for "{{ search }}" found no results.</v-alert>
      </template>
      <template v-slot:item.status="{ item }">{{ progressEvents[`${item.status}`].message }}</template>
      <template v-slot:item.vivaDate="{ item }">{{ formatDate(item.vivaDate) }}</template>
      <template v-slot:item.action="{ item }">
        <v-icon small v-if="callToAction(item.status)" color="pink">mdi-circle</v-icon>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <v-row align="center" justify="center">
            <v-col cols="12" sm="9" md="10">
              <v-progress-linear
                :value="progressEvents[`${item.status}`].value"
                :color="progressEvents[`${item.status}`].color"
                height="25"
              >
                <strong>{{progressEvents[`${item.status}`].value}}% ({{progressEvents[`${item.status}`].message}})</strong>
              </v-progress-linear>
            </v-col>
            <v-col cols="12" sm="3" md="2">
              <div class="text-center">
                <AssignExaminer v-if="item.status === 'submitted'" />
                <SetVivaDate v-else-if="item.status === 'clearedByExaminer'" />
                <SetVivaScore v-else-if="item.status === 'vivaDateSet'" />
                <v-btn
                  v-else
                  @click="viewDetails(item)"
                  color="primary"
                  :loading="detailLoading"
                >View Details</v-btn>
              </div>
            </v-col>
          </v-row>
        </td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import StudentData from "@/services/student-events.js";
import DepartmentService from "@/services/departments-service.js";
import AssignExaminer from "@/components/AssignExaminer.vue";
import SetVivaDate from "@/components/SetVivaDate.vue";
import SetVivaScore from "@/components/SetVivaScore.vue";
export default {
  data() {
    return {
      search: "",
      filters: {
        status: [],
      },
      labels: [
        "Not Submitted",
        "Submitted",
        "With examiner",
        "Cleared by examiner",
        "Viva date set",
        "Viva complete",
      ],
      filteredEvent: "",
      expanded: [],
      headers: [
        {
          value: "action",
          width: "1rem",
          sortable: false,
        },
        {
          text: "STUDENT NAME",
          align: "left",
          sortable: false,
          value: "student.name",
        },
        {
          text: "PROGRAM",
          value: "program",
        },
        { text: "STATUS", value: "status" },
        { text: "VIVA DATE", value: "vivaDate" },
        { value: "data-table-expand" },
      ],
      progressEvents: {
        notSubmitted: {
          value: 0,
          message: "Not submitted",
          color: "grey",
        },
        submitted: {
          value: 17,
          message: "Submitted",
          color: "deep-orange darken-2",
        },
        withExaminer: {
          value: 39,
          message: "With examiner",
          color: "orange",
        },
        clearedByExaminer: {
          value: 56,
          message: "Cleared by examiner",
          color: "amber",
        },
        vivaDateSet: {
          value: 73,
          message: "Viva date set",
          color: "yellow darken-1",
        },
        vivaComplete: {
          value: 100,
          message: "Viva complete",
          color: "green lighten-2",
        },
      },
      sortOrder: [
        "notSubmitted",
        "submitted",
        "withExaminer",
        "clearedByExaminer",
        "vivaDateSet",
        "vivaComplete",
      ],
      students: StudentData,
      displayAssignExaminerMessage: false,
      selectedSchool: null,
      selectedDepartment: null,
    };
  },
  created() {
    if (this.user.role === "dean") {
      this.$store.dispatch("fetchDepartments", this.user.school);
    }
    this.$store.dispatch("fetchReports");
  },
  mounted() {
    this.$store.dispatch("setDisplayStudentTableFeedback", false);
  },
  computed: {
    tableLoading() {
      return this.$store.getters.tableLoading;
    },
    detailLoading() {
      return this.$store.getters.detailLoading;
    },
    departments() {
      return this.$store.getters.departments;
    },
    schools() {
      return this.$store.getters.schools;
    },
    user() {
      return this.$store.getters.user;
    },
    student() {
      return this.$store.getters.student;
    },
    filteredStudents() {
      return this.reports.filter((d) => {
        return Object.keys(this.filters).every((f) => {
          return this.filters[f].length < 1 || this.filters[f].includes(d[f]);
        });
      });
    },
    reports() {
      return this.$store.getters.reports;
    },
    assignExaminerMessage() {
      return this.$store.getters.assignExaminerMessage;
    },
    assignedExaminer() {
      return this.$store.getters.assignedExaminer;
    },
    displayStudentTableFeedback() {
      return this.$store.getters.displayStudentTableFeedback;
    },
  },
  methods: {
    fetchDepartments() {
      this.$store.dispatch("fetchDepartments", this.selectedSchool._id);
    },
    itemClicked(value) {
      const index = this.expanded.indexOf(value);
      if (index === -1) {
        this.expanded.push(value);
      } else {
        this.expanded.splice(index, 1);
      }
      this.$store.dispatch("setStudentDetails", value);
    },
    viewDetails(student) {
      this.$store.dispatch("setStudentDetails", student).then(() => {
        this.$router.push("/student-progress");
      });
    },
    formatDate(date) {
      if (date) {
        let newFormat = new Date(date);
        let newDate = `${newFormat}`.substring(4, 15);
        return newDate.replace(/ /g, " - ");
      } else {
        return "Not set";
      }
    },
    callToAction(status) {
      if (
        status === "submitted" ||
        status === "clearedByExaminer" ||
        status === "vivaDateSet"
      )
        return true;
      else return false;
    },
    sortStudentsByProcess(items, index, isDesc) {
      items.sort((a, b) => {
        if (index[0] == "status") {
          if (isDesc[0]) {
            return (
              this.sortOrder.indexOf(a.status) -
              this.sortOrder.indexOf(b.status)
            );
          } else {
            return (
              this.sortOrder.indexOf(b.status) -
              this.sortOrder.indexOf(a.status)
            );
          }
        } else if (!isNaN(a[index[0]])) {
          if (!isDesc[0]) {
            return a[index[0]] - b[index[0]];
          } else {
            return b[index[0]] - a[index[0]];
          }
        } else {
          if (!isDesc[0]) {
            return a[index[0]] < b[index[0]] ? -1 : 1;
          } else {
            return b[index[0]] < a[index[0]] ? -1 : 1;
          }
        }
      });
      return items;
    },
    columnValueList(val) {
      return this.reports.map((d) => d[val]);
    },
  },
  components: {
    AssignExaminer,
    SetVivaDate,
    SetVivaScore,
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
