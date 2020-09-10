<template>
  <div>
    <canvas id="lineChart"></canvas>
  </div>
</template>
<script>
import Chart from "chart.js";
export default {
  data() {
    return {
      chartData: {
        type: "line",
        data: {
          datasets: [
            {
              data: [
                { x: 10, y: 64 },
                { x: 10, y: 65 },
                { x: 15, y: 56 },
                { x: 25, y: 65 },
                { x: 35, y: 55 },
                { x: 45, y: 57 },
                { x: 45, y: 50 },
                { x: 45, y: 54 },
              ],
              backgroundColor: ["blue", "orange", "purple", "red", "yellow"],
              fill: false,
              lineTension: 0.1,
            },
          ],
          labels: ["2018", "2017", "2016", "2015", "2014"],
        },
        options: {
          legend: {
            display: false,
          },
          scales: {
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "Number of students",
                  fontColor: "black",
                  fontSize: 14,
                  padding: 6,
                },
              },
            ],
            xAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "Year",
                  fontColor: "black",
                  fontSize: 14,
                },
              },
            ],
          },
        },
      },
    };
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
  mounted() {
    this.createChart("lineChart", this.chartData);
  },
};
</script>
