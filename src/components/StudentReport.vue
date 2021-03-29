<template>
  <div class="pt-4">
    <div class="display-1 text-center font-weight-medium mb-4">
      Student report
    </div>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <v-row no-gutters class="px-sm-12">
          <v-col cols="12" sm="5">
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
          <v-col cols="12" sm="7">
            <div class="pt-3" :class="{ 'px-6': $vuetify.breakpoint.xs }">
              <div class="text-left body-2 mx-auto">
                <div class="pa-1">
                  <span class="font-weight-bold">Name</span>
                  : {{ examinerStudentDetails.student.name }}
                </div>
                <div class="pa-1">
                  <span class="font-weight-bold">Title</span>
                  : {{ examinerStudentDetails.title }}
                </div>
                <div class="pa-1">
                  <span class="font-weight-bold">Abstract</span>
                  : {{ examinerStudentDetails.abstract }}
                </div>
                <div class="pa-1">
                  <span class="font-weight-bold">File:</span>
                  <span class="title">
                    <a :href="examinerStudentDetails.reportURL" target="_blank">
                      {{ examinerStudentDetails.title }}
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <div class="pa-3">
          <v-row align="center" justify="center" no-gutters>
            <v-col cols="12">
              <h3 class="text-center text-underline">Assessment</h3>
              <hr class="mx-auto divider" />
            </v-col>
            <v-col cols="12">
              <v-row align="center" justify="center" no-gutters>
                <v-col cols="12">
                  <div class="center-radio-group">
                    <v-radio-group v-model="assessmentType" row>
                      <v-radio
                        class="py-2"
                        label="Fill assessment form"
                        value="fill"
                      ></v-radio>
                      <v-radio
                        class="py-2"
                        label="Upload assessment form"
                        value="upload"
                      ></v-radio>
                    </v-radio-group>
                  </div>
                </v-col>
                <v-col v-if="assessmentType === 'fill'" cols="12">
                  <v-card class="mx-auto pa-3" width="700">
                    <v-card-title class="text-center">
                      Fill assessment form
                    </v-card-title>
                    <v-card-text>
                      <p class="text-subtitle-1">
                        <span class="primary--text font-weight-bold"
                          >Note:</span
                        >
                        The form fields below indicate (in brackets) the maximum
                        number of points you can award to that section.
                      </p>
                      <v-form ref="filledAssessmentForm">
                        <v-row align="center" justify="center">
                          <v-col cols="12" sm="6">
                            <v-text-field
                              v-model="background"
                              label="Background (Max 5)"
                              type="number"
                              :rules="fieldScoreRules(5)"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              v-model="problemStatement"
                              type="number"
                              label="Problem Statement (Max 5)"
                              :rules="fieldScoreRules(5)"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              v-model="researchMethods"
                              type="number"
                              label="Research Methods (Max 20)"
                              :rules="fieldScoreRules(20)"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              v-model="results"
                              type="number"
                              label="Results (Max 15)"
                              :rules="fieldScoreRules(15)"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              v-model="discussions"
                              type="number"
                              label="Discussions (Max 10)"
                              :rules="fieldScoreRules(10)"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              v-model="conclusions"
                              type="number"
                              label="Conclusions (Max 5)"
                              :rules="fieldScoreRules(5)"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              v-model="recommendations"
                              type="number"
                              label="Recommendations (Max 5)"
                              :rules="fieldScoreRules(5)"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              v-model="originality"
                              type="number"
                              label="Originality of Contribution (Max 15)"
                              :rules="fieldScoreRules(15)"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              v-model="literatureCitation"
                              type="number"
                              label="Literature Citation (Max 10)"
                              :rules="fieldScoreRules(10)"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              v-model="overallPresentation"
                              type="number"
                              label="Overall Presentation (Max 10)"
                              :rules="fieldScoreRules(10)"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <div
                              class="title font-weight-regular black--text pb-2"
                            >
                              Comments
                            </div>
                            <quill-editor
                              class="quill"
                              v-model="corrections"
                              :content="corrections"
                              tabindex="-1"
                            ></quill-editor>
                          </v-col>
                        </v-row>
                      </v-form>
                    </v-card-text>
                  </v-card>
                </v-col>
                <v-col v-else-if="assessmentType === 'upload'" cols="12">
                  <v-card class="mx-auto pa-3" width="700">
                    <v-card-title> Upload assessment form </v-card-title>
                    <v-form ref="uploadedAssessmentForm">
                      <p class="py-3">
                        <v-file-input
                          label="File input"
                          placeholder="Click here to upload your scanned assessment form"
                          outlined
                          counter
                          v-model="assessmentForm"
                          :error="fileSelected"
                          :error-messages="fileErrorMessage"
                          :show-size="1000"
                          truncate-length="100"
                          prepend-icon="mdi-file-document"
                          accept=".png,.jpg,.pdf,.jpeg"
                        ></v-file-input>
                      </p>
                      <p class="px-12">
                        <v-text-field
                          min="0"
                          max="100"
                          :rules="scoreRules"
                          v-model="score"
                          label="Set final score"
                          type="number"
                        ></v-text-field>
                      </p>
                    </v-form>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </div>
      </v-col>
      <v-col cols="12">
        <div class="text-center pb-12">
          <v-btn
            :disabled="assessmentType === null"
            color="primary"
            @click="checkAssessmentForms"
          >
            submit assessment
          </v-btn>
          <v-dialog v-model="submitDialog" width="500">
            <v-card>
              <v-card-title class="headline"> Are you sure? </v-card-title>

              <v-card-text>
                <div v-if="assessmentType === 'fill'" class="text-center">
                  <p>
                    <span class="body-1 font-weight-light">Background:</span>
                    <span>&nbsp;{{ background }}</span>
                  </p>
                  <p>
                    <span class="body-1 font-weight-light"
                      >Problem statement:</span
                    >
                    <span>&nbsp;{{ problemStatement }}</span>
                  </p>
                  <p>
                    <span class="body-1 font-weight-light"
                      >Research methods:</span
                    >
                    <span>&nbsp;{{ researchMethods }}</span>
                  </p>
                  <p>
                    <span class="body-1 font-weight-light">Results:</span>
                    <span>&nbsp;{{ results }}</span>
                  </p>
                  <p>
                    <span class="body-1 font-weight-light">Discussions:</span>
                    <span>&nbsp;{{ discussions }}</span>
                  </p>
                  <p>
                    <span class="body-1 font-weight-light">Conclusions:</span>
                    <span>&nbsp;{{ conclusions }}</span>
                  </p>
                  <p>
                    <span class="body-1 font-weight-light"
                      >Recommendations:</span
                    >
                    <span>&nbsp;{{ recommendations }}</span>
                  </p>
                  <p>
                    <span class="body-1 font-weight-light"
                      >Originality of contribution:</span
                    >
                    <span>&nbsp;{{ originality }}</span>
                  </p>
                  <p>
                    <span class="body-1 font-weight-light"
                      >Literature citation:</span
                    >
                    <span>&nbsp;{{ literatureCitation }}</span>
                  </p>
                  <p>
                    <span class="body-1 font-weight-light"
                      >Overall presentation:</span
                    >
                    <span>&nbsp;{{ overallPresentation }}</span>
                  </p>
                  <p>
                    <span
                      class="body-1 font-weight-light text-decoration-underline"
                      >Corrections</span
                    >
                  </p>
                  <p v-html="corrections"></p>
                  <p>
                    <span class="body-1 font-weight-light"
                      >Total score (calculated from the total of all the above
                      fields):</span
                    >
                    <span class="headline font-weight-bold">{{
                      totalScore
                    }}</span>
                  </p>
                </div>
                <div
                  v-else-if="assessmentType === 'upload'"
                  class="text-center"
                >
                  <p>
                    <span class="body-1 font-weight-light"
                      >Scanned assessment file:</span
                    >
                    <span v-if="assessmentForm"
                      >&nbsp;{{ assessmentForm.name }}</span
                    >
                  </p>
                  <p>
                    <span class="body-1 font-weight-light">Final score:</span>
                    <span class="headline font-weight-bold"
                      >&nbsp;{{ score }}</span
                    >
                  </p>
                </div>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="submitDialog = false">
                  cancel
                </v-btn>
                <v-btn
                  color="success"
                  text
                  @click="submitAssessment"
                  :loading="detailLoading"
                >
                  submit
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";

export default {
  name: "examiner-student-report",
  data() {
    return {
      submitDialog: false,
      assessmentType: null,
      assessmentForm: null,
      fileSelected: false,
      fileErrorMessage: [],
      score: null,
      scoreRules: [
        (score) => !!score || "A score is required",
        (score) => (score < 100 && score >= 0) || "Invalid score",
      ],
      fieldScoreRules: (maxGrade) => [
        (fieldScore) =>
          (fieldScore <= maxGrade && fieldScore >= 0) || "Invalid score!",
        (fieldScore) => !!fieldScore || "A score for this field is required!",
      ],
      required: [(field) => !!field || "This field is required!"],
      background: null,
      problemStatement: null,
      researchMethods: null,
      results: null,
      discussions: null,
      conclusions: null,
      recommendations: null,
      originality: null,
      literatureCitation: null,
      overallPresentation: null,
      corrections: null,
      assessmentFormFields: [],
      totalScore: 0,
    };
  },
  created() {
    this.fileSelected = false;
    this.fileErrorMessage = [];
  },
  computed: {
    ...mapGetters([
      "progressEvents",
      "examinerStudentDetails",
      "submitLoading",
      "detailLoading",
    ]),
  },
  methods: {
    checkUploadedAssessmentForm() {
      if (this.assessmentForm) {
        this.fileSelected = false;
        this.fileErrorMessage = [];
        return true;
      } else {
        this.fileSelected = true;
        this.fileErrorMessage = "Please upload your scanned assessment form";
        return false;
      }
    },
    checkAssessmentForms() {
      if (!!this.assessmentType) {
        if (
          (this.assessmentType === "fill" &&
            this.$refs.filledAssessmentForm.validate()) ||
          (this.assessmentType === "upload" &&
            this.$refs.uploadedAssessmentForm.validate() &&
            this.checkUploadedAssessmentForm())
        ) {
          this.totalScore =
            parseInt(this.background) +
            parseInt(this.problemStatement) +
            parseInt(this.researchMethods) +
            parseInt(this.results) +
            parseInt(this.discussions) +
            parseInt(this.conclusions) +
            parseInt(this.recommendations) +
            parseInt(this.originality) +
            parseInt(this.literatureCitation) +
            parseInt(this.overallPresentation);
          this.submitDialog = true;
        }
      }
    },
    async submitAssessment() {
      let finalAssessment;
      if (this.assessmentType === "fill") {
        finalAssessment = {
          background: this.background,
          problemStatement: this.problemStatement,
          researchMethods: this.researchMethods,
          results: this.results,
          discussions: this.discussions,
          conclusions: this.conclusions,
          recommendations: this.recommendations,
          originality_of_Contribution: this.originality,
          literature_Citation: this.literatureCitation,
          overall_Presentation: this.overallPresentation,
          corrections: this.corrections,
          examinerScore: this.totalScore,
        };
      } else if (this.assessmentType === "upload") {
        let formData = new FormData();
        formData.append("examinerScore", this.score);
        formData.append("scannedAsssesmentform", this.assessmentForm);
        finalAssessment = formData;
      }
      await this.$store.dispatch("clearStudentReport", {
        report: this.examinerStudentDetails._id,
        assessment: finalAssessment,
        studentName: this.examinerStudentDetails.student.name,
      });
      await this.$store.dispatch("fetchAssignedStudents");
      this.$router.push("/examiner-dashboard");
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
      )}, ${new String(monthDay).substring(4, 15).replace(/ /g, "-")}`;
    },
  },
  components: {
    quillEditor,
  },
};
</script>

<style>
.divider {
  width: 6rem;
  border: 2px solid black;
  margin-bottom: 1rem;
}
.center-radio-group {
  margin-left: 35%;
  margin-right: 35%;
}
</style>