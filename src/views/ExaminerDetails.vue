<template>
  <div>
    <div class="navbar">
      <Navigation />
    </div>
    <div class="pt-5">
      <v-layout row pt-4>
        <v-flex md3>
          <Sidenav />
        </v-flex>
        <v-flex xs12 md9>
          <v-layout row>
            <v-flex md5>
              <v-card elevation-17 color="purple-lighten-4">
                <v-layout row>
                  <v-card-title text-xs-center>Marked Reports</v-card-title>
                  <v-spacer></v-spacer>
                  <v-card-title text-xs-center>Unmarked Reports</v-card-title>
                </v-layout>
                <v-card-text>
                  <div class="text-xs-center">
                    <v-layout row purple--text text--lighten-1>
                        <h1 style="font-size: 80px" class="ml-5">{{ markedReports }}</h1>
                        <v-spacer></v-spacer>
                        <h1 style="font-size: 80px" class="mr-5">{{ unmarkedReports }}</h1>
                    </v-layout>
                    <h2>VS</h2>
                    <h3>out of</h3>
                    <h3 style="font-size: 50px" color="purple-lighten-3">{{ totalReports() }}</h3>
                  </div>
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex md6>
              <v-card>
                
              </v-card>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex md5>
              <StudentReportTable />
            </v-flex>
            <v-flex md7>
              <ExaminerRecord />
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
import Navigation from "@/components/Navbar.vue";
import Sidenav from "@/components/ExaminersSidenav.vue";
import StudentReportTable from "@/components/AssignedStudentsTable.vue";
import ExaminerRecord from "@/components/ExaminerRecord.vue";
export default {
  name: "examinerDetails",
  components: {
    Navigation,
    Sidenav,
    StudentReportTable,
    ExaminerRecord
  },
  data() {
    return {
      markedReports: "45",
      unmarkedReports: "15",
      total: ""
    };
  },
  methods: {
    totalReports() {
      return (this.total = String(
        parseInt(this.markedReports) + parseInt(this.unmarkedReports)
      ));
    }
  }
};
</script>
