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
                      >Currently assigned examiners</strong
                    >
                    <span v-if="examinerReportStatuses.length === 0"
                      >&nbsp;None
                    </span>
                    <span v-else>
                      <v-row>
                        <v-col
                          v-for="(examiner, index) in examinerReportStatuses"
                          :key="index"
                        >
                          <div>
                            <span class="font-weight-bold">Name:</span>
                            {{ examiner.examiner.lastName }}
                            {{ examiner.examiner.firstName }}
                          </div>
                          <div class="text-capitalize">
                            <span class="font-weight-bold text-left">
                              Type:
                            </span>
                            {{ examiner.examinerType }}
                          </div>
                          <div>
                            <span class="font-weight-bold"> Status: </span>
                            {{ examinerStatus[examiner.status] }}
                            <v-icon v-if="examinerStatus[examiner.status] === 'Accepted'" color="success">mdi-check-circle</v-icon>
                            <v-icon v-else-if="examinerStatus[examiner.status] === 'Rejected'" color="error">mdi-close-circle</v-icon>
                            <v-icon v-else-if="examinerStatus[examiner.status] === 'Pending reply'" color="primary">mdi-dots-horizontal-circle-outline</v-icon>
                            <v-icon v-else-if="examinerStatus[examiner.status] === 'Report cleared'" color="success">mdi-file-check</v-icon>
                          </div>
                        </v-col>
                      </v-row>
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
      examinerStatus: {
        assignedToExaminer: "Pending reply",
        withExaminer: "Accepted",
        rejectedByExaminer: "Rejected",
        clearedByExaminer: "Report cleared",
      },
    };
  },
  async created() {
    await this.$store.dispatch("fetchLoggedInStaff");
    await this.$store.dispatch(
      "fetchSpecificStudentReport",
      this.$route.params.studentID
    );
    await this.$store.dispatch(
      "fetchStudentDetails",
      this.studentReport.student._id
    );
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
      "studentReport",
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