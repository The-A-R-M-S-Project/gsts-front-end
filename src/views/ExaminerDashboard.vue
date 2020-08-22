<template>
  <div>
    <div class="navbar">
      <Navigation />
    </div>
    <div class="pt-5">
      <v-row pt-4>
        <v-col md3>
          <Sidenav />
        </v-col>
        <v-col xs12 md9>
          <v-row>
            <v-col md5>
              <v-card elevation="4" color="purple-lighten-4">
                <v-row>
                  <v-card-title text-xs-center ml-5>
                    <h3>Marked Reports</h3>
                  </v-card-title>
                  <v-spacer></v-spacer>
                  <v-card-title text-xs-center mr-1>
                    <h3>Unmarked Reports</h3>
                  </v-card-title>
                </v-row>
                <v-card-text>
                  <div class="text-xs-center">
                    <v-row purple--text text--lighten-1>
                      <h1 style="font-size: 80px" class="ml-5">{{ markedReports }}</h1>
                      <v-spacer></v-spacer>
                      <h1 style="font-size: 80px" class="mr-5">{{ unmarkedReports }}</h1>
                    </v-row>
                    <h2>VS</h2>
                    <h3>out of</h3>
                    <h3 style="font-size: 50px" color="purple-lighten-3">{{ totalReports() }}</h3>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col md7 pl-3>
              <v-card elevation="24" color="teal">
                <v-row justify-center>
                  <v-card-title text-xs-center>
                    <h2>Students' Reports Received:</h2>
                  </v-card-title>
                </v-row>
                <v-card-text>
                  <div class="text-xs-center">
                    <v-row justify-center purple--text text--lighten-5>
                      <h1 style="font-size: 80px">{{ reportsReceived }}</h1>
                    </v-row>
                    <h3>Out Of</h3>
                    <v-row justify-center>
                      <h1 style="font-size: 50px">{{ studentsAssigned }}</h1>
                    </v-row>
                    <h3>Assigned Students</h3>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-row wrap>
            <v-col md5>
              <StudentReportTable />
            </v-col>
            <v-col md7 pt-3 px-3>
              <v-card elevation="24">
                <v-card-text pa-1>
                  <h2 class="text-xs-center custom-font-family headline">Examiner's Record</h2>
                </v-card-text>
                <ExaminerRecord />
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import Navigation from "@/components/ExaminersNavbar.vue";
import Sidenav from "@/components/ExaminersSidenavView.vue";
import StudentReportTable from "@/components/AssignedStudentsTable.vue";
import ExaminerRecord from "@/components/ExaminerRecord.vue";
export default {
  name: "examinerDetails",
  components: {
    Navigation,
    Sidenav,
    StudentReportTable,
    ExaminerRecord,
  },
  data() {
    return {
      markedReports: "45",
      unmarkedReports: "15",
      total: "",
      reportsReceived: "60",
      studentsAssigned: "78",
    };
  },
  methods: {
    totalReports() {
      return (this.total = String(
        parseInt(this.markedReports) + parseInt(this.unmarkedReports)
      ));
    },
  },
};
</script>
