<template>
  <div class="pt-4">
    <div class="display-1 text-center font-weight-medium mb-4">Progress</div>
    <v-row
      justify="center"
      :align="user.role === 'student' ? 'center' : 'start'"
    >
      <v-col cols="12" md="4">
        <v-row>
          <v-col>
            <div v-if="studentReport.status" class="text-center">
              <v-progress-circular
                :rotate="-90"
                size="250"
                width="20"
                :value="progressEvents[`${studentReport.status}`].value"
                :color="progressEvents[`${studentReport.status}`].color"
                class="my-3"
              >
                <span class="black--text">
                  {{ progressEvents[`${studentReport.status}`].value }}%
                  <br />
                  {{ progressEvents[`${studentReport.status}`].message }}
                  <br />
                  <span v-if="studentReport.retake === 'yes'" class="font-weight-bold grey--text">
                    <v-icon color="grey">mdi-information-outline</v-icon>
                    Retake 
                    <span
                      v-if="user.role === 'principal' || user.role === 'dean' || 
                        (user.role === 'student' && (progressEvents[`${studentReport.status}`].step < 4 || 
                        progressEvents[`${studentReport.status}`].step === 7))
                      "
                    >
                      ({{studentReport.finalScore}}% {{studentReport.grade}})
                    </span>
                  </span>
                </span>
              </v-progress-circular>
            </div>
          </v-col>
          <v-col v-show="user.role !== 'student'">
            <StaffStudentProfile />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="8" class="px-10">
        <v-stepper v-model="e6" vertical>
          <v-stepper-step color="teal" :complete="e6 > 1" step="1"
            >Report sent</v-stepper-step
          >
          <template v-if="e6 > 1">
            <div class="v-stepper__content">
              <div class="body-1 mb-1">Your report has been submitted.</div>
              <div class="caption mt-3 font-weight-light">
                {{ formatDate(studentReport.submittedAt) }}
              </div>
              <div v-if="studentReport.resubmittedReportURL" class="body-1 mt-1">Your report has been resubmitted.</div>
              <div v-if="studentReport.resubmittedReportURL" class="caption mt-3 font-weight-light">
                {{ formatDate(studentReport.resubmittedAt) }}
              </div>
            </div>
          </template>
          <v-stepper-content step="1">
            <template v-if="e6 === 1">
              <div class="body-1 mb-1">Submit your report for grading</div>
              <div v-show="user.role === 'student'" class="body-2">
                In case you haven't submitted your report, click
                <a @click="submitReport">here</a>
              </div>
            </template>
          </v-stepper-content>

          <v-stepper-step color="teal" :complete="e6 > 2" step="2"
            >Report received by examiners</v-stepper-step
          >
          <template v-if="e6 > 2">
            <div class="v-stepper__content">
              <div class="body-1">
                All the examiners assigned to your report have acknowledged its receipt.
              </div>
              <div class="caption mt-3 font-weight-light">
                {{ formatDate(studentReport.assignedAt) }}
              </div>
            </div>
          </template>
          <v-stepper-content step="2">
            <template v-if="e6 === 2">
              <div class="body-1 mb-1">
                Waiting for examiners to acknowledge receipt of your report
                <LoadingDots />
              </div>
              <div class="body-2">You'll be notified as soon as they do</div>
            </template>
          </v-stepper-content>

          <v-stepper-step color="teal" :complete="e6 > 3" step="3"
            >Report returned by examiner</v-stepper-step
          >
          <template v-if="e6 > 3">
            <div class="v-stepper__content">
              <div class="body-1 mb-1">
                Your report has been marked and graded.
              </div>
              <!-- <div class="body-2">
                You scored
                <span class="subtitle-1">
                  <strong>
                    <u
                      >{{ studentReport.examinerScore }}% ({{
                        studentReport.examinerGrade
                      }})</u
                    >
                  </strong>
                </span>
              </div> -->
              <div class="caption mt-3 font-weight-light">
                {{ formatDate(studentReport.clearedAt) }}
              </div>
            </div>
          </template>
          <v-stepper-content step="3">
            <div class="body-1 mb-1">
              Your report is being marked and graded
              <LoadingDots />
            </div>
            <div class="body-2">
              You'll be notified as soon as your score is available.
            </div>
          </v-stepper-content>

          <v-stepper-step color="teal" :complete="e6 > 4" step="4"
            >Viva date set</v-stepper-step
          >
          <template v-if="e6 > 4">
            <div class="v-stepper__content">
              <div class="body-1 mb-1">
                Your viva examination date has been set to
                <span class="headline text-color blue--text">{{
                  formatDate(studentReport.viva.vivaEvent.eventDate)
                }}</span>
              </div>
              <!-- This is supposed to be the date when the viva date was set by principal/dean -->
              <div class="caption mt-3 font-weight-light">
                {{ formatDate(studentReport.vivaDateSetAt) }}
              </div>
            </div>
          </template>
          <v-stepper-content step="4">
            <div class="body-1 mb-1">
              An appropriate date will be set for your viva examination.
            </div>
          </v-stepper-content>

          <v-stepper-step color="teal" :complete="e6 > 5" step="5"
            >Viva examination</v-stepper-step
          >
          <template v-if="e6 > 5">
            <div class="v-stepper__content">
              <div class="body-1 mb-1">
                Congratulations! You've successfully completed your viva
                examination.
              </div>
              <div v-if="user.role !== 'student' || studentReport.status === 'complete'" class="body-2">
                You scored
                <span class="subtitle-1 blue--text">
                  <strong>
                    <u>{{ studentReport.viva.vivaScore }}%</u>
                  </strong>
                </span>
              </div>
              <div class="caption mt-3 font-weight-light">
                {{ formatDate(studentReport.vivaCompleteAt) }}
              </div>
            </div>
          </template>
          <v-stepper-step color="teal" :complete="e6 > 6" step="6"
            >Final submission</v-stepper-step
          >
          <template v-if="e6 > 6">
            <div class="v-stepper__content">
              <div class="body-1 mb-1">
                Congratulations! You've successfully made your final report
                submission!
              </div>
              <div class="body-2">
                You can now view your report assessment details. Check out your
                notifications.
              </div>
              <div class="caption mt-3 font-weight-light">
                {{ formatDate(studentReport.viva.vivaScoreDate) }}
              </div>
            </div>
          </template>
          <v-stepper-content step="6">
            <template v-if="e6 === 6">
              <div v-if="studentReport.vivaCommitteeReport" class="body-1 mb-1">Please make your final submission</div>
              <div v-else class="body-1 mb-1">
                To make your final submission, please wait for your viva assessment report to be uploaded.
              </div>
              <div v-show="user.role === 'student' && studentReport.vivaCommitteeReport" class="body-2">
                In case you haven't made your final submission, click
                <a @click="submitReport">here</a>.
                <span>Include your compliance report in the submission.</span>
              </div>
            </template>
          </v-stepper-content>
        </v-stepper>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import LoadingDots from "@/components/LoadingDots.vue";
import StaffStudentProfile from "@/components/StaffStudentProfile.vue";
import { mapGetters } from "vuex";

export default {
  async created() {
    if (this.user.role === "student") {
      await this.$store.dispatch("fetchLoggedInStudentDetails");
      console.log("Report: ", this.studentReport);
    }
  },
  computed: {
    ...mapGetters(["progressEvents", "user", "studentReport", "student"]),
    e6() {
      if (this.studentReport.status) {
        return this.progressEvents[`${this.studentReport.status}`].step;
      } else {
        return 0;
      }
    },
  },
  methods: {
    submitReport() {
      this.$router.push("/student-dashboard/submit-report");
    },
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
  },
  components: {
    LoadingDots,
    StaffStudentProfile,
  },
};
</script>
