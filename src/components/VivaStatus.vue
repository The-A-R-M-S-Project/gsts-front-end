<template>
  <div>
    <canvas id="donutChart" width="80%" height="80%"></canvas>
  </div>
</template>
<script>
import Chart from "chart.js";
export default {
  name: "VivaStatus",
  data() {
    return {
      chartData: {
        type: "doughnut",
        data: {
          datasets: [
            {
              label: "Viva Status",
              data: [10, 20],
              backgroundColor: ["#ffffff", "#263238"],
              borderWidth: [0, 0, 0, 0]
            }
          ],
          labels: ["done", "pending"]
        },
        options: {
          responsive: true,
          legend: {
            position: "bottom",
            labels: {
              fontColor: "white",
              fontSize: 15
            }
          },
          cutoutPercentage: 93,
          layout: {
            padding: {
              left: 12,
              right: 30
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
    this.createChart("donutChart", this.chartData);
  }
};
</script>
