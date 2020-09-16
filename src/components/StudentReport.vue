<template>
  <div class="pt-4">
    <div class="display-1 text-center font-weight-medium mb-4">Student report</div>
    <v-row justify="center" align="start">
      <v-col>
        <v-row no-gutters>
          <v-col>
            <div class="text-center">
              <v-progress-circular
                :rotate="-90"
                size="250"
                width="20"
                :value="progressEvents[`${student.report.status}`].value"
                :color="progressEvents[`${student.report.status}`].color"
                class="my-3"
              >
                {{ progressEvents[`${student.report.status}`].value }}%
                <br />
                {{progressEvents[`${student.report.status}`].message}}
              </v-progress-circular>
            </div>
          </v-col>
          <v-col>
            <div class="pt-3" :class="{'px-6': $vuetify.breakpoint.xs}">
              <div class="text-left body-2 mx-auto">
                <div class="pa-1">
                  <span class="font-weight-bold">Name</span>
                  : {{ student.name }}
                </div>
                <div class="pa-1">
                  <span class="font-weight-bold">Email</span>
                  : {{ student.email }}
                </div>
                <div class="pa-1">
                  <span class="font-weight-bold">Contacts</span>
                  : {{student.phoneNumber }}
                </div>
              </div>
            </div>
            <div class="my-6" :class="{'px-6': $vuetify.breakpoint.xs}">
              <v-dialog v-model="dialog" width="500">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="primary"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    :loading="submitLoading"
                  >Set score</v-btn>
                </template>
                <v-card>
                  <v-card-title class="text-center headline purple white--text">Set a score</v-card-title>
                  <v-card-text class="py-3 px-6">
                    <p class="body-1">
                      Set a score for
                      <strong>{{ student.name }}</strong>'s report.
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
            <div class="my-6" :class="{'px-6': $vuetify.breakpoint.xs}">
              <v-btn color="teal" dark>Download report</v-btn>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <div class="pa-3">
        <h3 class="text-center text-underline">Details</h3>
        <hr class="mx-auto divider" />
        <div class="px-3 text-left mx-auto">
          <div class="py-1 px-sm-12">
            <span class="font-weight-bold body-2">Title</span>
            :
            <span class="subheading">{{ student.report.title }}</span>
          </div>
          <div class="py-1 px-sm-12">
            <span class="font-weight-bold body-2">Abstract</span>
            :
            <i class="subheading">
              UK environmental organizations currently face a significant funding gap. It is well-established that representations of individual victims are more effective than abstract concepts like climate change when designing fundraising campaigns. This study aims to determine how such representations can be better targeted in order to increase donations. Specifically, it investigates whether the perceived social distance between victims and potential donors has an impact on donation intention. In this context, social distance is defined as the extent to which people feel they are in the same social group (in-group) or another social group (out-group) in relation to climate change victims.
              To test the hypothesis that smaller social distance leads to higher donation intention, an online survey was distributed to potential donors based across the UK. Respondents were randomly divided into two conditions (large and small social distance) and asked to respond to one of two sets of fundraising material. Responses were analyzed using a two-sample t-test. The results showed a small effect in the opposite direction than hypothesized: large social distance was associated with higher donation intention than small social distance.
              These results suggest that potential donors are more likely to respond to campaigns depicting victims that they perceive as socially distant from themselves. On this basis, the concept of social distance should be taken into account when designing environmental fundraising campaigns.
            </i>
          </div>
        </div>
      </div>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "examiner-student-report",
  data() {
    return {
      dialog: false,
      score: null,
      scoreRules: [
        (score) => !!score || "A score is required",
        (score) => (score < 100 && score >= 0) || "Invalid score",
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
    };
  },
  computed: {
    student() {
      return this.$store.getters.student;
    },
    submitLoading() {
      return this.$store.getters.submitLoading;
    },
  },
  methods: {
    setReportScore() {
      if (this.$refs.reportScore.validate()) {
        this.$store
          .dispatch("clearStudentReport", {
            report: this.student.report._id,
            score: {
              examinerScore: this.score,
            },
            studentName: this.student.name,
          })
          .then(() => {
            this.dialog = false;
            this.$store.dispatch("fetchAssignedStudents").then(() => {
              this.$router.push("/examiner-dashboard");
            });
          });
      }
    },
  },
};
</script>

<style>
.divider {
  width: 4rem;
  border: 2px solid black;
}
</style>