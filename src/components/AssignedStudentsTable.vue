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
        <span v-if="item.clearedAt">Met</span>
        <span v-else>
          {{ formatDeadline(item.receivedAt).daysLeft }} 
          <span v-if="typeof formatDeadline(item.receivedAt).daysLeft === 'number'">days left</span>
        </span>
        
        <v-tooltip v-if="item.receivedAt" top>
          <template v-slot:activator="{ on, attrs }">
            <span v-bind="attrs" v-on="on">
              <v-btn v-if="item.clearedAt" icon>
                <v-icon color="success">mdi-check-circle</v-icon>
              </v-btn>
              <v-btn v-else icon>
                <v-icon 
                  :color="formatDeadline(item.receivedAt).daysLeft > 7 ? 'primary' :
                  formatDeadline(item.receivedAt).daysLeft > 1 ? 'warning' : 'error'
                  "
                >mdi-information-outline</v-icon>
              </v-btn>
            </span>
          </template>
          <span>{{ formatDeadline(item.receivedAt).actualDate }}</span>
        </v-tooltip>
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
                <div class="text-center">
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
                              <!-- Accepting of report dialog -->
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
                                        v-if="examinerStudentDetails.report"
                                        >{{
                                          examinerStudentDetails.report.student.name
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

                              <!-- Rejection of report dialog -->
                              <v-dialog
                                v-model="rejectReportDialog"
                                width="500"
                              >
                                <template v-slot:activator="{ on, attrs }">
                                  <v-btn
                                    v-bind="attrs"
                                    v-on="on"
                                    color="error"
                                    text
                                    >Reject</v-btn
                                  >                                
                              </template>

                                <v-card>
                                  <v-card-title
                                    class="text-center headline purple white--text"
                                    >Reject invitation to assess</v-card-title
                                  >
                                  <v-card-text class="py-3 px-6">
                                    <p class="body-1">
                                      By clicking the "Reject" button, you are rejecting an invitation to assess                                       <strong
                                        v-if="examinerStudentDetails.report"
                                        >{{
                                          examinerStudentDetails.report.student.name
                                        }}</strong
                                      >'s report. <br />
                                      Please include a reason for rejecting this invitation 
                                    </p>
                                    <p>
                                      <v-form ref="rejectionReasonForm">
                                        <v-textarea
                                          v-model="rejectionReason"
                                          label="Rejection reason"
                                          :rules="required"
                                        ></v-textarea>
                                      </v-form>
                                    </p>
                                  </v-card-text>
                                  <v-divider></v-divider>
                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn
                                      color="primary"
                                      text
                                      @click="rejectReportDialog = false"
                                      >Cancel</v-btn
                                    >
                                    <v-btn
                                      color="error"
                                      text
                                      :loading="submitLoading"
                                      @click="rejectReport"
                                      >Reject</v-btn
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
                  <v-dialog v-model="studentDetailsDialog" width="600">
                    <template v-slot:activator="{on, attrs}">
                      <v-btn v-bind="attrs" v-on="on" color="primary"
                        >View Details</v-btn
                      >
                    </template>
                    <v-card>
                      <v-card-title
                          class="text-center headline purple white--text"
                          >Student details</v-card-title
                        >
                        <v-card-text class="px-6 pt-6 pb-0">
                          <!-- Student details -->
                          <div v-if="examinerStudentDetails.report">
                            <p class="body-1">
                              <strong>Name:</strong> {{ examinerStudentDetails.report.student.name }}
                            </p>
                            <p class="body-1">
                              <strong>Program:</strong>
                              {{ examinerStudentDetails.report.student.program.name }}
                            </p>
                            
                            <p class="body-1">
                              <strong>Report title:</strong> {{ examinerStudentDetails.report.title }}
                            </p>
                            <p class="body-1">
                              <strong>Abstract:</strong>
                              {{ examinerStudentDetails.report.abstract }}
                            </p>
                            <p class="body-1">
                              <strong>Report:</strong>
                              <span class="subheading"
                                >&nbsp;
                                <a
                                  :href="examinerStudentDetails.report.reportURL"
                                  target="_blank"
                                >
                                  {{ examinerStudentDetails.report.title }}
                                </a>
                              </span>
                            </p>
                          </div>

                          <!-- Examiner details -->
                          <div v-if="examinerStudentDetails.status === 'clearedByExaminer'">
                            <p class="body-1 mb-0">
                              <strong>Assigned:</strong> {{ formatDate(examinerStudentDetails.assignedAt) }}
                            </p>
                            <p class="body-1 mb-0">
                              <strong>Received:</strong> {{ formatDate(examinerStudentDetails.receivedAt) }}
                            </p>
                            <p class="body-1">
                              <strong>Cleared:</strong> {{ formatDate(examinerStudentDetails.clearedAt) }}
                            </p>
                            <p class="body-1">
                              <strong>Grade assigned:</strong> &nbsp; 
                              <span class="primary--text font-weight-bold">{{ examinerStudentDetails.examinerScore }}</span>
                            </p>
                          </div>
                        </v-card-text>
                        <v-card-actions class="pb-6 pr-6">
                          <v-spacer></v-spacer>
                          <v-btn color="primary" @click="studentDetailsDialog = false">Close</v-btn>
                        </v-card-actions>
                    </v-card>
                  </v-dialog>
                  <v-dialog>

                  </v-dialog>
                    
                  </div>
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
      rejectionReason: "",
      required: [field => !!field || "Please include a rejection reason!"],
      assignedStudentsTableKey: 0,
      receiveReportDialog: false,
      studentDetailsDialog: false,
      previewReportDialog: false,
      rejectReportDialog: false,
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
      "examinerStatus",
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
      this.$store.dispatch("setExaminerStudentDetails", value);
    },
    itemExpanded(value) {
      console.log("Item: ", value.item);
      this.$store.dispatch("setExaminerStudentDetails", value.item);
    },
    async viewReport(assessment) {
      this.$store.dispatch("setExaminerStudentDetails", assessment);
      await this.$store.dispatch("fetchReportComments", assessment.report._id);
      this.$router.push(`/student-report/${assessment._id}`);
    },
    callToAction(status) {
      return status === "assignedToExaminer";
    },
    formatDate(date) {
      if (date) {
        let monthDay = new Date(date);
        return `${monthDay.toLocaleTimeString(
          {},
          {
            hour12: true,
            hour: "numeric",
            minute: "numeric",
          }
        )}, ${new String(monthDay).substring(4, 15)}`;
      } else return "Not set";
    },
    formatDeadline(date){
      if(date){
        let threeMonthsFromAcceptance = new Date(date).getTime() + 1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/ * 90;
        let timeNow = new Date().getTime() + 1000 /*sec*/ * 60 /*min*/ * 60 /*hour*/ * 24 /*day*/;
        let daysLeft = Math.floor((threeMonthsFromAcceptance - timeNow)/(1000 * 60 * 60 * 24));
        return {
          actualDate: `${new Date(threeMonthsFromAcceptance).toLocaleTimeString({}, {hour12: true, hour: "numeric", minute: "numeric"})}, ${new String(new Date(threeMonthsFromAcceptance)).substring(4, 15)}`,
          daysLeft: daysLeft
        };
      } else {
        return {daysLeft: "Not set"};
      }
    },
    async rejectReport() {
      if(this.$refs.rejectionReasonForm.validate()){
        await this.$store.dispatch("rejectReport", {
          report: this.examinerStudentDetails.report._id,
          studentName: this.examinerStudentDetails.report.student.name,
          payload: {
            reason: this.rejectionReason
          }
        });
        this.rejectReportDialog = false;
        this.previewReportDialog = false;
        await this.$store.dispatch("fetchAssignedStudents");
        this.assignedStudentsTableKey++;
      }
    },
    async receiveReport() {
      await this.$store.dispatch("receiveReport", {
        report: this.examinerStudentDetails.report._id,
        studentName: this.examinerStudentDetails.report.student.name,
      });
      this.receiveReportDialog = false;
      this.previewReportDialog = false;
      await this.$store.dispatch("fetchAssignedStudents");
      this.assignedStudentsTableKey++;
    },
  },
};
</script>
