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
              label: "Viva Status",
              data: [{x: 10, y: 70},
                     {x: 15, y: 56},
                     {x: 25, y: 65},
                     {x: 35, y: 50},
                     {x: 45, y: 57}],
              backgroundColor: ["blue"],
              fill: false
            }
          ],
          labels: ["2018", "2017", "2016", "2015", "2014"]
        },
        options: {
          legend: {
            position: "bottom",
            labels: {
              fontColor: "black",
              fontSize: 15
            }
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
    this.createChart("lineChart", this.chartData);
  }
};
</script>
