<template>
  <canvas id="barChart"></canvas>
</template>
<script>
import Chart from "chart.js";
let barChartData = {
  labels: ["Electrical and Computer", "Civil and Environmental", "Mechanical"],
  datasets: [
    {
      label: "submitted",
      backgroundColor: "pink",
      borderWidth: 0,
      data: [3, 5, 6]
    },
    {
      label: "With examiner",
      backgroundColor: "lightblue",
      borderWidth: 0,
      data: [4, 7, 3]
    },
    {
      label: "Cleared",
      backgroundColor: "lightgreen",
      borderColor: "green",
      borderWidth: 0,
      data: [10, 7, 4]
    }
  ]
};

let chartOptions = {
  responsive: true,
  defaultFontFamily: "Comfortaa",
  legend: {
    position: "bottom"
  },
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true
        }
      }
    ],
    xAxes: [
      {
        barPercentage: 0.7,
        categoryPercentage: 0.3
      }
    ]
  }
};
export default {
  name: "VivaStatus",
  data() {
    return {
      chartData: {
        type: "bar",
        data: barChartData,
        options: chartOptions
      }
    };
  },
  mounted() {
    this.createChart("barChart", this.chartData);
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
  }
};
</script>
