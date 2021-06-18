<template>
  <v-card color="blue">
    <v-card-title>
      <span class="mx-auto font-weight-bold headline white--text"
        >Assigned Students</span
      >
    </v-card-title>
    <v-card-subtitle class="py-1">
      <v-row>
        <v-col>
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
      :items="assignedStudents"
      :search="search"
      :expanded="expanded"
      @click:row="itemClicked"
      @item-expanded="itemExpanded"
      show-expand
      ref="assignedStudentsTable"
      item-key="_id"
      :key="assignedStudentsTableKey"
    >
      <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning"
          >Your search for "{{ search }}" found no results.</v-alert
        >
      </template>
      <template v-slot:header="{ props: { headers } }">
        <thead v-show="displayStudentTableFeedback">
          <tr>
            <th :colspan="headers.length">
              <v-alert
                color="success"
                dark
                class="text-center mt-2"
                dismissible
                >{{ assignedStudentsTableMessage }}</v-alert
              >
            </th>
          </tr>
        </thead>
      </template>
      <template v-slot:[getItemStatus]="{ item }">{{
        examinerStatus[`${item.status}`].text
      }}</template>
      <template v-slot:[getItemDeadline]="{ item }">
       {{ formatDeadline(item.receivedAt) }}
      </template>
      <template v-slot:[getItemAction]="{ item }">
        <v-icon small v-if="callToAction(item.status)" color="pink"
          >mdi-circle</v-icon
        >
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <v-row align="center" justify="center" class="px-0">
            <v-col cols="12" sm="9">
              <v-progress-linear
                :value="examinerStatus[`${item.status}`].value"
                :color="examinerStatus[`${item.status}`].chartColor"
                height="25"
              >
                <strong :class="examinerStatus[`${item.status}`].value > 33 ? 'white--text' : 'black--text'"
                  >{{ examinerStatus[`${item.status}`].value }}% ({{
                    examinerStatus[`${item.status}`].text
                  }})</strong
                >
              </v-progress-linear>
            </v-col>
            <v-col cols="12" sm="3">
              <div class="text-center">
                <div
                  class="text-center"
                  v-if="
                    item.report.status === 'submitted' ||
                    item.report.status === 'assignedToExaminers' ||
                    item.report.status === 'receivedByExaminers'
                  "
                >
                  <div
                    v-if="item.status === 'assignedToExaminer'"
                    class="text-center"
                  >
                    <div class="text-center">
                      <v-dialog v-model="previewReportDialog" width="700">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn v-bind="attrs" v-on="on" color="primary"
                            >Preview report</v-btn
                          >
                        </template>
                        <v-card>
                          <v-card-title
                            class="text-center headline purple white--text"
                            >Previewing {{ item.report.student.name }}'s
                            report</v-card-title
                          >
                          <v-card-text class="py-3 px-6">
                            <p class="body-1">
                              <strong>Title:</strong> {{ item.report.title }}
                            </p>
                            <p class="body-1">
                              <strong>Abstract:</strong>
                              {{ item.report.abstract }}
                            </p>
                            <p class="body-1">
                              <strong>Report:</strong>
                              <span class="subheading"
                                >&nbsp;
                                <a
                                  :href="item.report.reportURL"
                                  target="_blank"
                                >
                                  {{ item.report.title }}
                                </a>
                              </span>
                            </p>
                            <p>
                              <v-icon color="primary"
                                >mdi-information-outline</v-icon
                              >
                              By cliking <i>Agree</i>, you accept to assess the
                              student's report. Otherwise, clicking
                              <i>Reject</i> will allow for another examiner to
                              be assigned to this report.
                            </p>
                            <div class="text-center">
                              <v-btn
                                color="error"
                                text
                                :loading="submitLoading"
                                @click="rejectReport"
                                >Reject</v-btn
                              >
                              <v-dialog
                                v-model="receiveReportDialog"
                                width="500"
                              >
                                <template v-slot:activator="{ on, attrs }">
                                  <v-btn
                                    color="success"
                                    text
                                    v-bind="attrs"
                                    v-on="on"
                                    >Agree</v-btn
                                  >
                                </template>

                                <v-card>
                                  <v-card-title
                                    class="text-center headline purple white--text"
                                    >Acknowledge Receipt</v-card-title
                                  >
                                  <v-card-text class="py-3 px-6">
                                    <p class="body-1">
                                      By clicking the "Agree" button, you are
                                      acknowledging receipt of
                                      <strong
                                        v-if="examinerStudentDetails.student"
                                        >{{
                                          examinerStudentDetails.student.name
                                        }}</strong
                                      >'s report.
                                    </p>
                                  </v-card-text>
                                  <v-divider></v-divider>
                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                      color="error"
                                      text
                                      @click="receiveReportDialog = false"
                                      >Cancel</v-btn
                                    >
                                    <v-btn
                                      :loading="submitLoading"
                                      color="success"
                                      text
                                      @click="receiveReport"
                                      >Agree</v-btn
                                    >
                                  </v-card-actions>
                                </v-card>
                              </v-dialog>
                            </div>
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
                    </div>
                  </div>
                  <div v-else-if="item.status === 'withExaminer'">
                    <v-btn
                      @click="viewReport(item)"
                      :loading="detailLoading"
                      color="primary"
                      >Assess</v-btn
                    >
                  </div>
                  <div
                    v-else-if="
                      item.status === 'rejectedByExaminer' ||
                      item.status === 'clearedByExaminer'
                    "
                  >
                    <v-btn
                      @click="viewDetails(item)"
                      :loading="detailLoading"
                      color="primary"
                      >View Details</v-btn
                    >
                  </div>
                </div>

                <div v-else>
                  <v-btn
                    @click="viewDetails(item)"
                    :loading="detailLoading"
                    color="primary"
                    >View Details</v-btn
                  >
                </div>
              </div>
            </v-col>
          </v-row>
        </td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      search: "",
      expanded: [],
      assignedStudentsTableKey: 0,
      receiveReportDialog: false,
      previewReportDialog: false,
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
          value: "report.student.name",
        },
        {
          text: "PROGRAM",
          value: "report.student.program.name",
        },
        { text: "STATUS", value: "status" },
        { text: "DEADLINE", value: "receivedAt" },
        { value: "data-table-expand" },
      ],
      examinerStatus: {
        assignedToExaminer: {
          text: "Pending reply",
          color: "primary",
          chartColor: "#FFB74D",
          value: 33
        },
        withExaminer: {
          text: "Accepted",
          color: "success",
          chartColor: "#81C784",
          value: 67
        },
        rejectedByExaminer: {
          text: "Rejected",
          color: "error",
          chartColor: "#F4511E",
          value: 100
        },
        clearedByExaminer: {
          text: "Report cleared",
          color: "success",
          chartColor: "#4CAF50",
          value: 100
        },
      },
      defaultSortOrder: {
        assignedToExaminer: 0,
        withExaminer: 1,
        clearedByExaminer: 2,
        rejectedByExaminer: 3,
      },
    };
  },
  async created() {
    await this.$store.dispatch("fetchAssignedStudents");
  },
  mounted() {
    this.$store.dispatch("setDisplayStudentTableFeedback", false);
  },
  updated() {
    if (this.displayStudentTableFeedback) {
      setTimeout(() => {
        this.$store.dispatch("setDisplayStudentTableFeedback", false);
      }, 15000);
    }
  },
  computed: {
    ...mapGetters([
      "examinerStudentDetails",
      "submitLoading",
      "detailLoading",
      "displayStudentTableFeedback",
      "assignedStudentsTableMessage",
    ]),
    assignedStudents() {
      let reports = this.$store.getters.assignedStudents;
      // console.log(reports);
      return reports.sort(
        (a, b) =>
          this.defaultSortOrder[a.status] -
          this.defaultSortOrder[b.status]
      );
    },
    getItemStatus() {
      return `item.status`;
    },
    getItemDeadline() {
      return `item.receivedAt`;
    },
    getItemAction() {
      return `item.action`;
    },
  },
  methods: {
    itemClicked(value) {
      const index = this.expanded.indexOf(value);
      if (index === -1) {
        this.expanded.push(value);
      } else {
        this.expanded.splice(index, 1);
      }
      this.$store.dispatch("setExaminerStudentDetails", value.report);
    },
    itemExpanded(value) {
      console.log("Item: ", value.item);
      this.$store.dispatch("setExaminerStudentDetails", value.item.report);
    },
    async viewDetails(student) {
      this.$store.dispatch("setStaffStudentDetails", student.report);
      this.$router.push(`/student-progress/${student.report._id}`);
    },
    async viewReport(report) {
      await this.$store.dispatch("setExaminerStudentDetails", report.report);
      await this.$store.dispatch("fetchReportComments", report.report._id);
      this.$router.push("/student-report");
    },
    callToAction(status) {
      return status === "assignedToExaminer";
    },
    formatDate(date) {
      if (date) {
        let newFormat = new Date(date);
        let newDate = `${newFormat}`.substring(4, 15);
        return newDate.replace(/ /g, "-");
      } else return "Not set";
    },
    formatDeadline(date){
      if(date){
        let threeMonthsFromAcceptance = new Date(new Date(date).getTime() + 1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 90);
        let newDate = `${threeMonthsFromAcceptance}`.substring(4, 15);
        return newDate.replace(/ /g, "-");
      } else {
        return "Not set"
      }
    },
    async rejectReport() {
      await this.$store.dispatch("rejectReport", {
        report: this.examinerStudentDetails._id,
        studentName: this.examinerStudentDetails.student.name,
      });
      this.receiveReportDialog = false;
      this.previewReportDialog = false;
      await this.$store.dispatch("fetchAssignedStudents");
      this.assignedStudentsTableKey++;
    },
    async receiveReport() {
      await this.$store.dispatch("receiveReport", {
        report: this.examinerStudentDetails._id,
        studentName: this.examinerStudentDetails.student.name,
      });
      this.receiveReportDialog = false;
      this.previewReportDialog = false;
      await this.$store.dispatch("fetchAssignedStudents");
      this.assignedStudentsTableKey++;
    },
  },
};
</script>
