<template>
  <div style="position: relative; height:55vh">
    <canvas id="donutChart"></canvas>
  </div>
</template>
<script>
import Chart from "chart.js";
export default {
  name: "vivaStatus",
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
  computed: {
    vivaData() {
      return this.$store.getters.vivaStats;
    }
  },
  methods: {
    createChart(chartId, chartData) {
      Chart.defaults.global.defaultFontFamily = "Comfortaa";
      const ctx = document.getElementById(chartId);
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: {
          datasets: [
            {
              label: "Viva Status",
              //   data: [this.vivaData.done, this.vivaData.pending],
              data: [10, 8],
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
  maintainAspectRatio: false,
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

<style>
.viva-chart {
  height: auto;
}
</style>
