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
            <div v-if="studentReport" class="text-center">
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
            >Report received by examiner</v-stepper-step
          >
          <template v-if="e6 > 2">
            <div class="v-stepper__content">
              <div class="body-1">
                Your examiner has acknowledged receipt of your report
              </div>
              <div class="caption mt-3 font-weight-light">
                {{ formatDate(studentReport.receivedAt) }}
              </div>
            </div>
          </template>
          <v-stepper-content step="2">
            <template v-if="e6 === 2">
              <div class="body-1 mb-1">
                Waiting for the examiner to acknowledge receipt of your report
                <LoadingDots />
              </div>
              <div class="body-2">You'll be notified as soon as he does</div>
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
              <div class="body-2">
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
              </div>
              <div class="caption mt-3 font-weight-light">
                {{ formatDate(studentReport.examinerScoreDate) }}
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
                  formatDate(studentReport.vivaDate)
                }}</span>
              </div>
              <div class="body-2">
                <strong>Location:</strong> Cedat conference hall
              </div>
              <!-- This is supposed to be the date when the viva date was set by principal/dean -->
              <div class="caption mt-3 font-weight-light">
                {{ formatDate(studentReport.examinerScoreDate) }}
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
              <div class="body-2">
                You scored
                <span class="subtitle-1">
                  <strong>
                    <u>{{ studentReport.vivaScore }}%</u>
                  </strong>
                </span>
              </div>
              <div class="caption mt-3 font-weight-light">
                {{ formatDate(studentReport.vivaScoreDate) }}
              </div>
            </div>
          </template>
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
  data() {
    return {
      e6: null,
      progressEvents: {
        notSubmitted: {
          value: 0,
          message: "Not submitted",
          color: "grey",
          step: 1,
        },
        submitted: {
          value: 17,
          message: "Submitted",
          color: "deep-orange darken-2",
          step: 2,
        },
        withExaminer: {
          value: 39,
          message: "With examiner",
          color: "orange",
          step: 3,
        },
        clearedByExaminer: {
          value: 56,
          message: "Cleared by examiner",
          color: "amber",
          step: 4,
        },
        vivaDateSet: {
          value: 73,
          message: "Viva date set",
          color: "yellow darken-1",
          step: 5,
        },
        vivaComplete: {
          value: 100,
          message: "Viva complete",
          color: "green lighten-2",
          step: 6,
        },
      },
    };
  },
  async created() {
    if (this.user.role === "student") {
      await this.$store.dispatch("fetchLoggedInStudentDetails");
      if (this.studentReport.title) {
        this.e6 = this.progressEvents[`${this.studentReport.status}`].step;
      }
    }
    // this.e6 = this.progressEvents[`${this.studentReport.status}`].step;
  },
  computed: {
    ...mapGetters(["user", "student", "studentReport"]),
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
      )} ${new String(monthDay).substring(4, 15).replace(/ /g, "-")}`;
    },
  },
  components: {
    LoadingDots,
    StaffStudentProfile,
  },
};
</script>
