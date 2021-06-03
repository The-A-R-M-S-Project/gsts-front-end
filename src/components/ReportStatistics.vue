<template>
  <section>
    <v-row align="center" justify="center" class="mx-6">
      <v-col cols="12">
        <v-row align="center" justify="center">
          <v-col cols="12">
            <h4 class="text-center grey--text text--darken-1">
              Cleared / Uncleared reports
            </h4>
          </v-col>
          <v-col cols="4">
            <StatCard :statOne="10" :statTwo="3" color="#009688" department="Geomatics and Land Management" />
          </v-col>
          <v-col cols="4">
            <StatCard :statOne="9" :statTwo="4" color="#9C27B0" department="Architecture and Physical planning" />
          </v-col>
          <v-col cols="4">
            <StatCard :statOne="8" :statTwo="7" color="#2196F3" department="Construction Economics and Management" />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-row align="center" justify="center">
          <v-col cols="12">
            <h4 class="text-center grey--text text--darken-1">
              Complete / Incomplete progress
            </h4>
          </v-col>
          <v-col cols="4">
            <StatCard :statOne="3" :statTwo="6" color="#9C27B0" department="Architecture and Physical planning" />
          </v-col>
          <v-col cols="4">
            <StatCard :statOne="2" :statTwo="3" color="#2196F3" department="Construction Economics and Management" />            
          </v-col>
          <v-col cols="4">
            <StatCard :statOne="4" :statTwo="8" color="#009688" department="Geomatics and Land Management" />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <div class="grey--text text--darken-1 body-2 mx-10 text-center">
          <span>
            <v-icon color="#009688">mdi-circle</v-icon>
            Geomatics and Land Management
          </span>
          &nbsp; &nbsp;
          <span>
            <v-icon color="#2196F3">mdi-circle</v-icon>
            Construction Economics and Management
          </span>
          &nbsp; &nbsp;
          <span>
            <v-icon color="#9C27B0">mdi-circle</v-icon>
            Architecture and Physical planning
          </span>
        </div>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import Chart from "chart.js";
import { mapGetters } from "vuex";
import StatCard from "@/components/StatCard.vue"

export default {
  name: "ReportStatistics",
  async created() {
    await this.$store.dispatch("fetchLoggedInStaff");
    if (this.user.role === "dean") {
      await this.$store.dispatch("fetchDeanDashboardStats");
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

    this.createChart("clearance");
    this.createChart("completeness");
  },
  computed: {
    ...mapGetters(["schools", "reportStats", "user"]),
  },
  methods: {
    createChart(chartID) {
      let dynamicData;
      let dynamicTitle;
      //   let values = this.reportStats.map((obj) => {
      //     return Object.values(obj);
      //   });
      if (chartID === "clearance") {
        dynamicTitle = "Report clearance";
        dynamicData = [
          {
            label: "Cleared",
            backgroundColor: ["#009688", "#9C27B0", "#2196F3"],
            // data: [
            //   values[0][0].clearedReports,
            //   values[1][0].clearedReports,
            //   values[2][0].clearedReports,
            // ],
            data: [10, 4, 7],
          },
          // {
          //   label: "Uncleared",
          //   backgroundColor: ["#009688", "#9C27B0", "#2196F3"],
            // data: [
            //   values[0][0].unClearedReports,
            //   values[1][0].unClearedReports,
            //   values[2][0].unClearedReports,
            // ],
            // data: [3, 6, 9],
          // },
        ];
      } else {
        dynamicTitle = "Students completed";
        dynamicData = [
          {
            label: "Completed",
            backgroundColor: ["#009688", "#9C27B0", "#2196F3"],
            // data: [
            //   values[0][0].complete,
            //   values[1][0].complete,
            //   values[2][0].complete,
            // ],
            data: [5, 4, 4],
          },
          {
            label: "Not completed",
            backgroundColor: ["#009688", "#9C27B0", "#2196F3"],
            // data: [
            //   values[0][0].uncomplete,
            //   values[1][0].uncomplete,
            //   values[2][0].uncomplete,
            // ],
            data: [12, 8, 9],
          },
        ];
      }
      Chart.defaults.global.defaultFontFamily = "Comfortaa";
      const ctx = document.getElementById(chartID);
      new Chart(ctx, {
        type: "pie",
        data: {
          labels: ["GLM", "CEM", "APP"],
          datasets: dynamicData,
        },
        options: {
          maintainAspectRatio: false,
          tooltips: {
            enabled: true,
            mode: "single",
            callbacks: {
              title: function (context, data) {
                let index = context[0].index;
                return `${data.labels[index]}`;
              },
              label: function (context, data) {
                let datasetIndex = context.datasetIndex;
                let dataIndex = context.index;
                return `${data.datasets[datasetIndex].label}: ${data.datasets[datasetIndex].data[dataIndex]}`;
              },
            },
          },
          title: {
            display: true,
            text: dynamicTitle,
            fontSize: 15,
          },
          legend: {
            position: "bottom",
            labels: {
              fontColor: "black",
              fontSize: 15,
              padding: 18,
              usePointStyle: true,
            },
          },
          layout: {
            padding: {
              left: 12,
              right: 12,
            },
          },
        },
      });
    },
    determineLabel() {
      let vw = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      );
      let keys = this.reportStats.map((obj) => {
        return Object.keys(obj);
      });
      let shortNames = {
        "Geomatics and Land Management": "GLM",
        "Architecture and Physical planning": "APP",
        "Construction Economics and Management": "CEM",
        "Electrical and Computer Engineering": "ECE",
        "Mechanical Engineering": "ME",
        "Civil and Environmental Engineering": "CEE",
      };
      if (vw < 960) {
        return [
          shortNames[`${keys[0][0]}`],
          shortNames[`${keys[1][0]}`],
          shortNames[`${keys[2][0]}`],
        ];
      } else {
        return [keys[0][0], keys[1][0], keys[2][0]];
      }
    },
  },
  components: {
    StatCard
  }
};
</script>

<style scoped>
.responsive-chart {
  position: relative;
  height: 40vh;
}
</style>