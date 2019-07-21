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
            <v-flex md6>
              <v-card flat text-xs-center>
                <v-card-title>No. of Marked Reports</v-card-title>
                <v-card-text>
                  <h1 style="font-size: 80px">{{ markedReports }}</h1>
                  <p>out of</p>
                  <h3 style="font-size: 40px">{{ totalReports() }}</h3>
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex md6>
              <v-card>
                <v-card-title>No. of Unmarked Reports</v-card-title>
                <v-card-text>
                  <h1 style="font-size: 80px">{{ unmarkedReports }}</h1>
                  <p>out of</p>
                  <h3 style="font-size: 40px">{{ totalReports()}}</h3>
                </v-card-text>
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
      markedReports: '45',
      unmarkedReports: '15',
      total: ''
    };
  },
  methods: {
    totalReports() {
      return this.total = String(parseInt(this.markedReports)+parseInt(this.unmarkedReports))
    }
  }
};
</script>
