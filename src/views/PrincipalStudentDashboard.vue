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
        <v-col cols="12">
          <v-row align="center" justify="center" no-gutters>
            <v-col cols="12">
              <StudentProgress class="mb-6 mx-md-12" />
            </v-col>
            <v-col v-if="user.role !== 'examiner' && studentReport.status && progressEvents[`${studentReport.status}`].step > 1" cols="12">
              <v-row align="center" justify="center" no-gutters>
                <v-col cols="12">
                  <div class="text-center">
                    <h3 class="text-center">Examiners</h3>
                    <hr class="mx-auto divider" />
                  </div>
                </v-col>
                <v-col cols="12">

                  <!-- List of examiners -->
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
                                <ExaminerRejectionReason 
                                  v-if="examiner.status === 'rejectedByExaminer'"
                                  :rejectionReason="examiner.rejectionReason"
                                />
                              </div>
                            </v-alert>
                        </v-col>
                      </v-row>
                    </span>
                  </p>

                  <!-- List of viva committee -->
                  <v-row align="center" justify="center" class="mb-12" :key="vivaPanelSectionKey">
                    <v-col cols="12" class="pb-0">
                      <p class="body-1 text-center">
                        <strong class="text-decoration-underline">Viva Panel</strong>
                        <v-alert
                          v-if="displayMessage" 
                          :type="vivaPanelMessage.status" 
                          width="500" 
                          class="mx-auto"
                        >
                          {{ vivaPanelMessage.message }}
                        </v-alert>
                      </p>
                    </v-col>
                    <v-col cols="12" sm="8" class="pt-0">
                      <v-simple-table>
                        <template v-slot:default>
                          <thead>
                            <tr>
                              <th class="text-center"><v-icon>mdi-account</v-icon></th>
                              <th class="text-center"><v-icon>mdi-email</v-icon></th>
                              <th class="text-center"><v-icon>mdi-phone</v-icon></th>
                              <th class="text-center"><v-icon>mdi-home</v-icon></th>
                              <!-- Empty header for action on viva committee member -->
                              <th v-if="user.role === 'dean' && progressEvents[`${studentReport.status}`].step < 5">
                                <v-icon>mdi-information-outline</v-icon>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-if="!studentReport.viva || studentReport.viva.vivaCommittee.length === 0" class="text-center grey--text text--darken-2">
                              <td colspan="4" class="body-1">None</td>
                            </tr>
                            <tr v-else v-for="(member, index) in studentReport.viva.vivaCommittee" :key="index" class="text-center">
                              <td>{{ member.name }}</td>
                              <td>{{ member.email }}</td>
                              <td v-if="member.phone">{{ member.phone }}</td>
                              <td v-else> - </td>
                              <td>{{ member.affiliation }}</td>
                              <td v-if="user.role === 'dean' && progressEvents[`${studentReport.status}`].step < 5">
                                <v-btn @click="selectVivaMember(member)" :loading="submitLoading" icon color="primary">
                                  <v-icon>mdi-close</v-icon>
                                </v-btn>
                              </td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>

                      <!-- Confirm viva panel member removal -->
                      <v-dialog v-model="confirmVivaMemberRemoval" width="500">
                        <v-card class="py-4 pr-3">
                          <v-card-title>Are you sure?</v-card-title>
                          <v-card-text>
                            By clicking <i>Remove</i>, you are removing <strong>{{ selectedVivaMember.name }}</strong> from 
                            <strong>{{studentReport.student.lastName}} {{studentReport.student.firstName}}</strong>'s 
                            viva panel.
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" @click="confirmVivaMemberRemoval = false">Cancel</v-btn>
                            <v-btn color="error" @click="removeVivaMember()">Remove</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                      <SetVivaCommittee v-if="user.role === 'dean'" class="mt-4" />
                    </v-col>
                  </v-row>
                </v-col>

                <!-- Assessments -->
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
        <!-- <v-col cols="12" lg="3">
          <StudentsNotifications/>
        </v-col> -->
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
import SetVivaCommittee from "@/components/SetVivaCommittee.vue";
import ExaminerRejectionReason from "@/components/Action\ Dialogs/ExaminerRejectionReason.vue";
import ExaminerAssessment from "@/components/ExaminerAssessment.vue";
import Resubmission from "@/components/Resubmission.vue";
// import StudentsNotifications from "@/components/StudentsNotifications.vue";
import Footer from "@/components/Footer.vue";
import { mapGetters } from "vuex";

export default {
  name: "StaffStudentDashboard",
  data() {
    return {
      drawer: false,
      loading: false,
      studentReport: {},
      confirmVivaMemberRemoval: false,
      selectedVivaMember: {},
      displayMessage: false
    };
  },
  async created() {
    await this.$store.dispatch("fetchLoggedInStaff");
    await this.$store.dispatch("fetchSpecificStudentReport",this.$route.params.studentID);
    await this.$store.dispatch("fetchReports");
    this.studentReport = this.reports.filter(report => report._id === this.$route.params.studentID)[0];
    this.$store.dispatch("setSelectedStudent", this.studentReport);
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
      "submitLoading",
      "examinerStatus",
      "reports",
      "vivaPanelSectionKey",
      "vivaPanelMessage",
      "examinerReportStatuses",
      "progressEvents",
    ]),
  },
  methods: {
    selectVivaMember(member){
      this.selectedVivaMember = member;
      this.confirmVivaMemberRemoval = true;
    },
    async removeVivaMember(){
      await this.$store.dispatch("removeVivaCommitteeMember", {
        reportID: this.studentReport._id,
        payload: {
          email: this.selectedVivaMember.email
        }
      });
      this.confirmVivaMemberRemoval = false;
      this.displayMessage = true;
      setTimeout(() => {
        this.displayMessage = false;
      }, 5000);
      await this.$store.dispatch("fetchReports");
      this.studentReport = this.reports.filter(report => report._id === this.$route.params.studentID)[0];
    }
  },
  components: {
    Navigation,
    DeanNav,
    ExaminerRejectionReason,
    ExaminerNav,
    MobileDrawer,
    SetVivaCommittee,
    ExaminerAssessment,
    StudentProgress,
    Resubmission,
    // StudentsNotifications,
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