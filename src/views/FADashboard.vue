<template>
  <div>
    <Navigation />
    <OverlayLoader />
    <v-container fluid class="pt-5">
      <v-row class="px-4">
        <v-row>
          <v-col sm="12" md="4" class="pb-3 pr-2">
            <v-card class="viva-status" flat color="teal">
              <v-card-text class="pa-1">
                <h2 class="text-center custom-font-family headline white--text">Viva Status</h2>
                <div class="text-center mt-4 mb-3">
                  <VivaStatus />
                </div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col xs="12" md="8" class="pb-3 pl-2">
            <v-card flat elevation="24">
              <v-card-text class="pa-1">
                <h2 class="text-center custom-font-family headline">Report Status</h2>
              </v-card-text>
              <canvas id="fineArtReports"></canvas>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col xs="12" md="6" class="pb-3 pr-2">
            <v-card elevation="20">
              <v-card-text class="pa-1">
                <h2 class="text-center custom-font-family headline">Performance</h2>
                <v-row class="px-2">
                  <v-col sm="12" md="12">
                    <canvas id="fineArtPerformance"></canvas>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col sm="12" md="6" class="pb-3 pl-2" grow>
            <v-card elevation="24">
              <v-card-text pa-1>
                <h2 class="text-center custom-font-family headline">Upcoming deadlines</h2>
              </v-card-text>
              <Calendar />
            </v-card>
          </v-col>
        </v-row>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Navigation from "@/components/Navbar.vue";
import VivaStatus from "@/components/VivaStatus.vue";
import Calendar from "@/components/Calendar.vue";
import OverlayLoader from "@/components/OverlayLoader.vue";
import Chart from "chart.js";

export default {
  name: "FA-dashboard",
  data() {
    return {
      reportChartData: {
        type: "bar",
        options: chartOptions
      },
      performanceChartData: {
        type: "horizontalBar"
      }
    };
  },
  mounted() {
    this.createReportChart("fineArtReports", this.reportChartData);
    this.createPerformanceChart(
      "fineArtPerformance",
      this.performanceChartData
    );
  },
  computed: {
    reportStatus() {
      return this.$store.getters.reportStats;
    },
    performance() {
      return this.$store.getters.performanceStats;
    }
  },
  methods: {
    createReportChart(chartID, chartData) {
      let keys = this.reportStatus.map(obj => {
        return Object.keys(obj);
      });
      let values = this.reportStatus.map(obj => {
        return Object.values(obj);
      });
      Chart.defaults.global.defaultFontFamily = "Comfortaa";
      const ctx = document.getElementById(chartID);
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: {
          labels: [keys[0][0]],
          datasets: [
            {
              label: "submitted",
              backgroundColor: "#9C27B0",
              borderWidth: 0,
              barPercentage: 0.7,
              categoryPercentage: 0.3,
              data: [values[0][0].submitted]
            },
            {
              label: "With examiner",
              backgroundColor: "#2196F3",
              borderWidth: 0,
              barPercentage: 0.7,
              categoryPercentage: 0.3,
              data: [values[0][0].withExaminer]
            },
            {
              label: "Cleared",
              backgroundColor: "#009688",
              borderWidth: 0,
              barPercentage: 0.7,
              categoryPercentage: 0.3,
              data: [values[0][0].cleared]
            }
          ]
        },
        options: chartData.options
      });
    },
    createPerformanceChart(chartID, chartData) {
      let keys = this.performance.map(obj => {
        return Object.keys(obj);
      });
      let values = this.performance.map(obj => {
        return Object.values(obj);
      });
      Chart.defaults.global.defaultFontFamily = "Comfortaa";
      const ctx = document.getElementById(chartID);
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: {
          datasets: [
            {
              label: "Perfomance",
              data: values[0],
              backgroundColor: [
                "#2196F3",
                "#2196F3",
                "#2196F3",
                "#2196F3",
                "#2196F3",
                "#2196F3"
              ]
            }
          ],
          labels: ["A", "B", "C", "D", "E", "F"]
        },
        options: {
          title: { display: true, text: keys[0][0], fontSize: 12 },
          responsive: true,
          legend: {
            display: false,
            position: "bottom",
            labels: {
              boxWidth: 12
            }
          },
          scales: {
            yAxes: [{ gridLines: { display: false } }],
            xAxes: [{ gridLines: { drawBorder: false } }]
          }
        }
      });
    }
  },
  components: {
    Navigation,
    VivaStatus,
    Calendar,
    OverlayLoader
  }
};

let chartOptions = {
  responsive: true,
  defaultFontFamily: "Comfortaa",
  legend: {
    position: "bottom",
    align: "start",
    labels: {
      usePointStyle: true,
      padding: 20
    }
  },
  layout: {
    padding: {
      left: 15,
      right: 20,
      top: 5,
      bottom: 5
    }
  },
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true
        },
        gridLines: {
          drawBorder: false,
          lineWidth: 0.5,
          tickMarkLength: 5
        }
      }
    ],
    xAxes: [
      {
        gridLines: {
          display: false,
          drawBorder: false,
          tickMarkLength: 15
        }
      }
    ]
  }
};
</script>

<style lang="scss">
.side-navigation {
  position: fixed;
  top: 9vh;
  left: 0;
}
.viva-status {
  background-color: purple;
}
</style>
