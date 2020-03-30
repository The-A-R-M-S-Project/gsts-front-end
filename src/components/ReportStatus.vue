<template>
  <canvas id="barChart"></canvas>
</template>
<script>
import Chart from "chart.js";
export default {
  name: "VivaStatus",
  data() {
    return {
      chartData: {
        type: "bar",
        options: chartOptions
      }
    };
  },
  mounted() {
    this.createChart("barChart", this.chartData);
  },
  methods: {
    createChart(chartId, chartData) {
      const reportStatus = this.$store.getters.dashboardStats.ReportStatus;
      Chart.defaults.global.defaultFontFamily = "Comfortaa";
      const ctx = document.getElementById(chartId);
      const myChart = new Chart(ctx, {
        type: chartData.type,
        data: {
          labels: [
            "Electrical and Computer",
            "Civil and Environmental",
            "Mechanical"
          ],
          datasets: [
            {
              label: "submitted",
              backgroundColor: "#9C27B0",
              borderWidth: 0,
              data: [
                reportStatus.EC.submitted,
                reportStatus.CE.submitted,
                reportStatus.Mechanical.submitted
              ]
            },
            {
              label: "With examiner",
              backgroundColor: "#2196F3",
              borderWidth: 0,
              data: [
                reportStatus.EC.withExaminer,
                reportStatus.CE.withExaminer,
                reportStatus.Mechanical.withExaminer
              ]
            },
            {
              label: "Cleared",
              backgroundColor: "#009688",
              borderWidth: 0,
              data: [
                reportStatus.EC.cleared,
                reportStatus.CE.cleared,
                reportStatus.Mechanical.cleared
              ]
            }
          ]
        },
        options: chartData.options
      });
    }
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
        barPercentage: 0.7,
        categoryPercentage: 0.3,
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
