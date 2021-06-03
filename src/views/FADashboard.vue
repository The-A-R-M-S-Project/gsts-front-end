<template>
  <div class="mx-auto overflow-hidden">
    <Navigation class="d-none d-sm-block" />
    <MobileDrawer />
    <OverlayLoader />
    <v-container fluid class="pt-5">
      <v-row class="px-4">
        <v-row>
          <v-col
            sm="12"
            md="4"
            class="pb-3"
            :class="{ 'pr-2': !$vuetify.breakpoint.xs }"
          >
            <v-card color="teal" max-width="90vw" class="mx-auto">
              <v-card-text class="pa-1">
                <h2 class="text-center custom-font-family headline white--text">
                  Viva Status
                </h2>
                <div class="text-center mt-4 mb-3">
                  <VivaStatus />
                </div>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col
            xs="12"
            md="8"
            class="pb-3"
            :class="{ 'pl-2': !$vuetify.breakpoint.xs }"
          >
            <v-card max-width="90vw" class="mx-auto">
              <v-card-text class="pa-1">
                <h2 class="text-center custom-font-family headline">
                  Report Status
                </h2>
              </v-card-text>
              <div
                class="responsive-report"
                :class="
                  $vuetify.breakpoint.xs ? 'mobile-performance' : 'desktop-performance'
                "
              >
                <canvas id="fineArtReports"></canvas>
              </div>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            xs="12"
            md="6"
            class="pb-3"
            :class="{ 'pr-2': !$vuetify.breakpoint.xs }"
          >
            <v-row>
              <v-col cols="12" class="pt-0">
                <v-card elevation="24" class="pb-4">
                  <v-card-text class="pa-1">
                    <h2 class="text-center custom-font-family headline">
                      Report statistics
                    </h2>
                  </v-card-text>
                  <v-row align="center" justify="center">
                    <v-col>
                       <h4 class="text-center grey--text text--darken-1 pt-6 pb-4">
                        Cleared / Uncleared reports
                      </h4>
                      <StatCard :statOne="9" :statTwo="4" color="#9C27B0" department="Architecture and Physical planning" />
                    </v-col>
                    <v-col>
                      <h4 class="text-center grey--text text--darken-1 pt-6 pb-4">
                        Complete / Incomplete progress
                      </h4>
                      <StatCard :statOne="3" :statTwo="6" color="#9C27B0" department="Architecture and Physical planning" />
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
              <v-col cols="12">
                <v-card max-width="90vw" class="mx-auto">
                  <v-card-text class="pa-1">
                    <h2 class="text-center custom-font-family headline">
                      Performance
                    </h2>
                    <v-row class="px-2">
                      <v-col sm="12" md="12">
                        <div
                          class="responsive-performance"
                          :class="
                            $vuetify.breakpoint.xs
                              ? 'mobile-performance'
                              : 'desktop-performance'
                          "
                        >
                          <canvas id="fineArtPerformance"></canvas>
                        </div>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
          <v-col
            sm="12"
            md="6"
            class="pb-3"
            :class="{ 'pl-2': !$vuetify.breakpoint.xs }"
          >
            <!-- <v-row>
              <v-col cols="12" class="pt-0">
                <v-card elevation="24">
                  <v-card-text class="pa-1">
                    <h2 class="text-center custom-font-family headline">
                      Report statistics
                    </h2>
                  </v-card-text>
                  <v-row align="center" justify="center">
                    <v-col>
                       <h4 class="text-center grey--text text--darken-1">
                        Cleared / Uncleared reports
                      </h4>
                      <StatCard :statOne="9" :statTwo="4" color="#9C27B0" department="Architecture and Physical planning" />
                    </v-col>
                    <v-col>
                      <h4 class="text-center grey--text text--darken-1">
                        Complete / Incomplete progress
                      </h4>
                      <StatCard :statOne="3" :statTwo="6" color="#9C27B0" department="Architecture and Physical planning" />
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
              <v-col cols="12"> -->
                <v-card max-width="90vw" class="mx-auto">
                  <v-card-text>
                    <h2 class="text-center custom-font-family headline">
                      Upcoming events
                    </h2>
                  </v-card-text>
                  <Calendar />
                </v-card>
              <!-- </v-col> -->
            <!-- </v-row> -->
          </v-col>
        </v-row>
      </v-row>
    </v-container>
    <Footer />
  </div>
</template>

<script>
import Navigation from "@/components/Navbar.vue";
import VivaStatus from "@/components/VivaStatus.vue";
import Calendar from "@/components/Calendar.vue";
import StatCard from "@/components/StatCard.vue"
import OverlayLoader from "@/components/OverlayLoader.vue";
import MobileDrawer from "@/components/MobileDrawer.vue";
import Footer from "@/components/Footer.vue";
import Chart from "chart.js";

export default {
  name: "FA-dashboard",
  data() {
    return {
      drawer: false,
      loading: false,
      reportChartData: {
        type: "bar",
        options: reportChartOptions,
      },
      performanceChartData: {
        type: "horizontalBar",
      },
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
    },
    isLoading() {
      return this.$store.getters.isLoading;
    },
  },
  methods: {
    createReportChart(chartID, chartData) {
      let keys = this.reportStatus.map((obj) => {
        return Object.keys(obj);
      });
      let values = this.reportStatus.map((obj) => {
        return Object.values(obj);
      });
      Chart.defaults.global.defaultFontFamily = "Comfortaa";
      const ctx = document.getElementById(chartID);
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: {
          // labels: [keys[0][0]],
          labels: ["Fine Art"],
          datasets: [
            {
              label: "Not submitted",
              backgroundColor: "#9E9E9E",
              borderWidth: 0,
              barPercentage: 0.7,
              categoryPercentage: 0.3,
              minBarLength: 5,
              //   data: [
              //     values[0][0].notSubmitted,
              //   ]
              data: [2, 1, 7],
            },
            {
              label: "Submitted",
              backgroundColor: "#D84315",
              borderWidth: 0,
              barPercentage: 0.7,
              categoryPercentage: 0.3,
              minBarLength: 5,
              //   data: [
              //     values[0][0].submitted,
              //   ]
              data: [10, 4, 3],
            },
            {
              label: "Assigned to examiners",
              backgroundColor: "#F4511E",
              borderWidth: 0,
              barPercentage: 0.7,
              categoryPercentage: 0.3,
              minBarLength: 5,
              // data: [
              //   values[0][0].assignedToExaminers,
              // ],
              data: [3, 2, 4],
            },
            {
              label: "With examiners",
              backgroundColor: "#FF9800",
              borderWidth: 0,
              barPercentage: 0.7,
              categoryPercentage: 0.3,
              minBarLength: 5,
              //   data: [
              //     values[0][0].receivedByExaminers,
              //   ]
              data: [2, 0, 1],
            },
            {
              label: "Cleared by examiners",
              backgroundColor: "#FFB74D",
              borderWidth: 0,
              barPercentage: 0.7,
              categoryPercentage: 0.3,
              minBarLength: 5,
              // data: [
              //   values[0][0].clearedByExaminers,
              // ],
              data: [3, 2, 1],
            },
            {
              label: "Viva date set",
              backgroundColor: "#FFC107",
              borderWidth: 0,
              barPercentage: 0.7,
              categoryPercentage: 0.3,
              minBarLength: 5,
              // data: [
              //   values[0][0].vivaDateSet,
              // ],
              data: [2, 2, 2],
            },
            {
              label: "Viva complete",
              backgroundColor: "#81C784",
              borderWidth: 0,
              barPercentage: 0.7,
              categoryPercentage: 0.3,
              minBarLength: 5,
              // data: [
              //   values[0][0].vivaComplete,
              // ],
              data: [1, 1, 0],
            },
            {
              label: "Complete",
              backgroundColor: "#4CAF50",
              borderWidth: 0,
              barPercentage: 0.7,
              categoryPercentage: 0.3,
              minBarLength: 5,
              // data: [
              //   values[0][0].complete,
              // ],
              data: [1, 0, 0],
            },
          ]
      },
        options: chartData.options,
      });
    },
    createPerformanceChart(chartID, chartData) {
      let keys = this.performance.map((obj) => {
        return Object.keys(obj);
      });
      let values = this.performance.map((obj) => {
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
              // data: values[0],
              data: [1, 1, 4, 6, 3, 2],
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
            // text: keys[0][0],
            text: "Fine Art",
            fontSize: 12,
          },
          maintainAspectRatio: false,
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
                gridLines: { display: false },
              },
            ],
            xAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
                gridLines: { drawBorder: false },
              },
            ],
          },
        },
      });
    },
  },
  components: {
    Navigation,
    VivaStatus,
    Calendar,
    StatCard,
    MobileDrawer,
    OverlayLoader,
    Footer,
  },
};

let reportChartOptions = {
  maintainAspectRatio: false,
  defaultFontFamily: "Comfortaa",
  legend: {
    position: "bottom",
    align: "center",
    labels: {
      usePointStyle: true,
      padding: 20,
    },
  },
  layout: {
    padding: {
      left: 15,
      right: 20,
      top: 5,
      bottom: 5,
    },
  },
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
        gridLines: {
          drawBorder: false,
          lineWidth: 0.5,
          tickMarkLength: 5,
        },
      },
    ],
    xAxes: [
      {
        gridLines: {
          display: false,
          drawBorder: false,
          tickMarkLength: 15,
        },
      },
    ],
  },
};
</script>

<style lang="scss">
.side-navigation {
  position: fixed;
  top: 9vh;
  left: 0;
}
.responsive-performance {
  position: relative;
}
.desktop-performance {
  height: 56vh !important;
}
.mobile-performance {
  height: 25vh !important;
}
</style>
