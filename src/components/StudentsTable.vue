<template>
  <v-card elevation="18" width="100%" color="teal lighten-2">
    <v-card-title>
      <span class="mx-auto font-weight-bold sub-heading">Students</span>
    </v-card-title>
    <v-card-subtitle class="py-1">
      <v-row>
        <template v-if="user.role === 'principal'">
          <v-col
            cols="12"
            xs="12"
            sm="6"
            md="4"
            class="text-xs-left"
            align-self="center"
          >
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
          <v-col
            cols="12"
            xs="12"
            sm="6"
            md="4"
            class="text-xs-left"
            align-self="center"
          >
            <v-select
              label="Filter by department"
              :class="{
                'select-department':
                  !$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm,
              }"
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
              :class="{
                'dean-select-department':
                  !$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm,
              }"
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

        <v-col cols="12" xs="12" :sm="user.role === 'dean' ? '6' : '12'" md="4">
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
      :expanded.sync="expanded"
      @click:row="itemClicked"
      show-expand
      @item-expanded="itemExpanded"
      item-key="_id"
      :loading="tableLoading"
      :loader-height="tableLoaderHeight"
      :key="studentsTableKey"
      class="fill-height-container"
    >
      <template v-slot:header="{ props: { headers } }">
        <thead>
          <tr>
            <th :colspan="headers.length - 1">
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
                  <template v-slot:item="{ item }">{{
                    progressEvents[`${item}`].message
                  }}</template>
                  <template v-slot:selection="{ item }"
                    >{{ progressEvents[`${item}`].message }}, &nbsp;</template
                  >
                </v-select>
              </div>
            </th>
            <th>
              <v-row align="center" justify="center">
                <v-col>
                  <v-btn @click="fetchReports" icon>
                    <v-icon color="primary">mdi-replay</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </th>
          </tr>
          <tr v-show="displayStudentTableFeedback && displayInTable">
            <th :colspan="headers.length">
              <v-alert color="success" dark class="text-center" dismissible>{{
                studentsTableMessage
              }}</v-alert>
            </th>
          </tr>
        </thead>
      </template>

      <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning"
          >Your search for "{{ search }}" found no results.</v-alert
        >
      </template>
      <template v-slot:[getItemName]="{ item }"
        >{{ item.student.firstName }} {{ item.student.lastName }}
      </template>
      <template v-slot:[getItemStatus]="{ item }">{{
        progressEvents[`${item.status}`].message
      }}</template>
      <template v-slot:[getItemVivaDate]="{ item }">{{
        formatDate(item.viva)
      }}</template>
      <template v-slot:[getItemAction]="{ item }">
        <v-icon small v-if="callToAction(item.status)" color="pink"
          >mdi-circle</v-icon
        >
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
                <strong
                  >{{ progressEvents[`${item.status}`].value }}% ({{
                    progressEvents[`${item.status}`].message
                  }})</strong
                >
              </v-progress-linear>
            </v-col>
            <v-col cols="12" sm="3" md="2">
              <v-row
                v-if="
                  item.status === 'submitted' ||
                  item.status === 'assignedToExaminers'
                "
                align="center"
                justify="center"
                no-gutters
              >
                <v-col>
                  <v-dialog v-model="previewReportDialog" width="700">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn v-bind="attrs" v-on="on" color="primary"
                        >Preview report</v-btn
                      >
                    </template>
                    <v-card>
                      <v-card-title
                        class="text-center headline purple white--text"
                        >Previewing {{ item.student.firstName }}
                        {{ item.student.lastName }}'s report
                        <v-spacer></v-spacer>
                        <v-btn
                          @click="viewDetails(item)"
                          dark
                          large
                          icon
                          :loading="detailLoading"
                        >
                          <v-icon large dark> mdi-open-in-new </v-icon>
                        </v-btn>
                      </v-card-title>
                      <v-card-text class="py-3 px-6">
                        <v-alert 
                          v-if="displayStudentTableFeedback && !displayInTable"
                          class="text-center"
                          dark
                          dismissible
                          :color="studentsTableMessage.includes('Error')?'error':'success'" 
                        >
                          {{studentsTableMessage}}
                        </v-alert>
                        <p class="body-1">
                          <strong>Title:</strong> {{ item.title }}
                        </p>
                        <p class="body-1">
                          <strong>Abstract:</strong> {{ item.abstract }}
                        </p>
                        <p class="body-1">
                          <span>
                            <strong>Report file:</strong>
                          </span>
                          <span class="subheading"
                            >&nbsp;
                            <a :href="item.reportURL" target="_blank">
                              {{ item.title }}
                            </a>
                          </span>
                        </p>
                        <p class="body-1">
                          <strong>Currently assigned examiners</strong>
                          <span v-if="item.examiners.length === 0"
                            >&nbsp;None
                          </span>
                          <span v-else>
                            <v-row>
                              <v-col
                                v-for="(examiner, index) in item.examiners"
                                :key="index"
                                cols="12"
                                sm="4"
                              >
                                <v-hover v-slot:default="{ hover }">
                                  <v-alert
                                    border="left"
                                    colored-border
                                    :color="examinerStatus[examiner.status].color"
                                    elevation="2"
                                    :class="hover ? 'pb-0 mb-0':''"
                                  >
                                    <div class="pb-2">
                                      <v-icon color="black">mdi-account</v-icon>
                                      {{ examiner.examiner.lastName }}
                                      {{ examiner.examiner.firstName }}
                                    </div>
                                    <div class="text-capitalize pb-2">
                                      <v-icon color="black">mdi-account-convert</v-icon>
                                      {{ examiner.examinerType }}
                                    </div>
                                    <div>
                                      <v-icon :color="examinerStatus[examiner.status].color">mdi-progress-check</v-icon>
                                      {{ examinerStatus[examiner.status].text }}
                                    </div>
                                      <div :class="hover ? 'd-block':'d-none'" class="text-center">
                                        <v-btn @click="setExaminerToRemove(examiner)" icon color="primary">
                                          <v-icon>mdi-account-remove</v-icon>
                                        </v-btn>
                                      </div>
                                  </v-alert>
                                </v-hover>
                              </v-col>
                              <v-dialog v-model="confirmExaminerRemovalDialog" width="500">
                                <v-card>
                                  <v-card-title>
                                    Are you sure?
                                  </v-card-title>
                                  <v-card-text v-if="examinerToRemove.examiner" class="body-1">
                                    By performing this action, you will <strong>disinvite</strong> 
                                    {{examinerToRemove.examiner.lastName}} {{ examinerToRemove.examiner.firstName }} from assessing 
                                    {{ item.student.firstName }} {{ item.student.lastName }}'s report.
                                    <div class="text-right pt-2">
                                      <v-btn @click="confirmExaminerRemovalDialog = false" text color="primary"> Cancel</v-btn>
                                      <v-btn @click="removeExaminer(item)" :loading="submitLoading" color="error">Remove</v-btn>
                                    </div>
                                  </v-card-text>
                                </v-card>
                              </v-dialog>
                            </v-row>
                          </span>
                        </p>

                        <v-row align="center" justify="center">
                          <v-col>
                            <AssignExaminer />
                          </v-col>
                          <v-col>
                            <SetVivaCommittee />
                          </v-col>
                        </v-row>
                      </v-card-text>
                      <v-divider></v-divider>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="primary"
                          text
                          @click="previewReportDialog = false"
                          >Close</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-col>
              </v-row>
              <v-row
                v-else-if="item.status === 'clearedByExaminers'"
                align="center"
                justify="center"
                no-gutters
              >
                <SetVivaDate />
              </v-row>
              <v-row
                v-else-if="item.status === 'vivaDateSet'"
                align="center"
                justify="center"
              >
                <v-col>
                  <SetVivaScore />
                </v-col>
              </v-row>
              <v-row
                v-else-if="
                  item.status === 'vivaComplete' && !item.vivaCommitteeReport
                "
                align="center"
                justify="center"
              >
                <UploadVivaCommitteeReport />
              </v-row>

              <v-row v-else align="center" justify="center" no-gutters>
                <div class="text-center">
                  <v-btn
                    @click="viewDetails(item)"
                    color="primary"
                    :loading="detailLoading"
                    >View Details</v-btn
                  >
                </div>
              </v-row>
            </v-col>
          </v-row>
        </td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import AssignExaminer from "@/components/AssignExaminer.vue";
import SetVivaDate from "@/components/SetVivaDate.vue";
import SetVivaCommittee from "@/components/SetVivaCommittee.vue";
import SetVivaScore from "@/components/SetVivaScore.vue";
import UploadVivaCommitteeReport from "@/components/UploadVivaCommitteeReport.vue";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      search: "",
      tableLoaderHeight: 8,
      previewReportDialog: false,
      confirmExaminerRemovalDialog: false,
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
          value: "student.firstName",
        },
        {
          text: "PROGRAM",
          value: "student.program.name",
        },
        { text: "STATUS", value: "status" },
        { text: "VIVA DATE", value: "viva.vivaEvent.eventDate" },
        { value: "data-table-expand" },
      ],
      sortOrder: [
        "notSubmitted",
        "submitted",
        "assignedToExaminers",
        "receivedByExaminers",
        "clearedByExaminers",
        "vivaDateSet",
        "vivaComplete",
        "complete",
      ],
      examinerStatus: {
        assignedToExaminer: {
          text: "Pending reply",
          color: "primary"
        },
        withExaminer: {
          text: "Accepted",
          color: "success"
        },
        rejectedByExaminer: {
          text: "Rejected",
          color: "error"
        },
        clearedByExaminer: {
          text: "Report cleared",
          color: "success"
        },
      },
      defaultSortOrder: {
        submitted: 0,
        clearedByExaminers: 1,
        vivaDateSet: 2,
        notSubmitted: 3,
        assignedToExaminers: 4,
        receivedByExaminers: 5,
        withExaminer: 6,
        vivaComplete: 7,
        complete: 8,
      },
      displayAssignExaminerMessage: false,
      selectedSchool: null,
      selectedDepartment: null,
      examinerToRemove: {}
    };
  },
  async created() {
    if (this.user.role === "dean") {
      await this.$store.dispatch("fetchDepartments", this.user.school);
    }
    await this.$store.dispatch("fetchReports");
  },
  mounted() {
    this.$store.dispatch("setDisplayStudentTableFeedback", false);
  },
  updated() {
    if (this.displayStudentTableFeedback) {
      setTimeout(() => {
        this.$store.dispatch("setDisplayStudentTableFeedback", false);
      }, 10000);
    }
  },
  computed: {
    ...mapGetters([
      "progressEvents",
      "tableLoading",
      "detailLoading",
      "departments",
      "schools",
      "user",
      "student",
      "submitLoading",
      "displayStudentTableFeedback",
      "displayInTable",
      "studentsTableMessage",
      "studentsTableKey",
      "examiners",
    ]),
    filteredStudents() {
      return this.reports.filter((d) => {
        return Object.keys(this.filters).every((f) => {
          return this.filters[f].length < 1 || this.filters[f].includes(d[f]);
        });
      });
    },
    reports() {
      let reports = this.$store.getters.reports;
      if (this.selectedSchool) {
        reports = reports.filter((report) => {
          return report.student["department"].school == this.selectedSchool._id;
        });
      }
      if (this.selectedDepartment) {
        reports = reports.filter((report) => {
          return (
            report.student["department"]._id == this.selectedDepartment._id
          );
        });
      }
      return reports.sort(
        (a, b) =>
          this.defaultSortOrder[a.status] - this.defaultSortOrder[b.status]
      );
    },
    getItemName() {
      return `item.student.firstName`;
    },
    getItemStatus() {
      return `item.status`;
    },
    getItemVivaDate() {
      return `item.viva.vivaEvent.eventDate`;
    },
    getItemAction() {
      return `item.action`;
    },
  },
  methods: {
    setExaminerToRemove(examiner){
      this.examinerToRemove = examiner;
      this.confirmExaminerRemovalDialog = true;
    },
    async removeExaminer(report){
      await this.$store.dispatch("removeExaminer", {
        reportID: report._id,
        examinerID: this.examinerToRemove.examiner._id,
        examinerName: `${this.examinerToRemove.examiner.lastName} ${this.examinerToRemove.examiner.firstName}`,
        studentName: `${report.student.lastName} ${report.student.firstName}`
      });
      await this.fetchReports();
      this.$store.dispatch("changeStudentsTableKey");
    },
    async fetchReports() {
      await this.$store.dispatch("fetchReports");
      this.selectedDepartment = null;
      this.selectedSchool = null;
    },
    async fetchDepartments() {
      await this.$store.dispatch("fetchDepartments", this.selectedSchool._id);
    },
    itemClicked(value) {
      console.log(value);
      const index = this.expanded.indexOf(value);
      if (index === -1) {
        this.expanded.push(value);
      } else {
        this.expanded.splice(index, 1);
      }
      this.$store.dispatch("setSelectedStudent", value);
    },
    itemExpanded(value) {
      console.log("Item: ", value.item);
      this.$store.dispatch("setSelectedStudent", value.item);
    },
    viewDetails(report) {
      this.$router.push(`/student-progress/${report._id}`);
    },
    formatDate(viva) {
      if (viva && viva.vivaEvent) {
        let newFormat = new Date(viva.vivaEvent.eventDate);
        let newDate = `${newFormat.toLocaleTimeString(
        {},
        {
          hour12: true,
          hour: "numeric",
          minute: "numeric",
        }
      )}, ${newFormat.toString().substring(4, 15)}`;
        return newDate;
      } else {
        return "Not set";
      }
    },
    callToAction(status) {
      if (
        status === "submitted" ||
        status === "clearedByExaminers" ||
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
    SetVivaCommittee,
    SetVivaScore,
    UploadVivaCommitteeReport,
  },
};
</script>
<style>
.select-department {
  width: 90%;
}
.dean-select-department {
  width: 50%;
}
</style>
