<template>
  <v-card color="blue">
    <v-card-title>
      <span class="mx-auto font-weight-bold headline white--text">Assigned Students</span>
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
      :items-per-page="itemsPerPage"
      show-expand
      ref="assignedStudentsTable"
      item-key="_id"
    >
      <template v-slot:no-results>
        <v-alert
          :value="true"
          color="error"
          icon="warning"
        >Your search for "{{ search }}" found no results.</v-alert>
      </template>
      <template v-slot:header="{ props: { headers } }">
        <thead v-show="displayStudentTableFeedback">
          <tr>
            <th :colspan="headers.length">
              <v-alert
                v-if="receiveReportMessage"
                color="success"
                dark
                class="text-center mt-2"
                dismissible
              >You've acknowledged receipt of {{ receivedReportStudent }}'s report</v-alert>
              <v-alert
                v-if="clearReportMessage"
                color="success"
                dark
                class="text-center mt-2"
                dismissible
              >You've cleared {{ clearedReportStudent }}'s report.</v-alert>
            </th>
          </tr>
        </thead>
      </template>
      <template v-slot:item.status="{ item }">{{ progressEvents[`${item.status}`].message }}</template>
      <template v-slot:item.vivaDate="{ item }">{{ formatDate(item.vivaDate) }}</template>
      <template v-slot:item.action="{ item }">
        <v-icon small v-if="callToAction(item.status)" color="pink">mdi-circle</v-icon>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <v-row align="center" justify="center" class="px-0">
            <v-col cols="12" sm="9">
              <v-progress-linear
                :value="progressEvents[`${item.status}`].value"
                :color="progressEvents[`${item.status}`].color"
                height="25"
              >
                <strong>{{progressEvents[`${item.status}`].value}}% ({{progressEvents[`${item.status}`].message}})</strong>
              </v-progress-linear>
            </v-col>
            <v-col cols="12" sm="3">
              <div class="text-center">
                <div class="text-center" v-if="item.status === 'submitted'">
                  <v-dialog v-model="dialog" width="500">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        v-bind="attrs"
                        v-on="on"
                        :loading="submitLoading"
                        color="primary"
                      >Receive report</v-btn>
                    </template>

                    <v-card>
                      <v-card-title
                        class="text-center headline purple white--text"
                      >Acknowledge Receipt</v-card-title>
                      <v-card-text class="py-3 px-6">
                        <p class="body-1">
                          By clicking the "Agree" button, you are acknowledging receipt of
                          <strong>{{ receivedReportStudent }}</strong>'s report.
                        </p>
                      </v-card-text>
                      <v-divider></v-divider>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="error" text @click="dialog = false">Cancel</v-btn>
                        <v-btn color="success" text @click="receiveReport">Agree</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </div>
                <div class="text-center" v-else-if="item.status === 'withExaminer'">
                  <v-dialog v-model="dialog" width="500">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        v-bind="attrs"
                        v-on="on"
                        :loading="submitLoading"
                        color="primary"
                      >Set score</v-btn>
                    </template>

                    <v-card>
                      <v-card-title class="text-center headline purple white--text">Set a score</v-card-title>
                      <v-card-text class="py-3 px-6">
                        <p class="body-1">
                          Set a score for
                          <strong>{{ examinerStudentDetails.name }}</strong>'s report.
                        </p>
                        <v-form ref="reportScore">
                          <v-text-field
                            min="0"
                            max="100"
                            :rules="scoreRules"
                            v-model="score"
                            label="Set score"
                            type="number"
                          ></v-text-field>
                        </v-form>
                      </v-card-text>
                      <v-divider></v-divider>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="error" text @click="dialog = false">Cancel</v-btn>
                        <v-btn color="success" text @click="setReportScore">Save</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </div>
                <v-btn
                  v-else
                  @click="viewDetails(item)"
                  :loading="detailLoading"
                  color="primary"
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
export default {
  data() {
    return {
      search: "",
      expanded: [],
      receivedReportStudent: "",
      itemsPerPage: 6,
      clearedReportStudent: "",
      score: null,
      dialog: false,
      scoreRules: [
        (score) => !!score || "A score is required",
        (score) => (score < 100 && score >= 0) || "Invalid score",
      ],
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
      defaultSortOrder: {
        submitted: 0,
        withExaminer: 1,
        vivaDateSet: 2,
        notSubmitted: 3,
        clearedByExaminer: 4,
        vivaComplete: 5,
      },
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
    };
  },
  created() {
    this.$store.dispatch("fetchAssignedStudents");
  },
  mounted() {
    this.$store.dispatch("setDisplayStudentTableFeedback", false);
  },
  computed: {
    assignedStudents() {
      let reports = this.$store.getters.assignedStudents;
      return reports.sort(
        (a, b) =>
          this.defaultSortOrder[a.status] - this.defaultSortOrder[b.status]
      );
    },
    examinerStudentDetails() {
      return this.$store.getters.examinerStudentDetails;
    },
    submitLoading() {
      return this.$store.getters.submitLoading;
    },
    detailLoading() {
      return this.$store.getters.detailLoading;
    },
    displayStudentTableFeedback() {
      return this.$store.getters.displayStudentTableFeedback;
    },
    receiveReportMessage() {
      return this.$store.getters.receiveReportMessage;
    },
    clearReportMessage() {
      return this.$store.getters.clearReportMessage;
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
      this.$store.dispatch("setExaminerStudentDetails", value.student);
    },
    viewDetails(student) {
      this.$store.dispatch("setStudentDetails", student).then(() => {
        this.$router.push("/student-progress");
      });
    },
    callToAction(status) {
      if (status === "submitted" || status === "withExaminer") return true;
      else return false;
    },
    formatDate(date) {
      if (date) {
        let newFormat = new Date(date);
        let newDate = `${newFormat}`.substring(4, 15);
        return newDate.replace(/ /g, " - ");
      } else return "Not set";
    },
    receiveReport() {
      this.receivedReportStudent = this.examinerStudentDetails.name;
      this.$store
        .dispatch("receiveReport", this.examinerStudentDetails.report)
        .then(() => {
          this.dialog = false;
          this.$store.dispatch("fetchAssignedStudents").then(() => {
            this.$refs.assignedStudentsTable.$forceUpdate();
          });
        });
    },
    setReportScore() {
      this.clearedReportStudent = this.examinerStudentDetails.name;
      if (this.$refs.reportScore.validate()) {
        this.$store
          .dispatch("clearStudentReport", {
            report: this.examinerStudentDetails.report,
            score: {
              examinerScore: this.score,
            },
          })
          .then(() => {
            this.dialog = false;
            this.$store.dispatch("fetchAssignedStudents").then(() => {
              this.$refs.assignedStudentsTable.$forceUpdate();
            });
          });
      }
    },
  },
};
</script>
