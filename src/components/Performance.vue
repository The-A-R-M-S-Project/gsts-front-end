<template>
  <v-row class="px-2">
    <v-col sm="12" md="12">
      <canvas id="electricalAndComputer"></canvas>
    </v-col>
    <v-col sm="12" md="12">
      <canvas id="civil"></canvas>
    </v-col>
    <v-col sm="12" md="12">
      <canvas id="mechanical"></canvas>
    </v-col>
  </v-row>
</template>
<script>
import Chart from "chart.js";
import { mapGetters } from "vuex";

export default {
  name: "PerformanceStatus",
  data() {
    return {
      selectedSchool: null,
    };
  },
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
    let keys = this.performanceStats.map((obj) => {
      return Object.keys(obj);
    });
    let values = this.performanceStats.map((obj) => {
      return Object.values(obj);
    });
    this.createChart("electricalAndComputer", {
      type: "horizontalBar",
      data: {
        datasets: [
          {
            label: "Perfomance",
            // data: values[0],
            data: [2, 5, 6, 7, 1, 0],
            backgroundColor: [
              "#2196F3",
              "#2196F3",
              "#2196F3",
              "#2196F3",
              "#2196F3",
              "#2196F3",
            ],
          },
        ],
        labels: ["A", "B", "C", "D", "E", "F"],
      },
      options: {
        title: {
          display: true,
          text: keys[0][0],
          fontSize: 12,
        },
        responsive: true,
        legend: {
          display: false,
          position: "bottom",
          labels: {
            boxWidth: 12,
          },
        },
        scales: {
          yAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                drawBorder: false,
              },
              ticks: {
                beginAtZero: true,
                stepSize: 1,
              },
            },
          ],
        },
      },
    });
    this.createChart("civil", {
      type: "horizontalBar",
      data: {
        datasets: [
          {
            label: "Perfomance",
            // data: values[1],
            data: [5, 4, 4, 2, 1, 2],
            backgroundColor: [
              "#9C27B0",
              "#9C27B0",
              "#9C27B0",
              "#9C27B0",
              "#9C27B0",
              "#9C27B0",
            ],
          },
        ],
        labels: ["A", "B", "C", "D", "E", "F"],
      },
      options: {
        title: {
          display: true,
          text: keys[1][0],
          fontSize: 12,
        },
        responsive: true,
        legend: {
          display: false,
          position: "bottom",
          labels: {
            boxWidth: 12,
          },
        },
        scales: {
          yAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                drawBorder: false,
              },
              ticks: {
                beginAtZero: true,
                stepSize: 1,
              },
            },
          ],
        },
      },
    });
    this.createChart("mechanical", {
      type: "horizontalBar",
      data: {
        datasets: [
          {
            label: "Perfomance",
            // data: values[2],
            data: [3, 3, 5, 3, 6, 1],
            backgroundColor: [
              "#009688",
              "#009688",
              "#009688",
              "#009688",
              "#009688",
              "#009688",
            ],
          },
        ],
        labels: ["A", "B", "C", "D", "E", "F"],
      },
      options: {
        title: {
          display: true,
          text: keys[2][0],
          fontSize: 12,
        },
        responsive: true,
        legend: {
          display: false,
          position: "bottom",
          labels: {
            boxWidth: 12,
          },
        },
        scales: {
          yAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                drawBorder: false,
              },
              ticks: {
                beginAtZero: true,
                stepSize: 1,
              },
            },
          ],
        },
      },
    });
  },
  computed: {
    ...mapGetters(["schools", "performanceStats", "user"]),
  },
  methods: {
    createChart(chartId, chartData) {
      Chart.defaults.global.defaultFontFamily = "Comfortaa";
      const ctx = document.getElementById(chartId);
      new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options,
      });
    },
  },
};
</script>
