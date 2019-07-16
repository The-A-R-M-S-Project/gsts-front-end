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
    position: "bottom",
    labels: {
      usePointStyle: true,
      padding: 20
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
