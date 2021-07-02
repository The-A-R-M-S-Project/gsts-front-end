<template>
  <section class="text-center">
    <v-dialog v-model="examinerAssessmentsDialog" width="700">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" color="primary"
          >Report Assessments</v-btn
        >
      </template>

      <v-card>
        <v-card-title class="text-center headline purple white--text"
          >Examiner assessments
        </v-card-title>
        <v-card-text class="py-3 px-6">
          <v-tabs v-model="tab" class="mx-auto" grow>
            <v-tabs-slider color="primary"></v-tabs-slider>

            <v-tab v-for="examiner in examinerAssessments" :key="examiner._id">
              {{ examiner.examinerType }}
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item
              v-for="examiner in examinerAssessments"
              :key="examiner._id"
            >
              <p class="text-center mb-0 mt-6 body-1 font-weight-light">Examiner: <strong>{{ examiner.examiner.name }}</strong></p>
              
             <ExaminerAssessmentSummary :examiner="examiner" />
            </v-tab-item>
          </v-tabs-items>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="examinerAssessmentsDialog = false"
            >Done</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import ExaminerAssessmentSummary from "@/components/Action\ Dialogs/ExaminerAssessmentSummary.vue"

export default {
  name: "examiner-assessment",
  data() {
    return {
      tab: null,
      examinerAssessmentsDialog: false,
    };
  },
  computed: {
    ...mapGetters(["examinerAssessments"]),
  },
  components: {
    ExaminerAssessmentSummary
  }
};
</script>
