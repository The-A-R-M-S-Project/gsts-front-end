<template>
  <div class="mx-auto overflow-hidden">
    <template v-if="user.role === 'principal'">
      <Navigation class="d-none d-sm-block" />
    </template>
    <template v-else-if="user.role === 'dean'">
      <DeanNav class="d-none d-sm-block" />
    </template>
    <template v-else-if="user.role === 'examiner'">
      <ExaminerNav class="d-none d-sm-block" />
    </template>
    <MobileDrawer />
    <div>
      <v-row no-gutters>
        <v-col cols="12" lg="9">
          <v-row align="center" justify="center" no-gutters>
            <v-col cols="12">
              <StudentProgress class="mb-6" />
            </v-col>
            <v-col v-if="user.role !== 'examiner'" cols="12">
              <v-row align="center" justify="center" no-gutters>
                <v-col cols="12">
                  <div class="text-center">
                    <h3 class="text-center">Examiners</h3>
                    <hr class="mx-auto divider" />
                  </div>
                </v-col>
                <v-col cols="12">
                  <p class="body-1 text-center">
                    <strong class="text-decoration-underline"
                      >Report examiners</strong
                    >
                    <span v-if="examinerReportStatuses.length === 0"
                      >&nbsp;None
                    </span>
                    <span v-else class="text-left">
                      <v-row align="center" justify="center" class="px-12">
                        <v-col
                          v-for="(examiner, index) in examinerReportStatuses"
                          :key="index"
                          cols="12"
                          sm="4"
                        >
                          <v-alert
                            border="left"
                            colored-border
                            :color="examinerStatus[examiner.status].color"
                            elevation="2"
                          >
                              <div class="pb-2">
                                <v-icon color="black">mdi-account</v-icon>
                                {{ examiner.examiner.lastName }}
                                {{ examiner.examiner.firstName }}
                              </div>
                              <div class="text-capitalize pb-2">
                                <v-icon color="black">mdi-account-convert</v-icon>
                                {{ examiner.examinerType }}
                              </div>
                              <div>
                                <v-icon :color="examinerStatus[examiner.status].color">mdi-progress-check</v-icon>
                                {{ examinerStatus[examiner.status].text }}
                                <v-dialog 
                                  v-if="examiner.status === 'rejectedByExaminer'" 
                                  v-model="rejectionReasonDialog"
                                  width="500"
                                >
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                      v-bind="attrs"
                                      v-on="on"
                                      icon 
                                      color="error"
                                    >
                                      <v-icon color="error">mdi-open-in-new</v-icon>
                                    </v-btn>
                                  </template>
                                  <v-card>
                                    <v-card-title class="text-center headline error white--text">Rejection reason</v-card-title>
                                    <v-card-text class="py-3 px-6">
                                      <p class="body-1">
                                        {{examiner.rejectionReason}}
                                      </p>
                                    </v-card-text>
                                    <v-card-actions>
                                      <v-spacer></v-spacer>
                                      <v-btn color="primary" @click="rejectionReasonDialog = false">
                                        Close
                                      </v-btn>
                                    </v-card-actions>
                                  </v-card>
                                </v-dialog>
                              </div>
                            </v-alert>
                        </v-col>

                      </v-row>
                    </span>
                  </p>
                  <p class="body-1 text-center">
                    <strong class="text-decoration-underline"
                      >Viva committee</strong
                    >
                    <span v-if="studentReport.viva && studentReport.viva.vivaCommittee">
                      <v-row align="center" justify="center" class="px-12">
                        <v-col
                          v-for="(member, index) in studentReport.viva.vivaCommittee"
                          :key="index"
                          cols="12"
                          sm="4"
                        >
                          <v-alert elevation="2">
                            <div class="pb-2">
                              <v-icon color="black">mdi-account</v-icon>
                              {{ member.name }}
                            </div>
                            <div class="pb-2">
                              <v-icon color="black">mdi-email</v-icon>
                              {{ member.email }}
                            </div>
                            <div class="pb-2">
                              <v-icon color="black">mdi-home</v-icon>
                              {{ member.affiliation }}
                            </div>
                          </v-alert>
                        </v-col>
                      </v-row>
                    </span>
                    <span v-else>
                      &nbsp;No members added yet!
                    </span>
                  </p>
                </v-col>
                <v-col
                  v-if="
                    (user.role === 'principal' || user.role === 'dean') &&
                    studentReport.status &&
                    progressEvents[`${studentReport.status}`].step > 3
                  "
                  cols="12"
                  class="pb-12"
                >
                  <div class="text-center">
                    <h3 class="text-center">Assessment</h3>
                    <hr class="mx-auto divider" />
                  </div>
                    <v-row align="center" justify="center">
                      <v-col :md="studentReport.vivaCommitteeReport ? '4': false">
                        <ExaminerAssessment />
                      </v-col>
                      <v-col v-if="studentReport.vivaCommitteeReport" md="4">
                        <div class="text-center">
                          <v-btn color="primary" target="_blank" :href="studentReport.vivaCommitteeReport">
                            Viva assessment
                          </v-btn>
                        </div>
                      </v-col>
                    </v-row>
                </v-col>
              </v-row>
            </v-col>

            <v-col
              v-if="user.role === 'principal' || user.role === 'dean'"
              cols="12"
            >
              <Resubmission />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" lg="3">
          <StudentsNotifications />
        </v-col>
      </v-row>
    </div>
    <Footer />
  </div>
</template>
<style></style>
<script>
import Navigation from "@/components/Navbar.vue";
import DeanNav from "@/components/DeanNav.vue";
import ExaminerNav from "@/components/ExaminersNavbar.vue";
import MobileDrawer from "@/components/MobileDrawer.vue";
import StudentProgress from "@/components/StudentProgress.vue";
import ExaminerAssessment from "@/components/ExaminerAssessment.vue";
import Resubmission from "@/components/Resubmission.vue";
import StudentsNotifications from "@/components/StudentsNotifications.vue";
import Footer from "@/components/Footer.vue";
import { mapGetters } from "vuex";

export default {
  name: "StaffStudentDashboard",
  data() {
    return {
      drawer: false,
      loading: false,
      rejectionReasonDialog: false,
      studentReport: {}
    };
  },
  async created() {
    await this.$store.dispatch("fetchLoggedInStaff");
    await this.$store.dispatch("fetchReports");
    this.studentReport = this.reports.filter(report => report._id === this.$route.params.studentID)[0];
    await this.$store.dispatch("fetchSpecificStudentReport",this.$route.params.studentID);
    await this.$store.dispatch("fetchStudentDetails",this.studentReport.student._id);
    if (this.user.role !== "examiner") {
      await this.$store.dispatch(
        "fetchExaminerAssessment",
        this.studentReport._id
      );
    }
    await this.$store.dispatch("fetchReportComments", this.studentReport._id);
  },
  computed: {
    ...mapGetters([
      "isLoading",
      "user",
      "examinerStatus",
      "reports",
      "examinerReportStatuses",
      "progressEvents",
    ]),
  },
  components: {
    Navigation,
    DeanNav,
    ExaminerNav,
    MobileDrawer,
    ExaminerAssessment,
    StudentProgress,
    Resubmission,
    StudentsNotifications,
    Footer,
  },
};
</script>
<style>
.divider {
  width: 8rem;
  border: 2px solid black;
  margin-bottom: 1rem;
}
</style>