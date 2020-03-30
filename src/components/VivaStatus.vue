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
        options: chartOptions
      }
    };
  },
  mounted() {
    this.createChart("donutChart", this.chartData);
  },
  methods: {
    createChart(chartId, chartData) {
      const vivaData = this.$store.getters.dashboardStats.VivaStatus;
      Chart.defaults.global.defaultFontFamily = "Comfortaa";
      const ctx = document.getElementById(chartId);
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: {
          datasets: [
            {
              label: "Viva Status",
              data: [vivaData.done, vivaData.pending],
              backgroundColor: ["#ffffff", "#263238"],
              borderWidth: [0, 0, 0, 0]
            }
          ],
          labels: ["done", "pending"]
        },
        options: chartData.options
      });
    }
  }
};
const chartOptions = {
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
};
</script>