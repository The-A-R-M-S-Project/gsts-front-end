<template>
  <v-layout column wrap>
    <v-flex sm12 md4>
      <canvas id="electricalAndComputer"></canvas>
    </v-flex>
    <v-flex sm12 md4>
      <canvas id="civil"></canvas>
    </v-flex>
    <v-flex sm12 md4>
      <canvas id="mechanical"></canvas>
    </v-flex>
  </v-layout>
</template>
<script>
import Chart from "chart.js";
export default {
  data() {
    return {
      chartData1: {
        type: "horizontalBar",
        data: {
          datasets: [
            {
              label: "Perfomance",
              data: this.$store.getters.dashboardStats.Performance.EC,
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
          title: {
            display: true,
            text: "Electrical and Computer",
            fontSize: 12
          },
          responsive: true,
          legend: {
            display: false,
            position: "bottom",
            labels: {
              boxWidth: 12
            }
          },
          scales: {
            yAxes: [
              {
                gridLines: {
                  display: false
                }
              }
            ],
            xAxes: [
              {
                gridLines: {
                  drawBorder: false
                }
              }
            ]
          }
        }
      },
      chartData2: {
        type: "horizontalBar",
        data: {
          datasets: [
            {
              label: "Perfomance",
              data: this.$store.getters.dashboardStats.Performance.CE,
              backgroundColor: [
                "#009688",
                "#009688",
                "#009688",
                "#009688",
                "#009688",
                "#009688"
              ]
            }
          ],
          labels: ["A", "B", "C", "D", "E", "F"]
        },
        options: {
          title: {
            display: true,
            text: "Mechanical",
            fontSize: 12
          },
          responsive: true,
          legend: {
            display: false,
            position: "bottom",
            labels: {
              boxWidth: 12
            }
          },
          scales: {
            yAxes: [
              {
                gridLines: {
                  display: false
                }
              }
            ],
            xAxes: [
              {
                gridLines: {
                  drawBorder: false
                }
              }
            ]
          }
        }
      },
      chartData3: {
        type: "horizontalBar",
        data: {
          datasets: [
            {
              label: "Perfomance",
              data: this.$store.getters.dashboardStats.Performance.Mechanical,
              backgroundColor: [
                "#9C27B0",
                "#9C27B0",
                "#9C27B0",
                "#9C27B0",
                "#9C27B0",
                "#9C27B0"
              ]
            }
          ],
          labels: ["A", "B", "C", "D", "E", "F"]
        },
        options: {
          title: {
            display: true,
            text: "Civil and Environmental",
            fontSize: 12
          },
          responsive: true,
          legend: {
            display: false,
            position: "bottom",
            labels: {
              boxWidth: 12
            }
          },
          scales: {
            yAxes: [
              {
                gridLines: {
                  display: false
                }
              }
            ],
            xAxes: [
              {
                gridLines: {
                  drawBorder: false
                }
              }
            ]
          }
        }
      }
    };
  },
  methods: {
    createChart(chartId, chartData) {
      Chart.defaults.global.defaultFontFamily = "Comfortaa";
      const ctx = document.getElementById(chartId);
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options
      });
    }
  },
  mounted() {
    this.createChart("electricalAndComputer", this.chartData1);
    this.createChart("civil", this.chartData3);
    this.createChart("mechanical", this.chartData2);
  }
};
</script>
