<template>
  <section class="text-center pb-12">
    <v-dialog v-model="examinerAssessmentsDialog" width="700">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" color="primary"
          >View Examiner Assessments</v-btn
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
              <div
                v-if="examiner.reportAssessment.scannedAsssesmentform"
                class="text-center py-6"
              >
                <p>
                  <span class="body-1 font-weight-light">Final score:</span>
                  <span class="headline font-weight-bold"
                    >&nbsp;{{ examiner.examinerScore }}</span
                  >
                </p>
                <p>
                  <span class="body-1 font-weight-light">Assessment:</span>
                  <span class="subheading"
                    >&nbsp;
                    <a
                      :href="examiner.reportAssessment.scannedAsssesmentform"
                      target="_blank"
                    >
                      Scanned assessment form
                    </a>
                  </span>
                </p>
              </div>
              <div v-else class="text-center py-6">
                <p>
                  <span class="body-1 font-weight-light">Final score:</span>
                  <span class="headline font-weight-bold"
                    >&nbsp;{{ examiner.examinerScore }}</span
                  >
                </p>
                <p>
                  <span class="body-1 font-weight-light">Background:</span>
                  <span
                    >&nbsp;{{
                      examiner.reportAssessment.assessment.background
                    }}</span
                  >
                </p>
                <p>
                  <span class="body-1 font-weight-light"
                    >Problem statement:</span
                  >
                  <span
                    >&nbsp;{{
                      examiner.reportAssessment.assessment.problemStatement
                    }}</span
                  >
                </p>
                <p>
                  <span class="body-1 font-weight-light"
                    >Research methods:</span
                  >
                  <span
                    >&nbsp;{{
                      examiner.reportAssessment.assessment.researchMethods
                    }}</span
                  >
                </p>
                <p>
                  <span class="body-1 font-weight-light">Results:</span>
                  <span
                    >&nbsp;{{
                      examiner.reportAssessment.assessment.results
                    }}</span
                  >
                </p>
                <p>
                  <span class="body-1 font-weight-light">Discussions:</span>
                  <span
                    >&nbsp;{{
                      examiner.reportAssessment.assessment.discussions
                    }}</span
                  >
                </p>
                <p>
                  <span class="body-1 font-weight-light">Conclusions:</span>
                  <span
                    >&nbsp;{{
                      examiner.reportAssessment.assessment.conclusions
                    }}</span
                  >
                </p>
                <p>
                  <span class="body-1 font-weight-light">Recommendations:</span>
                  <span
                    >&nbsp;{{
                      examiner.reportAssessment.assessment.recommendations
                    }}</span
                  >
                </p>
                <p>
                  <span class="body-1 font-weight-light"
                    >Originality of contribution:</span
                  >
                  <span
                    >&nbsp;{{
                      examiner.reportAssessment.assessment.originality
                    }}</span
                  >
                </p>
                <p>
                  <span class="body-1 font-weight-light"
                    >Literature citation:</span
                  >
                  <span
                    >&nbsp;{{
                      examiner.reportAssessment.assessment.literatureCitation
                    }}</span
                  >
                </p>
                <p>
                  <span class="body-1 font-weight-light"
                    >Overall presentation:</span
                  >
                  <span
                    >&nbsp;{{
                      examiner.reportAssessment.assessment.overallPresentation
                    }}</span
                  >
                </p>
                <p>
                  <span
                    class="body-1 font-weight-light text-decoration-underline"
                    >Corrections</span
                  >
                </p>
                <p
                  v-html="
                    correctHTMLString(
                      examiner.reportAssessment.assessment.corrections
                    )
                  "
                ></p>
              </div>
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
  methods: {
    correctHTMLString(HTMLString) {
      return HTMLString.replace(/&lt;/g, "<");
    },
  },
};
</script>
