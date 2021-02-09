<template>
  <div class="pt-4">
    <div class="display-1 text-center font-weight-medium mb-4">
      Student report
    </div>
    <v-row justify="center" align="start">
      <v-col>
        <v-row no-gutters>
          <v-col>
            <div class="text-center">
              <v-progress-circular
                :rotate="-90"
                size="250"
                width="20"
                :value="
                  progressEvents[`${examinerStudentDetails.status}`].value
                "
                :color="
                  progressEvents[`${examinerStudentDetails.status}`].color
                "
                class="my-3"
              >
                {{ progressEvents[`${examinerStudentDetails.status}`].value }}%
                <br />
                {{ progressEvents[`${examinerStudentDetails.status}`].message }}
              </v-progress-circular>
            </div>
          </v-col>
          <v-col>
            <div class="pt-3" :class="{ 'px-6': $vuetify.breakpoint.xs }">
              <div class="text-left body-2 mx-auto">
                <div class="pa-1">
                  <span class="font-weight-bold">Name</span>
                  : {{ examinerStudentDetails.student.name }}
                </div>
                <div class="pa-1">
                  <span class="font-weight-bold">Email</span>
                  : {{ examinerStudentDetails.student.email }}
                </div>
                <div class="pa-1">
                  <span class="font-weight-bold">Contacts</span>
                  : {{ examinerStudentDetails.student.phoneNumber }}
                </div>
              </div>
            </div>
            <div class="my-6" :class="{ 'px-6': $vuetify.breakpoint.xs }">
              <v-dialog v-model="dialog" width="500">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" dark v-bind="attrs" v-on="on"
                    >Set score</v-btn
                  >
                </template>
                <v-card>
                  <v-card-title class="text-center headline purple white--text"
                    >Set a score</v-card-title
                  >
                  <v-card-text class="py-3 px-6">
                    <p class="body-1">
                      Set a score for
                      <strong>{{ examinerStudentDetails.student.name }}</strong
                      >'s report.
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
                    <v-btn color="error" text @click="dialog = false"
                      >Cancel</v-btn
                    >
                    <v-btn
                      :loading="submitLoading"
                      color="success"
                      text
                      @click="setReportScore"
                      >Save</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
            <div class="my-6" :class="{ 'px-6': $vuetify.breakpoint.xs }">
              <v-btn
                color="teal"
                dark
                link
                :href="examinerStudentDetails.reportURL"
                target="_blank"
              >
                View report
              </v-btn>
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
            <span class="subheading">{{ examinerStudentDetails.title }}</span>
          </div>
          <div class="py-1 px-sm-12">
            <span class="font-weight-bold body-2">Abstract</span>
            :
            <i class="subheading">
              {{ examinerStudentDetails.abstract }}
            </i>
          </div>
        </div>
      </div>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

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
    ...mapGetters(["examinerStudentDetails", "submitLoading"]),
  },
  methods: {
    async setReportScore() {
      if (this.$refs.reportScore.validate()) {
        await this.$store.dispatch("clearStudentReport", {
          report: this.examinerStudentDetails._id,
          score: {
            examinerScore: this.score,
          },
          studentName: this.examinerStudentDetails.student.name,
        });
        this.dialog = false;
        await this.$store.dispatch("fetchAssignedStudents");
        this.$router.push("/examiner-dashboard");
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