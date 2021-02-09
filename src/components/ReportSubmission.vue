<template>
  <div class="py-5">
    <div class="display-1 text-center font-weight-medium mb-4">
      Report submission
    </div>
    <v-tabs v-model="tab" color="purple" background-color="white" centered>
      <v-tabs-slider></v-tabs-slider>

      <v-tab>Create</v-tab>
      <v-tab-item class="mt-3">
        <v-card
          :max-width="$vuetify.breakpoint.xs ? '95vw' : '70vw'"
          class="mx-auto pa-5"
        >
          <h3 class="text-center">Create a report</h3>
          <v-alert
            dark
            dismissible
            v-if="
              studentReport.title && studentReport.status !== 'notSubmitted'
            "
            color="error"
            class="text-center"
            >Already submitted report!</v-alert
          >
          <v-alert
            dark
            dismissible
            v-else-if="displayReportActionMessage"
            color="success"
            class="text-center"
            >{{ reportActionMessage }}</v-alert
          >
          <h5 class="pt-4 pb-2">
            <span class="primary--text">Note:</span> This is not your final
            report submission!
          </h5>
          <h5 v-if="studentReport" class="pb-2">
            <v-icon class="mr-2" color="primary">mdi-alert-circle</v-icon>You've
            already created a report titled:
            <i class="body-2">{{ studentReport.title }}</i>
            <br />You'll only be editing the existing title and abstract
          </h5>
          <v-form ref="editReportForm">
            <p>
              <span class="body-1 font-weight-bold">Title:</span>
              <v-text-field
                outlined
                v-model="reportTitle"
                placeholder="Enter report title"
                type="text"
                :rules="required"
              ></v-text-field>
            </p>
            <p>
              <span class="body-1 font-weight-bold">Abstract:</span>
              <br />
              <span class="body-2">
                <v-icon color="primary" class="mr-2">mdi-alert-circle</v-icon
                >This is field is optional
              </span>
              <v-textarea
                outlined
                v-model="reportAbstract"
                :rules="[abstractRules.before]"
                label="Insert an abstract"
                :hint="words"
              ></v-textarea>
            </p>
            <v-row justify="end" class="px-3 pt-2">
              <v-btn
                @click="editReport"
                type="submit"
                :loading="detailLoading"
                dark
                color="teal"
                >submit</v-btn
              >
            </v-row>
          </v-form>
        </v-card>
      </v-tab-item>

      <v-tab>Submit</v-tab>
      <v-tab-item class="mt-3">
        <v-card
          :max-width="$vuetify.breakpoint.xs ? '95vw' : '70vw'"
          class="mx-auto pa-5"
          v-if="studentReport.title"
        >
          <h3 class="text-center">Submit final report</h3>
          <v-alert
            dark
            dismissible
            v-if="studentReport.status !== 'notSubmitted'"
            color="error"
            class="text-center"
            >Already submitted report!</v-alert
          >
          <v-alert
            dark
            dismissible
            v-else-if="displaySubmitReportMessage"
            color="success"
            class="text-center"
            >{{ reportSubmitMessage }}</v-alert
          >
          <p class="pt-3">
            <span class="body-1 font-weight-light">Title:</span>
            <span v-if="studentReport.title"
              >&nbsp;{{ studentReport.title }}</span
            >
            <span v-else>&nbsp;-</span>
          </p>
          <p>
            <span class="body-1 font-weight-light">Abstract:</span>
            <span v-if="studentReport.abstract"
              >&nbsp;<i class="body-2">{{ studentReport.abstract }}</i></span
            >
            <span v-else>&nbsp;-</span>
          </p>
          <p>
            <span class="body-1 font-weight-light">Upload status:</span>
            <span v-if="studentReport.status === 'submitted'"
              >&nbsp; Reported submitted</span
            >
            <span v-else-if="studentReport.title" class="subheading"
              >&nbsp; Report created</span
            >
            <span v-else>&nbsp;Report not created</span>
          </p>
          <p>
            <span class="body-1 font-weight-light">Due Date:</span>
            <span class="subheading">&nbsp;-</span>
          </p>
          <p class="mb-10">
            <span
              v-if="studentReport.status === 'submitted'"
              class="body-1 font-weight-light"
              >Submitted:</span
            >
            <span v-else-if="studentReport" class="body-1 font-weight-light"
              >Created:</span
            >
            <span v-if="studentReport.status === 'submitted'"
              >&nbsp;{{ formatDate(studentReport.submittedAt) }}</span
            >
            <span v-else-if="studentReport" class="subheading"
              >&nbsp; {{ formatDate(studentReport.createdAt) }}</span
            >
          </p>
          <v-form ref="submitReportForm">
            <p v-show="!studentReport.abstract">
              <span class="body-1 font-weight-bold">Abstract:</span>
              <v-textarea
                v-if="!studentReport.abstract"
                outlined
                v-model="reportAbstract"
                label="Insert an abstract"
                :rules="[abstractRules.before, abstractRules.after]"
                :hint="words"
              ></v-textarea>
            </p>
            <p>
              <span class="body-1 font-weight-bold">Report file:</span>
              <v-file-input
                label="File input"
                placeholder="Click here to upload your report"
                outlined
                counter
                v-model="report"
                :error="fileSelected"
                :error-messages="fileErrorMessage"
                :show-size="1000"
                truncate-length="100"
                prepend-icon="mdi-file-document"
                accept=".doc,.docx,.pdf"
              ></v-file-input>
            </p>
          </v-form>
          <v-row justify="end" class="px-3 pt-2">
            <v-dialog v-model="dialog" width="500">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  dark
                  :loading="submitReportLoading"
                  color="teal"
                  >submit</v-btn
                >
              </template>

              <v-card>
                <v-card-title class="text-center headline purple white--text"
                  >Confirm</v-card-title
                >
                <v-card-text class="py-3 px-6">
                  <p class="body-1">
                    <v-icon color="primary" class="mr-2"
                      >mdi-alert-circle</v-icon
                    >Once you submit this report, you cannot edit your
                    submission or re-submit
                  </p>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="error" text @click="dialog = false"
                    >Cancel</v-btn
                  >
                  <v-btn color="success" text @click="submitReport"
                    >Submit</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "report-submission",
  data() {
    return {
      report: null,
      reportTitle: "",
      reportAbstract: "",
      reportMessage: "",
      displayReportActionMessage: false,
      displaySubmitReportMessage: false,
      tab: null,
      tabs: 2,
      dialog: false,
      fileSelected: false,
      fileErrorMessage: [],
      abstractRules: {
        before: (abstract) =>
          this.countWords(abstract || "") < 100 ||
          "Your abstract should be less than 100 words!",
        after: (field) => !!field || "This field is required",
      },
      required: [(field) => !!field || "This field is required"],
    };
  },
  async mounted() {
    this.fileSelected = false;
    this.fileErrorMessage = [];
    await this.$store.dispatch("fetchLoggedInStudentDetails");
  },
  computed: {
    ...mapGetters([
      "student",
      "studentReport",
      "reportActionMessage",
      "detailLoading",
      "submitReportLoading",
      "reportSubmitMessage",
    ]),
    words() {
      return `Words: ${this.countWords(this.reportAbstract)}`;
    },
  },
  methods: {
    formatDate(timestamp) {
      let monthDay = new Date(timestamp);
      return `${monthDay.toLocaleTimeString(
        {},
        {
          hour12: true,
          hour: "numeric",
          minute: "numeric",
        }
      )}, ${new String(monthDay).substring(4, 15).replace(/ /g, "-")}`;
    },
    async editReport() {
      event.preventDefault();
      if (
        this.$refs.editReportForm.validate() &&
        (this.studentReport.status === "notSubmitted" ||
          this.studentReport === {})
      ) {
        let newReport = {};
        if (this.reportAbstract.length > 0) {
          newReport = {
            title: this.reportTitle,
            abstract: this.reportAbstract,
          };
        } else {
          newReport = {
            title: this.reportTitle,
          };
        }
        await this.$store.dispatch("editReport", newReport);
        this.displayReportActionMessage = true;
        await this.$store.dispatch("fetchLoggedInStudentDetails");
      }
    },
    async submitReport() {
      let finalAbstract = {};
      if (this.studentReport.abstract)
        finalAbstract = this.studentReport.abstract;
      else finalAbstract = this.reportAbstract;
      if (
        this.$refs.submitReportForm.validate() &&
        this.studentReport.status === "notSubmitted" &&
        this.checkUploadedReport()
      ) {
        let formData = new FormData();
        formData.append("report", this.report);
        formData.append("title", this.studentReport.title);
        formData.append("abstract", finalAbstract);
        formData.append("status", "submitted");
        await this.$store.dispatch("submitFinalReport", formData);
        if (this.reportSubmitMessage) {
          this.displaySubmitReportMessage = true;
        }
      }
      this.dialog = false;
    },
    checkUploadedReport() {
      if (this.report) {
        this.fileSelected = false;
        this.fileErrorMessage = [];
        return true;
      } else {
        this.fileSelected = true;
        this.fileErrorMessage = "Please upload your file report";
        this.dialog = false;
        return false;
      }
    },
    countWords(s) {
      s = s.replace(/(^\s*)|(\s*$)/gi, "");
      s = s.replace(/\s\s+/g, " ");
      s = s.replace(/,/g, " ");
      s = s.replace(/;/g, " ");
      s = s.replace(/\//g, " ");
      s = s.replace(/\\/g, " ");
      s = s.replace(/{/g, " ");
      s = s.replace(/}/g, " ");
      s = s.replace(/\n/g, " ");
      s = s.replace(/\./g, " ");
      s = s.replace(/[[\]]/g, " ");
      s = s.replace(/[ ]{2,}/gi, " ");
      var countWordsBySpaces = s.split(" ").length;
      return countWordsBySpaces;
    },
  },
};
</script>