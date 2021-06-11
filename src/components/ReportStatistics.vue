<template>
  <section>
    <v-row align="center" justify="center" class="mx-6">
      <v-col cols="12">
        <v-row align="center" justify="center">
          <v-col cols="12">
            <h4 class="text-center grey--text text--darken-1">
              Cleared reports
            </h4>
          </v-col>
          <v-col cols="4" class="text-center">
            <StatCard
              :statOne="getDepartmentValues(getDepartments()[0], 'clearance').cleared"
              :statTwo="getDepartmentValues(getDepartments()[0], 'clearance').total"
              color="#009688" 
              :department="getDepartments()[0]" />
          </v-col>
          <v-col cols="4" class="text-center">
            <StatCard 
              :statOne="getDepartmentValues(getDepartments()[1], 'clearance').cleared"
              :statTwo="getDepartmentValues(getDepartments()[1], 'clearance').total" 
              color="#9C27B0" 
              :department="getDepartments()[1]" />
          </v-col>
          <v-col cols="4" class="text-center">
            <StatCard 
              :statOne="getDepartmentValues(getDepartments()[2], 'clearance').cleared"
              :statTwo="getDepartmentValues(getDepartments()[2], 'clearance').total" 
              color="#2196F3" 
              :department="getDepartments()[2]" />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-row align="center" justify="center">
          <v-col cols="12">
            <h4 class="text-center grey--text text--darken-1">
              Complete progress
            </h4>
          </v-col>
          <v-col cols="4" class="text-center">
            <StatCard 
              :statOne="getDepartmentValues(getDepartments()[0], 'progress').complete"
              :statTwo="getDepartmentValues(getDepartments()[0], 'progress').total" 
              color="#009688" 
              :department="getDepartments()[0]" />
          </v-col>
          <v-col cols="4" class="text-center">
            <StatCard 
              :statOne="getDepartmentValues(getDepartments()[1], 'progress').complete"
              :statTwo="getDepartmentValues(getDepartments()[1], 'progress').total" 
              color="#9C27B0" 
              :department="getDepartments()[1]" />            
          </v-col>
          <v-col cols="4" class="text-center">
            <StatCard 
              :statOne="getDepartmentValues(getDepartments()[2], 'progress').complete"
              :statTwo="getDepartmentValues(getDepartments()[2], 'progress').total" 
              color="#2196F3" 
              :department="getDepartments()[2]" />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <div class="grey--text text--darken-1 body-2 mx-10 text-center">
          <span>
            <v-icon color="#009688">mdi-circle</v-icon>
            {{getDepartments()[0]}}
          </span>
          &nbsp; &nbsp;
          <span>
            <v-icon color="#9C27B0">mdi-circle</v-icon>
            {{getDepartments()[1]}}
          </span>
          &nbsp; &nbsp;
          <span>
            <v-icon color="#2196F3">mdi-circle</v-icon>
            {{getDepartments()[2]}}
          </span>
        </div>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import StatCard from "@/components/StatCard.vue"

export default {
  name: "ReportStatistics",
  async created() {
    await this.$store.dispatch("fetchLoggedInStaff");
    if (this.user.role === "dean") {
      await this.$store.dispatch("fetchDeanDashboardStats");
      console.log("Results: ", this.getDepartmentValues(this.getDepartments()[0]));
    } else {
      await this.$store.dispatch("fetchSchools");
      if (this.$route.path === "/ECE-dashboard") {
        this.selectedSchool = this.schools.find((school) => {
          return school.name === "School of Engineering";
        });
      } else if (this.$route.path === "/BE-dashboard") {
        this.selectedSchool = this.schools.find((school) => {
          return school.name === "School of Built Environment";
        });
      } else if (this.$route.path === "/FA-dashboard") {
        this.selectedSchool = this.schools.find((school) => {
          return school.name === "School of Industrial and Fine Arts";
        });
      }
      await this.$store.dispatch(
        "fetchDashboardStats",
        this.selectedSchool._id
      );
    }
  },
  computed: {
    ...mapGetters(["schools", "reportStats", "user"]),
  },
  methods: {
    getDepartmentValues(departmentName, stat) {
        let departmentStats = this.reportStats.find(department => Object.keys(department)[0] === departmentName);
        if(departmentStats) {
          let statistics = Object.values(departmentStats)[0];
          if(stat === "clearance"){
            return {
              cleared: statistics.clearedReports,
              total: (statistics.clearedReports + statistics.unClearedReports)
            }
          } else {
            return {
              complete: statistics.complete,
              total: (statistics.complete + statistics.uncomplete)
            }
          }
        } else{
          return {}
        }
    },
    getDepartments() {
      return this.reportStats.map((obj) => {
        return Object.keys(obj)[0];
      });
    }
  },
  components: {
    StatCard
  }
};
</script>