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
export default {
  computed: {
    performance() {
      return this.$store.getters.performanceStats;
    },
  },
  mounted() {
    let keys = this.performance.map((obj) => {
      return Object.keys(obj);
    });
    let values = this.performance.map((obj) => {
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
  methods: {
    createChart(chartId, chartData) {
      Chart.defaults.global.defaultFontFamily = "Comfortaa";
      const ctx = document.getElementById(chartId);
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: chartData.data,
        options: chartData.options,
      });
    },
  },
};
</script>
