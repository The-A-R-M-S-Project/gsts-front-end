<template>
  <div class="py-5">
    <div class="display-1 text-center font-weight-medium mb-4">
      Report submission
    </div>
    <v-card
      :max-width="$vuetify.breakpoint.xs ? '95vw' : '70vw'"
      class="mx-auto pa-5"
    >
    <!-- Create/Edit report -->
      <div v-if="progressEvents[studentReport.status].step < 6">
        <h2 class="text-center">
          <span v-if="studentReport.title">Edit </span>
          <span v-else>Create a </span>
          report
        </h2>
        <v-alert
          dark
          dismissible
          v-if="studentReport.title && studentReport.status !== 'notSubmitted'"
          color="warning"
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
        <h5 v-if="progressEvents[studentReport.status].step === 0" class="pt-4 pb-2">
          <span class="primary--text">Note:</span> This is not your final report
          submission! After creating a report title, you will be able to make a
          final submission.
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
              <v-icon color="primary" class="mr-2">mdi-alert-circle</v-icon>This
              is field is optional
            </span>
            <v-textarea
              outlined
              v-model="reportAbstract"
              :rules="[abstractRules.before]"
              label="Insert an abstract"
              :hint="words"
            ></v-textarea>
          </p>
          <v-row justify="center" class="px-3">
            <v-btn
              @click="editReport"
              type="submit"
              :loading="detailLoading"
              color="teal"
              class="white--text"
              :disabled="progressEvents[studentReport.status].step !== 1"
            >
              <span v-if="studentReport.title">Save</span>
              <span v-else>Create</span>
            </v-btn>
          </v-row>
        </v-form>
      </div>

    <!-- Submit final report -->
      <v-row
        v-if="studentReport.title"
        align="center"
        justify="center"
        class="pt-6"
      >
        <v-col cols="12">
          <h2 class="text-center">Submit final report</h2>
          <v-alert
            dark
            dismissible
            v-if="displaySubmitReportMessage"
            color="success"
            class="text-center"
            >{{ reportSubmitMessage }}</v-alert
          >
        </v-col>
        <v-col cols="12">
          <!-- Details -->
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
            <span v-if="progressEvents[studentReport.status].step > 1"
              >&nbsp; Reported submitted</span
            >
            <span v-else-if="studentReport.title" class="subheading"
              >&nbsp; Report created</span
            >
            <span v-else>&nbsp;Report not created</span>
          </p>
          <p v-if="progressEvents[studentReport.status].step > 1">
            <span class="body-1 font-weight-light">Submitted report:</span>
            <span class="subheading"
              >&nbsp;
              <a :href="studentReport.reportURL" target="_blank">
                {{ studentReport.title }}
              </a>
            </span>
          </p>
          <p v-if="studentReport.vivaCommitteeReport">
            <span class="body-1 font-weight-light"
              >Viva assessment report:</span
            >
            <span class="subheading"
              >&nbsp;
              <a :href="studentReport.vivaCommitteeReport" target="_blank">
                {{ studentReport.vivaCommitteeReport }}
              </a>
            </span>
          </p>

          <!-- Timestamps -->
          <p class="mb-10">
            <span
              v-if="studentReport.createdAt"
              class="body-1 font-weight-light"
              >Created:</span
            >
            <span
              v-if="studentReport.createdAt"
              class="subheading"
              >&nbsp; {{ formatDate(studentReport.createdAt) }}</span
            >
            <br>
            <span
              v-if="studentReport.updatedAt"
              class="body-1 font-weight-light"
              >Last updated:</span
            >
            <span
              v-if="studentReport.updatedAt"
              class="subheading"
              >&nbsp; {{ formatDate(studentReport.updatedAt) }}</span
            >
            <br>
            <span
              v-if="progressEvents[studentReport.status].step > 1"
              class="body-1 font-weight-light"
              >Submitted:</span
            >
            <span v-if="progressEvents[studentReport.status].step > 1"
              >&nbsp;{{ formatDate(studentReport.submittedAt) }}</span
            >
          </p>

          <!-- Form -->
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
                :disabled="progressEvents[studentReport.status].step !== 1 && !studentReport.vivaCommitteeReport"
              ></v-file-input>
            </p>

            <p>
              <span class="body-1 font-weight-bold">Compliance report file:</span>
              <v-file-input
                label="File input"
                placeholder="Click here to upload file"
                outlined
                counter
                v-model="complianceReport"
                :error="fileSelected"
                :error-messages="fileErrorMessage"
                :show-size="1000"
                truncate-length="100"
                prepend-icon="mdi-file-document"
                accept=".doc,.docx,.pdf"
              ></v-file-input>
            </p>
          </v-form>

          <!-- Submit button -->
          <v-row justify="center" class="px-3 pt-2">
            <v-dialog v-model="dialog" width="500">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  :loading="submitReportLoading"
                  color="teal"
                  class="white--text"
                  :disabled="progressEvents[studentReport.status].step !== 1 && progressEvents[studentReport.status].step !== 6"
                  >submit</v-btn
                >
              </template>

              <v-card>
                <v-card-title class="text-center headline purple white--text"
                  >Confirm</v-card-title
                >
                <v-card-text class="py-3 px-6">
                  <p class="body-1 text-center">
                    <v-icon color="primary" class="mr-2"
                      >mdi-alert-circle</v-icon
                    >This is your final submission. <br />
                    <span v-if="!studentReport.vivaCommitteeReport">
                      Unless a resubmission is requested of you, you will not be
                      able to edit your submission until after your viva
                      examination.
                    </span>
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
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "report-submission",
  data() {
    return {
      report: null,
      complianceReport: null,
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
    console.log("Report: ", this.studentReport);
    this.reportTitle = this.studentReport.title;
    this.reportAbstract = this.studentReport.abstract
      ? this.studentReport.abstract
      : "";
  },
  computed: {
    ...mapGetters([
      "student",
      "studentReport",
      "reportActionMessage",
      "detailLoading",
      "submitReportLoading",
      "reportSubmitMessage",
      "progressEvents"
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
      )}, ${new String(monthDay).substring(4, 15)}`;
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
      if (this.$refs.submitReportForm.validate() && this.checkUploadedReport()) {
        let formData = new FormData();
        if(this.studentReport.vivaCommitteeReport) {
          formData.append("finalReport", this.report);
          formData.append("complainceReport", this.complianceReport);
          await this.$store.dispatch("makeFinalSubmission", formData);
        } else {
          formData.append("report", this.report);
          formData.append("title", this.studentReport.title);
          formData.append("abstract", finalAbstract);
          formData.append("status", "submitted");
          await this.$store.dispatch("submitFinalReport", formData);
        }
        
        if (this.reportSubmitMessage) {
          this.displaySubmitReportMessage = true;
        }
      }
      this.dialog = false;
    },
    checkUploadedReport() {
      if (this.studentReport.vivaCommitteeReport && this.complianceReport && this.report || 
          !this.studentReport.vivaCommitteeReport && this.report 
      ) {
        this.fileSelected = false;
        this.fileErrorMessage = [];
        return true;
      } else {
        this.fileSelected = true;
        this.fileErrorMessage = "Please upload a file";
        this.dialog = false;
        return false;
      }
    },
    countWords(s) {
      s = s.replace(/(^\s*)|(\s*$)/gi, "");
      s = s.replace(/\s\s+/g, " ");
      s = s.replace(/[ ]{2,}/gi, " ");
      var countWordsBySpaces = s.split(" ").length;
      return countWordsBySpaces;
    },
  },
};
</script>